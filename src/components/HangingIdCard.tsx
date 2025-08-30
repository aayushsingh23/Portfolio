import { motion, useMotionValue, useTransform, useDragControls, useSpring, useVelocity } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const HangingIdCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  // Motion values for the card position with spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring physics to the motion values
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 1 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 1 });

  // Get velocity for more realistic physics
  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);

  // Enhanced rotation transforms with better physics
  const rotateX = useTransform(
    [springY, velocityY],
    ([latestY, latestVelY]) => {
      const rotationFromPosition = (latestY as number) * -0.1;
      const rotationFromVelocity = (latestVelY as number) * -0.02;
      return Math.max(-15, Math.min(15, rotationFromPosition + rotationFromVelocity));
    }
  );

  const rotateY = useTransform(
    [springX, velocityX],
    ([latestX, latestVelX]) => {
      const rotationFromPosition = (latestX as number) * 0.1;
      const rotationFromVelocity = (latestVelX as number) * 0.02;
      return Math.max(-20, Math.min(20, rotationFromPosition + rotationFromVelocity));
    }
  );

  const rotateZ = useTransform(
    [springX, velocityX],
    ([latestX, latestVelX]) => {
      const rotationFromPosition = (latestX as number) * 0.05;
      const rotationFromVelocity = (latestVelX as number) * 0.01;
      return Math.max(-8, Math.min(8, rotationFromPosition + rotationFromVelocity));
    }
  );

  // Add subtle idle floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isHovered) {
        const randomX = (Math.random() - 0.5) * 6;
        const randomY = (Math.random() - 0.5) * 4;
        x.set(x.get() + randomX);
        y.set(y.get() + randomY);
      }
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    // Add continuous floating motion
    const floatingInterval = setInterval(() => {
      if (!isDragging && !isHovered) {
        const time = Date.now() * 0.001;
        const floatX = Math.sin(time * 0.5) * 3;
        const floatY = Math.cos(time * 0.3) * 2;
        x.set(floatX);
        y.set(floatY);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(floatingInterval);
    };
  }, [isDragging, isHovered, x, y]);

  return (
    <div className="relative h-full w-full flex items-center justify-center" ref={constraintsRef}>
      {/* Floating particles effect */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 80 - 40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
          style={{
            left: `${45 + Math.random() * 10}%`,
            top: `${45 + Math.random() * 10}%`,
          }}
        />
      ))}

      {/* ID Card with floating physics */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          rotateZ,
        }}
        drag
        dragControls={dragControls}
        dragConstraints={{ left: -120, right: 120, top: -100, bottom: 100 }}
        dragElastic={0.05}
        dragTransition={{
          bounceStiffness: 200,
          bounceDamping: 20,
          power: 0.2
        }}
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{
          scale: 0.95,
          rotateX: 5,
          transition: { duration: 0.1 }
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          // Add some bounce back effect
          x.set(x.get() * 0.7);
          y.set(y.get() * 0.7);
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="cursor-grab active:cursor-grabbing"
        animate={{
          y: isHovered ? -8 : 0,
          rotateY: isHovered ? 3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
      >
        {/* Dynamic shadow based on position */}
        <motion.div
          className="absolute inset-0 bg-black/20 rounded-lg blur-lg transform translate-y-4 translate-x-2"
          style={{
            opacity: useTransform(
              [springX, springY],
              ([x, y]) => Math.max(0.1, Math.min(0.4, 0.2 + Math.abs(x as number) * 0.003 + Math.abs(y as number) * 0.002))
            ),
            x: useTransform(springX, (value) => (value as number) * 0.1),
            y: useTransform(springY, (value) => 4 + (value as number) * 0.05),
            scale: useTransform(
              [springX, springY],
              ([x, y]) => 0.95 + Math.abs(x as number) * 0.0005 + Math.abs(y as number) * 0.0003
            )
          }}
        />

        <Card className="relative w-96 h-[28rem] bg-gradient-to-br from-green-900 via-green-800 to-green-700 border-2 border-green-600 shadow-2xl overflow-hidden">
          {/* Floating glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-transparent to-green-400/10 rounded-lg pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Highlight effect based on rotation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg pointer-events-none"
            style={{
              opacity: useTransform(
                [rotateY, rotateX],
                ([rY, rX]) => Math.max(0, Math.min(0.3, (rY as number) * 0.02 + (rX as number) * 0.01))
              )
            }}
          />

          <CardContent className="relative p-8 h-full flex flex-col text-green-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-sm text-green-300 mb-2 font-mono">SYSTEM_ID_CARD</div>
              <div className="text-xl font-bold text-green-100 tracking-wide">AAYUSH SINGH</div>
              <motion.div
                className="text-sm text-green-200 bg-green-800 px-2 py-1 rounded inline-block border border-green-600"
                animate={{
                  boxShadow: isHovered
                    ? "0 0 10px rgba(34, 197, 94, 0.3)"
                    : "0 0 0px rgba(34, 197, 94, 0)"
                }}
                transition={{ duration: 0.3 }}
              >
                ACTIVE
              </motion.div>
            </div>

            {/* Photo Section */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="w-28 h-28 border-2 border-green-500 rounded bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.style.display = 'flex';
                  }}
                />
                <span
                  className="text-4xl font-bold text-green-100 w-full h-full flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  AS
                </span>
              </motion.div>
            </div>

            {/* Details */}
            <div className="space-y-4 text-base flex-1">
              <div className="flex justify-between border-b border-green-700/50 pb-2">
                <span className="text-green-300 font-mono">ROLE:</span>
                <span className="text-green-100">Software Developer</span>
              </div>
              <div className="flex justify-between border-b border-green-700/50 pb-2">
                <span className="text-green-300 font-mono">LEVEL:</span>
                <span className="text-green-100">Student</span>
              </div>
              <div className="flex justify-between border-b border-green-700/50 pb-2">
                <span className="text-green-300 font-mono">STATUS:</span>
                <span className="text-green-200">Available</span>
              </div>
              <div className="flex justify-between border-b border-green-700/50 pb-2">
                <span className="text-green-300 font-mono">LOCATION:</span>
                <span className="text-green-100">Remote</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <div className="text-green-300 text-sm mb-3 font-mono">PRIMARY_SKILLS</div>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "TypeScript", "Python"].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="bg-green-800 text-green-100 px-3 py-2 rounded text-sm border border-green-600 font-mono"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgb(22, 101, 52)",
                      boxShadow: "0 0 5px rgba(34, 197, 94, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <motion.div
              className="mt-6 text-center"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-xs text-green-400 font-mono">
                &gt; type 'help' in terminal to explore
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
