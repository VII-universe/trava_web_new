import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, X, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Polaroid1 from '../assets/zmensene/portrety/prednasky/photohanny-129.jpg';
import Polaroid2 from '../assets/zmensene/portrety/prednasky/dsd_8450.jpg';
import Polaroid3 from '../assets/zmensene/portrety/prednasky/photohanny-134.jpg';
import BookingBg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc06903.jpg';

import Tour50Img from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';
import CollabImg from '../assets/zmensene/portrety/prednasky/dsc04123.jpg';

import PjjImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6384-edit.jpg';
import HorkyImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240728_131841.jpg';
import LangosImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240715_133229.jpg';
import AudyImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06947.jpg';
import FormanImg from '../assets/zmensene/kathmandu/dsc08157.jpg';
import TourMainImg from '../assets/zmensene/portrety/prednasky/1r2a2034.jpg';
import JesteImg from '../assets/zmensene/projekty/jeste_jsme_neskoncili/20240806_151350.jpg';
import NehaImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc07645.jpg';
import DalsiImg from '../assets/zmensene/skupinky/whatsapp_image_2025-06-15_at_18_53_30__2_.jpg';

const Lectures = ({ scrollProgress }) => {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [selectedMoreProject, setSelectedMoreProject] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (open || showAllProjects || selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open, showAllProjects, selectedImage]);

    // PHASE 6: 0.54 -> 0.72 with hold (much closer to Nepal)
    const containerOpacity = useTransform(scrollProgress, [0.54, 0.58, 0.68, 0.72], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.54, 0.58, 0.68, 0.72], ["-120%", "0%", "0%", "120%"]);
    
    // Lightens the background as it exits
    const lightenOpacity = useTransform(scrollProgress, [0.60, 0.69], [0, 1]);

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

    const MORE_PROJECTS = [
        {
            id: 'pjj',
            title: "Petr Jan Juračka",
            subtitle: "Něha Himálaje, balón Annapurna, Everest Marathon",
            image: PjjImg,
            description: "Spolupráce na dechberoucích projektech s fantastickým fotografem a filmařem. Od knihy a filmu Něha Himálaje, přes unikátní projekt létání balónem u Annapurny až po Everest Marathon. Vizuální i lidský zážitek.",
            highlights: ["Kniha a film Něha Himálaje", "Projekt balón Annapurna", "Everest Marathon"]
        },
        {
            id: 'horky',
            title: "Petr Horký",
            subtitle: "Filmy, projekty, společné akce",
            image: HorkyImg,
            description: "Dlouhodobá spolupráce s vynikajícím režisérem a polárníkem Petrem Horkým. Tvoříme společně filmy, pořádáme poutavé přednášky a vymýšlíme další nezapomenutelné společné akce, které mají přesah.",
            highlights: ["Dokumentární filmy", "Společné projekty", "Sdílení zkušeností"]
        },
        {
            id: 'langos',
            title: "Jirka „Langoš“ Langmajer",
            subtitle: "Přednášky, promo, společné projekty",
            image: LangosImg,
            description: "Netradiční spojení světa hor a divadla. S Jirkou Langmajerem pořádáme společné přednášky plné humoru i drsných historek, natáčíme promo videa a připravujeme další unikátní projekty.",
            highlights: ["Zábavné společné přednášky", "Marketingová promo videa", "Nové formáty vyprávění"]
        },
        {
            id: 'audy',
            title: "Marek Audy",
            subtitle: "3D projekce",
            image: AudyImg,
            description: "Zážitek, který vás vtáhne přímo do děje. Díky spolupráci s Markem Audym přinášíme unikátní 3D projekce z našich expedic, které divákům zprostředkovávají naprosto realistický pocit z vysokých hor.",
            highlights: ["Vtahující 3D fotografie", "Realistický vizuální zážitek z hor", "Využití moderních technologií v přednáškách"]
        },
        {
            id: 'forman',
            title: "Petr Forman",
            subtitle: "Divadlo, audiokniha, COPATUTOJE",
            image: FormanImg,
            description: "Kreativní přesahy mimo klasické horolezectví. S Petrem Formanem jsme se potkali mimo jiné při tvorbě divadla, nahrávání audioknihy nebo u fantastického regionálního projektu COPATUTOJE.",
            highlights: ["Netradiční divadelní fúze", "Spolupráce na audioknize", "Projekt COPATUTOJE pro Plzeň"]
        },
        {
            id: 'tour2026',
            title: "50 let tour (únor–březen 2026)",
            subtitle: "Velká přednášková tour, zapojení partnerů",
            image: TourMainImg,
            description: "Velkolepá oslava 50. narozenin Honzy Trávy přímo na pódiích napříč republikou. Čeká nás velká přednášková tour plná těch nejlepších příběhů, hostů a překvapení. Exkluzivní možnost zapojení pro partnery projektu.",
            highlights: ["Republikové turné", "Nejlepší historky z 8 osmitisícovek", "Výrazný prostor pro partnery"]
        },
        {
            id: 'jsmeneskoncili',
            title: "Jestejsmeneskoncili",
            subtitle: "S Miri, Horkým, Langošem a J. Votavou",
            image: JesteImg,
            description: "Silná sestava, silné poselství. Unikátní sdílený projekt, ve kterém se spojují osobnosti z různých sfér (Miri Jirková, Petr Horký, Jirka Langmajer, Jirka Votava a Honza Tráva), aby ukázali, že po dosažení vrcholu nebo překonání krize to teprve začíná.",
            highlights: ["Synergie pěti osobností", "Inspirace pro životní změny", "Zcela nový formát spolupráce"]
        },
        {
            id: 'neha_himalaje',
            title: "Něha Himálaje",
            subtitle: "Kniha / film / audio s PJJ",
            image: NehaImg,
            description: "Multimediální projekt mapující lidskou i horolezeckou tvář himálajských expedic v podání Petra Jana Juračky a Honzy Trávy. Zahrnuje velmi úspěšnou knihu, filmový dokument, audioknihu a celou řadu navazujících přednáškových aktivit.",
            highlights: ["Úspěšná knižní publikace", "Emocionálně silný dokumentární film", "Rozsáhlá osvětová činnost"]
        },
        {
            id: 'narazove',
            title: "Další aktivity",
            subtitle: "Havlík, Kopka, 1000 mil...",
            image: DalsiImg,
            description: "Život není jen o osmitisícovkách. Rádi se vrháme do dalších výzev – ať už jde o natáčení s režisérem Rudou Havlíkem, drsný cyklo výlet v Nepálu s extrémním bikerem Honzou Kopkou, účast na závodě 1000 mil nebo pořádání různých komunitních akcí pro radost.",
            highlights: ["Spolupráce s filmovou produkcí Rudiho Havlíka", "Extrémní cyklo expedice v Nepálu", "Účast na komunitních projektech"]
        }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none bg-gradient-to-b from-[#1A202C] to-[#0F172A]"
        >
            {/* Visual: Peak view with clouds below */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white/20 to-transparent blur-[60px] opacity-40" />
            
            {/* Lightening Overlay */}
            <motion.div 
                className="absolute inset-0 bg-[#f8f9fa] z-0" 
                style={{ opacity: lightenOpacity }} 
            />

            <motion.div
                style={{ y: containerY }}
                className="relative z-50 w-full h-full px-6 pointer-events-auto flex flex-col items-center justify-center"
            >
                <div className="w-full flex flex-col items-center justify-center translate-y-20 md:translate-y-24 lg:translate-y-12 [@media(max-height:1000px)]:scale-[0.90] [@media(max-height:850px)]:scale-[0.80] [@media(max-height:750px)]:scale-[0.70] [@media(max-height:650px)]:scale-[0.60] origin-center transition-transform duration-300">
                    <div className="max-w-3xl w-full text-center mt-16 md:mt-24 lg:mt-12 relative z-20">
                        <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3 md:mb-6">
                    06 — Projekty & Přednášky (7500 m)
                </h4>

                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-4 lg:mb-6 leading-tight">
                    Projekty & Přednášky
                </h2>

                <p className="font-sans text-slate-300 text-sm md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6 lg:mb-8 max-w-3xl mx-auto">
                    50 let tour (únor–březen 2026): Velká přednášková tour. Propojení s osobnostmi: Petr Jan Juračka (Něha Himálaje), Petr Horký, Jirka Langmajer (Jestejsmeneskoncili), Marek Audy, Petr Forman.
                        </p>
                    </div>

                <div className="relative max-w-6xl mx-auto w-full mb-8 md:mb-12 lg:mb-16 px-4 md:px-0 mt-0 lg:mt-4">
                    
                    {/* POLAROID 1 - Left */}
                    <motion.div
                        initial={{ rotate: -25, x: -70, y: 80, opacity: 0 }}
                        whileInView={{ rotate: -15, x: -100, y: -40, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                        className="absolute -top-16 -left-8 md:-top-24 md:-left-12 lg:-top-20 lg:-left-24 z-0 w-44 md:w-56 lg:w-72 bg-slate-200 p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-sm border border-slate-300/50 hidden sm:block pointer-events-none"
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                            <img src={Polaroid1} className="w-full h-full object-cover filter opacity-100" alt="Přednáška" />
                            <div className="absolute inset-0 bg-gold-900/10 mix-blend-overlay" />
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium">Energie</div>
                    </motion.div>

                    {/* POLAROID 2 - Right */}
                    <motion.div
                        initial={{ rotate: 15, x: 70, y: 100, opacity: 0 }}
                        whileInView={{ rotate: 12, x: 100, y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.3 }}
                        className="absolute -bottom-10 -right-8 md:-bottom-16 md:-right-12 lg:-bottom-10 lg:-right-20 z-0 w-44 md:w-56 lg:w-72 bg-slate-200 p-3 md:p-4 pb-12 md:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-sm border border-slate-300/50 hidden sm:block pointer-events-none"
                    >
                        <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                            <img src={Polaroid2} className="w-full h-full object-cover filter opacity-100" alt="Tým" />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                        </div>
                        <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium">Příběhy</div>
                    </motion.div>
                    
                    {/* POLAROID 3 - Bottom Left */}
                    <motion.div
                        initial={{ rotate: -10, x: -60, y: -40, opacity: 0 }}
                        whileInView={{ rotate: -5, x: -60, y: 80, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="absolute -bottom-24 -left-8 lg:-bottom-24 lg:-left-12 z-0 w-40 md:w-52 lg:w-64 bg-slate-200 p-3 md:p-4 pb-12 md:pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-sm border border-slate-300/50 hidden lg:block pointer-events-none"
                    >
                        <div className="w-full aspect-[4/3] bg-slate-200 overflow-hidden relative">
                            <img src={Polaroid3} className="w-full h-full object-cover object-top filter opacity-100" alt="Vrchol" />
                            <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay" />
                        </div>
                        <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center font-serif italic text-slate-600 text-xs md:text-sm font-medium">Atmosféra</div>
                    </motion.div>

                    {/* Cards Grid (on top) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 max-w-5xl mx-auto backdrop-blur-sm">
                        {events.map(event => (
                            <motion.div 
                                key={event.id} 
                                onClick={() => setSelectedEvent(event)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-card p-8 bg-white/60 hover:bg-white/80 border-white/40 text-left shadow-2xl cursor-pointer transition-colors"
                            >
                                <Calendar className="w-6 h-6 text-gold-600 mb-4" />
                                <h5 className="font-serif text-2xl text-slate-900 mb-2">{event.city}</h5>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium mb-4">{event.venue}</p>
                                <div className="mt-6 flex items-center justify-start">
                                    <div className="px-5 py-2.5 bg-slate-900 text-white hover:bg-gold-600 font-bold text-[10px] md:text-xs tracking-widest uppercase rounded-full transition-colors flex items-center gap-2 shadow-md">
                                        Více informací
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 relative z-10 flex justify-center">
                        <button
                            onClick={() => setShowAllProjects(true)}
                            className="bg-gold-500 text-white font-sans tracking-[0.2em] uppercase text-xs font-bold py-4 px-10 rounded-full hover:bg-gold-400 transition-all backdrop-blur-sm shadow-lg shadow-black/20 flex items-center group"
                        >
                            Více projektů
                            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="text-center text-slate-300 text-sm max-w-4xl mx-auto mb-8">
                    Další firmy: Summit Drive s.r.o. (s Karlem Křížem) - outdoor a stěna v Plzni. Ice Adventure Production s.r.o. (s Petrem Horkým).
                </div>

                <div className="relative group mt-4 mb-16 md:mb-24 lg:mb-32">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                    <button
                        onClick={() => setOpen(true)}
                        className="relative w-full py-5 px-10 md:px-16 bg-gold-500 border border-gold-400/50 rounded-full text-white font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-bold hover:bg-gold-400 transition-all shadow-xl shadow-black/20"
                    >
                        Booking & Kontakt
                    </button>
                </div>
                </div>
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
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <Phone className="w-4 h-4 text-gold-500" />
                                        <span>+420 123 456 789</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Area */}
                        <div className="md:w-[60%] p-8 md:p-12 overflow-y-auto relative text-left flex flex-col">
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
                                <img src={selectedEvent.image} className="absolute inset-0 w-full h-full object-cover" alt={selectedEvent.city} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                            </div>

                            {/* Content Side */}
                            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto text-left flex flex-col justify-center">
                                <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                                    {selectedEvent.date}
                                </h4>
                                <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                    {selectedEvent.city}
                                </h2>
                                
                                <p className="font-sans text-slate-600 leading-relaxed mb-8">
                                    {selectedEvent.description}
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

            {/* "Více projektů" Modal Area */}
            <AnimatePresence>
                {showAllProjects && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-[#0E131F]/90 backdrop-blur-xl flex flex-col p-4 md:p-10 pointer-events-auto"
                    >
                        <div className="flex justify-between items-center w-full max-w-7xl mx-auto mb-8 relative z-20">
                            <h2 className="font-serif text-3xl md:text-5xl text-white">Všechny projekty</h2>
                            <button
                                onClick={() => {
                                    setShowAllProjects(false);
                                    setSelectedMoreProject(null);
                                }}
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white backdrop-blur-md"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 w-full max-w-7xl mx-auto overflow-y-auto overflow-x-hidden pb-20 scrollbar-hide">
                            <AnimatePresence mode="wait">
                                {selectedMoreProject ? (
                                    <motion.div
                                        key="detail"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-[#fcfbf9] border border-white/20 shadow-2xl rounded-[2rem] w-full overflow-hidden relative flex flex-col md:flex-row min-h-[70vh]"
                                    >
                                        <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
                                            <img src={selectedMoreProject.image} className="absolute inset-0 w-full h-full object-cover" alt={selectedMoreProject.title} />
                                            <button
                                                onClick={() => setSelectedMoreProject(null)}
                                                className="absolute top-6 left-6 flex items-center bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors"
                                            >
                                                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                                Zpět na přehled
                                            </button>
                                        </div>

                                        <div className="md:w-1/2 p-8 md:p-14 overflow-y-auto text-left flex flex-col justify-center bg-white">
                                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                                                {selectedMoreProject.subtitle}
                                            </h4>
                                            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                                {selectedMoreProject.title}
                                            </h2>
                                            
                                            <p className="font-sans text-slate-600 leading-relaxed mb-8 text-lg">
                                                {selectedMoreProject.description}
                                            </p>

                                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl mb-10">
                                                <h5 className="font-serif text-slate-800 text-xl mb-5">V čem spočívá spolupráce?</h5>
                                                <ul className="space-y-4">
                                                    {selectedMoreProject.highlights.map((h, i) => (
                                                        <li key={i} className="flex items-start text-base text-slate-600">
                                                            <ArrowRight className="w-5 h-5 text-gold-500 mr-4 mt-0.5 shrink-0" />
                                                            <span>{h}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setSelectedMoreProject(null);
                                                    setShowAllProjects(false);
                                                    setOpen(true);
                                                }}
                                                className="w-full sm:w-auto self-start bg-slate-900 text-white font-sans tracking-[0.2em] uppercase text-sm font-bold py-5 px-10 rounded-xl hover:bg-gold-600 transition-colors shadow-xl shadow-slate-900/20"
                                            >
                                                Mám zájem
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="grid"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    >
                                        {MORE_PROJECTS.map((project, idx) => (
                                            <motion.div
                                                key={project.id}
                                                whileHover={{ y: -5 }}
                                                onClick={() => setSelectedMoreProject(project)}
                                                className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-colors"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <div className="w-full h-48 overflow-hidden relative">
                                                    <img 
                                                        src={project.image} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                        alt={project.title} 
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] to-transparent" />
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-white font-serif text-2xl mb-2 group-hover:text-gold-400 transition-colors">{project.title}</h3>
                                                    <p className="text-slate-400 text-sm font-sans mb-6 line-clamp-2">{project.subtitle}</p>
                                                    
                                                    <div className="flex items-center text-gold-500 font-bold text-[10px] tracking-[0.2em] uppercase">
                                                        Zobrazit více <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Lectures;
