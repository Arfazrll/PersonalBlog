'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TERMINAL_TEXT = `// Initializing blog system...
const blog = {
  mission: "Sharing knowledge, one post at a time",
  topics: ["AI", "Web3", "Code", "Innovation"],
  status: "ACTIVE",
  author: "Creative Developer"
};

blog.init();
// Ready to explore →`;

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'hsl(var(--primary))';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.globalAlpha = 0.15;
                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

const TypewriterText = ({ text, speed = 30 }: { text: string; speed?: number }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            <span className="text-foreground/90">{displayText}</span>
            {currentIndex < text.length && (
                <span className={`inline-block w-2 h-5 md:h-6 ml-1 bg-primary ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            )}
        </div>
    );
};

export const TypewriterCodeHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <motion.div
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-background"
            style={{ opacity, y }}
        >
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="blog-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blog-grid)" />
                </svg>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 dark:bg-primary/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 dark:bg-secondary/10 blur-[100px] rounded-full" />

            {/* Terminal Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-4xl"
                >
                    {/* Terminal Header */}
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                            blog_terminal.tsx
                        </span>
                    </div>

                    {/* Terminal Window */}
                    <div className="bg-black/40 dark:bg-black/60 backdrop-blur-xl border border-foreground/10 rounded-lg p-6 md:p-8 shadow-2xl">
                        {/* Prompt Line */}
                        <div className="mb-4 font-mono text-sm text-primary">
                            <span className="text-green-400">visitor</span>
                            <span className="text-muted-foreground">@</span>
                            <span className="text-blue-400">blog</span>
                            <span className="text-muted-foreground">:~$ </span>
                            <span className="text-yellow-400">cat</span>
                            <span className="text-foreground/80"> mission.js</span>
                        </div>

                        {/* Typewriter Content */}
                        <div className="pl-0 md:pl-4">
                            <TypewriterText text={TERMINAL_TEXT} speed={20} />
                        </div>
                    </div>

                    {/* Index Label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="mt-8 flex items-center gap-4"
                    >
                        <div className="h-[2px] w-16 bg-gradient-to-r from-primary/60 to-transparent" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-primary/60">
                            INDEX_BLOG.v1.0
                        </span>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => {
                        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }}
                >
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-5 h-5 text-primary" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </motion.div>
    );
};
