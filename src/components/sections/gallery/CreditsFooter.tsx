"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function CreditsFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const credits = [
        {
            role: "Directed By",
            name: "Arfazrll"
        },
        {
            role: "Visual Engineering",
            name: "React Three Fiber"
        },
        {
            role: "Motion Systems",
            name: "Framer Motion"
        },
        {
            role: "Styling Architecture",
            name: "Tailwind CSS"
        },
        {
            role: "Typography",
            name: "Geist & Inter"
        }
    ];

    return (
        <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-24 text-center">

            {/* The "The End" vibe */}
            <div className="flex flex-col gap-16 md:gap-24 relative z-10 w-full max-w-sm mx-auto">

                {credits.map((credit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                        <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/30 mb-2">
                            {credit.role}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-serif text-white/90">
                            {credit.name}
                        </h3>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-24"
                >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-8">
                        Production © 2024
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-4 mx-auto text-white/50 hover:text-white transition-colors"
                    >
                        <div className="p-4 rounded-full border border-white/10 group-hover:border-white/50 transition-colors">
                            <ArrowUp className="w-6 h-6 animate-bounce" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest">Replay Sequence</span>
                    </button>
                </motion.div>

            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('/noise.svg')]" />

        </section>
    );
}
