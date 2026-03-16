import React, { useState } from 'react';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { X, MapPin, ArrowRight } from 'lucide-react';
import SummitImage from '../assets/summit_bg.png';
import HonzaProfile from '../assets/honza_profile.png';
import ClimbersImg from '../assets/climbers_bg.jpg';

const EXPEDITIONS = [
    {
        id: 'nepal',
        title: 'Manáslu (8163 m)',
        duration: '35 Dní',
        difficulty: 'Extrémní',
        image: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Výstup na osmou nejvyšší horu světa. Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. S námi nebudete jen platící klient, ale platný člen expedice. Dýcháme za vás, zajišťujeme vynášky a fixujeme lana na místech, kde už to jinak nejde.',
        highlights: ['Základní tábor ve 4800 m', 'Rotace do výškových táborů', 'Útok na vrchol (8163 m)'],
    },
    {
        id: 'mera',
        title: 'Mera Peak (6476 m) & Amphu Lapcha',
        duration: '21 Dní',
        difficulty: 'Velmi těžké',
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Trek srdcem Himálaje s výstupem na legendární šmitku Mera Peak. Přechod sedla Amphu Lapcha je jeden z nejvíce fascinujících horolezeckých zážitků, který tvoří přirozenou divokou hradbu do regionu Everestu.',
        highlights: ['Aklimatizace v údolí Hinku', 'Výstup na technický Mera Peak', 'Zdolání sedla Amphu Lapcha (5845 m)'],
    },
    {
        id: 'yoga',
        title: 'Jógový Trek (Annapurny)',
        duration: '14 Dní',
        difficulty: 'Střední',
        image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Spojujeme cvičení mysli i těla na čerstvém himálajském vzduchu. Cesta za poznáním sama sebe pod dohledem nádherných hřebenů Annapuren.',
        highlights: ['Ranní jógové seance s výhledem', 'Poznání místních klášterů', 'Fyzická a mentální očista'],
    }
];

const Expeditions = ({ scrollProgress }) => {
    const containerOpacity = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], [0, 1, 1, 0]);
    const backgroundY = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], ["-120%", "0%", "0%", "130%"]);
    const contentY = useTransform(scrollProgress, [0.28, 0.32, 0.40, 0.44], ["-120%", "0%", "0%", "130%"]);
    const bgY = useTransform(scrollProgress, [0.25, 0.48], ["-15%", "15%"]);

    const [selectedExped, setSelectedExped] = useState(null);

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full bg-[#1A202C] pointer-events-none"
        >
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
                <div className="text-center mb-10 md:mb-16 relative z-10 pt-10 md:pt-0">
                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        04 — Expedice & 14Summits (4500 m)
                    </h4>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-md">
                        Od himálajských vrcholů po točené v Káthmándú
                    </h2>
                    <p className="text-slate-300 font-serif italic text-base md:text-lg tracking-widest drop-shadow">Protože cesta nekončí, když slezeš z hory.</p>
                </div>

                <div className="relative z-10 max-w-7xl w-full flex justify-center px-2 md:px-6">
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                        <motion.div
                            initial={{ rotate: -20, x: -100, y: 40, opacity: 0 }}
                            whileInView={{ rotate: -12, x: -60, y: -20, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                            className="hidden lg:block absolute -top-16 -left-36 z-0 w-80 bg-[#f8f9fa] p-4 pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={HonzaProfile} 
                                    className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-90 mix-blend-multiply" 
                                    alt="Honza" 
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                            </div>
                            <div className="absolute bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-sm font-medium tracking-wide">
                                Honza
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ rotate: 20, x: 100, y: -40, opacity: 0 }}
                            whileInView={{ rotate: 16, x: 60, y: 20, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                            className="hidden lg:block absolute -bottom-16 -right-36 z-0 w-80 bg-[#f8f9fa] p-4 pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={ClimbersImg} 
                                    className="w-full h-full object-cover object-center filter grayscale contrast-125 opacity-90" 
                                    alt="Miri" 
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                            </div>
                            <div className="absolute bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-sm font-medium tracking-wide">
                                Miri
                            </div>
                        </motion.div>

                        <motion.div className="glass-card p-6 md:p-10 text-left pointer-events-auto relative z-10 backdrop-blur-2xl bg-slate-900/60 border-white/10 shadow-2xl h-full flex flex-col justify-center">
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-4">S kým do hor</h3>
                            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                                Osmitisícovky i treky bez přetvářky
                            </h2>
                            <p className="font-sans text-slate-300 leading-relaxed text-base md:text-lg mb-4">
                                Honza Tráva má za sebou 6 osmitisícovek. Miri Jirková vystoupala na nespočet šestitisícovek...
                            </p>
                            <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
                                Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. Spojujeme syrové himálajské dobrodružství s českým zázemím. Zakládáme si na osobním přístupu, poctivé aklimatizaci a vlastním týmu šerpů.
                            </p>
                        </motion.div>

                        <motion.div className="glass-card p-4 md:p-8 text-left pointer-events-auto relative z-10 backdrop-blur-2xl bg-white/10 border-white/20 shadow-2xl h-full flex flex-col justify-center overflow-hidden">
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[11px] font-bold mb-6 ml-2">Vyberte si výpravu</h3>
                            
                            <div className="flex flex-col gap-3">
                                {EXPEDITIONS.map((exped) => (
                                    <button
                                        key={exped.id}
                                        onClick={() => setSelectedExped(exped)}
                                        className="group text-left p-4 md:p-5 rounded-xl border border-white/10 bg-black/20 hover:bg-black/40 hover:border-gold-500/50 transition-all duration-300 backdrop-blur-sm flex items-center justify-between"
                                    >
                                        <div>
                                            <h4 className="font-serif text-lg md:text-xl text-white group-hover:text-gold-400 transition-colors">{exped.title}</h4>
                                            <div className="flex gap-4 mt-2">
                                                <span className="font-sans text-xs text-slate-400 tracking-wider uppercase"><MapPin className="w-3 h-3 inline pb-0.5 mr-1"/>{exped.duration}</span>
                                                <span className="font-sans text-xs text-slate-400 tracking-wider uppercase">• {exped.difficulty}</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-colors">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedExped && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                        onClick={() => setSelectedExped(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-ivory w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                        >
                            <button 
                                onClick={() => setSelectedExped(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <div className="w-full md:w-5/12 h-64 md:h-auto relative shrink-0">
                                <img src={selectedExped.image} alt={selectedExped.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ivory/90 via-transparent to-transparent opacity-100" />
                                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                                    <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold font-sans tracking-widest uppercase outline outline-1 outline-white/20 inline-block w-fit">
                                        {selectedExped.duration}
                                    </div>
                                    <div className="px-4 py-1.5 bg-gold-500/80 backdrop-blur-md text-white text-xs font-bold font-sans tracking-widest uppercase outline outline-1 outline-white/20 inline-block w-fit">
                                        {selectedExped.difficulty}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center">
                                <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3">
                                    Detail Výpravy
                                </h4>
                                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
                                    {selectedExped.title}
                                </h2>
                                
                                <p className="font-sans text-slate-700 leading-relaxed text-base md:text-lg mb-8">
                                    {selectedExped.description}
                                </p>

                                <div className="mb-8 p-6 bg-slate-100/50 rounded-2xl border border-slate-200">
                                    <h4 className="font-serif text-xl text-slate-900 mb-4">Program zkratce:</h4>
                                    <ul className="space-y-3">
                                        {selectedExped.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex gap-3 text-slate-700 font-sans items-start">
                                                <span className="text-gold-500 mt-1"><ArrowRight className="w-4 h-4" /></span>
                                                <span className="leading-snug">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button 
                                    onClick={() => setSelectedExped(null)}
                                    className="w-full py-4 px-6 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Mám zájem
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Expeditions;
