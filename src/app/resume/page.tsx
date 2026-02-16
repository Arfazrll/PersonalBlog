'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ResumePage() {
    // File ID: 1mfYs2MOHpwEFLe-Ld4OCcgS1Lbo6wW7O
    const fileId = "1mfYs2MOHpwEFLe-Ld4OCcgS1Lbo6wW7O";
    const resumeUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

    // Standard preview URL with sharing context
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`;

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
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all active:scale-95 shadow-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in New Tab</span>
                    </a>
                </div>
            </motion.div>

            {/* Resume Viewer */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 min-h-0 pb-4 relative"
            >
                <div className="w-full h-full bg-muted/30 rounded-2xl border border-border/50 overflow-hidden relative group">
                    {/* Fallback Message (Behind Iframe) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 -z-10">
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                            <Download className="w-8 h-8 text-primary/40" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Resume Loading...</h3>
                        <p className="text-muted-foreground max-w-sm mb-6">
                            If the preview doesn't appear, please check your Drive permissions or click the button below.
                        </p>
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium hover:underline flex items-center gap-2"
                        >
                            Open Resume Directly <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    <iframe
                        src={previewUrl}
                        className="w-full h-full border-none relative z-10 transition-all duration-300 pointer-events-auto"
                        allow="autoplay"
                        title="Resume Viewer"
                    />
                </div>
            </motion.div>
        </div>
    );
}
