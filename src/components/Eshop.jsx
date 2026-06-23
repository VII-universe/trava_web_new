import { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { loadContent } from '../data/adminStore';
import { ShoppingBag, ExternalLink, X, ArrowRight, BookOpen, Camera, Shirt, Gem, Heart } from 'lucide-react';
import IcefallBg   from '../assets/icefall_bg.jpg';
import KalendarImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6564-edit.jpg';
import KnihaImg    from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';
import TrickoImg   from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6384-edit.jpg';
import NaramekImg  from '../assets/zmensene/portrety/expedice_a_treky/dsc06330.jpg';
import MedImg      from '../assets/zmensene/portrety/med___tuba_kopie.jpg';

const CATEGORIES = [
    {
        id: 'kalendare',
        icon: <Camera className="w-4 h-4" />,
        name: 'Kalendáře & fotografie',
        subtitle: 'Autorská edice · každoročně',
        tag: 'Autorská edice',
        color: 'from-amber-900/90',
        accent: 'border-amber-400/60 text-amber-300',
        img: KalendarImg,
        desc: 'Autorské kalendáře a fotoobrazy z Nepálu, Himálaje i dalších cest. Fotky míst, ke kterým se sami rádi vracíme — od vysokých hor až po obyčejné momenty mezi nimi.',
        note: 'Kalendáře tradičně připravujeme v nepálském rytmu od dubna do dubna.',
        items: [
            { name: 'Autorský kalendář', detail: 'duben–duben, Himálaj' },
            { name: 'Fotoobrazy z Nepálu', detail: 'tisk na plátno / papír' },
            { name: 'Fine art tisky', detail: 'podepsané, limitované' },
        ],
    },
    {
        id: 'knihy',
        icon: <BookOpen className="w-4 h-4" />,
        name: 'Knihy',
        subtitle: 'Vybrané tituly, které čteme',
        tag: 'Doporučujeme',
        color: 'from-slate-900/95',
        accent: 'border-slate-300/60 text-slate-200',
        img: KnihaImg,
        desc: 'Knihy lidí, kterých si vážíme a jejichž příběhy jsou nám blízké.',
        note: null,
        items: [
            { name: 'Symboly', detail: 'Reinhold Messner' },
            { name: 'Něha Himálaje', detail: 'Petr Jan Juračka' },
            { name: 'Nejsou to šlapky', detail: 'Petr Jan Juračka' },
            { name: 'Laviny v Česku', detail: 'Alena Zárybnická a kolektiv' },
        ],
    },
    {
        id: 'tricka',
        icon: <Shirt className="w-4 h-4" />,
        name: 'Trička & oblečení',
        subtitle: 'Limitované kolekce z expedic',
        tag: 'Apparel',
        color: 'from-slate-950/95',
        accent: 'border-gold-400/60 text-gold-300',
        img: TrickoImg,
        desc: 'Limitované kolekce spojené s expedicemi, přednáškami i životem kolem hor.',
        note: null,
        items: [
            { name: '50 Tour trička', detail: 've spolupráci s PROGRESS' },
            { name: 'Nepálská kolekce', detail: 's buddhistickýma očima' },
            { name: 'Ama Dablam — funkční trička', detail: 'Crazy' },
            { name: 'Fuck Cancer tričko', detail: 'projekt & osvěta' },
        ],
    },
    {
        id: 'naramky',
        icon: <Gem className="w-4 h-4" />,
        name: 'Nepálské náramky',
        subtitle: 'Přímo od lidí z hor',
        tag: 'Handmade',
        color: 'from-teal-950/90',
        accent: 'border-teal-300/60 text-teal-200',
        img: NaramekImg,
        desc: 'Jednoduché náramky dovezené přímo od lidí z hor. Nehraje si to na luxusní suvenýr — spíš malý kus Nepálu, který pomáhá dál podporovat místní lidi a prostředí, kam se sami pořád vracíme.',
        note: null,
        items: [
            { name: 'Nepálské náramky', detail: 'od místních řemeslníků z hor' },
        ],
    },
    {
        id: 'sladke',
        icon: <Heart className="w-4 h-4" />,
        name: 'Něco sladkého na cesty',
        subtitle: 'Věci, které s námi jezdí do hor',
        tag: 'Partneři',
        color: 'from-amber-950/90',
        accent: 'border-amber-300/60 text-amber-200',
        img: MedImg,
        desc: 'Věci, které s námi jezdí do hor už dlouho — a které sami pravidelně používáme.',
        note: null,
        items: [
            { name: 'Manukový med More Than Honey', detail: 'UMF certifikovaný' },
        ],
    },
];

const PRODUCT_CATEGORY_MAP = {
    med: 'sladke', tuba: 'sladke',
    kalendar: 'kalendare', foto: 'kalendare',
    kniha: 'knihy',
    tricko: 'tricka',
    naramek: 'naramky',
};

const Eshop = ({ scrollProgress }) => {
    const [active, setActive] = useState(null);
    useScrollLock(!!active);

    const adminProducts = loadContent('products', null);
    const categoriesDisplay = adminProducts?.length
        ? CATEGORIES.map(cat => {
            const catProd = adminProducts.find(p => PRODUCT_CATEGORY_MAP[p.id] === cat.id);
            if (!catProd) return cat;
            const adminItems = adminProducts
                .filter(p => PRODUCT_CATEGORY_MAP[p.id] === cat.id)
                .map(p => ({ name: p.name, detail: p.subtitle || p.tag || '' }));
            return {
                ...cat,
                ...(catProd.desc ? { desc: catProd.desc } : {}),
                ...(adminItems.length ? { items: adminItems } : {}),
            };
        })
        : CATEGORIES;

    const containerOpacity = useTransform(scrollProgress, [0.53, 0.56, 0.62, 0.65], [0, 1, 1, 0]);
    const containerY      = useTransform(scrollProgress, [0.53, 0.56, 0.62, 0.65], ['-120%', '0%', '0%', '130%']);
    const bgOpacity       = useTransform(scrollProgress, [0.53, 0.56, 0.62, 0.65], [0, 1, 1, 0]);
    const bgY             = useTransform(scrollProgress, [0.50, 0.68], ['-10%', '10%']);

    return (
        <>
        {/* BACKGROUND */}
        <motion.div style={{ opacity: bgOpacity, zIndex: 0 }} className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#F5F0EA]" />
            <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
                <img src={IcefallBg} alt="" className="w-full h-full object-cover"
                    style={{ opacity: 0.14, filter: 'sepia(0.4) contrast(1.15) brightness(0.95)' }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EA] via-[#F5F0EA]/94 to-[#F5F0EA]/55" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_15%_10%,rgba(245,240,234,0.7)_0%,transparent_70%)]" />
        </motion.div>

        {/* CONTENT */}
        <motion.div style={{ opacity: containerOpacity, y: containerY, zIndex: 70 }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">

            {/* ── Mobile ── */}
            <div className="md:hidden w-full h-full flex flex-col justify-center px-4 pointer-events-auto gap-4">
                <div className="shrink-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-px h-3.5 bg-gold-500" />
                        <ShoppingBag className="w-3 h-3 text-gold-500" />
                        <span className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold">E-shop</span>
                    </div>
                    <h2 className="font-serif text-2xl text-slate-900 leading-tight">
                        Věci z cest, <span className="italic text-amber-800/70">které stojí za to.</span>
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1.5 max-w-xs">
                        Merch, knihy, fotografie, oblečení i produkty, které s námi cestují do hor.
                    </p>
                </div>

                {/* Category pills — mobile */}
                <div className="flex flex-col gap-2.5 shrink-0">
                    {categoriesDisplay.map(cat => (
                        <button key={cat.id} onClick={() => setActive(cat)}
                            className="group relative flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-3 text-left active:scale-[0.98] transition-all shadow-sm overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <img src={cat.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity scale-105" />
                            </div>
                            <div className="relative w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 text-gold-400">
                                {cat.icon}
                            </div>
                            <div className="relative flex-1 min-w-0">
                                <p className="font-serif text-sm text-slate-900 leading-tight truncate">{cat.name}</p>
                                <p className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mt-0.5">{cat.items.length} položek</p>
                            </div>
                            <ArrowRight className="relative w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors shrink-0" />
                        </button>
                    ))}
                </div>

                <a href="https://honzatrava.myshoptet.com" target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all shadow-lg">
                    Vstoupit do e-shopu <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[10px] text-slate-500 italic text-center leading-normal mt-1 max-w-xs mx-auto">
                    Spuštění plnohodnotného e-shopu plánujeme na podzim 2026. Do té doby je možné produkty (knihy, náramky, med) objednat přímo na e-mailu <a href="mailto:booking@honzatrava.cz" className="underline hover:text-gold-600">booking@honzatrava.cz</a>.
                </p>
            </div>

            {/* ── Desktop ── */}
            <div className="hidden md:flex w-full h-full items-center justify-center px-8 lg:px-14 xl:px-20 pointer-events-auto">
                <div className="w-full max-w-6xl grid grid-cols-[1fr_1.75fr] gap-10 lg:gap-16 items-center">

                    {/* Left: editorial intro */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-px h-4 bg-gold-500" />
                            <ShoppingBag className="w-3.5 h-3.5 text-gold-500" />
                            <span className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[11px] font-bold">07 — E-shop</span>
                        </div>

                        <h2 className="font-serif text-4xl lg:text-5xl xl:text-[3.2rem] text-slate-900 leading-[1.1] mb-5">
                            Věci z cest,<br/>
                            <span className="italic text-amber-800/65">které stojí za to.</span>
                        </h2>

                        <div className="space-y-3 mb-6">
                            <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed">
                                Najdete tu merch z přednášek a projektů, knihy, fotografie, oblečení i produkty, které s námi dlouhodobě cestují do hor a zpátky domů.
                            </p>
                            <p className="font-sans text-slate-500 text-sm leading-relaxed">
                                Některé vznikly z expedic, jiné z obyčejných večerů po návratu z Nepálu. Od limitovaných kolekcí a kalendářů až po věci, které sami používáme na cestách i v běžném životě.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="h-px w-8 bg-gold-400" />
                            <div className="h-px w-3 bg-gold-400/50" />
                            <div className="h-px w-1.5 bg-gold-400/25" />
                        </div>

                        <a href="https://honzatrava.myshoptet.com" target="_blank" rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-gold-500/20">
                            Vstoupit do e-shopu
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <p className="text-[11px] text-slate-500 italic leading-relaxed mt-4 max-w-sm">
                            Spuštění plnohodnotného e-shopu plánujeme na podzim 2026. Do té doby je možné produkty (knihy, náramky, med) objednat přímo na e-mailu <a href="mailto:booking@honzatrava.cz" className="underline hover:text-gold-600">booking@honzatrava.cz</a>.
                        </p>
                    </div>

                    {/* Right: 3 category cards stacked */}
                    <div className="flex flex-col gap-3">
                        {categoriesDisplay.map((cat, i) => (
                            <button key={cat.id} onClick={() => setActive(cat)}
                                className="group relative text-left rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-0.5"
                                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.10)', height: '86px' }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'}
                            >
                                {/* Background image */}
                                <div className="absolute inset-0">
                                    <img src={cat.img} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} via-slate-900/60 to-transparent`} />
                                </div>

                                {/* Index */}
                                <span className="absolute top-3 right-4 font-mono text-[11px] text-white/25 font-black">0{i + 1}</span>

                                {/* Content */}
                                <div className="relative h-full flex items-center px-5 gap-4">
                                    <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center ${cat.accent}`}>
                                        {cat.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-serif text-white text-[17px] lg:text-[19px] leading-tight mb-0.5">{cat.name}</p>
                                        <p className="font-sans text-white/50 text-[11px] uppercase tracking-widest font-medium">{cat.subtitle}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-1.5 text-white/40 group-hover:text-gold-400 transition-colors">
                                        <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Detail</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

        {/* ── Category detail modal ── */}
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 bg-slate-950/85 backdrop-blur-md pointer-events-auto"
                    onClick={() => setActive(null)}
                >
                    <motion.div
                        initial={{ scale: 0.96, y: 24, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.96, y: 16, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        className="bg-ivory w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10"
                    >
                        {/* Hero image */}
                        <div className="md:w-[44%] shrink-0 relative min-h-[200px]">
                            <img src={active.img} alt={active.name} className="absolute inset-0 w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${active.color} via-slate-900/50 to-transparent`} />
                            <div className="absolute bottom-5 left-5 right-5 md:right-0">
                                <div className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-2 ${active.accent}`}>
                                    {active.icon}
                                    {active.tag}
                                </div>
                                <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight">{active.name}</h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain" data-lenis-prevent>
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 shrink-0 border-b border-slate-100">
                                <p className="font-sans text-slate-400 text-[11px] uppercase tracking-widest font-bold">{active.subtitle}</p>
                                <button onClick={() => setActive(null)}
                                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="px-6 md:px-8 py-6 flex-1 space-y-5">
                                <p className="font-sans text-slate-800 text-sm md:text-base leading-relaxed font-medium">
                                    {active.desc}
                                </p>
                                {active.note && (
                                    <p className="font-sans text-slate-500 text-sm leading-relaxed italic border-l-2 border-gold-300 pl-4">
                                        {active.note}
                                    </p>
                                )}

                                {/* Items */}
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-400 mb-3">Co najdete</p>
                                    <ul className="space-y-2.5">
                                        {active.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 group/item">
                                                <div className="w-5 h-5 rounded-full bg-gold-500/12 border border-gold-400/25 flex items-center justify-center shrink-0 mt-0.5">
                                                    <ArrowRight className="w-2.5 h-2.5 text-gold-500" />
                                                </div>
                                                <div>
                                                    <span className="font-sans text-slate-800 text-sm font-semibold">{item.name}</span>
                                                    {item.detail && (
                                                        <span className="text-slate-400 text-xs ml-2">— {item.detail}</span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="px-6 md:px-8 py-5 shrink-0 border-t border-slate-100 bg-white/60">
                                <a href="https://honzatrava.myshoptet.com" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-lg">
                                    Koupit v e-shopu <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Eshop;
