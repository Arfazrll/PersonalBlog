'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Code2, Brain, Check, Terminal, Database, Box } from 'lucide-react';

interface LoadingScreenProps {
    onComplete?: () => void;
    duration?: number;
}

// ==================== MATRIX CODE RAIN EFFECT ====================
const CodeRain = ({ theme }: { theme?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let timeoutId: NodeJS.Timeout;

        // Set canvas sizing
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Debounce resize
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(resizeCanvas, 100);
        };

        window.addEventListener('resize', handleResize);

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Staggered start
        }

        const isDark = theme === 'dark' || theme === undefined;
        const bgColor = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
        const primaryColor = isDark ? '#0F0' : '#059669';
        const secondaryColor = isDark ? '#0ea5e9' : '#2563eb';
        const highlightColor = isDark ? '#FFF' : '#1e293b';

        const draw = () => {
            // Check if context is valid
            if (!ctx || !canvas) return;

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

                const random = Math.random();
                if (random > 0.95) ctx.fillStyle = highlightColor;
                else if (random > 0.9) ctx.fillStyle = secondaryColor;
                else ctx.fillStyle = primaryColor;

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            // Use setTimeout for roughly 30fps to save resources instead of RAF
            animationFrameId = window.setTimeout(draw, 33) as unknown as number;
        };

        draw();

        return () => {
            clearTimeout(animationFrameId);
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="absolute inset-0 opacity-10" />;
};

export function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const { resolvedTheme } = useTheme();

    const steps = [
        { text: 'Initializing Neural Network...', icon: Brain },
        { text: 'Loading Portfolio Data...', icon: Database },
        { text: 'Compiling 3D Assets...', icon: Box },
        { text: 'System Ready', icon: Check },
    ];

    useEffect(() => {
        // Progress timer - slightly faster to ensure it hits 100 before duration
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, duration / 55);

        // Step timer
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, duration / steps.length);

        const timer = setTimeout(() => {
            setIsLoading(false);
            // Wait for exit animation to finish before calling onComplete
            setTimeout(() => {
                onComplete?.();
            }, 800);
        }, duration);

        return () => {
            clearInterval(interval);
            clearInterval(stepInterval);
            clearTimeout(timer);
        };
    }, [duration, onComplete, steps.length]);

    // Force strict dark mode on first load / flash prevention
    // But since user wants it to work with light mode too, we use theme-aware classes

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(20px)",
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden font-mono"
                >
                    <CodeRain theme={resolvedTheme} />

                    {/* Center Content */}
                    <div className="relative z-10 w-full max-w-md p-8">
                        {/* Terminal Window */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 0.9,
                                opacity: 0,
                                y: -20,
                                transition: { duration: 0.5 }
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-background/80 backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl"
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-2 text-xs text-muted-foreground font-mono">arfazrll@portfolio:~</span>
                            </div>

                            {/* Terminal Body */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-primary mb-6">
                                    <Terminal className="w-5 h-5" />
                                    <span className="text-sm font-semibold font-mono">System Initialization</span>
                                </div>

                                {/* Steps */}
                                <div className="space-y-3 font-mono">
                                    {steps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{
                                                opacity: index <= currentStep ? 1 : 0.3,
                                                x: index <= currentStep ? 0 : -10
                                            }}
                                            className={`flex items-center gap-3 text-sm font-medium ${index === currentStep ? 'text-blue-500' :
                                                index < currentStep ? 'text-green-500' : 'text-muted-foreground'
                                                }`}
                                        >
                                            {index < currentStep ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <step.icon className={`w-4 h-4 ${index === currentStep ? 'animate-pulse' : ''}`} />
                                            )}
                                            <span>{step.text}</span>
                                            {index === currentStep && (
                                                <motion.span
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                >
                                                    _
                                                </motion.span>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-8 font-mono">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                        <span>PROGRESS</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
