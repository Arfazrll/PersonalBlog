'use client';

import { useRef, useState, useEffect, type FC } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
    scene: string;
    className?: string;
}

export const SplineScene: FC<SplineSceneProps> = ({ scene, className }) => {
    const isMounted = useRef(true);
    const { isLowPowerMode } = usePerformance();
    const [isSceneLoaded, setIsSceneLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const splineApp = useRef<any>(null);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Intersection Observer to pause/play the heavy WebGL engine when out of view
    useEffect(() => {
        if (isLowPowerMode || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;
                setIsVisible(isIntersecting);

                if (splineApp.current) {
                    try {
                        if (isIntersecting) {
                            // Resume WebGL rendering
                            splineApp.current.play();
                        } else {
                            // Pause WebGL rendering to save GPU and battery
                            splineApp.current.stop();
                        }
                    } catch (e) {
                        // Silently fallback if methods don't exist in this version
                    }
                }
            },
            { rootMargin: "200px" } // Trigger slightly before it enters viewport
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isLowPowerMode]);

    // Fallback timer just in case onLoad fails
    useEffect(() => {
        if (isLowPowerMode) return;
        const timeoutId = setTimeout(() => {
            if (isMounted.current && !isSceneLoaded) {
                setIsSceneLoaded(true);
            }
        }, 8000);
        return () => clearTimeout(timeoutId);
    }, [isLowPowerMode, isSceneLoaded]);

    if (isLowPowerMode) {
        return (
            <div className={`relative w-full h-full bg-background overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-pulse-slow" />
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className || ''}`}>

            {/* Global style to hide the react-spline watermark (not in shadow DOM) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .spline-watermark,
                div[style*="bottom: 16px"],
                div[style*="bottom: 10px"],
                a[href*="spline.design"] {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    visibility: hidden !important;
                }
            `}} />

            <div className="w-full h-full pt-20 relative">

                {/* Custom Cinematic Loading State */}
                {!isSceneLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent">
                    </div>
                )}

                <div
                    className="w-full h-full transition-opacity duration-1000"
                    style={{
                        opacity: isSceneLoaded ? 1 : 0,
                        visibility: isVisible ? 'visible' : 'hidden'
                    }}
                >
                    <Spline
                        scene={scene}
                        onLoad={(app) => {
                            splineApp.current = app;
                            if (isMounted.current) setIsSceneLoaded(true);
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            transform: 'scale(1.2)',
                            transformOrigin: 'center center'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
