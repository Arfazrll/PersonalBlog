"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import gsap from "gsap";

const CATEGORIES = [
  {
    id: "01",
    title: "Applied AI",
    fullTitle: "Intelligent Systems & Applied AI",
    description: "Engineering intelligent agents and neural architectures for systemic problem solving.",
    filterCategories: ['ai']
  },
  {
    id: "02",
    title: "Architecture",
    fullTitle: "Software Architecture & Systems Engineering",
    description: "Designing resilient, distributed systems with a focus on scalability and high-availability.",
    filterCategories: ['software']
  },
  {
    id: "03",
    title: "Infrastructure",
    fullTitle: "Infrastructure & Platform Engineering",
    description: "Orchestrating cloud-native foundations and high-performance delivery pipelines.",
    filterCategories: ['devops', 'other', 'data']
  }
];

const AUTO_PLAY_DURATION = 8000; // 8 seconds as requested

const ProgressBar = ({ duration, activeIndex }: { duration: number, activeIndex: number }) => {
  const lineRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (lineRef.current) {
      // Kill any existing animations on this element
      gsap.killTweensOf(lineRef.current);
      
      // Animate from 0 to 1
      gsap.fromTo(lineRef.current, 
        { scaleY: 0, opacity: 0 }, 
        { 
          scaleY: 1, 
          opacity: 1, 
          duration: duration / 1000, 
          ease: "none",
          force3D: true 
        }
      );
    }
  }, [duration, activeIndex]);

  return (
    <div 
      ref={lineRef}
      className="absolute top-0 left-0 bottom-0 w-[2px] bg-primary z-20 origin-top will-change-transform"
    />
  );
};

export const HardSkills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Grouping the skills
  const categorizedSkills = useMemo(() => {
    const groups: Record<string, typeof portfolioData.hardSkills> = {
      '01': [],
      '02': [],
      '03': []
    };

    portfolioData.hardSkills.forEach(skill => {
      const cat = skill.category.toLowerCase();
      if (CATEGORIES[0].filterCategories.includes(cat)) {
        groups['01'].push(skill);
      } else if (CATEGORIES[1].filterCategories.includes(cat)) {
        groups['02'].push(skill);
      } else {
        groups['03'].push(skill);
      }
    });
    return groups;
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % CATEGORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, handleNext]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "10%" : "-10%",
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        y: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-10%" : "10%",
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        y: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.3 }
      }
    }),
  };

  return (
    <section id="hard-skills" className="w-full bg-background py-16 md:py-20 relative overflow-hidden min-h-[850px] lg:min-h-[950px]">
      <div className="w-full max-w-[2000px] px-6 md:px-12 lg:px-16 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: The Sub-Skills Grid (Replaces the Gallery/Image) */}
          <div className="lg:col-span-7 flex flex-col justify-start order-1">
            <div className="relative group/gallery w-full">
              <div 
                className="relative w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-card/5 border border-border/40 shadow-2xl"
                data-lenis-prevent
                style={{ overflowAnchor: 'none' }}
              >

                {/* Background Glow */}
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="wait"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative w-full bg-gradient-to-br from-background via-card/10 to-muted/20"
                  >
                    <div
                      className={cn(
                        "w-full p-4 md:p-6 lg:p-8 custom-scrollbar",
                        activeIndex === 2 ? "h-[550px] lg:h-[650px] overflow-y-auto overscroll-contain block" : "h-auto overflow-hidden"
                      )}
                      onWheel={(e) => {
                        // Secara eksplisit menghentikan event scroll agar tidak tembus ke halaman web utama
                        if (activeIndex === 2) {
                          const target = e.currentTarget;
                          const isAtTop = target.scrollTop === 0;
                          const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;

                          if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
                            e.stopPropagation();
                          } else {
                            e.stopPropagation();
                          }
                        }
                      }}
                    >
                      <div className={cn(
                        "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2",
                        activeIndex === 2 ? "pb-12" : "pb-2"
                      )}>
                        {categorizedSkills[CATEGORIES[activeIndex].id].map((skill, idx) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: idx * 0.03 }}
                            className="p-4 md:p-5 bg-card/40 border border-border/30 hover:border-border/80 rounded-xl transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-start"
                          >
                            <div className="mb-3">
                              <div className="flex justify-between items-start mb-3 gap-2">
                                <h5 className="font-sans font-bold text-sm tracking-tight text-foreground/90 leading-tight">{skill.name}</h5>
                                <span className={cn(
                                  "text-[8px] md:text-[9px] font-sans font-bold px-2 py-1 border rounded uppercase tracking-wider whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
                                  skill.level === 'beginner' && "bg-blue-500/10 border-blue-500/20 text-blue-400",
                                  skill.level === 'intermediate' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                                  skill.level === 'advanced' && "bg-amber-500/10 border-amber-500/20 text-amber-400",
                                  skill.level === 'expert' && "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                                  (!skill.level || (skill.level as string) === 'Exp') && "bg-background/80 border-border/40 text-muted-foreground"
                                )}>
                                  {skill.level || 'Exp'}
                                </span>
                              </div>
                              <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '80%' : '60%' }}
                                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                  className="h-full bg-primary/40 rounded-full"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] md:text-xs font-sans text-muted-foreground/80 leading-relaxed">
                              {skill.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                  {activeIndex === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none z-10"
                    >
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Core Categories List (Vertical Tabs) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:pl-12">
            <div className="space-y-1 mb-10">
              <h2 className="tracking-tighter text-balance text-3xl font-medium md:text-4xl lg:text-5xl text-foreground">
                Core Focus
              </h2>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.3em] block ml-0.5">
                (ARCHITECTURES)
              </span>
            </div>

            <div className="flex flex-col space-y-0">
              {CATEGORIES.map((category, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-border/50 first:border-0",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/60 hover:text-foreground"
                    )}
                  >
                    {/* Active Line Indicator with Progress */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border/20">
                      {isActive && (
                        <ProgressBar duration={AUTO_PLAY_DURATION} activeIndex={activeIndex} />
                      )}
                    </div>

                    <div className="flex-1 pl-4 md:pl-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          "text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-500 font-mono",
                          isActive ? "text-primary" : "text-muted-foreground/40"
                        )}>
                          /{category.id}
                        </span>
                        <h3 className={cn(
                          "text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-all duration-500",
                          isActive ? "scale-105 origin-left" : "scale-100"
                        )}>
                          {category.title.toUpperCase()}
                        </h3>
                      </div>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{ duration: 0.4 }}
                            className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed max-w-sm font-sans"
                          >
                            {category.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardSkills;
