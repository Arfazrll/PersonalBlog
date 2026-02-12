'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Transition } from "@headlessui/react";
import {
    Calendar,
    MapPin,
    ChevronDown,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Filter,
    Rocket,
    Award,
    Heart,
    Users,
    ExternalLink,
    ArrowRight
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Experience, Education } from '@/types';

import ExperienceMarquee from '../../components/sections/ExperienceMarquee';
import ExperienceStickyScroll from '../../components/sections/ExperienceStickyScroll';
import { Timeline } from '@/components/ui/timeline';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';

type TabType = 'education' | 'journey' | 'experience';

const highlightContent = {
    education: {
        title: "Building the Future",
        highlight: "Through Knowledge",
        description: "Every line of code starts with understanding. My academic journey at Telkom University shapes how I approach complex problems with systematic thinking."
    },
    journey: {
        title: "Crafting Experiences",
        highlight: "That Matter",
        description: "From internships to leadership roles, each step has been a lesson in collaboration, innovation, and pushing boundaries."
    },
    experience: {
        title: "Turning Ideas",
        highlight: "Into Reality",
        description: "Real-world projects that solve real problems. Building solutions that make a difference."
    }
};

import { usePerformance } from '@/hooks/usePerformance';

function ExperienceHighlightSection({ type, isLowPowerMode }: { type: TabType; isLowPowerMode: boolean }) {
    const content = highlightContent[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-72"
        >
            <HeroHighlight containerClassName="h-[30rem] rounded-3xl overflow-hidden" isLowPowerMode={isLowPowerMode}>
                <motion.h2
                    initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto px-4"
                >
                    {content.title}{" "}
                    <Highlight className="text-black dark:text-white">
                        {content.highlight}
                    </Highlight>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mt-6 px-4 text-lg"
                >
                    {content.description}
                </motion.p>
            </HeroHighlight>
        </motion.div>
    );
}

function FloatingShape({ className, gradient, delay = 0, isLowPowerMode }: { className?: string; gradient: string; delay?: number; isLowPowerMode: boolean }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
            style={{ background: gradient }}
            animate={isLowPowerMode ? {} : { y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay }}
        />
    );
}

interface TabItem {
    id: TabType;
    label: string;
    description: string;
}

function ExperienceTabSlider({ isLowPowerMode }: { isLowPowerMode: boolean }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const tabs: TabItem[] = [
        { id: 'education', label: 'Education', description: 'Building strong foundations through academic excellence at Telkom University and SMAN 88 Jakarta.' },
        { id: 'journey', label: 'Journey', description: 'A timeline of roles, responsibilities, and professional growth across various organizations.' },
        { id: 'experience', label: 'Experience', description: 'Detailed breakdown of work experiences with project highlights and achievements.' },
    ];

    const categories = [
        { id: 'professional', label: 'Professional Experience', icon: Briefcase, color: 'bg-blue-600', prefix: 'prof-' },
        { id: 'leadership', label: 'Leadership & Organizational', icon: Users, color: 'bg-purple-600', prefix: 'lead-' },
        { id: 'volunteer', label: 'Volunteer Experience', icon: Heart, color: 'bg-orange-500', prefix: 'vol-' },
        { id: 'certifications', label: 'Certifications & Development', icon: Award, color: 'bg-emerald-500', prefix: 'cert-' },
    ];

    const heightFix = () => {
        if (contentRef.current && contentRef.current.parentElement)
            contentRef.current.parentElement.style.height = `${contentRef.current.clientHeight}px`;
    };

    useEffect(() => {
        heightFix();
    }, [activeTab, selectedCategory]);

    const filteredExperiences = useMemo(() => {
        if (!selectedCategory) return [];
        const cat = categories.find(c => c.id === selectedCategory);
        if (!cat) return [];
        return portfolioData.experiences.filter(exp => exp.id.startsWith(cat.prefix));
    }, [selectedCategory]);

    return (
        <div className="mb-24">
            {/* Testimonial-style Header with Hemisphere */}
            <div className="mx-auto w-full max-w-5xl px-8 text-center sm:px-12 mb-12">
                {/* Orb with Hemisphere Background */}
                <div className="relative h-28 sm:h-36">
                    <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-cyan-500/25 before:via-cyan-500/5 before:via-25% before:to-cyan-500/0 before:to-75% sm:h-[560px] sm:w-[560px]">
                        <div className="h-24 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))] sm:h-32">
                            {tabs.map((tab, index) => (
                                <Transition
                                    as="div"
                                    key={index}
                                    show={activeTab === index}
                                    className="absolute inset-0 -z-10 h-full flex items-center justify-center"
                                    enter="transition ease-out duration-700 order-first"
                                    enterFrom="opacity-0 -rotate-[60deg]"
                                    enterTo="opacity-100 rotate-0"
                                    leave="transition ease-out duration-700"
                                    leaveFrom="opacity-100 rotate-0"
                                    leaveTo="opacity-0 rotate-[60deg]"
                                >
                                    <div className="relative top-8 sm:top-11 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/30" />
                                </Transition>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Description Text */}
                <div className="mb-6 transition-all delay-300 duration-150 ease-in-out sm:mb-9 min-h-[100px]">
                    <div className="relative flex flex-col" ref={contentRef}>
                        {tabs.map((tab, index) => (
                            <Transition
                                key={index}
                                show={activeTab === index}
                                enter="transition ease-out duration-300 delay-150 relative"
                                enterFrom="opacity-0 blur-sm translate-y-4"
                                enterTo="opacity-100 blur-0 translate-y-0"
                                leave="transition ease-in duration-150 absolute top-0 left-0 w-full"
                                leaveFrom="opacity-100 blur-0 translate-y-0"
                                leaveTo="opacity-0 blur-sm -translate-y-4"
                                beforeEnter={() => heightFix()}
                            >
                                <div className="px-4 text-xl font-bold text-foreground sm:px-0 sm:text-2xl lg:text-3xl">
                                    &ldquo;{tab.description}&rdquo;
                                </div>
                            </Transition>
                        ))}
                    </div>
                </div>

                {/* Tab Buttons */}
                <div className="-m-1 flex flex-wrap justify-center gap-1 sm:gap-1.5">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`m-1.5 inline-flex justify-center items-center gap-2.5 rounded-full px-5 py-2.5 text-sm whitespace-nowrap shadow-sm transition-colors duration-150 focus-visible:ring focus-visible:ring-cyan-300 focus-visible:outline-none sm:px-6 sm:py-3 sm:text-base ${activeTab === index
                                ? "bg-cyan-500 text-white shadow-cyan-950/10"
                                : "bg-white dark:bg-neutral-800 text-cyan-900 dark:text-cyan-100 hover:bg-cyan-100 dark:hover:bg-neutral-700"
                                }`}
                            onClick={() => {
                                setActiveTab(index);
                                if (index !== 2) setSelectedCategory(null);
                            }}
                        >
                            {tab.id === 'education' && <GraduationCap className="w-5 h-5" />}
                            {tab.id === 'journey' && <Briefcase className="w-5 h-5" />}
                            {tab.id === 'experience' && <Rocket className="w-5 h-5" />}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {/* Education Tab */}
                    {activeTab === 0 && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: isLowPowerMode ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ExperienceStickyScroll />
                            <div className="pb-32" />
                            <ExperienceHighlightSection type="education" isLowPowerMode={isLowPowerMode} />
                        </motion.div>
                    )}

                    {/* Journey Tab */}
                    {activeTab === 1 && (
                        <motion.div
                            key="journey"
                            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: isLowPowerMode ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ExperienceTimeline isLowPowerMode={isLowPowerMode} />
                            <div className="pb-32" />
                            <ExperienceHighlightSection type="journey" isLowPowerMode={isLowPowerMode} />
                        </motion.div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === 2 && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: isLowPowerMode ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                            <AnimatePresence mode="wait">
                                {!selectedCategory ? (
                                    <motion.div
                                        key="cta-selection"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:min-h-[600px] items-center"
                                    >
                                        {/* Left: Sticky Title & Context */}
                                        <div className="lg:col-span-5 space-y-8">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <h2 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
                                                    SELECT <br />
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                                        ARCHIVE
                                                    </span>
                                                </h2>
                                                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
                                                    Navigate through the timeline of my career. Choose a lens to filter the experience database.
                                                </p>
                                            </motion.div>

                                            {/* Decorative Elements */}
                                            <div className="hidden lg:block w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                                        </div>

                                        {/* Right: Interactive List */}
                                        <div className="lg:col-span-7 flex flex-col gap-4">
                                            {categories.map((cat, idx) => (
                                                <motion.button
                                                    key={cat.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className="group relative flex items-center gap-6 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-neutral-900/50 text-left overflow-hidden"
                                                >

                                                    {/* Hover Gradient Background */}
                                                    <div className={cn(
                                                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                                                        cat.color
                                                    )} />

                                                    {/* Category Icon */}
                                                    <div className={cn(
                                                        "w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500",
                                                        cat.color
                                                    )}>
                                                        <cat.icon className="w-8 h-8" />
                                                    </div>

                                                    {/* Text Content */}
                                                    <div className="flex-1 relative z-10">
                                                        <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                                                            {cat.label}
                                                        </h4>
                                                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 line-clamp-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                                                            Tap to explore {cat.label.toLowerCase()} records
                                                        </p>
                                                    </div>

                                                    {/* Arrow Action */}
                                                    <div className="w-10 h-10 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-purple-500 dark:group-hover:text-cyan-500 group-hover:border-purple-200 dark:group-hover:border-cyan-800 transition-all duration-300">
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="ledger-view"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32"
                                    >
                                        {/* Left: Sticky Sidebar Filters */}
                                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
                                            <button
                                                onClick={() => setSelectedCategory(null)}
                                                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-black dark:hover:text-white transition-colors px-4 py-2 -ml-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 w-fit"
                                            >
                                                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                                <span>Back to Selection</span>
                                            </button>

                                            <div className="space-y-2">
                                                <h3 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tighter leading-tight">
                                                    {categories.find(c => c.id === selectedCategory)?.label}
                                                </h3>
                                                <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                                            </div>

                                            <div className="hidden lg:flex flex-col gap-2">
                                                <p className="text-xs font-bold uppercase text-neutral-400 tracking-widest mb-2">
                                                    Filter View
                                                </p>
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setSelectedCategory(cat.id)}
                                                        className={cn(
                                                            "text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent",
                                                            selectedCategory === cat.id
                                                                ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-lg border-neutral-200 dark:border-neutral-700"
                                                                : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-300"
                                                        )}
                                                    >
                                                        {cat.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Scrollable Content Stream */}
                                        <div className="lg:col-span-8 space-y-6">
                                            {filteredExperiences.map((exp, idx) => (
                                                <motion.div
                                                    key={exp.id}
                                                    initial={{ opacity: 0, y: isLowPowerMode ? 0 : 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: isLowPowerMode ? 0 : idx * 0.1 }}
                                                    className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-[2rem] hover:shadow-2xl dark:hover:shadow-neutral-900/50 transition-all duration-300 hover:-translate-y-1"
                                                >
                                                    {/* Floating Date Badge */}
                                                    <div className="flex flex-wrap gap-3 mb-6">
                                                        <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                                                            {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                                        </span>
                                                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
                                                            {exp.company}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-6 items-start">
                                                        {/* Logo */}
                                                        <div className="hidden sm:flex w-16 h-16 bg-neutral-50 dark:bg-black rounded-2xl items-center justify-center shrink-0 border border-neutral-100 dark:border-neutral-800 p-2">
                                                            {exp.logo ? (
                                                                <Image src={exp.logo} alt={exp.company} width={48} height={48} className="object-contain" unoptimized />
                                                            ) : (
                                                                <Briefcase className="w-8 h-8 text-neutral-300" />
                                                            )}
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                                                                {exp.position}
                                                            </h4>
                                                            <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                                                                {exp.description}
                                                            </p>

                                                            {/* Minimal Skills */}
                                                            <div className="flex flex-wrap gap-2 pt-2">
                                                                {exp.skills.slice(0, 5).map((skill, i) => (
                                                                    <span key={i} className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                                                        #{skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {filteredExperiences.length === 0 && (
                                                <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                                                    <p>No records found in this sector.</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="pb-32" />
                            <ExperienceHighlightSection type="experience" isLowPowerMode={isLowPowerMode} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


import { SmoothScrollHero } from '@/components/sections/SmoothScrollHero';

export default function ExperiencePage() {
    const t = useTranslations('experience');
    const { resolvedTheme } = useTheme();
    const { isLowPowerMode } = usePerformance();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-background text-foreground relative"
        >
            {/* Smooth Scroll Hero Section */}
            <SmoothScrollHero />

            <FloatingShape
                className="w-[500px] h-[500px] -top-20 -right-40"
                gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
                isLowPowerMode={isLowPowerMode}
            />
            <FloatingShape
                className="w-[400px] h-[400px] bottom-40 -left-20"
                gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)"
                delay={3}
                isLowPowerMode={isLowPowerMode}
            />

            <motion.div
                initial={{ opacity: 0, y: isLowPowerMode ? 0 : 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20"
            >

                {/* 1. Work Experience Gallery Marquee */}
                <div className="w-screen relative left-1/2 -translate-x-1/2 mb-20 -mt-10 md:-mt-20">
                    <ExperienceMarquee />
                </div>

                {/* 2. Tab Slider Section (Testimonial-style UI) */}
                <ExperienceTabSlider isLowPowerMode={isLowPowerMode} />
            </motion.div>
        </motion.div>
    );
}

function ExperienceTimeline({ isLowPowerMode }: { isLowPowerMode: boolean }) {
    const experiences = portfolioData.experiences;

    const groupedExperiences = useMemo(() => {
        const groups: { [key: string]: Experience[] } = {};

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

                        <div className="flex flex-wrap gap-2 mb-6">
                            {exp.skills.map((skill, i) => (
                                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                    {skill}
                                </span>
                            ))}
                        </div>

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
