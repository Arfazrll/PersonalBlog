"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NavigationShortcuts } from "@/components/sections/NavigationShortcuts";

export default function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted to-background dark:bg-none dark:bg-black">
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

            <div className="container-creative relative z-10 px-6">
                {/* Navigation Shortcuts Grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full relative z-20"
                >
                    <NavigationShortcuts />
                </motion.div>


            </div>
        </section>
    );
}
