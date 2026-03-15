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
    {
        id: 'hanibal',
        name: 'Hanibal',
        quote: 'Výbava, co drží i nad osm tisíc.',
        left: '34%',
        stripes: ['#1F2937', '#F59E0B', '#1F2937'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
                <rect x="10" y="8" width="60" height="28" rx="4" fill="rgba(0,0,0,0.28)" />
                <text x="16" y="28" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#fff" letterSpacing="0.6">
                    HANIBAL
                </text>
            </svg>
        ),
    },
    {
        id: 'tilak',
        name: 'Tilak',
        quote: 'Česká technika do nejhoršího počasí.',
        left: '66%',
        stripes: ['#111827', '#94A3B8', '#111827'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
                <circle cx="20" cy="22" r="8" fill="#fff" opacity="0.85" />
                <path d="M34 28 L42 14 L50 28 Z" fill="#fff" opacity="0.9" />
                <text x="52" y="26" fontFamily="sans-serif" fontSize="8" fontWeight="800" fill="#fff" letterSpacing="1">
                    TILAK
                </text>
            </svg>
        ),
    },
];

/* ─── Keyframe styles injected once ─────────────────────── */
const flagStyles = `
@keyframes pendulum {
  0%   { transform: rotate(-0.8deg); }
  50%  { transform: rotate(0.8deg); }
  100% { transform: rotate(-0.8deg); }
}
@keyframes flutter {
  0%   { skewY: 0deg; transform: skewX(0deg)  scaleX(1); }
  25%  { transform: skewX(-1.5deg) scaleX(0.985); }
  55%  { transform: skewX(1deg)   scaleX(0.995); }
  80%  { transform: skewX(-0.5deg) scaleX(1); }
  100% { transform: skewX(0deg)  scaleX(1); }
}
@keyframes sheen {
  0%   { opacity: 0.08; }
  45%  { opacity: 0.18; }
  100% { opacity: 0.08; }
}
`;

/* ─── Single flag component ─────────────────────────────── */
const Flag = ({ flag, index }) => {
    const [hovered, setHovered] = useState(false);

    // Slightly different timing per flag = organic, not synced
    const period = 3.2 + index * 0.9;   // pendulum period
    const flutter = 2.4 + index * 0.7;   // cloth flutter period
    const delay = index * 0.55;

    return (
        <div
            className="absolute flex flex-col items-center"
            // Anchor flags directly to horizontal rope
            style={{ left: flag.left, top: -14, transform: 'translateX(-50%)' }}
        >
            {/* Pendulum wrapper — very gentle sway, no flipping */}
            <div
                style={{
                    transformOrigin: 'top center',
                    animation: `pendulum ${period}s ${delay}s ease-in-out infinite`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Flag cloth — flutter via skewX, not rotate */}
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="relative cursor-pointer"
                    style={{
                        width: 136,
                        height: 90,
                        animation: `flutter ${flutter}s ${delay}s ease-in-out infinite`,
                        transformOrigin: 'left center',
                        boxShadow: '2px 4px 18px rgba(0,0,0,0.22)',
                        borderRadius: 2,
                        overflow: 'visible',
                        transition: 'filter 0.2s',
                        filter: hovered ? 'brightness(1.08)' : 'brightness(1)',
                    }}
                >
                    {/* Stripes */}
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                        borderRadius: 2, overflow: 'hidden',
                    }}>
                        <div style={{ flex: 1, background: flag.stripes[0] }} />
                        <div style={{ flex: 1, background: flag.stripes[1] }} />
                        <div style={{ flex: 1, background: flag.stripes[2] }} />
                    </div>

                    {/* Cloth weave texture */}
                    <div style={{
                        position: 'absolute', inset: 0, opacity: 0.06, borderRadius: 2,
                        backgroundImage: 'repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 9px)',
                    }} />

                    {/* Animated light sheen — suggests cloth ripple */}
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: 2,
                        background: 'linear-gradient(105deg, rgba(255,255,255,0.22) 0%, transparent 55%, rgba(0,0,0,0.12) 100%)',
                        animation: `sheen ${flutter}s ${delay}s ease-in-out infinite`,
                    }} />

                    {/* Logo */}
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', padding: 10,
                    }}>
                        {flag.logo}
                    </div>

                    {/* Left pole edge shadow */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
                        background: 'rgba(0,0,0,0.25)', borderRadius: '2px 0 0 2px',
                    }} />
                </div>

                {/* Hover tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6, scale: hovered ? 1 : 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none mt-4 z-50"
                    style={{ width: 210 }}
                >
                    <div className="bg-white/92 backdrop-blur-lg rounded-2xl p-4 shadow-xl text-center border border-white/60">
                        <p className="font-serif text-slate-900 font-semibold text-sm mb-1">{flag.name}</p>
                        <p className="font-sans text-slate-600 text-xs leading-relaxed italic">„{flag.quote}"</p>
                    </div>
                    <div className="mx-auto mt-[-6px] w-3 h-3 bg-white/92 rotate-45 border-t border-l border-white/60" />
                </motion.div>
            </div>
        </div>
    );
};

/* ─── Main component ────────────────────────────────────── */
const Icefall = ({ scrollProgress }) => {
    // PHASE 3: 0.26 -> 0.42 with hold

    const containerY = useTransform(scrollProgress, [0.26, 0.30, 0.36, 0.42], ['-120%', '0%', '0%', '130%']);
    const opacity = useTransform(scrollProgress, [0.26, 0.30, 0.36, 0.42], [0, 1, 1, 0]);

    // Rope gentle lean on scroll
    const ropeSkew = useTransform(scrollProgress, [0.32, 0.50], [-0.8, 0.8]);

    return (
        <motion.div
            style={{ y: containerY, opacity }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            <div className="w-full h-full relative">
                {/* ── Background ── */}
                <div className="absolute inset-0 z-0"
                    style={{
                        // stronger bottom fade so Partners background goes smoothly to transparent
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 120px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 120px), transparent 100%)'
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
                        <style>{flagStyles}</style>
                        {FLAGS.map((flag, i) => (
                            <Flag key={flag.id} flag={flag} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── Original Icefall tagline at bottom ── */}
                <div className="absolute bottom-[10%] left-0 right-0 text-center z-20">
                    <h3 className="font-serif text-3xl text-slate-700 opacity-60 italic">
                        Tanec na ostří ledu.
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export default Icefall;
