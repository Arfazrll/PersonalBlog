"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Maximize2,
  Minimize2,
  Database,
  Code2,
  Brain,
  MessageSquare,
  Trophy,
  ArrowRight,
  Clock,
  Layout,
  Users,
  TrendingUp,
  Star,
  Shield,
  Rocket,
  Terminal,
  Feather,
  FileCode,
  Cat,
  Tag,
  Layers,
  Calendar,
  Link,
  Flame,
  Fingerprint,
  Book,
  GraduationCap
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useIsInStack } from './showcase-stack';

const KAGGLE_USER = "Arfazrll";

// --- Achievements (Circular Tokens) ---
const BADGE_LIST = [
  { icon: Shield, color: "#20beff", bg: "bg-[#20beff]" },
  { icon: Rocket, color: "#4ade80", bg: "bg-[#4ade80]" },
  { icon: Users, color: "#4ade80", bg: "bg-[#4ade80]" },
  { icon: Activity, color: "#4ade80", bg: "bg-[#4ade80]" },
  { icon: Terminal, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Code2, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Feather, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: FileCode, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Cat, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: MessageSquare, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Tag, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Brain, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Layers, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Database, color: "#fb923c", bg: "bg-[#fb923c]" },
  { icon: Tag, color: "#fb923c", bg: "bg-[#fb923c]" },
  { icon: Brain, color: "#a855f7", bg: "bg-[#a855f7]" },
  { icon: Flame, color: "#facc15", bg: "bg-[#facc15]" },
  { icon: Star, bg: "bg-[#fb923c]", label: "Dataset Expert" },
  { icon: Layout, bg: "bg-[#20beff]", label: "Notebooks Master" },
  { icon: Users, bg: "bg-[#a855f7]", label: "Discussion Grandmaster" },
  { icon: Database, bg: "bg-[#4ade80]", label: "Competitions Expert" },
  { icon: Activity, bg: "bg-[#f43f5e]", label: "Ranked #124" },
  { icon: TrendingUp, bg: "bg-white", label: "Top 1%" }
];

const Counter = ({ value, duration = 1.5, trigger = true }: { value: string | number, duration?: number, trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const targetValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) || 0 : value;

  useEffect(() => {
    if (isInView && trigger && targetValue > 0) {
      const controls = animate(0, targetValue, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, trigger, targetValue, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {typeof value === 'string' && value.includes('+') ? '+' : ''}
    </span>
  );
};

export const KaggleShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const lenis = useLenis();

  // Scroll locking logic
  useEffect(() => {
    if (isExpanded) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isExpanded, lenis]);

  const [data, setData] = useState<any>({
    stats: { datasets: 0, notebooks: 0, models: 0, competitions: 0, totalContributions: 0 },
    datasets: [],
    models: [],
    notebooks: [],
    competitions: [],
    overview: [],
    activity: []
  });

  const springTransition = { type: "spring", stiffness: 300, damping: 30 };

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kaggle-stats');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch Kaggle stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      if (dateStr.includes('ago')) return dateStr;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Recent";
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return "Recent";
    }
  };

  if (!mounted) return null;

  return (
    <section id='kaggle-stats' className='w-full max-w-[1700px] mx-auto px-6 pt-10 pb-24 md:pt-14 md:pb-32'>
      <motion.div
        layout
        transition={springTransition}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "relative bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-700",
          isExpanded ? "p-6 md:p-12" : "p-8 md:p-10 cursor-pointer group/master"
        )}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <motion.button
          layout
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-8 right-8 z-50 p-4 bg-black dark:bg-[#20beff] text-white dark:text-black rounded-full shadow-2xl"
        >
          {isExpanded ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
        </motion.button>

        <motion.div layout className='flex flex-col md:flex-row items-start justify-between w-full gap-8 relative z-10'>
          <motion.div layout className="space-y-6 max-w-2xl">
            <motion.div layout className="flex items-center gap-3 text-[#20beff]">
              <Activity className="w-8 h-8" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">Kaggle Intelligence</span>
            </motion.div>
            <motion.h2 layout className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9em] text-black dark:text-white">
              Verified Kaggle <br />
              <span className="flex items-center gap-2">
                profile <span className="text-[#20beff]">In-Production.</span>
              </span>
            </motion.h2>
            <motion.div layout className='flex flex-row gap-8 items-center'>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#20beff] tabular-nums tracking-tighter">
                  <Counter value={data.stats.totalContributions} trigger={!loading} />
                </span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Contributions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#20beff] tabular-nums tracking-tighter">
                  <Counter value={data.stats.datasets} trigger={!loading} />
                </span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Datasets</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#20beff] tabular-nums tracking-tighter">
                  <Counter value={data.stats.notebooks} trigger={!loading} />
                </span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Notebooks</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.p layout className='max-w-sm font-semibold text-lg text-black/50 dark:text-white/40 leading-relaxed pt-12 md:pt-20'>
            Authenticated data retrieved directly from the Kaggle Public API. Complete inventory of technical assets.
          </motion.p>
        </motion.div>
      </motion.div>

      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] bg-white/70 dark:bg-black/80 backdrop-blur-md overflow-y-auto"
              onClick={() => setIsExpanded(false)}
              data-lenis-prevent
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={springTransition}
                className="relative w-full max-w-[1600px] mx-auto my-10 px-4 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-[3rem] shadow-2xl p-6 md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-8 right-8 z-50 p-4 bg-black dark:bg-[#20beff] text-white dark:text-black rounded-full shadow-2xl"
                >
                  <Minimize2 size={24} />
                </motion.button>

                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-8 mb-10'>
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center gap-3 text-[#20beff]">
                      <Activity className="w-8 h-8" />
                      <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">Kaggle Intelligence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9em] text-black dark:text-white">
                      Verified Kaggle <br />
                      <span className="flex items-center gap-2">profile <span className="text-[#20beff]">In-Production.</span></span>
                    </h2>
                  </div>
                </div>

                <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4", loading ? "opacity-30 blur-sm" : "opacity-100 blur-0")}>
                  <div className="lg:col-span-2 relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-8">
                      <h3 className="bg-[#20beff] text-black px-8 py-3 rounded-full text-xl font-black -rotate-1 shadow-lg w-fit">Technical Inventory</h3>
                      <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-hide pt-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(data.overview || []).map((item: any, i: number) => (
                            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/5 flex flex-col gap-2 group/item">
                              <div className="flex items-center justify-between">
                                <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded", item.category === "Dataset" ? "bg-[#fb923c]/20 text-[#fb923c]" : "bg-[#a855f7]/20 text-[#a855f7]")}>{item.category}</span>
                                <span className="text-[10px] opacity-30 font-bold">{formatDate(item.updated)}</span>
                              </div>
                              <h4 className="text-sm font-bold truncate">{item.title}</h4>
                              <div className="flex items-center gap-4 mt-1 opacity-40 text-[9px] font-bold">
                                <div className="flex items-center gap-1"><Star size={10} /> {item.votes} Votes</div>
                                <div className="flex items-center gap-1"><Clock size={10} /> {item.updated}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-12 pt-2">
                      <div className="flex flex-col items-center gap-2"><h3 className="bg-white text-black px-10 py-3 rounded-full text-xl font-black rotate-2 shadow-xl">Achievements</h3></div>
                      <div className="flex flex-wrap justify-center gap-3 max-w-[280px] mx-auto">
                        {(BADGE_LIST || []).map((badge, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.2, y: -5, zIndex: 50 }} className="group/badge relative">
                            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md", badge.bg)}><badge.icon size={16} className="text-black/80" /></div>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-[10px] font-black uppercase text-center opacity-20 tracking-widest mt-auto">Verified Kaggle Tokens</p>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-6">
                      <div className="flex flex-col items-start gap-2">
                        <p className="text-black/30 dark:text-white/20 text-[10px] font-black uppercase tracking-widest -rotate-2 ml-4">Dataset Repository</p>
                        <h3 className="bg-white text-black px-10 py-3 rounded-full text-xl font-black -rotate-2 shadow-xl">Your Datasets ({data.stats.datasets})</h3>
                      </div>
                      <div className="flex-1 pt-1 overflow-y-auto max-h-[180px] scrollbar-hide space-y-3">
                        {(data.datasets || []).map((d: any, i: number) => (
                          <div key={i} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#fb923c]/50 transition-all">
                            <h4 className="text-[11px] font-black uppercase tracking-tight truncate">{d.title}</h4>
                            <div className="flex items-center gap-4 mt-2 opacity-50 text-[9px] font-bold"><span>{d.size}</span><span>Usability {d.usability}</span><span className="text-[#fb923c]">{d.votes} Votes</span></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10 overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-8">
                      <h3 className="bg-white text-black px-10 py-3 rounded-full text-xl font-black shadow-xl">Recent Activity</h3>
                      <div className="space-y-6 pt-4">
                        {(data.activity || []).slice(0, 4).map((act: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 group/item">
                            <div className="p-2.5 rounded-full bg-[#20beff]/10 text-[#20beff]"><TrendingUp size={14} /></div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-3"><span className="text-[10px] font-black uppercase tracking-wider text-[#20beff]">{act.type}</span><span className="text-[9px] opacity-30 font-bold">{act.time}</span></div>
                              <p className="text-[11px] font-bold truncate max-w-[180px] group-hover/item:text-[#20beff] transition-colors">{act.repo}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10 overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-8">
                      <h3 className="bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-full text-xl font-black shadow-xl">Your Competitions ({data.stats.competitions})</h3>
                      <div className="flex-1 overflow-y-auto max-h-[240px] pr-1 scrollbar-hide space-y-4 pt-0">
                        {(data.competitions || []).map((comp: any, i: number) => (
                          <div key={i} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 group/comp">
                            <div className="flex items-center justify-between mb-1"><span className="text-[9px] font-black uppercase tracking-widest text-[#20beff]">{comp.type}</span><span className="text-[9px] opacity-30 font-bold">{comp.time}</span></div>
                            <h4 className="text-[11px] font-black uppercase tracking-tight leading-tight group-hover/comp:text-[#20beff] transition-colors">{comp.title}</h4>
                            <p className="text-[9px] font-medium opacity-50 mt-1 line-clamp-1">{comp.msg}</p>
                            <div className="flex items-center gap-2 mt-2 opacity-30 text-[8px] font-bold"><Users size={10} /> {comp.teams}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default KaggleShowcase;
