import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import IcefallImg from '../assets/icefall_bg.jpg';

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
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 md:w-48 h-auto drop-shadow-xl">
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
        description: 'V nejvyšších výškách jde někdy do tuhého a energie rychle mizí. Plechovka, která mě už nejednou nakopla k dalšímu kroku. Sportovní spojení snů, kde jde o stoprocentní výkon v nekompromisních podmínkách.',
        image: 'https://images.unsplash.com/photo-1628135899479-245edda2b57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '50%',
        stripes: ['#CC0000', '#FECF00', '#CC0000'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 md:w-48 h-auto drop-shadow-xl">
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
        description: 'Zasloužená odměna po desítkách hodin v ledu a sněhu. Dostat plechovku nahoře v kempu do optimální teploty je výzva, ale ten pocit a chuť českého "zlata" pod těmi nejvyššími horami světa nic nepřekoná.',
        image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '82%',
        stripes: ['#1A5C2A', '#F5E6C8', '#1A5C2A'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 md:w-48 h-auto drop-shadow-xl">
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
        description: 'Od českých horáků pro českého horala. Jde o tým a rodinu, která ví, co horal potřebuje zabalit. Každý cepín i každám karabina, co balím z domova, mají často právě odsud a nikdy bych se na hory nevydal bez jejich podpory.',
        image: 'https://images.unsplash.com/photo-1516682703881-80a22a30bbdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '34%',
        stripes: ['#1F2937', '#F59E0B', '#1F2937'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 md:w-48 h-auto drop-shadow-xl">
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
        description: 'Tradiční šumperská výroba z Gore-Texu. Kvalita, které svěřuji to nejdůležitější - tělesné teplo ve výškách, kde vládne zima atakující život. Oblečení, co mě nikdy nezklamalo i na těch nejkrutějších svazích.',
        image: 'https://images.unsplash.com/photo-1601002220970-d0232d398cf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '66%',
        stripes: ['#111827', '#94A3B8', '#111827'],
        logo: (
            <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 md:w-48 h-auto drop-shadow-xl">
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
                    className="relative cursor-pointer group"
                    style={{
                        width: 136,
                        height: 90,
                        animation: `flutter ${flutter}s ${delay}s ease-in-out infinite`,
                        transformOrigin: 'left center',
                        boxShadow: hovered ? '0px 15px 30px rgba(0,0,0,0.4)' : '2px 4px 18px rgba(0,0,0,0.22)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'box-shadow 0.3s ease-out, transform 0.3s ease-out',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                >
                    {/* Dark gradient overlay on hover for better contrast */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                        <span className="text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-1 drop-shadow-md">
                            Zobrazit <ExternalLink className="w-3 h-3" />
                        </span>
                    </div>

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
                        position: 'absolute', inset: 0, opacity: 0.1, borderRadius: 2,
                        backgroundImage: 'repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 9px)',
                    }} />

                    {/* Animated light sheen — suggests cloth ripple */}
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: 2,
                        background: 'linear-gradient(105deg, rgba(255,255,255,0.22) 0%, transparent 55%, rgba(0,0,0,0.12) 100%)',
                        animation: `sheen ${flutter}s ${delay}s ease-in-out infinite`,
                    }} />

                    {/* Logo (fade slightly on hover to show "Zobrazit") */}
                    <div className="group-hover:opacity-30 transition-opacity duration-300" style={{
                        position: 'absolute', inset: 0, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', padding: 10,
                    }}>
                        {flag.logo}
                    </div>

                    {/* Left pole edge shadow */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
                        background: 'rgba(0,0,0,0.35)', borderRadius: '2px 0 0 2px',
                    }} />
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

    // PHASE 3: 0.18 -> 0.31 with hold (entry matches About exit exactly)

    const containerY = useTransform(scrollProgress, [0.19, 0.24, 0.28, 0.31], ['-85%', '0%', '0%', '105%']);
    const opacity = useTransform(scrollProgress, [0.19, 0.24, 0.28, 0.31], [0, 1, 1, 0]);
    
    // Slower fade out for the background image specifically
    const imageOpacity = useTransform(scrollProgress, [0.26, 0.31], [0.8, 0]);
    
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
            <div className="w-full h-full relative">
                <div className="absolute inset-0 z-0"
                    style={{
                        // stronger bottom fade so Partners background goes smoothly to transparent
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 120px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 120px), transparent 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-[#F0F4F8]" />
                    {/* Gradient blending edge with previous section */}
                    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#f8f9fa] to-transparent z-10" />
                    <motion.img
                        style={{ y: bgY, opacity: imageOpacity }}
                        src={IcefallImg}
                        alt="Khumbu Icefall"
                        className="absolute inset-0 w-full h-full object-cover object-center filter contrast-125 brightness-110 saturate-0 scale-125 origin-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 to-blue-200/20 mix-blend-multiply" />
                    {/* Soft vignette so text is legible */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30" />
                </div>


                {/* ── Header text ── */}
                <div className="absolute top-[12%] left-0 right-0 text-center z-20">
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
                            <Flag key={flag.id} flag={flag} index={i} onSelect={setSelectedFlag} />
                        ))}
                    </div>
                </div>

                {/* ── Original Icefall tagline at bottom ── */}
                <div className="absolute bottom-[10%] left-0 right-0 text-center z-20 pointer-events-none">
                    <h3 className="font-serif text-3xl text-slate-700 opacity-60 italic drop-shadow-sm">
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
