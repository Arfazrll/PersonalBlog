'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, Trophy, TrendingUp, Calendar, Layout, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WakaTimeLanguageBoard({ data }: { data: any }) {
    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#ef4444'];
    const languages = data?.languages?.slice(0, 6) || [];

    return (
        <div className="relative h-full flex flex-col bg-card/85 border border-border rounded-[2.5rem] p-8 backdrop-blur-md group overflow-hidden shadow-xl transition-all duration-500 hover:border-blue-500/30">
            {/* Background scanner effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Layout className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">Tech Stack IQ</span>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[8px] font-mono text-blue-400">
                    LIVE_METRICS
                </div>
            </div>

            <div className="flex-1 space-y-6 relative z-10 overflow-y-auto custom-scrollbar pr-2">
                {languages.map((lang: any, idx: number) => (
                    <div key={lang.name} className="group/row">
                        <div className="flex items-center justify-between mb-2 text-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                <span className="font-bold text-foreground/80 group-hover/row:text-blue-400 transition-colors uppercase tracking-[0.1em] text-[10px]">{lang.name}</span>
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground">{lang.percent}%</span>
                        </div>
                        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-black/5">
                            <motion.div
                                className="absolute top-0 left-0 h-full rounded-full"
                                style={{
                                    backgroundColor: COLORS[idx % COLORS.length],
                                    boxShadow: `0 0 15px ${COLORS[idx % COLORS.length]}50`
                                }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${lang.percent}%` }}
                                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-3 text-[8px] text-muted-foreground/30 font-mono uppercase tracking-[0.5em]">
                <ChevronRight className="w-3 h-3 text-blue-500/50" />
                <span>INTELLIGENCE ENGINE V2</span>
            </div>
        </div>
    );
}

export function WakaTimeMetricPod({ label, value, subValue, icon, highlight, color, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className={`relative p-6 rounded-[2rem] border border-border bg-card/85 transition-all duration-500 group overflow-hidden h-full flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 ${highlight
                ? "bg-blue-600/5 dark:bg-blue-900/10 border-blue-500/20 dark:border-blue-500/30"
                : "hover:border-blue-500/40"
                }`}
        >
            <div className="flex items-center gap-3 relative z-10">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors ${color}`}>
                    {icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">{label}</span>
            </div>

            <div className="mt-4 relative z-10">
                <div className={`text-3xl font-black tracking-tight ${highlight ? "text-blue-500 dark:text-blue-400" : "text-foreground"}`}>
                    {value}
                </div>
                {subValue && (
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-1 pt-1 border-t border-black/5 dark:border-white/5 group-hover:text-zinc-500 transition-colors uppercase leading-tight">
                        {subValue}
                    </div>
                )}
            </div>

            {/* Glowing corner indicator */}
            <div className={`absolute top-0 right-0 w-8 h-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity ${highlight ? "bg-blue-500" : "bg-white"}`} style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        </motion.div>
    );
}

export default function GenericWakaTimeLoader({ children, render }: { children?: React.ReactNode, render: (data: any) => React.ReactNode }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/wakatime');
                if (res.ok) {
                    const json = await res.json();
                    setData(json.data);
                }
            } catch (error) {
                console.error('Failed to fetch WakaTime stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return null;
    return <>{render(data)}</>;
}
