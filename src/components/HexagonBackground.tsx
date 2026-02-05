"use client";

import { useEffect, useRef, useCallback } from "react";

interface Hexagon {
  x: number;
  y: number;
  glow: number;
  targetGlow: number;
}

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);

  const hexSize = 30;
  const hexHeight = hexSize * Math.sqrt(3);
  const hexWidth = hexSize * 2;
  const glowRadius = 150;

  const drawHexagon = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      glow: number
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();

      // Glow effect
      if (glow > 0.01) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${glow * 0.3})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${glow * 0.2})`);
        gradient.addColorStop(1, `rgba(168, 85, 247, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Border
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + glow * 0.15})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    },
    []
  );

  const initHexagons = useCallback(
    (width: number, height: number) => {
      const hexagons: Hexagon[] = [];
      const cols = Math.ceil(width / (hexWidth * 0.75)) + 2;
      const rows = Math.ceil(height / hexHeight) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);
          hexagons.push({ x, y, glow: 0, targetGlow: 0 });
        }
      }
      return hexagons;
    },
    [hexWidth, hexHeight]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hexagonsRef.current.forEach((hex) => {
      const dx = mouseRef.current.x - hex.x;
      const dy = mouseRef.current.y - hex.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate target glow based on distance
      hex.targetGlow = distance < glowRadius ? 1 - distance / glowRadius : 0;

      // Smooth transition
      hex.glow += (hex.targetGlow - hex.glow) * 0.1;

      // Fade out
      if (hex.targetGlow === 0) {
        hex.glow *= 0.95;
      }

      drawHexagon(ctx, hex.x, hex.y, hexSize, hex.glow);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [drawHexagon, hexSize, glowRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hexagonsRef.current = initHexagons(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initHexagons]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
