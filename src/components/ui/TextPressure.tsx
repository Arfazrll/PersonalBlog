'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePerformance } from '@/hooks/usePerformance';

interface TextPressureProps {
    text: string;
    fontFamily?: string;
    fontUrl?: string;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    flex?: boolean;
    stroke?: boolean;
    scale?: boolean;
    textColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
    minFontSize?: number;
    maxFontSize?: number;
}

export function TextPressure({
    text,
    fontFamily = 'Compressa VF',
    fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
    width = true,
    weight = true,
    italic = true,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    textColor = '#FFFFFF',
    strokeColor = '#FF0000',
    strokeWidth = 2,
    className = '',
    minFontSize = 24,
    maxFontSize = 200,
}: TextPressureProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

    const centersRef = useRef<{ x: number; y: number }[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);
    const [fontLoaded, setFontLoaded] = useState(false);

    const chars = text.split('');

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const updateCenters = useCallback(() => {
        if (!titleRef.current) return;
        const newCenters = spansRef.current.map(span => {
            if (!span) return { x: 0, y: 0 };
            const rect = span.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        });
        centersRef.current = newCenters;
    }, []);

    const setSize = useCallback(() => {
        if (!containerRef.current || !titleRef.current) return;

        const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

        let newFontSize = containerW / (chars.length / 5);
        newFontSize = Math.max(newFontSize, minFontSize);
        newFontSize = Math.min(newFontSize, maxFontSize);

        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);

        requestAnimationFrame(() => {
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();

            if (scale && textRect.height > 0) {
                const yRatio = containerH / textRect.height;
                setScaleY(yRatio);
                setLineHeight(yRatio);
            }
            updateCenters();
        });
    }, [chars.length, minFontSize, scale, updateCenters]);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: '${fontFamily}';
                src: url('${fontUrl}');
                font-style: normal;
            }
            .stroke span {
                position: relative;
                color: ${textColor};
            }
            .stroke span::after {
                content: attr(data-char);
                position: absolute;
                left: 0;
                top: 0;
                color: transparent;
                z-index: -1;
                -webkit-text-stroke-width: ${strokeWidth}px;
                -webkit-text-stroke-color: ${strokeColor};
            }
        `;
        style.setAttribute('data-text-pressure', 'true');
        document.head.appendChild(style);

        const timer = setTimeout(() => {
            setFontLoaded(true);
            updateCenters();
        }, 500);

        return () => {
            document.querySelectorAll('style[data-text-pressure="true"]').forEach(el => el.remove());
            clearTimeout(timer);
        };
    }, [fontFamily, fontUrl, textColor, strokeColor, strokeWidth, updateCenters]);

    useEffect(() => {
        let throttleTimeout: NodeJS.Timeout | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            if (throttleTimeout) return; // Skip if throttled

            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;

            // Throttle to max 20fps for mouse tracking
            throttleTimeout = setTimeout(() => {
                throttleTimeout = null;
            }, 50);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (throttleTimeout) return; // Skip if throttled

            const t = e.touches[0];
            cursorRef.current.x = t.clientX;
            cursorRef.current.y = t.clientY;

            throttleTimeout = setTimeout(() => {
                throttleTimeout = null;
            }, 50);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('resize', setSize);

        setSize();

        if (containerRef.current) {
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = left + width / 2;
            mouseRef.current.y = top + height / 2;
            cursorRef.current.x = mouseRef.current.x;
            cursorRef.current.y = mouseRef.current.y;
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', setSize);
        };
    }, [setSize]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const titleWidthRef = useRef(0);

    const updateCachedMeasures = useCallback(() => {
        if (titleRef.current) {
            titleWidthRef.current = titleRef.current.getBoundingClientRect().width;
        }
        updateCenters();
    }, [updateCenters]);

    useEffect(() => {
        window.addEventListener('resize', updateCachedMeasures);
        updateCachedMeasures();
        return () => window.removeEventListener('resize', updateCachedMeasures);
    }, [updateCachedMeasures]);

    const { isLowPowerMode } = usePerformance();

    useEffect(() => {
        if (!isVisible || isLowPowerMode) {
            // If in low power mode, we just set a default state and don't animate
            if (isLowPowerMode && titleRef.current) {
                spansRef.current.forEach((span) => {
                    if (span) {
                        span.style.fontVariationSettings = `'wght' ${400}, 'wdth' ${100}, 'ital' 0`;
                        span.style.opacity = '1';
                    }
                });
            }
            return;
        }

        let rafId: number;
        let lastFrameTime = 0;
        const targetFPS = 30; // Throttle to 30fps to prevent main thread blocking
        const frameInterval = 1000 / targetFPS;

        const animate = (timestamp: number) => {
            // Idle check: if mouse hasn't moved significantly, skip heavy updates
            // (We keep this idle check as it's very effective)
            const dx = Math.abs(cursorRef.current.x - mouseRef.current.x);
            const dy = Math.abs(cursorRef.current.y - mouseRef.current.y);

            if (dx < 0.1 && dy < 0.1) {
                rafId = requestAnimationFrame(animate);
                return;
            }

            // Throttle FPS
            const deltaTime = timestamp - lastFrameTime;
            if (deltaTime < frameInterval) {
                rafId = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = timestamp - (deltaTime % frameInterval);

            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

            if (titleRef.current) {
                // Modified: Reduced influence radius to make it react only when close
                const maxDist = 200;

                spansRef.current.forEach((span, i) => {
                    const charCenter = centersRef.current[i];
                    if (!span || !charCenter) return;

                    const d = dist(mouseRef.current, charCenter);

                    const getAttr = (distance: number, minVal: number, maxVal: number) => {
                        const val = maxVal - Math.abs((maxVal * distance) / maxDist);
                        return Math.max(minVal, val + minVal);
                    };

                    const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
                    const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
                    const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : '0';
                    const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : '1';

                    span.style.opacity = alphaVal;
                    span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
                });
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [isVisible, width, weight, italic, alpha, isLowPowerMode]);

    const titleStyle: React.CSSProperties = {
        fontFamily: fontFamily,
        fontSize: fontSize + 'px',
        lineHeight: lineHeight,
        transform: `scale(1, ${scaleY})`,
        transformOrigin: 'center top',
        margin: 0,
        fontWeight: 100,
        color: stroke ? undefined : textColor,
        textTransform: 'uppercase',
        textAlign: 'center',
        opacity: fontLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-transparent flex items-center justify-center ${className}`}
        >
            <h1
                ref={titleRef}
                className={`${flex ? 'flex justify-between' : 'flex justify-center'} ${stroke ? 'stroke' : ''} w-full`}
                style={titleStyle}
            >
                {chars.map((char, i) => (
                    <span
                        key={i}
                        ref={el => { spansRef.current[i] = el; }}
                        data-char={char}
                        className="inline-block"
                        style={{ willChange: 'font-variation-settings, opacity' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </h1>
        </div>
    );
}
