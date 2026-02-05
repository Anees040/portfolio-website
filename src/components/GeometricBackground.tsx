"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";

// Hexagon configuration - larger hexagons like reference image
const HEX_SIZE = 140; // Radius for larger hexagons
const CORNER_RADIUS = 14; // Rounded corners
const HEX_HEIGHT = HEX_SIZE * Math.sqrt(3);
const HEX_WIDTH = HEX_SIZE * 2;
const HORIZONTAL_SPACING = HEX_WIDTH * 0.78;
const VERTICAL_SPACING = HEX_HEIGHT * 0.52;

// POINTER-DRIVEN animation constants - NO time-based completion
const PROXIMITY_THRESHOLD = HEX_SIZE * 2.2;
const GLOW_FADE_SPEED = 0.06; // Per-frame fade when pointer leaves
const GLOW_GROW_SPEED = 0.1; // Per-frame grow when pointer near
const MAX_GLOW_INTENSITY = 0.55;
const VELOCITY_MULTIPLIER = 0.012;
const BASE_STROKE_OPACITY = 0.055;

interface Point {
  x: number;
  y: number;
}

interface HexCell {
  id: string;
  center: Point;
  vertices: Point[];
  roundedPath: Path2D;
  // Pointer-driven state (NO time-based fields)
  glowIntensity: number;
  targetIntensity: number;
  entryPoint: number;
  clockwiseGlow: number;
  counterClockwiseGlow: number;
}

// Generate hexagon vertices (flat-top orientation)
function generateHexVertices(cx: number, cy: number, size: number): Point[] {
  const vertices: Point[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    vertices.push({
      x: cx + size * Math.cos(angle),
      y: cy + size * Math.sin(angle),
    });
  }
  return vertices;
}

// Create rounded hexagon path for smooth corners
function createRoundedHexPath(vertices: Point[], radius: number): Path2D {
  const path = new Path2D();
  const n = vertices.length;
  
  for (let i = 0; i < n; i++) {
    const curr = vertices[i];
    const next = vertices[(i + 1) % n];
    const prev = vertices[(i + n - 1) % n];
    
    const toPrev = { x: prev.x - curr.x, y: prev.y - curr.y };
    const toNext = { x: next.x - curr.x, y: next.y - curr.y };
    
    const lenPrev = Math.sqrt(toPrev.x ** 2 + toPrev.y ** 2);
    const lenNext = Math.sqrt(toNext.x ** 2 + toNext.y ** 2);
    
    const normPrev = { x: toPrev.x / lenPrev, y: toPrev.y / lenPrev };
    const normNext = { x: toNext.x / lenNext, y: toNext.y / lenNext };
    
    const r = Math.min(radius, lenPrev / 3, lenNext / 3);
    const startCorner = { x: curr.x + normPrev.x * r, y: curr.y + normPrev.y * r };
    const endCorner = { x: curr.x + normNext.x * r, y: curr.y + normNext.y * r };
    
    if (i === 0) {
      path.moveTo(startCorner.x, startCorner.y);
    } else {
      path.lineTo(startCorner.x, startCorner.y);
    }
    
    path.quadraticCurveTo(curr.x, curr.y, endCorner.x, endCorner.y);
  }
  
  path.closePath();
  return path;
}

function distanceToCenter(point: Point, center: Point): number {
  return Math.sqrt((point.x - center.x) ** 2 + (point.y - center.y) ** 2);
}

function findClosestEdgePosition(point: Point, vertices: Point[]): number {
  let minDist = Infinity;
  let closestPosition = 0;
  const n = vertices.length;
  let accumulated = 0;
  let totalPerimeter = 0;
  
  for (let i = 0; i < n; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % n];
    totalPerimeter += Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
  }
  
  for (let i = 0; i < n; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % n];
    const edgeLen = Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
    
    const edge = { x: v2.x - v1.x, y: v2.y - v1.y };
    const toPoint = { x: point.x - v1.x, y: point.y - v1.y };
    const t = Math.max(0, Math.min(1, (toPoint.x * edge.x + toPoint.y * edge.y) / (edgeLen ** 2)));
    
    const closest = { x: v1.x + t * edge.x, y: v1.y + t * edge.y };
    const dist = Math.sqrt((point.x - closest.x) ** 2 + (point.y - closest.y) ** 2);
    
    if (dist < minDist) {
      minDist = dist;
      closestPosition = (accumulated + t * edgeLen) / totalPerimeter;
    }
    
    accumulated += edgeLen;
  }
  
  return closestPosition;
}

function getPointOnPerimeter(vertices: Point[], position: number): Point {
  const n = vertices.length;
  let totalPerimeter = 0;
  const edgeLengths: number[] = [];
  
  for (let i = 0; i < n; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % n];
    const len = Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
    edgeLengths.push(len);
    totalPerimeter += len;
  }
  
  let normalizedPos = ((position % 1) + 1) % 1;
  let targetDist = normalizedPos * totalPerimeter;
  let accumulated = 0;
  
  for (let i = 0; i < n; i++) {
    if (accumulated + edgeLengths[i] >= targetDist) {
      const t = (targetDist - accumulated) / edgeLengths[i];
      const v1 = vertices[i];
      const v2 = vertices[(i + 1) % n];
      return {
        x: v1.x + t * (v2.x - v1.x),
        y: v1.y + t * (v2.y - v1.y),
      };
    }
    accumulated += edgeLengths[i];
  }
  
  return vertices[0];
}

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexGridRef = useRef<HexCell[]>([]);
  const pointerRef = useRef<Point>({ x: -9999, y: -9999 });
  const pointerVelocityRef = useRef<Point>({ x: 0, y: 0 });
  const prevPointerRef = useRef<Point>({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const generateGrid = useCallback((width: number, height: number): HexCell[] => {
    const grid: HexCell[] = [];
    const cols = Math.ceil(width / HORIZONTAL_SPACING) + 3;
    const rows = Math.ceil(height / VERTICAL_SPACING) + 3;
    
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const isOffsetRow = row % 2 === 1;
        const cx = col * HORIZONTAL_SPACING + (isOffsetRow ? HORIZONTAL_SPACING / 2 : 0);
        const cy = row * VERTICAL_SPACING;
        
        const vertices = generateHexVertices(cx, cy, HEX_SIZE);
        const roundedPath = createRoundedHexPath(vertices, CORNER_RADIUS);
        
        grid.push({
          id: `hex-${row}-${col}`,
          center: { x: cx, y: cy },
          vertices,
          roundedPath,
          glowIntensity: 0,
          targetIntensity: 0,
          entryPoint: 0,
          clockwiseGlow: 0,
          counterClockwiseGlow: 0,
        });
      }
    }
    
    return grid;
  }, []);

  // PURELY POINTER-DRIVEN render loop - animations live/die by pointer state
  const render = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const deltaTime = Math.min(time - lastTimeRef.current, 50);
    lastTimeRef.current = time;
    const dtFactor = deltaTime / 16.67;
    
    // Smooth velocity tracking
    const dx = pointerRef.current.x - prevPointerRef.current.x;
    const dy = pointerRef.current.y - prevPointerRef.current.y;
    pointerVelocityRef.current = {
      x: pointerVelocityRef.current.x * 0.65 + dx * 0.35,
      y: pointerVelocityRef.current.y * 0.65 + dy * 0.35,
    };
    prevPointerRef.current = { ...pointerRef.current };
    
    const speed = Math.sqrt(
      pointerVelocityRef.current.x ** 2 + 
      pointerVelocityRef.current.y ** 2
    );
    
    const isDark = themeRef.current === "dark";
    
    // Clear and draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isDark) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0a0f1a");
      gradient.addColorStop(0.35, "#0c1320");
      gradient.addColorStop(0.65, "#0b111c");
      gradient.addColorStop(1, "#0a0f1a");
      ctx.fillStyle = gradient;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#f8fafc");
      gradient.addColorStop(0.5, "#f1f5f9");
      gradient.addColorStop(1, "#f8fafc");
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update each hexagon - POINTER-DRIVEN, no time-based completion
    for (const hex of hexGridRef.current) {
      const dist = distanceToCenter(pointerRef.current, hex.center);
      const isInProximity = dist < PROXIMITY_THRESHOLD;
      
      // Target intensity derived ONLY from current pointer state
      if (isInProximity) {
        const proximityFactor = 1 - (dist / PROXIMITY_THRESHOLD);
        const velocityBoost = Math.min(speed * VELOCITY_MULTIPLIER, 0.35);
        hex.targetIntensity = Math.min(
          (proximityFactor * 0.5 + velocityBoost) * MAX_GLOW_INTENSITY,
          MAX_GLOW_INTENSITY
        );
        hex.entryPoint = findClosestEdgePosition(pointerRef.current, hex.vertices);
      } else {
        // Pointer left - begin immediate fade
        hex.targetIntensity = 0;
      }
      
      // Smooth interpolation - intensity follows target
      const isGrowing = hex.targetIntensity > hex.glowIntensity;
      const interpSpeed = isGrowing ? GLOW_GROW_SPEED : GLOW_FADE_SPEED;
      hex.glowIntensity += (hex.targetIntensity - hex.glowIntensity) * interpSpeed * dtFactor;
      
      if (hex.glowIntensity < 0.002) hex.glowIntensity = 0;
      
      // Bi-directional glow spread - also pointer-driven
      if (hex.glowIntensity > 0.01) {
        const spreadSpeed = 0.018 * (1 + speed * 0.008) * dtFactor;
        const maxSpread = 0.12 + hex.glowIntensity * 0.12;
        
        if (hex.targetIntensity > 0) {
          hex.clockwiseGlow = Math.min(hex.clockwiseGlow + spreadSpeed, maxSpread);
          hex.counterClockwiseGlow = Math.min(hex.counterClockwiseGlow + spreadSpeed, maxSpread);
        } else {
          // Shrink when pointer leaves
          hex.clockwiseGlow *= (1 - 0.08 * dtFactor);
          hex.counterClockwiseGlow *= (1 - 0.08 * dtFactor);
        }
      } else {
        hex.clockwiseGlow = 0;
        hex.counterClockwiseGlow = 0;
      }
      
      // Draw hexagon stroke
      ctx.strokeStyle = isDark 
        ? `rgba(90, 140, 190, ${BASE_STROKE_OPACITY})`
        : `rgba(100, 130, 170, ${BASE_STROKE_OPACITY * 0.7})`;
      ctx.lineWidth = 1;
      ctx.stroke(hex.roundedPath);
      
      // Draw glow if active
      if (hex.glowIntensity > 0.01) {
        const glowColor = isDark 
          ? `rgba(56, 189, 248, ${hex.glowIntensity})`
          : `rgba(37, 99, 235, ${hex.glowIntensity * 0.7})`;
        
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.shadowColor = isDark 
          ? `rgba(56, 189, 248, ${hex.glowIntensity * 0.5})`
          : `rgba(37, 99, 235, ${hex.glowIntensity * 0.35})`;
        ctx.shadowBlur = 10;
        
        // Clockwise trail
        if (hex.clockwiseGlow > 0.004) {
          ctx.beginPath();
          const segments = 12;
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const pos = hex.entryPoint + t * hex.clockwiseGlow;
            const point = getPointOnPerimeter(hex.vertices, pos);
            if (i === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
          ctx.stroke();
        }
        
        // Counter-clockwise trail
        if (hex.counterClockwiseGlow > 0.004) {
          ctx.beginPath();
          const segments = 12;
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const pos = hex.entryPoint - t * hex.counterClockwiseGlow;
            const point = getPointOnPerimeter(hex.vertices, pos);
            if (i === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
          ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
      }
    }
    
    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hexGridRef.current = generateGrid(canvas.width, canvas.height);
    };

    const handlePointerMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
      pointerVelocityRef.current = { x: 0, y: 0 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [generateGrid, render]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ touchAction: "none" }}
    />
  );
}
