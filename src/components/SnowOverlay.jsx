import React, { useMemo } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const SnowOverlay = ({ scrollProgress }) => {
    // Number of particles
    const particleCount = 40;

    // Create stable random properties for particles
    const particles = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            drift: Math.random() * 100 - 50,
        }));
    }, []);

    // Snow intensity increases as we go up
    // Hero (0), About (0.2), Icefall (0.4), Climb (0.6), Summit (0.8)
    const snowOpacity = useTransform(
        scrollProgress,
        [0, 0.35, 0.45, 0.75, 0.85, 1],
        [0, 0.1, 0.4, 0.6, 0.2, 0.1] // Peak intensity at Icefall and Climb
    );

    const windIntensity = useTransform(
        scrollProgress,
        [0, 0.4, 0.8, 1],
        [1, 2.5, 4, 1.5] // Faster movement at high altitudes
    );

    return (
        <motion.div
            style={{ opacity: snowOpacity }}
            className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
        >
            {particles.map((p) => (
                <Particle key={p.id} p={p} windIntensity={windIntensity} />
            ))}
        </motion.div>
    );
};

const Particle = ({ p, windIntensity }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-white opacity-60 filter blur-[1px]"
            initial={{ left: p.left, top: -10 }}
            animate={{
                top: ["0%", "110%"],
                left: [p.left, `calc(${p.left} + ${p.drift}px)`],
            }}
            transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay,
            }}
            style={{
                width: p.size,
                height: p.size,
            }}
        />
    );
};

export default SnowOverlay;
