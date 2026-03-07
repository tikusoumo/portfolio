"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Initialize sounds with volume control
  // Note: These paths assume files exist in public/sounds/
  // I will create a setup script to generate/download placeholders if missing
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.1, soundEnabled: !isMuted, interrupt: true });
  const [playQueuePop] = useSound('/sounds/queue-pop.mp3', { volume: 0.6, soundEnabled: !isMuted });

  useEffect(() => {
    setMounted(true);
    const savedMute = localStorage.getItem('lol-portfolio-muted');
    if (savedMute) setIsMuted(JSON.parse(savedMute));
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => {
      const newState = !prev;
      localStorage.setItem('lol-portfolio-muted', JSON.stringify(newState));
      return newState;
    });
  };

  // Safe play functions that don't crash if sound fails to load
  const safePlay = (playFn: () => void) => {
    if (mounted && !isMuted) {
      try {
        playFn();
      } catch (e) {
        // Ignore play errors (often due to autoplay policy)
      }
    }
  };

  return (
    <AudioContext.Provider value={{
      playClick: () => safePlay(playClick),
      playHover: () => safePlay(playHover),
      playQueuePop: () => safePlay(playQueuePop),
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
