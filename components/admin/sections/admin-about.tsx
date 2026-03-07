"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { saveContent } from '@/app/actions/cms';

export function AdminAbout({ initialData, onSave }: { initialData: any, onSave?: () => void }) {
  const { universe } = useGaming();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent('about.json', data);
    setSaving(false);
    if (result.success) {
      if (onSave) onSave();
    } else {
      alert('Failed to save.');
    }
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...data.paragraphs];
    newParagraphs[index] = value;
    setData({ ...data, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    setData({ ...data, paragraphs: [...data.paragraphs, ""] });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = [...data.paragraphs];
    newParagraphs.splice(index, 1);
    setData({ ...data, paragraphs: newParagraphs });
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg backdrop-blur-md bg-background/50">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save About
        </Button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16 max-w-2xl mx-auto">
          <Input
             value={data.heading}
             onChange={(e) => setData({ ...data, heading: e.target.value })}
             className={cn(
                "text-center text-3xl sm:text-4xl font-bold mb-4 tracking-wider bg-transparent border-none shadow-none focus-visible:ring-1",
                universe === 'lol' && "font-heading gold-text-static",
                universe === 'valorant' && "font-mono text-primary uppercase glitch-text",
                universe === 'cyberpunk' && "font-mono text-accent uppercase"
             )}
          />
          <div className={cn(
             "w-48 mx-auto mb-4",
             universe === 'lol' ? "lol-section-divider" : "h-[2px] bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
          )} />
          <Textarea
             value={data.subtitle}
             onChange={(e) => setData({ ...data, subtitle: e.target.value })}
             className="text-center text-muted-foreground text-lg w-full bg-transparent border-dashed border-primary/30 focus-visible:border-primary shadow-none resize-none"
             rows={2}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6 bg-secondary/10 p-6 rounded-lg border border-border/50">
            <Input
               value={data.journeyTitle}
               onChange={(e) => setData({ ...data, journeyTitle: e.target.value })}
               className={cn(
                  "text-2xl font-semibold mb-4 tracking-wide bg-transparent border-none shadow-none px-0 focus-visible:ring-1",
                  universe === 'lol' ? "font-heading text-primary" : 
                  universe === 'valorant' ? "font-mono text-primary uppercase" :
                  "font-mono text-accent uppercase"
               )}
            />
            {data.paragraphs.map((paragraph: string, index: number) => (
              <div key={index} className="relative group">
                <Textarea
                   value={paragraph}
                   onChange={(e) => updateParagraph(index, e.target.value)}
                   className="text-muted-foreground leading-relaxed bg-transparent border-dashed border-primary/20 focus-visible:border-primary shadow-none min-h-[100px]"
                />
                <Button 
                   size="icon" 
                   variant="destructive" 
                   className="absolute -right-3 -top-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                   onClick={() => removeParagraph(index)}
                >
                   <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addParagraph} className="w-full border-dashed">
               <Plus className="mr-2 h-4 w-4" /> Add Paragraph
            </Button>
          </motion.div>

          <motion.div className="flex flex-col items-center justify-center">
            <div className={cn("relative group", universe !== 'lol' && "p-4")}>
              
              {universe === 'lol' && (
                 <>
                    <div className="absolute -inset-3 rounded-full border border-primary/20 animate-rune-spin" />
                    <div className="absolute -inset-6 rounded-full border border-primary/10" />
                 </>
              )}

              {universe === 'valorant' && (
                 <>
                    <div className="absolute -inset-2 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.1)_50%,transparent_75%)] bg-[length:10px_10px]" />
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
                 </>
              )}
              
              {universe === 'cyberpunk' && (
                 <>
                    <div className="absolute -inset-2 bg-accent/5 clip-path-cyber" />
                 </>
              )}

              <div className={cn(
                 "relative overflow-hidden transition-all duration-500",
                 universe === 'lol' ? "w-[280px] h-[280px] rounded-full border-2 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.2)] group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]" :
                 universe === 'valorant' ? "w-[280px] h-[280px] border border-primary clip-path-slant grayscale group-hover:grayscale-0" :
                 "w-[280px] h-[280px] border border-accent clip-path-cyber"
              )}>
                <Image 
                  src={data.profileImage.startsWith('./') ? `/${data.profileImage.replace('./', '')}` : data.profileImage}
                  alt="Profile picture" 
                  fill 
                  className="object-cover"
                  priority
                />
                {universe === 'lol' && <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                {universe === 'valorant' && <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
                {universe === 'cyberpunk' && <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
              </div>
              
              {universe === 'lol' && (
                 <>
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
                 </>
              )}
            </div>
            
            <div className="mt-8 text-center bg-secondary/10 p-4 rounded-lg border border-border/50 max-w-sm w-full">
               <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Profile Image URL</div>
               <Input 
                  value={data.profileImage} 
                  onChange={(e) => setData({ ...data, profileImage: e.target.value })}
                  className="bg-transparent border-dashed text-center"
               />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
