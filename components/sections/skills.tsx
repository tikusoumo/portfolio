"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Rust', 'Golang', 'Bash'],
    gradient: 'from-blue-500 to-cyan-500/20',
    hoverGradient: 'hover:from-blue-500 hover:to-cyan-500/30',
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React.js', 'Next.js', 'React Native','Nestjs', 'Node.js', 'Express.js', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-green-500 to-emerald-500/20',
    hoverGradient: 'hover:from-green-500 hover:to-emerald-500/30',
  },
  {
    title: 'Development Tools',
    skills: ['VS Code', 'Git', 'Docker', 'Postman', 'GitHub', 'Vercel', 'Figma', 'AWS'],
    gradient: 'from-purple-500 to-pink-500/20',
    hoverGradient: 'hover:from-purple-500 hover:to-pink-500/30',
  },
  {
    title: 'Databases & Technologies',
    skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'Redis', 'GraphQL'],
    gradient: 'from-orange-500 to-red-500/20',
    hoverGradient: 'hover:from-orange-500 hover:to-red-500/30',
  },
  {
    title: 'Creative Tools',
    skills: ['Blender', 'Figma', 'Adobe XD', 'Adobe Illustrator', 'Adobe Photoshop','After effects'],
    gradient: 'from-yellow-500 to-amber-500/20',
    hoverGradient: 'hover:from-yellow-500 hover:to-amber-500/30',
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`border-0 bg-gradient-to-br ${category.gradient} ${category.hoverGradient} transition-all duration-300 h-full`}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-background/80 text-foreground hover:bg-background/90 transition-colors duration-200"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
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