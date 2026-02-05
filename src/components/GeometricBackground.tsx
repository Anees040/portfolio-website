"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface Hexagon {
  id: string;
  cx: number;
  cy: number;
  size: number;
  rotation: number;
  path: string;
  isAnimating: boolean;
}

interface BeamState {
  hexId: string;
  progress: number;
  duration: number;
}

function generateHexagonPath(cx: number, cy: number, size: number, rotation: number = 0): string {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2 + (rotation * Math.PI) / 180;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    points.push([x, y]);
  }
  return `M ${points.map((p) => p.join(",")).join(" L ")} Z`;
}

function BeamPath({
  path,
  isActive,
  duration,
  onComplete,
}: {
  path: string;
  isActive: boolean;
  duration: number;
  onComplete: () => void;
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls
        .start({
          strokeDashoffset: [1, 0],
          opacity: [0, 1, 1, 0],
          transition: {
            duration: duration / 1000,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.1, 0.7, 1],
          },
        })
        .then(onComplete);
    }
  }, [isActive, controls, duration, onComplete]);

  if (!isActive) return null;

  return (
    <motion.path
      d={path}
      fill="none"
      stroke="url(#beamGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      initial={{ strokeDashoffset: 1, opacity: 0 }}
      animate={controls}
      style={{
        filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))",
      }}
    />
  );
}

export default function GeometricBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hexagons, setHexagons] = useState<Hexagon[]>([]);
  const [activeBeams, setActiveBeams] = useState<Map<string, BeamState>>(new Map());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const lastTriggerRef = useRef<Map<string, number>>(new Map());

  // Generate hexagon layout - large scale, few shapes
  const generateHexagons = useCallback((width: number, height: number): Hexagon[] => {
    const hexes: Hexagon[] = [];
    const baseSize = Math.min(width, height) * 0.35; // Large hexagons - 35% of viewport
    
    // 3-column organic rhythm layout
    const positions = [
      // Row 1 - left and right aligned, center offset up
      { x: 0.15, y: 0.3, sizeMultiplier: 1, rotation: 0 },
      { x: 0.5, y: 0.15, sizeMultiplier: 0.85, rotation: 15 },
      { x: 0.85, y: 0.3, sizeMultiplier: 0.95, rotation: -10 },
      // Row 2 - staggered
      { x: 0.25, y: 0.7, sizeMultiplier: 0.9, rotation: 5 },
      { x: 0.75, y: 0.75, sizeMultiplier: 1.05, rotation: -5 },
      // Subtle variance positions
      { x: 0.5, y: 0.55, sizeMultiplier: 0.7, rotation: 30 },
    ];

    positions.forEach((pos, index) => {
      // Add tiny variance for organic feel
      const variance = 0.02;
      const cx = (pos.x + (Math.random() - 0.5) * variance) * width;
      const cy = (pos.y + (Math.random() - 0.5) * variance) * height;
      const size = baseSize * pos.sizeMultiplier;
      
      hexes.push({
        id: `hex-${index}`,
        cx,
        cy,
        size,
        rotation: pos.rotation,
        path: generateHexagonPath(cx, cy, size, pos.rotation),
        isAnimating: false,
      });
    });

    return hexes;
  }, []);

  // Initialize and handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        setHexagons(generateHexagons(width, height));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [generateHexagons]);

  // Handle mouse movement and proximity detection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check proximity to hexagons
      hexagons.forEach((hex) => {
        const dx = e.clientX - hex.cx;
        const dy = e.clientY - hex.cy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const proximityThreshold = hex.size * 1.2;

        if (distance < proximityThreshold) {
          const lastTrigger = lastTriggerRef.current.get(hex.id) || 0;
          const now = Date.now();
          
          // Cooldown: Don't re-trigger too quickly
          if (now - lastTrigger > 1500 && !activeBeams.has(hex.id)) {
            // Limit active beams to 5
            if (activeBeams.size < 5) {
              const duration = 600 + Math.random() * 600; // 600-1200ms
              setActiveBeams((prev) => {
                const next = new Map(prev);
                next.set(hex.id, { hexId: hex.id, progress: 0, duration });
                return next;
              });
              lastTriggerRef.current.set(hex.id, now);
            }
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hexagons, activeBeams]);

  // Handle beam completion
  const handleBeamComplete = useCallback((hexId: string) => {
    setActiveBeams((prev) => {
      const next = new Map(prev);
      next.delete(hexId);
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: "linear-gradient(135deg, #0B0F1A 0%, #0E1624 50%, #0B0F1A 100%)",
      }}
    >
      {/* Subtle ambient gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)",
        }}
      />

      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Beam gradient */}
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="20%" stopColor="rgba(56, 189, 248, 0.8)" />
            <stop offset="50%" stopColor="rgba(96, 165, 250, 1)" />
            <stop offset="80%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static hexagon strokes - very subtle */}
        {hexagons.map((hex) => (
          <path
            key={hex.id}
            d={hex.path}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="0.5"
          />
        ))}

        {/* Animated beam paths */}
        {hexagons.map((hex) => (
          <BeamPath
            key={`beam-${hex.id}`}
            path={hex.path}
            isActive={activeBeams.has(hex.id)}
            duration={activeBeams.get(hex.id)?.duration || 800}
            onComplete={() => handleBeamComplete(hex.id)}
          />
        ))}
      </svg>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(11, 15, 26, 0.4) 100%)",
        }}
      />
    </div>
  );
}
