"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function NarrativeBridge() {
    return (
        <section className="relative py-32 bg-foreground text-background overflow-hidden flex flex-col items-center justify-center text-center px-6">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('/noise.svg')]" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                <div className="mb-8 flex justify-center">
                    <div className="p-4 rounded-full bg-background/10 backdrop-blur-sm border border-background/20">
                        <BookOpen className="w-8 h-8 text-background/80" />
                    </div>
                </div>

                <h2 className="text-4xl md:text-7xl font-serif leading-tight mb-8">
                    You've seen the <span className="italic opacity-50">results</span>.
                    <br />
                    Now read the <span className="italic text-primary">process</span>.
                </h2>

                <p className="text-lg md:text-xl font-mono opacity-60 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every image in this archive has a story behind it.
                    Explore the technical deep-dives and creative journals in the blog.
                </p>

                <Link href="/blog" className="group relative inline-flex items-center gap-4 px-12 py-6 bg-background text-foreground rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300">
                    <span>Enter the Archives</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>

            </motion.div>

            {/* Decorative Blog Preview (Abstract) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />

        </section>
    );
}
