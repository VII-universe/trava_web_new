import { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useScrollLock } from '../hooks/useScrollLock';
import { loadContent } from '../data/adminStore';
import { ArrowRight, X, Star, ExternalLink, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import BaseCampImg from '../assets/base_camp_bg.jpg';
import HonzaProfile from '../assets/honza_profile.png';
import ClimbersImg from '../assets/climbers_bg.jpg';
import StoryImg1 from '../assets/zmensene/portrety/historie/trava30.jpg';
import StoryImg2 from '../assets/zmensene/portrety/historie/037.jpg';
import StoryImg3 from '../assets/zmensene/portrety/expedice_a_treky/20240723_091830.jpg';
import ManasluSummitImg from '../assets/zmensene/portrety/expedice_a_treky/20240728_133329.jpg';
import SummitSelfieImg from '../assets/zmensene/portrety/expedice_a_treky/20240801_142543.jpg';
import TrailWalkImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6158.jpg';
import AconcaImg from '../assets/zmensene/portrety/expedice_a_treky/dsc05780.jpg';
import MeraImg from '../assets/zmensene/portrety/expedice_a_treky/dsc06947.jpg';
import PortraitImg from '../assets/zmensene/portrety/expedice_a_treky/_mg_1567-3.jpg';
import MiriLeadImg from '../assets/zmensene/portrety/miri/dsc05711.jpg';
import SubinLeadImg from '../assets/zmensene/portrety/s_miri__subinem_onghchu_nebo_sabinem/dsc06903.jpg';
import KtmPubImg from '../assets/zmensene/portrety/ktm/czech-pub-highlander-001-hires.jpg';
import KtmPub2Img from '../assets/zmensene/portrety/ktm/czech-pub-highlander-002-hires.jpg';
import LectureImg from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';

const GALLERY_PHOTOS = [
    { src: ManasluSummitImg, label: 'Manáslu 8163 m',       pos: 'object-top' },
    { src: SummitSelfieImg,  label: 'Na vrcholu',            pos: 'object-top' },
    { src: StoryImg3,        label: 'Himálaj',               pos: 'object-center' },
    { src: TrailWalkImg,     label: 'Na trase',              pos: 'object-center' },
    { src: AconcaImg,        label: 'Aconcagua 6961 m',      pos: 'object-center' },
    { src: MeraImg,          label: 'Mera Peak 6476 m',      pos: 'object-center' },
    { src: PortraitImg,      label: 'Portrét',               pos: 'object-center' },
    { src: StoryImg1,        label: 'Honza na žebříku',      pos: 'object-left' },
    { src: StoryImg2,        label: 'Honza jako dítě',       pos: 'object-center' },
    { src: KtmPubImg,        label: 'Czech Pub Highlander',  pos: 'object-center' },
    { src: KtmPub2Img,       label: 'Káthmándú',             pos: 'object-center' },
    { src: LectureImg,       label: 'Přednáška',             pos: 'object-center' },
    { src: MiriLeadImg,      label: 'Miri Jirková',          pos: 'object-center' },
    { src: SubinLeadImg,     label: 'Subin Thakuri',         pos: 'object-center' },
];

const DEF_ABOUT = { tagline: 'Honza Tráva — profesionální dobrodruh', title: 'Horolezec. Cestovatel. Podnikatel.', description: 'Výstupy na osmitisícovky, expedice do Himálaje, vlastní hotel a pub v Káthmándú, přednáškové turné po celé republice. Honza Tráva žije naplno — a zve vás s sebou.' };
const DEF_STORY_LOCAL = {
    zacatky: {
        sectionLabel: 'Začátky',
        title: 'Jak to všechno začalo.',
        p1: 'Jsem Plzeňák srdcem v Himálaji. Horolezec, průvodce, kopcolezec a člověk, který se do hor nevrací kvůli vrcholům samotným, ale kvůli cestě jako takové.',
        p2: 'Mám za sebou šest úspěšných výstupů na osmitisícové vrcholy — z toho dvakrát Manáslu — a také výstupy na hory jako Ama Dablam. Hory ale nikdy nebyly závod. Důležitější než vrchol je pro mě cesta, návrat a lidé, se kterými ji sdílím.',
        p3: 'Společně s Miri Jirkovou vedeme treky a expedice pod hlavičkou české pobočky 14 Summits Expedition. V Nepálu spoluvytváříme také zázemí pro české cestovatele — Hotel Kathmandu Base Camp a Czech Pub v Káthmándú. Místo, kde se po cestě potkávají příběhy, únava, radost i obyčejná chuť dát si něco dobrého po návratu z hor.',
        p4: 'Do mého života patří i těžší kapitoly — rakovina a psoriatická artritida. Ne jako příběh o hrdinství, ale jako zkušenost, která člověku rychle ukáže, co je podstatné. Zdraví, vztahy, pokora a schopnost jít dál, když to dává smysl.',
        p5: 'Hory se podle mě nepokořují. Někdy člověka pustí výš. A někdy mu připomenou, že i otočit se je součást cesty.',
        images: [],
    },
    hory: {
        sectionLabel: '14 Summits Expedition',
        title: '14 Summits Expedition.',
        stat1val: '6+', stat1label: 'osmitisícovek',
        stat2val: '8163 m', stat2label: 'Manáslu — nejvyšší',
        stat3val: '14+', stat3label: 'himalájských expedic',
        text:  '14 Summits Expedition nevzniklo jako katalog zájezdů. Vyrostlo z dlouholetého vztahu k Nepálu, z přátelství s místními lidmi a z let strávených na trecích i expedicích pod himálajskými vrcholy.',
        text2: 'Společně se Subinem Thakurim, Miri Jirkovou a naším nepálským týmem propojujeme české cestovatele s autentickým Nepálem — ne jen tím z pohlednic, ale i tím skutečným. S horskými stezkami, čajovnami, ranním chaosem Káthmándú i tichými večery vysoko nad údolím.',
        text3: 'Nejsme sterilní cestovka z letáku. Známe kopce, lidi i místa, kde dělají nejlepší dal bhat široko daleko. A hlavně víme, že dobrá expedice nezačíná na letišti a nekončí vrcholem.',
        text4: 'Zakládáme si na osobním přístupu, bezpečnosti, poctivé aklimatizaci a malých skupinách. Ať už jde o pohodový trek pod Everestem, cestu do Horního Mustangu nebo výstup na šestitisícový vrchol, cílem není něco „dobýt", ale prožít cestu naplno a vrátit se s dobrým pocitem zpátky domů.',
        text5: 'Součástí 14 Summits Expedition je i vlastní zázemí v Káthmándú — Hotel Kathmandu Base Camp a Czech Pub Nepal. Protože někdy je stejně důležitý jako cesta samotná i prostor, kam se člověk vrací.',
        videoUrl: '',
        images: [],
    },
    nepal: {
        sectionLabel: 'Nepál',
        title: 'Czech Pub Nepal & Hotel Kathmandu Base Camp.',
        pubTitle: 'Czech Pub Nepal',
        pubText:  'Czech Pub Nepal není jen česká hospoda v Káthmándú. Je to místo návratů, setkávání a dlouhých večerů po cestách horami.',
        pubText2: 'Společně ho provozujeme se Subinem Thakurim a Miri Jirkovou. U čepovaného piva, smažáku nebo nepálského jídla se tu přirozeně potkávají cestovatelé, horolezci, expati i místní kamarádi.',
        pubText3: 'Pro někoho první zastávka po příletu. Pro jiného poslední večer před odchodem do hor. A pro spoustu lidí už tak trochu druhý domov.',
        hotelTitle: 'Hotel Kathmandu Base Camp',
        hotelText:  'Uprostřed ruchu Káthmándú existuje místo, kde člověk po návratu z hor konečně zpomalí. Horká sprcha, klidný pokoj, kafe na terase plné květin a pocit, že se není kam hnát.',
        hotelText2: 'Hotel Kathmandu Base Camp vznikl přirozeně — z letitého vztahu k místu, kam se sami pořád vracíme. Není to anonymní hotel pro turisty. Spíš základna, zázemí a místo setkávání lidí, kteří mají rádi hory, Nepál a cesty s přesahem.',
        hotelText3: 'Najdete ho jen pár minut od centra Thamelu. Přesto si tu člověk často připadá o kus dál od chaosu města. Ráno kontinentální snídaně, večer sdílení příběhů z treků a expedic na střešní terase nebo o pár kroků vedle v Czech Pubu.',
        hotelText4: 'Ať už vyrážíte do hor, nebo se z nich vracíte unavení a zaprášení, Kathmandu Base Camp je místo, kde můžete na chvíli vydechnout.',
        hotelTagline: 'Pro někoho hotel. Pro někoho základní tábor. A pro spoustu lidí postupně druhý domov.',
        text: '',
        images: [],
    },
    zdravi: {
        sectionLabel: 'Zdraví & Osvěta',
        title: 'I zdraví patří k cestě.',
        text:  'Rakovina a psoriatická artritida se staly součástí mého života. Ne jako příběh o hrdinství, ale jako zkušenost, která člověku změní pohled na čas, zdraví i priority.',
        text2: 'O svých zkušenostech mluvím otevřeně a dlouhodobě podporuji projekty jako Revma Liga nebo Fuck Cancer. Ne proto, abych rozdával motivační poučky, ale abych ukázal, že i s podobnou diagnózou může člověk dál hledat radost, smysl a vlastní cestu.',
        quote: '„Zdraví je vždycky víc než vrchol."',
        imageUrl: '',
    },
    prednasky: {
        sectionLabel: 'Přednášky',
        title: 'Příběhy z hor, cest i života mezi nimi.',
        text:  'Za poslední roky jsem projel stovky škol, festivalů, firem i kulturáků po celé republice. Ne proto, abych lidem vyprávěl o „dobývání vrcholů", ale protože mě baví sdílet příběhy z míst a cest, které člověka nějak promění.',
        text2: 'Přednášky nejsou jen o Himalájích a expedicích. Jsou o lidech, návratech, Nepálu, humoru, krizových chvílích i obyčejných situacích, které se v horách zapisují člověku pod kůži mnohem víc než samotné vrcholy.',
        text3: 'Někdy je to beseda o horách. A někdy prostě jen večer plný příběhů, fotek a zážitků z cest.',
        imageUrl: '',
    },
    tym: {
        sectionLabel: 'Tým',
        title: 'Se kterými to tvoříme.',
        miriTitle: 'Miri Jirková',
        miriText:  'Miri je zkušená horolezkyně, průvodkyně a člověk, bez kterého by většina našich cest do Nepálu nevypadala tak, jak vypadá.',
        miriText2: 'Má za sebou řadu vysokohorských expedic, výstupy na šestitisícové i sedmitisícové vrcholy a tisíce kilometrů po nepálských trecích. Společně s Trávou tráví v Nepálu dlouhé měsíce, díky čemuž zná nejen horské stezky, ale i místní kulturu, lidi a každodenní život mimo turistické trasy.',
        miriText3: 'Ve výpravách se stará o logistiku, bezpečí i fungování celé skupiny — často právě o věci, které nejsou na první pohled vidět, ale rozhodují o tom, jak se lidé na cestě opravdu cítí.',
        miriText4: 'Nepál pro ni dávno není jen destinace. Je to druhý domov, ke kterému má hluboký vztah a který pomáhá ostatním poznávat autenticky, s respektem a bez zbytečného pozlátka.',
        subinTitle: 'Subin Thakuri',
        subinRole:  'Zakladatel 14 Summits Expedition a partner na cestě.',
        subinText:  'Subin pochází z odlehlého regionu Sindhupalchok a do hor začal chodit už jako patnáctiletý nosič. Díky poctivé práci, zkušenostem a dlouholetému pohybu v Himálaji postupně vybudoval jednu z respektovaných nepálských expedičních agentur.',
        subinText2: 'Dnes stojí za projektem 14 Summits Expedition a více než dvacet let vede treky a expedice v Nepálu, Tibetu i Bhútánu. Má za sebou stovky výprav — od klasických treků až po expedice na himálajské vrcholy včetně Everestu, Ama Dablam nebo Manáslu.',
        subinText3: 'Pro Honzu a Miri ale není jen partnerem v horách. Je to dlouholetý přítel a člověk, který pomohl propojit český a nepálský svět do jedné společné cesty.',
        subinText4: 'Subin dlouhodobě podporuje i rozvoj odlehlých horských oblastí — podílí se na projektech spojených se školami, zdravotní péčí nebo přístupem k pitné vodě.',
        subinQuote: '„Hora rozhoduje, jestli vás pustí nahoru. Důležité je umět jí naslouchat a vědět, kdy pokračovat a kdy se otočit."',
    },
    kdedal: {
        sectionLabel: 'Kde mě najdeš',
        title: 'Prozkoumej celý web.',
        quote: '„Život není jen o samotných vrcholech, ale i o nádherné cestě k nim."',
    },
};
const DEF_OSVETA_LOCAL = {
    heading: 'Pomáháme a sdílíme',
    title: 'Zdravotní osvěta',
    intro:  'Hory jsou důležitou součástí mého života. Ale zdraví je vždycky víc.',
    intro2: 'Právě osobní zkušenost s rakovinou a psoriatickou artritidou mě přivedla k dlouhodobé podpoře zdravotní osvěty a pacientských organizací. Ne jako člověka, který má všechny odpovědi, ale jako někoho, kdo si sám prošel obdobími, kdy se člověk ze dne na den stane „kašpárkem s nemocí".',
    intro3: 'O to důležitější je pro mě mluvit o podobných tématech otevřeně, normálně a bez zbytečného strašení.',
    section1Title: 'Revma Liga & psoriatická artritida',
    section1Text:  'S Revma Ligou spolupracuji dlouhodobě především v oblasti osvěty kolem psoriatické artritidy a dalších revmatických onemocnění.',
    section1Text2: 'Cílem není vytvářet příběhy o překonávání nemožného, ale ukázat, že i s podobnou diagnózou může člověk dál hledat radost, pohyb, smysl a vlastní tempo života. Pro někoho to může být cesta do hor. Pro jiného obyčejný den bez bolesti.',
    section1Text3: 'Důležité je nevzdat to sám před sebou.',
    section2Title: 'Fuck Cancer',
    section2Text:  'Projekt Fuck Cancer propojuje mladé onkologické pacienty, survivors i jejich blízké a otevírá témata, o kterých se často mluví těžko.',
    section2Text2: 'Tuhle iniciativu podporuji hlavně proto, že dobře vím, jak moc důležitý je v podobných chvílích lidský kontakt, sdílení zkušeností a pocit, že na to člověk není sám.',
    section2Text3: 'Součástí projektu je také důraz na prevenci, osvětu a normální otevřenou komunikaci bez zbytečného patosu.',
    expertBoxTitle: 'Odborná spolupráce',
    expertBoxText: 'Za velkou částí osvětových aktivit stojí i lidé z oblasti medicíny, kterým dlouhodobě důvěřuji a kteří mi pomáhají nejen po odborné stránce, ale často i lidsky.\n\nVelké díky patří především:\nDoc. MUDr. Monice Arenbergerové, MUDr. Lilianě Šedové,\nMUDr. Antonínovi Brisudovi, PhDr. Heleně Vomáčkové,\nMUDr. Martinu Pospíchalovi\na dalším odborníkům, kteří pomáhají držet celou cestu ve správném směru.',
    quote: '„Ve vysokých horách si člověk často srovná věci, které dole přehluší běžný život."',
    imageUrl: '',
};

function mergeStory(def, admin) {
    if (!admin) return def;
    const result = {};
    Object.keys(def).forEach(k => { result[k] = { ...def[k], ...(admin[k] || {}) }; });
    return result;
}

const About = ({ scrollProgress }) => {
    const adminTexts = loadContent('texts', null);
    const adminStory = loadContent('story', null);
    const adminOsveta = loadContent('osveta', null);
    const about = { ...DEF_ABOUT, ...(adminTexts?.about || {}) };
    const story = mergeStory(DEF_STORY_LOCAL, adminStory);
    const osveta = { ...DEF_OSVETA_LOCAL, ...(adminOsveta || {}) };

    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [isOsvetaOpen, setIsOsvetaOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [lightboxIdx, setLightboxIdx] = useState(null);

    useScrollLock(isStoryOpen || isOsvetaOpen || galleryOpen);

    useEffect(() => {
        if (lightboxIdx === null) return;
        const onKey = (e) => {
            if (e.key === 'ArrowLeft')  setLightboxIdx(i => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
            if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % GALLERY_PHOTOS.length);
            if (e.key === 'Escape')     setLightboxIdx(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxIdx]);

    const lenis = useLenis();

    const navigateToSection = (target) => {
        setIsStoryOpen(false);
        setTimeout(() => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            lenis?.scrollTo(totalHeight * target, { duration: 1.4 });
        }, 50);
    };

    const openTeamModal = (eventName) => {
        setIsStoryOpen(false);
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent(eventName, { detail: { source: 'story' } }));
        }, 50);
    };

    useEffect(() => {
        const onReopenStory = () => setIsStoryOpen(true);
        window.addEventListener('openStoryFromTeam', onReopenStory);
        return () => window.removeEventListener('openStoryFromTeam', onReopenStory);
    }, []);

    // PHASE 2: 0.08 -> 0.18

    const containerOpacity = useTransform(scrollProgress, [0.08, 0.11, 0.17, 0.21], [0, 1, 1, 0]);
    const containerScale = useTransform(scrollProgress, [0.08, 0.11], [0.9, 1]);
    const containerY = useTransform(scrollProgress, [0.08, 0.11, 0.17, 0.21], ["100%", "0%", "0%", "87%"]);
    const bgY = useTransform(scrollProgress, [0.06, 0.22], ["-15%", "15%"]);

    const sideLayerLeftX = useTransform(scrollProgress, [0.10, 0.18], ["0%", "-50%"]);
    const sideLayerRightX = useTransform(scrollProgress, [0.10, 0.18], ["0%", "50%"]);
    const sideLayerOpacity = useTransform(scrollProgress, [0.10, 0.18], [0.8, 0]);

    const honzaX = useTransform(scrollProgress, [0.08, 0.16], ["18%", "5%"]);
    const honzaY = useTransform(scrollProgress, [0.08, 0.14, 0.16, 0.21], ["24%", "0%", "0%", "5%"]);
    const honzaScale = useTransform(scrollProgress, [0.08, 0.16], [0.95, 1.12]);
    const honzaOpacity = useTransform(scrollProgress, [0.08, 0.11, 0.17, 0.21], [0, 1, 1, 0]);

    const exitOpacity = useTransform(scrollProgress, [0.17, 0.21], [1, 0.4]);
    const exitScale = useTransform(scrollProgress, [0.17, 0.21], [1, 0.98]);
    const exitY = useTransform(scrollProgress, [0.17, 0.21], ['0%', '0%']);
    const exitX = useTransform(scrollProgress, [0.17, 0.21], ['0%', '0%']);
    const imageOpacity = useTransform(scrollProgress, [0.17, 0.21], [0.8, 0]);

    return (
        <>
        <>
            {/* BACKGROUND LAYER */}
            <motion.div
                style={{
                    opacity: containerOpacity,
                    scale: containerScale,
                    y: containerY,
                    zIndex: 0,
                    maskImage: 'linear-gradient(to bottom, black 0%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 100%)'
                }}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            >
                <motion.div
                    style={{ opacity: exitOpacity, scale: exitScale, y: exitY, x: exitX }}
                    className="w-full h-full absolute inset-0 z-0 origin-bottom"
                >
                    <div className="absolute inset-0 bg-ivory" />
                    <motion.div
                        style={{ y: bgY, opacity: imageOpacity }}
                        className="absolute inset-0 w-full h-full scale-110 origin-center"
                    >
                        <img
                            src={BaseCampImg}
                            alt="Base Camp Tents"
                            className="w-full h-full object-cover object-bottom opacity-80 filter sepia-[.2] grayscale-[.3] contrast-125 brightness-105"
                        />
                        <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-ivory via-ivory/80 to-transparent z-40 pointer-events-none" />
                    </motion.div>
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f9fa] to-transparent z-10" />
                </motion.div>

                <motion.div style={{ x: sideLayerLeftX, opacity: sideLayerOpacity }}
                    className="absolute left-0 bottom-0 w-[30%] h-[80%] z-10 bg-ivory/20 blur-[40px] mix-blend-screen pointer-events-none" />
                <motion.div style={{ x: sideLayerRightX, opacity: sideLayerOpacity }}
                    className="absolute right-0 bottom-0 w-[30%] h-[80%] z-10 bg-ivory/20 blur-[40px] mix-blend-screen pointer-events-none" />

                <motion.div
                    style={{ x: honzaX, y: honzaY, scale: honzaScale, opacity: honzaOpacity, filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.1))' }}
                    className="absolute right-0 bottom-0 w-[60%] md:w-[50%] h-[90%] md:h-[100%] z-20 pointer-events-none flex items-end justify-end"
                >
                    <img
                        src={HonzaProfile}
                        alt="Honza"
                        className="w-full h-full object-contain object-right-bottom mix-blend-normal scale-[1.3] md:scale-[1.6] lg:scale-[1.8] origin-bottom-right translate-x-[15%] sm:translate-x-[25%] md:translate-x-[35%] lg:translate-x-[20%] xl:translate-x-[10%]"
                    />
                </motion.div>
            </motion.div>

            {/* CONTENT LAYER */}
            <motion.div
                style={{ opacity: containerOpacity, scale: containerScale, y: containerY, zIndex: 70 }}
                className="w-full h-full absolute inset-0 flex items-center justify-start px-6 md:px-20 lg:px-32 pointer-events-none"
            >
                <motion.div
                    style={{ opacity: exitOpacity, y: exitY, x: exitX }}
                    className="relative max-w-xl p-6 md:p-10 lg:p-14 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md shadow-2xl shadow-slate-200/50 pointer-events-auto"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">{about.tagline}</h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                        {(() => {
                            const parts = about.title.split('. ');
                            if (parts.length < 2) return about.title;
                            const last = parts.at(-1).replace(/\.$/, '');
                            const rest = parts.slice(0, -1).join('. ') + '.';
                            return <>{rest} <span className="italic text-slate-600">{last}.</span></>;
                        })()}
                    </h2>
                    <p className="font-sans text-slate-800 leading-relaxed mb-10 text-lg">
                        {about.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                            onClick={() => setIsStoryOpen(true)}
                            className="group relative inline-flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-br from-gold-500 to-gold-600 text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] border border-gold-400/50 overflow-hidden w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                            <span className="relative z-10 drop-shadow-md">Můj celý příběh</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={() => setIsOsvetaOpen(true)}
                            className="group relative inline-flex items-center justify-center gap-3 py-4 px-8 bg-white/70 hover:bg-white/90 text-slate-800 font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-xl transition-all duration-300 border border-slate-300/60 hover:border-slate-400/60 backdrop-blur-sm w-full sm:w-auto"
                        >
                            <span className="relative z-10">Osvěta & Zdraví</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </>

        {/* ── Story Modal ── */}
        <AnimatePresence>
            {isStoryOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 pointer-events-auto bg-slate-950/92 backdrop-blur-md"
                    onClick={() => setIsStoryOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -16 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* ── Hero Banner ── */}
                        <div className="relative h-48 md:h-64 shrink-0 overflow-hidden">
                            <img src={BaseCampImg} alt="" className="w-full h-full object-cover object-center scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950/95" />
                            <button
                                onClick={() => setIsStoryOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm border border-white/15"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-5 left-6 md:left-10">
                                <span className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">Celý příběh</span>
                                <h1 className="font-serif text-3xl md:text-5xl text-white leading-none mb-1.5">
                                    Honza <span className="italic text-slate-300">Tráva.</span>
                                </h1>
                                <p className="text-white/50 text-[10px] font-mono tracking-[0.25em] uppercase">
                                    Horolezec · Cestovatel · Podnikatel · Přednášející
                                </p>
                            </div>
                        </div>

                        {/* ── Scrollable Content ── */}
                        <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar" data-lenis-prevent>

                            {/* BLOCK 1: Začátky */}
                            <div className="px-6 md:px-10 py-8 md:py-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-5 h-px bg-gold-400 shrink-0" />
                                    <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.3em]">{story.zacatky.sectionLabel}</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-5 leading-tight">{story.zacatky.title}</h3>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-2/5 shrink-0 flex flex-row gap-2 self-stretch min-h-[180px]">
                                        {(story.zacatky.images?.length >= 1 ? story.zacatky.images : [StoryImg2, StoryImg1]).slice(0,2).map((src, i) => (
                                            <div key={i} className="relative rounded-2xl overflow-hidden flex-1 min-h-[180px]">
                                                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover"
                                                    style={{ objectPosition: i === 1 ? '20% 20%' : 'center 20%' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-sans text-slate-800 leading-relaxed font-medium mb-4 text-sm md:text-base">{story.zacatky.p1}</p>
                                        <p className="font-sans text-slate-700 leading-relaxed text-sm mb-4">{story.zacatky.p2}</p>
                                        {story.zacatky.p3 && <p className="font-sans text-slate-600 leading-relaxed text-sm mb-4">{story.zacatky.p3}</p>}
                                        {story.zacatky.p4 && <p className="font-sans text-slate-600 leading-relaxed text-sm mb-4">{story.zacatky.p4}</p>}
                                        {story.zacatky.p5 && <p className="font-sans text-slate-500 leading-relaxed text-sm italic">{story.zacatky.p5}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK 2: Hory – dark */}
                            <div className="bg-slate-900 px-6 md:px-10 py-8 md:py-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-5 h-px bg-gold-400 shrink-0" />
                                    <span className="text-gold-400 text-[10px] font-bold uppercase tracking-[0.3em]">{story.hory.sectionLabel}</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl text-white mb-5 leading-tight">{story.hory.title}</h3>

                                {story.hory.videoUrl ? (
                                    <div className="mb-6 rounded-xl overflow-hidden aspect-video">
                                        <iframe src={story.hory.videoUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Video" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 mb-6 h-48 md:h-64">
                                        {(story.hory.images?.length >= 1 ? story.hory.images : [ManasluSummitImg, SummitSelfieImg, StoryImg3]).slice(0,3).map((src, i) => (
                                            <div key={i} className="relative rounded-xl overflow-hidden">
                                                <img src={src} alt="" className="w-full h-full object-cover object-top" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/10 mb-5">
                                    {[['stat1val','stat1label'],['stat2val','stat2label'],['stat3val','stat3label']].map(([v,l], i) => (
                                        <div key={i} className={`text-center ${i===1?'border-x border-white/10':''}`}>
                                            <div className="font-serif text-3xl text-gold-400 font-bold leading-none">{story.hory[v]}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{story.hory[l]}</div>
                                        </div>
                                    ))}
                                </div>

                                <p className="font-sans text-slate-300 text-sm leading-relaxed mb-4">{story.hory.text}</p>
                                {story.hory.text2 && <p className="font-sans text-slate-300 text-sm leading-relaxed mb-4">{story.hory.text2}</p>}
                                {story.hory.text3 && <p className="font-sans text-slate-300 text-sm leading-relaxed mb-4">{story.hory.text3}</p>}
                                {story.hory.text4 && <p className="font-sans text-slate-300 text-sm leading-relaxed mb-4">{story.hory.text4}</p>}
                                {story.hory.text5 && <p className="font-sans text-slate-400 text-sm leading-relaxed mb-6 italic">{story.hory.text5}</p>}

                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => navigateToSection(0.34)} className="inline-flex items-center gap-2 px-5 py-3 bg-gold-500 hover:bg-gold-400 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-200">
                                        Expedice & 14 Summits <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                    <a href="https://14summitsexpedition.cz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-200">
                                        14summitsexpedition.cz <ExternalLink className="w-3 h-3" />
                                    </a>
                                    <button onClick={() => setGalleryOpen(true)} className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-200">
                                        <Images className="w-3.5 h-3.5" /> Galerie fotek
                                    </button>
                                </div>
                            </div>

                            {/* BLOCK 3: Nepál */}
                            <div className="px-6 md:px-10 py-8 md:py-10 border-b border-slate-200">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-5 h-px bg-gold-400 shrink-0" />
                                    <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.3em]">{story.nepal.sectionLabel}</span>
                                </div>

                                {/* Czech Pub Nepal */}
                                <div className="flex flex-col md:flex-row gap-6 mb-8">
                                    <div className="flex-1">
                                        <h3 className="font-serif text-xl md:text-2xl text-slate-900 mb-4 leading-tight">{story.nepal.pubTitle}</h3>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-3">{story.nepal.pubText}</p>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-3">{story.nepal.pubText2}</p>
                                        <p className="font-sans text-slate-500 text-sm leading-relaxed italic">{story.nepal.pubText3}</p>
                                    </div>
                                    <div className="w-full md:w-2/5 shrink-0 rounded-2xl overflow-hidden self-stretch min-h-[160px]">
                                        <img src={KtmPubImg} alt="Czech Pub Nepal" className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 my-6" />

                                {/* Hotel Kathmandu Base Camp */}
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-2/5 shrink-0 rounded-2xl overflow-hidden self-stretch min-h-[160px] order-last md:order-first">
                                        <img src={KtmPub2Img} alt="Hotel Kathmandu Base Camp" className="w-full h-full object-cover" style={{ objectPosition: '75% top' }} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-serif text-xl md:text-2xl text-slate-900 mb-4 leading-tight">{story.nepal.hotelTitle}</h3>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-3">{story.nepal.hotelText}</p>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-3">{story.nepal.hotelText2}</p>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-3">{story.nepal.hotelText3}</p>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-4">{story.nepal.hotelText4}</p>
                                        <p className="font-sans text-slate-500 text-sm leading-relaxed italic">{story.nepal.hotelTagline}</p>
                                    </div>
                                </div>

                                <button onClick={() => navigateToSection(0.45)} className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-200">
                                    Sekce Nepál <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* BLOCK 4: Zdraví */}
                            <div className="px-6 md:px-10 py-8 md:py-10 bg-slate-50 border-b border-slate-200">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-5 h-px bg-gold-400 shrink-0" />
                                            <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.3em]">{story.zdravi.sectionLabel}</span>
                                        </div>
                                        <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-3 leading-tight">{story.zdravi.title}</h3>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-4">{story.zdravi.text}</p>
                                        {story.zdravi.text2 && <p className="font-sans text-slate-700 text-sm leading-relaxed mb-4">{story.zdravi.text2}</p>}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <a href="https://www.revmaliga.cz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 hover:border-gold-400 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm">
                                                Revma Liga <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <a href="https://www.fuckcancer.cz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 hover:border-gold-400 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm">
                                                Fuck Cancer <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <button onClick={() => setIsStoryOpen(false) || setTimeout(() => setIsOsvetaOpen(true), 50)} className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 hover:border-gold-400 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm">
                                                Osvěta & Zdraví <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 shrink-0 relative rounded-2xl overflow-hidden self-stretch min-h-[160px]">
                                        <img src={story.zdravi.imageUrl || ClimbersImg} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                                        <blockquote className="absolute bottom-4 left-4 right-4 font-serif italic text-white text-sm leading-snug drop-shadow-lg">
                                            {story.zdravi.quote}
                                        </blockquote>
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK 5: Přednášky */}
                            <div className="px-6 md:px-10 py-8 md:py-10 border-b border-slate-200">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-2/5 shrink-0 relative rounded-2xl overflow-hidden self-stretch min-h-[160px]">
                                        <img src={story.prednasky.imageUrl || LectureImg} alt="Přednáška" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-5 h-px bg-gold-400 shrink-0" />
                                            <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.3em]">{story.prednasky.sectionLabel}</span>
                                        </div>
                                        <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-3 leading-tight">{story.prednasky.title}</h3>
                                        <p className="font-sans text-slate-700 text-sm leading-relaxed mb-4">{story.prednasky.text}</p>
                                        {story.prednasky.text2 && <p className="font-sans text-slate-700 text-sm leading-relaxed mb-4">{story.prednasky.text2}</p>}
                                        {story.prednasky.text3 && <p className="font-sans text-slate-500 text-sm leading-relaxed mb-5 italic">{story.prednasky.text3}</p>}
                                        <button onClick={() => navigateToSection(0.65)} className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-gold-600 text-white font-bold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-200">
                                            Přednášky <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK 6: Tým */}
                            <div className="px-6 md:px-10 py-8 md:py-10 border-b border-slate-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-5 h-px bg-gold-400 shrink-0" />
                                    <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.3em]">{story.tym.sectionLabel}</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-5 leading-tight">{story.tym.title}</h3>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <button
                                        onClick={() => openTeamModal('openMiriModal')}
                                        className="group relative rounded-2xl overflow-hidden cursor-pointer text-left h-48 md:h-56 transition-all duration-300 hover:shadow-xl"
                                    >
                                        <img src={MiriLeadImg} alt="Miri Jirková" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="font-serif text-white text-base md:text-lg leading-tight mb-0.5">{(adminTexts?.miri?.name) || 'Miri Jirková'}</p>
                                            <p className="font-sans text-slate-300 text-[10px] uppercase tracking-wider">{(adminTexts?.miri?.role) || 'Trek & Logistika'}</p>
                                            <div className="flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                Zobrazit profil <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => openTeamModal('openSubinModal')}
                                        className="group relative rounded-2xl overflow-hidden cursor-pointer text-left h-48 md:h-56 transition-all duration-300 hover:shadow-xl"
                                    >
                                        <img src={SubinLeadImg} alt="Subin Thakuri" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="font-serif text-white text-base md:text-lg leading-tight mb-0.5">{(adminTexts?.subin?.name) || 'Subin Thakuri'}</p>
                                            <p className="font-sans text-slate-300 text-[10px] uppercase tracking-wider">{(adminTexts?.subin?.role) || 'Terénní expert — Nepál'}</p>
                                            <div className="flex items-center gap-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                Zobrazit profil <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </button>
                                </div>

                            </div>

                            {/* BLOCK 7: Kde dál – dark */}
                            <div className="bg-slate-900 px-6 md:px-10 py-8 md:py-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-5 h-px bg-gold-400 shrink-0" />
                                    <span className="text-gold-400 text-[10px] font-bold uppercase tracking-[0.3em]">{story.kdedal.sectionLabel}</span>
                                </div>
                                <h3 className="font-serif text-2xl text-white mb-5 leading-tight">
                                    {story.kdedal.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Expedice & 14 Summits', sub: 'Himálajské expedice',      img: StoryImg3,   target: 0.34 },
                                        { label: 'Přednášky',             sub: 'Motivace & Leadership',    img: LectureImg,  target: 0.65 },
                                        { label: 'Nepál — Pub & Hotel',   sub: 'Český pub v Káthmándú',   img: KtmPubImg,   target: 0.45 },
                                        { label: 'Projekty',              sub: 'Vzdělání & spolupráce',   img: ClimbersImg, target: 0.74 },
                                    ].map((item) => (
                                        <button
                                            key={item.target}
                                            onClick={() => navigateToSection(item.target)}
                                            className="group relative rounded-xl overflow-hidden h-24 md:h-28 text-left transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
                                        >
                                            <img src={item.img} alt="" className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-slate-800/30" />
                                            <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                                                <p className="font-serif text-white text-sm leading-tight">{item.label}</p>
                                                <p className="font-sans text-slate-400 text-[10px] tracking-wider uppercase mt-0.5">{item.sub}</p>
                                            </div>
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <ArrowRight className="w-4 h-4 text-gold-400" />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <blockquote className="mt-8 pt-6 border-t border-white/10 font-serif text-xl md:text-2xl text-slate-400 italic leading-snug text-center">
                                    {story.kdedal.quote}
                                </blockquote>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── Osvěta Modal ── */}
        <AnimatePresence>
            {isOsvetaOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-slate-950/90 backdrop-blur-md"
                    onClick={() => setIsOsvetaOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-ivory w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative"
                    >
                        <button
                            onClick={() => setIsOsvetaOpen(false)}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/50 hover:bg-white/80 text-slate-900 transition-colors backdrop-blur-md shadow-sm border border-white/40"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div
                            className="w-full md:w-[55%] p-8 md:p-14 lg:p-16 overflow-y-auto custom-scrollbar overscroll-contain"
                            data-lenis-prevent
                        >
                            <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                                {osveta.heading}
                            </h4>
                            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                                {osveta.title}
                            </h2>

                            <div className="prose prose-slate prose-lg max-w-none">
                                <p className="font-sans text-slate-800 leading-relaxed font-semibold mb-4">
                                    {osveta.intro}
                                </p>
                                {osveta.intro2 && (
                                    <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                        {osveta.intro2}
                                    </p>
                                )}
                                {osveta.intro3 && (
                                    <p className="font-sans text-slate-600 leading-relaxed mb-6 italic">
                                        {osveta.intro3}
                                    </p>
                                )}

                                <h3 className="font-serif text-2xl text-slate-900 mt-8 mb-4">{osveta.section1Title}</h3>
                                <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                    {osveta.section1Text}
                                </p>
                                {osveta.section1Text2 && (
                                    <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                        {osveta.section1Text2}
                                    </p>
                                )}
                                {osveta.section1Text3 && (
                                    <p className="font-sans text-slate-700 leading-relaxed font-semibold mb-6">
                                        {osveta.section1Text3}
                                    </p>
                                )}

                                <h3 className="font-serif text-2xl text-slate-900 mt-8 mb-4">{osveta.section2Title}</h3>
                                <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                    {osveta.section2Text}
                                </p>
                                {osveta.section2Text2 && (
                                    <p className="font-sans text-slate-700 leading-relaxed mb-4">
                                        {osveta.section2Text2}
                                    </p>
                                )}
                                {osveta.section2Text3 && (
                                    <p className="font-sans text-slate-700 leading-relaxed mb-6">
                                        {osveta.section2Text3}
                                    </p>
                                )}

                                <div className="mt-10 p-6 bg-slate-100 rounded-2xl border border-slate-200">
                                    <h4 className="font-serif text-xl text-slate-900 mb-3">{osveta.expertBoxTitle}</h4>
                                    <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                        {osveta.expertBoxText}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-0 bg-slate-900">
                            <img src={osveta.imageUrl || ClimbersImg} alt="Pomoc a osvěta" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 z-10">
                                <div className="p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl">
                                    <div className="flex gap-2 mb-4">
                                        <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                                        <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                                        <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                                    </div>
                                    <p className="font-serif italic text-xl md:text-2xl text-white leading-snug font-medium drop-shadow-md">
                                        {osveta.quote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── Gallery Modal ── */}
        <AnimatePresence>
            {galleryOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[250] flex items-center justify-center p-3 md:p-8 pointer-events-auto bg-slate-950/96 backdrop-blur-md"
                    onClick={() => setGalleryOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 20 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-950 w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                            <div>
                                <h3 className="font-serif text-xl text-white">Galerie</h3>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">{GALLERY_PHOTOS.length} fotografií</p>
                            </div>
                            <button onClick={() => setGalleryOpen(false)} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-4 overscroll-contain" data-lenis-prevent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                                {GALLERY_PHOTOS.map((photo, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setLightboxIdx(i)}
                                        className="group relative rounded-xl overflow-hidden aspect-square cursor-zoom-in"
                                    >
                                        <img src={photo.src} alt={photo.label} className={`w-full h-full object-cover ${photo.pos} group-hover:scale-105 transition-transform duration-500`} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white text-xs font-sans font-medium leading-tight">{photo.label}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── Lightbox ── */}
        <AnimatePresence>
            {lightboxIdx !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center bg-black/97 backdrop-blur-sm pointer-events-auto"
                    onClick={() => setLightboxIdx(null)}
                >
                    <button onClick={() => setLightboxIdx(null)} className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length); }}
                        className="absolute left-3 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <motion.div
                        key={lightboxIdx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center px-14 md:px-20 max-w-[95vw]"
                    >
                        <img
                            src={GALLERY_PHOTOS[lightboxIdx].src}
                            alt={GALLERY_PHOTOS[lightboxIdx].label}
                            className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
                        />
                        <p className="text-white/50 text-sm font-sans mt-3 tracking-wide">{GALLERY_PHOTOS[lightboxIdx].label}</p>
                    </motion.div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % GALLERY_PHOTOS.length); }}
                        className="absolute right-3 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-5 flex items-center gap-4">
                        <div className="flex gap-1.5">
                            {GALLERY_PHOTOS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                                    className={`rounded-full transition-all duration-200 ${i === lightboxIdx ? 'w-5 h-1.5 bg-gold-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
                                />
                            ))}
                        </div>
                        <span className="text-white/30 text-xs font-mono">{lightboxIdx + 1} / {GALLERY_PHOTOS.length}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default About;
