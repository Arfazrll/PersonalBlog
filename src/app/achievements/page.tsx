'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, SortAsc, SortDesc, ExternalLink, X, Calendar, Building2, Trophy, Medal, Star, Sparkles, Award, Target } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Achievement } from '@/types';

// --- Visual Components ---

function FloatingOrb({ className, gradient, delay = 0 }: { className?: string; gradient: string; delay?: number }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`}
            style={{ background: gradient }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
        />
    );
}

function StatsPill({ icon: Icon, label, value, gradient }: { icon: any, label: string, value: number, gradient: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative group"
        >
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full`} />
            <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all backdrop-blur-sm">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${gradient}`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black">{value}</span>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/70 font-bold">{label}</span>
                </div>
            </div>
        </motion.div>
    );
}

function AchievementCard({ achievement, onClick, index }: { achievement: Achievement; onClick: () => void; index: number }) {
    // Use only blue-based gradients for dark mode compatibility
    const categoryColors: Record<string, string> = {
        certification: 'from-blue-600 via-blue-700 to-blue-800',
        award: 'from-blue-500 via-blue-600 to-blue-700',
        recognition: 'from-slate-600 via-slate-700 to-slate-800',
        publication: 'from-gray-600 via-gray-700 to-gray-800',
        competition: 'from-blue-400 via-blue-500 to-blue-600'
    };

    const gradient = categoryColors[achievement.category.toLowerCase()] || 'from-gray-600 via-slate-700 to-gray-800';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.03, duration: 0.4, type: "spring" }}
            whileHover={{ y: -4 }}
            onClick={onClick}
            className="group relative cursor-pointer"
        >
            {/* Glow effect on hover */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 rounded-2xl`} />

            <div className="relative glass-card border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-white/30 group-hover:shadow-2xl backdrop-blur-md">
                {/* Image Area */}
                <div className={`relative h-40 w-full overflow-hidden bg-gradient-to-br ${gradient}`}>
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Animated gradient overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Category Tag */}
                    <motion.div
                        className="absolute top-3 right-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <span className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg">
                            {achievement.category}
                        </span>
                    </motion.div>

                    {/* Big Letter Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="text-white/10 font-black text-8xl select-none"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {achievement.title.charAt(0)}
                        </motion.div>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                        <Calendar className="w-2.5 h-2.5 text-white/80" />
                        <span className="text-[9px] text-white/90 font-semibold">{formatDate(achievement.date)}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-gradient-to-b from-background/95 to-background">
                    <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                        {achievement.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                        <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="text-[11px] text-muted-foreground line-clamp-1 font-medium">{achievement.issuer}</span>
                    </div>

                    <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">View Details</span>
                        <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function NavItem({ label, active, onClick, count }: { label: string, active: boolean, onClick: () => void, count: number }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ x: 4 }}
            className={cn(
                "group relative w-full text-left py-5 px-6 border-b border-white/5 transition-all duration-300",
                active ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
            )}
        >
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: active ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            active ? "bg-primary scale-150" : "bg-muted-foreground/20"
                        )}
                    />
                    <span className={cn(
                        "text-2xl md:text-3xl lg:text-4xl font-black tracking-tight transition-all duration-300",
                        active ? "text-foreground" : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                    )}>
                        {label}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={cn(
                        "text-xs font-bold transition-colors duration-300 tabular-nums",
                        active ? "text-primary" : "text-muted-foreground/20 group-hover:text-muted-foreground/40"
                    )}>
                        {count.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
            {active && (
                <motion.div
                    layoutId="activeNavHighlight"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary/50"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </motion.button>
    )
}

function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
    const categoryColors: Record<string, string> = {
        certification: 'from-blue-600 via-blue-700 to-blue-800',
        award: 'from-blue-500 via-blue-600 to-blue-700',
        recognition: 'from-slate-600 via-slate-700 to-slate-800',
        publication: 'from-gray-600 via-gray-700 to-gray-800',
        competition: 'from-blue-400 via-blue-500 to-blue-600'
    };
    const gradient = categoryColors[achievement.category.toLowerCase()] || 'from-gray-600 via-slate-700 to-gray-800';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="glass-strong rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                <div className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-5 right-5 p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white z-20 transition-all backdrop-blur-md border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    <div className="absolute bottom-6 left-8">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-black uppercase tracking-widest text-white/90 border border-white/30 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md shadow-lg mb-3 inline-block"
                        >
                            {achievement.category}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl font-black text-white leading-tight drop-shadow-lg"
                        >
                            {achievement.title}
                        </motion.h2>
                    </div>
                </div>

                <div className="p-8 bg-background/98 backdrop-blur-xl overflow-y-auto max-h-[calc(85vh-12rem)]">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50">
                            <Building2 className="w-4 h-4 text-primary" />
                            <span className="font-bold text-sm">{achievement.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{formatDate(achievement.date)}</span>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed mb-8">
                        {achievement.description || "This achievement represents a significant milestone in professional development and expertise."}
                    </div>

                    {achievement.credentialUrl && (
                        <motion.a
                            href={achievement.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-sm relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <span className="relative">View Official Credential</span>
                            <ExternalLink className="w-4 h-4 relative" />
                        </motion.a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Page Component ---

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
        <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden relative">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <FloatingOrb className="w-[600px] h-[600px] -top-[15%] -left-[10%]" gradient="radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)" delay={0} />
                <FloatingOrb className="w-[800px] h-[800px] -bottom-[20%] -right-[15%]" gradient="radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, transparent 70%)" delay={2} />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015]" />
            </div>

            {/* LEFT PANEL: Sidebar Navigation */}
            <div className="lg:w-2/5 h-auto lg:h-screen lg:sticky lg:top-0 z-20 flex flex-col pt-24 lg:pt-28 bg-transparent relative">
                {/* Top Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-8 mb-10"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        <h1 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">The Archive</h1>
                    </div>
                    <div className="h-px w-16 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                </motion.div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col w-full">
                    <NavItem label="All Entries" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} count={getCategoryCount('all')} />
                    <NavItem label="Certifications" active={activeCategory === 'certification'} onClick={() => setActiveCategory('certification')} count={getCategoryCount('certification')} />
                    <NavItem label="Awards" active={activeCategory === 'award'} onClick={() => setActiveCategory('award')} count={getCategoryCount('award')} />
                    <NavItem label="Competitions" active={activeCategory === 'competition'} onClick={() => setActiveCategory('competition')} count={getCategoryCount('competition')} />
                </nav>

                {/* Footer Stats Display */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-8 mt-auto hidden lg:flex flex-col gap-3"
                >
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 blur-3xl opacity-50" />
                        <div className="relative text-[9rem] font-black leading-[0.8] bg-gradient-to-br from-primary via-blue-400 to-blue-500 bg-clip-text text-transparent select-none -ml-3">
                            {stats.total.toString().padStart(2, '0')}
                        </div>
                    </div>
                    <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" />
                        Achievements Unlocked
                    </div>
                </motion.div>
            </div>

            {/* RIGHT PANEL: Content */}
            <div className="lg:w-3/5 h-screen relative z-10 flex flex-col pt-8 lg:pt-28 px-6 lg:px-10 pb-8">

                {/* Header Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col xl:flex-row gap-4 items-center justify-between mb-6 shrink-0"
                >
                    {/* Stats Pills */}
                    <div className="flex gap-2.5 flex-wrap">
                        <StatsPill icon={Trophy} label="Total" value={stats.total} gradient="from-blue-500 to-cyan-500" />
                        <StatsPill icon={Medal} label="Awards" value={stats.awards} gradient="from-amber-500 to-orange-500" />
                        <StatsPill icon={Target} label="Certs" value={stats.certifications} gradient="from-purple-500 to-pink-500" />
                    </div>

                    {/* Search & Sort */}
                    <div className="flex items-center gap-2.5 w-full xl:w-auto">
                        <div className="relative flex-1 group min-w-[220px]">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search achievements..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-secondary/40 border border-white/5 focus:border-primary/50 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/40 focus:bg-secondary/60"
                            />
                            {searchQuery && (
                                <motion.button
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </motion.button>
                            )}
                        </div>
                        <motion.button
                            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/60 border border-white/5 hover:border-white/10 text-muted-foreground hover:text-foreground transition-all"
                        >
                            {sortOrder === 'newest' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                        </motion.button>
                    </div>
                </motion.div>

                {/* SCROLLABLE CARD CONTAINER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 glass-card border border-white/10 rounded-2xl p-6 overflow-y-auto custom-scrollbar relative"
                >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none rounded-2xl" />

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
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
                            className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40"
                        >
                            <Award className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-sm font-medium">No achievements found</p>
                            <p className="text-xs mt-1">Try adjusting your search criteria</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

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
