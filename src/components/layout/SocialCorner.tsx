"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, MessageSquare } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface SocialCornerProps {
    className?: string;
    delay?: number;
}

export const SocialCorner = ({ className, delay = 0.5 }: SocialCornerProps) => {
    const linkedinLink = portfolioData.personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url;
    const instagramLink = portfolioData.personal.socialLinks.find(s => s.platform === 'Instagram')?.url;
    const githubLink = portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.url;
    const discordLink = portfolioData.personal.socialLinks.find(s => s.platform === 'Discord')?.url;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay }}
            className={cn("hidden md:flex flex-col items-center gap-6", className)}
        >
            <div className="flex flex-col items-center gap-6">
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all hover:scale-110 group">
                    <Linkedin className="w-5 h-5 text-foreground/60 group-hover:text-foreground" />
                </a>
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all hover:scale-110 group">
                    <Instagram className="w-5 h-5 text-foreground/60 group-hover:text-foreground" />
                </a>
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all hover:scale-110 group">
                    <Github className="w-5 h-5 text-foreground/60 group-hover:text-foreground" />
                </a>
                <a href={discordLink} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all hover:scale-110 group">
                    <MessageSquare className="w-5 h-5 text-foreground/60 group-hover:text-foreground" />
                </a>
            </div>
            <div className="w-px h-32 md:h-48 bg-foreground/10" />
        </motion.div>
    );
};
