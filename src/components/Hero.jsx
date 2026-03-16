import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import EverestImage from '../assets/mount_everest_ivory.png';
import LogoMain from '../assets/svg/honza_trava_logo_V1.svg';

const Hero = ({ scrollProgress }) => {
    // PHASE 1: 0.0 -> 0.20

    // Text
    const textY = useTransform(scrollProgress, [0, 0.15], ["0%", "-150%"]);
    const textOpacity = useTransform(scrollProgress, [0, 0.12], [1, 0]);
    const textScale = useTransform(scrollProgress, [0, 0.15], [1, 0.8]);

    // Everest - "The Deep Approach"
    const everestScale = useTransform(scrollProgress, [0, 1], [1, 3.5]);
    // Exit synced to About earlier entry (0.12 -> 0.20) for smoother handoff
    const everestY = useTransform(scrollProgress, [0, 0.12, 0.20, 1], ["10%", "-8%", "-110%", "-170%"]);
    const everestOpacity = useTransform(scrollProgress, [0.12, 0.20], [1, 0]);

    // Mist Layers
    const mistMidLeft = useTransform(scrollProgress, [0, 0.2], ["0%", "-80%"]);
    const mistMidRight = useTransform(scrollProgress, [0, 0.2], ["0%", "80%"]);
    const mistCloseLeft = useTransform(scrollProgress, [0, 0.18], ["0%", "-150%"]);
    const mistCloseRight = useTransform(scrollProgress, [0, 0.18], ["0%", "150%"]);
    const globalMistOpacity = useTransform(scrollProgress, [0, 0.18], [1, 0]);

    return (
        <section className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">

            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] to-[#E2E8F0] z-0" />

            {/* Everest - DEEP ZOOM */}
            <motion.div
                style={{
                    scale: everestScale,
                    y: everestY,
                    opacity: everestOpacity,
                    transformOrigin: "50% 80%" // PIVOT POINT: Borrom Center (The Base)
                }}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
                <img
                    src={EverestImage}
                    alt="Mount Everest"
                    className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply filter contrast-125 saturate-50"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' // Fade bottom edge
                    }}
                />
            </motion.div>

            {/* Text */}
            <motion.div
                style={{ y: textY, opacity: textOpacity, scale: textScale }}
                className="relative z-20 text-center flex flex-col items-center px-4"
            >
                <motion.h2 className="text-gold-500 font-sans tracking-[0.3em] text-sm uppercase mb-6 drop-shadow-sm">
                    Poutník mezi světy.
                </motion.h2>
                <motion.div className="flex justify-center w-full px-4 mb-4">
                    <img 
                        src={LogoMain} 
                        alt="Honza Tráva Logo" 
                        className="w-full max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1600px] h-auto object-contain drop-shadow-2xl" 
                    />
                </motion.div>
                <motion.div className="mt-12 flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-slate-500">Začni výstup.</span>
                    <ChevronDown className="w-5 h-5 text-gold-500 animate-bounce" />
                </motion.div>
            </motion.div>

            {/* LAYERS */}
            <motion.div style={{ x: mistMidLeft, opacity: globalMistOpacity }} className="absolute inset-0 z-30 pointer-events-none select-none">
                <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vh] bg-white rounded-full mix-blend-soft-light filter blur-[80px] opacity-60" />
            </motion.div>
            <motion.div style={{ x: mistMidRight, opacity: globalMistOpacity }} className="absolute inset-0 z-30 pointer-events-none select-none">
                <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vh] bg-white rounded-full mix-blend-soft-light filter blur-[80px] opacity-60" />
            </motion.div>

            <motion.div style={{ x: mistCloseLeft, opacity: globalMistOpacity }} className="absolute inset-0 z-40 pointer-events-none select-none">
                <div className="absolute -bottom-20 -left-[15%] w-[60vw] h-[80vh] bg-gradient-to-tr from-white to-transparent filter blur-[60px] opacity-90" />
            </motion.div>
            <motion.div style={{ x: mistCloseRight, opacity: globalMistOpacity }} className="absolute inset-0 z-40 pointer-events-none select-none">
                <div className="absolute -bottom-20 -right-[15%] w-[60vw] h-[80vh] bg-gradient-to-tl from-white to-transparent filter blur-[60px] opacity-90" />
            </motion.div>

        </section>
    );
};

export default Hero;
