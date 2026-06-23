import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { Calendar, X, Mail, CheckCircle2, ArrowRight, Mic, Building2, Users, Star, ExternalLink, ArrowLeft, Download } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { loadContent } from '../data/adminStore';
import EventCalendar from './EventCalendar';
import BookingBg  from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc06903.jpg';
import Tour50Img  from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';
import CollabImg  from '../assets/zmensene/portrety/prednasky/dsc04123.jpg';

/* ── Témata přednášek ── */
const TOPICS = [
    { id: 'nepal',   title: 'Nepálem křížem krážem',     subtitle: 'Cestopis & kultura' },
    { id: '5osmi',   title: '5 osmitisícovek',            subtitle: 'Expedice & příběhy' },
    { id: 'neha',    title: 'Něha Himálaje',              subtitle: 'S Petrem Janem Juračkou' },
    { id: 'ama',     title: 'Ama Dablam',                 subtitle: 'Horolezecká expedice' },
    { id: 'jeste',   title: 'Ještě jsme neskončili',      subtitle: 'S Jiřím Langmajerem' },
    { id: 'peak',    title: 'Peakfest stories',           subtitle: 'Festival & projekty' },
    { id: 'zdravi',  title: 'Zdraví a život s nemocí',    subtitle: 'Osvěta & osobní příběh' },
];

const TOPICS_DETAILS = {
    nepal: {
        description: 'Autentický pohled na zemi pod Himálajem očima člověka, který tam tráví velkou část roku. Přednáška vás provede nejen nejznámějšími trekovými trasami, ale zavede vás i do odlehlých vesnic, ukáže každodenní život místních obyvatel Šerpů a poodhalí kouzlo a chaos hlavního města Káthmándú.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Propagační plakát (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Kniha Nepál křížem krážem',
            desc: 'Autobiografický cestopis plný fotografií a zážitků z nepálských kopců a vesnic.'
        }
    },
    '5osmi': {
        description: 'Strhující povídání o pěti úspěšných výstupech na osmitisícové vrcholy bez použití přídavného kyslíku. O radosti z vrcholu, o extrémní únavě, o rozhodování v kritických situacích, o ztrátě kamarádů, ale i o tom, proč se do zóny smrti stále vracet.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Prezentace pro pořadatele (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Náramek 14 Summits',
            desc: 'Ručně vyráběný náramek z Nepálu na podporu místních dětí a škol.'
        }
    },
    neha: {
        description: 'Společný projekt Honzy Trávy a fotografa a vědce Petra Jana Juračky. Kontrast drsného světa vysokých hor a jemných, poetických detailů nepálské přírody a kultury zachycených špičkovou technikou i dronem.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Technický rider pro promítání (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Kalendář Něha Himálaje',
            desc: 'Nástěnný kalendář s velkoformátovými fotografiemi z nepálských expedic.'
        }
    },
    ama: {
        description: 'Ama Dablam je často označována za nejkrásnější horu světa. Tato přednáška mapuje expedici na tuto strmou a technicky náročnou dominantu údolí Khumbu. Od aklimatizace přes lezení v ledových stěnách až po vrcholové okamžiky s výhledem na Mount Everest.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Plakát Ama Dablam (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Kniha Ama Dablam a já',
            desc: 'Fotografická publikace věnovaná výstupu na nejkrásnější horu světa.'
        }
    },
    jeste: {
        description: 'Unikátní přednáška o tom, jak se populární český herec Jiří Langmajer vydal s Honzou Trávou do Himálaje překonat sám sebe. O humoru, o krizích, o chlapském přátelství a o tom, že posouvat své limity můžeme v každém věku.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Plakát s J. Langmajerem (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Triko "Ještě jsme neskončili"',
            desc: 'Limitovaná edice triček ze 100% bio bavlny s originálním horským motivem.'
        }
    },
    peak: {
        description: 'Představení příběhů z horského festivalu PEAKfest a dalších kulturně-komunitních aktivit na Jizerce. Projekce krátkých filmů, představení projektů a povídání o propojování komunit milovníků hor a přírody.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Programový leták PEAKfest (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Festivalový merch PEAKfest',
            desc: 'Čepice, plecháčky a drobnosti z limitované edice našeho horského festivalu.'
        }
    },
    zdravi: {
        description: 'Hluboce osobní a inspirativní přednáška o boji s vážnou nemocí (revmatoidní artritidou) a o tom, jak se nevzdat svých snů ani s fyzickým omezením. Honza sdílí své zkušenosti s léčbou, aklimatizací a návratem k expedicím.',
        downloads: [
            { label: 'Anotace přednášky (PDF)', url: '#' },
            { label: 'Osvětový leták Revma Liga (PDF)', url: '#' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80'
        ],
        merch: {
            title: 'Charitativní náramek Fuck Cancer',
            desc: 'Náramek na podporu organizace Fuck Cancer a osvěty o onkologických onemocněních.'
        }
    }
};

/* ── Pro koho ── */
const AUDIENCES = [
    { icon: <Users        className="w-3.5 h-3.5" />, label: 'Pro školy' },
    { icon: <Building2    className="w-3.5 h-3.5" />, label: 'Pro firmy' },
    { icon: <Mic          className="w-3.5 h-3.5" />, label: 'Veřejné přednášky' },
    { icon: <Star         className="w-3.5 h-3.5" />, label: 'Festivaly & projekty' },
];

/* ── Nadcházející akce (placeholder — bude doplněno z admin) ── */
const UPCOMING = [
    { date: 'Aktualizováno průběžně', title: 'Nadcházející přednášky', place: 'Viz kalendář', highlight: false },
];

/* ── Starší projekty (pro detail modal) ── */
const EVENTS_DETAIL = [
    {
        id: 'tour50',
        city: '50 let tour',
        venue: 'Česká republika, únor–březen 2026',
        date: 'Velká přednášková tour',
        image: Tour50Img,
        description: 'Velká přednášková tour k životnímu jubileu Honzy Trávy, která propojila hory, cestování, humor i obyčejné lidské příběhy z cest i života kolem nich. Napříč celou Českou republikou.',
        highlights: ['Osobní příběhy z expedic', 'Humor a lidskost', 'Q&A s publikem'],
    },
    {
        id: 'collab',
        city: 'Společné projekty',
        venue: 'Petr Jan Juračka · Petr Horký · Jiří Langmajer · Marek Audy · Petr Forman',
        date: 'Spolupráce s osobnostmi',
        image: CollabImg,
        description: 'Společné projekty s lidmi, jejichž pohled na svět je nám blízký — film a kniha Něha Himálaje, Messner v Česku, společné 3D projekce, projekt JeštěJsmeNeskončili nebo audiokniha a projekt #COPATUTOJE.',
        highlights: ['Film & kniha Něha Himálaje', '3D projekce s Markem Audym', 'JeštěJsmeNeskončili — Jiří Langmajer'],
    },
];

const Lectures = ({ scrollProgress }) => {
    const lenis = useLenis();
    const [bookingOpen, setBookingOpen]       = useState(false);
    const [selectedEvent, setSelectedEvent]   = useState(null);
    const [showTopics, setShowTopics]         = useState(false);
    const [selectedTopic, setSelectedTopic]   = useState(null);
    const [calendarOpen, setCalendarOpen]     = useState(false);

    const handleGoToMerch = () => {
        setShowTopics(false);
        setSelectedTopic(null);
        setTimeout(() => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            lenis?.scrollTo(totalHeight * 0.59, { duration: 1.4 });
        }, 150);
    };

    useScrollLock(bookingOpen || !!selectedEvent || showTopics || calendarOpen || !!selectedTopic);

    // PHASE 8: 0.63 → 0.72
    const containerOpacity = useTransform(scrollProgress, [0.62, 0.65, 0.67, 0.69], [0, 1, 1, 0]);
    const containerY       = useTransform(scrollProgress, [0.62, 0.65, 0.67, 0.69], ['-120%', '0%', '0%', '120%']);
    const lightenOpacity   = useTransform(scrollProgress, [0.67, 0.69], [0, 1]);

    return (
        <>
        {/* BACKGROUND — jen opacity, žádný Y pohyb */}
        <motion.div style={{ opacity: containerOpacity, zIndex: 40 }}
            className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Mobil: foto nahoře + tmavý panel dole — oba jen opacity */}
            <div className="md:hidden absolute inset-0">
                <img src={Tour50Img} className="absolute inset-0 w-full h-full object-cover object-top" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950" />
            </div>
            {/* Desktop: tmavý gradient */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#1A202C] to-[#0F172A]" />
            <div className="hidden md:block absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white/20 to-transparent blur-[60px] opacity-40" />
            <motion.div className="hidden md:block absolute inset-0 bg-[#f8f9fa]" style={{ opacity: lightenOpacity }} />
        </motion.div>

        {/* CONTENT */}
        <motion.div style={{ opacity: containerOpacity, zIndex: 70 }}
            className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div style={{ y: containerY }} className="w-full h-full">

                {/* ── Mobile — content slides in with Y, background image stays fixed ── */}
                <div className="md:hidden w-full h-full flex flex-col pointer-events-auto">

                    {/* Top area — průhledná, text přes background image */}
                    <div className="shrink-0 flex flex-col justify-end px-5 pb-3" style={{ height: '36%' }}>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
                        <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.4em] font-bold mb-1">
                            08 — Přednášky · 7200 m
                        </p>
                        <h2 className="font-serif text-2xl text-white leading-tight drop-shadow-lg">
                            Příběhy z hor, cest i <span className="italic text-gold-300">návratů.</span>
                        </h2>
                    </div>

                    {/* Obsah — průhledný, pozadí řeší background vrstva */}
                    <div className="flex-1 px-4 pt-3 pb-4 flex flex-col gap-2.5">

                        {/* Audience grid */}
                        <div className="grid grid-cols-2 gap-2">
                            {AUDIENCES.map((a, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white/[0.07] border border-white/[0.1] rounded-xl px-3 py-2">
                                    <span className="text-gold-400 shrink-0">{a.icon}</span>
                                    <span className="text-white/80 text-[11px] font-semibold leading-tight">{a.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Event teaser */}
                        <button onClick={() => setSelectedEvent(EVENTS_DETAIL[0])}
                            className="relative rounded-2xl overflow-hidden text-left"
                            style={{ height: 132 }}>
                            <img src={CollabImg} alt="Projekty"
                                className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
                            <div className="relative h-full flex items-center px-4 gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-gold-400 text-[8px] font-bold uppercase tracking-widest mb-0.5">50 let tour &amp; projekty</p>
                                    <p className="text-white font-serif text-sm leading-tight truncate">Langmajer, Horký, Juračka&hellip;</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gold-400 shrink-0" />
                            </div>
                        </button>

                        {/* Tlačítka — hned pod event teasererem */}
                        <div className="flex gap-2">
                            <button onClick={() => setShowTopics(true)}
                                className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.07] border border-white/[0.12] text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl active:scale-[0.97] transition-transform">
                                Témata <ArrowRight className="w-3 h-3" />
                            </button>
                            <button onClick={() => setCalendarOpen(true)}
                                className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.07] border border-white/[0.12] text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl active:scale-[0.97] transition-transform">
                                <Calendar className="w-3.5 h-3.5" /> Kalendář
                            </button>
                        </div>
                        <button onClick={() => setBookingOpen(true)}
                            className="flex items-center justify-center gap-2 bg-gold-500 text-slate-900 text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98] transition-transform">
                            Booking &amp; Kontakt <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* ── Desktop: premium split — foto hero vlevo, info vpravo ── */}
                <div className="hidden md:flex w-full h-full flex-col items-center justify-center px-6 lg:px-10 pointer-events-auto gap-4 lg:gap-5">

                    {/* Nadpis sekce */}
                    <div className="w-full max-w-6xl flex items-end justify-between shrink-0">
                        <div>
                            <p className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.45em] font-bold mb-2">08 — 7 200 m</p>
                            <h2 className="font-serif text-3xl lg:text-4xl text-white leading-none">
                                Přednášky <span className="italic text-slate-400">&amp; společné projekty.</span>
                            </h2>
                        </div>
                        <p className="font-sans text-slate-500 text-sm leading-relaxed max-w-xs text-right hidden lg:block">
                            Důležitá součást života kolem hor, Nepálu a cest — napříč celou republikou.
                        </p>
                    </div>

                    <div className="w-full max-w-6xl grid grid-cols-[1fr_1fr] gap-4 lg:gap-5 flex-1 min-h-0"
                        style={{ maxHeight: 'clamp(380px, 62vh, 500px)' }}>

                        {/* ── LEVÁ: foto hero karta ── */}
                        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                            {/* Background photo */}
                            <img src={Tour50Img} alt="Přednáška Honza Tráva"
                                className="absolute inset-0 w-full h-full object-cover object-center scale-105" />
                            {/* Rich gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-800/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
                            {/* Gold top accent */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-7 lg:p-9">
                                {/* Top label */}
                                <div>
                                    <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.45em] font-bold">08 — Přednášky · 7200 m</p>
                                </div>

                                {/* Bottom content */}
                                <div>
                                    <h2 className="font-serif text-3xl lg:text-4xl xl:text-[2.6rem] text-white leading-[1.1] mb-4">
                                        Příběhy z hor,<br/>cest i <span className="italic text-gold-300">návratů.</span>
                                    </h2>
                                    <p className="font-sans text-white/65 text-sm leading-relaxed mb-6 max-w-sm">
                                        Veřejné besedy, firemní akce, školy i festivaly — i obyčejné věci, které člověku cesty postupně dají.
                                    </p>

                                    {/* Audience pills (4) */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {AUDIENCES.map((a, i) => (
                                            <span key={i} className="inline-flex items-center gap-1.5 bg-white/[0.12] backdrop-blur-sm border border-white/20 text-white/85 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                                {a.icon} {a.label}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA row */}
                                    <div className="flex gap-2.5">
                                        <button onClick={() => setBookingOpen(true)}
                                            className="group flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 text-xs font-bold uppercase tracking-[0.15em] py-3.5 rounded-2xl transition-all shadow-[0_0_24px_rgba(212,175,55,0.35)]">
                                            Booking & Kontakt <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                        <button onClick={() => setShowTopics(true)}
                                            className="px-4 py-3.5 bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all">
                                            Témata
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── PRAVÁ: velká event karta + info strip ── */}
                        <div className="flex flex-col gap-3 lg:gap-4">

                            {/* Velká event karta — 50 let tour / projekty */}
                            <button onClick={() => setSelectedEvent(EVENTS_DETAIL[0])}
                                className="group relative rounded-[1.5rem] overflow-hidden flex-1 min-h-0 text-left"
                                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.55)' }}>
                                {/* Background image */}
                                <img src={CollabImg} alt="Společné projekty"
                                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700" />
                                {/* Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-800/10" />
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6">
                                    {/* Top: label */}
                                    <div className="flex items-start justify-between">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold-400 font-mono">Spolupráce & projekty</span>
                                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                                    </div>

                                    {/* Bottom: main content */}
                                    <div>
                                        <h3 className="font-serif text-xl lg:text-2xl text-white leading-tight mb-2">
                                            50 let tour & společné<br/><span className="italic text-slate-300">projekty s přáteli.</span>
                                        </h3>
                                        {/* Names */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {['Petr Jan Juračka', 'Jiří Langmajer', 'Petr Horký', 'Marek Audy'].map(n => (
                                                <span key={n} className="text-[9px] font-semibold text-white/60 bg-white/[0.08] border border-white/[0.1] rounded-full px-2.5 py-1">
                                                    {n}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-widest group-hover:gap-2.5 transition-all">
                                            Detail projektu <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </button>

                            {/* Spodní strip — témata + kalendář */}
                            <div className="shrink-0 grid grid-cols-2 gap-3">
                                {/* Témata */}
                                <button onClick={() => setShowTopics(true)}
                                    className="group relative rounded-2xl overflow-hidden text-left"
                                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.4)', minHeight: '100px' }}>
                                    <img src={Tour50Img} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />
                                    <div className="relative h-full flex flex-col justify-between p-4">
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-gold-400">{TOPICS.length} témat</span>
                                        <div>
                                            <p className="font-serif text-white text-[15px] leading-tight mb-1">Témata přednášek</p>
                                            <span className="inline-flex items-center gap-1 text-[9px] text-slate-400 group-hover:text-gold-400 font-bold uppercase tracking-widest transition-colors">
                                                Zobrazit <ArrowRight className="w-2.5 h-2.5" />
                                            </span>
                                        </div>
                                    </div>
                                </button>

                                {/* Kalendář + web */}
                                <div className="rounded-2xl bg-white/[0.06] border border-white/[0.1] flex flex-col justify-between p-4 gap-3">
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold-400 mb-2">Akce & termíny</p>
                                        <p className="text-slate-400 text-xs leading-relaxed">Aktuální termíny přednášek průběžně v kalendáři.</p>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <button onClick={() => setCalendarOpen(true)}
                                            className="flex items-center justify-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl transition-all">
                                            <Calendar className="w-3 h-3" /> Kalendář
                                        </button>
                                        <a href="https://www.honzatravnicek.cz/prednaska/" target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-gold-400 text-[10px] font-bold uppercase tracking-widest py-2 transition-colors">
                                            Nabídka & anotace <ExternalLink className="w-2.5 h-2.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>

        {/* ── Booking modal (original, zachován) ── */}
        <AnimatePresence>
            {bookingOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-6 pointer-events-auto"
                    onClick={() => setBookingOpen(false)}>
                    <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden relative flex flex-col md:flex-row">
                        <div className="md:w-[40%] relative bg-slate-900 hidden md:flex flex-col justify-between">
                            <img loading="lazy" src={BookingBg} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
                            <div className="relative z-10 p-10 flex flex-col h-full text-left">
                                <div>
                                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Spolupráce</h4>
                                    <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-8">Pojďme to <span className="italic text-slate-400">vymyslet.</span></h2>
                                    <p className="font-sans text-slate-300 leading-relaxed text-sm mb-10">Nezáleží, jestli jde o přednášku pro 500 lidí, menší firemní akci nebo speciální projekt. Ke každé akci přistupujeme osobně.</p>
                                    <div className="space-y-6">
                                        {[['Přednášky & Besedy', 'Příběhy z hor pro jakoukoli skupinu.'], ['Firemní akce', 'Teambuildingy a motivační večery.'], ['Festivaly & Speciální projekty', 'Unikátní formáty s hosty a přáteli.']].map(([t, d], i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="p-2 bg-white/10 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5 text-gold-400" /></div>
                                                <div><h5 className="text-white font-serif text-lg mb-1">{t}</h5><p className="text-slate-400 text-xs leading-relaxed">{d}</p></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <Mail className="w-4 h-4 text-gold-500" />
                                        <span>booking@honzatrava.cz</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-[60%] p-8 md:p-12 overflow-y-auto relative text-left flex flex-col overscroll-contain" data-lenis-prevent>
                            <button onClick={() => setBookingOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-100/80 hover:bg-slate-200 rounded-full transition text-slate-600 z-10"><X className="w-5 h-5" /></button>
                            <h3 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2 mt-4">Napište nám</h3>
                            <p className="font-sans text-slate-600 mb-8 text-sm max-w-lg">Vyplňte formulář a ozveme se s možnostmi termínů a konkrétní nabídkou.</p>
                            <form className="space-y-5 flex-1 flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[['Jméno / Firma', 'Jan Novák', 'text'], ['E-mail', 'jan@firma.cz', 'email']].map(([l, p, t], i) => (
                                        <div key={i} className="space-y-2">
                                            <label className="text-xs font-bold tracking-widest uppercase text-slate-500">{l}</label>
                                            <input type={t} className="w-full bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none" placeholder={p} />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Typ akce</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Přednáška', 'Firemní', 'Festival', 'Jiné'].map((type, i) => (
                                            <label key={i} className="cursor-pointer">
                                                <input type="radio" name="booking-type" className="peer sr-only" defaultChecked={i === 0} />
                                                <div className="text-center p-3 rounded-xl border border-slate-200 bg-slate-50 peer-checked:bg-slate-900 peer-checked:border-slate-900 peer-checked:text-white text-slate-600 text-xs font-bold transition-all">{type}</div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[['Předpokládaný termín', 'Podzim 2026'], ['Počet diváků', 'Např. 150']].map(([l, p], i) => (
                                        <div key={i} className="space-y-2">
                                            <label className="text-xs font-bold tracking-widest uppercase text-slate-500">{l}</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none" placeholder={p} />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Detail poptávky</label>
                                    <textarea className="w-full flex-1 min-h-[100px] bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none resize-none" placeholder="Popište stručně vaši představu a formát akce..." />
                                </div>
                                <button type="button" onClick={() => setBookingOpen(false)}
                                    className="group w-full md:w-auto flex justify-center items-center gap-3 bg-slate-900 text-white py-4 px-10 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-gold-600 transition shadow-lg">
                                    Odeslat nezávaznou poptávku <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── Témata přednášek modal ── */}
        <AnimatePresence>
            {showTopics && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 md:p-8 pointer-events-auto"
                    onClick={() => { setShowTopics(false); setSelectedTopic(null); }}>
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 16, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#fcfbf9] border border-white/60 shadow-2xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
                        {selectedTopic ? (
                            /* ── Topic Detail View ── */
                            <div className="flex flex-col h-full max-h-[90vh]">
                                <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
                                    <button
                                        onClick={() => setSelectedTopic(null)}
                                        className="flex items-center gap-2 text-slate-500 hover:text-slate-950 text-xs font-bold uppercase tracking-widest transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Zpět na témata
                                    </button>
                                    <button onClick={() => { setSelectedTopic(null); setShowTopics(false); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 overscroll-contain text-left" data-lenis-prevent>
                                    <p className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-1">{selectedTopic.subtitle}</p>
                                    <h3 className="font-serif text-3xl text-slate-950 mb-6">{selectedTopic.title}</h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-serif text-lg text-slate-900 mb-2 font-bold">Anotace přednášky</h4>
                                            <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed">{TOPICS_DETAILS[selectedTopic.id]?.description}</p>
                                        </div>
                                        
                                        {/* Materials to download */}
                                        <div>
                                            <h4 className="font-serif text-lg text-slate-900 mb-3 font-bold">Materiály ke stažení</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {TOPICS_DETAILS[selectedTopic.id]?.downloads.map((dl, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={dl.url}
                                                        onClick={(e) => { e.preventDefault(); alert(`Stahování: ${dl.label}`); }}
                                                        className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-gold-50 border border-slate-100 hover:border-gold-300 rounded-xl transition-all group"
                                                    >
                                                        <span className="text-xs font-bold text-slate-700 group-hover:text-gold-950">{dl.label}</span>
                                                        <Download className="w-4 h-4 text-slate-400 group-hover:text-gold-600 shrink-0 pointer-events-none" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recommended Merch */}
                                        {TOPICS_DETAILS[selectedTopic.id]?.merch && (
                                            <div className="p-5 bg-gold-50 border border-gold-200/60 rounded-2xl">
                                                <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700 mb-1">Doporučený Merch k přednášce</h5>
                                                <h4 className="font-serif text-base text-gold-950 font-bold mb-1">{TOPICS_DETAILS[selectedTopic.id].merch.title}</h4>
                                                <p className="font-sans text-xs text-gold-800 leading-relaxed mb-4">{TOPICS_DETAILS[selectedTopic.id].merch.desc}</p>
                                                <button
                                                    onClick={handleGoToMerch}
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-lg transition-all"
                                                >
                                                    Zobrazit v E-shopu <ArrowRight className="w-3.5 h-3.5 pointer-events-none" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Photo grid */}
                                        <div>
                                            <h4 className="font-serif text-lg text-slate-900 mb-3 font-bold">Fotografie z přednášky / cest</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {TOPICS_DETAILS[selectedTopic.id]?.photos.map((photoUrl, pIdx) => (
                                                    <div key={pIdx} className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                                        <img src={photoUrl} alt={`${selectedTopic.title} ${pIdx + 1}`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* ── Original Topics List View ── */
                            <>
                                <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
                                    <div>
                                        <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Přednášky & Témata</h3>
                                        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">{TOPICS.length} přednášek · klikněte pro detail</p>
                                    </div>
                                    <button onClick={() => setShowTopics(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"><X className="w-5 h-5" /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 overscroll-contain" data-lenis-prevent>
                                    <div className="grid grid-cols-1 gap-2">
                                        {TOPICS.map((t, i) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setSelectedTopic(t)}
                                                className="w-full flex items-center gap-4 p-4 bg-white border border-slate-100 hover:border-gold-300 rounded-2xl hover:shadow-md transition-all text-left group"
                                            >
                                                <span className="font-mono text-[11px] text-slate-300 font-black w-5 shrink-0 group-hover:text-gold-500">0{i+1}</span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-serif text-slate-950 text-[15px] leading-tight font-bold group-hover:text-gold-600 transition-colors">{t.title}</p>
                                                    <p className="text-gold-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">{t.subtitle}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-gold-600 group-hover:translate-x-1 transition-all shrink-0 pointer-events-none" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-7 py-5 border-t border-slate-100 shrink-0 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-400">Vyberte téma přednášky pro detaily.</span>
                                    <button onClick={() => { setShowTopics(false); setBookingOpen(true); }}
                                        className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold-600 transition">
                                        Booking & Kontakt
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── Event detail modal ── */}
        <AnimatePresence>
            {selectedEvent && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 md:p-8 pointer-events-auto"
                    onClick={() => setSelectedEvent(null)}>
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 16, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#fcfbf9] border border-white/60 shadow-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
                        <button onClick={() => setSelectedEvent(null)} className="absolute top-5 right-5 p-2 bg-slate-200/80 hover:bg-slate-300 rounded-full text-slate-600 z-10 transition"><X className="w-5 h-5" /></button>
                        <div className="md:w-1/2 relative min-h-[220px]">
                            <img loading="lazy" src={selectedEvent.image} className="absolute inset-0 w-full h-full object-cover" alt={selectedEvent.city} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto flex flex-col justify-center overscroll-contain" data-lenis-prevent>
                            <p className="text-gold-600 font-mono text-[9px] uppercase tracking-[0.4em] font-bold mb-3">{selectedEvent.date}</p>
                            <h2 className="font-serif text-3xl text-slate-900 mb-2 leading-tight">{selectedEvent.city}</h2>
                            <p className="text-slate-400 text-xs uppercase tracking-widest mb-5">{selectedEvent.venue}</p>
                            <p className="font-sans text-slate-600 leading-relaxed mb-6 text-sm">{selectedEvent.description}</p>
                            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl mb-6">
                                <ul className="space-y-2.5">
                                    {selectedEvent.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                            <ArrowRight className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => { setSelectedEvent(null); setBookingOpen(true); }}
                                className="self-start bg-slate-900 hover:bg-gold-600 text-white font-sans tracking-[0.2em] uppercase text-xs font-bold py-4 px-8 rounded-xl transition shadow-lg">
                                Mám zájem
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Calendar Modal */}
        <AnimatePresence>
            {calendarOpen && <EventCalendar onClose={() => setCalendarOpen(false)} />}
        </AnimatePresence>
        </>
    );
};

export default Lectures;
