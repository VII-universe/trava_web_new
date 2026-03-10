import React, { useState, useEffect } from 'react';
import { useTransform, motion } from 'framer-motion';

const Altimeter = ({ scrollProgress }) => {

    // 4-Stage Mapping
    // 1. Approach: 0-800m
    // 2. Base Camp: 800-5364m
    // 3. Icefall: 5364-6400m
    // 4. Summit Push: 6400-8848m
    const altitude = useTransform(scrollProgress,
        [0, 0.25, 0.50, 0.75, 1],
        [0, 800, 5364, 6400, 8848]
    );

    const [currentAlt, setCurrentAlt] = useState(0);

    useEffect(() => {
        return altitude.on("change", (latest) => {
            setCurrentAlt(Math.round(latest));
        });
    }, [altitude]);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none mix-blend-difference text-slate-800">
            <div className="h-32 w-px bg-slate-800/30 relative overflow-hidden">
                <motion.div
                    style={{ height: useTransform(scrollProgress, [0, 1], ["0%", "100%"]) }}
                    className="absolute top-0 w-full bg-gold-400"
                />
            </div>

            <div className="flex flex-col items-center min-w-[60px]">
                <span className="font-oswald text-2xl font-bold tracking-wider text-slate-800 tabular-nums">
                    {currentAlt}
                </span>
                <span className="text-xs font-sans tracking-[0.2em] font-medium opacity-60 uppercase">m n.m.</span>
            </div>

            <div className="h-32 w-px bg-slate-800/30"></div>
        </div>
    );
};

export default Altimeter;
