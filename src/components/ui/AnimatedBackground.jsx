import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const FloatingElement = ({ children, delay = 0, duration = 6, className = "" }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [-20, -40, -20],
        x: [-10, 10, -10],
        rotate: [0, 180, 360],
        opacity: [0.3, 0.7, 0.3]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const DriftingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: -100, y: 0, opacity: 0 }}
      animate={{
        x: ['100vw', '110vw'],
        y: [0, -50, -100],
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  );
};

const SparkleEffect = ({ delay = 0, className = "" }) => {
  return (
    <motion.div
      className={`absolute w-2 h-2 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
    </motion.div>
  );
};

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 animate-gradient-shift bg-[length:400%_400%]" />
      
      {/* Floating Hearts */}
      <FloatingElement delay={0} duration={6} className="top-20 left-10">
        <Heart className="w-6 h-6 text-rose-300 fill-rose-200" />
      </FloatingElement>
      
      <FloatingElement delay={2} duration={8} className="top-40 right-20">
        <Heart className="w-4 h-4 text-pink-300 fill-pink-200" />
      </FloatingElement>
      
      <FloatingElement delay={4} duration={7} className="top-60 left-1/3">
        <Heart className="w-5 h-5 text-rose-400 fill-rose-300" />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={9} className="bottom-40 right-10">
        <Heart className="w-3 h-3 text-pink-400 fill-pink-300" />
      </FloatingElement>

      {/* Floating Stars */}
      <FloatingElement delay={3} duration={5} className="top-32 right-1/4">
        <Star className="w-4 h-4 text-yellow-300 fill-yellow-200" />
      </FloatingElement>
      
      <FloatingElement delay={6} duration={8} className="bottom-60 left-20">
        <Star className="w-3 h-3 text-amber-300 fill-amber-200" />
      </FloatingElement>

      {/* Floating Sparkles */}
      <FloatingElement delay={1.5} duration={6} className="top-28 left-1/2">
        <Sparkles className="w-5 h-5 text-purple-300" />
      </FloatingElement>
      
      <FloatingElement delay={4.5} duration={7} className="bottom-32 right-1/3">
        <Sparkles className="w-4 h-4 text-indigo-300" />
      </FloatingElement>

      {/* Drifting Elements */}
      <DriftingElement delay={0} className="top-16">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-200 to-pink-200 opacity-40" />
      </DriftingElement>
      
      <DriftingElement delay={5} className="top-1/2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-200 to-indigo-200 opacity-40" />
      </DriftingElement>
      
      <DriftingElement delay={10} className="bottom-20">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 opacity-30" />
      </DriftingElement>

      {/* Sparkle Effects */}
      {Array.from({ length: 12 }, (_, i) => (
        <SparkleEffect
          key={i}
          delay={i * 0.5}
          className={`
            ${i % 4 === 0 ? 'top-20' : ''}
            ${i % 4 === 1 ? 'top-1/3' : ''}
            ${i % 4 === 2 ? 'top-2/3' : ''}
            ${i % 4 === 3 ? 'bottom-20' : ''}
            ${i % 3 === 0 ? 'left-10' : ''}
            ${i % 3 === 1 ? 'left-1/2' : ''}
            ${i % 3 === 2 ? 'right-10' : ''}
          `}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border border-rose-200 rounded-full opacity-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 left-10 w-16 h-16 border border-pink-200 rotate-45 opacity-20"
        animate={{
          rotate: [45, 405],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-5 w-12 h-12 border border-purple-200 rounded-full opacity-15"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
