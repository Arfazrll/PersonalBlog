'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpRight, Code, Heart, Sparkles, Mail } from 'lucide-react';
import { LiquidOcean } from '@/components/ui/liquid-ocean';
import Link from 'next/link';

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
        grid: 0x1a1a1a,
        accent: 0x06b6d4, // Cyan-500
        opacity: 0.8
    } : {
        // Light Mode: White Ocean with Subtle Gray Grid & Blue Accents
        bg: 0xffffff,
        grid: 0xe5e7eb, // Gray-200
        accent: 0x3b82f6, // Blue-500
        opacity: 0.5
    };

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        // Added pb-32 to account for the overlay footer and position text lower
        <div className={`relative w-full min-h-screen flex flex-col items-center justify-end overflow-hidden pb-5 transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-background text-foreground'}`}>

            {/* Background Ocean - Full Immersive */}
            <div className="absolute inset-0 z-0">
                <LiquidOcean
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
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
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
                    <h2 className={`text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60' : 'text-gray-950'}`}>
                        Ready to Build?
                    </h2>

                    <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-2xl drop-shadow-md pb-2 ${isDark ? 'text-gray-400/90' : 'text-gray-700 font-medium'}`}>
                        I'm always open to discussing product design work or partnership opportunities. Let's create something extraordinary together.
                    </p>

                    {/* Action Area: Newsletter & Navigation */}
                    <div className="w-full max-w-md mx-auto flex flex-col gap-6">

                        {/* Newsletter Input */}
                        <div className={`
                            relative group flex items-center p-1.5 rounded-full backdrop-blur-md border transition-all duration-300
                            ${isDark
                                ? 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]'
                                : 'bg-white/80 border-gray-900/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                            }
                        `}>
                            <div className={`pl-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email for updates..."
                                className={`
                                    w-full bg-transparent border-none focus:ring-0 px-4 py-2 outline-none text-sm font-medium
                                    ${isDark
                                        ? 'text-white placeholder:text-gray-300'
                                        : 'text-gray-900 placeholder:text-gray-400'
                                    }
                                `}
                            />
                            <button className={`
                                px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                                ${isDark
                                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                                    : 'bg-gray-900 text-white hover:bg-black hover:shadow-lg'
                                }
                            `}>
                                Join
                            </button>
                        </div>

                        {/* Secondary Navigation Links */}
                        <div className="flex items-center justify-center gap-6 text-sm font-medium tracking-wide">
                            <Link href="/contact" className={`flex items-center gap-2 transition-colors ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-blue-600'}`}>
                                <span>Contact Me</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                            <Link href="/projects" className={`flex items-center gap-2 transition-colors ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-blue-600'}`}>
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
