import { useState, useMemo } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import {
    Play, Mic, FileText, X, PlayCircle,
    ExternalLink, Tv, Radio, Newspaper, Globe, Headphones, ArrowRight
} from 'lucide-react';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HonzaImg from '../assets/honza_profile.png';
import BaseCampImg from '../assets/base_camp_bg.jpg';
import SummitImg from '../assets/summit_bg.png';

const MEDIA_DATA = {
    video: [
        { id: 'v1', type: 'video', title: 'Vlog #04: Cesta do BC', date: 'Březen 2026', duration: '12:45', image: ClimbersImg, desc: 'Cesta do základního tábora je plná úskalí. Sledujte, jak jsme se prali s ledopádem a nástrahami aklimatizace.' },
        { id: 'v2', type: 'video', title: 'Vlog #03: Přípravy', date: 'Únor 2026', duration: '08:20', image: BaseCampImg, desc: 'Co všechno obnáší příprava na extrémní expedici? Balení, trénink a logistika.' },
        { id: 'v3', type: 'video', title: 'Vybavení do zóny smrti', date: 'Leden 2026', duration: '15:10', image: SummitImg, desc: 'Detailní pohled na vybavení, které nám pomáhá přežít v 8000 metrech výšky.' },
    ],
    podcast: [
        { id: 'p1', type: 'podcast', title: 'Podcast: Ep. 12 – K2', date: 'Duben 2026', duration: '45:00', image: HonzaImg, desc: 'Rozhovor o největších krizích na „Hoře hor" a jak je překonat.' },
        { id: 'p2', type: 'podcast', title: 'Podcast: Ep. 11 – Nanga Parbat', date: 'Březen 2026', duration: '38:15', image: ClimbersImg, desc: 'Příběh hory zabiják z pohledu naší poslední náročné expedice.' },
        { id: 'p3', type: 'podcast', title: 'Podcast: Ep. 10 – Tým', date: 'Únor 2026', duration: '52:30', image: BaseCampImg, desc: 'S důležitými členy týmu o tom, jak funguje chemie v extrémních výškách.' },
    ],
    blog: [
        {
            id: 'b1', type: 'blog', title: 'Deník z expedice', date: '12. května 2026', readTime: '5 min čtení', image: BaseCampImg,
            desc: 'Dnes jsme dorazili do 6000 metrů. Vítr sílí, ale morálka je mimořádně vysoká.',
            content: [
                "Je krátce po páté hodině ranní a vítr lomcuje našimi stany jako by se nás snažil shodit zpátky do údolí.",
                "Morálka v týmu je ale překvapivě vysoká. První dny aklimatizace jsou vždycky ty nejtěžší — hlava praská, každý krok stojí dvakrát tolik sil.",
                "Včera se nám podařilo vynést zásoby do C1. Dnes nás čeká den volna a příprava strategie pro zítřejší pokus o postup do 6500 metrů.",
                "Hory nás učí obrovské pokoře. Je to boj, ale kvůli těmhle momentům to děláme."
            ]
        },
        {
            id: 'b2', type: 'blog', title: 'Nepálská kultura', date: '5. dubna 2026', readTime: '8 min čtení', image: SummitImg,
            desc: 'Proč se neustále vracíme do Káthmándú a jak se tam žije.',
            content: [
                "Pro mnoho horolezců je Nepál jen přestupní stanicí. Pro mě je to druhý domov.",
                "Davy lidí, rikši, vonné tyčinky — čím dál se dostanete od Káthmándú, tím víc poznáte pravou podstatu země.",
                "Spolupráce se šerpy mě naučila nekonečnému klidu. Hory diktují samotný rytmus každodenního života."
            ]
        },
        {
            id: 'b3', type: 'blog', title: 'Strava v horách', date: '28. března 2026', readTime: '4 min čtení', image: HonzaImg,
            desc: 'Co jíme, když je voda zmrzlá a kyslíku bolestivě málo.',
            content: [
                "Jídlo v osmi tisících metrech není kulinářský zážitek — je to boj o přežití.",
                "Nad 7000 metry extrémní výška doslova vypne trávení a chuť k jídlu zmizí.",
                "Největší odměnou po týdnech na sušeném jídle je sestup dolů — ledově vychlazené pivo a pořádný kus masa."
            ]
        },
    ]
};

const PRESS_ITEMS = [
    { id: 'pr1',  type: 'TV',      outlet: 'ČT Sport',           title: 'Honza Tráva: Osmý osmitisícovkář',             year: 2026, date: 'leden 2026',    href: '#' },
    { id: 'pr2',  type: 'TV',      outlet: 'ČT24',               title: 'Rozhovor: Život v extrémních výškách',          year: 2025, date: 'říjen 2025',    href: '#' },
    { id: 'pr3',  type: 'TV',      outlet: 'Česká televize',     title: 'Sportovci roku: nominace na cenu',              year: 2025, date: 'prosinec 2025', href: '#' },
    { id: 'pr4',  type: 'Rádio',   outlet: 'Radiožurnál ČRo',    title: 'Hostem je...: Honza Tráva o K2',                year: 2026, date: 'únor 2026',    href: '#' },
    { id: 'pr5',  type: 'Rádio',   outlet: 'Frekvence 1',        title: 'Ranní show: Honza Tráva živě',                  year: 2025, date: 'srpen 2025',    href: '#' },
    { id: 'pr6',  type: 'Rádio',   outlet: 'Radio Impuls',       title: 'Horolezec, který se nevzdává',                  year: 2024, date: 'duben 2024',    href: '#' },
    { id: 'pr7',  type: 'Tisk',    outlet: 'Respekt',            title: 'Na vrcholu světa — a doma',                     year: 2025, date: 'září 2025',     href: '#' },
    { id: 'pr8',  type: 'Tisk',    outlet: 'Forbes CZ',          title: 'Jak velet týmu nad mraky',                      year: 2025, date: 'červen 2025',   href: '#' },
    { id: 'pr9',  type: 'Tisk',    outlet: "Runner's World CZ",  title: 'Příprava na výstupy nad 8000 m',                year: 2024, date: 'prosinec 2024', href: '#' },
    { id: 'pr10', type: 'Tisk',    outlet: 'Lidové noviny',      title: 'Nad oblaky: Rozhovor s alpinistou',             year: 2024, date: 'únor 2024',     href: '#' },
    { id: 'pr11', type: 'Online',  outlet: 'iDnes.cz',           title: 'Trávníček pokořil osmou osmitisícovku',         year: 2026, date: 'leden 2026',    href: '#' },
    { id: 'pr12', type: 'Online',  outlet: 'Sport.cz',           title: 'Český horolezec na vrcholu K2',                 year: 2025, date: 'červenec 2025', href: '#' },
    { id: 'pr13', type: 'Online',  outlet: 'Aktuálně.cz',        title: 'Expedice Manáslu: Za hranici možného',          year: 2024, date: 'říjen 2024',    href: '#' },
    { id: 'pr14', type: 'Podcast', outlet: 'Průvodce galaxií',   title: 'Ep. 87: Hory jako životní škola',               year: 2025, date: 'listopad 2025', href: '#' },
    { id: 'pr15', type: 'Podcast', outlet: 'Sazka Olympijský',   title: 'Cesta k vrcholu s Honzou Trávou',               year: 2025, date: 'duben 2025',    href: '#' },
    { id: 'pr16', type: 'Podcast', outlet: 'FullFight Cast',      title: 'Mentální síla v extrémech',                     year: 2024, date: 'září 2024',     href: '#' },
];

const TYPE_CONFIG = {
    'TV':      { Icon: Tv,         color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-200'    },
    'Rádio':   { Icon: Radio,      color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200'   },
    'Tisk':    { Icon: Newspaper,  color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-200'  },
    'Online':  { Icon: Globe,      color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    'Podcast': { Icon: Headphones, color: 'text-gold-600',    bg: 'bg-gold-50',    border: 'border-gold-200'    },
};

const TYPES = ['Vše', 'TV', 'Rádio', 'Tisk', 'Online', 'Podcast'];
const YEARS = ['Vše', 2026, 2025, 2024];

/* ── Press item row (shared between inline + modal) ── */
const PressRow = ({ item, compact = false }) => {
    const { Icon, color, bg, border } = TYPE_CONFIG[item.type];
    return (
        <a
            href={item.href}
            className={`group flex items-center gap-3 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all ${compact ? 'p-2.5' : 'p-3.5'}`}
        >
            <div className={`shrink-0 rounded-lg border flex items-center justify-center ${bg} ${border} ${compact ? 'w-7 h-7' : 'w-9 h-9'}`}>
                <Icon className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} ${color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`font-sans font-bold text-slate-700 truncate ${compact ? 'text-[11px]' : 'text-xs md:text-sm'}`}>{item.outlet}</p>
                <p className={`font-sans text-slate-400 truncate ${compact ? 'text-[10px]' : 'text-[11px] md:text-xs'}`}>{item.title}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
                <span className={`text-slate-400 font-mono hidden md:block ${compact ? 'text-[10px]' : 'text-[11px]'}`}>{item.date}</span>
                <ExternalLink className={`text-slate-300 group-hover:text-slate-600 transition-colors ${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            </div>
        </a>
    );
};

const Media = ({ scrollProgress }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [readingArticle, setReadingArticle] = useState(false);
    const [pressFilter, setPressFilter] = useState('Vše');
    const [pressYear, setPressYear] = useState('Vše');
    const [showAllPress, setShowAllPress] = useState(false);

    useScrollLock(activeItem || readingArticle || showAllPress);

    // PHASE 10: 0.77 -> 0.90
    const containerOpacity = useTransform(scrollProgress, [0.77, 0.80, 0.87, 0.90], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [0.77, 0.80, 0.87, 0.90], ["-120%", "0%", "0%", "100%"]);

    const filteredPress = useMemo(() => PRESS_ITEMS.filter(item => {
        const typeMatch = pressFilter === 'Vše' || item.type === pressFilter;
        const yearMatch = pressYear === 'Vše' || item.year === pressYear;
        return typeMatch && yearMatch;
    }), [pressFilter, pressYear]);

    return (
        <>
        {/* BACKGROUND */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 0 }}
            className="absolute inset-0 w-full h-full bg-[#f8f9fa] pointer-events-none"
        />

        {/* CONTENT */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 70 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* ── Mobile layout ── */}
            <div className="md:hidden w-full h-full flex flex-col pointer-events-auto overflow-hidden">

                {/* Dark photo header — title + stats overlaid on mountain photo */}
                <div className="shrink-0 relative overflow-hidden" style={{ height: '42%' }}>
                    <img src={BaseCampImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/60 to-[#f8f9fa]" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-6 gap-3">
                        <div className="text-center">
                            <h4 className="text-gold-400 font-sans uppercase tracking-[0.3em] text-[9px] font-bold mb-1.5">
                                09 — Média &amp; Obsah
                            </h4>
                            <h2 className="font-serif text-2xl text-white leading-tight">
                                Příběhy z batohu i éteru
                            </h2>
                        </div>
                        {/* Stats inline in photo header */}
                        <div className="flex gap-6">
                            {[
                                { num: '16+', label: 'Médií' },
                                { num: '9',   label: 'Videí' },
                                { num: '9',   label: 'Podcastů' },
                            ].map(({ num, label }) => (
                                <div key={label} className="text-center">
                                    <p className="font-serif text-2xl text-white font-bold leading-none">{num}</p>
                                    <p className="text-white/60 text-[9px] uppercase tracking-wider font-bold mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Light content area */}
                <div className="flex-1 flex flex-col min-h-0 px-4 pt-3 pb-3 gap-2.5 overflow-hidden">

                    {/* Own content — horizontal 3-tile strip */}
                    <div className="shrink-0 flex gap-2">
                        {[
                            { data: MEDIA_DATA.video[0],   Icon: Play,     label: 'YouTube', sub: 'Vlogy' },
                            { data: MEDIA_DATA.podcast[0], Icon: Mic,      label: 'Podcast', sub: '2027' },
                            { data: MEDIA_DATA.blog[0],    Icon: FileText, label: 'Blog',    sub: 'Zápisky' },
                        ].map(({ data, Icon, label, sub }) => (
                            <button
                                key={data.id}
                                onClick={() => setActiveItem(data)}
                                className="flex-1 flex flex-col items-center gap-1.5 py-3 px-2 bg-white border border-slate-200 rounded-xl hover:border-gold-400 hover:bg-gold-50/30 transition-all shadow-sm active:scale-95"
                            >
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-slate-600" fill={Icon === Play ? 'currentColor' : 'none'} />
                                </div>
                                <p className="font-sans font-bold text-slate-800 text-[10px] uppercase tracking-wider">{label}</p>
                                <p className="font-sans text-slate-400 text-[9px]">{sub}</p>
                            </button>
                        ))}
                    </div>

                    {/* Press section — mobile */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-1.5 shrink-0">
                            <span className="text-slate-500 font-sans text-[9px] uppercase tracking-[0.25em] font-bold">V médiích</span>
                            <span className="text-slate-400 text-[9px] font-mono">{filteredPress.length} výstupů</span>
                        </div>

                        {/* Mobile filter pills */}
                        <div className="flex flex-wrap gap-1 mb-2 shrink-0">
                            {TYPES.map(t => (
                                <button key={t} onClick={() => setPressFilter(t)}
                                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all border ${
                                        pressFilter === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'
                                    }`}
                                >{t}</button>
                            ))}
                        </div>

                        {/* Mobile press list */}
                        <div className="flex flex-col gap-1.5 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {filteredPress.slice(0, 3).map((item, idx) => (
                                    <motion.div key={item.id}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: idx * 0.04 }}
                                    >
                                        <PressRow item={item} compact />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredPress.length > 3 && (
                            <button onClick={() => setShowAllPress(true)}
                                className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-gold-600 flex items-center justify-center gap-1 shrink-0"
                            >
                                Zobrazit všech {filteredPress.length} <ArrowRight className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Desktop layout ── */}
            <div className="hidden md:flex w-full h-full items-center justify-center px-8 lg:px-16 xl:px-20 pointer-events-auto">
                <div className="w-full max-w-6xl flex flex-col gap-6 lg:gap-8">

                    {/* Desktop header */}
                    <div className="text-center shrink-0">
                        <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-2">
                            09 — Média &amp; Obsah (7800 m)
                        </h4>
                        <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight mb-2">
                            Příběhy, které se<br /> do batohu nevešly
                        </h2>
                        <p className="font-sans text-slate-500 text-sm lg:text-base max-w-lg mx-auto">
                            Vlastní obsah z expedic i mediální výstupy — vše na jednom místě.
                        </p>
                    </div>

                    {/* Two-column body */}
                    <div className="grid grid-cols-[5fr_8fr] gap-8 lg:gap-12 xl:gap-16 w-full">

                        {/* Left: Own content */}
                        <div>
                            {/* Featured photo card */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md group cursor-pointer"
                                onClick={() => setActiveItem(MEDIA_DATA.video[0])}
                            >
                                <img src={ClimbersImg} alt="Honza v terénu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-gold-400 font-sans text-[10px] font-bold uppercase tracking-widest mb-1">Vlastní obsah</p>
                                    <h5 className="font-serif text-white text-lg leading-tight">Přímý přenos z expedic</h5>
                                    <p className="font-sans text-white/60 text-xs mt-0.5">Vlogy · Podcast · Blog</p>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-1.5">
                                    {[
                                        { num: '9+', label: 'videí' },
                                        { num: '9+', label: 'podcastů' },
                                    ].map(({ num, label }) => (
                                        <div key={label} className="bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-center">
                                            <span className="font-serif text-white font-bold text-sm">{num}</span>
                                            <span className="font-sans text-white/60 text-[9px] ml-1">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {[
                                    { data: MEDIA_DATA.video[0],   Icon: Play,     label: 'Vlogy & Expedice', sub: 'YouTube' },
                                    { data: MEDIA_DATA.podcast[0], Icon: Mic,      label: 'Podcast',          sub: 'Audio — 2027' },
                                    { data: MEDIA_DATA.blog[0],    Icon: FileText, label: 'Psané příběhy',    sub: 'Blog' },
                                ].map(({ data, Icon, label, sub }) => (
                                    <button
                                        key={data.id}
                                        onClick={() => setActiveItem(data)}
                                        className="group flex items-center gap-3.5 p-3.5 bg-white border border-slate-200 rounded-xl hover:border-gold-400 hover:bg-gold-50/40 transition-all text-left shadow-sm hover:shadow-md"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-gold-500 flex items-center justify-center transition-colors shrink-0">
                                            <Icon className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill={Icon === Play ? 'currentColor' : 'none'} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-sans font-bold text-slate-800 text-xs uppercase tracking-widest">{label}</p>
                                            <p className="font-sans text-slate-400 text-[11px] mt-0.5">{sub}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-gold-500 shrink-0 group-hover:translate-x-0.5 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Press */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h5 className="text-slate-400 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                                    V médiích
                                </h5>
                                <span className="text-slate-400 text-[10px] font-mono">{filteredPress.length} výstupů</span>
                            </div>

                            {/* Filter bar */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {TYPES.map(t => (
                                    <button key={t} onClick={() => setPressFilter(t)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                            pressFilter === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                                        }`}
                                    >{t}</button>
                                ))}
                                <span className="w-px bg-slate-200 self-stretch mx-0.5" />
                                {YEARS.map(yr => (
                                    <button key={yr} onClick={() => setPressYear(yr === pressYear ? 'Vše' : yr)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all border ${
                                            pressYear === yr ? 'bg-gold-500 text-white border-gold-500' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                                        }`}
                                    >{yr}</button>
                                ))}
                            </div>

                            {/* Press list */}
                            <div className="flex flex-col gap-2">
                                <AnimatePresence mode="popLayout">
                                    {filteredPress.slice(0, 5).map((item, idx) => (
                                        <motion.div key={item.id}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ delay: idx * 0.04, duration: 0.2 }}
                                        >
                                            <PressRow item={item} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {filteredPress.length > 5 && (
                                <button onClick={() => setShowAllPress(true)}
                                    className="mt-3 w-full text-center text-[10px] font-bold uppercase tracking-widest text-gold-600 hover:text-gold-500 transition-colors flex items-center justify-center gap-1.5"
                                >
                                    Zobrazit všech {filteredPress.length} výstupů
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* ── Own content detail modal ── */}
        <AnimatePresence>
            {activeItem && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4 md:p-8 pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white/95 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[95vh] overflow-y-auto relative flex flex-col overscroll-contain"
                        data-lenis-prevent
                    >
                        <button onClick={() => { setReadingArticle(false); setActiveItem(null); }}
                            className="absolute top-5 right-5 p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition text-slate-600 z-50"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-7 md:p-11">
                            <AnimatePresence mode="wait">
                                {!readingArticle ? (
                                    <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                                        <div className="flex flex-col md:flex-row gap-7 lg:gap-10 mb-10">
                                            <div className={`w-full ${activeItem.type === 'video' ? 'md:w-3/5' : 'md:w-1/2'} aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl group`}>
                                                <img src={activeItem.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" alt={activeItem.title} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {activeItem.type === 'video'   && <PlayCircle className="w-20 h-20 text-white hover:scale-110 hover:text-gold-400 transition-all cursor-pointer drop-shadow-xl" strokeWidth={1.5} />}
                                                    {activeItem.type === 'podcast' && <Mic className="w-16 h-16 text-white hover:scale-110 hover:text-gold-400 transition-all cursor-pointer drop-shadow-xl" strokeWidth={1.5} />}
                                                    {activeItem.type === 'blog'    && <FileText className="w-16 h-16 text-white hover:scale-110 hover:text-gold-400 transition-all cursor-pointer drop-shadow-xl" strokeWidth={1.5} />}
                                                </div>
                                            </div>
                                            <div className="flex-1 text-left flex flex-col justify-center">
                                                <span className="text-gold-600 font-sans font-bold uppercase tracking-widest text-[10px] mb-3 bg-gold-50 inline-block px-3 py-1 rounded-md self-start border border-gold-200">
                                                    {activeItem.type}
                                                </span>
                                                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-3 leading-tight">{activeItem.title}</h2>
                                                <div className="flex items-center gap-4 text-xs font-sans font-bold text-slate-500 mb-5 uppercase tracking-widest">
                                                    <span>{activeItem.date}</span><span>•</span>
                                                    <span>{activeItem.duration || activeItem.readTime}</span>
                                                </div>
                                                <p className="font-sans text-slate-700 leading-relaxed text-base md:text-lg mb-7">{activeItem.desc}</p>
                                                <button
                                                    onClick={() => { if (activeItem.type === 'blog') setReadingArticle(true); }}
                                                    className="bg-slate-900 text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors self-start shadow-lg"
                                                >
                                                    {activeItem.type === 'blog' ? 'Číst celý článek' : `Přehrát ${activeItem.type}`}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-200 pt-9 text-left">
                                            <h3 className="font-serif text-2xl text-slate-900 mb-7">Další z kategorie</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                                {MEDIA_DATA[activeItem.type].map(item => (
                                                    <div key={item.id}
                                                        onClick={() => { setActiveItem(item); setReadingArticle(false); }}
                                                        className={`group cursor-pointer bg-white rounded-xl overflow-hidden border ${item.id === activeItem.id ? 'border-gold-400 ring-2 ring-gold-400' : 'border-slate-200'} shadow hover:shadow-xl transition-all hover:-translate-y-1`}
                                                    >
                                                        <div className="w-full aspect-[16/10] bg-slate-200 relative overflow-hidden">
                                                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                                                            <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">
                                                                {item.duration || item.readTime}
                                                            </div>
                                                        </div>
                                                        <div className="p-5">
                                                            <h4 className="font-serif text-lg text-slate-900 mb-1.5 group-hover:text-gold-600 transition-colors line-clamp-1">{item.title}</h4>
                                                            <p className="font-sans text-slate-500 text-xs line-clamp-2 leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="article" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full text-left">
                                        <button onClick={() => setReadingArticle(false)}
                                            className="mb-7 font-sans font-bold text-xs uppercase tracking-widest text-gold-600 hover:text-gold-500 flex items-center transition-colors px-4 py-2 border border-gold-200 rounded-lg hover:bg-gold-50"
                                        >
                                            ← Zpět na přehled
                                        </button>
                                        <div className="w-full h-56 md:h-96 rounded-3xl overflow-hidden mb-9 shadow-2xl relative">
                                            <img src={activeItem.image} className="w-full h-full object-cover" alt={activeItem.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-7 md:p-11">
                                                <div>
                                                    <span className="text-gold-400 font-sans font-bold uppercase tracking-widest text-[10px] mb-2 block">Příběhy z expedice</span>
                                                    <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{activeItem.title}</h1>
                                                    <div className="flex items-center gap-4 text-xs font-sans text-slate-300 uppercase tracking-widest">
                                                        <span>{activeItem.date}</span><span className="opacity-50">•</span><span>{activeItem.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-w-2xl mx-auto">
                                            <p className="text-xl text-slate-800 font-medium font-serif leading-snug mb-7 bg-slate-50 p-5 rounded-2xl border-l-4 border-gold-400">
                                                {activeItem.desc}
                                            </p>
                                            {activeItem.content?.map((p, i) => (
                                                <p key={i} className="font-sans text-slate-700 leading-relaxed mb-5 text-base">{p}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── All press modal ── */}
        <AnimatePresence>
            {showAllPress && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4 md:p-8 pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white border border-slate-100 shadow-2xl rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        <div className="p-6 md:p-7 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900">V médiích</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">{filteredPress.length} výstupů</p>
                            </div>
                            <button onClick={() => setShowAllPress(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="px-6 md:px-7 py-3.5 border-b border-slate-100 flex flex-wrap gap-1.5 shrink-0">
                            {TYPES.map(t => (
                                <button key={t} onClick={() => setPressFilter(t)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${pressFilter === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                                >{t}</button>
                            ))}
                            <span className="w-px bg-slate-200 self-stretch mx-1" />
                            {YEARS.map(yr => (
                                <button key={yr} onClick={() => setPressYear(yr === pressYear ? 'Vše' : yr)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all border ${pressYear === yr ? 'bg-gold-500 text-white border-gold-500' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                                >{yr}</button>
                            ))}
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 md:p-7 flex flex-col gap-2 overscroll-contain" data-lenis-prevent>
                            <AnimatePresence mode="popLayout">
                                {filteredPress.map((item, idx) => {
                                    const { Icon, color, bg, border } = TYPE_CONFIG[item.type];
                                    return (
                                        <motion.a key={item.id} href={item.href}
                                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                            transition={{ delay: idx * 0.025, duration: 0.2 }}
                                            className="group flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-white hover:shadow-md transition-all"
                                        >
                                            <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${bg} ${border}`}>
                                                <Icon className={`w-4 h-4 ${color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-sans font-bold text-slate-700 text-xs md:text-sm">{item.outlet}</p>
                                                <p className="font-sans text-slate-500 text-xs truncate">{item.title}</p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2.5">
                                                <span className="text-slate-400 text-[10px] font-mono hidden md:block">{item.date}</span>
                                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${bg} ${border} ${color}`}>{item.type}</span>
                                                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </AnimatePresence>
                            {filteredPress.length === 0 && (
                                <div className="text-center py-14 text-slate-400">
                                    <p className="font-sans text-sm">Žádné výstupy pro vybraný filtr.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Media;
