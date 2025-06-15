"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ShaderBackground } from '../three/shader-background';

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
              I&apos;m currently pursuing my Bachelor of Science in Computer Science Engineering at 
              Ninja Institute of Technology (2022-2026). My journey in web development began with 
              a curiosity about how websites work, which quickly evolved into a passion for creating 
              beautiful, functional digital experiences.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              As a Full Stack Web Developer, I specialize in modern technologies like React, Next.js, 
              Node.js, and TypeScript. I enjoy the challenge of solving complex problems and turning 
              ideas into reality through clean, efficient code.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or sharing knowledge with the developer community. I believe in continuous learning 
              and staying updated with the latest industry trends.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Card className="border-0 bg-gradient-to-br from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h4 className="text-2xl font-bold text-primary mb-2">2+</h4>
                <p className="text-sm text-muted-foreground">Years of Experience</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-teal-500/10 to-green-500/10 hover:from-teal-500/20 hover:to-green-500/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h4 className="text-2xl font-bold text-teal-600 mb-2">10+</h4>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h4 className="text-2xl font-bold text-orange-600 mb-2">15+</h4>
                <p className="text-sm text-muted-foreground">Technologies Mastered</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h4 className="text-2xl font-bold text-purple-600 mb-2">100+</h4>
                <p className="text-sm text-muted-foreground">Students Mentored</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}