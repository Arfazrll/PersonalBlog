'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollAnimationOptions {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

export function useScrollAnimation<T extends HTMLElement>(
    animationCallback: (element: T, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
    options: UseScrollAnimationOptions = {}
): RefObject<T> {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return;
        }

        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            const animation = animationCallback(element, gsap);

            if (animation) {
                ScrollTrigger.create({
                    trigger: options.trigger || element,
                    start: options.start || 'top 80%',
                    end: options.end || 'bottom 20%',
                    scrub: options.scrub,
                    markers: options.markers,
                    toggleActions: options.toggleActions || 'play none none reverse',
                    animation,
                    onEnter: options.onEnter,
                    onLeave: options.onLeave,
                    onEnterBack: options.onEnterBack,
                    onLeaveBack: options.onLeaveBack,
                });
            }
        }, element);

        return () => {
            ctx.revert();
        };
    }, [animationCallback, options]);

    return elementRef as RefObject<T>;
}

export function useFadeIn<T extends HTMLElement>(
    delay: number = 0,
    duration: number = 0.6
): RefObject<T> {
    return useScrollAnimation<T>((element, g) => {
        return g.fromTo(
            element,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
        );
    });
}

export function useSlideIn<T extends HTMLElement>(
    direction: 'left' | 'right' | 'up' | 'down' = 'up',
    delay: number = 0,
    duration: number = 0.6
): RefObject<T> {
    const getInitialPosition = () => {
        switch (direction) {
            case 'left':
                return { x: -50, y: 0 };
            case 'right':
                return { x: 50, y: 0 };
            case 'up':
                return { x: 0, y: 50 };
            case 'down':
                return { x: 0, y: -50 };
        }
    };

    const { x, y } = getInitialPosition();

    return useScrollAnimation<T>((element, g) => {
        return g.fromTo(
            element,
            { opacity: 0, x, y },
            { opacity: 1, x: 0, y: 0, duration, delay, ease: 'power2.out' }
        );
    });
}

export function useStaggerChildren<T extends HTMLElement>(
    childSelector: string = '> *',
    staggerAmount: number = 0.1,
    duration: number = 0.5
): RefObject<T> {
    return useScrollAnimation<T>((element, g) => {
        const children = element.querySelectorAll(childSelector);
        return g.fromTo(
            children,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration,
                stagger: staggerAmount,
                ease: 'power2.out'
            }
        );
    });
}

export function useParallax<T extends HTMLElement>(
    speed: number = 0.5
): RefObject<T> {
    return useScrollAnimation<T>(
        (element, g) => {
            return g.to(element, {
                y: () => -window.innerHeight * speed,
                ease: 'none',
            });
        },
        { scrub: true, start: 'top bottom', end: 'bottom top' }
    );
}

export function useScaleOnScroll<T extends HTMLElement>(
    fromScale: number = 0.8,
    toScale: number = 1
): RefObject<T> {
    return useScrollAnimation<T>((element, g) => {
        return g.fromTo(
            element,
            { scale: fromScale, opacity: 0.5 },
            { scale: toScale, opacity: 1, duration: 0.8, ease: 'power2.out' }
        );
    });
}
