'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FolderProps {
    items: string[]; // Array of image URLs
    color?: string;
    size?: number;
    className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export const GalleryFolder = ({
    items,
    color = '#27FF64',
    size = 1,
    className = ''
}: FolderProps) => {
    const [open, setOpen] = useState(false);

    const maxItems = 3;
    const papers = [...items.slice(0, maxItems), ...Array(Math.max(0, maxItems - items.length)).fill(null)];

    const folderBackColor = darkenColor(color, 0.08);
    const paper1 = darkenColor('#ffffff', 0.1);
    const paper2 = darkenColor('#ffffff', 0.05);
    const paper3 = '#ffffff';

    const getPaperBackground = (index: number) => {
        return index === 0 ? paper1 : index === 1 ? paper2 : paper3;
    };

    const getOpenTransform = (index: number) => {
        if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
        if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
        if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
        return '';
    };

    return (
        <Link
            href="/gallery"
            className={`inline-block ${className}`}
            style={{ transform: `scale(${size})` }}
        >
            <motion.div
                className="relative cursor-pointer transition-all duration-200 ease-in hover:-translate-y-2 group"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                animate={{ y: open ? -8 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Folder Container */}
                <div className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
                    style={{ backgroundColor: folderBackColor }}>

                    {/* Folder Tab */}
                    <span
                        className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px]"
                        style={{ backgroundColor: folderBackColor }}
                    />

                    {/* Papers with Images */}
                    {papers.map((item, i) => {
                        const widthClass = i === 0 ? 'w-[70%]' : i === 1 ? (open ? 'w-[80%]' : 'w-[80%]') : open ? 'w-[90%]' : 'w-[90%]';
                        const heightClass = i === 0 ? 'h-[80%]' : i === 1 ? (open ? 'h-[80%]' : 'h-[70%]') : open ? 'h-[80%]' : 'h-[60%]';

                        return (
                            <motion.div
                                key={i}
                                className={`absolute z-20 bottom-[10%] left-1/2 overflow-hidden ${widthClass} ${heightClass}`}
                                style={{
                                    backgroundColor: getPaperBackground(i),
                                    borderRadius: '10px',
                                }}
                                initial={{ x: '-50%', y: '10%' }}
                                animate={{
                                    x: open
                                        ? (getOpenTransform(i).includes('translate(-120%') ? '-120%'
                                            : getOpenTransform(i).includes('translate(10%') ? '10%'
                                                : '-50%')
                                        : '-50%',
                                    y: open ? '-70%' : (i === 2 ? '10%' : '0%'),
                                    rotate: open ? (i === 0 ? -15 : i === 1 ? 15 : 5) : 0,
                                    scale: 1
                                }}
                                whileHover={open ? { scale: 1.1 } : {}}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                {item && (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item}
                                            alt={`Gallery ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="100px"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Front Flap */}
                    <motion.div
                        className="absolute z-30 w-full h-full origin-bottom rounded-tl-[5px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
                        style={{ backgroundColor: color }}
                        animate={{
                            transform: open ? 'skew(15deg) scaleY(0.6)' : 'skew(0deg) scaleY(1)'
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />

                    {/* Right Flap */}
                    <motion.div
                        className="absolute z-30 w-full h-full origin-bottom rounded-tl-[5px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
                        style={{ backgroundColor: color }}
                        animate={{
                            transform: open ? 'skew(-15deg) scaleY(0.6)' : 'skew(0deg) scaleY(1)'
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </Link>
    );
};

// Gallery Button Component (untuk di samping BLOG)
export const GalleryButton = ({ galleryImages }: { galleryImages: string[] }) => {
    const imageCount = galleryImages.length;

    return (
        <div className="group relative">
            {/* Glassmorphism Container */}
            <div className="
                relative px-6 py-5 rounded-2xl
                bg-gradient-to-br from-background/40 via-background/20 to-transparent
                backdrop-blur-md
                border border-foreground/10
                hover:border-cyan-400/40
                transition-all duration-500
                hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
            ">
                <div className="flex flex-col items-center gap-3">
                    {/* Badge Count */}
                    <div className="absolute -top-2 -right-2 z-10 
                        px-2 py-1 rounded-full 
                        bg-cyan-400/90 backdrop-blur-sm
                        text-[9px] font-bold text-background
                        shadow-lg shadow-cyan-400/30
                        group-hover:scale-110 transition-transform duration-300
                    ">
                        {imageCount}+
                    </div>

                    {/* Folder with Glow */}
                    <div className="relative">
                        <GalleryFolder
                            items={galleryImages}
                            color="#22D3EE"
                            size={1.3}
                        />
                        {/* Glow Effect on Hover */}
                        <div className="
                            absolute inset-0 -z-10
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                            blur-2xl
                            bg-cyan-400/20
                            rounded-full
                            scale-150
                        " />
                    </div>

                    {/* Enhanced Text */}
                    <Link
                        href="/gallery"
                        className="
                            text-[10px] font-mono text-foreground/60 
                            group-hover:text-cyan-400 
                            uppercase tracking-[0.3em] 
                            transition-all duration-300
                            font-bold
                            group-hover:tracking-[0.35em]
                        "
                    >
                        EXPLORE GALLERY
                    </Link>
                </div>
            </div>
        </div>
    );
};
