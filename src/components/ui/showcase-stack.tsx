'use client';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, ReactNode, Children, createContext, useContext } from 'react';

// Keep context export for compatibility
export const StackContext = createContext(false);
export const useIsInStack = () => useContext(StackContext);

const StackCard = ({ children, index, totalCards, scrollProgress }: {
  children: ReactNode;
  index: number;
  totalCards: number;
  scrollProgress: MotionValue<number>;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - index) * 0.05;
  const scale = useTransform(scrollProgress, [index * (1 / totalCards), 1], [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ShowcaseStack = ({ children }: { children: ReactNode }) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  const childArray = Children.toArray(children);

  return (
    <div ref={container} className="relative w-full">
      {childArray.map((child, i) => (
        <StackCard
          key={i}
          index={i}
          totalCards={childArray.length}
          scrollProgress={scrollYProgress}
        >
          {child}
        </StackCard>
      ))}
    </div>
  );
};

export default ShowcaseStack;
