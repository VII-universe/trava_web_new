import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight, X, Download, Youtube, Globe, Video, FileText } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.webp';
import { loadContent } from '../data/adminStore';
import { useScrollLock } from '../hooks/useScrollLock';

const DEF_PROMO = [
  { id:'promopack2024',   name:'Promopack fotek Honza Tráva a Miri 2024',          type:'ZIP', url:'' },
  { id:'peakfest',        name:'Info k festivalu na Jizerce PEAK fest ZHORDOHOR',  type:'PDF', url:'' },
  { id:'plakat-cz',       name:'Promoplakát s životopisem Honza Tráva — česky',    type:'PDF', url:'' },
  { id:'plakat-en',       name:'Promoplakát s životopisem Honza Tráva — anglicky', type:'PDF', url:'' },
  { id:'promopack-honza', name:'Promopack fotek Honza Tráva',                      type:'ZIP', url:'' },
  { id:'promopack-miri',  name:'Promopack fotek Miri',                             type:'ZIP', url:'' },
  { id:'plakat-cz-tisk',  name:'Promoplakát s životopisem — česky TISKOVÁ VERZE',  type:'PDF', url:'' },
  { id:'plakat-en-tisk',  name:'Promoplakát s životopisem — anglicky TISKOVÁ VERZE',type:'PDF', url:'' },
  { id:'sponzor-cz',      name:'Nabídka pro sponzory (česky)',                     type:'PDF', url:'' },
  { id:'sponzor-en',      name:'Nabídka pro sponzory (anglicky)',                  type:'PDF', url:'' },
  { id:'prednasky-nabidka',name:'Nabídka projekcí a přednášek',                   type:'PDF', url:'' },
  { id:'broadpeak-k2',    name:'Nabídka na spolupráci — Expedice Broad Peak & K2', type:'PDF', url:'' },
];

function ContactModal({ onClose }) {
    const promo = loadContent('promo', DEF_PROMO);
    const hasPromo = promo.some(p => p.url);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 bg-slate-950/90 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                className="bg-slate-900 w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/8 shrink-0">
                    <div>
                        <h2 className="font-serif text-2xl text-white">Kontakty</h2>
                        <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-widest">Honza Tráva & tým</p>
                    </div>
                    <button onClick={onClose} className="p-2.5 rounded-full bg-white/8 hover:bg-white/15 text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>

                    {/* ── Hlavní kontakty ── */}
                    <div className="px-6 md:px-8 py-6 border-b border-white/8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Přímý kontakt</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a href="mailto:honzatravatravnicek@gmail.com"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/8 rounded-2xl transition-all group">
                                <Mail className="w-4 h-4 text-gold-400 shrink-0 pointer-events-none" />
                                <span className="text-sm text-white group-hover:text-gold-300 transition-colors truncate">honzatravatravnicek@gmail.com</span>
                            </a>
                            <a href="mailto:info@14summitsexpedition.cz"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/8 rounded-2xl transition-all group">
                                <Mail className="w-4 h-4 text-gold-400 shrink-0 pointer-events-none" />
                                <span className="text-sm text-white group-hover:text-gold-300 transition-colors truncate">info@14summitsexpedition.cz</span>
                            </a>
                            <a href="tel:+420776359536"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/8 rounded-2xl transition-all group">
                                <Phone className="w-4 h-4 text-gold-400 shrink-0 pointer-events-none" />
                                <span className="text-sm text-white group-hover:text-gold-300 transition-colors">+420 776 359 536</span>
                            </a>
                            <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-emerald-500/15 border border-white/8 hover:border-emerald-500/30 rounded-2xl transition-all group">
                                <Video className="w-4 h-4 text-emerald-400 shrink-0 pointer-events-none" />
                                <div>
                                    <span className="text-xs text-slate-400 block">Video hovor</span>
                                    <span className="text-sm text-white group-hover:text-emerald-300 transition-colors">Google Meet</span>
                                </div>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                            <a href="https://www.youtube.com/@honzatrava" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-red-500/15 border border-white/8 hover:border-red-500/30 rounded-2xl transition-all group">
                                <Youtube className="w-4 h-4 text-red-400 shrink-0 pointer-events-none" />
                                <div className="min-w-0">
                                    <span className="text-xs text-slate-400 block">YouTube</span>
                                    <span className="text-sm text-white truncate">@honzatrava</span>
                                </div>
                            </a>
                            <a href="https://www.facebook.com/honzatrava" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-blue-500/15 border border-white/8 hover:border-blue-500/30 rounded-2xl transition-all group">
                                <Facebook className="w-4 h-4 text-blue-400 shrink-0 pointer-events-none" />
                                <div className="min-w-0">
                                    <span className="text-xs text-slate-400 block">Facebook</span>
                                    <span className="text-sm text-white truncate">Honza „Tráva" Trávníček</span>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/honzatravatravnicek" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-pink-500/15 border border-white/8 hover:border-pink-500/30 rounded-2xl transition-all group">
                                <Instagram className="w-4 h-4 text-pink-400 shrink-0 pointer-events-none" />
                                <div className="min-w-0">
                                    <span className="text-xs text-slate-400 block">Instagram</span>
                                    <span className="text-sm text-white truncate">honzatravatravnicek</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* ── Expediční spojení ── */}
                    <div className="px-6 md:px-8 py-6 border-b border-white/8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Expediční spojení & kontakt Nepál</p>
                        <div className="space-y-3">
                            <div className="px-4 py-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">Expediční satelitní telefon</p>
                                        <p className="text-white text-sm font-mono">+8821 655 561 715</p>
                                        <p className="text-slate-400 text-xs mt-1">server Thuraya · SMS bez diakritiky, max. 160 znaků</p>
                                        <p className="text-slate-500 text-xs">Přes bránu SMS dojde, přes CS operátory jen občas</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="px-4 py-3 bg-white/5 border border-white/8 rounded-2xl">
                                    <p className="text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Tráva — Nepálská čísla</p>
                                    <div className="space-y-1">
                                        <p className="text-white text-sm font-mono">+977 9864277421 <span className="text-slate-500 text-xs">(Namaste, NTC)</span></p>
                                        <p className="text-white text-sm font-mono">+977 980 3147888 <span className="text-slate-500 text-xs">(NCELL)</span></p>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-white/5 border border-white/8 rounded-2xl">
                                    <p className="text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Miri — Nepálská čísla</p>
                                    <div className="space-y-1">
                                        <p className="text-white text-sm font-mono">+977 9843283599 <span className="text-slate-500 text-xs">(Namaste, NTC)</span></p>
                                        <p className="text-white text-sm font-mono">+977 980 3154533 <span className="text-slate-500 text-xs">(NCELL)</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Cestovní agentura ── */}
                    <div className="px-6 md:px-8 py-6 border-b border-white/8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Cestovní agentura 14summitsexpedition.cz</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <a href="https://14summitsexpedition.cz" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/8 rounded-2xl transition-all group">
                                <Globe className="w-4 h-4 text-gold-400 shrink-0" />
                                <span className="text-sm text-white group-hover:text-gold-300 transition-colors">14summitsexpedition.cz</span>
                            </a>
                            <div className="flex items-start gap-3 px-4 py-3 bg-white/5 border border-white/8 rounded-2xl">
                                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-400">Honza Tráva</p>
                                    <p className="text-sm text-white truncate">info@14summitsexpedition.cz</p>
                                    <p className="text-xs text-slate-400 font-mono">+420 776 359 536</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 px-4 py-3 bg-white/5 border border-white/8 rounded-2xl">
                                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-400">Miri Jirková</p>
                                    <p className="text-sm text-white truncate">miri@14summitsexpedition.cz</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Promo materiály ── */}
                    <div className="px-6 md:px-8 py-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Promo materiály</p>
                        <div className="space-y-2">
                            {/* Drive link — hlavní přístup */}
                            <a href="mailto:honzatravatravnicek@gmail.com?subject=Promo materiály"
                                className="flex items-center gap-3 px-4 py-3.5 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/25 hover:border-gold-500/45 rounded-2xl transition-all group">
                                <FileText className="w-4 h-4 text-gold-400 shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">Fotky, plakáty, životopis, sponzorské materiály</p>
                                    <p className="text-xs text-gold-400/70 mt-0.5">Napište nám — pošleme odkaz na aktuální materiály</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                            </a>
                            {/* Výčet co je k dispozici */}
                            <div className="px-4 py-3 bg-white/[0.04] border border-white/8 rounded-2xl">
                                <p className="text-xs text-slate-500 mb-2">K dispozici:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['Promopack fotek', 'Plakát CZ/EN', 'Životopis', 'Nabídka přednášek', 'Nabídka pro sponzory', 'Materiály Miri'].map(t => (
                                        <span key={t} className="text-[10px] text-slate-400 bg-white/5 border border-white/8 rounded-full px-2.5 py-1">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const Contact = ({ scrollProgress }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [contactOpen, setContactOpen] = useState(false);

    useScrollLock(contactOpen);

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
                <img loading="lazy" src={BaseCampImg} className="w-full h-full object-cover opacity-10 mix-blend-luminosity scale-110" alt="Background" />
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pointer-events-auto h-full flex flex-col justify-center origin-center transition-transform duration-300 [@media(max-width:767px)]:scale-100 [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.90] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.80] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.70] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.60]">

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

                    {/* Left Column: Contact Info */}
                    <div className="hidden lg:flex lg:col-span-5 flex-col justify-between">
                        <div className="space-y-6 md:space-y-12">
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

                            <div className="group">
                                <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 group-hover:text-gold-500 transition-colors">Základní Tábor</h5>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300">
                                        <MapPin className="w-6 h-6 text-slate-300 group-hover:text-gold-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-serif text-2xl mb-1">Czech Pub Nepal</p>
                                        <p className="text-slate-400 text-sm">Thamel, Káthmándú, Nepál</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 lg:mt-0 pt-6 border-t border-white/10 space-y-4">
                            <h5 className="text-slate-500 text-xs tracking-widest uppercase font-bold mb-4 md:mb-6">Sledujte cestu</h5>
                            <div className="flex gap-3">
                                <a href="https://www.instagram.com/honzatravatravnicek" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-110" title="Instagram">
                                    <Instagram className="w-5 h-5 pointer-events-none" />
                                </a>
                                <a href="https://www.facebook.com/honzatrava" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-110" title="Facebook">
                                    <Facebook className="w-5 h-5 pointer-events-none" />
                                </a>
                                <a href="https://www.youtube.com/@honzatrava" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 hover:scale-110" title="YouTube">
                                    <Youtube className="w-5 h-5 pointer-events-none" />
                                </a>
                            </div>

                            {/* Newsletter card */}
                            <div className="mt-6 p-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-left pointer-events-auto">
                                <h5 className="text-gold-500 text-xs tracking-widest uppercase font-bold mb-2">Newsletter</h5>
                                <p className="text-slate-400 text-xs mb-3 font-sans leading-relaxed">Dostávejte novinky a termíny přednášek přímo do e-mailu.</p>
                                <form onSubmit={(e) => { e.preventDefault(); alert('Děkujeme za přihlášení k odběru newsletteru!'); e.target.reset(); }} className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Váš e-mail"
                                        required
                                        className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                    <button type="submit" className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold uppercase text-[10px] tracking-wider rounded-xl active:scale-95 transition-transform flex items-center gap-1">
                                        Odeslat <ArrowRight className="w-3.5 h-3.5 pointer-events-none" />
                                    </button>
                                </form>
                            </div>

                            <button
                                onClick={() => setContactOpen(true)}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 rounded-xl text-white text-sm font-bold uppercase tracking-wider transition-all pointer-events-auto"
                            >
                                Všechny kontakty & promo materiály <ArrowRight className="w-4 h-4 pointer-events-none" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile contact strip */}
                    <div className="lg:hidden flex flex-col gap-3 w-full pointer-events-auto">
                        <div className="flex flex-wrap justify-center gap-2 -mt-1">
                            <a href="mailto:booking@honzatrava.cz" className="flex items-center gap-2 px-4 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white text-xs font-semibold hover:bg-gold-500/20 hover:border-gold-500/40 transition-all">
                                <Mail className="w-3.5 h-3.5 text-gold-400 pointer-events-none" /> booking@honzatrava.cz
                            </a>
                            <button
                                onClick={() => setContactOpen(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white text-xs font-semibold hover:bg-white/15 transition-all"
                            >
                                Kontakty & promo <ArrowRight className="w-3 h-3 pointer-events-none" />
                            </button>
                        </div>

                        {/* Mobile newsletter card */}
                        <div className="w-full max-w-sm mx-auto mt-2 p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-center">
                            <h5 className="text-gold-500 text-xs tracking-widest uppercase font-bold mb-1">Odběr newsletteru</h5>
                            <p className="text-slate-400 text-[11px] mb-3">Zadejte e-mail a neuteče vám žádná přednáška ani výprava.</p>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Děkujeme za přihlášení k odběru newsletteru!'); e.target.reset(); }} className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Váš e-mail"
                                    required
                                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500 transition-colors"
                                />
                                <button type="submit" className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold uppercase text-[10px] tracking-wider rounded-xl transition-all">
                                    Přihlásit
                                </button>
                            </form>
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

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="contact-newsletter"
                                    className="rounded border-white/20 bg-transparent text-gold-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                />
                                <label htmlFor="contact-newsletter" className="text-xs text-slate-400 cursor-pointer select-none">
                                    Chci odebírat novinky a newsletter z mých cest.
                                </label>
                            </div>

                            <button type="button" className="group w-full md:w-auto mt-6 flex items-center justify-center gap-4 bg-white text-slate-900 py-3 md:py-4 px-8 md:px-10 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold-50 hover:text-white transition-all duration-300 shadow-md">
                                Odeslat zprávu
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform pointer-events-none" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer text */}
                <div className="mt-8 md:mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-slate-600 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                        <p>© {new Date().getFullYear()} Jan Trávníček. Všechna práva vyhrazena.</p>
                        <span className="hidden md:inline text-slate-700">·</span>
                        <p className="text-slate-700">IČO: 68234581 · Plzeň, Česká republika</p>
                    </div>
                    <p className="text-slate-700">Designed for the summit.</p>
                </div>
            </div>
        </motion.div>

        {/* Contact Modal */}
        <AnimatePresence>
            {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        </AnimatePresence>
        </>
    );
};

export default Contact;
