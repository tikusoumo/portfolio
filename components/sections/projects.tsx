"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Lock, Unlock, Crosshair } from 'lucide-react';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import projectsData from '@/content/projects.json';

// Define Project Interface
interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  tags: string[];
  demo?: string;
  github?: string;
  slug?: string;
  caseStudy?: string;
}

export function Projects() {
  const { playHover, playClick } = useAudio();
  const { universe } = useGaming();

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background transition-colors duration-700">
      {/* Background Overlay */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-700 bg-gradient-to-b from-background via-secondary/20 to-background"
      )} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn(
             "text-3xl sm:text-4xl font-bold mb-4 tracking-wider drop-shadow-md font-heading text-foreground"
          )}>
            <span className="bg-gradient-to-b from-foreground via-primary to-primary bg-clip-text text-transparent">
              {universe === 'valorant' ? "MISSION LOG" : projectsData.heading}
            </span>
          </h2>
          <div className="w-48 mx-auto h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_hsl(var(--primary))] mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            {projectsData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.projects.map((project: any, index: number) => {
             if (universe === 'valorant' || universe === 'cyberpunk') {
                return (
                  <MissionDossierCard 
                    key={project.title} 
                    project={project} 
                    index={index} 
                    playHover={playHover} 
                    playClick={playClick} 
                  />
                );
             }
             // Default / LoL
             return (
               <HextechChestCard 
                 key={project.title} 
                 project={project} 
                 index={index} 
                 playHover={playHover} 
                 playClick={playClick} 
               />
             );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// THEME: VALORANT / SCI-FI (Mission Dossier)
// ==========================================
function MissionDossierCard({ project, index, playHover }: { project: Project, index: number, playHover: () => void, playClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[450px] bg-background/90 border-l-4 border-primary overflow-hidden"
      onMouseEnter={() => playHover()}
    >
      {/* Background Grip */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.05)_50%,transparent_75%)] bg-[length:10px_10px] pointer-events-none" />
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-primary/5">
         <span className="text-xs font-mono text-primary flex items-center gap-2">
            <Crosshair className="w-3 h-3" /> MISSION_{index + 1}
         </span>
         <Badge variant="outline" className="border-primary text-primary text-[10px] uppercase">
            {project.category}
         </Badge>
      </div>

      {/* Content Container */}
      <div className="p-0 h-full flex flex-col">
         {/* Image Reveal */}
         <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity" />
            <Image 
               src={project.image} 
               alt={project.title} 
               fill
               sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
               loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
         </div>

         <div className="p-6 -mt-12 relative z-20">
            <h3 className="text-2xl font-bold font-mono text-foreground uppercase mb-2 group-hover:text-primary transition-colors">
               {project.title}
            </h3>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
               <span>STATUS:</span>
               <span className="text-green-500">COMPLETED</span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-mono border-l-2 border-muted pl-4">
               {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
               <div className="flex gap-2">
                  <a href={project.githubUrl} className="p-2 bg-secondary hover:bg-primary hover:text-background transition-colors">
                     <Github className="w-4 h-4" />
                  </a>
                  <a href={project.demoUrl} className="p-2 bg-secondary hover:bg-primary hover:text-background transition-colors">
                     <ExternalLink className="w-4 h-4" />
                  </a>
               </div>
               {project.slug ? (
                 <Link href={`/projects/${project.slug}`} className="text-[10px] font-mono text-primary hover:underline uppercase flex items-center gap-1">
                   Case Study <ExternalLink className="w-3 h-3" />
                 </Link>
               ) : (
                 <span className="text-[10px] font-mono text-primary/50">auth_token_required</span>
               )}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// THEME: LEAGUE (Hextech Chest)
// ==========================================
function HextechChestCard({ project, index, playHover, playClick }: { project: Project, index: number, playHover: () => void, playClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[450px] perspective-1000"
      onMouseEnter={() => playHover()}
    >
      <div className="relative w-full h-full duration-700 preserve-3d group-hover:my-rotate-y-180">
        {/* Chest (Closed State) */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full w-full bg-[#091428] border-2 border-[#785a28] flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            {/* Hextech Glow Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.2)_0%,transparent_70%)] opacity-10 animate-pulse" />
            
            {/* Chest Decoration */}
            <div className="w-32 h-32 border-4 border-[#c8aa6e] rotate-45 flex items-center justify-center mb-8 shadow-[0_0_15px_#c8aa6e] bg-[#010a13]">
              <Lock className="w-12 h-12 text-[#c8aa6e]" />
            </div>
            
            <h3 className="text-xl font-heading font-bold text-[#f0e6d2] tracking-widest uppercase mb-2">
              Hextech Chest
            </h3>
            <p className="text-[#a09b8c] text-sm text-center">
              Hover to unlock {project.title}
            </p>
            
            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c8aa6e]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c8aa6e]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c8aa6e]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c8aa6e]" />
          </div>
        </div>

        {/* Content (Open State / Back) */}
        <div className="absolute inset-0 h-full w-full backface-hidden my-rotate-y-180 bg-[#1e2328] border border-[#c8aa6e]/50 shadow-[0_0_30px_hsl(var(--primary)/0.15)] overflow-hidden flex flex-col">
           {/* Image Background with Overlay */}
           <div className="h-40 bg-cover bg-center relative shrink-0" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2328] via-[#1e2328]/50 to-transparent" />
              <div className="absolute top-2 right-2">
                <Badge className="bg-[#010a13]/80 border border-[#c8aa6e]/30 text-[#c8aa6e] text-[10px] uppercase tracking-wider backdrop-blur-sm">
                  {project.category}
                </Badge>
              </div>
           </div>

           <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-heading font-bold text-[#f0e6d2] tracking-wide leading-tight">
                  {project.title}
                </h3>
                <Unlock className="w-4 h-4 text-[#0ac8b9] shrink-0 mt-1" />
              </div>

              <p className="text-sm text-[#a09b8c] line-clamp-3 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                 <div className="flex gap-4">
                    <a href={project.githubUrl} target="_blank" className="text-[#a09b8c] hover:text-[#c8aa6e] transition-colors">
                       <Github className="w-5 h-5" />
                    </a>
                    <a href={project.demoUrl} target="_blank" className="text-[#a09b8c] hover:text-[#c8aa6e] transition-colors">
                       <ExternalLink className="w-5 h-5" />
                    </a>
                 </div>
                 {project.slug && (
                    <Link href={`/projects/${project.slug}`} className="text-xs font-heading text-[#c8aa6e] hover:text-[#f0e6d2] uppercase transition-colors tracking-widest pl-4">
                       Read Case Study
                    </Link>
                 )}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}