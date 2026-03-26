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

    // Fade in a dark background for readability starting at "About" section
    const bgOpacity = useTransform(scrollProgress, [0.08, 0.12], [0, 1]);

    const [currentAlt, setCurrentAlt] = useState(0);

    useEffect(() => {
        return altitude.on("change", (latest) => {
            setCurrentAlt(Math.round(latest));
        });
    }, [altitude]);

    const SECTIONS = [
        { label: 'Úvod',      y: 0.02 },
        { label: 'Příběh',    y: 0.12 },
        { label: 'Partneři',  y: 0.20 },
        { label: 'Expedice',  y: 0.29 },
        { label: 'Nepál',     y: 0.44 },
        { label: 'Projekty',  y: 0.55 },
        { label: 'Média',     y: 0.69 },
        { label: 'Osvěta',    y: 0.80 },
        { label: 'Kontakt',   y: 0.96 },
    ];

    const handleScrollTo = (yPercent) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: totalHeight * yPercent, behavior: 'smooth' });
    };

    return (
        <div className="fixed right-0 top-0 h-screen z-[100] w-[110px] md:w-[160px] flex items-center justify-end pointer-events-none pr-4 md:pr-8">
            
            {/* Background Gradient for readability (fades in from About section onwards) */}
            <motion.div 
                style={{ opacity: bgOpacity }}
                className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-slate-950/80 to-transparent pointer-events-none"
            />

            {/* Content Container (h-60 or 70 vh centered) */}
            <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-end">
                {/* Main Axis Line (back to right edge of container) */}
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-0 rounded-full">
                    {/* Gold fill line */}
                    <motion.div
                        style={{ height: useTransform(scrollProgress, [0, 1], ["0%", "100%"]) }}
                        className="absolute top-0 w-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)] rounded-full"
                    />

                    {/* Section Markers */}
                    {SECTIONS.map((sec, i) => (
                        <div 
                            key={i} 
                            onClick={() => handleScrollTo(sec.y)}
                            className="absolute right-[2px] flex flex-row items-center justify-end gap-2 md:gap-3 -translate-y-1/2 pointer-events-auto cursor-pointer group w-[100px] h-6"
                            style={{ top: `${sec.y * 100}%` }}
                        >
                            <span className="text-[8px] md:text-[9px] font-sans tracking-[0.2em] font-medium text-white opacity-40 group-hover:opacity-100 group-hover:text-gold-400 transition-all uppercase whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {sec.label}
                            </span>
                            <div className="h-[2px] w-[6px] rounded-full bg-white/40 group-hover:w-[12px] group-hover:bg-gold-400 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                        </div>
                    ))}
                </div>

                {/* Altitude Display Middle Pill (statically placed between Expedice and Nepál) */}
                <div 
                    className="absolute right-6 md:right-10 z-10 flex flex-col items-center min-w-[70px] md:min-w-[80px] py-3 md:py-4 px-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.7)] pointer-events-auto transition-transform hover:scale-110 -translate-y-1/2"
                    style={{ top: '36.5%' }} // Middle point between Expedice (29%) and Nepál (44%)
                >
                    <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white tabular-nums drop-shadow-md">
                        {currentAlt}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] font-bold text-gold-400 uppercase mt-1 drop-shadow-sm">m n.m.</span>
                </div>
            </div>
            
        </div>
    );
};

export default Altimeter;
