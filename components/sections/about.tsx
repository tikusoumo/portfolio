"use client";

import { motion } from 'framer-motion';
import { ShaderBackground } from '../three/shader-background';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      {/* <ShaderBackground /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating innovative web solutions that make a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a designer-developer hybrid who loves fusing art with technology to craft immersive digital experiences. 
              From building full-stack applications to creating 2D/3D motion graphics and animation, I enjoy working at the 
              intersection of creativity and code.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              While I&apos;m capable of building complete apps on my own, I thrive in collaborative environments 
              where ideas grow stronger as a team. Always curious and open to new tools, I welcome challenges 
              that push me to learn, adapt, and innovate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image 
                src="/profile.jpg" 
                alt="Profile picture" 
                fill 
                className="object-cover"
                priority
              />
            </div>
         
          </motion.div>
        </div>
      </div>
    </section>
  );
}