import React, { useRef } from 'react';
import { motion, useInView, UseInViewOptions, Variants } from 'framer-motion';

type RevealVariant = 'fade-up' | 'fade-in' | 'scale' | 'blur' | 'slide-right' | 'slide-left';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  className?: string;
  variant?: RevealVariant;
  options?: UseInViewOptions;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0, 
  duration = 0.8,
  className = "",
  variant = 'fade-up',
  options = {} 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px", ...options });

  const getVariants = (): Variants => {
    switch (variant) {
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
          visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0 }
        };
      case 'fade-in':
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <div ref={ref} style={{ width }} className={`relative ${className}`}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ 
          duration, 
          delay, 
          ease: [0.16, 1, 0.3, 1] // Apple's signature ease-out curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const TextReveal: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    
    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : { y: "110%" }}
                transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {text}
            </motion.span>
        </span>
    )
}