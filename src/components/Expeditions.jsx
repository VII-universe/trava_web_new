import React, { useState, useEffect, useRef } from 'react';
import { loadContent } from '../data/adminStore';
import { resolveImageSrc } from '../data/imageStore';
import { motion, useTransform, useScroll, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { ArrowLeft, ArrowRight, X, MapPin, Play, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Logo14Summits from '../assets/svg/honza_trava_logo_14_negativni_V1.svg';
import SummitImage from '../assets/summit_bg.png';
import HonzaProfile from '../assets/honza_profile.png';
import ClimbersImg from '../assets/climbers_bg.jpg';

import ManasluImg from '../assets/zmensene/portrety/expedice_a_treky/20240728_133329.jpg';
import MeraImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06947.jpg';
import YogaImg from '../assets/zmensene/portrety/expedice_a_treky/20240723_091830.jpg';

import AconcaImg from '../assets/zmensene/portrety/expedice_a_treky/dsc05780.jpg';
import ElbrusImg from '../assets/zmensene/portrety/expedice_a_treky/dsc_0008.jpg';
import KiliImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06888.jpg';
import MustangImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06330.jpg';
import K2Img from '../assets/zmensene/portrety/expedice_a_treky/dsc07035.jpg';
import EcuadorImg from '../assets/zmensene/portrety/expedice_a_treky/dsc07138.jpg';

import PolaroidBaseCamp from '../assets/zmensene/portrety/expedice_a_treky/20240709_160740.jpg';
import PolaroidCesta from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6158.jpg';
import PolaroidVrchol from '../assets/zmensene/portrety/expedice_a_treky/20240801_142543.jpg';

// Miri Assets
import MiriLead from '../assets/zmensene/portrety/miri/dsc05711.jpg';
import MiriGallery1 from '../assets/zmensene/portrety/miri/dsc05687.jpg';
import MiriGallery2 from '../assets/zmensene/portrety/miri/dsc07672.jpg';
import MiriGallery3 from '../assets/zmensene/portrety/miri/dsc05775.jpg';

// Subin Assets
import SubinLead from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc07682.jpg';
import SubinGallery1 from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20241015_120407.jpg';
import SubinGallery2 from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/20240729_142531.jpg';

function ModalSlider({ images, fallback, className = '', children }) {
    const all = images?.length ? images : (fallback ? [fallback] : []);
    const [idx, setIdx] = useState(0);
    if (!all.length) return <div className={className}>{children}</div>;
    const prev = () => setIdx(i => (i - 1 + all.length) % all.length);
    const next = () => setIdx(i => (i + 1) % all.length);
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img src={all[idx]} alt="" className="w-full h-full object-cover transition-opacity duration-300" />
            {children}
            {all.length > 1 && <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors z-10">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors z-10">
                    <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {all.map((_, i) => (
                        <button key={i} onClick={() => setIdx(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`} />
                    ))}
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded-full z-10">
                    {idx + 1} / {all.length}
                </div>
            </>}
        </div>
    );
}

const EXPEDITIONS = [
    {
        id: 'manaslu',
        title: 'Manáslu (8163 m)',
        duration: '35 Dní',
        difficulty: 'Extrémní',
        image: ManasluImg,
        description: 'Výstup na osmou nejvyšší horu světa. Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. S námi nebudete jen platící klient, ale platný člen expedice. Dýcháme za vás, zajišťujeme vynášky a fixujeme lana na místech, kde už to jinak nejde.',
        highlights: ['Základní tábor ve 4800 m', 'Rotace do výškových táborů', 'Útok na vrchol (8163 m)'],
    },
    {
        id: 'mera',
        title: 'Mera Peak (6476 m) & Amphu Lapcha',
        duration: '21 Dní',
        difficulty: 'Velmi těžké',
        image: MeraImg,
        description: 'Trek srdcem Himálaje s výstupem na legendární šmitku Mera Peak. Přechod sedla Amphu Lapcha je jeden z nejvíce fascinujících horolezeckých zážitků, který tvoří přirozenou divokou hradbu do regionu Everestu.',
        highlights: ['Aklimatizace v údolí Hinku', 'Výstup na technický Mera Peak', 'Zdolání sedla Amphu Lapcha (5845 m)'],
    },
    {
        id: 'yoga',
        title: 'Jógový Trek (Annapurny)',
        duration: '14 Dní',
        difficulty: 'Střední',
        image: YogaImg,
        description: 'Spojujeme cvičení mysli i těla na čerstvém himálajském vzduchu. Cesta za poznáním sama sebe pod dohledem nádherných hřebenů Annapuren.',
        highlights: ['Ranní jógové seance s výhledem', 'Poznání místních klášterů', 'Fyzická a mentální očista'],
    }
];

const MORE_EXPEDITIONS = [
    {
        id: 'aconcagua', title: 'Aconcagua', alt: 'Aconcagua 6961 m', image: AconcaImg, description: 'Nejvyšší hora Jižní Ameriky (6961 m)',
        duration: '22 Dní', difficulty: 'Těžké', highlights: ['Základní tábor Plaza de Mulas', 'Výstup na nejvyšší horu západní polokoule', 'Začátek cesty za 7 Summits']
    },
    { 
        id: 'elbrus', title: 'Elbrus', alt: 'Elbrus 5642 m', image: ElbrusImg, description: 'Střecha Evropy (5642 m)',
        duration: '11 Dní', difficulty: 'Střední', highlights: ['Aklimatizace na svazích Kavkazu', 'Výstup na nejvyšší bod Evropy', 'Skvělý trénink pro vyšší hory']
    },
    { 
        id: 'kilimanjaro', title: 'Kilimandžáro', alt: 'Kilimandžáro 5895 m', image: KiliImg, description: 'Africký gigant (5895 m)',
        duration: '10 Dní', difficulty: 'Střední', highlights: ['Trek pěti vegetačními pásmy', 'Výstup na vrchol Uhuru Peak', 'Nezapomenutelné africké ráno na střeše kontinentu']
    },
    { 
        id: 'mustang', title: 'Mustang', alt: 'Trek Mustang', image: MustangImg, description: 'Trek do zakázaného království',
        duration: '18 Dní', difficulty: 'Lehké', highlights: ['Návštěva tajemného království Mustang', 'Objevování starobylých klášterů a jeskyní', 'Královské město Lo Manthang']
    },
    {
        id: 'k2bc', title: 'K2 Base Camp', alt: 'K2 Trek', image: K2Img, description: 'Trek po ledovci Baltoro (Pákistán)',
        duration: '24 Dní', difficulty: 'Velmi těžké', highlights: ['Trek legendárním údolím Baltoro', 'Pohled na nejkrásnější divoké asijské hory', 'Až pod samotnou divokou K2']
    },
    { 
        id: 'ecuador', title: 'Ekvádor', alt: 'Sopky Ekvádoru', image: EcuadorImg, description: 'Výstupy na rovníkové sopky',
        duration: '16 Dní', difficulty: 'Střední', highlights: ['Aklimatizace vysoko v Andách', 'Noční výstup na legendární vulkán Cotopaxi', 'Možnost vystoupat na Chimborazo']
    },
];

const CATEGORIES = [
    {
        id: 'jeep',
        label: 'Výlet jeepem',
        difficulty: 'Bez kondice',
        badgeClass: 'bg-emerald-500/90 text-white',
        image: MustangImg,
        tagline: 'Nepál je váš sen? Nevadí, že netrekujete.',
        desc: 'Horní Mustang, chrámové okruhy nebo horské průsmyky — dostaneme vás tam, kde autobusy nejezdí a průvodci nejsou. Ideální pro ty, kdo chtějí zažít Nepál naplno bez fyzické námahy.',
        highlights: [
            'Horní Mustang — zakázané království jeepem',
            'Lo Manthang a tibetské kláštery',
            'Pohodlné ubytování v teahouses',
            'Vhodné pro všechny věkové kategorie',
        ],
    },
    {
        id: 'photo',
        label: 'Fotografický zájezd',
        difficulty: 'Snadné',
        badgeClass: 'bg-sky-500/90 text-white',
        image: KiliImg,
        tagline: 'Zlatá hodina na střeše světa.',
        desc: 'Workshopy v terénu, portréty místních, dramatická himálajská světla. Jedete s fotoaparátem — vracíte se s galeriemi, které se prodávají.',
        highlights: [
            'Workshop kompozice v horském terénu',
            'Portréty šerpů a místních dětí',
            'Sunrise na vyhlídkách (Poon Hill, EBC)',
            'Malé skupiny — max 8 osob',
        ],
    },
    {
        id: 'yoga',
        label: 'Jógový retreat',
        difficulty: 'Snadné',
        badgeClass: 'bg-sky-500/90 text-white',
        image: YogaImg,
        tagline: 'Tělo, mysl i čerstvý himálajský vzduch.',
        desc: 'Ranní seance s výhledem na Annapurny, meditace u řeky, večeře v teahousu. Trek jako záminku, klid jako cíl. Jóga v nadmořské výšce chutná jinak.',
        highlights: [
            'Ranní jóga s panoramatem hor',
            'Meditace v buddhistických klášterech',
            'Vegetariánská strava, čaj, himálajský klid',
            'Vhodné i pro začátečníky jógy',
        ],
    },
    {
        id: 'trek',
        label: 'Trekking',
        difficulty: 'Střední',
        badgeClass: 'bg-blue-500/90 text-white',
        image: MeraImg,
        tagline: 'Nepál nohama — jeden krok za druhým.',
        desc: 'Annapurna circuit, EBC, Manaslu loop — klasické i méně frekventované trasy. Chodíte, spíte v teahouses, mluvíte s místními. Takhle se Nepál poznává.',
        highlights: [
            'Everest Base Camp trek (5364 m)',
            'Annapurna circuit — 200 km klasiky',
            'Mera Peak jako bonusový výstup',
            'Průvodce ze šerpů, malé skupiny',
        ],
    },
    {
        id: 'technical',
        label: 'Technická výprava',
        difficulty: 'Náročné',
        badgeClass: 'bg-orange-500/90 text-white',
        image: AconcaImg,
        tagline: 'Lana, mačky, první výškové tábory.',
        desc: 'Mera Peak, Island Peak, Aconcagua. Průvodce se zkušenostmi z 8000 m, fixní jistění na klíčových místech — první skutečná horolezecká expedice.',
        highlights: [
            'Mera Peak (6476 m) — nejdostupnější šestka',
            'Island Peak (6189 m) s lanovým jistěním',
            'Aconcagua (6961 m) — vrchol dvou kontinentů',
            'Základní horolezecký kurz zahrnutý',
        ],
    },
    {
        id: '8000',
        label: 'Osmitisícovka',
        difficulty: 'Extrémní',
        badgeClass: 'bg-red-600/90 text-white',
        image: ManasluImg,
        tagline: 'Do konce světa a zpátky.',
        desc: 'Manáslu (8163 m). Jen pro nejpřipravenější. S námi nejste platící klient s číslem — jste platný člen expedičního týmu se vší zodpovědností i slávou.',
        highlights: [
            'Manáslu — 8. nejvyšší hora světa',
            'Kompletní expedice: zásobování, šerpové, lana',
            'Výběr účastníků — jen ověření horolezci',
            'Plná logistika v Káthmándú i na hoře',
        ],
    },
];

const REGIONS = [
    {
        id: 'khumbu',
        name: 'Khumbu & Everest',
        subtitle: 'Ikona Himálaje',
        image: K2Img,
        altitude: 'do 8848 m',
        bestSeason: 'Říjen–Listopad, Duben–Květen',
        difficulty: 'Střední–Extrémní',
        desc: 'Nejslavnější horský region světa. EBC, Island Peak, Ama Dablam — každý najde svoji horu. Namche Bazaar je základna, ledovec Khumbu magnet.',
        highlights: ['Everest Base Camp (5364 m)', 'Island Peak (6189 m)', 'Ama Dablam (6812 m)', 'Klášter Tengboche', 'Namche Bazaar'],
    },
    {
        id: 'annapurna',
        name: 'Annapurna',
        subtitle: 'Treky i retreaty',
        image: YogaImg,
        altitude: 'do 8091 m',
        bestSeason: 'Říjen–Listopad, Duben–Květen',
        difficulty: 'Snadné–Extrémní',
        desc: 'Oblast pro každého — od jógových retreatů u Pokhary po technický výstup na Annapurnu I. Poon Hill je povinnost, Annapurna circuit legenda.',
        highlights: ['Annapurna circuit (200 km)', 'Poon Hill sunrise (3210 m)', 'Jógové retreaty v Pokhaře', 'ABC (4130 m)', 'Dhaulagiri pohled'],
    },
    {
        id: 'mustang',
        name: 'Horní Mustang',
        subtitle: 'Zakázané království',
        image: MustangImg,
        altitude: 'do 3840 m',
        bestSeason: 'Červen–Září (i v monzun!)',
        difficulty: 'Snadné (jeep) – Střední (trek)',
        desc: 'Mustang je jiný svět. Dostupný jeepem — nemusíte být horolezec. Skalnaté kaňony, tibetská kultura, kláštery s tisíciletou historií. Minimum turistů.',
        highlights: ['Lo Manthang — tibetské královské město', 'Jeskyně Chhoser', 'Chrám Thubchen Gompa', 'Jeepová trasa Upper Mustang', 'Tiji festival (jaro)'],
    },
    {
        id: 'manaslu',
        name: 'Manaslu & Tsum',
        subtitle: 'Méně turistů, více divočiny',
        image: ManasluImg,
        altitude: 'do 8163 m',
        bestSeason: 'Říjen–Listopad',
        difficulty: 'Střední–Extrémní',
        desc: 'Manaslu circuit — alternativa k Annapurně se třetinou turistů. Tsum Valley patří k posledním nedotčeným místům na Zemi. Manáslu (8163 m) je naše vlajková loď.',
        highlights: ['Manaslu circuit (177 km)', 'Tsum Valley — zakázaná oblast', 'Larke La průsmyk (5106 m)', 'Expedice Manáslu (8163 m)'],
    },
    {
        id: 'langtang',
        name: 'Langtang & Gosaikunda',
        subtitle: 'Nejblíže Káthmándú',
        image: ElbrusImg,
        altitude: 'do 5000 m',
        bestSeason: 'Říjen–Listopad, Duben–Červen',
        difficulty: 'Snadné–Střední',
        desc: '2 hodiny autem z Káthmándú. Skvělé pro kratší výlety nebo první trek. Yak farmy, gletschery a jezerní okruh Gosaikunda. Méně navštěvovaný, stejně krásný.',
        highlights: ['Langtang valley trek', 'Gosaikunda — posvátná jezera (4380 m)', 'Kyanjin Gompa & Langtang Lirung', 'Ideální na 10–14 dní'],
    },
    {
        id: 'world',
        name: 'Mimo Nepál',
        subtitle: '7 Summits & svět',
        image: AconcaImg,
        altitude: 'do 6961 m',
        bestSeason: 'Dle destinace',
        difficulty: 'Střední–Extrémní',
        desc: 'Nepál je naše domovina, ale jezdíme i jinam. Aconcagua, Kilimandžáro, Elbrus nebo ekvádorské sopky — vždy se stejným přístupem a péčí.',
        highlights: ['Aconcagua (6961 m) — vrchol obou Amerik', 'Kilimandžáro (5895 m) — střecha Afriky', 'Elbrus (5642 m) — střecha Evropy', 'Sopky Ekvádoru — Cotopaxi & Chimborazo'],
    },
];

function mergeAdmin(base, adminArr) {
    if (!adminArr) return base;
    return base.map(item => {
        const ov = adminArr.find(a => a.id === item.id);
        return ov ? { ...item, ...ov } : item;
    });
}

const DEF_TEXTS = {
    about: { tagline: '', title: '', description: '' },
    miri: {
        name: 'Miri Jirková',
        role: 'Trek & Logistika',
        tagline: 'Průvodkyně & Logistika',
        bio1: 'Miri je zkušená horolezkyně, průvodkyně a člověk, bez kterého by většina našich cest do Nepálu nevypadala tak, jak vypadá.',
        bio2: 'Má za sebou řadu vysokohorských expedic, výstupy na šestitisícové i sedmitisícové vrcholy a tisíce kilometrů po nepálských trecích. Společně s Trávou tráví v Nepálu dlouhé měsíce, díky čemuž zná nejen horské stezky, ale i místní kulturu, lidi a každodenní život mimo turistické trasy.',
        bio3: 'Ve výpravách se stará o logistiku, bezpečí i fungování celé skupiny — často právě o věci, které nejsou na první pohled vidět, ale rozhodují o tom, jak se lidé na cestě opravdu cítí. Díky zkušenostem z vysokých hor umí zachovat klid v náročných situacích a vytvořit pohodu i daleko od civilizace. Na himálajských cestách se naučila respektu, vnímání rizika a pokoře vůči horám.',
        bio4: 'Nepál pro ni dávno není jen destinace. Je to druhý domov, ke kterému má hluboký vztah a který pomáhá ostatním poznávat autenticky, s respektem a bez zbytečného pozlátka.',
        tags: ['Šestitisícovky & sedmitisícovky', 'Tisíce km na trecích', 'Logistika & bezpečí'],
    },
    subin: {
        name: 'Subin Thakuri',
        role: 'Terénní expert — Nepál',
        tagline: 'Zakladatel 14 Summits Expedition a partner na cestě.',
        bio1: 'Subin pochází z odlehlého regionu Sindhupalchok a do hor začal chodit už jako patnáctiletý nosič. Díky poctivé práci, zkušenostem a dlouholetému pohybu v Himálaji postupně vybudoval jednu z respektovaných nepálských expedičních agentur.',
        bio2: 'Dnes stojí za projektem 14 Summits Expedition a více než dvacet let vede treky a expedice v Nepálu, Tibetu i Bhútánu. Má za sebou stovky výprav — od klasických treků až po expedice na himálajské vrcholy včetně Everestu, Ama Dablam nebo Manáslu.',
        bio3: 'Pro Honzu a Miri ale není jen partnerem v horách. Je to dlouholetý přítel a člověk, který pomohl propojit český a nepálský svět do jedné společné cesty.',
        bio4: 'Subin dlouhodobě podporuje i rozvoj odlehlých horských oblastí — podílí se na projektech spojených se školami, zdravotní péčí nebo přístupem k pitné vodě.',
        quote: '„Hora rozhoduje, jestli vás pustí nahoru. Důležité je umět jí naslouchat a vědět, kdy pokračovat a kdy se otočit."',
        tags: ['20+ let průvodce', 'Everest · Manáslu · Ama Dablam', 'Nepál · Tibet · Bhútán'],
    },
};

/* ─── Nepal Interactive Map ──────────────────────────────────────────── */
const NEPAL_REGION_PATHS = [
    { id: 'world',     path: 'M 0,145 L 156,58 L 156,245 L 0,258 Z',                                                                      cx: 62,  cy: 185 },
    { id: 'annapurna', path: 'M 156,58 L 176,54 L 212,86 L 368,86 L 364,158 L 374,252 L 156,245 Z',                                       cx: 255, cy: 178 },
    { id: 'mustang',   path: 'M 176,54 L 258,18 L 345,28 L 374,58 L 368,86 L 212,86 Z',                                                   cx: 285, cy: 60  },
    { id: 'langtang',  path: 'M 374,58 L 438,38 L 456,86 L 448,164 L 438,258 L 374,252 L 364,158 L 368,86 Z',                             cx: 406, cy: 162 },
    { id: 'manaslu',   path: 'M 438,38 L 578,30 L 576,86 L 562,178 L 578,264 L 438,258 L 448,164 L 456,86 Z',                             cx: 510, cy: 162 },
    { id: 'khumbu',    path: 'M 578,30 L 820,62 L 820,270 L 578,264 L 562,178 L 576,86 Z',                                                cx: 700, cy: 168 },
];

// Souřadnice přepočítány ze skutečných GPS koordinát:
// x = (lon° - 80°) * (820/8)  |  y = (30.4° - lat°) * (290/4)
const NEPAL_PEAKS = [
    { x: 358, y: 38, name: 'Dhaulagiri', alt: '8 167 m', anchor: 'end',    lx: -3,  ly: -7 },
    { x: 392, y: 47, name: 'Annapurna',  alt: '8 091 m', anchor: 'start',  lx:  3,  ly: -7 },
    { x: 468, y: 30, name: 'Manáslu',    alt: '8 163 m', anchor: 'middle', lx:  0,  ly: -7 },
    { x: 710, y: 44, name: 'Everest',    alt: '8 848 m', anchor: 'end',    lx: -3,  ly: -7 },
];

const NEPAL_CITIES = [
    { x: 545, y: 192, name: 'Káthmándú', type: 'capital', labelBelow: true,  labelDx: 0  },
    { x: 409, y: 162, name: 'Pokhara',   type: 'city',    labelBelow: false, labelDx: 0  },
    { x: 689, y: 194, name: 'Lukla',     type: 'town',    labelBelow: false, labelDx: 8  },
    { x: 382, y: 126, name: 'Jomsom',    type: 'town',    labelBelow: true,  labelDx: 0  },
    { x: 407, y: 56,  name: 'Lo Manthang', type: 'town',  labelBelow: true,  labelDx: 10 },
];

function NepalMap({ regions, onRegionClick }) {
    const [hovered, setHovered] = useState(null);
    const hoveredRegion = hovered ? regions.find(r => r.id === hovered) : null;

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#080f1a] border border-white/[0.07] select-none">

            {/* ── SVG map ── */}
            <svg viewBox="0 0 820 290" className="w-full h-full" style={{ display: 'block' }}>
                <defs>
                    {/* Clip paths — každý region ořízne svůj obrázek */}
                    {NEPAL_REGION_PATHS.map(r => (
                        <clipPath key={`cp-${r.id}`} id={`cp-${r.id}`}>
                            <path d={r.path} />
                        </clipPath>
                    ))}

                    <radialGradient id="nglow" cx="50%" cy="0%" r="65%">
                        <stop offset="0%" stopColor="#7eb8e8" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#080f1a" stopOpacity="0" />
                    </radialGradient>

                    <filter id="rglow" x="-35%" y="-35%" width="170%" height="170%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b" />
                        <feFlood floodColor="#d4af37" floodOpacity="0.65" result="c" />
                        <feComposite in="c" in2="b" operator="in" result="g" />
                        <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>

                    <filter id="pglow" x="-120%" y="-120%" width="340%" height="340%">
                        <feGaussianBlur stdDeviation="2.2" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Outer */}
                <rect width="820" height="290" fill="#04090f" />

                {/* Nepal base */}
                <path d="M 0,145 L 45,105 L 95,76 L 156,58 L 176,54 L 222,40 L 258,18 L 295,22 L 345,28 L 374,58 L 415,38 L 438,38 L 468,32 L 525,26 L 578,30 L 638,36 L 700,44 L 762,52 L 820,62 L 820,270 L 0,260 Z" fill="#13202e" />

                {/* Atmosphere glow from north */}
                <path d="M 0,145 L 45,105 L 95,76 L 156,58 L 176,54 L 222,40 L 258,18 L 295,22 L 345,28 L 374,58 L 415,38 L 438,38 L 468,32 L 525,26 L 578,30 L 638,36 L 700,44 L 762,52 L 820,62 L 820,270 L 0,260 Z" fill="url(#nglow)" />

                {/* Snow band along Himalaya */}
                <path d="M 95,76 L 156,58 L 176,54 L 222,40 L 258,18 L 295,22 L 345,28 L 374,58 L 415,38 L 438,38 L 468,32 L 525,26 L 578,30 L 638,36 L 700,44 L 762,52 L 820,62" fill="none" stroke="rgba(190,218,255,0.13)" strokeWidth="20" strokeLinecap="round" />

                {/* Topographic lines */}
                {[95, 125, 155, 185, 215, 245].map(y => (
                    <line key={y} x1="0" y1={y} x2="820" y2={y} stroke="rgba(255,255,255,0.022)" strokeWidth="0.5" />
                ))}

                {/* ── Fotky regionů oříznuté do tvaru oblasti ── */}
                {NEPAL_REGION_PATHS.map(r => {
                    const reg = regions.find(x => x.id === r.id);
                    if (!reg?.image) return null;
                    const isHov = hovered === r.id;
                    const isDim = hovered && !isHov;
                    return (
                        <image
                            key={`img-${r.id}`}
                            href={reg.image}
                            x="0" y="0" width="820" height="290"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath={`url(#cp-${r.id})`}
                            opacity={isHov ? 0.52 : isDim ? 0.04 : 0.1}
                            style={{ transition: 'opacity 0.32s ease', pointerEvents: 'none' }}
                        />
                    );
                })}

                {/* ── Región fills + border + interaktivita ── */}
                {NEPAL_REGION_PATHS.map(r => {
                    const isHov = hovered === r.id;
                    const isDim = hovered && !isHov;
                    return (
                        <path
                            key={r.id}
                            d={r.path}
                            fill={isHov ? 'rgba(212,175,55,0.14)' : isDim ? 'rgba(0,0,0,0.42)' : 'rgba(255,255,255,0.03)'}
                            stroke={isHov ? 'rgba(212,175,55,0.8)' : isDim ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)'}
                            strokeWidth={isHov ? 1.6 : 0.6}
                            filter={isHov ? 'url(#rglow)' : undefined}
                            style={{ cursor: 'pointer', transition: 'fill 0.25s, stroke 0.25s, stroke-width 0.2s' }}
                            onMouseEnter={() => setHovered(r.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => { const reg = regions.find(x => x.id === r.id); if (reg) onRegionClick(reg); }}
                        />
                    );
                })}

                {/* ── NEPAL vodoznak ── */}
                <text x="415" y="232" textAnchor="middle" fill="rgba(255,255,255,0.032)" fontSize="46" fontFamily="Georgia, serif" fontWeight="900" letterSpacing="0.3em" style={{ pointerEvents: 'none' }}>NEPAL</text>

                {/* ── Horské vrcholy s popisy ── */}
                {NEPAL_PEAKS.map((p, i) => (
                    <g key={i} style={{ pointerEvents: 'none' }}>
                        {/* Stín pod trojúhelníkem */}
                        <polygon points={`${p.x},${p.y + 16} ${p.x - 9},${p.y + 16} ${p.x + 9},${p.y + 16}`} fill="rgba(0,0,0,0.4)" />
                        {/* Trojúhelník */}
                        <polygon points={`${p.x},${p.y - 1} ${p.x - 7},${p.y + 13} ${p.x + 7},${p.y + 13}`} fill="rgba(210,232,255,0.88)" filter="url(#pglow)" />
                        {/* Sněhová čepice */}
                        <polygon points={`${p.x},${p.y - 1} ${p.x - 3},${p.y + 5} ${p.x + 3},${p.y + 5}`} fill="white" opacity="0.96" />
                        {/* Název vrcholu */}
                        <text
                            x={p.x + p.lx}
                            y={p.y + p.ly}
                            textAnchor={p.anchor}
                            fill="rgba(235,245,255,0.92)"
                            fontSize="6.8"
                            fontFamily="sans-serif"
                            fontWeight="700"
                            letterSpacing="0.04em"
                            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.95))' }}
                        >{p.name}</text>
                        {/* Výška */}
                        <text
                            x={p.x + p.lx}
                            y={p.y + p.ly + 8}
                            textAnchor={p.anchor}
                            fill="rgba(212,175,55,0.72)"
                            fontSize="5.8"
                            fontFamily="monospace"
                            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }}
                        >{p.alt}</text>
                    </g>
                ))}

                {/* ── Města a vesnice ── */}
                {NEPAL_CITIES.map((c, i) => {
                    const isCapital = c.type === 'capital';
                    const isCity = c.type === 'city';
                    const r = isCapital ? 4 : isCity ? 3 : 2.2;
                    const labelY = c.labelBelow ? c.y + r + 9 : c.y - r - 5;
                    return (
                        <g key={i} style={{ pointerEvents: 'none' }}>
                            {/* Outer ring */}
                            <circle cx={c.x} cy={c.y} r={r + (isCapital ? 4 : 2.5)} fill="none" stroke="#d4af37" strokeWidth={isCapital ? 0.9 : 0.6} opacity={isCapital ? 0.35 : 0.2} />
                            {/* Dot */}
                            <circle cx={c.x} cy={c.y} r={r} fill="#d4af37" opacity={isCapital ? 0.96 : isCity ? 0.78 : 0.65} />
                            {/* Hvězdička pro hlavní město */}
                            {isCapital && (
                                <text x={c.x} y={c.y + 0.5} textAnchor="middle" dominantBaseline="middle" fill="rgba(8,15,26,0.9)" fontSize="4" fontWeight="900" style={{ pointerEvents: 'none' }}>★</text>
                            )}
                            {/* Název */}
                            <text
                                x={c.x + (c.labelDx || 0)}
                                y={labelY}
                                textAnchor={c.labelDx > 0 ? 'start' : 'middle'}
                                fill={isCapital ? 'rgba(212,175,55,0.92)' : 'rgba(200,165,40,0.72)'}
                                fontSize={isCapital ? 8 : isCity ? 7 : 6}
                                fontFamily="sans-serif"
                                fontWeight={isCapital ? '700' : '500'}
                                letterSpacing="0.05em"
                                style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.95))' }}
                            >{c.name}</text>
                        </g>
                    );
                })}

                {/* ── Kompas ── */}
                <g style={{ pointerEvents: 'none' }} transform="translate(795,22)">
                    <circle cx="0" cy="0" r="10" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                    <polygon points="0,-7 -2.5,0 2.5,0" fill="rgba(235,245,255,0.85)" />
                    <polygon points="0,7 -2.5,0 2.5,0" fill="rgba(255,255,255,0.2)" />
                    <text x="0" y="-10" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="sans-serif" fontWeight="700">N</text>
                </g>

                {/* ── Název hovered regionu přímo na mapě ── */}
                {hoveredRegion && (() => {
                    const rp = NEPAL_REGION_PATHS.find(r => r.id === hovered);
                    if (!rp) return null;
                    const tx = Math.min(Math.max(rp.cx, 28), 792);
                    const ty = rp.cy < 68 ? rp.cy + 16 : rp.cy - 8;
                    return (
                        <text x={tx} y={ty} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="11" fontFamily="Georgia, serif" fontWeight="700" style={{ pointerEvents: 'none', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>
                            {hoveredRegion.name}
                        </text>
                    );
                })()}
            </svg>

            {/* ── Rich preview panel — vyjede ze spodu ── */}
            <AnimatePresence>
                {hoveredRegion && (
                    <motion.div
                        key={hoveredRegion.id}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 32, stiffness: 420 }}
                        className="absolute bottom-0 left-0 right-0 pointer-events-none"
                        style={{ height: 118 }}
                    >
                        {/* Foto pozadí s gradient overlay */}
                        <div className="absolute inset-0 overflow-hidden">
                            <img src={hoveredRegion.image} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" style={{ objectPosition: 'center 40%' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/88 to-[#04090f]/60" />
                        </div>

                        {/* Gold accent line na top */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

                        {/* Obsah */}
                        <div className="absolute inset-0 flex items-center gap-3 px-4">
                            {/* Thumbnail */}
                            <div className="w-[72px] h-[90px] rounded-xl overflow-hidden shrink-0 border border-white/15 shadow-lg">
                                <img src={hoveredRegion.image} alt={hoveredRegion.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-gold-400">{hoveredRegion.altitude}</span>
                                    <span className="w-px h-3 bg-white/25 shrink-0" />
                                    <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-slate-400">{hoveredRegion.difficulty}</span>
                                </div>
                                <h3 className="font-serif text-white text-[15px] leading-tight mb-1.5 drop-shadow-lg">{hoveredRegion.name}</h3>
                                <p className="font-sans text-slate-400 text-[11px] leading-snug line-clamp-2">
                                    {hoveredRegion.desc}
                                </p>
                            </div>

                            {/* CTA arrow */}
                            <div className="shrink-0 flex flex-col items-center gap-1.5">
                                <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center shadow-[0_0_14px_rgba(212,175,55,0.3)]">
                                    <ArrowRight className="w-4 h-4 text-gold-400" />
                                </div>
                                <span className="text-[8px] font-mono text-gold-500/60 uppercase tracking-widest">detail</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint — schová se při hoveru */}
            <div className={`absolute bottom-2.5 right-3.5 text-[8px] text-white/18 uppercase tracking-widest font-mono pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
                najeď · klikni
            </div>
        </div>
    );
}

const Expeditions = ({ scrollProgress }) => {
    const adminExpeditions = loadContent('expeditions', null);
    const adminTexts = loadContent('texts', DEF_TEXTS);
    const miri = { ...DEF_TEXTS.miri, ...(adminTexts?.miri || {}) };
    const subin = { ...DEF_TEXTS.subin, ...(adminTexts?.subin || {}) };
    const EXPEDITIONS_DISPLAY     = mergeAdmin(EXPEDITIONS,      adminExpeditions);
    const MORE_EXPEDITIONS_DISPLAY = mergeAdmin(MORE_EXPEDITIONS, adminExpeditions);
    const CATEGORIES_DISPLAY      = CATEGORIES;

    const containerOpacity = useTransform(scrollProgress, [0.25, 0.28, 0.34, 0.38], [0, 1, 1, 0]);
    const backgroundY = useTransform(scrollProgress, [0.25, 0.28, 0.34, 0.38], ["-105%", "0%", "0%", "130%"]);
    const contentY = useTransform(scrollProgress, [0.25, 0.28, 0.34, 0.38], ["-105%", "0%", "0%", "130%"]);
    const bgY = useTransform(scrollProgress, [0.24, 0.43], ["-15%", "15%"]);

    const [selectedExped, setSelectedExped] = useState(null);
    const [showAllExpeditions, setShowAllExpeditions] = useState(false);
    const [selectedMoreExped, setSelectedMoreExped] = useState(null);
    const [isOrdering, setIsOrdering] = useState(false);
    const [isMiriOpen, setIsMiriOpen] = useState(false);
    const [isSubinOpen, setIsSubinOpen] = useState(false);
    const [miriSource, setMiriSource] = useState(null);
    const [subinSource, setSubinSource] = useState(null);
    const [is14Open, setIs14Open] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isRegionsOpen, setIsRegionsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const VIDEO_EMBED_URL = 'https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID';

    // Prevent body scroll when modal is open
    useScrollLock(selectedExped || showAllExpeditions || selectedMoreExped || isMiriOpen || isSubinOpen || isVideoOpen || selectedCategory || isRegionsOpen || is14Open);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setIsVideoOpen(false); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Allow external components (About story modal) to open team modals
    useEffect(() => {
        const onMiri = (e) => { setMiriSource(e.detail?.source || null); setIsMiriOpen(true); };
        const onSubin = (e) => { setSubinSource(e.detail?.source || null); setIsSubinOpen(true); };
        window.addEventListener('openMiriModal', onMiri);
        window.addEventListener('openSubinModal', onSubin);
        return () => {
            window.removeEventListener('openMiriModal', onMiri);
            window.removeEventListener('openSubinModal', onSubin);
        };
    }, []);

    const expedCarouselRef = useRef(null);
    const categoryDragRef = useRef(null);
    const catX = useMotionValue(0);
    const [catDragLeft, setCatDragLeft] = useState(-800);
    const catDidDrag = useRef(false);

    useEffect(() => {
        const update = () => {
            const container = categoryDragRef.current;
            if (!container) return;
            const inner = container.firstElementChild;
            if (inner) setCatDragLeft(Math.min(0, container.clientWidth - inner.scrollWidth));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const catScrollPrev = () => animate(catX, Math.min(catX.get() + 210, 0), { type: 'spring', stiffness: 350, damping: 30 });
    const catScrollNext = () => animate(catX, Math.max(catX.get() - 210, catDragLeft), { type: 'spring', stiffness: 350, damping: 30 });
    const expedCarouselProgress = useTransform(scrollProgress, [0.30, 0.34], [0, 1]);
    useEffect(() => {
        return expedCarouselProgress.on("change", (latest) => {
            const el = expedCarouselRef.current;
            if (!el) return;
            const maxScroll = el.scrollWidth - el.clientWidth;
            el.scrollLeft = Math.max(0, Math.min(1, latest) * maxScroll);
        });
    }, [expedCarouselProgress]);
    
    return (
        <>
        {/* BACKGROUND LAYER - Behind Clouds */}
        <motion.div
            style={{ opacity: containerOpacity, zIndex: 0 }}
            className="absolute inset-0 w-full h-full bg-[#1A202C] pointer-events-none"
        >
            <motion.div
                style={{ 
                    y: backgroundY,
                    maskImage: 'linear-gradient(to top, black 0%, black calc(100% - 150px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black calc(100% - 150px), transparent 100%)'
                }}
                className="absolute inset-0 w-full h-[150%] z-0"
            >
                <motion.img
                    style={{ y: bgY }}
                    src={SummitImage}
                    alt="Mountain Wall"
                    className="absolute inset-0 w-full h-[150%] object-cover opacity-60 mix-blend-overlay grayscale scale-125 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A202C] via-transparent to-[#1A202C]" />
            </motion.div>
        </motion.div>

        {/* CONTENT LAYER - Above Clouds */}
        <motion.div
            style={{ opacity: containerOpacity, zIndex: 70 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
        >
            <motion.div
                style={{ y: contentY }}
                className="w-full h-full"
            >
                {/* ── Mobile carousel ── */}
                <div className="md:hidden w-full h-full flex flex-col justify-center pointer-events-auto overflow-hidden">
                    <div className="px-4 shrink-0 text-center mb-2">
                        <img src={Logo14Summits} alt="14 Summits Logo" className="w-28 mx-auto mb-2 drop-shadow-lg opacity-90" />
                        <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-1">04 — Expedice (4500 m)</h4>
                        <h2 className="font-serif text-2xl text-white leading-tight mb-1">Vydej se se mnou na cesty</h2>
                        <p className="text-slate-400 font-serif italic text-xs tracking-widest">Dobří parťáci jsou to nejcennější.</p>
                    </div>
                    <div className="shrink-0">
                        <div ref={expedCarouselRef} className="flex gap-3 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {/* 14 Summits card */}
                            <div className="shrink-0 snap-start w-[82vw] rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-slate-700/50 p-5 flex flex-col gap-3">
                                <div>
                                    <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-2">14 Summits Expedition</h3>
                                    <h2 className="font-serif text-xl text-white leading-tight mb-2">Čeští specialisté na Nepál</h2>
                                    <p className="font-sans text-slate-300 text-xs leading-relaxed">Nejsme sterilní cestovka z letáku. Od pohodových treků po osmitisícovky — vždy s osobním přístupem, zkušeným nepálským týmem a vlastním zázemím v Káthmándú.</p>
                                </div>
                                <div className="flex flex-col gap-2 mt-auto">
                                    <button onClick={() => setIs14Open(true)} className="w-full py-2.5 px-3 bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                                        O 14 Summits <ArrowRight className="w-3 h-3" />
                                    </button>
                                    <div className="flex gap-2">
                                        <button onClick={() => setIsMiriOpen(true)} className="flex-1 py-2.5 px-3 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95">O {miri.name.split(' ')[0]}</button>
                                        <button onClick={() => setIsSubinOpen(true)} className="flex-1 py-2.5 px-3 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95">O {subin.name.split(' ')[0]}</button>
                                    </div>
                                    <a href="https://14summitsexpedition.cz" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold uppercase tracking-wider text-xs rounded-xl text-center flex items-center justify-center gap-2">
                                        Chci do Nepálu <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                            {/* Category 3×2 grid */}
                            <div className="shrink-0 snap-start w-[92vw]">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gold-400 font-sans uppercase tracking-[0.25em] text-[10px] font-bold">Co pro vás máme</p>
                                    <button onClick={() => setIsRegionsOpen(true)} className="flex items-center gap-1 text-slate-300 hover:text-gold-400 text-[10px] font-bold uppercase tracking-wider transition-colors">
                                        <MapPin className="w-3 h-3" /> Oblasti
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {CATEGORIES_DISPLAY.map((cat, i) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat)}
                                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.12] active:scale-[0.96] transition-transform"
                                        >
                                            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover brightness-[0.5]" alt={cat.label} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                            {/* Index */}
                                            <span className="absolute top-2.5 left-3 font-mono text-[9px] text-gold-500/60 font-bold tracking-widest leading-none">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {/* Difficulty badge */}
                                            <span className={`absolute top-2 right-2 text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${cat.badgeClass} leading-tight shadow-md`}>
                                                {cat.difficulty}
                                            </span>
                                            {/* Label */}
                                            <div className="absolute bottom-0 inset-x-0 p-3">
                                                <h4 className="font-serif text-white text-sm leading-tight drop-shadow-md">{cat.label}</h4>
                                                <p className="font-sans text-slate-300 text-[10px] leading-snug mt-0.5 line-clamp-1">{cat.tagline}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* YouTube card */}
                            <a
                                href="https://www.youtube.com/@honzatrava"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 snap-start w-[72vw] rounded-2xl overflow-hidden border border-white/10 active:scale-[0.98] transition-transform relative"
                            >
                                <img src={SummitImage} className="absolute inset-0 w-full h-full object-cover brightness-40 object-[50%_30%]" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
                                <div className="relative flex flex-col items-center justify-center gap-3 h-full min-h-[200px] p-5">
                                    <div className="relative">
                                        <span className="absolute inset-0 rounded-full bg-gold-500/30 animate-ping" />
                                        <div className="relative w-14 h-14 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                            <Play className="w-5 h-5 text-gold-300 fill-gold-300 ml-0.5" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gold-400 font-sans uppercase tracking-[0.25em] text-[9px] font-bold mb-1">YouTube kanál</p>
                                        <p className="font-serif text-white text-sm leading-snug">Sleduj výpravy na YouTube</p>
                                    </div>
                                </div>
                            </a>

                            {/* Expedition cards */}
                            {EXPEDITIONS_DISPLAY.map((exped) => (
                                <div key={exped.id} onClick={() => { setSelectedExped(exped); setIsOrdering(false); }} className="shrink-0 snap-start w-[62vw] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 cursor-pointer active:scale-[0.97] transition-transform relative">
                                    <img src={resolveImageSrc(exped) || exped.image} className="absolute inset-0 w-full h-full object-cover" alt={exped.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                                    <div className="absolute top-3 right-3">
                                        <span className="text-[9px] text-gold-400 tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-gold-500/20">{exped.difficulty}</span>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 p-4">
                                        <h4 className="font-serif text-sm text-white leading-tight mb-2 drop-shadow-md">{exped.title}</h4>
                                        <span className="text-[9px] text-white/60 tracking-wider uppercase bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">{exped.duration}</span>
                                        <div className="flex items-center gap-1 text-gold-400 text-[9px] font-bold uppercase tracking-wider mt-2.5">
                                            Detail <ArrowRight className="w-2.5 h-2.5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* More expeditions card */}
                            <div onClick={() => setShowAllExpeditions(true)} className="shrink-0 snap-start w-[55vw] rounded-2xl border border-white/20 bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer active:scale-[0.98] transition-transform p-5">
                                <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center bg-gold-500/10">
                                    <ArrowRight className="w-5 h-5 text-gold-400" />
                                </div>
                                <p className="font-sans font-bold text-white text-xs uppercase tracking-widest text-center">Více expedicí</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Desktop layout ── */}
                <div className="hidden md:flex w-full h-full flex-col items-center justify-center px-4 md:px-6">
                <div className="w-full flex flex-col items-center justify-center origin-center transition-transform duration-300 [@media(min-width:768px)_and_(min-height:820px)]:-translate-y-16 [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.85] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.75] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.65] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.55]">
                    <div className="text-center mb-0.5 md:mb-4 xl:mb-6 relative z-10 md:pt-6 flex flex-col items-center">
                    <img src={Logo14Summits} alt="14 Summits Logo" className="w-36 md:w-52 xl:w-72 mb-1 xl:mb-2 drop-shadow-lg opacity-90" />
                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-2 md:mb-3 mt-0.5 md:mt-4">
                        04 — Expedice (4500 m)
                    </h4>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-1 md:mb-2 drop-shadow-md">
                        Vydej se se mnou na cesty
                    </h2>
                    <p className="text-slate-300 font-serif italic text-base md:text-lg tracking-widest drop-shadow">Dobří parťáci na cestě jsou to nejcennější.</p>
                </div>

                {/* YouTube channel strip */}
                <div className="relative z-10 max-w-7xl w-full px-4 md:px-8 lg:pl-10 lg:pr-32 xl:px-6 mb-4 md:mb-5">
                    <a
                        href="https://www.youtube.com/@honzatrava"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full h-24 md:h-28 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold-500/50 transition-all duration-500 pointer-events-auto flex"
                    >
                        <img src={SummitImage} className="absolute inset-0 w-full h-full object-cover brightness-40 group-hover:brightness-50 group-hover:scale-105 transition-all duration-700 object-[50%_30%]" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/85" />
                        <div className="relative flex items-center justify-center gap-5 h-full w-full">
                            <div className="relative shrink-0">
                                <span className="absolute inset-0 rounded-full bg-gold-500/25 animate-ping" />
                                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold-500/15 border-2 border-gold-400/80 flex items-center justify-center group-hover:bg-gold-500/35 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                    <Play className="w-4 h-4 md:w-5 md:h-5 text-gold-300 fill-gold-300 ml-0.5" />
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-gold-400 font-sans uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-bold mb-1">YouTube kanál</p>
                                <h3 className="font-serif text-white text-lg md:text-xl lg:text-2xl leading-tight drop-shadow-md">Sleduj výpravy a cesty na YouTube</h3>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="relative z-10 max-w-7xl w-full flex justify-center px-4 md:px-8 lg:pl-10 lg:pr-32 xl:px-6 mt-0">
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start">

                        <motion.div
                            initial={{ rotate: -20, x: -100, y: 40, opacity: 0 }}
                            whileInView={{ rotate: -12, x: -60, y: -20, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                            className="hidden lg:block absolute -top-16 lg:-left-12 xl:-left-24 z-0 lg:w-64 xl:w-80 bg-[#f8f9fa] p-3 xl:p-4 pb-12 xl:pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50 pointer-events-none"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={HonzaProfile} 
                                    className="w-full h-full object-cover object-top filter contrast-105 opacity-95 saturate-110" 
                                    alt="Honza" 
                                />
                                <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
                            </div>
                            <div className="absolute bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-sm font-medium tracking-wide">
                                Honza
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ rotate: 20, x: 100, y: -40, opacity: 0 }}
                            whileInView={{ rotate: 16, x: 40, y: 40, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
                            className="hidden lg:block absolute -bottom-32 -right-24 z-0 w-80 bg-[#f8f9fa] p-4 pb-16 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={ClimbersImg} 
                                    className="w-full h-full object-cover object-center filter contrast-105 opacity-95 saturate-110" 
                                    alt="Miri" 
                                />
                                <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
                            </div>
                            <div className="absolute bottom-5 left-0 w-full text-center font-serif italic text-slate-600 text-sm font-medium tracking-wide">
                                {miri.name.split(' ')[0]}
                            </div>
                        </motion.div>

                        {/* Additional Polaroids */}
                        <motion.div
                            initial={{ rotate: -10, x: -140, y: 80, opacity: 0 }}
                            whileInView={{ rotate: -5, x: -80, y: 50, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, delay: 0.3, type: "spring", bounce: 0.2 }}
                            className="hidden xl:block absolute -bottom-32 -left-10 z-0 w-64 bg-[#f8f9fa] p-3 pb-12 shadow-[0_15px_40px_rgba(0,0,0,0.5)] rounded-sm border border-slate-200/40"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={PolaroidBaseCamp} 
                                    className="w-full h-full object-cover filter contrast-105 opacity-95 saturate-110" 
                                    alt="Base Camp" 
                                />
                            </div>
                            <div className="absolute bottom-4 left-0 w-full text-center font-serif italic text-slate-500 text-xs font-medium tracking-wide">
                                Base Camp
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ rotate: -15, x: 120, y: 80, opacity: 0 }}
                            whileInView={{ rotate: -8, x: 30, y: 60, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, delay: 0.4, type: "spring", bounce: 0.2 }}
                            className="hidden xl:block absolute -bottom-40 right-20 z-0 w-72 bg-[#f8f9fa] p-3 pb-14 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-sm border border-slate-200/50"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={PolaroidCesta} 
                                    className="w-full h-full object-cover filter contrast-105 opacity-95 saturate-110" 
                                    alt="Naše Cesty" 
                                />
                            </div>
                            <div className="absolute bottom-4 left-0 w-full text-center font-serif italic text-slate-500 text-xs font-medium tracking-wide">
                                Cesta nahoru
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ rotate: 15, x: 60, y: -80, opacity: 0 }}
                            whileInView={{ rotate: 15, x: 60, y: 10, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.3, delay: 0.5, type: "spring", bounce: 0.3 }}
                            className="hidden lg:block absolute -top-10 -right-24 z-0 w-56 bg-[#f8f9fa] p-2 pb-10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-sm border border-slate-200/40"
                        >
                            <div className="w-full aspect-square bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={PolaroidVrchol} 
                                    className="w-full h-full object-cover filter contrast-105 opacity-95 saturate-110" 
                                    alt="Vrchol" 
                                />
                            </div>
                            <div className="absolute bottom-3 left-0 w-full text-center font-serif italic text-slate-400 text-[10px] font-medium tracking-wide">
                                Expedice Manáslu
                            </div>
                        </motion.div>

                        <motion.div className="glass-card p-4 md:p-6 lg:p-8 text-left pointer-events-auto relative z-10 backdrop-blur-3xl bg-slate-950/75 border-slate-700/50 shadow-2xl h-full flex flex-col justify-center rounded-2xl">
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-sm md:text-[11px] font-bold mb-3 md:mb-4 drop-shadow-md">14 Summits Expedition · Nepál</h3>
                            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4 md:mb-5 leading-tight drop-shadow-lg">
                                Čeští specialisté <span className="italic text-slate-300">na Nepál.</span>
                            </h2>
                            <p className="font-sans text-slate-100 font-medium leading-relaxed text-sm md:text-base mb-3 drop-shadow-sm">
                                Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa, kde dělají nejlepší dal bhat široko daleko.
                            </p>
                            <p className="font-sans text-slate-300 leading-relaxed text-sm drop-shadow-sm">
                                Treky, expedice i vlastní zázemí v Káthmándú — od pohodových cest po osmitisícové vrcholy, vždy s osobním přístupem, poctivou aklimatizací a zkušeným nepálským týmem.
                            </p>

                            <div className="mt-6 md:mt-8 pt-5 border-t border-white/10 flex flex-col gap-2.5">
                                <button
                                    onClick={() => setIs14Open(true)}
                                    className="group relative w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-white/15 hover:bg-white/25 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-300 border border-white/25 overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 drop-shadow-md">O 14 Summits Expedition</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={() => setIsMiriOpen(true)}
                                        className="group relative flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-[0.12em] text-xs rounded-xl transition-all duration-300 border border-white/20 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                        <span className="relative z-10 whitespace-nowrap">O {miri.name.split(' ')[0]}</span>
                                        <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                    <button
                                        onClick={() => setIsSubinOpen(true)}
                                        className="group relative flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-[0.12em] text-xs rounded-xl transition-all duration-300 border border-white/20 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                        <span className="relative z-10 whitespace-nowrap">O {subin.name.split(' ')[0]}</span>
                                        <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                    <a
                                        href="https://14summitsexpedition.cz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex-[1.3] inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-br from-gold-500 to-gold-600 text-white font-bold uppercase tracking-[0.12em] text-xs rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_0_16px_rgba(212,175,55,0.3)] border border-gold-400/50 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                        <span className="relative z-10 whitespace-nowrap">Chci do Nepálu</span>
                                        <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Nepal interactive map ── */}
                        <div className="pointer-events-auto relative z-10 flex flex-col gap-2.5">
                            {/* Header */}
                            <div className="bg-slate-950/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/[0.08]">
                                <h3 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[11px] font-bold">Regiony & Možnosti</h3>
                                <p className="font-sans text-slate-300 text-xs leading-relaxed mt-0.5">
                                    Najeď na oblast — zjisti, co tam děláme.
                                </p>
                            </div>

                            {/* Map */}
                            <div className="h-[268px] lg:h-[298px]">
                                <NepalMap
                                    regions={REGIONS}
                                    onRegionClick={(region) => {
                                        setSelectedRegion(region);
                                        setIsRegionsOpen(true);
                                    }}
                                />
                            </div>

                            {/* Action */}
                            <button
                                onClick={() => setShowAllExpeditions(true)}
                                className="py-3 px-4 bg-gold-500 text-white text-[10px] font-bold uppercase tracking-[0.12em] rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(212,175,55,0.25)]"
                            >
                                Všechny výpravy <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </button>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </motion.div>
        </motion.div>

        <AnimatePresence>
            {selectedExped && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setSelectedExped(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                    >
                        <button 
                            onClick={() => setSelectedExped(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <ModalSlider
                            images={selectedExped.images}
                            fallback={resolveImageSrc(selectedExped) || selectedExped.image}
                            className="w-full md:w-5/12 h-64 md:h-auto relative shrink-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ivory/90 via-transparent to-transparent opacity-100 pointer-events-none" />
                            <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
                                <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold font-sans tracking-widest uppercase outline outline-1 outline-white/20 inline-block w-fit">
                                    {selectedExped.duration}
                                </div>
                                <div className="px-4 py-1.5 bg-gold-500/80 backdrop-blur-md text-white text-xs font-bold font-sans tracking-widest uppercase outline outline-1 outline-white/20 inline-block w-fit">
                                    {selectedExped.difficulty}
                                </div>
                            </div>
                        </ModalSlider>

                        <div 
                            className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center overscroll-contain"
                            data-lenis-prevent
                        >
                            {!isOrdering ? (
                                <>
                                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3">
                                        Detail Výpravy
                                    </h4>
                                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
                                        {selectedExped.title}
                                    </h2>
                                    
                                    <p className="font-sans text-slate-700 leading-relaxed text-base md:text-lg mb-8">
                                        {selectedExped.description}
                                    </p>

                                    <div className="mb-8 p-6 bg-slate-100/50 rounded-2xl border border-slate-200">
                                        <h4 className="font-serif text-xl text-slate-900 mb-4">Program zkratce:</h4>
                                        <ul className="space-y-3">
                                            {selectedExped.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex gap-3 text-slate-700 font-sans items-start">
                                                    <span className="text-gold-500 mt-1"><ArrowRight className="w-4 h-4" /></span>
                                                    <span className="leading-snug">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button 
                                        onClick={() => setIsOrdering(true)}
                                        className="w-full py-4 px-6 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group"
                                    >
                                        Mám zájem
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col h-full animate-in fade-in duration-500">
                                    <button 
                                        onClick={() => setIsOrdering(false)}
                                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold uppercase tracking-widest mb-6 transition-colors w-fit"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Zpět
                                    </button>
                                    <h3 className="font-serif text-3xl text-slate-900 mb-2">Rezervace výpravy</h3>
                                    <p className="text-slate-600 mb-8 font-sans">Vyplňte formulář a mi se vám co nejdříve ozveme s detaily k: {selectedExped.title}.</p>
                                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Jméno a příjmení</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-slate-900" placeholder="Jan Novák" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">E-mail</label>
                                                <input type="email" className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-slate-900" placeholder="jan@novak.cz" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Telefon</label>
                                                <input type="tel" className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-slate-900" placeholder="+420" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Zpráva (volitelné)</label>
                                            <textarea rows={3} className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors resize-none text-slate-900" placeholder="Vaše poznámka..."></textarea>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                alert("Poptávka na " + selectedExped.title + " byla odeslána! (Demo)");
                                                setIsOrdering(false);
                                                setSelectedExped(null);
                                            }}
                                            className="w-full mt-4 py-4 px-6 bg-gold-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-gold-500/20"
                                        >
                                            Odeslat nezávaznou poptávku
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── All Expeditions Grid Modal ── */}
        <AnimatePresence>
            {showAllExpeditions && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setShowAllExpeditions(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#111827] w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col relative"
                    >
                        {selectedMoreExped ? (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                <div className="bg-ivory w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative">
                                    <button 
                                        onClick={() => setSelectedMoreExped(null)}
                                        className="absolute top-4 left-4 md:top-6 md:left-6 z-10 p-2 md:p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                                    >
                                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-180" />
                                    </button>

                                    <div className="w-full md:w-5/12 h-64 md:h-auto relative shrink-0">
                                        <img src={resolveImageSrc(selectedMoreExped) || selectedMoreExped.image} alt={selectedMoreExped.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ivory/90 via-transparent to-transparent opacity-100" />
                                        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                                            <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold font-sans tracking-widest uppercase outline outline-1 outline-white/20 inline-block w-fit">
                                                {selectedMoreExped.duration}
                                            </div>
                                            <div className="px-4 py-1.5 bg-gold-500/80 backdrop-blur-md text-white text-xs font-bold font-sans tracking-widest uppercase outline outline-1 outline-white/20 inline-block w-fit">
                                                {selectedMoreExped.difficulty}
                                            </div>
                                        </div>
                                    </div>

                                    <div 
                                        className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center overscroll-contain"
                                        data-lenis-prevent
                                    >
                                        {!isOrdering ? (
                                            <>
                                                <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3">
                                                    Detail Výpravy
                                                </h4>
                                                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
                                                    {selectedMoreExped.title}
                                                </h2>
                                                
                                                <p className="font-sans text-slate-700 leading-relaxed text-base md:text-lg mb-8">
                                                    {selectedMoreExped.description}
                                                </p>

                                                <div className="mb-8 p-6 bg-slate-100/50 rounded-2xl border border-slate-200">
                                                    <h4 className="font-serif text-xl text-slate-900 mb-4">Program zkratce:</h4>
                                                    <ul className="space-y-3">
                                                        {selectedMoreExped.highlights.map((highlight, idx) => (
                                                            <li key={idx} className="flex gap-3 text-slate-700 font-sans items-start">
                                                                <span className="text-gold-500 mt-1"><ArrowRight className="w-4 h-4" /></span>
                                                                <span className="leading-snug">{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <button 
                                                    onClick={() => setIsOrdering(true)}
                                                    className="w-full py-4 px-6 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group"
                                                >
                                                    Mám zájem
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col h-full animate-in fade-in duration-500">
                                                <button 
                                                    onClick={() => setIsOrdering(false)}
                                                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold uppercase tracking-widest mb-6 transition-colors w-fit"
                                                >
                                                    <ArrowLeft className="w-4 h-4" />
                                                    Zpět
                                                </button>
                                                <h3 className="font-serif text-3xl text-slate-900 mb-2">Rezervace výpravy</h3>
                                                <p className="text-slate-600 mb-8 font-sans">Vyplňte formulář a mi se vám co nejdříve ozveme s detaily k: {selectedMoreExped.title}.</p>
                                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Jméno a příjmení</label>
                                                        <input type="text" className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-slate-900" placeholder="Jan Novák" />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">E-mail</label>
                                                            <input type="email" className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-slate-900" placeholder="jan@novak.cz" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Telefon</label>
                                                            <input type="tel" className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors text-slate-900" placeholder="+420" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Zpráva (volitelné)</label>
                                                        <textarea rows={3} className="w-full px-4 py-3 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors resize-none text-slate-900" placeholder="Vaše poznámka..."></textarea>
                                                    </div>
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            alert("Poptávka na " + selectedMoreExped.title + " byla odeslána! (Demo)");
                                                            setIsOrdering(false);
                                                            setSelectedMoreExped(null);
                                                            setShowAllExpeditions(false);
                                                        }}
                                                        className="w-full mt-4 py-4 px-6 bg-gold-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-gold-500/20"
                                                    >
                                                        Odeslat nezávaznou poptávku
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-20 bg-gradient-to-b from-[#111827] to-transparent">
                                    <div>
                                        <h4 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-2">
                                            Kompletní přehled
                                        </h4>
                                        <h2 className="font-serif text-3xl md:text-4xl text-white">
                                            Všechny Expedice
                                        </h2>
                                    </div>
                                    <button 
                                        onClick={() => setShowAllExpeditions(false)}
                                        className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-transparent hover:border-white/30"
                                    >
                                        <X className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                </div>

                                <div 
                                    className="p-6 md:p-8 pt-32 md:pt-36 overflow-y-auto custom-scrollbar overscroll-contain"
                                    data-lenis-prevent
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {MORE_EXPEDITIONS_DISPLAY.map((exped) => (
                                            <div 
                                                key={exped.id}
                                                onClick={() => { setSelectedMoreExped(exped); setIsOrdering(false); }}
                                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg outline outline-1 outline-white/10"
                                            >
                                                <img 
                                                    src={resolveImageSrc(exped) || exped.image} 
                                                    alt={exped.alt} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                                
                                                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end">
                                                    <h3 className="font-serif text-2xl text-white mb-2">{exped.title}</h3>
                                                    <p className="font-sans text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mb-4 line-clamp-2">
                                                        {exped.description}
                                                    </p>
                                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                                                        <span className="font-sans text-[10px] text-white/70 tracking-wider uppercase bg-white/10 px-2 py-1 rounded backdrop-blur-sm border border-white/10">{exped.duration}</span>
                                                        <span className="font-sans text-[10px] text-gold-400 tracking-wider uppercase bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/10">{exped.difficulty}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── 14 SUMMITS EXPEDITION MODAL ── */}
        <AnimatePresence>
            {is14Open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 pointer-events-auto bg-slate-950/92 backdrop-blur-md"
                    onClick={() => setIs14Open(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -16 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Hero */}
                        <div className="relative h-36 md:h-48 shrink-0 overflow-hidden">
                            <img src={SummitImage} alt="" className="w-full h-full object-cover object-[50%_30%] brightness-50" />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950/95" />
                            <button
                                onClick={() => setIs14Open(false)}
                                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm border border-white/15"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-5 left-6 md:left-8">
                                <span className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold block mb-1.5">14 Summits Expedition</span>
                                <h2 className="font-serif text-2xl md:text-4xl text-white leading-none">
                                    Čeští specialisté <span className="italic text-slate-300">na Nepál.</span>
                                </h2>
                            </div>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar px-6 md:px-10 py-7 md:py-9" data-lenis-prevent>

                            {/* Intro */}
                            <p className="font-sans text-slate-800 leading-relaxed font-medium mb-4 text-sm md:text-base">
                                Treky, expedice i vlastní zázemí v Káthmándú s Honzou Trávou, Miri Jirkovou a naším nepálským týmem.
                            </p>
                            <p className="font-sans text-slate-700 leading-relaxed mb-4 text-sm">
                                Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa, kde dělají nejlepší dal bhat široko daleko. Nepál je pro nás druhým domovem a společně se Subinem Thakurim a 14 Summits Expedition propojujeme zkušenosti z vysokých hor s českým zázemím a osobním přístupem.
                            </p>
                            <p className="font-sans text-slate-700 leading-relaxed mb-4 text-sm">
                                Pořádáme treky, expedice i cesty na klíč — od pohodových treků v podhůří Himálaje až po výstupy na osmitisícové vrcholy. Důležitá je pro nás bezpečnost, poctivá aklimatizace, malá skupina lidí a zkušený nepálský tým, na který je spoleh i vysoko v horách.
                            </p>
                            <p className="font-sans text-slate-500 leading-relaxed mb-8 text-sm italic">
                                Nejde nám o sbírání vrcholů ani výkon za každou cenu. Hory nás naučily pokoře, nadhledu a tomu, že někdy je stejně důležitý jako cesta samotná i návrat domů.
                            </p>

                            {/* Co organizujeme */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-4 h-px bg-gold-400 shrink-0" />
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600">Co společně organizujeme</h3>
                            </div>
                            <ul className="space-y-2.5 mb-8">
                                {[
                                    'Treky v Nepálu s místními průvodci',
                                    'Expedice na šestitisícové vrcholy i výš',
                                    'Fotografické výpravy',
                                    'Jógové treky',
                                    'Cesty na klíč podle zkušeností a možností účastníků',
                                    'Soukromé i skupinové výpravy',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <ArrowRight className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                                        <span className="font-sans text-slate-700 text-sm leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Jak cestujeme */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-4 h-px bg-gold-400 shrink-0" />
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600">Jak cestujeme</h3>
                            </div>
                            <p className="font-sans text-slate-700 leading-relaxed mb-4 text-sm">
                                Cestujeme v menších skupinách a zakládáme si na osobním přístupu. Na trecích i expedicích spolupracujeme se zkušenými nepálskými průvodci, nosiči a lidmi, které osobně známe mnoho let.
                            </p>
                            <p className="font-sans text-slate-700 leading-relaxed mb-8 text-sm">
                                Pomůžeme s přípravou už v Česku — od vybavení a fyzické přípravy až po doporučení k aklimatizaci a fungování ve vysoké nadmořské výšce. A protože Nepál dobře známe i mimo hlavní turistické trasy, rádi vás vezmeme i na místa, kam se běžné cestovky často nedostanou.
                            </p>

                            {/* Zázemí */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-4 h-px bg-gold-400 shrink-0" />
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600">Zázemí v Káthmándú</h3>
                            </div>
                            <p className="font-sans text-slate-700 leading-relaxed mb-8 text-sm">
                                Naše cesty začínají i končí v centru Thamelu — v Czech Pub Nepal a Hotel Kathmandu Base Camp. Místo, kde si po treku člověk dá dobré jídlo, pivo, horkou sprchu a chvíli klidu před další cestou.
                            </p>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://14summitsexpedition.cz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all duration-300 group"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    14summitsexpedition.cz
                                </a>
                                <button
                                    onClick={() => setIs14Open(false)}
                                    className="flex-1 flex items-center justify-center py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold uppercase text-xs tracking-widest rounded-xl transition-all"
                                >
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── SUBIN BIOGRAPHICAL MODAL ── */}
        <AnimatePresence>
            {isSubinOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setIsSubinOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                    >
                        {/* Top bar: back + close */}
                        {subinSource === 'story' && (
                            <button
                                onClick={() => { setIsSubinOpen(false); window.dispatchEvent(new CustomEvent('openStoryFromTeam')); }}
                                className="absolute top-5 left-6 z-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Zpět na příběh
                            </button>
                        )}
                        <button
                            onClick={() => setIsSubinOpen(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Content */}
                        <div
                            className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col text-left overscroll-contain pt-16 md:pt-12"
                            data-lenis-prevent
                        >
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                {subin.tagline}
                            </h4>
                            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                                {subin.name.split(' ')[0]} <span className="italic text-slate-600">{subin.name.split(' ').slice(1).join(' ')}.</span>
                            </h2>

                            <div className="space-y-4">
                                <p className="font-sans text-slate-800 leading-relaxed font-medium">{subin.bio1}</p>
                                <p className="font-sans text-slate-700 leading-relaxed">{subin.bio2}</p>
                                <p className="font-sans text-slate-700 leading-relaxed">{subin.bio3}</p>
                                {subin.bio4 && <p className="font-sans text-slate-600 leading-relaxed">{subin.bio4}</p>}
                            </div>

                            {subin.quote && (
                                <blockquote className="mt-8 border-l-2 border-gold-400 pl-4 font-serif italic text-slate-700 text-base leading-relaxed">
                                    {subin.quote}
                                </blockquote>
                            )}

                            {subin.tags && (
                                <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
                                    {subin.tags.map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-100 rounded-full text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Gallery Grid */}
                        <div
                            className="w-full md:w-1/2 bg-slate-900 grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-3 p-1.5 md:p-3 overflow-y-auto overscroll-contain"
                            data-lenis-prevent
                        >
                            <div className="relative rounded-2xl overflow-hidden group col-span-2 row-span-1">
                                <img src={SubinLead} alt="Subin v Himálaji" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img src={SubinGallery1} alt="Subin na trase" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img src={SubinGallery2} alt="Subin s týmem" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── MIRI BIOGRAPHICAL MODAL ── */}
        <AnimatePresence>
            {isMiriOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setIsMiriOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                    >
                        {/* Top bar: back + close */}
                        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-5 pb-4 bg-gradient-to-b from-ivory/95 to-transparent pointer-events-none md:hidden" />
                        {miriSource === 'story' && (
                            <button
                                onClick={() => { setIsMiriOpen(false); window.dispatchEvent(new CustomEvent('openStoryFromTeam')); }}
                                className="absolute top-5 left-6 z-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Zpět na příběh
                            </button>
                        )}
                        <button
                            onClick={() => setIsMiriOpen(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Content */}
                        <div
                            className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col text-left overscroll-contain pt-16 md:pt-12"
                            data-lenis-prevent
                        >
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                {miri.tagline}
                            </h4>
                            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                                {miri.name.split(' ')[0]} <span className="italic text-slate-600">{miri.name.split(' ').slice(1).join(' ')}.</span>
                            </h2>

                            <div className="space-y-4">
                                <p className="font-sans text-slate-800 leading-relaxed font-medium">{miri.bio1}</p>
                                <p className="font-sans text-slate-700 leading-relaxed">{miri.bio2}</p>
                                <p className="font-sans text-slate-700 leading-relaxed">{miri.bio3}</p>
                                {miri.bio4 && <p className="font-sans text-slate-500 leading-relaxed italic">{miri.bio4}</p>}
                            </div>

                            {miri.tags && (
                                <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
                                    {miri.tags.map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-100 rounded-full text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Gallery Grid */}
                        <div
                            className="w-full md:w-1/2 bg-slate-900 grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-3 p-1.5 md:p-3 overflow-y-auto overscroll-contain"
                            data-lenis-prevent
                        >
                            <div className="relative rounded-2xl overflow-hidden group col-span-2 row-span-1">
                                <img src={MiriLead} alt="Miri in Mountains" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img src={MiriGallery1} alt="Miri Portrait" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img src={MiriGallery2} alt="Miri Trekking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        {/* ── CATEGORY DETAIL MODAL ── */}
        <AnimatePresence>
            {selectedCategory && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setSelectedCategory(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                    >
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <div className="w-full md:w-5/12 h-56 md:h-auto relative shrink-0">
                            <img src={selectedCategory.image} alt={selectedCategory.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ivory/90 via-transparent to-transparent" />
                            <div className="absolute top-5 left-5">
                                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg ${selectedCategory.badgeClass}`}>
                                    {selectedCategory.difficulty}
                                </span>
                            </div>
                        </div>

                        <div
                            className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center overscroll-contain"
                            data-lenis-prevent
                        >
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3">Typ výpravy</h4>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-3 leading-tight">{selectedCategory.label}</h2>
                            <p className="font-serif italic text-slate-500 text-lg mb-6 leading-snug">{selectedCategory.tagline}</p>
                            <p className="font-sans text-slate-700 leading-relaxed text-base mb-8">{selectedCategory.desc}</p>

                            <div className="mb-8 p-6 bg-slate-100/50 rounded-2xl border border-slate-200">
                                <h4 className="font-serif text-xl text-slate-900 mb-4">Co zahrnuje:</h4>
                                <ul className="space-y-3">
                                    {selectedCategory.highlights.map((h, i) => (
                                        <li key={i} className="flex gap-3 text-slate-700 font-sans items-start">
                                            <span className="text-gold-500 mt-0.5 shrink-0"><ArrowRight className="w-4 h-4" /></span>
                                            <span className="leading-snug">{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href="https://14summitsexpedition.cz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 px-6 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 group"
                            >
                                Mám zájem
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── REGIONS MODAL ── */}
        <AnimatePresence>
            {isRegionsOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => { setIsRegionsOpen(false); setSelectedRegion(null); }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0f1923] w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col relative"
                    >
                        <AnimatePresence mode="wait">
                            {selectedRegion ? (
                                /* ── Region detail ── */
                                <motion.div
                                    key="region-detail"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex flex-col md:flex-row h-full max-h-[90vh]"
                                >
                                    <div className="w-full md:w-5/12 h-56 md:h-auto relative shrink-0">
                                        <img src={selectedRegion.image} alt={selectedRegion.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f1923] via-[#0f1923]/30 to-transparent" />
                                        <div className="absolute bottom-5 left-5 flex flex-col gap-1.5">
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20 w-fit backdrop-blur-sm">{selectedRegion.difficulty}</span>
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 w-fit backdrop-blur-sm">{selectedRegion.bestSeason}</span>
                                        </div>
                                    </div>

                                    <div
                                        className="flex-1 flex flex-col min-h-0"
                                    >
                                        <div className="shrink-0 flex items-center justify-between px-6 pt-6 pb-2">
                                            <button
                                                onClick={() => setSelectedRegion(null)}
                                                className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                                            >
                                                <ArrowLeft className="w-4 h-4" /> Zpět na oblasti
                                            </button>
                                            <button
                                                onClick={() => { setIsRegionsOpen(false); setSelectedRegion(null); }}
                                                className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 px-6 pb-8 md:px-10 md:pb-10" data-lenis-prevent>
                                            <p className="text-gold-400 font-sans uppercase tracking-[0.25em] text-[10px] font-bold mb-2 mt-2">{selectedRegion.subtitle}</p>
                                            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">{selectedRegion.name}</h2>
                                            <p className="font-sans text-slate-400 text-sm mb-1">Nadm. výška: <span className="text-white font-semibold">{selectedRegion.altitude}</span></p>
                                            <p className="font-sans text-slate-300 leading-relaxed text-sm md:text-base mt-4 mb-6">{selectedRegion.desc}</p>

                                            <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/[0.08] mb-6">
                                                <h4 className="font-serif text-lg text-white mb-4">Co tato oblast nabízí:</h4>
                                                <ul className="space-y-2.5">
                                                    {selectedRegion.highlights.map((h, i) => (
                                                        <li key={i} className="flex gap-3 text-slate-300 font-sans text-sm items-start">
                                                            <ArrowRight className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                                                            {h}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <a
                                                href="https://14summitsexpedition.cz"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 px-6 bg-gradient-to-br from-gold-500 to-gold-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                                            >
                                                Mám zájem o {selectedRegion.name}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                /* ── Regions grid ── */
                                <motion.div
                                    key="regions-grid"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="shrink-0 flex justify-between items-end px-6 md:px-8 pt-7 pb-5 border-b border-white/[0.07]">
                                        <div>
                                            <p className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Kde se s námi vydáte</p>
                                            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">Oblasti & destinace</h2>
                                        </div>
                                        <button
                                            onClick={() => setIsRegionsOpen(false)}
                                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                                        >
                                            <X className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                    </div>

                                    <div
                                        className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8"
                                        data-lenis-prevent
                                    >
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            {REGIONS.map((region) => (
                                                <button
                                                    key={region.id}
                                                    onClick={() => setSelectedRegion(region)}
                                                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold-500/40 transition-all duration-300 text-left"
                                                >
                                                    <img
                                                        src={region.image}
                                                        alt={region.name}
                                                        className="w-full h-full object-cover brightness-60 group-hover:brightness-75 group-hover:scale-105 transition-all duration-600"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                                                    <div className="absolute inset-x-0 bottom-0 p-4">
                                                        <p className="text-gold-400 font-sans uppercase tracking-wider text-[9px] font-bold mb-0.5">{region.subtitle}</p>
                                                        <h3 className="font-serif text-white text-base md:text-lg leading-tight group-hover:text-gold-300 transition-colors">{region.name}</h3>
                                                        <p className="font-sans text-slate-400 text-[10px] mt-1 flex items-center gap-1">
                                                            <MapPin className="w-2.5 h-2.5 shrink-0" />{region.altitude}
                                                        </p>
                                                    </div>
                                                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/[0.08] group-hover:bg-gold-500/20 border border-white/10 group-hover:border-gold-500/30 flex items-center justify-center transition-all">
                                                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-gold-400 transition-colors" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── VIDEO LIGHTBOX MODAL ── */}
        <AnimatePresence>
            {isVideoOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 pointer-events-auto bg-black/97 backdrop-blur-xl"
                    onClick={() => setIsVideoOpen(false)}
                >
                    <button
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-5 right-5 md:top-8 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 z-10"
                        aria-label="Zavřít video"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)] border border-gold-500/20"
                    >
                        <iframe
                            src={`${VIDEO_EMBED_URL}?autoplay=1&rel=0&modestbranding=1`}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title="Honzův příběh"
                        />
                    </motion.div>

                    <p className="absolute bottom-6 left-0 w-full text-center text-slate-600 font-mono text-[10px] tracking-widest uppercase select-none">
                        Klikni mimo video nebo stiskni Esc pro zavření
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Expeditions;
