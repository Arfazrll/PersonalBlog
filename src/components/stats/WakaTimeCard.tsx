'use client';

import { motion } from 'framer-motion';
import { Clock, Code2, Calendar, Zap, Trophy, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';

interface WakaTimeData {
    human_readable_daily_average: string;
    human_readable_total: string;
    start: string;
    end: string;
    languages: { name: string; percent: number; text: string }[];
    best_day: { date: string; text: string };
}

export function WakaTimeCard({ data }: { data: WakaTimeData | null }) {
    // Check if data exists but is essentially empty (common with new WakaTime accounts)
    const isEmpty = data?.human_readable_total === '0 secs' || data?.languages.length === 0;
    const shouldUseDemo = !data || isEmpty;

    const displayData = shouldUseDemo ? {
        human_readable_daily_average: "5 hrs 30 mins",
        human_readable_total: "38 hrs 15 mins",
        languages: [
            { name: "TypeScript", percent: 45, text: "15 hrs" },
            { name: "Python", percent: 30, text: "10 hrs" },
            { name: "Rust", percent: 15, text: "5 hrs" },
            { name: "Go", percent: 10, text: "3 hrs" }
        ]
    } : data!;

    // Donut Chart logic
    const radius = 45; // Increased radius
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercent = 0;

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

    return (
        <StatsCard delay={0.2} className="relative overflow-hidden">
            {/* Background Tech Elements */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Code2 className="w-32 h-32 -rotate-12" />
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {shouldUseDemo && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-mono text-yellow-500/70 z-50 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    DEMO MODE
                </div>
            )}

            <div className="p-8 h-full flex flex-col relative z-10">
                {/* Header with improved typography */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 shadow-inner ring-1 ring-white/5">
                            <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                            WakaTime
                            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                        </h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-mono">Weekly Intelligence</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row gap-8">
                    {/* Left Column: Stats & Legend */}
                    <div className="flex-1 space-y-6">
                        {/* Key Stats Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md transition-all hover:bg-black/10 dark:hover:bg-white/10 group/stat">
                                <p className="text-[10px] text-muted-foreground mb-1 font-mono uppercase tracking-wider flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Daily Avg
                                </p>
                                <p className="text-lg font-bold text-foreground group-hover/stat:text-blue-500 transition-colors">
                                    {displayData.human_readable_daily_average}
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/10 backdrop-blur-md transition-all hover:from-blue-500/20 hover:to-purple-500/20 group/stat">
                                <p className="text-[10px] text-blue-600/70 dark:text-blue-200/70 mb-1 font-mono uppercase tracking-wider flex items-center gap-1">
                                    <Trophy className="w-3 h-3" /> Total
                                </p>
                                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    {displayData.human_readable_total}
                                </p>
                            </div>
                        </div>

                        {/* Languages Legend */}
                        <div className="space-y-3 pl-1">
                            {displayData.languages.slice(0, 4).map((lang, idx) => (
                                <div key={lang.name} className="flex items-center justify-between text-sm group/row cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                        </div>
                                        <span className="font-medium text-muted-foreground group-hover/row:text-foreground transition-colors">{lang.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-1 w-16 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percent}%` }}
                                                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                            />
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground w-8 text-right">{lang.percent}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Donut Chart */}
                    <div className="flex items-center justify-center relative">
                        {/* Outer Glow Ring */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[50px] rounded-full opacity-50" />

                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-2xl">
                                {displayData.languages.slice(0, 5).map((lang, idx) => {
                                    const offset = circumference - (accumulatedPercent / 100) * circumference;
                                    const strokeDasharray = `${(lang.percent / 100) * circumference} ${circumference}`;
                                    accumulatedPercent += lang.percent;

                                    return (
                                        <motion.circle
                                            key={lang.name}
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            fill="transparent"
                                            stroke={COLORS[idx % COLORS.length]}
                                            strokeWidth="8"
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            initial={{ strokeDasharray: `0 ${circumference}` }}
                                            whileInView={{ strokeDasharray }}
                                            transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
                                            className="hover:stroke-[10] hover:opacity-100 transition-all duration-300 cursor-pointer opacity-90"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Inner Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest text-[8px] mb-1">Top Lang</span>
                                <span className="text-xl font-black text-foreground tracking-tighter">
                                    {displayData.languages[0]?.name || 'Code'}
                                </span>
                                <span className="text-xs font-mono text-blue-500">
                                    {displayData.languages[0]?.percent || 0}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StatsCard>
    );
}
