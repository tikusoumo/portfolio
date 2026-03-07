import { getFilesList } from '@/app/actions/cms';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, FileText, User, Briefcase, Code, Mail, Shield, BookOpen } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'hero.json': <LayoutDashboard className="w-4 h-4 mr-3" />,
  'about.json': <User className="w-4 h-4 mr-3" />,
  'skills.json': <Code className="w-4 h-4 mr-3" />,
  'experience.json': <Briefcase className="w-4 h-4 mr-3" />,
  'projects.json': <FileText className="w-4 h-4 mr-3" />,
  'contact.json': <Mail className="w-4 h-4 mr-3" />,
  'meta.json': <Shield className="w-4 h-4 mr-3" />,
  'blog.json': <BookOpen className="w-4 h-4 mr-3" />,
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const files = await getFilesList();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card/50 border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border/50">
          <h1 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            Hextech CMS
          </h1>
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Content Editors</div>
            {files.map((file) => (
              <Link
                key={file}
                href={`/admin?file=${file}`}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground group"
              >
                {iconMap[file] || <FileText className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" />}
                {file.replace('.json', '').charAt(0).toUpperCase() + file.replace('.json', '').slice(1)}
              </Link>
            ))}
             <div className="my-4 border-t border-border/50" />
             <Link href="/" className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors">
                Back to Site
             </Link>
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto relative">
        {children}
      </main>
    </div>
  );
}
