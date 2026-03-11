import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import SummitImage from '../assets/summit_bg.png';

const Expeditions = ({ scrollProgress }) => {
    // PHASE 5: 0.40 -> 0.55
    const containerOpacity = useTransform(scrollProgress, [0.38, 0.42, 0.53, 0.57], [0, 1, 1, 0]);

    // Dynamic Ascent: Content moves slightly slower than background for depth
    const backgroundY = useTransform(scrollProgress, [0.40, 0.55], ["20%", "-20%"]);
    const contentY = useTransform(scrollProgress, [0.38, 0.44, 0.53, 0.59], ["100%", "0%", "0%", "-50%"]);

    const peaks = [
        { name: "Manaslu", text: "Moje první osma. Tyrkysová bohyně.", x: "20%", y: "40%" },
        { name: "K2", text: "Čtyřikrát mě vykopla. Popáté pustila. Bez kyslíku. Na dřeň.", x: "50%", y: "20%" },
        { name: "Annapurna", text: "Laviny a loterie o život.", x: "80%", y: "50%" }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full bg-[#1A202C] pointer-events-none"
        >
            {/* Background Peaks Flying Downwards */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 w-full h-[150%] z-0"
            >
                <img
                    src={SummitImage}
                    alt="Mountain Wall"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A202C] via-transparent to-[#1A202C]" />
            </motion.div>

            <motion.div
                style={{ y: contentY }}
                className="w-full h-full relative flex flex-col items-center justify-center px-6"
            >
                <div className="text-center mb-16 relative z-10">
                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        05 — EXPEDICE / Stěna (7000 m)
                    </h4>
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
                        Cesta na dřeň.
                    </h2>
                    <p className="text-slate-400 font-serif italic text-lg tracking-widest">Slonovinová mizí v modři.</p>
                </div>

                {/* Hotspots Container */}
                <div className="absolute inset-0 pointer-events-auto">
                    {peaks.map((peak, i) => (
                        <motion.div
                            key={peak.name}
                            className="absolute group"
                            style={{ left: peak.x, top: peak.y }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                        >
                            <div className="w-4 h-4 bg-gold-500 rounded-full animate-pulse cursor-pointer relative z-10" />
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <h5 className="font-serif text-gold-400 text-lg mb-2">{peak.name}</h5>
                                <p className="text-xs text-white/80 leading-relaxed font-sans">{peak.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Míra utrpení Graphic */}
                <div className="absolute bottom-20 left-10 md:left-20 max-w-xs pointer-events-auto">
                    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase tracking-widest text-gold-500 mb-4 block font-bold">Míra utrpení</span>
                        <div className="flex items-end gap-1 h-24">
                            {[40, 60, 45, 90, 100, 80, 95].map((val, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-gradient-to-t from-gold-600 to-gold-400 opacity-80"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${val}%` }}
                                    transition={{ delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Expeditions;
