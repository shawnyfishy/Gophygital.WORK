import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  mode?: 'zoom-in' | 'zoom-out';
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = "16/9",
  mode = "zoom-in"
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax Y movement
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // Continuous Zoom Effect
  // zoom-in: Starts normal (1), zooms in to (1.25) as you scroll past
  // zoom-out: Starts zoomed (1.25), zooms out to normal (1) as you scroll past
  const scale = useTransform(
    scrollYProgress, 
    [0, 1], 
    mode === 'zoom-in' ? [1, 1.25] : [1.25, 1]
  );

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`} 
      style={{ aspectRatio }}
    >
      <motion.div style={{ y, scale }} className="w-full h-full origin-center">
        <img src={src} alt={alt} className="w-full h-full object-cover will-change-transform" />
      </motion.div>
    </div>
  );
};