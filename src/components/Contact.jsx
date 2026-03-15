import React from 'react';
import { motion, useTransform } from 'framer-motion';

const Contact = ({ scrollProgress }) => {
    // PHASE 9: 0.96 -> 1.0 (slides in from top)
    const containerOpacity = useTransform(scrollProgress, [0.94, 0.97, 1.0], [0, 1, 1]);
    const y = useTransform(scrollProgress, [0.94, 0.97, 1.0], ["-120%", "0%", "0%"]);

    return (
        <motion.div
            style={{ opacity: containerOpacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-ivory to-white" />

            <motion.div className="relative z-10 max-w-5xl w-full px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="glass-card p-10 pointer-events-auto">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3">Kontakt</h4>
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">Spojme se</h2>
                    <p className="font-sans text-slate-800 leading-relaxed mb-6">
                        Napiš mi o expedici, přednášce nebo spolupráci. Ozvu se zpět co nejdřív.
                    </p>
                    <form className="space-y-4">
                        <input className="w-full glass-card p-3 focus:outline-none" placeholder="Jméno" />
                        <input className="w-full glass-card p-3 focus:outline-none" placeholder="Email" />
                        <textarea className="w-full glass-card p-3 h-28 focus:outline-none" placeholder="Zpráva" />
                        <button type="button" className="w-full py-3 bg-slate-900 text-white font-semibold tracking-wide uppercase text-xs hover:bg-gold-600 transition-colors">
                            Odeslat
                        </button>
                    </form>
                </div>

                <div className="glass-card p-10 pointer-events-auto">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3">Média & Booking</h4>
                    <p className="font-sans text-slate-800 leading-relaxed mb-4">
                        Pro média, podcasty, videa nebo domluvu přednášek pište přímo sem.
                    </p>
                    <ul className="space-y-3 text-slate-800 font-sans">
                        <li><span className="font-semibold">E-mail:</span> media@travaclimb.com</li>
                        <li><span className="font-semibold">Telefon:</span> +420 123 456 789</li>
                        <li><span className="font-semibold">Lokalita:</span> ČR & Nepál (Kathmandu Base Camp)</li>
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Contact;
