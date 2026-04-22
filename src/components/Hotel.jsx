import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, useTransform, AnimatePresence, useMotionValue, animate as fmAnimate } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { MapPin, X, ExternalLink, Wifi, Flower2, ChevronLeft, ChevronRight, Star, Bed, Sunrise, Coffee, Images, ZoomIn } from 'lucide-react';

import HotelBg        from '../assets/zmensene/hotel/czech-pub-highlander-006-hires.jpg';
import HotelHero      from '../assets/zmensene/hotel/czech-pub-highlander-004-hires.jpg';
import HotelLogoLight from '../assets/svg/honza_trava_logo_hotel_negativni_V1.svg';
import HotelLogo      from '../assets/svg/honza_trava_logo_hotel_V1.svg';
import H1  from '../assets/zmensene/hotel/czech-pub-highlander-005-hires.jpg';
import H2  from '../assets/zmensene/hotel/czech-pub-highlander-007-hires.jpg';
import H3  from '../assets/zmensene/hotel/czech-pub-highlander-008-hires.jpg';
import H4  from '../assets/zmensene/hotel/czech-pub-highlander-009-hires.jpg';
import H5  from '../assets/zmensene/hotel/czech-pub-highlander-010-hires.jpg';
import H6  from '../assets/zmensene/hotel/czech-pub-highlander-011-hires.jpg';
import H7  from '../assets/zmensene/hotel/czech-pub-highlander-012-hires.jpg';
import H8  from '../assets/zmensene/hotel/czech-pub-highlander-013-hires.jpg';
import H9  from '../assets/zmensene/hotel/czech-pub-highlander-014-hires.jpg';
import H10 from '../assets/zmensene/hotel/czech-pub-highlander-015-hires.jpg';
import H11 from '../assets/zmensene/hotel/czech-pub-highlander-016-hires.jpg';
import H12 from '../assets/zmensene/hotel/czech-pub-highlander-017-hires.jpg';
import H13 from '../assets/zmensene/hotel/image00023.jpg';
import H14 from '../assets/zmensene/hotel/image00024.jpg';
import H15 from '../assets/zmensene/hotel/image00025.jpg';
import H16 from '../assets/zmensene/hotel/image00026.jpg';

const galleryImages = [H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, H11, H12, H13, H14, H15, H16];

const FEATURES = [
    { icon: <Sunrise className="w-3.5 h-3.5 text-gold-500" />, label: 'Kontinentální snídaně' },
    { icon: <Flower2  className="w-3.5 h-3.5 text-gold-500" />, label: 'Zahrada & terasa' },
    { icon: <Wifi     className="w-3.5 h-3.5 text-gold-500" />, label: 'Rychlá Wi-Fi' },
    { icon: <Bed      className="w-3.5 h-3.5 text-gold-500" />, label: 'Čisté pokoje' },
    { icon: <Star     className="w-3.5 h-3.5 text-gold-500" />, label: 'Domluvíš se česky' },
    { icon: <Coffee   className="w-3.5 h-3.5 text-gold-500" />, label: 'Klid v srdci Thamelu' },
];

const Hotel = ({ scrollProgress }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeDot, setActiveDot]         = useState(0);
    const [galleryOpen, setGalleryOpen]     = useState(false);
    const lenis      = useLenis();
    const trackRef   = useRef(null);
    const trackX     = useMotionValue(0);
    const isDragging = useRef(false);

    const mobX    = useMotionValue(0);
    const mobRef  = useRef(null);
    const mobCtrl = useRef(null);
    const mobRun  = useRef(null);

    const dskX         = useMotionValue(0);
    const dskRef       = useRef(null);
    const dskCtrl      = useRef(null);
    const dskRun       = useRef(null);
    const dskDragging  = useRef(false);

    useScrollLock(!!selectedImage || galleryOpen);

    const si = galleryImages.indexOf(selectedImage);
    const handleNext = (e) => { e.stopPropagation(); setSelectedImage(galleryImages[(si + 1) % galleryImages.length]); };
    const handlePrev = (e) => { e.stopPropagation(); setSelectedImage(galleryImages[(si - 1 + galleryImages.length) % galleryImages.length]); };

    // PHASE 5: Hotel  0.36 → 0.47
    const containerOpacity = useTransform(scrollProgress, [0.34, 0.37, 0.41, 0.44], [0, 1, 1, 0]);
    const containerY       = useTransform(scrollProgress, [0.34, 0.37, 0.41, 0.44], ['-120%', '0%', '0%', '130%']);
    const bgY              = useTransform(scrollProgress, [0.32, 0.50], ['-15%', '15%']);
    const imageOpacity     = useTransform(scrollProgress, [0.34, 0.37], [0, 1]);

    // Mobile carousel: 0→1 within the visible window (0.40–0.44)
    // card1 in first half, card2 in second half
    const carouselProg = useTransform(scrollProgress, [0.38, 0.41], [0, 1]);

    useEffect(() => {
        return carouselProg.on('change', (v) => {
            if (window.innerWidth >= 768 || isDragging.current) return;
            const cardW = window.innerWidth * 0.82 + 12;
            trackX.set(-v * cardW);
            setActiveDot(v >= 0.5 ? 1 : 0);
        });
    }, [carouselProg, trackX]);

    useEffect(() => {
        let alive = true;
        function run() {
            if (!alive) return;
            const el = mobRef.current;
            if (!el || el.scrollWidth < 10) { setTimeout(run, 100); return; }
            const halfW = el.scrollWidth / 2;
            let from = mobX.get();
            if (from > 0 || from < -halfW) { mobX.set(0); from = 0; }
            const dist = halfW + from;
            mobCtrl.current = fmAnimate(mobX, -halfW, {
                duration: dist > 0 ? 20 * (dist / halfW) : 20,
                ease: 'linear',
                onComplete: () => { mobX.set(0); run(); },
            });
        }
        mobRun.current = run;
        setTimeout(run, 80);
        return () => { alive = false; mobCtrl.current?.stop(); };
    }, []); // eslint-disable-line

    useEffect(() => {
        let alive = true;
        function run() {
            if (!alive) return;
            const el = dskRef.current;
            if (!el || el.scrollWidth < 10) { setTimeout(run, 100); return; }
            const halfW = el.scrollWidth / 2;
            let from = dskX.get();
            if (from > 0 || from < -halfW) { dskX.set(0); from = 0; }
            const dist = halfW + from;
            dskCtrl.current = fmAnimate(dskX, -halfW, {
                duration: dist > 0 ? 22 * (dist / halfW) : 22,
                ease: 'linear',
                onComplete: () => { dskX.set(0); run(); },
            });
        }
        dskRun.current = run;
        setTimeout(run, 80);
        return () => { alive = false; dskCtrl.current?.stop(); };
    }, []); // eslint-disable-line

    return (
        <>
        {/* BACKGROUND */}
        <motion.div style={{ opacity: containerOpacity, y: containerY, zIndex: 0 }} className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <motion.img style={{ y: bgY, opacity: imageOpacity }} src={HotelBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-125 origin-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-slate-900/40" />
            </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div style={{ opacity: containerOpacity, y: containerY, zIndex: 70 }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="w-full h-full flex items-center justify-center pointer-events-none">

                {/* ── MOBILE: scroll-driven translateX carousel ── */}
                <div className="flex md:hidden w-full overflow-hidden pointer-events-none" style={{ paddingLeft: '9vw' }}>
                    {/* track: 2 cards side by side, draggable + scroll-driven */}
                    <motion.div
                        ref={trackRef}
                        className="flex gap-3 pointer-events-auto"
                        style={{ x: trackX, touchAction: 'pan-y' }}
                        drag="x"
                        dragConstraints={{ left: -(window.innerWidth * 0.82 + 12), right: 0 }}
                        dragElastic={0.05}
                        dragMomentum={false}
                        onDragStart={() => { isDragging.current = true; }}
                        onDragEnd={(_, info) => {
                            isDragging.current = false;
                            const cardW = window.innerWidth * 0.82 + 12;
                            const cur = trackX.get();
                            const totalH = document.documentElement.scrollHeight - window.innerHeight;
                            const fastLeft  = info.velocity.x < -300;
                            const fastRight = info.velocity.x > 300;
                            if ((cur < -cardW * 0.35 || fastLeft) && activeDot === 0) {
                                lenis?.scrollTo(totalH * 0.41, { duration: 0.6 });
                            } else if ((cur > -cardW * 0.65 || fastRight) && activeDot === 1) {
                                lenis?.scrollTo(totalH * 0.38, { duration: 0.6 });
                            } else {
                                fmAnimate(trackX, activeDot === 1 ? -cardW : 0, { duration: 0.35, ease: [0.25, 1, 0.5, 1] });
                            }
                        }}
                    >

                        {/* Card 1 – Identity */}
                        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white border border-white/50 pointer-events-auto"
                             style={{ width: '82vw', height: '76vh' }}>
                            <div className="relative" style={{ flex: '0 0 58%' }}>
                                <img src={HotelHero} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                                    <img src={HotelLogoLight} alt="" className="h-40 w-auto object-contain object-left -ml-2 mb-1 pointer-events-none opacity-95" />
                                    <div className="inline-flex items-center gap-1 text-gold-400 mb-1 bg-slate-900/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                        <span className="text-[9px] uppercase tracking-widest font-bold">Thamel, Káthmándú</span>
                                    </div>
                                    <h3 className="text-white font-serif text-lg leading-snug">Květinová oáza klidu<br/>uprostřed Thamelu</h3>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between p-4" style={{ flex: '0 0 42%' }}>
                                <p className="text-slate-600 text-sm leading-relaxed">Zázemí pro trekaře a lezce přímo v srdci Thamelu. Snídaně, zahrada, Wi-Fi a vždy někdo, kdo se s tebou domluví česky.</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Scroll pro detaily ↓</span>
                                    <div className="flex gap-1.5">
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 0 ? 'bg-gold-400' : 'bg-slate-200'}`} />
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 1 ? 'bg-gold-400' : 'bg-slate-200'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 – Features + Gallery + CTA */}
                        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white border border-white/50 p-4 pointer-events-auto"
                             style={{ width: '82vw', height: '76vh' }}>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-3">
                                {FEATURES.map(({ icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className="p-1.5 bg-amber-50 border border-amber-100 rounded-lg flex-shrink-0">{icon}</div>
                                        <span className="text-[11px] font-semibold text-slate-700 leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Galerie</p>
                            <div className="relative flex-1 min-h-0 mb-2 rounded-xl"
                                style={{ overflowX: 'clip', overflowY: 'visible' }}
                                onMouseEnter={() => mobCtrl.current?.stop()}
                                onMouseLeave={() => mobRun.current?.()}>
                                <motion.div
                                    ref={mobRef}
                                    className="flex gap-1.5 h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto"
                                    style={{ x: mobX, touchAction: 'pan-y' }}
                                    drag="x"
                                    dragConstraints={{ left: -9999, right: 9999 }}
                                    dragElastic={0}
                                    dragMomentum={false}
                                    onDragStart={() => mobCtrl.current?.stop()}
                                    onDragEnd={() => mobRun.current?.()}
                                >
                                    {[...galleryImages, ...galleryImages].map((src, i) => (
                                        <button key={i} onClick={() => setSelectedImage(galleryImages[i % galleryImages.length])}
                                            className="relative flex-shrink-0 h-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 active:scale-[0.97] hover:scale-[2.5] hover:z-10 transition-all duration-300">
                                            <img src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => setGalleryOpen(true)}
                                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-gold-50 border border-slate-200 hover:border-gold-300 text-slate-700 text-[11px] uppercase tracking-widest font-bold py-3 px-4 rounded-xl transition-all">
                                    <Images className="w-3.5 h-3.5 text-gold-500" /> Celá galerie ({galleryImages.length})
                                </button>
                                <a href="https://www.booking.com/hotel/np/kathmandu-base-camp.html" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-gold-600 text-white text-[11px] uppercase tracking-widest font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg">
                                    Rezervovat pokoj <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <div className="flex justify-center gap-1.5 mt-1">
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 0 ? 'bg-gold-400' : 'bg-slate-200'}`} />
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 1 ? 'bg-gold-400' : 'bg-slate-200'}`} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── DESKTOP: side-by-side card (no scroll lock) ── */}
                <div className="hidden md:flex w-full items-center justify-center p-6 lg:p-8 xl:px-12 pointer-events-none origin-center transition-transform duration-300
                    [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.90]
                    [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.80]
                    [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.70]
                    [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.60]">
                    <motion.div className="max-w-5xl w-full bg-white/90 backdrop-blur-2xl border border-white/70 shadow-2xl rounded-[2rem] overflow-hidden pointer-events-auto flex" whileHover={{ y: -3 }}>
                        {/* Left image */}
                        <div className="w-[42%] relative flex-shrink-0">
                            <img src={HotelHero} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                                <div className="inline-flex items-center gap-1.5 text-gold-400 mb-2 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Thamel, Káthmándú</span>
                                </div>
                                <h3 className="text-white font-serif text-3xl leading-tight">Hotel<br/>Kathmandu<br/>Base Camp</h3>
                            </div>
                        </div>
                        {/* Right content – no overflow-y, no lenis-prevent → page scroll works freely */}
                        <div className="w-[58%] flex flex-col p-7">
                            <img src={HotelLogo} alt="" className="h-[90px] lg:h-[110px] w-auto object-contain object-left -mt-4 lg:-mt-5 -ml-3 -mb-2 self-start pointer-events-none drop-shadow-sm" />
                            <h2 className="font-serif text-2xl lg:text-3xl text-slate-900 mt-4 mb-2 leading-snug">Květinová oáza klidu<br/>uprostřed Thamelu</h2>
                            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-2">
                                Jsme na dosah dění, a přesto tu vládne ticho. Snídaně plná čerstvého ovoce, pečiva a vajec tě připraví na výpravu nebo vrátí do pořádku po návratu z hor. Zahrada plná květin — útočiště od káthmándúského ruchu.
                            </p>
                            <p className="text-slate-500 text-sm leading-relaxed mb-3">
                                Čisté pokoje, rychlá Wi-Fi a vždy někdo, s kým se domluvíš česky.
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {FEATURES.map(({ icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-2 text-slate-700">
                                        <div className="p-1.5 bg-amber-50 border border-amber-100 rounded-lg shadow-sm flex-shrink-0">{icon}</div>
                                        <span className="text-xs md:text-sm font-semibold leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Galerie</p>
                            <div className="rounded-xl mb-3"
                                style={{ overflowX: 'clip', overflowY: 'visible' }}
                                onMouseEnter={() => dskCtrl.current?.stop()}
                                onMouseLeave={() => { if (!dskDragging.current) dskRun.current?.(); }}>
                                <motion.div
                                    ref={dskRef}
                                    className="flex gap-2 cursor-grab active:cursor-grabbing select-none"
                                    style={{ x: dskX, touchAction: 'none' }}
                                    drag="x"
                                    dragConstraints={{ left: -9999, right: 9999 }}
                                    dragElastic={0}
                                    dragMomentum={false}
                                    onDragStart={() => { dskDragging.current = true; dskCtrl.current?.stop(); }}
                                    onDragEnd={() => { dskDragging.current = false; dskRun.current?.(); }}
                                >
                                    {[...galleryImages, ...galleryImages].map((src, i) => (
                                        <button key={i} onClick={() => setSelectedImage(galleryImages[i % galleryImages.length])} className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:scale-[2.5] hover:z-10 transition-all duration-300">
                                            <img src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="mt-auto flex flex-col gap-2">
                                <button onClick={() => setGalleryOpen(true)}
                                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-gold-50 border border-slate-200 hover:border-gold-300 text-slate-700 hover:text-slate-900 text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl transition-all">
                                    <Images className="w-4 h-4 text-gold-500" />
                                    Celá galerie ({galleryImages.length} fotek)
                                </button>
                                <a href="https://www.booking.com/hotel/np/kathmandu-base-camp.html" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-gold-600 text-white text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-slate-900/20">
                                    Rezervovat pokoj <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </motion.div>

        {/* GALLERY MODAL */}
        <AnimatePresence>
            {galleryOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[108] bg-slate-950 flex flex-col"
                >
                    <div className="flex items-center justify-between px-5 md:px-10 py-4 md:py-5 border-b border-white/10 shrink-0 bg-slate-950/95 backdrop-blur-md">
                        <div>
                            <p className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.35em] font-bold mb-0.5">Fotogalerie</p>
                            <h3 className="text-white font-serif text-lg md:text-2xl leading-none">Hotel Kathmandu Base Camp</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="hidden md:block text-slate-500 font-mono text-sm">{galleryImages.length} fotek</span>
                            <button onClick={() => setGalleryOpen(false)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 md:p-6 lg:p-8" data-lenis-prevent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                            {galleryImages.map((src, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.035, duration: 0.3 }}
                                    onClick={() => { setGalleryOpen(false); setSelectedImage(src); }}
                                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900"
                                >
                                    <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" loading="lazy" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                                        <ZoomIn className="w-7 h-7 text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* LIGHTBOX */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out">
                    <button onClick={handlePrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-[115]">
                        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                    </button>
                    <motion.img key={selectedImage} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }}
                        src={selectedImage} alt="" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
                    <button onClick={handleNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-[115]">
                        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-[115]">
                        <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-bold tracking-widest bg-black/50 px-5 py-2 rounded-full pointer-events-none z-[115]">
                        {si + 1} / {galleryImages.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Hotel;
