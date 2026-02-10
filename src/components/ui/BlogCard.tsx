import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowUpRight, Brain, Blocks, Code2, Library, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const CategoryIcon = ({ category, className }: { category: string; className?: string }) => {
    switch (category) {
        case 'ai': return <Brain className={className} />;
        case 'web3': return <Blocks className={className} />;
        case 'coding': return <Code2 className={className} />;
        default: return <Library className={className} />;
    }
};

export function BlogCard({ post, index }: BlogCardProps) {
    const t = useTranslations('blog');
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Mouse interaction for glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <Link href={`/blog/${post.slug}`} className="block h-full cursor-pointer">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                className={cn(
                    "group relative flex flex-col h-full transition-all duration-500 rounded-[2rem] overflow-hidden p-8 lg:p-10",
                    "bg-card border-2 border-foreground/15 dark:border-white/[0.08]",
                    "hover:border-primary/40 dark:hover:border-primary/40",
                    "shadow-sm hover:shadow-xl dark:shadow-none transition-shadow"
                )}
            >
                {/* Spotlight Glow Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                rgba(var(--primary-rgb), ${isDark ? '0.1' : '0.05'}),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Background Decorative Icon - Subtle & Large */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.02] group-hover:opacity-[0.06] dark:group-hover:opacity-[0.04] transition-opacity duration-700 pointer-events-none z-0 scale-[2.5] blur-[1px]">
                    <CategoryIcon category={post.category} className="w-64 h-64 text-foreground" />
                </div>

                {/* Content Container - Relative to stay above glow */}
                <div className="relative z-10 h-full flex flex-col">

                    {/* Header: Cat & Date */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-foreground/[0.03] border border-foreground/[0.08] flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                <CategoryIcon category={post.category} className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
                                {t(`categories.${post.category}`)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/[0.03] border border-foreground/[0.05]">
                            <Calendar className="w-3 h-3 text-muted-foreground/40" />
                            <span className="text-[10px] font-bold text-muted-foreground tracking-wider">
                                {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    {/* Body: Title & Excerpt */}
                    <div className="flex-grow">
                        <h3 className="text-2xl lg:text-3xl font-black mb-6 text-foreground group-hover:text-primary transition-colors leading-[1.1] tracking-tighter">
                            {post.title}
                        </h3>
                        <p className="text-sm lg:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-3 leading-relaxed font-medium mb-10">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Footer: Action & Tags */}
                    <div className="mt-auto pt-8 flex items-center justify-between border-t border-foreground/[0.05] group-hover:border-primary/20 transition-colors">
                        <div
                            className="group/link flex items-center gap-3 text-sm font-black text-muted-foreground group-hover:text-foreground transition-all tracking-widest uppercase"
                        >
                            <span>Insights</span>
                            <div className="w-8 h-[2px] bg-foreground/10 group-hover/link:w-12 group-hover/link:bg-primary transition-all duration-500" />
                            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </div>

                        {post.tags.length > 0 && (
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-foreground/[0.02] border border-foreground/[0.05]">
                                <Sparkles className="w-3 h-3 text-primary/40" />
                                <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">
                                    {post.tags[0]}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Corner Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
        </Link>
    );
}

