'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown, TrendingUp, FileText, Calendar, ArrowRight, Library, Code2, Bookmark } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';
import Image from 'next/image';
import { GalleryButton } from '@/components/ui/GalleryStack';
import type { Project } from '@/types';

export const BentoHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Auto carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredPosts = portfolioData.blogs.slice(0, 3); // 3 latest posts
    const recentPosts = portfolioData.blogs.slice(3, 6); // Next 3 for small cards
    const totalPosts = portfolioData.blogs.length;
    const categories = ['AI', 'Web3', 'Code', 'ML'];

    // Auto rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featuredPosts.length]);

    const currentPost = featuredPosts[currentSlide];

    return (
        <motion.div
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
            style={{ opacity, y }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/30 blur-[120px] rounded-full" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="bento-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#bento-grid)" />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-24 md:pb-32">
                {/* Header - Flex Layout with Gallery Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 min-h-[200px]"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                            Knowledge Hub
                        </span>
                    </div>

                    {/* BLOG + Gallery Button Container */}
                    <div className="relative flex items-start justify-between gap-8 mb-4">
                        {/* Left: BLOG Title */}
                        <div className="flex-1">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tight mb-1 pb-8 leading-[1.4] text-foreground">
                                Blog
                            </h1>
                            <p className="text-muted-foreground font-mono text-sm md:text-base max-w-2xl">
                                Insights on AI, Web3, development, and everything in between. {totalPosts}+ articles and counting.
                            </p>
                        </div>

                        {/* Right: Gallery Button - Absolutely positioned for precise alignment */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block absolute right-0 -top-4"
                            style={{
                                maxWidth: '300px',
                            }}
                        >
                            <GalleryButton
                                galleryImages={
                                    // Get 3 random gallery images from projects
                                    portfolioData.projects
                                        .flatMap((p: Project) => p.galleryImages || [])
                                        .filter(Boolean)
                                        .slice(0, 3)
                                }
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    {/* Featured Post Carousel - Large */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-8 md:row-span-2 group relative"
                    >
                        <Link
                            href={`/blog/${currentPost?.slug || '#'}`}
                            className="block h-full bg-gradient-to-br from-foreground/5 to-foreground/[0.02] border border-foreground/20 dark:border-foreground/10 rounded-2xl hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 relative"
                        >
                            {/* Featured Image */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 rounded-2xl overflow-hidden"
                                >
                                    {currentPost?.image ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={currentPost.image}
                                                alt={currentPost.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 66vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <span className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-mono uppercase tracking-wider rounded-full mb-4">
                                            {currentPost?.category || 'Featured'}
                                        </span>
                                        <h2 className="text-2xl md:text-4xl font-black uppercase mb-4 text-foreground group-hover:text-primary transition-colors">
                                            {currentPost?.title || 'Latest Post'}
                                        </h2>
                                        <p className="text-foreground/80 text-sm md:text-base line-clamp-2 mb-4">
                                            {currentPost?.excerpt || 'Discover the latest insights and trends...'}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-mono text-foreground/60">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {currentPost?.date || 'Recent'}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Carousel Dots Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[100] bg-background/80 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
                                {featuredPosts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentSlide(index);
                                        }}
                                        className={`rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'bg-foreground w-8 h-2.5'  // Active: 32x10px
                                            : 'bg-foreground/40 hover:bg-foreground/60 w-2.5 h-2.5'  // Inactive: 10x10px
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </Link>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col justify-between"
                    >
                        <div>
                            <TrendingUp className="w-8 h-8 text-primary mb-4" />
                            <div className="text-4xl md:text-5xl font-black mb-2">{totalPosts}+</div>
                            <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                Articles Published
                            </p>
                        </div>
                    </motion.div>

                    {/* Categories Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-4 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-foreground/10 rounded-2xl p-6"
                    >
                        <FileText className="w-6 h-6 text-foreground/60 mb-4" />
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                            Topics
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="px-3 py-1 bg-foreground/10 text-foreground/80 text-xs font-bold rounded-full"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Blog Features Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="md:col-span-4 group relative overflow-hidden"
                    >
                        <div className="block h-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-4">
                                        <Library className="w-4 h-4" />
                                        Series
                                    </span>
                                    <h3 className="text-xl font-black uppercase mb-2 group-hover:text-primary transition-colors">
                                        Learning Paths
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        Curated multi-part guides on complex technical topics.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="md:col-span-4 group relative overflow-hidden"
                    >
                        <div className="block h-full bg-foreground/5 border border-foreground/10 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-default">
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-foreground/5 blur-[40px] rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                                        <Code2 className="w-4 h-4 text-primary" />
                                        Code Snippets
                                    </span>
                                    <h3 className="text-xl font-black uppercase mb-2 group-hover:text-primary transition-colors">
                                        Quick Bytes
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        Reusable solutions for common development challenges.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="md:col-span-4 group relative overflow-hidden"
                    >
                        <div className="block h-full bg-gradient-to-br from-secondary/10 to-secondary/5 border border-foreground/10 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-default">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                                        <Bookmark className="w-4 h-4 text-green-500" />
                                        Resources
                                    </span>
                                    <h3 className="text-xl font-black uppercase mb-2 group-hover:text-primary transition-colors">
                                        My Toolkit
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        Essential libraries, tools, and reading materials I use daily.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - Moved Lower */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        Explore All
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-5 h-5 text-primary" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </motion.div>
    );
};
