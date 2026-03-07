import { getContent } from '@/app/actions/cms';
import { JsonEditor } from '@/components/admin/json-editor';
import { AdminHero } from '@/components/admin/sections/admin-hero';
import { AdminAbout } from '@/components/admin/sections/admin-about';
import { AdminSkills } from '@/components/admin/sections/admin-skills';
import { AdminExperience } from '@/components/admin/sections/admin-experience';
import { AdminProjects } from '@/components/admin/sections/admin-projects';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { file?: string };
}) {
  const filename = searchParams.file || 'hero.json';
  const data = await getContent(filename);

  if (!data) {
    return <div>Error loading {filename}</div>;
  }

  const isCustomSection = ['hero.json', 'about.json', 'skills.json', 'experience.json', 'projects.json'].includes(filename);

  return (
    <div className={isCustomSection ? "w-full -mt-8 -mx-8 relative" : "max-w-4xl mx-auto"}>
      {filename === 'hero.json' && <AdminHero initialData={data} />}
      {filename === 'about.json' && <AdminAbout initialData={data} />}
      {filename === 'skills.json' && <AdminSkills initialData={data} />}
      {filename === 'experience.json' && <AdminExperience initialData={data} />}
      {filename === 'projects.json' && <AdminProjects initialData={data} />}
      {!isCustomSection && <JsonEditor filename={filename} initialData={data} />}
    </div>
  );
}
