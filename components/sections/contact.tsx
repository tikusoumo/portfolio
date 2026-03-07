"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useAudio } from '@/components/audio-provider';
import { useGaming } from '@/components/gaming-provider';
import { cn } from '@/lib/utils';
import contactData from '@/content/contact.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MapPin,
};

export function Contact() {
  const { playClick, playQueuePop, playHover } = useAudio();
  const { universe } = useGaming();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQueuePop, setShowQueuePop] = useState(false); // Match Found Modal

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);

    // Simulate "Finding Match" delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Trigger "Match Found" (Queue Pop)
    playQueuePop();
    setShowQueuePop(true);
    
    // Auto-accept after delay (or user can click accept)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success
    toast.success(
       universe === 'lol' ? 'Message sent! I\'ll accept the match soon.' :
       universe === 'valorant' ? 'Transmission sent! Awaiting protocol response.' :
       'Ping successful. Connecting to secure channel.'
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    setShowQueuePop(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn(
             "text-3xl sm:text-4xl font-bold mb-4 tracking-wider",
             universe === 'lol' ? "font-heading text-[#f0e6d2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" :
             universe === 'valorant' ? "font-mono text-primary uppercase glitch-text" :
             "font-mono text-accent uppercase drop-shadow-[0_0_8px_hsl(var(--accent))]"
          )}>
            <span className={cn(
               universe === 'lol' && "bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] bg-clip-text text-transparent"
            )}>
              {contactData.heading}
            </span>
          </h2>
          <div className={cn(
             "w-48 mx-auto mb-4",
             universe === 'lol' ? "h-[2px] bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent shadow-[0_0_10px_#c8aa6e]" :
             "h-[2px] bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
          )} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Friend List Style Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className={cn(
               "p-1",
               universe === 'lol' && "bg-[#091428] border border-[#c8aa6e]/30",
               universe === 'valorant' && "bg-background border border-primary/30 clip-path-slant",
               universe === 'cyberpunk' && "bg-background border border-accent/30 shadow-[0_0_10px_hsl(var(--accent)/0.1)]"
            )}>
              <div className={cn(
                 "p-4 text-xs font-bold uppercase tracking-widest border-b mb-2",
                 universe === 'lol' ? "bg-background text-[#c8aa6e] border-[#c8aa6e]/20" :
                 universe === 'valorant' ? "bg-primary/10 text-primary border-primary/30 font-mono" :
                 "bg-accent/10 text-accent border-accent/20 font-mono"
              )}>
                {universe === 'lol' ? 'Social Panel' : universe === 'valorant' ? 'Network Hub' : 'Secure Connections'}
              </div>
              {contactData.info.map((info, index) => {
                const IconComponent = iconMap[info.icon];
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                       "p-3 transition-colors flex items-center gap-3 cursor-default group",
                       universe === 'lol' ? "hover:bg-surface" : "hover:bg-primary/5"
                    )}
                    onMouseEnter={() => playHover()}
                  >
                     <div className={cn(
                        "w-8 h-8 flex items-center justify-center relative",
                        universe === 'lol' && "rounded-full border border-[#c8aa6e]/50 bg-[#091428]",
                        universe === 'valorant' && "bg-primary/10 border border-primary clip-path-slant",
                        universe === 'cyberpunk' && "bg-accent/10 border border-accent clip-path-cyber"
                     )}>
                        {IconComponent && <IconComponent className={cn("h-4 w-4", universe === 'cyberpunk' ? "text-accent" : "text-primary")} />}
                        <div className={cn(
                           "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500",
                           universe === 'lol' ? "rounded-full border-2 border-background" : "shadow-[0_0_5px_#0f0]" 
                        )} />
                     </div>
                     <div>
                        <div className={cn(
                           "text-sm font-bold transition-colors",
                           universe === 'lol' && "text-[#f0e6d2] group-hover:text-[#c8aa6e]",
                           universe === 'valorant' && "text-foreground font-mono group-hover:text-primary",
                           universe === 'cyberpunk' && "text-accent font-mono drop-shadow-[0_0_2px_hsl(var(--accent))]"
                        )}>{info.title}</div>
                        <div className={cn("text-xs truncate max-w-[150px]", universe === 'lol' ? "text-muted-foreground" : "text-foreground font-mono opacity-80")}>{info.value}</div>
                     </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Lobby Chat Style Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className={cn(
               "relative p-1",
               universe === 'lol' && "bg-[#091428] border border-[#463714] shadow-[0_0_20px_rgba(0,0,0,0.5)]",
               universe === 'valorant' && "bg-background border border-primary/50 clip-path-slant-rev shadow-[0_0_15px_hsl(var(--primary)/0.2)]",
               universe === 'cyberpunk' && "bg-surface/50 border border-accent/50 shadow-[0_0_20px_hsl(var(--accent)/0.2)] clip-path-cyber"
            )}>
              {/* Chat Header */}
              <div className={cn(
                 "border-b p-4 flex items-center justify-between",
                 universe === 'lol' ? "bg-surface border-[#463714]" : 
                 universe === 'valorant' ? "bg-primary/10 border-primary/30" : 
                 "bg-accent/10 border-accent/30"
              )}>
                <div className={cn(
                   "font-bold tracking-widest text-sm uppercase",
                   universe === 'lol' ? "text-[#f0e6d2] font-heading" : "text-primary font-mono"
                )}>
                   {universe === 'lol' ? "Lobby Chat" : universe === 'valorant' ? "Secure Transmission" : "Netrunner Terminal"}
                </div>
                <MessageSquare className={cn("w-4 h-4", universe === 'lol' ? "text-[#463714]" : "text-primary")} />
              </div>
              
              <div className={cn(
                 "p-6 lg:p-8 backdrop-blur-sm",
                 universe === 'lol' && "bg-[#010a13]/50"
              )}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className={cn("text-xs uppercase tracking-wider", universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono")}>
                          {universe === 'lol' ? "Summoner Name" : universe === 'valorant' ? "Agent Designation" : "Alias"}
                       </Label>
                       <Input
                         name="name"
                         value={formData.name}
                         onChange={handleInputChange}
                         required
                         className={cn(
                            "focus:ring-0 transition-colors",
                            universe === 'lol' && "bg-[#091428] border-[#463714] text-[#f0e6d2] focus:border-[#c8aa6e] placeholder:text-[#463714]",
                            universe === 'valorant' && "bg-transparent border-primary/50 text-foreground focus:border-primary placeholder:text-muted-foreground/50 rounded-none font-mono",
                            universe === 'cyberpunk' && "bg-transparent border-accent/50 text-accent focus:border-accent placeholder:text-accent/30 rounded-none font-mono"
                         )}
                         placeholder="Enter Name"
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className={cn("text-xs uppercase tracking-wider", universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono")}>
                          {universe === 'lol' ? "Email Address" : "Secure Commlink"}
                       </Label>
                       <Input
                         name="email"
                         type="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         required
                         className={cn(
                            "focus:ring-0 transition-colors",
                            universe === 'lol' && "bg-[#091428] border-[#463714] text-[#f0e6d2] focus:border-[#c8aa6e] placeholder:text-[#463714]",
                            universe === 'valorant' && "bg-transparent border-primary/50 text-foreground focus:border-primary placeholder:text-muted-foreground/50 rounded-none font-mono",
                            universe === 'cyberpunk' && "bg-transparent border-accent/50 text-accent focus:border-accent placeholder:text-accent/30 rounded-none font-mono"
                         )}
                         placeholder="Enter Email"
                       />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <Label className={cn("text-xs uppercase tracking-wider", universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono")}>Subject</Label>
                     <Input
                       name="subject"
                       value={formData.subject}
                       onChange={handleInputChange}
                       required
                       className={cn(
                          "focus:ring-0 transition-colors",
                          universe === 'lol' && "bg-[#091428] border-[#463714] text-[#f0e6d2] focus:border-[#c8aa6e] placeholder:text-[#463714]",
                          universe === 'valorant' && "bg-transparent border-primary/50 text-foreground focus:border-primary placeholder:text-muted-foreground/50 rounded-none font-mono",
                          universe === 'cyberpunk' && "bg-transparent border-accent/50 text-accent focus:border-accent placeholder:text-accent/30 rounded-none font-mono"
                       )}
                       placeholder="Topic"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label className={cn("text-xs uppercase tracking-wider", universe === 'lol' ? "text-[#a09b8c]" : "text-muted-foreground font-mono")}>Message</Label>
                     <Textarea
                       name="message"
                       value={formData.message}
                       onChange={handleInputChange}
                       required
                       rows={6}
                       className={cn(
                          "focus:ring-0 resize-none transition-colors",
                          universe === 'lol' && "bg-[#091428] border-[#463714] text-[#f0e6d2] focus:border-[#c8aa6e] placeholder:text-[#463714]",
                          universe === 'valorant' && "bg-transparent border-primary/50 text-foreground focus:border-primary placeholder:text-muted-foreground/50 rounded-none font-mono",
                          universe === 'cyberpunk' && "bg-transparent border-accent/50 text-accent focus:border-accent placeholder:text-accent/30 rounded-none font-mono"
                       )}
                       placeholder="Type your message here..."
                     />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => playHover()}
                    className={cn(
                       "w-full py-3 font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                       universe === 'lol' && "bg-surface border border-[#c8aa6e] text-[#f0e6d2] font-heading hover:bg-[#c8aa6e] hover:text-[#010a13] shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_#c8aa6e]",
                       universe === 'valorant' && "bg-primary text-background font-mono clip-path-slant hover:bg-transparent hover:text-primary hover:border hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
                       universe === 'cyberpunk' && "bg-transparent border border-accent text-accent font-mono hover:bg-accent hover:text-background shadow-[0_0_10px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_20px_hsl(var(--accent))]"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">{universe === 'lol' ? "Finding Match..." : "Encrypting..."}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> 
                        {universe === 'lol' ? "Send Invite" : universe === 'valorant' ? "Transmit" : "Execute"}
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Match Found Overlay (Queue Pop) */}
              {showQueuePop && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
                >
                  <div className={cn(
                     "flex flex-col items-center justify-center relative animate-pulse",
                     universe === 'lol' ? "w-64 h-64 rounded-full border-4 border-[#c8aa6e] shadow-[0_0_50px_#c8aa6e]" :
                     universe === 'valorant' ? "w-64 h-32 border-2 border-primary bg-primary/10 shadow-[0_0_30px_hsl(var(--primary))]" :
                     "w-64 h-40 border-2 border-accent bg-accent/10 shadow-[0_0_30px_hsl(var(--accent))] border-dashed"
                  )}>
                     {universe === 'lol' && <div className="absolute inset-0 rounded-full border-2 border-[#091428] animate-[spin_10s_linear_infinite]" />}
                     
                     <h3 className={cn(
                        "text-2xl font-bold uppercase tracking-widest mb-2",
                        universe === 'lol' ? "text-[#f0e6d2] font-heading" : "text-primary font-mono"
                     )}>
                        {universe === 'lol' ? "Match Found" : universe === 'valorant' ? "Link Established" : "Access Granted"}
                     </h3>
                     
                     <div className={cn(
                        "rounded-full mt-4 animate-[width_2s_ease-in-out]",
                        universe === 'lol' ? "w-32 h-1 bg-[#c8aa6e]" : "w-32 h-2 bg-primary"
                     )} />
                     
                     <p className={cn(
                        "text-xs mt-2 uppercase",
                        universe === 'lol' ? "text-[#a09b8c]" : "text-primary/70 font-mono"
                     )}>Accepting...</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}