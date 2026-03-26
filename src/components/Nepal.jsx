import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { MapPin, X, ExternalLink, Wifi, Home, Coffee, Utensils, Beer, ChevronLeft, ChevronRight } from 'lucide-react';
import HotelImg1 from '../assets/zmensene/hotel/czech-pub-highlander-010-hires.jpg';
import HotelImg2 from '../assets/zmensene/hotel/czech-pub-highlander-012-hires.jpg';
import HotelImg3 from '../assets/zmensene/hotel/czech-pub-highlander-017-hires.jpg';
import HotelImg4 from '../assets/zmensene/hotel/czech-pub-highlander-022-hires.jpg';

import PubImg1 from '../assets/zmensene/pub/prostory/czech-pub-highlander-035-hires.jpg';
import PubImg2 from '../assets/zmensene/pub/prostory/czech-pub-highlander-040-hires.jpg';
import PubImg3 from '../assets/zmensene/pub/prostory/czech-pub-highlander-045-hires.jpg';
import PubImg4 from '../assets/zmensene/pub/prostory/czech-pub-highlander-050-hires.jpg';
import PubBgImg from '../assets/zmensene/kathmandu/_mg_0642.jpg';
import HotelLogo from '../assets/svg/honza_trava_logo_hotel_V1.svg';
import PubLogo from '../assets/svg/honza_trava_logo_pub_V1.svg';

const Nepal = ({ scrollProgress }) => {
    const [openHotel, setOpenHotel] = useState(false);
    const [openPub, setOpenPub] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const hotelImages = [HotelImg2, HotelImg3, HotelImg4];
    const pubImages = [PubImg2, PubImg3, PubImg4];
    const allImages = [HotelImg1, PubImg1, HotelImg2, PubImg2, HotelImg3, PubImg3, HotelImg4, PubImg4];
    const activeGallery = openHotel ? hotelImages : openPub ? pubImages : allImages;
    const selectedIndex = activeGallery.indexOf(selectedImage);

    const handleNext = (e) => {
        e.stopPropagation();
        if (selectedIndex < activeGallery.length - 1) {
            setSelectedImage(activeGallery[selectedIndex + 1]);
        } else {
            setSelectedImage(activeGallery[0]);
        }
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (selectedIndex > 0) {
            setSelectedImage(activeGallery[selectedIndex - 1]);
        } else {
            setSelectedImage(activeGallery[activeGallery.length - 1]);
        }
    };

    // Prevent body scroll when any modal is open
    useScrollLock(openHotel || openPub || selectedImage);

    // PHASE 5: 0.42 -> 0.58 with hold (minimum gap to Expedice)
    const containerOpacity = useTransform(scrollProgress, [0.42, 0.46, 0.54, 0.58], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.42, 0.46, 0.54, 0.58], ["-120%", "0%", "0%", "130%"]);
    const bgY = useTransform(scrollProgress, [0.38, 0.62], ["-15%", "15%"]);
    
    // Background image fades in from 0
    const imageOpacity = useTransform(scrollProgress, [0.42, 0.46], [0, 1]);

    return (
        <>
        <motion.div
            style={{ opacity: containerOpacity, y: containerY }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* Full width background image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.img
                    style={{ y: bgY, opacity: imageOpacity }}
                    src={PubBgImg}
                    alt="Kathmandu Background"
                    className="absolute inset-0 w-full h-full object-cover scale-125 origin-center"
                />
            </div>

            <div
                className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
            >
                <div className="w-full flex items-center justify-center p-2 md:p-6 md:pr-24 lg:p-8 lg:pr-36 xl:px-12 pointer-events-none origin-center transition-transform duration-300 [@media(max-width:767px)]:scale-[0.72] [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.90] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.80] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.70] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.60]">
                    {/* Single main glass card combining Hotel, Pub and Gallery */}
                    <motion.div 
                        className="max-w-5xl w-full bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-2xl md:rounded-[2rem] p-4 md:p-6 lg:p-10 flex flex-col pointer-events-auto overflow-hidden"
                        whileHover={{ y: -5 }}
                    >
                    <div className="text-center mb-2 md:mb-6">
                        <div className="flex items-center justify-center gap-2 text-gold-600 mb-2 md:mb-3">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-[10px] md:text-xs tracking-widest font-bold uppercase">Kathmandu Base Camp</span>
                        </div>
                        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-slate-900 leading-tight">Cesta nekončí, když slezeš z hory</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-6 md:mb-8">
                        {/* Hotel Text */}
                        <div className="flex flex-col">
                            <img src={HotelLogo} alt="Hotel Kathmandu Base Camp Logo" className="h-[100px] md:h-[220px] lg:h-[280px] max-w-[150%] w-auto object-contain object-left -mt-6 md:-mt-16 lg:-mt-24 -ml-4 md:-ml-8 -mb-6 md:-mb-16 lg:-mb-20 self-start drop-shadow-sm pointer-events-none scale-110 md:scale-125 origin-left" />
                            <p className="font-sans text-slate-800 text-sm md:text-lg leading-relaxed flex-1 mt-2 md:mt-6">
                                Náš hotel v centru Thamelu je tvůj skutečný základní tábor. Místo, kde ze sebe smyješ prach, dáš si horkou sprchu a vydechneš. Čisté pokoje s wifinou, rodinná atmosféra a střešní terasa. Domluvíš se tu česky.
                            </p>
                            <button
                                onClick={() => setOpenHotel(true)}
                                className="mt-4 md:mt-6 px-5 py-2 md:px-6 md:py-3 bg-slate-900 hover:bg-gold-600 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-xl self-start w-max"
                            >
                                Více & galerie
                            </button>
                        </div>

                        {/* Pub Text */}
                        <div className="flex flex-col">
                            <img src={PubLogo} alt="Czech Pub Logo" className="h-[100px] md:h-[220px] lg:h-[280px] max-w-[150%] w-auto object-contain object-left -mt-6 md:-mt-16 lg:-mt-24 -ml-4 md:-ml-8 -mb-6 md:-mb-16 lg:-mb-20 self-start drop-shadow-sm pointer-events-none scale-110 md:scale-125 origin-left" />
                            <p className="font-sans text-slate-800 text-sm md:text-lg leading-relaxed flex-1 mt-2 md:mt-6">
                                Středobod českého vesmíru v Nepálu. Místo, kde se potkávají trekaři, expedice i sólisti. Načepujeme české i nepálské pivo a naservírujeme bramborový salát jako od mámy nebo nejlepší smažák v Káthmándú. Ty nejlepší cesty se nedají uspěchat.
                            </p>
                            <button
                                onClick={() => setOpenPub(true)}
                                className="mt-4 md:mt-6 px-5 py-2 md:px-6 md:py-3 bg-slate-900 hover:bg-gold-600 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-xl self-start w-max"
                            >
                                Více & galerie
                            </button>
                        </div>
                    </div>

                    {/* Horizontal scrolling gallery inside the box */}
                    <div className="pt-4 md:pt-6 border-t border-slate-900/10">
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            {allImages.map((src, idx) => (
                                <div key={idx} className="min-w-[160px] md:min-w-[200px] cursor-pointer group relative flex-shrink-0" onClick={() => setSelectedImage(src)}>
                                    <img src={src} className="w-full h-32 md:h-40 object-cover rounded-xl shadow-sm border border-white group-hover:scale-105 transition-transform" alt="Nepal gallery" />
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 rounded-xl transition-colors pointer-events-none" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
                </div>
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
                            <img src={HotelImg1} className="w-full h-full object-cover" alt="Hotel Kathmandu Base Camp" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-serif text-3xl md:text-4xl mb-3 leading-tight">Hotel Kathmandu<br/>Base Camp</h3>
                                <div className="flex items-center text-gold-400 gap-2 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="uppercase tracking-widest text-xs font-bold shadow-sm">Thamel, Káthmándú</span>
                                </div>
                            </div>
                        </div>

                        {/* Right content area */}
                        <div 
                            className="md:w-[55%] p-6 md:p-8 overflow-y-auto flex flex-col text-left overscroll-contain"
                            data-lenis-prevent
                        >
                            <button
                                onClick={() => setOpenHotel(false)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600 z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <img src={HotelLogo} alt="Hotel Kathmandu Base Camp Logo" className="h-[120px] md:h-[180px] lg:h-[230px] max-w-[150%] w-auto object-contain object-left -mt-8 md:-mt-12 lg:-mt-16 -ml-4 md:-ml-8 -mb-8 md:-mb-12 self-start pointer-events-none scale-110 md:scale-125 origin-left" />
                            <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-3 md:mb-4 lg:-mt-2 relative z-10 mt-2 md:mt-4">Tvůj základní tábor před výpravou</h2>

                            <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                                Náš hotel v centru Thamelu je tvé útočiště z divokých ulic Káthmándú. Místo, kde ze sebe smyješ prach, dáš si horkou sprchu a vydechneš. Zakládáme si na absolutní čistotě, klidné rodinné atmosféře a faktu, že se tu s námi domluvíš česky.
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6">
                                <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                                    <div className="p-1.5 md:p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Wifi className="w-4 h-4 md:w-5 md:h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-xs md:text-sm">Rychlá Wi-Fi</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                                    <div className="p-1.5 md:p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Home className="w-4 h-4 md:w-5 md:h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-xs md:text-sm">Rooftop terasa</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                                    <div className="p-1.5 md:p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Coffee className="w-4 h-4 md:w-5 md:h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-xs md:text-sm">Klid a pohoda</span>
                                </div>
                            </div>

                            <h5 className="font-sans uppercase tracking-widest text-xs text-slate-400 mb-4 font-bold">Galerie</h5>
                            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-8">
                                {hotelImages.map((src, i) => (
                                    <div key={i} className="cursor-pointer group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-slate-200" onClick={() => setSelectedImage(src)}>
                                        <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gallery item" />
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors pointer-events-none" />
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
                            <img src={PubImg1} className="w-full h-full object-cover" alt="Czech Pub Nepal" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-serif text-3xl md:text-4xl mb-3 leading-tight">Czech Pub<br/>Nepal</h3>
                                <div className="flex items-center text-gold-400 gap-2 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="uppercase tracking-widest text-xs font-bold shadow-sm">Káthmándú, Nepal</span>
                                </div>
                            </div>
                        </div>

                        {/* Right content area */}
                        <div 
                            className="md:w-[55%] p-6 md:p-8 overflow-y-auto flex flex-col text-left overscroll-contain"
                            data-lenis-prevent
                        >
                            <button
                                onClick={() => setOpenPub(false)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <img src={PubLogo} alt="Czech Pub Logo" className="h-[120px] md:h-[180px] lg:h-[230px] max-w-[150%] w-auto object-contain object-left -mt-8 md:-mt-12 lg:-mt-16 -ml-4 md:-ml-8 -mb-8 md:-mb-12 self-start pointer-events-none scale-110 md:scale-125 origin-left" />
                            <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-3 md:mb-4 lg:-mt-2 relative z-10 mt-2 md:mt-4">Místo, kde se potkávají dobrodruzi</h2>

                            <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                                Středobod českého vesmíru v Nepálu. Načepujeme ti parádní pivo a naservírujeme poctivý smažák. Sdílej historky z expedic a nasávej atmosféru s lidmi, kteří mají hory pod kůží.
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6">
                                <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                                    <div className="p-1.5 md:p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Beer className="w-4 h-4 md:w-5 md:h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-xs md:text-sm">Točené pivo</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                                    <div className="p-1.5 md:p-2 bg-white rounded-lg shadow-sm border border-slate-100"><Utensils className="w-4 h-4 md:w-5 md:h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-xs md:text-sm">Domácí smažák</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                                    <div className="p-1.5 md:p-2 bg-white rounded-lg shadow-sm border border-slate-100"><MapPin className="w-4 h-4 md:w-5 md:h-5 text-gold-500"/></div>
                                    <span className="font-semibold text-xs md:text-sm">Centrum dění</span>
                                </div>
                            </div>

                            <h5 className="font-sans uppercase tracking-widest text-xs text-slate-400 mb-4 font-bold">Galerie</h5>
                            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-8">
                                {pubImages.map((src, i) => (
                                    <div key={i} className="cursor-pointer group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-slate-200" onClick={() => setSelectedImage(src)}>
                                        <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gallery item" />
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors pointer-events-none" />
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
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition text-white backdrop-blur-sm cursor-pointer z-[115]"
                        aria-label="Předchozí"
                    >
                        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                    </button>
                    
                    <motion.img
                        key={selectedImage}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        src={selectedImage}
                        alt="Zvětšený náhled"
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition text-white backdrop-blur-sm cursor-pointer z-[115]"
                        aria-label="Další"
                    >
                        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white backdrop-blur-sm z-[115]"
                        aria-label="Zavřít"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-base font-sans font-bold tracking-widest bg-black/50 px-5 py-2 rounded-full pointer-events-none z-[115]">
                        {selectedIndex + 1} / {activeGallery.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Nepal;
