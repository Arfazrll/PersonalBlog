'use client';

import { useState, useCallback, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Spotlight } from '@/components/ui/spotlight-new';
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
    Bot,
    Focus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';
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
        <div className="relative flex overflow-hidden py-4 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-white/10 backdrop-blur-sm">
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

            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />
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
            className="group relative flex items-center gap-2 px-4 h-11 md:h-12 transition-all duration-300 rounded-full border border-white/5 bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm shadow-sm"
            whileHover={{ y: -4, scale: 1.05 }}
        >
            <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            <span className="text-sm md:text-base font-bold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">{social.platform}</span>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
        </motion.a>
    );
}

export function Footer() {
    const { theme } = useTheme();
    const tNav = useTranslations('navigation');
    const t = useTranslations('footer');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAboutExpanded, setIsAboutExpanded] = useState(false);
    const [isEmailHovered, setIsEmailHovered] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [copyrightIndex, setCopyrightIndex] = useState(0);
    const [localTime, setLocalTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Jakarta'
            };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
            // Jakarta is UTC+7
            setLocalTime(`${timeString} UTC+7`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCopyrightIndex(prev => (prev + 1) % 2);
        }, 2500); // Trigger every 2.5s
        return () => clearInterval(interval);
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
                        <div className="flex items-center justify-between gap-4">
                            {/* Left Side - Animated Copyright */}
                            <div className="flex items-center gap-1.5 md:gap-2 pl-2 md:pl-4 z-10 overflow-hidden h-6">
                                <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`}>
                                    © {currentYear}
                                </span>
                                <div className="relative w-[280px] h-full flex items-center">
                                    <AnimatePresence mode="popLayout">
                                        {mounted && (
                                            <motion.span
                                                key={copyrightIndex}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className={`absolute left-0 text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`}
                                            >
                                                {copyrightIndex === 0
                                                    ? `${portfolioData.personal.name}.`
                                                    : "All rights reserved."}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Right Side - Socials & More Button */}
                            <div className="flex items-center justify-end gap-4 md:gap-8 z-10 ml-auto">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    {/* Social Icons */}
                                    {previewSocials.map((social: SocialLink) => {
                                        const Icon = socialIcons[social.icon];
                                        return (
                                            <Fragment key={social.platform}>
                                                {social.platform === 'Twitter' && (
                                                    <motion.a
                                                        href="https://arfazrllworkspace.vercel.app/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
                                                        aria-label="Workspace"
                                                    >
                                                        <Focus className="w-4 h-4" />
                                                    </motion.a>
                                                )}
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
                                            </Fragment>
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
                                className="fixed inset-0 z-[10000] bg-white dark:bg-black flex flex-col overflow-hidden pt-6 md:pt-12"
                            >
                                <Spotlight 
                                    gradientFirst={theme === 'dark' 
                                        ? "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)"
                                        : "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 20%, .03) 0, hsla(0, 0%, 15%, .01) 50%, hsla(0, 0%, 10%, 0) 80%)"
                                    } 
                                    gradientSecond={theme === 'dark'
                                        ? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)"
                                        : "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 20%, .02) 0, hsla(0, 0%, 15%, .01) 80%, transparent 100%)"
                                    }
                                    gradientThird={theme === 'dark'
                                        ? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)"
                                        : "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 20%, .01) 0, hsla(0, 0%, 15%, .01) 80%, transparent 100%)"
                                    }
                                />
                                <Marquee />
                                <div className="flex-1 flex flex-col px-12 md:px-24 lg:px-40 py-12 md:py-24">
                                    <div className="flex-1 flex flex-col max-w-[1500px] w-full ml-auto">
                                        {/* Header with Close */}
                                        <div className="flex justify-end items-start mb-24 md:mb-32">
                                            <motion.button
                                                onClick={closeExpanded}
                                                className="relative group p-4 -mr-4 -mt-4 flex items-center justify-center transition-all duration-300"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {/* Hidden larger hit area for reliability */}
                                                <div className="absolute inset-0 rounded-full cursor-pointer z-0" />
                                                
                                                {/* Solid background circle with inverted colors */}
                                                <div className="absolute inset-2 rounded-full bg-black dark:bg-white shadow-xl transition-all duration-300" />
                                                
                                                <motion.div
                                                    className="relative z-10 flex items-center justify-center"
                                                    whileHover={{ rotate: 90 }}
                                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                >
                                                    <X className="w-8 h-8 text-white dark:text-black" strokeWidth={2} />
                                                </motion.div>
                                            </motion.button>
                                        </div>

                                        {/* Main Columns - Perfectly balanced vertical position */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mt-auto mb-auto transform -translate-y-20 md:-translate-y-32 lg:-translate-y-40">
                                            <FooterColumn title={t('links')}>
                                                <FooterLink href="/">{tNav('home')}</FooterLink>
                                                <FooterLink href="/resume">{tNav('resume')}</FooterLink>
                                                <FooterLink href="/contact">{tNav('contact')}</FooterLink>
                                                <AboutHoverMenu tNav={tNav} onExpandChange={setIsAboutExpanded} />
                                            </FooterColumn>

                                            <FooterColumn title={t('socials')}>
                                                <div
                                                    className="relative flex items-center gap-2 group w-fit"
                                                    onMouseEnter={() => setIsEmailHovered(true)}
                                                    onMouseLeave={() => setIsEmailHovered(false)}
                                                >
                                                    <FooterLink href={`mailto:${portfolioData.personal.email}`}>Email</FooterLink>

                                                    <AnimatePresence>
                                                        {isEmailHovered && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: 5 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: 5 }}
                                                                className="absolute left-full ml-4 whitespace-nowrap flex items-center gap-2.5 z-[10001]"
                                                            >
                                                                <span className="text-base font-medium text-zinc-400 dark:text-zinc-500 select-all">
                                                                    {portfolioData.personal.email}
                                                                </span>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleCopyEmail();
                                                                    }}
                                                                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                                                    title="Copy Email"
                                                                >
                                                                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                <FooterLink href={portfolioData.personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url || '#'} target="_blank">LinkedIn</FooterLink>
                                                <FooterLink href={portfolioData.personal.socialLinks.find(s => s.platform === 'Instagram')?.url || '#'} target="_blank">Instagram</FooterLink>
                                                <FooterLink href={portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.url || '#'} target="_blank">GitHub</FooterLink>
                                            </FooterColumn>

                                            <FooterColumn title={t('localTime')}>
                                                <p className="text-zinc-900 dark:text-white text-lg font-medium tracking-tight">{localTime}</p>
                                                <a
                                                    href="https://www.google.com/maps/place/Jakarta,+Indonesia"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-zinc-900 dark:text-white text-lg font-medium tracking-tight hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors inline-block"
                                                >
                                                    Jakarta, Indonesia
                                                </a>
                                            </FooterColumn>

                                            <FooterColumn title={t('version')}>
                                                <p className="text-zinc-900 dark:text-white text-lg font-medium tracking-tight">{t('versionEdition')}</p>
                                            </FooterColumn>
                                        </div>

                                        {/* Large Brand Name */}
                                        <div className="relative">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={isAboutExpanded
                                                    ? { opacity: 0, y: 80 }
                                                    : { opacity: 1, y: 0 }
                                                }
                                                transition={{
                                                    duration: isAboutExpanded ? 0.4 : 0.8,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                className="text-[18vw] font-black leading-none text-zinc-900 dark:text-white tracking-tighter select-none"
                                            >
                                                ARFAZRLL
                                            </motion.h2>
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

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-zinc-500 text-xs font-bold tracking-widest uppercase">{title}</h3>
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </div>
    );
}

function FooterLink({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) {
    return (
        <Link
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-zinc-900 dark:text-white text-lg font-medium hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit"
        >
            {children}
        </Link>
    );
}

function AboutHoverMenu({ tNav, onExpandChange }: { tNav: (key: string) => string; onExpandChange: (expanded: boolean) => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const subLinks = [
        { href: '/achievements', label: tNav('achievements') },
        { href: '/skills', label: tNav('skills') },
        { href: '/experience', label: tNav('experience') },
        { href: '/projects', label: tNav('projects') },
        { href: '/blog', label: tNav('blog') },
        { href: '/gallery', label: tNav('gallery') },
    ];

    const active = isMobile ? isOpen : isHovered;

    useEffect(() => {
        onExpandChange(active);
    }, [active, onExpandChange]);

    return (
        <div
            className="flex flex-col gap-2"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            <div
                className="flex items-center gap-2 cursor-pointer group w-fit"
                onClick={() => isMobile && setIsOpen(!isOpen)}
            >
                <Link
                    href="#about"
                    className="text-zinc-900 dark:text-white text-lg font-medium group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors"
                >
                    {tNav('about')}
                </Link>
                <motion.div
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronUp className="w-4 h-4 text-zinc-500 transform rotate-180" />
                </motion.div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden flex flex-col gap-2 pl-4 border-l border-zinc-200 dark:border-white/10 ml-2"
                    >
                        {subLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-zinc-500 dark:text-zinc-400 text-base font-medium hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}




