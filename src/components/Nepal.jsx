import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg'; // Placeholder for Nepal view

const Nepal = ({ scrollProgress }) => {
    // PHASE 5: 0.64 -> 0.80 (Nepal — Pub & Hotel)
    const containerOpacity = useTransform(scrollProgress, [0.62, 0.68], [0, 1]);
    const containerY = useTransform(scrollProgress, [0.62, 0.68, 0.78, 0.84], ["-120%", "0%", "0%", "120%"]);

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{ y: containerY }}
                className="w-full h-full relative flex flex-col md:flex-row"
            >
                {/* Visual Left: Photo of Czech Pub behavior */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-slate-900">
                    <img
                        src={BaseCampImg}
                        alt="Czech Pub Kathmandu"
                        className="w-full h-full object-cover opacity-60 scale-125 saturate-50 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40" />

                    <div className="absolute bottom-10 left-10 text-white z-10">
                        <div className="flex items-center gap-2 text-gold-400 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs tracking-widest font-bold uppercase">Kathmandu base camp</span>
                        </div>
                        <h3 className="font-serif text-3xl">Czech Pub Nepal</h3>
                    </div>
                </div>

                {/* Content Right: Text on Glass */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-ivory flex items-center justify-center p-10 md:p-20">
                    <motion.div
                        className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto"
                        whileHover={{ y: -5 }}
                    >
                        <div className="glass-card p-8 h-full flex flex-col">
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                                HOTEL Kathmandu Base Camp
                            </h4>
                            <p className="font-sans text-slate-800 text-lg leading-relaxed">
                                Náš hotel v centru Thamelu je tvůj skutečný základní tábor. Místo, kde ze sebe smyješ prach, dáš si horkou sprchu a vydechneš. Čisté pokoje s wifinou, rodinná atmosféra a střešní terasa. Domluvíš se tu česky.
                            </p>
                        </div>

                        <div className="glass-card p-8 h-full flex flex-col">
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                                CZECH PUB
                            </h4>
                            <p className="font-sans text-slate-800 text-lg leading-relaxed">
                                Středobod českého vesmíru v Nepálu. Místo, kde se potkávají trekaři, expedice i sólisti. Načepujeme české i nepálské pivo a naservírujeme bramborový salát jako od mámy nebo nejlepší smažák v Káthmándú. Ty nejlepší cesty se nedají uspěchat.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Nepal;
