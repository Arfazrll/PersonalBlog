'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    Calendar,
    MapPin,
    ChevronDown,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Filter
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Experience, Education } from '@/types';

type FilterType = 'all' | 'latest' | 'oldest' | 'ongoing';

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

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative pl-8 pb-12 last:pb-0"
        >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
            <motion.div
                className="absolute left-0 top-2 w-3 h-3 -translate-x-[5px] rounded-full bg-primary"
                animate={{ boxShadow: ['0 0 0 0 rgba(139, 92, 246, 0.4)', '0 0 0 10px rgba(139, 92, 246, 0)', '0 0 0 0 rgba(139, 92, 246, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
                className={cn(
                    'card-creative cursor-pointer',
                    isExpanded && 'ring-1 ring-primary/30'
                )}
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.01 }}
            >
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            {experience.isOngoing && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/20">
                                    Ongoing
                                </span>
                            )}
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">
                                {experience.type}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{experience.position}</h3>
                        <p className="text-lg text-gradient font-medium">{experience.company}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-full bg-white/5"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                    </span>
                    {experience.location && (
                        <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                        </span>
                    )}
                </div>

                <p className="text-white/70">{experience.description}</p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-6 border-t border-white/10 mt-6">
                                {experience.responsibilities && experience.responsibilities.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-3 text-white/90">Responsibilities</h4>
                                        <ul className="space-y-2">
                                            {experience.responsibilities.map((resp, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="flex items-start gap-3 text-white/70"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                >
                                                    <ChevronRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                                                    {resp}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold mb-3 text-white/90">Skills Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

function EducationCard({ education, index }: { education: Education; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="min-w-[320px] md:min-w-[400px]"
        >
            <motion.div
                className={cn(
                    'card-creative h-full cursor-pointer',
                    isExpanded && 'ring-1 ring-secondary/30'
                )}
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.02, y: -5 }}
            >
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20">
                        <GraduationCap className="w-6 h-6 text-secondary" />
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="p-2 rounded-full bg-white/5"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </div>

                <h3 className="text-lg font-bold mb-1">{education.degree}</h3>
                <p className="text-gradient font-medium mb-1">{education.institution}</p>
                <p className="text-sm text-white/60 mb-3">{education.major}</p>
                <p className="text-sm text-white/50">
                    {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : 'Present'}
                </p>
                {education.gpa && (
                    <p className="text-sm font-semibold mt-3 text-primary">GPA: {education.gpa}</p>
                )}

                <AnimatePresence>
                    {isExpanded && (education.activities?.length || education.achievements?.length) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 border-t border-white/10 mt-4 space-y-4">
                                {education.activities && education.activities.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-white/90">Activities</h4>
                                        <ul className="space-y-1">
                                            {education.activities.map((activity, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                    <span className="w-1 h-1 rounded-full bg-secondary" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {education.achievements && education.achievements.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-white/90">Achievements</h4>
                                        <ul className="space-y-1">
                                            {education.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default function ExperiencePage() {
    const t = useTranslations('experience');
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredExperiences = useMemo(() => {
        let experiences = [...portfolioData.experiences];

        switch (filter) {
            case 'latest':
                return experiences.sort((a, b) =>
                    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                );
            case 'oldest':
                return experiences.sort((a, b) =>
                    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                );
            case 'ongoing':
                return experiences.filter(exp => exp.isOngoing);
            default:
                return experiences;
        }
    }, [filter]);

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: t('filters.all') },
        { key: 'latest', label: t('filters.latest') },
        { key: 'oldest', label: t('filters.oldest') },
        { key: 'ongoing', label: t('filters.ongoing') },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            <FloatingShape className="w-[500px] h-[500px] -top-20 -right-40" gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" />
            <FloatingShape className="w-[400px] h-[400px] bottom-40 -left-20" gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" delay={3} />

            <div className="container-creative relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        My Journey
                    </motion.span>
                    <h1 className="heading-lg mb-4">{t('title')}</h1>
                    <p className="subheading max-w-xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-primary/20">
                            <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Work Experience</h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-10 flex-wrap"
                    >
                        <Filter className="w-4 h-4 text-white/40" />
                        {filters.map((f) => (
                            <motion.button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={cn(
                                    'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                                    filter === f.key
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                        : 'glass-card hover:bg-white/10'
                                )}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {f.label}
                            </motion.button>
                        ))}
                    </motion.div>

                    <div className="relative ml-4">
                        {filteredExperiences.map((experience, index) => (
                            <ExperienceCard key={experience.id} experience={experience} index={index} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-secondary/20">
                            <GraduationCap className="w-6 h-6 text-secondary" />
                        </div>
                        <h2 className="text-2xl font-bold">{t('education.title')}</h2>
                    </div>

                    <div className="overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                        <div className="flex gap-6">
                            {portfolioData.education.map((edu, index) => (
                                <EducationCard key={edu.id} education={edu} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
