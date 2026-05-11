import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Define the type for individual logo props
interface Logo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

// Define the props for the main component
interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: 'normal' | 'slow' | 'fast';
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component.
 * It pauses on hover and uses shadcn/ui theme variables for styling.
 */
const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = 'normal', className, ...props }, ref) => {
    // Map speed prop to animation duration
    const durationMap = {
      normal: 40,
      slow: 80,
      fast: 20,
    };
    const animationDuration = durationMap[speed];

    return (
      <section
        ref={ref}
        aria-label={title}
        className={cn(
          'w-full bg-background/50 backdrop-blur-sm text-foreground rounded-[2.5rem] border border-black/5 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-500',
          className
        )}
        {...props}
      >
        {/* Header Section */}
        <div className="p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 pb-10 border-b border-black/5 dark:border-white/10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9em] text-balance">
              {title}
            </h2>
            <p className="text-lg md:text-xl font-semibold text-muted-foreground self-start lg:self-end text-balance leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Marquee Section */}
        <div
          className="w-full overflow-hidden pb-12"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <motion.div 
            className="flex w-max items-center gap-6 py-8 pr-6 hover:[animation-play-state:paused] cursor-pointer" 
            animate={{
              x: [0, -50 + "%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: animationDuration,
                ease: "linear",
              },
            }}
          >
            {/* Render logos twice to create a seamless loop */}
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="group relative h-48 w-72 shrink-0 flex items-center justify-center rounded-3xl bg-secondary/30 dark:bg-zinc-900/50 overflow-hidden border border-black/5 dark:border-white/5 transition-transform duration-500 hover:scale-[1.02]"
              >
                {/* Gradient background revealed on hover */}
                <div
                  style={{
                    '--from': logo.gradient.from,
                    '--via': logo.gradient.via,
                    '--to': logo.gradient.to,
                  } as React.CSSProperties}
                  className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
                />
                
                {/* Image overlay to ensure readability */}
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Photo Image */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

MarqueeLogoScroller.displayName = 'MarqueeLogoScroller';

export { MarqueeLogoScroller };
