import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';

const About = ({ scrollProgress }) => {
    // PHASE 2: 0.25 -> 0.50

    // Transition In
    const containerOpacity = useTransform(scrollProgress, [0.2, 0.3], [0, 1]);
    const containerScale = useTransform(scrollProgress, [0.2, 0.4], [0.8, 1]);
    const containerY = useTransform(scrollProgress, [0.2, 0.35], ["100%", "0%"]);

    // Parallax Layers
    const sideLayerLeftX = useTransform(scrollProgress, [0.3, 0.5], ["0%", "-50%"]);
    const sideLayerRightX = useTransform(scrollProgress, [0.3, 0.5], ["0%", "50%"]);
    const sideLayerOpacity = useTransform(scrollProgress, [0.3, 0.5], [0.8, 0]);

    // Transition Out
    const exitOpacity = useTransform(scrollProgress, [0.5, 0.6], [1, 0]);
    const exitScale = useTransform(scrollProgress, [0.5, 0.6], [1, 0.8]);
    const exitY = useTransform(scrollProgress, [0.5, 0.65], ["0%", "100%"]);

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{ scale: containerScale, y: containerY }}
                className="w-full h-full relative flex items-center justify-start px-6 md:px-20 lg:px-32"
            >
                <motion.div
                    style={{ opacity: exitOpacity, scale: exitScale, y: exitY }}
                    className="w-full h-full absolute inset-0 z-0 origin-bottom"
                >
                    {/* SOLID BACKING LAYER - Blocks previous section */}
                    <div
                        className="absolute inset-0 bg-ivory"
                        style={{
                            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                        }}
                    />

                    {/* IMAGE LAYER */}
                    <img
                        src={BaseCampImg}
                        alt="Base Camp Tents"
                        className="w-full h-full object-cover object-bottom opacity-80 filter sepia-[.2] grayscale-[.3] contrast-125 brightness-100"
                        style={{
                            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                        }}
                    />
                </motion.div>

                {/* Layers */}
                <motion.div
                    style={{ x: sideLayerLeftX, opacity: sideLayerOpacity }}
                    className="absolute left-0 bottom-0 w-[30%] h-[80%] z-10 bg-ivory/20 blur-[40px] mix-blend-screen pointer-events-none"
                />
                <motion.div
                    style={{ x: sideLayerRightX, opacity: sideLayerOpacity }}
                    className="absolute right-0 bottom-0 w-[30%] h-[80%] z-10 bg-ivory/20 blur-[40px] mix-blend-screen pointer-events-none"
                />

                {/* Content */}
                <motion.div
                    style={{ opacity: exitOpacity, y: exitY }}
                    className="relative z-50 max-w-xl p-10 md:p-14 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md shadow-2xl shadow-slate-200/50 pointer-events-auto mt-20"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">Base Camp — 5364 m</h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                        Nehraju si na<br /> <span className="italic text-slate-600">hrdinu.</span>
                    </h2>
                    <p className="font-sans text-slate-800 leading-relaxed mb-10 text-lg">
                        Jsem geodet, učitel a manažer punkový kapely, co se zamiloval do řídkýho vzduchu.
                        Říkají o mně, že jsem horolezec. Já se cítím spíš jako <span className="font-semibold text-slate-900 border-b border-gold-400">poutník</span>.
                    </p>
                    <button className="group flex items-center gap-3 text-slate-900 font-medium tracking-wide hover:text-gold-600 transition-colors duration-300">
                        <span className="relative">
                            Můj celý příběh
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-slate-400 group-hover:bg-gold-400 transition-colors duration-300" />
                        </span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default About;
