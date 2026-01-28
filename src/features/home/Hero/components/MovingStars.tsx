'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const colors = [
    'bg-blue-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-yellow-400',
    'bg-cyan-400',
    'bg-indigo-400',
    'bg-white',
];

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
    parallaxFactor: number;
}

const ShootingStar = ({ delay }: { delay: number }) => {
    const [coords, setCoords] = useState<{ top: string, left: string } | null>(null);

    useEffect(() => {
        setCoords({
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 20}%`,
        });
    }, []);

    if (!coords) return null;

    return (
        <motion.div
            initial={{ x: "-100%", y: "0%", opacity: 0 }}
            animate={{
                x: ["0%", "200%"],
                y: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 10 + 5,
                delay: delay,
                ease: "linear",
            }}
            style={{
                top: coords.top,
                left: coords.left,
            }}
            className="absolute h-[1.5px] w-[120px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[30deg] z-0 pointer-events-none"
        />
    );
};

export const MovingStars = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth) - 0.5);
            mouseY.set((clientY / innerHeight) - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const generateStars = () => {
            const newStars: Star[] = [];
            const numStars = 120; // Slightly reduced to avoid overcrowding with larger sizes
            for (let i = 0; i < numStars; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 7 + 2, // ~3x larger (previous was 2.5 max)
                    color: colors[Math.floor(Math.random() * colors.length)],
                    duration: Math.random() * 2 + 1, // ~2x faster twinkle (previous was 4+2)
                    delay: Math.random() * -10,
                    parallaxFactor: Math.random() * 80 + 40, // More aggressive parallax (faster movement)
                });
            }
            setStars(newStars);
        };

        generateStars();
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
            {/* Background Glows (Nebulas) - Made 2x lighter */}
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-500/20 rounded-full blur-[140px] animate-pulse [animation-delay:3.5s]" />

            {/* Interactive Stars */}
            {stars.map((star) => (
                <StarItem key={star.id} star={star} springX={springX} springY={springY} />
            ))}

            <ShootingStar delay={3} />
            <ShootingStar delay={12} />
        </div>
    );
};

const StarItem = ({ star, springX, springY }: { star: Star, springX: any, springY: any }) => {
    const x = useTransform(springX, (v: number) => v * star.parallaxFactor);
    const y = useTransform(springY, (v: number) => v * star.parallaxFactor);

    return (
        <motion.div
            className={`absolute rounded-full ${star.color} shadow-[0_0_25px_rgba(255,255,255,1)]`}
            style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                x,
                y
            }}
            animate={{
                opacity: [0.6, 1, 0.6], // Much lighter (previous was 0.3-1)
                scale: [1, 1.5, 1],
            }}
            transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
            }}
        />
    );
};
