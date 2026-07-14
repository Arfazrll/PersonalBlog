"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FaPython, FaVuejs, FaReact, FaNodeJs, FaGithub,
  FaDocker, FaAws, FaBrain
} from "react-icons/fa";
import {
  SiVite, SiTypescript, SiTailwindcss, SiNextdotjs, 
  SiFlask, SiJavascript, SiVercel
} from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import MagneticEffect from "@/components/ui/MagneticEffect";

const fallbackUrls = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&fm=webp", // coding image
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=100&h=100&fit=crop&fm=webp" // abstract tech image
];

const iconConfigs = [
  { Icon: FaPython, color: "#3776AB" },
  { Icon: FaVuejs, color: "#4FC08D" },
  { Icon: SiVite, color: "#646CFF" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiNextdotjs, color: "#000000", darkColor: "#ffffff" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiFlask, color: "#000000", darkColor: "#ffffff" },
  { Icon: FaGithub, color: "#181717", darkColor: "#ffffff" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiVercel, color: "#000000", darkColor: "#ffffff" },
  { Icon: FaBrain, color: "#FF69B4" },
  { Icon: null, img: fallbackUrls[0] },
  { Icon: null, img: fallbackUrls[1] },
];

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 9; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative w-full max-w-[1500px] mx-auto px-4 sm:px-6 my-16 md:my-32 z-10">
      <div className="group flex flex-col md:flex-row items-center justify-between min-h-[auto] md:min-h-[35rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-black overflow-hidden rounded-[2.5rem] shadow-sm relative transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:border-gray-300 dark:hover:border-white/20">
        
        {/* Shine overlay that triggers on group-hover */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden rounded-[2.5rem]">
          <div className="absolute inset-0 -translate-x-[150%] w-1/2 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent group-hover:shine-effect" />
        </div>
        {/* Left side: Heading and Text */}
        <div className="w-full md:w-[55%] z-20 p-6 sm:p-8 md:p-14 lg:p-20 group/text">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1] transition-all duration-500 group-hover/text:tracking-[0.05em] group-hover/text:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:group-hover/text:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Engineering <br className="hidden md:block" /> the Future
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl text-base md:text-lg leading-relaxed transition-colors duration-500 group-hover/text:text-gray-900 dark:group-hover/text:text-gray-200">
            {portfolioData.personal.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 relative z-30">
            <MagneticEffect strength={0.8} stiffness={120} damping={10}>
              <Button variant="default" asChild className="rounded-full px-6 md:px-8 py-5 md:py-6 font-semibold text-sm md:text-base bg-primary text-primary-foreground border border-transparent hover:!bg-white hover:!text-black dark:hover:!bg-black dark:hover:!text-white hover:!border-black dark:hover:!border-white transition-all duration-300 w-full sm:w-auto text-center justify-center">
                <Link href="/projects">View Projects</Link>
              </Button>
            </MagneticEffect>
            <MagneticEffect strength={0.8} stiffness={120} damping={10}>
              <Button variant="outline" asChild className="rounded-full px-6 md:px-8 py-5 md:py-6 font-semibold text-sm md:text-base bg-transparent border border-gray-200 dark:border-white/20 text-foreground hover:!bg-black hover:!text-white dark:hover:!bg-white dark:hover:!text-black transition-all duration-300 w-full sm:w-auto text-center justify-center">
                <Link href="/resume">My Resume</Link>
              </Button>
            </MagneticEffect>
          </div>
        </div>

        {/* Right side: Orbit animation cropped to 1/2 */}
        <div className="relative w-full md:w-[45%] h-[25rem] sm:h-[30rem] md:h-full md:min-h-[35rem] flex items-center justify-center md:justify-end overflow-hidden pointer-events-none mt-4 md:mt-0">
          {/* Positioning the center of orbits exactly on the right edge on desktop, centered bottom on mobile */}
          <div className="absolute left-1/2 md:left-auto md:right-0 top-1/2 md:top-1/2 -translate-x-1/2 md:translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem] flex items-center justify-center">
            
            {/* Center Circle */}
            <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center z-10 relative">
              <div className="center-spin">
                <FaReact className="w-8 h-8 md:w-14 md:h-14 text-[#61DAFB]" />
              </div>
            </div>

            {/* Generate Orbits */}
            {[...Array(orbitCount)].map((_, orbitIdx) => {
              const size = `${18 + orbitGap * (orbitIdx + 1)}rem`; // Calculate diameter
              const angleStep = (2 * Math.PI) / iconsPerOrbit;

              return (
                <div
                  key={orbitIdx}
                  className={`absolute rounded-full border border-dashed border-gray-300 dark:border-white/20 orbit-${orbitIdx}`}
                  style={{
                    width: size,
                    height: size,
                  }}
                >
                  {iconConfigs
                    .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                    .map((cfg, iconIdx) => {
                      const angle = iconIdx * angleStep;
                      const x = 50 + 50 * Math.cos(angle);
                      const y = 50 + 50 * Math.sin(angle);

                      return (
                        <div
                          key={iconIdx}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                          }}
                        >
                          <div 
                            className={`bg-white dark:bg-gray-900 rounded-full p-2.5 md:p-3 shadow-md flex items-center justify-center border border-gray-100 dark:border-white/10 orbit-icon-${orbitIdx}`}
                          >
                            {cfg.Icon ? (
                              <cfg.Icon 
                                className="w-5 h-5 md:w-7 md:h-7" 
                                style={{ color: cfg.darkColor ? "inherit" : cfg.color }} 
                              />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={cfg.img}
                                alt="icon"
                                className="w-5 h-5 md:w-7 md:h-7 object-cover rounded-full"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes stack-orbit-spin {
          from { transform: rotate(0deg) translateZ(0); }
          to { transform: rotate(360deg) translateZ(0); }
        }
        @keyframes stack-orbit-spin-reverse {
          from { transform: rotate(360deg) translateZ(0); }
          to { transform: rotate(0deg) translateZ(0); }
        }

        .center-spin {
          animation: stack-orbit-spin 15s linear infinite !important;
          will-change: transform;
        }

        @keyframes card-shine {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        
        .shine-effect {
          animation: card-shine 2s infinite ease-in-out;
        }

        .orbit-0 { animation: stack-orbit-spin 30s linear infinite !important; will-change: transform; }
        .orbit-icon-0 { animation: stack-orbit-spin-reverse 30s linear infinite !important; will-change: transform; }

        .orbit-1 { animation: stack-orbit-spin 45s linear infinite !important; will-change: transform; }
        .orbit-icon-1 { animation: stack-orbit-spin-reverse 45s linear infinite !important; will-change: transform; }

        .orbit-2 { animation: stack-orbit-spin 60s linear infinite !important; will-change: transform; }
        .orbit-icon-2 { animation: stack-orbit-spin-reverse 60s linear infinite !important; will-change: transform; }
        `
      }} />
    </section>
  );
}
