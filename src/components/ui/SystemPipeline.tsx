'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Terminal, Activity, Zap, Cpu, ChevronRight, Boxes, Radio } from 'lucide-react';

interface ToolItem {
    name: string;
    icon: string;
}

interface SystemPipelineProps {
    tools: ToolItem[];
    className?: string;
}

export const SystemPipeline = ({ tools, className }: SystemPipelineProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(tools.length - 1) * 25}%`]);

    const [logs, setLogs] = useState<string[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
            const newLog = `> TRACE_PROTO_${hex}: VERIFIED`;
            setLogs(prev => [newLog, ...prev].slice(0, 12));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Decoration schematic generation for more density
    const decorations = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 500}%`,
        size: Math.random() * 300 + 100,
        opacity: Math.random() * 0.05 + 0.02
    })), []);

    return (
        <section ref={targetRef} className={`relative h-[400vh] ${className}`}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-black/20">

                {/* Background Schematic Layer (Static Grid) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dense-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="50" cy="50" r="0.5" fill="currentColor" />
                                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.2" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dense-grid)" />
                    </svg>
                </div>

                {/* Horizontal Kinetic Track */}
                <motion.div style={{ x }} className="flex gap-48 px-[15vw] items-center relative">

                    {/* Background Moving Schematics (Decorations) */}
                    {decorations.map((dec, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: dec.top,
                                left: dec.left,
                                width: dec.size,
                                height: dec.size,
                                opacity: dec.opacity,
                                pointerEvents: 'none',
                                zIndex: -1
                            }}
                        >
                            <svg viewBox="0 0 100 100" width="100%" height="100%">
                                <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
                                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.1" />
                            </svg>
                        </div>
                    ))}

                    {/* The Connecting Pipeline Wire */}
                    <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -translate-y-1/2 z-0">
                        <motion.div
                            className="absolute inset-0 bg-primary/20 blur-sm"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>

                    {tools.map((tool, idx) => (
                        <div key={tool.name} className="relative z-10 flex items-center gap-24 group">

                            {/* "Phantom" Decoration Node (Precedes actual nodes) */}
                            {idx % 2 === 0 && (
                                <div className="hidden lg:flex flex-col items-center opacity-10 blur-[1px] -translate-y-24">
                                    <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center">
                                        <Boxes size={32} />
                                    </div>
                                    <span className="text-[6px] font-mono mt-4 uppercase tracking-[0.8em]">PHANTOM_TRACE_0x{idx}</span>
                                </div>
                            )}

                            {/* Main Tool Node */}
                            <div className="flex flex-col items-center">
                                <motion.div
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className="w-[420px] p-12 glass-card border-white/10 bg-white/[0.03] rounded-[4rem] group-hover:border-primary/50 transition-all duration-500 relative overflow-hidden shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

                                    <div className="flex items-center gap-10 mb-10">
                                        <div className="w-24 h-24 relative grayscale group-hover:grayscale-0 transition-all duration-700 p-3 bg-white/5 rounded-3xl group-hover:bg-primary/5">
                                            <Image
                                                src={tool.icon}
                                                alt={tool.name}
                                                fill
                                                className="object-contain"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-4xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                                                {tool.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                                                <span className="text-[9px] font-mono text-primary/80 uppercase tracking-widest font-black">
                                                    SYNCED // STABLE
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Radio size={12} className="text-primary/40" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Node_Architecture</span>
                                            </div>
                                            <span className="text-[9px] font-mono text-primary/40">X_{idx}_SYS</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '92%' }}
                                                transition={{ duration: 1.5, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary/40"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Enhanced Pipe Joiner */}
                            {idx < tools.length - 1 && (
                                <div className="hidden md:flex items-center justify-center w-32 relative">
                                    <div className="w-6 h-6 rounded-full border border-primary/40 bg-background flex items-center justify-center relative shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                                        <Activity size={10} className="text-primary" />
                                        <motion.div
                                            className="absolute inset-0 rounded-full border border-primary shadow-[0_0_25px_rgba(var(--primary-rgb),0.6)]"
                                            animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                                            transition={{ duration: 4, repeat: Infinity, delay: idx * 0.8 }}
                                        />
                                    </div>
                                    {/* Flow Particles */}
                                    <motion.div
                                        className="absolute w-2 h-2 bg-primary rounded-full blur-[2px]"
                                        animate={{ x: [-80, 80], opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Professional Overlay UI */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-12 text-primary/20 font-black text-[10px] tracking-[1em] uppercase overflow-hidden whitespace-nowrap hidden lg:flex">
                    <span>SYSTEM_GRID_ARCHITECTURE</span>
                    <div className="w-32 h-[1px] bg-primary/20" />
                    <span>KERNEL_RESOURCES_V8</span>
                </div>

                {/* Bottom Left: Logic Logs */}
                <div className="absolute bottom-12 left-12 p-8 border border-primary/20 bg-black/80 rounded-[2rem] w-80 hidden lg:block z-20 shadow-2xl transform-gpu">
                    <div className="flex items-center justify-between mb-6 border-b border-primary/10 pb-4">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                            <Cpu size={14} /> Process_Console
                        </div>
                        <span className="text-[8px] font-mono text-primary/40">L_V8</span>
                    </div>
                    <div className="h-40 overflow-hidden font-mono text-[9px] space-y-2 text-primary/60">
                        {logs.map((log, i) => (
                            <div key={i} className="flex gap-2">
                                <span className="text-primary/20">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                <span className="truncate">{log}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Scroll Meta */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 hidden lg:flex">
                    <div className="h-64 w-[1px] bg-white/5 relative">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-primary"
                            style={{ height: scrollYProgress }}
                        />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] rotate-90 text-primary/40 mt-12">FLOW_COORDINATE</span>
                </div>
            </div>
        </section>
    );
};
