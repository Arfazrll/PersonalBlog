'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { useTranslations } from 'next-intl';
import {
    Calendar,
    MapPin,
    ChevronDown,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Filter,
    Rocket
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import ExperienceStickyScroll from '@/components/sections/ExperienceStickyScroll';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Experience, Education } from '@/types';
import { Timeline } from '@/components/ui/timeline';

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



function EducationCard({ education, index }: { education: Education; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="w-full md:min-w-[400px]"
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
                        className="p-2 rounded-full bg-secondary/50"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </div>

                <h3 className="text-lg font-bold mb-1">{education.degree}</h3>
                <p className="text-gradient font-medium mb-1">{education.institution}</p>
                <p className="text-sm text-muted-foreground mb-3">{education.major}</p>
                <p className="text-sm text-muted-foreground/80">
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
                            <div className="pt-4 border-t border-border mt-4 space-y-4">
                                {education.activities && education.activities.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-foreground/90">Activities</h4>
                                        <ul className="space-y-1">
                                            {education.activities.map((activity, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span className="w-1 h-1 rounded-full bg-secondary" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {education.achievements && education.achievements.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-foreground/90">Achievements</h4>
                                        <ul className="space-y-1">
                                            {education.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
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

import { SmoothScrollHero } from '@/components/sections/SmoothScrollHero';

export default function ExperiencePage() {
    const t = useTranslations('experience');
    const [isEducationExpanded, setIsEducationExpanded] = useState(false);
    const [isEducationHovered, setIsEducationHovered] = useState(false);
    const { resolvedTheme } = useTheme();

    return (
        <div className="bg-background text-foreground relative">
            {/* Smooth Scroll Hero Section */}
            <SmoothScrollHero />

            <FloatingShape className="w-[500px] h-[500px] -top-20 -right-40" gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" />
            <FloatingShape className="w-[400px] h-[400px] bottom-40 -left-20" gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" delay={3} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

                {/* Academic Foundation Highlight (Interactive Reveal) */}
                <div
                    className="mb-24 relative"
                    onMouseEnter={() => setIsEducationHovered(true)}
                    onMouseLeave={() => setIsEducationHovered(false)}
                >
                    <div className="flex items-center justify-between gap-8 flex-wrap">
                        <motion.button
                            onClick={() => setIsEducationExpanded(!isEducationExpanded)}
                            className="group flex items-center gap-4 focus:outline-none"
                        >
                            <motion.div
                                className={cn(
                                    "p-3 rounded-xl transition-all duration-500",
                                    isEducationExpanded ? "bg-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]" : "bg-primary/20 hover:bg-primary/30"
                                )}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <GraduationCap className={cn(
                                    "w-6 h-6 transition-colors duration-500",
                                    isEducationExpanded ? "text-primary-foreground" : "text-primary"
                                )} />
                            </motion.div>
                            <div className="text-left">
                                <h2 className="text-2xl font-bold italic tracking-tight uppercase group-hover:text-primary transition-colors">Academic Foundation</h2>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
                                    {isEducationExpanded ? "Click to collapse" : "Click to reveal educational milestones"}
                                </p>
                            </div>
                        </motion.button>

                        <AnimatePresence>
                            {isEducationHovered && !isEducationExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                                    className="hidden lg:flex relative h-44 min-w-[650px] rounded-2xl overflow-hidden bg-transparent border-none shadow-none"
                                >
                                    {/* Background Data Stream */}
                                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-10 pointer-events-none font-mono text-[8px] leading-none overflow-hidden select-none">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ y: -100 }}
                                                animate={{ y: 300 }}
                                                transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                                                className="whitespace-nowrap text-primary"
                                            >
                                                {Array.from({ length: 60 }).map(() => Math.random() > 0.5 ? "1" : "0").join("")}
                                                {Array.from({ length: 60 }).map(() => (Math.random() * 0xFFF << 0).toString(16).padStart(3, '0')).join("")}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Scanning Beam */}
                                    <motion.div
                                        className="absolute top-0 bottom-0 w-[1px] bg-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.8)] z-10"
                                        animate={{ left: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Terminal Interface */}
                                    <div className="relative z-20 w-full p-4 flex flex-col justify-between">
                                        <div className="flex justify-between items-start border-b border-primary/10 dark:border-primary/20 pb-2 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                <span className="text-[10px] font-mono text-primary font-bold tracking-[0.2em] uppercase">SECURE_ACCESS: ACADEMIC_RECORDS_V2.0</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[8px] font-mono text-primary/60 uppercase">HASH: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                                                <span className="text-[8px] font-mono text-primary/60 uppercase">DCTR: VERIFIED</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 h-full items-stretch">
                                            {portfolioData.education.map((edu, idx) => (
                                                <motion.div
                                                    key={edu.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                                    className="flex-1 group/item"
                                                >
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[8px] font-mono text-primary/40">[{idx.toString().padStart(2, '0')}]</span>
                                                        <p className="text-[13px] font-mono text-foreground dark:text-primary font-black uppercase tracking-tight truncate group-hover/item:text-primary transition-colors">
                                                            {edu.institution}
                                                        </p>
                                                    </div>
                                                    <div className="pl-4 space-y-1.5 border-l border-primary/10 dark:border-primary/20 h-full">
                                                        <p className="text-[9px] font-mono text-muted-foreground uppercase leading-tight">{edu.degree}</p>
                                                        {edu.gpa && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[8px] font-mono text-primary/40">GPA_ANALYSIS:</span>
                                                                <span className="text-[11px] font-mono text-primary font-bold">{edu.gpa}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {edu.activities?.slice(0, 2).map((act, i) => (
                                                                <span key={i} className="text-[7px] font-mono px-1.5 py-0.5 rounded-sm bg-primary/5 text-primary/70 border border-primary/10">
                                                                    {act}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {/* Advanced Status Pod */}
                                            <div className="w-32 border-l border-primary/10 dark:border-primary/20 pl-6 flex flex-col justify-center">
                                                <div className="text-[8px] font-mono text-primary/40 uppercase mb-2">ENCRYPTION_LAYER</div>
                                                <div className="space-y-1 mb-3">
                                                    {[0.8, 0.4, 0.6].map((w, i) => (
                                                        <div key={i} className="h-1 w-full bg-primary/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-primary/40"
                                                                initial={{ width: "0%" }}
                                                                animate={{ width: `${w * 100}%` }}
                                                                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="text-[10px] font-mono text-primary font-bold animate-pulse tracking-tighter">DATA_STREAM_ACTIVE</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Corner Details */}
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                                        <div className="w-1 h-3 bg-primary/20 rounded-full" />
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                                        <div className="w-3 h-1 bg-primary/20 rounded-full" />
                                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {isEducationExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                transition={{
                                    height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }, // circOut for fast, smooth expansion
                                    opacity: { duration: 0.3 }
                                }}
                                className="overflow-hidden will-change-[height,opacity]"
                            >
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                    className="pt-4"
                                >
                                    <ExperienceStickyScroll />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Work Experience Timeline */}
                    <div className="w-full">
                        <ExperienceTimeline />
                    </div>
                </div>
            </div>
            );
        </div>
    );
}

function ExperienceTimeline() {
    const experiences = portfolioData.experiences;

    // Group experiences by year
    const groupedExperiences = useMemo(() => {
        const groups: { [key: string]: Experience[] } = {};

        experiences.forEach(exp => {
            const year = new Date(exp.startDate).getFullYear().toString();
            if (!groups[year]) {
                groups[year] = [];
            }
            groups[year].push(exp);
        });

        // Sort years descending
        return Object.keys(groups)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map(year => ({
                title: year,
                experiences: groups[year].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            }));
    }, [experiences]);

    const timelineData = groupedExperiences.map(group => ({
        title: group.title,
        content: (
            <div className="space-y-12">
                {group.experiences.map((exp, idx) => (
                    <div key={exp.id} className="relative pl-8 border-l-2 border-neutral-200 dark:border-neutral-800">
                        {/* Dot indicator */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-black" />

                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                    {exp.position}
                                </h3>
                                <p className="text-lg font-medium text-primary">
                                    {exp.company}
                                </p>
                            </div>
                            <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded">
                                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                            </span>
                        </div>

                        <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                            {exp.description}
                        </p>

                        {/* Responsibilities */}
                        {exp.responsibilities && (
                            <ul className="mb-6 space-y-2">
                                {exp.responsibilities.slice(0, 3).map((resp, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                                        <span>{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {exp.skills.map((skill, i) => (
                                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Visual Assets (Placeholders as requested) */}
                        <div className="grid grid-cols-2 gap-4">
                            <Image
                                src={`https://assets.aceternity.com/templates/startup-${(idx % 4) + 1}.webp`}
                                alt="work environment"
                                width={500}
                                height={500}
                                className="rounded-lg object-cover h-24 md:h-32 w-full shadow-sm hover:shadow-md transition-shadow duration-200"
                            />
                            <Image
                                src={`https://assets.aceternity.com/templates/startup-${((idx + 1) % 4) + 1}.webp`}
                                alt="project showcase"
                                width={500}
                                height={500}
                                className="rounded-lg object-cover h-24 md:h-32 w-full shadow-sm hover:shadow-md transition-shadow duration-200"
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }));

    return (
        <div className="w-full">
            <Timeline data={timelineData} />
        </div>
    );
}
