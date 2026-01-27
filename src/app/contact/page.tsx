'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2, Disc, Music, ArrowUpRight, Sparkles, HelpCircle, MessageSquare, ExternalLink, Github, Linkedin, Twitter, Instagram, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import dynamic from 'next/dynamic';
import ScrollVelocity from '@/components/ui/ScrollVelocity';

const Lanyard = dynamic(() => import('@/components/three/Lanyard').then(mod => mod.Lanyard), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-transparent"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
});

// Custom Marquee Component
function SocialTicker({ items, direction = 'left', speed = 30 }: { items: any[], direction?: 'left' | 'right', speed?: number }) {
    return (
        <div className="flex overflow-hidden relative w-full group py-4 select-none">
            <motion.div 
                className="flex gap-4 flex-nowrap"
                initial={{ x: direction === 'left' ? 0 : '-25%' }}
                animate={{ x: direction === 'left' ? '-50%' : 0 }} 
                transition={{ 
                    ease: "linear", 
                    duration: speed, 
                    repeat: Infinity,
                }}
                style={{ width: "max-content" }}
            >
                {/* 4x Duplication */}
                {[...items, ...items, ...items, ...items].map((item, idx) => (
                    <SocialCard key={`${item.platform}-${idx}`} item={item} />
                ))}
            </motion.div>
             
             {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
}

const socialIconsMap: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    discord: Disc,
    spotify: Music
};

function SocialCard({ item }: { item: any }) {
    const Icon = item.image || ArrowUpRight;
    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[140px] w-[280px] flex-col justify-between rounded-3xl border border-white/5 bg-white/5 dark:bg-zinc-900/40 p-6 shadow-xl transition-all hover:bg-white/10 dark:hover:bg-zinc-800/80 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-md overflow-hidden flex-shrink-0"
        >
             <div className="absolute -top-6 -right-6 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-125 duration-700">
                 <Icon className="w-40 h-40" />
             </div>

            <div className="relative z-10 flex items-center gap-4">
                <div className="relative h-12 w-12 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner ring-1 ring-white/5">
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">{item.name}</span>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80">@{item.username}</span>
                </div>
            </div>
            
            <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 group-hover:text-foreground/70 transition-colors">
                     Connect
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
        </a>
    );
}

function ContactForm() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.location.href = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="glass-card rounded-[3rem] p-10 border border-white/5 bg-card/10 h-full flex flex-col justify-center relative overflow-hidden ring-1 ring-white/5">
            <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="p-3.5 rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                     <h2 className="text-2xl font-bold tracking-tight">Send Message</h2>
                     <p className="text-sm text-muted-foreground mt-0.5">We usually reply within 24h</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-2">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                                className="w-full px-5 py-4 rounded-3xl bg-white/5 border border-white/5 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm outline-none placeholder:text-muted-foreground/20 font-medium" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div className="space-y-1.5">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-2">Email</label>
                             <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                                className="w-full px-5 py-4 rounded-3xl bg-white/5 border border-white/5 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm outline-none placeholder:text-muted-foreground/20 font-medium" 
                                placeholder="Address" 
                            />
                        </div>
                    </div>
                
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-2">Subject</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required 
                            className="w-full px-5 py-4 rounded-3xl bg-white/5 border border-white/5 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm outline-none placeholder:text-muted-foreground/20 font-medium" 
                            placeholder="Topic" 
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-2">Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} 
                            className="w-full px-5 py-4 rounded-3xl bg-white/5 border border-white/5 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm outline-none resize-none placeholder:text-muted-foreground/20 font-medium leading-relaxed" 
                            placeholder="Details..." 
                        />
                    </div>
                </div>

                <motion.button 
                    type="submit" 
                    disabled={status === 'loading'} 
                    className="w-full btn-creative flex items-center justify-center gap-2 py-4 rounded-3xl text-sm font-bold shadow-xl shadow-primary/10 mt-2 bg-primary text-primary-foreground hover:opacity-90 transition-all ring-1 ring-white/10" 
                    whileHover={{ scale: 1.01 }} 
                    whileTap={{ scale: 0.99 }}
                >
                    {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></>) : 
                        status === 'success' ? (<><CheckCircle className="w-5 h-5" /><span>Sent!</span></>) : 
                        status === 'error' ? (<><AlertCircle className="w-5 h-5" /><span>Error</span></>) : 
                        (<><Send className="w-5 h-5" /><span>Submit Message</span></>)}
                </motion.button>
            </form>
        </div>
    );
}

function FAQSection() {
    const t = useTranslations('contact');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: "Available for freelance?", a: "Yes, currently accepting new projects." },
        { q: "Payment methods?", a: "Crypto (USDT/USDC/ETH), Wise, PayPal." },
        { q: "Do you sign NDAs?", a: "Yes, happily." },
        { q: "What tech stack?", a: "Next.js, React, Node.js, Solidity." },
        { q: "Support included?", a: "30 days free support included." }
    ];

    return (
        <div className="glass-card rounded-[3rem] p-10 border border-white/5 bg-card/10 h-full flex flex-col relative overflow-hidden ring-1 ring-white/5">
            <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="p-3.5 rounded-3xl bg-secondary/10 text-secondary ring-1 ring-secondary/20">
                    <HelpCircle className="w-7 h-7" />
                </div>
                <div>
                     <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
                     <p className="text-sm text-muted-foreground mt-0.5">Quick answers</p>
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-hidden relative z-10">
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={index}
                        className={cn(
                            "rounded-3xl border transition-all duration-300",
                            openIndex === index 
                                ? "bg-primary/5 border-primary/20 shadow-md scale-[1.01]" 
                                : "bg-white/5 border-white/5 hover:bg-white/10"
                        )}
                    >
                        <button 
                            onClick={() => setOpenIndex(openIndex === index ? null : index)} 
                            className="w-full px-5 py-4 flex items-center justify-between text-left"
                        >
                            <span className={cn("text-sm font-bold transition-colors", openIndex === index ? "text-primary" : "text-foreground/90")}>
                                {faq.q}
                            </span>
                             <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 text-muted-foreground", openIndex === index && "rotate-180 text-primary")} />
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }} 
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const socialDescriptions: Record<string, string> = {
    GitHub: "Open Source",
    LinkedIn: "Professional",
    Twitter: "Thoughts",
    Instagram: "Lifestyle",
    Discord: "Community",
    Spotify: "Music"
};

export default function ContactPage() {
    
    // Example Socials
    const getSocialItem = (platform: string) => {
        const link = portfolioData.personal.socialLinks.find(l => l.platform.toLowerCase() === platform);
        return {
            name: (link?.platform || platform).charAt(0).toUpperCase() + (link?.platform || platform).slice(1),
            username: link?.username || '@user',
            body: socialDescriptions[link?.platform || platform] || "Connect",
            image: socialIconsMap[platform.toLowerCase()] || ArrowUpRight,
            url: link?.url || '#'
        };
    };

    const row1Real = ['linkedin', 'github', 'instagram'].map(getSocialItem);
    const row2Real = ['twitter', 'discord', 'spotify'].map(getSocialItem);

    return (
        <div className="min-h-screen relative overflow-hidden bg-background selection:bg-primary/20">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] pointer-events-none" />
            
            {/* 1. Header with Flow Layout (REMOVED absolute insert-0 to force flow with padding) */}
            <div className="relative w-full overflow-hidden z-0 flex flex-col justify-center min-h-[50vh] pt-40 pb-10">
                <div className="w-full flex items-center justify-center opacity-20 select-none pointer-events-none">
                    <ScrollVelocity 
                        texts={["Let's Build Something Amazing · ", "Available for Freelance · "]} 
                        velocity={20} 
                        className="text-7xl md:text-[9rem] font-black tracking-tight uppercase whitespace-nowrap"
                    />
                </div>
            </div>

            {/* 2. Content */}
            <div className="container-creative px-4 md:px-8 max-w-[1800px] mx-auto pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* LEFT COLUMN: Lanyard - Sticky & Full Height. */}
                    <div className="hidden lg:flex lg:col-span-5 flex-col relative sticky top-0 h-screen pointer-events-none">
                         <div className="w-full h-full pointer-events-auto">
                            <Lanyard />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col gap-10 pt-10">
                        {/* pt-10 to align with Lanyard center */}
                        
                        {/* Social Marquee */}
                        <div className="w-full">
                             <div className="flex items-center gap-3 mb-6 pl-2 border-l-4 border-primary/20 ml-1">
                                <Sparkles className="w-5 h-5 text-primary" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Social Connect</h3>
                             </div>
                             <div className="flex flex-col gap-5">
                                <SocialTicker items={row1Real} direction="right" speed={35} />
                                <SocialTicker items={row2Real} direction="left" speed={35} />
                             </div>
                        </div>

                        {/* Bottom: Grid 2 Cols -> FAQ (Left) | Form (Right) */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                             {/* FAQ Left */}
                             <div className="h-full w-full">
                                <FAQSection />
                             </div>
                             
                             {/* Form Right */}
                             <div className="h-full w-full">
                                <ContactForm />
                             </div>
                        </div>

                        {/* Mobile Lanyard Fallback */}
                        <div className="lg:hidden h-[400px] w-full relative mb-10">
                            <Lanyard />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
