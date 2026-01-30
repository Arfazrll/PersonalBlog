'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonProps = HTMLMotionProps<'button'> & {
  hoverScale?: number;
  tapScale?: number;
};

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { Button, type ButtonProps };
