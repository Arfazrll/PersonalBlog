'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, motionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, SortAsc, SortDesc, ExternalLink, X, Calendar, Building2, Trophy, Medal, Award, Target, ChevronRight, MousePointer2, Eye, Share2 } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Achievement } from '@/types';
import FallingText from '@/components/effects/FallingText';
import CertificateHeroScroll from '@/components/sections/CertificateHeroScroll';
import { usePerformance } from '@/hooks/usePerformance';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const AchievementCard = React.forwardRef<HTMLDivElement, {
    achievement: Achievement;
    onClick: () => void;
    index: number;
    isLowPowerMode?: boolean;
}>(
    ({ achievement, onClick, index, isLowPowerMode }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const { left, top } = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        };

        const springConfig = { stiffness: 150, damping: 20 };
        const mouseXSpring = useSpring(mouseX, springConfig);
        const mouseYSpring = useSpring(mouseY, springConfig);

        const categoryConfig: Record<string, { gradient: string; icon: typeof Trophy }> = {
            certification: { gradient: 'from-zinc-700 via-zinc-600 to-zinc-500', icon: Award },
            award: { gradient: 'from-neutral-800 via-neutral-700 to-neutral-600', icon: Trophy },
            recognition: { gradient: 'from-stone-700 via-stone-600 to-stone-500', icon: Medal },
            publication: { gradient: 'from-slate-700 via-slate-600 to-slate-500', icon: Award },
            competition: { gradient: 'from-gray-700 via-gray-600 to-gray-500', icon: Target }
        };

        const config = categoryConfig[achievement.category.toLowerCase()] || categoryConfig.award;
        const IconComponent = config.icon;

        const spotlightBackground = useMotionTemplate`
            radial-gradient(
                350px circle at ${mouseXSpring}px ${mouseYSpring}px,
                var(--accent-spotlight, rgba(255, 255, 255, 0.08)),
                transparent 80%
            )
        `;

        return (
            <div
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                onClick={onClick}
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            className="absolute inset-0 h-full w-full bg-foreground/[0.05] dark:bg-slate-800/[0.2] block rounded-3xl z-0"
                            layoutId="hoverBackground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.15 } }}
                            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    ref={ref}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.5, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -4 }}
                    className="relative bg-card/90 dark:bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/40 group-hover:border-foreground/20 transition-all duration-500 shadow-lg group-hover:shadow-2xl z-20 cursor-pointer"
                >
                    {/* Animated Spotlight Effect */}
                    {!isLowPowerMode && (
                        <motion.div
                            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                            style={{ background: spotlightBackground }}
                        />
                    )}

                    {/* Integrated Header: Image + Gradient/Icon */}
                    <div className={cn(
                        "relative h-44 w-full overflow-hidden transition-all duration-500 bg-gradient-to-br",
                        config.gradient
                    )}>
                        {achievement.image ? (
                            <>
                                <img
                                    src={achievement.image}
                                    alt={achievement.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </>
                        ) : (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                            />
                        )}

                        {/* Category Icon Badge */}
                        <motion.div
                            className="absolute top-4 right-4 p-2.5 rounded-xl bg-foreground/10 backdrop-blur-md border border-foreground/10 shadow-xl z-20"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                            <IconComponent className="w-4 h-4 text-foreground/80 dark:text-white" />
                        </motion.div>

                        {/* Type/Category Tags in Header */}
                        <div className="absolute top-4 left-4 flex gap-2 z-20">
                            <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-foreground/10 backdrop-blur-md border border-foreground/10 text-foreground/90 dark:text-white/90">
                                {achievement.type || achievement.category}
                            </span>
                        </div>

                        {/* Credential ID - Mono style */}
                        <div className="absolute bottom-4 left-4 z-20">
                            <div className="text-[10px] font-mono text-foreground/50 dark:text-white/50 uppercase tracking-widest mb-1">
                                {achievement.credentialId ? achievement.credentialId : "Verified Credential"}
                            </div>
                        </div>

                        {/* Date Overlay */}
                        <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-foreground/10 backdrop-blur-md border border-foreground/10">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-foreground/60 dark:text-white/60" />
                                <span className="text-[10px] text-foreground/90 dark:text-white/90 font-bold">
                                    {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 relative z-20 bg-gradient-to-b from-transparent to-card/20">
                        <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-foreground transition-colors line-clamp-2 min-h-[3rem]">
                            {achievement.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-3.5 h-3.5 text-muted-foreground/60" />
                            <span className="text-[11px] text-muted-foreground font-medium">{achievement.issuer}</span>
                        </div>

                        {/* Tags section below issuer */}
                        {achievement.tags && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {achievement.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tight">#{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border/20">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-muted-foreground/40" />
                                <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-wider">Expand Archive</span>
                            </div>
                            <motion.div
                                animate={{ x: isHovered ? [0, 4, 0] : 0 }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            >
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
);

AchievementCard.displayName = 'AchievementCard';

function NavItem({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count: number }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group relative w-full text-left py-5 lg:py-6 px-6 lg:px-8 transition-all duration-300",
                active ? "bg-foreground/[0.03]" : "hover:bg-foreground/[0.015]"
            )}
        >
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        active ? "bg-foreground scale-150" : "bg-muted-foreground/20"
                    )} />
                    <span className={cn(
                        "text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight transition-all duration-300",
                        active ? "text-foreground" : "text-muted-foreground/25 group-hover:text-muted-foreground/50"
                    )}>
                        {label}
                    </span>
                </div>
                <span className={cn(
                    "text-xs font-bold tabular-nums transition-all duration-300",
                    active ? "text-foreground/80" : "text-muted-foreground/15"
                )}>
                    {count.toString().padStart(2, '0')}
                </span>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        layoutId="navActiveBar"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-foreground origin-center"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    );
}

function AchievementModal({ achievement, onClose, isLowPowerMode }: { achievement: Achievement; onClose: () => void; isLowPowerMode?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 bg-black/90",
                isLowPowerMode ? "backdrop-blur-md" : "backdrop-blur-xl"
            )}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.98, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 5 }}
                transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                className={cn(
                    "bg-background/80 dark:bg-zinc-900/60 rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.4)] border border-foreground/10 max-w-5xl w-full max-h-[90vh] lg:max-h-[80vh] flex flex-col lg:flex-row relative",
                    isLowPowerMode ? "backdrop-blur-lg" : "backdrop-blur-3xl"
                )}
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 p-2.5 bg-foreground/5 hover:bg-foreground/10 rounded-full text-foreground/40 hover:text-foreground transition-all z-50 border border-foreground/10 backdrop-blur-md"
                >
                    <X className="w-5 h-5" />
                </motion.button>

                {/* Left: Cinematic Image container with standardized alignment */}
                <div className="lg:w-1/2 relative aspect-video lg:aspect-auto bg-black/20 flex items-center justify-center border-r border-white/5 group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30" />

                    {/* Watermark Centered */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] select-none pointer-events-none overflow-hidden text-foreground">
                        <span className="text-[12rem] font-black uppercase tracking-tighter rotate-[-10deg]">Archive</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-6 p-12">
                        {achievement.image ? (
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                src={achievement.image}
                                alt={achievement.title}
                                className="w-full h-auto max-h-[50vh] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                            />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center"
                            >
                                <Award className="w-24 h-24 text-foreground/5 mb-4" />
                                <div className="px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
                                    Digital Representation
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right: Detailed Metadata Panel - Scrollable if content overflow */}
                <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col overflow-y-auto bg-gradient-to-b from-white/[0.03] to-transparent scrollbar-hide">
                    <div className="mb-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2.5 mb-5"
                        >
                            <span className="px-2.5 py-1 bg-foreground/10 rounded-lg text-[9px] font-black tracking-widest uppercase border border-foreground/10 text-foreground/80">
                                {achievement.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-foreground/20" />
                            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(achievement.date)}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl lg:text-4xl font-black text-foreground mb-6 leading-[1.05] tracking-tight"
                        >
                            {achievement.title}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3.5 p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5"
                        >
                            <Building2 className="w-5 h-5 text-muted-foreground/30" />
                            <p className="text-base text-muted-foreground font-bold tracking-tight">
                                {achievement.issuer}
                            </p>
                        </motion.div>
                    </div>

                    <div className="space-y-10 flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.3em] font-black mb-5 flex items-center gap-2.5">
                                <div className="w-5 h-[1px] bg-foreground/20" />
                                Credential Metadata
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[8px] text-muted-foreground/40 uppercase font-black mb-1.5 tracking-wider">ID</p>
                                    <p className="font-mono text-[11px] text-foreground/80 truncate bg-foreground/[0.04] px-3 py-2 rounded-xl border border-foreground/5">{achievement.credentialId || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-muted-foreground/40 uppercase font-black mb-1.5 tracking-wider">Type</p>
                                    <p className="text-[11px] text-foreground font-bold bg-foreground/[0.04] px-3 py-2 rounded-xl border border-foreground/5">{achievement.type || "Specialty"}</p>
                                </div>
                            </div>
                        </motion.div>

                        {achievement.tags && achievement.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.3em] font-black mb-5 flex items-center gap-2.5">
                                    <div className="w-5 h-[1px] bg-foreground/20" />
                                    Technology Stack
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {achievement.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-foreground/5 rounded-xl text-[9px] font-bold text-muted-foreground/60 border border-foreground/5 hover:bg-foreground/10 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-10"
                    >
                        {achievement.credentialUrl && (
                            <motion.a
                                href={achievement.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="group/btn relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-foreground text-background font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all overflow-hidden shadow-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                                <span className="relative">Verified Credential</span>
                                <ExternalLink className="w-4 h-4 relative" />
                            </motion.a>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Particles removed

export default function AchievementsPage() {
    const t = useTranslations('achievements');
    const { isLowPowerMode } = usePerformance();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    const stats = useMemo(() => {
        const total = portfolioData.achievements.length;
        const awards = portfolioData.achievements.filter(a => a.category.toLowerCase() === 'award').length;
        const certifications = portfolioData.achievements.filter(a => a.category.toLowerCase() === 'certification').length;
        const competitions = portfolioData.achievements.filter(a => a.category.toLowerCase() === 'competition').length;
        return { total, awards, certifications, competitions };
    }, []);

    const filteredAchievements = useMemo(() => {
        let achievements = [...portfolioData.achievements];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            achievements = achievements.filter((a) =>
                a.title.toLowerCase().includes(query) ||
                a.issuer.toLowerCase().includes(query) ||
                a.category.toLowerCase().includes(query)
            );
        }
        if (activeCategory !== 'all') {
            achievements = achievements.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());
        }
        achievements.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
        return achievements;
    }, [searchQuery, sortOrder, activeCategory]);

    const getCategoryCount = (cat: string) => {
        if (cat === 'all') return portfolioData.achievements.length;
        return portfolioData.achievements.filter(a => a.category.toLowerCase() === cat.toLowerCase()).length;
    };

    return (

        <div className="min-h-screen bg-background text-foreground overflow-y-auto overflow-x-hidden">
            {/* Hero Scroll Section */}
            {/* Hero Scroll Section */}
            <ErrorBoundary fallback={<div className="h-[60vh] flex items-center justify-center">Hero Unavailable</div>}>
                <CertificateHeroScroll isLowPowerMode={isLowPowerMode} />
            </ErrorBoundary>

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div
                    className={cn(
                        "absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-foreground/[0.02]",
                        isLowPowerMode ? "blur-xl" : "blur-3xl"
                    )}
                    animate={isLowPowerMode ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className={cn(
                        "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-foreground/[0.015]",
                        isLowPowerMode ? "blur-xl" : "blur-3xl"
                    )}
                    animate={isLowPowerMode ? {} : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                />
            </div>

            {/* CONTINUOUS CURTAIN LAYER: Covers the fixed hero */}
            <div className="relative z-50 bg-background shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">

                {/* Main Two-Panel Layout */}
                <div className="flex flex-col lg:flex-row relative items-start">

                    {/* LEFT PANEL: Navigation - Sticky */}
                    <div className="lg:w-2/5 xl:w-1/3 w-full h-auto lg:sticky lg:top-0 py-12 lg:py-36 flex flex-col z-40 bg-background/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-6 lg:px-10 mb-10"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-foreground" />
                                <h1 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                                    The Archive
                                </h1>
                            </div>
                            <div className="h-px w-12 bg-gradient-to-r from-foreground/50 to-transparent" />
                        </motion.div>

                        {/* Navigation */}
                        <motion.nav
                            className="flex-1"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={staggerItem}>
                                <NavItem label="All Entries" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} count={getCategoryCount('all')} />
                            </motion.div>
                            <motion.div variants={staggerItem}>
                                <NavItem label="Certifications" active={activeCategory === 'certification'} onClick={() => setActiveCategory('certification')} count={getCategoryCount('certification')} />
                            </motion.div>
                            <motion.div variants={staggerItem}>
                                <NavItem label="Awards" active={activeCategory === 'award'} onClick={() => setActiveCategory('award')} count={getCategoryCount('award')} />
                            </motion.div>
                            <motion.div variants={staggerItem}>
                                <NavItem label="Competitions" active={activeCategory === 'competition'} onClick={() => setActiveCategory('competition')} count={getCategoryCount('competition')} />
                            </motion.div>
                        </motion.nav>

                        {/* Large counter */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-6 lg:p-10 hidden lg:block"
                        >
                            <motion.div
                                className="text-[9rem] font-black leading-none text-foreground/20 select-none"
                            >
                                {stats.total.toString().padStart(2, '0')}
                            </motion.div>
                            <div className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest flex items-center gap-2 -mt-4">
                                <Award className="w-3 h-3" />
                                Achievements
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT PANEL: Cards - Natural Flow */}
                    <div className="lg:w-3/5 xl:w-2/3 w-full flex flex-col pt-8 lg:pt-36 px-6 lg:px-10 pb-20">

                        {/* Controls */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-8 shrink-0 z-30 sticky top-20 lg:static"
                        >
                            {/* Stats */}
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { icon: Trophy, value: stats.total },
                                    { icon: Medal, value: stats.awards },
                                    { icon: Award, value: stats.certifications }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-secondary/20 text-xs font-bold"
                                    >
                                        <stat.icon className="w-3 h-3 text-muted-foreground" />
                                        <span>{stat.value}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative flex-1 sm:min-w-[200px] group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full bg-secondary/20 border border-border/40 focus:border-foreground/30 rounded-xl pl-10 pr-8 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/40"
                                    />
                                    {searchQuery && (
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </motion.button>
                                    )}
                                </div>
                                <motion.button
                                    onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 rounded-xl bg-secondary/20 hover:bg-secondary/40 border border-border/40 text-muted-foreground hover:text-foreground transition-all"
                                >
                                    {sortOrder === 'newest' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <AnimatePresence mode="popLayout">
                                {filteredAchievements.map((achievement, index) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                        onClick={() => setSelectedAchievement(achievement)}
                                        index={index}
                                        isLowPowerMode={isLowPowerMode}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredAchievements.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Award className="w-16 h-16 text-muted-foreground/20 mb-4" />
                                </motion.div>
                                <p className="text-sm font-medium text-muted-foreground/50">No achievements found</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* FALLING TEXT SECTION - Below contents */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full py-24 border-t border-border/20"
                >
                    <div className="max-w-5xl mx-auto px-6">
                        {/* Section header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3">
                                Technical Universe
                            </h2>
                            <p className="text-sm text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
                                Interact with the core technologies and values that drive my research and development journey.
                            </p>
                        </motion.div>

                        {/* Falling text container */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full mx-auto h-[400px]"
                        >
                            <ErrorBoundary fallback={<div className="text-center opacity-50">Visuals Unavailable</div>}>
                                <FallingText
                                    text="Cognition Perception Autonomy Immutable Synapse Velocity Convergence Architecture Algorithm Vanguard Insight Nexus"
                                    highlightWords={['Cognition', 'Autonomy', 'Immutable', 'Convergence', 'Vanguard']}
                                    trigger="scroll"
                                    gravity={0.8}
                                    mouseConstraintStiffness={0.2}
                                    fontSize="1.5rem"
                                    fontWeight="900"
                                    force={true}
                                />
                            </ErrorBoundary>
                        </motion.div>
                    </div>
                </motion.section>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedAchievement && (
                    <AchievementModal
                        achievement={selectedAchievement}
                        onClose={() => setSelectedAchievement(null)}
                        isLowPowerMode={isLowPowerMode}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
