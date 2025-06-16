"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:soumojitdatta2050@gmail.com',
      icon: Mail,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/soumojit-datta-83629a233/',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/tikusoumo',
      icon: Github,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/syntax_3d/',
      icon: Instagram,
    },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
              Soumojit Datta
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Full Stack Developer passionate about creating exceptional digital experiences
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-background/80 rounded-full border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
              </motion.a>
            ))}
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by Soumojit Datta
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}