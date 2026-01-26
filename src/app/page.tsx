'use client';

import { Suspense, lazy, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { portfolioData } from '@/data/portfolio';

const Scene3D = lazy(() => import('@/components/three/Scene3D').then(mod => ({ default: mod.Scene3D })));

function FloatingShape({
    className,
    delay = 0,
    gradientDark,
    gradientLight
}: {
    className?: string;
    delay?: number;
    gradientDark: string;
    gradientLight: string;
}) {
    return (
        <>
            <motion.div
                className={`absolute rounded-full blur-3xl opacity-30 dark:block hidden ${className}`}
                style={{ background: gradientDark }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className={`absolute rounded-full blur-3xl opacity-30 dark:hidden block ${className}`}
                style={{ background: gradientLight }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                }}
            />
        </>
    );
}

function HeroContent() {
    const t = useTranslations('hero');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section
            ref={containerRef}
            className="section-creative flex items-center justify-center"
        >
            <FloatingShape
                className="w-[600px] h-[600px] -top-40 -left-40"
                gradientDark="radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)"
                gradientLight="radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
                delay={0}
            />
            <FloatingShape
                className="w-[500px] h-[500px] top-1/3 -right-40"
                gradientDark="radial-gradient(circle, rgba(148, 163, 184, 0.15) 0%, transparent 70%)"
                gradientLight="radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)"
                delay={2}
            />
            <FloatingShape
                className="w-[400px] h-[400px] bottom-20 left-1/4"
                gradientDark="radial-gradient(circle, rgba(100, 116, 139, 0.15) 0%, transparent 70%)"
                gradientLight="radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)"
                delay={4}
            />

            <Suspense fallback={null}>
                <Scene3D className="opacity-60" />
            </Suspense>

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 container-creative text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-6"
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-gradient">{t('greeting')}</span>
                    </motion.span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="heading-xl mb-6"
                >
                    <span className="block">{portfolioData.personal.name.split(' ')[0]}</span>
                    <span className="block text-gradient">{portfolioData.personal.name.split(' ').slice(1).join(' ') || portfolioData.personal.title}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="subheading max-w-2xl mx-auto mb-12"
                >
                    {portfolioData.personal.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/projects" className="btn-creative group">
                        <span className="flex items-center gap-2">
                            {t('cta.primary')}
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </Link>
                    <Link href="/contact" className="btn-outline-creative">
                        {t('cta.secondary')}
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                    <ArrowDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('portfolioLoaded', 'true');
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            <HeroContent />
        </>
    );
}
