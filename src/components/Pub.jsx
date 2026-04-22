import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, useTransform, AnimatePresence, useMotionValue, animate as fmAnimate } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { MapPin, X, ExternalLink, Beer, Utensils, Users, ChevronLeft, ChevronRight, Star, Clock, Flame } from 'lucide-react';

import PubBg      from '../assets/zmensene/kathmandu/_mg_0642.jpg';
import PubHero    from '../assets/zmensene/pub/prostory/czech-pub-highlander-035-hires.jpg';
import PubLogoNeg from '../assets/svg/honza_trava_logo_pub_negativni_V1.svg';
import P1  from '../assets/zmensene/pub/prostory/czech-pub-highlander-036-hires.jpg';
import P2  from '../assets/zmensene/pub/prostory/czech-pub-highlander-039-hires.jpg';
import P3  from '../assets/zmensene/pub/prostory/czech-pub-highlander-040-hires.jpg';
import P4  from '../assets/zmensene/pub/prostory/czech-pub-highlander-041-hires.jpg';
import P5  from '../assets/zmensene/pub/prostory/czech-pub-highlander-042-hires.jpg';
import P6  from '../assets/zmensene/pub/prostory/czech-pub-highlander-043-hires.jpg';
import P7  from '../assets/zmensene/pub/prostory/czech-pub-highlander-044-hires.jpg';
import P8  from '../assets/zmensene/pub/prostory/czech-pub-highlander-045-hires.jpg';
import P9  from '../assets/zmensene/pub/prostory/czech-pub-highlander-046-hires.jpg';
import P10 from '../assets/zmensene/pub/prostory/czech-pub-highlander-047-hires.jpg';
import P11 from '../assets/zmensene/pub/prostory/czech-pub-highlander-048-hires.jpg';
import P12 from '../assets/zmensene/pub/prostory/czech-pub-highlander-049-hires.jpg';
import P13 from '../assets/zmensene/pub/prostory/czech-pub-highlander-050-hires.jpg';

const galleryImages = [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13];

const FEATURES = [
    { icon: <Beer     className="w-3.5 h-3.5 text-gold-400" />, label: 'České pivo na čepu' },
    { icon: <Utensils className="w-3.5 h-3.5 text-gold-400" />, label: 'Smažák & bramborák' },
    { icon: <Users    className="w-3.5 h-3.5 text-gold-400" />, label: 'Expedice & trekaři' },
    { icon: <Star     className="w-3.5 h-3.5 text-gold-400" />, label: 'Domluvíš se česky' },
    { icon: <Clock    className="w-3.5 h-3.5 text-gold-400" />, label: 'Otevřeno každý den' },
    { icon: <Flame    className="w-3.5 h-3.5 text-gold-400" />, label: 'Živá atmosféra' },
];

const Pub = ({ scrollProgress }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeDot, setActiveDot]         = useState(0);
    const lenis      = useLenis();
    const trackRef   = useRef(null);
    const trackX     = useMotionValue(0);
    const isDragging = useRef(false);

    const mobX    = useMotionValue(0);
    const mobRef  = useRef(null);
    const mobCtrl = useRef(null);
    const mobRun  = useRef(null);

    const dskX    = useMotionValue(0);
    const dskRef  = useRef(null);
    const dskCtrl = useRef(null);
    const dskRun  = useRef(null);

    useScrollLock(!!selectedImage);

    const si = galleryImages.indexOf(selectedImage);
    const handleNext = (e) => { e.stopPropagation(); setSelectedImage(galleryImages[(si + 1) % galleryImages.length]); };
    const handlePrev = (e) => { e.stopPropagation(); setSelectedImage(galleryImages[(si - 1 + galleryImages.length) % galleryImages.length]); };

    // PHASE 6: Pub  0.45 → 0.56
    const containerOpacity = useTransform(scrollProgress, [0.41, 0.44, 0.53, 0.56], [0, 1, 1, 0]);
    const containerY       = useTransform(scrollProgress, [0.41, 0.44, 0.53, 0.56], ['-120%', '0%', '0%', '130%']);
    const bgY              = useTransform(scrollProgress, [0.41, 0.59], ['-15%', '15%']);
    const imageOpacity     = useTransform(scrollProgress, [0.41, 0.44], [0, 1]);

    // Mobile carousel: 0→1 within visible window (0.49–0.53)
    const carouselProg = useTransform(scrollProgress, [0.495, 0.525], [0, 1]);

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
                duration: dist > 0 ? 18 * (dist / halfW) : 18,
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
                duration: dist > 0 ? 18 * (dist / halfW) : 18,
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
                <motion.img style={{ y: bgY, opacity: imageOpacity }} src={PubBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-125 origin-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-amber-950/20 to-slate-900/70" />
            </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div style={{ opacity: containerOpacity, y: containerY, zIndex: 70 }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="w-full h-full flex items-center justify-center pointer-events-none">

                {/* ── MOBILE: scroll-driven translateX carousel ── */}
                <div className="flex md:hidden w-full overflow-hidden pointer-events-none" style={{ paddingLeft: '9vw' }}>
                    <motion.div
                        ref={trackRef}
                        className="flex gap-3"
                        style={{ x: trackX }}
                        drag="x"
                        dragConstraints={{ left: -(window.innerWidth * 0.82 + 12), right: 0 }}
                        dragElastic={0.08}
                        dragMomentum={false}
                        onDragStart={() => { isDragging.current = true; }}
                        onDragEnd={(_, info) => {
                            isDragging.current = false;
                            const cardW = window.innerWidth * 0.82 + 12;
                            const cur = trackX.get();
                            const totalH = document.documentElement.scrollHeight - window.innerHeight;
                            const fastLeft  = info.velocity.x < -200;
                            const fastRight = info.velocity.x > 200;
                            if ((cur < -cardW * 0.3 || fastLeft)  && activeDot === 0) {
                                lenis?.scrollTo(totalH * 0.525, { duration: 0.7 });
                            } else if ((cur > -cardW * 0.7 || fastRight) && activeDot === 1) {
                                lenis?.scrollTo(totalH * 0.495, { duration: 0.7 });
                            } else {
                                fmAnimate(trackX, activeDot === 1 ? -cardW : 0, { duration: 0.3, ease: [0.25, 1, 0.5, 1] });
                            }
                        }}
                    >

                        {/* Card 1 – Identity */}
                        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-slate-900/85 backdrop-blur-2xl border border-white/15 pointer-events-auto"
                             style={{ width: '82vw', height: '76vh' }}>
                            <div className="relative" style={{ flex: '0 0 58%' }}>
                                <img src={PubHero} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                                    <img src={PubLogoNeg} alt="" className="h-12 w-auto object-contain object-left -ml-1 mb-1.5 pointer-events-none" />
                                    <div className="flex items-center gap-1 text-gold-300 mb-1">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                        <span className="text-[9px] uppercase tracking-widest font-bold">Thamel, Káthmándú</span>
                                    </div>
                                    <h3 className="text-white font-serif text-lg leading-snug">Místo, kde se<br/>potkávají dobrodruzi</h3>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between p-4" style={{ flex: '0 0 42%' }}>
                                <p className="text-white/70 text-sm leading-relaxed">Středobod českého vesmíru v Nepálu. České pivo, smažák a příběhy z expedic u jednoho stolu.</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">Scroll pro detaily ↓</span>
                                    <div className="flex gap-1.5">
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 0 ? 'bg-gold-400' : 'bg-white/20'}`} />
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 1 ? 'bg-gold-400' : 'bg-white/20'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 – Features + Gallery + CTA */}
                        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-slate-900/85 backdrop-blur-2xl border border-white/15 p-4 pointer-events-auto"
                             style={{ width: '82vw', height: '76vh' }}>
                            <img src={PubLogoNeg} alt="" className="h-[48px] w-auto object-contain object-left -ml-1 -mt-1 mb-2 pointer-events-none" />
                            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-3">
                                {FEATURES.map(({ icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className="p-1.5 bg-white/10 border border-white/15 rounded-lg flex-shrink-0">{icon}</div>
                                        <span className="text-[11px] font-semibold text-white/80 leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-white/35 mb-1.5">Galerie</p>
                            <div className="relative flex-1 min-h-0 mb-2 overflow-hidden rounded-xl">
                                <motion.div
                                    ref={mobRef}
                                    className="flex gap-1.5 h-full cursor-grab active:cursor-grabbing select-none"
                                    style={{ x: mobX }}
                                    drag="x"
                                    dragConstraints={{ left: -9999, right: 9999 }}
                                    dragElastic={0}
                                    dragMomentum={false}
                                    onDragStart={() => mobCtrl.current?.stop()}
                                    onDragEnd={() => mobRun.current?.()}
                                >
                                    {[...galleryImages, ...galleryImages].map((src, i) => (
                                        <button key={i} onClick={() => setSelectedImage(galleryImages[i % galleryImages.length])}
                                            className="flex-shrink-0 h-full aspect-[3/4] rounded-xl overflow-hidden border border-white/20 active:scale-[0.97] transition-transform">
                                            <img src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <a href="https://maps.app.goo.gl/czechpubnepal" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 text-[11px] uppercase tracking-widest font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg">
                                    Navštívit na mapě <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <div className="flex justify-center gap-1.5 mt-1">
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 0 ? 'bg-gold-400' : 'bg-white/20'}`} />
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeDot === 1 ? 'bg-gold-400' : 'bg-white/20'}`} />
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
                    <motion.div className="max-w-5xl w-full bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl rounded-[2rem] overflow-hidden pointer-events-auto flex" whileHover={{ y: -3 }}>
                        {/* Left image */}
                        <div className="w-[42%] relative flex-shrink-0">
                            <img src={PubHero} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                                <div className="flex items-center gap-1.5 text-gold-300 mb-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Thamel, Káthmándú</span>
                                </div>
                                <h3 className="text-white font-serif text-3xl leading-tight">Czech Pub<br/>Nepal</h3>
                            </div>
                        </div>
                        {/* Right content – no overflow-y, no lenis-prevent → page scroll works freely */}
                        <div className="w-[58%] flex flex-col p-7">
                            <img src={PubLogoNeg} alt="" className="h-[150px] lg:h-[190px] w-auto object-contain object-left -mt-9 lg:-mt-12 -ml-5 -mb-7 lg:-mb-9 self-start pointer-events-none scale-125 origin-left" />
                            <h2 className="font-serif text-2xl lg:text-3xl text-white mt-4 mb-2 leading-snug">Místo, kde se<br/>potkávají dobrodruzi</h2>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-2">
                                Středobod českého vesmíru v Nepálu. Po návratu z treku nebo expedice tu sdílíš příběhy s lidmi, kteří mají hory pod kůží. Pivko v ruce, smažák na stole — přesně tak, jak to má být.
                            </p>
                            <p className="text-white/55 text-sm leading-relaxed mb-3">
                                České i nepálské pivo na čepu, poctivý bramborový salát a nejlepší smažený sýr v Káthmándú.
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {FEATURES.map(({ icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/80">
                                        <div className="p-1.5 bg-white/10 border border-white/15 rounded-lg shadow-sm flex-shrink-0">{icon}</div>
                                        <span className="text-xs md:text-sm font-semibold leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/35 mb-2">Galerie</p>
                            <div className="overflow-hidden rounded-xl mb-3">
                                <motion.div
                                    ref={dskRef}
                                    className="flex gap-2 cursor-grab active:cursor-grabbing select-none"
                                    style={{ x: dskX }}
                                    drag="x"
                                    dragConstraints={{ left: -9999, right: 9999 }}
                                    dragElastic={0}
                                    dragMomentum={false}
                                    onDragStart={() => dskCtrl.current?.stop()}
                                    onDragEnd={() => dskRun.current?.()}
                                >
                                    {[...galleryImages, ...galleryImages].map((src, i) => (
                                        <button key={i} onClick={() => setSelectedImage(galleryImages[i % galleryImages.length])} className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-white/20 hover:scale-105 transition-transform shadow-sm">
                                            <img src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="mt-auto">
                                <a href="https://maps.app.goo.gl/czechpubnepal" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg">
                                    Navštívit na mapě <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </motion.div>

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

export default Pub;
