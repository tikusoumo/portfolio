import sys
with open('app/projects/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_index = text.find('Deep Dive (Redirect to GitHub)')
end_index = text.find(')}', start_index) + 2

replacement = '''Deep Dive (Redirect to GitHub) ────────────────────────── */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-16 flex items-center justify-between p-6 rounded-xl border border-primary/50 bg-secondary/20 transition-all cursor-pointer box-border"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-white" />
                  <span className="text-base font-semibold text-white">
                    Full Technical Documentation
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    GitHub
                  </Badge>
                </div>
                <ExternalLink className="w-4 h-4 text-white transition-colors" />
              </a>
            )}'''

if start_index != -1 and end_index > start_index:
    new_text = text[:start_index] + replacement + text[end_index:]
    with open('app/projects/[slug]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print('Updated successfully')
else:
    print('Indices not found')
