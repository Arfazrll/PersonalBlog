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
                    {/* Header Section - Natural & Organic Design */}
                    <header className="mb-24 relative">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

                        <div className="relative z-10 max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary/5 border border-primary/10 text-primary/80 text-xs font-medium tracking-wide mb-8 backdrop-blur-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
                                The Digital Garden
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-foreground"
                            >
                                Thoughts & <span className="font-serif italic font-light text-muted-foreground">Explorations</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
                            >
                                Bridging technical complexity with practical implementation. A collection of insights on <span className="text-foreground">AI Agents</span>, <span className="text-foreground">Web3</span>, and modern <span className="text-foreground">Software Engineering</span>.
                            </motion.p>
                        </div>
                    </header>

                    {/* Filters & Search - Glassmorphism Style */}
                    <div className="flex flex-col md:flex-row gap-8 mb-20 items-start md:items-center justify-between sticky top-24 z-50 pointer-events-none">
                        {/* Wrapper to allow pointer events only on children */}
                        <div className="flex flex-wrap gap-2 pointer-events-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-5 py-2.5 text-sm font-medium transition-all rounded-full border backdrop-blur-md",
                                        selectedCategory === cat
                                            ? "bg-primary/10 text-primary border-primary/50 shadow-[0_0_15px_-5px_hsl(var(--primary))]"
                                            : "bg-background/40 hover:bg-background/60 text-muted-foreground border-border/40 hover:border-primary/20 hover:text-foreground"
                                    )}
                                >
                                    {cat === 'all' ? 'All Posts' : t(`categories.${cat}`)}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80 group pointer-events-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="relative w-full pl-12 pr-4 py-3 bg-background/50 backdrop-blur-md border border-border/40 focus:border-primary/30 outline-none rounded-2xl text-sm font-medium transition-all shadow-sm hover:shadow-md focus:shadow-lg hover:border-primary/20"
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
            <div className="w-full h-20" /> {/* Spacer for visual separation */}
            <MarqueeClosing />
        </main>
    );
}
