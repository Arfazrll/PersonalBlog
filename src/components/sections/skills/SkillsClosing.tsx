'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/ui/terminal';

export const SkillsClosing = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="group relative w-full bg-background overflow-hidden flex flex-col items-center justify-center min-h-[85vh] py-24 select-none"
        >
            {/* 1. BACKGROUND: "Wireframe Landscape" */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(500px)_rotateX(60deg)_scale(2)] origin-top opacity-30 pointer-events-none" />

            {/* 2. KINETIC TYPOGRAPHY (Marquee) */}
            <div className="absolute top-12 left-0 w-full overflow-hidden opacity-20 dark:opacity-5 pointer-events-none">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-24 text-[12vw] font-black uppercase leading-none text-foreground"
                >
                    <span>System Architecture</span>
                    <span>System Architecture</span>
                </motion.div>
            </div>

            <div className="absolute bottom-12 left-0 w-full overflow-hidden opacity-20 dark:opacity-5 pointer-events-none">
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-24 text-[12vw] font-black uppercase leading-none text-foreground"
                >
                    <span>Creative Engineering</span>
                    <span>Creative Engineering</span>
                </motion.div>
            </div>

            {/* 3. CENTER CONTENT: "The Split" */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* LEFT: Massive Statement */}
                <div className="space-y-8 relative">
                    {/* Decorative Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        transition={{ duration: 1, ease: 'circOut' }}
                        className="h-1 bg-primary mb-8"
                    />

                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground leading-[0.85]">
                        Forge <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/80">The</span> <br />
                        Future
                    </h2>

                    <p className="max-w-md text-muted-foreground text-lg md:text-xl font-mono leading-relaxed">
                        Precision engineering meets <span className="text-foreground font-semibold">unbound imagination</span>.
                        <br /> Let's construct a legacy.
                    </p>
                </div>

                {/* RIGHT: Interactive Terminal */}
                <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                    <div className="w-full max-w-lg">
                        <Terminal>
                            <TypingAnimation delay={500}>&gt; initializing protocol: collaboration</TypingAnimation>

                            <AnimatedSpan delay={1500} className="text-green-500">
                                ✔ Secure connection established.
                            </AnimatedSpan>

                            <AnimatedSpan delay={2000} className="text-green-500">
                                ✔ Analyzing project requirements.
                            </AnimatedSpan>

                            <AnimatedSpan delay={2500} className="text-green-500">
                                ✔ Verifying availability... Slot found.
                            </AnimatedSpan>

                            <AnimatedSpan delay={3000} className="text-green-500">
                                ✔ Loading contact modules.
                            </AnimatedSpan>

                            <AnimatedSpan delay={3500} className="text-blue-500">
                                <span>ℹ Action Required:</span>
                                <span className="pl-2">Initiate contact form</span>
                            </AnimatedSpan>

                            <TypingAnimation delay={4500} className="text-muted-foreground mt-4">
                                Ready to build something extraordinary?
                            </TypingAnimation>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 6 }}
                                className="mt-6"
                            >
                                <Link
                                    href="/contact"
                                    className="cursor-pointer inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm uppercase tracking-widest border-b border-primary/50 pb-0.5 hover:border-primary"
                                >
                                    [ Execute: Contact_Me ] <MoveRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </Terminal>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 blur-3xl -z-10 opacity-20 pointer-events-none" />
                </div>
            </div>

        </section>
    );
};
