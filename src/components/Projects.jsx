import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { ArrowRight, X, ExternalLink } from 'lucide-react';
import { loadContent } from '../data/adminStore';
import { resolveImageSrc } from '../data/imageStore';
import EventCalendar from './EventCalendar';

import PjjImg    from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6384-edit.jpg';
import HorkyImg  from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240728_131841.jpg';
import LangosImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240715_133229.jpg';
import AudyImg   from '../assets/zmensene/portrety/expedice_a_treky/dsc06947.jpg';
import FormanImg from '../assets/zmensene/kathmandu/dsc08157.jpg';
import JesteImg  from '../assets/zmensene/projekty/jeste_jsme_neskoncili/20240806_151350.jpg';
import NehaImg   from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc07645.jpg';
import DalsiImg  from '../assets/zmensene/skupinky/whatsapp_image_2025-06-15_at_18_53_30__2_.jpg';
import TourImg   from '../assets/zmensene/portrety/prednasky/1r2a2034.jpg';

function ModalSlider({ images, fallback, className = '' }) {
    const all = images?.length ? images : (fallback ? [fallback] : []);
    const [idx, setIdx] = useState(0);
    if (!all.length) return null;
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img loading="lazy" src={all[idx]} alt="" className="w-full h-full object-cover" />
            {all.length > 1 && <>
                <button onClick={(e) => { e.stopPropagation(); setIdx(i => (i-1+all.length)%all.length); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full z-10">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIdx(i => (i+1)%all.length); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full z-10">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </>}
        </div>
    );
}

const PROJECTS = [
    {
        id: 'peakfest',
        title: 'Peakfest',
        subtitle: 'Festival workshopů & přednášek',
        image: DalsiImg,
        description: 'Víkend plný workshopů a přednášek. Tipy a vychytávky na vybavení nejen do extrémních podmínek. Praktické ukázky první pomoci, pokec na téma dýchání, výšková nemoc a aklimatizace, doporučení věcí na treky a mnoho dalších netradičních témat.',
        highlights: ['Workshopy a přednášky pro komunitu', 'Vybavení do extrémních podmínek', 'První pomoc & aklimatizace'],
        link: 'https://peakfest.cz',
        featured: true,
        accentColor: 'from-amber-950/90',
    },
    {
        id: 'jsmeneskoncili',
        title: 'Ještě jsme neskončili',
        subtitle: 'Horký · Langmajer · Votava · Baran',
        image: JesteImg,
        description: 'Padesátníci stoupají nejen do hor. Co se stane, pokud si člověk chce plnit sny nehledě na věku. Projekt o životních pádech, návratech a síle jít dál.',
        highlights: ['Projekt 4 silných osobností', 'Příběhy o odolnosti a smyslu', 'Touring po celé ČR'],
        link: 'https://jestejsmeneskoncili.cz',
        featured: true,
        accentColor: 'from-slate-950/95',
    },
    {
        id: 'pjj',
        title: 'Petr Jan Juračka',
        subtitle: 'Film · Kniha · Budoucí projekty',
        image: PjjImg,
        description: 'Společné expedice, film Něha Himálaje i dlouholeté přátelství kolem hor a cest. Projekty budoucí — přelet Annapurny v balónu.',
        highlights: ['Film a kniha Něha Himálaje', 'Přelet Annapurny v balónu', 'Dlouholeté přátelství'],
        link: 'https://petr.juracka.eu',
        featured: false,
    },
    {
        id: 'horky',
        title: 'Petr Horký',
        subtitle: 'Filmy · Tiji Festival · Neskončili',
        image: HorkyImg,
        description: 'Messner, dokument z Tiji Festivalu (ve střižně) a společný projekt Ještě jsme neskončili.',
        highlights: ['Dokument Messner', 'Tiji Festival', 'Ještě jsme neskončili'],
        link: null,
        featured: false,
    },
    {
        id: 'audy',
        title: 'Marek Audy',
        subtitle: '3D projekce · Multimediální projekty',
        image: AudyImg,
        description: '3D projekce a společné multimediální projekty přibližující hory novým způsobem.',
        highlights: ['3D projekce z expedic', 'Multimediální prezentace', 'Nové formáty zážitků'],
        link: null,
        featured: false,
    },
    {
        id: 'forman',
        title: 'Petr Forman',
        subtitle: 'Divadlo · Audiokniha · COPATUTOJE',
        image: FormanImg,
        description: 'Divadlo, audiokniha a regionální projekt COPATUTOJE.',
        highlights: ['Audiokniha Něha Himálaje', 'Divadelní fúze', 'COPATUTOJE'],
        link: null,
        featured: false,
    },
    {
        id: 'neha',
        title: 'Něha Himálaje',
        subtitle: 'Kniha · Film · Audio s PJJ',
        image: NehaImg,
        description: 'Multimediální projekt mapující lidskou i horolezeckou tvář himálajských expedic.',
        highlights: ['Knižní publikace', 'Dokumentární film', 'Audiokniha'],
        link: null,
        featured: false,
    },
    {
        id: 'langos',
        title: 'Jiří Langmajer',
        subtitle: 'Přednášky · Ještě jsme neskončili',
        image: LangosImg,
        description: 'Netradiční spojení světa hor a divadla. Společné přednášky a projekt Jestejsmeneskoncili.',
        highlights: ['Společné přednášky', 'JesteJsmeNeskoncili'],
        link: null,
        featured: false,
    },
    {
        id: 'tour2026',
        title: '50 let tour',
        subtitle: 'Únor–březen 2026 · celá ČR',
        image: TourImg,
        description: 'Velkolepá oslava 50. narozenin Honzy Trávy. Turné plné nejlepších příběhů, hostů a překvapení.',
        highlights: ['Republikové turné', 'Nejlepší historky', 'Hosté & překvapení'],
        link: null,
        featured: false,
    },
];

/* Karty přijedou se staggerem */
const gridV   = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const cardV   = { hidden: { opacity: 0, y: 20, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 22, stiffness: 280 } } };

const Projects = ({ scrollProgress }) => {
    const adminProjects = loadContent('projects', null);
    const projects = adminProjects
        ? PROJECTS.map(p => ({ ...p, ...(adminProjects.find(a => a.id === p.id) || {}) }))
              .concat(adminProjects.filter(a => !PROJECTS.find(p => p.id === a.id)))
        : PROJECTS;

    const featured = projects.filter(p => p.featured);
    const persons  = projects.filter(p => !p.featured).slice(0, 5);

    const [selected, setSelected]             = useState(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    useScrollLock(!!selected || showAllProjects);

    const containerOpacity = useTransform(scrollProgress, [0.71, 0.74, 0.77, 0.80], [0, 1, 1, 0]);
    const containerY       = useTransform(scrollProgress, [0.71, 0.74, 0.77, 0.80], ['-120%', '0%', '0%', '130%']);

    return (
        <>
        <motion.div style={{ opacity: containerOpacity, y: containerY, zIndex: 40 }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#1A202C] to-[#0F172A]" />

        <motion.div style={{ opacity: containerOpacity, y: containerY, zIndex: 70 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 pointer-events-none">
                <div className="w-full max-w-6xl pointer-events-auto origin-center transition-transform duration-300
                    [@media(max-width:767px)]:scale-100
                    [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.88]
                    [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.78]
                    [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.68]">

                    {/* ── Desktop layout ── */}
                    <div className="hidden md:block">

                        {/* Header — editorial split */}
                        <div className="grid grid-cols-[1fr_1fr] gap-8 mb-6 items-end">
                            <div>
                                <p className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.45em] font-bold mb-3">09 — Projekty & spolupráce</p>
                                <h2 className="font-serif text-4xl lg:text-5xl text-white leading-[1.05]">
                                    Věci, které vznikly<br/>
                                    <span className="italic text-slate-400">na naší cestě.</span>
                                </h2>
                            </div>
                            <div className="pb-1">
                                <p className="font-sans text-slate-300 text-sm lg:text-base leading-relaxed">
                                    Ne všechno důležité končí návratem z hor. Některé příběhy pokračují dál — ve filmech, knihách, festivalech nebo společných projektech s lidmi, které jsme na cestě potkali.
                                </p>
                            </div>
                        </div>

                        {/* Featured projects row (2 large cards) */}
                        <motion.div
                            variants={gridV} initial="hidden" animate="visible"
                            className="grid grid-cols-2 gap-3 lg:gap-4 mb-3">
                            {featured.map(p => (
                                <motion.button key={p.id} variants={cardV}
                                    onClick={() => setSelected(p)}
                                    whileHover={{ y: -5, scale: 1.015, transition: { type: 'spring', damping: 20, stiffness: 300 } }}
                                    whileTap={{ scale: 0.99 }}
                                    className="group relative text-left rounded-2xl overflow-hidden"
                                    style={{ height: 'clamp(160px, 22vh, 210px)', boxShadow: '0 16px 50px rgba(0,0,0,0.5)' }}>
                                    <img src={resolveImageSrc(p) || p.image} alt={p.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${p.accentColor || 'from-slate-950/90'} via-slate-950/55 to-transparent`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                                    {/* Gold top line */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold-400/80 via-gold-400/40 to-transparent" />

                                    <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6">
                                        <div className="flex items-start justify-between">
                                            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold-400 font-mono">{p.subtitle}</span>
                                            {p.link && <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-gold-400 transition-colors" />}
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight mb-2">{p.title}</h3>
                                            <p className="text-white/60 text-sm leading-snug line-clamp-2 max-w-sm">{p.description}</p>
                                            <div className="flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Detail <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Person cards row (3-5 smaller) */}
                        <motion.div
                            variants={gridV} initial="hidden" animate="visible"
                            className="grid grid-cols-5 gap-2.5 lg:gap-3">
                            {persons.slice(0,5).map(p => (
                                <motion.button key={p.id} variants={cardV}
                                    onClick={() => setSelected(p)}
                                    whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', damping: 20, stiffness: 300 } }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative text-left rounded-2xl overflow-hidden"
                                    style={{ height: 'clamp(110px, 15vh, 148px)', boxShadow: '0 8px 30px rgba(0,0,0,0.45)' }}>
                                    <img src={resolveImageSrc(p) || p.image} alt={p.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-108 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent" />
                                    {/* Hover gold border */}
                                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold-500/40 transition-colors duration-300" />

                                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-3.5">
                                        <p className="font-serif text-white text-sm leading-tight group-hover:text-gold-300 transition-colors">{p.title}</p>
                                        <p className="text-slate-500 text-[9px] uppercase tracking-wider mt-0.5 line-clamp-1">{p.subtitle}</p>
                                        {p.link && (
                                            <ExternalLink className="w-2.5 h-2.5 text-gold-500/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Bottom CTA */}
                        <div className="flex justify-end mt-3 lg:mt-4">
                            <button onClick={() => setShowAllProjects(true)}
                                className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                                Všechny projekty ({projects.length}) <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* ── Mobile layout ── */}
                    <div className="md:hidden">
                        <div className="mb-4 text-center">
                            <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.4em] font-bold mb-2">09 — Projekty</p>
                            <h2 className="font-serif text-2xl text-white leading-tight mb-2">
                                Věci, které vznikly<br/><span className="italic text-slate-400">na naší cestě.</span>
                            </h2>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                                Filmy, knihy, festivaly a společné projekty s lidmi, které jsme potkali.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {projects.slice(0, 6).map(p => (
                                <button key={p.id} onClick={() => setSelected(p)}
                                    className="group relative text-left rounded-2xl overflow-hidden aspect-video">
                                    <img src={resolveImageSrc(p) || p.image} alt={p.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                                        <p className="font-serif text-white text-sm leading-tight">{p.title}</p>
                                        <p className="text-slate-400 text-[9px] mt-0.5 truncate">{p.subtitle}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center mt-3">
                            <button onClick={() => setShowAllProjects(true)}
                                className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all">
                                Všechny projekty <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* ── All projects modal ── */}
        <AnimatePresence>
            {showAllProjects && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setShowAllProjects(false)}>
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -10, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-white/10">
                        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="font-serif text-xl text-white">Všechny projekty</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">{projects.length} projektů & spoluprací</p>
                            </div>
                            <button onClick={() => setShowAllProjects(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-3" data-lenis-prevent>
                            {projects.map(p => (
                                <button key={p.id} onClick={() => { setShowAllProjects(false); setSelected(p); }}
                                    className="group text-left rounded-2xl overflow-hidden border border-white/8 bg-white/5 hover:bg-white/10 hover:border-gold-500/40 transition-all">
                                    <div className="w-full aspect-video overflow-hidden">
                                        <img loading="lazy" src={resolveImageSrc(p) || p.image} alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-serif text-sm text-white group-hover:text-gold-400 transition-colors">{p.title}</h3>
                                        <p className="text-slate-500 text-[10px] mt-0.5">{p.subtitle}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── Project detail modal ── */}
        <AnimatePresence>
            {selected && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 pointer-events-auto bg-slate-950/88 backdrop-blur-md"
                    onClick={() => setSelected(null)}>
                    <motion.div initial={{ scale: 0.96, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.96, y: 12, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#111827] w-full max-w-2xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">

                        {/* Image */}
                        <ModalSlider images={selected.images} fallback={resolveImageSrc(selected) || selected.image}
                            className="w-full md:w-[44%] h-48 md:h-auto shrink-0" />

                        {/* Content */}
                        <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain" data-lenis-prevent>
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0 border-b border-white/[0.07]">
                                <p className="text-gold-400 font-mono text-[9px] uppercase tracking-[0.4em] font-bold">{selected.subtitle}</p>
                                <button onClick={() => setSelected(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="px-6 py-5 flex-1 space-y-4">
                                <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight">{selected.title}</h2>
                                <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed">{selected.description}</p>

                                <ul className="space-y-2.5">
                                    {selected.highlights?.map((h, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-gold-500/12 border border-gold-400/25 flex items-center justify-center shrink-0 mt-0.5">
                                                <ArrowRight className="w-2.5 h-2.5 text-gold-400" />
                                            </div>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {selected.link && (
                                <div className="px-6 py-5 shrink-0 border-t border-white/[0.07]">
                                    <a href={selected.link} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                        {selected.link.replace('https://','').replace('www.','')} <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
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

export default Projects;
