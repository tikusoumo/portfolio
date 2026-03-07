"use client";

import { motion } from 'framer-motion';
import { useGaming, ThemeUniverse } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import { Gamepad2, Sword, Cpu } from 'lucide-react';

export function ThemeSelector() {
  const { universe, setUniverse } = useGaming();

  const themes: { id: ThemeUniverse; icon: React.ComponentType<any>; label: string; color: string }[] = [
    { id: 'lol', icon: Sword, label: 'League', color: '#C89B3C' },
    { id: 'valorant', icon: Gamepad2, label: 'Tactical', color: '#FF4655' },
    { id: 'cyberpunk', icon: Cpu, label: 'Netrunner', color: '#FCEE0A' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <div className="bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 flex flex-col gap-2 shadow-2xl">
        {themes.map((theme) => {
          const isActive = universe === theme.id;
          const Icon = theme.icon;
          
          return (
            <motion.button
              key={theme.id}
              onClick={() => setUniverse(theme.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all relative group",
                isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              )}
              style={{
                borderColor: isActive ? theme.color : 'transparent',
                borderWidth: isActive ? 2 : 0,
              }}
              title={theme.label}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <span className="absolute right-full mr-2 px-2 py-1 rounded bg-black/90 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                {theme.label}
              </span>
              
              {/* Active Glow */}
              {isActive && (
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-50 -z-10"
                  style={{ backgroundColor: theme.color }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
