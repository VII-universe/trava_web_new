import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';
import HonzaProfile from '../assets/honza_profile.png';

const About = ({ scrollProgress }) => {
    // PHASE 2: 0.20 -> 0.40

    // Transition In
    const containerOpacity = useTransform(scrollProgress, [0.15, 0.25], [0, 1]);
    const containerScale = useTransform(scrollProgress, [0.15, 0.3], [0.8, 1]);
    const containerY = useTransform(scrollProgress, [0.15, 0.25], ["100%", "0%"]);

    // Parallax Layers
    const sideLayerLeftX = useTransform(scrollProgress, [0.2, 0.4], ["0%", "-50%"]);
    const sideLayerRightX = useTransform(scrollProgress, [0.2, 0.4], ["0%", "50%"]);
    const sideLayerOpacity = useTransform(scrollProgress, [0.2, 0.4], [0.8, 0]);

    // Honza Profile Layer (Parallax + Zoom)
    // He should arrive slightly slower and zoom in
    const honzaX = useTransform(scrollProgress, [0.2, 0.4], ["15%", "5%"]); // Coming from right
    const honzaY = useTransform(scrollProgress, [0.15, 0.25, 0.35, 0.45], ["20%", "0%", "0%", "20%"]); // Float in/out
    const honzaScale = useTransform(scrollProgress, [0.2, 0.4], [0.95, 1.1]); // Subtle zoom
    const honzaOpacity = useTransform(scrollProgress, [0.18, 0.23, 0.37, 0.42], [0, 1, 1, 0]);

    // Transition Out — "odsunutí" sekce při nájezdu Icefall
    // Icefall přijíždí shora ([-100% -> 0%]), takže About se současně
    // odsouvá dolů a lehce do strany, aby působilo jako vytlačení.
    const exitOpacity = useTransform(scrollProgress, [0.35, 0.45], [1, 0]);
    const exitScale = useTransform(scrollProgress, [0.35, 0.45], [1, 0.94]);
    // stejné časování jako Partners (Icefall): interval 0.35 -> 0.45
    const exitY = useTransform(scrollProgress, [0.35, 0.45], ['0%', '100%']);
    const exitX = useTransform(scrollProgress, [0.35, 0.45], ['0%', '-8%']);

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
                    <img
                        src={BaseCampImg}
                        alt="Base Camp Tents"
                        className="w-full h-full object-cover object-bottom opacity-80 filter sepia-[.2] grayscale-[.3] contrast-125 brightness-105"
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
                    <button className="group flex items-center gap-3 text-slate-900 font-medium tracking-wide hover:text-gold-600 transition-colors duration-300">
                        <span className="relative">
                            Můj celý příběh
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-slate-400 group-hover:bg-gold-400 transition-colors duration-300" />
                        </span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default About;
