'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon, Maximize2, Sparkles, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryStackProps {
    images: string[];
}

export const GalleryStack = ({ images }: GalleryStackProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / 20);
        mouseY.set((e.clientY - centerY) / 20);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    const displayImages = images.slice(0, 5); // Take 5 for a richer fan-out

    return (
        <Link href="/gallery" className="block outline-none">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "group relative w-full h-[280px] rounded-[3rem] overflow-hidden transition-all duration-700",
                    "bg-card border-2 border-foreground/15 dark:border-white/10",
                    "hover:border-primary/40 hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.15)] shadow-sm dark:shadow-none"
                )}
            >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                </div>

                {/* The Kaleidoscope Image Fan */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {displayImages.map((img, index) => {
                        // Calculate Fan Positions
                        const angle = (index - 2) * 20; // -40, -20, 0, 20, 40
                        const scale = 1 - (Math.abs(index - 2) * 0.1);

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    x: isHovered ? x : 0,
                                    y: isHovered ? y : 0,
                                    zIndex: 10 - Math.abs(index - 2),
                                }}
                                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                                animate={{
                                    rotate: isHovered ? angle : angle / 2,
                                    translateX: isHovered ? (index - 2) * 50 : 0,
                                    translateY: isHovered ? Math.abs(index - 2) * 15 - 20 : index * 4,
                                    scale: isHovered ? scale * 1.1 : scale,
                                    opacity: 1,
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 100,
                                    delay: index * 0.05
                                }}
                                className="absolute w-36 h-48 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-muted"
                            >
                                <Image
                                    src={img}
                                    alt={`Archive ${index}`}
                                    fill
                                    className={cn(
                                        "object-cover transition-all duration-700",
                                        isHovered ? "grayscale-0 scale-110 blur-0" : "grayscale-[0.8] scale-100 blur-[1px]"
                                    )}
                                />
                                {/* Glass Overlay & Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                    style={{ skewX: -20 }}
                                />
                            </motion.div>
                        );
                    })}

                    {/* Central Floating Badge */}
                    <motion.div
                        style={{ x, y }}
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            y: isHovered ? -10 : 20,
                            opacity: isHovered ? 1 : 0.8
                        }}
                        className="absolute z-30 bottom-10 px-8 py-3 bg-foreground text-background rounded-full flex items-center gap-4 shadow-2xl shadow-primary/40 border border-foreground/20"
                    >
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">+ {images.length} ARCHIVES</span>
                        <div className="w-px h-4 bg-background/20" />
                        <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    </motion.div>
                </div>

                {/* Editorial Text Overlays */}
                <div className="absolute inset-x-8 top-8 z-20 flex justify-between items-start pointer-events-none">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Documentation</span>
                        <h4 className="text-xl font-black text-foreground leading-none">THE GALLERY</h4>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center backdrop-blur-sm bg-foreground/5">
                        <Maximize2 className="w-4 h-4 text-foreground/40" />
                    </div>
                </div>

                {/* Particles / Highlights */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [-10, 10, -10],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                            }}
                            className="absolute bg-primary/20 blur-xl rounded-full"
                            style={{
                                width: 10 + i * 20,
                                height: 10 + i * 20,
                                left: `${20 + i * 25}%`,
                                top: `${30 + i * 15}%`,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </Link>
    );
};

export const GalleryButton = ({ galleryImages }: { galleryImages: string[] }) => {
    return <GalleryStack images={galleryImages} />;
};
