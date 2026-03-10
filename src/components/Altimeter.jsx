import React, { useState, useEffect } from 'react';
import { useTransform, motion } from 'framer-motion';

const Altimeter = ({ scrollProgress }) => {

    // 5-Stage Mapping
    // 1. Approach: 0-800m
    // 2. Base Camp: 800-5364m
    // 3. Icefall: 5364-6400m
    // 4. Climb: 6400-8000m
    // 5. Summit: 8000-8848m
    const altitude = useTransform(scrollProgress,
        [0, 0.20, 0.40, 0.60, 0.80, 1],
        [0, 800, 5364, 6400, 8000, 8848]
    );

    const [currentAlt, setCurrentAlt] = useState(0);

    useEffect(() => {
        return altitude.on("change", (latest) => {
            setCurrentAlt(Math.round(latest));
        });
    }, [altitude]);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-4 pointer-events-none mix-blend-difference text-slate-800">
            {/* Upper Scale */}
            <div className="h-32 w-12 flex items-center justify-center relative">
                <div className="h-full w-px bg-slate-800/30 relative">
                    {/* Tick Marks */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute right-0 h-px bg-slate-800/30"
                            style={{ top: `${i * 20}%`, width: i % 2 === 0 ? '12px' : '6px' }}
                        />
                    ))}
                    <motion.div
                        style={{ height: useTransform(scrollProgress, [0, 1], ["0%", "100%"]) }}
                        className="absolute top-0 w-full bg-gold-400"
                    />
                </div>
            </div>

            {/* Altitude Display */}
            <div className="flex flex-col items-center min-w-[80px] py-4 px-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                <span className="font-serif text-3xl font-bold tracking-wider text-slate-800 tabular-nums">
                    {currentAlt}
                </span>
                <span className="text-[10px] font-sans tracking-[0.3em] font-bold opacity-70 uppercase mt-1">m n.m.</span>
            </div>

            {/* Lower Scale */}
            <div className="h-32 w-12 flex items-center justify-center relative">
                <div className="h-full w-px bg-slate-800/30">
                    {/* Tick Marks */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute right-0 h-px bg-slate-800/30"
                            style={{ top: `${i * 20}%`, width: i % 2 === 0 ? '12px' : '6px' }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Altimeter;
