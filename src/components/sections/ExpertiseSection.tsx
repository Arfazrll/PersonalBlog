"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { NavigationShortcuts } from "@/components/sections/NavigationShortcuts";

export default function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="relative pb-0 pt-0 bg-background">
            {/* Industrial texture remains, but colored blobs are removed */}

            {/* Grid Pattern with organic fade */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
                }}
            />
            <div className="absolute inset-0 opacity-0 dark:opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
                }}
            />

            <div className="w-full relative z-10 px-0">
                {/* Navigation Shortcuts Grid - Immediate Visibility to overlap Hero */}
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    className="w-full relative z-20"
                >
                    <NavigationShortcuts />
                </motion.div>
            </div>
        </section>
    );
}
