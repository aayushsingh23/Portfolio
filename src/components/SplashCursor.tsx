import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Splash {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const SplashCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const splashId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e: MouseEvent) => {
      const newSplash: Splash = {
        id: splashId.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 40 + 20,
        opacity: 1,
      };

      setSplashes(prev => [...prev, newSplash]);

      // Remove splash after animation
      setTimeout(() => {
        setSplashes(prev => prev.filter(splash => splash.id !== newSplash.id));
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
        </div>
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-10 h-10 border border-green-400/50 rounded-full"></div>
      </motion.div>

      {/* Click Splash Effects */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed pointer-events-none z-30"
            style={{
              left: splash.x - splash.size / 2,
              top: splash.y - splash.size / 2,
            }}
            initial={{
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1.2, 1.5],
              opacity: [1, 0.6, 0],
            }}
            exit={{
              scale: 2,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            {/* Ripple Effect */}
            <div
              className="rounded-full border-2 border-green-400/60"
              style={{
                width: splash.size,
                height: splash.size,
              }}
            />
            
            {/* Inner Splash */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/20"
              animate={{
                scale: [0, 1],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />

            {/* Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * splash.size * 2],
                  y: [0, (Math.random() - 0.5) * splash.size * 2],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: Math.random() * 0.2,
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Global cursor hide styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
          
          a, button, input, textarea, select {
            cursor: none !important;
          }
          
          .cursor-grab {
            cursor: none !important;
          }
          
          .cursor-grabbing {
            cursor: none !important;
          }
        `
      }} />
    </>
  );
};
