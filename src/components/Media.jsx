import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Mic, FileText, X, PlayCircle } from 'lucide-react';
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
        { id: 'p1', type: 'podcast', title: 'Podcast: Ep. 12 - K2', date: 'Duben 2026', duration: '45:00', image: HonzaImg, desc: 'Rozhovor o největších krizích na "Hoře hor" a jak je překonat.' },
        { id: 'p2', type: 'podcast', title: 'Podcast: Ep. 11 - Nanga Parbat', date: 'Březen 2026', duration: '38:15', image: ClimbersImg, desc: 'Příběh hory zabiják z pohledu naší poslední náročné expedice.' },
        { id: 'p3', type: 'podcast', title: 'Podcast: Ep. 10 - Tým', date: 'Únor 2026', duration: '52:30', image: BaseCampImg, desc: 'S důležitými členy týmu o tom, jak funguje chemie v extrémních výškách a těžkých podmínkách.' },
    ],
    blog: [
        { 
            id: 'b1', type: 'blog', title: 'Deník z expedice', date: '12. května 2026', readTime: '5 min čtení', image: BaseCampImg, desc: 'Dnes jsme dorazili do 6000 metrů. Vítr sílí, ale morálka je mimořádně vysoká.',
            content: [
                "Je krátce po páté hodině ranní a vítr lomcuje našimi stany jako by se nás snažil shodit zpátky do údolí. Zima zalézá za nehty i přes tu nejlepší výbavu od Tilaku, jakmile člověk jen o pár centimetrů poodhalí zip spacáku.",
                "Morálka v týmu je ale překvapivě vysoká. Všichni moc dobře víme, proč tu jsme a čím si musíme projít. První dny aklimatizace jsou vždycky ty nejtěžší. Hlava vás bolí, jako by praskala, každý krok stojí dvakrát tolik sil a dýcháte jako po maratonu.",
                "Včera se nám podařilo úspěšně vynést zásoby do C1. Cepíny a ledovcové šrouby fungovaly v tvrdém modrém ledu přesně jak měly. Dnes nás čeká den volna. Pokud to vítr dovolí, zkusíme ohřát trochu víc sněhu na čaj a budeme probírat strategii pro zítřejší pokus o postup do 6500 metrů.",
                "Hory nás zatím učí obrovské pokoře. Zjišťujeme, co to znamená skutečně se nepřestávat hýbat, ikdyž hlava říká ne. Je to boj, ale kvůli těmhle momentům to děláme."
            ]
        },
        { 
            id: 'b2', type: 'blog', title: 'Nepálská kultura', date: '5. dubna 2026', readTime: '8 min čtení', image: SummitImg, desc: 'Proč se neustále vracíme do Káthmándú, co nás tam tak přitahuje a jak se tam žije.',
            content: [
                "Pro mnoho horolezců je Nepál jen přestupní stanicí na cestě k obřím štítům Himálaje. Pro mě je to ale druhý domov. Káthmándú vás po příletu zasáhne absolutním chaosem, vůní vonných tyčinek, pouličního jídla a prachu z ulic.",
                "Davy lidí se proplétají úzkými uličkami Thamelu, rikši zvoní a obchodníci nabízí vše od tibetských misek po péřové bundy, které by prý vydržely i výstup na Měsíc.",
                "Ale čím dál se dostanete od ruchu hlavního města a začnete stoupat údolím Khumbu, tím víc poznáte pravou podstatu této země. Lidé tu žijí v tvrdých podmínkách, s minimem věcí, které my na Západě považujeme za nezbytné. A přesto se na vás při každém setkání smějí od ucha k uchu s upřímným pozdravem 'Namasté'.",
                "Spolupráce se šerpy a místními nosiči mě naučila nekonečnému klidu a přijímání věcí takových, jaké jsou. Hory tu nerozhodují jen o tom, kdo vyleze na vrchol, ale diktují tu samotný rytmus každodenního života."
            ] 
        },
        { 
            id: 'b3', type: 'blog', title: 'Strava v horách', date: '28. března 2026', readTime: '4 min čtení', image: HonzaImg, desc: 'Co jíme, když je voda z ledovce převážně zmrzlá a kyslíku bolestivě málo na spalování.',
            content: [
                "Jídlo v osmi tisících metrech není kulinářský zážitek. Spíš boj o přežití a snaha donutit tělo přijmout aspoň nějaké kalorie. Obyčejné těstoviny vaříte hodiny a stejně jsou tvrdé, protože bod varu vody v dané výšce velmi rapidně klesá.",
                "Základem naší stravy v základním táboře je samozřejmě rýže, čočkový dal bhat a občas vajíčka. To vše se ale s přibývající nadmořskou výškou mění na dehydrovanou stravu, energetické gely a tyčinky.",
                "Nejhorší fáze nastává ve chvíli, kdy se dostanete nad hranici 7000 metrů. Extrémní výška a nedostatek kyslíku vám doslova 'vypnou' trávení a chuť k jídlu zmizí. Musíte do sebe kalorie tlačit násilím.",
                "Největší odměnou po dlouhých týdnech na sušeném jídle a ledovcové vodě je pak sestup dolů, do civilizace. Na chuť ledově vychlazeného piva a kusu pořádného masa si nahoře vzpomeneme snad stokrát."
            ]
        },
    ]
};

const Media = ({ scrollProgress }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [readingArticle, setReadingArticle] = useState(false);

    // PHASE 7: 0.68 -> 0.84 with hold (slightly closer)
    const containerOpacity = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.85], [0, 1, 1, 1]); // Keeping opacity solid while leaving so no fade gap
    const y = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.84], ["-120%", "0%", "0%", "100%"]);

    const items = [
        {
            title: 'Blog',
            text: 'Cíl: nezávislost na sociálních sítích. Obsah: expedice, Nepál, příběhy, zákulisí, osobní rovina.'
        },
        {
            title: 'YouTube',
            text: 'Máte obsah, je potřeba systematicky publikovat. Formáty: vlogy, expedice, rozhovory, behind the scenes.'
        },
        {
            title: 'Podcast (příprava 2027)',
            text: 'Cestovatelská témata, zajímavé světové lokality, hosté z komunity.'
        }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/60 to-ivory/80" />

            <motion.div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-24 mb-16 mx-auto">
                <div className="text-center mb-16 relative z-10">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3">
                        07 — Média & Obsah
                    </h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight">
                        Příběhy, které se do batohu nevešly
                    </h2>
                </div>

                <div className="relative w-full">
                    {/* POLAROID 1 - Video (Left) */}
                    <motion.div
                        onClick={() => setActiveItem(MEDIA_DATA.video[0])}
                        initial={{ rotate: -25, x: -70, y: 80, opacity: 0 }}
                        whileInView={{ rotate: -12, x: -100, y: -40, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                        className="absolute -top-16 -left-6 md:-top-24 md:-left-20 lg:-top-28 lg:-left-32 z-0 w-48 md:w-64 lg:w-80 bg-slate-200 p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.2)] rounded-sm border border-slate-300/50 hidden sm:block pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-500 group"
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                            <img src={MEDIA_DATA.video[0].image} className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Video" />
                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-gold-500/90 group-hover:border-gold-400 transition-all duration-300 shadow-lg">
                                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">{MEDIA_DATA.video[0].title}</div>
                    </motion.div>

                    {/* POLAROID 2 - Podcast (Right) */}
                    <motion.div
                        onClick={() => setActiveItem(MEDIA_DATA.podcast[0])}
                        initial={{ rotate: 20, x: 70, y: 100, opacity: 0 }}
                        whileInView={{ rotate: 16, x: 100, y: 20, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.3 }}
                        className="absolute -top-10 -right-6 md:-top-20 md:-right-20 lg:-top-16 lg:-right-32 z-0 w-48 md:w-64 lg:w-80 bg-slate-200 p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.2)] rounded-sm border border-slate-300/50 hidden sm:block pointer-events-auto cursor-pointer hover:scale-105 transition-transform duration-500 group"
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                            <img src={MEDIA_DATA.podcast[0].image} className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Podcast" />
                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-gold-500/90 group-hover:border-gold-400 transition-all duration-300 shadow-lg">
                                    <Mic className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">{MEDIA_DATA.podcast[0].title}</div>
                    </motion.div>

                    {/* POLAROID 3 - Blog (Bottom Center) */}
                    <motion.div
                        onClick={() => setActiveItem(MEDIA_DATA.blog[0])}
                        initial={{ rotate: -5, x: 0, y: 80, opacity: 0 }}
                        whileInView={{ rotate: 6, x: -20, y: 40, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="absolute -bottom-16 left-1/4 lg:-bottom-24 lg:left-1/3 z-0 w-48 md:w-60 lg:w-72 bg-slate-200 p-3 md:p-4 pb-12 md:pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.2)] rounded-sm border border-slate-300/50 hidden lg:block pointer-events-auto cursor-pointer hover:scale-105 z-[1] transition-transform duration-500 group"
                    >
                        <div className="w-full aspect-[4/3] bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                            <img src={MEDIA_DATA.blog[0].image} className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Blog" />
                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-gold-500/90 group-hover:border-gold-400 transition-all duration-300 shadow-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center font-serif italic text-slate-800 text-xs md:text-sm font-medium">{MEDIA_DATA.blog[0].title}</div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start relative z-[10] backdrop-blur-[2px]">
                        {items.map((item) => (
                            <motion.div
                                key={item.title}
                                onClick={() => {
                                    if (item.title === 'Blog') setActiveItem(MEDIA_DATA.blog[0]);
                                    if (item.title === 'YouTube') setActiveItem(MEDIA_DATA.video[0]);
                                    if (item.title.includes('Podcast')) setActiveItem(MEDIA_DATA.podcast[0]);
                                }}
                                className="glass-card p-8 h-full flex flex-col pointer-events-auto bg-white/70 border-white/80 shadow-xl cursor-pointer hover:bg-white/90 transition-colors"
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-serif text-2xl text-slate-900">{item.title}</h3>
                                    {item.title === 'Blog' && <FileText className="w-5 h-5 text-gold-600" />}
                                    {item.title === 'YouTube' && <Play className="w-5 h-5 text-gold-600" fill="currentColor" />}
                                    {item.title.includes('Podcast') && <Mic className="w-5 h-5 text-gold-600" />}
                                </div>
                                <p className="font-sans text-slate-800 leading-relaxed text-base flex-1">{item.text}</p>
                                <div className="mt-6 flex items-center justify-start">
                                    <div className="px-5 py-2.5 bg-slate-900 text-white group-hover:bg-gold-600 font-bold text-[10px] md:text-xs tracking-widest uppercase rounded-full transition-colors flex items-center gap-2 shadow-md">
                                        Zobrazit obsah <PlayCircle className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Media Overlay Modal */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4 md:p-8 pointer-events-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-white/95 backdrop-blur-3xl border border-white/50 shadow-[0_30px_100px_rgba(0,0,0,0.6)] rounded-[2rem] max-w-5xl w-full max-h-[95vh] overflow-y-auto relative flex flex-col"
                        >
                            <button
                                onClick={() => {
                                    setReadingArticle(false);
                                    setActiveItem(null);
                                }}
                                className="absolute top-6 right-6 p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition text-slate-600 z-50 shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    {!readingArticle ? (
                                        <motion.div 
                                            key="overview"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full"
                                        >
                                            {/* Main Content Feature */}
                                            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-12">
                                                <div className={`w-full ${activeItem.type === 'video' ? 'md:w-3/5' : 'md:w-1/2'} aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl group`}>
                                                    <img src={activeItem.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" alt={activeItem.title} />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        {activeItem.type === 'video' && <PlayCircle className="w-20 h-20 text-white hover:scale-110 hover:text-gold-400 transition-all cursor-pointer shadow-black drop-shadow-xl" strokeWidth={1.5} />}
                                                        {activeItem.type === 'podcast' && <Mic className="w-16 h-16 text-white hover:scale-110 hover:text-gold-400 transition-all cursor-pointer shadow-black drop-shadow-xl" strokeWidth={1.5} />}
                                                        {activeItem.type === 'blog' && <FileText className="w-16 h-16 text-white hover:scale-110 hover:text-gold-400 transition-all cursor-pointer shadow-black drop-shadow-xl" strokeWidth={1.5} />}
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-left flex flex-col justify-center">
                                                    <span className="text-gold-600 font-sans font-bold uppercase tracking-widest text-[10px] mb-3 bg-gold-50 inline-block px-3 py-1 rounded-md self-start border border-gold-200">
                                                        {activeItem.type}
                                                    </span>
                                                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">{activeItem.title}</h2>
                                                    <div className="flex items-center gap-4 text-xs font-sans font-bold text-slate-500 mb-6 uppercase tracking-widest">
                                                        <span>{activeItem.date}</span>
                                                        <span>•</span>
                                                        <span>{activeItem.duration || activeItem.readTime}</span>
                                                    </div>
                                                    <p className="font-sans text-slate-700 leading-relaxed text-base md:text-lg mb-8">{activeItem.desc}</p>
                                                    
                                                    <button 
                                                        onClick={() => {
                                                            if (activeItem.type === 'blog') setReadingArticle(true);
                                                        }}
                                                        className="bg-slate-900 text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors self-start shadow-lg shadow-slate-900/20"
                                                    >
                                                        {activeItem.type === 'blog' ? 'Číst celý článek' : `Přehrát ${activeItem.type}`}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Related Items Section */}
                                            <div className="border-t border-slate-200 pt-10 text-left">
                                                <div className="flex justify-between items-end mb-8">
                                                    <h3 className="font-serif text-2xl text-slate-900">Další z kategorie </h3>
                                                    <button className="text-xs font-sans font-bold uppercase tracking-widest text-gold-600 hover:text-slate-900 transition-colors">Zobrazit vše</button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                                    {MEDIA_DATA[activeItem.type].map(item => (
                                                        <div 
                                                            key={item.id} 
                                                            onClick={() => {
                                                                setActiveItem(item);
                                                                setReadingArticle(false);
                                                            }}
                                                            className={`group cursor-pointer bg-white rounded-xl overflow-hidden border ${item.id === activeItem.id ? 'border-gold-400 ring-2 ring-gold-400' : 'border-slate-200'} shadow hover:shadow-xl transition-all hover:-translate-y-1 block`}
                                                        >
                                                            <div className="w-full aspect-[16/10] bg-slate-200 relative overflow-hidden">
                                                                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                                                                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border border-white/20">
                                                                    {item.duration || item.readTime}
                                                                </div>
                                                            </div>
                                                            <div className="p-5">
                                                                <h4 className="font-serif text-lg text-slate-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-1">{item.title}</h4>
                                                                <p className="font-sans text-slate-500 text-xs line-clamp-2 leading-relaxed">{item.desc}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="article"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full text-left"
                                        >
                                            <button 
                                                onClick={() => setReadingArticle(false)}
                                                className="mb-8 font-sans font-bold text-xs uppercase tracking-widest text-gold-600 hover:text-gold-500 flex items-center transition-colors px-4 py-2 border border-gold-200 rounded-lg hover:bg-gold-50"
                                            >
                                                &larr; Zpět na přehled
                                            </button>
                                            
                                            <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-10 shadow-2xl relative">
                                                <img src={activeItem.image} className="w-full h-full object-cover" alt={activeItem.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8 md:p-12">
                                                    <div>
                                                        <span className="text-gold-400 font-sans font-bold uppercase tracking-widest text-[10px] mb-3 block">
                                                            Příběhy z expedice
                                                        </span>
                                                        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-4 drop-shadow-lg">{activeItem.title}</h1>
                                                        <div className="flex items-center gap-4 text-xs font-sans font-medium text-slate-300 uppercase tracking-widest">
                                                            <span>{activeItem.date}</span>
                                                            <span className="opacity-50">•</span>
                                                            <span>{activeItem.readTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="max-w-3xl mx-auto px-4 md:px-0">
                                                <div className="prose prose-lg prose-slate prose-p:font-sans prose-p:leading-relaxed prose-p:text-slate-700 prose-p:mb-6 mx-auto">
                                                    <p className="text-xl md:text-2xl text-slate-800 font-medium font-serif leading-snug mb-8 bg-slate-50 p-6 rounded-2xl border-l-4 border-gold-400">
                                                        {activeItem.desc}
                                                    </p>
                                                    {activeItem.content && activeItem.content.map((paragraph, index) => (
                                                        <p key={index}>{paragraph}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Media;
