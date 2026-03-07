"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { saveContent } from '@/app/actions/cms';
import { Loader2, Save, Trash2, Plus } from 'lucide-react';

interface JsonEditorProps {
  filename: string;
  initialData: any;
}

export function JsonEditor({ filename, initialData }: JsonEditorProps) {
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent(filename, data);
    setSaving(false);

    if (result.success) {
      alert('Saved successfully!'); 
    } else {
      alert('Failed to save.');
    }
  };

  const handleDeepChange = (path: (string | number)[], value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const getTemplate = (arr: any[]) => {
    if (arr.length === 0) return "";
    const first = arr[0];
    if (typeof first === "string") return "";
    if (typeof first === "number") return 0;
    if (typeof first === "boolean") return false;
    if (Array.isArray(first)) return [];
    if (typeof first === "object" && first !== null) {
      const tmpl: any = {};
      for (const key in first) {
        tmpl[key] = typeof first[key] === "string" ? "" :
                    typeof first[key] === "number" ? 0 :
                    typeof first[key] === "boolean" ? false :
                    Array.isArray(first[key]) ? [] : null;
      }
      return tmpl;
    }
    return "";
  };

  const addArrayItem = (path: (string | number)[]) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length; i++) {
        if (current[path[i]] === undefined) return newData;
        current = current[path[i]];
      }
      if (Array.isArray(current)) {
        current.push(getTemplate(current));
      }
      return newData;
    });
  };

  const removeArrayItem = (path: (string | number)[], index: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      if (Array.isArray(current)) {
        current.splice(index, 1);
      }
      return newData;
    });
  };

  const RenderNode = ({ name, value, path }: { name: string, value: any, path: (string | number)[] }) => {
    const isArray = Array.isArray(value);
    const isObject = typeof value === 'object' && value !== null && !isArray;
    const isBoolean = typeof value === 'boolean';
    const isNumber = typeof value === 'number';
    const isString = typeof value === 'string';
    
    const isLongText = isString && (value.length > 60 || name.toLowerCase().includes('description') || name.toLowerCase().includes('casestudy'));

    if (isString || isNumber) {
      // Small adjustment if name is empty (like in string arrays)
      const labelText = name ? name.replace(/([A-Z])/g, ' $1').trim() : "Value";

      return (
        <div className="mb-4 pl-4 border-l-2 border-border/50">
          <Label className="capitalize font-medium mb-1.5 block text-muted-foreground">{labelText}</Label>
          {isLongText ? (
             <Textarea
               value={value as string}
               onChange={(e) => handleDeepChange(path, e.target.value)}
               className="font-mono text-sm bg-background"
               rows={name.toLowerCase().includes('casestudy') ? 12 : 3}
             />
          ) : (
             <Input
               type={isNumber ? "number" : "text"}
               value={value}
               onChange={(e) => handleDeepChange(path, isNumber ? Number(e.target.value) : e.target.value)}
               className="bg-background"
             />
          )}
        </div>
      );
    }

    if (isBoolean) {
       return (
         <div className="mb-4 pl-4 border-l-2 border-border/50 flex items-center justify-between">
           <Label className="capitalize font-medium text-muted-foreground">{name.replace(/([A-Z])/g, ' $1').trim()}</Label>
           <Switch checked={value} onCheckedChange={(checked) => handleDeepChange(path, checked)} />
         </div>
       );
    }

    if (isArray) {
       return (
         <div className="mb-6 pl-4 border-l-2 border-primary/50">
            <div className="flex items-center justify-between mb-3 bg-secondary/20 p-2 rounded-md">
               <Label className="capitalize font-bold text-primary">{name.replace(/([A-Z])/g, ' $1').trim()} (Array)</Label>
               <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => addArrayItem(path)}>
                  <Plus className="w-3 h-3 mr-1" /> Add Item
               </Button>
            </div>
            <div className="space-y-4 pl-2">
               {value.map((item: any, index: number) => (
                  <div key={index} className="relative border border-border/50 rounded-md p-4 bg-card/50">
                     <div className="absolute top-2 right-2 z-10">
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => removeArrayItem(path, index)}>
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                     <span className="text-xs font-mono text-muted-foreground/50 mb-4 block">Item #{index}</span>
                     {typeof item === 'object' && item !== null && !Array.isArray(item) ? (
                        Object.entries(item).map(([k, v]) => (
                           <RenderNode key={k} name={k} value={v} path={[...path, index, k]} />
                        ))
                     ) : (
                        <RenderNode name="" value={item} path={[...path, index]} />
                     )}
                  </div>
               ))}
               {value.length === 0 && (
                 <p className="text-sm text-muted-foreground italic pl-2">Empty array.</p>
               )}
            </div>
         </div>
       );
    }

    if (isObject) {
       return (
         <div className="mb-6 pl-4 border-l-2 border-secondary">
            <Label className="capitalize font-bold text-foreground mb-3 block p-2 bg-secondary/10 rounded-md">{name.replace(/([A-Z])/g, ' $1').trim()}</Label>
            <div className="pl-2 space-y-2">
               {Object.entries(value).map(([k, v]) => (
                 <RenderNode key={k} name={k} value={v} path={[...path, k]} />
               ))}
            </div>
         </div>
       );
    }

    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 z-20 bg-background/80 backdrop-blur-md pb-4 pt-2 border-b">
        <h2 className="text-2xl font-bold font-heading uppercase tracking-wider">{filename.replace('.json', '')} Editor</h2>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>
      
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        {data && typeof data === 'object' ? (
           Object.entries(data).map(([k, v]) => (
              <RenderNode key={k} name={k} value={v} path={[k]} />
           ))
        ) : (
           <p>Invalid root data type.</p>
        )}
      </div>
    </div>
  );
}
