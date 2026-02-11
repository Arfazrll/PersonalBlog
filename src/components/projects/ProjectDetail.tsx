'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useTranslations } from 'next-intl';
import { X, Calendar, Code, Box, Award, Share2, ExternalLink, Github, Terminal, ChevronRight, ChevronLeft, CheckCircle2, Copy, Check, Maximize2, ArrowUpRight, Zap, Sparkles } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Project } from '@/types';
import { portfolioData } from '@/data/portfolio';
import { TechStack } from './TechStack';

// --- Animated Terminal Component ---
const TerminalBlock = ({ title, code }: { title: string; code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-white/30">{title}</span>
                <div className="w-10" /> {/* Spacer for balance */}
            </div>

            {/* Terminal Body */}
            <div className="relative group p-4">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
                <div className="font-mono text-sm leading-relaxed overflow-x-auto">
                    {code.split('\n').map((line, i) => (
                        <div key={i} className="flex min-w-max">
                            <span className="text-white/20 mr-4 select-none">$</span>
                            <span className="text-emerald-400">{line}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper to render text with bold markers (**text**)
const renderRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-foreground bg-primary/10 px-1 rounded mx-0.5">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
};

// --- vertical Gallery Component ---
const ProjectGallery = ({
    images,
    repoUrl,
    onImageClick,
}: {
    images: string[],
    repoUrl?: string,
    onImageClick: (img: string) => void,
    scrollContainerRef?: React.RefObject<HTMLDivElement | null> // Optional/Unused now
}) => {
    return (
        <div className="flex flex-col gap-12 pb-12">
            {images.map((img, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative w-full cursor-zoom-in"
                    onClick={() => onImageClick(img)}
                >
                    {/* Real Image Tag - Floating with deep shadow */}
                    <img
                        src={img}
                        alt={`Gallery Image ${idx + 1}`}
                        className="w-full h-auto object-contain block rounded-lg shadow-2xl shadow-black/20 dark:shadow-black/60 transition-transform duration-500 group-hover:scale-[1.01]"
                    />

                    {/* Tech UI (Minimal Floating Label) */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shadow-lg flex items-center gap-2">
                            <span>IMG_0{idx + 1}</span>
                            <Maximize2 className="w-3 h-3" />
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* GitHub Link */}
            {repoUrl && (
                <div className="flex justify-center pt-8">
                    <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
                    >
                        <Github className="w-5 h-5" />
                        <span className="text-sm font-medium">View Source</span>
                    </a>
                </div>
            )}
        </div>
    );
};

// --- Typewriter Effect Component ---
const Typewriter = ({ examples }: { examples: string[] }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % examples.length;
            const fullText = examples[i];

            setCurrentText(isDeleting
                ? fullText.substring(0, currentText.length - 1)
                : fullText.substring(0, currentText.length + 1)
            );

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, loopNum, examples]);

    return (
        <span className="font-mono text-emerald-400">
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export function ProjectDetail({ project, onClose, isLowPowerMode }: { project: Project; onClose: () => void; isLowPowerMode?: boolean }) {
    const t = useTranslations('projects');
    const isOngoing = project.status === 'ongoing';
    const [activeSection, setActiveSection] = useState<'overview' | 'tech' | 'features' | 'gallery' | 'install'>('overview');
    const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Parallax & Scroll Animations for Hero
    const heroRef = useRef<HTMLDivElement>(null);

    const lenis = useLenis();

    // Lock body scroll with robust Lenis + Manual CSS handling (Layout Effect for Sync)
    useEffect(() => {
        // Lock
        if (lenis) lenis.stop();
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Unlock
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        };
    }, [lenis]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isLowPowerMode ? 0.05 : 0.1,
                delayChildren: isLowPowerMode ? 0.1 : 0.2
            }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: isLowPowerMode ? 10 : 20 },
        visible: { opacity: 1, y: 0, transition: { type: isLowPowerMode ? "tween" : "spring", stiffness: 300, damping: 24, duration: 0.3 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0, pointerEvents: "none" }}
            animate={{ opacity: 1, pointerEvents: "auto" }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-hidden"
            onClick={() => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                if (lenis) lenis.start();
                onClose();
            }}
        >
            {/* Modal Container */}
            <motion.div
                initial={{ y: '100%', scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: '100%', scale: 0.95 }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 200,
                    exit: { duration: 0.2, ease: "easeInOut" }
                }}
                className="absolute inset-0 md:inset-4 md:rounded-3xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-2xl flex flex-col lg:flex-row will-change-transform"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
            >

                {/* Close Button */}
                <motion.button
                    onClick={() => {
                        // FORCE UNLOCK IMMEDIATELY before unmount animation starts
                        // This prevents heavy tabs (like TechStack) from blocking the restore
                        document.documentElement.style.overflow = '';
                        document.body.style.overflow = '';
                        if (lenis) lenis.start();
                        onClose();
                    }}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/50 transition-all duration-300 group"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className="w-5 h-5 text-foreground/70 group-hover:text-red-600" />
                </motion.button>

                {/* LEFT COLUMN - Hero Image & Title */}
                <div ref={heroRef} className="relative lg:w-5/12 h-[35vh] lg:h-full flex flex-col justify-end p-6 sm:p-10 overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(project.image)}>
                    {/* Dynamic Background Image with Parallax Scale */}
                    <div className="absolute inset-0 z-0">
                        {project.image ? (
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                loading="eager"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-background animate-gradient" />
                        )}
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                        {/* Expand hint */}
                        <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                            <Maximize2 className="w-3.5 h-3.5" />
                            Expand Cover
                        </div>
                    </div>

                    {/* Content on top of image */}
                    <div className="relative z-10 w-full mb-4">
                        {/* Status Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className={cn("h-1 mb-6 rounded-full", isOngoing ? "bg-emerald-500" : "bg-blue-500")}
                        />

                        {/* Animated Title */}
                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {project.title}
                        </motion.h1>

                        {/* Status Badge & Date */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4 text-sm font-mono text-white/60 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                                isOngoing
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                    : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                            )}>
                                {isOngoing ? 'Development' : 'Released'}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(project.startDate)}
                            </span>
                        </motion.div>

                        {/* Action Buttons */}
                        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                            {project.demoUrl && (
                                <motion.a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-bold text-sm shadow-xl transition-all",
                                        isOngoing
                                            ? "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-400"
                                            : "bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-500"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Live Demo</span>
                                    <ExternalLink className="w-4 h-4" />
                                </motion.a>
                            )}
                            <motion.a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Github className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Scrollable Content */}
                <div className="lg:w-7/12 flex flex-col flex-1 min-h-0 lg:h-full bg-transparent relative">
                    {/* Cloud/Blur Separator - Soft seamless fade (Directed Left & Narrower) */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent pointer-events-none z-30" />

                    {/* Tabs - Floating & Adaptive */}
                    <div className="sticky top-0 z-20 px-6 pt-6 pb-2 bg-gradient-to-b from-white/95 to-transparent dark:from-zinc-950/95 dark:to-transparent backdrop-blur-sm lg:pl-12 transition-[padding]">
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                            {(['overview', 'tech', 'features', 'gallery', 'install'] as const).map((section) => {
                                // Conditionally render tabs based on available data
                                if (section === 'gallery' && (!project.galleryImages || project.galleryImages.length === 0)) return null;

                                return (
                                    <button
                                        key={section}
                                        onClick={() => setActiveSection(section)}
                                        className={cn(
                                            "relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 shrink-0",
                                            activeSection === section
                                                ? "text-background bg-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <span className="relative z-10">{section}</span>
                                        {activeSection === section && (
                                            <motion.div
                                                layoutId="activeTabPill"
                                                className="absolute inset-0 bg-transparent rounded-full z-0"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar lg:pl-12 transition-[padding]">
                        <AnimatePresence mode="wait">
                            {/* OVERVIEW SECTION */}
                            {activeSection === 'overview' && (
                                <motion.div
                                    key="overview"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="space-y-16 p-6"
                                >
                                    {/* Project Story & Metadata */}
                                    <div className="space-y-10">
                                        <motion.div variants={itemVariants} className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground border border-black/5 dark:border-white/5">
                                                    <Box className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-foreground">Mission Brief</h3>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Project Overview</p>
                                                </div>
                                            </div>
                                            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-light tracking-wide border-l-2 border-black/10 dark:border-white/10 pl-6">
                                                {project.longDescription || project.description}
                                            </p>
                                        </motion.div>

                                        {/* Metadata Strip */}
                                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-x-16 gap-y-8 py-10 border-y border-black/5 dark:border-white/5">
                                            {[
                                                { label: 'Role', value: 'Full Stack Dev', icon: Code },
                                                { label: 'Timeline', value: '3 Months', icon: Calendar },
                                                { label: 'Team', value: 'Individual', icon: Award },
                                                { label: 'Status', value: isOngoing ? 'Active' : 'Completed', icon: CheckCircle2 }
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-col items-center text-center gap-4">
                                                    <div className="flex items-center gap-2 text-muted-foreground/80 text-[10px] uppercase tracking-wider font-bold">
                                                        <item.icon className="w-3.5 h-3.5" />
                                                        {item.label}
                                                    </div>
                                                    <div className="text-lg font-medium text-foreground">{item.value}</div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Challenges & Solutions (Timeline Flow) */}
                                    {project.challengesAndSolutions && (
                                        <motion.div variants={itemVariants} className="space-y-8">
                                            <h3 className="text-xl font-bold flex items-center gap-3 text-foreground/90">
                                                <Terminal className="w-5 h-5 text-amber-500" />
                                                Engineering Chronicles
                                            </h3>

                                            <div className="relative border-l border-black/10 dark:border-white/10 ml-3 space-y-12 pl-8 pb-4">
                                                {project.challengesAndSolutions.map((item, idx) => (
                                                    <div key={idx} className="relative group">
                                                        {/* Node */}
                                                        <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-background border-2 border-black/10 dark:border-white/10 group-hover:border-amber-500 group-hover:scale-125 transition-all duration-300 z-10" />

                                                        <div className="space-y-4">
                                                            <h4 className="text-lg font-bold text-foreground group-hover:text-amber-500 transition-colors">
                                                                {item.problem}
                                                            </h4>
                                                            <div className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-black/5 dark:border-white/5 group-hover:border-emerald-500/50 transition-colors">
                                                                <span className="text-emerald-600 dark:text-emerald-500 font-bold text-xs uppercase tracking-wider block mb-1">Solved With</span>
                                                                {item.solution}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Support Section (Clean Call to Action) */}
                                    <motion.div variants={itemVariants} className="pt-12 border-t border-black/5 dark:border-white/5">
                                        <div className="flex flex-col items-center text-center space-y-8">
                                            <div className="max-w-xl space-y-4">
                                                <h3 className="text-2xl md:text-3xl font-bold text-foreground">Interested in the code?</h3>
                                                <div className="h-6 flex items-center justify-center">
                                                    <Typewriter examples={[
                                                        "Check out the repo on GitHub...",
                                                        "Open an issue for features...",
                                                        "Contact me for collaboration..."
                                                    ]} />
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <a
                                                    href={project.repoUrl ? `${project.repoUrl}` : '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-8 py-3 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-all flex items-center gap-2"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub Repo
                                                </a>
                                                <a
                                                    href="/contact"
                                                    className="px-8 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground font-medium transition-all flex items-center gap-2"
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                    Contact
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* TECH SECTION - NEW HOLOGRAPHIC BENTO GRID */}
                            {activeSection === 'tech' && (
                                <motion.div
                                    key="tech"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className=""
                                >
                                    <TechStack techStack={project.techStack} tools={project.tools} />
                                </motion.div>
                            )}

                            {/* FEATURES SECTION - Transparent & Connected */}
                            {activeSection === 'features' && (
                                <motion.div
                                    key="features"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="h-full flex flex-col p-6"
                                >
                                    {project.features ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                                            {project.features.map((group, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="group relative flex flex-col p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-black/5 dark:border-white/5 hover:bg-white/80 dark:hover:bg-zinc-900/60 hover:border-emerald-500/30 shadow-lg hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden"
                                                >
                                                    {/* Hover Gradient Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                                    {/* Icon Header */}
                                                    <div className="mb-6 relative z-10">
                                                        <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-500">
                                                            {idx === 0 ? <Box className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> :
                                                                idx === 1 ? <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" /> :
                                                                    <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                            {group.title}
                                                        </h3>
                                                    </div>

                                                    {/* Feature List */}
                                                    <div className="space-y-4 relative z-10 font-light">
                                                        {group.items.map((item, i) => (
                                                            <div key={i} className="flex gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 shrink-0" />
                                                                <span>{renderRichText(item)}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Bottom Decoration */}
                                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {project.highlights?.map((highlight, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-center gap-4 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:bg-black/10 dark:hover:bg-white/10"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                                        <CheckCircle2 className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-lg text-foreground/90 font-medium">{renderRichText(highlight)}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}


                            {/* GALLERY SECTION */}
                            {activeSection === 'gallery' && project.galleryImages && (
                                <motion.div
                                    key="gallery"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 p-6"
                                >
                                    <ProjectGallery
                                        images={project.galleryImages || []}
                                        repoUrl={project.repoUrl}
                                        onImageClick={(img) => setSelectedImage(img)}
                                    />
                                </motion.div>
                            )}

                            {/* INSTALL SECTION */}
                            {activeSection === 'install' && (
                                <motion.div
                                    key="install"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 p-6"
                                >
                                    {project.installation ? (
                                        project.installation.map((step, i) => (
                                            <div key={i} className="bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden border border-black/10 dark:border-white/5">
                                                <div className="bg-black/[0.07] dark:bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-black/5 dark:border-white/5">
                                                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">{i + 1}</div>
                                                    <h3 className="text-xs font-semibold text-foreground/80">{step.title}</h3>
                                                </div>
                                                {step.type === 'code' ? (
                                                    <div className="p-0">
                                                        <TerminalBlock title={step.title} code={step.code || ''} />
                                                    </div>
                                                ) : (
                                                    <div className="p-3 text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                                                        {step.code}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <TerminalBlock
                                            title="Quick Start"
                                            code={`git clone ${project.repoUrl}\ncd project\nnpm install\nnpm run dev`}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Image Lightbox - Independent Portal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.img
                            layoutId={`project-img-${selectedImage}`}
                            src={selectedImage}
                            alt="Lightbox View"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <button className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
