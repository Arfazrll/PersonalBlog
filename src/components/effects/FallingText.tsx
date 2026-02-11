'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { usePerformance } from '@/hooks/usePerformance';

interface FallingTextProps {
    text?: string;
    highlightWords?: string[];
    trigger?: 'auto' | 'scroll' | 'click' | 'hover';
    backgroundColor?: string;
    wireframes?: boolean;
    gravity?: number;
    mouseConstraintStiffness?: number;
    fontSize?: string;
    fontWeight?: string;
    textColor?: string;
    highlightColor?: string;
}

export default function FallingText({
    text = '',
    highlightWords = [],
    trigger = 'auto',
    backgroundColor = 'transparent',
    wireframes = false,
    gravity = 1,
    mouseConstraintStiffness = 0.2,
    fontSize = '2rem',
    fontWeight = '800',
    textColor = 'hsl(var(--foreground))',
    highlightColor = 'hsl(var(--primary))',
    force = false
}: FallingTextProps & { force?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    const [effectStarted, setEffectStarted] = useState(false);

    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const wordBodiesRef = useRef<Array<{ elem: HTMLElement; body: Matter.Body }>>([]);
    const animationFrameIdRef = useRef<number | null>(null);

    const { isLowPowerMode: isSystemLowPower } = usePerformance();
    const isLowPowerMode = force ? false : isSystemLowPower;

    const createTextHTML = useCallback(() => {
        if (!textRef.current) return;

        const words = text.split(' ');
        const newHTML = words
            .map(word => {
                const isHighlighted = highlightWords.some(hw =>
                    word.toLowerCase().includes(hw.toLowerCase())
                );
                return `<span class="inline-block mx-1 select-none cursor-grab active:cursor-grabbing" style="color: ${isHighlighted ? highlightColor : textColor}; font-weight: ${isHighlighted ? '900' : fontWeight}">${word}</span>`;
            })
            .join(' ');

        textRef.current.innerHTML = newHTML;

        // If low power mode, we don't need to position absolute
        if (isLowPowerMode) {
            const spans = textRef.current.querySelectorAll('span');
            spans.forEach(span => {
                span.style.position = 'static';
                span.style.transform = 'none';
            });
        }
    }, [text, highlightWords, textColor, highlightColor, fontWeight, isLowPowerMode]);

    const cleanup = useCallback(() => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }

        if (renderRef.current) {
            Matter.Render.stop(renderRef.current);
            if (renderRef.current.canvas && canvasContainerRef.current) {
                try {
                    canvasContainerRef.current.removeChild(renderRef.current.canvas);
                } catch (e) { }
            }
            renderRef.current = null;
        }

        if (runnerRef.current && engineRef.current) {
            Matter.Runner.stop(runnerRef.current);
            runnerRef.current = null;
        }

        if (engineRef.current) {
            Matter.World.clear(engineRef.current.world, false);
            Matter.Engine.clear(engineRef.current);
            engineRef.current = null;
        }

        wordBodiesRef.current = [];
    }, []);

    const startPhysics = useCallback(async () => {
        if (!containerRef.current || !canvasContainerRef.current || !textRef.current || isLowPowerMode) return;

        await new Promise(resolve => requestAnimationFrame(resolve));

        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.world.gravity.y = gravity;
        engineRef.current = engine;

        const render = Render.create({
            element: canvasContainerRef.current,
            engine,
            options: {
                width,
                height,
                background: backgroundColor,
                wireframes
            }
        });
        renderRef.current = render;

        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: 'transparent' }
        };

        const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

        const wordSpans = textRef.current.querySelectorAll('span') as NodeListOf<HTMLElement>;
        const containerBounds = containerRef.current.getBoundingClientRect();

        wordBodiesRef.current = Array.from(wordSpans).map(elem => {
            const rect = elem.getBoundingClientRect();

            const x = rect.left - containerBounds.left + rect.width / 2;
            const y = rect.top - containerBounds.top + rect.height / 2;

            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                render: { fillStyle: 'transparent' },
                restitution: 0.8,
                frictionAir: 0.01,
                friction: 0.2
            });

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 5,
                y: 0
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { elem, body };
        });

        wordBodiesRef.current.forEach(({ elem, body }) => {
            elem.style.position = 'absolute';
            elem.style.left = '0';
            elem.style.top = '0';
            elem.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%)`;
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false }
            }
        });
        render.mouse = mouse;

        World.add(engine.world, [
            floor,
            leftWall,
            rightWall,
            ceiling,
            mouseConstraint,
            ...wordBodiesRef.current.map(wb => wb.body)
        ]);

        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        const syncLoop = () => {
            if (!engineRef.current) return;

            wordBodiesRef.current.forEach(({ body, elem }) => {
                const { x, y } = body.position;
                // Use transform-only for performance (prevents layout thrashing)
                elem.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
            });

            animationFrameIdRef.current = requestAnimationFrame(syncLoop);
        };
        syncLoop();
    }, [gravity, backgroundColor, wireframes, mouseConstraintStiffness]);

    const handleTrigger = useCallback(() => {
        if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
            setEffectStarted(true);
        }
    }, [effectStarted, trigger]);

    useEffect(() => {
        createTextHTML();
    }, [createTextHTML]);

    useEffect(() => {
        if (trigger === 'auto') {
            const timer = setTimeout(() => {
                setEffectStarted(true);
            }, 100);
            return () => clearTimeout(timer);
        }

        if (trigger === 'scroll' && containerRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setEffectStarted(entry.isIntersecting);
                },
                { threshold: 0.1 }
            );
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [trigger]);

    useEffect(() => {
        if (effectStarted) {
            startPhysics();
        } else {
            cleanup();
            createTextHTML(); // Reset DOM to initial state when effect stops
        }
        return () => cleanup();
    }, [effectStarted, startPhysics, cleanup, createTextHTML]);

    return (
        <div
            ref={containerRef}
            className="relative z-[1] w-full h-full cursor-pointer text-center overflow-hidden"
            onClick={trigger === 'click' ? handleTrigger : undefined}
            onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
        >
            <div
                ref={textRef}
                className="inline-block leading-relaxed"
                style={{
                    fontSize,
                    lineHeight: 1.4
                }}
            />

            <div
                className="absolute top-0 left-0 z-0 pointer-events-none"
                ref={canvasContainerRef}
            />
        </div>
    );
}
