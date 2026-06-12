"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { Book } from "@/components/ui/book";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
    'applied-ai': '#9D2127', // Deep Red
    'software-development': '#7DC1C1', // Teal
    'more': '#FED954', // Yellow
};


export default function StatsSection({ scrollYProgress, showOnly }: { scrollYProgress?: any, showOnly?: 'top' | 'bottom' }) {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const blogs = portfolioData.blogs.slice(0, 6);
    const visibleCount = 3;

    useEffect(() => {
        const galleryImages = [
            { src: '/gallery/Foto Utama.jpeg', alt: 'Foto Utama' },
            { src: '/gallery/FotoSC1.jpeg', alt: 'Foto SC1' },
            { src: '/gallery/FotoSC2.jpeg', alt: 'Foto SC2' },
            { src: '/gallery/FotoSC3.jpeg', alt: 'Foto SC3' },
            { src: '/gallery/FotoSC4.jpeg', alt: 'Foto SC4' },
            { src: '/gallery/FotoSC5.jpeg', alt: 'Foto SC5' },
            { src: '/gallery/academicaffairsdivision1.jpg', alt: 'Academic Affairs' },
            { src: '/gallery/computernetworkpracticumassistant2.jpg', alt: 'Computer Network' },
            { src: '/gallery/dataentryassistant1.jpg', alt: 'Data Entry' },
            { src: '/gallery/delegateaiesecfutureleaders20241.jpg', alt: 'AIESEC' },
            { src: '/gallery/environmentalhygieneteam1.jpg', alt: 'Hygiene Team 1' },
            { src: '/gallery/environmentalhygieneteam2.jpg', alt: 'Hygiene Team 2' },
            { src: '/gallery/logisticsoperatorcampusexpo20242.jpg', alt: 'Logistics' },
            { src: '/gallery/researchassistant1.jpg', alt: 'Research Assistant 1' },
            { src: '/gallery/researchassistant2.jpg', alt: 'Research Assistant 2' },
        ];
        // Shuffle images randomly
        const shuffledImages = [...galleryImages].sort(() => 0.5 - Math.random());
        setImages(shuffledImages);
        setLoading(false);
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    };

    // Helper to get visible blogs in an infinite way
    const getVisibleBlogs = () => {
        const result = [];
        for (let i = 0; i < visibleCount; i++) {
            result.push(blogs[(currentIndex + i) % blogs.length]);
        }
        return result;
    };

    if (loading || images.length === 0) return (
        <div className="h-[400px] w-full flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    return (
        <section className="relative bg-background overflow-visible flex flex-col items-center transition-colors duration-500">
            {/* Header for the Gallery Section */}
            {(showOnly === 'top' || !showOnly) && (
                <>
                    <div className="max-w-6xl mx-auto px-6 w-full pt-32 pb-16 text-center space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
                        >
                            Journal & Insights
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground/80 text-lg md:text-xl font-medium max-w-2xl mx-auto"
                        >
                            A curated collection of technical articles, engineering blueprints, and reflections on building intelligent systems.
                        </motion.p>
                    </div>

                    {/* Immersive Zoom Parallax Component */}
                    <div className="w-full">
                        <ZoomParallax images={images}>
                            <Link 
                                href="/gallery" 
                                className="group flex items-center gap-3 px-6 py-3.5 bg-foreground text-background rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl border border-border/10"
                            >
                                View Gallery
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </ZoomParallax>
                    </div>
                </>
            )}

            {/* Book Showcase Integration */}
            {(showOnly === 'bottom' || !showOnly) && (
                <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-16 pb-32 space-y-16 relative">
                    <div className="flex items-center justify-between border-b border-border/50 pb-8">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                Latest Stories
                            </h3>
                            <p className="text-muted-foreground/60 font-medium uppercase tracking-widest text-xs">Articles • Insights • Technical Deep Dives</p>
                        </div>
                        <Link href="/blog" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors group">
                            Browse Full Archive
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>

                    <div className="relative group/slider flex items-center justify-center">
                        {/* Navigation Buttons - Positioned relatively to the container */}
                        <div className="absolute left-0 top-[35%] -translate-y-1/2 z-30 hidden lg:block">
                            <button
                                onClick={prevSlide}
                                className="p-4 rounded-full bg-muted/10 border border-border/50 text-foreground transition-all hover:bg-muted/20 hover:scale-110 active:scale-95"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="absolute right-0 top-[35%] -translate-y-1/2 z-30 hidden lg:block">
                            <button
                                onClick={nextSlide}
                                className="p-4 rounded-full bg-muted/10 border border-border/50 text-foreground transition-all hover:bg-muted/20 hover:scale-110 active:scale-95"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="absolute inset-x-0 top-[35%] -translate-y-1/2 z-30 flex justify-between px-2 lg:hidden">
                            <button
                                onClick={prevSlide}
                                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-visible w-full lg:max-w-[1400px] mx-auto px-4 md:px-12">
                            <div className="flex gap-8 md:gap-24 justify-center pt-12 pb-32 min-h-[600px] items-start relative">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {getVisibleBlogs().map((blog, index) => (
                                        <motion.div
                                            key={blog.id}
                                            layout
                                            initial={{ opacity: 0, x: direction * 50, scale: 0.9, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, x: direction * -50, scale: 0.9, filter: "blur(10px)" }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 26,
                                            }}
                                            className="group relative w-[200px] md:w-[260px] flex-shrink-0"
                                        >
                                            <Link href={`/blog/${blog.slug}`} className="block relative z-10 group/book">
                                                {/* Glow Effect - Inside Link for better hover detection */}
                                                <div
                                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] aspect-square -z-10 blur-[80px] opacity-0 group-hover/book:opacity-70 group-hover/book:scale-110 transition-all duration-700 rounded-full pointer-events-none"
                                                    style={{
                                                        background: `radial-gradient(circle, ${CATEGORY_COLORS[blog.category]} 0%, transparent 70%)`,
                                                    }}
                                                />

                                                <Book
                                                    title={blog.title}
                                                    color={CATEGORY_COLORS[blog.category] || '#222222'}
                                                    textColor={
                                                        (index % 2 !== 0 && blog.category === 'applied-ai')
                                                            ? '#FFFFFF'
                                                            : 'var(--ds-gray-1000)'
                                                    }
                                                    variant={index % 2 === 0 ? 'stripe' : 'simple'}
                                                    textured
                                                    width={{ sm: 160, md: 220, lg: 260 }}
                                                />

                                                <div className="mt-8 space-y-3 opacity-0 group-hover/book:opacity-100 transition-all duration-500 translate-y-4 group-hover/book:translate-y-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-muted/20 border border-border/50 text-foreground/60">
                                                            {blog.category.replace(/-/g, ' ')}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">
                                                            {new Date(blog.date).getFullYear()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 font-medium leading-relaxed">
                                                        {blog.excerpt}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center md:hidden pt-8">
                        <Link href="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors group">
                            Browse Full Archive
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}
