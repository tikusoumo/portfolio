"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { AudioToggle } from '@/components/ui/audio-toggle'; // New import
import { useGaming } from '@/components/gaming-provider';
import { useAudio } from '@/components/audio-provider';
import { cn } from '@/lib/utils';
import meta from '@/content/meta.json';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playClick, playHover } = useAudio();
  const { universe } = useGaming();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    playClick(); // Play sound
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-md'
          : 'bg-transparent'
      )}
    >
      {/* Top accent line */}
      <div className={cn(
        "h-[2px]",
        universe === 'lol' && "bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_hsl(var(--primary))]",
        universe === 'valorant' && "bg-primary w-full",
        universe === 'cyberpunk' && "bg-accent shadow-[0_0_8px_hsl(var(--accent))] w-full"
      )} />
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Taller header like client */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 group cursor-pointer"
            onClick={() => scrollToSection('#home')}
            onMouseEnter={() => playHover()}
          >
            {/* Logo area */}
            <div className={cn(
              "relative flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_hsl(var(--primary))]",
              universe === 'lol' ? "w-12 h-[52px] bg-[hsl(var(--background))] border-none" : 
              universe === 'valorant' ? "w-12 h-12 bg-primary text-background font-mono clip-path-slant" :
              "w-12 h-12 border border-accent bg-background shadow-[0_0_10px_hsl(var(--accent))]"
            )}
            style={universe === 'lol' ? { 
              clipPath: 'polygon(50% 100%, 0 80%, 0 0, 100% 0, 100% 80%)',
              background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--primary)/0.2) 100%)',
              borderTop: '2px solid hsl(var(--primary))'
            } : {}}>
              <div 
                className={cn(
                  "absolute inset-0 bg-primary/20",
                  universe !== 'lol' && "hidden"
                )} 
                style={{ clipPath: 'polygon(50% 100%, 0 80%, 0 0, 100% 0, 100% 80%)', transform: 'scale(0.9)' }} 
              />
              <span className={cn(
                "relative z-10 text-xl transition-colors duration-300 flex items-center justify-center leading-none",
                universe === 'lol' ? "font-serif font-black text-foreground group-hover:text-primary tracking-normal" :
                universe === 'valorant' ? "text-background font-bold tracking-widest" :
                "font-mono text-accent font-bold tracking-widest"
              )} style={universe === 'lol' ? { marginTop: '2px', marginLeft: '1px' } : {}}>
                {meta.initials}
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={cn(
               "ml-10 flex items-center space-x-1 px-4 pb-0",
               universe === 'lol' && "border-b border-primary/20"
            )}>
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.href)}
                  onMouseEnter={() => playHover()}
                  className={cn(
                     "relative px-6 py-4 uppercase text-sm group overflow-hidden transition-all duration-300",
                     universe === 'lol' ? "font-heading font-bold text-muted-foreground tracking-wider" :
                     universe === 'valorant' ? "font-mono font-bold text-muted-foreground hover:bg-primary hover:text-background" :
                     "font-mono text-muted-foreground hover:text-accent hover:border-b-2 hover:border-accent"
                  )}
                >
                  <span className={cn(
                     "relative z-10 transition-colors duration-300",
                     universe === 'lol' && "group-hover:text-foreground"
                  )}>
                    {item.name}
                  </span>
                  
                  {universe === 'lol' && (
                     <>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_10px_hsl(var(--primary))]" />
                     </>
                  )}
                  {universe === 'cyberpunk' && (
                     <div className="absolute inset-x-0 bottom-0 h-[1px] bg-accent translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <AudioToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  playClick();
                  setIsOpen(!isOpen);
                }}
                className="text-foreground hover:text-primary hover:bg-primary/10"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-primary/10 border-l-2 border-transparent hover:border-primary uppercase tracking-wider transition-all duration-200"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}