import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';

const Contact = ({ scrollProgress }) => {
    const [focusedInput, setFocusedInput] = useState(null);

    // PHASE 9: 0.94 -> 1.0 (End of the page)
    // PHASE 9: 0.94 -> 1.0 (End of the page)
    // Make it sticky by sliding exactly in sync with Summit.jsx exit (-100% to 0% as Summit goes 0% to 100%)
    // Start overlapping slightly earlier (0.92 instead of 0.94) to aggressively eliminate gaps
    const containerOpacity = useTransform(scrollProgress, [0.91, 0.92, 0.98, 1.0], [0, 1, 1, 1]);
    const y = useTransform(scrollProgress, [0.92, 0.97, 1.0], ["-100%", "0%", "0%"]);

    // Generate random snow particles once
    const snowParticles = Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2 + 'px',
        animationDuration: Math.random() * 5 + 5 + 's',
        animationDelay: Math.random() * -10 + 's',
        opacity: Math.random() * 0.6 + 0.2
    }));

    return (
        <motion.div
            style={{ opacity: containerOpacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none bg-slate-900 overflow-hidden z-[60]"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <img src={BaseCampImg} className="w-full h-full object-cover opacity-10 mix-blend-luminosity scale-110" alt="Background" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900" />
                
                {/* Snow Effect */}
                {snowParticles.map(particle => (
                    <div
                        key={particle.id}
                        className="snow"
                        style={{
                            left: particle.left,
                            width: particle.size,
                            height: particle.size,
                            animationDuration: particle.animationDuration,
                            animationDelay: particle.animationDelay,
                            opacity: particle.opacity,
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-auto h-full flex flex-col justify-center [@media(max-height:1000px)]:scale-[0.90] [@media(max-height:850px)]:scale-[0.80] [@media(max-height:750px)]:scale-[0.70] [@media(max-height:650px)]:scale-[0.60] origin-center transition-transform duration-300">
                
                <div className="text-center mb-16 md:mb-20">
                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        Kontakt
                    </h4>
                    <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">
                        Pojďme do toho.
                    </h2>
                    <p className="font-sans text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Ať už jde o sdílení příběhů, přednášku, nebo přípravu na další vrchol – nejlepší výpravy začínají prvním krokem.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
                    
                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div className="space-y-12">
                            {/* Contact Item */}
                            <div className="group">
                                <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 group-hover:text-gold-500 transition-colors">Booking & Média</h5>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300">
                                        <Mail className="w-6 h-6 text-slate-300 group-hover:text-gold-400" />
                                    </div>
                                    <div>
                                        <a href="mailto:booking@honzatrava.cz" className="text-white font-serif text-2xl hover:text-gold-400 transition-colors block mb-1">
                                            booking@honzatrava.cz
                                        </a>
                                        <p className="text-slate-400 text-sm">Odpovídáme zpravidla do 48 hodin</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Item */}
                            <div className="group">
                                <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 group-hover:text-gold-500 transition-colors">Základní Tábor</h5>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300">
                                        <MapPin className="w-6 h-6 text-slate-300 group-hover:text-gold-400" />
                                    </div>
                                    <div>
                                        <a href="#" className="text-white font-serif text-2xl hover:text-gold-400 transition-colors block mb-1">
                                            Czech Pub Nepal
                                        </a>
                                        <p className="text-slate-400 text-sm">Thamel, Káthmándú, Nepál</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 lg:mt-0 pt-6 border-t border-white/10">
                            <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 md:mb-6">Sledujte cestu</h5>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-110">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-110">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden group/form">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000" />
                        
                        <form className="relative space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative">
                                    <label className={`absolute left-0 transition-all duration-300 ${focusedInput === 'name' ? '-top-6 text-xs text-gold-500' : 'top-3 text-base text-slate-500'}`}>
                                        Jméno a příjmení
                                    </label>
                                    <input 
                                        type="text"
                                        onFocus={() => setFocusedInput('name')}
                                        onBlur={(e) => setFocusedInput(e.target.value ? 'name' : null)}
                                        className="w-full bg-transparent border-b border-white/20 pb-3 pt-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <label className={`absolute left-0 transition-all duration-300 ${focusedInput === 'email' ? '-top-6 text-xs text-gold-500' : 'top-3 text-base text-slate-500'}`}>
                                        E-mail
                                    </label>
                                    <input 
                                        type="email"
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={(e) => setFocusedInput(e.target.value ? 'email' : null)}
                                        className="w-full bg-transparent border-b border-white/20 pb-3 pt-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="relative pt-4">
                                <label className={`absolute left-0 transition-all duration-300 ${focusedInput === 'subject' ? 'top-0 text-xs text-gold-500' : 'top-5 text-base text-slate-500'}`}>
                                    Předmět / O co jde?
                                </label>
                                <input 
                                    type="text"
                                    onFocus={() => setFocusedInput('subject')}
                                    onBlur={(e) => setFocusedInput(e.target.value ? 'subject' : null)}
                                    className="w-full bg-transparent border-b border-white/20 pb-2 pt-5 text-white focus:border-gold-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="relative pt-4">
                                <label className={`absolute left-0 transition-all duration-300 ${focusedInput === 'message' ? 'top-0 text-xs text-gold-500' : 'top-5 text-base text-slate-500'}`}>
                                    Vaše zpráva
                                </label>
                                <textarea 
                                    onFocus={() => setFocusedInput('message')}
                                    onBlur={(e) => setFocusedInput(e.target.value ? 'message' : null)}
                                    className="w-full bg-transparent border-b border-white/20 pb-2 pt-5 min-h-[80px] text-white focus:border-gold-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            <button type="button" className="group w-full md:w-auto mt-6 flex items-center justify-center gap-4 bg-white text-slate-900 py-3 md:py-4 px-8 md:px-10 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-md">
                                Odeslat zprávu
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer text */}
                <div className="mt-8 md:mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Honza Trávníček. Všechna práva vyhrazena.</p>
                    <p>Designed for the summit.</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
