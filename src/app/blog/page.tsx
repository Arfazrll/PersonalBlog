'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import { BlogCard } from '@/components/ui/BlogCard';
import { BentoHero } from '@/components/sections/blog/BentoHero';
import { MarqueeClosing } from '@/components/sections/blog/MarqueeClosing';
import { Search, Filter, Grid3X3, List, ImageIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BlogPage() {
    const t = useTranslations('blog');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'ai', 'web3', 'coding', 'other'];

    const filteredPosts = portfolioData.blogs.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
            {/* SECTION 1: BentoHero */}
            <BentoHero />

            {/* SECTION 2: Blog Cards Content */}
            <div className="relative z-10 pt-12 pb-24 px-6 md:px-12 lg:px-24">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 dark:bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay" />
                </div>

                <div className="container mx-auto relative z-10">
                    {/* Header Section */}
                    <header className="mb-20">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-primary font-black opacity-40">INDEX_BLOG</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-primary/60 font-black">FILES_v1.0</span>
                            </div>
                            <div className="h-[2px] w-24 bg-gradient-to-r from-primary/40 to-transparent" />
                        </div>

                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase italic leading-[0.9] md:leading-[0.8] mb-8 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent transition-all">
                            {t('title')}
                        </h1>

                        <div className="max-w-2xl border-l-2 border-primary/10 pl-8 py-4 bg-secondary/5 backdrop-blur-sm">
                            <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.15em] leading-relaxed opacity-80">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Gallery Navigator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 flex justify-center md:justify-end"
                        >
                        </motion.div>
                    </header>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row gap-6 mb-16 items-start md:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full border",
                                        selectedCategory === cat
                                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                            : "bg-foreground/[0.03] dark:bg-secondary/10 text-muted-foreground border-foreground/10 dark:border-border/40 hover:border-primary/40"
                                    )}
                                >
                                    {t(`categories.${cat}`)}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-foreground/[0.03] dark:bg-secondary/10 border border-foreground/10 dark:border-border/40 focus:border-primary/40 outline-none rounded-xl text-sm font-medium transition-all"
                            />
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, idx) => (
                                <BlogCard key={post.id} post={post} index={idx} />
                            ))}
                        </AnimatePresence>
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

            {/* SECTION 3: MarqueeClosing */}
            <MarqueeClosing />
        </main>
    );
}
