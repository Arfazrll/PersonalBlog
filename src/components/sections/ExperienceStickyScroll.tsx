"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { GraduationCap, BookOpen, Star, Binary, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExperienceStickyScroll({ isLowPowerMode = false }: { isLowPowerMode?: boolean }) {
    const journeyContent = [
        {
            label: "Higher Education • Current",
            title: "Telkom University",
            description: "Information Technology major with a GPV of 3.8/4.0. Focused on AI Engineering and Systems Research. Active in multiple high-impact research laboratories and national competitions.",
            content: (
                <div className="h-full w-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent relative group overflow-hidden">
                    {/* Animated Background Element */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-6">
                            <GraduationCap className={cn("w-20 h-20 text-primary", !isLowPowerMode && "animate-pulse")} />
                            <Binary className={cn("w-8 h-8 text-blue-500 absolute -top-2 -right-2 opacity-50", !isLowPowerMode && "animate-bounce")} />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {["GPA 3.8", "AI Researcher", "IT Major"].map(s => (
                                <span key={s} className="px-3 py-1 rounded-full text-[10px] bg-primary/10 text-primary border border-primary/20 font-mono font-bold backdrop-blur-md">
                                    {s}
                                </span>
                            ))}
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Digital Innovation Hub</p>
                    </div>

                    {/* Holographic Scan Effect */}
                    {!isLowPowerMode && (
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan z-20" />
                    )}
                </div>
            ),
        },
        {
            label: "Foundation • High School",
            title: "SMAN 88 Jakarta",
            description: "Science Major (IPA). Developed strong analytical foundations in Mathematics and Physics, shaping a logical approach to problem-solving and technical engineering.",
            content: (
                <div className="h-full w-full flex items-center justify-center p-8 bg-gradient-to-br from-orange-600/20 via-rose-600/10 to-transparent relative group overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-6">
                            <BookOpen className="w-20 h-20 text-orange-500 hover:rotate-6 transition-transform duration-500" />
                            <Sparkles className={cn("w-6 h-6 text-yellow-500 absolute -bottom-2 -left-2", !isLowPowerMode && "animate-pulse")} />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {["Science Major", "Jakarta", "Foundation"].map(s => (
                                <span key={s} className="px-3 py-1 rounded-full text-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-mono font-bold backdrop-blur-md">
                                    {s}
                                </span>
                            ))}
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Logical Foundation</p>
                    </div>
                </div>
            ),
        }
    ];

    return (
        <div className="w-full">
            <StickyScroll content={journeyContent} isLowPowerMode={isLowPowerMode} />
        </div>
    );
}
