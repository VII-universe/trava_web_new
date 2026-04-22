import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { ShoppingBag, ExternalLink, X, ArrowRight } from 'lucide-react';
import MedTubaImg from '../assets/zmensene/portrety/med___tuba_kopie.jpg';
import HonzaProfile from '../assets/honza_profile.png';
import KalendarImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6564-edit.jpg';
import KnihaImg from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';
import TrickoImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6384-edit.jpg';
import FotoImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06330.jpg';

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
    },
    {
        id: 'kalendar',
        name: 'Kalendář 2026',
        subtitle: 'Himálaj každý měsíc',
        desc: '12 fotografií z expedic Honzy Trávy. Osm tisícovek, treky, lidé — příběhy, které nevidíte na Instagramu.',
        tag: 'Limitovaná edice',
        tagColor: 'bg-slate-700',
        img: KalendarImg,
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
    const [detailOpen, setDetailOpen] = useState(null);
    const [showAllProducts, setShowAllProducts] = useState(false);
    useScrollLock(!!detailOpen || showAllProducts);

    const eshopCarouselRef = useRef(null);
    const eshopCarouselProgress = useTransform(scrollProgress, [0.56, 0.59], [0, 1]);
    useEffect(() => {
        return eshopCarouselProgress.on("change", (latest) => {
            const el = eshopCarouselRef.current;
            if (!el) return;
            const maxScroll = el.scrollWidth - el.clientWidth;
            el.scrollLeft = Math.max(0, Math.min(1, latest) * maxScroll);
        });
    }, [eshopCarouselProgress]);

    // PHASE 7 (Eshop): 0.54 -> 0.65
    const containerOpacity = useTransform(scrollProgress, [0.53, 0.56, 0.59, 0.62], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.53, 0.56, 0.59, 0.62], ['-120%', '0%', '0%', '130%']);
    const bgY = useTransform(scrollProgress, [0.50, 0.68], ['-10%', '10%']);

    return (
        <>
        {/* BACKGROUND */}
        <motion.div
            style={{ opacity: containerOpacity, y: containerY, zIndex: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            <div className="absolute inset-0 bg-ivory" />
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 w-full h-full scale-110 origin-center opacity-15"
            >
                <img
                    src={HonzaProfile}
                    alt=""
                    className="w-full h-full object-cover object-right-bottom filter grayscale"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/95 to-ivory/50" />
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
                    <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag className="w-3.5 h-3.5 text-gold-500" />
                        <span className="text-gold-600 font-sans uppercase tracking-[0.25em] text-xs font-bold">E-shop</span>
                    </div>
                    <h2 className="font-serif text-2xl text-slate-900 leading-tight">
                        Kus cesty <span className="italic text-slate-500">domov.</span>
                    </h2>
                    <p className="font-sans text-slate-600 text-sm leading-relaxed mt-1">
                        Produkty, které Honza osobně používá a doporučuje.
                    </p>
                </div>

                {/* Horizontal scroll strip — no overflow-y, no scroll trap */}
                <div className="shrink-0 -mx-4 px-4">
                    <div ref={eshopCarouselRef} className="flex gap-3 overflow-x-auto pb-2"
                         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                        {/* Featured hero card — Manukový med */}
                        <button
                            onClick={() => setDetailOpen(PRODUCTS[0])}
                            className="group shrink-0 snap-start w-[75vw] text-left rounded-xl overflow-hidden shadow-lg active:scale-95 transition-all duration-300 relative bg-slate-900 aspect-[3/4]"
                        >
                            <div className="absolute inset-0">
                                <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} className="w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-80" />
                            <div className="relative z-10 flex flex-col h-full p-4 justify-end">
                                <span className={`text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full ${PRODUCTS[0].tagColor} inline-block mb-2 self-start`}>
                                    {PRODUCTS[0].tag}
                                </span>
                                <h3 className="font-serif text-xl text-white leading-tight mb-0.5 drop-shadow-md">{PRODUCTS[0].name}</h3>
                                <p className="font-sans text-[10px] text-gold-400 uppercase tracking-wider font-bold mb-2">{PRODUCTS[0].subtitle}</p>
                                <p className="font-sans text-xs text-white/65 leading-relaxed line-clamp-2 mb-3">{PRODUCTS[0].desc}</p>
                                <div className="flex items-center gap-1.5 text-white/50 group-hover:text-gold-400 transition-colors text-[10px] font-bold uppercase tracking-widest">
                                    Zobrazit detail <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>

                        {/* Remaining products — white cards */}
                        {PRODUCTS.slice(1).map((product) => (
                            <button
                                key={product.id}
                                onClick={() => setDetailOpen(product)}
                                className="shrink-0 snap-start w-[75vw] text-left rounded-xl border border-slate-200 bg-white/80 hover:border-gold-400/60 transition-all duration-300 overflow-hidden shadow-sm active:scale-95"
                            >
                                <div className="w-full aspect-[4/3] overflow-hidden">
                                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-2.5">
                                    <span className={`text-[9px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full ${product.tagColor} inline-block mb-1`}>
                                        {product.tag}
                                    </span>
                                    <h3 className="font-serif text-sm text-slate-900 leading-tight">{product.name}</h3>
                                    <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-medium mt-0.5 leading-tight">{product.subtitle}</p>
                                </div>
                            </button>
                        ))}
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
                    <div className="mb-5 lg:mb-7">
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingBag className="w-4 h-4 text-gold-500" />
                            <span className="text-gold-600 font-sans uppercase tracking-[0.25em] text-xs font-bold">E-shop</span>
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 leading-tight mb-2">
                            Kus cesty <span className="italic text-slate-500">domov.</span>
                        </h2>
                        <p className="font-sans text-slate-600 text-base leading-relaxed max-w-xl">
                            Produkty, které Honza osobně používá, vozí nebo doporučuje.
                        </p>
                    </div>

                    {/* Featured + grid layout */}
                    <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 lg:gap-4 mb-5">
                        {/* Featured product — dark hero card */}
                        <button
                            onClick={() => setDetailOpen(PRODUCTS[0])}
                            className="group relative text-left rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 row-span-2 bg-slate-900"
                        >
                            {/* Full-bleed image */}
                            <div className="absolute inset-0">
                                <img
                                    src={PRODUCTS[0].img}
                                    alt={PRODUCTS[0].name}
                                    className="w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                                />
                            </div>
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                            {/* Gold top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-80" />
                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full p-5 lg:p-6 justify-end">
                                <span className={`text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full ${PRODUCTS[0].tagColor} inline-block mb-3 self-start`}>
                                    {PRODUCTS[0].tag}
                                </span>
                                <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight mb-1 drop-shadow-md">
                                    {PRODUCTS[0].name}
                                </h3>
                                <p className="font-sans text-xs text-gold-400 uppercase tracking-wider font-bold mb-3">
                                    {PRODUCTS[0].subtitle}
                                </p>
                                <p className="font-sans text-sm text-white/70 leading-relaxed line-clamp-2 mb-4">
                                    {PRODUCTS[0].desc}
                                </p>
                                <div className="flex items-center gap-2 text-white/60 group-hover:text-gold-400 transition-colors text-[10px] font-bold uppercase tracking-widest">
                                    Zobrazit detail <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>

                        {/* 4 products in 2-column right grid */}
                        {PRODUCTS.slice(1, 5).map((product) => (
                            <button
                                key={product.id}
                                onClick={() => setDetailOpen(product)}
                                className="group text-left rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm hover:border-gold-400/60 hover:bg-white/90 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                            >
                                <div className="w-full aspect-[16/9] overflow-hidden">
                                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-3 lg:p-4">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-serif text-base lg:text-lg text-slate-900 leading-tight">{product.name}</h3>
                                        <span className={`shrink-0 text-[8px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full ${product.tagColor}`}>
                                            {product.tag}
                                        </span>
                                    </div>
                                    <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-medium">{product.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Bottom CTA row */}
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => setShowAllProducts(true)}
                            className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-300 bg-white hover:border-gold-400 text-slate-800 font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Zobrazit více produktů
                        </button>
                        <a
                            href="https://honzatrava.myshoptet.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span>Vstoupit do e-shopu</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
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

                        <div className="w-full aspect-video overflow-hidden">
                            <img src={detailOpen.img} alt={detailOpen.name} className="w-full h-full object-cover" />
                        </div>

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
                                <p className="font-sans text-slate-400 text-xs mt-0.5 uppercase tracking-widest">{PRODUCTS.length} položek</p>
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
                                {PRODUCTS.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => { setShowAllProducts(false); setDetailOpen(product); }}
                                        className="group text-left rounded-2xl border border-slate-200 bg-white hover:border-gold-400/60 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                                    >
                                        <div className="w-full aspect-[4/3] overflow-hidden">
                                            <img
                                                src={product.img}
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
