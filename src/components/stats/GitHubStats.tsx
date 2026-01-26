'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Tooltip } from 'react-tooltip';
import { StatsCard } from './StatsCard';
import { Github, GitCommit, GitBranch, Star } from 'lucide-react';

export function GitHubStats() {
    const { theme } = useTheme();

    // More vibrant cyberpunk theme
    const cyberpunkTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['rgba(255,255,255,0.03)', 'rgba(16,185,129,0.2)', 'rgba(16,185,129,0.4)', 'rgba(16,185,129,0.7)', 'rgba(16,185,129,1)'],
    };

    return (
        <StatsCard delay={0} className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute -bottom-4 -left-4 p-4 opacity-5">
                <Github className="w-32 h-32 rotate-12" />
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="p-8 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative p-3 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20 shadow-inner ring-1 ring-white/5">
                            <GitCommit className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                            GitHub
                            <Star className="w-4 h-4 text-emerald-500 fill-emerald-500 animate-pulse" />
                        </h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-mono">Commit History</p>
                    </div>
                </div>

                {/* Calendar Container */}
                <div className="flex-1 flex items-center justify-center relative group/calendar border border-white/5 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-emerald-500/5 blur-2xl opacity-0 group-hover/calendar:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 w-full overflow-hidden flex justify-center items-center">
                        <div className="overflow-x-auto pb-2 custom-scrollbar mask-image-horizontal flex justify-center">
                            <GitHubCalendar
                                username="Arfazrll"
                                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                                theme={cyberpunkTheme}
                                blockMargin={3}
                                blockSize={13}
                                fontSize={12}
                                showTotalCount={false}
                                showColorLegend={false}
                                renderBlock={(block, activity) => (
                                    <div className="group/block relative">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: Math.random() * 0.5 }}
                                            whileHover={{ scale: 1.3, zIndex: 50, backgroundColor: '#fff', boxShadow: '0 0 10px #10b981' }}
                                            className="transition-all duration-200 rounded-sm"
                                        >
                                            {block}
                                        </motion.div>
                                        <Tooltip id="github-tooltip" className="z-50 !bg-black/90 !backdrop-blur-xl !border !border-white/20 !rounded-lg !px-3 !py-2 !text-xs !font-mono !shadow-xl" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Custom Footer */}
                <div className="mt-4 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <GitBranch className="w-3 h-3" />
                        <span>300+ Contributions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground opacity-50">Less</span>
                        <div className="flex gap-1 bg-black/20 p-1 rounded-md border border-white/5">
                            <div className="w-2.5 h-2.5 rounded-[2px]" style={{ background: cyberpunkTheme.dark[0] }} />
                            <div className="w-2.5 h-2.5 rounded-[2px]" style={{ background: cyberpunkTheme.dark[2] }} />
                            <div className="w-2.5 h-2.5 rounded-[2px]" style={{ background: cyberpunkTheme.dark[4] }} />
                        </div>
                        <span className="text-muted-foreground opacity-50">More</span>
                    </div>
                </div>
            </div>
        </StatsCard>
    );
}
