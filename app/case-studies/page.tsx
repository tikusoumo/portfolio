import Link from 'next/link';
import projectsData from '@/content/projects.json';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CaseStudiesPage() {
  // Only show projects that have a case study
  const caseStudies = projectsData.projects.filter((p: any) => p.caseStudy && p.caseStudy.trim() !== "");

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/15 to-background pointer-events-none" />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary uppercase tracking-widest font-mono">
            Analysis & Archives
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Case Studies
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Deep dives into the technical challenges, architectural decisions, and outcomes of my major projects.
          </p>
          <div className="h-[2px] w-32 bg-primary mx-auto mt-8 shadow-[0_0_10px_hsl(var(--primary))]" />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12">
          {caseStudies.length > 0 ? (
            caseStudies.map((project, index) => (
              <div 
                key={project.slug} 
                className="group relative flex flex-col md:flex-row gap-8 items-center bg-card/20 border border-primary/20 hover:border-primary/50 p-6 md:p-8 transition-all duration-500 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] rounded-sm"
              >
                {/* Image Section */}
                <div className="w-full md:w-2/5 aspect-video md:aspect-[4/3] rounded-sm overflow-hidden border border-primary/10 relative">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                  <img 
                    src={project.image.startsWith('./') ? `/${project.image.replace('./', '')}` : project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  {/* Cyber/Tech Corner Accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/50 z-20" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/50 z-20" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/30 uppercase text-[10px] tracking-wider font-mono">
                      {project.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Detailed Analysis
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  
                  <p className="text-muted-foreground font-body leading-relaxed mb-6 opacity-80 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies?.slice(0, 4).map((tech: string) => (
                      <span key={tech} className="text-xs text-primary/70 font-mono bg-primary/5 px-2 py-1 border border-primary/20">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="text-xs text-muted-foreground font-mono px-2 py-1">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors group/link"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-24 border border-dashed border-primary/30 bg-primary/5">
                <p className="text-muted-foreground font-mono">No case studies available in the archives.</p>
             </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
