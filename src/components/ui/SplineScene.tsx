'use client';

import { useRef, useState, useEffect, type FC } from "react";
import Image from "next/image";
import { usePerformance } from "@/hooks/usePerformance";

interface SplineSceneProps {
    scene: string;
    className?: string;
}



export const SplineScene: FC<SplineSceneProps> = ({ scene, className }) => {
    const splineRef = useRef<any>(null);
    const isMounted = useRef(true);
    const { isLowPowerMode } = usePerformance();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        isMounted.current = true;

        if (isLowPowerMode) return; // Skip script loading in low power mode

        const SCRIPT_ID = 'spline-viewer-script';
        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;

        const handleLoad = () => {
            if (isMounted.current) setIsLoaded(true);
        };

        if (!script) {
            script = document.createElement('script');
            script.id = SCRIPT_ID;
            script.type = 'module';
            script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
            script.async = true;
            script.addEventListener('load', handleLoad);
            document.body.appendChild(script);
        } else {
            if (customElements.get('spline-viewer')) {
                handleLoad();
            } else {
                script.addEventListener('load', handleLoad);
            }
        }

        return () => {
            isMounted.current = false;
            if (script) script.removeEventListener('load', handleLoad);
        };
    }, [isLowPowerMode]); // Re-run if low power mode changes

    // Inject CSS into Shadow DOM non-destructively
    useEffect(() => {
        if (isLowPowerMode) return; // Skip CSS injection in low power mode

        let intervalId: NodeJS.Timeout;

        const injectStyles = () => {
            if (!isMounted.current) return;

            const currentRef = splineRef.current;
            if (currentRef && currentRef.shadowRoot) {
                const shadow = currentRef.shadowRoot;

                if (!shadow.querySelector('#spline-hide-logo-style')) {
                    const style = document.createElement('style');
                    style.id = 'spline-hide-logo-style';
                    style.textContent = `
                        #logo, 
                        a[href*="spline.design"], 
                        .spline-watermark,
                        #spline-watermark-overlay,
                        div[style*="bottom: 10px"],
                        div[style*="position: absolute; bottom: 10px; right: 10px;"] { 
                            display: none !important; 
                            opacity: 0 !important; 
                            visibility: hidden !important; 
                            pointer-events: none !important;
                        }
                    `;
                    shadow.appendChild(style);
                }
            }
        };

        const currentRef = splineRef.current;
        if (currentRef) {
            injectStyles();
            currentRef.addEventListener('load', injectStyles);

            // Limited attempts to handle late injection without eternal loop
            let attempts = 0;
            intervalId = setInterval(() => {
                if (currentRef.shadowRoot && isMounted.current) {
                    injectStyles();
                    attempts++;
                    if (attempts > 30) clearInterval(intervalId); // Stop after 30s
                }
            }, 1000);
        }

        return () => {
            if (currentRef) currentRef.removeEventListener('load', injectStyles);
            if (intervalId) clearInterval(intervalId);
        };
    }, [isLowPowerMode]); // Re-run if low power mode changes

    // The visibility observer is not strictly needed if we're conditionally rendering the spline-viewer
    // but keeping it for potential future use or if the component is rendered but hidden.
    // However, for low power mode, we return early, so this won't run.
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isLowPowerMode) return; // Skip observer setup in low power mode

        let resizeObserver: ResizeObserver | null = null;
        let intersectionObserver: IntersectionObserver | null = null;
        const state = { isIntersecting: false };

        const updateVisibility = () => {
            if (!containerRef.current || !isMounted.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            const hasValidSize = width > 1 && height > 1;
            setIsVisible(state.isIntersecting && hasValidSize);
        };

        intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (isMounted.current) {
                    state.isIntersecting = entry.isIntersecting;
                    updateVisibility();
                }
            },
            { threshold: 0.1 }
        );

        resizeObserver = new ResizeObserver(() => {
            if (isMounted.current) {
                updateVisibility();
            }
        });

        if (containerRef.current) {
            intersectionObserver.observe(containerRef.current);
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            intersectionObserver?.disconnect();
            resizeObserver?.disconnect();
        };
    }, [isLowPowerMode]); // Re-run if low power mode changes

    if (isLowPowerMode) {
        return (
            <div className={`relative w-full h-full bg-background overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Minimal decorative element for mobile instead of 3D */}
                    <div className="w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-pulse-slow" />
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className || ''}`}>
            <div className="w-full h-full pt-20">
                <spline-viewer
                    ref={splineRef}
                    url={scene}
                    loading-anim-type="spinner-small-dark"
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: 'scale(1.2) translate3d(0,0,0)',
                        transformOrigin: 'center center',
                        display: isLoaded ? 'block' : 'none',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out'
                    }}
                />
            </div>
        </div>
    );
}
