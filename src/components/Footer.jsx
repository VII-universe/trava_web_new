import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Instagram, Facebook, Mail, ArrowUp } from 'lucide-react';

const Footer = ({ scrollProgress }) => {
    // PHASE 10: 0.95 -> 1.0 (The Descent)
    const opacity = useTransform(scrollProgress, [0.93, 0.96, 1], [0, 1, 1]);
    const y = useTransform(scrollProgress, [0.93, 0.96, 1], ["50%", "0%", "0%"]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.section
            style={{ opacity, y }}
            className="fixed inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none bg-ivory"
        >
            <div className="max-w-4xl w-full px-6 pointer-events-auto">
                <div className="text-center mb-20">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        10 — PATIČKA (Sestup)
                    </h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-12">
                        Zpátky v údolí.
                    </h2>

                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-4 mx-auto"
                    >
                        <div className="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 animate-bounce">
                            <ArrowUp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Zpět k vrcholu</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-200 pt-16 mb-20">
                    <div className="col-span-2">
                        <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block mb-4">Kontakt</span>
                        <a href="mailto:honzatravatravnicek@gmail.com" className="font-serif text-2xl text-slate-900 hover:text-gold-600 transition-colors break-words">
                            honzatravatravnicek@gmail.com
                        </a>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block mb-4">Sleduj mě</span>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block mb-4">Newsletter</span>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Tvůj mail..."
                                className="w-full bg-transparent border-b border-slate-300 py-2 focus:border-gold-500 outline-none font-sans text-sm"
                            />
                            <button className="absolute right-0 bottom-2"><Mail className="w-4 h-4 text-slate-400 hover:text-gold-600" /></button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                    <span>© 2026 HONZA TRÁVNÍČEK</span>
                    <div className="flex items-center gap-4">
                        <span>14 Summits Expedition</span>
                        <div className="w-8 h-px bg-slate-200" />
                        <span className="text-gold-600">Poutník mezi světy</span>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Footer;
