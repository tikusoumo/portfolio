"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Save, Loader2, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveContent } from '@/app/actions/cms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminProjects({ initialData, onSave }: { initialData: any, onSave?: () => void }) {
  const { universe } = useGaming();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent('projects.json', data);
    setSaving(false);
    if (result.success) {
      if (onSave) onSave();
    } else {
      alert('Failed to save.');
    }
  };

  const updateProject = (index: number, key: string, value: any) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [key]: value };
    setData({ ...data, projects: newProjects });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        {
          title: "New Project",
          description: "Short description",
          longDescription: "A more detailed description",
          image: "/placeholder.png",
          technologies: ["React"],
          features: ["Feature 1"],
          demoUrl: "#",
          githubUrl: "#",
          status: "In Development",
          category: "Web App",
          slug: "new-project",
          caseStudy: "# New Project\n\nCase study content goes here..."
        },
        ...data.projects
      ]
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    setData({ ...data, projects: newProjects });
  };

  const updateArrayItem = (projIndex: number, field: 'technologies' | 'features', itemIndex: number, value: string) => {
    const newProjects = [...data.projects];
    const newArr = [...newProjects[projIndex][field]];
    newArr[itemIndex] = value;
    newProjects[projIndex] = { ...newProjects[projIndex], [field]: newArr };
    setData({ ...data, projects: newProjects });
  };

  const addArrayItem = (projIndex: number, field: 'technologies' | 'features') => {
    const newProjects = [...data.projects];
    const newArr = [...(newProjects[projIndex][field] || []), "New Item"];
    newProjects[projIndex] = { ...newProjects[projIndex], [field]: newArr };
    setData({ ...data, projects: newProjects });
  };

  const removeArrayItem = (projIndex: number, field: 'technologies' | 'features', itemIndex: number) => {
    const newProjects = [...data.projects];
    const newArr = [...newProjects[projIndex][field]];
    newArr.splice(itemIndex, 1);
    newProjects[projIndex] = { ...newProjects[projIndex], [field]: newArr };
    setData({ ...data, projects: newProjects });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg backdrop-blur-md bg-background/50">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Projects
        </Button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div className="text-center mb-16 max-w-2xl mx-auto">
          <Input
             value={data.heading}
             onChange={(e) => setData({ ...data, heading: e.target.value })}
             className={cn(
                "text-center text-3xl sm:text-4xl font-bold mb-4 tracking-wider drop-shadow-md font-heading text-primary bg-transparent border-none shadow-none focus-visible:ring-1"
             )}
          />
          <div className="w-48 mx-auto h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_hsl(var(--primary))] mb-4" />
          <Textarea
             value={data.subtitle}
             onChange={(e) => setData({ ...data, subtitle: e.target.value })}
             className="text-center text-muted-foreground text-lg w-full bg-transparent border-dashed border-primary/30 focus-visible:border-primary shadow-none resize-none mx-auto"
             rows={2}
          />
        </motion.div>

        <div className="flex justify-center mb-10 relative z-20">
          <Button onClick={addProject} variant="outline" className="border-dashed border-primary/50 text-primary">
            <Plus className="w-4 h-4 mr-2" /> Add New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {data.projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              className="group/card relative bg-card/40 border border-primary/20 rounded-lg overflow-hidden shadow-sm"
            >
              <Button 
                 size="icon" 
                 variant="destructive" 
                 className="absolute -top-3 -right-3 h-8 w-8 z-50 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-full shadow-lg"
                 onClick={() => removeProject(index)}
              >
                 <Trash2 className="h-4 w-4" />
              </Button>

              <Tabs defaultValue="overview" className="w-full">
                <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-4">
                  <TabsList className="bg-transparent border-none">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">Overview</TabsTrigger>
                    <TabsTrigger value="details" className="data-[state=active]:bg-primary/20">Details</TabsTrigger>
                    <TabsTrigger value="casestudy" className="data-[state=active]:bg-primary/20">Case Study</TabsTrigger>
                  </TabsList>
                  <Input 
                     value={project.slug || ''}
                     onChange={(e) => updateProject(index, 'slug', e.target.value)}
                     placeholder="project-slug"
                     className="w-32 h-7 text-xs font-mono bg-transparent border-dashed text-right shadow-none focus-visible:ring-0"
                  />
                </div>

                <TabsContent value="overview" className="p-0 m-0">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Area Editor */}
                    <div className="w-full md:w-2/5 relative min-h-[200px] border-r border-primary/20 flex flex-col items-center justify-center p-4 bg-black/20 group/img">
                      {project.image ? (
                        <>
                          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <Input 
                               value={project.image}
                               onChange={(e) => updateProject(index, 'image', e.target.value)}
                               className="w-4/5 text-xs text-center border-dashed backdrop-blur-sm bg-background/50"
                               placeholder="Image URL"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="text-center w-full z-10">
                          <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <Input 
                             value={project.image}
                             onChange={(e) => updateProject(index, 'image', e.target.value)}
                             className="w-full text-xs text-center border-dashed"
                             placeholder="Image path (e.g. /1.png)"
                          />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2 z-20 w-4/5">
                        <Input 
                           value={project.category}
                           onChange={(e) => updateProject(index, 'category', e.target.value)}
                           className="h-6 text-[10px] uppercase font-bold bg-primary/80 text-primary-foreground border-none rounded-sm shadow-none w-full"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-3/5 p-5 flex flex-col h-full">
                       <Input
                         value={project.title}
                         onChange={(e) => updateProject(index, 'title', e.target.value)}
                         className="text-xl font-bold font-heading text-foreground mb-2 bg-transparent border-dashed border-primary/30 h-10 px-2"
                         placeholder="Project Title"
                       />
                       
                       <div className="flex items-center gap-2 mb-4">
                         <span className="text-xs font-mono text-muted-foreground">STATUS:</span>
                         <Input
                           value={project.status}
                           onChange={(e) => updateProject(index, 'status', e.target.value)}
                           className="h-6 text-xs text-green-500 bg-transparent border-dashed w-32 shadow-none px-1"
                         />
                       </div>

                       <Textarea
                         value={project.description}
                         onChange={(e) => updateProject(index, 'description', e.target.value)}
                         className="text-sm text-muted-foreground mb-4 bg-transparent border-dashed min-h-[80px]"
                         placeholder="Short description..."
                       />

                       <div className="mt-auto flex items-center gap-4 bg-secondary/10 p-2 rounded-md border border-border/50">
                          <div className="flex-1">
                            <span className="text-[10px] text-muted-foreground mb-1 block uppercase">Github URL</span>
                            <Input
                               value={project.githubUrl}
                               onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                               className="h-7 text-xs bg-transparent border-dashed"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] text-muted-foreground mb-1 block uppercase">Demo URL</span>
                            <Input
                               value={project.demoUrl}
                               onChange={(e) => updateProject(index, 'demoUrl', e.target.value)}
                               className="h-7 text-xs bg-transparent border-dashed"
                            />
                          </div>
                       </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="p-5 m-0 space-y-6">
                   <div>
                     <h4 className="text-sm font-semibold mb-2">Long Description</h4>
                     <Textarea
                       value={project.longDescription}
                       onChange={(e) => updateProject(index, 'longDescription', e.target.value)}
                       className="text-sm text-muted-foreground bg-transparent border-dashed min-h-[100px]"
                     />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <div className="flex items-center justify-between mb-2">
                         <h4 className="text-sm font-semibold">Technologies</h4>
                         <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => addArrayItem(index, 'technologies')}>
                           <Plus className="w-4 h-4" />
                         </Button>
                       </div>
                       <div className="space-y-2">
                         {project.technologies?.map((tech: string, i: number) => (
                           <div key={i} className="flex items-center gap-2 group/list">
                             <Input
                               value={tech}
                               onChange={(e) => updateArrayItem(index, 'technologies', i, e.target.value)}
                               className="h-8 text-xs bg-transparent border-dashed"
                             />
                             <button onClick={() => removeArrayItem(index, 'technologies', i)} className="opacity-0 group-hover/list:opacity-100 text-destructive"><X className="w-3 h-3"/></button>
                           </div>
                         ))}
                       </div>
                     </div>

                     <div>
                       <div className="flex items-center justify-between mb-2">
                         <h4 className="text-sm font-semibold">Features</h4>
                         <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => addArrayItem(index, 'features')}>
                           <Plus className="w-4 h-4" />
                         </Button>
                       </div>
                       <div className="space-y-2">
                         {project.features?.map((feat: string, i: number) => (
                           <div key={i} className="flex items-center gap-2 group/list">
                             <Input
                               value={feat}
                               onChange={(e) => updateArrayItem(index, 'features', i, e.target.value)}
                               className="h-8 text-xs bg-transparent border-dashed"
                             />
                             <button onClick={() => removeArrayItem(index, 'features', i)} className="opacity-0 group-hover/list:opacity-100 text-destructive"><X className="w-3 h-3"/></button>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                </TabsContent>

                <TabsContent value="casestudy" className="p-5 m-0">
                  <div className="space-y-2 flex flex-col h-[400px]">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Case Study Markdown Editor</h4>
                      <Badge variant="outline" className="font-mono text-[10px]">MD</Badge>
                    </div>
                    <Textarea 
                      value={project.caseStudy || ""}
                      onChange={(e) => updateProject(index, 'caseStudy', e.target.value)}
                      className="flex-1 font-mono text-xs p-4 bg-background/50 border-primary/20 resize-none shadow-inner"
                      placeholder="# Markdown Content Here"
                    />
                  </div>
                </TabsContent>

              </Tabs>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
