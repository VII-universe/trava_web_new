import React, { useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SummitImage from '../assets/summit_bg.png';
import HonzaImg from '../assets/honza_profile.png';
import MiriImg from '../assets/climbers_bg.jpg';

const Expeditions = ({ scrollProgress }) => {
    // PHASE 2: 0.28 -> 0.44 with hold
    const containerOpacity = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], [0, 1, 1, 0]);

    const [openLightbox, setOpenLightbox] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const slides = [
        { src: HonzaImg, alt: "Honza Tráva" },
        { src: MiriImg, alt: "Miri Jirková" }
    ];

    // Slide in from top; hold; exit before Nepal enters
    const backgroundY = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], ["-120%", "0%", "0%", "130%"]);
    const contentY = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], ["-120%", "0%", "0%", "130%"]);

    const peaks = [
        { name: "Treky po celém světě", text: "", x: "20%", y: "40%" },
        { name: "Expedice na 6000+", text: "", x: "50%", y: "20%" },
        { name: "Jógové výpravy", x: "80%", y: "50%" },
        { name: "Fotografické výpravy", x: "65%", y: "70%" }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 w-full h-full"
            >
                <div className="absolute inset-0 bg-slate-900" />
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: `url(${SummitImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Modern grain overlay */}
                <div className="absolute inset-0 opacity-20 mix-blend-soft-light"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </motion.div>

            <motion.div
                style={{ y: contentY }}
                className="relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-none pb-10"
            >
                <div className="w-full flex justify-center mb-6">
                    <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-50" />
                </div>

                <div className="text-center mb-6 md:mb-10 px-4">
                    <h4 className="text-gold-400 font-sans uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-3 drop-shadow-md">
                        04 — Expedice & 14Summits
                    </h4>
                </div>

                <div className="relative z-10 max-w-6xl w-full flex justify-center px-6 mt-10 md:mt-16">
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* POLAROID 1 - Honza */}
                        <motion.div
                            initial={{ rotate: -15, x: -120, y: 150, opacity: 0 }}
                            whileInView={{ rotate: -8, x: -160, y: 30, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                            className="absolute top-10 left-10 md:top-20 md:left-20 z-0 w-48 md:w-64 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm border border-gray-200 hidden md:block cursor-pointer hover:scale-105 pointer-events-auto transition-transform"
                            onClick={() => { setImageIndex(0); setOpenLightbox(true); }}
                        >
                            <img src={HonzaImg} className="w-full aspect-square object-cover object-top border border-gray-100" alt="Honza Tráva" />
                            <div className="pt-2 text-center font-serif italic text-gray-600 text-sm">Honza (Makalu, 2014)</div>
                        </motion.div>

                        {/* POLAROID 2 - Miri */}
                        <motion.div
                            initial={{ rotate: 15, x: 120, y: 200, opacity: 0 }}
                            whileInView={{ rotate: 10, x: 140, y: 150, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.3 }}
                            className="absolute bottom-10 right-10 md:-bottom-10 md:right-10 z-0 w-52 md:w-72 bg-white p-3 pb-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] rounded-sm border border-gray-200 hidden md:block cursor-pointer hover:scale-105 pointer-events-auto transition-transform"
                            onClick={() => { setImageIndex(1); setOpenLightbox(true); }}
                        >
                            <img src={MiriImg} className="w-full aspect-square object-cover border border-gray-100" alt="Miri Jirková" />
                            <div className="pt-3 text-center font-serif italic text-gray-600 text-sm">Miri (Nepál, 2022)</div>
                        </motion.div>

                        <motion.div className="glass-card p-8 md:p-12 text-center pointer-events-auto relative z-10 lg:col-span-2 max-w-2xl mx-auto shadow-2xl backdrop-blur-xl bg-white/95 border-white">
                            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-6 leading-tight drop-shadow-sm">
                                Od himálajských vrcholů po točené v Káthmándú
                            </h2>
                            <p className="font-sans text-slate-700 leading-relaxed text-lg">
                                Protože cesta nekončí, když slezeš z hory.
                            </p>
                        </motion.div>

                        <motion.div className="glass-card p-8 md:p-10 text-left pointer-events-auto relative z-10 backdrop-blur-xl bg-white/10 border-white/20 lg:col-span-2 max-w-3xl mx-auto mt-6">
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-4">S kým do hor</h3>
                            <p className="font-sans text-white leading-relaxed text-lg mb-6 shadow-sm">
                                Honza Tráva má za sebou 6 osmitisícovek. Miri Jirková vystoupala na nespočet šestitisícovek... Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. Spojujeme syrové himálajské dobrodružství s českým zázemím. Zakládáme si na osobním přístupu, poctivé aklimatizaci a vlastním týmu šerpů.
                            </p>
                            <ul className="list-none space-y-2 text-white font-sans">
                                {peaks.map((peak) => (
                                    <li key={peak.name} className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                        <span className="font-medium text-white drop-shadow-sm">{peak.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                index={imageIndex}
                slides={slides}
            />
        </motion.div>
    );
};

export default Expeditions;
