import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';
import HonzaProfile from '../assets/honza_profile.png';

const About = ({ scrollProgress }) => {
    const [isStoryOpen, setIsStoryOpen] = useState(false);

    // PHASE 2: 0.20 -> 0.40

    // Transition In
    // PHASE 2: start earlier and exit earlier with overlap handoff (0.12 -> 0.25)
    const containerOpacity = useTransform(scrollProgress, [0.12, 0.16, 0.21, 0.24], [0, 1, 1, 0]);
    const containerScale = useTransform(scrollProgress, [0.12, 0.16], [0.9, 1]);
    const containerY = useTransform(scrollProgress, [0.12, 0.16, 0.18, 0.23], ["100%", "0%", "0%", "120%"]);
    const bgY = useTransform(scrollProgress, [0.10, 0.26], ["-15%", "15%"]);

    // Parallax Layers
    const sideLayerLeftX = useTransform(scrollProgress, [0.14, 0.22], ["0%", "-50%"]);
    const sideLayerRightX = useTransform(scrollProgress, [0.14, 0.22], ["0%", "50%"]);
    const sideLayerOpacity = useTransform(scrollProgress, [0.14, 0.22], [0.8, 0]);

    // Honza Profile Layer — faster arrival
    const honzaX = useTransform(scrollProgress, [0.12, 0.20], ["18%", "5%"]); // Coming from right faster
    const honzaY = useTransform(scrollProgress, [0.12, 0.18, 0.18, 0.23], ["24%", "0%", "0%", "5%"]); // earlier float
    const honzaScale = useTransform(scrollProgress, [0.12, 0.20], [0.95, 1.12]); // quicker zoom
    const honzaOpacity = useTransform(scrollProgress, [0.12, 0.16, 0.21, 0.24], [0, 1, 1, 0]);

    // Transition Out — "odsunutí" sekce při nájezdu Icefall
    // Icefall přijíždí shora ([-100% -> 0%]), takže About se současně
    // odsouvá dolů přes hlavní containerY. Zde vypínáme dodatečný pohyb dolů, 
    // aby se rychlost nesčítala a vrstvy se posouvaly synchronně s Partnery.
    // Pro minimalizaci mezery prodlužujeme zobrazení až do 0.25
    const exitOpacity = useTransform(scrollProgress, [0.18, 0.23], [1, 0.4]);
    const exitScale = useTransform(scrollProgress, [0.18, 0.23], [1, 0.98]);
    const exitY = useTransform(scrollProgress, [0.18, 0.23], ['0%', '0%']);
    const exitX = useTransform(scrollProgress, [0.18, 0.23], ['0%', '0%']);

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{ scale: containerScale, y: containerY }}
                className="w-full h-full relative flex items-center justify-start px-6 md:px-20 lg:px-32"
            >
                <motion.div
                    style={{
                        opacity: exitOpacity, scale: exitScale, y: exitY, x: exitX,
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)'
                    }}
                    className="w-full h-full absolute inset-0 z-0 origin-bottom"
                >
                    {/* SOLID BACKING LAYER - Blocks previous section */}
                    <div className="absolute inset-0 bg-ivory" />

                    {/* IMAGE LAYER */}
                    <motion.img
                        style={{ y: bgY }}
                        src={BaseCampImg}
                        alt="Base Camp Tents"
                        className="absolute inset-0 w-full h-full object-cover object-bottom opacity-80 filter sepia-[.2] grayscale-[.3] contrast-125 brightness-105 scale-110 origin-center"
                    />
                </motion.div>

                {/* Layers */}
                <motion.div
                    style={{ x: sideLayerLeftX, opacity: sideLayerOpacity }}
                    className="absolute left-0 bottom-0 w-[30%] h-[80%] z-10 bg-ivory/20 blur-[40px] mix-blend-screen pointer-events-none"
                />
                <motion.div
                    style={{ x: sideLayerRightX, opacity: sideLayerOpacity }}
                    className="absolute right-0 bottom-0 w-[30%] h-[80%] z-10 bg-ivory/20 blur-[40px] mix-blend-screen pointer-events-none"
                />

                {/* HONZA PROFILE LAYER */}
                <motion.div
                    style={{
                        x: honzaX,
                        y: honzaY,
                        scale: honzaScale,
                        opacity: honzaOpacity,
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.1))'
                    }}
                    className="absolute right-0 bottom-0 w-[60%] h-[90%] z-20 pointer-events-none flex items-end justify-end overflow-hidden"
                >
                    <img
                        src={HonzaProfile}
                        alt="Honza"
                        className="w-full h-full object-contain object-right-bottom mix-blend-normal"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    style={{ opacity: exitOpacity, y: exitY, x: exitX }}
                    className="relative z-50 max-w-xl p-10 md:p-14 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md shadow-2xl shadow-slate-200/50 pointer-events-auto mt-20"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">Kdo je Honza Tráva — 800 m</h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                        Nehraju si na <span className="italic text-slate-600">hrdinu.</span>
                    </h2>
                    <p className="font-sans text-slate-800 leading-relaxed mb-10 text-lg">
                        Horolezec, cestovatel, dobrodruh, podnikatel. Život mezi ČR a Nepálem. Jsem autentický příběh člověka, který překonal rakovinu i psoriatickou artritidu. Ne proto, abych dobyl vrchol, ale abych našel cestu zpátky.
                    </p>
                    <button 
                        onClick={() => setIsStoryOpen(true)}
                        className="group flex items-center gap-3 text-slate-900 font-medium tracking-wide hover:text-gold-600 transition-colors duration-300"
                    >
                        <span className="relative">
                            Můj celý příběh
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-slate-400 group-hover:bg-gold-400 transition-colors duration-300" />
                        </span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>

                {/* ── Story Modal ── */}
                <AnimatePresence>
                    {isStoryOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                            onClick={() => setIsStoryOpen(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-ivory w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                            >
                                <button 
                                    onClick={() => setIsStoryOpen(false)}
                                    className="absolute top-6 right-6 z-10 p-3 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 transition-colors backdrop-blur-sm"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Left: Text Content */}
                                <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-16 overflow-y-auto custom-scrollbar">
                                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                        Příběh, který se stal
                                    </h4>
                                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                                        Cesta zpátky <br/><span className="italic text-slate-600">k sobě.</span>
                                    </h2>
                                    
                                    <div className="prose prose-slate prose-lg">
                                        <p className="font-sans text-slate-800 leading-relaxed font-medium mb-4">
                                            Nikdy jsem neplánoval být na osmitisícovkách. Můj život byl donedávna o něčem úplně jiném. Až do chvíle, kdy mi do života vstoupila rakovina a psoriatická artritida. Tyto dvě rány mě srazily na úplné dno, z místa, kde se svět zdál být jako jistota.
                                        </p>
                                        <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                            Lékaři, nemocnice, nejistota. Změnilo to všechny moje plány a hodnoty. Najednou nešlo o to, co vybuduji v kariéře, ale jestli vůbec přežiju. Místo toho, abych se poddal, rozhodl jsem se vzepřít. Hory se staly mým lékem, mým psychickým i fyzickým útočištěm.
                                        </p>
                                        <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                            Dnes žiju napůl v České republice a napůl v Nepálu. Himaláje nejsou jenom obří skály, které chci dobýt; jsou mým druhým domovem, místem, kde cítím nejhlubší pokoru. Každý krok nahoru za hranici 8000 metrů beru jako dar. Dýchám za ty, kteří už nemohou, a snažím se ukázat, že překonat se dá i to, co vypadá jako konec.
                                        </p>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-slate-300">
                                        <blockquote className="font-serif text-2xl text-slate-800 italic leading-snug">
                                            „Nehraju si na hrdinu. V horách nikdo není hrdina, všechny nás dříve nebo později srovnají na kolena.“
                                        </blockquote>
                                    </div>
                                </div>

                                {/* Right: Photo Grid */}
                                <div className="w-full md:w-1/2 bg-slate-900 p-2 md:p-4 grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 overflow-y-auto">
                                    <div className="relative rounded-2xl overflow-hidden group">
                                        <img src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Mountain Landscape" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden group row-span-2">
                                        <img src="https://images.unsplash.com/photo-1525816922573-0373ab11f181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Climbing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden group">
                                        <img src="https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Nepal Valley" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default About;
