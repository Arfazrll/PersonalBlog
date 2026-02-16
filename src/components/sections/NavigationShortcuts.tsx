"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export const NavigationShortcuts = () => {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const categories = [
        {
            title: "Volume I: Identity",
            items: [
                { id: '01', title: 'About Me', href: '/#about', image: portfolioData.personal.avatar },
                { id: '02', title: 'Resume', href: portfolioData.personal.resumeUrl, image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop", external: true },
                { id: '03', title: 'Contact', href: '/contact', image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&h=600&fit=crop" },
            ]
        },
        {
            title: "Volume II: Professional Sequence",
            items: [
                { id: '04', title: 'Experience', href: '/experience', image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop" },
                { id: '05', title: 'Education', href: '/experience', image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop" },
                { id: '06', title: 'Projects', href: '/projects', image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop" },
                { id: '07', title: 'Certifications', href: '/achievements', image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&h=600&fit=crop" },
            ]
        },
        {
            title: "Volume III: Competency Matrix",
            items: [
                { id: '08', title: 'Hard Skills', href: '/skills#hard-skills', image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop" },
                { id: '09', title: 'Soft Skills', href: '/skills#soft-skills', image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
                { id: '10', title: 'Tools & Tech', href: '/skills#tools', image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop" },
            ]
        },
        {
            title: "Volume IV: Creative Output",
            items: [
                { id: '11', title: 'Blog', href: '/blog', image: "https://images.unsplash.com/photo-1499750310159-54f8f0ea9db5?w=800&h=600&fit=crop" },
                { id: '12', title: 'Gallery', href: '/gallery', image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop" },
            ]
        }
    ];

    return (
        <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 relative min-h-screen flex flex-col justify-center py-20">

            {/* Background Image Preview - Fixed Position */}
            <div className="fixed inset-0 z-0 pointer-events-none hidden lg:block">
                <AnimatePresence mode="wait">
                    {hoveredImage && (
                        <motion.div
                            key={hoveredImage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.15, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={hoveredImage}
                                alt="Section Preview"
                                fill
                                className="object-cover grayscale"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-left mb-16 relative z-10 border-b border-neutral-200 dark:border-neutral-800 pb-8"
            >
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-black text-neutral-900 dark:text-white mb-2 tracking-tighter">
                            INDEX
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm tracking-widest uppercase">
                            Table of Contents / Navigation
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-mono text-neutral-400">
                            LATEST UPDATE<br />
                            {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* List Layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
                {categories.map((category, catIdx) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIdx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-neutral-700"></span>
                            {category.title}
                        </h3>

                        <div className="space-y-0">
                            {category.items.map((item, idx) => (
                                <Link
                                    key={item.id}
                                    href={item.href || '#'}
                                    target={item.external ? "_blank" : undefined}
                                    className="group block relative"
                                    onMouseEnter={() => {
                                        setHoveredImage(item.image);
                                        setActiveIndex(parseInt(item.id));
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredImage(null);
                                        setActiveIndex(null);
                                    }}
                                >
                                    <div className="flex items-baseline py-4 border-b border-neutral-200 dark:border-neutral-800 group-hover:border-primary transition-colors duration-300">
                                        <span className="font-mono text-xs md:text-sm text-neutral-400 group-hover:text-primary transition-colors w-12 shrink-0">
                                            {item.id}
                                        </span>
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:tracking-wide">
                                                {item.title}
                                            </span>
                                            <ArrowUpRight className="w-5 h-5 text-neutral-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Image Preview Logic (Optional or Simplified) */}
            <div className="mt-20 text-center lg:hidden">
                <p className="text-xs text-neutral-500 font-mono">
                    Select a section to navigate
                </p>
            </div>
        </div>
    );
};
