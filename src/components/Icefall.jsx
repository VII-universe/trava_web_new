import { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import { X, ExternalLink, ChevronLeft } from 'lucide-react';
import { loadContent } from '../data/adminStore';
import IcefallImg from '../assets/icefall_bg.jpg';
import SingingRockLogo from '../assets/svg/singingrock_logo.svg';
import RockPointLogo from '../assets/svg/rockpoint_logo.svg';
import YateLogo from '../assets/svg/yate_logo.jpg';
import MoreThanHoneyLogo from '../assets/svg/morethanhoney_logo.png';
import HoneyBeanLogo from '../assets/svg/honeybean_logo.png';
import MedTubaImg from '../assets/zmensene/portrety/med___tuba_kopie.jpg';
import RopeActionImg from '../assets/zmensene/portrety/expedice_a_treky/pjj_manaslu_2022_nikonz30_6158.jpg';
import SummitGearImg from '../assets/zmensene/portrety/expedice_a_treky/20240728_133329.jpg';
import CampImg from '../assets/zmensene/portrety/expedice_a_treky/20240709_160740.jpg';
import LectureImg from '../assets/zmensene/portrety/prednasky/honza_-_prednaska.jpg';

/* ─── Sponsor data ──────────────────────────────────────── */
// Hlavni partneri: Progress, Singing Rock, Rock Point, Yate, Adventure Menu, MoreThanHoney, HoneyBean
// Sekundarni: Ternua, Lowa, Rafiki climbing, Gerald Horejsek
const FLAGS = [
    {
        id: 'progress',
        name: 'Progress',
        partnership: 'Technický partner',
        discount: 'TRAVA10',
        website: 'progress-lana.cz',
        websiteUrl: 'https://www.progress-lana.cz',
        quote: 'Lana, co znají osm tisíc.',
        description: 'Progress je český výrobce horolezeckých lan a pomůcek s tradicí sahající desítky let zpět. Jejich lana jsem měl s sebou na více než šesti osmitisícovkách a vždy držela přesně tehdy, když to bylo nejdůležitější.',
        collaboration: [
            'Exkluzivní dodávka lan a záchytných pomůcek na všechny expedice',
            'Testování produktů v extrémních podmínkách nad 7000 m n. m.',
            'Ambasadorská spolupráce — doporučení na přednáškách a v online obsahu',
        ],
        events: [
            { title: 'Manaslu 2022', image: RopeActionImg, desc: 'Lana Progress na úspěšném výstupu Manaslu (8163 m) — první česká ženská expedice na osmitisícovku. Lano vydrželo každý pád i každý jistící manévr v podmínkách, kde záleží na každém milimetru.' },
            { title: 'Testovací kampaň prototypů', image: SummitGearImg, desc: 'Honza průběžně testuje nové produkty Progress před uvedením na trh. Zpětná vazba přímo z terénu pomáhá optimalizovat pevnost, váhu a ergonomii nových lan a pomůcek.' },
        ],
        media: [
            { title: 'Video: Výstup na Manaslu s lanem Progress', url: 'https://www.progress-lana.cz' },
            { title: 'Fotoreportáž: Lana na osmitisícovkách', url: 'https://www.progress-lana.cz' },
        ],
        productImage: RopeActionImg,
        image: 'https://images.unsplash.com/photo-1526459879585-a32ec4a4498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '7%',
        stripes: ['#1a3a5c', '#e8f4f8', '#1a3a5c'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 70%, 96% 100%, 88% 95%, 72% 98%, 55% 93%, 35% 98%, 15% 92%, 0% 98%)',
        logo: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a3a5c]">
                <svg viewBox="0 0 160 68" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <text x="80" y="32" textAnchor="middle" fill="white" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="4">PROGRESS</text>
                    <line x1="22" y1="40" x2="138" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6"/>
                    <text x="80" y="54" textAnchor="middle" fill="rgba(180,210,255,0.65)" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="600" letterSpacing="2">{'LANA & VYBAVENI'}</text>
                </svg>
            </div>
        ),
    },
    {
        id: 'singingrock',
        name: 'Singing Rock',
        partnership: 'Partner bezpečnosti',
        discount: 'HONZATRAVA',
        website: 'singingrock.com',
        websiteUrl: 'https://www.singingrock.com',
        quote: 'Česká horolezecká technika světového formátu.',
        description: 'Singing Rock je jedna z nejlepších horolezeckých značek vyrůstající z České republiky. Karabiny, sedáky i chráničě — jejich vybavení má na svém kontě výstupy tam, kde jiné selžou.',
        collaboration: [
            'Partner bezpečnostního vybavení — karabiny, sedáky a helmy na expedicích',
            'Testování nových produktů v podmínkách vysokohorského alpinismu',
            'Vzdělávací workshopy o bezpečnosti v horách ve spolupráci s Rock Pointem',
        ],
        events: [
            { title: '14 Summits Challenge', image: SummitGearImg, desc: 'Vybavení Singing Rock na všech výstupech projektu od Shisha Pangma po Everest. Karabiny, sedáky a lana prošly podmínkami, ve kterých selhává i ta nejlépe testovaná technika.' },
            { title: 'Workshop: Bezpečnost v horách', image: LectureImg, desc: 'Honza vede semináře s praktickými ukázkami zacházení s vybavením Singing Rock. Workshopy probíhají napříč Českou republikou a každý rok přilákají stovky nových horolezců.' },
        ],
        media: [
            { title: 'Expedition Gear Report 2023', url: 'https://www.singingrock.com' },
            { title: 'Video: Bezpečnostní vybavení na osmitisícovce', url: 'https://www.singingrock.com' },
        ],
        productImage: SummitGearImg,
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
        website: 'rockpoint.cz',
        websiteUrl: 'https://www.rockpoint.cz',
        quote: 'Vybavení pro každý vrchol.',
        description: 'Rock Point je nejvýznamnější česká síť prodejen outdoorového vybavení. Spolupráce mi umožňuje doporučovat ověřené zboží z vlastní zkušenosti a propojovat lidi se správnou výbavou před jejich první — nebo pátou — expedicí.',
        collaboration: [
            'Ambasador sítě Rock Point — osobní doporučení výbavy z terénu',
            'Účast na prodejních eventech, výstavách a meet & greet setkáních',
            'Exkluzivní slevový kód pro komunitu Honzy Trávy',
        ],
        events: [
            { title: 'Meet & Greet Praha', image: LectureImg, desc: 'Setkání s fanoušky v pražské prodejně Rock Point. Výběr výbavy na expedici, Q&A a osobní konzultace. Každé setkání přiláká desítky nadšenců do hor.' },
            { title: 'Outdoor Festival Brno', image: LectureImg, desc: 'Společná prezentace na festivalu: Honza přednáší o přípravě na osmitisícovku, Rock Point vystavuje nejnovější kolekci expedičního vybavení.' },
        ],
        media: [
            { title: 'Blog: Kompletní výbava na osmitisícovku', url: 'https://www.rockpoint.cz' },
            { title: 'Video: Jak vybrat expediční batoh', url: 'https://www.rockpoint.cz' },
        ],
        productImage: null,
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
        website: 'yate.cz',
        websiteUrl: 'https://www.yate.cz',
        quote: 'České outdoorové vybavení s duší.',
        description: 'Yate je český výrobce kempingového a trekkingového vybavení. Spacáky, karimatky a stany, které fungují i v podmínkách, kde teplota padne pod mínus dvacet. Spolehlivost bez zbytečných kompromisů.',
        collaboration: [
            'Spacáky a karimatky pro zimní expedice nad 8000 m n. m.',
            'Testování výrobků v extrémních mrazech Himálaje a Karákoramu',
            'Doporučení produktů v e-shopu trava.cz a na přednáškách',
        ],
        events: [
            { title: 'Zimní expedice K2 2023', image: CampImg, desc: 'Spacáky Yate testovány na zimní výpravě K2 (8611 m) — jeden z nejnáročnějších terénních testů v historii značky. Teploty pod -40 °C a větrné poryvy přes 100 km/h nebyly problémem.' },
        ],
        media: [
            { title: 'Test: Spacák Yate Expedition na K2', url: 'https://www.yate.cz' },
        ],
        productImage: CampImg,
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
        website: 'adventuremenu.cz',
        websiteUrl: 'https://www.adventuremenu.cz',
        quote: 'Jídlo, které chutná i nad sedm tisíc.',
        description: 'Adventure Menu jsou lyofilizovaná jídla české výroby. V horách nad 7000 metrů je jídlo otázka přežití i psychiky — a tohle je jídlo, na které se těšíš. Správná kalorická hustota, chuť, která drží morál, když podmínky nikoliv.',
        collaboration: [
            'Výživový partner všech expedic Honzy Trávy od roku 2020',
            'Testování nových příchutí a receptů v reálných podmínkách výstupů',
            'Doporučení v obsahu, přednáškách a na sociálních sítích',
        ],
        events: [
            { title: 'K2 Expedition 2023', image: CampImg, desc: 'Adventure Menu jako primární zdroj teplé stravy na výstupu K2 (8611 m) — 60 dní v poli. Lyofilizáty se staly základem kalorického příjmu v nadmořských výškách, kde se tělo spoléhá jen na kvalitní palivo.' },
            { title: 'Ochutnávka: Náměstí Republiky', image: LectureImg, desc: 'Honza představil Adventure Menu veřejnosti na předexpediční tiskové akci. Stovky lidí si poprvé vyzkoušely, jak chutná lyofilizované jídlo určené pro podmínky osmitisícovek.' },
        ],
        media: [
            { title: 'Video: Co jí horolezec na K2?', url: 'https://www.adventuremenu.cz' },
            { title: 'Recenze: 30 dní výhradně s Adventure Menu', url: 'https://www.adventuremenu.cz' },
        ],
        productImage: CampImg,
        image: 'https://images.unsplash.com/photo-1628135899479-245edda2b57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        left: '64%',
        stripes: ['#8b4513', '#f5deb3', '#8b4513'],
        clipPath: 'polygon(0% 0%, 100% 0%, 99% 95%, 85% 90%, 70% 98%, 55% 80%, 45% 95%, 30% 88%, 15% 98%, 0% 92%)',
        logo: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#6b3410]">
                <svg viewBox="0 0 150 68" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <polygon points="75,8 92,30 106,21 118,38 32,38" fill="rgba(245,190,80,0.22)" stroke="rgba(245,190,80,0.85)" strokeWidth="1.5" strokeLinejoin="round"/>
                    <text x="75" y="56" textAnchor="middle" fill="#f5c850" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="1.5">ADVENTURE MENU</text>
                </svg>
            </div>
        ),
    },
    {
        id: 'morethanhoney',
        name: 'MoreThanHoney',
        partnership: 'Ambasador značky',
        discount: 'TRAVA20',
        website: 'morethanhoney.cz',
        websiteUrl: 'https://www.morethanhoney.cz',
        quote: 'Energie z přírody. Přísaha — to funguje.',
        description: 'MoreThanHoney nabízí produkty z manukového medu světové kvality. Med jako palivo pro expedice i každodenní život — zdroj energie, který nemá vedlejší účinky. Honza je ambasadorem proto, že to sám denně konzumuje a věří tomu.',
        collaboration: [
            'Ambasador značky MoreThanHoney od roku 2021',
            'Denní konzumace manukového medu jako klíčová část výživového plánu',
            'Recenze, unboxing videa a doporučení na sociálních sítích a přednáškách',
        ],
        events: [
            { title: 'Everest Base Camp 2023', image: MedTubaImg, desc: 'MoreThanHoney med jako součást výživy v Base Campu i na výstupu — podporuje regeneraci a imunitu ve vysoké nadmořské výšce, kde tělo funguje na hranici svých možností.' },
            { title: 'Kampaň #MedNaVrchol', image: MedTubaImg, desc: 'Společná sociální kampaň o výživě pro horolezce s dosahem přes 200 000 sledujících. Honza sdílí svůj denní režim s manukavým medem a motivuje komunitu k zdravému přístupu k výkonu.' },
        ],
        media: [
            { title: 'Video: Med jako expediční palivo', url: 'https://www.morethanhoney.cz' },
            { title: 'Blog: Proč jím manukový med každý den', url: 'https://www.morethanhoney.cz' },
        ],
        productImage: MedTubaImg,
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
        website: 'honeybean.cz',
        websiteUrl: 'https://www.honeybean.cz',
        quote: 'Káva s duší, med s příběhem.',
        description: 'HoneyBean je projekt, který spojuje to nejlepší ze dvou světů — speciální kávu a manukový med. Ranní rituál před výstupem i po návratu. Honza spolupracuje s HoneyBean jako ambasador, protože věří v produkt, který sám každý den používá.',
        collaboration: [
            'Ambasador HoneyBean od roku 2022',
            'Ranní rituál s HoneyBean kávou a medem — součást každé expedice i každodenního života',
            'Prodej produktů v e-shopu trava.cz a doporučení ve video obsahu',
        ],
        events: [
            { title: 'Série: Ranní rutina horolezce', image: MedTubaImg, desc: 'Série videí z expedičního táboření — Honza připravuje kávu HoneyBean v 5000 m n. m. Záběry z tábora ukazují rituál, který drží Honzu v kondici fyzické i psychické připravenosti.' },
            { title: 'Pop-up prezentace Praha', image: LectureImg, desc: 'Honza se zúčastnil představení HoneyBean na outdoorovém eventu v centru Prahy. Živé vaření a degustace ukázaly veřejnosti kombinaci specialty kávy a manukového medu.' },
        ],
        media: [
            { title: 'Video: Ranní rutina horolezce (feat. HoneyBean)', url: 'https://www.honeybean.cz' },
        ],
        productImage: MedTubaImg,
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
        website: 'ternua.com',
        websiteUrl: 'https://www.ternua.com',
        quote: 'Výkon i styl v každém terénu.',
        description: 'Ternua je španělská outdoor značka specializující se na vysoce výkonné oblečení pro hory. Bundy, kalhoty a vrstvy navržené s důrazem na udržitelnost a výkon v extrémních podmínkách. Honza nosí jejich oblečení na expedicích, kde záleží na každém detailu.',
        collaboration: [
            'Dodávka technického oblečení pro zimní expedice do Himálaje',
            'Testování nových materiálů v podmínkách extrémního mrazu a větru',
            'Doporučení kolekce na přednáškách a v online obsahu',
        ],
        events: [
            { title: 'K2 Winter Expedition — oděvní test', image: SummitGearImg, desc: 'Oblečení Ternua testováno na jednom z nejnáročnějších zimních výstupů. Membrány, izolace a střihy musely obstát v podmínkách, kde standardní výbava selhává.' },
            { title: 'Spolupráce: Udržitelná expedice', image: LectureImg, desc: 'Honza prezentoval na akci Ternua zaměřené na udržitelnost v horách — jak volit vybavení, které slouží dlouho a zatěžuje přírodu co nejméně.' },
        ],
        media: [
            { title: 'Lookbook: Ternua x Honza Tráva', url: 'https://www.ternua.com' },
        ],
        productImage: SummitGearImg,
        image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        logo: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e6b5c]">
                <svg viewBox="0 0 140 60" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <text x="70" y="31" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="4">TERNUA</text>
                    <text x="70" y="47" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="Arial, sans-serif" fontWeight="400" letterSpacing="2.5">OUTDOOR GEAR</text>
                </svg>
            </div>
        ),
    },
    {
        id: 'lowa',
        name: 'Lowa',
        partnership: 'Partner obuvi',
        discount: null,
        website: 'lowa.cz',
        websiteUrl: 'https://www.lowa.cz',
        quote: 'Boty, které nesklouznou. Ani tam nahoře.',
        description: 'Lowa je německá značka s více než 100letou tradicí výroby prémiové horské obuvi. Jejich trekové a horolezecké boty kombinují tradiční řemeslné zpracování s moderními technologiemi GORE-TEX a Vibram. Na každém výstupu máte pod nohama jistotu.',
        collaboration: [
            'Expediční a trekové boty pro výstupy na osmitisícovky',
            'Testování v extrémních podmínkách — mráz, sníh, ledovec',
            'Doporučení obuvi Lowa na přednáškách a v online obsahu',
        ],
        events: [
            { title: 'Himalájský test obuvi 2022', image: CampImg, desc: 'Boty Lowa Expedition na tříměsíční himalájské trase. Každý den v terénu, kde jeden špatný krok znamená problém — a Lowa nikdy nezklama.' },
        ],
        media: [
            { title: 'Review: Lowa Tibet GTX na osmitisícovce', url: 'https://www.lowa.cz' },
        ],
        productImage: CampImg,
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        logo: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f3060]">
                <svg viewBox="0 0 100 56" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <text x="50" y="37" textAnchor="middle" fill="white" fontSize="26" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="5">LOWA</text>
                </svg>
            </div>
        ),
    },
    {
        id: 'rafiki',
        name: 'Rafiki Climbing',
        partnership: 'Partner lezeckého vybavení',
        discount: null,
        website: 'rafikisport.com',
        websiteUrl: 'https://www.rafikisport.com',
        quote: 'Česká technika na světových skalách.',
        description: 'Rafiki Climbing je česká značka lezeckého vybavení se zaměřením na sportovní lezení a bouldering. Jejich lezečky, chalk bag a doplňky naleznete v rukou lezců po celém světě. Kvalita bez zbytečných příplatků — právě proto je Honza doporučuje.',
        collaboration: [
            'Lezecké vybavení pro trénink a skalní lezení v rámci přípravy na expedice',
            'Doporučení produktů komunitě Honzy Trávy',
            'Spolupráce na lezeckých workshopech pro začínající horolezce',
        ],
        events: [
            { title: 'Workshop: Technické lezení pro začátečníky', image: LectureImg, desc: 'Honza vede workshop základního skalního lezení s vybavením Rafiki. Workshopy se konají pravidelně a pomáhají nováčkům získat jistotu na skále dříve, než vyrazí do hor.' },
            { title: 'Testování lezecké obuvi', image: SummitGearImg, desc: 'Rafiki lezečky testovány na skalách Adršpach a Labských pískovců — ideální prostředí pro ověření přilnavosti, citlivosti a odolnosti bot v reálných podmínkách.' },
        ],
        media: [
            { title: 'Review: Rafiki lezečky na skalách Adršpach', url: 'https://www.rafikisport.com' },
        ],
        productImage: SummitGearImg,
        image: 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        logo: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#b01c2e]">
                <svg viewBox="0 0 120 60" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <text x="60" y="30" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="3">RAFIKI</text>
                    <text x="60" y="46" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="500" letterSpacing="3">CLIMBING</text>
                </svg>
            </div>
        ),
    },
    {
        id: 'gerald',
        name: 'Gerald Hořejšek',
        partnership: 'Mediální partner',
        discount: null,
        website: 'ct.cz',
        websiteUrl: 'https://www.ct.cz',
        quote: 'Příběhy, které stojí za vyprávění.',
        description: 'Gerald Hořejšek je přední český novinář, televizní moderátor a outdoor nadšenec. Spolupracuje s Honzou na mediálních projektech a reportážích z expedic — přináší příběhy z hor k širší veřejnosti prostřednictvím televizních pořadů a online obsahu.',
        collaboration: [
            'Televizní reportáže a dokumenty z Honzových expedic',
            'Mediální pokrytí projektu 14 Summits Challenge v českých médiích',
            'Společné přednáškové turné a veřejné akce po celé ČR',
        ],
        events: [
            { title: 'Dokumentární série: Na cestě k 14 vrcholům', image: LectureImg, desc: 'Gerald provází diváky Honzovými expedicemi — zákulisí, rozhovory a záběry přímo z výstupů. Série získala statisíce zhlédnutí a přiblížila českou veřejnosti svět osmitisícovek.' },
            { title: 'Přednáškové turné ČR 2023', image: LectureImg, desc: 'Společné přednáškové turné po osmi českých městech. Gerald moderoval, Honza vyprávěl. Přes 3000 diváků celkem — největší přednáškové turné v historii projektu.' },
        ],
        media: [
            { title: 'ČT: Reportáž z expedice na K2', url: 'https://www.ct.cz' },
            { title: 'Podcast: Hory, příběhy a lidé', url: 'https://www.ct.cz' },
        ],
        productImage: LectureImg,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        logo: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
                <svg viewBox="0 0 80 60" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <text x="40" y="40" textAnchor="middle" fill="rgba(212,175,55,0.9)" fontSize="30" fontFamily="Georgia, serif" fontWeight="700">GH</text>
                </svg>
            </div>
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
                        <p className="font-sans text-slate-300 text-xs leading-relaxed italic relative z-10">„{flag.quote}"</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/* ─── Main component ────────────────────────────────────── */
// Merge admin text overrides onto hardcoded data (logos/visuals stay from hardcoded)
function applyAdminOverrides(base, adminArr) {
    if (!adminArr) return base;
    return base.map(item => {
        const ov = adminArr.find(a => a.id === item.id);
        if (!ov) return item;
        // Preserve JSX fields that can't be stored in JSON
        return { ...item, ...ov, logo: item.logo, stripes: item.stripes, clipPath: item.clipPath, left: item.left };
    });
}

const Icefall = ({ scrollProgress }) => {
    const adminPartners = loadContent('partners', null);
    const FLAGS_DISPLAY = applyAdminOverrides(FLAGS, adminPartners);
    const SECONDARY_DISPLAY = applyAdminOverrides(SECONDARY_PARTNERS, adminPartners);
    const [selectedFlag, setSelectedFlag] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useScrollLock(selectedFlag);

    const closeModal = () => { setSelectedFlag(null); setSelectedEvent(null); };

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
                            {FLAGS_DISPLAY.map((flag, i) => (
                                <Flag key={flag.id} flag={flag} index={i} onSelect={setSelectedFlag} />
                            ))}
                        </div>
                    </div>

                    {/* ── Mobile: 3 angled rope rows (hidden on desktop) ── */}
                    <div className="md:hidden absolute z-20 pointer-events-auto" style={{ top: '18%', left: 0, right: 0, padding: '0 8px' }}>
                        <style>{flagStyles}</style>

                        {[
                            { flags: [FLAGS_DISPLAY[0], FLAGS_DISPLAY[1], FLAGS_DISPLAY[2]], angle: -2 },
                            { flags: [FLAGS_DISPLAY[3], FLAGS_DISPLAY[4]], angle: 1.5 },
                            { flags: [FLAGS_DISPLAY[5], FLAGS_DISPLAY[6]], angle: -1 },
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
                                {SECONDARY_DISPLAY.map((partner) => (
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
                                {SECONDARY_DISPLAY.map((partner) => (
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
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 pointer-events-auto bg-slate-950/85 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -16 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row"
                        >
                            {/* Left: Hero image — switches to event image when drilling down */}
                            <div className="w-full md:w-[42%] h-52 md:h-auto relative shrink-0 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedEvent ? selectedEvent.title : 'partner'}
                                        src={selectedEvent?.image || selectedFlag.productImage || selectedFlag.image}
                                        alt={selectedEvent ? selectedEvent.title : selectedFlag.name}
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.04 }}
                                        transition={{ duration: 0.35 }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
                                <AnimatePresence mode="wait">
                                    {selectedEvent ? (
                                        <motion.div
                                            key="event-label"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8"
                                        >
                                            <p className="text-gold-400 font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-1">{selectedFlag.name} — Akce</p>
                                            <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight drop-shadow-lg">{selectedEvent.title}</h2>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="partner-label"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8"
                                        >
                                            <p className="text-gold-400 font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{selectedFlag.partnership}</p>
                                            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight drop-shadow-lg">{selectedFlag.name}</h2>
                                            {selectedFlag.discount && (
                                                <div className="mt-3 inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-lg px-3 py-1.5">
                                                    <span className="text-[10px] font-sans text-gold-400 font-bold uppercase tracking-widest">Sleva</span>
                                                    <span className="font-mono text-white font-bold text-sm tracking-wider">{selectedFlag.discount}</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right: close row + scrollable content */}
                            <div className="flex-1 flex flex-col min-h-0">
                                {/* Close button — stays outside scroll area so it's always visible */}
                                <div className="shrink-0 flex justify-end px-4 pt-4 pb-1">
                                    <button
                                        onClick={closeModal}
                                        className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Scroll container — flex-1 + min-h-0 is the key for mobile flex overflow */}
                                <div className="flex-1 overflow-y-auto overscroll-contain min-h-0" data-lenis-prevent>
                                <AnimatePresence mode="wait">
                                    {selectedEvent ? (
                                        /* ── Event detail panel ── */
                                        <motion.div
                                            key="event-detail"
                                            initial={{ opacity: 0, x: 24 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -24 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                        >
                                            <div className="px-6 pb-8 md:px-10 md:pb-10 space-y-6">
                                                <button
                                                    onClick={() => setSelectedEvent(null)}
                                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    <span>Zpět na <strong className="text-white">{selectedFlag.name}</strong></span>
                                                </button>

                                                <div>
                                                    <h3 className="font-serif text-3xl text-white mb-3">{selectedEvent.title}</h3>
                                                    <div className="h-px w-10 bg-gold-500/40 mb-5" />
                                                    <p className="font-sans text-slate-300 leading-relaxed">{selectedEvent.desc}</p>
                                                </div>

                                                {/* Partner attribution */}
                                                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                                                    {selectedFlag.logo && (
                                                        <div className="w-12 h-8 shrink-0 rounded overflow-hidden border border-white/10 relative">
                                                            {selectedFlag.logo}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500">{selectedFlag.partnership}</p>
                                                        <p className="text-sm font-serif text-white">{selectedFlag.name}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setSelectedEvent(null)}
                                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/[0.06] text-white border border-white/[0.12] hover:bg-white/[0.12] transition-all text-xs font-bold uppercase tracking-widest"
                                                >
                                                    <ChevronLeft className="w-3.5 h-3.5" />
                                                    Zpět na {selectedFlag.name}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* ── Partner detail panel ── */
                                        <motion.div
                                            key="partner-detail"
                                            initial={{ opacity: 0, x: -24 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 24 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                        >
                                            <div className="px-6 pb-8 md:px-10 md:pb-10 space-y-7">

                                                {/* Logo mini + quote */}
                                                <div className="flex items-start gap-4">
                                                    {selectedFlag.logo && (
                                                        <div className="w-16 h-10 shrink-0 rounded-lg overflow-hidden border border-white/10 relative">
                                                            {selectedFlag.logo}
                                                        </div>
                                                    )}
                                                    <blockquote className="border-l-2 border-gold-500/50 pl-4 flex-1">
                                                        <p className="font-serif text-slate-300 text-base italic leading-relaxed">{'„'}{selectedFlag.quote}{'“'}</p>
                                                    </blockquote>
                                                </div>

                                                {/* Description */}
                                                <p className="font-sans text-slate-300 leading-relaxed text-sm">{selectedFlag.description}</p>

                                                {/* Collaboration */}
                                                {selectedFlag.collaboration?.length > 0 && (
                                                    <div>
                                                        <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">Jak spolupracujeme</h4>
                                                        <ul className="space-y-2.5">
                                                            {selectedFlag.collaboration.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-2.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                                                                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Events — clickable cards */}
                                                {selectedFlag.events?.length > 0 && (
                                                    <div>
                                                        <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">Společné akce & projekty</h4>
                                                        <div className="space-y-2.5">
                                                            {selectedFlag.events.map((ev, i) => (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => setSelectedEvent(ev)}
                                                                    className="w-full text-left p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-200 group"
                                                                >
                                                                    <div className="flex items-start justify-between gap-3">
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="font-sans font-bold text-white text-sm mb-1 group-hover:text-gold-400 transition-colors">{ev.title}</p>
                                                                            <p className="font-sans text-slate-400 text-xs leading-relaxed line-clamp-2">{ev.desc}</p>
                                                                        </div>
                                                                        <div className="shrink-0 w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-gold-500/20 flex items-center justify-center transition-all mt-0.5">
                                                                            <svg className="w-2.5 h-2.5 text-slate-400 group-hover:text-gold-400 transition-colors" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.5">
                                                                                <path d="M2 5h6M5 2l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Media */}
                                                {selectedFlag.media?.length > 0 && (
                                                    <div>
                                                        <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">Mediální výstupy</h4>
                                                        <div className="space-y-2">
                                                            {selectedFlag.media.map((item, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={item.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="flex items-center gap-2.5 text-sm text-gold-400 hover:text-gold-300 transition-colors group"
                                                                >
                                                                    <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />
                                                                    <span className="group-hover:underline underline-offset-2">{item.title}</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Discount code */}
                                                {selectedFlag.discount && (
                                                    <div className="flex items-center justify-between p-4 bg-white/5 border border-gold-500/30 rounded-xl">
                                                        <div>
                                                            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold-400 mb-1">Slevový kód</p>
                                                            <span className="font-mono text-xl font-bold text-white tracking-wider">{selectedFlag.discount}</span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(selectedFlag.discount); }}
                                                            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap"
                                                        >
                                                            Kopírovat
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Footer actions */}
                                                <div className="flex flex-col sm:flex-row gap-3 pt-1 pb-2">
                                                    {selectedFlag.websiteUrl && (
                                                        <a
                                                            href={selectedFlag.websiteUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/[0.08] text-white border border-white/[0.12] hover:bg-white/[0.15] transition-all text-xs font-bold uppercase tracking-widest"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                            {selectedFlag.website}
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={closeModal}
                                                        className="flex-1 flex items-center justify-center py-3.5 px-5 rounded-xl bg-white text-slate-900 font-bold uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-white transition-all"
                                                    >
                                                        Zpět na stěnu
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                </div>{/* end scroll container */}
                            </div>{/* end flex-col right panel */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Icefall;
