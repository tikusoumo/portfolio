"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Building Scalable Web Applications with Next.js 13',
    excerpt: 'Explore the latest features in Next.js 13 and how to leverage them for building performant, scalable web applications.',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'nextjs-13-scalable-applications'
  },
  {
    title: 'TypeScript Best Practices for Large Projects',
    excerpt: 'Learn essential TypeScript patterns and practices that will help you maintain clean, type-safe code in large-scale applications.',
    date: '2024-03-10',
    readTime: '12 min read',
    category: 'TypeScript',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'typescript-best-practices'
  },
  {
    title: 'Optimizing React Performance: Tips and Tricks',
    excerpt: 'Discover advanced techniques for optimizing React application performance, from component optimization to bundle splitting.',
    date: '2024-03-05',
    readTime: '10 min read',
    category: 'React',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'react-performance-optimization'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Thoughts, tutorials, and insights about web development, technology, and software engineering
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                    <div
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${post.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors duration-200">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 pt-0">
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between group hover:bg-primary/5"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-16"
            >
              <p className="text-muted-foreground mb-4">
                More articles coming soon! Stay tuned for insights on modern web development.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.href = 'mailto:soumojitatrong@gmail.com?subject=Blog Suggestion'}
              >
                Suggest a Topic
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}