import { useState, useMemo } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import {
    Play, Mic, FileText, X,
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
    'TV':      { Icon: Tv,         accent: 'text-sky-400'     },
    'Rádio':   { Icon: Radio,      accent: 'text-amber-400'   },
    'Tisk':    { Icon: Newspaper,  accent: 'text-slate-300'   },
    'Online':  { Icon: Globe,      accent: 'text-emerald-400' },
    'Podcast': { Icon: Headphones, accent: 'text-gold-400'    },
};

const CONTENT_BUTTONS = [
    { key: 'video',   Icon: Play,     label: 'Vlogy & Expedice', sub: 'YouTube',      iconBg: 'from-red-500 to-red-700',       glow: 'shadow-red-500/30'    },
    { key: 'podcast', Icon: Mic,      label: 'Podcast',          sub: 'Audio — 2027', iconBg: 'from-violet-500 to-purple-700', glow: 'shadow-violet-500/30' },
    { key: 'blog',    Icon: FileText, label: 'Psané příběhy',    sub: 'Blog',         iconBg: 'from-gold-500 to-amber-600',    glow: 'shadow-gold-500/30'   },
];

const TYPES = ['Vše', 'TV', 'Rádio', 'Tisk', 'Online', 'Podcast'];
const YEARS = ['Vše', 2026, 2025, 2024];

/* ── Press row — dark (inline) + light (modal) variants ── */
const PressRow = ({ item, compact = false, dark = false }) => {
    const { Icon, accent } = TYPE_CONFIG[item.type];
    return (
        <a
            href={item.href}
            className={`group flex items-center gap-3 rounded-xl transition-all ${
                dark
                    ? `bg-white/[0.06] border border-white/10 hover:bg-white/[0.11] hover:border-white/20 ${compact ? 'p-2.5' : 'p-3'}`
                    : `bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md ${compact ? 'p-2.5' : 'p-3.5'}`
            }`}
        >
            <div className={`shrink-0 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md ${compact ? 'w-8 h-8' : 'w-9 h-9'}`}>
                <Icon className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${accent}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`font-sans font-bold truncate ${compact ? 'text-[11px]' : 'text-xs md:text-sm'} ${dark ? 'text-white/90' : 'text-slate-800'}`}>{item.outlet}</p>
                <p className={`font-sans truncate ${compact ? 'text-[10px]' : 'text-[11px] md:text-xs'} ${dark ? 'text-white/40' : 'text-slate-400'}`}>{item.title}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
                <span className={`font-mono hidden md:block ${compact ? 'text-[10px]' : 'text-[11px]'} ${dark ? 'text-white/30' : 'text-slate-400'}`}>{item.date}</span>
                <ExternalLink className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} transition-colors ${dark ? 'text-white/20 group-hover:text-white/50' : 'text-slate-300 group-hover:text-slate-500'}`} />
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
    const bgParallax = useTransform(scrollProgress, [0.75, 0.92], ['-10%', '10%']);

    const filteredPress = useMemo(() => PRESS_ITEMS.filter(item => {
        const typeMatch = pressFilter === 'Vše' || item.type === pressFilter;
        const yearMatch = pressYear === 'Vše' || item.year === pressYear;
        return typeMatch && yearMatch;
    }), [pressFilter, pressYear]);

    return (
        <>
        {/* BACKGROUND — dark cinematic mountain photo */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 0 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            <motion.div style={{ y: bgParallax }} className="absolute inset-0 scale-110 origin-center">
                <img src={ClimbersImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            {/* Main dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/88" />
            {/* Top gold-tinted atmospheric glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_35%_at_50%_0%,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
            {/* Bottom dark anchor */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-slate-950/70 to-transparent" />
        </motion.div>

        {/* CONTENT */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 70 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* ── Mobile layout ── */}
            <div className="md:hidden w-full h-full flex flex-col pointer-events-auto overflow-hidden">

                {/* Photo header */}
                <div className="shrink-0 relative overflow-hidden" style={{ height: '38%' }}>
                    <img src={BaseCampImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/80" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-4 gap-3">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="h-px w-6 bg-gold-400/60" />
                                <span className="text-gold-400 font-mono uppercase tracking-[0.3em] text-[9px] font-bold">09 — Média</span>
                                <div className="h-px w-6 bg-gold-400/60" />
                            </div>
                            <h2 className="font-serif text-2xl text-white leading-tight">
                                Příběhy z batohu i éteru
                            </h2>
                        </div>
                        <div className="flex gap-6">
                            {[
                                { num: '16+', label: 'Médií' },
                                { num: '9',   label: 'Videí' },
                                { num: '9',   label: 'Podcastů' },
                            ].map(({ num, label }) => (
                                <div key={label} className="text-center">
                                    <p className="font-serif text-2xl text-white font-bold leading-none">{num}</p>
                                    <p className="text-white/50 text-[9px] uppercase tracking-wider font-bold mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dark content area */}
                <div className="flex-1 flex flex-col min-h-0 px-4 pt-3 pb-3 gap-2.5 overflow-hidden">

                    {/* Own content tiles */}
                    <div className="shrink-0 flex gap-2">
                        {CONTENT_BUTTONS.map(({ key, Icon, label, sub, iconBg, glow }) => (
                            <button
                                key={key}
                                onClick={() => setActiveItem(MEDIA_DATA[key][0])}
                                className="flex-1 flex flex-col items-center gap-2 py-3 px-2 bg-white/[0.07] border border-white/10 rounded-xl hover:bg-white/[0.12] hover:border-white/20 transition-all active:scale-95"
                            >
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg ${glow}`}>
                                    <Icon className="w-4 h-4 text-white" fill={key === 'video' ? 'currentColor' : 'none'} />
                                </div>
                                <p className="font-sans font-bold text-white/80 text-[10px] uppercase tracking-wider leading-none">{label}</p>
                                <p className="font-sans text-white/35 text-[9px] leading-none">{sub}</p>
                            </button>
                        ))}
                    </div>

                    {/* Press section — mobile */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-1.5 shrink-0">
                            <span className="text-white/40 font-mono text-[9px] uppercase tracking-[0.25em] font-bold">V médiích</span>
                            <span className="text-white/30 text-[9px] font-mono">{filteredPress.length} výstupů</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2 shrink-0">
                            {TYPES.map(t => (
                                <button key={t} onClick={() => setPressFilter(t)}
                                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all border ${
                                        pressFilter === t
                                            ? 'bg-white/90 text-slate-900 border-white/80'
                                            : 'bg-white/[0.07] text-white/50 border-white/15 hover:text-white/80'
                                    }`}
                                >{t}</button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1.5 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {filteredPress.slice(0, 3).map((item, idx) => (
                                    <motion.div key={item.id}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: idx * 0.04 }}
                                    >
                                        <PressRow item={item} compact dark />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {filteredPress.length > 3 && (
                            <button onClick={() => setShowAllPress(true)}
                                className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-gold-400 flex items-center justify-center gap-1 shrink-0"
                            >
                                Zobrazit všech {filteredPress.length} <ArrowRight className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Desktop layout ── */}
            <div className="hidden md:flex w-full h-full items-center justify-center px-8 lg:px-16 xl:px-20 pointer-events-auto">
                <div className="w-full max-w-6xl flex flex-col gap-5 lg:gap-7">

                    {/* Desktop header */}
                    <div className="text-center shrink-0">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="h-px w-12 bg-gold-400/50" />
                            <span className="text-gold-400 font-mono uppercase tracking-[0.35em] text-[10px] font-bold">09 — Média &amp; Obsah</span>
                            <div className="h-px w-12 bg-gold-400/50" />
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-2">
                            Příběhy, které se<br />
                            <span className="italic text-white/60">do batohu nevešly</span>
                        </h2>
                        <p className="font-sans text-white/45 text-sm lg:text-base max-w-lg mx-auto">
                            Vlastní obsah z expedic i mediální výstupy — vše na jednom místě.
                        </p>
                    </div>

                    {/* Two-column body */}
                    <div className="grid grid-cols-[5fr_8fr] gap-8 lg:gap-12 xl:gap-14 w-full">

                        {/* Left: Own content */}
                        <div>
                            {/* Featured photo card */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-2xl group cursor-pointer border border-white/10"
                                onClick={() => setActiveItem(MEDIA_DATA.video[0])}
                            >
                                <img src={ClimbersImg} alt="Honza v terénu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-gold-400 font-mono text-[9px] font-bold uppercase tracking-widest mb-1">Vlastní obsah</p>
                                    <h5 className="font-serif text-white text-lg leading-tight">Přímý přenos z expedic</h5>
                                    <p className="font-sans text-white/45 text-xs mt-0.5">Vlogy · Podcast · Blog</p>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-1.5">
                                    {[
                                        { num: '9+', label: 'videí' },
                                        { num: '9+', label: 'podcastů' },
                                    ].map(({ num, label }) => (
                                        <div key={label} className="bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                                            <span className="font-serif text-white font-bold text-sm">{num}</span>
                                            <span className="font-sans text-white/50 text-[9px] ml-1">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {CONTENT_BUTTONS.map(({ key, Icon, label, sub, iconBg, glow }) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveItem(MEDIA_DATA[key][0])}
                                        className="group flex items-center gap-3.5 p-3 bg-white/[0.06] border border-white/[0.09] rounded-xl hover:bg-white/[0.11] hover:border-white/20 transition-all text-left"
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg ${glow} shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                                            <Icon className="w-4.5 h-4.5 text-white" fill={key === 'video' ? 'currentColor' : 'none'} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-sans font-bold text-white/85 text-xs uppercase tracking-widest">{label}</p>
                                            <p className="font-sans text-white/35 text-[11px] mt-0.5">{sub}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 shrink-0 group-hover:translate-x-1 transition-all duration-200" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Press */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h5 className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                                    V médiích
                                </h5>
                                <span className="text-white/25 text-[10px] font-mono">{filteredPress.length} výstupů</span>
                            </div>

                            {/* Filter bar */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {TYPES.map(t => (
                                    <button key={t} onClick={() => setPressFilter(t)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                            pressFilter === t
                                                ? 'bg-white/90 text-slate-900 border-white/80'
                                                : 'bg-white/[0.06] text-white/50 border-white/10 hover:bg-white/[0.11] hover:text-white/80 hover:border-white/20'
                                        }`}
                                    >{t}</button>
                                ))}
                                <span className="w-px bg-white/10 self-stretch mx-0.5" />
                                {YEARS.map(yr => (
                                    <button key={yr} onClick={() => setPressYear(yr === pressYear ? 'Vše' : yr)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all border ${
                                            pressYear === yr
                                                ? 'bg-gold-500 text-white border-gold-500'
                                                : 'bg-white/[0.06] text-white/50 border-white/10 hover:bg-white/[0.11] hover:text-white/80 hover:border-white/20'
                                        }`}
                                    >{yr}</button>
                                ))}
                            </div>

                            {/* Press list */}
                            <div className="flex flex-col gap-1.5">
                                <AnimatePresence mode="popLayout">
                                    {filteredPress.slice(0, 5).map((item, idx) => (
                                        <motion.div key={item.id}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ delay: idx * 0.04, duration: 0.2 }}
                                        >
                                            <PressRow item={item} dark />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {filteredPress.length > 5 && (
                                <button onClick={() => setShowAllPress(true)}
                                    className="mt-3 w-full text-center text-[10px] font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors flex items-center justify-center gap-1.5"
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

        {/* ── Own content detail modal (light) ── */}
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
                                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-2xl">
                                                        {activeItem.type === 'video'   && <Play     className="w-8 h-8 text-white fill-white ml-1 drop-shadow-lg" />}
                                                        {activeItem.type === 'podcast' && <Mic      className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />}
                                                        {activeItem.type === 'blog'    && <FileText className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />}
                                                    </div>
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

        {/* ── All press modal (light) ── */}
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
                                    const { Icon, accent } = TYPE_CONFIG[item.type];
                                    return (
                                        <motion.a key={item.id} href={item.href}
                                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                            transition={{ delay: idx * 0.025, duration: 0.2 }}
                                            className="group flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-md transition-all"
                                        >
                                            <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
                                                <Icon className={`w-4 h-4 ${accent}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-sans font-bold text-slate-800 text-xs md:text-sm">{item.outlet}</p>
                                                <p className="font-sans text-slate-500 text-xs truncate">{item.title}</p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2.5">
                                                <span className="text-slate-400 text-[10px] font-mono hidden md:block">{item.date}</span>
                                                <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">{item.type}</span>
                                                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
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
