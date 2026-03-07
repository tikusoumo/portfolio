"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import blogData from '@/content/blog.json';

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-heading font-bold gold-text-static mb-4 tracking-wider">
                {blogData.heading}
              </h1>
              <div className="lol-section-divider w-48 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {blogData.subtitle}
              </p>
            </motion.div>

            {/* Blog Posts Grid - Patch Notes Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData.posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full flex flex-col rounded-sm bg-card/40 border border-gold-dark/20 hover:border-gold/30 hover:shadow-hextech transition-all duration-500 overflow-hidden">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold/25 z-10" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-gold/25 z-10" />
                    
                    {/* Image */}
                    <div
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${post.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/60 backdrop-blur-sm text-gold border border-gold-dark/30 text-[10px] uppercase tracking-wider">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col">
                      <h2 className="text-lg font-heading font-bold text-gold-bright mb-2 line-clamp-2 tracking-wide group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h2>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground/60 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-gold/40" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-gold/40" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      {/* Read More */}
                      <button className="w-full flex items-center justify-between text-sm text-foreground/50 hover:text-gold transition-all duration-300 py-2 border-t border-gold-dark/10 group/btn">
                        <span className="uppercase tracking-wider text-xs">Read More</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-16"
            >
              <div className="lol-section-divider w-32 mx-auto mb-6" />
              <p className="text-muted-foreground/60 text-sm uppercase tracking-wider">
                More articles coming soon
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}