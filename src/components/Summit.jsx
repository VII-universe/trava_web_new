import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { Trophy, Star, ChevronUp, X } from 'lucide-react';
import SummitImg from '../assets/summit_bg.png';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HonzaProfileImg from '../assets/honza_profile.png';
import BaseCampImg from '../assets/base_camp_bg.jpg';

const Summit = ({ scrollProgress }) => {
    const [isOsvetaOpen, setIsOsvetaOpen] = useState(false);

    useScrollLock(isOsvetaOpen);

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
        <>
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
            </motion.div>

            {/* Content Block */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-50 w-full h-full max-w-6xl pointer-events-auto flex flex-col items-center justify-center mx-auto px-4"
            >
                <div className="w-full p-5 md:p-8 lg:p-10 rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.15)] origin-top transition-transform duration-300 [@media(max-width:767px)]:scale-[0.80] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.90] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.80] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.70] flex flex-col">
                    
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full items-center text-left">
                        {/* Left Side: Text and Actions */}
                        <div className="flex-1 flex flex-col w-full">
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="flex items-center gap-3 md:gap-4 mb-4"
                            >
                                <div className="p-2.5 md:p-3 shrink-0 rounded-full bg-gold-400/20 backdrop-blur-sm border border-gold-400/30">
                                    <Trophy className="w-5 h-5 md:w-6 md:h-6 text-gold-600" />
                                </div>
                                <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] font-bold leading-snug">
                                    Zdravotní osvěta & neziskovky<br/><span className="text-slate-500 font-medium tracking-widest text-[8px] md:text-[9px]">8848 m. n. m.</span>
                                </h4>
                            </motion.div>

                            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-slate-900 mb-3 md:mb-5 leading-tight tracking-tight">
                                Kašpárek s nemocí,<br className="hidden lg:block"/>co to překonává.
                            </h2>

                            <div className="flex flex-col gap-3 md:gap-4">
                                {/* Osvěta Card */}
                                <div 
                                    onClick={() => setIsOsvetaOpen(true)}
                                    className="bg-slate-50 hover:bg-slate-100 transition-all duration-300 cursor-pointer border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-sm relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold-400/20 transition-colors" />
                                    <h3 className="font-serif text-xl md:text-2xl text-slate-900 mb-2 group-hover:text-gold-600 transition-colors flex items-center justify-between relative z-10">
                                        Naše Osvěta <span className="text-gold-500 font-sans group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </h3>
                                    <p className="font-sans text-slate-700 leading-relaxed text-sm mb-2 font-medium relative z-10">
                                        Spolupráce pro FUCK CANCER a REVMA LIGA. Ukazujeme, že s nemocí život nekončí.
                                    </p>
                                    <p className="font-sans text-slate-500 leading-relaxed text-[10px] md:text-[11px] relative z-10 line-clamp-1">
                                        Odborníci: doc. Arenbergerová, dr. Šedová, dr. Brisulda, Helča Vomáčková...
                                    </p>
                                </div>

                                {/* Buttons Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                                    <button 
                                        onClick={() => window.scrollTo({ top: document.body.scrollHeight * 0.90, behavior: 'smooth' })}
                                        className="w-full px-4 py-3 bg-white hover:bg-slate-900 hover:text-white rounded-xl text-center font-sans text-[13px] md:text-sm font-bold text-slate-800 transition-all shadow-sm border border-slate-200 flex justify-center items-center gap-2 group"
                                    >
                                        Příběhy z expedic <span className="text-gold-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </button>
                                    <button 
                                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                        className="w-full px-4 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-xl text-center font-sans text-[13px] md:text-sm font-bold transition-all shadow-md flex justify-center items-center gap-2 group"
                                    >
                                        Kontakt a Booking <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Photo Gallery (hidden on mobile to save space) */}
                        <div className="hidden md:flex w-full md:w-[45%] lg:w-[40%] flex-col gap-3 shrink-0 mt-4 md:mt-0">
                            {/* Main large image */}
                            <div className="w-full aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md relative group">
                                <img src={ClimbersImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Tým v akci" />
                                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                            </div>
                            {/* Two small images */}
                            <div className="flex flex-row gap-3">
                                <div className="flex-1 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm relative group">
                                    <img src={HonzaProfileImg} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" alt="Na vrcholu" />
                                    <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
                                </div>
                                <div className="flex-1 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm relative group">
                                    <img src={BaseCampImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Společná cesta" />
                                    <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to top row */}
                    <div className="flex justify-center w-full mt-6 md:mt-8 border-t border-slate-200/60 pt-5 md:pt-6">
                        <button
                            onClick={scrollToTop}
                            className="group relative px-6 py-2.5 bg-slate-900 text-white font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-all hover:bg-gold-500 rounded-full shadow-md hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            ZPĚT NA ZAČÁTEK <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
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
                        <div 
                            className="w-full md:w-[55%] p-8 md:p-14 lg:p-16 overflow-y-auto custom-scrollbar overscroll-contain"
                            data-lenis-prevent
                        >
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
                                        <strong>Doc. MUDr. Monika Arenbergerová</strong>, <strong>MUDr. Liliana Šedová</strong>, <strong>MUDr. Tomáš Brisuda</strong>, <strong>PhDr. Helena Vomáčková</strong>, <strong>MUDr. Martin Pospíchal</strong> a dalším odborníkům, kteří mě udržují v chodu a pomájí naší osvětové cestě odbornou erudicí.
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
        </>
    );
};

export default Summit;
