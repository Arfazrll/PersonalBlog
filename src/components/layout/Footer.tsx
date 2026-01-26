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
    MapPin,
    Heart,
    ArrowUpRight,
    X
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const socialIcons: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
};

const quickLinks = [
    { href: '/', key: 'home' },
    { href: '/projects', key: 'projects' },
    { href: '/experience', key: 'experience' },
    { href: '/skills', key: 'skills' },
    { href: '/achievements', key: 'achievements' },
    { href: '/contact', key: 'contact' },
];

export function Footer() {
    const t = useTranslations('navigation');
    const tFooter = useTranslations('footer');
    const [isExpanded, setIsExpanded] = useState(false);

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

    const currentYear = new Date().getFullYear();

    // Animation variants
    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const contentVariants = {
        closed: { opacity: 0, y: 50 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        })
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
                                    PORTFOLIO
                                </Link>
                                <span className="hidden sm:inline text-sm text-muted-foreground">
                                    © {currentYear}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="hidden sm:flex items-center gap-1 md:gap-2">
                                    {portfolioData.personal.socialLinks.slice(0, 4).map((social) => {
                                        const Icon = socialIcons[social.icon];
                                        return (
                                            <motion.a
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full hover:bg-muted transition-colors"
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
                                    className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-all text-sm font-medium"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="hidden sm:inline">More</span>
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

            {/* Expanded Footer Overlay - Portal-like behavior */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100]"
                        style={{ pointerEvents: 'auto' }}
                    >
                        {/* Background */}
                        <motion.div
                            className="absolute inset-0 bg-background"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeExpanded}
                        />

                        {/* Close Button */}
                        <motion.button
                            onClick={closeExpanded}
                            className="fixed top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 rounded-full glass-card z-10 hover:bg-muted transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.button>

                        {/* Content */}
                        <div className="relative h-full overflow-y-auto">
                            <div className="min-h-full flex flex-col">
                                <div className="flex-1 container-creative py-20 md:py-24">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
                                        {/* Connect Section */}
                                        <motion.div
                                            custom={0}
                                            variants={contentVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            className="lg:col-span-5"
                                        >
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient mb-6">
                                                Let's Connect
                                            </h2>
                                            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                                                {portfolioData.personal.bio}
                                            </p>
                                            <div className="space-y-4">
                                                <a
                                                    href={`mailto:${portfolioData.personal.email}`}
                                                    className="flex items-center gap-4 p-4 rounded-2xl glass-card group hover:bg-muted/50 transition-all"
                                                >
                                                    <div className="p-3 rounded-xl bg-primary/10">
                                                        <Mail className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-muted-foreground">Email</p>
                                                        <p className="font-medium truncate">{portfolioData.personal.email}</p>
                                                    </div>
                                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                                                </a>
                                                <div className="flex items-center gap-4 p-4 rounded-2xl glass-card">
                                                    <div className="p-3 rounded-xl bg-secondary/10">
                                                        <MapPin className="w-5 h-5 text-secondary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Location</p>
                                                        <p className="font-medium">{portfolioData.personal.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Navigation Section */}
                                        <motion.div
                                            custom={1}
                                            variants={contentVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            className="lg:col-span-3"
                                        >
                                            <h3 className="text-xl font-bold mb-6">Navigation</h3>
                                            <nav className="space-y-3">
                                                {quickLinks.map((link) => (
                                                    <Link
                                                        key={link.key}
                                                        href={link.href}
                                                        onClick={closeExpanded}
                                                        className="block text-lg text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300"
                                                    >
                                                        {t(link.key)}
                                                    </Link>
                                                ))}
                                            </nav>
                                        </motion.div>

                                        {/* Social Section */}
                                        <motion.div
                                            custom={2}
                                            variants={contentVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            className="lg:col-span-4"
                                        >
                                            <h3 className="text-xl font-bold mb-6">Social</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {portfolioData.personal.socialLinks.map((social) => {
                                                    const Icon = socialIcons[social.icon];
                                                    return (
                                                        <motion.a
                                                            key={social.platform}
                                                            href={social.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 p-4 rounded-xl glass-card hover:bg-muted/50 transition-all group"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {Icon && <Icon className="w-5 h-5" />}
                                                            <span className="font-medium">{social.platform}</span>
                                                        </motion.a>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Bottom Bar */}
                                <motion.div
                                    custom={3}
                                    variants={contentVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="border-t border-border py-6"
                                >
                                    <div className="container-creative flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-sm text-muted-foreground text-center sm:text-left">
                                            © {currentYear} {portfolioData.personal.name}. {tFooter('copyright')}
                                        </p>
                                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                            {tFooter('madeWith')}
                                            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
