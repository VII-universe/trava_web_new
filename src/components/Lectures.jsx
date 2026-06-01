import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { Calendar, X, Mail, CheckCircle2, ArrowRight, Mic, Building2, Users, Star, ExternalLink } from 'lucide-react';
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
    const [bookingOpen, setBookingOpen]       = useState(false);
    const [selectedEvent, setSelectedEvent]   = useState(null);
    const [showTopics, setShowTopics]         = useState(false);
    const [calendarOpen, setCalendarOpen]     = useState(false);

    useScrollLock(bookingOpen || !!selectedEvent || showTopics || calendarOpen);

    // PHASE 8: 0.63 → 0.72
    const containerOpacity = useTransform(scrollProgress, [0.62, 0.65, 0.67, 0.69], [0, 1, 1, 0]);
    const containerY       = useTransform(scrollProgress, [0.62, 0.65, 0.67, 0.69], ['-120%', '0%', '0%', '120%']);
    const lightenOpacity   = useTransform(scrollProgress, [0.67, 0.69], [0, 1]);

    return (
        <>
        {/* BACKGROUND */}
        <motion.div style={{ opacity: containerOpacity, zIndex: 40 }}
            className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-b from-[#1A202C] to-[#0F172A]">
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white/20 to-transparent blur-[60px] opacity-40" />
            <motion.div className="absolute inset-0 bg-[#f8f9fa]" style={{ opacity: lightenOpacity }} />
        </motion.div>

        {/* CONTENT */}
        <motion.div style={{ opacity: containerOpacity, zIndex: 70 }}
            className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div style={{ y: containerY }} className="w-full h-full">

                {/* ── Mobile ── */}
                <div className="md:hidden w-full h-full flex flex-col justify-center px-4 pointer-events-auto gap-4">
                    <div className="shrink-0 text-center">
                        <p className="text-gold-500 font-sans uppercase tracking-[0.25em] text-[10px] font-bold mb-1">08 — Přednášky</p>
                        <h2 className="font-serif text-2xl text-white mb-1.5 leading-tight">Příběhy z hor, cest<br/>i <span className="italic text-slate-400">návratů.</span></h2>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                            Veřejné besedy, firemní akce, školy i festivaly.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 shrink-0">
                        {AUDIENCES.map((a, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2.5">
                                <span className="text-gold-400">{a.icon}</span>
                                <span className="text-white/80 text-xs font-semibold leading-tight">{a.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="shrink-0 flex flex-col gap-2">
                        <button onClick={() => setShowTopics(true)}
                            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all">
                            Témata přednášek <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setCalendarOpen(true)}
                            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all">
                            <Calendar className="w-4 h-4" /> Kalendář akcí
                        </button>
                        <button onClick={() => setBookingOpen(true)}
                            className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg">
                            Booking & Kontakt
                        </button>
                    </div>
                </div>

                {/* ── Desktop: premium split — foto hero vlevo, info vpravo ── */}
                <div className="hidden md:flex w-full h-full items-center justify-center px-6 lg:px-10 pointer-events-auto">
                    <div className="w-full max-w-6xl grid grid-cols-[1fr_1fr] gap-4 lg:gap-5"
                        style={{ height: 'clamp(460px, 74vh, 590px)' }}>

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

                        {/* ── PRAVÁ: info + akce ── */}
                        <div className="flex flex-col gap-3 lg:gap-4">

                            {/* Témata přednášek — compact grid */}
                            <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.1] rounded-[1.5rem] p-5 lg:p-6 flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.35em] font-bold">Témata přednášek</p>
                                    <a href="https://www.honzatravnicek.cz/prednaska/" target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-gold-400 text-[9px] font-bold uppercase tracking-widest transition-colors">
                                        Anotace <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                                <div className="space-y-1.5">
                                    {TOPICS.map((t, i) => (
                                        <button key={t.id} onClick={() => setShowTopics(true)}
                                            className="group w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/[0.08] transition-all duration-200">
                                            <span className="font-mono text-[10px] text-slate-600 font-black w-4 shrink-0">0{i+1}</span>
                                            <span className="font-sans text-white/85 text-sm font-medium flex-1 group-hover:text-white transition-colors">{t.title}</span>
                                            <span className="text-[9px] text-slate-500 font-medium shrink-0 hidden lg:block">{t.subtitle}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Akce + kalendář */}
                            <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.1] rounded-[1.5rem] p-5 lg:p-6 shrink-0">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.35em] font-bold">Akce & turné</p>
                                    <button onClick={() => setCalendarOpen(true)}
                                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-gold-400 text-[9px] font-bold uppercase tracking-widest transition-colors">
                                        <Calendar className="w-3 h-3" /> Kalendář
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {EVENTS_DETAIL.map(ev => (
                                        <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                                            className="group flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.07] hover:border-gold-500/25 rounded-xl p-3 transition-all text-left">
                                            <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0">
                                                <img loading="lazy" src={ev.image} alt={ev.city}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white/90 text-[13px] font-semibold leading-tight truncate">{ev.city}</p>
                                                <p className="text-slate-500 text-[10px] mt-0.5 truncate">{ev.venue.split('·')[0]}</p>
                                            </div>
                                            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-gold-400 shrink-0 transition-colors" />
                                        </button>
                                    ))}
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
                    onClick={() => setShowTopics(false)}>
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 16, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#fcfbf9] border border-white/60 shadow-2xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Přednášky & Témata</h3>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">{TOPICS.length} přednášek · anotace na webu</p>
                            </div>
                            <button onClick={() => setShowTopics(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 overscroll-contain" data-lenis-prevent>
                            <div className="space-y-2">
                                {TOPICS.map((t, i) => (
                                    <div key={t.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-gold-200 hover:shadow-sm transition-all">
                                        <span className="font-mono text-[11px] text-slate-300 font-black w-5 shrink-0">0{i+1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-serif text-slate-900 text-[15px] leading-tight">{t.title}</p>
                                            <p className="text-gold-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">{t.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-7 py-5 border-t border-slate-100 shrink-0 flex items-center justify-between gap-3">
                            <a href="https://www.honzatravnicek.cz/prednaska/" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 text-xs font-bold uppercase tracking-widest transition-colors">
                                Anotace & rezervace <ExternalLink className="w-3 h-3" />
                            </a>
                            <button onClick={() => { setShowTopics(false); setBookingOpen(true); }}
                                className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold-600 transition">
                                Booking & Kontakt
                            </button>
                        </div>
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
