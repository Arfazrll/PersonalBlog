'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';

const INITIAL_BATCH = 12;
const LOAD_MORE_BATCH = 8;

export default function BlogPage() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
    const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(
        () => ['all', ...Array.from(new Set(portfolioData.blogs.map((post) => post.category)))],
        [],
    );

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setSearchQuery(q);
            setSelectedCategory('all');
        }
    }, [searchParams]);

    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return portfolioData.blogs
            .filter((post) => {
                const matchesSearch = !query ||
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt.toLowerCase().includes(query) ||
                    post.tags.some((tag) => tag.toLowerCase().includes(query));
                const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                const aDate = new Date(a.date).getTime();
                const bDate = new Date(b.date).getTime();
                return sortBy === 'latest' ? bDate - aDate : aDate - bDate;
            });
    }, [searchQuery, selectedCategory, sortBy]);

    useEffect(() => {
        setVisibleCount(INITIAL_BATCH);
    }, [searchQuery, selectedCategory, sortBy]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH, filteredPosts.length));
                }
            },
            { rootMargin: '500px 0px' },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [filteredPosts.length]);

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <section className="mx-auto w-full max-w-[100rem] px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:px-24">
                <div className="mb-14 flex flex-col gap-10 border-b border-foreground/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span>Publications Archive</span>
                            <span className="rounded-md border border-foreground/10 px-2 py-1 text-[10px] tracking-normal">
                                {filteredPosts.length}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {categories.map((category) => {
                                const active = selectedCategory === category;
                                const label = category === 'all'
                                    ? 'All Publications'
                                    : category.replaceAll('-', ' ');

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            'relative py-1 text-sm font-medium capitalize transition-colors',
                                            active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        {label}
                                        {active && (
                                            <motion.span
                                                layoutId="active-blog-category"
                                                className="absolute -bottom-2 left-0 h-px w-full bg-foreground"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:items-center">
                        <div className="relative min-w-0 flex-1 sm:min-w-72">
                            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search publications..."
                                className="w-full border-b border-foreground/10 bg-transparent py-3 pl-7 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setSortBy((current) => current === 'latest' ? 'oldest' : 'latest')}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-foreground/10 px-4 text-sm text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
                            aria-label={sortBy === 'latest' ? 'Sort oldest first' : 'Sort latest first'}
                        >
                            {sortBy === 'latest' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                            <span>{sortBy === 'latest' ? 'Latest' : 'Oldest'}</span>
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-foreground/10 border-y border-foreground/10">
                    {visiblePosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.035 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group grid min-h-32 grid-cols-1 gap-5 py-7 transition-colors hover:bg-foreground/[0.02] md:grid-cols-[1fr_auto] md:items-center md:px-4 md:py-9"
                            >
                                <div className="min-w-0">
                                    <h2 className="text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-2xl lg:text-3xl">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground md:text-base">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>

                                <div className="flex shrink-0 items-end gap-5 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-col md:gap-1">
                                    <span>{post.category.replaceAll('-', ' ')}</span>
                                    <time dateTime={post.date}>
                                        {new Intl.DateTimeFormat('en', {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(post.date))}
                                    </time>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-24 text-center text-sm text-muted-foreground">
                        No publications match the selected filters.
                    </div>
                )}

                <div ref={sentinelRef} className="flex min-h-32 items-center justify-center" aria-hidden="true">
                    {hasMore ? (
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
                            Loading archive...
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/40">
                            End of archive
                        </div>
                    ) : null}
                </div>
            </section>
        </main>
    );
}
