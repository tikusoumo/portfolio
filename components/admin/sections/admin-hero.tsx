"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Save, Loader2 } from 'lucide-react';
import { ShaderBackground } from '@/components/three/shader-background';
import { PlayButton } from '@/components/ui/play-button';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import social from '@/content/social.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveContent } from '@/app/actions/cms';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
  Instagram,
};

export function AdminHero({ initialData, onSave }: { initialData: any, onSave?: () => void }) {
  const { playClick, playHover } = useAudio();
  const { universe } = useGaming();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent('hero.json', data);
    setSaving(false);
    if (result.success) {
      if (onSave) onSave();
    } else {
      alert('Failed to save.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background transition-colors duration-700">
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg backdrop-blur-md bg-background/50">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Hero
        </Button>
      </div>

      <ShaderBackground />
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-colors duration-700",
        universe === 'cyberpunk' ? "bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_95%)]" : "bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_85%)]"
      )} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-20">
        <div className="text-center relative max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8 pb-20 relative z-20 w-full"
          >
            <motion.h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold tracking-tight drop-shadow-lg mb-10 w-full flex flex-col items-center">
              <span className={cn(
                 "block pb-4 text-xl sm:text-2xl uppercase tracking-[0.5em] font-light w-full transition-colors duration-500",
                 universe === 'lol' ? "text-muted-foreground font-body" : "text-primary/80 font-mono"
              )}>
                <Input 
                  value={data.greeting} 
                  onChange={(e) => setData({ ...data, greeting: e.target.value })}
                  className="bg-transparent border-none text-center outline-none w-full text-xl sm:text-2xl uppercase tracking-[0.5em] font-body font-light shadow-none focus-visible:ring-1"
                />
              </span>
              <span className={cn(
                 "inline-block pb-2 px-4 whitespace-nowrap overflow-hidden transition-all duration-500 w-full max-w-lg mt-4",
                 universe === 'lol' && "bg-gradient-to-b from-primary via-primary/80 to-primary/50 bg-clip-text transform hover:scale-105",
                 universe === 'valorant' && "text-foreground glitch-text bg-background/50 px-8 py-2 border-l-4 border-r-4 border-primary uppercase tracking-widest clip-path-slant",
                 universe === 'cyberpunk' && "text-accent bg-surface/80 px-6 py-2 border-y-2 border-accent uppercase tracking-[0.2em] shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
              )}>
                <div className="text-sm tracking-normal font-sans text-muted-foreground mb-2" style={{ WebkitTextFillColor: 'currentColor' }}>Comma separated names (e.g. Developer, Designer):</div>
                <Input 
                  value={data.nameVariants.join(', ')} 
                  onChange={(e) => setData({ ...data, nameVariants: e.target.value.split(',').map(s => s.trim()) })}
                  className="bg-transparent border-primary/20 text-center outline-none w-full text-2xl sm:text-3xl font-heading font-bold shadow-none focus-visible:ring-1 text-primary placeholder:text-primary/50"
                  placeholder="Names..."
                  style={{ WebkitTextFillColor: 'currentColor' }}
                />
              </span>
            </motion.h1>

            <motion.div className="flex justify-center mt-8 pb-10">
               <div className="relative group">
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Edit Button Text</div>
                 <PlayButton onClick={() => {}}>
                   <input
                     value={data.ctaPrimary.text}
                     onChange={(e) => setData({ ...data, ctaPrimary: { ...data.ctaPrimary, text: e.target.value } })}
                     className="bg-transparent border-none text-center outline-none w-32 font-bold shadow-none focus:ring-0 text-foreground custom-input"
                     style={{ WebkitTextFillColor: 'currentColor' }}
                   />
                 </PlayButton>
               </div>
            </motion.div>

            <motion.div className="flex justify-center space-x-8 mt-12">
              {social.links.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <div key={link.name} className="text-muted-foreground">
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
