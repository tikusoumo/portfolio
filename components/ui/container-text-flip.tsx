"use client";

import React, { useState, useEffect, useId } from "react";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useGaming } from "@/components/gaming-provider";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const [mounted, setMounted] = useState(false);
  const textRef = React.useRef(null);
  const { universe } = useGaming();

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      // @ts-ignore
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  // Only start animations after mount
  useEffect(() => {
    setMounted(true);
    updateWidthForWord();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval, mounted]);

  return (
    <motion.p
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl dark:text-white",
        "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb) ]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:[background:linear-gradient(to_bottom,#111827,#1f2937) opacity-80]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        universe === 'lol' && "font-heading",
        (universe === 'valorant' || universe === 'cyberpunk') && "font-mono font-bold tracking-tight",
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={mounted ? {
                opacity: 0,
                filter: "blur(10px)",
              } : undefined}
              animate={mounted ? {
                opacity: 1,
                filter: "blur(0px)",
              } : undefined}
              transition={mounted ? {
                delay: index * 0.02,
              } : undefined}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.p>
  );
}
