"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { X, Play, Maximize2 } from "lucide-react";

export default function FocusGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const openLightbox = (id: string) => setSelectedId(id);
    const closeLightbox = () => setSelectedId(null);

    const selectedItem = portfolioData.gallery.find(item => item.id === selectedId);

    return (
        <section
            id="focus-grid"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[150vh] bg-background py-32 px-4 md:px-12 overflow-hidden cursor-crosshair"
        >
            {/* The blurry "Fog" Overlay using CSS Masking for the Lens Effect */}
            <div
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-700"
                style={{
                    // The Overlay has blur and grayscale.
                    // We mask it so it is NOT visible at the mouse position (transparent hole).
                    backdropFilter: "blur(10px) grayscale(100%) contrast(0.8)",
                    WebkitBackdropFilter: "blur(10px) grayscale(100%) contrast(0.8)",
                    maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
                }}
            />

            {/* The "Clean" Grid underneath */}
            <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {portfolioData.gallery.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                        className="relative group break-inside-avoid rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(item.id)}
                    >
                        <div className="relative aspect-auto">
                            <Image
                                src={item.thumbnail || item.url}
                                alt={item.title}
                                width={800}
                                height={600}
                                className="w-full object-cover"
                            />

                            {/* Flashlight Interaction Hint: Hovering directly also highlights regardless of mask for better UX */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-0 transition-opacity" />

                            {/* Caption usually hidden, revealed by lens */}
                            <div className="absolute bottom-0 left-0 p-6 opacity-100">
                                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-1">{item.category}</p>
                                <h3 className="text-xl font-bold text-white uppercase leading-tight">{item.title}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Cinematic Lightbox */}
            <AnimatePresence>
                {selectedId && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button onClick={closeLightbox} className="absolute top-8 right-8 p-4 z-[110] text-white/50 hover:text-white transition-colors">
                            <span className="text-xs font-mono uppercase tracking-widest mr-2">Close Sequence</span>
                            <X className="w-6 h-6 inline-block" />
                        </button>

                        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 h-full lg:h-auto items-center" onClick={e => e.stopPropagation()}>

                            {/* Media */}
                            <div className="lg:col-span-2 relative aspect-video bg-neutral-900 rounded-sm overflow-hidden shadow-2xl">
                                {selectedItem.type === 'video' ? (
                                    <iframe
                                        src={selectedItem.url}
                                        className="w-full h-full"
                                        allow="autoplay; fullscreen"
                                    />
                                ) : (
                                    <Image
                                        src={selectedItem.url}
                                        alt={selectedItem.title}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                )}
                            </div>

                            {/* Narrative Sidebar */}
                            <div className="flex flex-col justify-center space-y-8 text-white">
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
                                        Sequence_ID: {selectedItem.id}
                                    </p>
                                    <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] mb-4">
                                        {selectedItem.title}
                                    </h2>
                                    <div className="w-12 h-1 bg-primary mb-6" />
                                    <p className="text-lg text-white/60 font-serif leading-relaxed">
                                        {selectedItem.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Date Captured</p>
                                        <p className="font-mono">{selectedItem.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Format</p>
                                        <p className="font-mono">{selectedItem.type === 'video' ? 'MP4 / H.264' : 'WEBP / Lossless'}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
