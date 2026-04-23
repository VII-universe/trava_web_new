import React, { useState, useEffect, useRef } from 'react';
import { loadContent } from '../data/adminStore';
import { resolveImageSrc } from '../data/imageStore';
import { motion, useTransform, useScroll, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { ArrowLeft, ArrowRight, X, MapPin, Play, ChevronLeft, ChevronRight } from 'lucide-react';
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
    miri: { name: 'Miri Jirková', role: 'Trek & Logistika', tagline: 'Logistika & Trekking Manager', bio1: 'Mozek i srdce našich výprav. Miri není jen Honzovou partnerkou, ale především zkušenou horolezkyní a nepostradatelnou manažerkou, která stojí za každým detailem našich cest do Himálaje i And.', bio2: 'Vystoupala na desítky šestitisícovek po celém světě. V našem týmu má na starosti kompletní logistiku – od vyjednávání s místními šerpy v Káthmándú až po zajištění bezpečného zázemí v základních táborech.', bio3: 'Díky své empatii a organizačnímu talentu dokáže vytvořit pocit domova i v těch nejdrsnějších podmínkách. S Miri nejste na expedici jen s "vůdcem", ale s rodinou, která se o vás postará od prvního e-mailu až po závěrečnou oslavu v Thamelu.', stat1val: '12+', stat1label: 'Expedic', stat2val: '6476m', stat2label: 'Max Altitude', stat3val: '100%', stat3label: 'Dedikace' },
    subin: { name: 'Subin Tamang', role: 'Terénní expert — Nepál', tagline: 'Terénní expert & Sherpa', bio1: 'Subin je náš nepostradatelný man on the ground. Nepálský terénní expert, který zná Himálaj jako svůj dvorek — od tras v Khumbu po přístupy na osmitisícovky, které nejsou v žádném průvodci.', bio2: 'Stará se o terénní logistiku přímo v Nepálu: koordinuje místní šerpy, zajišťuje vybavení a zásobování, naviguje skupiny v podmínkách, kdy GPS nestačí. S Subinem nikdy nejdete do neznáma — on tam byl dávno před vámi.', bio3: 'Jeho znalost místní kultury, jazyků a kontaktů v horských vesnicích dělá z každé naší expedice zážitek, který jiné cestovní kanceláře prostě nemohou nabídnout.', stat1val: '15+', stat1label: 'Let v terénu', stat2val: 'Nepal', stat2label: 'Rodná zem', stat3val: '8000m', stat3label: 'Zkušenosti' },
};

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
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isRegionsOpen, setIsRegionsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const VIDEO_EMBED_URL = 'https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID';

    // Prevent body scroll when modal is open
    useScrollLock(selectedExped || showAllExpeditions || selectedMoreExped || isMiriOpen || isSubinOpen || isVideoOpen || selectedCategory || isRegionsOpen);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setIsVideoOpen(false); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Allow external components (About story modal) to open team modals
    useEffect(() => {
        const onMiri = () => setIsMiriOpen(true);
        const onSubin = () => setIsSubinOpen(true);
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
                            {/* S kým do hor card */}
                            <div className="shrink-0 snap-start w-[82vw] rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-slate-700/50 p-5 flex flex-col gap-3">
                                <div>
                                    <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-2">S kým do hor</h3>
                                    <h2 className="font-serif text-xl text-white leading-tight mb-2">Osmitisícovky i treky bez přetvářky</h2>
                                    <p className="font-sans text-slate-300 text-xs leading-relaxed">Honza Tráva má za sebou 6 osmitisícovek. Nejsme sterilní cestovka — zakládáme si na osobním přístupu a vlastním týmu šerpů.</p>
                                </div>
                                <div className="flex flex-col gap-2 mt-auto">
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

                            {/* Video card */}
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="shrink-0 snap-start w-[72vw] rounded-2xl overflow-hidden border border-white/10 cursor-pointer active:scale-[0.98] transition-transform relative"
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
                                        <p className="text-gold-400 font-sans uppercase tracking-[0.25em] text-[9px] font-bold mb-1">Sleduj film</p>
                                        <p className="font-serif text-white text-sm leading-snug">Honzův příběh na 8000 m</p>
                                    </div>
                                </div>
                            </button>

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
                <div className="w-full flex flex-col items-center justify-center origin-center transition-transform duration-300 [@media(min-width:768px)]:-translate-y-16 [@media(max-height:1000px)_and_(min-width:768px)]:scale-[0.85] [@media(max-height:850px)_and_(min-width:768px)]:scale-[0.75] [@media(max-height:750px)_and_(min-width:768px)]:scale-[0.65] [@media(max-height:650px)_and_(min-width:768px)]:scale-[0.55]">
                    <div className="text-center mb-0.5 md:mb-4 xl:mb-6 relative z-10 pt-0 md:pt-0 flex flex-col items-center">
                    <img src={Logo14Summits} alt="14 Summits Logo" className="w-36 md:w-64 xl:w-80 mb-1 xl:mb-2 drop-shadow-lg opacity-90" />
                    <h4 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-2 md:mb-3 mt-0.5 md:mt-4">
                        04 — Expedice (4500 m)
                    </h4>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-1 md:mb-2 drop-shadow-md">
                        Vydej se se mnou na cesty
                    </h2>
                    <p className="text-slate-300 font-serif italic text-base md:text-lg tracking-widest drop-shadow">Dobří parťáci na cestě jsou to nejcennější.</p>
                </div>

                {/* Cinematic video strip */}
                <div className="relative z-10 max-w-7xl w-full px-4 md:px-8 lg:pl-10 lg:pr-32 xl:px-6 mb-4 md:mb-5">
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="group relative w-full h-24 md:h-28 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold-500/50 transition-all duration-500 pointer-events-auto"
                    >
                        <img src={SummitImage} className="absolute inset-0 w-full h-full object-cover brightness-40 group-hover:brightness-50 group-hover:scale-105 transition-all duration-700 object-[50%_30%]" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/85" />
                        <div className="relative flex items-center justify-center gap-5 h-full">
                            <div className="relative shrink-0">
                                <span className="absolute inset-0 rounded-full bg-gold-500/25 animate-ping" />
                                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold-500/15 border-2 border-gold-400/80 flex items-center justify-center group-hover:bg-gold-500/35 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                    <Play className="w-4 h-4 md:w-5 md:h-5 text-gold-300 fill-gold-300 ml-0.5" />
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-gold-400 font-sans uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-bold mb-1">Sleduj film</p>
                                <h3 className="font-serif text-white text-lg md:text-xl lg:text-2xl leading-tight drop-shadow-md">Honzův příběh — od Prahy na Manáslu</h3>
                            </div>
                        </div>
                    </button>
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
                            <h3 className="text-gold-500 font-sans uppercase tracking-[0.2em] text-sm md:text-[11px] font-bold mb-3 md:mb-4 drop-shadow-md">S kým do hor</h3>
                            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                                Osmitisícovky i treky bez přetvářky
                            </h2>
                            <p className="font-sans text-slate-100 font-medium leading-relaxed text-sm md:text-base lg:text-lg mb-3 drop-shadow-sm">
                                Honza Tráva má za sebou 6 osmitisícovek. {miri.name} vystoupala na nespočet šestitisícovek...
                            </p>
                            <p className="font-sans text-slate-200 leading-relaxed text-sm md:text-base drop-shadow-sm">
                                Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa. Spojujeme syrové himálajské dobrodružství s českým zázemím. Zakládáme si na osobním přístupu, poctivé aklimatizaci a vlastním týmu šerpů.
                            </p>
                            
                            <div className="mt-8 md:mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center sm:items-stretch">
                                <button
                                    onClick={() => setIsMiriOpen(true)}
                                    className="group relative w-full flex-1 inline-flex items-center justify-center gap-2 py-3 md:py-4 px-5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-[0.15em] text-sm rounded-xl transition-all duration-300 backdrop-blur-md border border-white/20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 drop-shadow-md whitespace-nowrap">O {miri.name.split(' ')[0]}</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                                <button
                                    onClick={() => setIsSubinOpen(true)}
                                    className="group relative w-full flex-1 inline-flex items-center justify-center gap-2 py-3 md:py-4 px-5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-[0.15em] text-sm rounded-xl transition-all duration-300 backdrop-blur-md border border-white/20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 drop-shadow-md whitespace-nowrap">O {subin.name.split(' ')[0]}</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                                <a
                                    href="https://14summitsexpedition.cz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full flex-[1.4] inline-flex items-center justify-center gap-2 py-3 md:py-4 px-5 bg-gradient-to-br from-gold-500 to-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] border border-gold-400/50 overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 drop-shadow-md whitespace-nowrap">Chci do Nepálu</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </a>
                            </div>
                        </motion.div>

                        <div className="pointer-events-auto relative z-10 flex flex-col gap-3">
                            {/* Header + arrow buttons */}
                            <div className="bg-slate-950/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/[0.08]">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-gold-500 font-sans uppercase tracking-[0.3em] text-[11px] font-bold">Co pro vás máme</h3>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={catScrollPrev}
                                            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-gold-500 border border-white/20 hover:border-gold-400 text-white flex items-center justify-center transition-all duration-200"
                                            aria-label="Předchozí"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={catScrollNext}
                                            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-gold-500 border border-white/20 hover:border-gold-400 text-white flex items-center justify-center transition-all duration-200"
                                            aria-label="Další"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="font-sans text-slate-300 text-xs leading-relaxed">
                                    Od jeepového výletu až po osmitisícovku — Nepál je dostupný každému.
                                </p>
                            </div>

                            {/* Draggable category cards */}
                            <div ref={categoryDragRef} className="overflow-hidden rounded-xl h-[260px] lg:h-[290px] cursor-grab active:cursor-grabbing">
                                <motion.div
                                    drag="x"
                                    dragConstraints={{ left: catDragLeft, right: 0 }}
                                    dragElastic={0.05}
                                    dragMomentum={true}
                                    dragTransition={{ power: 0.25, timeConstant: 200 }}
                                    style={{ x: catX }}
                                    onPointerDown={() => { catDidDrag.current = false; }}
                                    onDrag={() => { catDidDrag.current = true; }}
                                    className="flex gap-2.5 h-full select-none"
                                >
                                    {CATEGORIES_DISPLAY.map((cat, i) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => { if (!catDidDrag.current) setSelectedCategory(cat); }}
                                            className="group relative shrink-0 w-44 lg:w-48 h-full rounded-2xl overflow-hidden border border-white/[0.1] hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-200 shadow-[0_16px_40px_rgba(0,0,0,0.55)] text-left"
                                        >
                                            {/* Full-bleed image */}
                                            <img
                                                src={cat.image}
                                                alt={cat.label}
                                                draggable={false}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                                            />
                                            {/* Rich gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-black/25" />
                                            {/* Subtle gold shimmer on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gold-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                            {/* Top row: index + badge */}
                                            <div className="absolute top-3 inset-x-3 flex items-start justify-between pointer-events-none">
                                                <span className="font-mono text-[9px] text-gold-500/50 font-bold tracking-[0.2em] leading-none">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-md leading-tight ${cat.badgeClass}`}>
                                                    {cat.difficulty}
                                                </span>
                                            </div>

                                            {/* Bottom content */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                                                <h4 className="font-serif text-white text-base lg:text-lg leading-tight mb-1.5 drop-shadow-md group-hover:text-gold-200 transition-colors duration-300">{cat.label}</h4>
                                                <p className="font-sans text-slate-400 text-[10px] leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.tagline}</p>
                                                <div className="flex items-center gap-1 text-gold-400 text-[9px] font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Více <ArrowRight className="w-2.5 h-2.5" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2.5 mt-1">
                                <button
                                    onClick={() => setIsRegionsOpen(true)}
                                    className="flex-1 py-3 px-4 bg-white/[0.08] border border-white/[0.12] text-white text-[10px] font-bold uppercase tracking-[0.12em] rounded-xl hover:bg-white/[0.15] hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
                                >
                                    <MapPin className="w-3.5 h-3.5 shrink-0" /> Oblasti
                                </button>
                                <button
                                    onClick={() => setShowAllExpeditions(true)}
                                    className="flex-1 py-3 px-4 bg-gold-500 text-white text-[10px] font-bold uppercase tracking-[0.12em] rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(212,175,55,0.25)]"
                                >
                                    Výpravy <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                </button>
                            </div>
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
                        <button
                            onClick={() => setIsSubinOpen(false)}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Content */}
                        <div
                            className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col text-left overscroll-contain"
                            data-lenis-prevent
                        >
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                {subin.tagline}
                            </h4>
                            <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-8 leading-tight">
                                {subin.name.split(' ')[0]} <span className="italic text-slate-600">{subin.name.split(' ').slice(1).join(' ')}.</span>
                            </h2>

                            <div className="prose prose-slate prose-lg">
                                <p className="font-sans text-slate-800 leading-relaxed font-medium mb-4">{subin.bio1}</p>
                                <p className="font-sans text-slate-700 leading-relaxed mb-4">{subin.bio2}</p>
                                <p className="font-sans text-slate-700 leading-relaxed">{subin.bio3}</p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-300 flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-600 font-bold">{subin.stat1val}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{subin.stat1label}</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-600 font-bold">{subin.stat2val}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{subin.stat2label}</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-600 font-bold">{subin.stat3val}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{subin.stat3label}</div>
                                </div>
                            </div>
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
                        <button 
                            onClick={() => setIsMiriOpen(false)}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-slate-800"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Content */}
                        <div
                            className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col text-left overscroll-contain"
                            data-lenis-prevent
                        >
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                {miri.tagline}
                            </h4>
                            <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-8 leading-tight">
                                {miri.name.split(' ')[0]} <span className="italic text-slate-600">{miri.name.split(' ').slice(1).join(' ')}.</span>
                            </h2>

                            <div className="prose prose-slate prose-lg">
                                <p className="font-sans text-slate-800 leading-relaxed font-medium mb-4">{miri.bio1}</p>
                                <p className="font-sans text-slate-700 leading-relaxed mb-4">{miri.bio2}</p>
                                <p className="font-sans text-slate-700 leading-relaxed">{miri.bio3}</p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-300 flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-600 font-bold">{miri.stat1val}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{miri.stat1label}</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-600 font-bold">{miri.stat2val}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{miri.stat2label}</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="text-center">
                                    <div className="text-2xl font-serif text-gold-600 font-bold">{miri.stat3val}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{miri.stat3label}</div>
                                </div>
                            </div>
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
