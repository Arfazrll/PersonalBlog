'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Check, Sparkles } from 'lucide-react';

const THOUGHT_TOPICS: Array<{ text: string; delay: number; size: 'sm' | 'md' | 'lg' }> = [
    { text: 'AI Ethics', delay: 0.2, size: 'sm' as const },
    { text: 'Web3 Future', delay: 0.4, size: 'md' as const },
    { text: 'Clean Code', delay: 0.6, size: 'sm' as const },
    { text: 'Innovation', delay: 0.8, size: 'lg' as const },
    { text: 'DevOps', delay: 1.0, size: 'sm' as const },
    { text: 'Design Patterns', delay: 1.2, size: 'md' as const },
];

const LiquidWave = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-30">
            <svg
                className="absolute bottom-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <motion.path
                    fill="hsl(var(--primary))"
                    fillOpacity="0.3"
                    initial={{ d: "M0,160 C320,200,420,100,720,140 C1020,180,1120,80,1440,120 L1440,320 L0,320 Z" }}
                    animate={{
                        d: [
                            "M0,160 C320,200,420,100,720,140 C1020,180,1120,80,1440,120 L1440,320 L0,320 Z",
                            "M0,140 C320,100,420,200,720,160 C1020,120,1120,180,1440,140 L1440,320 L0,320 Z",
                            "M0,160 C320,200,420,100,720,140 C1020,180,1120,80,1440,120 L1440,320 L0,320 Z"
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.path
                    fill="hsl(var(--secondary))"
                    fillOpacity="0.2"
                    initial={{ d: "M0,200 C360,240,540,160,720,200 C900,240,1080,160,1440,200 L1440,320 L0,320 Z" }}
                    animate={{
                        d: [
                            "M0,200 C360,240,540,160,720,200 C900,240,1080,160,1440,200 L1440,320 L0,320 Z",
                            "M0,220 C360,180,540,260,720,220 C900,180,1080,260,1440,220 L1440,320 L0,320 Z",
                            "M0,200 C360,240,540,160,720,200 C900,240,1080,160,1440,200 L1440,320 L0,320 Z"
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </svg>
        </div>
    );
};

const ThoughtBubble = ({
    text,
    delay,
    size = 'md',
    x,
    y
}: {
    text: string;
    delay: number;
    size: 'sm' | 'md' | 'lg';
    x: string;
    y: string;
}) => {
    const sizeClasses = {
        sm: 'w-24 h-24 text-xs',
        md: 'w-32 h-32 text-sm',
        lg: 'w-40 h-40 text-base'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, scale: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={`absolute ${sizeClasses[size]}`}
            style={{ left: x, top: y }}
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }}
                className="relative w-full h-full"
            >
                {/* Main Bubble */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-foreground/10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default group">
                    <p className="text-center font-mono font-semibold text-foreground/80 group-hover:text-foreground px-4">
                        {text}
                    </p>
                </div>

                {/* Bubble Tail */}
                <div className="absolute -bottom-2 left-1/4 w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 rounded-full border border-foreground/10" />
                <div className="absolute -bottom-4 left-1/3 w-4 h-4 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 rounded-full border border-foreground/10" />
            </motion.div>
        </motion.div>
    );
};

const ParticleConnections = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = 600;

        const particles: { x: number; y: number; vx: number; vy: number }[] = [];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw particle
                ctx.fillStyle = 'hsl(var(--primary))';
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.strokeStyle = 'hsl(var(--primary))';
                        ctx.globalAlpha = (1 - dist / 150) * 0.2;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 600;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

export const ThoughtStreamClosing = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-gradient-to-b from-background via-background to-secondary/5 overflow-hidden">
            {/* Particle Connections */}
            <ParticleConnections />

            {/* Liquid Wave */}
            <LiquidWave />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 py-20">
                {/* Floating Thought Bubbles */}
                <div className="hidden md:block relative h-96 mb-12">
                    <ThoughtBubble text={THOUGHT_TOPICS[0].text} delay={THOUGHT_TOPICS[0].delay} size={THOUGHT_TOPICS[0].size} x="5%" y="20%" />
                    <ThoughtBubble text={THOUGHT_TOPICS[1].text} delay={THOUGHT_TOPICS[1].delay} size={THOUGHT_TOPICS[1].size} x="75%" y="10%" />
                    <ThoughtBubble text={THOUGHT_TOPICS[2].text} delay={THOUGHT_TOPICS[2].delay} size={THOUGHT_TOPICS[2].size} x="15%" y="60%" />
                    <ThoughtBubble text={THOUGHT_TOPICS[3].text} delay={THOUGHT_TOPICS[3].delay} size={THOUGHT_TOPICS[3].size} x="65%" y="55%" />
                    <ThoughtBubble text={THOUGHT_TOPICS[4].text} delay={THOUGHT_TOPICS[4].delay} size={THOUGHT_TOPICS[4].size} x="85%" y="70%" />
                    <ThoughtBubble text={THOUGHT_TOPICS[5].text} delay={THOUGHT_TOPICS[5].delay} size={THOUGHT_TOPICS[5].size} x="40%" y="75%" />
                </div>

                {/* Central Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    {/* Icon */}
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg"
                    >
                        <Sparkles className="w-8 h-8 text-primary-foreground" />
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                        Don't Miss My Next Thought
                    </h2>

                    <p className="text-muted-foreground font-mono text-sm md:text-base mb-8 max-w-lg mx-auto">
                        Subscribe to get fresh ideas, code insights, and tech musings delivered straight to your inbox.
                    </p>

                    {/* Newsletter Form */}
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                            >
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        disabled={isLoading}
                                        className="w-full pl-12 pr-4 py-3 bg-foreground/5 border border-foreground/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {isLoading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <span>Subscribe</span>
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                    <Check className="w-8 h-8 text-white" />
                                </div>
                                <p className="font-bold text-lg text-green-500">
                                    ✨ Thanks for subscribing!
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Check your inbox for confirmation.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Privacy Note */}
                    <p className="mt-6 text-xs text-muted-foreground/60 font-mono">
                        No spam. Unsubscribe anytime. Your data is safe.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
