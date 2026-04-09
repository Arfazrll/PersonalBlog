'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import { BlogCard } from '@/components/ui/BlogCard';
import { BentoHero } from '@/components/sections/blog/BentoHero';
import dynamic from 'next/dynamic';

const MarqueeClosing = dynamic(() => import('@/components/sections/blog/MarqueeClosing').then(m => m.MarqueeClosing), {
    ssr: false,
});
import { Search, SortDesc, SortAsc } from 'lucide-react';
import { cn } from '@/lib/utils';

import { usePerformance } from '@/hooks/usePerformance';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function BlogPage() {
    const t = useTranslations('blog');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
    const [isHoveringSort, setIsHoveringSort] = useState(false);
    const [isGridHovered, setIsGridHovered] = useState(false);
    const { isLowPowerMode } = usePerformance();
    const POSTS_PER_PAGE = 9;

    // DOM Refs for Zero-Lag Cursor Tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const gridRef = useRef<HTMLDivElement>(null);
    const categories = ['all', 'applied-ai', 'software-development', 'about-me', 'more'];

    const filteredPosts = portfolioData.blogs
        .filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'latest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
        });

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Reset pagination when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to grid top
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Cursor system: debounce-based scroll-end detection (handles trackpad inertia reliably)
    useEffect(() => {
        if (isLowPowerMode) return;

        let isScrolling = false;
        let scrollEndTimer: ReturnType<typeof setTimeout>;

        const handleMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current) return;
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            if (!isScrolling) {
                cursorRef.current.style.opacity = '1';
            }
        };

        const handleScroll = () => {
            if (!cursorRef.current) return;
            // Hide on first scroll frame
            if (!isScrolling) {
                isScrolling = true;
                cursorRef.current.style.opacity = '0';
            }
            // Reset the timer on EVERY scroll event (catches inertia frames)
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                isScrolling = false;
                // Cursor stays hidden — shows on next tiny mousemove
            }, 50);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollEndTimer);
        };
    }, [isLowPowerMode]);

    return (
        <main className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
            {/* SECTION 1: BentoHero */}
            <BentoHero isLowPowerMode={isLowPowerMode} />

            {/* SECTION 2: Blog Cards Content */}
            <div className="relative z-10 pt-12 pb-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background via-background/80 to-background dark:from-black dark:via-black dark:to-black">
                {/* Background Effects */}
                {!isLowPowerMode && (
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full opacity-40 dark:opacity-0 -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 blur-[200px] rounded-full opacity-30 dark:opacity-0 translate-y-1/2 -translate-x-1/2" />
                    </div>
                )}

                <div className="container mx-auto relative z-10">
                    {/* Header Section - Modern Editorial */}
                    <header className="mb-24 relative pt-20">
                        <div className="relative z-10 max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3 mb-10"
                            >
                                <div className="w-8 h-px bg-primary/60" />
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-0">The Digital Garden</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 text-foreground leading-[0.85]"
                            >
                                THOUGHTS & <br />
                                <span className="italic font-serif font-light opacity-30 text-foreground">Explorations</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-muted-foreground text-lg md:text-2xl leading-relaxed max-w-3xl font-medium"
                            >
                                Bridging technical complexity with practical implementation. A curated stream of insights on <span className="text-foreground/80">AI Agents</span>, <span className="text-foreground/80">Web3 Systems</span>, and <span className="text-foreground/80">Architecture</span>.
                            </motion.p>
                        </div>
                    </header>

                    {/* Filters & Search - Modern Minimalist Editorial */}
                    <div className="flex flex-col md:flex-row gap-10 mb-16 items-end justify-between border-b border-foreground/5 pb-8">
                        <div className="flex flex-wrap gap-x-12 gap-y-6">
                            {categories.map((cat) => {
                                const count = cat === 'all'
                                    ? portfolioData.blogs.length
                                    : portfolioData.blogs.filter(b => b.category === cat).length;

                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "group relative py-2 text-[15px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-start",
                                            selectedCategory === cat
                                                ? "text-primary opacity-100"
                                                : "text-muted-foreground/40 hover:text-foreground hover:opacity-100"
                                        )}
                                    >
                                        <span className="relative">
                                            {cat === 'all' ? 'All Publications' : t(`categories.${cat}`)}

                                            {/* Animated Underline Indicator */}
                                            {selectedCategory === cat && (
                                                <motion.div
                                                    layoutId="active-category"
                                                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary"
                                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                                />
                                            )}
                                        </span>

                                        {/* Dynamic Count Indicator */}
                                        <span
                                            className={cn(
                                                "ml-1 text-[13px] transition-all duration-300 font-bold",
                                                selectedCategory === cat
                                                    ? "text-primary opacity-100 translate-y-0"
                                                    : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-foreground/60"
                                            )}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                            {/* Sort Badge */}
                            <div className="relative group">
                                <AnimatePresence>
                                    {isHoveringSort && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                                            exit={{ opacity: 0, y: 5, x: '-50%' }}
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-[10px] font-bold tracking-widest rounded shadow-xl whitespace-nowrap pointer-events-none z-50 uppercase"
                                        >
                                            {sortBy}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    onClick={() => setSortBy(prev => prev === 'latest' ? 'oldest' : 'latest')}
                                    onMouseEnter={() => setIsHoveringSort(true)}
                                    onMouseLeave={() => setIsHoveringSort(false)}
                                    className={cn(
                                        "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500",
                                        "bg-foreground/5 hover:bg-foreground text-muted-foreground hover:text-background",
                                        "border border-foreground/10 hover:border-foreground shadow-sm hover:shadow-xl"
                                    )}
                                >
                                    {sortBy === 'latest' ? (
                                        <SortDesc size={20} strokeWidth={1.5} />
                                    ) : (
                                        <SortAsc size={20} strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>

                            <div className="relative flex-1 md:w-80 group">
                                <input
                                    type="text"
                                    placeholder="SEARCH ARCHIVE"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b border-foreground/10 focus:border-primary/60 outline-none py-3 text-[14px] font-bold tracking-[0.1em] text-foreground transition-all placeholder:text-muted-foreground/20 uppercase"
                                />
                                <div className="absolute right-0 bottom-3 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Search size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid Area */}
                    <div
                        ref={gridRef}
                        className="max-w-screen-2xl mx-auto pt-10 relative"
                        onMouseEnter={() => setIsGridHovered(true)}
                        onMouseLeave={() => setIsGridHovered(false)}
                    >
                        {/* Native Floating Cursor (Exclusion Blend Design) */}
                        <div
                            ref={cursorRef}
                            className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center mix-blend-exclusion"
                            style={{
                                visibility: isGridHovered ? 'visible' : 'hidden'
                            }}
                        >
                            <div className="flex flex-col items-center text-center -translate-x-1/2 -translate-y-1/2 leading-[1.1]">
                                <span className="text-[35px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
                                    Read
                                </span>
                                <span className="text-[35px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
                                    Detail
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <AnimatePresence mode="popLayout">
                                {paginatedPosts.map((post, idx) => (
                                    <BlogCard key={post.id} post={post} index={idx} isLowPowerMode={isLowPowerMode} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination - Modern Minimalist Editorial */}
                        {totalPages > 1 && (
                            <div className="mt-24 border-t border-foreground/5 pt-12 flex items-center justify-between">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="text-[18px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-foreground disabled:opacity-0 transition-all duration-300"
                                >
                                    PREV
                                </button>

                                <div className="flex items-center gap-8">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={cn(
                                                "relative py-1 text-[20px] font-bold transition-all duration-300",
                                                currentPage === page
                                                    ? "text-primary"
                                                    : "text-muted-foreground/40 hover:text-foreground"
                                            )}
                                        >
                                            {page.toString().padStart(2, '0')}
                                            {currentPage === page && (
                                                <motion.div
                                                    layoutId="active-page"
                                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="text-[18px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-foreground disabled:opacity-0 transition-all duration-300"
                                >
                                    NEXT
                                </button>
                            </div>
                        )}
                    </div>

                    {/* No Results */}
                    {filteredPosts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center"
                        >
                            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground opacity-50">
                                {t('noResults')}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="w-full h-20" />
            <ErrorBoundary fallback={<div className="h-40 bg-background" />}>
                <MarqueeClosing isLowPowerMode={isLowPowerMode} />
            </ErrorBoundary>
        </main>
    );
}
