'use client';

import { notFound } from 'next/navigation';
import projectsData from '@/content/projects.json';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Zap,
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { use, useState } from 'react';

type Project = (typeof projectsData.projects)[number] & {
  scope?: string[];
  challenges?: { title: string; description: string }[];
  impact?: { metric: string; description: string }[];
  story?: string;
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  caseStudy?: string;
};

const TABS = [
  { id: 'scope', label: 'Scope', icon: Target },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
  { id: 'impact', label: 'Impact', icon: TrendingUp },
  { id: 'swot', label: 'SWOT', icon: Zap },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projectsData.projects.find(
    (p: any) => p.slug === slug
  ) as Project | undefined;

  const [activeTab, setActiveTab] = useState<TabId>('scope');

  if (!project) {
    notFound();
  }

  const scrollToSection = (id: TabId) => {
    setActiveTab(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* ── Hero Header ─────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="outline"
                className="border-primary text-primary uppercase tracking-widest text-xs"
              >
                {project.category}
              </Badge>
              <Badge variant="secondary">{project.status}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md transition-colors text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* ── Sticky Tab Bar ─────────────────────────────────────── */}
          <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border mb-10">
            <nav className="flex gap-0 overflow-x-auto scrollbar-hide">
              {TABS.map(({ id, label, icon: Icon }) => {
                const hasContent =
                  id === 'scope'
                    ? (project.scope?.length ?? 0) > 0
                    : id === 'story'
                    ? !!project.story
                    : id === 'challenges'
                    ? (project.challenges?.length ?? 0) > 0
                    : id === 'impact'
                    ? (project.impact?.length ?? 0) > 0
                    : !!project.swot;
                if (!hasContent) return null;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── Section: Scope ──────────────────────────────────────── */}
          {project.scope && project.scope.length > 0 && (
            <section id="section-scope" className="mb-16 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">
                  Project Scope
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                What this project covers — systems owned, responsibilities, and
                integrations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.scope.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Section: Story ──────────────────────────────────────── */}
          {project.story && (
            <section id="section-story" className="mb-16 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">The Story</h2>
              </div>
              <div className="relative pl-5 border-l-2 border-primary/30">
                <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-wrap">
                  {project.story}
                </p>
              </div>
            </section>
          )}

          {/* ── Section: Challenges ─────────────────────────────────── */}
          {project.challenges && project.challenges.length > 0 && (
            <section id="section-challenges" className="mb-16 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold font-heading">
                  Challenges Faced
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                Real technical and design problems encountered during
                development — and how they were resolved.
              </p>
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <div
                    key={i}
                    className="group rounded-xl border border-border bg-card p-6 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold flex items-center justify-center border border-amber-500/20">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 leading-snug">
                          {c.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Section: Impact ─────────────────────────────────────── */}
          {project.impact && project.impact.length > 0 && (
            <section id="section-impact" className="mb-16 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold font-heading">
                  Real-World Impact
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                Measurable outcomes and meaningful results this project
                delivered.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.impact.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 hover:border-green-500/40 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.07)] transition-all"
                  >
                    <p className="text-green-400 font-bold text-xl mb-2 leading-tight">
                      {item.metric}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Section: SWOT ───────────────────────────────────────── */}
          {project.swot && (
            <section id="section-swot" className="mb-16 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">
                  SWOT Analysis
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <SwotCard
                  title="Strengths"
                  items={project.swot.strengths}
                  color="green"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  }
                />
                {/* Weaknesses */}
                <SwotCard
                  title="Weaknesses"
                  items={project.swot.weaknesses}
                  color="red"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 21h10" />
                      <path d="M12 21v-4" />
                      <path d="M12 13V3" />
                      <path d="M19 10a7 7 0 0 0-14 0" />
                    </svg>
                  }
                />
                {/* Opportunities */}
                <SwotCard
                  title="Opportunities"
                  items={project.swot.opportunities}
                  color="blue"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  }
                />
                {/* Threats */}
                <SwotCard
                  title="Threats"
                  items={project.swot.threats}
                  color="amber"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>
                  }
                />
              </div>
            </section>
          )}

          {/* ── Deep Dive (collapsed README) ────────────────────────── */}
          {project.caseStudy && (
            <details className="group mb-16 rounded-xl border border-border bg-card overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 select-none hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <span className="text-base font-semibold text-foreground">
                    Full Technical Documentation
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    README
                  </Badge>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-8 pt-2 border-t border-border prose prose-invert prose-sm max-w-none text-muted-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm as any]}>
                  {project.caseStudy}
                </ReactMarkdown>
              </div>
            </details>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ── SWOT Card sub-component ──────────────────────────────────────────── */
const colorMap = {
  green: {
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    hover: 'hover:shadow-[0_0_15px_rgba(34,197,94,0.08)]',
    hoverBorder: 'hover:border-green-500/35',
    icon: 'bg-green-500/10 text-green-500',
    title: 'text-green-500',
    dot: 'text-green-500',
  },
  red: {
    border: 'border-red-500/20',
    bg: 'bg-red-500/5',
    hover: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.08)]',
    hoverBorder: 'hover:border-red-500/35',
    icon: 'bg-red-500/10 text-red-500',
    title: 'text-red-500',
    dot: 'text-red-500',
  },
  blue: {
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    hover: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.08)]',
    hoverBorder: 'hover:border-blue-500/35',
    icon: 'bg-blue-500/10 text-blue-500',
    title: 'text-blue-500',
    dot: 'text-blue-500',
  },
  amber: {
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    hover: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.08)]',
    hoverBorder: 'hover:border-amber-500/35',
    icon: 'bg-amber-500/10 text-amber-500',
    title: 'text-amber-500',
    dot: 'text-amber-500',
  },
};

function SwotCard({
  title,
  items,
  color,
  icon,
}: {
  title: string;
  items: string[];
  color: keyof typeof colorMap;
  icon: React.ReactNode;
}) {
  const c = colorMap[color];
  return (
    <div
      className={`rounded-xl border ${c.border} ${c.bg} p-5 ${c.hover} ${c.hoverBorder} transition-all`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className={`p-1.5 rounded-lg ${c.icon}`}>{icon}</span>
        <h3 className={`font-bold text-base ${c.title}`}>{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className={`${c.dot} mt-1 leading-none`}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
