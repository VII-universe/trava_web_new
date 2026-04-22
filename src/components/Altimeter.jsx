import { useState, useEffect } from 'react';
import { useTransform, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Altimeter = ({ scrollProgress }) => {

    const altitude = useTransform(scrollProgress,
        [0, 0.09, 0.18, 0.27, 0.36, 0.45, 0.54, 0.63, 0.72, 0.81, 0.90, 1.0],
        [0, 500, 5364, 6400, 6800, 7000, 7100, 7400, 7700, 8100, 8450, 8848]
    );

    const rangePoints = [0, 0.27, 0.30, 0.54, 0.57, 0.63, 0.66, 0.81, 0.84, 0.90, 0.93, 1.0];

    const axisColor = useTransform(scrollProgress, rangePoints, [
        "rgba(15, 23, 42, 0.25)", "rgba(15, 23, 42, 0.25)",
        "rgba(255,255,255,0.4)",  "rgba(255,255,255,0.4)",
        "rgba(15, 23, 42, 0.25)", "rgba(15, 23, 42, 0.25)",
        "rgba(255,255,255,0.4)",  "rgba(255,255,255,0.4)",
        "rgba(15, 23, 42, 0.25)", "rgba(15, 23, 42, 0.25)",
        "rgba(255,255,255,0.4)",  "rgba(255,255,255,0.4)"
    ]);

    const labelColor = useTransform(scrollProgress, rangePoints, [
        "rgba(15, 23, 42, 0.45)", "rgba(15, 23, 42, 0.45)",
        "rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)",
        "rgba(15, 23, 42, 0.45)", "rgba(15, 23, 42, 0.45)",
        "rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)",
        "rgba(15, 23, 42, 0.45)", "rgba(15, 23, 42, 0.45)",
        "rgba(255,255,255,0.55)", "rgba(255,255,255,0.55)"
    ]);

    const bgOpacity = useTransform(scrollProgress, [0.08, 0.12], [0, 1]);

    const [currentAlt, setCurrentAlt] = useState(0);
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0);

    const lenis = useLenis();

    const SECTIONS = [
        { label: 'Úvod',       y: 0.00, target: 0.00 },
        { label: 'Příběh',     y: 0.09, target: 0.13 },
        { label: 'Partneři',   y: 0.18, target: 0.23 },
        { label: 'Expedice',   y: 0.27, target: 0.33 },
        { label: 'Hotel',      y: 0.36, target: 0.41 },
        { label: 'Czech Pub',  y: 0.45, target: 0.50 },
        { label: 'E-shop',     y: 0.54, target: 0.59 },
        { label: 'Přednášky',  y: 0.63, target: 0.68 },
        { label: 'Projekty',   y: 0.72, target: 0.77 },
        { label: 'Média',      y: 0.81, target: 0.87 },
        { label: 'Kontakt',    y: 0.90, target: 0.94 },
    ];

    useEffect(() => {
        return altitude.on("change", (latest) => {
            setCurrentAlt(Math.round(latest));
        });
    }, [altitude]);

    useEffect(() => {
        const unsubscribe = scrollProgress.on("change", (latest) => {
            let idx = 0;
            for (let i = 0; i < SECTIONS.length; i++) {
                if (latest >= SECTIONS[i].y) idx = i;
            }
            setCurrentSectionIdx(idx);
        });
        return unsubscribe;
    }, [scrollProgress]);

    const scrollToSection = (target) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        lenis?.scrollTo(totalHeight * target, { duration: 1.4 });
    };

    const goToPrev = () => {
        if (currentSectionIdx > 0) scrollToSection(SECTIONS[currentSectionIdx - 1].target);
    };
    const goToNext = () => {
        if (currentSectionIdx < SECTIONS.length - 1) scrollToSection(SECTIONS[currentSectionIdx + 1].target);
    };

    return (
        <div className="fixed right-3 md:right-5 bottom-3 md:bottom-4 z-[100] flex flex-col items-end pointer-events-none select-none">

            {/* Soft vignette behind the altimeter */}
            <motion.div
                style={{ opacity: bgOpacity }}
                className="absolute inset-0 -m-3 rounded-2xl bg-gradient-to-tl from-slate-950/10 to-transparent pointer-events-none"
            />

            {/* Axis with section labels */}
            <div className="relative flex items-start h-[calc(100vh-220px)] md:h-[min(calc(100vh-300px),780px)]">

                {/* Section labels column */}
                <div className="relative mr-2 h-full" style={{ width: 68 }}>
                    {SECTIONS.map((sec, i) => {
                        const isActive = i === currentSectionIdx;
                        return (
                            <motion.button
                                key={i}
                                onClick={() => scrollToSection(sec.target)}
                                className="absolute right-0 flex items-center justify-end pointer-events-auto cursor-pointer group"
                                style={{ top: `${sec.y * 100}%`, transform: 'translateY(-50%)' }}
                                aria-label={sec.label}
                            >
                                <motion.span
                                    style={isActive ? {} : { color: labelColor }}
                                    className={`font-mono uppercase tracking-wider leading-none transition-all duration-300 ${
                                        isActive
                                            ? 'text-gold-400 text-[8px] md:text-[9px] font-bold opacity-100'
                                            : 'text-[7px] md:text-[8px] font-semibold opacity-70 group-hover:opacity-100'
                                    }`}
                                >
                                    {sec.label}
                                </motion.span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Axis line */}
                <div className="relative h-full" style={{ width: 1 }}>
                    <motion.div
                        style={{ backgroundColor: axisColor }}
                        className="absolute inset-0 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.08)]"
                    />
                    {/* Gold progress fill from top */}
                    <motion.div
                        style={{ height: useTransform(scrollProgress, [0, 1], ["0%", "100%"]) }}
                        className="absolute top-0 w-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.7)] rounded-full"
                    />

                    {/* Tick marks */}
                    {SECTIONS.map((sec, i) => {
                        const isActive = i === currentSectionIdx;
                        return (
                            <motion.div
                                key={i}
                                onClick={() => scrollToSection(sec.target)}
                                className="absolute left-0 pointer-events-auto cursor-pointer"
                                style={{ top: `${sec.y * 100}%`, transform: 'translateY(-50%)' }}
                            >
                                <motion.div
                                    style={isActive ? {} : { backgroundColor: axisColor }}
                                    className={`rounded-full transition-all duration-300 ${
                                        isActive
                                            ? 'w-[12px] h-[2px] bg-gold-400 -translate-x-[5px]'
                                            : 'w-[6px] h-[1px] -translate-x-[2px] hover:w-[10px] hover:!bg-gold-400'
                                    }`}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Pill with altitude + navigation arrows */}
            <div className="flex flex-col items-center mt-2 pointer-events-auto">
                <button
                    onClick={goToPrev}
                    disabled={currentSectionIdx === 0}
                    className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-slate-900/50 hover:bg-gold-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-gold-400/50 mb-1"
                    aria-label="Předchozí sekce"
                >
                    <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </button>

                <div className="flex flex-col items-center min-w-[54px] md:min-w-[64px] py-2.5 px-2 rounded-xl bg-slate-900/65 backdrop-blur-md border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-transform hover:scale-105">
                    <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-white tabular-nums drop-shadow-md leading-none">
                        {currentAlt}
                    </span>
                    <span className="text-[7px] md:text-[8px] font-sans tracking-[0.3em] font-bold text-gold-400 uppercase mt-0.5">
                        m n.m.
                    </span>
                </div>

                <button
                    onClick={goToNext}
                    disabled={currentSectionIdx === SECTIONS.length - 1}
                    className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-slate-900/50 hover:bg-gold-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-gold-400/50 mt-1"
                    aria-label="Další sekce"
                >
                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </button>
            </div>
        </div>
    );
};

export default Altimeter;
