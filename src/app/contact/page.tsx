'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, Mail, Github, Linkedin, Twitter, Instagram, ChevronDown, CheckCircle, AlertCircle, Loader2, ArrowUpRight, Disc, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';

function FloatingShape({ className, gradient, delay = 0 }: { className?: string; gradient: string; delay?: number }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
            style={{ background: gradient }}
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay }}
        />
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


const socialColors: Record<string, string> = {
    github: 'hover:bg-gray-800/80 hover:border-gray-500/50',
    linkedin: 'hover:bg-blue-700/80 hover:border-blue-400/50',
    twitter: 'hover:bg-sky-600/80 hover:border-sky-400/50',
    instagram: 'hover:bg-pink-600/80 hover:border-pink-400/50',
    discord: 'hover:bg-indigo-600/80 hover:border-indigo-400/50',
    spotify: 'hover:bg-green-600/80 hover:border-green-400/50',
};

function SocialLinks() {
    const t = useTranslations('contact');
    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full flex flex-col justify-center h-full">
            <div className="glass-strong rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700" />

                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                    </span>
                    {t('social.title')}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolioData.personal.socialLinks.map((social, index) => {
                        const Icon = socialIconsMap[social.icon.toLowerCase()] || ArrowUpRight;
                        const colorClass = socialColors[social.icon.toLowerCase()] || 'hover:bg-white/10';

                        return (
                            <motion.a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    'relative overflow-hidden rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 border border-white/5 bg-white/5 backdrop-blur-sm',
                                    colorClass
                                )}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Icon className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                                <span className="text-sm font-medium opacity-70 group-hover:opacity-100">{social.platform}</span>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </motion.div>
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
        const mailtoLink = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full">
            <div className="glass-strong rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                        <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Send a Message</h2>
                        <p className="text-white/50">{portfolioData.personal.email}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/70">{t('form.name')}</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/70">{t('form.email')}</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white/70">{t('form.subject')}</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" placeholder="Project Inquiry" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/70">{t('form.message')}</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none" placeholder="Tell me about your project..." />
                    </div>
                    <motion.button type="submit" disabled={status === 'loading'} className="w-full btn-creative flex items-center justify-center gap-3 py-5" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>{t('form.sending')}</span></>) : status === 'success' ? (<><CheckCircle className="w-5 h-5" /><span>{t('form.success')}</span></>) : status === 'error' ? (<><AlertCircle className="w-5 h-5" /><span>{t('form.error')}</span></>) : (<><Send className="w-5 h-5" /><span>{t('form.submit')}</span></>)}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

function FAQSection() {
    const t = useTranslations('contact');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full">
            <h2 className="text-2xl font-bold mb-8 text-center">{t('faq.title')}</h2>
            <div className="space-y-4">
                {portfolioData.faqs.map((faq, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + index * 0.1 }} className="glass-card rounded-2xl overflow-hidden">
                        <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
                            <span className="font-semibold pr-4">{faq.question}</span>
                            <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown className="w-5 h-5 flex-shrink-0" />
                            </motion.span>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                    <div className="px-6 pb-5 text-white/60 border-t border-white/10 pt-4">{faq.answer}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function ContactPage() {
    const t = useTranslations('contact');


    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            <FloatingShape className="w-[500px] h-[500px] -top-40 -left-40" gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" />
            <FloatingShape className="w-[400px] h-[400px] bottom-40 -right-20" gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" delay={3} />

            <div className="container-creative relative">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>Get in Touch</motion.span>
                    <h1 className="heading-lg mb-4">{t('title')}</h1>
                    <p className="subheading max-w-xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Top Left: 3D Lanyard */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-[500px] w-full relative z-10"
                    >
                        {/* We import Lanyard dynamically to avoid SSR issues if any, though it's a client component */}
                        <Lanyard />
                    </motion.div>

                    {/* Top Right: Social Badges */}
                    <div className="flex flex-col justify-center h-full">
                        <SocialLinks />
                    </div>

                    {/* Bottom Left: Contact Form */}
                    <div className="w-full">
                        <ContactForm />
                    </div>

                    {/* Bottom Right: FAQ Section */}
                    <div className="w-full">
                        <FAQSection />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Dynamic import for Lanyard to avoid SSR issues with Three.js
import dynamic from 'next/dynamic';
const Lanyard = dynamic(() => import('@/components/three/Lanyard').then(mod => mod.Lanyard), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center glass-card"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
});
