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
            <div className="relative z-10 pt-12 pb-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background via-background/80 to-background">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full opacity-40 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 blur-[200px] rounded-full opacity-30 translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                </div>

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

                    {/* Filters & Search - Editorial Style */}
                    <div className="flex flex-col md:flex-row gap-10 mb-24 items-start md:items-center justify-between">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full border-2",
                                        selectedCategory === cat
                                            ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                            : "bg-muted/50 border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                                    )}
                                >
                                    {cat === 'all' ? 'All Publications' : t(`categories.${cat}`)}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVE"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-8 py-4 bg-muted/50 border-2 border-foreground/10 focus:border-primary/40 outline-none rounded-2xl text-[11px] font-bold tracking-widest text-foreground transition-all placeholder:text-muted-foreground/30 uppercase"
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
