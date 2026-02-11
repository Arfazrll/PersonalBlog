"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function BlogPortalFooter({ isLowPowerMode }: { isLowPowerMode?: boolean }) {
    const [hoveredBlog, setHoveredBlog] = useState<string | null>(null);

    // Get latest 3 blogs
    const latestBlogs = portfolioData.blogs.slice(0, 3);

    return (
        <section className="relative bg-background text-foreground py-32 overflow-hidden">

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-neutral-500 dark:border-white/20 pb-8">
                    <div>
                        <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2 block">
                            Knowledge Base
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif leading-none">
                            The Engineering<br />
                            <span className="text-muted-foreground italic">Process.</span>
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Link href="/blog" className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-cyan-500 transition-colors">
                            View All Articles
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Editorial List */}
                <div className="flex flex-col">
                    {latestBlogs.map((blog, index) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group relative">
                            <div
                                className="flex flex-col md:flex-row items-baseline py-12 border-b border-neutral-500 dark:border-white/20 group-hover:border-cyan-500/50 transition-colors"
                                onMouseEnter={() => !isLowPowerMode && setHoveredBlog(blog.image)}
                                onMouseLeave={() => !isLowPowerMode && setHoveredBlog(null)}
                            >
                                <span className="font-mono text-xs text-muted-foreground w-24 mb-4 md:mb-0">
                                    0{index + 1} //
                                </span>

                                <div className="flex-1">
                                    <h3 className={cn(
                                        "text-3xl md:text-5xl font-medium mb-2 transition-transform duration-500 ease-out",
                                        !isLowPowerMode && "group-hover:translate-x-4"
                                    )}>
                                        {blog.title}
                                    </h3>
                                    <div className={cn(
                                        "flex gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider transition-transform duration-500 ease-out delay-75",
                                        !isLowPowerMode && "group-hover:translate-x-4"
                                    )}>
                                        <span className="text-cyan-500">{blog.category}</span>
                                        <span>{blog.readTime} min read</span>
                                    </div>
                                </div>

                                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-x-4 duration-500">
                                    <ArrowUpRight className="w-8 h-8 text-cyan-500" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Large CTA at bottom */}
                <div className="mt-32 text-center">
                    <p className="text-muted-foreground font-serif italic text-xl mb-8">
                        "Documenting the journey from concept to deployment."
                    </p>
                    <Link href="/blog">
                        <button className="relative px-12 py-6 bg-foreground text-background font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-colors duration-300">
                            Read the Journal
                        </button>
                    </Link>
                </div>

            </div>

            {/* Background Image Preview (Hover Reveal) */}
            <AnimatePresence>
                {hoveredBlog && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        {/* 
                            Optimization for Light/Dark Mode:
                            - Light Mode: opacity-10 + mix-blend-multiply (Darkens the white background)
                            - Dark Mode: opacity-20 + mix-blend-normal (Visible on black background)
                        */}
                        <div className="relative w-full h-full opacity-[0.15] dark:opacity-20 mix-blend-multiply dark:mix-blend-normal">
                            <Image
                                src={hoveredBlog}
                                alt="Blog Preview"
                                fill
                                className="object-cover grayscale"
                            />
                        </div>

                        {/* Gradient Overlay to ensure text readability without washing out the image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
