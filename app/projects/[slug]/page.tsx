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

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.projects.find((p: any) => p.slug === slug) as any;

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

          {/* Visual Story Section */}
          {project.story && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold font-heading mb-6 border-b border-border pb-4">The Story</h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-wrap text-lg md:text-xl font-light">{project.story}</p>
              </div>
            </div>
          )}

          {/* SWOT Analysis Grid */}
          {project.swot && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">SWOT Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strengths */}
                <div className="bg-secondary/20 border border-green-500/20 rounded-xl p-6 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-500">Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {project.swot.strengths.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-green-500 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-secondary/20 border border-red-500/20 rounded-xl p-6 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M7 21h10"/><path d="M12 21v-4"/><path d="M12 13V3"/><path d="M19 10a7 7 0 0 0-14 0"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-red-500">Weaknesses</h3>
                  </div>
                  <ul className="space-y-3">
                    {project.swot.weaknesses.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-red-500 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="bg-secondary/20 border border-blue-500/20 rounded-xl p-6 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-blue-500">Opportunities</h3>
                  </div>
                  <ul className="space-y-3">
                    {project.swot.opportunities.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-blue-500 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div className="bg-secondary/20 border border-amber-500/20 rounded-xl p-6 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-amber-500">Threats</h3>
                  </div>
                  <ul className="space-y-3">
                    {project.swot.threats.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-amber-500 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* Deep Dive Case Study (Original README) */}
          <div className="prose prose-invert prose-lg max-w-none mb-16 mt-16 bg-card border border-border p-8 rounded-xl shadow-lg">
             {project.caseStudy ? (
                <div className="font-body text-muted-foreground leading-relaxed">
                  <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4 text-foreground">Deep Dive Documentation</h2>
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
