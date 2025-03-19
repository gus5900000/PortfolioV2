'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ 
          scale: isMobile ? 0.4 : 0.1,
          opacity: 0.5,
          filter: `blur(${isMobile ? 4 : 8}px)`,
          y: isMobile ? 10 : 20
        }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          filter: "blur(0px)",
          y: 0
        }}
        transition={{
          duration: isMobile ? 0.9 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}