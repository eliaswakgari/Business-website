"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingParticlesProps {
  count?: number;
}

export function FloatingParticles({ count = 20 }: FloatingParticlesProps) {
  // Generate particles data once on mount to avoid hydration mismatch
  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      // Use index as seed for consistent values
      const seed = i / count;
      return {
        width: 50 + (seed * 100),
        height: 50 + (seed * 100),
        left: (seed * 100) % 100,
        top: ((seed * 137.5) % 100), // Use golden ratio for distribution
        x: (seed * 100) - 50,
        y: ((seed * 73) % 100) - 50,
        duration: 20 + (seed * 20),
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-xl"
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            x: [0, particle.x],
            y: [0, particle.y],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GridOverlay() {
  return (
    <div
      className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 0H0V1.5V30H1.5V1.5H30V0H1.5Z' fill='white'/%3E%3C/svg%3E\")",
        backgroundSize: "30px 30px",
      }}
    />
  );
}
