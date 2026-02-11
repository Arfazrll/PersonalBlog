'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2, Disc, Music, ArrowUpRight, Sparkles, HelpCircle, MessageSquare, ExternalLink, Github, Linkedin, Twitter, Instagram, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import dynamic from 'next/dynamic';
import ScrollVelocity from '@/components/ui/ScrollVelocity';

const Lanyard = dynamic<{ isLowPowerMode?: boolean }>(() => import('@/components/three/Lanyard').then(mod => mod.Lanyard), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-transparent"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
});

import { Meteors } from '@/components/ui/meteors';

// Custom Marquee Component
function SocialTicker({ items, direction = 'left', speed = 30, isLowPowerMode = false }: { items: any[], direction?: 'left' | 'right', speed?: number, isLowPowerMode?: boolean }) {
    return (
        <div className="flex overflow-hidden relative w-full group py-4 select-none">
            <motion.div
                className="flex gap-4 flex-nowrap"
                initial={{ x: direction === 'left' ? 0 : '-25%' }}
                animate={isLowPowerMode ? { x: direction === 'left' ? 0 : '-25%' } : { x: direction === 'left' ? '-50%' : 0 }}
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
            className="group relative flex h-[140px] w-[280px] flex-col justify-between rounded-3xl border border-primary/5 bg-primary/[0.03] dark:bg-white/[0.02] p-6 shadow-2xl transition-all hover:bg-primary/10 dark:hover:bg-white/5 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm overflow-hidden flex-shrink-0"
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

            <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 group-hover:text-foreground/70 transition-colors">
                    Connect
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
        </a>
    );
}

const InputGroup = ({ label, name, type = "text", value, onChange, required = false }: any) => {
    return (
        <div className="group relative z-0 w-full mb-10">
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={1} // Start small, user can expand if needed but we want sleekness
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 resize-y min-h-[50px] max-h-[200px]"
                    placeholder=" "
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder=" "
                />
            )}
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-sm font-bold tracking-widest text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-foreground">
                {label.toUpperCase()}
            </label>
        </div>
    );
};

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
        <div className="w-full relative z-20">
            {/* Typography Header - Creative & Big */}
            <div className="mb-16">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground relative z-10">
                    {t('hero.title')}
                </h2>
                <p className="text-lg text-muted-foreground mt-4 font-light max-w-md">
                    {t('hero.subtitle')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full relative z-10">
                <InputGroup label={t('form.name')} name="name" value={formData.name} onChange={handleChange} required />
                <InputGroup label={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputGroup label={t('form.subject')} name="subject" value={formData.subject} onChange={handleChange} required />
                <InputGroup
                    label={t('form.messagePlaceholder')} // Using placeholder label style
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                {/* Creative Large Button */}
                <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full flex items-center justify-between border-b-2 border-foreground py-8 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:pl-4 transition-all duration-300">
                        {status === 'loading' ? t('form.sending') : status === 'success' ? t('form.sent') : t('form.submit')}
                    </span>

                    <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-full bg-foreground text-background group-hover:scale-110 transition-transform duration-500">
                        {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> :
                            status === 'success' ? <CheckCircle className="w-6 h-6" /> :
                                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        }
                    </div>
                </motion.button>
            </form>
        </div>
    );
}

function FAQSection() {
    const t = useTranslations('contact');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: t('faqData.0.q'),
            a: t('faqData.0.a')
        },
        {
            q: t('faqData.1.q'),
            a: t('faqData.1.a')
        },
        {
            q: t('faqData.2.q'),
            a: t('faqData.2.a')
        },
        {
            q: t('faqData.3.q'),
            a: t('faqData.3.a')
        },
        {
            q: t('faqData.4.q'),
            a: t('faqData.4.a')
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto py-20 px-4 md:px-8">
            <div className="flex flex-col items-center mb-16 relative z-10 text-center">

                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
                <div className="h-1 w-20 bg-primary/20 rounded-full" />
            </div>

            <div className="space-y-0 relative z-10">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-border last:border-0"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full py-8 md:py-10 flex items-center justify-between text-left group"
                        >
                            <span className={cn(
                                "text-xl md:text-3xl font-bold tracking-tight transition-all duration-300",
                                openIndex === index ? "text-primary translate-x-2" : "text-foreground/90 group-hover:text-foreground group-hover:translate-x-1"
                            )}>
                                {faq.q}
                            </span>
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-primary/5 transition-all duration-500",
                                openIndex === index ? "rotate-180 bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : "text-muted-foreground group-hover:text-foreground group-hover:bg-primary/10"
                            )}>
                                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-10 md:pb-14 text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-4xl">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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

import { usePerformance } from '@/hooks/usePerformance';

export default function ContactPage() {
    const t = useTranslations('contact');
    const { isLowPowerMode } = usePerformance();

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

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const faqTriggerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: showFAQ } = useScroll({
        target: faqTriggerRef,
        offset: ["start end", "end end"]
    });


    return (
        <div ref={containerRef} className="relative bg-background selection:bg-primary/20">
            {/* 2. HEADER & BACKGROUNDS */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px] pointer-events-none z-0" />
            <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
                {!isLowPowerMode && <Meteors number={100} />}
            </div>

            {/* 3. MAIN CONTENT: (Header + Form + Lanyard) */}
            <motion.div
                className="relative z-10"
                style={{
                    opacity: useTransform(showFAQ, [0, 0.4], [1, 0.6]),
                    scale: isLowPowerMode ? 1 : useTransform(showFAQ, [0, 0.4], [1, 0.98]),
                    filter: isLowPowerMode ? "none" : useTransform(showFAQ, [0, 0.4], ["blur(0px)", "blur(2px)"]),
                }}
            >

                {/* Header Section (Flows normally) */}
                <div className="relative w-full pt-48 pb-20">
                    <div className="w-full flex items-center justify-center opacity-20 select-none pointer-events-none">
                        <ScrollVelocity
                            texts={[t('hero.ticker.build'), t('hero.ticker.freelance')]}
                            velocity={20}
                            className="text-7xl md:text-[9rem] font-black tracking-tight uppercase whitespace-nowrap"
                            isLowPowerMode={isLowPowerMode}
                        />
                    </div>
                </div>

                {/* Interaction Section (Lanyard + Social + Form) */}
                {/* We keep this relative and stable. No shrinking or fading here. */}
                <div className="container-creative px-4 md:px-8 max-w-[1800px] mx-auto pb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                        {/* LEFT COLUMN: Lanyard */}
                        {/* Shorter height 600px to raise bottom, top sticky align */}
                        <div className="hidden lg:flex lg:col-span-4 sticky top-20 h-[600px] pointer-events-none">
                            <div className="w-full h-full pointer-events-auto">
                                {!isLowPowerMode ? (
                                    <Lanyard isLowPowerMode={isLowPowerMode} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-8">
                                        <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-primary/5">
                                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 italic font-serif">
                                                Archive ID // Static
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Content Stack */}
                        <div className="col-span-1 lg:col-span-8 flex flex-col gap-16">

                            {/* Social Connect */}
                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex flex-col gap-6">
                                    <SocialTicker items={row1Real} direction="right" speed={50} isLowPowerMode={isLowPowerMode} />
                                    <SocialTicker items={row2Real} direction="left" speed={50} isLowPowerMode={isLowPowerMode} />
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <ContactForm />
                            </motion.div>

                            {/* Mobile Lanyard Fallback */}
                            <div className="lg:hidden h-[400px] w-full relative">
                                {!isLowPowerMode ? (
                                    <Lanyard isLowPowerMode={isLowPowerMode} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-8">
                                        <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-primary/5">
                                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 italic font-serif">
                                                Archive ID // Static
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ TRIGGER ZONE: Positioned after the form to initiate the cover */}
                {/* Massive 100vh runway for the most natural transition trip possible */}
                <div ref={faqTriggerRef} className="h-[100vh] w-full pointer-events-none" />
            </motion.div >

            {/* 4. FAQ SECTION: The "Full Viewport Cover" Layer */}
            < motion.section
                className="relative z-50 bg-background overflow-hidden"
                style={{
                    y: useTransform(showFAQ, [0, 1], ["100vh", "0vh"]),
                    marginTop: "-100vh",
                }
                }
            >
                {/* Dedicated Meteors for FAQ Section */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                    {!isLowPowerMode && <Meteors number={60} />}
                </div>

                {/* Ultra-Smooth Sheet Edge: Tallest gradient for deep cinematic transition */}
                < div className="absolute top-0 left-0 right-0 h-[40rem] bg-gradient-to-t from-background via-background/95 to-transparent -translate-y-full pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="container-creative px-4 md:px-8 max-w-[1700px] mx-auto py-32 pb-32 relative z-10">
                    <FAQSection />
                </div>
            </motion.section >
        </div >
    );
}
