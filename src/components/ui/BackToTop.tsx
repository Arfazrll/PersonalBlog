'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    // Use refs for values that change rapidly to avoid re-renders
    const isVisibleRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Magnetic Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { height, width, left, top } = rect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            // Standard sensitivity
            x.set(middleX);
            y.set(middleY);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Optimized Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            // 1. Clear any existing timeout (the "stop" detector)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // 2. If currently visible, hide it immediately (state change only if needed)
            if (isVisibleRef.current) {
                setIsVisible(false);
                isVisibleRef.current = false;
            }

            // 3. Set new timeout to detect scroll stop
            timeoutRef.current = setTimeout(() => {
                const scrolledEnough = window.scrollY > 100;

                if (scrolledEnough && !isVisibleRef.current) {
                    setIsVisible(true);
                    isVisibleRef.current = true;
                } else if (!scrolledEnough && isVisibleRef.current) {
                    setIsVisible(false);
                    isVisibleRef.current = false;
                }
            }, 100); // 100ms debounce
        };

        // Passive listener for performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                // Wrapper: Large touch target for magnetic pull
                <div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="fixed bottom-6 right-6 z-[100] w-32 h-32 flex items-center justify-center pointer-events-auto"
                >
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        onClick={scrollToTop}
                        style={{ x: mouseX, y: mouseY }}
                        className="relative h-14 w-14 rounded-full bg-foreground text-background shadow-2xl flex items-center justify-center border border-background/20 backdrop-blur-md cursor-pointer group"
                    >
                        <ArrowUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-full bg-foreground/10 blur-xl -z-10 group-hover:blur-2xl transition-all" />
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}
