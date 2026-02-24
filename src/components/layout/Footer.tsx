'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    ChevronUp,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Mail,
    Heart,
    Copy,
    Check,
    X,
    Gamepad2,
    Music,
    Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';

type SocialIconComponent = typeof Github;

const socialIcons: { [key: string]: SocialIconComponent } = {
    github: Github,
    linkedin: Linkedin,
    twitter: Bot, // Replaced Twitter logo with AI Bot logo
    instagram: Instagram,
    discord: Gamepad2,
    spotify: Music,
};

const marqueeKeys = ['0', '1', '2', '3', '4', '5'];

function Marquee() {
    const t = useTranslations('footer.marquee') as (key: string) => string;
    return (
        <div className="relative flex overflow-hidden py-4 bg-muted/40 border-y border-foreground/10 dark:border-border backdrop-blur-sm">
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {[...marqueeKeys, ...marqueeKeys, ...marqueeKeys].map((key, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-mono tracking-widest uppercase text-muted-foreground/80">
                        <span>{t(key)}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    </div>
                ))}
            </motion.div>

            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
    );
}

import { SocialLink } from '@/types/index';

function SocialCard({ social }: { social: SocialLink }) {
    const Icon = socialIcons[social.icon] || Github;

    return (
        <motion.a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-14 h-14 transition-all duration-300"
            whileHover={{ y: -4, scale: 1.15 }}
        >
            <Icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
        </motion.a>
    );
}

export function Footer() {
    const tNav = useTranslations('navigation');
    const t = useTranslations('footer');
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentYear = new Date().getFullYear();

    // Lock body scroll when footer is expanded
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    const toggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const closeExpanded = useCallback(() => {
        setIsExpanded(false);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Animation variants
    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const pathname = usePathname();
    const isBlog = pathname?.includes('/blog');
    const isBlogDetail = pathname?.includes('/blog/') && pathname.split('/blog/')[1]?.length > 0;

    const previewSocials = portfolioData.personal.socialLinks
        .filter((s: SocialLink) => s.platform !== 'Discord' && s.platform !== 'Spotify')
        .slice(0, 4);

    const expandedSocials = previewSocials.filter((s: SocialLink) => s.platform !== 'Twitter');

    return (
        <>
            {/* Compact Footer - Always visible */}
            <footer className={cn(
                isBlog ? 'absolute bottom-0 w-full border-t-0 pointer-events-none !bg-transparent z-20' : 'relative z-20 mt-auto dark:bg-black',
                isExpanded && 'opacity-0 pointer-events-none'
            )}>
                <div className={`max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 py-6 md:py-8 pointer-events-auto ${isBlog ? '!bg-transparent' : ''}`}>
                    <div className={`
                        px-6 md:px-8 py-4 md:py-6 transition-all duration-300
                        ${isBlog
                            ? 'bg-card dark:bg-black/40 dark:backdrop-blur-xl border-2 border-foreground/10 dark:border-white/5 rounded-[2rem] shadow-xl dark:shadow-black/20'
                            : 'glass-card'
                        }
                    `}>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 md:gap-6">
                                <motion.a
                                    href="https://drive.google.com/file/d/1mfYs2MOHpwEFLe-Ld4OCcgS1Lbo6wW7O/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full 
                                        transition-all duration-500
                                        ${isBlog
                                            ? 'bg-foreground text-background hover:bg-primary dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 border-2 border-foreground/5 dark:border-white/10 shadow-lg shadow-black/5 hover:scale-105 active:scale-95'
                                            : 'bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20 hover:border-primary/40'
                                        }
                                    `}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className={`text-xs md:text-sm font-black uppercase tracking-[0.2em] ${isBlog ? '' : 'text-gradient'}`}>
                                        View Resume
                                    </span>
                                    <svg
                                        className={`w-4 h-4 md:w-5 md:h-5 ${isBlog ? 'text-background dark:text-primary' : 'text-primary'} group-hover:translate-x-1 transition-transform`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m0 0l-3-3m3 3l-3 3m9-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.a>
                            </div>

                            <div className="flex items-center gap-4 md:gap-8 ml-auto">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    {/* Social Icons */}
                                    {previewSocials.map((social: SocialLink) => {
                                        const Icon = socialIcons[social.icon];
                                        return (
                                            <motion.a
                                                key={social.platform}
                                                href={social.platform === 'Twitter' ? undefined : social.url}
                                                onClick={social.platform === 'Twitter' ? (e) => {
                                                    e.preventDefault();
                                                    window.dispatchEvent(new CustomEvent('portfolio:toggle-chatbot'));
                                                } : undefined}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
                                                aria-label={social.platform}
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                            </motion.a>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    onClick={toggleExpand}
                                    className={`
                                            flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-[0.2em]
                                            ${isBlog
                                            ? 'bg-muted/50 border-2 border-foreground/10 text-foreground hover:bg-muted hover:border-foreground/20'
                                            : 'bg-muted hover:bg-muted/80 text-foreground'
                                        }
                                        `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="hidden sm:inline">{t('more')}</span>
                                    <motion.span
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronUp className="w-4 h-4" />
                                    </motion.span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Expanded Footer Overlay */}
            {
                mounted && createPortal(
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                variants={overlayVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 z-[10000] bg-background/95 backdrop-blur-xl flex flex-col"
                            >
                                {/* Fixed Close Button - Outside the scroll area */}
                                <motion.button
                                    onClick={closeExpanded}
                                    className="fixed top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 rounded-full glass-card z-[10001] hover:bg-muted transition-colors text-foreground"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.2 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </motion.button>

                                {/* Scrollable Content Container */}
                                <div
                                    className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
                                    data-lenis-prevent
                                >
                                    <div className="min-h-screen flex flex-col pt-20">
                                        <Marquee />

                                        <div className="flex-1 max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center py-12 md:py-24">
                                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 h-full">
                                                {/* Left Column - Contact Details & Socials */}
                                                <div className="flex flex-col justify-center gap-6">
                                                    <div>
                                                        <motion.h2
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground"
                                                        >
                                                            {t('cta.title')} <br />
                                                            <span className="text-gradient">{t('cta.titleHighlight')}</span>
                                                        </motion.h2>

                                                        <motion.p
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.3 }}
                                                            className="text-xl text-muted-foreground dark:text-muted-foreground/80 max-w-lg mb-10"
                                                        >
                                                            {t('cta.subtitle')}
                                                        </motion.p>

                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.4 }}
                                                            className="flex flex-wrap gap-4"
                                                        >
                                                            <button
                                                                onClick={handleCopyEmail}
                                                                className="group flex items-center gap-4 px-8 py-5 rounded-full bg-secondary/50 border border-white/5 hover:bg-secondary transition-all hover:scale-105 active:scale-95 text-foreground backdrop-blur-sm"
                                                            >
                                                                <Mail className="w-5 h-5 text-primary" />
                                                                <span className="font-mono text-lg">{portfolioData.personal.email}</span>
                                                                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />}
                                                            </button>
                                                        </motion.div>
                                                    </div>

                                                    {/* Social Links Icons Only */}
                                                    <div className="flex flex-wrap gap-3 justify-start">
                                                        {expandedSocials.map((social: SocialLink, i: number) => (
                                                            <motion.div
                                                                key={social.platform}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.5 + (0.1 * i) }}
                                                            >
                                                                <SocialCard social={social} />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right Column - Wide Square Map Hero (Merges with background) */}
                                                <div className="flex flex-col justify-center h-full">
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 1 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.8 }}
                                                        className="w-full h-full min-h-[500px] lg:min-h-[750px] relative transition-all duration-700"
                                                    >
                                                        <iframe
                                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24131584285!2d106.77412401666497!3d-6.229746450625624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e3fa73%3A0x7601136971510100!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                                                            width="100%"
                                                            height="100%"
                                                            style={{ border: 0 }}
                                                            allowFullScreen
                                                            loading="lazy"
                                                            referrerPolicy="no-referrer-when-downgrade"
                                                            className="contrast-[1.2] brightness-[1.0] grayscale-[0.3] dark:invert-[0.95] dark:brightness-[0.8] dark:contrast-[1.2] opacity-100 transition-all duration-1000"
                                                        />
                                                        {/* No overlays for maximum clarity */}
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Bar in Overlay */}
                                        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
                                            <p className="text-sm text-muted-foreground font-mono">
                                                © {currentYear} {portfolioData.personal.name}. {t('copyright')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}




