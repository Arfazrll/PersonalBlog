'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { Calendar, Clock, ChevronLeft, Share2, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const t = useTranslations('blog');

    const post = portfolioData.blogs.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pb-24">
            {/* Hero Header */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-end justify-center pb-20 px-6">
                    <div className="container max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <span className="px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-[0.3em] bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full text-primary">
                                    {t(`categories.${post.category}`)}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight italic mb-10 leading-[0.9] text-foreground">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-black">
                                <div className="flex items-center gap-2">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/20">
                                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                    </div>
                                    <span className="text-foreground">{post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    {post.readTime} {t('readTime')}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Navigation Back */}
                <div className="absolute top-32 left-8 md:left-12 lg:left-24 z-20">
                    <Link
                        href="/blog"
                        className="flex items-center gap-3 p-3 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 hover:bg-primary/20 hover:border-primary/40 transition-all text-white group"
                    >
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="container max-w-4xl mx-auto px-6 relative mt-[-40px] z-20">
                <article className="bg-secondary/[0.03] backdrop-blur-xl border border-border/40 rounded-3xl p-8 md:p-16 shadow-2xl">
                    <div className="prose prose-invert prose-primary max-w-none">
                        <div className="font-mono text-sm leading-relaxed text-muted-foreground uppercase tracking-widest opacity-80 mb-12 border-l-2 border-primary/30 pl-8">
                            {post.excerpt}
                        </div>

                        <div className="space-y-8 text-foreground/80 text-lg leading-loose font-medium">
                            {/* In a real app, this would be markdown content */}
                            <p>
                                This is a placeholder for the full blog post content. The architecture demonstrates a clean separation of concerns, leveraging Next.js dynamic routing and high-performance image optimization.
                            </p>
                            <p>
                                We utilize <span className="text-primary font-black italic">Framer Motion</span> for complex transitions and <span className="text-primary font-black italic">Next-Intl</span> for seamless bilingual support. The design system is strictly aligned with the "Technical Archive" aesthetic, ensuring visual continuity across the entire portfolio.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                                <div className="p-8 bg-secondary/5 border-l-4 border-primary/40 rounded-r-xl">
                                    <h4 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">Core Implementation</h4>
                                    <p className="text-sm font-mono opacity-70">
                                        The 3x3 grid system ensures optimal information density while maintaining readability on all devices.
                                    </p>
                                </div>
                                <div className="p-8 bg-secondary/5 border-l-4 border-secondary/40 rounded-r-xl">
                                    <h4 className="text-secondary font-black uppercase tracking-[0.2em] text-xs mb-4">Visual Philosophy</h4>
                                    <p className="text-sm font-mono opacity-70">
                                        Cinematic hero headers provide an immediate immersive experience for the reader.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Tags */}
                    <div className="mt-20 pt-12 border-t border-border/40 flex flex-wrap gap-4">
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-6 py-2 bg-secondary/10 border border-border/40 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-default">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Quick Controls */}
                    <div className="mt-12 flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 text-muted-foreground border border-border/40 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                                <Bookmark className="w-4 h-4" /> Save
                            </button>
                        </div>

                        <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all">
                            {t('back')}
                        </Link>
                    </div>
                </article>

                {/* Bottom Decorative Grid */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
            </div>
        </main>
    );
}
