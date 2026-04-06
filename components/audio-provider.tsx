"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';

interface AudioContextType {
  playClick: () => void;
  playHover: () => void;
  playQueuePop: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  const soundsRef = useRef<{
    playClick?: () => void;
    playHover?: () => void;
    playQueuePop?: () => void;
  }>({});

  // Initialize sounds AFTER first user interaction (lazy loading)
  const initSounds = () => {
    if (soundsLoaded) return;
    
    // Dynamically require useSound only when needed
    try {
      const clickHook = useSound('/sounds/click.mp3', { volume: 0.5, soundEnabled: !isMuted });
      const hoverHook = useSound('/sounds/hover.mp3', { volume: 0.1, soundEnabled: !isMuted, interrupt: true });
      const popHook = useSound('/sounds/queue-pop.mp3', { volume: 0.6, soundEnabled: !isMuted });
      
      soundsRef.current = {
        playClick: clickHook[0],
        playHover: hoverHook[0],
        playQueuePop: popHook[0],
      };
      setSoundsLoaded(true);
    } catch (e) {
      console.warn('Failed to load sounds:', e);
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedMute = localStorage.getItem('lol-portfolio-muted');
    if (savedMute) setIsMuted(JSON.parse(savedMute));

    // Initialize sounds on first user interaction instead of on mount
    const initOnInteraction = () => {
      initSounds();
      document.removeEventListener('click', initOnInteraction);
      document.removeEventListener('mousemove', initOnInteraction);
    };

    document.addEventListener('click', initOnInteraction, { once: true });
    document.addEventListener('mousemove', initOnInteraction, { once: true });

    return () => {
      document.removeEventListener('click', initOnInteraction);
      document.removeEventListener('mousemove', initOnInteraction);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => {
      const newState = !prev;
      localStorage.setItem('lol-portfolio-muted', JSON.stringify(newState));
      return newState;
    });
  };

  // Safe play functions that don't crash if sound fails to load
  const safePlay = (playFn?: () => void) => {
    if (mounted && !isMuted && playFn) {
      try {
        playFn();
      } catch (e) {
        // Ignore play errors (often due to autoplay policy)
      }
    }
  };

  return (
    <AudioContext.Provider value={{
      playClick: () => safePlay(soundsRef.current.playClick),
      playHover: () => safePlay(soundsRef.current.playHover),
      playQueuePop: () => safePlay(soundsRef.current.playQueuePop),
      isMuted,
      toggleMute
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
