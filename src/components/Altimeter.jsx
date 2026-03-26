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

    // Dynamic Coloring based on section background
    // Sections:
    // 0.0 - 0.45: LIGHT (Hero, About, Icefall)
    // 0.45 - 0.85: DARK (Expeditions, Nepal, Lectures)
    // 0.85 - 0.92: LIGHT (Media)
    // 0.92 - 1.0: DARK (Summit, Contact)
    
    const rangePoints = [0, 0.48, 0.52, 0.84, 0.88, 0.93, 0.95, 1];
    
    // Axis line color
    const axisColor = useTransform(scrollProgress, rangePoints, [
        "rgba(15, 23, 42, 0.15)", // Dark (Hero)
        "rgba(15, 23, 42, 0.15)", // Dark (Icefall end)
        "rgba(255, 255, 255, 0.2)", // Light (Expeditions)
        "rgba(255, 255, 255, 0.2)", // Light (Lectures end)
        "rgba(15, 23, 42, 0.15)", // Dark (Media)
        "rgba(15, 23, 42, 0.15)", // Dark (Media end)
        "rgba(255, 255, 255, 0.2)", // Light (Summit)
        "rgba(255, 255, 255, 0.2)"  // Light (Contact)
    ]);

    // Text label color
    const textColor = useTransform(scrollProgress, rangePoints, [
        "rgba(15, 23, 42, 0.5)", // Dark
        "rgba(15, 23, 42, 0.5)", 
        "rgba(255, 255, 255, 0.6)", // Light
        "rgba(255, 255, 255, 0.6)",
        "rgba(15, 23, 42, 0.5)", // Dark
        "rgba(15, 23, 42, 0.5)",
        "rgba(255, 255, 255, 0.6)", // Light
        "rgba(255, 255, 255, 0.6)"
    ]);

    // Hover text color (stays gold but more prominent on dark)
    const textHoverColor = useTransform(scrollProgress, rangePoints, [
        "rgba(15, 23, 42, 0.9)", 
        "rgba(15, 23, 42, 0.9)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(15, 23, 42, 0.9)",
        "rgba(15, 23, 42, 0.9)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 1)"
    ]);

    const markerColor = useTransform(scrollProgress, rangePoints, [
        "rgba(15, 23, 42, 0.3)",
        "rgba(15, 23, 42, 0.3)",
        "rgba(255, 255, 255, 0.4)",
        "rgba(255, 255, 255, 0.4)",
        "rgba(15, 23, 42, 0.3)",
        "rgba(15, 23, 42, 0.3)",
        "rgba(255, 255, 255, 0.4)",
        "rgba(255, 255, 255, 0.4)"
    ]);

    // Fade in a dark background for readability only when on dark sections? 
    // Actually the user wants it to be adaptive, so no fixed background gradient.
    const bgOpacity = useTransform(scrollProgress, [0.08, 0.12], [0, 1]);

    const [currentAlt, setCurrentAlt] = useState(0);

    useEffect(() => {
        return altitude.on("change", (latest) => {
            setCurrentAlt(Math.round(latest));
        });
    }, [altitude]);

    const SECTIONS = [
        { label: 'Úvod',      y: 0.0 },
        { label: 'Příběh',    y: 0.20 },
        { label: 'Partneři',  y: 0.32 },
        { label: 'Expedice',  y: 0.48 },
        { label: 'Nepál',     y: 0.64 },
        { label: 'Projekty',  y: 0.78 },
        { label: 'Média',     y: 0.86 },
        { label: 'Osvěta',    y: 0.90 },
        { label: 'Kontakt',   y: 0.96 },
    ];

    const handleScrollTo = (yPercent) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: totalHeight * yPercent, behavior: 'smooth' });
    };

    return (
        <div className="fixed right-0 top-0 h-screen z-[100] w-[110px] md:w-[160px] flex items-center justify-end pointer-events-none pr-0">
            
            {/* Conditional background gradient - visible mostly on dark sections for readability */}
            {/* But adjusted to be much subtler so it doesn't look like a solid block on light sections */}
            <motion.div 
                style={{ opacity: bgOpacity }}
                className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-slate-950/20 to-transparent pointer-events-none"
            />

            {/* Content Container (h-60 or 70 vh centered) */}
            <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-end">
                {/* Main Axis Line */}
                <motion.div 
                    style={{ backgroundColor: axisColor }}
                    className="absolute right-2 md:right-4 top-0 bottom-0 w-[1px] shadow-[0_0_10px_rgba(0,0,0,0.1)] z-0 rounded-full"
                >
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
                            <motion.span 
                                style={{ color: textColor }}
                                className="text-[8px] md:text-[9px] font-sans tracking-[0.2em] font-medium group-hover:!text-gold-400 transition-all uppercase whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                            >
                                {sec.label}
                            </motion.span>
                            <motion.div 
                                style={{ backgroundColor: markerColor }}
                                className="h-[2px] w-[6px] rounded-full group-hover:w-[12px] group-hover:!bg-gold-400 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2)]" 
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Altitude Display Middle Pill (statically placed between Expedice and Nepál, 10px from right) */}
                <motion.div 
                    className="absolute right-[10px] z-10 flex flex-col items-center min-w-[70px] md:min-w-[80px] py-3 md:py-4 px-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.7)] pointer-events-auto transition-transform hover:scale-110 -translate-y-1/2"
                    style={{ top: '37.5%' }} // Middle point between Expedice (27%) and Nepál (48%)
                >
                    <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white tabular-nums drop-shadow-md">
                        {currentAlt}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] font-bold text-gold-400 uppercase mt-1 drop-shadow-sm">m n.m.</span>
                </motion.div>
            </div>
            
        </div>
    );
};

export default Altimeter;
