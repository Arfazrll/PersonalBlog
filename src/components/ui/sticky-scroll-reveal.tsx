"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
    label?: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div className="relative group">
      {/* Decorative Corner Accents - Inset to prevent clipping */}
      <div className="absolute top-1 left-1 w-12 h-12 border-t border-l border-primary/20 rounded-tl-[2rem] pointer-events-none group-hover:border-primary/40 transition-colors z-20" />
      <div className="absolute bottom-1 right-1 w-12 h-12 border-b border-r border-primary/20 rounded-br-[2rem] pointer-events-none group-hover:border-primary/40 transition-colors z-20" />

      <motion.div
        className="relative flex h-[35rem] justify-center lg:justify-between space-x-0 lg:space-x-10 overflow-y-auto no-scrollbar rounded-[2.5rem] p-6 md:p-12 bg-transparent transition-all duration-700"
        ref={ref}
      >
        {/* Left Content Side */}
        <div className="relative flex items-start px-2 md:px-6 w-full lg:w-3/5">
          {/* Vertical Timeline Track */}
          <div className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block">
            <motion.div
              className="w-1 h-8 -ml-[1.5px] rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
              animate={{ y: activeCard * 120 }} // Approximate visual sync
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>

          <div className="max-w-2xl py-10 md:pl-8">
            {content.map((item, index) => (
              <div key={item.title + index} className="py-24 first:pt-0 last:pb-20">
                <AnimatePresence mode="wait">
                  {item.label && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeCard === index ? 1 : 0.2,
                        x: 0
                      }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <span className="w-4 h-[1px] bg-primary/40" />
                      <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">
                        {item.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.15,
                    y: activeCard === index ? 0 : 5,
                    scale: activeCard === index ? 1 : 0.98,
                    x: activeCard === index ? 0 : -5,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter uppercase italic overflow-visible leading-[0.85] select-none"
                >
                  {item.title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.1 }}
                  className="mt-8 relative"
                >
                  {/* Decorative Quote-like bar */}
                  <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-primary/10 rounded-full" />
                  <p className="text-base md:text-lg max-w-sm text-muted-foreground leading-relaxed font-medium pl-2">
                    {item.description}
                  </p>
                </motion.div>

                {/* Mobile Content Display - Visible only on small screens */}
                <div className="mt-8 lg:hidden rounded-2xl overflow-hidden bg-card/40 border border-border/40 p-1">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sticky Side (Desktop) */}
        <div className="sticky top-0 hidden lg:flex h-full items-center justify-center w-2/5">
          <div
            className={cn(
              "h-[24rem] w-full overflow-hidden rounded-[2.5rem] bg-card/40 backdrop-blur-2xl border border-white/10 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.02]",
              contentClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(10px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="w-full h-full"
              >
                {content[activeCard].content ?? null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Indicator Background Dots (Optional for flair) */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] blur-3xl -z-10" />
        </div>
      </motion.div>
    </div>
  );
};
