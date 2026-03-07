"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Coins, Trophy, Zap, Terminal, Code2 } from 'lucide-react';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import social from '@/content/social.json';
import meta from '@/content/meta.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
  Instagram,
};

export function Footer() {
  const { playHover, playClick } = useAudio();
  const { universe } = useGaming();

  return (
    <footer className={cn(
       "relative border-t-2",
       universe === 'lol' && "bg-[#010a13] border-[#c8aa6e]",
       universe === 'valorant' && "bg-background border-primary",
       universe === 'cyberpunk' && "bg-background border-accent shadow-[0_-5px_15px_hsl(var(--accent)/0.2)]"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left: Chat/Version Info */}
          <div className="flex items-center gap-4">
             <div className={cn(
                "px-3 py-1 text-xs font-bold uppercase tracking-wider",
                universe === 'lol' && "bg-[#091428] border border-[#463714] text-[#a09b8c]",
                universe === 'valorant' && "bg-primary/10 border border-primary text-primary clip-path-slant font-mono",
                universe === 'cyberpunk' && "bg-accent/10 border border-accent text-accent font-mono"
             )}>
                V 14.23.1
             </div>
             <div className={cn(
                "w-2 h-2 rounded-full",
                universe === 'cyberpunk' ? "bg-accent shadow-[0_0_8px_hsl(var(--accent))]" : "bg-green-500 shadow-[0_0_5px_#0f0]"
             )} />
             <span className={cn(
                "text-xs uppercase tracking-wider",
                universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono"
             )}>Online</span>
          </div>

          {/* Center: Socials */}
          <div className="flex gap-4">
             {social.links.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                   <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                         "transition-colors p-2",
                         universe === 'lol' && "text-[#a09b8c] hover:text-[#c8aa6e]",
                         universe === 'valorant' && "text-muted-foreground hover:text-primary",
                         universe === 'cyberpunk' && "text-muted-foreground hover:text-accent hover:drop-shadow-[0_0_8px_hsl(var(--accent))]"
                      )}
                      onMouseEnter={() => playHover()}
                      onClick={() => playClick()}
                   >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                   </a>
                );
             })}
          </div>

          {/* Right: Currency Counters */}
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2" title={universe === 'lol' ? "Repositories (RP)" : universe === 'valorant' ? "Valorant Points (VP)" : "Street Cred"}>
                {universe === 'lol' && <Trophy className="w-4 h-4 text-[#c8aa6e]" />}
                {universe === 'valorant' && <Zap className="w-4 h-4 text-primary" />}
                {universe === 'cyberpunk' && <Terminal className="w-4 h-4 text-accent" />}
                
                <span className={cn(
                   "font-bold text-sm",
                   universe === 'lol' ? "text-[#f0e6d2] font-heading" : "text-foreground font-mono"
                )}>975</span>
                
                <span className={cn(
                   "text-xs font-bold",
                   universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono"
                )}>
                   {universe === 'lol' ? 'RP' : universe === 'valorant' ? 'VP' : 'SC'}
                </span>
             </div>
             
             <div className="flex items-center gap-2" title={universe === 'lol' ? "Commits (Blue Essence)" : universe === 'valorant' ? "Radianite (RP)" : "Eddies"}>
                {universe === 'lol' && <Coins className="w-4 h-4 text-[#0ac8b9]" />}
                {universe === 'valorant' && <Code2 className="w-4 h-4 text-accent" />}
                {universe === 'cyberpunk' && <Coins className="w-4 h-4 text-[#FCEE0A]" />}
                
                <span className={cn(
                   "font-bold text-sm",
                   universe === 'lol' ? "text-[#f0e6d2] font-heading" : "text-foreground font-mono"
                )}>14,500</span>
                
                <span className={cn(
                   "text-xs font-bold",
                   universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono"
                )}>
                   {universe === 'lol' ? 'BE' : universe === 'valorant' ? 'R' : 'E$'}
                </span>
             </div>
          </div>
      </div>
    </footer>
  );
}