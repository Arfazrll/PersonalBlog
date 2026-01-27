'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

export function Marquee({
    children,
    direction = 'left',
    speed = 30,
    pauseOnHover = true,
    className
}: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState(30);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const contentWidth = container.scrollWidth / 2;
            const duration = contentWidth / speed;
            setAnimationDuration(duration);
        }
    }, [speed, children]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'flex overflow-hidden [--gap:1rem]',
                pauseOnHover && 'hover:[animation-play-state:paused]',
                className
            )}
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
        >
            <div
                className={cn(
                    'flex gap-[var(--gap)] animate-marquee',
                    direction === 'right' && 'animate-marquee-reverse'
                )}
                style={{
                    animationDuration: `${animationDuration}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite'
                }}
            >
                {children}
            </div>
            <div
                className={cn(
                    'flex gap-[var(--gap)] animate-marquee',
                    direction === 'right' && 'animate-marquee-reverse'
                )}
                style={{
                    animationDuration: `${animationDuration}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite'
                }}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}
