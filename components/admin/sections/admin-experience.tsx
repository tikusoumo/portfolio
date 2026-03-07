"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Save, Loader2, Plus, Trash2, X } from 'lucide-react';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveContent } from '@/app/actions/cms';

export function AdminExperience({ initialData, onSave }: { initialData: any, onSave?: () => void }) {
  const { universe } = useGaming();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent('experience.json', data);
    setSaving(false);
    if (result.success) {
      if (onSave) onSave();
    } else {
      alert('Failed to save.');
    }
  };

  const updateExperience = (index: number, key: string, value: any) => {
    const newExps = [...data.experiences];
    newExps[index] = { ...newExps[index], [key]: value };
    setData({ ...data, experiences: newExps });
  };

  const addExperience = () => {
    setData({
      ...data,
      experiences: [
        {
          title: "New Role",
          company: "Company Name",
          period: "Jan 2024 - Present",
          location: "Remote",
          type: "Full-time",
          description: ["Key achievement", "Another detail"],
          technologies: ["React", "TypeScript"],
          image: ""
        },
        ...data.experiences
      ]
    });
  };

  const removeExperience = (index: number) => {
    const newExps = [...data.experiences];
    newExps.splice(index, 1);
    setData({ ...data, experiences: newExps });
  };

  const updateDescription = (expIndex: number, descIndex: number, value: string) => {
    const newExps = [...data.experiences];
    const newDesc = [...newExps[expIndex].description];
    newDesc[descIndex] = value;
    newExps[expIndex] = { ...newExps[expIndex], description: newDesc };
    setData({ ...data, experiences: newExps });
  };

  const addDescription = (expIndex: number) => {
    const newExps = [...data.experiences];
    const newDesc = [...newExps[expIndex].description, "New bullet point"];
    newExps[expIndex] = { ...newExps[expIndex], description: newDesc };
    setData({ ...data, experiences: newExps });
  };

  const removeDescription = (expIndex: number, descIndex: number) => {
    const newExps = [...data.experiences];
    const newDesc = [...newExps[expIndex].description];
    newDesc.splice(descIndex, 1);
    newExps[expIndex] = { ...newExps[expIndex], description: newDesc };
    setData({ ...data, experiences: newExps });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg backdrop-blur-md bg-background/50">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Experience
        </Button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/15 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div className="text-center mb-16 max-w-2xl mx-auto">
          <Input
             value={data.heading}
             onChange={(e) => setData({ ...data, heading: e.target.value })}
             className={cn(
                "text-center text-3xl sm:text-4xl font-bold mb-4 tracking-wider bg-transparent border-none shadow-none focus-visible:ring-1",
                universe === 'lol' && "font-heading gold-text-static",
                universe === 'valorant' && "font-mono text-primary uppercase glitch-text drop-shadow-[0_0_8px_hsl(var(--primary))]",
                universe === 'cyberpunk' && "font-mono text-accent uppercase drop-shadow-[0_0_8px_hsl(var(--accent))]"
             )}
          />
          <div className={cn(
             "w-48 mx-auto mb-4",
             universe === 'lol' ? "lol-section-divider" : "h-[2px] bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
          )} />
          <Textarea
             value={data.subtitle}
             onChange={(e) => setData({ ...data, subtitle: e.target.value })}
             className="text-center text-muted-foreground text-lg w-full bg-transparent border-dashed border-primary/30 focus-visible:border-primary shadow-none resize-none mx-auto"
             rows={2}
          />
        </motion.div>

        <div className="flex justify-center mb-10 relative z-20">
          <Button onClick={addExperience} variant="outline" className="border-dashed border-primary/50 text-primary">
            <Plus className="w-4 h-4 mr-2" /> Add Experience Entry
          </Button>
        </div>

        <div className="relative">
          <div className={cn(
             "absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block",
             universe === 'lol' && "bg-gradient-to-b from-primary/40 via-primary/20 to-transparent",
             universe === 'valorant' && "bg-primary shadow-[0_0_15px_hsl(var(--primary))]",
             universe === 'cyberpunk' && "bg-accent shadow-[0_0_15px_hsl(var(--accent))] border-x border-background/50"
          )} />
          
          <div className="space-y-10">
            {data.experiences.map((experience: any, index: number) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 hidden md:flex">
                  <div className="relative flex items-center justify-center">
                    <div className={cn(
                       "z-10",
                       universe === 'lol' && "w-4 h-4 bg-primary rounded-full border-2 border-background shadow-[0_0_10px_hsl(var(--primary))]",
                       universe === 'valorant' && "w-6 h-6 bg-background border-2 border-primary rotate-45 flex items-center justify-center after:content-[''] after:w-2 after:h-2 after:bg-primary after:shadow-[0_0_8px_hsl(var(--primary))]",
                       universe === 'cyberpunk' && "w-5 h-5 bg-accent rounded-sm border-2 border-background shadow-[0_0_15px_hsl(var(--accent))]"
                    )} />
                    {universe === 'lol' && <div className="absolute inset-0 w-4 h-4 bg-primary/30 rounded-full animate-ping" />}
                  </div>
                </div>

                <div className="md:w-1/2" />
                
                <div className="md:w-1/2 group/card relative">
                  <Button 
                     size="icon" 
                     variant="destructive" 
                     className="absolute -top-3 -right-3 h-8 w-8 z-50 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-full shadow-lg"
                     onClick={() => removeExperience(index)}
                  >
                     <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className={cn(
                     "relative p-6 transition-all duration-500 overflow-hidden",
                     universe === 'lol' && "rounded-sm bg-card/40 border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
                     universe === 'valorant' && "bg-background/80 border border-primary/30 hover:border-primary clip-path-slant",
                     universe === 'cyberpunk' && "bg-surface/50 border border-accent/30 hover:border-accent hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] clip-path-cyber"
                  )}>
                    {universe === 'lol' && (
                       <>
                          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/25 pointer-events-none" />
                          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/25 pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/25 pointer-events-none" />
                          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/25 pointer-events-none" />
                       </>
                    )}
                    
                    <div className={cn(
                       "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none",
                       universe === 'lol' && "bg-gradient-to-br from-primary/[0.05] to-transparent group-hover:opacity-100",
                       universe === 'valorant' && "bg-primary/5 group-hover:opacity-100",
                       universe === 'cyberpunk' && "bg-accent/5 group-hover:opacity-100"
                    )} />

                    {/* Image Banner Editor */}
                    <div className="w-full relative z-10 mb-6">
                      {experience.image ? (
                        <div className="w-full h-48 sm:h-64 rounded-md overflow-hidden border border-primary/20 shadow-md relative bg-background/50 group/img flex-shrink-0">
                          <img src={experience.image} alt={experience.company} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center transition-opacity gap-4">
                             <Input
                               value={experience.image || ''}
                               onChange={(e) => updateExperience(index, 'image', e.target.value)}
                               className="w-3/4 text-xs font-mono bg-background/80 border-dashed border-primary/30 shadow-none text-center"
                               placeholder="Logo / Image URL"
                             />
                             <Button size="sm" variant="destructive" onClick={() => updateExperience(index, 'image', '')}>
                               <Trash2 className="w-4 h-4 mr-2" /> Remove Image
                             </Button>
                          </div>
                        </div>
                      ) : (
                        <Input
                           value={experience.image || ''}
                           onChange={(e) => updateExperience(index, 'image', e.target.value)}
                           className="text-xs font-mono bg-transparent border-dashed border-primary/30 shadow-none focus-visible:border-primary h-10 w-full"
                           placeholder="Add Hero Image URL (e.g., /cyberpeak.jpeg)"
                        />
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 relative z-10">
                      <div className="w-full flex flex-col gap-2">
                        <Input
                           value={experience.title}
                           onChange={(e) => updateExperience(index, 'title', e.target.value)}
                           className={cn(
                              "text-lg font-semibold tracking-wide bg-transparent border-dashed border-primary/30 shadow-none focus-visible:border-primary mb-1",
                              universe === 'lol' && "font-heading text-primary",
                              universe === 'valorant' && "font-mono text-foreground uppercase",
                              universe === 'cyberpunk' && "font-mono text-accent uppercase"
                           )}
                           placeholder="Job Title"
                        />
                        <Input
                           value={experience.company}
                           onChange={(e) => updateExperience(index, 'company', e.target.value)}
                           className={cn(
                              "text-base bg-transparent border-dashed border-primary/30 shadow-none focus-visible:border-primary h-8",
                              universe === 'lol' && "font-medium text-muted-foreground",
                              universe === 'valorant' && "font-mono text-primary/80 drop-shadow-md",
                              universe === 'cyberpunk' && "font-bold text-foreground drop-shadow-[0_0_2px_#fff]"
                           )}
                           placeholder="Company Name"
                        />
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1.5 relative z-10 min-w-[140px]">
                        <div className="flex items-center gap-2 w-full">
                          <CalendarDays className={cn("h-3.5 w-3.5 flex-shrink-0", universe === 'cyberpunk' ? "text-accent" : "text-primary/70")} />
                          <Input
                             value={experience.period}
                             onChange={(e) => updateExperience(index, 'period', e.target.value)}
                             className="text-xs text-muted-foreground font-mono bg-transparent border-dashed border-primary/30 p-1 h-6 shadow-none"
                          />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                          <MapPin className={cn("h-3.5 w-3.5 flex-shrink-0", universe === 'cyberpunk' ? "text-accent" : "text-primary/70")} />
                          <Input
                             value={experience.location}
                             onChange={(e) => updateExperience(index, 'location', e.target.value)}
                             className="text-xs text-muted-foreground font-mono bg-transparent border-dashed border-primary/30 p-1 h-6 shadow-none"
                          />
                        </div>
                        <Input
                           value={experience.type}
                           onChange={(e) => updateExperience(index, 'type', e.target.value)}
                           className={cn(
                              "text-[10px] uppercase tracking-wider bg-transparent border-dashed p-1 h-6 shadow-none text-center mt-1 w-full",
                              universe === 'lol' && "border-primary/30 text-primary/80",
                              universe === 'valorant' && "border-primary text-primary bg-primary/10 rounded-none",
                              universe === 'cyberpunk' && "border-accent text-accent bg-accent/10 font-mono"
                           )}
                        />
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-5 relative z-10 w-full pl-2">
                      {experience.description.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="flex items-start gap-2.5 group/desc relative">
                          {universe === 'lol' ? (
                             <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
                          ) : (
                             <div className={cn("w-2 h-2 mt-2 flex-shrink-0", universe === 'cyberpunk' ? "bg-accent" : "bg-primary clip-path-slant")} />
                          )}
                          <Textarea
                             value={item}
                             onChange={(e) => updateDescription(index, itemIndex, e.target.value)}
                             className={cn(
                                "text-sm leading-relaxed bg-transparent border-dashed border-primary/20 shadow-none min-h-[40px] p-1 flex-1",
                                universe === 'lol' ? "text-muted-foreground" : "text-foreground font-mono opacity-80"
                             )}
                          />
                          <button 
                             onClick={() => removeDescription(index, itemIndex)}
                             className="absolute -right-2 top-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover/desc:opacity-100 transition-opacity"
                          >
                             <X className="w-3 h-3" />
                          </button>
                        </li>
                      ))}
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs border border-dashed border-primary/30" onClick={() => addDescription(index)}>
                         <Plus className="w-3 h-3 mr-1" /> Add Detail
                      </Button>
                    </ul>
                    
                    <div className="relative z-10">
                      <h4 className={cn(
                         "text-xs font-medium mb-2.5 uppercase tracking-wider",
                         universe === 'lol' ? "text-foreground/60" : "text-muted-foreground font-mono"
                      )}>
                        Technologies (comma separated)
                      </h4>
                      <Input
                         value={experience.technologies.join(', ')}
                         onChange={(e) => updateExperience(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                         className={cn(
                            "text-xs bg-transparent border-dashed border-primary/30 shadow-none w-full",
                            universe === 'valorant' && "font-mono",
                            universe === 'cyberpunk' && "font-mono text-accent"
                         )}
                         placeholder="React, Node.js, Next.js..."
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
