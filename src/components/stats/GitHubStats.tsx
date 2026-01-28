'use client';

import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { GitCommit, Star, Trophy, Zap, TrendingUp, Calendar as CalendarIcon, Github } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export interface GitHubSummary {
    total: number;
    thisWeek: number;
    best: number;
    average: number;
}

export function useGitHubData(username: string) {
    const [summary, setSummary] = useState<GitHubSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
                if (res.ok) {
                    const data = await res.json();
                    if (!data || !data.total) {
                        console.warn('GitHub API returned invalid structure, using fallback data.');
                        setSummary({
                            total: 599,
                            thisWeek: 6,
                            best: 50,
                            average: 2.1
                        });
                        return;
                    }

                    const total = data.total.lastYear ?? 0;
                    const contributions = Array.isArray(data.contributions) ? data.contributions : [];

                    const today = new Date();
                    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    const weekData = contributions.filter((c: any) => new Date(c.date) >= oneWeekAgo);
                    const thisWeek = weekData.reduce((acc: number, curr: any) => acc + curr.count, 0);

                    const best = contributions.length > 0 ? Math.max(...contributions.map((c: any) => c.count)) : 0;
                    const average = parseFloat((total / 365).toFixed(1));

                    setSummary({ total, thisWeek, best, average });
                }
            } catch (error) {
                console.error('Failed to fetch GitHub contributions:', error);
                // Demo fallback
                setSummary({
                    total: 599,
                    thisWeek: 6,
                    best: 50,
                    average: 2.1
                });
            } finally {
                setLoading(false);
            }
        };
        fetchGitHubData();
    }, [username]);

    return { summary, loading };
}

export function GitHubHeatmap({ username }: { username: string }) {
    const { theme } = useTheme();
    const cyberpunkTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <div className="relative w-full h-full flex flex-col justify-center bg-card/80 border border-border rounded-[2.5rem] p-8 backdrop-blur-md overflow-hidden group shadow-xl transition-all duration-500 hover:border-emerald-500/30">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <Github className="w-64 h-64 rotate-12" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <GitCommit className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">Annual Pulse</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full border border-white/5">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-mono text-zinc-500">@{username}</span>
                </div>
            </div>

            <div className="relative z-10 w-full overflow-hidden flex justify-center items-center py-6 bg-muted/30 rounded-3xl border border-border shadow-inner">
                <div className="overflow-x-auto pb-2 custom-scrollbar flex justify-center w-full min-h-[160px]">
                    {username ? (
                        <GitHubCalendar
                            username={username}
                            colorScheme={theme === 'dark' ? 'dark' : 'light'}
                            theme={cyberpunkTheme}
                            blockMargin={4}
                            blockSize={12}
                            fontSize={12}
                            showTotalCount={false}
                            showColorLegend={false}
                        />
                    ) : (
                        <div className="flex items-center justify-center text-muted-foreground font-mono text-xs italic">
                            Awaiting User Identity...
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-bold">
                <span>Data Source: GitHub Arfazrll</span>
                <div className="flex gap-1">
                    {cyberpunkTheme.dark.map((c, i) => (
                        <div key={i} className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.2)]" style={{ backgroundColor: c }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function StatPod({ label, value, icon, color, delay, suffix = "" }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="relative flex flex-col justify-between p-6 bg-card/85 border border-border rounded-[2rem] backdrop-blur-xl group hover:border-emerald-500/40 h-full overflow-hidden shadow-lg transition-all duration-500"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${color.replace('text-', 'bg-')}`} />

            <div className="flex items-center gap-3 relative z-10">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors ${color}`}>
                    {icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold group-hover:text-foreground transition-colors">{label}</span>
            </div>

            <div className="mt-4 relative z-10">
                <div className="text-3xl font-black tracking-tighter text-foreground group-hover:scale-105 transition-transform origin-left">
                    {value}<span className="text-xs font-normal text-muted-foreground/50 ml-1">{suffix}</span>
                </div>
            </div>

            {/* Inset Decorative Element */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-t border-l border-white/5 rounded-tl-2xl opacity-50" />
        </motion.div>
    );
}
