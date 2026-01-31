'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, Filter, ExternalLink, Github, X, Calendar, ChevronRight, Layers, ArrowRight, ArrowUpRight, Sparkles, Code2, Zap } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Project } from '@/types';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { LogoTimeline, LogoItem } from '@/components/ui/logo-timeline';
import { Icons } from '@/components/icons';
import { Meteors } from '@/components/ui/meteors';

type FilterType = 'all' | 'ongoing' | 'completed';

// ========================================
// PROJECT LIST ITEM - Full-width flowing design
// ========================================
function ProjectListItem({
    project,
    onClick,
    index
}: {
    project: Project;
    onClick: () => void;
    index: number;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const isOngoing = project.status === 'ongoing';
    const displayIndex = String(index + 1).padStart(2, '0');

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const techText = project.techStack.join(' • ');

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            <motion.div
                className={cn(
                    "relative cursor-pointer overflow-hidden",
                    "border-b border-border/50 dark:border-white/5 transition-colors duration-500",
                    isHovered && "border-border dark:border-white/10"
                )}
                whileHover={{ backgroundColor: 'var(--color-muted)' }}
            >
                {/* Spotlight */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${isOngoing ? 'rgba(16, 185, 129, 0.06)' : 'rgba(59, 130, 246, 0.06)'}, transparent 40%)`
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 sm:gap-8 py-6 sm:py-10 px-4 sm:px-8">
                    {/* Index */}
                    <motion.span
                        className={cn(
                            "text-2xl sm:text-4xl md:text-5xl font-black tabular-nums transition-colors duration-500",
                            isHovered
                                ? (isOngoing ? "text-emerald-500 dark:text-emerald-400" : "text-blue-500 dark:text-blue-400")
                                : "text-muted-foreground/20"
                        )}
                        animate={{ scale: isHovered ? 1.1 : 1, x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {displayIndex}
                    </motion.span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <motion.h3
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground truncate"
                                animate={{ x: isHovered ? 8 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {project.title}
                            </motion.h3>
                            <span className={cn(
                                "shrink-0 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider",
                                isOngoing
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20"
                                    : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/20"
                            )}>
                                {isOngoing ? 'ongoing' : 'done'}
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base truncate max-w-2xl hidden sm:block">
                            {project.description}
                        </p>
                        <p className="text-muted-foreground text-xs line-clamp-1 sm:hidden">
                            {project.description}
                        </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        className="shrink-0 hidden sm:flex items-center gap-2"
                        animate={{ x: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">view</span>
                        <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                            <ArrowRight className={cn("w-5 h-5 transition-colors", isHovered ? (isOngoing ? "text-emerald-500 dark:text-emerald-400" : "text-blue-500 dark:text-blue-400") : "text-muted-foreground")} />
                        </motion.div>
                    </motion.div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground sm:hidden" />
                </div>

                {/* Tech Marquee on Hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden border-t border-border/50 dark:border-white/5"
                        >
                            <div className="relative py-3 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                                <motion.div
                                    className="flex whitespace-nowrap"
                                    animate={{ x: [0, -500] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                >
                                    {[...Array(4)].map((_, i) => (
                                        <span key={i} className={cn("mx-4 text-sm font-mono tracking-wider", isOngoing ? "text-emerald-600/60 dark:text-emerald-400/60" : "text-blue-600/60 dark:text-blue-400/60")}>
                                            {techText} •
                                        </span>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Floating Preview */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed pointer-events-none z-50 hidden lg:block"
                        style={{
                            left: mousePos.x + (itemRef.current?.getBoundingClientRect().left || 0) + 20,
                            top: mousePos.y + (itemRef.current?.getBoundingClientRect().top || 0) - 60,
                        }}
                    >
                        <div className={cn(
                            "w-48 h-32 rounded-xl overflow-hidden border backdrop-blur-sm",
                            isOngoing ? "border-emerald-500/30 bg-emerald-500/10" : "border-blue-500/30 bg-blue-500/10"
                        )}>
                            <div className="w-full h-full flex items-center justify-center">
                                <span className={cn("text-5xl font-black", isOngoing ? "text-emerald-400/40" : "text-blue-400/40")}>
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Featured Project Card - Hero style with particles, spotlight, 3D tilt
function FeaturedCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // 3D Tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const isOngoing = project.status === 'ongoing';

    return (
        <motion.article
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 group cursor-pointer perspective-1000"
            onClick={onClick}
        >
            <motion.div
                ref={cardRef}
                className="relative h-full min-h-[450px] sm:min-h-[550px] rounded-3xl overflow-hidden"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated Gradient Border */}
                <motion.div
                    className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                    style={{
                        background: isOngoing
                            ? 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6, #10b981)'
                            : 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                        backgroundSize: '300% 300%',
                    }}
                    animate={{ backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%' }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />

                {/* Main Card Body */}
                <div className="relative h-full bg-zinc-950/90 dark:bg-zinc-950/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/5">

                    {/* Spotlight Effect */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${isOngoing ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)'}, transparent 40%)`
                        }}
                    />

                    {/* Meteors on Hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-10 overflow-hidden"
                            >
                                <Meteors number={12} minDuration={3} maxDuration={8} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Orbs */}
                    <motion.div
                        className={cn(
                            "absolute w-40 h-40 rounded-full blur-[80px] z-0",
                            isOngoing ? "bg-emerald-500/30" : "bg-blue-500/30"
                        )}
                        style={{ top: '10%', right: '15%' }}
                        animate={{
                            scale: isHovered ? [1, 1.4, 1] : 1,
                            x: isHovered ? [0, 30, 0] : 0,
                            y: isHovered ? [0, -20, 0] : 0,
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute w-32 h-32 rounded-full bg-violet-500/20 blur-[60px] z-0"
                        style={{ bottom: '20%', left: '10%' }}
                        animate={{
                            scale: isHovered ? [1, 1.3, 1] : 1,
                            x: isHovered ? [0, -20, 0] : 0,
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                    />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-[0.015]" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Floating Initial Letter */}
                    <motion.div
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                        animate={{
                            scale: isHovered ? 1.15 : 1,
                            rotate: isHovered ? 8 : 0,
                            y: isHovered ? -10 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-[14rem] sm:text-[18rem] md:text-[22rem] font-black text-white/[0.015] select-none leading-none">
                            {project.title.charAt(0)}
                        </span>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-14 z-30">
                        {/* Sparkle Icon + Status */}
                        <motion.div
                            className="flex items-center gap-3 mb-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                animate={{ rotate: isHovered ? 360 : 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            >
                                <Sparkles className={cn("w-5 h-5", isOngoing ? "text-emerald-400" : "text-blue-400")} />
                            </motion.div>
                            <span className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md",
                                isOngoing
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                                    : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                            )}>
                                <span className={cn(
                                    "w-2 h-2 rounded-full",
                                    isOngoing ? "bg-emerald-400 animate-pulse" : "bg-blue-400"
                                )} />
                                {isOngoing ? 'In Development' : 'Completed'}
                            </span>
                        </motion.div>

                        {/* Title with underline effect */}
                        <motion.h2
                            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                            animate={{ x: isHovered ? 6 : 0 }}
                        >
                            {project.title}
                            <motion.div
                                className={cn(
                                    "absolute -bottom-1 left-0 h-1 rounded-full",
                                    isOngoing ? "bg-gradient-to-r from-emerald-400 to-cyan-400" : "bg-gradient-to-r from-blue-400 to-violet-400"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: isHovered ? '60%' : '0%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.h2>

                        {/* Description */}
                        <p className="text-zinc-400 text-base sm:text-lg md:text-xl mb-6 max-w-2xl line-clamp-2">
                            {project.description}
                        </p>

                        {/* Tech Stack with stagger */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.techStack.slice(0, 6).map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    className="px-3 py-1.5 rounded-xl text-sm font-medium bg-white/5 text-zinc-300 border border-white/10 backdrop-blur-sm"
                                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                            {project.techStack.length > 6 && (
                                <motion.span
                                    className={cn(
                                        "px-3 py-1.5 rounded-xl text-sm font-medium border backdrop-blur-sm",
                                        isOngoing
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                    )}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    +{project.techStack.length - 6} more
                                </motion.span>
                            )}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            className={cn(
                                "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300",
                                isOngoing
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                                    : "bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25"
                            )}
                            animate={{ x: isHovered ? 8 : 0 }}
                        >
                            <Zap className="w-4 h-4" />
                            <span>Explore Project</span>
                            <ArrowRight className={cn(
                                "w-5 h-5 transition-transform duration-300",
                                isHovered && "translate-x-2"
                            )} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.article>
    );
}

// Standard Project Card - with spotlight and 3D tilt
function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // 3D Tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const isOngoing = project.status === 'ongoing';

    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer perspective-1000"
            onClick={onClick}
        >
            <motion.div
                ref={cardRef}
                className="relative h-full min-h-[320px] sm:min-h-[380px] rounded-2xl overflow-hidden"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3 }}
            >
                {/* Gradient Border */}
                <motion.div
                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: isOngoing
                            ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                            : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    }}
                />

                {/* Card Body */}
                <div className="relative h-full bg-zinc-950/95 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">

                    {/* Spotlight */}
                    <div
                        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${isOngoing ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)'}, transparent 40%)`
                        }}
                    />

                    {/* Background Gradient */}
                    <div className={cn(
                        "absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30",
                        isOngoing
                            ? "bg-gradient-to-br from-emerald-600/40 via-teal-600/20 to-transparent"
                            : "bg-gradient-to-br from-blue-600/40 via-indigo-600/20 to-transparent"
                    )} />

                    {/* Floating Orb */}
                    <motion.div
                        className={cn(
                            "absolute w-24 h-24 rounded-full blur-[50px] z-0",
                            isOngoing ? "bg-emerald-500/25" : "bg-blue-500/25"
                        )}
                        style={{ top: '20%', right: '10%' }}
                        animate={{
                            scale: isHovered ? [1, 1.3, 1] : 1,
                            opacity: isHovered ? [0.3, 0.5, 0.3] : 0.2
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Initial Letter */}
                    <motion.div
                        className="absolute top-6 right-6 z-0"
                        animate={{
                            rotate: isHovered ? 12 : 0,
                            scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-7xl sm:text-8xl font-black text-white/[0.02]">
                            {project.title.charAt(0)}
                        </span>
                    </motion.div>

                    {/* Hover Arrow */}
                    <motion.div
                        className="absolute top-4 left-4 z-30"
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.5,
                            rotate: isHovered ? 0 : -45,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md",
                            isOngoing ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-blue-500/20 border border-blue-500/30"
                        )}>
                            <ArrowUpRight className={cn("w-5 h-5", isOngoing ? "text-emerald-400" : "text-blue-400")} />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-30">
                        {/* Status Badge */}
                        <div className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 backdrop-blur-sm",
                            isOngoing
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                : "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                        )}>
                            <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                isOngoing ? "bg-emerald-400 animate-pulse" : "bg-blue-400"
                            )} />
                            {project.status}
                        </div>

                        {/* Title */}
                        <motion.h3
                            className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-1"
                            animate={{ x: isHovered ? 4 : 0 }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 rounded-lg text-xs font-medium bg-white/5 text-zinc-400 border border-white/5"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 3 && (
                                <span className={cn(
                                    "px-2 py-1 rounded-lg text-xs font-medium",
                                    isOngoing ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                                )}>
                                    +{project.techStack.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.article>
    );
}

// Compact Card for additional projects
function CompactCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const isOngoing = project.status === 'ongoing';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group cursor-pointer"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative p-5 rounded-xl bg-zinc-900/50 border border-white/5 h-full backdrop-blur-sm overflow-hidden"
                whileHover={{ y: -4, scale: 1.02, borderColor: isOngoing ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)' }}
                transition={{ duration: 0.25 }}
            >
                {/* Subtle spotlight */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        opacity: isHovered ? 0.5 : 0,
                        background: `radial-gradient(200px circle at 50% 0%, ${isOngoing ? 'rgba(16, 185, 129, 0.08)' : 'rgba(59, 130, 246, 0.08)'}, transparent)`
                    }}
                />

                {/* Status Dot */}
                <motion.div
                    className={cn(
                        "absolute top-4 right-4 w-2 h-2 rounded-full z-10",
                        isOngoing ? "bg-emerald-400" : "bg-blue-400"
                    )}
                    animate={{ scale: isOngoing ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Title */}
                <motion.h4
                    className={cn(
                        "text-base font-semibold text-white mb-2 pr-6 line-clamp-1 transition-colors duration-300 z-10 relative",
                        isHovered && (isOngoing ? "text-emerald-400" : "text-blue-400")
                    )}
                >
                    {project.title}
                </motion.h4>

                {/* Description */}
                <p className="text-zinc-500 text-sm line-clamp-2 mb-3 z-10 relative">
                    {project.description}
                </p>

                {/* Tech Preview */}
                <div className="flex items-center gap-2 text-xs text-zinc-600 z-10 relative">
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{project.techStack.slice(0, 2).join(' • ')}</span>
                </div>
            </motion.div>
        </motion.article>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const t = useTranslations('projects');
    const isOngoing = project.status === 'ongoing';
    const [activeSection, setActiveSection] = useState<'overview' | 'tech' | 'highlights'>('overview');

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
                className="absolute inset-0 bg-background overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                    onClick={onClose}
                    className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-muted/80 hover:bg-muted border border-border backdrop-blur-sm transition-colors"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-sm font-medium text-muted-foreground">Close</span>
                    <X className="w-4 h-4" />
                </motion.button>

                {/* Split Screen Layout */}
                <div className="h-full flex flex-col lg:flex-row">

                    {/* LEFT - Giant Title Hero */}
                    <div className="lg:w-2/5 h-[35vh] lg:h-full relative flex items-end lg:items-center p-6 sm:p-8 lg:p-12 overflow-hidden">
                        {/* Dot Pattern */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }} />

                        {/* Accent Bar */}
                        <motion.div
                            className={cn("absolute left-0 top-0 w-1 h-full", isOngoing ? "bg-emerald-500" : "bg-blue-500")}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        />

                        <div className="relative z-10 w-full">
                            {/* Label */}
                            <motion.span
                                className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground mb-4 block"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Project
                            </motion.span>

                            {/* Stacked Title */}
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[0.9] tracking-tight mb-6"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {project.title.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </motion.h1>

                            {/* Status + Date */}
                            <motion.div
                                className="flex flex-wrap items-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                                    isOngoing ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                )}>
                                    <span className={cn("w-1.5 h-1.5 rounded-full", isOngoing ? "bg-emerald-500 animate-pulse" : "bg-blue-500")} />
                                    {project.status}
                                </span>
                                <span className="text-sm text-muted-foreground font-mono">
                                    {formatDate(project.startDate)} — {project.endDate ? formatDate(project.endDate) : 'Present'}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT - Tabbed Content */}
                    <div className="lg:w-3/5 flex-1 overflow-y-auto border-t lg:border-t-0 lg:border-l border-border">

                        {/* Tab Navigation */}
                        <motion.div
                            className="sticky top-0 z-20 flex items-center gap-1 p-4 bg-background/95 backdrop-blur-sm border-b border-border"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {(['overview', 'tech', 'highlights'] as const).map((section) => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        activeSection === section
                                            ? "bg-foreground text-background"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </motion.div>

                        {/* Tab Content */}
                        <div className="p-6 sm:p-8 lg:p-10">
                            <AnimatePresence mode="wait">
                                {activeSection === 'overview' && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">About</h2>
                                            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
                                                {project.longDescription || project.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <span className="text-3xl font-bold text-foreground">{project.techStack.length}</span>
                                                <p className="text-sm text-muted-foreground mt-1">Technologies</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <span className="text-3xl font-bold text-foreground">{project.tools.length}</span>
                                                <p className="text-sm text-muted-foreground mt-1">Tools</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 pt-4">
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                                    className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105",
                                                        isOngoing ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                                                    )}>
                                                    <span>{t('liveDemo')}</span>
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-transparent border-2 border-foreground/20 text-foreground hover:bg-muted transition-all hover:scale-105">
                                                    <Github className="w-4 h-4" />
                                                    <span>{t('sourceCode')}</span>
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
                                        className="space-y-10"
                                    >
                                        <div>
                                            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">Tech Stack</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {project.techStack.map((tech, i) => (
                                                    <motion.div
                                                        key={tech}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className={cn("px-5 py-3 rounded-xl text-base font-medium border-2 transition-all cursor-default hover:scale-105 hover:-translate-y-1",
                                                            isOngoing ? "border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10" : "border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10"
                                                        )}>
                                                        {tech}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">Tools & Platforms</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {project.tools.map((tool, i) => (
                                                    <motion.div
                                                        key={tool}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.2 + i * 0.05 }}
                                                        className="px-5 py-3 rounded-xl text-base font-medium border-2 border-violet-500/30 hover:border-violet-500 hover:bg-violet-500/10 transition-all cursor-default hover:scale-105 hover:-translate-y-1">
                                                        {tool}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === 'highlights' && (
                                    <motion.div
                                        key="highlights"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">Key Achievements</h2>
                                        {project.highlights && project.highlights.length > 0 ? (
                                            <div className="space-y-4">
                                                {project.highlights.map((highlight, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -30 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex gap-4 p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors group"
                                                    >
                                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-transform group-hover:scale-110",
                                                            isOngoing ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                                        )}>
                                                            {String(i + 1).padStart(2, '0')}
                                                        </div>
                                                        <p className="text-foreground/80 leading-relaxed pt-1">{highlight}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground italic">No highlights available.</p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation Dots */}
                <motion.div
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-muted/80 backdrop-blur-sm border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    {(['overview', 'tech', 'highlights'] as const).map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={cn("w-2 h-2 rounded-full transition-all",
                                activeSection === section
                                    ? (isOngoing ? "bg-emerald-500 w-6" : "bg-blue-500 w-6")
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            )}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}



// Helper to map string to icon key
const getIconKey = (name: string): keyof typeof Icons => {
    const lower = name.toLowerCase().replace('.', '').replace(/\s+/g, '');
    if (lower.includes('react')) return 'react';
    if (lower.includes('next')) return 'react';
    if (lower.includes('node')) return 'ts';
    if (lower.includes('typescript')) return 'ts';
    if (lower.includes('tailwind')) return 'tailwind';
    if (lower.includes('github')) return 'gitHub';
    if (lower.includes('git')) return 'gitHub';
    return (Object.keys(Icons).find(k => lower.includes(k.toLowerCase())) as keyof typeof Icons) || 'unknown';
};

export default function ProjectsPage() {
    const t = useTranslations('projects');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Sync URL -> State
    useEffect(() => {
        const projectId = searchParams.get('detail');
        if (projectId) {
            const project = portfolioData.projects.find(p => p.id === projectId);
            if (project) {
                setSelectedProject(project);
            }
        } else {
            setSelectedProject(null);
        }
    }, [searchParams]);

    const handleOpenProject = (project: Project) => {
        setSelectedProject(project);
        const params = new URLSearchParams(searchParams.toString());
        params.set('detail', project.id);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('detail');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const products = useMemo(() => {
        const techImages = [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531297424005-066e2c6ec9ce?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
        ];

        const baseProducts = portfolioData.projects.map((p, i) => ({
            title: p.title,
            link: p.repoUrl || p.demoUrl || '#',
            thumbnail: techImages[i % techImages.length]
        }));
        return [...baseProducts, ...baseProducts, ...baseProducts].slice(0, 8);
    }, []);

    // Generate Timeline Items - delay is calculated in component based on index
    const timelineItems: LogoItem[] = useMemo(() => {
        const tech = portfolioData.techStack.map(t => t.name);
        const tools = portfolioData.tools ? portfolioData.tools.map(t => t.name) : [];
        const allItems = [...tech, ...tools];

        // Distribute across 7 rows
        const rowCount = 7;

        return allItems.map((name, index) => {
            const row = (index % rowCount) + 1;
            const duration = 22 + (row * 2); // 24s, 26s, 28s, 30s, 32s, 34s, 36s - varied speeds

            return {
                label: name,
                icon: getIconKey(name),
                animationDelay: 0, // Calculated in component
                animationDuration: duration,
                row: row
            };
        });
    }, []);

    const filteredProjects = useMemo(() => {
        let projects = [...portfolioData.projects];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            projects = projects.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.techStack.some((t) => t.toLowerCase().includes(query)));
        }
        if (filter !== 'all') projects = projects.filter((p) => p.status === filter);
        return projects;
    }, [searchQuery, filter]);

    const filters: { key: FilterType; label: string }[] = [{ key: 'all', label: t('filters.all') }, { key: 'ongoing', label: t('filters.ongoing') }, { key: 'completed', label: t('filters.completed') }];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <HeroParallax products={products} />

            {/* Logo Timeline - Full Width */}
            <div className="relative w-full z-10 -mt-16 mb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <LogoTimeline
                        items={timelineItems}
                        title="Technologies & Tools"
                        height="h-[380px] md:h-[480px]"
                        iconSize={18}
                        className="w-full"
                    />
                </motion.div>
            </div>

            <div className="container-creative relative z-10 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
                {/* Search & Filter Section - Creative Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 sm:mb-12 md:mb-16"
                >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                                Projects Archive
                            </span>
                        </div>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-border to-transparent" />
                        <span className="text-xs font-mono text-muted-foreground/50">
                            [{String(filteredProjects.length).padStart(2, '0')}]
                        </span>
                    </div>

                    {/* Search Input - Creative Style */}
                    <div className="relative group mb-6">
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-card dark:bg-zinc-900/80 rounded-2xl border border-border dark:border-white/10 overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-focus-within:border-primary/50">
                            <Search className="absolute left-5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-5 py-4 sm:py-5 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm sm:text-base font-medium"
                            />
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Filter Tabs - Creative Style */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50 mr-2 hidden sm:inline">
                            Filter:
                        </span>
                        <div className="flex items-center p-1 bg-muted/30 dark:bg-zinc-900/50 rounded-xl border border-border/50 dark:border-white/5">
                            {filters.map((f) => (
                                <motion.button
                                    key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={cn(
                                        'relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300',
                                        filter === f.key
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Active Background */}
                                    {filter === f.key && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-foreground dark:bg-white rounded-lg"
                                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                        />
                                    )}
                                    <span className={cn(
                                        "relative z-10 transition-colors",
                                        filter === f.key && "text-background dark:text-zinc-950"
                                    )}>
                                        {f.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Results Count Badge */}
                        <motion.div
                            key={filteredProjects.length}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                        >
                            <span className="text-xs font-mono text-primary">
                                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Projects List Layout */}
                <div className="space-y-0 mb-8 sm:mb-10 md:mb-12 border-t border-white/5">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectListItem
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <Layers className="w-16 h-16 mx-auto text-white/20 mb-4" />
                        <p className="text-lg text-white/50">No projects found</p>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={handleCloseModal} />}</AnimatePresence>
        </div>
    );
}
