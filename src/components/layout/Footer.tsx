'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
    Music
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

type SocialIconComponent = typeof Github;

const socialIcons: { [key: string]: SocialIconComponent } = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    discord: Gamepad2,
    spotify: Music,
};

const marqueeKeys = ['0', '1', '2', '3', '4', '5'];

function Marquee() {
    const t = useTranslations('footer.marquee') as (key: string) => string;
    return (
        <div className="relative flex overflow-hidden py-4 bg-muted/30 border-y border-border backdrop-blur-sm">
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
            className="group relative p-6 rounded-3xl bg-secondary/50 border border-border hover:border-primary/50 overflow-hidden transition-colors"
            whileHover={{ y: -5 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="p-4 rounded-2xl bg-background group-hover:bg-primary/20 transition-colors duration-300 shadow-sm">
                    <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {social.platform}
                </span>
            </div>
        </motion.a>
    );
}

export function Footer() {
    const tNav = useTranslations('navigation');
    const t = useTranslations('footer');
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

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

    return (
        <>
            {/* Compact Footer - Always visible */}
            <footer className="relative z-20 mt-auto">
                <div className="container-creative py-6 md:py-8">
                    <div className="glass-card px-6 md:px-8 py-4 md:py-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 md:gap-6">
                                <Link href="/" className="text-lg md:text-xl font-black text-gradient">
                                    SYAHRIL ARFIAN ALMAZRIL
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="hidden sm:flex items-center gap-1 md:gap-2">
                                    {portfolioData.personal.socialLinks.slice(0, 4).map((social: SocialLink) => {
                                        const Icon = socialIcons[social.icon];
                                        return (
                                            <motion.a
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                aria-label={social.platform}
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                            </motion.a>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    onClick={toggleExpand}
                                    className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-all text-sm font-medium text-foreground"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
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
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] overflow-y-auto bg-background/95 backdrop-blur-xl"
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={closeExpanded}
                            className="fixed top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 rounded-full glass-card z-50 hover:bg-muted transition-colors text-foreground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.button>

                        <div className="min-h-screen flex flex-col pt-20">
                            <Marquee />

                            <div className="flex-1 container-creative flex flex-col justify-center py-12 md:py-24">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
                                    {/* Left Column - CTA */}
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
                                            className="text-xl text-muted-foreground max-w-lg mb-12"
                                        >
                                            {t('cta.subtitle')}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex flex-col sm:flex-row gap-4"
                                        >
                                            <button
                                                onClick={handleCopyEmail}
                                                className="group flex items-center gap-3 px-6 py-4 rounded-full bg-secondary/50 border border-border hover:bg-secondary transition-colors w-fit text-foreground"
                                            >
                                                <Mail className="w-5 h-5 text-primary" />
                                                <span className="font-mono">{portfolioData.personal.email}</span>
                                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
                                            </button>
                                        </motion.div>
                                    </div>

                                    {/* Right Column - Social Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 content-center">
                                        {portfolioData.personal.socialLinks.map((social: SocialLink, i: number) => (
                                            <motion.div
                                                key={social.platform}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + (0.1 * i) }}
                                            >
                                                <SocialCard social={social} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Bar in Overlay */}
                            <div className="container-creative py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-muted-foreground">
                                    © {currentYear} {portfolioData.personal.name}. {t('copyright')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
