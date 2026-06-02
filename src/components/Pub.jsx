import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, useTransform, AnimatePresence, useMotionValue, animate as fmAnimate } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { MapPin, X, ExternalLink, Beer, Utensils, Users, ChevronLeft, ChevronRight, Star, Clock, Flame, Images, ZoomIn, ArrowRight } from 'lucide-react';
import { loadContent } from '../data/adminStore';

import PubBg      from '../assets/zmensene/kathmandu/_mg_0642.jpg';
import PubHero    from '../assets/zmensene/pub/prostory/czech-pub-highlander-044-hires.jpg';
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
    { icon: <Beer     className="w-3.5 h-3.5 text-gold-400" />, label: 'Místní pivo na čepu' },
    { icon: <Utensils className="w-3.5 h-3.5 text-gold-400" />, label: 'Smažák & bramborák' },
    { icon: <Utensils className="w-3.5 h-3.5 text-gold-400" />, label: 'Nepálské jídlo' },
    { icon: <Users    className="w-3.5 h-3.5 text-gold-400" />, label: 'Trekaři & horolezci' },
    { icon: <Star     className="w-3.5 h-3.5 text-gold-400" />, label: 'Domluvíš se česky' },
    { icon: <Flame    className="w-3.5 h-3.5 text-gold-400" />, label: 'Živá atmosféra' },
];

const DEF_PUB_TEXTS = {
    heading: 'setkávání a dlouhých večerů',
    p1: 'Czech Pub Nepal není jen česká hospoda v Káthmándú. Je to místo, kde se po trecích a expedicích potkávají cestovatelé, horolezci, místní přátelé i lidé, kteří mají Nepál podobně pod kůží jako my.',
    p2: 'Dobré pivo, nejlepší smažák v Nepálu, nepálské jídlo — a příběhy, které si sem lidé přinášejí z hor.',
    p3: 'Někdo přijde na jedno pivo. Někdo tu zůstane celý večer. A někdo se sem vrací každý rok.',
    websiteUrl: 'https://czechpubnepal.com/',
};

const Pub = ({ scrollProgress }) => {
    const siteData = loadContent('site_texts', {});
    const pubT = { ...DEF_PUB_TEXTS, ...(siteData.pub || {}) };
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeDot, setActiveDot]         = useState(0);
    const [galleryOpen, setGalleryOpen]     = useState(false);
    const [detailOpen, setDetailOpen]       = useState(false);
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

    useScrollLock(!!selectedImage || galleryOpen || detailOpen);

    const si = galleryImages.indexOf(selectedImage);
    const handleNext = (e) => { e.stopPropagation(); setSelectedImage(galleryImages[(si + 1) % galleryImages.length]); };
    const handlePrev = (e) => { e.stopPropagation(); setSelectedImage(galleryImages[(si - 1 + galleryImages.length) % galleryImages.length]); };

    // PHASE 6: Pub  0.45 → 0.56
    const containerOpacity = useTransform(scrollProgress, [0.41, 0.44, 0.53, 0.56], [0, 1, 1, 0]);
    const containerY       = useTransform(scrollProgress, [0.41, 0.44, 0.53, 0.56], ['-120%', '0%', '0%', '130%']);
    const bgOpacity        = useTransform(scrollProgress, [0.41, 0.44, 0.53, 0.56], [0, 1, 1, 0]);
    const bgY              = useTransform(scrollProgress, [0.41, 0.59], ['-8%', '8%']);
    const bgScale          = useTransform(scrollProgress, [0.41, 0.56], [1.25, 1.40]);

    // Mobile carousel: 0→1 well before clouds at 0.515
    const carouselProg = useTransform(scrollProgress, [0.455, 0.488], [0, 1]);

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
        {/* BACKGROUND – fades in/out in place, no slide */}
        <motion.div style={{ opacity: bgOpacity, zIndex: 0 }} className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <motion.img style={{ y: bgY, scale: bgScale }} src={PubBg} alt="" className="absolute inset-0 w-full h-full object-cover origin-center" />
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
                                lenis?.scrollTo(totalH * 0.488, { duration: 0.6 });
                            } else if ((cur > -cardW * 0.65 || fastRight) && activeDot === 1) {
                                lenis?.scrollTo(totalH * 0.455, { duration: 0.6 });
                            } else {
                                fmAnimate(trackX, activeDot === 1 ? -cardW : 0, { duration: 0.35, ease: [0.25, 1, 0.5, 1] });
                            }
                        }}
                    >

                        {/* Card 1 – Identity */}
                        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-slate-900/85 backdrop-blur-2xl border border-white/15 pointer-events-auto"
                             style={{ width: '82vw', height: '76vh' }}>
                            <div className="relative" style={{ flex: '0 0 58%' }}>
                                <img loading="lazy" src={PubHero} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                                    <img loading="lazy" src={PubLogoNeg} alt="" className="h-40 w-auto object-contain object-left -ml-2 mb-1 pointer-events-none" />
                                    <div className="inline-flex items-center gap-1 text-gold-400 mb-1 bg-slate-900/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
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
                            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-3">
                                {FEATURES.map(({ icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className="p-1.5 bg-white/10 border border-white/15 rounded-lg flex-shrink-0">{icon}</div>
                                        <span className="text-[11px] font-semibold text-white/80 leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-white/35 mb-1.5">Galerie</p>
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
                                            className="relative flex-shrink-0 h-full aspect-[3/4] rounded-xl overflow-hidden border border-white/20 active:scale-[0.97] md:hover:scale-[2.5] hover:z-10 transition-all duration-300">
                                            <img loading="lazy" src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => setDetailOpen(true)}
                                    className="flex items-center justify-center gap-2 bg-gold-500 text-slate-900 text-[11px] uppercase tracking-widest font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg active:scale-95">
                                    O pubu více <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => setGalleryOpen(true)}
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-xl transition-all">
                                        <Images className="w-3 h-3 text-gold-400" /> Galerie
                                    </button>
                                    <a href={pubT.websiteUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-xl transition-all">
                                        Web
                                    </a>
                                </div>
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
                    <motion.div className="max-w-5xl w-full bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl rounded-[2rem] pointer-events-auto flex" whileHover={{ y: -3 }}>
                        {/* Left image */}
                        <div className="w-[42%] relative flex-shrink-0 overflow-hidden rounded-l-[2rem]">
                            <img loading="lazy" src={PubHero} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                                <div className="inline-flex items-center gap-1.5 text-gold-400 mb-2 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Thamel, Káthmándú</span>
                                </div>
                                <h3 className="text-white font-serif text-3xl leading-tight">Czech Pub<br/>Nepal</h3>
                            </div>
                        </div>
                        {/* Right content */}
                        <div className="w-[58%] flex flex-col p-7">
                            <img loading="lazy" src={PubLogoNeg} alt="" className="h-[90px] lg:h-[110px] w-auto object-contain object-left -mt-4 lg:-mt-5 -ml-3 -mb-2 self-start pointer-events-none" />
                            <h2 className="font-serif text-2xl lg:text-3xl text-white mt-4 mb-2 leading-snug">Místo návratů,<br/><span className="italic text-slate-400">{pubT.heading}</span></h2>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-2">{pubT.p1}</p>
                            <p className="text-white/55 text-sm leading-relaxed mb-3">{pubT.p2}</p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {FEATURES.map(({ icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/80">
                                        <div className="p-1.5 bg-white/10 border border-white/15 rounded-lg shadow-sm flex-shrink-0">{icon}</div>
                                        <span className="text-xs md:text-sm font-semibold leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/35 mb-2">Galerie</p>
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
                                        <button key={i} onClick={() => setSelectedImage(galleryImages[i % galleryImages.length])} className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-white/20 shadow-sm md:hover:scale-[2.5] hover:z-10 transition-all duration-300">
                                            <img loading="lazy" src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="mt-auto flex flex-col gap-2">
                                <button onClick={() => setDetailOpen(true)}
                                    className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg">
                                    O pubu více <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => setGalleryOpen(true)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-xl transition-all">
                                        <Images className="w-3.5 h-3.5 text-gold-400" /> Galerie
                                    </button>
                                    <a href={pubT.websiteUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-xl transition-all">
                                        Web <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </motion.div>

        {/* ── PUB DETAIL MODAL ── */}
        <AnimatePresence>
            {detailOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[108] flex items-center justify-center p-0 md:p-6 lg:p-10 bg-slate-950/88 backdrop-blur-md pointer-events-auto"
                    onClick={() => setDetailOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.96, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.96, y: 16, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#111827] w-full max-w-5xl max-h-[96vh] rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10"
                    >
                        {/* Levá strana — fotky */}
                        <div className="md:w-[46%] shrink-0 flex flex-col gap-0.5 bg-slate-950 min-h-[40vh] md:min-h-0">
                            <div className="relative flex-1 min-h-[200px]">
                                <img src={PubHero} alt="Czech Pub Nepal" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 text-gold-400 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        <MapPin className="w-3 h-3" /> Thamel, Káthmándú
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-0.5 shrink-0" style={{ height: 120 }}>
                                {[P1, P2, P3, P4, P5, P6].slice(0,6).map((src, i) => (
                                    <button key={i} onClick={() => { setDetailOpen(false); setSelectedImage(src); }}
                                        className="relative overflow-hidden group">
                                        <img loading="lazy" src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                                            <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pravá strana — obsah */}
                        <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain" data-lenis-prevent>
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 shrink-0 border-b border-white/10">
                                <img src={PubLogoNeg} alt="Czech Pub Nepal" className="h-10 w-auto object-contain" />
                                <button onClick={() => setDetailOpen(false)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Text */}
                            <div className="px-6 md:px-8 py-6 space-y-4 flex-1">
                                <div>
                                    <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.4em] font-bold mb-2">Czech Pub Nepal</p>
                                    <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight mb-4">
                                        Místo návratů, <span className="italic text-slate-400">{pubT.heading}</span>
                                    </h2>
                                </div>

                                <p className="font-sans text-white/85 text-sm md:text-base leading-relaxed font-medium">{pubT.p1}</p>
                                <p className="font-sans text-white/70 text-sm leading-relaxed">{pubT.p2}</p>

                                {/* Citace */}
                                <div className="border-l-2 border-gold-400/60 pl-4 space-y-1 py-1">
                                    {pubT.p3.split('. ').filter(Boolean).map((s, i) => (
                                        <p key={i} className="font-serif text-white/80 italic text-sm">{s}{s.endsWith('.') ? '' : '.'}</p>
                                    ))}
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    {FEATURES.map(({ icon, label }, i) => (
                                        <div key={i} className="flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-2.5">
                                            <div className="p-1.5 bg-white/10 rounded-lg shrink-0">{icon}</div>
                                            <span className="text-xs font-semibold text-white/75 leading-tight">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="px-6 md:px-8 py-5 shrink-0 border-t border-white/10 flex flex-col gap-2.5">
                                <a href={pubT.websiteUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-lg">
                                    {pubT.websiteUrl?.replace('https://','').replace(/\/$/,'')} <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button onClick={() => { setDetailOpen(false); setGalleryOpen(true); }}
                                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all border border-white/15">
                                    <Images className="w-3.5 h-3.5 text-gold-400" /> Celá galerie ({galleryImages.length} fotek)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

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
                            <h3 className="text-white font-serif text-lg md:text-2xl leading-none">Czech Pub Nepal</h3>
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
                                    <img loading="lazy" src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" loading="lazy" />
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

export default Pub;
