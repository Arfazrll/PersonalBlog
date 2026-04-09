'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface NodeData {
    label: string;
    description: string;
    imageUrl?: string;
    orbitIndex: number; // 0 for inner, 1 for outer
    position: number; // 0 to 1 along the orbit
}

interface InnovativeExperienceHeroProps {
    type: 'education' | 'journey' | 'experience';
    title: string;
    highlight: string;
    description: string;
}

const NODES_DATA: Record<string, NodeData[]> = {
    education: [
        { label: 'Telkom University', description: 'Bachelor of Technology - Information Technology (GPA 3.8/4.0).', orbitIndex: 0, position: 0.1, imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
        { label: 'SMAN 88 Jakarta', description: 'High School Diploma - Science (IPA) Major.', orbitIndex: 1, position: 0.25, imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=400&auto=format&fit=crop" },
        { label: 'Coding Camp DBS', description: 'Scholarship Awardee – Intensive AI Engineer training.', orbitIndex: 0, position: 0.45, imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop" },
        { label: 'IDCamp IOH', description: 'Machine Learning Engineer Program (Industry Standard).', orbitIndex: 1, position: 0.65, imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop" },
        { label: 'CPS Research Asst', description: 'Deep Learning & CV instruction and academic review.', orbitIndex: 0, position: 0.85, imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop" },
        { label: 'GDSC ML Path', description: 'Mastering regression, classification, and core ML.', orbitIndex: 1, position: 0.05, imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=400&auto=format&fit=crop" },
    ],
    journey: [
        { label: 'Project Officer', description: 'Telkom Digistar - Managing digital talent programs.', orbitIndex: 0, position: 0.15, imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
        { label: 'Academic Affairs', description: 'HMIT Telkom - Planning academic & student support.', orbitIndex: 1, position: 0.35, imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop" },
        { label: 'Public Relations', description: 'Youth Ranger Indonesia - Brand narrative & engagement.', orbitIndex: 0, position: 0.55, imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop" },
        { label: 'Fundraising Lead', description: 'GI BEI Telkom - Strategic donor & sponsorship outreach.', orbitIndex: 1, position: 0.75, imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop" },
        { label: 'Network Assistant', description: 'IFLAB Assistant - Guiding Socket Programming projects.', orbitIndex: 0, position: 0.9, imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop" },
        { label: 'HR Management', description: 'CPS Laboratory - Fostering lab development & culture.', orbitIndex: 1, position: 0.02, imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&auto=format&fit=crop" },
    ],
    experience: [
        { label: 'CV Researcher', description: 'CPS Lab - End-to-end intelligent model development.', orbitIndex: 0, position: 0.2, imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=400&auto=format&fit=crop" },
        { label: 'System Analyst', description: 'ASE Lab - Translating requirements to SRS/SDD/UML.', orbitIndex: 1, position: 0.45, imageUrl: "https://images.unsplash.com/photo-1454165833911-5421db635848?q=80&w=400&auto=format&fit=crop" },
        { label: 'Swarm AI Lead', description: 'Multi-agent blog generation engine (Llama 3.3).', orbitIndex: 0, position: 0.6, imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop" },
        { label: 'Automation Eng.', description: 'Browser Agent CLI for AI-driven browser control.', orbitIndex: 1, position: 0.8, imageUrl: "https://images.unsplash.com/photo-1518433278988-c7bc488ce92d?q=80&w=400&auto=format&fit=crop" },
        { label: 'IoT Engineering', description: 'Terraflow - Direct-to-Cloud IoT for agriculture.', orbitIndex: 0, position: 0.95, imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop" },
        { label: 'RAG Systems', description: 'DocsInsight Engine - Enterprise private RAG system.', orbitIndex: 1, position: 0.1, imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop" },
    ]
};

const OUTER_PATH = "M 100,300 a 400,180 -15 1,0 800,0 a 400,180 -15 1,0 -800,0";
const INNER_PATH = "M 250,300 a 250,110 -15 1,0 500,0 a 250,110 -15 1,0 -500,0";

export function InnovativeExperienceHero({ type, title, highlight, description }: InnovativeExperienceHeroProps) {
    const rawNodes = NODES_DATA[type] || NODES_DATA.experience;
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <section className="relative w-full py-4 lg:py-6 overflow-visible bg-transparent transition-colors duration-500">

            <div className="w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center h-full overflow-visible">

                {/* Left Content Column - Strictly Following Image 1 */}
                <div className="relative z-20 space-y-8 lg:-ml-28 lg:pr-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
                            {title}<br />{highlight}
                        </h2>

                        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-4xl leading-relaxed">
                            {description}
                        </p>

                        <div className="pt-4">
                            <Link
                                href="/resume"
                                className="group flex items-center gap-2 w-fit px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-bold text-sm transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                                View resume <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Orbital Column - Strictly Following Image 1 (Wide Ellipse) */}
                <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px] flex items-center justify-center overflow-visible">
                    {/* Responsive Container for Orbit */}
                    <div className="relative w-[1000px] h-[600px] scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.65] xl:scale-[0.75] transition-transform duration-500 origin-center shrink-0 overflow-visible">
                        {/* SVG Orbital Paths (Tilted Ellipses) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 600">
                            <path d={OUTER_PATH} className="stroke-neutral-400 dark:stroke-neutral-600 opacity-60 dark:opacity-40" fill="none" strokeWidth="1.5" strokeDasharray="6 8" />
                            <path d={INNER_PATH} className="stroke-neutral-400 dark:stroke-neutral-600 opacity-60 dark:opacity-40" fill="none" strokeWidth="1.5" strokeDasharray="6 8" />
                        </svg>

                        {/* Nodes - Positioned using offset-path to ensure they sit directly on the dashed lines */}
                        {rawNodes.map((node) => (
                            <OrbitalNode
                                key={node.label}
                                node={node}
                                isHovered={hoveredNode === node.label}
                                onHover={() => setHoveredNode(node.label)}
                                onLeave={() => setHoveredNode(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function OrbitalNode({ node, isHovered, onHover, onLeave }: {
    node: NodeData; isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
    const path = node.orbitIndex === 0 ? INNER_PATH : OUTER_PATH;
    const isLeftSide = node.position < 0.25 || node.position > 0.75;

    return (
        <div
            className="absolute"
            style={{
                offsetPath: `path('${path}')`,
                offsetDistance: `${node.position * 100}%`,
                offsetRotate: '0deg',
                zIndex: isHovered ? 50 : 20
            }}
        >
            <div className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
                {/* 
                    The anchor point of this container is at (0,0). 
                    We place the button exactly at (0,0) by centering it with translate. 
                */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <button
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto",
                            "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm",
                            isHovered && "scale-110 shadow-lg border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-700"
                        )}
                    >
                        <Plus className={cn("w-4 h-4 transition-transform duration-500", isHovered && "rotate-45")} />
                    </button>

                    {/* Detail Card (Image 4 Style) - Anchored strictly to the center of the icon */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                className="absolute bottom-[calc(100%+12px)] left-1/2 z-50 pointer-events-none"
                            >
                                <div className="relative w-[320px] bg-neutral-950/95 dark:bg-neutral-50/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl pt-2 px-4 pb-4 md:pt-3 md:px-5 md:pb-5 space-y-3 border border-white/10 dark:border-black/5">
                                    {/* Tail to node */}
                                    <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-950/95 dark:bg-neutral-50/95 border-r border-b border-white/10 dark:border-black/5 rotate-45 -z-10" />
                                    <div className="space-y-1">
                                        <h4 className="text-neutral-100 dark:text-neutral-900 font-bold text-lg leading-tight">{node.label}</h4>
                                        <p className="text-neutral-400 dark:text-neutral-500 text-sm leading-relaxed">
                                            {node.description}
                                        </p>
                                    </div>

                                    {/* Image Visualization Area */}
                                    <div className="aspect-video relative rounded-xl bg-neutral-900/50 dark:bg-neutral-200/50 overflow-hidden border border-white/5 dark:border-black/5">
                                        {node.imageUrl ? (
                                            <Image src={node.imageUrl} alt={node.label} fill className="object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-white/20 dark:text-black/20 font-mono">
                                                Visualization Area
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 dark:from-neutral-50/60 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* The Label - Positioned relative to the anchor point (stays out of center logic) */}
                <div className={cn(
                    "absolute top-0 whitespace-nowrap transition-all duration-300 pointer-events-none",
                    isLeftSide ? "right-6 pr-4 text-right" : "left-6 pl-4 text-left",
                    "-translate-y-1/2"
                )}>
                    <span className={cn(
                        "text-sm font-bold text-black dark:text-white transition-all duration-300",
                        isHovered ? "opacity-100" : "opacity-70"
                    )}>
                        {node.label}
                    </span>
                </div>
            </div>
        </div>
    );
}

