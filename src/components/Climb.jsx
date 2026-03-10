import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Mountain, Wind, Thermometer } from 'lucide-react';
import ClimbersImg from '../assets/climbers_bg.jpg';

const Climb = ({ scrollProgress }) => {
    // PHASE 4: 0.60 -> 0.80 (The Climb)

    // Triggers
    const opacity = useTransform(scrollProgress, [0.55, 0.65], [0, 1]);
    const y = useTransform(scrollProgress, [0.55, 0.70], ["-100%", "0%"]);

    // Transition Out
    const exitOpacity = useTransform(scrollProgress, [0.80, 0.85], [1, 0]);
    const exitY = useTransform(scrollProgress, [0.80, 0.90], ["0%", "100%"]);

    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-end px-6 md:px-20 lg:px-32 pointer-events-none overflow-hidden">

            <motion.div
                style={{ opacity: useTransform(scrollProgress, [0.55, 0.65, 0.80, 0.85], [0, 1, 1, 0]), y: useTransform(scrollProgress, [0.55, 0.70, 0.80, 0.90], ["-100%", "0%", "0%", "100%"]) }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                {/* SOLID BACKING LAYER */}
                <div
                    className="absolute inset-0 bg-[#F1F5F9]"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)'
                    }}
                />

                {/* Background Image */}
                <img
                    src={ClimbersImg}
                    alt="Climbers on ridge"
                    className="w-full h-full object-cover object-center opacity-40 filter grayscale contrast-125"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)'
                    }}
                />

                {/* Cold Blue Overlay */}
                <div className="absolute inset-0 bg-slate-100/30 mix-blend-multiply" />
            </motion.div>

            {/* Content Block */}
            <motion.div
                style={{ opacity: useTransform(scrollProgress, [0.55, 0.65, 0.80, 0.85], [0, 1, 1, 0]), y: useTransform(scrollProgress, [0.55, 0.70, 0.80, 0.90], ["-100%", "0%", "0%", "100%"]) }}
                className="relative z-50 text-right max-w-lg pointer-events-auto bg-white/40 backdrop-blur-sm p-10 rounded-xl border border-white/50"
            >
                <h4 className="text-slate-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-6">
                    Zóna smrti — 8000+ m
                </h4>
                <h2 className="font-serif text-5xl md:text-6xl text-slate-800 mb-10 leading-none">
                    Tam, kde končí<br /> <span className="text-slate-500">dech.</span>
                </h2>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8">
                    {[
                        { icon: Mountain, val: "5", label: "Osmiveslovek" },
                        { icon: Wind, val: "14%", label: "Kyslíku" },
                        { icon: Thermometer, val: "-40°", label: "Teplota" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            className="flex flex-col items-end gap-2"
                        >
                            <stat.icon className="w-8 h-8 text-slate-500 mb-2" />
                            <span className="text-3xl font-serif text-slate-800">{stat.val}</span>
                            <span className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</span>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="col-span-1 flex flex-col items-end justify-end"
                    >
                        <button className="text-sm font-bold uppercase tracking-widest text-gold-600 border-b border-gold-600 pb-1 hover:text-gold-500 transition-colors">
                            Expedice 2025
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Climb;
