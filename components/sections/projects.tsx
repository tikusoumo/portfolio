"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Lock, Unlock, Crosshair, Play, FileCode2 } from 'lucide-react';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import projectsData from '@/content/projects.json';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
  video?: string;
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
             if (universe === 'valorant') {
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
             if (universe === 'cyberpunk') {
                return (
                  <CyberpunkCard
                    key={project.title}
                    project={project}
                    index={index}
                    playHover={playHover}
                    playClick={playClick}
                  />
                )
             }
             // Default / LoL / neutral
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
// THEME: CYBERPUNK (Neon Netrunner)
// ==========================================
function CyberpunkCard({ project, index, playHover }: { project: Project, index: number, playHover: () => void, playClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[500px] bg-black border border-yellow-500/30 overflow-hidden flex flex-col"
      onMouseEnter={() => playHover()}
    >
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] pointer-events-none z-20" />
      
      {/* Top Bar - Neon Aesthetic */}
      <div className="flex items-center justify-between p-3 border-b border-yellow-500/20 bg-yellow-500/10 z-30 relative">
         <span className="text-[10px] font-mono text-yellow-400 tracking-wider">
            // SYS.ARCHIVE.{index + 1}
         </span>
         <Badge variant="outline" className="border-cyan-400 text-cyan-400 text-[9px] uppercase rounded-none tracking-widest bg-cyan-400/10">
            {project.category}
         </Badge>
      </div>

      <div className="p-0 flex-grow flex flex-col relative z-30">
         {/* Media Reveal */}
         <div className="relative h-56 overflow-hidden border-b border-yellow-500/20 bg-zinc-900 z-10">
            <ProjectMedia project={project}>
               <div className="absolute inset-0 bg-yellow-500/10 mix-blend-color z-10 group-hover:opacity-0 transition-opacity pointer-events-none" />
               <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />
            </ProjectMedia>
         </div>

         <div className="p-5 flex-grow flex flex-col bg-black/80 backdrop-blur-md">
            <h3 className="text-xl font-bold font-mono text-yellow-400 tracking-wider uppercase mb-1 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">
               {project.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[9px] font-mono text-pink-500 bg-pink-500/10 px-1 border border-pink-500/30">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-zinc-400 line-clamp-3 mb-6 font-mono">
               {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto pointer-events-auto flex-wrap gap-y-3">
               <div className="flex gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-cyan-400 hover:scale-110 transition-all pointer-events-auto z-40 shrink-0 inline-block">
                       <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-cyan-400 hover:scale-110 transition-all pointer-events-auto z-40 shrink-0 inline-block">
                       <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
               </div>
               {project.slug && (
                 <Link href={`/projects/${project.slug}`} className="text-[11px] font-bold font-mono text-black bg-yellow-500 hover:bg-cyan-400 px-3 py-1 uppercase tracking-widest transition-colors pointer-events-auto z-40 shrink-0 inline-block">
                   [READ_FILE]
                 </Link>
               )}
            </div>
         </div>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 z-40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 z-40" />
    </motion.div>
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
      className="group relative h-[500px] bg-background/90 border-l-4 border-primary overflow-hidden flex flex-col"
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
      <div className="p-0 flex-grow flex flex-col relative z-20">
         {/* Image Reveal */}
         <div className="relative h-48 overflow-hidden z-10">
            <ProjectMedia project={project}>
               <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            </ProjectMedia>
         </div>

         <div className="p-6 -mt-12 relative z-20 pointer-events-none flex-grow flex flex-col">
            <h3 className="text-2xl font-bold font-mono text-foreground uppercase mb-2 group-hover:text-primary transition-colors">
               {project.title}
            </h3>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
               <span>STATUS:</span>
               <span className="text-green-500">ONGOING</span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-mono border-l-2 border-muted pl-4">
               {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto pointer-events-auto flex-wrap gap-y-3">
               <div className="flex gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary hover:bg-primary hover:text-background transition-colors pointer-events-auto z-30">
                       <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary hover:bg-primary hover:text-background transition-colors pointer-events-auto z-30">
                       <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
               </div>
               {project.slug ? (
                 <Link href={`/projects/${project.slug}`} className="text-[10px] font-mono text-primary hover:underline uppercase flex items-center gap-1 pointer-events-auto z-30 relative bg-background/50 px-2 py-1 rounded shrink-0">
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
      className="group relative h-[500px] perspective-1000"
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
           <div className="h-40 relative shrink-0">
             <ProjectMedia project={project}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2328] via-[#1e2328]/50 to-transparent pointer-events-none z-10" />
                <div className="absolute top-2 right-2 z-30">
                  <Badge className="bg-[#010a13]/80 border border-[#c8aa6e]/30 text-[#c8aa6e] text-[10px] uppercase tracking-wider backdrop-blur-sm pointer-events-auto">
                    {project.category}
                  </Badge>
                </div>
             </ProjectMedia>
           </div>

           <div className="p-6 flex flex-col flex-grow z-20 pointer-events-auto">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-heading font-bold text-[#f0e6d2] tracking-wide leading-tight">
                  {project.title}
                </h3>
                <Unlock className="w-4 h-4 text-[#0ac8b9] shrink-0 mt-1" />
              </div>

              <p className="text-sm text-[#a09b8c] line-clamp-3 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-auto flex items-center justify-between flex-wrap gap-y-3">
                 <div className="flex gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#a09b8c] hover:text-[#c8aa6e] transition-colors">
                         <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-[#a09b8c] hover:text-[#c8aa6e] transition-colors">
                         <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                 </div>
                 {project.slug && (
                    <Link href={`/projects/${project.slug}`} className="text-xs font-heading text-[#c8aa6e] hover:text-[#f0e6d2] uppercase transition-colors tracking-widest pl-4 shrink-0 whitespace-nowrap">
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

/* ── Media Component ──────────────────────────────────────────── */
function ProjectMedia({ project, className, children }: { project: Project, className?: string, children?: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Dialog>
      <div 
        className={cn("w-full h-full relative cursor-pointer group/vid overflow-hidden", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {project.video ? (
          <>
            <video 
              ref={videoRef}
              src={project.video} 
              poster={project.image}
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-105 group-hover/vid:scale-100"
            />
            <DialogTrigger asChild>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/vid:opacity-100 transition-opacity bg-black/40 z-20">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground transform scale-75 group-hover/vid:scale-100 transition-all hover:bg-primary hover:scale-110">
                  <Play className="w-5 h-5 ml-1" />
                </div>
              </div>
            </DialogTrigger>
          </>
        ) : (
          <Image 
             src={project.image} 
             alt={project.title} 
             fill
             sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
             className="absolute inset-0 object-cover grayscale group-hover/vid:grayscale-0 transition-all duration-500 scale-105 group-hover/vid:scale-100" 
             loading="lazy"
          />
        )}
        {children}
      </div>

      {project.video && (
        <DialogContent className="max-w-[1000px] w-[90vw] p-0 border-none bg-black/95 overflow-hidden">
          <video 
            src={project.video} 
            controls 
            autoPlay 
            className="w-full h-auto max-h-[85vh]"
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
