'use client';

import React, { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';

interface CardTransform {
    translateY: number;
    scale: number;
    rotation: number;
    blur: number;
}

interface ScrollStackProps {
    children: ReactNode;
    className?: string;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    onStackComplete?: () => void;
}

interface ScrollStackItemProps {
    children: ReactNode;
    className?: string;
}

export function ScrollStackItem({ children, className = '' }: ScrollStackItemProps) {
    return (
        <div
            className={`scroll-stack-card relative w-full min-h-[320px] my-8 p-8 md:p-12 rounded-[30px] md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.3)] box-border origin-top will-change-transform bg-card/80 backdrop-blur-xl border border-border/30 ${className}`}
            style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    );
}

export function ScrollStack({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    rotationAmount = 0,
    blurAmount = 0,
    onStackComplete
}: ScrollStackProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());
    const lenisRef = useRef<Lenis | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isUpdatingRef = useRef(false);
    const [stackCompleted, setStackCompleted] = useState(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const updateCardTransforms = useCallback(() => {
        const scroller = scrollerRef.current;
        if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const scrollTop = scroller.scrollTop;
        const containerHeight = scroller.clientHeight;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
        const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement;
        const endElementTop = endElement ? endElement.offsetTop : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = card.offsetTop;
            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCardTop = cardsRef.current[j].offsetTop;
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompleted) {
                    setStackCompleted(true);
                    onStackComplete?.();
                } else if (!isInView && stackCompleted) {
                    setStackCompleted(false);
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        stackPosition,
        scaleEndPosition,
        itemStackDistance,
        baseScale,
        itemScale,
        rotationAmount,
        blurAmount,
        calculateProgress,
        parsePercentage,
        stackCompleted,
        onStackComplete
    ]);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
        cardsRef.current = cards;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
        });

        const lenis = new Lenis({
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            gestureOrientation: 'vertical',
            wheelMultiplier: 1,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075
        });

        lenis.on('scroll', updateCardTransforms);

        const raf = (time: number) => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);

        lenisRef.current = lenis;
        updateCardTransforms();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            // Capture ref values for cleanup
            const currentLenis = lenisRef.current;
            const currentLastTransforms = lastTransformsRef.current;

            if (currentLenis) {
                currentLenis.destroy();
            }
            cardsRef.current = [];
            currentLastTransforms.clear();
        };
    }, [itemDistance, updateCardTransforms]);

    return (
        <div
            ref={scrollerRef}
            className={`relative w-full h-full overflow-y-auto overflow-x-hidden ${className}`}
            style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                transform: 'translateZ(0)',
                willChange: 'scroll-position'
            }}
        >
            <div className="px-4 md:px-20 pt-[20vh] pb-[50rem] min-h-screen scroll-stack-inner">
                {children}
                <div className="w-full h-px scroll-stack-end" />
            </div>
        </div>
    );
}
