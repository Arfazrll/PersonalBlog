"use client";

import { ArrowUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const count = useMotionValue(1);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [count, value, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Testimonial1() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  interface StatItem {
    value: number;
    decimals: number;
    suffix: string;
    label: string;
    href: string;
    cta: string;
  }

  const stats: StatItem[] = [
    {
      value: 3.62,
      decimals: 2,
      suffix: "/4.0",
      label: "Current GPA",
      href: "/resume",
      cta: "View Resume",
    },
    {
      value: 20,
      decimals: 0,
      suffix: "+",
      label: "Projects Completed",
      href: "/projects",
      cta: "View Projects",
    },
    {
      value: 2,
      decimals: 0,
      suffix: " Years",
      label: "Professional Exp",
      href: "/experience",
      cta: "Explore Career",
    },
    {
      value: 34,
      decimals: 0,
      suffix: "+",
      label: "Tech & Tools",
      href: "/skills",
      cta: "See Skills",
    },
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen w-full grid place-content-center py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Community Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#f1efec] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-black dark:text-white px-5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Professional Statistics
          </div>
        </div>

        {/* Main Heading with Refined Block Reveal Animation */}
        <div className="text-center max-w-5xl mx-auto relative text-neutral-900 dark:text-white px-4 space-y-1 md:space-y-2">
          {[
            { text: "Data that speaks. AI that reasons.", color: "#6366f1", delay: 0 },
            { text: "Software that ships.", color: "#10b981", delay: 0.15 },
            { text: "Three disciplines, one engineer", color: "#f59e0b", delay: 0.3 },
            { text: "and the numbers behind the work.", color: "#ef4444", delay: 0.45 }
          ].map((line, i) => (
            <div key={i} className="relative block overflow-hidden py-1.5">
              <motion.h1 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ 
                  delay: line.delay + 0.35, 
                  duration: 0.01 
                }}
                className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter"
              >
                {line.text}
              </motion.h1>
              
              {/* The Refined Revealer Block */}
              <motion.div
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileInView={{ 
                  scaleX: [0, 1, 1, 0],
                  transformOrigin: ["left", "left", "right", "right"]
                }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ 
                  duration: 0.75, 
                  times: [0, 0.45, 0.55, 1],
                  delay: line.delay,
                  ease: [0.85, 0, 0.15, 1] 
                }}
                className="absolute inset-0 z-10"
                style={{ backgroundColor: line.color }}
              />
            </div>
          ))}
        </div>

        {/* Glassmorphic Stats Bar */}
        <div className="sm:flex grid grid-cols-2 gap-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl mt-12 w-full mx-auto px-8 py-10 border rounded-2xl border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow inside the bar */}
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-blue-500/5 blur-[100px] pointer-events-none" />

          {stats.map((stat, index) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="flex-1 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col items-center justify-center relative h-full group">
                {index !== 0 && (
                  <div className="hidden sm:block w-0.5 h-12 border border-dashed border-neutral-200 dark:border-zinc-700 absolute -left-4" />
                )}

                <div className="flex flex-col items-center text-center transition-all duration-300 group-hover:opacity-40">
                  <span className="text-[10px] sm:text-xs font-medium text-neutral-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    {stat.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tighter flex items-baseline">
                    <Counter value={stat.value} decimals={stat.decimals} />
                    <span className="text-lg sm:text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                </div>

                {/* Smoky / Foggy Hover Reveal - Perfected Opacity */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-[-20px] flex items-center justify-center z-20 pointer-events-none"
                    >
                      {/* The 'Smoke' Layer - Solid Center Masking */}
                      <div
                        className="absolute inset-0 bg-white dark:bg-zinc-950 backdrop-blur-[50px]"
                        style={{
                          maskImage: 'radial-gradient(circle, black 45%, transparent 95%)',
                          WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 95%)',
                        }}
                      />

                      <span className="relative text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 drop-shadow-md z-30">
                        {stat.cta}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
