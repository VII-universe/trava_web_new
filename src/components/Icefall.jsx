import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import IcefallImg from '../assets/icefall_bg.jpg';

/* ─── Sponsor data ──────────────────────────────────────── */
const FLAGS = [
    {
        id: 'mammut',
        name: 'Mammut',
        quote: 'Moje druhá kůže. Ta, co nepromokne.',
        left: '18%',
        // Mammut colours: black + white + gold tusk logo
        stripes: ['#1a1a1a', '#ffffff', '#1a1a1a'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
                <text x="4" y="32" fontFamily="serif" fontSize="22" fontWeight="900" fill="#D4AF37" letterSpacing="1">
                    MAMMUT
                </text>
                {/* Mammoth silhouette */}
                <path d="M62 8 Q67 4 70 8 Q73 4 76 8 L76 18 Q73 22 70 20 Q67 22 62 18 Z" fill="#D4AF37" opacity="0.8" />
            </svg>
        ),
    },
    {
        id: 'redbull',
        name: 'Red Bull',
        quote: 'Křídla, když nohy už nemůžou.',
        left: '50%',
        stripes: ['#CC0000', '#FECF00', '#CC0000'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
                <circle cx="25" cy="22" r="14" fill="#FECF00" opacity="0.9" />
                <circle cx="45" cy="22" r="14" fill="#CC0000" opacity="0.9" />
                <text x="8" y="42" fontFamily="sans-serif" fontSize="9" fontWeight="900" fill="white" letterSpacing="0.5">
                    RED BULL
                </text>
            </svg>
        ),
    },
    {
        id: 'prazdroj',
        name: 'Prazdroj',
        quote: 'Nejlepší ionťák na světě.',
        left: '82%',
        stripes: ['#1A5C2A', '#F5E6C8', '#1A5C2A'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
                {/* Pilsner Urquell shield shape */}
                <path d="M40 4 L68 16 L68 32 Q40 44 12 32 L12 16 Z" fill="#C8A84B" opacity="0.3" />
                <text x="16" y="22" fontFamily="serif" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="0">
                    PRAZDROJ
                </text>
                <text x="22" y="34" fontFamily="sans-serif" fontSize="7" fontWeight="400" fill="#F5E6C8" letterSpacing="1">
                    PILSNER
                </text>
            </svg>
        ),
    },
];

/* ─── Single flag component ─────────────────────────────── */
const Flag = ({ flag, index, scrollProgress }) => {
    const [hovered, setHovered] = useState(false);

    // Each flag sways slightly differently
    const swingAmplitude = 3 + index * 1.5;
    const swingBase = useTransform(
        scrollProgress,
        [0.40, 0.50, 0.60],
        [-swingAmplitude, swingAmplitude, -swingAmplitude]
    );

    const [r, g, b] = [flag.stripes[0], flag.stripes[1], flag.stripes[2]];

    return (
        <div
            className="absolute flex flex-col items-center"
            style={{ left: flag.left, top: 0, transform: 'translateX(-50%)' }}
        >
            {/* String from rope down to flag */}
            <motion.div
                style={{ rotate: swingBase, transformOrigin: 'top center' }}
                animate={hovered ? { rotate: 6 } : {}}
                transition={{ type: 'spring', stiffness: 50, damping: 10 }}
                className="flex flex-col items-center"
            >
                {/* String */}
                <div style={{ width: 2, height: 70, background: 'linear-gradient(to bottom,rgba(190,170,130,0.95),rgba(190,170,130,0.3))' }} />

                {/* Flag body */}
                <motion.div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="relative cursor-pointer shadow-2xl rounded-sm overflow-hidden"
                    style={{ width: 140, height: 96 }}
                >
                    {/* Stripe background */}
                    <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1" style={{ background: flag.stripes[0] }} />
                        <div className="flex-1" style={{ background: flag.stripes[1] }} />
                        <div className="flex-1" style={{ background: flag.stripes[2] }} />
                    </div>

                    {/* Cloth texture overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(90deg, #000 0px,#000 1px,transparent 1px,transparent 8px)',
                        }}
                    />

                    {/* Light sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />

                    {/* Logo */}
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                        {flag.logo}
                    </div>

                    {/* Left edge shadow (pole side) */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-black/20" />
                </motion.div>

                {/* Hover tooltip bubble */}
                <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4, scale: hovered ? 1 : 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none mt-3 z-50"
                    style={{ width: 200 }}
                >
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl text-center border border-white/60">
                        <p className="font-serif text-slate-900 font-semibold text-sm mb-1">{flag.name}</p>
                        <p className="font-sans text-slate-600 text-xs leading-relaxed italic">„{flag.quote}"</p>
                    </div>
                    {/* Arrow */}
                    <div className="mx-auto mt-[-6px] w-3 h-3 bg-white/90 rotate-45 border-t border-l border-white/60" />
                </motion.div>
            </motion.div>
        </div>
    );
};

/* ─── Main component ────────────────────────────────────── */
const Icefall = ({ scrollProgress }) => {
    // PHASE 3: 0.40 -> 0.60

    const containerY = useTransform(scrollProgress, [0.35, 0.45], ['-100%', '0%']);
    const opacity = useTransform(scrollProgress, [0.35, 0.45], [0, 1]);
    const exitY = useTransform(scrollProgress, [0.60, 0.70], ['0%', '100%']);
    const exitOpacity = useTransform(scrollProgress, [0.60, 0.70], [1, 0]);
    const exitScale = useTransform(scrollProgress, [0.60, 0.75], [1, 1.5]);

    // Rope gentle lean on scroll
    const ropeSkew = useTransform(scrollProgress, [0.40, 0.60], [-0.8, 0.8]);

    return (
        <motion.div
            style={{ y: containerY, opacity }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            <motion.div
                style={{ y: exitY, opacity: exitOpacity, scale: exitScale }}
                className="w-full h-full relative"
            >
                {/* ── Background ── */}
                <div className="absolute inset-0 z-0"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-[#F0F4F8]" />
                    <img
                        src={IcefallImg}
                        alt="Khumbu Icefall"
                        className="w-full h-full object-cover object-center opacity-80 filter contrast-125 brightness-110 saturate-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 to-blue-200/20 mix-blend-multiply" />
                    {/* Soft vignette so text is legible */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30" />
                </div>

                {/* ── Header text ── */}
                <div className="absolute top-[8%] left-0 right-0 text-center z-20">
                    <h4 className="text-slate-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3">
                        Partneři — 3000 m
                    </h4>
                    <h2 className="font-serif text-5xl md:text-6xl text-slate-800 leading-none drop-shadow-sm">
                        Bez nich bych tam <span className="italic text-slate-500">zmrznul.</span>
                    </h2>
                </div>

                {/* ── Rope + Flags ── */}
                <div className="absolute z-20 pointer-events-auto" style={{ top: '36%', left: 0, right: 0 }}>

                    {/* Rope SVG */}
                    <motion.div style={{ skewY: ropeSkew, transformOrigin: 'center' }} className="w-full">
                        <svg
                            viewBox="0 0 1440 40"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            style={{ width: '100%', height: 40, display: 'block' }}
                        >
                            {/* Shadow */}
                            <path
                                d="M0,24 C240,4 480,36 720,20 C960,4 1200,36 1440,20"
                                fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="5" strokeLinecap="round"
                            />
                            {/* Rope — cream/hemp colour */}
                            <path
                                d="M0,22 C240,2 480,34 720,18 C960,2 1200,34 1440,18"
                                fill="none" stroke="rgba(195,175,135,0.95)" strokeWidth="3.5" strokeLinecap="round"
                            />
                            {/* Rope highlight */}
                            <path
                                d="M0,20 C240,0 480,32 720,16 C960,0 1200,32 1440,16"
                                fill="none" stroke="rgba(255,245,220,0.5)" strokeWidth="1" strokeLinecap="round"
                            />
                        </svg>
                    </motion.div>

                    {/* Flags hanging from rope */}
                    <div className="relative w-full" style={{ height: 260, marginTop: -4 }}>
                        {FLAGS.map((flag, i) => (
                            <Flag key={flag.id} flag={flag} index={i} scrollProgress={scrollProgress} />
                        ))}
                    </div>
                </div>

                {/* ── Original Icefall tagline at bottom ── */}
                <div className="absolute bottom-[10%] left-0 right-0 text-center z-20">
                    <h3 className="font-serif text-3xl text-slate-700 opacity-60 italic">
                        Tanec na ostří ledu.
                    </h3>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default Icefall;
