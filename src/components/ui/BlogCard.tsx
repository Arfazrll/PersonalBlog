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
            className="group relative flex flex-col h-full bg-background/50 dark:bg-secondary/5 border border-border/50 hover:border-primary/30 transition-all duration-500 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/5"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

                {/* Category Badge - Natural Pill */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-md rounded-full text-foreground/80 border border-border/50 shadow-sm">
                        {t(`categories.${post.category}`)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative">
                {/* Date */}
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        <span>{new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-all group/link"
                    >
                        Read Article
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>

                    {/* Minimalist Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                                #{post.tags[0]}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
