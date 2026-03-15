import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Calendar, X, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import IcefallImage from '../assets/icefall_bg.jpg';
import ClimbersImage from '../assets/climbers_bg.jpg';
import SummitImage from '../assets/summit_bg.png';

const Lectures = ({ scrollProgress }) => {
    const [open, setOpen] = useState(false);
    const [openLightbox, setOpenLightbox] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const slides = [
        { src: IcefallImage, alt: "Začátky v ledu" },
        { src: ClimbersImage, alt: "Na lanech" },
        { src: SummitImage, alt: "Krok od vrcholu" }
    ];

    // PHASE 6: 0.54 -> 0.72 with hold (much closer to Nepal)
    const containerOpacity = useTransform(scrollProgress, [0.54, 0.58, 0.68, 0.72], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.54, 0.58, 0.68, 0.72], ["-120%", "0%", "0%", "120%"]);

    // Parallax background
    const bgY = useTransform(scrollProgress, [0.54, 0.72], ["-10%", "10%"]);

    return (
        <motion.div
            style={{ opacity: containerOpacity, y: containerY }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 via-white to-slate-50" />
            
            <div className="w-full h-full relative flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-24 overflow-y-auto">
                
                <div className="text-center mb-8 md:mb-12 relative z-10 w-full">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold mb-3 md:mb-4 drop-shadow-sm">
                        06 — Projekty & Přednášky
                    </h4>
                </div>

                <div className="relative max-w-6xl mx-auto w-full mb-16 px-4 md:px-0 mt-8 md:mt-20">
                    
                    {/* POLAROID 1 - Icefall (Top Left) */}
                    <motion.div
                        initial={{ rotate: -15, x: -100, y: 50, opacity: 0 }}
                        whileInView={{ rotate: -10, x: -140, y: -20, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                        className="absolute -top-10 -left-10 md:-top-16 md:-left-24 lg:-top-20 lg:-left-32 z-0 w-48 md:w-64 lg:w-80 bg-[#f8f9fa] p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden md:block cursor-pointer hover:scale-105 pointer-events-auto transition-transform"
                        onClick={() => { setImageIndex(0); setOpenLightbox(true); }}
                    >
                        <div className="w-full aspect-[4/3] bg-slate-200 overflow-hidden relative">
                            <img src={IcefallImage} className="w-full h-full object-cover filter grayscale contrast-125 opacity-90" alt="Ledopád" />
                            <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay" />
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium tracking-wide">Začátky v ledu</div>
                    </motion.div>

                    {/* POLAROID 2 - Climbers (Top Right, Behind) */}
                    <motion.div
                        initial={{ rotate: 20, x: 100, y: -40, opacity: 0 }}
                        whileInView={{ rotate: 12, x: 120, y: 20, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.3 }}
                        className="absolute -top-6 -right-10 md:-top-10 md:-right-20 lg:-top-12 lg:-right-28 z-0 w-44 md:w-60 lg:w-72 bg-[#f8f9fa] p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden md:block cursor-pointer hover:scale-105 pointer-events-auto transition-transform"
                        onClick={() => { setImageIndex(1); setOpenLightbox(true); }}
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                            <img src={ClimbersImage} className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-90" alt="Horolezci" />
                            <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay" />
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium tracking-wide">Na lanech</div>
                    </motion.div>

                    {/* POLAROID 3 - Summit (Bottom Left) */}
                    <motion.div
                        initial={{ rotate: -5, x: -80, y: 120, opacity: 0 }}
                        whileInView={{ rotate: -6, x: -100, y: 150, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="absolute -bottom-10 -left-6 md:-bottom-20 md:-left-12 lg:-bottom-24 lg:-left-20 z-0 w-44 md:w-56 lg:w-64 bg-[#f8f9fa] p-3 md:p-4 pb-12 md:pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 hidden lg:block cursor-pointer hover:scale-105 pointer-events-auto transition-transform"
                        onClick={() => { setImageIndex(2); setOpenLightbox(true); }}
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                            <img src={SummitImage} className="w-full h-full object-cover filter grayscale contrast-125 opacity-90" alt="Vrchol" />
                            <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay" />
                        </div>
                        <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium tracking-wide">Krok od vrcholu</div>
                    </motion.div>
                    
                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 backdrop-blur-[2px]">
                        
                        {/* Přednášky pro firmy */}
                        <motion.div className="glass-card p-8 md:p-10 text-left pointer-events-auto bg-white/10 border-white/20 hover:bg-white/90 hover:shadow-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4 group-hover:text-gold-600 transition-colors">Firmy & Motivace</h3>
                                <p className="font-sans text-slate-700 leading-relaxed text-[15px] mb-6 shadow-sm">
                                    Jak funguje tým v extrémních podmínkách zóny smrti? Proč je komunikace klíčová a jak přek সিদ্ধান্তে krizové momenty, když jde o všechno. Přenášíme zkušenosti z himálajských vrcholů do firemního prostředí.
                                </p>
                            </div>
                            <button 
                                onClick={() => setOpen(true)}
                                className="w-full bg-slate-900 text-white border border-slate-800 py-3.5 px-6 rounded-lg uppercase tracking-widest text-[11px] font-bold hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                Poptat termín <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>

                        {/* Festivaly a akce */}
                        <motion.div className="glass-card p-8 md:p-10 text-left pointer-events-auto bg-white/10 border-white/20 hover:bg-white/90 hover:shadow-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4 group-hover:text-gold-600 transition-colors">Festivaly & Kultura</h3>
                                <p className="font-sans text-slate-700 leading-relaxed text-[15px] mb-6 shadow-sm">
                                    Od vtipných historek ze základního tábora přes boj s omrzlinami až po hluboký respekt k hoře. Audiovizuální projekce pro festivaly, kina a kulturní domy. Syrové, upřímné a bez patosu.
                                </p>
                            </div>
                            <button 
                                onClick={() => setOpen(true)}
                                className="w-full bg-slate-900 text-white border border-slate-800 py-3.5 px-6 rounded-lg uppercase tracking-widest text-[11px] font-bold hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                Poptat termín <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>

                        {/* Zvládneme to i my? */}
                        <motion.div className="glass-card p-8 md:p-10 text-left pointer-events-auto bg-white/10 border-white/20 hover:bg-white/90 hover:shadow-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between md:col-span-2 lg:col-span-1">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4 group-hover:text-gold-600 transition-colors">Mnohem víc</h3>
                                <p className="font-sans text-slate-700 leading-relaxed text-[15px] mb-6 shadow-sm">
                                    Někdy stačí jen malý impuls k velké změně. Děláme besedy pro školy, motivační setkání pro sportovní kluby nebo soukromé projekce pro menší skupiny. Napište nám a ušijeme to na míru.
                                </p>
                            </div>
                            <button 
                                onClick={() => setOpen(true)}
                                className="w-full bg-slate-900 text-white border border-slate-800 py-3.5 px-6 rounded-lg uppercase tracking-widest text-[11px] font-bold hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                Zjistit více <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* UX Glassmorphism Modal Overlay pro Popup Formulář */}
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-4 md:p-6 pointer-events-auto overflow-y-auto mt-20 pb-12"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setOpen(false);
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row border border-white/50 relative my-auto mt-10 md:mt-auto"
                    >
                        {/* Zavírací tlačítko */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>

                        {/* Levý panel - Informační (Glass look) */}
                        <div className="w-full md:w-2/5 md:bg-gradient-to-br md:from-slate-50/50 md:to-slate-100/50 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/50">
                            <div>
                                <h3 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4 md:mb-6 leading-tight">Začněme plánovat</h3>
                                <p className="font-sans text-slate-600 mb-8 md:mb-10 text-sm md:text-base leading-relaxed">
                                    Vyplňte krátký formulář a my se vám co nejdříve ozveme s návrhem termínů, formátů a podmínek.
                                </p>

                                <div className="space-y-6 md:space-y-8">
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 shadow-sm border border-gold-100">
                                            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-bold text-slate-900 text-sm md:text-base mb-1">Flexibilní termíny</h4>
                                            <p className="font-sans text-slate-500 text-xs md:text-sm leading-relaxed">Přizpůsobíme se rozvrhu vaší akce nebo konference.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 shadow-sm border border-gold-100">
                                            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-bold text-slate-900 text-sm md:text-base mb-1">Dojedeme kamkoliv</h4>
                                            <p className="font-sans text-slate-500 text-xs md:text-sm leading-relaxed">Přednášíme po celé ČR i na Slovensku, v sálech i venku.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 shadow-sm border border-gold-100">
                                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-bold text-slate-900 text-sm md:text-base mb-1">Vše na míru</h4>
                                            <p className="font-sans text-slate-500 text-xs md:text-sm leading-relaxed">Délku, téma i vizuální doprovod upravíme dle vašeho publika.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-slate-200/50">
                                <p className="font-sans text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 md:mb-5">Přímý kontakt</p>
                                <div className="flex flex-col gap-3 md:gap-4">
                                    <a href="mailto:info@honzatrava.cz" className="flex items-center gap-3 text-slate-700 hover:text-gold-600 transition-colors group w-fit">
                                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                                        <span className="font-sans text-sm md:text-base">info@honzatrava.cz</span>
                                    </a>
                                    <a href="tel:+420123456789" className="flex items-center gap-3 text-slate-700 hover:text-gold-600 transition-colors group w-fit">
                                        <Phone className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                                        <span className="font-sans text-sm md:text-base">+420 123 456 789</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Pravý panel - Formulář */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col bg-white">
                            <form className="flex-1 flex flex-col gap-6 md:gap-8 justify-between">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Vaše jméno / Firma</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-gold-400 focus:bg-white rounded-t-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="Jan Novák" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">E-mail</label>
                                        <input 
                                            type="email" 
                                            className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-gold-400 focus:bg-white rounded-t-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="jan@firma.cz" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Typ akce</label>
                                        <select className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-gold-400 focus:bg-white rounded-t-xl p-3.5 text-slate-800 text-sm transition-all outline-none appearance-none cursor-pointer">
                                            <option value="">Vyberte typ akce</option>
                                            <option value="firma">Firemní akce / Teambuilding</option>
                                            <option value="festival">Festival / Veřejná projekce</option>
                                            <option value="skola">Škola / Vzdělávací instituce</option>
                                            <option value="jine">Jiné</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Odhadovaný počet lidí</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-gold-400 focus:bg-white rounded-t-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="Např. 150" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Detail poptávky</label>
                                    <textarea 
                                        className="w-full flex-1 min-h-[120px] bg-slate-50 border-b-2 border-slate-200 focus:border-gold-400 focus:bg-white rounded-t-xl p-3.5 text-slate-800 text-sm transition-all outline-none resize-none" 
                                        placeholder="Popište nám stručně vaši představu, formát akce a další detaily..." 
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="group w-full flex justify-center items-center gap-3 bg-slate-900 text-white py-4 px-10 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-gold-600 transition shadow-lg shadow-slate-900/20"
                                    >
                                        Odeslat nezávaznou poptávku
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                index={imageIndex}
                slides={slides}
            />
        </motion.div>
    );
};

export default Lectures;
