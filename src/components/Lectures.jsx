import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { Calendar, X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import BookingBg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc06903.jpg';
import Tour50Img from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';
import CollabImg from '../assets/zmensene/portrety/prednasky/dsc04123.jpg';

const LECTURES_LIST = [
    {
        id: 'osmitisicovky',
        title: '8 osmitisícovek',
        subtitle: 'Přednáška & Cestopis',
        duration: '60–90 min',
        audience: 'Veřejné akce, festivaly, korporáty',
        desc: 'Ucelený příběh o cestě na osm nejvyšších hor světa. Fotky a videa z expedic, lidé, kteří to umožnili, a momenty, které nelze přepsat.',
        highlights: ['Osmitisícovky v příbězích', 'Unikátní fotky z expedic', 'Q&A s Honzou'],
        image: Tour50Img,
    },
    {
        id: 'hory-leci',
        title: 'Hory mě léčily',
        subtitle: 'Osobní příběh & Osvěta',
        duration: '45–60 min',
        audience: 'Zdravotní konference, HR, média',
        desc: 'O rakovině, artritidě a o tom, jak hory pomohly najít nový směr. Přednáška, která je upřímná, vtipná i silná zároveň.',
        highlights: ['Osobní příběh diagnózy', 'Cesta zpátky přes hory', 'Spolupráce s Revma Ligou a Fuck Cancer'],
        image: CollabImg,
    },
    {
        id: 'leadership',
        title: 'Leadership nad mraky',
        subtitle: 'Motivační přednáška',
        duration: '60 min',
        audience: 'Firmy, management, teambuildинги',
        desc: 'Co nás osmitisícovky učí o vedení týmu, rozhodování pod tlakem a nalézání vlastní cesty. Příběhy z hranice lidských možností aplikované na byznys.',
        highlights: ['Vedení týmu v extrémech', 'Rozhodování pod tlakem', 'Osobní výkonnost a hranice'],
        image: Tour50Img,
    },
    {
        id: 'expedice-nepal',
        title: 'Nepál — druhý domov',
        subtitle: 'Cestopis & Kultura',
        duration: '60 min',
        audience: 'Geografické společnosti, cestovní agentury, školy',
        desc: 'Příběh o zemi, která se stala druhým domovem. Káthmándú, šerpové, kláštery a hory — Nepál očima člověka, který tam žije a pracuje.',
        highlights: ['Kultura a tradice Nepálu', 'Šerpové a horské komunity', 'Praktické rady pro cestovatele'],
        image: CollabImg,
    },
    {
        id: 'k2-manaslu',
        title: 'K2 & Manáslu',
        subtitle: 'Expedice v detailu',
        duration: '75–90 min',
        audience: 'Horolezecké kluby, outdoor komunity',
        desc: 'Detailní pohled na dvě z nejnáročnějších expedic. Logistika, tým, rozhodnutí ve výšce a momenty, kdy záleží na každém metru a každé vteřině.',
        highlights: ['Logistika osmitisícovkové expedice', 'Kritické momenty a rozhodnutí', 'Vybavení a příprava'],
        image: Tour50Img,
    },
    {
        id: 'jiz-jsme-neskoncili',
        title: 'Ještě jsme neskončili',
        subtitle: 'S Jiřím Langmajerem',
        duration: '90 min',
        audience: 'Veřejné akce, divadla, kulturní centra',
        desc: 'Speciální pořad s Jiřím Langmajerem — dvě silné osobnosti, jeden společný rozhovor o životě, odolnosti a tom, co nás drží nahoře.',
        highlights: ['Rozhovor Honza Tráva & Jiří Langmajer', 'Témata odolnosti a motivace', 'Interaktivní formát s publikem'],
        image: CollabImg,
    },
];

const Lectures = ({ scrollProgress }) => {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showLectureList, setShowLectureList] = useState(false);

    useScrollLock(open || selectedEvent || showLectureList);

    // PHASE 7: 0.59 -> 0.68 with hold
    const containerOpacity = useTransform(scrollProgress, [0.59, 0.62, 0.67, 0.71], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.59, 0.62, 0.67, 0.71], ["-120%", "0%", "0%", "120%"]);

    // Lightens the background as it exits
    const lightenOpacity = useTransform(scrollProgress, [0.64, 0.70], [0, 1]);

    const lectCarouselRef = useRef(null);
    const lectCarouselProgress = useTransform(scrollProgress, [0.62, 0.67], [0, 1]);
    useEffect(() => {
        return lectCarouselProgress.on("change", (latest) => {
            const el = lectCarouselRef.current;
            if (!el) return;
            const maxScroll = el.scrollWidth - el.clientWidth;
            el.scrollLeft = Math.max(0, Math.min(1, latest) * maxScroll);
        });
    }, [lectCarouselProgress]);

    const events = [
        { 
            id: 'tour50',
            city: "50 let tour", 
            venue: "únor–březen 2026", 
            date: "Velká přednášková tour",
            image: Tour50Img,
            description: "Jedinečná přednášková série k životnímu jubileu Honzy Trávy. Přijďte si poslechnout příběhy z osmi osmitisícovek, zjistit, jaké to je trávit desítky dní v extrémních podmínkách, a nasát motivaci pro vaše vlastní životní výzvy.",
            highlights: ["Příhody z 8 osmitisícovek", "Fotky a videa, která jste neviděli", "Osobní setkání a autogramiáda"]
        },
        { 
            id: 'collab',
            city: "Propojení s osobnostmi", 
            venue: "Petr Jan Juračka, Petr Horký, Jirka Langmajer, Marek Audy...", 
            date: "Spolupráce se zajímavými lidmi",
            image: CollabImg,
            description: "Hory spojují. Nejsme na to sami – tvoříme projekty s fantastickými lidmi z různých oborů. Ať už jde o natáčení dokumentů s Petrem Horkým, focení s Petrem Janem Juračkou nebo speciální expedice s Jiřím Langmajerem.",
            highlights: ["Dokumentární tvorba", "Unikátní expedice", "Sdílení syrových příběhů z hor"]
        }
    ];


    return (
        <>
            {/* BACKGROUND LAYER (behind clouds) */}
            <motion.div
                style={{ opacity: containerOpacity, zIndex: 40 }}
                className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-b from-[#1A202C] to-[#0F172A]"
            >
                {/* Visual: Peak view with clouds below */}
                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white/20 to-transparent blur-[60px] opacity-40" />
                
                {/* Lightening Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-[#f8f9fa]" 
                    style={{ opacity: lightenOpacity }} 
                />
            </motion.div>

            {/* CONTENT LAYER */}
            <motion.div
                style={{ opacity: containerOpacity, zIndex: 70 }}
                className="absolute inset-0 w-full h-full pointer-events-none"
            >
                <motion.div
                    style={{ y: containerY }}
                    className="w-full h-full"
                >
                    {/* ── Mobile layout: compact header + horizontal carousel ── */}
                    <div className="md:hidden w-full h-full flex flex-col justify-center px-4 pointer-events-auto gap-3">

                        {/* Mobile header */}
                        <div className="shrink-0 text-center">
                            <h4 className="text-gold-500 font-sans uppercase tracking-[0.25em] text-xs font-bold mb-1">
                                07 — Přednášky (7200 m)
                            </h4>
                            <h2 className="font-serif text-2xl text-white mb-1.5 leading-tight">
                                Přednášky & Spolupráce
                            </h2>
                            <p className="font-sans text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                                50 let tour 2026 · Projekty s osobnostmi · Booking
                            </p>
                        </div>

                        {/* Horizontal carousel */}
                        <div className="shrink-0 -mx-4 px-4">
                            <div
                                ref={lectCarouselRef}
                                className="flex gap-3 overflow-x-auto pb-2"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {events.map(event => (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedEvent(event)}
                                        className="shrink-0 snap-start w-[82vw] rounded-2xl overflow-hidden bg-white/95 border border-white/60 shadow-lg cursor-pointer active:scale-[0.98] transition-transform"
                                    >
                                        <div className="w-full aspect-[3/2] overflow-hidden relative">
                                            <img
                                                src={event.image}
                                                className="w-full h-full object-cover"
                                                alt={event.city}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-full">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {event.id === 'tour50' ? 'Turné 2026' : 'Projekty'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-serif text-lg text-slate-900 leading-tight mb-1">{event.city}</h3>
                                            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">{event.venue}</p>
                                            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{event.description}</p>
                                            <div className="flex items-center gap-1.5 text-gold-500 font-bold text-[10px] tracking-widest uppercase mt-3">
                                                Detail projektu <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile buttons row */}
                        <div className="shrink-0 flex gap-3 justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                                <button
                                    onClick={() => setOpen(true)}
                                    className="relative px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-white rounded-xl font-sans tracking-[0.15em] uppercase text-sm font-bold shadow-xl transition-all flex items-center gap-2"
                                >
                                    Booking
                                </button>
                            </div>
                            <button
                                onClick={() => setShowLectureList(true)}
                                className="px-5 py-3.5 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all"
                            >
                                Více přednášek
                            </button>
                        </div>
                    </div>

                    {/* ── Desktop layout: original content ── */}
                    <div className="hidden md:flex w-full h-full flex-col items-center justify-center px-6 pointer-events-auto">
                        <div className="w-full flex flex-col items-center justify-center origin-center transition-transform duration-300 [@media(max-height:1050px)_and_(min-width:768px)]:scale-[0.90] [@media(max-height:900px)_and_(min-width:768px)]:scale-[0.80] [@media(max-height:800px)_and_(min-width:768px)]:scale-[0.70] [@media(max-height:700px)_and_(min-width:768px)]:scale-[0.60] [@media(max-height:600px)_and_(min-width:768px)]:scale-[0.50]">
                            <div className="max-w-3xl w-full text-center relative z-20">
                                <h4 className="text-gold-500 font-sans uppercase tracking-[0.25em] text-xs font-bold mb-4">
                                    07 — Přednášky (7200 m)
                                </h4>
                                <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4 leading-tight">
                                    Přednášky & Spolupráce
                                </h2>
                                <p className="font-sans text-slate-300 text-base lg:text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                                    50 let tour (únor–březen 2026): Velká přednášková tour. Propojení s osobnostmi: Petr Jan Juračka (Něha Himálaje), Petr Horký, Jirka Langmajer (Jestejsmeneskoncili), Marek Audy, Petr Forman.
                                </p>
                            </div>

                            <div className="relative z-[70] max-w-6xl mx-auto w-full mb-8 mt-4">
                                <div className="grid grid-cols-2 gap-4 lg:gap-6 relative max-w-5xl mx-auto">
                                    {events.map(event => (
                                        <motion.div
                                            key={event.id}
                                            onClick={() => setSelectedEvent(event)}
                                            whileHover={{ y: -6 }}
                                            className="group bg-white/95 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/80 cursor-pointer flex flex-col relative"
                                        >
                                            <div className="w-full aspect-video overflow-hidden relative p-3 pb-0">
                                                <img
                                                    src={event.image}
                                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                                                    alt={event.city}
                                                />
                                                <div className="absolute top-5 left-5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-sm">
                                                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-gold-600 flex items-center gap-1.5">
                                                        <Calendar className="w-3 h-3" />
                                                        {event.id === 'tour50' ? 'Turné 2026' : 'Speciální projekty'}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-x-3 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-2xl" />
                                            </div>
                                            <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-serif text-2xl lg:text-3xl text-slate-900 mb-1.5 group-hover:text-gold-600 transition-colors">{event.city}</h3>
                                                    <p className="text-slate-500 font-sans text-xs font-bold uppercase tracking-widest mb-3">{event.venue}</p>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{event.description}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-gold-500 font-bold text-xs tracking-widest uppercase">
                                                    Detail projektu
                                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="max-w-4xl mx-auto mt-8 flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => setShowLectureList(true)}
                                        className="px-8 py-3.5 border border-white/20 text-white hover:text-white hover:border-white/50 hover:bg-white/10 rounded-xl font-sans tracking-[0.15em] uppercase text-xs font-bold transition-all flex items-center gap-2"
                                    >
                                        Více přednášek
                                    </button>
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                                        <button
                                            onClick={() => setOpen(true)}
                                            className="relative px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-white rounded-xl font-sans tracking-[0.15em] uppercase text-xs font-bold shadow-xl shadow-gold-900/10 transition-all flex items-center justify-center gap-2"
                                        >
                                            Booking & Kontakt
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden relative pointer-events-auto flex flex-col md:flex-row"
                    >
                        {/* Left Info Area */}
                        <div className="md:w-[40%] relative bg-slate-900 flex flex-col justify-between hidden md:flex">
                            <img src={BookingBg} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="Booking Background" />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
                            
                            <div className="relative z-10 p-10 flex flex-col h-full text-left">
                                <div>
                                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                                        Spolupráce
                                    </h4>
                                    <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-8">
                                        Pojďme to <span className="italic text-slate-400">vymyslet.</span>
                                    </h2>
                                    <p className="font-sans text-slate-300 leading-relaxed text-sm mb-10">
                                        Nezáleží, jestli jde o přednášku pro 500 lidí, menší firemní akci nebo speciální projekt. Ke každé akci přistupujeme osobně.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-white/10 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5 text-gold-400" /></div>
                                            <div>
                                                <h5 className="text-white font-serif text-lg mb-1">Motivační přednášky</h5>
                                                <p className="text-slate-400 text-xs leading-relaxed">Příběhy z velehor aplikované na byznys a osobní rozvoj.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-white/10 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5 text-gold-400" /></div>
                                            <div>
                                                <h5 className="text-white font-serif text-lg mb-1">Firemní akce</h5>
                                                <p className="text-slate-400 text-xs leading-relaxed">Teambuildingy s přesahem a unikátní atmosférou.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-white/10 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5 text-gold-400" /></div>
                                            <div>
                                                <h5 className="text-white font-serif text-lg mb-1">Ambasadorství</h5>
                                                <p className="text-slate-400 text-xs leading-relaxed">Dlouhodobá spolupráce se značkami, které dávají smysl.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <Mail className="w-4 h-4 text-gold-500" />
                                        <span>booking@honzatrava.cz</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Area */}
                        <div 
                            className="md:w-[60%] p-8 md:p-12 overflow-y-auto relative text-left flex flex-col overscroll-contain"
                            data-lenis-prevent
                        >
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-6 right-6 p-2 bg-slate-100/80 hover:bg-slate-200 rounded-full transition text-slate-600 z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2 mt-4">Napište nám</h3>
                            <p className="font-sans text-slate-600 mb-8 text-sm max-w-lg">
                                Vyplňte formulář a my se vám co nejdříve ozveme s možnostmi termínů a konkrétní nabídkou.
                            </p>

                            <form className="space-y-6 flex-1 flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Jméno / Firma</label>
                                        <input 
                                            className="w-full bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="Jan Novák" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">E-mail</label>
                                        <input 
                                            type="email"
                                            className="w-full bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="jan@firma.cz" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Typ spolupráce</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Přednáška', 'Firemní akce', 'Marketing', 'Jiné'].map((type, i) => (
                                            <label key={i} className="cursor-pointer">
                                                <input type="radio" name="booking-type" className="peer sr-only" defaultChecked={i === 0} />
                                                <div className="text-center p-3 rounded-xl border border-slate-200 bg-slate-50 peer-checked:bg-slate-900 peer-checked:border-slate-900 peer-checked:text-white text-slate-600 text-xs font-bold transition-all hover:border-slate-300">
                                                    {type}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Předpokládaný termín</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="Např. Podzim 2026" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Předpokládaný počet lidí</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none" 
                                            placeholder="Např. 150" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500">Detail poptávky</label>
                                    <textarea 
                                        className="w-full flex-1 min-h-[120px] bg-slate-50 border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl p-3.5 text-slate-800 text-sm transition-all outline-none resize-none" 
                                        placeholder="Popište nám stručně vaši představu, formát akce a další detaily..." 
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="group w-full md:w-auto flex justify-center items-center gap-3 bg-slate-900 text-white py-4 px-10 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-gold-600 transition shadow-lg shadow-slate-900/20"
                                    >
                                        Odeslat nezávaznou poptávku
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Detailed Project Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 md:p-6 pointer-events-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-[#fcfbf9] border border-white/60 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden relative flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-6 right-6 p-2 bg-slate-200/80 hover:bg-slate-300 rounded-full transition text-slate-600 z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Side */}
                            <div className="md:w-1/2 relative min-h-[250px] md:min-h-0">
                                <img src={selectedEvent.image} className="absolute inset-0 w-full h-full object-cover" alt={selectedEvent.title || selectedEvent.city} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                                {selectedEvent.duration && (
                                    <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                        {selectedEvent.duration}
                                    </div>
                                )}
                            </div>

                            {/* Content Side */}
                            <div
                                className="md:w-1/2 p-8 md:p-12 overflow-y-auto text-left flex flex-col justify-center overscroll-contain"
                                data-lenis-prevent
                            >
                                <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                                    {selectedEvent.subtitle || selectedEvent.date}
                                </h4>
                                <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-2 leading-tight">
                                    {selectedEvent.title || selectedEvent.city}
                                </h2>
                                {selectedEvent.audience && (
                                    <p className="font-sans text-slate-400 text-xs uppercase tracking-widest mb-6">{selectedEvent.audience}</p>
                                )}

                                <p className="font-sans text-slate-600 leading-relaxed mb-8">
                                    {selectedEvent.desc || selectedEvent.description}
                                </p>

                                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mb-8">
                                    <h5 className="font-serif text-slate-800 text-lg mb-4">A na co se těšit?</h5>
                                    <ul className="space-y-3">
                                        {selectedEvent.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start text-sm text-slate-600">
                                                <ArrowRight className="w-4 h-4 text-gold-500 mr-3 mt-0.5 shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedEvent(null);
                                        setOpen(true);
                                    }}
                                    className="w-full sm:w-auto self-start bg-slate-900 text-white font-sans tracking-[0.2em] uppercase text-xs font-bold py-4 px-8 rounded-xl hover:bg-gold-600 transition-colors shadow-lg shadow-slate-900/20"
                                >
                                    Mám zájem
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lecture List Modal */}
            <AnimatePresence>
                {showLectureList && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 md:p-6 pointer-events-auto"
                        onClick={() => setShowLectureList(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#fcfbf9] border border-white/60 shadow-2xl rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 shrink-0">
                                <div>
                                    <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Přednášky & Koncepty</h3>
                                    <p className="font-sans text-slate-500 text-xs mt-0.5 uppercase tracking-widest">Vyberte téma, klikněte pro detail</p>
                                </div>
                                <button
                                    onClick={() => setShowLectureList(false)}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Lecture grid */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 overscroll-contain" data-lenis-prevent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {LECTURES_LIST.map((lecture) => (
                                        <button
                                            key={lecture.id}
                                            onClick={() => {
                                                setShowLectureList(false);
                                                setSelectedEvent(lecture);
                                            }}
                                            className="group text-left bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-gold-300 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-full aspect-[16/7] overflow-hidden relative">
                                                <img
                                                    src={lecture.image}
                                                    alt={lecture.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                <div className="absolute bottom-3 left-4">
                                                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/80 bg-slate-900/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                                        {lecture.duration}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <p className="text-gold-600 font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{lecture.subtitle}</p>
                                                <h4 className="font-serif text-xl text-slate-900 mb-1.5 group-hover:text-gold-600 transition-colors">{lecture.title}</h4>
                                                <p className="font-sans text-slate-500 text-xs leading-relaxed line-clamp-2">{lecture.desc}</p>
                                                <div className="flex items-center gap-1.5 text-gold-500 font-bold text-[10px] tracking-widest uppercase mt-3">
                                                    Detail přednášky <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="px-8 py-5 border-t border-slate-100 shrink-0 flex items-center justify-between">
                                <p className="font-sans text-slate-500 text-xs">Nemůžete si vybrat? Rádi poradíme.</p>
                                <button
                                    onClick={() => { setShowLectureList(false); setOpen(true); }}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors"
                                >
                                    Booking & Kontakt
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default Lectures;
