import React from 'react';
import { motion, useTransform } from 'framer-motion';
import IcefallImage from '../assets/icefall_bg.jpg';

const Partners = ({ scrollProgress }) => {
    // PHASE 3: 0.20 -> 0.30
    const containerOpacity = useTransform(scrollProgress, [0.18, 0.22, 0.28, 0.32], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.18, 0.24, 0.28, 0.34], ["100%", "0%", "0%", "-50%"]);

    // Rope and Flags Swing
    const ropeRotate = useTransform(scrollProgress, [0.20, 0.30], [-2, 2]);

    const partners = [
        { name: "Mammut", text: "Moje druhá kůže. Ta, co nepromokne." },
        { name: "Red Bull", text: "Křídla, když nohy už nemůžou." },
        { name: "Prazdroj", text: "Nejlepší ionťák na světě." }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
        >
            <motion.div
                style={{ y: containerY }}
                className="w-full h-full relative flex flex-col items-center justify-center"
            >
                {/* Background */}
                <div className="absolute inset-0 z-0 opacity-40 grayscale">
                    <img src={IcefallImage} alt="Icefall" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/50" />
                </div>

                <motion.div className="relative z-50 text-center mb-20">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        PARTNEŘI / Ledopád (3000 m)
                    </h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8">
                        Bez nich bych tam zmrznul.
                    </h2>
                </motion.div>

                {/* THE ROPE AND FLAGS */}
                <motion.div
                    style={{ rotate: ropeRotate }}
                    className="relative w-full h-32 flex items-center justify-center pointer-events-auto"
                >
                    {/* The Rope */}
                    <div className="absolute w-[120%] h-1 bg-slate-800/20 shadow-sm top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-1" />

                    <div className="flex gap-12 md:gap-24 relative z-10">
                        {partners.map((partner, i) => (
                            <motion.div
                                key={partner.name}
                                className="group relative"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                {/* Tibetan Flag Aesthetic */}
                                <div className={`w-20 h-24 md:w-32 md:h-40 flex items-center justify-center border-t-2 border-slate-800/40 shadow-lg cursor-help transition-all duration-500
                                    ${i === 0 ? 'bg-blue-500/80' : i === 1 ? 'bg-red-500/80' : 'bg-yellow-500/80'}
                                    clip-path-flag
                                `}>
                                    <span className="font-serif text-white font-bold tracking-widest text-lg md:text-xl transform -rotate-12">
                                        {partner.name}
                                    </span>
                                </div>

                                {/* Hover Reveal */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <p className="text-xs font-sans text-slate-800 leading-relaxed text-center italic">
                                        {partner.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <style>{`
                .clip-path-flag {
                    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%);
                }
            `}</style>
        </motion.div>
    );
};

export default Partners;
