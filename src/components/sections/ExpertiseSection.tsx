"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { CircularGallery } from "@/components/ui/CircularGallery";
import TextScrollMarquee from "@/components/ui/TextScrollMarquee";

export default function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Detect theme changes
    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const galleryItems = [
        { image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', text: 'AI & Machine Learning' },
        { image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop', text: 'Full Stack Development' },
        { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', text: 'Data Science' },
        { image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop', text: 'Web3 & Blockchain' },
        { image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop', text: 'Cloud Computing' },
        { image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', text: 'Cybersecurity' },
    ];

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted to-background">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Grid Pattern with organic fade */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
                }}
            />

            <div className="container-creative relative z-10 px-6">
                {/* Creative Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >


                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">Core Capabilities</span>
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>

                    <div className="mb-12 w-full overflow-hidden">
                        <TextScrollMarquee baseVelocity={-2} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                            <span className="text-foreground">Creative</span>
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 ml-4 bg-[length:200%_auto]"
                                style={{ animation: 'gradient-flow 4s ease infinite' }}
                            >
                                Engineering
                            </span>
                        </TextScrollMarquee>
                    </div>

                    <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
                        Specialized in cutting-edge technologies that power modern digital experiences
                    </p>
                </motion.div>

                {/* Circular Gallery 3D */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
                >
                    <CircularGallery
                        items={galleryItems}
                        bend={3}
                        textColor={isDarkMode ? "#ffffff" : "#0f172a"}
                        borderRadius={0.08}
                        font="bold 24px Inter, sans-serif"
                        scrollSpeed={3}
                        scrollEase={0.06}
                    />
                </motion.div>

                {/* Drag hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-muted-foreground/60 font-mono mt-8 flex items-center justify-center gap-2"
                >
                    <span className="inline-block w-8 h-[1px] bg-border" />
                    Drag or scroll to explore
                    <span className="inline-block w-8 h-[1px] bg-border" />
                </motion.p>
            </div>
        </section>
    );
}
