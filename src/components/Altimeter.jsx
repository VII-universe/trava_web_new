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
        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-4 pointer-events-none">
            {/* Upper Scale */}
            <div className="h-24 md:h-32 w-12 flex items-center justify-center relative">
                <div className="h-full w-px bg-white/30 relative shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    {/* Tick Marks */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute right-0 h-px bg-white/40 shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                            style={{ top: `${i * 20}%`, width: i % 2 === 0 ? '12px' : '6px' }}
                        />
                    ))}
                    <motion.div
                        style={{ height: useTransform(scrollProgress, [0, 1], ["0%", "100%"]) }}
                        className="absolute top-0 w-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    />
                </div>
            </div>

            {/* Altitude Display */}
            <div className="flex flex-col items-center min-w-[70px] md:min-w-[80px] py-3 md:py-4 px-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white tabular-nums drop-shadow-md">
                    {currentAlt}
                </span>
                <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] font-bold text-gold-400 uppercase mt-1 drop-shadow-sm">m n.m.</span>
            </div>

            {/* Lower Scale */}
            <div className="h-24 md:h-32 w-12 flex items-center justify-center relative">
                <div className="h-full w-px bg-white/30 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    {/* Tick Marks */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute right-0 h-px bg-white/40 shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                            style={{ top: `${i * 20}%`, width: i % 2 === 0 ? '12px' : '6px' }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Altimeter;
