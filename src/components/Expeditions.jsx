import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import SummitImage from '../assets/summit_bg.png';
import HonzaProfile from '../assets/honza_profile.png';
import ClimbersImg from '../assets/climbers_bg.jpg';

const Expeditions = ({ scrollProgress }) => {
    // PHASE 4: 0.28 -> 0.44 with hold (tighter to Partners)
    const containerOpacity = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], [0, 1, 1, 0]);

    // Slide in from top; hold; exit before Nepal enters
    const backgroundY = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], ["-120%", "0%", "0%", "130%"]);
    const contentY = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], ["-120%", "0%", "0%", "130%"]);
    const bgY = useTransform(scrollProgress, [0.25, 0.48], ["-15%", "15%"]);

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
                <motion.img
                    style={{ y: bgY }}
                    src={SummitImage}
                    alt="Mountain Wall"
                    className="absolute inset-0 w-full h-[150%] object-cover opacity-60 mix-blend-overlay grayscale scale-125 origin-center"
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

                {/* Two glass cards & Polaroids container */}
                <div className="relative z-10 max-w-6xl w-full flex justify-center px-6 mt-10 md:mt-16">
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* POLAROID 1 - Honza (Levá strana, více vysunutá) */}
                        <motion.div
                            initial={{ rotate: -20, x: -100, y: 40, opacity: 0 }}
                            whileInView={{ rotate: -12, x: -40, y: -20, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                            className="absolute -top-20 -left-12 md:-top-28 md:-left-28 lg:-top-20 lg:-left-36 z-0 w-56 md:w-72 lg:w-80 bg-[#f8f9fa] p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={HonzaProfile} 
                                    className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-90 mix-blend-multiply" 
                                    alt="Honza" 
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                            </div>
                            <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium tracking-wide">
                                Honza
                            </div>
                        </motion.div>

                        {/* POLAROID 2 - Miri (Pravá strana, více vysunutá dole) */}
                        <motion.div
                            initial={{ rotate: 20, x: 100, y: -40, opacity: 0 }}
                            whileInView={{ rotate: 16, x: 40, y: 20, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                            className="absolute -bottom-20 -right-12 md:-bottom-28 md:-right-28 lg:-bottom-20 lg:-right-36 z-0 w-56 md:w-72 lg:w-80 bg-[#f8f9fa] p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={ClimbersImg} 
                                    className="w-full h-full object-cover object-center filter grayscale contrast-125 opacity-90" 
                                    alt="Miri" 
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                            </div>
                            <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium tracking-wide">
                                Miri
                            </div>
                        </motion.div>

                        {/* Glass Cards - Content (z-index higher than polaroids) */}
                        <motion.div className="glass-card p-8 md:p-10 text-left pointer-events-auto relative z-10 backdrop-blur-xl bg-white/10 border-white/20">
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-4">14Summits — Úvod</h3>
                            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
                                Od himálajských vrcholů po točené v Káthmándú
                            </h2>
                            <p className="font-sans text-slate-700 leading-relaxed text-lg">
                                Protože cesta nekončí, když slezeš z hory.
                            </p>
                        </motion.div>

                        <motion.div className="glass-card p-8 md:p-10 text-left pointer-events-auto relative z-10 backdrop-blur-xl bg-white/10 border-white/20">
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-4">S kým do hor</h3>
                            <p className="font-sans text-slate-800 leading-relaxed text-lg mb-6 shadow-sm">
                                Honza Tráva má za sebou 6 osmitisícovek. Miri Jirková vystoupala na nespočet šestitisícovek... Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. Spojujeme syrové himálajské dobrodružství s českým zázemím. Zakládáme si na osobním přístupu, poctivé aklimatizaci a vlastním týmu šerpů.
                            </p>
                            <ul className="list-none space-y-2 text-slate-800 font-sans">
                                {peaks.map((peak) => (
                                    <li key={peak.name} className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                        <span className="font-medium text-slate-800 drop-shadow-sm">{peak.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Expeditions;
