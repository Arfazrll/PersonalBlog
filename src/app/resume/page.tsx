'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ResumePage() {
    // Hardcoded Resume URL from user request
    const resumeUrl = "https://drive.google.com/file/d/1mfYs2MOHpwEFLe-Ld4OCcgS1Lbo6wW7O/view";
    const previewUrl = "https://drive.google.com/file/d/1mfYs2MOHpwEFLe-Ld4OCcgS1Lbo6wW7O/preview";

    return (
        <div className="h-screen bg-background relative flex flex-col pt-24 pb-4 overflow-hidden">

            {/* Header / Controls */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container-creative px-6 mb-4 flex-none flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Portfolio</span>
                </Link>

                <div className="flex items-center gap-4">
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all active:scale-95"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Drive</span>
                    </a>
                    {/* Note: Direct download might not work with drive view link, so strictly opening external is safer */}
                </div>
            </motion.div>

            {/* Resume Viewer */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 min-h-0 pb-4"
            >
                <div className="w-full h-full">
                    <iframe
                        src={previewUrl}
                        className="w-full h-full border-none filter grayscale-0 dark:grayscale dark:contrast-150 dark:brightness-40 transition-all duration-300"
                        allow="autoplay"
                        title="Resume Viewer"
                    />
                </div>
            </motion.div>
        </div>
    );
}
