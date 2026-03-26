import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { X, ExternalLink } from 'lucide-react';
import IcefallImg from '../assets/icefall_bg.jpg';

import LogoMammut from '../assets/zmensene/partners/Unknosdfwn.png';
import LogoRedBull from '../assets/zmensene/partners/Unknsdffdown.jpeg';
import LogoPrazdroj from '../assets/zmensene/partners/dsfd.png';
import LogoHanibal from '../assets/zmensene/partners/hanibal.jpeg';
import LogoTilak from '../assets/zmensene/partners/fs.png';

/* ─── Sponsor data ──────────────────────────────────────── */
const FLAGS = [
    {
        id: 'mammut',
        name: 'Mammut',
        quote: 'Moje druhá kůže. Ta, co nepromokne.',
        description: 'Od bund, ve kterých se dá přežít v osmi tisících metrech, až po lana, která podrží, když jde fakt do tuhého. Společně už jsme toho na horách zvládli dost a pokaždé vím, že výbava od švýcarských profesionálů mě nenechá ve štychu.',
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '18%',
        // Mammut colours: black + white + gold tusk logo
        stripes: ['#1a1a1a', '#ffffff', '#1a1a1a'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 70%, 96% 100%, 88% 95%, 72% 98%, 55% 93%, 35% 98%, 15% 92%, 0% 98%)',
        logo: (
            <img src={LogoMammut} alt="Mammut Logo" className="w-full h-full object-cover" />
        ),
    },
    {
        id: 'redbull',
        name: 'Red Bull',
        quote: 'Křídla, když nohy už nemůžou.',
        description: 'V nejvyšších výškách jde někdy do tuhého a energie rychle mizí. Plechovka, která mě už nejednou nakopla k dalšímu kroku. Sportovní spojení snů, kde jde o stoprocentní výkon v nekompromisních podmínkách.',
        image: 'https://images.unsplash.com/photo-1628135899479-245edda2b57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '50%',
        stripes: ['#CC0000', '#FECF00', '#CC0000'],
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 85% 92%, 75% 100%, 65% 85%, 55% 95%, 40% 90%, 20% 96%, 0% 90%)',
        logo: (
            <img src={LogoRedBull} alt="Red Bull Logo" className="w-full h-full object-cover" />
        ),
    },
    {
        id: 'prazdroj',
        name: 'Prazdroj',
        quote: 'Nejlepší ionťák na světě.',
        description: 'Zasloužená odměna po desítkách hodin v ledu a sněhu. Dostat plechovku nahoře v kempu do optimální teploty je výzva, ale ten pocit a chuť českého "zlata" pod těmi nejvyššími horami světa nic nepřekoná.',
        image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '82%',
        stripes: ['#1A5C2A', '#F5E6C8', '#1A5C2A'],
        clipPath: 'polygon(0% 0%, 100% 0%, 98% 98%, 85% 90%, 75% 96%, 60% 88%, 45% 96%, 25% 90%, 10% 98%, 0% 92%)',
        logo: (
            <img src={LogoPrazdroj} alt="Prazdroj Logo" className="w-full h-full object-cover" />
        ),
    },
    {
        id: 'hanibal',
        name: 'Hanibal',
        quote: 'Výbava, co drží i nad osm tisíc.',
        description: 'Od českých horáků pro českého horala. Jde o tým a rodinu, která ví, co horal potřebuje zabalit. Každý cepín i každám karabina, co balím z domova, mají často právě odsud a nikdy bych se na hory nevydal bez jejich podpory.',
        image: 'https://images.unsplash.com/photo-1516682703881-80a22a30bbdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '34%',
        stripes: ['#1F2937', '#F59E0B', '#1F2937'],
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 80% 97%, 60% 90%, 40% 98%, 20% 90%, 5% 80%, 0% 70%)',
        logo: (
            <img src={LogoHanibal} alt="Hanibal Logo" className="w-full h-full object-cover" />
        ),
    },
    {
        id: 'tilak',
        name: 'Tilak',
        quote: 'Česká technika do nejhoršího počasí.',
        description: 'Tradiční šumperská výroba z Gore-Texu. Kvalita, které svěřuji to nejdůležitější - tělesné teplo ve výškách, kde vládne zima atakující život. Oblečení, co mě nikdy nezklamalo i na těch nejkrutějších svazích.',
        image: 'https://images.unsplash.com/photo-1601002220970-d0232d398cf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '66%',
        stripes: ['#111827', '#94A3B8', '#111827'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 95%, 85% 90%, 70% 98%, 55% 80%, 45% 95%, 30% 88%, 15% 98%, 0% 92%)',
        logo: (
            <img src={LogoTilak} alt="Tilak Logo" className="w-full h-full object-cover" />
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

.cloth-texture::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.12;
  mix-blend-mode: multiply;
  pointer-events: none;
}
`;

/* ─── Single flag component ─────────────────────────────── */
const Flag = ({ flag, index, onSelect }) => {
    const [hovered, setHovered] = useState(false);

    // Slightly different timing per flag = organic, not synced
    const period = 3.2 + index * 0.9;   // pendulum period
    const flutter = 2.4 + index * 0.7;   // cloth flutter period
    const delay = index * 0.55;

    return (
        <div
            className="absolute flex flex-col items-center"
            // Anchor flags directly to horizontal rope
            style={{ left: flag.left, top: -14, transform: 'translateX(-50%)', zIndex: hovered ? 40 : 10 }}
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
                    onClick={() => onSelect(flag)}
                    className="relative cursor-pointer group w-24 h-24 md:w-36 md:h-36 cloth-texture bg-white"
                    style={{
                        animation: `flutter ${flutter}s ${delay}s ease-in-out infinite`,
                        transformOrigin: 'top center',
                        transition: 'transform 0.3s ease-out',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                        clipPath: flag.clipPath,
                        /* Apply organic SVG displacement for microscopic frays + shadow */
                        filter: 'url(#frayedEdge)'
                    }}
                >
                    {/* Detailed cloth seams at the top */}
                    <div className="absolute top-1.5 left-0 right-0 h-[3px] border-t-[1.5px] border-dashed border-black/50 z-20 pointer-events-none mix-blend-multiply opacity-60" />
                    <div className="absolute top-3.5 left-0 right-0 h-[2px] border-t-[1px] border-dashed border-black/40 z-20 pointer-events-none mix-blend-multiply opacity-50" />

                    {/* Gradient shading for realistic folds feeling */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30 z-10 pointer-events-none mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none mix-blend-multiply" />

                    {/* Hover text over the logo without square background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                            Zobrazit <ExternalLink className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Logo */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-60 transition-all duration-300 pointer-events-none">
                        {flag.logo}
                    </div>
                </div>

                {/* Hover tooltip - Professional UX redesign */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10, scale: hovered ? 1 : 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="pointer-events-none mt-6 z-[100] relative"
                    style={{ width: 240 }}
                >
                    <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl p-5 shadow-2xl text-center border border-white/10 relative">
                        {/* Little top caret/arrow pointing to flag */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900/90 border-t border-l border-white/10 rotate-45 backdrop-blur-xl" />
                        
                        <p className="font-serif text-white text-lg mb-2 relative z-10">{flag.name}</p>
                        <div className="w-8 h-px bg-gold-500 mx-auto mb-3 relative z-10" />
                        <p className="font-sans text-slate-300 text-xs leading-relaxed italic relative z-10">„{flag.quote}“</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/* ─── Main component ────────────────────────────────────── */
const Icefall = ({ scrollProgress }) => {
    const [selectedFlag, setSelectedFlag] = useState(null);

    useScrollLock(selectedFlag);

    // PHASE 3: 0.18 -> 0.31 with hold (entry matches About exit exactly)

    const containerY = useTransform(scrollProgress, [0.19, 0.24, 0.28, 0.31], ['-87%', '0%', '0%', '105%']);
    const opacity = useTransform(scrollProgress, [0.19, 0.24, 0.28, 0.31], [0, 1, 1, 0]);
    
    // Slower fade out for the background image specifically
    const imageOpacity = useTransform(scrollProgress, [0.27, 0.31], [0.8, 0]);
    
    const bgY = useTransform(scrollProgress, [0.15, 0.37], ["-15%", "15%"]);

    // Rope gentle lean on scroll
    const ropeSkew = useTransform(scrollProgress, [0.32, 0.50], [-0.8, 0.8]);

    return (
        <motion.div
            style={{ 
                y: containerY, 
                opacity,
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
            }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
            {/* SVG Filter Definition for the cloth frays */}
            <svg width="0" height="0" className="absolute pointer-events-none">
                <filter id="frayedEdge" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                    {/* Drop shadow explicitly on the frayed shape */}
                    <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.35" />
                </filter>
            </svg>

            <div className="w-full h-full relative">
                <div className="absolute inset-0 z-0"
                    style={{
                        // Top fade only, bottom is now sharp explicitly for gradient override
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-[#F0F4F8]" />
                    {/* Gradient blending edge with previous section */}
                    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#f8f9fa] to-transparent z-10" />
                    {/* IMAGE AND BOTTOM GRADIENT WRAPPER */}
                    <motion.div
                        style={{ y: bgY, opacity: imageOpacity }}
                        className="absolute inset-0 w-full h-full scale-125 origin-center"
                    >
                        <img
                            src={IcefallImg}
                            alt="Khumbu Icefall"
                            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-125 brightness-110 saturate-0"
                        />
                        {/* Bottom White Gradient Overlay precisely locked to image bottom */}
                        <div 
                            className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-white via-white/80 to-transparent z-40 pointer-events-none" 
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 to-blue-200/20 mix-blend-multiply" />
                    {/* Soft vignette so text is legible */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30" />
                </div>


                {/* ── Header text ── */}
                <div className="absolute top-[8%] md:top-[12%] left-0 right-0 text-center z-20 px-4">
                    <h4 className="text-slate-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-2 md:mb-3">
                        Partneři — 3000 m
                    </h4>
                    <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl text-slate-800 leading-tight drop-shadow-sm">
                        Bez nich bych tam <span className="italic text-slate-500">zmrznul.</span>
                    </h2>
                </div>

                {/* ── Desktop: single rope (hidden on mobile) ── */}
                <div className="absolute z-20 pointer-events-auto hidden md:block" style={{ top: '36%', left: 0, right: 0 }}>
                    <motion.div style={{ skewY: ropeSkew, transformOrigin: 'center' }} className="w-full">
                        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 40, display: 'block' }}>
                            <path d="M0,24 C240,4 480,36 720,20 C960,4 1200,36 1440,20" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="5" strokeLinecap="round" />
                            <path d="M0,22 C240,2 480,34 720,18 C960,2 1200,34 1440,18" fill="none" stroke="rgba(195,175,135,0.95)" strokeWidth="3.5" strokeLinecap="round" />
                            <path d="M0,20 C240,0 480,32 720,16 C960,0 1200,32 1440,16" fill="none" stroke="rgba(255,245,220,0.5)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                    <div className="relative w-full" style={{ height: 260, marginTop: -4 }}>
                        <style>{flagStyles}</style>
                        {FLAGS.map((flag, i) => (
                            <Flag key={flag.id} flag={flag} index={i} onSelect={setSelectedFlag} />
                        ))}
                    </div>
                </div>

                {/* ── Mobile: 3 angled rope rows (hidden on desktop) ── */}
                <div className="md:hidden absolute z-20 pointer-events-auto" style={{ top: '24%', left: 0, right: 0, padding: '0 16px' }}>
                    <style>{flagStyles}</style>

                    {[
                        { flags: [FLAGS[0], FLAGS[1]], angle: -2 },
                        { flags: [FLAGS[3], FLAGS[4]], angle: 1.5 },
                        { flags: [FLAGS[2]], angle: -1 },
                    ].map((row, rowIdx) => (
                        <div key={rowIdx} style={{ transform: `rotate(${row.angle}deg)`, marginBottom: 8 }}>
                            <svg viewBox="0 0 400 26" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 24, display: 'block' }}>
                                <path d="M0,16 C133,4 266,20 400,12" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="4" strokeLinecap="round" />
                                <path d="M0,14 C133,2 266,18 400,10" fill="none" stroke="rgba(195,175,135,0.98)" strokeWidth="3" strokeLinecap="round" />
                                <path d="M0,12 C133,0 266,16 400,8" fill="none" stroke="rgba(255,245,220,0.6)" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                            <div className="relative w-full" style={{ height: 110, marginTop: -4 }}>
                                {row.flags.map((flag, i) => (
                                    <div
                                        key={flag.id}
                                        className="absolute flex flex-col items-center cursor-pointer"
                                        style={{
                                            left: row.flags.length === 1 ? '47%' : (i === 0 ? '22%' : '72%'),
                                            top: -8,
                                            transform: 'translateX(-50%)'
                                        }}
                                        onClick={() => setSelectedFlag(flag)}
                                    >
                                        <div
                                            className="relative cloth-texture bg-white"
                                            style={{
                                                width: 68, height: 68,
                                                animation: `flutter ${2.4 + (rowIdx * 2 + i) * 0.6}s ${(rowIdx * 2 + i) * 0.4}s ease-in-out infinite`,
                                                clipPath: flag.clipPath,
                                                filter: 'url(#frayedEdge)'
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/25 z-10 pointer-events-none mix-blend-multiply" />
                                            <div className="absolute inset-0 flex items-center justify-center">{flag.logo}</div>
                                        </div>
                                        <span className="mt-1 font-sans text-[9px] font-bold text-slate-600 uppercase tracking-wider text-center leading-tight">{flag.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Original Icefall tagline at bottom ── */}
                <div className="absolute bottom-[10%] left-0 right-0 text-center z-20 pointer-events-none">
                    <h3 className="font-serif text-3xl text-slate-800 opacity-80 italic drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                        Tanec na ostří ledu.
                    </h3>
                </div>

                {/* ── Marketing Modal ── */}
                <AnimatePresence>
                    {selectedFlag && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setSelectedFlag(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row"
                            >
                                {/* Modal Image */}
                                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                    <img src={selectedFlag.image} alt={selectedFlag.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80" />
                                </div>
                                
                                {/* Modal Content */}
                                <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col">
                                    <button 
                                        onClick={() => setSelectedFlag(null)}
                                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    
                                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                                        Partner Výpravy
                                    </h4>
                                    
                                    <div className="flex bg-slate-900 border border-white/10 w-16 h-10 mb-6 flex-shrink-0 items-center justify-center rounded-lg p-1.5 opacity-90">
                                        {selectedFlag.logo}
                                    </div>
                                    
                                    <h2 className="font-serif text-4xl text-white mb-2">
                                        {selectedFlag.name}
                                    </h2>
                                    
                                    <p className="font-sans text-gold-500 text-sm leading-relaxed mb-6 italic">
                                        „{selectedFlag.quote}“
                                    </p>

                                    <div className="h-px w-12 bg-white/10 mb-6" />
                                    
                                    <p className="font-sans text-slate-300 leading-relaxed font-light mb-auto">
                                        {selectedFlag.description}
                                    </p>

                                    <button 
                                        onClick={() => setSelectedFlag(null)} // Later can be an external link 
                                        className="mt-8 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white text-slate-900 font-bold uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-white transition-all w-full"
                                    >
                                        Zpět na stěnu
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Icefall;
