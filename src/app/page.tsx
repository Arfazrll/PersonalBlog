'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingScreen } from '@/components/layout';
import { HeroVisual } from '@/components/sections/HeroVisual';
import { usePreloadState } from '@/components/ui/arc-preloader-hero';

export default function HomePage() {
    const { phase } = usePreloadState();
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoadingExit, setIsInitialLoadingExit] = useState(false);
    const [skipAnimation, setSkipAnimation] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setSkipAnimation(true);
            setIsLoading(false);
        }
    }, []);

    const isReadyToAnimate = isLoading
        ? isInitialLoadingExit
        : phase === 'reveal' || phase === 'done';

    const handleLoadingComplete = () => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        sessionStorage.setItem('portfolioLoaded', 'true');
    };

    const handleExitStart = () => {
        setIsInitialLoadingExit(true);
    };

    return (
        <>
            {isLoading && (
                <LoadingScreen
                    onComplete={handleLoadingComplete}
                    onExitStart={handleExitStart}
                    duration={2500}
                />
            )}

            <motion.main
                initial={skipAnimation ? false : { opacity: 0, y: 40 }}
                animate={
                    skipAnimation
                        ? { opacity: 1, y: 0 }
                        : isReadyToAnimate
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 40 }
                }
                transition={{
                    duration: skipAnimation ? 0 : 1.4,
                    ease: skipAnimation ? 'linear' : [0.16, 1, 0.3, 1],
                    opacity: { duration: skipAnimation ? 0 : 0.8 },
                }}
                className="relative h-[100svh] overflow-hidden will-change-transform will-change-opacity"
            >
                <HeroVisual isExiting={isReadyToAnimate} />
            </motion.main>
        </>
    );
}
