'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket, ChevronDown, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';

type TabType = 'education' | 'journey' | 'experience';

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}

function TabButton({ label, isActive, onClick, icon }: TabButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className={cn(
                "relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2",
                isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {icon}
            <span>{label}</span>
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
        </motion.button>
    );
}

function EducationContent() {
    const [showTimeline, setShowTimeline] = useState(false);
    const education = portfolioData.education[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-primary rounded-full" />
                        <div>
                            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                                — Higher Education • {education.isOngoing ? 'Current' : 'Completed'}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tight text-foreground">
                        {education.institution.split(' ').map((word, i) => (
                            <span key={i} className="block">{word.toUpperCase()}</span>
                        ))}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed max-w-md">
                        {education.major} major with a GPA of {education.gpa}. Focused on AI Engineering and Systems Research. Active in multiple high-impact research laboratories and national competitions.
                    </p>
                </div>

                <motion.div
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 dark:from-primary/10 dark:via-secondary/15 dark:to-primary/10 border border-primary/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="absolute top-4 right-4 text-xs font-mono text-primary/60">
                        01<br />10
                    </div>

                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20">
                            <GraduationCap className="w-12 h-12 text-primary" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                GPA {education.gpa}
                            </span>
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-foreground border border-secondary/30">
                                AI Researcher
                            </span>
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-foreground border border-secondary/30">
                                IT Major
                            </span>
                        </div>

                        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                            Digital Innovation Hub
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.button
                onClick={() => setShowTimeline(!showTimeline)}
                className="mx-auto flex flex-col items-center gap-2 px-6 py-3 rounded-full border border-primary/20 hover:border-primary/40 transition-colors group"
            >
                <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Timeline</span>
                <motion.div
                    animate={{ rotate: showTimeline ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-4 h-4 text-primary" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {showTimeline && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4 pt-4 border-t border-border">
                            {portfolioData.education.map((edu, index) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-primary/10 h-fit">
                                        <GraduationCap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground">{edu.institution}</h4>
                                        <p className="text-sm text-muted-foreground">{edu.degree} - {edu.major}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                                        </p>
                                    </div>
                                    {edu.gpa && (
                                        <span className="text-sm font-semibold text-primary">{edu.gpa}</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function JourneyContent() {
    const experiences = portfolioData.experiences;

    const groupedExperiences = useMemo(() => {
        const groups: { [key: string]: typeof experiences } = {};

        experiences.forEach(exp => {
            const year = new Date(exp.startDate).getFullYear().toString();
            if (!groups[year]) {
                groups[year] = [];
            }
            groups[year].push(exp);
        });

        return Object.keys(groups)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map(year => ({
                year,
                experiences: groups[year].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            }));
    }, [experiences]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Changelog from my journey
                </h2>
                <p className="text-muted-foreground max-w-lg">
                    I've been working on various projects and roles. Here's a timeline of my professional journey.
                </p>
            </div>

            <div className="space-y-12">
                {groupedExperiences.map((group, groupIndex) => (
                    <motion.div
                        key={group.year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: groupIndex * 0.1 }}
                        className="relative"
                    >
                        <div className="flex items-start gap-6">
                            <div className="flex items-center gap-3 min-w-[100px]">
                                <div className="w-3 h-3 rounded-full bg-primary/50 border-2 border-primary" />
                                <span className="text-3xl md:text-4xl font-light text-muted-foreground/50">
                                    {group.year}
                                </span>
                            </div>

                            <div className="flex-1 space-y-6 border-l border-border pl-6">
                                {group.experiences.slice(0, 3).map((exp, expIndex) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: groupIndex * 0.1 + expIndex * 0.05 }}
                                        className="relative"
                                    >
                                        <div className="absolute -left-[25px] top-2 w-2 h-2 rounded-full bg-secondary" />

                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-foreground">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-primary font-medium">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded whitespace-nowrap">
                                                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-3">
                                            {exp.description}
                                        </p>

                                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                                            <ul className="space-y-1 mb-3">
                                                {exp.responsibilities.slice(0, 3).map((resp, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                                                        <span>{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.slice(0, 4).map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-muted-foreground border border-secondary/30"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function ExperienceContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 text-center space-y-4"
        >
            <div className="p-4 rounded-2xl bg-primary/10">
                <Rocket className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
                Detailed experience breakdown with project highlights and achievements will be available here soon.
            </p>
        </motion.div>
    );
}

export default function ExperienceTabsSection() {
    const [activeTab, setActiveTab] = useState<TabType>('journey');
    const { resolvedTheme } = useTheme();

    const tabs = [
        { id: 'education' as TabType, label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'journey' as TabType, label: 'Journey', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'experience' as TabType, label: 'Experience', icon: <Rocket className="w-4 h-4" /> },
    ];

    return (
        <div className="py-16 space-y-12">
            <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 border border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    {activeTab === 'education' && <GraduationCap className="w-8 h-8 text-primary" />}
                    {activeTab === 'journey' && <Briefcase className="w-8 h-8 text-primary" />}
                    {activeTab === 'experience' && <Rocket className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-2xl font-bold text-center text-foreground capitalize">
                    {activeTab === 'education' && 'Academic Foundation'}
                    {activeTab === 'journey' && 'Professional Journey'}
                    {activeTab === 'experience' && 'Work Experience'}
                </h3>
                <p className="text-center text-muted-foreground mt-2 max-w-md mx-auto">
                    {activeTab === 'education' && 'Building strong foundations through academic excellence'}
                    {activeTab === 'journey' && 'A timeline of roles, responsibilities, and growth'}
                    {activeTab === 'experience' && 'Detailed breakdown of professional experiences'}
                </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        label={tab.label}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        icon={tab.icon}
                    />
                ))}
            </div>

            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'education' && <EducationContent key="education" />}
                    {activeTab === 'journey' && <JourneyContent key="journey" />}
                    {activeTab === 'experience' && <ExperienceContent key="experience" />}
                </AnimatePresence>
            </div>
        </div>
    );
}
