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
    Rocket
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
        description: "Real-world projects that solve real problems. Building solutions that make a difference, one commit at a time."
    }
};

function ExperienceHighlightSection({ type }: { type: TabType }) {
    const content = highlightContent[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-24"
        >
            <HeroHighlight containerClassName="h-[30rem] rounded-3xl overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
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
                    initial={{ opacity: 0, y: 20 }}
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

interface TabItem {
    id: TabType;
    label: string;
    description: string;
}

function ExperienceTabSlider() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<number>(1);

    const tabs: TabItem[] = [
        { id: 'education', label: 'Education', description: 'Building strong foundations through academic excellence at Telkom University and SMAN 88 Jakarta.' },
        { id: 'journey', label: 'Journey', description: 'A timeline of roles, responsibilities, and professional growth across various organizations.' },
        { id: 'experience', label: 'Experience', description: 'Detailed breakdown of work experiences with project highlights and achievements.' },
    ];

    const heightFix = () => {
        if (contentRef.current && contentRef.current.parentElement)
            contentRef.current.parentElement.style.height = `${contentRef.current.clientHeight}px`;
    };

    useEffect(() => {
        heightFix();
    }, [activeTab]);

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
                <div className="mb-6 transition-all delay-300 duration-150 ease-in-out sm:mb-9">
                    <div className="relative flex flex-col" ref={contentRef}>
                        {tabs.map((tab, index) => (
                            <Transition
                                key={index}
                                show={activeTab === index}
                                enter="transition ease-in-out duration-500 delay-200 order-first"
                                enterFrom="opacity-0 -translate-x-4"
                                enterTo="opacity-100 translate-x-0"
                                leave="transition ease-out duration-300 delay-300 absolute"
                                leaveFrom="opacity-100 translate-x-0"
                                leaveTo="opacity-0 translate-x-4"
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
                            onClick={() => setActiveTab(index)}
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
            <div>
                <AnimatePresence mode="wait">
                    {/* Education Tab */}
                    {activeTab === 0 && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ExperienceStickyScroll />
                            <ExperienceHighlightSection type="education" />
                        </motion.div>
                    )}

                    {/* Journey Tab */}
                    {activeTab === 1 && (
                        <motion.div
                            key="journey"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ExperienceTimeline />
                            <ExperienceHighlightSection type="journey" />
                        </motion.div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === 2 && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                                <div className="p-4 rounded-2xl bg-primary/10">
                                    <Rocket className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">Coming Soon</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Detailed experience breakdown with project highlights and achievements will be available here soon.
                                </p>
                            </div>
                            <ExperienceHighlightSection type="experience" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}


import { SmoothScrollHero } from '@/components/sections/SmoothScrollHero';

export default function ExperiencePage() {
    const t = useTranslations('experience');
    const { resolvedTheme } = useTheme();

    return (
        <div className="bg-background text-foreground relative">
            {/* Smooth Scroll Hero Section */}
            <SmoothScrollHero />

            <FloatingShape className="w-[500px] h-[500px] -top-20 -right-40" gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" />
            <FloatingShape className="w-[400px] h-[400px] bottom-40 -left-20" gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" delay={3} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

                {/* 1. Work Experience Gallery Marquee */}
                <div className="w-screen relative left-1/2 -translate-x-1/2 mb-20 -mt-10 md:-mt-20">
                    <ExperienceMarquee />
                </div>

                {/* 2. Tab Slider Section (Testimonial-style UI) */}
                <ExperienceTabSlider />
            </div>
        </div>
    );
}

function ExperienceTimeline() {
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
