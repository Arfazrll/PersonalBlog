'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, Mail, Github, Linkedin, Twitter, Instagram, ChevronDown, CheckCircle, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
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

const socialIcons: Record<string, React.ElementType> = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram };
const socialGradients: Record<string, string> = {
    github: 'from-gray-600 to-gray-800',
    linkedin: 'from-blue-500 to-blue-700',
    twitter: 'from-sky-400 to-sky-600',
    instagram: 'from-pink-500 via-purple-500 to-orange-500',
};

function SocialLinks() {
    const t = useTranslations('contact');
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">{t('social.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {portfolioData.personal.socialLinks.map((social, index) => {
                    const Icon = socialIcons[social.icon];
                    return (
                        <motion.a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn('relative overflow-hidden rounded-2xl p-6 group')}
                        >
                            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity', socialGradients[social.icon])} />
                            <div className="relative flex flex-col items-center gap-3">
                                {Icon && <Icon className="w-8 h-8" />}
                                <span className="font-semibold">{social.platform}</span>
                                {social.username && <span className="text-sm text-white/50">{social.username}</span>}
                                <ArrowUpRight className="absolute top-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.a>
                    );
                })}
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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-2xl mx-auto mb-16">
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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="max-w-2xl mx-auto">
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
                <SocialLinks />
                <ContactForm />
                <FAQSection />
            </div>
        </div>
    );
}
