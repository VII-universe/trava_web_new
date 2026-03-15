import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Calendar, X, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';

const Lectures = ({ scrollProgress }) => {
    const [open, setOpen] = useState(false);
    // PHASE 6: 0.54 -> 0.72 with hold (much closer to Nepal)
    const containerOpacity = useTransform(scrollProgress, [0.54, 0.58, 0.68, 0.72], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.54, 0.58, 0.68, 0.72], ["-120%", "0%", "0%", "120%"]);

    const events = [
        { city: "50 let tour", venue: "únor–březen 2026", date: "Velká přednášková tour" },
        { city: "Propojení s osobnostmi", venue: "Petr Jan Juračka (Něha Himálaje), Petr Horký, Jirka Langmajer (Jestejsmeneskoncili), Marek Audy, Petr Forman", date: "Spolupráce" }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none bg-gradient-to-b from-[#1A202C] to-[#0F172A]"
        >
            {/* Visual: Peak view with clouds below */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white/20 to-transparent blur-[60px] opacity-40" />

            <motion.div
                style={{ y: containerY }}
                className="relative z-50 max-w-3xl w-full px-6 text-center pointer-events-auto"
            >
                <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-6">
                    06 — Projekty & Přednášky (7500 m)
                </h4>

                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                    Projekty & Přednášky
                </h2>

                <p className="font-sans text-slate-300 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
                    50 let tour (únor–březen 2026): Velká přednášková tour. Propojení s osobnostmi: Petr Jan Juračka (Něha Himálaje), Petr Horký, Jirka Langmajer (Jestejsmeneskoncili), Marek Audy, Petr Forman.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
                    {events.map(event => (
                        <div key={event.city} className="glass-card p-8 bg-white/10 border-white/20 text-left">
                            <Calendar className="w-6 h-6 text-gold-500 mb-4" />
                            <h5 className="font-serif text-2xl text-white mb-2">{event.city}</h5>
                            <p className="text-slate-300 text-sm leading-relaxed">{event.venue}</p>
                            {event.date && <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest">{event.date}</p>}
                        </div>
                    ))}
                </div>

                <div className="text-center text-slate-300 text-sm max-w-4xl mx-auto mb-8">
                    Další firmy: Summit Drive s.r.o. (s Karlem Křížem) - outdoor a stěna v Plzni. Ice Adventure Production s.r.o. (s Petrem Horkým).
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <button
                        onClick={() => setOpen(true)}
                        className="relative w-full py-6 bg-slate-900 border border-white/10 rounded-2xl text-white font-sans tracking-[0.3em] uppercase text-xs font-bold hover:bg-slate-800 transition-all"
                    >
                        Booking & Kontakt
                    </button>
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
                            <img src={BaseCampImg} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="Booking Background" />
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
        </motion.div>
    );
};

export default Lectures;
