import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Calendar, X } from 'lucide-react';

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
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                        className="glass-card max-w-lg w-full p-8 relative text-left pointer-events-auto"
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
                            aria-label="Zavřít"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="font-serif text-3xl text-slate-900 mb-4">Booking & Kontakt</h3>
                        <p className="font-sans text-slate-700 mb-6">
                            Napiš nám k přednášce nebo projektu. Ozveme se zpět s detailem termínu a produkce.
                        </p>
                        <form className="space-y-4">
                            <input className="w-full glass-card p-3 focus:outline-none" placeholder="Jméno" />
                            <input className="w-full glass-card p-3 focus:outline-none" placeholder="Email" />
                            <textarea className="w-full glass-card p-3 h-28 focus:outline-none" placeholder="Co potřebuješ domluvit?" />
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full py-3 bg-slate-900 text-white font-semibold tracking-wide uppercase text-xs hover:bg-gold-600 transition-colors"
                            >
                                Odeslat
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Lectures;
