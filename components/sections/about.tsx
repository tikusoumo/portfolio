"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import about from '@/content/about.json';

export function About() {
  const { universe } = useGaming();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      
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
             universe === 'valorant' && "font-mono text-primary uppercase glitch-text",
             universe === 'cyberpunk' && "font-mono text-accent uppercase"
          )}>
            {about.heading}
          </h2>
          <div className={cn(
             "w-48 mx-auto mb-4",
             universe === 'lol' ? "lol-section-divider" : "h-[2px] bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
          )} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {about.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className={cn(
               "text-2xl font-semibold mb-4 tracking-wide",
               universe === 'lol' ? "font-heading text-primary" : 
               universe === 'valorant' ? "font-mono text-primary uppercase" :
               "font-mono text-accent uppercase"
            )}>
              {about.journeyTitle}
            </h3>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Profile Image with Dynamic Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <div className={cn(
               "relative group",
               universe !== 'lol' && "p-4"
            )}>
              
              {universe === 'lol' && (
                 <>
                    {/* Outer decorative ring */}
                    <div className="absolute -inset-3 rounded-full border border-primary/20 animate-rune-spin" />
                    <div className="absolute -inset-6 rounded-full border border-primary/10" />
                 </>
              )}

              {universe === 'valorant' && (
                 <>
                    {/* Val decorative grid background */}
                    <div className="absolute -inset-2 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.1)_50%,transparent_75%)] bg-[length:10px_10px]" />
                    {/* Val border corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
                 </>
              )}
              
              {universe === 'cyberpunk' && (
                 <>
                    {/* Cyber border background */}
                    <div className="absolute -inset-2 bg-accent/5 clip-path-cyber" />
                 </>
              )}

              {/* Image container */}
              <div className={cn(
                 "relative overflow-hidden transition-all duration-500",
                 universe === 'lol' ? "w-[280px] h-[280px] rounded-full border-2 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.2)] group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]" :
                 universe === 'valorant' ? "w-[280px] h-[280px] border border-primary clip-path-slant grayscale group-hover:grayscale-0" :
                 "w-[280px] h-[280px] border border-accent clip-path-cyber"
              )}>
                <Image 
                  src={about.profileImage.startsWith('./') ? `/${about.profileImage.replace('./', '')}` : about.profileImage}
                  alt="Profile picture" 
                  fill 
                  className="object-cover"
                  priority
                />
                {/* Overlay on hover */}
                {universe === 'lol' && <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                {universe === 'valorant' && <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
                {universe === 'cyberpunk' && <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
              </div>
              
              {/* Corner accents (LOL specifics) */}
              {universe === 'lol' && (
                 <>
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
                 </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}