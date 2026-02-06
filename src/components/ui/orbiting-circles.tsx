import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";

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
  const calculatedDuration = duration / speed;

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <div
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
        style={{
          width: '1px',
          height: '1px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transformOrigin: 'center center',
          willChange: 'transform',
          animation: `orbit ${calculatedDuration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
        className="orbit-container"
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
                // Initial distribution
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                transformOrigin: 'center center',
                willChange: 'transform',
                animation: `orbit ${calculatedDuration}s linear infinite ${reverse ? 'normal' : 'reverse'}`, // Counter-rotate to keep icon upright
              }}
              className={cn(
                "flex items-center justify-center rounded-full pointer-events-auto",
                className
              )}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .orbit-container :global(div) {
           /* Ensure inner animations can still work if needed */
        }
      `}</style>
    </div>
  );
}
