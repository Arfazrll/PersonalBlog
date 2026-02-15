'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Calendar, Code, Box, Award, Share2, ExternalLink, Github, Terminal, ChevronRight, ChevronLeft, CheckCircle2, Copy, Check, Maximize2, ArrowUpRight, Zap, Sparkles, ArrowLeft, Clock, Users, Layers, LayoutGrid, ArrowRight } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Project } from '@/types';
import { TechStack } from './TechStack';
import { ProjectPlaceholder } from './ProjectPlaceholder';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';

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

// --- Vertical Gallery Component ---
const ProjectGallery = ({
    images,
    onImageClick,
    viewMoreText,
    viewLessText
}: {
    images: string[],
    onImageClick: (img: string) => void,
    viewMoreText: string,
    viewLessText: string
}) => {
    const [showAll, setShowAll] = useState(false);
    const visibleImages = showAll ? images : images.slice(0, 2);

    return (
        <div className="flex flex-col gap-8 pb-12">
            <div className="flex flex-col gap-12">
                {visibleImages.map((img, idx) => (
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
            </div>

            {images.length > 2 && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-3 rounded-full border border-border/40 hover:bg-secondary/10 transition-colors text-sm font-bold tracking-wide uppercase flex items-center gap-2 group"
                    >
                        <span>{showAll ? viewLessText : viewMoreText}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", showAll ? "rotate-[-90deg]" : "rotate-90")} />
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Typewriter Effect Component ---
const Typewriter = ({ examples }: { examples: string[] }) => {
    const [currentText, setCurrentText] = useState("");
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
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

export function ProjectPageContent({ project, isLowPowerMode }: { project: Project; isLowPowerMode?: boolean }) {
    const t = useTranslations('projects');
    const tCommon = useTranslations('common');
    const router = useRouter();
    const isOngoing = project.status === 'ongoing';
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleExit = () => {
        router.push('/projects', { scroll: false });
    };

    // Get random other projects for "More Projects" section
    const otherProjects = useMemo(() => {
        const others = portfolioData.projects.filter(p => p.id !== project.id);
        const shuffled = [...others].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }, [project.id]);

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 pt-24 sm:pt-32">

            {/* 1. HEADER SECTION (Centered, Blog Style) */}
            <div className="container max-w-7xl mx-auto px-6 mb-12 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Back Link */}
                    <div className="flex items-center gap-4 mb-6">
                        <div
                            onClick={handleExit}
                            className="flex items-center gap-2 text-sm text-muted-foreground font-medium hover:text-primary transition-colors group cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{t('sections.backToProjects')}</span>
                        </div>
                    </div>

                    {/* Title & Description - REMOVED max-w-4xl constraint for Title */}
                    <div className="w-full">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border bg-secondary/5 border-border/40 text-muted-foreground">
                            <span className={cn("w-2 h-2 rounded-full", isOngoing ? "bg-emerald-500 animate-pulse" : "bg-blue-500")} />
                            {isOngoing ? t('status.ongoing') : t('status.completed')}
                        </div>

                        {/* Full Width Layout for Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.0] break-words uppercase">
                            {project.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed max-w-3xl font-light mb-8">
                            {project.description}
                        </p>

                        {/* Typewriter Effect (Subtext) */}
                        <div className="font-mono text-sm text-emerald-500/80 mb-8 h-6 flex items-center">
                            <Typewriter examples={[
                                "Initiating project overview...",
                                "Loading technical specifications...",
                                "Decrypting success metrics..."
                            ]} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 2. HERO IMAGE SECTION (Wide Banner) */}
            <div className="container max-w-7xl mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative w-full aspect-video md:aspect-[2/1] rounded-3xl overflow-hidden border border-border/40 shadow-2xl bg-secondary/5 group"
                    onClick={() => project.image && setSelectedImage(project.image)}
                >
                    {project.image ? (
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                        />
                    ) : (
                        <ProjectPlaceholder className="rounded-none border-0 bg-transparent pb-0 [&>div.z-10]:scale-125" title="No Image Available" />
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
            </div>

            {/* 3. METADATA BAR (Horizontal Strip) */}
            <div className="container max-w-7xl mx-auto px-6 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 border-y border-border/40 py-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                            <Code className="w-3 h-3" /> {t('metadata.role')}
                        </span>
                        <span className="font-bold text-foreground">{project.role || t('metadata.roleValue')}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                            <Clock className="w-3 h-3" /> {t('metadata.timeline')}
                        </span>
                        <span className="font-bold text-foreground">{project.customTimeline || formatDate(project.startDate)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                            <Users className="w-3 h-3" /> {t('metadata.team')}
                        </span>
                        <span className="font-bold text-foreground">{project.team || t('metadata.teamValue')}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                            <Layers className="w-3 h-3" /> {t('metadata.techStack')}
                        </span>
                        <span className="font-bold text-foreground truncate">{t('metadata.techStackValue', { count: project.techStack.length })}</span>
                    </div>
                </div>
            </div>

            {/* 4. MAIN CONTENT GRID */}
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Main Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* MISSION OVERVIEW */}
                        <section id="mission">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-emerald-500/10 text-emerald-500 p-2 rounded-lg">
                                    <Box className="w-5 h-5" />
                                </span>
                                <h2 className="text-2xl font-bold text-foreground">{t('sections.missionBrief')}</h2>
                            </div>
                            <div className="prose prose-lg prose-invert prose-primary max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-loose prose-p:text-muted-foreground">
                                <p>{project.longDescription || project.description}</p>
                            </div>
                        </section>

                        {/* FEATURES (BENTO GRID - Adapted for 8 cols) */}
                        {project.features && (
                            <section id="features">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                                        <Zap className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold text-foreground">{t('sections.keyFeatures')}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((group, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="p-6 rounded-2xl bg-secondary/5 border border-white/5 hover:border-white/10 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-emerald-500">
                                                {idx === 0 ? <Box className="w-5 h-5" /> : idx === 1 ? <Terminal className="w-5 h-5" /> : idx === 2 ? <Zap className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                                            </div>
                                            <h3 className="text-lg font-bold text-foreground mb-3">{group.title}</h3>
                                            <ul className="space-y-2">
                                                {group.items.map((item, i) => (
                                                    <li key={i} className="text-sm text-muted-foreground flex gap-2 items-start">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                                        <span>{renderRichText(item)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ENGINEERING CHRONICLES (TIMELINE) */}
                        {project.challengesAndSolutions && (
                            <section id="chronicles">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="bg-amber-500/10 text-amber-500 p-2 rounded-lg">
                                        <Terminal className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold text-foreground">{t('sections.engineeringChronicles')}</h2>
                                </div>
                                <div className="relative border-l border-white/10 ml-3 space-y-12 pl-8 pb-4">
                                    {project.challengesAndSolutions.map((item, idx) => (
                                        <div key={idx} className="relative group">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-background border-2 border-white/10 group-hover:border-amber-500 transition-colors z-10" />
                                            <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-amber-500 transition-colors">
                                                {item.problem}
                                            </h4>
                                            <div className="text-sm text-muted-foreground pl-4 border-l border-white/5">
                                                <span className="text-emerald-500 font-bold text-xs uppercase tracking-wider block mb-1">{t('sections.solution')}</span>
                                                {item.solution}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* GALLERY (Vertical Stack, Limit 2) */}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <section id="gallery">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="bg-purple-500/10 text-purple-500 p-2 rounded-lg">
                                        <LayoutGrid className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold text-foreground">{t('sections.visualGallery')}</h2>
                                </div>
                                <ProjectGallery
                                    images={project.galleryImages}
                                    onImageClick={(img) => setSelectedImage(img)}
                                    viewMoreText={t('sections.viewMore')}
                                    viewLessText={t('sections.viewLess')}
                                />
                            </section>
                        )}

                        {/* INSTALLATION */}
                        {project.installation && (
                            <section id="installation">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="bg-emerald-500/10 text-emerald-500 p-2 rounded-lg">
                                        <Terminal className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold text-foreground">{t('sections.installation')}</h2>
                                </div>
                                <div className="space-y-6">
                                    {project.installation.map((step, idx) => (
                                        <div key={idx}>
                                            {step.type === 'code' ? (
                                                <TerminalBlock
                                                    title={step.title}
                                                    code={step.cmd || step.code || ''}
                                                />
                                            ) : (
                                                <div className="bg-secondary/5 p-6 rounded-2xl border border-white/5">
                                                    <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {step.code || step.cmd}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar (4 cols) */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-20 space-y-8">

                            {/* Actions Card */}
                            <div className="p-6 rounded-2xl bg-secondary/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">{t('sections.projectAccess')}</h3>
                                <div className="flex flex-col gap-3">
                                    {project.demoUrl && (
                                        <motion.a
                                            href={project.demoUrl === '#' ? undefined : project.demoUrl}
                                            target={project.demoUrl === '#' ? undefined : "_blank"}
                                            rel={project.demoUrl === '#' ? undefined : "noopener noreferrer"}
                                            className={cn(
                                                "flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all",
                                                project.demoUrl === '#'
                                                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 border border-white/5"
                                                    : "bg-foreground text-background hover:opacity-90 shadow-lg shadow-black/20"
                                            )}
                                            whileHover={project.demoUrl === '#' ? {} : { scale: 1.02 }}
                                            whileTap={project.demoUrl === '#' ? {} : { scale: 0.98 }}
                                        >
                                            <span>{t('sections.liveDemo')}</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </motion.a>
                                    )}
                                    {project.repoUrl && (
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm bg-secondary/10 hover:bg-secondary/20 text-foreground transition-all">
                                            <Github className="w-4 h-4" />
                                            <span>{t('sections.sourceCode')}</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Tech Stack Tags */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-white/5">{t('sections.technologies')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map(tech => (
                                        <div key={tech} className="px-3 py-1.5 bg-secondary/5 border border-white/5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/10 transition-colors cursor-default">
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Table of Contents (Functional) */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-white/5">{t('sections.contents')}</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground cursor-pointer transition-colors hover:translate-x-1 duration-200 block">• {t('sections.missionBrief')}</li>
                                    {project.features && <li onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground cursor-pointer transition-colors hover:translate-x-1 duration-200 block">• {t('sections.keyFeatures')}</li>}
                                    {project.challengesAndSolutions && <li onClick={() => document.getElementById('chronicles')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground cursor-pointer transition-colors hover:translate-x-1 duration-200 block">• {t('sections.engineeringChronicles')}</li>}
                                    {project.galleryImages && <li onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground cursor-pointer transition-colors hover:translate-x-1 duration-200 block">• {t('sections.visualGallery')}</li>}
                                    {project.installation && <li onClick={() => document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground cursor-pointer transition-colors hover:translate-x-1 duration-200 block">• {t('sections.installation')}</li>}
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* 5. FOOTER NAVIGATION (Back & More Projects) */}
            <div className="container max-w-7xl mx-auto px-6 mt-32 border-t border-border/40 pt-16">

                {/* Back Link Bottom */}
                <div className="mb-16">
                    <div
                        onClick={handleExit}
                        className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors group cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>{t('sections.backToProjects')}</span>
                    </div>
                </div>

                {/* MORE PROJECTS CAROUSEL */}
                <div className="relative group">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">{t('sections.moreProjects')}</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    if (scrollContainerRef.current) {
                                        scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth / 3, behavior: 'smooth' });
                                    }
                                }}
                                className="p-2 rounded-full border border-white/10 bg-secondary/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    if (scrollContainerRef.current) {
                                        scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth / 3, behavior: 'smooth' });
                                    }
                                }}
                                className="p-2 rounded-full border border-white/10 bg-secondary/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] -mx-6 px-6"
                    >
                        {otherProjects.map((p, i) => (
                            <Link
                                href={`/projects/${p.slug}`}
                                key={p.id}
                                className="flex-none w-[85vw] md:w-[calc(33.333%-1rem)] snap-center group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
                            >
                                {/* Background Layer */}
                                {p.image ? (
                                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <ProjectPlaceholder className="absolute inset-0" title="No Preview" />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end">
                                    <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium backdrop-blur-md",
                                            p.status === 'ongoing'
                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                                : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                        )}>
                                            {p.status === 'ongoing' ? 'In Progress' : 'Completed'}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-1">
                                        {p.techStack[0]} • {p.category || "Development"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

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
        </div>
    );
}
