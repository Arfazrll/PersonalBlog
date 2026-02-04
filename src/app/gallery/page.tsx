'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import { Play, Maximize2, X, ChevronLeft, ChevronRight, ImageIcon, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GalleryPage() {
    const t = useTranslations('gallery');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [activeMedia, setActiveMedia] = useState<number | null>(null);

    const filteredMedia = portfolioData.gallery.filter(
        item => selectedFilter === 'all' || item.type === selectedFilter
    );

    const closeLightbox = () => setActiveMedia(null);
    const nextMedia = () => setActiveMedia(prev => (prev !== null ? (prev + 1) % filteredMedia.length : null));
    const prevMedia = () => setActiveMedia(prev => (prev !== null ? (prev - 1 + filteredMedia.length) % filteredMedia.length : null));

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-background overflow-hidden">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.02),transparent)]" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] dark:opacity-[0.02]" />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <header className="mb-20">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-primary font-black opacity-40">VISUAL_UNIT</span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-primary/60 font-black">ARCHIVE_v2</span>
                        </div>
                        <div className="h-[2px] w-24 bg-gradient-to-r from-primary/40 to-transparent" />
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase italic leading-[0.9] md:leading-[0.8] mb-8 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent transition-all">
                        {t('title')}
                    </h1>

                    <div className="max-w-2xl border-l border-primary/20 pl-8">
                        <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em] leading-loose opacity-70">
                            {t('subtitle')}
                        </p>
                    </div>
                </header>

                {/* Navigation / Filter */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {['all', 'image', 'video'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={cn(
                                "px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all rounded-none border-b-2",
                                selectedFilter === filter
                                    ? "border-primary text-primary bg-primary/10 dark:bg-primary/5"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/20 dark:hover:border-border/60"
                            )}
                        >
                            {t(`filter.${filter}`)}
                        </button>
                    ))}
                </div>

                {/* Media Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredMedia.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="relative group cursor-pointer break-inside-avoid rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all bg-secondary/10"
                                onClick={() => setActiveMedia(idx)}
                            >
                                <div className="relative overflow-hidden aspect-auto">
                                    <Image
                                        src={item.thumbnail || item.url}
                                        alt={item.title}
                                        width={800}
                                        height={600}
                                        className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon Overlay */}
                                    <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                                        {item.type === 'video' ? <Play className="w-4 h-4 text-white fill-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
                                    </div>

                                    {/* Info Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[10px] group-hover:translate-y-0">
                                        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-2">{item.category}</p>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest leading-tight">{item.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeMedia !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button onClick={closeLightbox} className="absolute top-8 right-8 p-3 bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 rounded-full transition-colors z-[110] border border-foreground/10 dark:border-white/10">
                            <X className="w-6 h-6 text-foreground dark:text-white" />
                        </button>

                        <button onClick={prevMedia} className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 rounded-full transition-colors z-[110] border border-foreground/10 dark:border-white/10 hidden md:block">
                            <ChevronLeft className="w-8 h-8 text-foreground dark:text-white" />
                        </button>

                        <button onClick={nextMedia} className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 rounded-full transition-colors z-[110] border border-foreground/10 dark:border-white/10 hidden md:block">
                            <ChevronRight className="w-8 h-8 text-foreground dark:text-white" />
                        </button>

                        <div className="relative w-full h-full max-w-6xl flex flex-col items-center justify-center">
                            <motion.div
                                key={filteredMedia[activeMedia].id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                {filteredMedia[activeMedia].type === 'video' ? (
                                    <iframe
                                        src={filteredMedia[activeMedia].url}
                                        className="w-full aspect-video rounded-2xl shadow-2xl"
                                        allow="autoplay"
                                    />
                                ) : (
                                    <Image
                                        src={filteredMedia[activeMedia].url}
                                        alt={filteredMedia[activeMedia].title}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                )}
                            </motion.div>

                            <div className="absolute bottom-0 w-full text-center pb-8 px-4">
                                <h4 className="text-lg md:text-xl font-black text-foreground dark:text-white uppercase tracking-widest mb-2">
                                    {filteredMedia[activeMedia].title}
                                </h4>
                                <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto font-medium line-clamp-2 md:line-clamp-none">
                                    {filteredMedia[activeMedia].description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
