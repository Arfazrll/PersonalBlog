'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, SortAsc, SortDesc, ExternalLink, X, Calendar, Building2, Trophy, Medal, Award, Target, ChevronRight, MousePointer2, Eye, Share2 } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Achievement } from '@/types';
import FallingText from '@/components/effects/FallingText';

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

const AchievementCard = React.forwardRef<HTMLDivElement, { achievement: Achievement; onClick: () => void; index: number }>(
    ({ achievement, onClick, index }, ref) => {
        const categoryConfig: Record<string, { gradient: string; icon: typeof Trophy }> = {
            certification: { gradient: 'from-zinc-700 via-zinc-600 to-zinc-500', icon: Award },
            award: { gradient: 'from-neutral-800 via-neutral-700 to-neutral-600', icon: Trophy },
            recognition: { gradient: 'from-stone-700 via-stone-600 to-stone-500', icon: Medal },
            publication: { gradient: 'from-slate-700 via-slate-600 to-slate-500', icon: Award },
            competition: { gradient: 'from-gray-700 via-gray-600 to-gray-500', icon: Target }
        };

        const config = categoryConfig[achievement.category.toLowerCase()] || categoryConfig.award;
        const IconComponent = config.icon;

        return (
            <motion.div
                ref={ref}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className="group relative cursor-pointer"
            >
                <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl bg-foreground/5"
                />

                <div className="relative bg-card/90 dark:bg-card/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/40 group-hover:border-foreground/20 transition-all duration-500 shadow-lg group-hover:shadow-2xl">

                    <div className={`relative h-32 w-full overflow-hidden bg-gradient-to-br ${config.gradient}`}>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                        />

                        <motion.div
                            className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                            <IconComponent className="w-4 h-4 text-white" />
                        </motion.div>

                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md border border-white/20 text-white">
                                {achievement.category}
                            </span>
                        </div>

                        <div className="absolute -bottom-2 -right-1 opacity-10">
                            <span className="text-7xl font-black text-white leading-none select-none">
                                {achievement.title.charAt(0)}
                            </span>
                        </div>

                        <div className="absolute bottom-2 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm border border-white/10">
                            <Calendar className="w-2.5 h-2.5 text-white/80" />
                            <span className="text-[9px] text-white/90 font-semibold">{formatDate(achievement.date)}</span>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-foreground transition-colors line-clamp-2 min-h-[2.5rem]">
                            {achievement.title}
                        </h3>

                        <div className="flex items-center gap-1.5 mb-3">
                            <Building2 className="w-3 h-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground line-clamp-1 font-medium">{achievement.issuer}</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border/30">
                            <div className="flex items-center gap-1.5">
                                <Eye className="w-3 h-3 text-muted-foreground/50" />
                                <span className="text-[9px] text-muted-foreground/60 font-medium">View Details</span>
                            </div>
                            <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            >
                                <ChevronRight className="w-3.5 h-3.5 text-foreground/70" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
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

function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
    const categoryGradients: Record<string, string> = {
        certification: 'from-zinc-700 via-zinc-600 to-zinc-500',
        award: 'from-neutral-800 via-neutral-700 to-neutral-600',
        recognition: 'from-stone-700 via-stone-600 to-stone-500',
        publication: 'from-slate-700 via-slate-600 to-slate-500',
        competition: 'from-gray-700 via-gray-600 to-gray-500'
    };
    const gradient = categoryGradients[achievement.category.toLowerCase()] || categoryGradients.award;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 lg:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-border/50"
                onClick={e => e.stopPropagation()}
            >
                <div className={`relative h-52 sm:h-60 bg-gradient-to-br ${gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-5 right-5 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white z-20 transition-colors backdrop-blur-md border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-5 right-20 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white z-20 transition-colors backdrop-blur-md border border-white/10"
                    >
                        <Share2 className="w-5 h-5" />
                    </motion.button>

                    <div className="absolute -bottom-6 -right-4 opacity-10">
                        <span className="text-[10rem] font-black text-white leading-none select-none">
                            {achievement.title.charAt(0)}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30 text-white">
                                {achievement.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[9px] font-medium bg-black/30 backdrop-blur-md text-white/80">
                                {formatDate(achievement.date)}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight max-w-xl">
                            {achievement.title}
                        </h2>
                    </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-15rem)]">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50 mb-6">
                        <div className="p-2.5 rounded-lg bg-foreground/10">
                            <Building2 className="w-5 h-5 text-foreground/70" />
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Issued by</p>
                            <p className="text-base font-bold">{achievement.issuer}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">About</h3>
                        <p className="text-foreground/80 leading-relaxed">
                            {achievement.description || "This achievement represents a significant milestone in my professional journey, demonstrating dedication, expertise, and commitment to excellence."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
                            <Calendar className="w-4 h-4 text-foreground/50 mb-1.5" />
                            <p className="text-[10px] text-muted-foreground mb-0.5">Date</p>
                            <p className="text-sm font-bold">{formatDate(achievement.date)}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
                            <Trophy className="w-4 h-4 text-foreground/50 mb-1.5" />
                            <p className="text-[10px] text-muted-foreground mb-0.5">Category</p>
                            <p className="text-sm font-bold capitalize">{achievement.category}</p>
                        </div>
                    </div>

                    {achievement.credentialUrl && (
                        <motion.a
                            href={achievement.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-bold rounded-xl text-sm relative overflow-hidden group"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            />
                            <span className="relative">View Credential</span>
                            <ExternalLink className="w-4 h-4 relative" />
                        </motion.a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function AchievementsPage() {
    const t = useTranslations('achievements');
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
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-foreground/[0.02] blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-foreground/[0.015] blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                />
            </div>

            {/* Main Two-Panel Layout */}
            <div className="flex flex-col lg:flex-row relative z-10">

                {/* LEFT PANEL: Navigation - Sticky */}
                <div className="lg:w-2/5 xl:w-1/3 h-auto lg:h-screen lg:sticky lg:top-0 flex flex-col pt-28 lg:pt-36">

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
                            className="text-[9rem] font-black leading-none text-foreground/[0.04] select-none"
                            animate={{ opacity: [0.04, 0.07, 0.04] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            {stats.total.toString().padStart(2, '0')}
                        </motion.div>
                        <div className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest flex items-center gap-2 -mt-4">
                            <Award className="w-3 h-3" />
                            Achievements
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT PANEL: Cards with own scroll */}
                <div className="lg:w-3/5 xl:w-2/3 h-auto lg:h-screen flex flex-col pt-8 lg:pt-36 px-6 lg:px-10 pb-8">

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6 shrink-0"
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

                    {/* Scrollable Cards Container - SEPARATE SCROLL WITH CUSTOM STYLING */}
                    <div
                        className="flex-1 overflow-y-auto overflow-x-hidden pr-4 -mr-4 custom-scrollbar"
                        style={{ maxHeight: 'calc(100vh - 14.5rem)' }}
                    >
                        <style jsx>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 5px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: rgba(var(--foreground-rgb), 0.1);
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: rgba(var(--foreground-rgb), 0.2);
                            }
                        `}</style>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
                            <AnimatePresence mode="popLayout">
                                {filteredAchievements.map((achievement, index) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                        onClick={() => setSelectedAchievement(achievement)}
                                        index={index}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredAchievements.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Award className="w-16 h-16 text-muted-foreground/20 mb-4" />
                                </motion.div>
                                <p className="text-sm font-medium text-muted-foreground/50">No achievements found</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* FALLING TEXT SECTION - Full width, centered at bottom */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative z-10 w-full py-12 lg:py-20"
            >
                <div className="max-w-5xl mx-auto px-6">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3">
                            Technical Universe
                        </h2>
                        <p className="text-sm text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
                            Interact with the core technologies and values that drive my research and development journey.
                        </p>
                    </motion.div>

                    {/* Falling text container - Narrower height for more compact feel */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full mx-auto"
                        style={{ height: '200px' }}
                    >
                        <FallingText
                            text="Cognition Perception Autonomy Immutable Synapse Velocity Convergence Architecture Algorithm Vanguard Insight Nexus"
                            highlightWords={['Cognition', 'Autonomy', 'Immutable', 'Convergence', 'Vanguard']}
                            trigger="scroll"
                            gravity={0.5}
                            mouseConstraintStiffness={0.2}
                            fontSize="1.4rem"
                            fontWeight="900"
                        />
                    </motion.div>

                    {/* Hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mt-4 text-muted-foreground/30"
                    >


                    </motion.div>
                </div>
            </motion.section>

            {/* Modal */}
            <AnimatePresence>
                {selectedAchievement && (
                    <AchievementModal
                        achievement={selectedAchievement}
                        onClose={() => setSelectedAchievement(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
