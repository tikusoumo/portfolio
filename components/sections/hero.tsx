"use client";

import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { OptimizedBackground } from '@/components/three/optimized-background';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';
import { PlayButton } from '@/components/ui/play-button';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import hero from '@/content/hero.json';
import social from '@/content/social.json';
import { useEffect, useState } from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
  Instagram,
};

export function Hero() {
  const { playClick, playHover } = useAudio();
  const { universe } = useGaming();
  const [showAnimations, setShowAnimations] = useState(false);

  // Defer animations until after first paint
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimations(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background transition-colors duration-700">
      {/* Optimized CSS-based background for better performance */}
      <OptimizedBackground />
      
      {/* Radial overlay */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-colors duration-700",
        universe === 'cyberpunk' ? "bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_95%)]" : "bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_85%)]"
      )} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-40">
        <div className="text-center relative">
          
          {/* Static content - no animations on first render */}
          <div className="space-y-8 pb-20 relative z-20">
            {/* Greeting */}
            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold tracking-tight drop-shadow-lg mb-10 mx-auto max-w-[90vw]"
              style={!showAnimations ? { willChange: 'auto' } : { willChange: 'transform' }}
            >
              <span className={cn(
                 "block pb-4 text-xl sm:text-2xl uppercase tracking-[0.5em] font-light transition-colors duration-500",
                 universe === 'lol' ? "text-muted-foreground font-body" : "text-primary/80 font-mono"
              )}>
                {hero.greeting}
              </span>
              <span className={cn(
                 "inline-block pb-2 px-4 whitespace-nowrap overflow-hidden transition-all duration-500",
                 universe === 'lol' && "bg-gradient-to-b from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent transform hover:scale-105",
                 universe === 'valorant' && "text-foreground glitch-text bg-background/50 px-8 py-2 border-l-4 border-r-4 border-primary uppercase tracking-widest clip-path-slant",
                 universe === 'cyberpunk' && "text-accent bg-surface/80 px-6 py-2 border-y-2 border-accent uppercase tracking-[0.2em] shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
              )}>
                {showAnimations ? (
                  <ContainerTextFlip words={hero.nameVariants} />
                ) : (
                  hero.nameVariants[0]
                )}
              </span>
            </h1>
            
            {/* Play Button CTA - No animation on first render */}
            <div className="flex justify-center mt-8 pb-10">
              <PlayButton
                onClick={() => document.querySelector(hero.ctaPrimary.scrollTo)?.scrollIntoView({ behavior: 'smooth' })}
              >
                {hero.ctaPrimary.text}
              </PlayButton>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-8 mt-12">
              {social.links.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_5px_hsl(var(--primary)/0.5)] transform hover:scale-110"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}