import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, X, ExternalLink, Wifi, Home, Coffee, Utensils, Beer } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';
import IcefallImg from '../assets/icefall_bg.jpg';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HotelLogo from '../assets/logo_2.png';

const Nepal = ({ scrollProgress }) => {
    const [openHotel, setOpenHotel] = useState(false);
    const [openPub, setOpenPub] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // PHASE 5: 0.42 -> 0.58 with hold (minimum gap to Expedice)
    const containerOpacity = useTransform(scrollProgress, [0.42, 0.46, 0.54, 0.58], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.42, 0.46, 0.54, 0.58], ["-120%", "0%", "0%", "130%"]);
    const bgY = useTransform(scrollProgress, [0.38, 0.62], ["-15%", "15%"]);

    return (
        <>
        <motion.div
            style={{ opacity: containerOpacity, y: containerY }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* Full width background image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.img
                    style={{ y: bgY }}
                    src={BaseCampImg}
                    alt="Kathmandu Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 scale-125 origin-center"
                />
                <div className="absolute inset-0 bg-slate-900/30" />
            </div>

            <div
                className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-12 pointer-events-none"
            >
                {/* Single main glass card combining Hotel, Pub and Gallery */}
                <motion.div 
                    className="max-w-5xl w-full bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] p-8 md:p-14 flex flex-col pointer-events-auto overflow-hidden"
                    whileHover={{ y: -5 }}
                >
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2 text-gold-600 mb-3">
                            <MapPin className="w-5 h-5" />
                            <span className="text-xs tracking-widest font-bold uppercase">Kathmandu Base Camp</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight">Czech Pub Nepal</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
                        {/* Hotel Text */}
                        <div className="flex flex-col">
                            <img src={HotelLogo} alt="Hotel Kathmandu Base Camp Logo" className="h-[64px] object-contain mb-4 self-start" />
                            <p className="font-sans text-slate-800 text-lg leading-relaxed flex-1">
                                Náš hotel v centru Thamelu je tvůj skutečný základní tábor. Místo, kde ze sebe smyješ prach, dáš si horkou sprchu a vydechneš. Čisté pokoje s wifinou, rodinná atmosféra a střešní terasa. Domluvíš se tu česky.
                            </p>
                            <button
                                onClick={() => setOpenHotel(true)}
                                className="mt-6 text-xs uppercase tracking-[0.2em] font-bold text-slate-900 border-b border-slate-900 hover:text-gold-600 hover:border-gold-600 transition self-start"
                            >
                                Více & galerie
                            </button>
                        </div>

                        {/* Pub Text */}
                        <div className="flex flex-col">
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4 mt-2">
                                CZECH PUB
                            </h4>
                            <p className="font-sans text-slate-800 text-lg leading-relaxed flex-1">
                                Středobod českého vesmíru v Nepálu. Místo, kde se potkávají trekaři, expedice i sólisti. Načepujeme české i nepálské pivo a naservírujeme bramborový salát jako od mámy nebo nejlepší smažák v Káthmándú. Ty nejlepší cesty se nedají uspěchat.
                            </p>
                            <button
                                onClick={() => setOpenPub(true)}
                                className="mt-6 text-xs uppercase tracking-[0.2em] font-bold text-slate-900 border-b border-slate-900 hover:text-gold-600 hover:border-gold-600 transition self-start"
                            >
                                Více & galerie
                            </button>
                        </div>
                    </div>

                    {/* Horizontal scrolling gallery inside the box */}
                    <div className="pt-8 border-t border-slate-900/10">
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            {[BaseCampImg, IcefallImg, ClimbersImg, BaseCampImg, IcefallImg, ClimbersImg, BaseCampImg, IcefallImg].map((src, idx) => (
                                <div key={idx} className="min-w-[160px] md:min-w-[200px] cursor-pointer group relative flex-shrink-0" onClick={() => setSelectedImage(src)}>
                                    <img src={src} className="w-full h-32 md:h-40 object-cover rounded-xl shadow-sm border border-white group-hover:scale-105 transition-transform" alt="Nepal gallery" />
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 rounded-xl transition-colors pointer-events-none" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>

        <AnimatePresence>
            {/* Hotel Modal */}
            {openHotel && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden relative pointer-events-auto flex flex-col md:flex-row"
                    >
                        {/* Left image area */}
                        <div className="md:w-[45%] h-64 md:h-auto relative">
                            <img src={BaseCampImg} className="w-full h-full object-cover" alt="Hotel Kathmandu Base Camp" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-serif text-3xl md:text-4xl mb-3 leading-tight">Hotel Kathmandu<br/>Base Camp</h3>
                                <div className="flex items-center text-gold-400 gap-2 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="uppercase tracking-widest text-xs font-bold shadow-sm">Thamel, Káthmándú</span>
                                </div>
                            </div>
                        </div>

                        {/* Right content area */}
                        <div className="md:w-[55%] p-8 md:p-12 overflow-y-auto flex flex-col text-left">
                            <button
                                onClick={() => setOpenHotel(false)}
                                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <img src={HotelLogo} alt="Hotel Kathmandu Base Camp Logo" className="h-[64px] object-contain mb-6 self-start" />
                            <h2 className="font-serif text-3xl text-slate-900 mb-6">Tvůj základní tábor před výpravou</h2>

                            <p className="font-sans text-slate-700 text-lg leading-relaxed mb-8">
                                Náš hotel v centru Thamelu je tvé útočiště z divokých ulic Káthmándú. Místo, kde ze sebe smyješ prach, dáš si horkou sprchu a vydechneš. Zakládáme si na absolutní čistotě, klidné rodinné atmosféře a faktu, že se tu s námi domluvíš česky.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Wifi className="w-5 h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-sm">Rychlá Wi-Fi</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Home className="w-5 h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-sm">Rooftop terasa</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Coffee className="w-5 h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-sm">Klid a pohoda</span>
                                </div>
                            </div>

                            <h5 className="font-sans uppercase tracking-widest text-xs text-slate-400 mb-4 font-bold">Galerie</h5>
                            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
                                {[BaseCampImg, IcefallImg, ClimbersImg].map((src, i) => (
                                    <div key={i} className="cursor-pointer group relative flex-shrink-0" onClick={() => setSelectedImage(src)}>
                                        <img src={src} className="w-32 h-24 object-cover rounded-xl shadow-sm border border-white group-hover:scale-105 transition-transform" alt="Gallery item" />
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 rounded-xl transition-colors pointer-events-none" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                <a href="#" className="flex-1 flex justify-center items-center gap-2 bg-slate-900 text-white py-4 px-6 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-gold-600 transition shadow-lg shadow-slate-900/20">
                                    Rezervovat pokoj <ExternalLink className="w-4 h-4"/>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Pub Modal */}
            {openPub && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden relative pointer-events-auto flex flex-col md:flex-row"
                    >
                        {/* Left image area */}
                        <div className="md:w-[45%] h-64 md:h-auto relative">
                            <img src={ClimbersImg} className="w-full h-full object-cover" alt="Czech Pub Nepal" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-serif text-3xl md:text-4xl mb-3 leading-tight">Czech Pub<br/>Nepal</h3>
                                <div className="flex items-center text-gold-400 gap-2 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="uppercase tracking-widest text-xs font-bold shadow-sm">Káthmándú, Nepal</span>
                                </div>
                            </div>
                        </div>

                        {/* Right content area */}
                        <div className="md:w-[55%] p-8 md:p-12 overflow-y-auto flex flex-col text-left">
                            <button
                                onClick={() => setOpenPub(false)}
                                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4 mt-2">Gastronomie</h4>
                            <h2 className="font-serif text-3xl text-slate-900 mb-6">Místo, kde se potkávají dobrodruzi</h2>

                            <p className="font-sans text-slate-700 text-lg leading-relaxed mb-8">
                                Středobod českého vesmíru v Nepálu. Načepujeme ti parádní pivo a naservírujeme poctivý smažák. Sdílej historky z expedic a nasávej atmosféru s lidmi, kteří mají hory pod kůží.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Beer className="w-5 h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-sm">Točené pivo</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Utensils className="w-5 h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-sm">Domácí smažák</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"><MapPin className="w-5 h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-sm">Centrum dění</span>
                                </div>
                            </div>

                            <h5 className="font-sans uppercase tracking-widest text-xs text-slate-400 mb-4 font-bold">Galerie</h5>
                            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
                                {[IcefallImg, ClimbersImg, BaseCampImg].map((src, i) => (
                                    <div key={i} className="cursor-pointer group relative flex-shrink-0" onClick={() => setSelectedImage(src)}>
                                        <img src={src} className="w-32 h-24 object-cover rounded-xl shadow-sm border border-white group-hover:scale-105 transition-transform" alt="Gallery item" />
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 rounded-xl transition-colors pointer-events-none" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                <a href="#" className="flex-1 flex justify-center items-center gap-2 bg-slate-900 text-white py-4 px-6 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-gold-600 transition shadow-lg shadow-slate-900/20">
                                    Navštívit na mapě <ExternalLink className="w-4 h-4"/>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Lightbox / Fullscreen Image Overlay */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
                >
                    <motion.img
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        src={selectedImage}
                        alt="Zvětšený náhled"
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white backdrop-blur-sm"
                        aria-label="Zavřít"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Nepal;
