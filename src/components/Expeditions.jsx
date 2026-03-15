import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import SummitImage from '../assets/summit_bg.png';

const Expeditions = ({ scrollProgress }) => {
    // PHASE 4: 0.48 -> 0.66
    const containerOpacity = useTransform(scrollProgress, [0.46, 0.50, 0.62, 0.66], [0, 1, 1, 0]);

    // Slide in from top into the sticky frame
    const backgroundY = useTransform(scrollProgress, [0.46, 0.50, 0.62, 0.66], ["-120%", "0%", "0%", "120%"]);
    const contentY = useTransform(scrollProgress, [0.46, 0.50, 0.62, 0.66], ["-120%", "0%", "0%", "120%"]);

    const peaks = [
        { name: "Treky po celém světě", text: "", x: "20%", y: "40%" },
        { name: "Expedice na 6000+", text: "", x: "50%", y: "20%" },
        { name: "Jógové výpravy", text: "", x: "80%", y: "50%" },
        { name: "Fotografické výpravy", text: "", x: "65%", y: "70%" }
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
                        04 — Expedice & 14Summits (4500 m)
                    </h4>
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
                        Od himálajských vrcholů po točené v Káthmándú
                    </h2>
                    <p className="text-slate-200 font-serif italic text-lg tracking-widest">Protože cesta nekončí, když slezeš z hory.</p>
                </div>

                {/* Two glass cards */}
                <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
                    <motion.div className="glass-card p-10 text-left pointer-events-auto">
                        <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-4">14Summits — Úvod</h3>
                        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
                            Od himálajských vrcholů po točené v Káthmándú
                        </h2>
                        <p className="font-sans text-slate-700 leading-relaxed text-lg">
                            Protože cesta nekončí, když slezeš z hory.
                        </p>
                    </motion.div>

                    <motion.div className="glass-card p-10 text-left pointer-events-auto">
                        <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-4">S kým do hor</h3>
                        <p className="font-sans text-slate-800 leading-relaxed text-lg mb-6">
                            S kým do hor: Honza Tráva má za sebou 6 osmitisícovek. Miri Jirková vystoupala na nespočet šestitisícovek... Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. Spojujeme syrové himálajské dobrodružství s českým zázemím. Zakládáme si na osobním přístupu, poctivé aklimatizaci a vlastním týmu šerpů.
                        </p>
                        <ul className="list-none space-y-2 text-slate-800 font-sans">
                            {peaks.map((peak) => (
                                <li key={peak.name} className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                                    <span>{peak.name}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Expeditions;
