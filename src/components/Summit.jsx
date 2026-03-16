import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Trophy, Star, ChevronUp } from 'lucide-react';
import SummitImg from '../assets/summit_bg.png';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HonzaProfileImg from '../assets/honza_profile.png';

const Summit = ({ scrollProgress }) => {
    // PHASE 8: 0.82 -> 0.96 with slower exit + earlier Contact following

    const opacity = useTransform(scrollProgress, [0.82, 0.86, 0.92, 0.96], [0, 1, 1, 0]);
    const scale = useTransform(scrollProgress, [0.82, 0.90], [1.08, 1]);
    const y = useTransform(scrollProgress, [0.82, 0.86, 0.94, 0.98], ["-120%", "0%", "0%", "160%"]);
    const bgY = useTransform(scrollProgress, [0.78, 1.0], ["-15%", "15%"]);

    // Content animations
    const contentOpacity = useTransform(scrollProgress, [0.84, 0.90, 0.94, 0.98], [0, 1, 1, 0]);
    const contentY = useTransform(scrollProgress, [0.84, 0.90, 0.94, 0.98], [50, 0, 0, 120]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden z-40"
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
                <motion.img
                    style={{ y: bgY }}
                    src={SummitImg}
                    alt="Everest Summit"
                    className="absolute inset-0 w-full h-full object-cover object-center brightness-95 saturate-75 contrast-110 scale-125 origin-center"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-700/15 to-ivory/55" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.28)_100%)]" />
                
                {/* POLAROID 1 - Left */}
                <motion.div
                    initial={{ opacity: 0, rotate: -15, x: -100 }}
                    whileInView={{ opacity: 1, rotate: -8, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="absolute top-20 left-10 md:top-40 md:left-20 w-48 md:w-64 lg:w-72 bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden sm:block z-20 pointer-events-auto cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-500 group"
                >
                    <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                        <img src={ClimbersImg} className="w-full h-full object-cover grayscale-0 sepia-0" alt="Horolezci" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">Tým v akci</div>
                </motion.div>

                {/* POLAROID 2 - Right */}
                <motion.div
                    initial={{ opacity: 0, rotate: 15, x: 100 }}
                    whileInView={{ opacity: 1, rotate: 6, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="absolute bottom-40 right-10 md:bottom-60 md:right-20 w-48 md:w-64 lg:w-72 bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden lg:block z-20 pointer-events-auto cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-500 group"
                >
                    <div className="w-full aspect-[4/5] bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                        <img src={HonzaProfileImg} className="w-full h-full object-cover object-top grayscale-0" alt="Honza Profil" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">Na vrcholu</div>
                </motion.div>
            </motion.div>

            {/* Content Block */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-50 text-center max-w-3xl pointer-events-auto px-6 py-10 md:py-12 rounded-3xl bg-white/85 backdrop-blur-md border border-white/60 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl mx-auto mt-8">
                    <div className="glass-card bg-white/60 border-white/40 p-8 shadow-xl">
                        <h3 className="font-serif text-3xl text-slate-950 mb-4">Osvěta</h3>
                        <p className="font-sans text-slate-800 leading-relaxed text-lg mb-4 font-medium">
                            Spolupráce a osvěta pro FUCK CANCER a REVMA LIGA.
                        </p>
                        <p className="font-sans text-slate-700 leading-relaxed text-sm">
                            Spolupráce s lékaři: doc. Arenbergerová, dr. Šedová, dr. Brisulda, Helča Vomáčková, Martin Pospíchal.
                        </p>
                    </div>
                    <div className="glass-card bg-white/60 border-white/40 p-8 shadow-xl">
                        <h3 className="font-serif text-3xl text-slate-950 mb-4">Média & Kontakt</h3>
                        <ul className="space-y-3 text-slate-800 font-sans text-lg font-medium">
                            <li>Blog (nezávislé příběhy z expedic)</li>
                            <li>YouTube (vlogy, zákulisí)</li>
                            <li>Podcast (příprava 2027)</li>
                            <li>Kontakt a Booking formulář</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 mt-16">
                    <button
                        onClick={scrollToTop}
                        className="group relative px-12 py-5 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-gold-500 rounded-full shadow-lg shadow-black/20 hover:shadow-gold-500/40 hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            ZPĚT DO ÚDOLÍ <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
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
