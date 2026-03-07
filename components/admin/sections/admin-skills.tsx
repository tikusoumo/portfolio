"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2, Plus, Trash2, X } from 'lucide-react';
import { saveContent } from '@/app/actions/cms';

export function AdminSkills({ initialData, onSave }: { initialData: any, onSave?: () => void }) {
  const { playHover } = useAudio();
  const { universe } = useGaming();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const isSciFi = universe === 'valorant' || universe === 'cyberpunk';

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent('skills.json', data);
    setSaving(false);
    if (result.success) {
      if (onSave) onSave();
    } else {
      alert('Failed to save.');
    }
  };

  const updateCategory = (index: number, key: string, value: any) => {
    const newCategories = [...data.categories];
    newCategories[index] = { ...newCategories[index], [key]: value };
    setData({ ...data, categories: newCategories });
  };

  const addCategory = () => {
    setData({
      ...data,
      categories: [...data.categories, { title: "New Category", icon: "✨", skills: ["New Skill"] }]
    });
  };

  const removeCategory = (index: number) => {
    const newCategories = [...data.categories];
    newCategories.splice(index, 1);
    setData({ ...data, categories: newCategories });
  };

  const updateSkill = (catIndex: number, skillIndex: number, value: string) => {
    const newCategories = [...data.categories];
    const newSkills = [...newCategories[catIndex].skills];
    newSkills[skillIndex] = value;
    newCategories[catIndex] = { ...newCategories[catIndex], skills: newSkills };
    setData({ ...data, categories: newCategories });
  };

  const addSkill = (catIndex: number) => {
    const newCategories = [...data.categories];
    const newSkills = [...newCategories[catIndex].skills, "New Skill"];
    newCategories[catIndex] = { ...newCategories[catIndex], skills: newSkills };
    setData({ ...data, categories: newCategories });
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newCategories = [...data.categories];
    const newSkills = [...newCategories[catIndex].skills];
    newSkills.splice(skillIndex, 1);
    newCategories[catIndex] = { ...newCategories[catIndex], skills: newSkills };
    setData({ ...data, categories: newCategories });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg backdrop-blur-md bg-background/50">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Skills
        </Button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div className="text-center mb-16 max-w-2xl mx-auto">
          <Input
             value={data.heading}
             onChange={(e) => setData({ ...data, heading: e.target.value })}
             className={cn(
                "text-center text-3xl sm:text-4xl font-bold mb-4 tracking-wider drop-shadow-md bg-transparent border-none shadow-none focus-visible:ring-1",
                isSciFi ? "font-mono uppercase text-primary glitch-text" : "font-heading text-foreground"
             )}
          />
          <div className={cn(
             "w-48 mx-auto h-[2px] mb-4 transition-all duration-500",
             isSciFi ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))]" : "bg-gradient-to-r from-transparent via-primary to-transparent"
          )} />
          <Textarea
             value={data.subtitle}
             onChange={(e) => setData({ ...data, subtitle: e.target.value })}
             className="text-center text-muted-foreground text-lg w-full bg-transparent border-dashed border-primary/30 focus-visible:border-primary shadow-none resize-none mx-auto"
             rows={2}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.categories.map((category: any, catIndex: number) => (
            <motion.div key={catIndex} className="relative p-1 group/cat">
              <Button 
                 size="icon" 
                 variant="destructive" 
                 className="absolute -top-3 -right-3 h-8 w-8 z-50 opacity-0 group-hover/cat:opacity-100 transition-opacity rounded-full shadow-lg"
                 onClick={() => removeCategory(catIndex)}
              >
                 <Trash2 className="h-4 w-4" />
              </Button>

              <div className={cn(
                "relative p-6 h-full transition-all duration-500 group overflow-hidden pl-5 pr-5",
                isSciFi 
                  ? "bg-background/80 border border-primary/50 hover:border-primary clip-path-polygon" 
                  : "bg-surface border border-border/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-lg"
              )}>
                <div className={cn(
                  "absolute inset-0 opacity-20 transition-all duration-500",
                  isSciFi 
                    ? "bg-[linear-gradient(90deg,transparent_50%,hsl(var(--primary)/0.1)_50%)] bg-[length:4px_4px]" 
                    : "bg-[radial-gradient(circle,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[length:20px_20px]"
                )} />
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Input 
                     value={category.icon}
                     onChange={(e) => updateCategory(catIndex, "icon", e.target.value)}
                     className={cn(
                        "w-12 h-12 flex items-center justify-center text-center text-xl p-0 transition-all duration-300",
                        isSciFi 
                          ? "bg-primary/20 text-primary border border-primary rounded-none" 
                          : "bg-surface border border-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
                     )}
                  />
                  <Input
                     value={category.title}
                     onChange={(e) => updateCategory(catIndex, "title", e.target.value)}
                     className={cn(
                        "text-lg font-bold tracking-widest uppercase bg-transparent border-dashed border-primary/30 shadow-none px-2 focus-visible:border-primary w-full",
                        isSciFi ? "font-mono text-primary" : "font-heading text-foreground"
                     )}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {category.skills.map((skill: string, skillIndex: number) => (
                    <div key={skillIndex} className="relative group/skill flex items-center">
                      <Input
                         value={skill}
                         onChange={(e) => updateSkill(catIndex, skillIndex, e.target.value)}
                         className={cn(
                            "px-3 py-1 text-xs font-medium transition-all duration-300 h-8 w-24 bg-transparent shadow-none",
                            isSciFi 
                              ? "bg-primary/10 text-primary border border-primary/30 focus:border-primary"
                              : "bg-surface text-muted-foreground border border-border rounded-sm focus:text-foreground focus:border-primary"
                         )}
                      />
                      <button 
                         onClick={() => removeSkill(catIndex, skillIndex)}
                         className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover/skill:opacity-100 z-20 transition-opacity"
                      >
                         <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <Button size="sm" variant="ghost" className="h-8 px-2 border border-dashed border-primary/30" onClick={() => addSkill(catIndex)}>
                     <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {isSciFi ? (
                   <>
                     <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary pointer-events-none" />
                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary pointer-events-none" />
                   </>
                ) : (
                   <>
                     <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40 pointer-events-none" />
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40 pointer-events-none" />
                   </>
                )}
              </div>
            </motion.div>
          ))}
          
          <motion.div className="relative p-1 flex items-center justify-center min-h-[300px] border-2 border-dashed border-primary/20 rounded-lg hover:border-primary/50 transition-colors cursor-pointer" onClick={addCategory}>
             <div className="text-center text-muted-foreground flex flex-col items-center">
               <Plus className="w-12 h-12 mb-2 opacity-50" />
               <span className="font-medium tracking-wider uppercase text-sm">Add Category</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
