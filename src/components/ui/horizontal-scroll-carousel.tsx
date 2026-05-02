"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Users, Brain, Users2, MessageSquare, Puzzle,
  RefreshCw, BookOpen, Network, LineChart, Search
} from "lucide-react";

// Lucide icons disesuaikan dengan skill baru (AI & Software Engineer)
const skillIcons: Record<string, any> = {
  'Problem Solving': Puzzle,
  'Systemic Thinking': Network,
  'Critical Thinking': Brain,
  'Continuous Learning': BookOpen,
  'Analytical Thinking': LineChart,
  'Adaptability': RefreshCw,
  'Leadership': Users,
  'Communication': MessageSquare,
  'Teamwork': Users2,
  'Research Skills': Search,
};

// Popsy SVG illustrations yang dipastikan berfungsi
const skillVisuals: Record<string, string> = {
  'Problem Solving': 'https://illustrations.popsy.co/white/genius.svg',
  'Systemic Thinking': 'https://illustrations.popsy.co/white/abstract-art-6.svg',
  'Critical Thinking': 'https://illustrations.popsy.co/white/idea-launch.svg',
  'Continuous Learning': 'https://illustrations.popsy.co/white/student-going-to-school.svg',
  'Analytical Thinking': 'https://illustrations.popsy.co/white/success.svg',
  'Adaptability': 'https://illustrations.popsy.co/white/creative-work.svg',
  'Leadership': 'https://illustrations.popsy.co/white/team-idea.svg',
  'Communication': 'https://illustrations.popsy.co/white/communication.svg',
  'Teamwork': 'https://illustrations.popsy.co/white/shaking-hands.svg',
  'Research Skills': 'https://illustrations.popsy.co/white/presentation.svg',
};

const allCards = portfolioData.softSkills.slice(0, 10).map((skill, index) => ({
  id: index + 1,
  title: skill.name,
  description: skill.description,
  url: skillVisuals[skill.name] || 'https://illustrations.popsy.co/white/abstract-art-6.svg',
  Icon: skillIcons[skill.name] || Users
}));

export const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section 
        ref={targetRef} 
        className="relative h-[350vh] bg-background"
    >
      <div className="sticky top-0 flex flex-col h-screen overflow-hidden">
        
        {/* Title Section (Didorong ke paling atas layar) */}
        <div className="w-full px-6 md:px-24 pt-8 md:pt-12 z-20 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/40 leading-[0.9]">
                  Strategic <br /> Directives
              </h2>
              <div className="w-20 h-1.5 bg-primary mt-6 mb-4 rounded-full opacity-80"></div>
              <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                  Interpersonal capabilities engineered for high-impact leadership and systemic problem solving in complex environments.
              </p>
            </motion.div>
        </div>

        {/* Carousel Items (Diberi jarak pasti dari judul, rata atas) */}
        <div className="flex-1 flex items-start w-full relative mt-10 md:mt-16">
          <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-6 md:px-24 absolute left-0 w-max">
            {allCards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: typeof allCards[0] }) => {
  const { Icon } = card;
  return (
    <div
      key={card.id}
      className="group relative h-[380px] w-[280px] md:h-[440px] md:w-[380px] overflow-hidden bg-card/10 hover:bg-card/30 border border-border/80 shadow-sm flex-shrink-0 transition-colors duration-500 rounded-none"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-[1.03] opacity-60 group-hover:opacity-100">
        <img
          src={card.url}
          alt={card.title}
          className="w-full h-full object-contain dark:invert-0 invert"
        />
      </div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-100 pointer-events-none"></div>
      
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10 pointer-events-none">
        <div className="flex items-center gap-3 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="p-2 border border-border bg-background/50 backdrop-blur-sm rounded-none">
                <Icon className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                #{String(card.id).padStart(2, '0')}
            </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 leading-tight">
          {card.title}
        </h3>
        
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150 border-t border-border/50 pt-4">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;
