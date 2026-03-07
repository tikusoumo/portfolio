"use client";

import { motion } from 'framer-motion';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import skills from '@/content/skills.json';

export function Skills() {
  const { playHover } = useAudio();
  const { universe } = useGaming();

  const isSciFi = universe === 'valorant' || universe === 'cyberpunk';

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background transition-colors duration-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            "text-3xl sm:text-4xl font-bold mb-4 tracking-wider drop-shadow-md transition-all duration-500",
            isSciFi ? "font-mono uppercase text-primary glitch-text" : "font-heading text-foreground"
          )}>
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-b",
              isSciFi ? "from-primary via-primary to-transparent" : "from-foreground to-primary"
            )}>
              {skills.heading}
            </span>
          </h2>
          <div className={cn(
            "w-48 mx-auto h-[2px] mb-4 transition-all duration-500",
            isSciFi ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))]" : "bg-gradient-to-r from-transparent via-primary to-transparent"
          )} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            {skills.subtitle}
          </p>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-1"
            >
              {/* Card Container - Styles switch based on Theme */}
              <div className={cn(
                "relative p-6 h-full transition-all duration-500 group overflow-hidden",
                isSciFi 
                  ? "bg-background/80 border border-primary/50 hover:border-primary clip-path-polygon" 
                  : "bg-surface border border-boder shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-lg"
              )}>
                {/* Background Texture */}
                <div className={cn(
                  "absolute inset-0 opacity-20 transition-all duration-500",
                  isSciFi 
                    ? "bg-[linear-gradient(90deg,transparent_50%,hsl(var(--primary)/0.1)_50%)] bg-[length:4px_4px]" 
                    : "bg-[radial-gradient(circle,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[length:20px_20px]"
                )} />
                
                {/* Header Decoration */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center text-xl transition-all duration-300",
                    isSciFi 
                      ? "bg-primary/20 text-primary border border-primary rounded-none" 
                      : "bg-surface border border-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
                  )}>
                    {category.icon}
                  </div>
                  <h3 className={cn(
                    "text-lg font-bold tracking-widest uppercase transition-colors",
                    isSciFi ? "font-mono text-primary" : "font-heading text-foreground"
                  )}>
                    {category.title}
                  </h3>
                </div>
                
                {/* Skill Nodes */}
                <div className="flex flex-wrap gap-3 relative z-10">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.1 }}
                      onMouseEnter={() => playHover()}
                      className="relative group/skill cursor-default"
                    >
                      {/* Node Styling */}
                      <div className={cn(
                        "px-3 py-1.5 text-xs font-medium transition-all duration-300 relative overflow-hidden",
                        isSciFi 
                          ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-background clip-path-slash"
                          : "bg-surface text-muted-foreground border border-border rounded-sm hover:text-foreground hover:border-primary hover:shadow-[0_0_8px_hsl(var(--primary))]"
                      )}>
                        <span className="relative z-10">{skill}</span>
                        
                        {/* Shine / Glitch effect */}
                        <div className={cn(
                          "absolute inset-0 transition-transform duration-700 ease-in-out",
                          isSciFi 
                            ? "bg-primary/50 translate-x-full group-hover/skill:translate-x-0"
                            : "bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/skill:translate-x-full"
                        )} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Frame Elements */}
                {isSciFi ? (
                   // Sci-Fi Tech Corners
                   <>
                     <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                   </>
                ) : (
                   // Fantasy Corners
                   <>
                     <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
                   </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}