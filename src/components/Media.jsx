import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Play, Mic, FileText } from 'lucide-react';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HonzaImg from '../assets/honza_profile.png';
import BaseCampImg from '../assets/base_camp_bg.jpg';

const Media = ({ scrollProgress }) => {
    // PHASE 7: 0.68 -> 0.84 with hold (slightly closer)
    const containerOpacity = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.84], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.84], ["-120%", "0%", "0%", "130%"]);

    const items = [
        {
            title: 'Blog',
            text: 'Cíl: nezávislost na sociálních sítích. Obsah: expedice, Nepál, příběhy, zákulisí, osobní rovina.'
        },
        {
            title: 'YouTube',
            text: 'Máte obsah, je potřeba systematicky publikovat. Formáty: vlogy, expedice, rozhovory, behind the scenes.'
        },
        {
            title: 'Podcast (příprava 2027)',
            text: 'Cestovatelská témata, zajímavé světové lokality, hosté z komunity.'
        }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/60 to-ivory/80" />

            <motion.div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-24 mb-16 mx-auto">
                <div className="text-center mb-16 relative z-10">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3">
                        07 — Média & Obsah
                    </h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight">
                        Příběhy, které se do batohu nevešly
                    </h2>
                </div>

                <div className="relative w-full">
                    {/* POLAROID 1 - Video (Left) */}
                    <motion.div
                        initial={{ rotate: -25, x: -70, y: 80, opacity: 0 }}
                        whileInView={{ rotate: -12, x: -100, y: -40, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                        className="absolute -top-16 -left-6 md:-top-24 md:-left-20 lg:-top-28 lg:-left-32 z-0 w-44 md:w-60 lg:w-72 bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden sm:block cursor-pointer hover:scale-105 transition-transform duration-500 group"
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                            <img src={ClimbersImg} className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Video" />
                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-gold-500/90 group-hover:border-gold-400 transition-all duration-300 shadow-lg">
                                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">Vlog #04: Cesta do BC</div>
                    </motion.div>

                    {/* POLAROID 2 - Podcast (Right) */}
                    <motion.div
                        initial={{ rotate: 20, x: 70, y: 100, opacity: 0 }}
                        whileInView={{ rotate: 16, x: 100, y: 20, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.3 }}
                        className="absolute -top-10 -right-6 md:-top-20 md:-right-20 lg:-top-16 lg:-right-32 z-0 w-44 md:w-60 lg:w-72 bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden sm:block cursor-pointer hover:scale-105 transition-transform duration-500 group"
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                            <img src={HonzaImg} className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Podcast" />
                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-gold-500/90 group-hover:border-gold-400 transition-all duration-300 shadow-lg">
                                    <Mic className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">Podcast: Ep. 12</div>
                    </motion.div>

                    {/* POLAROID 3 - Blog (Bottom Center) */}
                    <motion.div
                        initial={{ rotate: -5, x: 0, y: 80, opacity: 0 }}
                        whileInView={{ rotate: 6, x: -20, y: 40, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="absolute -bottom-16 left-1/4 lg:-bottom-24 lg:left-1/3 z-0 w-40 md:w-56 lg:w-64 bg-white p-3 md:p-4 pb-12 md:pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden lg:block cursor-pointer hover:scale-105 z-[1] transition-transform duration-500 group"
                    >
                        <div className="w-full aspect-[4/3] bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                            <img src={BaseCampImg} className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Blog" />
                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-gold-500/90 group-hover:border-gold-400 transition-all duration-300 shadow-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">Deník z expedice</div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start relative z-[10] backdrop-blur-[2px]">
                        {items.map((item) => (
                            <motion.div
                                key={item.title}
                                className="glass-card p-8 h-full flex flex-col pointer-events-auto bg-white/70 border-white/80 shadow-xl"
                                whileHover={{ y: -6 }}
                            >
                                <h3 className="font-serif text-2xl text-slate-900 mb-3">{item.title}</h3>
                                <p className="font-sans text-slate-800 leading-relaxed text-base flex-1">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Media;
