"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export default function ImpactSection() {
  const [openCard, setOpenCard] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yLabel = useTransform(scrollYProgress, [0, 1], [100, -150]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [150, -100]);
  const yDesc = useTransform(scrollYProgress, [0, 1], [200, -50]);
  const yCards = useTransform(scrollYProgress, [0, 1], [150, -50]);

  const latestBlogs = portfolioData.blogs.slice(0, 5);

  const styles = [
    { bg: "bg-[#D1FF4D]", text: "text-[#111111]" },
    { bg: "bg-cyan-200", text: "text-[#111111]" },
    { bg: "bg-zinc-800 dark:bg-zinc-900", text: "text-white" },
    { bg: "bg-[#F3E8D6]", text: "text-[#111111]" },
    { bg: "bg-amber-300", text: "text-[#111111]" },
  ];

  const impactCards = latestBlogs.map((blog, idx) => ({
    id: blog.id,
    metric: `0${idx + 1}`,
    title: blog.title,
    description: blog.excerpt,
    image: blog.image,
    bg: styles[idx].bg,
    text: styles[idx].text,
    isFeature: idx === 0,
    slug: blog.slug,
    category: blog.category
  }));

  return (
    <section ref={containerRef} className="relative w-full py-12 sm:py-24 md:py-32 overflow-hidden">
      {/* Smooth transition from the solid background of the gallery above to the transparent background of this section */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-background to-transparent pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="flex items-start justify-between gap-6 mb-12 sm:mb-20">
          <div className="max-w-[720px]">
            <motion.p style={{ y: yLabel }} className="text-[11px] tracking-[3px] uppercase font-mono font-bold text-cyan-400 mb-6">
              Knowledge Base
            </motion.p>
            <motion.h2 style={{ y: yTitle }} className="text-5xl md:text-7xl lg:text-[80px] leading-[1.05] font-black tracking-tighter uppercase mb-8">
              The Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1FF4D] via-cyan-300 to-amber-300">Process.</span>
            </motion.h2>
            <motion.p style={{ y: yDesc }} className="text-[15px] sm:text-[16px] text-muted-foreground/80 leading-[1.7] max-w-[560px] font-medium">
              Documenting the journey from concept to deployment. Read the latest thoughts on AI, engineering, and digital architecture.
            </motion.p>
          </div>
        </div>

        <motion.div style={{ y: yCards }} className="p-4 sm:p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-2xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-0 justify-center">
            {impactCards.map((card, idx) => {
            const isOpen = openCard === idx;
            const closedHeights = [280, 310, 340, 370, 400];
            const targetHeight = isOpen ? 460 : closedHeights[idx];

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setOpenCard(idx)}
                onFocus={() => setOpenCard(idx)}
                onClick={() => setOpenCard(idx)}
                tabIndex={0}
                animate={{ flex: isOpen ? 4.8 : 1.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className={`${card.bg} ${card.text} relative overflow-hidden border border-black/10 dark:border-white/5 h-[360px] md:h-auto cursor-pointer rounded-2xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl`}
              >
                <motion.div
                  animate={{ height: typeof window !== 'undefined' && window.innerWidth >= 768 ? targetHeight : 400 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="h-full"
                >
                  {isOpen ? (
                    <div className="h-full p-6 sm:p-8 md:p-10 flex flex-col">
                      <div className="max-w-[300px]">
                        <p className="text-[10px] tracking-[1.3px] uppercase font-bold opacity-80">
                          {card.category.replace("-", " ")}
                        </p>
                        <h3 className="mt-2 text-[22px] sm:text-[26px] md:text-[30px] leading-[1.08] font-semibold">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.6] opacity-90 line-clamp-3">
                          {card.description}
                        </p>
                        <Link href={`/blog/${card.slug}`}>
                          <button
                            type="button"
                            className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[1.4px] uppercase font-bold hover:underline"
                          >
                            Read Article <ArrowRight size={14} />
                          </button>
                        </Link>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] gap-4 flex-1 items-end">
                        <div className="self-start sm:self-end mb-2">
                          <p className="text-[56px] sm:text-[62px] md:text-[72px] font-bold leading-none">
                            {card.metric}
                          </p>
                        </div>

                        <div
                          className="relative w-full rounded-xl overflow-hidden border border-black/10 h-[140px] sm:h-[160px] md:h-[180px]"
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full p-5 sm:p-6 md:p-6 flex flex-col justify-between">
                      <div className="flex-1 min-h-0 w-full relative opacity-0 md:opacity-100">
                        <div className="absolute inset-0 flex items-end justify-start">
                          <span
                            className="text-sm font-bold uppercase tracking-wider leading-relaxed text-left"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            {card.title}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0">
                        <p className="text-[28px] sm:text-[32px] md:text-[36px] font-bold leading-none">
                          {card.metric}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
            })}
          </div>
        </motion.div>

        <div className="mt-16 flex items-center justify-center">
          <MagneticButton 
            href="/blog" 
            variant="outline"
            className="px-8 sm:px-12 py-4 sm:py-5 border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-md hover:border-white/20"
          >
            <span className="text-[12px] sm:text-[13px] tracking-[2px] uppercase font-bold relative z-10">
              Access the Complete Knowledge Base
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
