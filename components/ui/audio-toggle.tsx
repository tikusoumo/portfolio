"use client";

import { useAudio } from '@/components/audio-provider';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioToggle() {
  const { isMuted, toggleMute, playClick, playHover } = useAudio();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        playClick();
        toggleMute();
      }}
      onMouseEnter={() => playHover()}
      className="p-2.5 rounded-sm border border-[#c8aa6e]/30 text-[#c8aa6e] hover:bg-[#c8aa6e]/10 hover:border-[#c8aa6e]/60 transition-all duration-300 relative group"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#c8aa6e]/50" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#c8aa6e]/50" />
      
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </motion.button>
  );
}
