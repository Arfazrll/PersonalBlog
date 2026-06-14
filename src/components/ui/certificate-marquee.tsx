"use client";

import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const certificates = [
  "/certificate/Data Analytics on Google Cloud.png",
  "/certificate/Deep Learning Beginner.jpg",
  "/certificate/Docker, Kubernetes dan DevOps.jpg",
  "/certificate/Fullstack Programming Untuk Pemula.jpg",
  "/certificate/Introduction to Generative AI.png",
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

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/3 min-w-[250px] flex-col gap-[2vw] md:gap-[3vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-65%] will-change-transform"
      style={{ y, translateZ: 0 }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10" style={{ paddingTop: '75%' }}>
          <Image
            src={src}
            alt={`Certificate ${i}`}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export function CertificateShowcase() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  // Extremely soft spring to act as a low-pass filter. 
  // This absorbs ALL micro-vibrations and judders from Framer Motion's scroll calculations.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 15,
    mass: 0.2,
    restDelta: 0.001
  });

  const { height } = dimension;
  const y = useTransform(smoothProgress, [0, 1], [0, height * 1.2]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, height * 2.0]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, height * 0.8]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full bg-background overflow-hidden pb-32">
      {/* Intro Text Section */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10 max-w-[1750px] mb-20 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center justify-center gap-8 w-full"
        >
          <div className="space-y-6 w-full">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary/60 uppercase">
                Certifications & Achievements
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight max-w-none text-foreground">
                Validating <span className="text-shiny">Excellence</span> through Global Standards.
              </h3>
              <p className="text-lg text-muted-foreground max-w-none leading-relaxed lg:whitespace-nowrap">
                A collection of my professional certifications in AI, Web Development, and Cloud Engineering from industry leaders.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <ScrambleButton href="/achievements" />
          </div>
        </motion.div>
      </div>

      {/* Parallax Gallery - Reduced to 3 columns with margins on sides */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24">
        <div
          ref={gallery}
          className="relative box-border flex h-[100vh] md:h-[130vh] gap-[2vw] md:gap-[3vw] overflow-hidden rounded-3xl"
        >
          {/* Fill each column with more images so they don't run out during the scroll */}
          <Column images={[certificates[0], certificates[1], certificates[2], certificates[3], certificates[4], certificates[5]]} y={y} />
          <Column images={[certificates[5], certificates[6], certificates[7], certificates[8], certificates[9], certificates[0]]} y={y2} />
          <Column images={[certificates[9], certificates[8], certificates[7], certificates[6], certificates[5], certificates[4]]} y={y3} />
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[20%] left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}
