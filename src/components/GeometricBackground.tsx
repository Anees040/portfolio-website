"use client";

import { useEffect, useRef, useCallback } from "react";

// Constants - hexagon geometry
const HEX_SIZE = 80;
const HEX_HEIGHT = HEX_SIZE * Math.sqrt(3);
const HORIZONTAL_SPACING = HEX_SIZE * 1.5;
const VERTICAL_SPACING = HEX_HEIGHT;

// Animation constants
const PROXIMITY_THRESHOLD = HEX_SIZE * 1.2;
const MAX_INTENSITY = 0.6;
const FADE_SPEED = 0.03; // How fast light fades when pointer leaves
const GROW_SPEED = 0.08; // How fast light grows when pointer is near

interface Point {
  x: number;
  y: number;
}

interface HexCell {
  id: string;
  center: Point;
  vertices: Point[];
}

interface LightState {
  hexId: string;
  intensity: number; // 0-1, derived from pointer proximity
  headPosition: number; // 0-1, position along path
  tailPosition: number; // 0-1, trailing edge
  clockwise: number; // head position clockwise
  counterClockwise: number; // head position counter-clockwise
}

function generateHexVertices(cx: number, cy: number, size: number): Point[] {
  const vertices: Point[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    vertices.push({
      x: cx + size * Math.cos(angle),
      y: cy + size * Math.sin(angle),
    });
  }
  return vertices;
}

function pointInHexagon(point: Point, center: Point, size: number): boolean {
  const dx = Math.abs(point.x - center.x);
  const dy = Math.abs(point.y - center.y);
  const hexHeight = size * Math.sqrt(3) / 2;
  if (dx > size || dy > hexHeight) return false;
  return size * hexHeight - hexHeight * dx - size * dy / 2 >= 0;
}

function distanceToHexCenter(point: Point, center: Point): number {
  return Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
}

function findClosestEdgeOffset(point: Point, vertices: Point[]): number {
  const sideLength = Math.sqrt(
    Math.pow(vertices[1].x - vertices[0].x, 2) +
    Math.pow(vertices[1].y - vertices[0].y, 2)
  );
  const totalLength = 6 * sideLength;
  
  let minDist = Infinity;
  let closestOffset = 0;
  
  for (let i = 0; i < 6; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % 6];
    const edgeVec = { x: v2.x - v1.x, y: v2.y - v1.y };
    const pointVec = { x: point.x - v1.x, y: point.y - v1.y };
    const edgeLen = Math.sqrt(edgeVec.x * edgeVec.x + edgeVec.y * edgeVec.y);
    const t = Math.max(0, Math.min(1, (pointVec.x * edgeVec.x + pointVec.y * edgeVec.y) / (edgeLen * edgeLen)));
    
    const closest = { x: v1.x + t * edgeVec.x, y: v1.y + t * edgeVec.y };
    const dist = Math.sqrt(Math.pow(point.x - closest.x, 2) + Math.pow(point.y - closest.y, 2));
    
    if (dist < minDist) {
      minDist = dist;
      closestOffset = (i * sideLength + t * sideLength) / totalLength;
    }
  }
  
  return closestOffset;
}

function getPointOnPath(vertices: Point[], offset: number): Point {
  let normalizedOffset = offset % 1;
  if (normalizedOffset < 0) normalizedOffset += 1;
  
  const sideLength = Math.sqrt(
    Math.pow(vertices[1].x - vertices[0].x, 2) +
    Math.pow(vertices[1].y - vertices[0].y, 2)
  );
  const totalLength = 6 * sideLength;
  const targetLength = normalizedOffset * totalLength;
  
  let accumulated = 0;
  for (let i = 0; i < 6; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % 6];
    if (accumulated + sideLength >= targetLength) {
      const t = (targetLength - accumulated) / sideLength;
      return {
        x: v1.x + t * (v2.x - v1.x),
        y: v1.y + t * (v2.y - v1.y),
      };
    }
    accumulated += sideLength;
  }
  return vertices[0];
}

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexGridRef = useRef<HexCell[]>([]);
  const pointerRef = useRef<Point>({ x: -1000, y: -1000 });
  const prevPointerRef = useRef<Point>({ x: -1000, y: -1000 });
  const lightStatesRef = useRef<Map<string, LightState>>(new Map());
  const rafRef = useRef<number | null>(null);
  const themeRef = useRef<'dark' | 'light'>('dark');

  // Generate hexagonal grid
  const generateGrid = useCallback((width: number, height: number): HexCell[] => {
    const grid: HexCell[] = [];
    const cols = Math.ceil(width / HORIZONTAL_SPACING) + 2;
    const rows = Math.ceil(height / (VERTICAL_SPACING * 0.5)) + 2;
    
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const isOffsetRow = row % 2 === 1;
        const cx = col * HORIZONTAL_SPACING + (isOffsetRow ? HORIZONTAL_SPACING / 2 : 0);
        const cy = row * VERTICAL_SPACING * 0.5 + HEX_SIZE;
        
        grid.push({
          id: `hex-${row}-${col}`,
          center: { x: cx, y: cy },
          vertices: generateHexVertices(cx, cy, HEX_SIZE),
        });
      }
    }
    return grid;
  }, []);

  // Main render loop - pointer-state driven
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check theme from document
    const isDark = !document.documentElement.classList.contains('light');
    themeRef.current = isDark ? 'dark' : 'light';
    
    // Calculate pointer velocity
    const dx = pointerRef.current.x - prevPointerRef.current.x;
    const dy = pointerRef.current.y - prevPointerRef.current.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    prevPointerRef.current = { ...pointerRef.current };
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (themeRef.current === 'dark') {
      gradient.addColorStop(0, "#0B0F1A");
      gradient.addColorStop(0.5, "#0E1624");
      gradient.addColorStop(1, "#0B0F1A");
    } else {
      gradient.addColorStop(0, "#f8fafc");
      gradient.addColorStop(0.5, "#f1f5f9");
      gradient.addColorStop(1, "#f8fafc");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Process each hexagon
    for (const hex of hexGridRef.current) {
      const distance = distanceToHexCenter(pointerRef.current, hex.center);
      const isPointerInside = pointInHexagon(pointerRef.current, hex.center, HEX_SIZE);
      const isPointerNear = distance < PROXIMITY_THRESHOLD;
      
      // Get or create light state
      let lightState = lightStatesRef.current.get(hex.id);
      
      if (isPointerNear || isPointerInside) {
        // Calculate target intensity based on proximity
        const proximityFactor = 1 - Math.min(distance / PROXIMITY_THRESHOLD, 1);
        const velocityBonus = Math.min(velocity / 30, 0.4);
        const targetIntensity = Math.min(proximityFactor * 0.8 + velocityBonus, MAX_INTENSITY);
        
        if (!lightState) {
          // Create new light state
          const entryOffset = findClosestEdgeOffset(pointerRef.current, hex.vertices);
          lightState = {
            hexId: hex.id,
            intensity: 0.1,
            headPosition: entryOffset,
            tailPosition: entryOffset,
            clockwise: entryOffset,
            counterClockwise: entryOffset,
          };
          lightStatesRef.current.set(hex.id, lightState);
        }
        
        // Grow intensity toward target
        lightState.intensity += (targetIntensity - lightState.intensity) * GROW_SPEED;
        
        // Advance light heads based on velocity
        const advance = 0.003 + (velocity / 500) * 0.01;
        lightState.clockwise = (lightState.clockwise + advance) % 1;
        lightState.counterClockwise = (lightState.counterClockwise - advance + 1) % 1;
        
      } else if (lightState) {
        // Pointer left - fade immediately
        lightState.intensity *= (1 - FADE_SPEED);
        
        // Remove if faded
        if (lightState.intensity < 0.01) {
          lightStatesRef.current.delete(hex.id);
          lightState = undefined;
        }
      }
      
      // Draw base hexagon stroke
      ctx.beginPath();
      ctx.moveTo(hex.vertices[0].x, hex.vertices[0].y);
      for (let i = 1; i < 6; i++) {
        ctx.lineTo(hex.vertices[i].x, hex.vertices[i].y);
      }
      ctx.closePath();
      ctx.strokeStyle = themeRef.current === 'dark' 
        ? "rgba(255, 255, 255, 0.05)" 
        : "rgba(30, 58, 95, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Draw light effect if active
      if (lightState && lightState.intensity > 0.01) {
        const glowColor = themeRef.current === 'dark'
          ? `rgba(56, 189, 248, ${lightState.intensity})`
          : `rgba(37, 99, 235, ${lightState.intensity * 0.7})`;
        
        // Draw clockwise trail
        drawLightTrail(ctx, hex.vertices, lightState.clockwise, 0.08, glowColor, lightState.intensity);
        
        // Draw counter-clockwise trail  
        drawLightTrail(ctx, hex.vertices, lightState.counterClockwise, -0.08, glowColor, lightState.intensity);
      }
    }
    
    rafRef.current = requestAnimationFrame(render);
  }, []);

  function drawLightTrail(
    ctx: CanvasRenderingContext2D,
    vertices: Point[],
    headOffset: number,
    trailLength: number,
    color: string,
    intensity: number
  ) {
    const steps = 12;
    const points: Point[] = [];
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const offset = headOffset - t * trailLength;
      points.push(getPointOnPath(vertices, offset));
    }
    
    if (points.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 + intensity;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    // Glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 6 + intensity * 8;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Initialize
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
      pointerRef.current = { x: -1000, y: -1000 };
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
    />
  );
}
