"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={cn(
        "flex overflow-hidden [--gap:2rem] w-full py-4 relative",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex shrink-0 w-max"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
            animationPlayState: isPaused ? "paused" : "running"
        }}
      >
        {/* Render 4 copies so even on ultrawide screens it never runs out of content, moving by -50% shifts exactly 2 copies seamlessly */}
        <div className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]" aria-hidden="true">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]" aria-hidden="true">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

const certificatesRow1 = [
  "/certificate/Data Analytics on Google Cloud.png",
  "/certificate/Deep Learning Beginner.jpg",
  "/certificate/Docker, Kubernetes dan DevOps.jpg",
  "/certificate/Fullstack Programming Untuk Pemula.jpg",
  "/certificate/Introduction to Generative AI.png",
];

const certificatesRow2 = [
  "/certificate/Machine Learning Foundations.png",
  "/certificate/Mastering Smart Contract.jpg",
  "/certificate/Started with Databases.png",
  "/certificate/Supervised Machine Learning Regression and Classification.jpeg",
  "/certificate/elevAIte with Dicoding Program 2025.png",
];

function ScrambleButton({ href }: { href: string }) {
  const [displayText, setDisplayText] = useState("View All Achievements");
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = "View All Achievements";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20"
    >
      <span className="relative z-10">{displayText}</span>
      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 translate-x-[-100%] group-hover:animate-[move-x_1.5s_infinite]" />
    </Link>
  );
}

export function CertificateShowcase() {
  return (
    <section className="relative pt-0 pb-24 md:pb-32 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10 max-w-[1750px]">
        {/* Top Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center justify-center gap-8 py-4 w-full mb-16"
        >
          <div className="space-y-6 w-full">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary/60 uppercase">
                Certifications & Achievements
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight max-w-none">
                Validating <span className="text-shiny">Excellence</span> through Global Standards.
              </h3>
              <p className="text-lg text-muted-foreground max-w-none leading-relaxed lg:whitespace-nowrap">
                A collection of my professional certifications in AI, Web Development, and Cloud Engineering from industry leaders.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ScrambleButton href="/achievements" />
          </div>
        </motion.div>

        {/* Bottom Marquee Grid - Inside Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full relative overflow-hidden perspective-1000"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="relative group/marquee flex flex-col gap-6">
              
              <Marquee speed={35} pauseOnHover className="[--gap:2rem]">
                {certificatesRow1.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-72 h-52 md:w-[450px] md:h-[300px] rounded-2xl overflow-hidden flex-shrink-0 glass-card border-primary/10 group-hover:scale-[0.98] transition-transform duration-500"
                  >
                    <img
                      src={src}
                      alt={`Certificate ${idx + 1}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                    />
                  </div>
                ))}
              </Marquee>

              <Marquee speed={40} reverse pauseOnHover className="[--gap:2rem]">
                {certificatesRow2.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-72 h-52 md:w-[450px] md:h-[300px] rounded-2xl overflow-hidden flex-shrink-0 glass-card border-primary/10 group-hover:scale-[0.98] transition-transform duration-500"
                  >
                    <img
                      src={src}
                      alt={`Certificate ${idx + 6}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                    />
                  </div>
                ))}
              </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
