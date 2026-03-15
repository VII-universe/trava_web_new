import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Trophy, Star, ChevronUp } from 'lucide-react';
import SummitImg from '../assets/summit_bg.png';

const Summit = ({ scrollProgress }) => {
    // PHASE 7: 0.90 -> 1.0 (The Summit / Zdravotní osvěta & Média)

    // Triggers — zpožděno oproti Climb exitu pro efekt hloubky
    const opacity = useTransform(scrollProgress, [0.88, 0.92], [0, 1]);
    const scale = useTransform(scrollProgress, [0.90, 1], [1.08, 1]);
    const y = useTransform(scrollProgress, [0.88, 0.92, 1], ["-120%", "0%", "120%"]);

    // Content animations
    const contentOpacity = useTransform(scrollProgress, [0.93, 0.98], [0, 1]);
    const contentY = useTransform(scrollProgress, [0.93, 1], [50, 0]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{
                    scale,
                    // stronger bottom transparency to hide sharp lower edge
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 230px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 230px), transparent 100%)'
                }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                {/* Background Image */}
                <img
                    src={SummitImg}
                    alt="Everest Summit"
                    className="w-full h-full object-cover object-center brightness-95 saturate-75 contrast-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-700/15 to-ivory/55" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.28)_100%)]" />
            </motion.div>

            {/* Content Block */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-50 text-center max-w-3xl pointer-events-auto px-6 py-8 rounded-2xl bg-white/38 backdrop-blur-sm border border-white/45 shadow-2xl shadow-slate-900/20"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="p-4 rounded-full bg-gold-400/20 backdrop-blur-sm border border-gold-400/30">
                        <Trophy className="w-12 h-12 text-gold-500" />
                    </div>
                </motion.div>

                <h4 className="text-gold-700 font-sans uppercase tracking-[0.4em] text-sm font-bold mb-4 drop-shadow-md">
                    Zdravotní osvěta & média — 8848 m
                </h4>

                <h2 className="font-serif text-6xl md:text-7xl text-slate-950 mb-8 leading-none tracking-tight drop-shadow-md">
                    Kašpárek s nemocí, co to překonává.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl mx-auto">
                    <div className="glass-card p-8">
                        <h3 className="font-serif text-3xl text-slate-900 mb-4">Osvěta</h3>
                        <p className="font-sans text-slate-800 leading-relaxed text-lg mb-4">
                            Spolupráce a osvěta pro FUCK CANCER a REVMA LIGA.
                        </p>
                        <p className="font-sans text-slate-700 leading-relaxed text-sm">
                            Spolupráce s lékaři: doc. Arenbergerová, dr. Šedová, dr. Brisulda, Helča Vomáčková, Martin Pospíchal.
                        </p>
                    </div>
                    <div className="glass-card p-8">
                        <h3 className="font-serif text-3xl text-slate-900 mb-4">Média & Kontakt</h3>
                        <ul className="space-y-3 text-slate-800 font-sans text-lg">
                            <li>Blog (nezávislé příběhy z expedic)</li>
                            <li>YouTube (vlogy, zákulisí)</li>
                            <li>Podcast (příprava 2027)</li>
                            <li>Kontakt a Booking formulář</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={scrollToTop}
                        className="group relative px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:bg-gold-500 rounded-px"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            ZPĚT DO ÚDOLÍ <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>

                    <div className="flex gap-4 opacity-50">
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Summit;
