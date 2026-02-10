'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface GalleryStackProps {
    images: string[];
}

export const GalleryStack = ({ images }: GalleryStackProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const displayImages = images.slice(0, 3);

    return (
        <Link href="/gallery">
            <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Glassmorphism Container */}
                <div className="
                    relative px-5 py-6 rounded-xl
                    bg-gradient-to-br from-background/40 via-background/20 to-transparent
                    backdrop-blur-md
                    border border-foreground/10
                    hover:border-cyan-400/40
                    transition-all duration-500
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
                ">
                    {/* Badge Count */}
                    <div className="absolute -top-2 -right-2 z-50
                        px-2 py-0.5 rounded-full
                        bg-cyan-400/90 backdrop-blur-sm
                        text-[8px] font-bold text-background
                        shadow-lg shadow-cyan-400/30
                        group-hover:scale-110 transition-transform duration-300
                    ">
                        {images.length}+
                    </div>

                    {/* Image Stack Container */}
                    <div className="relative h-32 w-44 mx-auto mb-3">
                        {/* Background Glow */}
                        <div className="
                            absolute inset-0 -z-10
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                            blur-2xl
                            bg-cyan-400/20
                            rounded-xl
                            scale-150
                        " />

                        {/* Stacked Images */}
                        {displayImages.map((img, index) => {
                            const rotations = [-8, 0, 8];
                            const translations = [
                                { x: -40, y: -20, rotate: -15 },
                                { x: 0, y: -30, rotate: 0 },
                                { x: 40, y: -20, rotate: 15 }
                            ];

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
                                    style={{
                                        zIndex: isHovered ? 10 + index : 10 - index,
                                    }}
                                    initial={{
                                        rotate: 0,
                                        y: index * 4,
                                        x: 0,
                                        scale: 1
                                    }}
                                    animate={isHovered ? {
                                        rotate: translations[index].rotate,
                                        y: translations[index].y,
                                        x: translations[index].x,
                                        scale: 1.05
                                    } : {
                                        rotate: rotations[index] * 0.5,
                                        y: index * 4,
                                        x: 0,
                                        scale: 1 - (index * 0.02)
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="relative w-full h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={`Gallery ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="160px"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                                                <ImageIcon className="w-8 h-8 text-cyan-400/30" />
                                            </div>
                                        )}

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Text */}
                    <div className="text-center space-y-0.5">
                        <div className="
                            text-[9px] font-mono text-foreground/60
                            group-hover:text-cyan-400
                            uppercase tracking-[0.3em]
                            transition-all duration-300
                            font-bold
                            group-hover:tracking-[0.35em]
                        ">
                            EXPLORE GALLERY
                        </div>
                        <div className="text-[7px] font-mono text-foreground/40 tracking-wider">
                            Visual Archive
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Main Gallery Button Export
export const GalleryButton = ({ galleryImages }: { galleryImages: string[] }) => {
    return <GalleryStack images={galleryImages} />;
};
