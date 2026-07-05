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
  GraduationCap,
  Moon,
  Check
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useIsInStack } from './showcase-stack';

const KAGGLE_USER = "Arfazrll";

// --- Achievements (Circular Tokens) ---
const ACHIEVEMENT_LIST = [
  { title: "1 Year on Kaggle", desc: "Active on Kaggle for more than 1 year.", date: "JULY 24, 2025", color: "#20beff", icon: Shield },
  { title: "Getting Started Competitor", desc: "Made a submission to a Getting Started competition. Getting Started competitions are the easiest, most approachable competitions on Kaggle used as introductions to the field of machine learning.", date: "JULY 4, 2025", color: "#4ade80", icon: Rocket },
  { title: "Community Competitor", desc: "Made a submission to a Community competition. These competitions are created by other Kagglers including educators, researchers, companies, meetup groups, or hackathon hosts.", date: "DECEMBER 21, 2024", color: "#4ade80", icon: Users },
  { title: "Playground Competitor", desc: "Made a submission to a Playground competition. Playground competitions are a “for fun” type of Kaggle competition that is one step above Getting Started in difficulty. They are great for learning.", date: "MARCH 4, 2026", color: "#4ade80", icon: Activity },
  { title: "Python Coder", desc: "Created a python notebook. Python is one of the most popular general purpose programming languages and has gained widespread use in the machine learning community.", date: "SEPTEMBER 14, 2024", color: "#a855f7", icon: Terminal },
  { title: "R Coder", desc: "Created an R notebook. R is a programming language for statistical computing and data visualization, it has a long history of use in the sciences.", date: "MARCH 1, 2026", color: "#a855f7", icon: Code2 },
  { title: "R Markdown Coder", desc: "Created an R Markdown script. R Markdown allows you to write a traditional code file (in R) and have it render in a form similar to a notebook. This is great for presenting code alongside narrative.", date: "MARCH 1, 2026", color: "#a855f7", icon: Feather },
  { title: "Code Uploader", desc: "Uploaded a notebook. With the import feature you can upload notebook files to Kaggle. This allows you to work on your local machine and upload your work when you are ready to share or submit it.", date: "MARCH 1, 2026", color: "#a855f7", icon: FileCode },
  { title: "Github Coder", desc: "Imported a notebook from Github or linked a notebook to Github. You can import or sync notebooks from Github. When synced each version you save on Kaggle can be committed back to your Github repo.", date: "MARCH 1, 2026", color: "#a855f7", icon: Cat },
  { title: "Colab Coder", desc: "Imported a notebook from Colab or opened a notebook in Colab. You can easily import notebooks from Colab (to share or submit on Kaggle). Likewise you can open any Kaggle notebook in Colab to edit.", date: "MARCH 1, 2026", color: "#a855f7", icon: Link },
  { title: "Code Tagger", desc: "Added tags to a notebook. Tagging a notebook makes it more discoverable across Kaggle.", date: "MARCH 1, 2026", color: "#a855f7", icon: Tag },
  { title: "Code Forker", desc: "Copied a notebook and made changes to it. Copying a notebook (also known as 'forking' a notebook) is a great way to save time, allowing you to quickly build on top of publicly shared work.", date: "MARCH 1, 2026", color: "#a855f7", icon: MessageSquare },
  { title: "Notebook Modeler", desc: "Used a model in a notebook. Pretrained models from the Kaggle Model Hub are powerful tools for taking your work to the next level.", date: "MARCH 4, 2026", color: "#a855f7", icon: Layers },
  { title: "Dataset Creator", desc: "Created a dataset. It’s easy to create a dataset on Kaggle and doing so is a great way to start a data science portfolio, share reproducible research, or work with collaborators on a project.", date: "MARCH 1, 2026", color: "#fb923c", icon: Database },
  { title: "Linked Dataset Creator", desc: "Created a dataset from a link to a remote URL, Github repository, or Google Cloud Storage bucket. This can be much quicker than uploading from your local machine.", date: "MARCH 4, 2026", color: "#fb923c", icon: Link },
  { title: "Dataset Tagger", desc: "Added tags to a dataset. Tagging a dataset makes it more discoverable across Kaggle.", date: "MARCH 1, 2026", color: "#fb923c", icon: Tag },
  { title: "Model Creator", desc: "Created a model. Kaggle Models is a repository of pre-trained models that are deeply integrated with Kaggle's platform, making them easy to use in Kaggle Competitions and Notebooks.", date: "MARCH 3, 2026", color: "#a855f7", icon: Brain },
  { title: "Linked Model Creator", desc: "Created a model from a link to a remote URL, Github repository, or Google Cloud Storage bucket. This can be much quicker than uploading from your local machine.", date: "MARCH 4, 2026", color: "#a855f7", icon: Link },
  { title: "Model Tagger", desc: "Added tags to a model. Tagging a model makes it more discoverable across Kaggle.", date: "MARCH 3, 2026", color: "#a855f7", icon: Tag },
  { title: "Kaggle Community Member", desc: "Joined the Kaggle Community by creating an account. The first step in a great adventure!", date: "JULY 24, 2024", color: "#facc15", icon: Users },
  { title: "Stylish", desc: "Filled out their profile. The Kaggle profile is the best place to show off machine learning achievements. This badge is earned by adding a profile picture, tagline, bio, and pinning an item.", date: "MARCH 1, 2026", color: "#facc15", icon: Users },
  { title: "Collector", desc: "Created a collection. Collections are folders of items you can find inside the 'Your Work' section. They can be used to organize your own files or to keep track of content from across Kaggle.", date: "MARCH 5, 2026", color: "#facc15", icon: Database },
  { title: "Bookmarker", desc: "Bookmarked something on Kaggle. Most things on Kaggle can be bookmarked. You can view your bookmarks in the sidebar or the 'Your Work' section to quickly get back to them.", date: "MARCH 1, 2026", color: "#facc15", icon: Star },
  { title: "Vampire", desc: "Turned on the Kaggle dark theme. You can make this change under settings. Dark mode is a popular alternative color scheme for the site which many people find easier on the eyes.", date: "DECEMBER 11, 2025", color: "#facc15", icon: Moon },
  { title: "Agent of Discord", desc: "Joined the Kaggle Discord and linked your account. Discord is a popular chatroom platform that is more casual than traditional forums. You can join the Kaggle server here: discord.gg/kaggle", date: "MARCH 1, 2026", color: "#facc15", icon: MessageSquare },
  { title: "Learner", desc: "Completed a Kaggle Learn Course. Kaggle courses pare down complex topics to their key practical components, so you gain usable skills in hours instead of weeks.", date: "JULY 4, 2025", color: "#a855f7", icon: GraduationCap },
  { title: "7 Day Login Streak", desc: "Logged in to Kaggle 7 days in a row.", date: "DECEMBER 29, 2024", color: "#20beff", icon: Calendar },
];

const HexagonBadge = ({ color, icon: Icon }: { color: string, icon: any }) => (
  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
    >
      {/* Outer Border */}
      <circle
        cx="50" cy="50" r="48"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
      {/* Inner Fill */}
      <circle
        cx="50" cy="50" r="39"
        fill={color}
      />
    </svg>
    <Icon className="relative z-10 text-white w-[1.1rem] h-[1.1rem]" strokeWidth={2.5} />
  </div>
);

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

const InteractiveBadge = ({
  children,
  className,
  fillColor = "bg-black dark:bg-[#20beff]",
  hoverTextColor = "group-hover:text-white dark:group-hover:text-black",
  rotation = 0
}: {
  children: React.ReactNode,
  className?: string,
  fillColor?: string,
  hoverTextColor?: string,
  rotation?: number
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y, rotate: rotation }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-fit z-20 relative"
    >
      <motion.h3
        className={cn(
          "px-8 py-3 rounded-full text-xl font-black shadow-lg relative overflow-hidden group cursor-pointer",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={cn("absolute inset-0 w-full h-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0", fillColor)} />
        <span className={cn("relative z-10 transition-colors duration-300", hoverTextColor)}>
          {children}
        </span>
      </motion.h3>
    </motion.div>
  );
};

export const KaggleShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lenis = useLenis();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredBadge) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredBadge]);

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
                      <InteractiveBadge className="bg-[#20beff] text-black" hoverTextColor="group-hover:text-[#20beff]" fillColor="bg-black dark:bg-zinc-900" rotation={-1}>Technical Inventory</InteractiveBadge>
                      <div className="w-full overflow-x-auto pb-4 pt-1 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div className="grid grid-rows-2 grid-flow-col gap-4 auto-cols-[280px] md:auto-cols-[320px]">
                          {(data.overview || []).map((item: any, i: number) => (
                            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/5 flex flex-col gap-2 group/item cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#20beff]/30">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#20beff]/0 via-[#20beff]/10 to-[#20beff]/0 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                              <div className="relative z-10 flex items-center justify-between">
                                <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded", item.category === "Dataset" ? "bg-[#fb923c]/20 text-[#fb923c]" : "bg-[#a855f7]/20 text-[#a855f7]")}>{item.category}</span>
                                <span className="text-[10px] opacity-30 font-bold">{formatDate(item.updated)}</span>
                              </div>
                              <h4 className="relative z-10 text-sm font-bold truncate group-hover/item:text-[#20beff] transition-colors">{item.title}</h4>
                              <div className="relative z-10 flex items-center gap-4 mt-1 opacity-40 text-[9px] font-bold">
                                <div className="flex items-center gap-1"><Star size={10} /> {item.votes} Votes</div>
                                <div className="flex items-center gap-1">
                                  {item.category === "Dataset" ? <Database size={10} /> : <FileCode size={10} />}
                                  {item.category === "Dataset" ? item.size : item.category === "Notebook" ? item.msg : "Public Asset"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-6 pt-2">
                      <div className="flex flex-col items-center gap-2"><InteractiveBadge className="bg-white dark:bg-zinc-800 text-black dark:text-white" fillColor="bg-[#facc15]" hoverTextColor="group-hover:text-black" rotation={2}>Achievements</InteractiveBadge></div>

                      <div className="flex-1 w-full pt-2">
                        <div className="grid grid-cols-6 gap-y-3 gap-x-2 place-items-center">
                          {[...ACHIEVEMENT_LIST].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 24).map((ach, i) => (
                            <div
                              key={i}
                              className="relative cursor-pointer transition-transform hover:scale-110 duration-300"
                              onMouseEnter={(e) => {
                                setHoveredBadge(ach);
                                setMousePos({ x: e.clientX, y: e.clientY });
                              }}
                              onMouseLeave={() => setHoveredBadge(null)}
                            >
                              <HexagonBadge color={ach.color} icon={ach.icon} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-8">
                      <div className="flex justify-center"><InteractiveBadge className="bg-white dark:bg-zinc-800 text-black dark:text-white" fillColor="bg-[#fb923c]" hoverTextColor="group-hover:text-black">Your Datasets</InteractiveBadge></div>
                      <div className="flex-1 overflow-y-auto max-h-[260px] pr-4 py-2 -my-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div className="flex flex-col gap-4">
                          {(data.datasets || []).map((d: any, i: number) => (
                            <div key={i} className="group p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#fb923c]/30 hover:bg-[#fb923c]/5 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col gap-2 hover:-translate-y-1 hover:shadow-lg">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#fb923c]/0 via-[#fb923c]/10 to-[#fb923c]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                              <div className="flex justify-between items-center w-full relative z-10">
                                <span className="bg-[#fb923c]/20 text-[#fb923c] text-[9px] font-black uppercase px-2 py-1 rounded">Dataset</span>
                                <span className="text-[9px] opacity-40 font-bold">{d.size}</span>
                              </div>
                              <h4 className="text-[13px] font-bold tracking-tight truncate group-hover:text-[#fb923c] transition-colors relative z-10">{d.title}</h4>
                              <div className="flex items-center gap-4 opacity-50 text-[10px] font-medium relative z-10">
                                <span className="flex items-center gap-1"><Star size={10} /> {d.votes} Votes</span>
                                <span className="flex items-center gap-1"><Check size={10} /> Usability {d.usability}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10 overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-8">
                      <div className="flex justify-center"><InteractiveBadge className="bg-white dark:bg-zinc-800 text-black dark:text-white" fillColor="bg-[#4ade80]" hoverTextColor="group-hover:text-black">Recent Activity</InteractiveBadge></div>
                      <div className="flex-1 w-full pt-2">
                        <div className="flex flex-col gap-3">
                          {(data.activity || []).slice(0, 3).map((act: any, idx: number) => (
                            <div key={idx} className="group p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#4ade80]/30 hover:bg-[#4ade80]/5 transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4ade80] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                              <div className="absolute inset-0 bg-gradient-to-r from-[#4ade80]/0 via-[#4ade80]/10 to-[#4ade80]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                              <div className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white group-hover:bg-[#4ade80]/20 group-hover:text-[#4ade80] transition-colors relative z-10 shrink-0">
                                <TrendingUp size={16} />
                              </div>
                              <div className="space-y-1.5 flex-1 relative z-10 overflow-hidden">
                                <div className="flex justify-between items-center w-full">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4ade80]">{act.type}</span>
                                  <span className="text-[9px] opacity-40 font-bold">{act.time}</span>
                                </div>
                                <p className="text-[12px] font-bold leading-tight truncate group-hover:text-[#4ade80] transition-colors">{act.repo}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10 overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full justify-start gap-8">
                      <div className="flex justify-center"><InteractiveBadge className="bg-black dark:bg-white text-white dark:text-black" hoverTextColor="group-hover:text-white" fillColor="bg-[#a855f7]">Your Competitions</InteractiveBadge></div>
                      <div className="flex-1 overflow-y-auto max-h-[260px] pr-4 py-2 -my-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div className="flex flex-col gap-4">
                          {(data.competitions || []).map((comp: any, i: number) => (
                            <div key={i} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 group/comp hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-[#a855f7]/30 hover:bg-[#a855f7]/5 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/0 via-[#a855f7]/10 to-[#a855f7]/0 translate-x-[-100%] group-hover/comp:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                              <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="bg-[#a855f7]/20 text-[#a855f7] text-[9px] font-black uppercase px-2 py-1 rounded">{comp.type}</span>
                                  <span className="text-[9px] opacity-40 font-bold">{comp.time}</span>
                                </div>
                                <h4 className="text-[12px] font-bold tracking-tight leading-tight group-hover/comp:text-[#a855f7] transition-colors mb-1">{comp.title}</h4>
                                <p className="text-[10px] font-medium opacity-50 line-clamp-1">{comp.msg}</p>
                                <div className="flex items-center gap-2 mt-3 opacity-40 text-[9px] font-bold"><Users size={12} /> {comp.teams}</div>
                              </div>
                            </div>
                          ))}
                        </div>
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

      {/* Floating Tooltip */}
      {mounted && typeof document !== 'undefined' && hoveredBadge && createPortal(
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed z-[99999] pointer-events-none flex flex-col w-64 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 p-4 rounded-2xl shadow-2xl"
          style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <HexagonBadge color={hoveredBadge.color} icon={hoveredBadge.icon} />
            <h4 className="text-[13px] font-bold text-black dark:text-white leading-tight">{hoveredBadge.title}</h4>
          </div>
          <p className="text-[10px] font-medium opacity-60 leading-tight mb-3 text-black dark:text-white">{hoveredBadge.desc}</p>
          <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-black/5 dark:bg-white/10 w-fit px-2 py-1 rounded text-black dark:text-white">
            <Check className="w-3 h-3" />
            <span>{hoveredBadge.date}</span>
          </div>
        </motion.div>,
        document.body
      )}
    </section>
  );
};

export default KaggleShowcase;
