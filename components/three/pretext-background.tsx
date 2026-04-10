"use client";

import { useEffect, useRef } from 'react';
import { prepareWithSegments, layoutNextLineRange, materializeLineRange } from '@chenglou/pretext';
import type { LayoutCursor } from '@chenglou/pretext';
import { useGaming } from '@/components/gaming-provider';

export function PretextBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { universe } = useGaming();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const dpr = window.devicePixelRatio || 1;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };
    handleResize();
    
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const baseText = "DEVELOPER DESIGNER SOFTWARE ENGINEER CREATIVE THINKER ARCHITECT PROBLEM SOLVER CODING ARTIST FULL STACK FRONTEND BACKEND ";
    let textToLayout = baseText;
    for (let i=0; i<50; i++) textToLayout += baseText;
    
    let fontStr = "bold 25px 'Inter', system-ui, sans-serif";
    if (universe === 'lol') fontStr = "bold 25px 'Georgia', serif";
    if (universe === 'cyberpunk') fontStr = "bold 25px 'Courier New', monospace";
    if (universe === 'valorant') fontStr = "bold 25px 'Arial', sans-serif";

    // Prepare the text via pretext
    const prepared = prepareWithSegments(textToLayout, fontStr);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const lineHeight = 40;
      ctx.font = fontStr;
      ctx.textBaseline = 'top';

      ctx.globalCompositeOperation = 'source-over';
      
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      let y = 0;
      const radius = 80;

      // Optional subtle glow behind mouse
      const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius);
      glow.addColorStop(0, universe === 'valorant' ? 'rgba(255, 70, 85, 0.08)' : universe === 'cyberpunk' ? 'rgba(255, 255, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(mouseX - radius, mouseY - radius, radius * 2, radius * 2);

      while (y < height + lineHeight) {
         const dy = Math.abs(y + lineHeight/2 - mouseY);
         
         let alpha = 0.05;
         if (universe === 'valorant') alpha = 0.08;
         if (universe === 'cyberpunk') alpha = 0.1;
         
         ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
         if (universe === 'valorant') ctx.fillStyle = `rgba(255, 100, 100, ${alpha})`;
         if (universe === 'cyberpunk') ctx.fillStyle = `rgba(255, 255, 100, ${alpha})`;

         if (dy < radius) {
            const dx = Math.sqrt(radius * radius - dy * dy);
            const repelForce = 25; 
            const leftWidth = mouseX - dx - repelForce;
            const rightX = mouseX + dx + repelForce;
            const rightWidth = width - rightX;

            if (leftWidth > 20) {
                const range = layoutNextLineRange(prepared, cursor, leftWidth);
                if (range) {
                    const line = materializeLineRange(prepared, range);
                    let text = line.text;
                    ctx.fillText(text, 0, y);
                    cursor = range.end;
                } else {
                    cursor = { segmentIndex: 0, graphemeIndex: 0 };
                }
            }

            if (rightWidth > 20) {
                const range2 = layoutNextLineRange(prepared, cursor, rightWidth);
                if (range2) {
                    const line2 = materializeLineRange(prepared, range2);
                    let text = line2.text;
                    ctx.fillText(text, rightX, y);
                    cursor = range2.end;
                } else {
                    cursor = { segmentIndex: 0, graphemeIndex: 0 };
                }
            }

         } else {
            const range = layoutNextLineRange(prepared, cursor, width);
            if (range) {
                const line = materializeLineRange(prepared, range);
                ctx.fillText(line.text, 0, y);
                cursor = range.end;
            } else {
                cursor = { segmentIndex: 0, graphemeIndex: 0 };
            }
         }

         y += lineHeight;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [universe]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen"
    />
  );
}
