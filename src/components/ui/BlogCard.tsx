'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    const t = useTranslations('blog');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full bg-foreground/[0.02] dark:bg-secondary/5 border border-foreground/10 dark:border-border/40 hover:border-primary/30 transition-all duration-500 rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest bg-primary/10 backdrop-blur-md rounded-full text-primary border border-primary/20">
                        {t(`categories.${post.category}`)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} {t('readTime')}</span>
                    </div>
                </div>

                <h3 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                    {post.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-medium leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-all"
                    >
                        {t('readMore')} <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] font-medium text-muted-foreground/50 lowercase">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/2 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </motion.div>
    );
}
