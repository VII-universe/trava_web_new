import { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { ArrowRight, X, ExternalLink } from 'lucide-react';

import PjjImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6384-edit.jpg';
import HorkyImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240728_131841.jpg';
import LangosImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240715_133229.jpg';
import AudyImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06947.jpg';
import FormanImg from '../assets/zmensene/kathmandu/dsc08157.jpg';
import TourMainImg from '../assets/zmensene/portrety/prednasky/1r2a2034.jpg';
import JesteImg from '../assets/zmensene/projekty/jeste_jsme_neskoncili/20240806_151350.jpg';
import NehaImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc07645.jpg';
import DalsiImg from '../assets/zmensene/skupinky/whatsapp_image_2025-06-15_at_18_53_30__2_.jpg';

const PROJECTS = [
    {
        id: 'pjj',
        title: 'Petr Jan Juračka',
        subtitle: 'Něha Himálaje — balón — Everest Marathon',
        image: PjjImg,
        description: 'Spolupráce na dechberoucích projektech s fotografem a filmařem PJJ. Kniha a film Něha Himálaje, projekt létání balónem u Annapurny a Everest Marathon.',
        highlights: ['Kniha a film Něha Himálaje', 'Projekt balón Annapurna', 'Everest Marathon'],
        link: null,
    },
    {
        id: 'horky',
        title: 'Petr Horký',
        subtitle: 'Filmy — projekty — společné akce',
        image: HorkyImg,
        description: 'Dlouhodobá spolupráce s režisérem a polárníkem Petrem Horkým. Dokumentární filmy, přednáškové turné a nezapomenutelné projekty s přesahem.',
        highlights: ['Dokumentární filmy', 'Společné projekty', 'Ice Adventure Production'],
        link: null,
    },
    {
        id: 'langos',
        title: 'Jirka Langmajer',
        subtitle: 'Přednášky, promo, Ještě jsme neskončili',
        image: LangosImg,
        description: 'Netradiční spojení světa hor a divadla. Společné přednášky, promo videa a projekt Jestejsmeneskoncili ukazují, že po vrcholu to teprve začíná.',
        highlights: ['Zábavné společné přednášky', 'Marketingová promo videa', 'Projekt Jestejsmeneskoncili'],
        link: null,
    },
    {
        id: 'audy',
        title: 'Marek Audy',
        subtitle: '3D projekce — immersive zážitky',
        image: AudyImg,
        description: 'Unikátní 3D projekce z expedic, které divákům zprostředkovávají realistický pocit z vysokých hor. Spolupráce spojující technologii a dobrodružství.',
        highlights: ['Vtahující 3D fotografie', 'Realistický vizuální zážitek', 'Moderní technologie v přednáškách'],
        link: null,
    },
    {
        id: 'forman',
        title: 'Petr Forman',
        subtitle: 'Divadlo — audiokniha — COPATUTOJE',
        image: FormanImg,
        description: 'Kreativní přesahy mimo klasické horolezectví. Divadlo, audiokniha a regionální projekt COPATUTOJE pro Plzeň.',
        highlights: ['Netradiční divadelní fúze', 'Spolupráce na audioknize', 'Projekt COPATUTOJE'],
        link: null,
    },
    {
        id: 'jsmeneskoncili',
        title: 'Ještě jsme neskončili',
        subtitle: 'S Miri, Horkým, Langošem a J. Votavou',
        image: JesteImg,
        description: 'Silná sestava, silné poselství. Projekt pěti osobností, který ukazuje, že po dosažení vrcholu nebo překonání krize to teprve začíná.',
        highlights: ['Synergie pěti osobností', 'Inspirace pro životní změny', 'Zcela nový formát spolupráce'],
        link: null,
    },
    {
        id: 'neha',
        title: 'Něha Himálaje',
        subtitle: 'Kniha / film / audio s PJJ',
        image: NehaImg,
        description: 'Multimediální projekt mapující lidskou i horolezeckou tvář himálajských expedic v podání Petra Jana Juračky a Honzy Trávy.',
        highlights: ['Úspěšná knižní publikace', 'Emocionálně silný dokumentární film', 'Rozsáhlá osvětová činnost'],
        link: null,
    },
    {
        id: 'dalsi',
        title: 'Další aktivity',
        subtitle: 'Havlík, Kopka, 1000 mil, Peakfest...',
        image: DalsiImg,
        description: 'Spolupráce s režisérem Rudou Havlíkem, cykloexpedice v Nepálu s Honzou Kopkou, Peakfest a další komunitní projekty.',
        highlights: ['Filmová produkce Rudiho Havlíka', 'Extrémní cykloexpedice Nepál', 'Peakfest a komunitní akce'],
        link: null,
    },
    {
        id: 'tour2026',
        title: '50 let tour',
        subtitle: 'Únor–březen 2026 — celá ČR',
        image: TourMainImg,
        description: 'Velkolepá oslava 50. narozenin Honzy Trávy. Turné plné nejlepších příběhů, hostů a překvapení po celé republice.',
        highlights: ['Republikové turné', 'Nejlepší historky z osmitisícovek', 'Prostor pro partnery projektu'],
        link: null,
    },
];

const Projects = ({ scrollProgress }) => {
    const [selected, setSelected] = useState(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    useScrollLock(!!selected || showAllProjects);

    // PHASE 9: 0.72 -> 0.83
    const containerOpacity = useTransform(scrollProgress, [0.72, 0.75, 0.78, 0.81], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.72, 0.75, 0.78, 0.81], ['-120%', '0%', '0%', '130%']);

    return (
        <>
        {/* BACKGROUND */}
        <motion.div
            style={{ opacity: containerOpacity, y: containerY, zIndex: 40 }}
            className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-b from-[#1A202C] to-[#0F172A]"
        />

        {/* CONTENT */}
        <motion.div
            style={{ opacity: containerOpacity, y: containerY, zIndex: 70 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            <div className="w-full h-full flex items-center justify-center px-4 md:px-8 pointer-events-none">
                <div className="w-full max-w-6xl pointer-events-auto origin-center transition-transform duration-300 [@media(max-width:767px)]:scale-[0.95] [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.90] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.80] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.70]">

                    {/* Header */}
                    <div className="mb-3 md:mb-6 text-center">
                        <h4 className="text-gold-500 font-sans uppercase tracking-[0.25em] text-xs font-bold mb-2">
                            08 — Projekty (7500 m)
                        </h4>
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">
                            Projekty & Spolupráce
                        </h2>
                        <p className="hidden md:block font-sans text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            Projekty, které formují značku a ukazují, že hory jsou jen začátek příběhů. Klikněte a zjistěte více.
                        </p>
                    </div>

                    {/* Desktop: first 6 projects */}
                    <div className="hidden md:grid grid-cols-3 gap-3">
                        {PROJECTS.slice(0, 6).map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setSelected(project)}
                                className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold-500/40 transition-all duration-300 relative flex flex-col"
                            >
                                <div className="w-full aspect-[16/9] overflow-hidden shrink-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                </div>
                                <div className="flex items-center justify-between gap-2 p-3 md:p-4 relative flex-1">
                                    <div className="min-w-0">
                                        <h3 className="font-serif text-sm md:text-base text-white leading-tight mb-0.5 group-hover:text-gold-400 transition-colors">{project.title}</h3>
                                        <p className="font-sans text-xs text-slate-400 uppercase tracking-wider font-medium line-clamp-1">{project.subtitle}</p>
                                    </div>
                                    {project.logo ? (
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                                            <img src={project.logo} alt="" className="w-full h-full object-contain p-1" />
                                        </div>
                                    ) : (
                                        <div className="shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Desktop: show more button */}
                    <div className="hidden md:flex justify-center mt-4">
                        <button
                            onClick={() => setShowAllProjects(true)}
                            className="flex items-center gap-2 px-6 py-3 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all"
                        >
                            Zobrazit více projektů <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Mobile: first 6 projects */}
                    <div className="grid grid-cols-2 gap-2 md:hidden">
                        {PROJECTS.slice(0, 6).map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setSelected(project)}
                                className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold-500/40 transition-all duration-300 relative"
                            >
                                <div className="w-full aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                </div>
                                <div className="p-3 relative">
                                    <h3 className="font-serif text-sm text-white leading-tight mb-0.5 group-hover:text-gold-400 transition-colors">{project.title}</h3>
                                    <p className="font-sans text-xs text-slate-400 uppercase tracking-wider font-medium line-clamp-1">{project.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Mobile: show all button */}
                    <div className="flex justify-center mt-2 md:hidden">
                        <button
                            onClick={() => setShowAllProjects(true)}
                            className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-all"
                        >
                            Zobrazit všech {PROJECTS.length} projektů <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Show all projects modal */}
        <AnimatePresence>
            {showAllProjects && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setShowAllProjects(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-white/10"
                    >
                        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="font-serif text-xl text-white">Všechny projekty</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">{PROJECTS.length} projektů</p>
                            </div>
                            <button onClick={() => setShowAllProjects(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-3" data-lenis-prevent>
                            {PROJECTS.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => { setShowAllProjects(false); setSelected(project); }}
                                    className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold-500/40 transition-all duration-300 relative"
                                >
                                    <div className="w-full aspect-video overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                    </div>
                                    <div className="p-3 relative">
                                        <h3 className="font-serif text-sm text-white leading-tight mb-0.5 group-hover:text-gold-400 transition-colors">{project.title}</h3>
                                        <p className="font-sans text-xs text-slate-400 uppercase tracking-wider font-medium line-clamp-1">{project.subtitle}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Project detail modal */}
        <AnimatePresence>
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setSelected(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                    >
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0">
                            <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto" data-lenis-prevent>
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-2">{selected.subtitle}</h4>
                            <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4 leading-tight">{selected.title}</h2>
                            <p className="font-sans text-slate-700 leading-relaxed mb-5 text-sm md:text-base">{selected.description}</p>

                            <ul className="space-y-2 mb-6">
                                {selected.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-2 text-slate-700 font-sans text-sm items-start">
                                        <ArrowRight className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>

                            {selected.link && (
                                <a
                                    href={selected.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
                                >
                                    Více informací <ExternalLink className="w-3.5 h-3.5" />
                                </a>
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
