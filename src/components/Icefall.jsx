import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Pickaxe } from 'lucide-react';
import IcefallImg from '../assets/icefall_bg.jpg';

const Icefall = ({ scrollProgress }) => {
    // PHASE 3: 0.40 -> 0.60

    // Transition In (Descend from Top)
    const containerY = useTransform(scrollProgress, [0.35, 0.45], ["-100%", "0%"]);
    const opacity = useTransform(scrollProgress, [0.35, 0.45], [0, 1]);

    // Transition Out (Drop Down & Zoom Over)
    const exitY = useTransform(scrollProgress, [0.60, 0.70], ["0%", "100%"]);
    const exitOpacity = useTransform(scrollProgress, [0.60, 0.70], [1, 0]);
    const exitScale = useTransform(scrollProgress, [0.60, 0.75], [1, 1.5]); // "Walk Over" Effect

    return (
        <motion.div
            style={{ y: containerY, opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{ y: exitY, opacity: exitOpacity, scale: exitScale }}
                className="w-full h-full relative flex items-center justify-center"
            >
                {/* Background Container */}
                <div className="absolute inset-0 z-0">

                    {/* SOLID BACKING LAYER - Top Heavy Mask */}
                    <div
                        className="absolute inset-0 bg-[#F0F4F8]"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
                        }}
                    />

                    {/* IMAGE LAYER */}
                    <img
                        src={IcefallImg}
                        alt="Khumbu Icefall"
                        className="w-full h-full object-cover object-center opacity-80 filter contrast-125 brightness-110 saturate-0"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
                        }}
                    />
                    {/* Cold Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 to-blue-200/20 mix-blend-multiply" />
                </div>

                {/* Content */}
                <div className="relative z-50 text-center max-w-2xl px-6 pointer-events-auto">
                    <Pickaxe className="w-12 h-12 text-blue-900/60 mx-auto mb-6 opacity-80" />
                    <h4 className="text-slate-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">
                        Icefall — 6400 m
                    </h4>
                    <h2 className="font-serif text-5xl md:text-6xl text-slate-800 mb-8 leading-none drop-shadow-lg">
                        Tanec na ostří<br /> <span className="text-slate-400 italic">ledu.</span>
                    </h2>
                    <p className="font-sans text-slate-600 leading-relaxed text-lg max-w-lg mx-auto">
                        Každý krok může být poslední. Trhliny se mění každou vteřinu.
                        Tady hory dýchají, a my musíme dýchat s nimi.
                    </p>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default Icefall;
