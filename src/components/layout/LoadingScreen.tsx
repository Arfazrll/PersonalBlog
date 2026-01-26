'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface LoadingScreenProps {
    onComplete?: () => void;
    duration?: number;
}

export function LoadingScreen({ onComplete, duration = 2000 }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 4;
            });
        }, duration / 25);

        const timer = setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [duration, onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
                >
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: isDark
                                ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(148, 163, 184, 0.05) 0%, transparent 50%)'
                                : 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)'
                        }}
                    />

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            className="relative w-40 h-40 mb-12"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: isDark
                                        ? 'conic-gradient(from 0deg, #ffffff, #94a3b8, #64748b, #ffffff)'
                                        : 'conic-gradient(from 0deg, #3b82f6, #0ea5e9, #06b6d4, #3b82f6)',
                                    filter: 'blur(20px)',
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full bg-background"
                            />
                            <motion.div
                                className="absolute inset-8 rounded-full"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)'
                                        : 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                                }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center text-4xl font-black"
                                style={{ color: isDark ? '#0a0a0a' : '#ffffff' }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {Math.round(progress)}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <motion.h2
                                className="text-2xl font-black text-gradient mb-2"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                LOADING
                            </motion.h2>
                            <p className="text-sm text-muted-foreground">Preparing your experience...</p>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                        <motion.div
                            className="h-full"
                            style={{
                                background: isDark
                                    ? 'linear-gradient(90deg, #ffffff, #94a3b8, #64748b)'
                                    : 'linear-gradient(90deg, #3b82f6, #0ea5e9, #06b6d4)',
                            }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
