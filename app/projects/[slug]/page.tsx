import { notFound } from 'next/navigation';
import projectsData from '@/content/projects.json';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function generateStaticParams() {
  return projectsData.projects
    .filter((p: any) => p.slug)
    .map((p: any) => ({
      slug: p.slug,
    }));
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projectsData.projects.find((p: any) => p.slug === params.slug) as any;

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="border-primary text-primary uppercase">
                {project.category}
              </Badge>
              <Badge variant="secondary">{project.status}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{project.description}</p>
            
            <div className="flex flex-wrap gap-4 items-center">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md transition-colors">
                  <Github className="w-5 h-5" />
                  <span>View Source</span>
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors">
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {project.image && (
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-border mb-12 relative bg-muted group">
               <img src={project.image.startsWith('./') ? `/${project.image.replace('./', '')}` : project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none mb-16">
             {project.caseStudy ? (
                <div className="font-body text-muted-foreground leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm as any]}>
                    {project.caseStudy}
                  </ReactMarkdown>
                </div>
             ) : (
                <div className="whitespace-pre-wrap font-body text-muted-foreground leading-relaxed">
                   {project.longDescription || "Case study content coming soon."}
                </div>
             )}
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold mb-6 font-heading">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge key={tech} variant="outline" className="bg-secondary/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
