import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Lectures = ({ scrollProgress }) => {
    // PHASE 9: 0.90 -> 0.95
    const containerOpacity = useTransform(scrollProgress, [0.88, 0.91, 0.94, 0.97], [0, 1, 1, 0]);
    const containerY = useTransform(scrollProgress, [0.88, 0.92, 0.94, 0.98], ["100%", "0%", "0%", "-50%"]);

    const events = [
        { city: "Brno", venue: "Café Práh", date: "Brzy" },
        { city: "Tábor", venue: "Recykl Club", date: "Brzy" }
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
                    06 — PŘEDNÁŠKY / Vrchol (8848 m)
                </h4>

                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                    Tráva 50 Tour: <br /><span className="italic italic text-slate-400">Oslavit šediny se musí.</span>
                </h2>

                <p className="font-sans text-slate-300 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
                    Přijďte si poslechnout historky, který se do knížek nevešly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    {events.map(event => (
                        <div key={event.city} className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:border-gold-500/50 transition-all group">
                            <Calendar className="w-6 h-6 text-gold-500 mb-4 mx-auto" />
                            <h5 className="font-serif text-2xl text-white mb-2">{event.city}</h5>
                            <p className="text-slate-400 text-sm tracking-widest uppercase">{event.venue}</p>
                        </div>
                    ))}
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <button className="relative w-full py-6 bg-slate-900 border border-white/10 rounded-2xl text-white font-sans tracking-[0.3em] uppercase text-xs font-bold hover:bg-slate-800 transition-all">
                        Chceš mě na firemní akci? Napiš.
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Lectures;
