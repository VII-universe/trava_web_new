import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Tag } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import IcefallImage from '../assets/icefall_bg.jpg';
import SingingRockLogo from '../assets/svg/singingrock_logo.svg';
import RockPointLogo from '../assets/svg/rockpoint_logo.svg';
import YateLogo from '../assets/svg/yate_logo.jpg';
import HoneyBeanLogo from '../assets/svg/honeybean_logo.png';
import MoreThanHoneyLogo from '../assets/svg/morethanhoney_logo.png';

const CURRENT_PARTNERS = [
    { name: 'PROGRESS',        logo: null,               discount: null,          logoClass: '' },
    { name: 'Singing Rock',    logo: SingingRockLogo,    discount: null,          logoClass: 'brightness-0' },
    { name: 'Rock Point',      logo: RockPointLogo,      discount: null,          logoClass: '' },
    { name: 'YATE',            logo: YateLogo,           discount: null,          logoClass: '' },
    { name: 'Adventure Menu',  logo: null,               discount: null,          logoClass: '' },
    { name: 'More Than Honey', logo: MoreThanHoneyLogo,  discount: 'honzatrava10', logoClass: '' },
    { name: 'Honey Bean',      logo: HoneyBeanLogo,      discount: 'honzatrava10', logoClass: '' },
];

const PAST_PARTNERS = [
    'Ternua', 'Lowa', 'Rafiki Climbing', 'Nikon CZ/SK', 'Auto Moto Horejsek Group',
];

const Partners = ({ scrollProgress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useScrollLock(isModalOpen);

    const containerOpacity = useTransform(scrollProgress, [0.18, 0.22, 0.28, 0.32], [0, 1, 1, 0]);
    const containerY      = useTransform(scrollProgress, [0.18, 0.24, 0.28, 0.34], ['100%', '0%', '0%', '-50%']);
    const bgY             = useTransform(scrollProgress, [0.16, 0.36], ['-10%', '10%']);

    return (
        <>
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
        >
            <motion.div
                style={{ y: containerY }}
                className="w-full h-full relative flex flex-col items-center justify-center"
            >
                {/* Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.img
                        style={{ y: bgY }}
                        src={IcefallImage}
                        alt=""
                        className="w-full h-[115%] object-cover scale-110 grayscale opacity-35 origin-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/70 to-ivory/90" />
                </div>

                {/* Main content */}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-10 lg:px-16 pointer-events-auto">

                    {/* Label */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-5 h-px bg-gold-400 shrink-0" />
                        <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                            Partneři · Ledopád (3000 m)
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">

                        {/* Left: text + CTA */}
                        <div className="lg:w-2/5 shrink-0">
                            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                                Partneři <span className="italic text-slate-500">na cestě.</span>
                            </h2>
                            <p className="font-sans text-slate-700 leading-relaxed text-sm md:text-base mb-3">
                                Spolupráce pro nás nikdy nebyly jen o logách na bundách nebo reklamních kampaních.
                                Máme rádi dlouhodobé vztahy, důvěru a značky, které si na nic nehrají — stejně jako my.
                            </p>
                            <p className="font-sans text-slate-500 text-sm leading-relaxed mb-6">
                                Většinu partnerů používáme v horách, na cestách i v běžném životě mnoho let.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-300"
                            >
                                O spolupráci více
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Right: partner logo grid */}
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2.5">
                                {CURRENT_PARTNERS.map((p) => (
                                    <div
                                        key={p.name}
                                        className="relative group bg-white rounded-2xl border border-slate-200 p-3 md:p-4 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[90px] shadow-sm hover:shadow-md hover:border-gold-300 transition-all duration-200"
                                    >
                                        {p.logo ? (
                                            <img
                                                src={p.logo}
                                                alt={p.name}
                                                className={`max-h-10 md:max-h-12 max-w-full object-contain ${p.logoClass}`}
                                            />
                                        ) : (
                                            <span className="font-serif text-slate-800 font-bold text-sm md:text-base text-center leading-tight">
                                                {p.name}
                                            </span>
                                        )}
                                        {p.discount && (
                                            <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                                <Tag className="w-2 h-2" /> kód
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Past partners — clearly visible row */}
                            <div className="mt-4 px-4 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/80">
                                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">Dříve také</p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                                    {PAST_PARTNERS.map((name) => (
                                        <span key={name} className="font-sans text-xs text-slate-600 font-medium">
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>

        {/* ── Modal ── */}
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setIsModalOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -16 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Hero */}
                        <div className="relative h-36 md:h-44 shrink-0 overflow-hidden">
                            <img src={IcefallImage} alt="" className="w-full h-full object-cover object-center" />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950/95" />
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm border border-white/15"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-5 left-6">
                                <span className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold block mb-1.5">Spolupráce</span>
                                <h2 className="font-serif text-2xl md:text-3xl text-white leading-none">
                                    Partneři <span className="italic text-slate-300">na cestě.</span>
                                </h2>
                            </div>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar px-6 md:px-10 py-7 md:py-9" data-lenis-prevent>

                            {/* Intro text */}
                            <p className="font-sans text-slate-800 leading-relaxed font-medium mb-3 text-sm md:text-base">
                                Spolupráce pro nás nikdy nebyly jen o logách na bundách nebo reklamních kampaních.
                                Máme rádi dlouhodobé vztahy, důvěru a značky, které si na nic nehrají — stejně jako my.
                            </p>
                            <p className="font-sans text-slate-600 leading-relaxed text-sm mb-6">
                                Většinu partnerů používáme v horách, na cestách i v běžném životě mnoho let.
                                Ať už jde o vybavení do vysokých hor, jídlo na expedice, oblečení, outdoorové zázemí nebo projekty
                                spojené se zdravím a cestováním, vždy je pro nás důležité hlavně to, aby za značkou stáli
                                fajn lidé a věci opravdu fungovaly v praxi.
                            </p>

                            {/* Current partners */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-4 h-px bg-gold-400 shrink-0" />
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600">Aktuální spolupráce</h3>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                                {CURRENT_PARTNERS.map((p) => (
                                    <div
                                        key={p.name}
                                        className="relative bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center gap-3 shadow-sm"
                                    >
                                        {p.logo ? (
                                            <img
                                                src={p.logo}
                                                alt={p.name}
                                                className={`max-h-12 max-w-full object-contain ${p.logoClass}`}
                                            />
                                        ) : (
                                            <span className="font-serif text-slate-900 font-bold text-base text-center leading-tight">
                                                {p.name}
                                            </span>
                                        )}
                                        {p.logo && (
                                            <span className="font-sans text-slate-500 text-[10px] font-medium text-center">{p.name}</span>
                                        )}
                                        {p.discount && (
                                            <div className="w-full mt-1 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5">
                                                <Tag className="w-3 h-3 text-gold-500 shrink-0" />
                                                <code className="text-[11px] font-bold text-gold-600 tracking-wider">
                                                    {p.discount}
                                                </code>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Past partners */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-4 h-px bg-slate-300 shrink-0" />
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Dřívější spolupráce</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {PAST_PARTNERS.map((name) => (
                                    <span
                                        key={name}
                                        className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>

                            {/* Closing note */}
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                                <p className="font-sans text-slate-600 text-sm leading-relaxed italic">
                                    Nebereme to jako „sponzoring výkonu". Spíš jako partnerství lidí, které spojuje podobný
                                    pohled na hory, cestování, poctivou práci a dlouhodobé vztahy.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Partners;
