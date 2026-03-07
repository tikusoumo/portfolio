"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';

interface PlayButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function PlayButton({ children, className, onClick, ...props }: PlayButtonProps) {
  const { playClick, playHover } = useAudio();
  const { universe } = useGaming();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => playHover()}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
      className={cn(
        "relative group px-12 py-3 font-bold uppercase tracking-[0.15em] text-lg transition-all duration-300",
        universe === 'lol' && [
          "bg-[#1e2328] border-2 border-[#c8aa6e] text-[#f0e6d2] font-heading shadow-[0_0_10px_rgba(0,0,0,0.5)]",
          "hover:bg-[#1e282d] hover:text-[#f0e6d2] hover:shadow-[0_0_20px_rgba(200,170,110,0.4)]",
          "active:border-[#785a28] active:text-[#a09b8c]"
        ],
        universe === 'valorant' && [
          "bg-primary text-background font-mono rounded-none clip-path-slant shadow-md",
          "hover:bg-primary/90 hover:text-background hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] border-2 border-transparent",
          "active:scale-95"
        ],
        universe === 'cyberpunk' && [
          "bg-transparent border-2 border-accent text-accent font-mono shadow-[0_0_15px_hsl(var(--accent)/0.3)]",
          "hover:bg-accent hover:text-background hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)]",
          "active:scale-95"
        ],
        className
      )}
      {...props}
    >
      {/* LoL Inner decorations */}
      {universe === 'lol' && (
        <>
          <div className="absolute inset-[2px] border border-[#3c3c41] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#c8aa6e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-[#c8aa6e] shadow-[0_0_5px_#c8aa6e]" />
        </>
      )}

      {/* Cyberpunk Inner decorations */}
      {universe === 'cyberpunk' && (
        <>
          <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-accent/60 group-hover:border-background transition-colors pointer-events-none" />
          <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-accent/60 group-hover:border-background transition-colors pointer-events-none" />
        </>
      )}

      {/* Text content with drop shadow for LoL */}
      <span className={cn(
        "relative z-10",
        universe === 'lol' && "drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
      )}>
        {children}
      </span>
    </motion.button>
  );
}
