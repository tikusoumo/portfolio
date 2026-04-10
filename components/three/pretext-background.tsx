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

    let width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    let height = typeof window !== 'undefined' ? window.innerHeight : 800;
    let isMobile = width < 768;
    
    const dpr = window.devicePixelRatio || 1;
    
    // We'll declare these let vars so we can rebuild pretext on resize if needed
    let fontSize = isMobile ? 14 : 24;
    let lineHeight = isMobile ? 24 : 40;
    let fontStr = `bold ${fontSize}px 'Inter', system-ui, sans-serif`;
    let prepared: any;

    const buildPretext = () => {
      let baseText = "DEVELOPER DESIGNER SOFTWARE ENGINEER CREATIVE THINKER ARCHITECT PROBLEM SOLVER CODING ARTIST FULL STACK FRONTEND BACKEND ";
      let textToLayout = baseText;
      for (let i=0; i<60; i++) textToLayout += baseText;
      
      fontStr = `bold ${fontSize}px 'Inter', system-ui, sans-serif`;
      if (universe === 'lol') fontStr = `bold ${fontSize}px 'Georgia', serif`;
      if (universe === 'cyberpunk') fontStr = `bold ${fontSize}px 'Courier New', monospace`;
      if (universe === 'valorant') fontStr = `bold ${fontSize}px 'Arial', sans-serif`;

      prepared = prepareWithSegments(textToLayout, fontStr);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const newIsMobile = width < 768;
      if (newIsMobile !== isMobile) {
         isMobile = newIsMobile;
         fontSize = isMobile ? 14 : 24;
         lineHeight = isMobile ? 24 : 40;
         buildPretext();
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };
    buildPretext();
    handleResize();
    
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const hackerChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const scramble = (text: string) => {
       if (!isMobile) return text;
       let result = '';
       for (let i=0; i<text.length; i++) {
          if (text[i] !== ' ' && Math.random() < 0.05) {
             result += hackerChars[Math.floor(Math.random() * hackerChars.length)];
          } else {
             result += text[i];
          }
       }
       return result;
    };

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.font = fontStr;
      ctx.textBaseline = 'top';

      ctx.globalCompositeOperation = 'source-over';
      
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      
      // Animated scroll on mobile
      let time = performance.now();
      let scrollSpeed = isMobile ? 0.05 : 0;
      let yOffset = (time * scrollSpeed) % lineHeight;
      let y = -yOffset;

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
                    let text = scramble(line.text);
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
                    let text = scramble(line2.text);
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
                ctx.fillText(scramble(line.text), 0, y);
                cursor = range.end;
            } else {
                cursor = { segmentIndex: 0, graphemeIndex: 0 };
            }
         }

         y += lineHeight;
      }

      // Throttle exact frame rate on mobile to emphasize hacker style vs smooth scrolling
      if (isMobile) {
        setTimeout(() => {
           animationFrameId = requestAnimationFrame(render);
        }, 50);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
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
