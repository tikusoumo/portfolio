"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeUniverse = 'lol' | 'valorant' | 'cyberpunk';

interface UniverseTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  sounds: {
    click: string;
    hover: string;
    action: string;
  };
}

const universes: Record<ThemeUniverse, UniverseTheme> = {
  lol: {
    name: 'League of Legends',
    colors: {
      primary: '#C89B3C', // Gold
      secondary: '#091428', // Dark Blue
      accent: '#0AC8B9', // Teal
      background: '#010A13',
      surface: '#1E2328',
      text: '#F0E6D2',
      muted: '#A09B8C',
      border: '#785A28',
    },
    fonts: {
      heading: 'var(--font-cinzel)',
      body: 'var(--font-inter)',
    },
    sounds: {
      click: '/sounds/lol-click.mp3',
      hover: '/sounds/lol-hover.mp3',
      action: '/sounds/lol-queue.mp3',
    },
  },
  valorant: {
    name: 'Valorant Protocol',
    colors: {
      primary: '#FF4655', // Val Red
      secondary: '#0F1923', // Dark Blue Grey
      accent: '#ECE8E1', // Off White
      background: '#0F1923',
      surface: '#1F272F', // Slightly lighter
      text: '#ECE8E1',
      muted: '#8B978F', // Muted sage
      border: '#FF4655', // Red borders
    },
    fonts: {
      heading: 'var(--font-tungsten)', // Need to add
      body: 'var(--font-inter)',
    },
    sounds: {
      click: '/sounds/val-click.mp3',
      hover: '/sounds/val-hover.mp3',
      action: '/sounds/val-match.mp3',
    },
  },
  cyberpunk: {
    name: 'Night City',
    colors: {
      primary: '#FCEE0A', // Cyber Yellow
      secondary: '#000000',
      accent: '#00F0FF', // Cyan
      background: '#050505',
      surface: '#121212',
      text: '#FCEE0A',
      muted: '#333333',
      border: '#00F0FF',
    },
    fonts: {
      heading: 'var(--font-orbitron)', // Sci-fi
      body: 'var(--font-inter)',
    },
    sounds: {
      click: '/sounds/cyber-click.mp3',
      hover: '/sounds/cyber-hover.mp3',
      action: '/sounds/cyber-hack.mp3',
    },
  },
};

interface GamingContextType {
  universe: ThemeUniverse;
  setUniverse: (u: ThemeUniverse) => void;
  theme: UniverseTheme;
}

const GamingContext = createContext<GamingContextType | undefined>(undefined);

export function GamingProvider({ children }: { children: React.ReactNode }) {
  const [universe, setUniverse] = useState<ThemeUniverse>('valorant');

  useEffect(() => {
    // Helper to convert hex to HSL for shadcn compatibility
    const hexToHsl = (hex: string) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt("0x" + hex[1] + hex[1]);
        g = parseInt("0x" + hex[2] + hex[2]);
        b = parseInt("0x" + hex[3] + hex[3]);
      } else if (hex.length === 7) {
        r = parseInt("0x" + hex[1] + hex[2]);
        g = parseInt("0x" + hex[3] + hex[4]);
        b = parseInt("0x" + hex[5] + hex[6]);
      }
      r /= 255; g /= 255; b /= 255;
      const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
      let h = 0, s = 0, l = 0;

      if (delta === 0) h = 0;
      else if (cmax === r) h = ((g - b) / delta) % 6;
      else if (cmax === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      l = (cmax + cmin) / 2;
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
      return `${h} ${s}% ${l}%`;
    };

    const theme = universes[universe];
    const root = document.documentElement;

    // Set colors (converted to HSL for Shadcn)
    root.style.setProperty('--primary', hexToHsl(theme.colors.primary));
    root.style.setProperty('--secondary', hexToHsl(theme.colors.secondary));
    root.style.setProperty('--accent', hexToHsl(theme.colors.accent));
    root.style.setProperty('--background', hexToHsl(theme.colors.background));
    root.style.setProperty('--foreground', hexToHsl(theme.colors.text));
    root.style.setProperty('--muted', hexToHsl(theme.colors.muted));
    root.style.setProperty('--border', hexToHsl(theme.colors.border));
    
    // Set fonts
    if (theme.fonts.heading.startsWith('var')) {
       // It's a variable reference, we assume it's already set by Next.js font loader
       // But we might want to change the variable mapping if we had dynamic font loading
    }

  }, [universe]);

  return (
    <GamingContext.Provider value={{ universe, setUniverse, theme: universes[universe] }}>
      {children}
    </GamingContext.Provider>
  );
}

export const useGaming = () => {
  const context = useContext(GamingContext);
  if (!context) throw new Error('useGaming must be used within GamingProvider');
  return context;
};
