'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete?: () => void;
    onExitStart?: () => void;
    duration?: number;
}

export function LoadingScreen({ onComplete, onExitStart, duration = 2500 }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Varying speed for a more organic feel
                const diff = Math.random() < 0.3 ? 1 : 2;
                return Math.min(prev + diff, 100);
            });
        }, duration / 80);

        return () => clearInterval(interval);
    }, [duration]);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                onExitStart?.();
                setTimeout(() => {
                    onComplete?.();
                }, 1500); // Matched with exit transition duration
            }, 500); // Small pause at 100% for impact
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{
                        scale: 6, // Reduced from 40 for hardware smoothness
                        opacity: 0,
                        filter: "blur(10px)", // Reduced for performance
                        transition: { 
                            duration: 1.5, // Slightly longer for cinematic look
                            ease: [0.22, 1, 0.36, 1] // Buttery-smooth quintic ease
                        }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                            scale: 0.8,
                            opacity: 0,
                            transition: { duration: 0.8, ease: "easeIn" }
                        }}
                        className="relative flex flex-col items-center w-full max-w-[280px]"
                    >
                        {/* Counter */}
                        <div className="flex items-baseline mb-8">
                            <motion.span
                                key={progress}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-6xl md:text-8xl font-inter font-extralight text-foreground tracking-tighter"
                            >
                                {progress.toString().padStart(2, '0')}
                            </motion.span>
                            <span className="text-lg md:text-xl font-inter font-light text-muted-foreground ml-2">%</span>
                        </div>

                        {/* Minimalist Progress Line */}
                        <div className="w-full h-[1px] bg-muted relative mb-4">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-foreground"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Status Label */}
                        <div className="flex justify-between w-full">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-inter">
                                SYAHRIL ARFIAN ALMAZRIL
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60 font-inter">
                                {progress < 100 ? 'Loading' : 'Ready'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Subtle aesthetic dot */}
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-12 w-1.5 h-1.5 rounded-full bg-foreground/10"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
