import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { ShoppingBag, ExternalLink, X, ArrowRight, Mountain, ChevronLeft, ChevronRight } from 'lucide-react';
import { loadContent } from '../data/adminStore';
import { resolveImageSrc } from '../data/imageStore';
import IcefallBg from '../assets/icefall_bg.jpg';
import MedTubaImg from '../assets/zmensene/portrety/med___tuba_kopie.jpg';
import KalendarImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6564-edit.jpg';
import KnihaImg from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';
import TrickoImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6384-edit.jpg';
import FotoImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06330.jpg';

function ModalSlider({ images, fallback, className = '' }) {
    const all = images?.length ? images : (fallback ? [fallback] : []);
    const [idx, setIdx] = useState(0);
    if (!all.length) return null;
    const prev = () => setIdx(i => (i - 1 + all.length) % all.length);
    const next = () => setIdx(i => (i + 1) % all.length);
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img src={all[idx]} alt="" className="w-full h-full object-cover transition-opacity duration-300" />
            {all.length > 1 && <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors z-10">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors z-10">
                    <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {all.map((_, i) => (
                        <button key={i} onClick={() => setIdx(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`} />
                    ))}
                </div>
                <div className="absolute top-2 right-10 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded-full">
                    {idx + 1} / {all.length}
                </div>
            </>}
        </div>
    );
}

const PRODUCTS = [
    {
        id: 'med',
        name: 'Manukový med',
        subtitle: 'Certifikovaný UMF 10+',
        desc: 'Přírodní med z Nového Zélandu, který Honza vozí osobně. Síla přírody v každé lžíci.',
        tag: 'Bestseller',
        tagColor: 'bg-gold-500',
        img: MedTubaImg,
    },
    {
        id: 'tuba',
        name: 'Medová tuba',
        subtitle: 'Energie na cesty',
        desc: 'Kompaktní medová tuba ideální na trek, expedici nebo každodenní sport. Vždy po ruce.',
        tag: 'Novinka',
        tagColor: 'bg-emerald-600',
        img: MedTubaImg,
        highlight: true,
        highlightBg: 'bg-emerald-600',
        highlightDot: 'bg-emerald-300',
    },
    {
        id: 'kalendar',
        name: 'Kalendář 2026',
        subtitle: 'Himálaj každý měsíc',
        desc: '12 fotografií z expedic Honzy Trávy. Osm tisícovek, treky, lidé — příběhy, které nevidíte na Instagramu.',
        tag: 'Limitovaná edice',
        tagColor: 'bg-amber-700',
        img: KalendarImg,
        highlight: true,
        highlightBg: 'bg-amber-700',
        highlightDot: 'bg-amber-300',
    },
    {
        id: 'kniha',
        name: 'Knížka / Audioknížka',
        subtitle: 'Příběh jednoho dobrodružství',
        desc: 'Hory, nemoc, návrat. Kniha i audioverze v Honzově hlase — ideální na cestu tam a zpátky.',
        tag: 'Audio i tištěná',
        tagColor: 'bg-slate-600',
        img: KnihaImg,
    },
    {
        id: 'tricko',
        name: 'Tričko 14 Summits',
        subtitle: 'Organická bavlna',
        desc: 'Minimalistický design s logem expedice. Nosíš to, o čem mluvíš.',
        tag: 'Apparel',
        tagColor: 'bg-slate-800',
        img: TrickoImg,
    },
    {
        id: 'foto',
        name: 'Fotky na stěnu',
        subtitle: 'Tisk na plátno / papír',
        desc: 'Vyberte si z archivu Honzových fotografií z Himálaje. Každý kus je podepsaný.',
        tag: 'Fine art print',
        tagColor: 'bg-amber-700',
        img: FotoImg,
    },
];

const Eshop = ({ scrollProgress }) => {
    const adminProducts = loadContent('products', null);
    const products = adminProducts
        ? PRODUCTS.map(p => ({ ...p, ...(adminProducts.find(a => a.id === p.id) || {}) }))
              .concat(adminProducts.filter(a => !PRODUCTS.find(p => p.id === a.id)))
        : PRODUCTS;
    const [detailOpen, setDetailOpen] = useState(null);
    const [showAllProducts, setShowAllProducts] = useState(false);
    useScrollLock(!!detailOpen || showAllProducts);

    const eshopCarouselRef = useRef(null);
    const [carouselMax, setCarouselMax] = useState(0);

    useEffect(() => {
        const el = eshopCarouselRef.current;
        if (!el) return;
        const measure = () => setCarouselMax(el.scrollWidth - el.clientWidth);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const carouselX = useTransform(scrollProgress, [0.56, 0.62], [0, -carouselMax]);

    // PHASE 7 (Eshop): 0.53 -> 0.65
    const containerOpacity = useTransform(scrollProgress, [0.53, 0.56, 0.62, 0.65], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.53, 0.56, 0.62, 0.65], ['-120%', '0%', '0%', '130%']);
    const bgOpacity = useTransform(scrollProgress, [0.53, 0.56, 0.62, 0.65], [0, 1, 1, 0]);
    const bgY = useTransform(scrollProgress, [0.50, 0.68], ['-10%', '10%']);

    return (
        <>
        {/* BACKGROUND */}
        <motion.div
            style={{ opacity: bgOpacity, zIndex: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            {/* Warm ivory base */}
            <div className="absolute inset-0 bg-[#F5F0EA]" />

            {/* Icefall rock parallax photo */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-full scale-110 origin-center">
                <img src={IcefallBg} alt="" className="w-full h-full object-cover object-center"
                    style={{ opacity: 0.18, filter: 'sepia(0.4) contrast(1.15) brightness(0.95)' }} />
            </motion.div>

            {/* Left-to-right ivory curtain — keeps content readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EA] via-[#F5F0EA]/93 to-[#F5F0EA]/55" />

            {/* Top radial warm light source */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_10%,rgba(245,240,234,0.75)_0%,transparent_70%)]" />

            {/* Bottom atmospheric mist */}
            <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-[#F5F0EA]/85 to-transparent" />

            {/* Subtle warm gold vignette right edge */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_95%_50%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

            {/* Grain texture overlay */}
            <div className="absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'repeat', backgroundSize: '128px' }} />
        </motion.div>

        {/* CONTENT */}
        <motion.div
            style={{ opacity: containerOpacity, y: containerY, zIndex: 70 }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            {/* ── Mobile layout ── */}
            <div className="md:hidden w-full h-full flex flex-col justify-center px-4 pointer-events-auto gap-4">

                {/* Mobile header */}
                <div className="shrink-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-px h-3.5 bg-gold-500" />
                        <ShoppingBag className="w-3 h-3 text-gold-500" />
                        <span className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold">E-shop</span>
                    </div>
                    <h2 className="font-serif text-2xl text-slate-900 leading-tight">
                        Kus cesty <span className="italic text-amber-800/70">domov.</span>
                    </h2>
                    <p className="font-sans text-slate-500 text-sm leading-relaxed mt-1">
                        Produkty, které Honza osobně používá a doporučuje.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="h-px w-8 bg-gold-400" />
                        <div className="h-px w-2 bg-gold-400/40" />
                    </div>
                </div>

                {/* Horizontal carousel — driven by page scroll via translateX, no overflow-x scroll */}
                <div className="shrink-0 -mx-4 overflow-hidden">
                    <div ref={eshopCarouselRef} className="pl-4 pb-2">
                    <motion.div className="flex gap-3" style={{ x: carouselX }}>

                        {/* Featured hero card — Manukový med */}
                        <button
                            onClick={() => setDetailOpen(products[0])}
                            className="group shrink-0 snap-start w-[75vw] text-left rounded-xl overflow-hidden shadow-lg active:scale-95 transition-all duration-300 relative bg-slate-900 aspect-[3/4]"
                        >
                            <div className="absolute inset-0">
                                <img src={resolveImageSrc(products[0]) || products[0].img} alt={products[0].name} className="w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-80" />
                            <div className="relative z-10 flex flex-col h-full p-4 justify-end">
                                <span className={`text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full ${products[0].tagColor} inline-block mb-2 self-start`}>
                                    {products[0].tag}
                                </span>
                                <h3 className="font-serif text-xl text-white leading-tight mb-0.5 drop-shadow-md">{products[0].name}</h3>
                                <p className="font-sans text-[10px] text-gold-400 uppercase tracking-wider font-bold mb-2">{products[0].subtitle}</p>
                                <p className="font-sans text-xs text-white/65 leading-relaxed line-clamp-2 mb-3">{products[0].desc}</p>
                                <div className="flex items-center gap-1.5 text-white/50 group-hover:text-gold-400 transition-colors text-[10px] font-bold uppercase tracking-widest">
                                    Zobrazit detail <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>

                        {/* Remaining products — premium light */}
                        {products.slice(1).map((product, idx) => (
                            <button
                                key={product.id}
                                onClick={() => setDetailOpen(product)}
                                className="group shrink-0 snap-start w-[75vw] text-left rounded-xl overflow-hidden bg-white border border-slate-100 active:scale-95 transition-all duration-300 shadow-sm"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <img src={resolveImageSrc(product) || product.img} alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                    {!product.highlight && (
                                        <span className={`absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full ${product.tagColor} shadow-sm`}>
                                            {product.tag}
                                        </span>
                                    )}
                                    <span className="absolute top-2.5 right-2.5 font-mono text-[10px] text-white/35 font-black">0{idx + 2}</span>
                                </div>
                                {product.highlight && (
                                    <div className={`flex items-center gap-2 px-3 py-1.5 ${product.highlightBg}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${product.highlightDot} animate-pulse shrink-0`} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">{product.tag}</span>
                                    </div>
                                )}
                                <div className="p-3 relative">
                                    <div className="absolute bottom-0 inset-x-3 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
                                    <h3 className="font-serif text-sm text-slate-900 leading-tight">{product.name}</h3>
                                    <p className="font-mono text-[9px] text-gold-600 uppercase tracking-widest font-bold mt-0.5">{product.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                    </div>
                </div>

                {/* Mobile CTA */}
                <div className="flex gap-2 justify-center shrink-0">
                    <button
                        onClick={() => setShowAllProducts(true)}
                        className="inline-flex items-center gap-2 px-5 py-3.5 border border-slate-300 bg-white hover:border-gold-400 text-slate-900 font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-300 shadow-sm"
                    >
                        Zobrazit více
                    </button>
                    <a
                        href="https://honzatrava.myshoptet.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-300 shadow-lg"
                    >
                        <span>E-shop</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>

            {/* ── Desktop layout ── */}
            <div className="hidden md:flex w-full h-full items-center justify-center px-8 lg:px-16 xl:px-20 pointer-events-auto">
                <div className="w-full max-w-6xl">

                    {/* Header */}
                    <div className="mb-5 lg:mb-7 relative">
                        <span className="absolute -top-6 right-0 font-mono text-[90px] lg:text-[120px] font-black text-slate-900/[0.04] leading-none select-none pointer-events-none tracking-tighter">
                            8848
                        </span>
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-px h-4 bg-gold-500" />
                            <ShoppingBag className="w-3.5 h-3.5 text-gold-500" />
                            <span className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[11px] font-bold">E-shop</span>
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 leading-tight mb-2">
                            Kus cesty <span className="italic text-amber-800/70">domov.</span>
                        </h2>
                        <p className="font-sans text-slate-500 text-sm leading-relaxed max-w-md">
                            Produkty, které Honza osobně používá, vozí nebo doporučuje.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="h-px w-10 bg-gold-400" />
                            <div className="h-px w-3 bg-gold-400/50" />
                            <div className="h-px w-1.5 bg-gold-400/25" />
                        </div>
                    </div>

                    {/* Featured + grid layout */}
                    <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 lg:gap-4 mb-5">
                        {/* Featured product — dark hero card */}
                        <button
                            onClick={() => setDetailOpen(products[0])}
                            className="group relative text-left rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 row-span-2 bg-slate-900"
                            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.12)' }}
                        >
                            <div className="absolute inset-0">
                                <img src={resolveImageSrc(products[0]) || products[0].img} alt={products[0].name}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-slate-800/10" />
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
                            <div className="relative z-10 flex flex-col h-full p-5 lg:p-6 justify-end">
                                <span className={`text-[9px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${products[0].tagColor} inline-block mb-3 self-start shadow-sm`}>
                                    {products[0].tag}
                                </span>
                                <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight mb-1.5 drop-shadow-md">
                                    {products[0].name}
                                </h3>
                                <p className="font-sans text-[11px] text-gold-400 uppercase tracking-widest font-bold mb-3">
                                    {products[0].subtitle}
                                </p>
                                <p className="font-sans text-sm text-white/65 leading-relaxed line-clamp-2 mb-5">
                                    {products[0].desc}
                                </p>
                                <div className="flex items-center gap-2 bg-white/10 group-hover:bg-gold-500/20 border border-white/15 group-hover:border-gold-400/40 rounded-lg px-3 py-2 transition-all duration-300 self-start">
                                    <span className="text-white/70 group-hover:text-gold-300 text-[10px] font-bold uppercase tracking-widest transition-colors">Detail</span>
                                    <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </button>

                        {/* 4 products — premium light cards */}
                        {products.slice(1, 5).map((product, idx) => (
                            <button
                                key={product.id}
                                onClick={() => setDetailOpen(product)}
                                className="group text-left rounded-2xl overflow-hidden bg-white border border-slate-100 hover:border-gold-200 hover:-translate-y-1 transition-all duration-300"
                                style={{ boxShadow: product.highlight ? '0 4px 20px rgba(0,0,0,0.10)' : '0 2px 12px rgba(0,0,0,0.06)' }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(212,175,55,0.08)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = product.highlight ? '0 4px 20px rgba(0,0,0,0.10)' : '0 2px 12px rgba(0,0,0,0.06)'}
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-video overflow-hidden">
                                    <img src={resolveImageSrc(product) || product.img} alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                    {/* Non-highlighted: small pill on image */}
                                    {!product.highlight && (
                                        <span className={`absolute top-2.5 left-2.5 text-[8px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full ${product.tagColor} shadow-sm`}>
                                            {product.tag}
                                        </span>
                                    )}
                                    <span className="absolute top-2.5 right-2.5 font-mono text-[10px] text-white/35 font-black tracking-wider select-none">
                                        0{idx + 2}
                                    </span>
                                </div>

                                {/* Highlight banner — colored strip between image and text */}
                                {product.highlight && (
                                    <div className={`flex items-center gap-2 px-3 py-1.5 ${product.highlightBg}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${product.highlightDot} animate-pulse shrink-0`} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                                            {product.tag}
                                        </span>
                                    </div>
                                )}

                                {/* Text */}
                                <div className="relative p-3 lg:p-3.5">
                                    <div className="absolute bottom-0 inset-x-3 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                                    <div className="flex items-start justify-between gap-1.5 mb-0.5">
                                        <h3 className="font-serif text-sm lg:text-[15px] text-slate-900 leading-tight group-hover:text-amber-900 transition-colors duration-300">
                                            {product.name}
                                        </h3>
                                        <ArrowRight className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                                    </div>
                                    <p className="font-mono text-[9px] text-gold-600 uppercase tracking-widest font-bold">
                                        {product.subtitle}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Bottom CTA row */}
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => setShowAllProducts(true)}
                            className="inline-flex items-center gap-2 px-5 py-3 border border-slate-300/80 bg-white/80 backdrop-blur-sm hover:border-gold-400 hover:bg-white text-slate-700 font-bold uppercase tracking-[0.2em] text-[11px] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Všechny produkty ({products.length})
                        </button>
                        <a
                            href="https://honzatrava.myshoptet.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.2em] text-[11px] rounded-xl transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-gold-500/20"
                        >
                            <span>Vstoupit do e-shopu</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Product detail modal */}
        <AnimatePresence>
            {detailOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/80 backdrop-blur-md"
                    onClick={() => setDetailOpen(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative"
                    >
                        <button
                            onClick={() => setDetailOpen(null)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <ModalSlider
                            images={detailOpen.images}
                            fallback={resolveImageSrc(detailOpen) || detailOpen.img}
                            className="w-full aspect-video"
                        />

                        <div className="p-6 md:p-8">
                            <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-full ${detailOpen.tagColor} mb-3 inline-block`}>
                                {detailOpen.tag}
                            </span>
                            <h2 className="font-serif text-3xl text-slate-900 mb-1">{detailOpen.name}</h2>
                            <p className="font-sans text-xs text-gold-600 uppercase tracking-widest font-bold mb-4">{detailOpen.subtitle}</p>
                            <p className="font-sans text-slate-700 leading-relaxed mb-6">{detailOpen.desc}</p>
                            <a
                                href="https://honzatrava.myshoptet.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-300"
                            >
                                Koupit v e-shopu <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* All products modal */}
        <AnimatePresence>
            {showAllProducts && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/80 backdrop-blur-md"
                    onClick={() => setShowAllProducts(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-200 shrink-0">
                            <div>
                                <h3 className="font-serif text-2xl text-slate-900">Všechny produkty</h3>
                                <p className="font-sans text-slate-400 text-xs mt-0.5 uppercase tracking-widest">{products.length} položek</p>
                            </div>
                            <button
                                onClick={() => setShowAllProducts(false)}
                                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Products grid */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-7 overscroll-contain" data-lenis-prevent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => { setShowAllProducts(false); setDetailOpen(product); }}
                                        className="group text-left rounded-2xl border border-slate-200 bg-white hover:border-gold-400/60 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                                    >
                                        <div className="w-full aspect-[4/3] overflow-hidden">
                                            <img
                                                src={resolveImageSrc(product) || product.img}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <span className={`text-[9px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full ${product.tagColor} inline-block mb-1`}>
                                                {product.tag}
                                            </span>
                                            <h3 className="font-serif text-sm text-slate-900 leading-tight group-hover:text-gold-600 transition-colors">{product.name}</h3>
                                            <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-medium mt-0.5">{product.subtitle}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 md:px-8 py-4 border-t border-slate-200 shrink-0 flex items-center justify-between">
                            <p className="font-sans text-slate-400 text-xs">Nebo navštivte celý e-shop</p>
                            <a
                                href="https://honzatrava.myshoptet.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-300"
                            >
                                Vstoupit do e-shopu <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Eshop;
