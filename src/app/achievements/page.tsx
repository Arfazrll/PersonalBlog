'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, SortAsc, SortDesc, Award, ExternalLink, X, Calendar, Building2 } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Achievement } from '@/types';

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

const categoryColors: Record<string, string> = {
    certification: 'from-blue-500/30 to-cyan-500/30',
    award: 'from-yellow-500/30 to-orange-500/30',
    recognition: 'from-purple-500/30 to-pink-500/30',
    publication: 'from-green-500/30 to-emerald-500/30',
};

const categoryText: Record<string, string> = {
    certification: 'text-cyan-400',
    award: 'text-yellow-400',
    recognition: 'text-purple-400',
    publication: 'text-green-400',
};

function AchievementCard({ achievement, onClick, index }: { achievement: Achievement; onClick: () => void; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={onClick}
            className="card-creative cursor-pointer overflow-hidden group"
        >
            <div className={cn('aspect-[4/3] relative flex items-center justify-center bg-gradient-to-br', categoryColors[achievement.category])}>
                <motion.span
                    className="text-7xl font-black opacity-30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    {achievement.title.charAt(0)}
                </motion.span>
                <div className="absolute top-3 right-3">
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium glass-card capitalize', categoryText[achievement.category])}>
                        {achievement.category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-gradient transition-all">{achievement.title}</h3>
                <p className="text-sm text-white/60 mb-3">{achievement.issuer}</p>
                <p className="text-xs text-white/40 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(achievement.date)}
                </p>
            </div>
        </motion.div>
    );
}

function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-strong rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 z-10">
                    <X className="w-5 h-5" />
                </button>
                <div className={cn('aspect-video relative flex items-center justify-center bg-gradient-to-br', categoryColors[achievement.category])}>
                    <span className="text-9xl font-black opacity-20">{achievement.title.charAt(0)}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-8 -mt-12 relative">
                    <span className={cn('inline-block px-4 py-1.5 rounded-full text-sm font-medium glass-card capitalize mb-4', categoryText[achievement.category])}>
                        {achievement.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{achievement.title}</h2>
                    <div className="flex flex-wrap gap-4 text-white/60 mb-6">
                        <span className="flex items-center gap-2"><Building2 className="w-4 h-4" />{achievement.issuer}</span>
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(achievement.date)}</span>
                    </div>
                    {achievement.description && <p className="text-white/70 mb-6">{achievement.description}</p>}
                    {achievement.credentialUrl && (
                        <a href={achievement.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn-creative inline-flex items-center gap-2">
                            <span>View Credential</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
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
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const filteredAchievements = useMemo(() => {
        let achievements = [...portfolioData.achievements];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            achievements = achievements.filter((a) => a.title.toLowerCase().includes(query) || a.issuer.toLowerCase().includes(query) || a.category.toLowerCase().includes(query));
        }
        achievements.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
        return achievements;
    }, [searchQuery, sortOrder]);

    const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage);
    const paginatedAchievements = filteredAchievements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            <FloatingShape className="w-[500px] h-[500px] -top-40 -right-40" gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" />
            <FloatingShape className="w-[400px] h-[400px] bottom-20 -left-20" gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" delay={3} />

            <div className="container-creative relative">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <motion.div className="inline-flex items-center gap-3 mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                            <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                    </motion.div>
                    <h1 className="heading-lg mb-4">{t('title')}</h1>
                    <p className="subheading max-w-xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-14 pr-5 py-4 rounded-2xl glass-card bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <motion.button onClick={() => setSortOrder('newest')} className={cn('flex items-center gap-2 px-5 py-4 rounded-2xl transition-all font-medium', sortOrder === 'newest' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-white/10')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <SortDesc className="w-4 h-4" />
                            <span className="hidden sm:inline">{t('sort.newest')}</span>
                        </motion.button>
                        <motion.button onClick={() => setSortOrder('oldest')} className={cn('flex items-center gap-2 px-5 py-4 rounded-2xl transition-all font-medium', sortOrder === 'oldest' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-white/10')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <SortAsc className="w-4 h-4" />
                            <span className="hidden sm:inline">{t('sort.oldest')}</span>
                        </motion.button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {paginatedAchievements.map((achievement, index) => (
                            <AchievementCard key={achievement.id} achievement={achievement} onClick={() => setSelectedAchievement(achievement)} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <motion.button key={i} onClick={() => setCurrentPage(i + 1)} className={cn('w-10 h-10 rounded-full transition-all font-medium', currentPage === i + 1 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-white/10')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                {i + 1}
                            </motion.button>
                        ))}
                    </div>
                )}

                {filteredAchievements.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <Award className="w-16 h-16 mx-auto text-white/20 mb-4" />
                        <p className="text-lg text-white/50">No achievements found</p>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {selectedAchievement && <AchievementModal achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} />}
            </AnimatePresence>
        </div>
    );
}
