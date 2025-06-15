"use client";

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShaderBackground } from '@/components/three/shader-background';
import { ContainerTextFlip } from '../ui/container-text-flip';

export function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden ">
      {/* Shader Background */}
     
      <ShaderBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background/[.05]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 pb-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold "
            >
              <span className="block text-foreground/90 pb-2">Hi, I&apos;m</span>
              <ContainerTextFlip words={["Soumojit Datta","Developer","Designer","3d/2d Artist"]} />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Full Stack Web Developer passionate about creating exceptional digital experiences
              with modern technologies and clean code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Button
                size="lg"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-l from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 dark:from-primary/90 dark:to-purple-600/90 text-white px-8 py-3 rounded-full font-bold transition-colors duration-300 backdrop-blur-sm bg-background/10 dark:text-black/80"
              >
                View My Work
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-full border-2 backdrop-blur-sm bg-background/10"
              >
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center space-x-6 mt-8"
            >
              <a
                href="mailto:soumojitatrong@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/soumojitatrong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/srdcssomu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll Arrow - Positioned at bottom center with proper spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <button
              onClick={scrollToAbout}
              className="animate-bounce text-muted-foreground hover:text-primary transition-colors duration-200 p-2"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}