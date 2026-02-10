'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Check, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';

const MarqueeRow = ({
    posts,
    direction = 'left',
    speed = 40
}: { posts: typeof portfolioData.blogs; direction?: 'left' | 'right'; speed?: number }) => {
    const duplicatedPosts = [...posts, ...posts, ...posts];

    return (
        <div className="relative flex overflow-hidden whitespace-nowrap">
            <motion.div
                className="flex gap-6"
                animate={{
                    x: direction === 'left' ? [0, -33.33 * posts.length * 8] : [-33.33 * posts.length * 8, 0]
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                {duplicatedPosts.map((post, i) => (
                    <Link
                        key={`${post.id}-${i}`}
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-primary/40 rounded-full transition-all duration-300 group"
                    >
                        <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                            {post.category}
                        </span>
                        <span className="text-sm font-bold group-hover:text-primary transition-colors">
                            {post.title}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};

export const MarqueeClosing = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const allPosts = portfolioData.blogs;
    const row1Posts = allPosts.filter((_, i) => i % 3 === 0);
    const row2Posts = allPosts.filter((_, i) => i % 3 === 1);
    const row3Posts = allPosts.filter((_, i) => i % 3 === 2);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="relative w-full bg-gradient-to-b from-background to-foreground/5 py-20 overflow-hidden">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="marquee-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="15" cy="15" r="1" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#marquee-dots)" />
                </svg>
            </div>

            <div className="relative z-10 space-y-6">
                {/* Marquee Row 1 */}
                <MarqueeRow posts={row1Posts} direction="left" speed={50} />

                {/* Newsletter Section - Centered */}
                <div className="relative py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="container mx-auto px-6 md:px-12"
                    >
                        <div className="max-w-3xl mx-auto bg-gradient-to-br from-foreground/10 via-foreground/5 to-transparent backdrop-blur-xl border border-foreground/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 blur-[80px] rounded-full" />

                            <div className="relative z-10 text-center">
                                {/* Icon */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, -2, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg"
                                >
                                    <Mail className="w-8 h-8 text-primary-foreground" />
                                </motion.div>

                                {/* Heading */}
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
                                    Stay Updated
                                </h2>
                                <p className="text-muted-foreground font-mono text-sm md:text-base mb-8 max-w-lg mx-auto">
                                    Get notified when I drop new content. No spam, just pure knowledge.
                                </p>

                                {/* Newsletter Form */}
                                <AnimatePresence mode="wait">
                                    {!isSubmitted ? (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                                        >
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                required
                                                disabled={isLoading}
                                                className="flex-1 px-6 py-4 bg-background border-2 border-foreground/20 rounded-2xl focus:outline-none focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
                                            />
                                            <motion.button
                                                type="submit"
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                            >
                                                {isLoading ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                                                    />
                                                ) : (
                                                    <>
                                                        <span>Subscribe</span>
                                                        <Send className="w-4 h-4" />
                                                    </>
                                                )}
                                            </motion.button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex flex-col items-center gap-4 py-4"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                            >
                                                <Check className="w-10 h-10 text-white" strokeWidth={3} />
                                            </motion.div>
                                            <div className="text-center">
                                                <p className="font-bold text-xl text-green-500 mb-2">
                                                    Subscribed Successfully!
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Check your inbox for confirmation.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Privacy Note */}
                                <p className="mt-6 text-xs text-muted-foreground/60 font-mono">
                                    🔒 No spam ever. Unsubscribe with one click.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Marquee Row 2 */}
                <MarqueeRow posts={row2Posts} direction="right" speed={45} />

                {/* Marquee Row 3 */}
                <MarqueeRow posts={row3Posts} direction="left" speed={55} />
            </div>

            {/* Edge Fade Overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
        </div>
    );
};
