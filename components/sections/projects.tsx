"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Flooow - Workflow Automation SaaS',
    description: 'A comprehensive workflow automation platform built with modern web technologies. Features include drag-and-drop workflow builder, real-time monitoring, and integration with popular services.',
    longDescription: 'This project represents a full-scale SaaS application designed to streamline business processes through automation. The platform allows users to create complex workflows using a visual drag-and-drop interface, monitor execution in real-time, and integrate with over 50+ popular services including Slack, Gmail, and various databases.',
    image: './1.png',
    technologies: ['Next.js','NestJs','MCP server(custom)', 'TypeScript', 'Node.js',  'PostgreSQL','prisma','redis', 'Tailwind CSS', 'React Query'],
    features: [
      'Visual workflow builder with drag-and-drop functionality',
      'Real-time workflow monitoring and analytics',
      'Integration with 50+ popular services and APIs',
      'Advanced scheduling and trigger management',
      'Multi-tenant architecture with role-based access',
      'Comprehensive audit logs and error handling'
    ],
    demoUrl: 'https://www.flooow.xyz',
    githubUrl: 'https://github.com/tikusoumo/Flow',
    status: 'In Development',
    category: 'SaaS Platform'
  },
  {
    title: 'Threejs Shader',
    description: ' Wave shader in react three fibre ',
    longDescription: 'custom shader background in react three fibre that have different parameter that can be change in real time',
    image: './2.png',
    technologies: ['Next.js','threejs'],
    features: [
      'Custom shader background',
    ],
    demoUrl: 'https://three-js-shaders.vercel.app/',
    githubUrl: 'https://github.com/tikusoumo/ThreeJS-Shaders',
    status: 'Completed',
    category: 'Miscellaneous'
  },
   
  
];

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I&apos;ve used to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className={`grid grid-cols-1 ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-0`}>
                  <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative overflow-hidden`}>
                    <div
                      className="h-64 lg:h-full bg-cover bg-center relative group"
                      style={{ backgroundImage: `url(${project.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                          {project.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={project.status === 'Completed' ? 'default' : 'secondary'}
                          className={project.status === 'Completed' ? 'bg-green-500/80 text-white' : 'bg-orange-500/80 text-white'}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {project.features.slice(0, 4).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
                          onClick={() => window.open(project.demoUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}