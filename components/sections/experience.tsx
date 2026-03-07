"use client";

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import experienceData from '@/content/experience.json';

export function Experience() {
  const { universe } = useGaming();

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/15 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn(
             "text-3xl sm:text-4xl font-bold mb-4 tracking-wider",
             universe === 'lol' && "font-heading gold-text-static",
             universe === 'valorant' && "font-mono text-primary uppercase glitch-text drop-shadow-[0_0_8px_hsl(var(--primary))]",
             universe === 'cyberpunk' && "font-mono text-accent uppercase drop-shadow-[0_0_8px_hsl(var(--accent))]"
          )}>
            {experienceData.heading}
          </h2>
          <div className={cn(
             "w-48 mx-auto mb-4",
             universe === 'lol' ? "lol-section-divider" : "h-[2px] bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
          )} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {experienceData.subtitle}
          </p>
        </motion.div>

        {/* Timeline - Ranked Progression Style */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className={cn(
             "absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block",
             universe === 'lol' && "bg-gradient-to-b from-primary/40 via-primary/20 to-transparent",
             universe === 'valorant' && "bg-primary shadow-[0_0_15px_hsl(var(--primary))]",
             universe === 'cyberpunk' && "bg-accent shadow-[0_0_15px_hsl(var(--accent))] border-x border-background/50"
          )} />
          
          <div className="space-y-10">
            {experienceData.experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 hidden md:flex">
                  <div className="relative flex items-center justify-center">
                    <div className={cn(
                       "z-10",
                       universe === 'lol' && "w-4 h-4 bg-primary rounded-full border-2 border-background shadow-[0_0_10px_hsl(var(--primary))]",
                       universe === 'valorant' && "w-6 h-6 bg-background border-2 border-primary rotate-45 flex items-center justify-center after:content-[''] after:w-2 after:h-2 after:bg-primary after:shadow-[0_0_8px_hsl(var(--primary))]",
                       universe === 'cyberpunk' && "w-5 h-5 bg-accent rounded-sm border-2 border-background shadow-[0_0_15px_hsl(var(--accent))]"
                    )} />
                    {universe === 'lol' && <div className="absolute inset-0 w-4 h-4 bg-primary/30 rounded-full animate-ping" />}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="md:w-1/2" />
                
                {/* Card */}
                <div className="md:w-1/2 group">
                  <div className={cn(
                     "relative p-6 transition-all duration-500 overflow-hidden",
                     universe === 'lol' && "rounded-sm bg-card/40 border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
                     universe === 'valorant' && "bg-background/80 border border-primary/30 hover:border-primary clip-path-slant grayscale-[0.5] hover:grayscale-0",
                     universe === 'cyberpunk' && "bg-surface/50 border border-accent/30 hover:border-accent hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] clip-path-cyber"
                  )}>
                    {/* Corner decorations (LoL) */}
                    {universe === 'lol' && (
                       <>
                          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/25" />
                          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/25" />
                          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/25" />
                          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/25" />
                       </>
                    )}
                    
                    {/* Hover glow */}
                    <div className={cn(
                       "absolute inset-0 opacity-0 transition-opacity duration-500",
                       universe === 'lol' && "bg-gradient-to-br from-primary/[0.05] to-transparent group-hover:opacity-100",
                       universe === 'valorant' && "bg-primary/5 group-hover:opacity-100",
                       universe === 'cyberpunk' && "bg-accent/5 group-hover:opacity-100 pointer-events-none"
                    )} />

                    {/* Image Banner */}
                    {experience.image && (
                      <div className="w-full h-48 sm:h-64 mb-6 rounded-md overflow-hidden border border-primary/20 shadow-md relative z-10 group/img bg-background/50">
                        <div className="absolute inset-0 bg-primary/10 group-hover/img:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                        <img src={experience.image} alt={experience.company} className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700" />
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 relative z-10">
                      <div>
                        <h3 className={cn(
                           "text-lg font-semibold tracking-wide transition-colors",
                           universe === 'lol' && "font-heading text-primary group-hover:text-primary",
                           universe === 'valorant' && "font-mono text-foreground uppercase group-hover:text-primary",
                           universe === 'cyberpunk' && "font-mono text-accent uppercase"
                        )}>
                          {experience.title}
                        </h3>
                        <p className={cn(
                           "text-base mt-1 transition-colors",
                           universe === 'lol' && "font-medium text-muted-foreground group-hover:text-foreground",
                           universe === 'valorant' && "font-mono text-primary/80 group-hover:text-primary drop-shadow-md",
                           universe === 'cyberpunk' && "font-bold text-foreground drop-shadow-[0_0_2px_#fff]"
                        )}>
                          {experience.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1.5 relative z-10">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                          <CalendarDays className={cn("h-3.5 w-3.5", universe === 'cyberpunk' ? "text-accent" : "text-primary/70")} />
                          {experience.period}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                          <MapPin className={cn("h-3.5 w-3.5", universe === 'cyberpunk' ? "text-accent" : "text-primary/70")} />
                          {experience.location}
                        </div>
                        <Badge variant="outline" className={cn(
                           "text-[10px] uppercase tracking-wider",
                           universe === 'lol' && "border-primary/30 text-primary/80",
                           universe === 'valorant' && "border-primary text-primary bg-primary/10 rounded-none",
                           universe === 'cyberpunk' && "border-accent text-accent bg-accent/10 font-mono"
                        )}>
                          {experience.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2.5 mb-5 relative z-10">
                      {experience.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2.5">
                          {universe === 'lol' ? (
                             <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
                          ) : (
                             <div className={cn("w-2 h-2 mt-1.5 flex-shrink-0", universe === 'cyberpunk' ? "bg-accent" : "bg-primary clip-path-slant")} />
                          )}
                          <p className={cn(
                             "text-sm leading-relaxed",
                             universe === 'lol' ? "text-muted-foreground" : "text-foreground font-mono opacity-80"
                          )}>{item}</p>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Technologies */}
                    <div className="relative z-10">
                      <h4 className={cn(
                         "text-xs font-medium mb-2.5 uppercase tracking-wider",
                         universe === 'lol' ? "text-foreground/60" : "text-muted-foreground font-mono"
                      )}>
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {experience.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className={cn(
                               "transition-colors duration-200 text-[10px] py-0.5 tracking-wide",
                               universe === 'lol' && "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
                               universe === 'valorant' && "bg-transparent text-foreground border border-primary/50 hover:bg-primary hover:text-background rounded-none font-mono",
                               universe === 'cyberpunk' && "bg-transparent text-accent border border-accent/40 hover:bg-accent hover:text-background font-mono shadow-[0_0_5px_hsl(var(--accent)/0.3)]"
                            )}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}