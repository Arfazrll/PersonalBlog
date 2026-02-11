'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpRight, Code, Heart, Sparkles, Mail } from 'lucide-react';
import { LiquidOcean } from '@/components/ui/liquid-ocean';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const MarqueeClosing = () => {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Ocean Colors
    const oceanConfig = isDark ? {
        // Dark Mode: Deep Black Ocean with Cyan Accents
        bg: 0x000000,
        grid: 0x050505, // Almost invisible grid for pitch black feel
        accent: 0x06b6d4, // Cyan-500
        opacity: 0.4
    } : {
        // Light Mode: White Ocean for seamless blending
        bg: 0xffffff,
        grid: 0xf3f4f6, // Gray-100
        accent: 0x3b82f6, // Blue-500
        opacity: 0.6
    };

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        // Added pb-32 to account for the overlay footer and position text lower
        <div className={cn(
            "relative w-full min-h-screen flex flex-col items-center justify-end overflow-hidden pb-5 transition-colors duration-500",
            isDark ? "bg-black text-white" : "bg-background text-foreground"
        )}>

            {/* Background Ocean - Full Immersive */}
            <div className="absolute inset-0 z-0">
                <LiquidOcean
                    key={isDark ? 'dark' : 'light'}
                    backgroundColor={oceanConfig.bg}
                    gridColor={oceanConfig.grid}
                    accentColor={oceanConfig.accent}
                    oceanSize={60}
                    oceanFragments={40}
                    waveAmplitude={isDark ? 0.8 : 0.5} // Calmer waves in light mode
                    waveSpeed={0.015}
                    showBoats={true}
                    boatCount={6}
                    boatSpread={20}
                    showWireframe={true}
                    oceanOpacity={oceanConfig.opacity}
                />

                {/* Top Fade Only - Seamless Integration */}
                {/* Top Fade - Gradient Bridge from Page Background to Ocean */}
                <div className={cn(
                    "absolute top-0 left-0 w-full h-48 bg-gradient-to-b to-transparent pointer-events-none z-10",
                    isDark ? "from-black via-black/80" : "from-background via-background/80"
                )} />
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center container px-6 py-20 text-center space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
                >
                    <h2 className={cn(
                        "text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl",
                        isDark ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60" : "text-foreground"
                    )}>
                        Ready to Build?
                    </h2>

                    <p className={cn(
                        "text-xl md:text-2xl font-light leading-relaxed max-w-2xl drop-shadow-md pb-2",
                        isDark ? "text-white/70" : "text-muted-foreground font-medium"
                    )}>
                        I'm always open to discussing product design work or partnership opportunities. Let's create something extraordinary together.
                    </p>

                    {/* Action Area: Newsletter & Navigation */}
                    <div className="w-full max-w-md mx-auto flex flex-col gap-6">

                        {/* Newsletter Input */}
                        <div className={cn(
                            "relative group flex items-center p-1.5 rounded-full border-2 transition-all duration-300",
                            isDark
                                ? "bg-white/5 border-white/10 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                                : "bg-card border-foreground/15 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] shadow-xl"
                        )}>
                            <div className={`pl-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email for updates..."
                                className={cn(
                                    "w-full bg-transparent border-none focus:ring-0 px-4 py-2 outline-none text-sm font-medium",
                                    isDark ? "text-white placeholder:text-white/40" : "text-foreground placeholder:text-muted-foreground"
                                )}
                            />
                            <button className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-[0.15em] transition-all duration-500 hover:scale-105 active:scale-95",
                                isDark
                                    ? "bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                    : "bg-foreground text-background hover:bg-primary shadow-xl shadow-primary/20"
                            )}>
                                Join
                            </button>
                        </div>

                        {/* Secondary Navigation Links */}
                        <div className="flex items-center justify-center gap-6 text-sm font-medium tracking-wide">
                            <Link href="/contact" className={cn(
                                "flex items-center gap-2 transition-colors",
                                isDark ? "text-white/50 hover:text-cyan-400" : "text-muted-foreground hover:text-primary"
                            )}>
                                <span>Contact Me</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                            <Link href="/projects" className={cn(
                                "flex items-center gap-2 transition-colors",
                                isDark ? "text-white/50 hover:text-cyan-400" : "text-muted-foreground hover:text-primary"
                            )}>
                                <span>View Projects</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Social Pill Component - Minimalist Glass
const SocialPill = ({ href, icon, label, isDark }: { href: string; icon: React.ReactNode; label: string; isDark: boolean }) => {
    return (
        <Link
            href={href}
            target="_blank"
            className={`
                group relative flex items-center gap-3 px-8 py-4 
                rounded-full backdrop-blur-md 
                transition-all duration-300 transform hover:-translate-y-1
                ${isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]'
                    : 'bg-white/80 hover:bg-white border border-gray-900/20 hover:border-blue-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]'
                }
            `}
        >
            <span className={`transition-colors ${isDark ? 'text-gray-300 group-hover:text-cyan-400' : 'text-gray-800 group-hover:text-blue-600'}`}>
                {icon}
            </span>
            <span className={`font-semibold tracking-wide ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-black'}`}>
                {label}
            </span>
            <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 ${isDark ? 'text-gray-500 group-hover:text-cyan-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
        </Link>
    );
};
