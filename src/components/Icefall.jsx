import { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { X, ExternalLink } from 'lucide-react';
import IcefallImg from '../assets/icefall_bg.jpg';
import SingingRockLogo from '../assets/svg/singingrock_logo.svg';
import RockPointLogo from '../assets/svg/rockpoint_logo.svg';
import YateLogo from '../assets/svg/yate_logo.jpg';
import MoreThanHoneyLogo from '../assets/svg/morethanhoney_logo.png';
import HoneyBeanLogo from '../assets/svg/honeybean_logo.png';

/* ─── Sponsor data ──────────────────────────────────────── */
// Hlavni partneri: Progress, Singing Rock, Rock Point, Yate, Adventure Menu, MoreThanHoney, HoneyBean
// Sekundarni: Ternua, Lowa, Rafiki climbing, Gerald Horejsek
const FLAGS = [
    {
        id: 'progress',
        name: 'Progress',
        partnership: 'Technický partner',
        discount: 'TRAVA10',
        quote: 'Lana, co znají osm tisíc.',
        description: 'Progress je český výrobce horolezeckých lan a pomůcek s tradicí sahající desítky let zpět. Jejich lana jsem měl s sebou na více než šesti osmitisícovkách a vždy držela přesně tehdy, když to bylo nejdůležitější.',
        image: 'https://images.unsplash.com/photo-1526459879585-a32ec4a4498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '7%',
        stripes: ['#1a3a5c', '#e8f4f8', '#1a3a5c'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 70%, 96% 100%, 88% 95%, 72% 98%, 55% 93%, 35% 98%, 15% 92%, 0% 98%)',
        logo: <div className="w-full h-full flex items-center justify-center bg-[#1a3a5c]"><span className="font-sans font-black text-white text-xs tracking-widest uppercase">Progress</span></div>,
    },
    {
        id: 'singingrock',
        name: 'Singing Rock',
        partnership: 'Partner bezpečnosti',
        discount: 'HONZATRAVA',
        quote: 'Česká horolezecká technika světového formátu.',
        description: 'Singing Rock je jedna z nejlepších horolezeckých značek vyrůstající z České republiky. Karabiny, sedáky i chraniče — jejich vybavení má na svém kontě výstupy tam, kde jiné selžou. Spolupráce, na které si váží.',
        image: 'https://images.unsplash.com/photo-1516682703881-80a22a30bbdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '21%',
        stripes: ['#7c1c1c', '#f5f5f5', '#7c1c1c'],
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 85% 92%, 75% 100%, 65% 85%, 55% 95%, 40% 90%, 20% 96%, 0% 90%)',
        logo: <div className="absolute inset-0 flex items-center justify-center bg-[#7c1c1c] px-3 py-4"><img src={SingingRockLogo} alt="Singing Rock" className="w-full h-auto" style={{ filter: 'brightness(0) invert(1)' }} /></div>,
    },
    {
        id: 'rockpoint',
        name: 'Rock Point',
        partnership: 'Outdoorový partner',
        discount: 'TRAVA10',
        quote: 'Vybavení pro každý vrchol.',
        description: 'Rock Point je nejvýznamnější česká síť prodejen outdoorového vybavení. Spolupráce, která mi umožňuje doporučovat ověřené zboží z vlastní zkušenosti a propojovat lidi se správnou výbavou před jejich první — nebo pátou — expedicí.',
        image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '35%',
        stripes: ['#0f2a4a', '#c8a040', '#0f2a4a'],
        clipPath: 'polygon(0% 0%, 100% 0%, 98% 98%, 85% 90%, 75% 96%, 60% 88%, 45% 96%, 25% 90%, 10% 98%, 0% 92%)',
        logo: <div className="w-full h-full flex items-center justify-center bg-white p-2"><img src={RockPointLogo} alt="Rock Point" className="w-full h-full object-contain" /></div>,
    },
    {
        id: 'yate',
        name: 'Yate',
        partnership: 'Kempingový partner',
        discount: null,
        quote: 'České outdoorové vybavení s duší.',
        description: 'Yate je český výrobce kempingového a trekkingového vybavení. Spacáky, karimatky a stany, které fungují i v podmínkách, kde teplota padne pod mínus dvacet. Spolehlivost bez zbytečných kompromisů.',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '50%',
        stripes: ['#2d6a2d', '#f0f7e6', '#2d6a2d'],
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 80% 97%, 60% 90%, 40% 98%, 20% 90%, 5% 80%, 0% 70%)',
        logo: <div className="w-full h-full flex items-center justify-center bg-white p-2"><img src={YateLogo} alt="Yate" className="w-full h-full object-contain" /></div>,
    },
    {
        id: 'adventuremenu',
        name: 'Adventure Menu',
        partnership: 'Výživový partner',
        discount: 'TRAVA15',
        quote: 'Jídlo, které chutná i nad sedm tisíc.',
        description: 'Adventure Menu jsou lyofilizovaná jídla české výroby. V horách nad 7000 metrů je jídlo otázka přežití i psychiky — a tohle je jídlo, na které se těšíš. Správná kalorická hustota, chuť, která drží morál, když podmínky nikoliv.',
        image: 'https://images.unsplash.com/photo-1628135899479-245edda2b57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '64%',
        stripes: ['#8b4513', '#f5deb3', '#8b4513'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 95%, 85% 90%, 70% 98%, 55% 80%, 45% 95%, 30% 88%, 15% 98%, 0% 92%)',
        logo: <div className="w-full h-full flex items-center justify-center bg-[#8b4513]"><span className="font-sans font-black text-[#f5deb3] text-[9px] tracking-wider uppercase text-center leading-tight px-1">Adventure Menu</span></div>,
    },
    {
        id: 'morethanhoney',
        name: 'MoreThanHoney',
        partnership: 'Ambasador značky',
        discount: 'TRAVA20',
        quote: 'Energie z přírody. Přísaha — to funguje.',
        description: 'MoreThanHoney nabízí produkty z manukového medu světové kvality. Med jako palivo pro expedice i každodenní život — zdroj energie, který nemá vedlejší účinky. Honza je ambasadorem značky proto, že to sám denně konzumuje a věří tomu.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '78%',
        stripes: ['#d4860a', '#fff8e7', '#d4860a'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 70%, 96% 100%, 88% 95%, 72% 98%, 55% 93%, 35% 98%, 15% 92%, 0% 98%)',
        logo: <div className="w-full h-full flex items-center justify-center bg-white p-2"><img src={MoreThanHoneyLogo} alt="MoreThanHoney" className="w-full h-full object-contain" /></div>,
    },
    {
        id: 'honeybean',
        name: 'HoneyBean',
        partnership: 'Ambasador značky',
        discount: 'TRAVA10',
        quote: 'Káva s duší, med s příběhem.',
        description: 'HoneyBean je projekt, který spojuje to nejlepší ze dvou světů — speciální kávu a manukový med. Ranní rituál před výstupem i po návratu. Honza spolupracuje s HoneyBean jako ambasador, protože věří v produkt, který sám každý den používá.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '92%',
        stripes: ['#3d1c02', '#c8a04a', '#3d1c02'],
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 85% 92%, 75% 100%, 65% 85%, 55% 95%, 40% 90%, 20% 96%, 0% 90%)',
        logo: <div className="w-full h-full flex items-center justify-center bg-white p-2"><img src={HoneyBeanLogo} alt="HoneyBean" className="w-full h-full object-contain" /></div>,
    },
];

const SECONDARY_PARTNERS = [
    {
        id: 'ternua',
        name: 'Ternua',
        partnership: 'Oděvní partner',
        discount: null,
        quote: 'Výkon i styl v každém terénu.',
        description: 'Ternua je španělská outdoor značka specializující se na vysoce výkonné oblečení pro hory. Bundy, kalhoty a vrstvy navržené s důrazem na udržitelnost a výkon v extrémních podmínkách. Honza nosí jejich oblečení na expedicích, kde záleží na každém detailu.',
        image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'lowa',
        name: 'Lowa',
        partnership: 'Partner obuvi',
        discount: null,
        quote: 'Boty, které nesklouznou. Ani tam nahoře.',
        description: 'Lowa je německá značka s více než 100letou tradicí výroby prémiové horské obuvi. Jejich trekové a horolezecké boty kombinují tradiční řemeslné zpracování s moderními technologiemi GORE-TEX a Vibram. Na každém výstupu máte pod nohama jistotu.',
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'rafiki',
        name: 'Rafiki Climbing',
        partnership: 'Partner lezeckého vybavení',
        discount: null,
        quote: 'Česká technika na světových skalách.',
        description: 'Rafiki Climbing je česká značka lezeckého vybavení se zaměřením na sportovní lezení a bouldering. Jejich lezečky, chalk bag a doplňky naleznete v rukou lezců po celém světě. Kvalita bez zbytečných příplatků — právě proto je Honza doporučuje.',
        image: 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'gerald',
        name: 'Gerald Hořejšek',
        partnership: 'Mediální partner',
        discount: null,
        quote: 'Příběhy, které stojí za vyprávění.',
        description: 'Gerald Hořejšek je přední český novinář, televizní moderátor a outdoor nadšenec. Spolupracuje s Honzou na mediálních projektech a reportážích z expedic — přináší příběhy z hor k širší veřejnosti prostřednictvím televizních pořadů a online obsahu.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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

    // PHASE 3: 0.18 -> 0.27 with hold

    const containerY = useTransform(scrollProgress, [0.18, 0.22, 0.25, 0.28], ['-87%', '0%', '0%', '105%']);
    const opacity = useTransform(scrollProgress, [0.18, 0.22, 0.25, 0.28], [0, 1, 1, 0]);

    // Slower fade out for the background image specifically
    const imageOpacity = useTransform(scrollProgress, [0.25, 0.28], [0.8, 0]);

    const bgY = useTransform(scrollProgress, [0.14, 0.33], ["-15%", "15%"]);

    // Rope gentle lean on scroll
    const ropeSkew = useTransform(scrollProgress, [0.28, 0.44], [-0.8, 0.8]);

    return (
        <>
            {/* BACKGROUND LAYER - Behind Clouds */}
            <motion.div
                style={{ y: containerY, opacity, zIndex: 0 }}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            >
                <div className="absolute inset-0 z-0"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60px, black 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-[#F0F4F8]" />
                    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#f8f9fa] to-transparent z-10" />
                    <motion.div
                        style={{ y: bgY, opacity: imageOpacity }}
                        className="absolute inset-0 w-full h-full scale-125 origin-center"
                    >
                        <img
                            src={IcefallImg}
                            alt="Khumbu Icefall"
                            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-125 brightness-110 saturate-0"
                        />
                        <div 
                            className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-white via-white/80 to-transparent z-40 pointer-events-none" 
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 to-blue-200/20 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30" />
                </div>
            </motion.div>

            {/* CONTENT LAYER - Above Clouds */}
            <motion.div
                style={{ 
                    y: containerY, 
                    opacity,
                    zIndex: 70,
                    maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
                }}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            >
                <div className="w-full h-full relative">
                    {/* ── Header text ── */}
                    <div className="absolute top-[8%] md:top-[12%] left-0 right-0 text-center z-20 px-4">
                        <h4 className="text-slate-500 font-sans uppercase tracking-[0.25em] text-xs font-bold mb-2 md:mb-3">
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
                    <div className="md:hidden absolute z-20 pointer-events-auto" style={{ top: '18%', left: 0, right: 0, padding: '0 8px' }}>
                        <style>{flagStyles}</style>

                        {[
                            { flags: [FLAGS[0], FLAGS[1], FLAGS[2]], angle: -2 },
                            { flags: [FLAGS[3], FLAGS[4]], angle: 1.5 },
                            { flags: [FLAGS[5], FLAGS[6]], angle: -1 },
                        ].map((row, rowIdx) => (
                            <div key={rowIdx} style={{ transform: `rotate(${row.angle}deg)`, marginBottom: 4 }}>
                                <svg viewBox="0 0 400 26" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 24, display: 'block' }}>
                                    <path d="M0,16 C133,4 266,20 400,12" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="4" strokeLinecap="round" />
                                    <path d="M0,14 C133,2 266,18 400,10" fill="none" stroke="rgba(195,175,135,0.98)" strokeWidth="3" strokeLinecap="round" />
                                    <path d="M0,12 C133,0 266,16 400,8" fill="none" stroke="rgba(255,245,220,0.6)" strokeWidth="1" strokeLinecap="round" />
                                </svg>
                                <div className="relative w-full" style={{ height: 155, marginTop: -4 }}>
                                    {row.flags.map((flag, i) => {
                                        const positions3 = ['18%', '50%', '82%'];
                                        const positions2 = ['25%', '75%'];
                                        const left = row.flags.length === 3
                                            ? positions3[i]
                                            : positions2[i];
                                        return (
                                            <div
                                                key={flag.id}
                                                className="absolute flex flex-col items-center cursor-pointer"
                                                style={{ left, top: -8, transform: 'translateX(-50%)' }}
                                                onClick={() => setSelectedFlag(flag)}
                                            >
                                                <div
                                                    className="relative cloth-texture bg-white"
                                                    style={{
                                                        width: 112, height: 112,
                                                        animation: `flutter ${2.4 + (rowIdx * 3 + i) * 0.5}s ${(rowIdx * 3 + i) * 0.35}s ease-in-out infinite`,
                                                        clipPath: flag.clipPath,
                                                        filter: 'url(#frayedEdge)'
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/25 z-10 pointer-events-none mix-blend-multiply" />
                                                    <div className="absolute inset-0 flex items-center justify-center">{flag.logo}</div>
                                                </div>
                                                <span className="mt-1.5 font-sans text-[11px] font-bold text-slate-700 uppercase tracking-wider text-center leading-tight">{flag.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Tagline + secondary partners ── */}
                    <div className="absolute bottom-[3%] left-0 right-0 text-center z-20 pointer-events-none flex flex-col items-center gap-2 md:gap-4 px-4">
                        <h3 className="font-serif text-xl md:text-3xl text-slate-800 opacity-80 italic drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                            S&nbsp;těmi, kteří věří ve stejné vrcholy.
                        </h3>

                        {/* Mobile: pill buttons */}
                        <div className="md:hidden flex flex-col items-center gap-2 w-full">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-600 opacity-80">Také spolupracuji s:</span>
                            <div className="flex flex-wrap gap-1.5 justify-center pointer-events-auto">
                                {SECONDARY_PARTNERS.map((partner) => (
                                    <button
                                        key={partner.id}
                                        onClick={() => setSelectedFlag(partner)}
                                        className="text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-slate-700 px-3 py-1 rounded-full border border-slate-400/40 bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:border-gold-400/60 transition-all duration-200 cursor-pointer"
                                    >
                                        {partner.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop: card row */}
                        <div className="hidden md:flex flex-col items-center gap-3 w-full pointer-events-auto">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-slate-500">Také spolupracuji s:</span>
                            <div className="flex gap-3 justify-center flex-wrap">
                                {SECONDARY_PARTNERS.map((partner) => (
                                    <button
                                        key={partner.id}
                                        onClick={() => setSelectedFlag(partner)}
                                        className="group flex items-center gap-3 px-4 py-2.5 bg-white/75 backdrop-blur-md border border-white/60 rounded-xl shadow-sm hover:bg-white hover:border-gold-400/50 hover:shadow-md transition-all duration-200 cursor-pointer"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 group-hover:bg-gold-500 transition-colors shrink-0" />
                                        <div className="text-left">
                                            <p className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider leading-none">{partner.name}</p>
                                            <p className="font-sans text-slate-500 text-[10px] tracking-wider mt-0.5 leading-none">{partner.partnership}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

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
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                <img src={selectedFlag.image} alt={selectedFlag.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80" />
                            </div>
                            
                            <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col">
                                <button 
                                    onClick={() => setSelectedFlag(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                
                                <h4 className="text-gold-500 font-sans uppercase tracking-[0.25em] text-xs font-bold mb-4">
                                    Partner Výpravy
                                </h4 >
                                
                                {selectedFlag.logo && (
                                    <div className="flex bg-slate-900 border border-white/10 w-16 h-10 mb-6 flex-shrink-0 items-center justify-center rounded-lg p-1.5 opacity-90">
                                        {selectedFlag.logo}
                                    </div>
                                )}
                                
                                <h2 className="font-serif text-4xl text-white mb-2">
                                    {selectedFlag.name}
                                </h2>
                                
                                <p className="font-sans text-gold-500 text-sm leading-relaxed mb-6 italic">
                                    „{selectedFlag.quote}“
                                </p>
                                <div className="h-px w-12 bg-white/10 mb-6" />
                                <p className="font-sans text-slate-300 leading-relaxed font-light mb-6">
                                    {selectedFlag.description}
                                </p>

                                {/* Spolupráce + slevový kód */}
                                <div className="space-y-3 mb-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-sans font-bold uppercase tracking-widest text-slate-500">Typ spolupráce</span>
                                        <span className="text-xs font-sans text-white/70">{selectedFlag.partnership}</span>
                                    </div>
                                    {selectedFlag.discount && (
                                        <div className="flex items-center justify-between p-3.5 bg-white/5 border border-gold-500/30 rounded-xl">
                                            <div>
                                                <p className="text-xs font-sans font-bold uppercase tracking-widest text-gold-400 mb-0.5">Slevový kód</p>
                                                <span className="font-mono text-base font-bold text-white tracking-wider">{selectedFlag.discount}</span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(selectedFlag.discount); }}
                                                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
                                            >
                                                Kopírovat
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setSelectedFlag(null)}
                                    className="mt-8 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white text-slate-900 font-bold uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-white transition-all w-full"
                                >
                                    Zpět na stěnu
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Icefall;
