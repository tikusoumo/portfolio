"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Web Developer',
    company: 'Self-Employed',
    period: 'Feb 2023 - Present',
    location: 'Remote',
    type: 'Freelance',
    description: [
      'Designed and developed custom web applications for clients in e-commerce, healthcare, and education domains',
      'Built scalable backend APIs using Node.js and Express, integrating MongoDB and PostgreSQL databases',
      'Delivered end-to-end responsive UIs using Next.js and Tailwind CSS, improving client engagement metrics',
    ],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Web Development Associate',
    company: 'Google Developer Student Club (DSC)',
    period: 'Aug 2023 - Aug 2024',
    location: 'Ninja Institute of Technology',
    type: 'Student Leadership',
    description: [
      'Collaborated with a cross-functional team to build and maintain internal tools and event platforms for student engagement',
      'Led the frontend development of a React-based portal that increased user participation by 30%',
      'Conducted workshops and mentoring sessions for over 100 students on modern web technologies',
    ],
    technologies: ['React.js', 'JavaScript', 'HTML/CSS', 'Git', 'Firebase'],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and key contributions in web development
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-gradient-to-br from-background/80 to-muted/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {experience.title}
                      </CardTitle>
                      <p className="text-lg font-medium text-primary mt-1">
                        {experience.company}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        {experience.period}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {experience.location}
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {experience.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {experience.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}