"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useGaming } from '@/components/gaming-provider';

export function CustomCursor() {
  const { universe } = useGaming();
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const lastCheckTimeRef = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Direct DOM manipulation via framer-motion is much faster than React State
      cursorX.set(e.clientX - (universe === 'valorant' ? 16 : 12));
      cursorY.set(e.clientY - (universe === 'valorant' ? 16 : 4));
      
      // Throttle elementFromPoint() to every 200ms - prevents massive TBT from mousemove
      const now = Date.now();
      if (now - lastCheckTimeRef.current > 200) {
        lastCheckTimeRef.current = now;
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        if (hoveredElement) {
          const computedStyle = window.getComputedStyle(hoveredElement);
          setIsPointer(computedStyle.cursor === 'pointer');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [universe, cursorX, cursorY]);

  // Don't render on server
  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
         x: cursorX,
         y: cursorY,
      }}
      animate={{
        scale: isClicking ? 0.8 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        style={{ 
          filter: `drop-shadow(0 0 2px ${universe === 'valorant' ? '#FF4655' : universe === 'cyberpunk' ? '#00F0FF' : 'rgba(200, 155, 60, 0.5)'})` 
        }}
        className={isPointer ? "text-primary" : "text-primary"}
      >
        {universe === 'lol' && (
           isPointer ? (
             <g transform="translate(-1, -1)">
               <path d="M4 2 L14 22 L16 14 L24 12 Z" fill="currentColor" stroke="#0ac8b9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
             </g>
           ) : (
             <path d="M3 2 L11 20 L13 13 L20 11 Z" fill="currentColor" stroke="#091428" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           )
        )}

        {universe === 'valorant' && (
          <g transform="translate(4, 4)">
            {/* Simple Crosshair */}
            <circle cx="8" cy="8" r="2" fill="currentColor" />
            <rect x="7" y="2" width="2" height="4" fill="currentColor" />
            <rect x="7" y="10" width="2" height="4" fill="currentColor" />
            <rect x="2" y="7" width="4" height="2" fill="currentColor" />
            <rect x="10" y="7" width="4" height="2" fill="currentColor" />
            {isPointer && <circle cx="8" cy="8" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />}
          </g>
        )}

        {universe === 'cyberpunk' && (
          <g>
             {/* Glitch Arrow */}
             <path d="M2 2L12 18L14 10L22 8L2 2Z" fill="currentColor" />
             <path d="M6 6L16 22L18 14L26 12L6 6Z" stroke="cyan" strokeWidth="1" opacity="0.5" transform="translate(2, 2)" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
