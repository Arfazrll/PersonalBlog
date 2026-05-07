import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Browser Automation Agent",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "AI & Automation",
    year: "2026",
    description: "AI-driven browser interaction & testing engine.",
  },
  {
    title: "Swarm AI Blog Writer",
    image: "/project/swarmaiblogwriter1.png",
    category: "AI & Content",
    year: "2025",
    description: "Multi-agent orchestration for research-backed content.",
  },
  {
    title: "Creative Portfolio Website",
    image: "/project/creativeportfoliowebsite1.png",
    category: "Creative Tech",
    year: "2025",
    description: "Immersive 3D portfolio with WebGL shaders.",
  },
  {
    title: "SNBTIn Platform",
    image: "/project/snbtinplatformpersiapansnbt20251.png",
    category: "EdTech",
    year: "2025",
    description: "Leading e-learning platform for SNBT preparation.",
  },
  {
    title: "Terraflow Platform",
    image: "/project/terraflowplatform1.png",
    category: "IoT & Embedded",
    year: "2025",
    description: "Enterprise IoT solution for precision agriculture.",
  },
];

export function ArgentLoopInfiniteSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // 700vh Narrative Sequence: 1 Intro -> 5 Projects -> 1 Outro
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 35, mass: 0.5 });

  // --- MATHEMATICAL STAGE MAPPING ---
  // Define precise scroll boundaries for consistency
  const introEnd = 0.15;
  const projectStart = 0.20;
  const projectEnd = 0.90;
  const outroStart = 0.92;

  // Stage indicator (0 to 6)
  const stage = useTransform(smoothProgress, [0, 1], [0, 6]);
  
  // Opacity: Intro fades out, Projects fade in, then fade out for Outro
  const headerOpacity = useTransform(smoothProgress, [0, introEnd - 0.05, introEnd], [1, 1, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, introEnd, projectStart, projectEnd, outroStart, 1], [0, 0, 1, 1, 0, 0]);
  const mainUIOpacity = useTransform(smoothProgress, [0, introEnd, projectStart, projectEnd, outroStart, 1], [0, 0, 1, 1, 0, 0]);
  const buttonOpacity = useTransform(smoothProgress, [projectEnd, outroStart], [0, 1]);

  // Background Parallax & Plateaus
  const currentY = useTransform(smoothProgress,
    [0, introEnd, projectStart, 0.30, 0.35, 0.45, 0.50, 0.60, 0.65, 0.75, 0.80, projectEnd],
    ["0vh", "0vh", "-100vh", "-100vh", "-200vh", "-200vh", "-300vh", "-300vh", "-400vh", "-400vh", "-500vh", "-500vh"]
  );

  // Card Content Internal Scrolling
  const contentInternalY = useTransform(smoothProgress,
    [0, introEnd, projectStart, 0.30, 0.35, 0.45, 0.50, 0.60, 0.65, 0.75, 0.80, projectEnd],
    ["0px", "0px", "0px", "0px", "-250px", "-250px", "-500px", "-500px", "-750px", "-750px", "-1000px", "-1000px"]
  );

  // Final Slide-Up Transition (Seamless Integration)
  const finalContainerY = useTransform(smoothProgress, [projectEnd, outroStart, 1], ["0px", "-320px", "-320px"]);

  const imageY = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={containerRef} className="relative h-[700vh]">
      <style>{`
        .argent-slider-wrapper {
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background: #000;
            z-index: 20;
        }
        .project-list {
            position: absolute;
            width: 100%;
            height: 100%;
            will-change: transform;
        }
        .project {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .project img {
            width: 100%;
            height: 124%;
            object-fit: cover;
            filter: brightness(0.3) blur(10px);
            transform: scale(1.05);
            will-change: transform;
        }
        .mist-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.6) 100%);
            z-index: 5;
            pointer-events: none;
        }
        .minimap-bar-outer {
            width: 85vw;
            height: 250px;
            background: white !important;
            box-shadow: 0 50px 120px -30px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        .minimap-content-viewport {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .minimap-img-preview {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 320px;
            height: 100%;
            overflow: hidden;
            z-index: 10;
            border-left: 1px solid rgba(0,0,0,0.06);
            border-right: 1px solid rgba(0,0,0,0.06);
        }
        .minimap-img-item {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .minimap-img-item img {
            width: 100%;
            height: 120%;
            object-fit: cover;
            will-change: transform;
        }
        .minimap-info-list {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
        }
        .minimap-item-info {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 3.5rem 6%;
            font-family: 'Inter', sans-serif;
            color: black !important;
            text-transform: uppercase;
        }
        .minimap-item-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .minimap-item-info-row p {
            margin: 0;
            font-size: 10px;
            letter-spacing: 0.2em;
            font-weight: 800;
        }
        .minimap-item-info-row:nth-child(2) p { color: #666; font-weight: 700; }
        .minimap-item-info-row:nth-child(3) p { color: #999; font-weight: 500; font-size: 9.5px; text-transform: lowercase; }
        
        .custom-btn {
            background: #c1e44a;
            color: black;
            border-radius: 9999px;
            padding: 1.25rem 3rem;
            font-weight: 800;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-btn-arrow {
            background: #c1e44a;
            color: black;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slide-overlay {
            position: absolute;
            bottom: 3rem;
            left: 5%;
            z-index: 110;
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .slide-line {
            width: 140px;
            height: 1px;
            position: relative;
        }
        .slide-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            will-change: width;
        }
      `}</style>
      
      <div className="argent-slider-wrapper">
        
        {/* --- STAGE 0: INTRO (Clean, Centered, Solid Black) --- */}
        <motion.div 
          style={{ opacity: headerOpacity }}
          className="absolute inset-0 z-[60] flex flex-col justify-center px-[7.5%] pointer-events-none"
        >
          <motion.h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-tight max-w-[1200px]">
            Discover my latest work and creative <br />
            solutions that bring ideas to life
          </motion.h2>
          <div className="flex items-center gap-6 mt-16 opacity-30">
            <span className="text-[11px] font-mono uppercase tracking-[0.5em] text-white">Scroll Sequence</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* --- STAGES 1-5: PROJECT BACKDROPS --- */}
        <motion.div style={{ opacity: bgOpacity }}>
          <div className="mist-overlay" />
          <motion.div className="project-list" style={{ y: currentY }}>
            {PROJECT_DATA.map((data, i) => (
              <div key={i} className="project" style={{ top: `${(i + 1) * 100}vh` }}>
                <motion.img src={data.image} alt={data.title} style={{ y: imageY }} />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- CORE INTERFACE LAYER --- */}
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ y: finalContainerY, willChange: "transform" }}
            className="flex flex-col items-center"
          >
            {/* The White Card assembly */}
            <motion.div style={{ opacity: mainUIOpacity }} className="minimap-bar-outer">
              <div className="minimap-content-viewport">
                <div className="minimap-img-preview">
                  <motion.div style={{ y: contentInternalY }} className="w-full h-full relative">
                    {PROJECT_DATA.map((data, i) => (
                      <div key={i} className="minimap-img-item" style={{ top: `${i * 250}px` }}>
                        <motion.img src={data.image} alt={data.title} style={{ y: imageY }} />
                      </div>
                    ))}
                  </motion.div>
                </div>
                <div className="minimap-info-list">
                  <motion.div style={{ y: contentInternalY }} className="w-full h-full relative">
                    {PROJECT_DATA.map((data, i) => {
                      const num = (i + 1).toString().padStart(2, "0");
                      return (
                        <div key={i} className="minimap-item-info" style={{ top: `${i * 250}px` }}>
                          <div className="minimap-item-info-row">
                            <p className="font-extrabold">{num}</p>
                            <h4 className="text-xl md:text-2xl font-black tracking-tighter uppercase">{data.title}</h4>
                          </div>
                          <div className="minimap-item-info-row">
                            <p>{data.category}</p>
                            <p className="font-extrabold tabular-nums">{data.year}</p>
                          </div>
                          <div className="minimap-item-info-row">
                            <p className="lowercase opacity-80 leading-relaxed max-w-[70%]">{data.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* The View More Button assembly (Integrated Below) */}
            <div className="h-[200px] w-full flex items-center justify-center pt-10">
              <motion.div 
                style={{ 
                  opacity: buttonOpacity,
                  pointerEvents: useTransform(smoothProgress, (v) => v > outroStart ? "auto" : "none")
                }}
              >
                <Link href="/projects" className="group flex items-center gap-4">
                  <div className="custom-btn group-hover:scale-105 active:scale-95 group-hover:shadow-[0_0_30px_rgba(193,228,74,0.3)]">
                    View More
                  </div>
                  <div className="custom-btn-arrow group-hover:scale-110 active:scale-95 group-hover:rotate-45 transition-transform shadow-xl">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* --- SYSTEM PROGRESS OVERLAY --- */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [introEnd, projectStart, projectEnd, outroStart], [0, 1, 1, 0]) }}
          className="slide-overlay"
        >
           <span className="text-white/40 font-mono text-[10px] tracking-[0.5em] uppercase">Sequence</span>
           <div className="slide-line bg-white/10">
              <motion.div 
                className="slide-progress bg-white" 
                style={{ width: useTransform(smoothProgress, [projectStart, projectEnd], ["0%", "100%"]) }} 
              />
           </div>
           <motion.span className="text-white font-mono text-[11px] tabular-nums font-bold">
             {useTransform(smoothProgress, 
               [0, 0.18, 0.32, 0.33, 0.47, 0.48, 0.62, 0.63, 0.77, 0.78, 1],
               ["0 / 5", "1 / 5", "1 / 5", "2 / 5", "2 / 5", "3 / 5", "3 / 5", "4 / 5", "4 / 5", "5 / 5", "5 / 5"]
             )}
           </motion.span>
        </motion.div>

      </div>
    </div>
  );
}
