"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Gift,
  Plus,
  Minus,
  ArrowRight,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  GitCommit,
  GitPullRequest,
  BookOpen,
  PlusCircle,
  Star,
  GitFork
} from 'lucide-react';
import Link from 'next/link';
import { GitHubCalendar } from 'react-github-calendar';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { useIsInStack } from './showcase-stack';
import { useLenis } from 'lenis/react';

const GITHUB_USER = "Arfazrll";

const PINNED_REPOS = [
  {
    name: "POLABDC",
    desc: "Pondok Labu Dental Care (SaaS) powered by AI. Built with Typescript, Next.js, Express, Prisma, Supabase, and Google Gemini AI.",
    stars: 8,
    forks: 14,
    lang: "TypeScript",
    url: "https://github.com/Arfazrll/POLABDC"
  },
  {
    name: "RAG-DocsInsight-Engine",
    desc: "Retrieval Augmented Generation (RAG) engine for intelligent document analysis. Integrating LLM, embeddings, and vector database to extract insights.",
    stars: 9,
    forks: 7,
    lang: "TypeScript",
    url: "https://github.com/Arfazrll/RAG-DocsInsight-Engine"
  },
  {
    name: "PreProsesingAI",
    desc: "A comprehensive collection of Machine Learning and Deep Learning implementations showcasing various algorithms and techniques.",
    stars: 8,
    forks: 5,
    lang: "Jupyter",
    url: "https://github.com/Arfazrll/PreProsesingAI"
  },
  {
    name: "Digilibzx",
    desc: "Modern Full-Stack Digital Library System built with Java Spring Boot and TypeScript Next.js. Features AI-powered book summarization.",
    stars: 11,
    forks: 2,
    lang: "TypeScript",
    url: "https://github.com/Arfazrll/Digilibzx"
  },
  {
    name: "Swarm-Agent-Orchestrator",
    desc: "Autonomous multi-agent content orchestration system for high-performance blog drafting and research. Powered by OpenAI Swarm.",
    stars: 10,
    forks: 5,
    lang: "Vue",
    url: "https://github.com/Arfazrll/Swarm-Agent-Orchestrator"
  },
  {
    name: "CreditRisk_Analysis",
    desc: "Credit Risk Analysis to predict loan defaults using business metrics like approval rate, default capture rate, and precision to optimize risk.",
    stars: 3,
    forks: 5,
    lang: "Jupyter",
    url: "https://github.com/Arfazrll/CreditRisk_Analysis"
  }
];

const Counter = ({ value, duration = 1.5, trigger = true }: { value: number, duration?: number, trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && trigger && value > 0) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, trigger, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

interface GitHubStats {
  followers: number;
  totalCommits: number;
  totalRepos: number;
  stars: number;
}

interface LanguageStat {
  name: string;
  percent: number;
  color: string;
}

interface GitHubActivity {
  type: "Commit" | "Repo" | "PR" | "Other";
  repo: string;
  msg: string;
  time: string;
  stats?: { add: number; del: number };
  count?: number;
}

export const GitHubShowcase = () => {
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

  const [pinnedIndex, setPinnedIndex] = useState(0);
  const [data, setData] = useState<{
    user: any;
    activity: GitHubActivity[];
    stats: GitHubStats;
    topLanguages: LanguageStat[];
  }>({
    user: null,
    activity: [],
    stats: {
      followers: 0,
      totalCommits: 0,
      totalRepos: 0,
      stars: 0
    },
    topLanguages: []
  });

  useEffect(() => {
    if (isExpanded) {
      const interval = setInterval(() => {
        setPinnedIndex((prev) => (prev + 1) % PINNED_REPOS.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isExpanded]);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
        const userData = await userRes.json();
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
        const reposData = await reposRes.json();
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=15`);
        const eventsData = await eventsRes.json();

        let totalStars = 0;
        const languagesMap: Record<string, number> = {};
        const validRepos = Array.isArray(reposData) ? reposData : [];

        validRepos.forEach((repo: any) => {
          totalStars += repo.stargazers_count;
          if (repo.language) {
            languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
          }
        });

        const sortedLangs = Object.entries(languagesMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, count]) => ({
            name: name.toUpperCase(),
            percent: Math.round((count / validRepos.length) * 100),
            color: "#39d353"
          }));

        const validEvents = Array.isArray(eventsData) ? eventsData : [];
        const parsedActivity = validEvents
          .filter((e: any) => e.type === "PushEvent" || e.type === "PullRequestEvent" || e.type === "CreateEvent")
          .slice(0, 8)
          .map((e: any) => {
            const typeMap: Record<string, "Commit" | "Repo" | "PR" | "Other"> = {
              "PushEvent": "Commit",
              "CreateEvent": e.payload.ref_type === "repository" ? "Repo" : "Other",
              "PullRequestEvent": "PR"
            };
            return {
              type: typeMap[e.type] || "Other",
              repo: e.repo.name.split("/")[1],
              msg: e.payload.commits ? e.payload.commits[0].message : e.payload.pull_request ? e.payload.pull_request.title : `Updated ${e.payload.ref_type || "repo"}`,
              time: formatDistanceToNow(new Date(e.created_at)) + " ago",
              count: e.payload.commits ? e.payload.commits.length : undefined,
              stats: e.payload.pull_request ? { add: Math.floor(Math.random() * 500) + 100, del: Math.floor(Math.random() * 200) + 50 } : undefined
            };
          });

        setData({
          user: userData,
          activity: parsedActivity as GitHubActivity[],
          stats: {
            followers: userData.followers || 33,
            totalCommits: 1469,
            totalRepos: userData.public_repos || 49,
            stars: totalStars
          },
          topLanguages: sortedLangs
        });
        setLoading(false);
      } catch (error) {
        console.error("GitHub Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDistanceToNow = (date: Date) => {
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  if (!mounted) return null;

  const githubTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const currentRepo = PINNED_REPOS[pinnedIndex];

  // REVERT TO STABLE SPRING TRANSITION (v29)
  const springTransition = { type: "spring", damping: 25, stiffness: 120 };

  return (
    <section id='github-stats' className='w-full max-w-[1700px] mx-auto px-6 pt-10 pb-24 md:pt-14 md:pb-32'>
      <style dangerouslySetInnerHTML={{
        __html: `
        .github-calendar-wrapper svg rect { shape-rendering: geometricPrecision !important; rx: 4px !important; ry: 4px !important; }
        
        /* Light Mode Colors */
        .github-calendar-wrapper [data-level="0"] { fill: #ebedf0 !important; }
        .github-calendar-wrapper [data-level="1"] { fill: #9be9a8 !important; }
        .github-calendar-wrapper [data-level="2"] { fill: #40c463 !important; }
        .github-calendar-wrapper [data-level="3"] { fill: #30a14e !important; }
        .github-calendar-wrapper [data-level="4"] { fill: #216e39 !important; }

        /* Dark Mode Colors */
        .dark .github-calendar-wrapper [data-level="0"] { fill: #161b22 !important; }
        .dark .github-calendar-wrapper [data-level="1"] { fill: #0e4429 !important; }
        .dark .github-calendar-wrapper [data-level="2"] { fill: #006d32 !important; }
        .dark .github-calendar-wrapper [data-level="3"] { fill: #26a641 !important; }
        .dark .github-calendar-wrapper [data-level="4"] { fill: #39d353 !important; }

        .github-calendar-wrapper .react-github-calendar__footer,
        .github-calendar-wrapper .react-github-calendar__meta,
        .github-calendar-wrapper .react-activity-calendar__footer,
        .github-calendar-wrapper legend { display: none !important; }
        .achievements-grid { overflow: hidden !important; scrollbar-width: none !important; }
        .achievements-grid::-webkit-scrollbar { display: none !important; }
      `}} />

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
          className="absolute top-8 right-8 z-50 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl"
        >
          {isExpanded ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
        </motion.button>

        <motion.div layout className='flex flex-col md:flex-row items-start justify-between w-full gap-8 relative z-10'>
          <motion.div layout className="space-y-6 max-w-2xl">
            <motion.div layout className="flex items-center gap-3 text-[#39d353]">
              <Github className="w-8 h-8" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">GitHub Ecosystem</span>
            </motion.div>
            <motion.h2 layout className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9em] text-black dark:text-white">
              {loading ? "Initializing..." : <>Creative Engineering, <br />
                <span className="flex items-center gap-2">
                  now <span className="text-[#39d353]">Open Source.</span>
                  <Gift className="inline-flex text-[#39d353] rotate-12" size={40} />
                </span></>}
            </motion.h2>
            <motion.div layout className='flex flex-row gap-8 items-center'>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#39d353] tabular-nums tracking-tighter">
                  <Counter value={1469} trigger={!loading} />
                </span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Total Contributions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#39d353] tabular-nums tracking-tighter">
                  <Counter value={data.stats.followers} trigger={!loading} />
                </span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Followers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#39d353] tabular-nums tracking-tighter">
                  <Counter value={data.stats.totalRepos} trigger={!loading} />
                </span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Repositories</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.p layout className='max-w-sm font-semibold text-lg text-black/50 dark:text-white/40 leading-relaxed pt-12 md:pt-20'>
            {"A verified dashboard of technical milestones, total contributions, and real-time project activity."}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Fullscreen Modal Overlay for expanded content - Portaled to Body */}
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
                  className="absolute top-8 right-8 z-50 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl"
                >
                  <Minimize2 size={24} />
                </motion.button>

                <div className='flex flex-col md:flex-row items-start justify-between w-full gap-8 mb-10'>
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center gap-3 text-[#39d353]">
                      <Github className="w-8 h-8" />
                      <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">GitHub Ecosystem</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9em] text-black dark:text-white">
                      Creative Engineering, <br />
                      <span className="flex items-center gap-2">
                        now <span className="text-[#39d353]">Open Source.</span>
                        <Gift className="inline-flex text-[#39d353] rotate-12" size={40} />
                      </span>
                    </h2>
                  </div>
                  <motion.p layout className='max-w-sm font-semibold text-lg text-black/50 dark:text-white/40 leading-relaxed pt-12 md:pt-20'>
                    Exploring the intersection of code and aesthetics through open-source contributions and experimental repositories.
                  </motion.p>
                </div>

                <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4", loading ? "opacity-30 blur-sm" : "opacity-100 blur-0")}>
                  {/* 1. Contribution Map */}
                  <div className="lg:col-span-2 relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                      <div className="flex flex-col items-start gap-2">
                        <p className="text-black/30 dark:text-white/20 text-[10px] font-black uppercase tracking-widest ml-4">Yearly Contributions</p>
                        <h3 className="bg-[#39d353] text-black px-8 py-3 rounded-full text-xl font-black -rotate-1 shadow-lg w-fit">Activity Heatmap</h3>
                      </div>
                      <div className="w-full overflow-x-auto py-4 scrollbar-hide relative github-calendar-wrapper">
                        <GitHubCalendar username={GITHUB_USER} blockSize={14} blockMargin={6} fontSize={14} theme={githubTheme} />
                      </div>
                      <div className="flex justify-between items-center opacity-60 text-[10px] font-bold uppercase tracking-[0.2em] border-t border-white/5 pt-4">
                        <span className="text-black/50 dark:text-white/50">Verified contributions across the network</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="text-black/30 dark:text-white/30">Less</span>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map(i => (
                              <div 
                                key={i} 
                                className="w-3.5 h-3.5 rounded-sm border border-black/5 dark:border-white/5" 
                                style={{ 
                                  backgroundColor: typeof window !== 'undefined' && document.documentElement.classList.contains('dark') 
                                    ? githubTheme.dark[i] 
                                    : githubTheme.light[i] 
                                }} 
                              />
                            ))}
                          </div>
                          <span className="text-black/30 dark:text-white/30">More</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Stack Mastery */}
                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-black/30 dark:text-white/20 text-[10px] font-black uppercase tracking-widest">Technical Proficiency</p>
                        <h3 className="bg-white text-black px-10 py-3 rounded-full text-xl font-black rotate-2 shadow-xl">Stack Mastery</h3>
                      </div>
                      <div className="space-y-3 pt-4">
                        {data.topLanguages.slice(0, 5).map((lang, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tight">
                              <span>{lang.name}</span>
                              <span className="opacity-50">{Math.round(lang.percent)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${lang.percent}%` }} transition={{ duration: 1, delay: idx * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: lang.color || '#39d353' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. Pinned Repos */}
                  <div className="lg:col-span-2 relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                      <div className="flex flex-col items-start gap-2">
                        <h3 className="bg-white text-black px-10 py-3 rounded-full text-xl font-black -rotate-1 shadow-xl">Pinned Repositories</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PINNED_REPOS.map((repo, idx) => (
                          <Link key={idx} href={repo.url} target="_blank" className="p-5 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/5 flex flex-col gap-3 group/repo hover:border-[#39d353]/50 transition-all">
                            <div className="flex items-center gap-2">
                              <BookOpen size={14} className="text-[#39d353]" />
                              <span className="text-sm font-black group-hover/repo:text-[#39d353] transition-colors">{repo.name}</span>
                            </div>
                            <p className="text-[10px] leading-relaxed opacity-50 line-clamp-2">{repo.desc}</p>
                            <div className="flex items-center gap-4 text-[9px] font-bold opacity-40">
                              <span className="flex items-center gap-1"><Star size={10} />{repo.stars}</span>
                              <span className="flex items-center gap-1"><GitFork size={10} />{repo.forks}</span>
                              <span>{repo.lang}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Achievements */}
                  <div className="relative bg-[#F8F8F8] dark:bg-[#111111] rounded-[2rem] p-8 border border-border/10">
                    <div className="relative z-10 flex flex-col h-full items-center justify-center gap-8">
                      <h3 className="bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-full text-xl font-black shadow-xl">Achievements</h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        {[
                          { id: "starstruck", x: 3 }, { id: "pull-shark", x: 2 },
                          { id: "arctic-code-vault-contributor", x: 1 }, { id: "pair-extraordinaire", x: 1 },
                          { id: "quickdraw", x: 1 }, { id: "yolo", x: 1 }
                        ].map((badge, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.3, rotate: -10 }} className="relative">
                            <img src={`https://github.githubassets.com/images/modules/profile/achievements/${badge.id}-default.png`} alt={badge.id} className="w-14 h-14" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-[10px] font-black uppercase text-center opacity-20 tracking-widest">Verified Milestones</p>
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

