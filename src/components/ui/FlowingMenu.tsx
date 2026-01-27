import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface MenuItemData {
    link: string; // Used as key/id for filtering
    text: string;
    image: string;
    action?: (id: string) => void;
}

interface FlowingMenuProps {
    items?: MenuItemData[];
    speed?: number; // Duration for one loop (seconds)
    activeId?: string;
}

interface MenuItemProps extends MenuItemData {
    speed: number;
    isFirst: boolean;
    isActive: boolean;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
    items = [],
    speed = 20, // Slower default for elegance
    activeId
}) => {
    return (
        <div className="w-full h-full overflow-hidden select-none cursor-pointer">
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        speed={speed}
                        isFirst={idx === 0}
                        isActive={activeId === item.link}
                    />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({
    link,
    text,
    image,
    speed,
    action,
    isFirst,
    isActive
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [repetitions, setRepetitions] = useState(4);

    const animationDefaults = { duration: 0.6, ease: 'expo.out' };

    // Calculate repetition count based on viewport
    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
            if (!marqueeContent) return;

            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;

            if (contentWidth > 0) {
                // Ensure enough copies to fill screen + buffer
                const needed = Math.ceil(viewportWidth / contentWidth) + 2;
                setRepetitions(Math.max(4, needed));
            }
        };

        calculateRepetitions();
        // Use resize observer for robustness
        const resizeObserver = new ResizeObserver(calculateRepetitions);
        if (itemRef.current) resizeObserver.observe(itemRef.current);

        window.addEventListener('resize', calculateRepetitions);
        return () => {
            window.removeEventListener('resize', calculateRepetitions);
            resizeObserver.disconnect();
        };
    }, [text, image]);

    // Setup Marquee Animation
    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
            if (!marqueeContent) return;

            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) animationRef.current.kill();

            // GSAP Infinite Loop
            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1
            });
        };

        // Small delay to ensure DOM layout
        const timer = setTimeout(setupMarquee, 100);
        return () => {
            clearTimeout(timer);
            if (animationRef.current) animationRef.current.kill();
        };
    }, [text, image, repetitions, speed]);

    const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
        const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    const handleClick = () => {
        if (action) action(link);
    };

    return (
        <div
            className={cn(
                "flex-1 relative overflow-hidden text-center transition-colors group border-white/5",
                isFirst ? "border-t-0" : "border-t",
                isActive ? "bg-primary/5" : "hover:bg-white/5"
            )}
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Default State (Static Text) */}
            <div
                className={cn(
                    "flex items-center justify-center h-24 md:h-32 relative uppercase font-black text-3xl md:text-5xl lg:text-7xl transition-colors duration-300",
                    isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                )}
            >
                {text}
                {isActive && <motion.div layoutId="activeDot" className="w-3 h-3 bg-primary rounded-full ml-4" />}
            </div>

            {/* Hover State (Marquee Image) */}
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
                ref={marqueeRef}
            >
                <div
                    className="absolute inset-0 z-0 bg-background" // Ensure background covers underlying text
                />
                <div className="h-full w-fit flex relative z-10" ref={marqueeInnerRef}>
                    {[...Array(repetitions)].map((_, idx) => (
                        <div className="marquee-part flex items-center flex-shrink-0" key={idx}>
                            <span className="whitespace-nowrap uppercase font-black text-3xl md:text-5xl lg:text-7xl leading-[1] px-8 text-foreground">
                                {text}
                            </span>
                            <div
                                className="w-32 h-12 md:w-64 md:h-20 mx-4 rounded-full bg-cover bg-center border border-white/20 transition-all duration-500 overflow-hidden relative"
                                style={{
                                    background: image.includes('gradient') ? image : `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;
