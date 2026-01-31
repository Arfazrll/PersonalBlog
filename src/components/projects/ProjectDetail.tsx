'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Calendar, Code, Box, Award, Share2, ExternalLink, Github } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Project } from '@/types';

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
    const t = useTranslations('projects');
    const isOngoing = project.status === 'ongoing';
    const [activeSection, setActiveSection] = useState<'overview' | 'tech' | 'features' | 'install'>('overview');

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
            onClick={onClose}
        >
            {/* Full-Screen Slide-Up Container */}
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute inset-x-0 bottom-0 top-0 bg-background overflow-hidden border-t border-border"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-background/50 hover:bg-destructive/90 hover:text-destructive-foreground border border-border backdrop-blur-md transition-all group shadow-sm"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-sm font-bold text-foreground group-hover:text-destructive-foreground">EXIT</span>
                    <X className="w-4 h-4 text-foreground group-hover:text-destructive-foreground" />
                </motion.button>

                {/* Split Screen Layout */}
                <div className="h-full flex flex-col lg:flex-row">

                    {/* LEFT - Giant Title Hero & Image */}
                    <div className="lg:w-2/5 h-[35vh] sm:h-[45vh] lg:h-full relative flex items-end p-6 sm:p-12 overflow-hidden group">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-muted to-background" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                            <div className="absolute inset-0 bg-background/20" />
                        </div>

                        {/* Dot Pattern Overlay */}
                        <div className="absolute inset-0 opacity-[0.1] z-0 pointer-events-none" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }} />

                        {/* Accent Bar */}
                        <motion.div
                            className={cn("absolute left-0 top-0 w-1.5 h-full z-20", isOngoing ? "bg-emerald-500" : "bg-blue-500")}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        />

                        <div className="relative z-10 w-full mb-8 lg:mb-20">
                            {/* Label */}
                            <motion.div
                                className="flex items-center gap-3 mb-6"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                    isOngoing ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
                                )}>
                                    {project.status === 'ongoing' ? 'In Development' : 'Completed Project'}
                                </span>
                            </motion.div>

                            {/* Stacked Title */}
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[0.9] tracking-tight mb-8"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {project.title.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </motion.h1>

                            {/* Meta Data */}
                            <motion.div
                                className="flex flex-wrap items-center gap-6 text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm font-mono tracking-wide">
                                        {formatDate(project.startDate)} — {project.endDate ? formatDate(project.endDate) : 'Present'}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT - Tabbed Content */}
                    <div className="lg:w-3/5 flex-1 overflow-y-auto bg-background/50 backdrop-blur-xl">

                        {/* Tab Navigation */}
                        {/* Tab Navigation */}
                        <motion.div
                            className="sticky top-0 z-20 flex items-center gap-1 p-4 sm:p-6 bg-background/95 backdrop-blur-sm border-b border-border/50 overflow-x-auto no-scrollbar touch-pan-x"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {(['overview', 'tech', 'features', 'install'] as const).map((section) => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={cn(
                                        "px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0",
                                        activeSection === section
                                            ? "bg-foreground text-background shadow-lg"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </motion.div>

                        {/* Tab Content */}
                        <div className="p-5 sm:p-8 lg:p-12 min-h-[50vh]">
                            <AnimatePresence mode="wait">
                                {activeSection === 'overview' && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-10"
                                    >
                                        <div>
                                            <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
                                                <span className="w-8 h-[1px] bg-primary"></span>
                                                Project Overview
                                            </h2>
                                            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-light">
                                                {project.longDescription || project.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-border transition-colors">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Code className="w-5 h-5 text-primary" />
                                                    <span className="font-semibold text-foreground">Tech Stack</span>
                                                </div>
                                                <span className="text-4xl font-bold text-foreground block mb-1">{project.techStack.length}</span>
                                                <p className="text-sm text-muted-foreground">Technologies Used</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-border transition-colors">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Box className="w-5 h-5 text-primary" />
                                                    <span className="font-semibold text-foreground">Tools</span>
                                                </div>
                                                <span className="text-4xl font-bold text-foreground block mb-1">{project.tools.length}</span>
                                                <p className="text-sm text-muted-foreground">Dev Tools & Platforms</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-4">
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                                    className={cn("inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-1",
                                                        isOngoing ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                                                    )}>
                                                    <span>LIVE DEMO</span>
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide bg-background border-2 border-border text-foreground hover:bg-muted transition-all hover:-translate-y-1">
                                                    <Github className="w-4 h-4" />
                                                    <span>SOURCE CODE</span>
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === 'tech' && (
                                    <motion.div
                                        key="tech"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-12"
                                    >
                                        <div>
                                            <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
                                                <Code className="w-3 h-3" /> Core Technologies
                                            </h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {project.techStack.map((tech, i) => (
                                                    <motion.div
                                                        key={tech}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 transition-colors"
                                                    >
                                                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                                                        <span className="font-medium text-foreground">{tech}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
                                                <Box className="w-3 h-3" /> Tools & Infrastructure
                                            </h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {project.tools.map((tool, i) => (
                                                    <motion.div
                                                        key={tool}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.1 + i * 0.05 }}
                                                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 transition-colors"
                                                    >
                                                        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                                                        <span className="font-medium text-foreground">{tool}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === 'features' && (
                                    <motion.div
                                        key="features"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
                                            <Award className="w-3 h-3" /> Key Features
                                        </h2>
                                        {project.highlights && project.highlights.length > 0 ? (
                                            <div className="grid gap-4">
                                                {project.highlights.map((highlight, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-muted/30 to-transparent border border-border/40 hover:border-primary/20 hover:from-primary/5 transition-all group"
                                                    >
                                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-transform group-hover:scale-110 shadow-lg",
                                                            isOngoing ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
                                                        )}>
                                                            {i + 1}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-foreground mb-1">Feature {i + 1}</h3>
                                                            <p className="text-muted-foreground leading-relaxed">{highlight}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground italic">No specific features listed.</p>
                                        )}
                                    </motion.div>
                                )}

                                {activeSection === 'install' && (
                                    <motion.div
                                        key="install"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
                                                <Box className="w-3 h-3" /> Clone Repository
                                            </h2>
                                            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 overflow-x-auto relative group">
                                                <code className="text-sm font-mono text-emerald-400">
                                                    git clone {project.repoUrl || 'https://github.com/Arfazrll/project.git'}
                                                </code>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`git clone ${project.repoUrl || ''}`)}
                                                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Copy to clipboard"
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-3 ml-1">
                                                Run this command in your terminal to download the project source code.
                                            </p>
                                        </div>

                                        <div>
                                            <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
                                                <Code className="w-3 h-3" /> Install Dependencies
                                            </h2>
                                            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 font-mono text-sm text-blue-300">
                                                npm install
                                                <br />
                                                <span className="text-zinc-500"># or</span>
                                                <br />
                                                yarn install
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                                                className="full-width flex items-center justify-center gap-2 p-4 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition-opacity">
                                                <Github className="w-5 h-5" />
                                                <span>View Source on GitHub</span>
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
