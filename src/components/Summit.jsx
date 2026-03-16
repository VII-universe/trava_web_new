import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ChevronUp, X } from 'lucide-react';
import SummitImg from '../assets/summit_bg.png';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HonzaProfileImg from '../assets/honza_profile.png';
import BaseCampImg from '../assets/base_camp_bg.jpg';

const Summit = ({ scrollProgress }) => {
    const [isOsvetaOpen, setIsOsvetaOpen] = useState(false);

    // PHASE 8: 0.82 -> 0.96 with slower exit + earlier Contact following

    const opacity = useTransform(scrollProgress, [0.79, 0.81, 0.94, 0.99], [0, 1, 1, 1]);
    const scale = useTransform(scrollProgress, [0.82, 0.90], [1.08, 1]);
    const y = useTransform(scrollProgress, [0.79, 0.84, 0.94, 0.99], ["-100%", "0%", "0%", "90%"]);
    const bgY = useTransform(scrollProgress, [0.78, 1.0], ["-10%", "10%"]);

    // Content animations
    const contentOpacity = useTransform(scrollProgress, [0.84, 0.90, 0.94, 0.98], [0, 1, 1, 0]);
    const contentY = useTransform(scrollProgress, [0.84, 0.90, 0.94, 0.98], [50, 0, 0, 120]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden z-40"
        >
            <motion.div
                style={{
                    scale,
                    // keep bottom transparency to hide sharp lower edge over previous elements, but make top solid
                    maskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 230px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 230px), transparent 100%)'
                }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                {/* Background Image */}
                <motion.img
                    style={{ y: bgY }}
                    src={SummitImg}
                    alt="Everest Summit"
                    className="absolute inset-0 w-full h-full object-cover object-center brightness-95 saturate-75 contrast-110 scale-125 origin-center"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-700/15 to-ivory/55" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.28)_100%)]" />
                
                {/* POLAROID 1 - Top Left */}
                <motion.div
                    initial={{ opacity: 0, rotate: -20, x: -100 }}
                    whileInView={{ opacity: 1, rotate: -12, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.1 }}
                    className="absolute top-10 left-4 md:top-16 md:left-[10%] lg:top-20 lg:left-[18%] w-56 md:w-[20rem] lg:w-[24rem] bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200 hidden sm:block z-20 pointer-events-auto cursor-pointer hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 group"
                >
                    <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                        <img src={ClimbersImg} className="w-full h-full object-cover grayscale-0 sepia-0" alt="Horolezci" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-sm md:text-base font-medium">Tým v akci</div>
                </motion.div>

                {/* POLAROID 2 - Top Right */}
                <motion.div
                    initial={{ opacity: 0, rotate: 20, x: 100 }}
                    whileInView={{ opacity: 1, rotate: 14, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute top-48 right-4 md:top-32 md:right-[5%] lg:top-40 lg:right-[15%] w-56 md:w-[20rem] lg:w-[24rem] bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200 hidden sm:block z-20 pointer-events-auto cursor-pointer hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 group"
                >
                    <div className="w-full aspect-[4/5] bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                        <img src={HonzaProfileImg} className="w-full h-full object-cover object-top grayscale-0" alt="Honza Profil" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-sm md:text-base font-medium">Na vrcholu</div>
                </motion.div>

                {/* POLAROID 3 - Bottom Left/Center */}
                <motion.div
                    initial={{ opacity: 0, rotate: -10, y: 100 }}
                    whileInView={{ opacity: 1, rotate: -6, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-10 left-1/4 md:bottom-16 md:left-[20%] lg:bottom-24 lg:left-[28%] w-56 md:w-[20rem] lg:w-[25rem] bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200 hidden md:block z-20 pointer-events-auto cursor-pointer hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 group"
                >
                    <div className="w-full aspect-square bg-slate-200 overflow-hidden relative group-hover:shadow-inner transition-all">
                        <img src={BaseCampImg} className="w-full h-full object-cover grayscale-0" alt="Základní tábor" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-5 left-0 w-full text-center font-serif italic text-slate-800 text-sm md:text-base font-medium">Společná cesta</div>
                </motion.div>
            </motion.div>

            {/* Content Block */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-50 text-center max-w-3xl pointer-events-auto px-6 py-10 md:py-12 rounded-3xl bg-white/85 backdrop-blur-md border border-white/60 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="p-4 rounded-full bg-gold-400/20 backdrop-blur-sm border border-gold-400/30">
                        <Trophy className="w-12 h-12 text-gold-500" />
                    </div>
                </motion.div>

                <h4 className="text-gold-700 font-sans uppercase tracking-[0.4em] text-sm font-bold mb-4 drop-shadow-md">
                    Zdravotní osvěta & média — 8848 m
                </h4>

                <h2 className="font-serif text-6xl md:text-7xl text-slate-950 mb-8 leading-none tracking-tight drop-shadow-md">
                    Kašpárek s nemocí, co to překonává.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl mx-auto mt-8">
                    <div 
                        onClick={() => setIsOsvetaOpen(true)}
                        className="glass-card bg-white/60 hover:bg-white/80 transition-colors cursor-pointer border-white/40 p-8 shadow-xl group"
                    >
                        <h3 className="font-serif text-3xl text-slate-950 mb-4 group-hover:text-gold-600 transition-colors">Osvěta &rarr;</h3>
                        <p className="font-sans text-slate-800 leading-relaxed text-lg mb-4 font-medium">
                            Spolupráce a osvěta pro FUCK CANCER a REVMA LIGA.
                        </p>
                        <p className="font-sans text-slate-700 leading-relaxed text-sm">
                            Spolupráce s lékaři: doc. Arenbergerová, dr. Šedová, dr. Brisulda, Helča Vomáčková, Martin Pospíchal.
                        </p>
                    </div>
                    <div className="glass-card bg-white/60 border-white/40 p-8 shadow-xl">
                        <h3 className="font-serif text-3xl text-slate-950 mb-4">Média & Kontakt</h3>
                        <ul className="space-y-3 text-slate-800 font-sans text-lg font-medium">
                            <li>Blog (nezávislé příběhy z expedic)</li>
                            <li>YouTube (vlogy, zákulisí)</li>
                            <li>Podcast (příprava 2027)</li>
                            <li>Kontakt a Booking formulář</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 mt-16">
                    <button
                        onClick={scrollToTop}
                        className="group relative px-12 py-5 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-gold-500 rounded-full shadow-lg shadow-black/20 hover:shadow-gold-500/40 hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            ZPĚT DO ÚDOLÍ <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>

                    <div className="flex gap-4 opacity-50">
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                    </div>
                </div>
            </motion.div>

            {/* Osvěta Modal */}
            <AnimatePresence>
                {isOsvetaOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                        onClick={() => setIsOsvetaOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-ivory w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                        >
                            <button 
                                onClick={() => setIsOsvetaOpen(false)}
                                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/50 hover:bg-white/80 text-slate-900 transition-colors backdrop-blur-md shadow-sm border border-white/40"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Left: Text Content */}
                            <div className="w-full md:w-[55%] p-8 md:p-14 lg:p-16 overflow-y-auto custom-scrollbar">
                                <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                    Pomáháme a sdílíme
                                </h4>
                                <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                                    Zdravotní osvěta
                                </h2>
                                
                                <div className="prose prose-slate prose-lg max-w-none">
                                    <p className="font-sans text-slate-800 leading-relaxed font-medium mb-6">
                                        Hory pro mě znamenají hodně, ale zdraví je to nejdůležitější. Protože sám vím, jaké to je stát se "kašpárkem s nemocí", věnuji spoustu energie zdravotní osvětě a pacientským organizacím.
                                    </p>
                                    
                                    <h3 className="font-serif text-2xl text-slate-900 mt-8 mb-4">Revma Liga a psoriatická artritida</h3>
                                    <p className="font-sans text-slate-700 leading-relaxed mb-6">
                                        Aktivně spolupracujeme s <strong>Revma Ligou</strong>. Chceme ukázat, že i s diagnózou, jako je psoriatická artritida, život nekončí a dají se dělat úžasné věci – ať už to znamená vylézt na osmitisícovku, nebo prostě jen najít sílu na běžný denní fungování. Snažíme se bořit mýty a dodávat pacientům motivaci.
                                    </p>

                                    <h3 className="font-serif text-2xl text-slate-900 mt-8 mb-4">Fuck Cancer</h3>
                                    <p className="font-sans text-slate-700 leading-relaxed mb-6">
                                        Podporuji iniciativu <strong>Fuck Cancer</strong>, která sdružuje mladé pacienty onkologických onemocnění (tzv. Heroes), survivors a všechny ty, kteří jim v jejich cestě pomáhají. Otevíráme těžká témata a šíříme povědomí o prevenci.
                                    </p>

                                    <div className="mt-12 p-6 bg-slate-100 rounded-2xl border border-slate-200">
                                        <h4 className="font-serif text-xl text-slate-900 mb-3">Odborná spolupráce</h4>
                                        <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed">
                                            Mé kroky v osvětě a péči nejsou náhodné. Velké díky patří mým andělům strážným z oboru medicíny, se kterými konzultuji a spolupracuji: <br/><br/>
                                            <strong>Doc. MUDr. Monika Arenbergerová</strong>, <strong>MUDr. Liliana Šedová</strong>, <strong>MUDr. Tomáš Brisuda</strong>, <strong>PhDr. Helena Vomáčková</strong>, <strong>MUDr. Martin Pospíchal</strong> a dalším odborníkům, kteří mě udržují v chodu a pomáhají naší osvětové cestě odbornou erudicí.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right: Image */}
                            <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-0 bg-slate-900">
                                <img src={ClimbersImg} alt="Pomoc a osvěta" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                                    <div className="p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl">
                                        <div className="flex gap-2 mb-4">
                                            <Star className="w-5 h-5 text-gold-400 fill-gold-400"/>
                                            <Star className="w-5 h-5 text-gold-400 fill-gold-400"/>
                                            <Star className="w-5 h-5 text-gold-400 fill-gold-400"/>
                                        </div>
                                        <p className="font-serif italic text-xl md:text-2xl text-white leading-snug font-medium drop-shadow-md">
                                            "Hory jsou jen skály. Opravdový boj se odehrává v nás a našem těle."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Summit;
