"use client";

import { useEffect, useRef, useCallback } from "react";

// Constants - hexagon geometry
const HEX_SIZE = 80; // Radius - ALL hexagons identical
const HEX_HEIGHT = HEX_SIZE * Math.sqrt(3);
const HEX_WIDTH = HEX_SIZE * 2;
const HORIZONTAL_SPACING = HEX_WIDTH * 0.75;
const VERTICAL_SPACING = HEX_HEIGHT;

// Animation constants
const MAX_LIGHT_DISTANCE = 0.4; // Max portion of perimeter to travel
const MIN_LIGHT_DISTANCE = 0.05;
const MAX_SPEED_THRESHOLD = 50; // pixels per frame for max effect
const FADE_DURATION_BASE = 300; // ms
const FADE_DURATION_FAST = 600; // ms for fast movements

interface Point {
  x: number;
  y: number;
}

interface HexCell {
  id: string;
  center: Point;
  vertices: Point[];
  path: string;
  pathLength: number;
}

interface LightAnimation {
  hexId: string;
  startOffset: number; // Where on the path (0-1) the light starts
  travelDistance: number; // How far to travel (0-1)
  speed: number; // Animation speed
  brightness: number;
  startTime: number;
  direction: 1 | -1; // clockwise or counter-clockwise
  cancelled: boolean;
}

function generateHexPath(cx: number, cy: number, size: number): { vertices: Point[]; path: string } {
  const vertices: Point[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    vertices.push({
      x: cx + size * Math.cos(angle),
      y: cy + size * Math.sin(angle),
    });
  }
  const path = `M ${vertices.map((v) => `${v.x},${v.y}`).join(" L ")} Z`;
  return { vertices, path };
}

function calculatePathLength(size: number): number {
  // Hexagon perimeter = 6 * side length
  return 6 * size;
}

function pointInHexagon(point: Point, center: Point, size: number): boolean {
  const dx = Math.abs(point.x - center.x);
  const dy = Math.abs(point.y - center.y);
  const hexHeight = size * Math.sqrt(3) / 2;
  
  if (dx > size || dy > hexHeight) return false;
  return size * hexHeight - hexHeight * dx - size * dy / 2 >= 0;
}

function findClosestEdgePoint(point: Point, vertices: Point[]): { offset: number; edgeIndex: number } {
  let minDist = Infinity;
  let closestOffset = 0;
  let closestEdgeIndex = 0;
  
  const sideLength = Math.sqrt(
    Math.pow(vertices[1].x - vertices[0].x, 2) + 
    Math.pow(vertices[1].y - vertices[0].y, 2)
  );
  const totalLength = 6 * sideLength;
  
  for (let i = 0; i < 6; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % 6];
    
    // Project point onto edge
    const edgeVec = { x: v2.x - v1.x, y: v2.y - v1.y };
    const pointVec = { x: point.x - v1.x, y: point.y - v1.y };
    const edgeLen = Math.sqrt(edgeVec.x * edgeVec.x + edgeVec.y * edgeVec.y);
    const t = Math.max(0, Math.min(1, (pointVec.x * edgeVec.x + pointVec.y * edgeVec.y) / (edgeLen * edgeLen)));
    
    const closest = {
      x: v1.x + t * edgeVec.x,
      y: v1.y + t * edgeVec.y,
    };
    
    const dist = Math.sqrt(Math.pow(point.x - closest.x, 2) + Math.pow(point.y - closest.y, 2));
    
    if (dist < minDist) {
      minDist = dist;
      closestEdgeIndex = i;
      closestOffset = (i * sideLength + t * sideLength) / totalLength;
    }
  }
  
  return { offset: closestOffset, edgeIndex: closestEdgeIndex };
}

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexGridRef = useRef<HexCell[]>([]);
  const pointerRef = useRef<Point>({ x: -1000, y: -1000 });
  const prevPointerRef = useRef<Point>({ x: -1000, y: -1000 });
  const pointerSpeedRef = useRef(0);
  const activeHexRef = useRef<string | null>(null);
  const animationsRef = useRef<LightAnimation[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  // Generate hexagonal grid
  const generateGrid = useCallback((width: number, height: number): HexCell[] => {
    const grid: HexCell[] = [];
    const cols = Math.ceil(width / HORIZONTAL_SPACING) + 2;
    const rows = Math.ceil(height / VERTICAL_SPACING) + 2;
    
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const isOffsetRow = row % 2 === 1;
        const cx = col * HORIZONTAL_SPACING + (isOffsetRow ? HORIZONTAL_SPACING / 2 : 0);
        const cy = row * VERTICAL_SPACING * 0.5 + HEX_SIZE;
        
        const { vertices, path } = generateHexPath(cx, cy, HEX_SIZE);
        
        grid.push({
          id: `hex-${row}-${col}`,
          center: { x: cx, y: cy },
          vertices,
          path,
          pathLength: calculatePathLength(HEX_SIZE),
        });
      }
    }
    
    return grid;
  }, []);

  // Find hexagon under pointer
  const findHexUnderPointer = useCallback((point: Point): HexCell | null => {
    for (const hex of hexGridRef.current) {
      if (pointInHexagon(point, hex.center, HEX_SIZE)) {
        return hex;
      }
    }
    return null;
  }, []);

  // Create light animation
  const createLightAnimation = useCallback((hex: HexCell, entryPoint: Point, speed: number) => {
    // Cancel any existing animations for this hex
    animationsRef.current = animationsRef.current.map(a => 
      a.hexId === hex.id ? { ...a, cancelled: true } : a
    );
    
    const { offset } = findClosestEdgePoint(entryPoint, hex.vertices);
    
    // Calculate brightness and travel distance based on speed
    const normalizedSpeed = Math.min(speed / MAX_SPEED_THRESHOLD, 1);
    const brightness = 0.1 + normalizedSpeed * 0.5; // 0.1 to 0.6
    const travelDistance = MIN_LIGHT_DISTANCE + normalizedSpeed * (MAX_LIGHT_DISTANCE - MIN_LIGHT_DISTANCE);
    const animSpeed = 0.3 + normalizedSpeed * 0.7; // Animation speed multiplier
    
    const now = performance.now();
    
    // Create bi-directional light (clockwise and counter-clockwise)
    animationsRef.current.push({
      hexId: hex.id,
      startOffset: offset,
      travelDistance: travelDistance / 2,
      speed: animSpeed,
      brightness: brightness * 0.7,
      startTime: now,
      direction: 1,
      cancelled: false,
    });
    
    animationsRef.current.push({
      hexId: hex.id,
      startOffset: offset,
      travelDistance: travelDistance / 2,
      speed: animSpeed,
      brightness: brightness * 0.7,
      startTime: now,
      direction: -1,
      cancelled: false,
    });
  }, []);

  // Main render loop
  const render = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    // Calculate pointer speed
    const dx = pointerRef.current.x - prevPointerRef.current.x;
    const dy = pointerRef.current.y - prevPointerRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    pointerSpeedRef.current = deltaTime > 0 ? distance / (deltaTime / 16.67) : 0;
    prevPointerRef.current = { ...pointerRef.current };
    
    // Find hex under pointer
    const hexUnderPointer = findHexUnderPointer(pointerRef.current);
    const newActiveHexId = hexUnderPointer?.id || null;
    
    // Handle hex transition
    if (newActiveHexId !== activeHexRef.current) {
      // Cancel animations for previous hex
      if (activeHexRef.current) {
        animationsRef.current = animationsRef.current.map(a =>
          a.hexId === activeHexRef.current ? { ...a, cancelled: true } : a
        );
      }
      
      // Start new animation if entering a hex with movement
      if (hexUnderPointer && pointerSpeedRef.current > 2) {
        createLightAnimation(hexUnderPointer, pointerRef.current, pointerSpeedRef.current);
      }
      
      activeHexRef.current = newActiveHexId;
    } else if (hexUnderPointer && pointerSpeedRef.current > 5) {
      // Trigger new animation on significant movement within same hex
      createLightAnimation(hexUnderPointer, pointerRef.current, pointerSpeedRef.current);
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0B0F1A");
    gradient.addColorStop(0.5, "#0E1624");
    gradient.addColorStop(1, "#0B0F1A");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw all hexagons (base stroke)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;
    
    for (const hex of hexGridRef.current) {
      ctx.beginPath();
      const v = hex.vertices;
      ctx.moveTo(v[0].x, v[0].y);
      for (let i = 1; i < 6; i++) {
        ctx.lineTo(v[i].x, v[i].y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    // Update and draw animations
    const fadeDuration = pointerSpeedRef.current > 20 ? FADE_DURATION_FAST : FADE_DURATION_BASE;
    
    animationsRef.current = animationsRef.current.filter(anim => {
      const elapsed = time - anim.startTime;
      const totalDuration = (anim.travelDistance * 1000) / anim.speed + fadeDuration;
      
      if (elapsed > totalDuration) return false;
      
      const hex = hexGridRef.current.find(h => h.id === anim.hexId);
      if (!hex) return false;
      
      // Calculate current progress
      const travelDuration = (anim.travelDistance * 1000) / anim.speed;
      const progress = Math.min(elapsed / travelDuration, 1);
      
      // Calculate fade
      let opacity = anim.brightness;
      if (anim.cancelled || elapsed > travelDuration) {
        const fadeElapsed = elapsed - travelDuration;
        opacity *= Math.max(0, 1 - fadeElapsed / fadeDuration);
      }
      
      if (opacity <= 0.01) return false;
      
      // Draw light trail
      const currentDistance = progress * anim.travelDistance;
      const trailLength = Math.min(currentDistance, 0.08); // Trail length
      
      const startPos = anim.startOffset + (anim.direction * currentDistance);
      const endPos = startPos - (anim.direction * trailLength);
      
      // Create gradient for trail
      const gradientStart = getPointOnPath(hex.vertices, startPos);
      const gradientEnd = getPointOnPath(hex.vertices, endPos);
      
      if (gradientStart && gradientEnd) {
        ctx.beginPath();
        
        // Draw arc segment
        const pathSegment = getPathSegment(hex.vertices, endPos, startPos, anim.direction);
        if (pathSegment.length > 1) {
          ctx.moveTo(pathSegment[0].x, pathSegment[0].y);
          for (let i = 1; i < pathSegment.length; i++) {
            ctx.lineTo(pathSegment[i].x, pathSegment[i].y);
          }
        }
        
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
        
        // Add glow
        ctx.shadowColor = `rgba(56, 189, 248, ${opacity * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      return true;
    });
    
    rafRef.current = requestAnimationFrame(render);
  }, [findHexUnderPointer, createLightAnimation]);

  // Get point on hexagon path at offset (0-1)
  function getPointOnPath(vertices: Point[], offset: number): Point | null {
    // Normalize offset to 0-1
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

  // Get path segment between two offsets
  function getPathSegment(vertices: Point[], start: number, end: number, direction: 1 | -1): Point[] {
    const points: Point[] = [];
    const steps = 20;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const offset = start + t * (end - start);
      const point = getPointOnPath(vertices, offset);
      if (point) points.push(point);
    }
    
    return points;
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
      // Cancel all animations on leave
      animationsRef.current = animationsRef.current.map(a => ({ ...a, cancelled: true }));
      activeHexRef.current = null;
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
