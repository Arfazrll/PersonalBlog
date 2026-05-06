import * as React from "react";

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
    description: "AI-driven browser interaction & testing engine",
  },
  {
    title: "Swarm AI Blog Writer",
    image: "/project/swarmaiblogwriter1.png",
    category: "AI & Content",
    year: "2025",
    description: "Multi-agent orchestration for research-backed content",
  },
  {
    title: "Creative Portfolio Website",
    image: "/project/creativeportfoliowebsite1.png",
    category: "Creative Tech",
    year: "2025",
    description: "Immersive 3D portfolio with WebGL shaders",
  },
  {
    title: "SNBTIn Platform",
    image: "/project/snbtinplatformpersiapansnbt20251.png",
    category: "EdTech",
    year: "2025",
    description: "Leading e-learning platform for SNBT preparation",
  },
  {
    title: "Terraflow Platform",
    image: "/project/terraflowplatform1.png",
    category: "IoT & Embedded",
    year: "2025",
    description: "Enterprise IoT solution for precision agriculture",
  },
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 500,
};

// Utility functions
const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const getProjectData = (index: number) => {
  const i =
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
    PROJECT_DATA.length;
  return PROJECT_DATA[i];
};

const getProjectNumber = (index: number) => {
  return (
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
      PROJECT_DATA.length +
    1
  )
    .toString()
    .padStart(2, "0");
};

import { motion, useScroll, useTransform } from "framer-motion";

export function ArgentLoopInfiniteSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Track scroll progress of a 600vh container (100vh per project + buffer)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to project indices (0 to 4)
  // We use discrete steps with a small transition window
  const currentIndex = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [0, 1, 2, 3, 4, 4]
  );

  // Manual transform values for smooth interpolation
  // This replaces the internal lerp logic with native Framer Motion physics
  const currentY = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    ["0vh", "-100vh", "-200vh", "-300vh", "-400vh"]
  );

  const minimapY = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    ["0px", "-160px", "-320px", "-480px", "-640px"]
  );

  // Parallax offsets
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={containerRef} className="relative h-[600vh] argent-slider-wrapper">
      <style>{`
        .argent-slider-wrapper {
            background: #000;
        }
        .sticky-container {
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background: #000;
        }
        .project-list {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .project {
            position: absolute;
            width: 100%;
            height: 100vh;
            overflow: hidden;
        }
        .project img {
            width: 100%;
            height: 115%;
            object-fit: cover;
            filter: brightness(0.7);
        }
        .minimap {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 160px;
            background: white;
            transform: translateY(-50%);
            z-index: 100;
            display: flex;
            align-items: center;
        }
        .minimap-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
        }
        .minimap-img-preview {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 300px;
            height: 100%;
            overflow: hidden;
            z-index: 2;
        }
        .minimap-img-item {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .minimap-img-item img {
            width: 100%;
            height: 115%;
            object-fit: cover;
        }
        .minimap-info-list {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .minimap-item-info {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2rem 5%;
            font-family: 'Inter', sans-serif;
            color: black;
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
            letter-spacing: 0.15em;
            font-weight: 800;
        }
        .minimap-item-info-row p:nth-child(1) { width: 35%; }
        .minimap-item-info-row p:nth-child(2) { width: 35%; text-align: right; }
        .minimap-item-info-row:nth-child(3) p { width: 35%; color: #888; font-weight: 500; font-size: 9px; }
        
        /* Transition overlay */
        .slide-overlay {
            position: absolute;
            bottom: 2rem;
            left: 5%;
            z-index: 110;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .slide-line {
            width: 100px;
            height: 1px;
            background: rgba(255,255,255,0.2);
            position: relative;
        }
        .slide-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: white;
        }
      `}</style>
      
      <div className="sticky-container">
        <motion.div className="project-list" style={{ y: currentY }}>
          {PROJECT_DATA.map((data, i) => (
            <div
              key={i}
              className="project"
              style={{ top: `${i * 100}vh` }}
            >
              <motion.img 
                src={data.image} 
                alt={data.title} 
                style={{ y: imageY }}
              />
            </div>
          ))}
        </motion.div>

        <div className="minimap">
          <div className="minimap-wrapper">
            <div className="minimap-img-preview">
              <motion.div style={{ y: minimapY }} className="w-full h-full relative">
                {PROJECT_DATA.map((data, i) => (
                  <div
                    key={i}
                    className="minimap-img-item"
                    style={{ top: `${i * 160}px` }}
                  >
                    <motion.img 
                        src={data.image} 
                        alt={data.title} 
                        style={{ y: imageY }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="minimap-info-list">
              <motion.div style={{ y: minimapY }} className="w-full h-full relative">
                {PROJECT_DATA.map((data, i) => {
                  const num = (i + 1).toString().padStart(2, "0");
                  return (
                    <div
                      key={i}
                      className="minimap-item-info"
                      style={{ top: `${i * 160}px` }}
                    >
                      <div className="minimap-item-info-row">
                        <p>{num}</p>
                        <p>{data.title}</p>
                      </div>
                      <div className="minimap-item-info-row">
                        <p>{data.category}</p>
                        <p>{data.year}</p>
                      </div>
                      <div className="minimap-item-info-row">
                        <p>{data.description}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="slide-overlay">
           <span className="text-white/50 font-mono text-[10px] tracking-widest uppercase">Project</span>
           <div className="slide-line">
              <motion.div 
                className="slide-progress" 
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} 
              />
           </div>
           <motion.span className="text-white font-mono text-[10px]">
             {useTransform(currentIndex, (val) => `${Math.floor(val) + 1} / ${PROJECT_DATA.length}`)}
           </motion.span>
        </div>
      </div>
    </div>
  );
}
