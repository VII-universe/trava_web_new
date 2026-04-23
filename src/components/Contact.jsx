import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight, X, Youtube, MessageCircle, SatelliteDish } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';

function AllContactsModal({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-2xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                onClick={e => e.stopPropagation()}
                className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-white/8 shrink-0">
                    <div>
                        <h2 className="text-white font-bold text-lg leading-none">Kompletní kontakty</h2>
                        <p className="text-slate-500 text-xs mt-1">Honza Tráva — všechny způsoby spojení</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white hover:bg-white/8 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 px-7 py-6 space-y-7" data-lenis-prevent>

                    {/* Main contacts */}
                    <section>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Základní kontakt</p>
                        <div className="space-y-3">
                            <ContactRow icon={<Mail className="w-4 h-4" />} label="E-mail">
                                <a href="mailto:honzatravatravnicek@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">honzatravatravnicek@gmail.com</a>
                            </ContactRow>
                            <ContactRow icon={<Mail className="w-4 h-4" />} label="E-mail">
                                <a href="mailto:info@14summitsexpedition.cz" className="text-gold-400 hover:text-gold-300 transition-colors">info@14summitsexpedition.cz</a>
                            </ContactRow>
                            <ContactRow icon={<Phone className="w-4 h-4" />} label="Telefon">
                                <a href="tel:+420776359536" className="text-white hover:text-gold-400 transition-colors">+420 776 359 536</a>
                            </ContactRow>
                            <ContactRow icon={<MessageCircle className="w-4 h-4" />} label="Skype">
                                <span className="text-white">honzatrava</span>
                            </ContactRow>
                        </div>
                    </section>

                    {/* Social */}
                    <section>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Sociální sítě</p>
                        <div className="space-y-3">
                            <ContactRow icon={<Youtube className="w-4 h-4" />} label="YouTube">
                                <span className="text-white">Jan Trávníček</span>
                            </ContactRow>
                            <ContactRow icon={<Facebook className="w-4 h-4" />} label="Facebook">
                                <span className="text-white">Honza „Tráva" Trávníček</span>
                            </ContactRow>
                            <ContactRow icon={<Instagram className="w-4 h-4" />} label="Instagram">
                                <a href="https://instagram.com/honzatravatravnicek" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">@honzatravatravnicek</a>
                            </ContactRow>
                        </div>
                    </section>

                    {/* Nepal expedition */}
                    <section>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">Expediční spojení — Nepál</p>
                        <p className="text-slate-600 text-[11px] mb-3">Trávíme v Nepálu skoro půlku roku — zde jsou přímé linky.</p>
                        <div className="space-y-3">
                            <ContactRow icon={<SatelliteDish className="w-4 h-4 text-blue-400" />} label="Satelitní telefon (Thuraya)">
                                <a href="tel:+8821655561715" className="text-white hover:text-gold-400 transition-colors">+8821 655 561 715</a>
                            </ContactRow>
                            <div className="ml-8 text-[11px] text-amber-500/80 bg-amber-500/8 border border-amber-500/15 rounded-xl px-3 py-2 leading-relaxed">
                                SMS dojde vždy. Přes české operátory jen občas. Bez diakritiky, max. 160 znaků.
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 pt-2 mb-1">Honza — nepálské číslo</p>
                            <ContactRow icon={<Phone className="w-4 h-4" />} label="Namaste / NTC">
                                <a href="tel:+9779864277421" className="text-white hover:text-gold-400 transition-colors">+977 9864277421</a>
                            </ContactRow>
                            <ContactRow icon={<Phone className="w-4 h-4" />} label="NCELL">
                                <a href="tel:+9779803147888" className="text-white hover:text-gold-400 transition-colors">+977 980 3147888</a>
                            </ContactRow>

                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 pt-2 mb-1">Miri — nepálské číslo</p>
                            <ContactRow icon={<Phone className="w-4 h-4" />} label="Namaste / NTC">
                                <a href="tel:+9779843283599" className="text-white hover:text-gold-400 transition-colors">+977 9843283599</a>
                            </ContactRow>
                            <ContactRow icon={<Phone className="w-4 h-4" />} label="NCELL">
                                <a href="tel:+9779803154533" className="text-white hover:text-gold-400 transition-colors">+977 980 3154533</a>
                            </ContactRow>
                        </div>
                    </section>

                    {/* Agency */}
                    <section>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Cestovní agentura — 14summitsexpedition.cz</p>
                        <div className="space-y-3">
                            <div>
                                <p className="text-slate-500 text-[11px] uppercase font-bold tracking-wider mb-1.5">Honza Tráva</p>
                                <ContactRow icon={<Mail className="w-4 h-4" />} label="E-mail">
                                    <a href="mailto:info@14summitsexpedition.cz" className="text-gold-400 hover:text-gold-300 transition-colors">info@14summitsexpedition.cz</a>
                                </ContactRow>
                                <div className="mt-2">
                                    <ContactRow icon={<Phone className="w-4 h-4" />} label="Telefon">
                                        <a href="tel:+420776359536" className="text-white hover:text-gold-400 transition-colors">+420 776 359 536</a>
                                    </ContactRow>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="text-slate-500 text-[11px] uppercase font-bold tracking-wider mb-1.5">Miri Jirková</p>
                                <ContactRow icon={<Mail className="w-4 h-4" />} label="E-mail">
                                    <a href="mailto:miri@14summitsexpedition.cz" className="text-gold-400 hover:text-gold-300 transition-colors">miri@14summitsexpedition.cz</a>
                                </ContactRow>
                            </div>
                        </div>
                    </section>

                </div>
            </motion.div>
        </motion.div>
    );
}

function ContactRow({ icon, label, children }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-slate-600 shrink-0">{icon}</span>
            <span className="text-slate-500 text-xs w-32 shrink-0">{label}</span>
            <span className="text-sm">{children}</span>
        </div>
    );
}

const Contact = ({ scrollProgress }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [allContactsOpen, setAllContactsOpen] = useState(false);

    // PHASE 11: 0.87 -> 1.0 (End of the page)
    const containerOpacity = useTransform(scrollProgress, [0.87, 0.90, 0.97, 1.0], [0, 1, 1, 1]);
    const y = useTransform(scrollProgress, [0.87, 0.90, 1.0], ["-100%", "0%", "0%"]);

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
        <>
        {/* BACKGROUND LAYER - Behind Clouds */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 0 }}
            className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden pointer-events-none"
        >
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
        </motion.div>

        {/* CONTENT LAYER - Above Clouds */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 70 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pointer-events-auto h-full flex flex-col justify-center origin-center transition-transform duration-300 [@media(max-width:767px)]:scale-[0.95] [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.90] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.80] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.70] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.60]">

                <div className="text-center mb-3 md:mb-16 lg:mb-20">
                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.25em] text-xs font-bold mb-1 md:mb-4">
                        Kontakt
                    </h4>
                    <h2 className="font-serif text-2xl md:text-5xl lg:text-7xl text-white mb-2 md:mb-6">
                        Pojďme do toho.
                    </h2>
                    <p className="hidden md:block font-sans text-slate-400 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto font-light">
                        Ať už jde o sdílení příběhů, přednášku, nebo přípravu na další vrchol – nejlepší výpravy začínají prvním krokem.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-12 lg:gap-20 items-stretch">

                    {/* Left Column: Contact Info - hidden on mobile to save space */}
                    <div className="hidden lg:flex lg:col-span-5 flex-col justify-between">
                        <div className="space-y-6 md:space-y-10">
                            {/* E-mail */}
                            <div className="group">
                                <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 group-hover:text-gold-500 transition-colors">E-mail</h5>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300 shrink-0">
                                        <Mail className="w-6 h-6 text-slate-300 group-hover:text-gold-400" />
                                    </div>
                                    <div>
                                        <a href="mailto:honzatravatravnicek@gmail.com" className="text-white font-serif text-xl hover:text-gold-400 transition-colors block mb-0.5 break-all">
                                            honzatravatravnicek@gmail.com
                                        </a>
                                        <a href="mailto:info@14summitsexpedition.cz" className="text-slate-400 text-sm hover:text-gold-400 transition-colors block">
                                            info@14summitsexpedition.cz
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Telefon */}
                            <div className="group">
                                <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 group-hover:text-gold-500 transition-colors">Telefon & Sociální sítě</h5>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300 shrink-0">
                                        <Phone className="w-6 h-6 text-slate-300 group-hover:text-gold-400" />
                                    </div>
                                    <div>
                                        <a href="tel:+420776359536" className="text-white font-serif text-xl hover:text-gold-400 transition-colors block mb-1">
                                            +420 776 359 536
                                        </a>
                                        <p className="text-slate-400 text-sm">Instagram: <a href="https://instagram.com/honzatravatravnicek" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">@honzatravatravnicek</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social + full contacts button */}
                        <div className="mt-8 lg:mt-0 pt-6 border-t border-white/10 flex flex-col gap-4">
                            <div className="flex gap-4">
                                <a href="https://instagram.com/honzatravatravnicek" target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-110">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://www.facebook.com/honzatrava" target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-110">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                            <button
                                onClick={() => setAllContactsOpen(true)}
                                className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group"
                            >
                                Kompletní kontakty vč. Nepálu
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
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

                            {/* Mobile: compact contact + all-contacts button */}
                            <div className="flex flex-col gap-2 lg:hidden text-sm">
                                <a href="mailto:honzatravatravnicek@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors break-all">honzatravatravnicek@gmail.com</a>
                                <a href="tel:+420776359536" className="text-slate-300 hover:text-white transition-colors">+420 776 359 536</a>
                                <button
                                    type="button"
                                    onClick={() => setAllContactsOpen(true)}
                                    className="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group w-fit"
                                >
                                    Kompletní kontakty <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <button type="button" className="group w-full md:w-auto mt-6 flex items-center justify-center gap-4 bg-white text-slate-900 py-3 md:py-4 px-8 md:px-10 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-md">
                                Odeslat zprávu
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer text */}
                <div className="mt-8 md:mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs md:text-xs font-mono uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Honza Trávníček. Všechna práva vyhrazena.</p>
                    <p>Designed for the summit.</p>
                </div>
            </div>
        </motion.div>

        {/* All contacts modal */}
        <AnimatePresence>
            {allContactsOpen && <AllContactsModal onClose={() => setAllContactsOpen(false)} />}
        </AnimatePresence>
        </>
    );
};

export default Contact;
