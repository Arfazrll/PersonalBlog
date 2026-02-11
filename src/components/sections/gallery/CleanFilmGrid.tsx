"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { X, Play, Maximize2, ChevronLeft, ChevronRight, Minimize2, ListFilter, ArrowDownUp, ImageIcon, Video, ArrowRight, LayoutGrid, StretchHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = 'all' | 'image' | 'video';
type SortType = 'newest' | 'oldest';

export default function CleanFilmGrid() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('all');
    const [sort, setSort] = useState<SortType>('newest');
    const [viewMode, setViewMode] = useState<'rows' | 'grid'>('rows');
    const [isLightboxMaximized, setIsLightboxMaximized] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12); // Start with 12 items

    // Initial Data
    const allItems = portfolioData.gallery;

    // Grouping Logic
    const groupedItems = useMemo(() => {
        let items = [...allItems];

        // 1. Filter
        if (filter !== 'all') {
            items = items.filter(item => item.type === filter);
        }

        // 2. Sort (within categories later, but good to sort base list)
        items.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sort === 'newest' ? dateB - dateA : dateA - dateB;
        });

        // 3. Group
        const groups: Record<string, typeof items> = {};
        items.forEach(item => {
            const category = item.category || 'Uncategorized';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
        });

        return groups;
    }, [filter, sort, allItems]);

    // Categories List for Index
    const categories = Object.keys(groupedItems).sort();

    // Derived States for Lightbox
    const flattenedFilteredItems = useMemo(() => {
        return categories.flatMap(cat => groupedItems[cat]);
    }, [categories, groupedItems]);

    // Reset visible count when filter changes
    useEffect(() => {
        setVisibleCount(12);
    }, [filter]);

    const visibleItems = useMemo(() => {
        if (viewMode === 'rows') return []; // Not used in rows mode
        return flattenedFilteredItems.slice(0, visibleCount);
    }, [flattenedFilteredItems, visibleCount, viewMode]);

    const currentIndex = flattenedFilteredItems.findIndex(item => item.id === selectedId);

    // Lightbox Controls
    const openLightbox = (id: string) => {
        setSelectedId(id);
        setIsLightboxMaximized(false);
    }
    const closeLightbox = () => setSelectedId(null);
    const toggleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLightboxMaximized(prev => !prev);
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const next = (currentIndex + 1) % flattenedFilteredItems.length;
        setSelectedId(flattenedFilteredItems[next].id);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const prev = (currentIndex - 1 + flattenedFilteredItems.length) % flattenedFilteredItems.length;
        setSelectedId(flattenedFilteredItems[prev].id);
    };

    // Scroll to Category
    const scrollToCategory = (category: string) => {
        const element = document.getElementById(`category-${category}`);
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - 100; // Offset for header
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Horizontal Scroll Handler
    const scrollContainerRef = useRef<Record<string, HTMLDivElement | null>>({});
    const scrollHorizontal = (category: string, direction: 'left' | 'right') => {
        const container = scrollContainerRef.current[category];
        if (container) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    return (
        <section className="relative py-24 px-6 md:px-16 lg:px-24 bg-background min-h-screen">

            {/* Header & Controls */}
            <div className="max-w-[1920px] mx-auto mb-12 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-neutral-500 dark:border-white/20 pb-6 gap-6">

                {/* Title */}
                <div className="flex-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                        Exhibition Space
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                        Selected Works
                    </h2>
                </div>

                {/* Controls Area */}
                <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto">

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-neutral-300 dark:border-white/10">
                        {(['all', 'image', 'video'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all",
                                    filter === f
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                )}
                            >
                                {f === 'all' ? 'All' : f === 'image' ? 'Photos' : 'Videos'}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-neutral-500 dark:bg-white/20 hidden md:block" />

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-neutral-300 dark:border-white/10">
                        <button
                            onClick={() => setViewMode('rows')}
                            className={cn(
                                "p-2 rounded-full transition-all",
                                viewMode === 'rows'
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                            )}
                            title="Rows View"
                        >
                            <StretchHorizontal className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-full transition-all",
                                viewMode === 'grid'
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                            )}
                            title="Grid View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-neutral-500 dark:bg-white/20 hidden md:block" />

                    {/* Sort */}
                    <button
                        onClick={() => setSort(prev => prev === 'newest' ? 'oldest' : 'newest')}
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowDownUp className="w-3 h-3 group-hover:text-primary transition-colors" />
                        <span>{sort}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto gap-8">

                {/* Quick Index (Sticky Sidebar) - Only visible in Rows mode */}
                {viewMode === 'rows' && (
                    <div className="hidden lg:block w-48 shrink-0 sticky top-32 h-fit">
                        <div className="border-l border-neutral-500 dark:border-white/20 pl-6 py-2">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                                <ListFilter className="w-3 h-3" />
                                Collections
                            </h3>
                            <div className="flex flex-col gap-3">
                                {categories.map((category, idx) => (
                                    <button
                                        key={category}
                                        onClick={() => scrollToCategory(category)}
                                        className="text-left text-sm text-foreground/60 hover:text-primary hover:pl-2 transition-all duration-300 capitalize"
                                    >
                                        <span className="font-mono text-[10px] opacity-40 mr-2">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 min-w-0 space-y-16">

                    {/* Rows View */}
                    {viewMode === 'rows' && categories.map((category) => (
                        <div key={category} id={`category-${category}`} className="relative group/section">

                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-6 px-1">
                                <h3 className="text-xl md:text-2xl font-serif text-foreground capitalize flex items-center gap-3">
                                    {category}
                                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                        {groupedItems[category].length}
                                    </span>
                                </h3>

                                {/* Scroll Controls (Visible on hover) */}
                                <div className="hidden md:flex items-center gap-2 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => scrollHorizontal(category, 'left')}
                                        className="p-2 rounded-full border border-border/40 hover:bg-foreground/5 hover:border-foreground/20 transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => scrollHorizontal(category, 'right')}
                                        className="p-2 rounded-full border border-border/40 hover:bg-foreground/5 hover:border-foreground/20 transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Horizontal Scroll Container */}
                            <div
                                className="relative group/slider"
                            >
                                <div
                                    ref={el => {
                                        scrollContainerRef.current[category] = el;
                                    }}
                                    className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-1"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {groupedItems[category].map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "0px -50px 0px 0px" }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="relative flex-none w-[85vw] md:w-[400px] aspect-video snap-center group/card cursor-pointer"
                                            onClick={() => openLightbox(item.id)}
                                        >
                                            <div className="relative w-full h-full overflow-hidden rounded-sm bg-muted">
                                                <Image
                                                    src={item.thumbnail || item.url}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />

                                                {/* Type Badge */}
                                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono uppercase text-white tracking-wider flex items-center gap-1 z-10">
                                                    {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                                    <span>{item.type}</span>
                                                </div>

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full"
                                                    >
                                                        {item.type === 'video' ? (
                                                            <Play className="w-6 h-6 text-white fill-current" />
                                                        ) : (
                                                            <Maximize2 className="w-6 h-6 text-white" />
                                                        )}
                                                    </motion.div>
                                                </div>

                                                {/* Gradient Bottom for Text readability */}
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity duration-300" />
                                            </div>

                                            {/* Info overlay (Netflix style - bottom left) */}
                                            <div className="absolute bottom-4 left-4 right-4 z-20 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                                                <h4 className="text-white text-lg font-medium leading-tight truncate drop-shadow-md">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center justify-between mt-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-75">
                                                    <span className="text-xs text-white/80 font-mono">
                                                        {item.date}
                                                    </span>
                                                    <span className="text-[10px] text-white/60 uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded-full">
                                                        View
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Grid View */}
                    {viewMode === 'grid' && (
                        <div className="space-y-12">
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {visibleItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="relative group break-inside-avoid cursor-pointer p-3 rounded-xl border border-neutral-400 dark:border-transparent bg-muted/20 dark:bg-transparent transition-all hover:shadow-md"
                                        onClick={() => openLightbox(item.id)}
                                    >
                                        <div className="relative overflow-hidden bg-muted aspect-auto rounded-lg">
                                            <Image
                                                src={item.thumbnail || item.url}
                                                alt={item.title}
                                                width={800}
                                                height={600}
                                                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Type Badge */}
                                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono uppercase text-white tracking-wider flex items-center gap-1 z-10">
                                                {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                                <span>{item.type}</span>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    {item.type === 'video' ? (
                                                        <Play className="w-5 h-5 text-white fill-current" />
                                                    ) : (
                                                        <Maximize2 className="w-5 h-5 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-between items-start">
                                            <div>
                                                <h3 className="text-sm font-medium uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground font-mono mt-1">
                                                    {item.category}
                                                </p>
                                            </div>
                                            <span className="text-xs font-mono text-muted-foreground opacity-50">
                                                {item.date}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {visibleCount < flattenedFilteredItems.length && (
                                <div className="flex justify-center pt-8">
                                    <button
                                        onClick={() => setVisibleCount(prev => prev + 12)}
                                        className="group flex flex-col items-center gap-2"
                                    >
                                        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                                            Load More Archives
                                        </span>
                                        <div className="w-12 h-12 rounded-full border border-neutral-500 dark:border-white/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                                            <ArrowDownUp className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {categories.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-muted-foreground font-mono">No items found matching filter.</p>
                        </div>
                    )}
                </div>

            </div>

            {/* Advanced Lightbox */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                            "fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300",
                            isLightboxMaximized ? "bg-black" : ""
                        )}
                        onClick={closeLightbox}
                    >
                        {/* Toolbar */}
                        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[110]" onClick={(e) => e.stopPropagation()}>
                            {/* Counter / Title */}
                            <div className="text-sm font-mono text-foreground/70">
                                {currentIndex + 1} / {flattenedFilteredItems.length}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleMaximize}
                                    className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors group"
                                    title={isLightboxMaximized ? "Minimize" : "Maximize"}
                                >
                                    {isLightboxMaximized ? (
                                        <Minimize2 className="w-5 h-5 text-foreground" />
                                    ) : (
                                        <Maximize2 className="w-5 h-5 text-foreground" />
                                    )}
                                </button>
                                <button
                                    onClick={closeLightbox}
                                    className="p-3 bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 border border-white/20 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all z-[110] hidden md:block group backdrop-blur-sm">
                            <ChevronLeft className="w-8 h-8 transition-colors" />
                        </button>

                        <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 border border-white/20 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all z-[110] hidden md:block group backdrop-blur-sm">
                            <ChevronRight className="w-8 h-8 transition-colors" />
                        </button>


                        {/* Content Container */}
                        <motion.div
                            layout
                            className={cn(
                                "relative w-full transition-all duration-500",
                                isLightboxMaximized
                                    ? "h-screen w-screen px-0 py-0"
                                    : "max-w-5xl px-6 h-[70vh] aspect-video"
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={cn(
                                "relative w-full h-full overflow-hidden shadow-2xl bg-black flex items-center justify-center",
                                isLightboxMaximized ? "rounded-none" : "rounded-sm"
                            )}>
                                {flattenedFilteredItems[currentIndex].type === 'video' ? (
                                    <iframe
                                        src={`${flattenedFilteredItems[currentIndex].url}${flattenedFilteredItems[currentIndex].url.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
                                        className="w-full h-full"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={flattenedFilteredItems[currentIndex].url}
                                            alt={flattenedFilteredItems[currentIndex].title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Caption (Hide if maximized) */}
                        {!isLightboxMaximized && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 text-center max-w-2xl px-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-2xl font-serif text-foreground mb-2">
                                    {flattenedFilteredItems[currentIndex].title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {flattenedFilteredItems[currentIndex].description}
                                </p>
                            </motion.div>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
