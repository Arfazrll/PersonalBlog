import React, { useRef, useEffect, useMemo } from 'react';
import { cn } from "@/lib/utils";
import gsap from 'gsap';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  const calculatedDuration = duration / speed;

  useEffect(() => {
    // Wait for client-side to ensure DOM is ready for GSAP
    const ctx = gsap.context(() => {
      if (!ringRef.current) return;

      // Industrial-grade rotation loop
      gsap.to(ringRef.current, {
        rotation: reverse ? -360 : 360,
        duration: calculatedDuration,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      // Synchronized counter-rotation for upright icons
      iconsRef.current.forEach((icon) => {
        if (!icon) return;
        gsap.to(icon, {
          rotation: reverse ? 360 : -360,
          duration: calculatedDuration,
          repeat: -1,
          ease: "none",
          force3D: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [calculatedDuration, reverse]);

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      {...props}
    >
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        ref={ringRef}
        style={{
          width: '1px',
          height: '1px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transformOrigin: 'center center',
          willChange: 'transform'
        }}
      >
        {childrenArray.map((child, index) => {
          const angle = (360 / childrenArray.length) * index;
          return (
            <div
              key={index}
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                position: 'absolute',
                top: '0',
                left: '0',
                // Perfect geometric distribution
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)`,
                transformOrigin: 'center center',
                willChange: 'transform'
              }}
              className={cn(
                "flex items-center justify-center rounded-full pointer-events-auto",
                className
              )}
            >
              <div
                ref={(el) => { iconsRef.current[index] = el; }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform'
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
