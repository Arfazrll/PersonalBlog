'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown, TrendingUp, Sparkles, Calendar, ArrowUpRight, Library, Code2, Bookmark } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';
import Image from 'next/image';
import { GalleryButton } from '@/components/ui/GalleryStack';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { getAllGalleryImages } from '@/app/actions/getGalleryImages';

export const BentoHero = ({ isLowPowerMode }: { isLowPowerMode?: boolean }) => {
    const t = useTranslations('blog');
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Mouse Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || isLowPowerMode) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const spotlightBackground = useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(var(--primary-rgb), ${isDark ? '0.1' : '0.05'}), transparent 80%)`;

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredPosts = portfolioData.blogs.slice(0, 3);
    const totalPosts = portfolioData.blogs.length;
    // Dynamic Categories with Counts
    const categoryStats = Array.from(new Set(portfolioData.blogs.map(blog => blog.category)))
        .slice(0, 4)
        .map(cat => ({
            name: cat,
            count: portfolioData.blogs.filter(b => b.category === cat).length
        }));

    // Random Gallery Images
    const [randomGalleryImages, setRandomGalleryImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const images = await getAllGalleryImages();
            if (images && images.length > 0) {
                // Shuffle and pick 5
                const shuffled = [...images].sort(() => 0.5 - Math.random());
                setRandomGalleryImages(shuffled.slice(0, 5).map(img => img.src));
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [featuredPosts.length]);

    const currentPost = featuredPosts[currentSlide];

    return (
        <motion.section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden bg-background dark:bg-black flex flex-col"
            style={isLowPowerMode ? { opacity: 1, y: 0 } : { opacity, y }}
        >
            {/* Ambient Background - Hidden in Low Power Mode */}
            {!isLowPowerMode && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 blur-[200px] rounded-full opacity-40 dark:opacity-0 translate-x-1/4 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 blur-[180px] rounded-full opacity-30 dark:opacity-0 -translate-x-1/4 translate-y-1/4" />
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] dark:opacity-0 mix-blend-overlay" />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 pt-44 pb-20 flex-grow flex flex-col">

                {/* Section Title & Gallery Access */}
                <div className="flex flex-col items-center justify-center text-center mb-20 w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-foreground leading-tight tracking-[-0.04em] uppercase whitespace-nowrap"
                    >
                        FEATURE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/20">Gallery</span>
                    </motion.h1>
                </div>

                {/* Main Bento Grid Spread */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">

                    {/* Hero Spotlight Card */}
                    <motion.div 
                        whileHover={{ y: -8, scale: 1.005 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-card border-2 border-foreground/15 dark:border-white/10 hover:border-primary/40 transition-shadow duration-700 shadow-sm hover:shadow-2xl hover:shadow-primary/10 dark:shadow-none"
                    >
                        {/* Persistent Background to prevent flickering */}
                        <div className="absolute inset-0 bg-muted" />

                        <AnimatePresence initial={false}>
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="absolute inset-0 z-0"
                            >
                                <Image
                                    src={currentPost.image}
                                    alt={currentPost.title}
                                    fill
                                    className="object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Card Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-10 lg:p-16">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={isLowPowerMode ? { opacity: 0 } : { opacity: 0, y: 20 }}
                                    animate={isLowPowerMode ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                    exit={isLowPowerMode ? { opacity: 0 } : { opacity: 0, y: -20 }}
                                    className="max-w-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full">
                                            Featured
                                        </span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            {currentPost.category}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
                                        <Link href={`/blog/${currentPost.slug}`} className="hover:text-primary transition-colors">
                                            {currentPost.title}
                                        </Link>
                                    </h2>
                                    <div className="flex items-center gap-8">
                                        <Link
                                            href={`/blog/${currentPost.slug}`}
                                            className="flex items-center gap-3 text-xs font-black text-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]"
                                        >
                                            Explore Story <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                        <div className="flex gap-2">
                                            {featuredPosts.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "h-1 transition-all duration-500 rounded-full",
                                                        currentSlide === i ? "w-8 bg-primary" : "w-2 bg-foreground/20"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Side Info Cards */}
                    <div className="lg:col-span-4 grid grid-cols-1 gap-2">

                        {/* Gallery Quick Access - Relocated */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="h-full min-h-[300px]"
                        >
                            <GalleryButton
                                galleryImages={randomGalleryImages.length > 0
                                    ? randomGalleryImages
                                    : portfolioData.gallery
                                        .map(item => item.type === 'video' ? item.thumbnail : item.url)
                                        .filter((url): url is string => !!url)
                                        .slice(0, 5)}
                            />
                        </motion.div>

                        {/* Stats & Trends Card */}
                        <motion.div 
                            whileHover={{ y: -8 }}
                            className="rounded-[2.5rem] bg-card border-2 border-foreground/15 dark:border-white/5 p-8 flex flex-col justify-between hover:bg-muted/50 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative shadow-sm dark:shadow-none"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <TrendingUp className="w-10 h-10 text-primary mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                                <div className="text-6xl font-black text-foreground tracking-tighter mb-2">{totalPosts}+</div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em]">Articles Published</p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                                {categoryStats.map((cat) => (
                                    <span key={cat.name} className="px-3 py-1 bg-muted border border-border rounded-lg text-[9px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                                        {cat.name.replace(/-/g, ' ').replace(/development/i, 'dev')}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Informational Footer Context */}
                <div className="mt-14 flex flex-col items-center justify-center py-10 border-t border-border/50">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-[10px] md:text-xs font-medium text-muted-foreground/60 max-w-5xl text-center leading-relaxed tracking-wider uppercase"
                    >
                        This archive serves as a living documentation of technical blueprints, architectural patterns, and engineering reflections. 
                        All content is licensed under Creative Commons for educational use, bridging the gap between theory and implementation. 
                        Interactive gallery items represent curated milestones of the engineering journey. © 2026 Arfazrll.
                    </motion.p>
                </div>

            </div>

            {/* Ambient Spotlight Glow (Mouse-Reactive) - Hidden in Low Power Mode */}
            {!isLowPowerMode && (
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    style={{ background: spotlightBackground }}
                />
            )}
        </motion.section>
    );
};
