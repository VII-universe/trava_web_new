import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg'; // Placeholder for Nepal view

const Nepal = ({ scrollProgress }) => {
    // PHASE 6: 0.90 -> 1.0 (Kus Plzně)
    const containerOpacity = useTransform(scrollProgress, [0.90, 0.95], [0, 1]);
    const containerY = useTransform(scrollProgress, [0.90, 0.96], ["100%", "0%"]);

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{ y: containerY }}
                className="w-full h-full relative flex flex-col md:flex-row"
            >
                {/* Visual Left: Photo of Czech Pub behavior */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-slate-900">
                    <img
                        src={BaseCampImg}
                        alt="Czech Pub Kathmandu"
                        className="w-full h-full object-cover opacity-60 scale-125 saturate-50 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40" />

                    <div className="absolute bottom-10 left-10 text-white z-10">
                        <div className="flex items-center gap-2 text-gold-400 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs tracking-widest font-bold uppercase">Kathmandu base camp</span>
                        </div>
                        <h3 className="font-serif text-3xl">Czech Pub Nepal</h3>
                    </div>
                </div>

                {/* Content Right: Text on Glass */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-ivory flex items-center justify-center p-10 md:p-20">
                    <motion.div
                        className="max-w-md p-10 rounded-3xl border border-white/80 bg-white/40 backdrop-blur-xl shadow-2xl pointer-events-auto"
                        whileHover={{ y: -5 }}
                    >
                        <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-6">
                            PROJEKTY V NEPÁLU / Aklimatizace (4500 m)
                        </h4>

                        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-8 leading-tight">
                            Kus Plzně v <span className="italic">Káthmándú.</span>
                        </h2>

                        <p className="font-sans text-slate-700 text-lg leading-relaxed mb-10">
                            Postavit hospodu v Nepálu byl možná větší úlet než vylézt na K2.
                            Ale Czech Pub a Kathmandu Base Camp nejsou jen o pivu.
                            Je to domov pro všechny, kdo ztratili směr nebo jen hledají českou stopu pod Himálajem.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-6 py-3 bg-slate-900 text-white text-xs tracking-widest uppercase font-bold hover:bg-gold-600 transition-colors">
                                Rezervovat nocleh
                            </button>
                            <button className="px-6 py-3 border border-slate-900 text-slate-900 text-xs tracking-widest uppercase font-bold hover:bg-slate-900 hover:text-white transition-all">
                                Ukázat na mapě
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Nepal;
