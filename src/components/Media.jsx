import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (activeItem || readingArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeItem, readingArticle]);

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
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none bg-[#f8f9fa]"
        >
            <div className="relative z-10 max-w-7xl w-full px-0 md:px-12 py-0 md:py-12 lg:py-16 mx-auto pointer-events-auto flex flex-col justify-start md:justify-center h-full origin-top transition-transform duration-300 [@media(max-width:767px)]:scale-[0.72] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.85] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.75] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.65] pt-8 md:pt-0">
                <div className="text-center mb-4 md:mb-12 mt-0 md:mt-0 shrink-0 px-6">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-2 md:mb-4">
                        07 — Média &amp; Obsah
                    </h4>
                    <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl text-slate-900 leading-tight mb-2 md:mb-6">
                        Příběhy, které se<br className="hidden md:block" /> do batohu nevešly
                    </h2>
                    <p className="max-w-xl mx-auto font-sans text-slate-600 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                        Nezávislost na sítích. Prozkoumejte expedice, Nepál i zákulisí v našich třech formátech.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 lg:gap-10 relative w-full items-start px-4 md:px-0">
                    {/* Video Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        onClick={() => setActiveItem(MEDIA_DATA.video[0])} 
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div className="w-full h-[70px] md:aspect-[4/3] md:h-auto rounded-xl md:rounded-[2rem] overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 mb-1 md:mb-4 bg-white border border-slate-100 flex-shrink-0">
                            <img src={MEDIA_DATA.video[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Video" />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                    <Play className="w-3 h-3 md:w-6 md:h-6 ml-0.5" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-white/95 backdrop-blur-md px-1.5 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-slate-900 shadow-sm">
                                YouTube
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h3 className="font-serif text-[13px] md:text-2xl lg:text-3xl text-slate-900 group-hover:text-gold-600 transition-colors leading-tight">Vlogy a expedice</h3>
                            <span className="text-gold-500 text-[11px] font-bold font-sans ml-2 hidden md:inline">→</span>
                        </div>
                        <p className="hidden md:block text-slate-500 text-xs md:text-sm text-center leading-relaxed mt-1">Máte obsah, je potřeba systematicky publikovat.</p>
                    </motion.div>

                    {/* Podcast Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => setActiveItem(MEDIA_DATA.podcast[0])} 
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div className="w-full h-[70px] md:aspect-[4/3] md:h-auto rounded-xl md:rounded-[2rem] overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 mb-1 md:mb-4 bg-white border border-slate-100 flex-shrink-0">
                            <img src={MEDIA_DATA.podcast[0].image} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" alt="Podcast" />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                    <Mic className="w-3 h-3 md:w-6 md:h-6" />
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-white/95 backdrop-blur-md px-1.5 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-slate-900 shadow-sm">
                                Podcast
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h3 className="font-serif text-[13px] md:text-2xl lg:text-3xl text-slate-900 group-hover:text-gold-600 transition-colors leading-tight">Poslech na cestách</h3>
                            <span className="text-gold-500 text-[11px] font-bold font-sans ml-2 hidden md:inline">→</span>
                        </div>
                        <p className="hidden md:block text-slate-500 text-xs md:text-sm text-center leading-relaxed mt-1">Cestovatelská témata a hosté (2027).</p>
                    </motion.div>

                    {/* Blog Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        onClick={() => setActiveItem(MEDIA_DATA.blog[0])} 
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div className="w-full h-[70px] md:aspect-[4/3] md:h-auto rounded-xl md:rounded-[2rem] overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 mb-1 md:mb-4 bg-white border border-slate-100 flex-shrink-0">
                            <img src={MEDIA_DATA.blog[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog" />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                    <FileText className="w-3 h-3 md:w-6 md:h-6" />
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-white/95 backdrop-blur-md px-1.5 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-slate-900 shadow-sm">
                                Blog
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h3 className="font-serif text-[13px] md:text-2xl lg:text-3xl text-slate-900 group-hover:text-gold-600 transition-colors leading-tight">Psané příběhy</h3>
                            <span className="text-gold-500 text-[11px] font-bold font-sans ml-2 hidden md:inline">→</span>
                        </div>
                        <p className="hidden md:block text-slate-500 text-xs md:text-sm text-center leading-relaxed mt-1">Osobní deníky a zápisky z expedic.</p>
                    </motion.div>
                </div>
            </div>

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
