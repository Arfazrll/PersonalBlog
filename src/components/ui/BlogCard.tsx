import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface BlogCardProps {
    post: BlogPost;
    index: number;
    isLowPowerMode?: boolean;
}

export function BlogCard({ post, index, isLowPowerMode }: BlogCardProps) {
    const t = useTranslations('blog');

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block h-full cursor-none"
        >
            <motion.div
                initial={isLowPowerMode ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: isLowPowerMode ? 0 : index * 0.1 }}
                className={cn(
                    "relative aspect-[16/9] w-full bg-background rounded-none overflow-hidden border border-foreground/10 dark:border-white/5 transition-all duration-500 shadow-xl",
                    "hover:border-primary/30"
                )}
            >
                {/* Immersive Background Image */}
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Permanent Gradient Overlay for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-700" />

                {/* Integrated Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Title (Always visible, clean, first in order) */}
                    <h3 className="text-2xl lg:text-3xl font-black text-white transition-colors leading-[1.1] tracking-tighter drop-shadow-lg">
                        {post.title}
                    </h3>

                    {/* The Reveal Section (Appears BELOW the title) */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mt-4 transition-all duration-700 ease-in-out overflow-hidden space-y-4">
                        <p className="text-xs text-white/80 line-clamp-3 leading-relaxed font-medium">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-none border border-white/10">
                                {t(`categories.${post.category}`)}
                            </span>
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                {new Date(post.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

