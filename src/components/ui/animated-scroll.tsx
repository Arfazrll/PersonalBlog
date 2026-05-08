'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';

const pages = [
  {
    leftBgImage: '/feature/feature1.jpg',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'Intelligence Systems',
      description: 'Specializing in architecting autonomous systems and intelligence-driven platforms. From fine-tuning LLMs and engineering RAG architectures to developing deep learning models for Computer Vision and NLP.',
      skills: ["LLM Fine-tuning", "RAG Systems", "Deep Learning", "Computer Vision", "MLOps", "Data Analytics"],
      hoverColor: "bg-red-600/10"
    },
  },
  {
    leftBgImage: null,
    rightBgImage: '/feature/feature2.jpg',
    leftContent: {
      heading: 'Scalable Systems',
      description: 'Building the foundation for resilient digital ecosystems. I engineer full-stack solutions with a focus on system architecture, modular design, and high-performance backends using Go, Next.js, and Python.',
      skills: ["System Architecture", "Full-Stack Dev", "Docker & K8s", "API Design", "DevOps", "Software Design"],
      hoverColor: "bg-blue-600/10"
    },
    rightContent: null,
  },
  {
    leftBgImage: '/feature/feature3.jpg',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: 'Strategic Innovation',
      description: 'Translating complex technical requirements into impactful business solutions through systemic thinking, strategic leadership, and clear communication within cross-functional teams.',
      skills: ["Systemic Thinking", "Leadership", "Problem Solving", "Teamwork", "Communication", "Research"],
      hoverColor: "bg-purple-600/10"
    },
  },
  {
    isBridge: true,
    heading: 'Discover my latest work and creative solutions that bring ideas to life',
    subheading: 'SCROLL TO EXPLORE',
  }
];

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 30, 
    damping: 30,   
    mass: 1,      
    restDelta: 0.001 
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalPages = pages.length;
    const step = 1 / totalPages;
    const index = Math.min(Math.floor(latest / step) + 1, totalPages);
    if (currentPage !== index) setCurrentPage(index);
  });

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-background dark:bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {pages.map((page, i) => {
          if ('isBridge' in page) {
            return (
              <BridgeSlide 
                key={i} 
                page={page} 
                isActive={currentPage === i + 1} 
                scrollProgress={smoothProgress} 
                index={i} 
              />
            );
          }
          return (
            <PageSlide 
                key={i} 
                page={page} 
                isActive={currentPage === i + 1} 
                scrollProgress={smoothProgress} 
                index={i} 
            />
          );
        })}

        {/* Global Progress Line */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-12 items-center">
            {pages.map((_, i) => (
                <div key={i} className="relative h-12 flex items-center">
                    <motion.div 
                        animate={{ 
                            height: currentPage === i + 1 ? 60 : 10,
                            backgroundColor: currentPage === i + 1 ? 'var(--primary)' : 'rgba(120,120,120,0.1)',
                        }}
                        className="w-[1px] rounded-full transition-all duration-700" 
                    />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function PageSlide({ page, isActive, scrollProgress, index }: { page: any, isActive: boolean, scrollProgress: any, index: number }) {
    const leftIsImage = !!page.leftBgImage;
    const rightIsImage = !!page.rightBgImage;

    const totalPages = pages.length;
    const step = 1 / totalPages;
    const base = index * step;
    
    const enterStart = index === 0 ? -0.1 : base - step/4;
    const enterEnd = index === 0 ? -0.05 : base + step/4;
    const exitStart = base + step * 0.75;
    const exitEnd = base + step * 1.25;

    const leftY = useTransform(
        scrollProgress, 
        [enterStart, enterEnd, exitStart, exitEnd], 
        [leftIsImage ? "-100%" : "100%", "0%", "0%", leftIsImage ? "-100%" : "100%"]
    );
    
    const rightY = useTransform(
        scrollProgress, 
        [enterStart, enterEnd, exitStart, exitEnd], 
        [rightIsImage ? "-100%" : "100%", "0%", "0%", rightIsImage ? "-100%" : "100%"]
    );

    const zIndex = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [10, 20, 20, 10]
    );

    return (
        <motion.div style={{ zIndex }} className="absolute inset-0 overflow-hidden">
            <motion.div
                style={{ y: leftY }}
                className="absolute top-0 left-0 w-1/2 h-full overflow-hidden bg-background dark:bg-black"
            >
                {page.leftBgImage ? (
                    <BlendedVisual src={page.leftBgImage} side="left" />
                ) : (
                    <div className="w-full h-full flex items-center justify-start p-12 md:p-24 lg:p-32 xl:p-40 relative group">
                        <motion.div 
                            className={cn("absolute inset-0 z-0", page.leftContent?.hoverColor || "bg-primary/5")}
                            initial={{ height: 0 }}
                            whileHover={{ height: '100%' }}
                            transition={{ duration: 0.4 }}
                        />
                        {page.leftContent && <EditorialContent content={page.leftContent} index={index} />}
                    </div>
                )}
            </motion.div>

            <motion.div
                style={{ y: rightY }}
                className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden bg-background dark:bg-black"
            >
                {page.rightBgImage ? (
                    <BlendedVisual src={page.rightBgImage} side="right" />
                ) : (
                    <div className="w-full h-full flex items-center justify-start p-12 md:p-24 lg:p-32 xl:p-40 relative group">
                         <motion.div 
                            className={cn("absolute inset-0 z-0", page.rightContent?.hoverColor || "bg-primary/5")}
                            initial={{ height: 0 }}
                            whileHover={{ height: '100%' }}
                            transition={{ duration: 0.4 }}
                        />
                        {page.rightContent && <EditorialContent content={page.rightContent} index={index} />}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

function BridgeSlide({ page, isActive, scrollProgress, index }: { page: any, isActive: boolean, scrollProgress: any, index: number }) {
    const step = 1 / pages.length;
    const base = index * step;
    
    // Adjusted exit to be ZERO-GAP: text stays visible until the very end of the scroll
    const opacity = useTransform(scrollProgress, [base - step/4, base + step/4, 0.98, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [base - step/4, base + step/4, 0.98, 1], [50, 0, 0, -50]);

    return (
        <motion.div 
            style={{ opacity, zIndex: 30 }}
            className="absolute inset-0 bg-background dark:bg-black flex flex-col items-center justify-center p-12 text-center"
        >
            <motion.div style={{ y }} className="space-y-16 max-w-[1200px] w-full px-[5%]">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground dark:text-white leading-[1.1] font-sans">
                    Discover my latest work and creative solutions <br className="hidden md:block" />
                    that bring ideas to life
                </h2>
                <div className="flex flex-col items-center gap-6 opacity-30 pt-10">
                    <span className="text-[11px] font-mono font-bold tracking-[0.5em] uppercase text-foreground dark:text-white">
                        {page.subheading}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-6 h-6 text-foreground dark:text-white" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function BlendedVisual({ src, side }: { src: string, side: 'left' | 'right' }) {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                className="w-full h-full bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition-all duration-1000"
                style={{ backgroundImage: `url(${src})` }}
            />
            <div className={cn(
                "absolute inset-0 pointer-events-none",
                side === 'left' 
                    ? "bg-gradient-to-r from-transparent via-transparent to-background dark:to-black" 
                    : "bg-gradient-to-l from-transparent via-transparent to-background dark:to-black",
            )} />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background dark:from-black dark:via-transparent dark:to-black opacity-40" />
        </div>
    );
}

function EditorialContent({ content, index }: { content: any, index: number }) {
    return (
        <div className="flex flex-col items-start text-left space-y-12 max-w-2xl w-full relative z-10">
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <span className="text-[11px] font-mono font-black tracking-[0.5em] text-primary uppercase opacity-60">
                        FEATURE — 0{index + 1}
                    </span>
                    <div className="h-[1px] w-12 bg-primary/20" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight text-foreground font-sans">
                    {content.heading}
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-tight max-w-lg">
                    {content.description}
                </p>
            </div>
            {content.skills && (
                <div className="flex flex-wrap gap-4 pt-6">
                    {content.skills.map((skill: string) => (
                        <MagneticTag key={skill} text={skill} />
                    ))}
                </div>
            )}
        </div>
    );
}

function MagneticTag({ text }: { text: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.4);
        y.set((e.clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-foreground/40 border border-foreground/10 px-8 py-4 rounded-xl bg-foreground/[0.02] backdrop-blur-xl cursor-pointer hover:border-primary/40 hover:text-primary transition-colors duration-300"
        >
            {text}
        </motion.div>
    );
}
