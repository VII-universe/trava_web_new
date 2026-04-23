import React, { useState, useCallback, useRef } from 'react';
import {
  Save, LogOut, Plus, Trash2, Eye, RefreshCw, Lock,
  Check, Mountain, Users, ShoppingBag, Mic2, Folder,
  Tv, ChevronDown, ChevronRight, X, ExternalLink,
  Image, Tag, AlignLeft, Globe, Mail, Link2, AlertTriangle,
  GripVertical, MoveUp, MoveDown, Newspaper, BookOpen,
  Video, Headphones, FileText, Percent, Upload, HardDrive
} from 'lucide-react';
import { loadContent, saveContent, clearContent } from '../data/adminStore';
import { uploadImageToSupabase, deleteImageFromSupabase, getImageStorageUsedMB } from '../data/imageStore';

/* ─── Auth ─────────────────────────────────────────────────── */
const PWD = 'trava2026';
const SESSION = 'trava_admin_auth';

/* ─── Default data ──────────────────────────────────────────── */
const DEF_PARTNERS = [
  { id:'progress',      name:'Progress',        partnership:'Technický partner',   discount:'TRAVA10',     websiteUrl:'https://www.progress-lana.cz',   website:'progress-lana.cz',   quote:'Lana, co znají osm tisíc.',            description:'Progress je český výrobce horolezeckých lan a pomůcek s tradicí sahající desítky let zpět. Jejich lana jsem měl s sebou na více než šesti osmitisícovkách a vždy držela přesně tehdy, když to bylo nejdůležitější.', collaboration:['Exkluzivní dodávka lan a záchytných pomůcek na všechny expedice','Testování produktů v extrémních podmínkách nad 7000 m n. m.','Ambasadorská spolupráce — doporučení na přednáškách a v online obsahu'] },
  { id:'singingrock',   name:'Singing Rock',    partnership:'Partner bezpečnosti', discount:'HONZATRAVA',  websiteUrl:'https://www.singingrock.com',     website:'singingrock.com',    quote:'Česká horolezecká technika světového formátu.', description:'Singing Rock je jedna z nejlepších horolezeckých značek vyrůstající z České republiky. Karabiny, sedáky i chráničě — jejich vybavení má na svém kontě výstupy tam, kde jiné selžou.', collaboration:['Partner bezpečnostního vybavení — karabiny, sedáky a helmy na expedicích','Testování nových produktů v podmínkách vysokohorského alpinismu','Vzdělávací workshopy o bezpečnosti v horách'] },
  { id:'rockpoint',     name:'Rock Point',      partnership:'Outdoorový partner',  discount:'TRAVA10',     websiteUrl:'https://www.rockpoint.cz',       website:'rockpoint.cz',       quote:'Vybavení pro každý vrchol.',           description:'Rock Point je nejvýznamnější česká síť prodejen outdoorového vybavení. Spolupráce mi umožňuje doporučovat ověřené zboží z vlastní zkušenosti a propojovat lidi se správnou výbavou.', collaboration:['Ambasador sítě Rock Point — osobní doporučení výbavy z terénu','Účast na prodejních eventech, výstavách a meet & greet setkáních','Exkluzivní slevový kód pro komunitu Honzy Trávy'] },
  { id:'yate',          name:'Yate',            partnership:'Kempingový partner',  discount:'',            websiteUrl:'https://www.yate.cz',            website:'yate.cz',            quote:'České outdoorové vybavení s duší.',    description:'Yate je český výrobce kempingového a trekkingového vybavení. Spacáky, karimatky a stany, které fungují i v podmínkách, kde teplota padne pod mínus dvacet.', collaboration:['Spacáky a karimatky pro zimní expedice nad 8000 m n. m.','Testování výrobků v extrémních mrazech Himálaje a Karákoramu','Doporučení produktů v e-shopu trava.cz a na přednáškách'] },
  { id:'adventuremenu', name:'Adventure Menu',  partnership:'Výživový partner',    discount:'TRAVA15',     websiteUrl:'https://www.adventuremenu.cz',   website:'adventuremenu.cz',   quote:'Jídlo, které chutná i nad sedm tisíc.', description:'Adventure Menu jsou lyofilizovaná jídla české výroby. V horách nad 7000 metrů je jídlo otázka přežití i psychiky — a tohle je jídlo, na které se těšíš.', collaboration:['Výživový partner všech expedic Honzy Trávy od roku 2020','Testování nových příchutí a receptů v reálných podmínkách výstupů','Doporučení v obsahu, přednáškách a na sociálních sítích'] },
  { id:'morethanhoney', name:'MoreThanHoney',   partnership:'Ambasador značky',    discount:'TRAVA20',     websiteUrl:'https://www.morethanhoney.cz',   website:'morethanhoney.cz',   quote:'Energie z přírody. Přísaha — to funguje.', description:'MoreThanHoney nabízí produkty z manukového medu světové kvality. Med jako palivo pro expedice i každodenní život — zdroj energie, který nemá vedlejší účinky.', collaboration:['Ambasador značky MoreThanHoney od roku 2021','Denní konzumace manukového medu jako klíčová část výživového plánu','Recenze, unboxing videa a doporučení na sociálních sítích'] },
  { id:'honeybean',     name:'HoneyBean',       partnership:'Ambasador značky',    discount:'TRAVA10',     websiteUrl:'https://www.honeybean.cz',       website:'honeybean.cz',       quote:'Káva s duší, med s příběhem.',         description:'HoneyBean je projekt, který spojuje to nejlepší ze dvou světů — speciální kávu a manukový med. Ranní rituál před výstupem i po návratu.', collaboration:['Ambasador HoneyBean od roku 2022','Ranní rituál s HoneyBean kávou a medem — součást každé expedice','Prodej produktů v e-shopu trava.cz a doporučení ve video obsahu'] },
  { id:'ternua',        name:'Ternua',          partnership:'Oděvní partner',       discount:'',            websiteUrl:'https://www.ternua.com',         website:'ternua.com',         quote:'Oblečení, které kryje záda, ne jen tělo.', description:'Ternua je baskická značka technického outdoorového oblečení. Bundy a vrstvy, které jsou doma jak v pětitisícovkách, tak na lezeních v Krkonoších.', collaboration:['Oděvní partner všech expedic 2023+','Testování kolekce v podmínkách osmitisícovek','Ambasadorská spolupráce a obsah pro sociální sítě'] },
  { id:'lowa',          name:'Lowa',            partnership:'Partner obuvi',        discount:'',            websiteUrl:'https://www.lowa.cz',            website:'lowa.cz',            quote:'Každý krok záleží.',                  description:'Lowa je německý výrobce prémiových horských bot. Jejich expediční boty jsem nosil na nejnáročnějších výstupech — K2, Manáslu i Annapurna I.', collaboration:['Expediční boty Lowa na všech osmitisícovkách','Testování a zpětná vazba pro vývoj nových modelů','Doporučení v obsahu a na přednáškách'] },
  { id:'rafiki',        name:'Rafiki Climbing', partnership:'Lezecký partner',      discount:'',            websiteUrl:'https://www.rafikisports.com',   website:'rafikisports.com',   quote:'Drž se pevně.',                       description:'Rafiki Climbing nabízí lezecké oblečení pro outdoor i indoor prostředí. Jejich produkty jsou navrženy pro maximální pohyblivost a výkon.', collaboration:['Lezecké oblečení pro indoor i outdoor prostředí','Doporučení produktů v obsahu o lezení','Spolupráce na lezeckých videích'] },
  { id:'gerald',        name:'Gerald Hořejšek', partnership:'Mediální partner',     discount:'',            websiteUrl:'',                               website:'',                   quote:'Obraz, který stojí za tisíc slov.',   description:'Gerald Hořejšek je přední český mediální profesionál. Spolupráce zahrnuje mediální servis, PR a komunikaci pro všechny projekty Honzy Trávy.', collaboration:['Mediální a PR servis pro všechny projekty','Koordinace s médii a tiskové zprávy','Strategická komunikace a budování značky'] },
];

const DEF_EXPEDITIONS = [
  { id:'manaslu',    title:'Manáslu (8163 m)',       duration:'35 dní',  difficulty:'Extrémní',    imageUrl:'', description:'Nejvyšší hora Nepálu. Technická výprava na světovou osmou horu — plná překvapení, počasí a rozhodnutí pod tlakem.', highlights:['Složitý ledopád Manáslu','Výstup ledovou stěnou','Bivak ve výšce 7400 m'] },
  { id:'mera',       title:'Mera Peak (6476 m) & Amphu Lapcha', duration:'21 dní', difficulty:'Velmi těžké', imageUrl:'', description:'Kombinace výstupu na šestitisícovku a technického průchodu vysokohorským sedlem. Ideální pro zkušené trekaře.', highlights:['Výstup na šestitisícovku','Technické sedlo Amphu Lapcha','Průchod odlehlými oblastmi Khumbu'] },
  { id:'yoga',       title:'Jógový Trek (Annapurny)', duration:'14 dní', difficulty:'Střední',     imageUrl:'', description:'Kombinace trekkingu a jógy v srdci pohoří Annapurna. Klid, hory a regenerace v jednom.', highlights:['Každodenní jóga v horách','Trek kolem Annapurny','Meditace a mindfulness v přírodě'] },
  { id:'aconcagua',  title:'Aconcagua (6961 m)',      duration:'22 dní', difficulty:'Náročné',     imageUrl:'', description:'Nejvyšší hora Jižní Ameriky. Technicky ne nejtěžší, ale fyzicky extrémně náročná — příprava na osmitisícovky.', highlights:['Výstup přes Normal Route','Aklimatizace na 6961 m','Přechod argentinských And'] },
  { id:'elbrus',     title:'Elbrus (5642 m)',         duration:'11 dní', difficulty:'Střední',     imageUrl:'', description:'Nejvyšší hora Evropy. Ideální pro první zkušenost s vysokohorskými podmínkami a aklimatizací.', highlights:['Výstup na nejvyšší evropský vrchol','Aklimatizace v Kavkaze','Fyzická a mentální příprava'] },
  { id:'kilimanjaro',title:'Kilimandžáro (5895 m)',   duration:'10 dní', difficulty:'Střední',     imageUrl:'', description:'Střecha Afriky. Výstup bez technických nároků, ale s výzvou aklimatizace a vůle.', highlights:['Výstup přes Lemosho Route','Rozmanitost ekosystémů','Úsvit na Uhuru Peaku'] },
  { id:'mustang',    title:'Mustang Trek',            duration:'18 dní', difficulty:'Střední',     imageUrl:'', description:'Záhadný horský kraj za Himalájemi — jedno z nejzajímavějších kulturních trekků v Asii.', highlights:['Uzavřený region Mustangu','Tibetská kultura a kláštery','Skalní krajina nepálského Tibet'] },
  { id:'k2bc',       title:'K2 Base Camp',            duration:'24 dní', difficulty:'Náročné',     imageUrl:'', description:'Trek do základního tábora druhé nejvyšší hory světa. Odlehlý, fyzicky náročný a vizuálně ohromující.', highlights:['Trek pod stěnami K2','Průchod odlehlými karákorumskými údolími','Pohled na nejkrásnější horské panorama světa'] },
  { id:'ecuador',    title:'Ekvádor (Sopky)',         duration:'16 dní', difficulty:'Střední',     imageUrl:'', description:'Výstupy na ekvádorské vulkány — Cotopaxi, Chimborazo a další. Skvělá příprava na osmitisícovky.', highlights:['Výstup na Chimborazo (6268 m)','Cotopaxi — aktivní vulkán','Aklimatizace na nadmořské výšce'] },
];

const DEF_PRODUCTS = [
  { id:'med',      name:'Manukový med',        subtitle:'Certifikovaný UMF 10+',           desc:'Přírodní med z Nového Zélandu, který Honza vozí osobně. Síla přírody v každé lžíci.', tag:'Bestseller',       tagColor:'bg-gold-500',    imageUrl:'' },
  { id:'tuba',     name:'Medová tuba',          subtitle:'Energie na cesty',                desc:'Kompaktní medová tuba ideální na trek, expedici nebo každodenní sport. Vždy po ruce.', tag:'Novinka',           tagColor:'bg-emerald-600', imageUrl:'' },
  { id:'kalendar', name:'Kalendář 2026',        subtitle:'Himálaj každý měsíc',             desc:'12 fotografií z expedic Honzy Trávy. Osm tisícovek, treky, lidé — příběhy, které nevidíte na Instagramu.', tag:'Limitovaná edice',  tagColor:'bg-amber-700',   imageUrl:'' },
  { id:'kniha',    name:'Knížka / Audioknížka', subtitle:'Příběh jednoho dobrodružství',    desc:'Hory, nemoc, návrat. Kniha i audioverze v Honzově hlase — ideální na cestu tam a zpátky.', tag:'Audio i tištěná',   tagColor:'bg-slate-600',   imageUrl:'' },
  { id:'tricko',   name:'Tričko 14 Summits',    subtitle:'Organická bavlna',                desc:'Minimalistický design s logem expedice. Nosíš to, o čem mluvíš.', tag:'Apparel',           tagColor:'bg-slate-800',   imageUrl:'' },
  { id:'foto',     name:'Fotky na stěnu',       subtitle:'Tisk na plátno / papír',          desc:'Vyberte si z archivu Honzových fotografií z Himálaje. Každý kus je podepsaný.', tag:'Fine art print',    tagColor:'bg-amber-700',   imageUrl:'' },
];

const DEF_LECTURES = [
  { id:'osmitisicovky',     title:'8 osmitisícovek',          subtitle:'Přednáška & Cestopis',    duration:'60–90 min', audience:'Veřejné akce, festivaly, korporáty',       desc:'Ucelený příběh o cestě na osm nejvyšších hor světa. Fotky a videa z expedic, lidé, kteří to umožnili, a momenty, které nelze přepsat.', highlights:['Osmitisícovky v příbězích','Unikátní fotky z expedic','Q&A s Honzou'] },
  { id:'hory-leci',         title:'Hory mě léčily',           subtitle:'Osobní příběh & Osvěta', duration:'45–60 min', audience:'Zdravotní konference, HR, média',           desc:'O rakovině, artritidě a o tom, jak hory pomohly najít nový směr. Přednáška, která je upřímná, vtipná i silná zároveň.', highlights:['Osobní příběh diagnózy','Cesta zpátky přes hory','Spolupráce s Revma Ligou a Fuck Cancer'] },
  { id:'leadership',        title:'Leadership nad mraky',      subtitle:'Motivační přednáška',    duration:'60 min',    audience:'Firmy, management, teambuildingy',          desc:'Co nás osmitisícovky učí o vedení týmu, rozhodování pod tlakem a nalézání vlastní cesty.', highlights:['Vedení týmu v extrémech','Rozhodování pod tlakem','Osobní výkonnost a hranice'] },
  { id:'expedice-nepal',    title:'Nepál — druhý domov',       subtitle:'Cestopis & Kultura',     duration:'60 min',    audience:'Geografické společnosti, cestovní agentury', desc:'Příběh o zemi, která se stala druhým domovem. Káthmándú, šerpové, kláštery a hory — Nepál očima člověka, který tam žije a pracuje.', highlights:['Kultura a tradice Nepálu','Šerpové a horské komunity','Praktické rady pro cestovatele'] },
  { id:'k2-manaslu',        title:'K2 & Manáslu',              subtitle:'Expedice v detailu',     duration:'75–90 min', audience:'Horolezecké kluby, outdoor komunity',       desc:'Detailní pohled na dvě z nejnáročnějších expedic. Logistika, tým, rozhodnutí ve výšce a momenty, kdy záleží na každém metru.', highlights:['Logistika osmitisícovkové expedice','Kritické momenty a rozhodnutí','Vybavení a příprava'] },
  { id:'jiz-jsme-neskoncili',title:'Ještě jsme neskončili',   subtitle:'S Jiřím Langmajerem',    duration:'90 min',    audience:'Veřejné akce, divadla, kulturní centra',   desc:'Speciální pořad s Jiřím Langmajerem — dvě silné osobnosti, jeden společný rozhovor o životě, odolnosti a tom, co nás drží nahoře.', highlights:['Rozhovor Honza Tráva & Jiří Langmajer','Témata odvolnosti a motivace','Interaktivní formát s publikem'] },
];

const DEF_PROJECTS = [
  { id:'pjj',            title:'Petr Jan Juračka',   subtitle:'Něha Himálaje — balón — Everest Marathon', description:'Spolupráce na dechberoucích projektech s fotografem a filmařem PJJ. Kniha a film Něha Himálaje, projekt létání balónem u Annapurny a Everest Marathon.', highlights:['Kniha a film Něha Himálaje','Projekt balón Annapurna','Everest Marathon'], link:'' },
  { id:'horky',          title:'Petr Horký',          subtitle:'Filmy — projekty — společné akce',         description:'Dlouhodobá spolupráce s režisérem a polárníkem Petrem Horkým. Dokumentární filmy, přednáškové turné a nezapomenutelné projekty s přesahem.', highlights:['Dokumentární filmy','Společné projekty','Ice Adventure Production'], link:'' },
  { id:'langos',         title:'Jirka Langmajer',     subtitle:'Přednášky, promo, Ještě jsme neskončili', description:'Netradiční spojení světa hor a divadla. Společné přednášky, promo videa a projekt Jestejsmeneskoncili ukazují, že po vrcholu to teprve začíná.', highlights:['Zábavné společné přednášky','Marketingová promo videa','Projekt Jestejsmeneskoncili'], link:'' },
  { id:'audy',           title:'Marek Audy',          subtitle:'3D projekce — immersive zážitky',          description:'Unikátní 3D projekce z expedic, které divákům zprostředkovávají realistický pocit z vysokých hor. Spolupráce spojující technologii a dobrodružství.', highlights:['Vtahující 3D fotografie','Realistický vizuální zážitek','Moderní technologie v přednáškách'], link:'' },
  { id:'forman',         title:'Petr Forman',         subtitle:'Divadlo — audiokniha — COPATUTOJE',        description:'Kreativní přesahy mimo klasické horolezectví. Divadlo, audiokniha a regionální projekt COPATUTOJE pro Plzeň.', highlights:['Netradiční divadelní fúze','Spolupráce na audioknize','Projekt COPATUTOJE'], link:'' },
  { id:'jsmeneskoncili', title:'Ještě jsme neskončili',subtitle:'S Miri, Horkým, Langošem a J. Votavou',  description:'Silná sestava, silné poselství. Projekt pěti osobností, který ukazuje, že po dosažení vrcholu nebo překonání krize to teprve začíná.', highlights:['Synergie pěti osobností','Inspirace pro životní změny','Zcela nový formát spolupráce'], link:'' },
  { id:'neha',           title:'Něha Himálaje',       subtitle:'Kniha / film / audio s PJJ',               description:'Multimediální projekt mapující lidskou i horolezeckou tvář himálajských expedic v podání Petra Jana Juračky a Honzy Trávy.', highlights:['Úspěšná knižní publikace','Emocionálně silný dokumentární film','Rozsáhlá osvětová činnost'], link:'' },
  { id:'dalsi',          title:'Další aktivity',      subtitle:'Havlík, Kopka, 1000 mil, Peakfest...',     description:'Spolupráce s režisérem Rudou Havlíkem, cykloexpedice v Nepálu s Honzou Kopkou, Peakfest a další komunitní projekty.', highlights:['Filmová produkce Rudiho Havlíka','Extrémní cykloexpedice Nepál','Peakfest a komunitní akce'], link:'' },
  { id:'tour2026',       title:'50 let tour',         subtitle:'Únor–březen 2026 — celá ČR',               description:'Velkolepá oslava 50. narozenin Honzy Trávy. Turné plné nejlepších příběhů, hostů a překvapení po celé republice.', highlights:['Republikové turné','Nejlepší historky z osmitisícovek','Prostor pro partnery projektu'], link:'' },
];

const DEF_MEDIA_VIDEO = [
  { id:'v1', title:'Vlog #04: Cesta do BC',          date:'Březen 2026',  duration:'12:45', url:'', desc:'Cesta do základního tábora je plná úskalí. Sledujte, jak jsme se prali s ledopádem a nástrahami aklimatizace.' },
  { id:'v2', title:'Vlog #03: Přípravy',             date:'Únor 2026',    duration:'08:20', url:'', desc:'Co všechno obnáší příprava na extrémní expedici? Balení, trénink a logistika.' },
  { id:'v3', title:'Vybavení do zóny smrti',         date:'Leden 2026',   duration:'15:10', url:'', desc:'Detailní pohled na vybavení, které nám pomáhá přežít v 8000 metrech výšky.' },
];

const DEF_MEDIA_PODCAST = [
  { id:'p1', title:'Podcast: Ep. 12 – K2',           date:'Duben 2026',   duration:'45:00', url:'', desc:'Rozhovor o největších krizích na „Hoře hor" a jak je překonat.' },
  { id:'p2', title:'Podcast: Ep. 11 – Nanga Parbat', date:'Březen 2026',  duration:'38:15', url:'', desc:'Příběh hory zabiják z pohledu naší poslední náročné expedice.' },
  { id:'p3', title:'Podcast: Ep. 10 – Tým',          date:'Únor 2026',    duration:'52:30', url:'', desc:'S důležitými členy týmu o tom, jak funguje chemie v extrémních výškách.' },
];

const DEF_MEDIA_BLOG = [
  { id:'b1', title:'Deník z expedice',   date:'12. května 2026',  readTime:'5 min čtení', desc:'Dnes jsme dorazili do 6000 metrů. Vítr sílí, ale morálka je mimořádně vysoká.', content:['Je krátce po páté hodině ranní a vítr lomcuje našimi stany jako by se nás snažil shodit zpátky do údolí.','Morálka v týmu je ale překvapivě vysoká. První dny aklimatizace jsou vždycky ty nejtěžší.','Včera se nám podařilo vynést zásoby do C1. Dnes nás čeká den volna.','Hory nás učí obrovské pokoře. Je to boj, ale kvůli těmhle momentům to děláme.'] },
  { id:'b2', title:'Nepálská kultura',   date:'5. dubna 2026',    readTime:'8 min čtení', desc:'Proč se neustále vracíme do Káthmándú a jak se tam žije.', content:['Pro mnoho horolezců je Nepál jen přestupní stanicí. Pro mě je to druhý domov.','Davy lidí, rikši, vonné tyčinky — čím dál se dostanete od Káthmándú, tím víc poznáte pravou podstatu země.','Spolupráce se šerpy mě naučila nekonečnému klidu.'] },
  { id:'b3', title:'Strava v horách',    date:'28. března 2026',  readTime:'4 min čtení', desc:'Co jíme, když je voda zmrzlá a kyslíku bolestivě málo.', content:['Jídlo v osmi tisících metrech není kulinářský zážitek — je to boj o přežití.','Nad 7000 metry extrémní výška doslova vypne trávení a chuť k jídlu zmizí.','Největší odměnou po týdnech na sušeném jídle je sestup dolů — ledově vychlazené pivo.'] },
];

const DEF_PRESS = [
  { id:'pr1',  type:'TV',      outlet:'ČT Sport',          title:'Honza Tráva: Osmý osmitisícovkář',              year:2026, date:'leden 2026',    href:'#' },
  { id:'pr2',  type:'TV',      outlet:'ČT24',              title:'Rozhovor: Život v extrémních výškách',           year:2025, date:'říjen 2025',    href:'#' },
  { id:'pr3',  type:'TV',      outlet:'Česká televize',    title:'Sportovci roku: nominace na cenu',               year:2025, date:'prosinec 2025', href:'#' },
  { id:'pr4',  type:'Rádio',   outlet:'Radiožurnál ČRo',   title:'Hostem je...: Honza Tráva o K2',                 year:2026, date:'únor 2026',    href:'#' },
  { id:'pr5',  type:'Rádio',   outlet:'Frekvence 1',       title:'Ranní show: Honza Tráva živě',                   year:2025, date:'srpen 2025',    href:'#' },
  { id:'pr6',  type:'Rádio',   outlet:'Radio Impuls',      title:'Horolezec, který se nevzdává',                   year:2024, date:'duben 2024',    href:'#' },
  { id:'pr7',  type:'Tisk',    outlet:'Respekt',           title:'Na vrcholu světa — a doma',                      year:2025, date:'září 2025',     href:'#' },
  { id:'pr8',  type:'Tisk',    outlet:'Forbes CZ',         title:'Jak velet týmu nad mraky',                       year:2025, date:'červen 2025',   href:'#' },
  { id:'pr9',  type:'Tisk',    outlet:"Runner's World CZ", title:'Příprava na výstupy nad 8000 m',                 year:2024, date:'prosinec 2024', href:'#' },
  { id:'pr10', type:'Tisk',    outlet:'Lidové noviny',     title:'Nad oblaky: Rozhovor s alpinistou',              year:2024, date:'únor 2024',     href:'#' },
  { id:'pr11', type:'Online',  outlet:'iDnes.cz',          title:'Trávníček pokořil osmou osmitisícovku',          year:2026, date:'leden 2026',    href:'#' },
  { id:'pr12', type:'Online',  outlet:'Sport.cz',          title:'Český horolezec na vrcholu K2',                  year:2025, date:'červenec 2025', href:'#' },
  { id:'pr13', type:'Online',  outlet:'Aktuálně.cz',       title:'Expedice Manáslu: Za hranici možného',           year:2024, date:'říjen 2024',    href:'#' },
  { id:'pr14', type:'Podcast', outlet:'Průvodce galaxií',  title:'Ep. 87: Hory jako životní škola',                year:2025, date:'listopad 2025', href:'#' },
  { id:'pr15', type:'Podcast', outlet:'Sazka Olympijský',  title:'Cesta k vrcholu s Honzou Trávou',                year:2025, date:'duben 2025',    href:'#' },
  { id:'pr16', type:'Podcast', outlet:'FullFight Cast',    title:'Mentální síla v extrémech',                      year:2024, date:'září 2024',     href:'#' },
];

/* ─── Helpers ───────────────────────────────────────────────── */
function genId() { return Math.random().toString(36).slice(2, 9); }

function Field({ label, value, onChange, type = 'text', rows, placeholder, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {Icon && <Icon className="w-3 h-3" />}{label}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
        />
      )}
    </div>
  );
}

function ArrayEditor({ label, items = [], onChange, placeholder = 'Nová položka…' }) {
  const update = (i, val) => { const a = [...items]; a[i] = val; onChange(a); };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, '']);
  const move = (i, dir) => {
    const a = [...items];
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a);
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-600 flex-shrink-0" />
          <input
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
          />
          <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 transition-colors"><MoveUp className="w-3.5 h-3.5" /></button>
          <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 transition-colors"><MoveDown className="w-3.5 h-3.5" /></button>
          <button onClick={() => remove(i)} className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"><X className="w-3.5 h-3.5" /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 font-semibold mt-1 transition-colors w-fit">
        <Plus className="w-3.5 h-3.5" /> Přidat položku
      </button>
    </div>
  );
}

function ItemList({ items, selected, onSelect, getLabel, onAdd, onDelete, labelKey = 'name' }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item, i) => (
        <button
          key={item.id || i}
          onClick={() => onSelect(i)}
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
            selected === i
              ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300'
              : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-750 hover:border-slate-600'
          }`}
        >
          <span className="font-medium truncate">{getLabel ? getLabel(item) : item[labelKey] || item.title || item.name || `Položka ${i+1}`}</span>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {onDelete && (
              <span onClick={e => { e.stopPropagation(); onDelete(i); }}
                className="p-1 text-slate-600 hover:text-red-400 rounded transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </button>
      ))}
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-500 border border-dashed border-slate-700 hover:border-gold-500/50 hover:text-gold-400 transition-all mt-1">
          <Plus className="w-3.5 h-3.5" /> Přidat nový
        </button>
      )}
    </div>
  );
}

function ImagePicker({ imageUrl, onChangeImageUrl }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const displaySrc = imageUrl || null;

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) { setError('Pouze obrázkové soubory.'); return; }
    setUploading(true); setError('');
    try {
      const publicUrl = await uploadImageToSupabase(file);
      if (imageUrl) deleteImageFromSupabase(imageUrl);
      onChangeImageUrl(publicUrl);
    } catch { setError('Chyba při nahrávání obrázku.'); }
    finally { setUploading(false); }
  };

  const handleDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };

  const handleDelete = () => {
    if (imageUrl) deleteImageFromSupabase(imageUrl);
    onChangeImageUrl('');
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <Image className="w-3 h-3" /> Obrázek
      </label>

      {displaySrc ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-600 bg-slate-800" style={{ height: 160 }}>
          <img src={displaySrc} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs text-white font-semibold transition-colors">
              <Upload className="w-3.5 h-3.5" /> Změnit
            </button>
            <button onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-xs text-red-400 font-semibold transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Odebrat
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 text-white/70 text-[10px] px-2 py-0.5 rounded-md">
            Obrázek
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop} onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="h-32 border-2 border-dashed border-slate-600 hover:border-gold-500/60 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group"
        >
          {uploading ? (
            <RefreshCw className="w-6 h-6 text-gold-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-slate-500 group-hover:text-gold-400 transition-colors" />
              <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                Přetáhni obrázek nebo <span className="text-gold-400">klikni pro výběr</span>
              </p>
              <p className="text-[11px] text-slate-600">JPEG, PNG, WebP · automatická komprese</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { handleFile(e.target.files[0]); e.target.value = ''; }} />

      <div className="flex flex-col gap-1">
        <label className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">nebo URL zdroj</label>
        <input
          type="url"
          value={imageUrl ?? ''}
          onChange={e => onChangeImageUrl(e.target.value)}
          placeholder="https://… (nahradí nahraný soubor)"
          className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
        />
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {onReset && (
        <div className="flex items-center gap-2">
          {confirmReset ? (
            <>
              <span className="text-xs text-amber-400">Opravdu obnovit výchozí?</span>
              <button onClick={() => { onReset(); setConfirmReset(false); }} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors">Ano</button>
              <button onClick={() => setConfirmReset(false)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors">Ne</button>
            </>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold rounded-lg transition-all">
              <RefreshCw className="w-3 h-3" /> Obnovit výchozí
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Partners Editor ───────────────────────────────────────── */
function PartnersEditor({ data, onChange, onReset }) {
  const [sel, setSel] = useState(0);
  const p = data[sel] || {};
  const upd = (field, val) => { const a = [...data]; a[sel] = { ...a[sel], [field]: val }; onChange(a); };
  const del = (i) => { const a = data.filter((_, idx) => idx !== i); onChange(a); setSel(Math.min(sel, a.length - 1)); };
  const add = () => {
    const newP = { id: genId(), name: 'Nový partner', partnership: '', discount: '', websiteUrl: '', website: '', quote: '', description: '', collaboration: [], imageId: '', imageUrl: '' };
    onChange([...data, newP]);
    setSel(data.length);
  };

  return (
    <div>
      <SectionHeader title="Partneři & Sponzoři" subtitle="Hlavní i vedlejší partneři, slevové kódy a spolupráce" onReset={onReset} />
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-1">{data.length} partnerů</p>
          <ItemList items={data} selected={sel} onSelect={setSel} onDelete={del} onAdd={add} labelKey="name"
            getLabel={p => (
              <span className="flex items-center gap-2">
                <span>{p.name}</span>
                {p.discount && <span className="text-[10px] bg-gold-500/20 text-gold-400 px-1.5 rounded font-mono">{p.discount}</span>}
              </span>
            )}
          />
        </div>
        {data[sel] && (
          <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Název" value={p.name} onChange={v => upd('name', v)} icon={Users} />
              <Field label="Typ partnerství" value={p.partnership} onChange={v => upd('partnership', v)} placeholder="Technický partner" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Slevový kód" value={p.discount} onChange={v => upd('discount', v)} placeholder="TRAVA10" icon={Percent} />
              <Field label="Web" value={p.website} onChange={v => upd('website', v)} placeholder="partner.cz" icon={Globe} />
            </div>
            <Field label="URL webu" value={p.websiteUrl} onChange={v => upd('websiteUrl', v)} placeholder="https://www.partner.cz" type="url" icon={Link2} />
            <Field label="Citace" value={p.quote} onChange={v => upd('quote', v)} placeholder="Krátký slogan partnera…" />
            <Field label="Popis" value={p.description} onChange={v => upd('description', v)} rows={4} placeholder="Detailní popis spolupráce…" icon={AlignLeft} />
            <ArrayEditor label="Spolupráce (body)" items={p.collaboration} onChange={v => upd('collaboration', v)} placeholder="Popis bodu spolupráce…" />
            <ImagePicker imageUrl={p.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Expeditions Editor ────────────────────────────────────── */
function ExpeditionsEditor({ data, onChange, onReset }) {
  const [sel, setSel] = useState(0);
  const e = data[sel] || {};
  const upd = (field, val) => { const a = [...data]; a[sel] = { ...a[sel], [field]: val }; onChange(a); };
  const del = (i) => { const a = data.filter((_, idx) => idx !== i); onChange(a); setSel(Math.min(sel, a.length - 1)); };
  const add = () => {
    const ne = { id: genId(), title: 'Nová expedice', duration: '14 dní', difficulty: 'Střední', imageId: '', imageUrl: '', description: '', highlights: [] };
    onChange([...data, ne]);
    setSel(data.length);
  };

  const DIFFS = ['Snadné', 'Střední', 'Náročné', 'Velmi těžké', 'Extrémní'];

  return (
    <div>
      <SectionHeader title="Expedice & Treky" subtitle="Nabídka expedic, treků a výstupů" onReset={onReset} />
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-1">{data.length} expedic</p>
          <ItemList items={data} selected={sel} onSelect={setSel} onDelete={del} onAdd={add}
            getLabel={e => (
              <span className="flex flex-col gap-0.5">
                <span>{e.title}</span>
                <span className="text-[11px] text-slate-500">{e.duration} · {e.difficulty}</span>
              </span>
            )}
          />
        </div>
        {data[sel] && (
          <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <Field label="Název expedice" value={e.title} onChange={v => upd('title', v)} icon={Mountain} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Délka trvání" value={e.duration} onChange={v => upd('duration', v)} placeholder="14 dní" />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Obtížnost</label>
                <select value={e.difficulty} onChange={ev => upd('difficulty', ev.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors">
                  {DIFFS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <ImagePicker imageUrl={e.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
            <Field label="Popis" value={e.description} onChange={v => upd('description', v)} rows={4} icon={AlignLeft} />
            <ArrayEditor label="Highlights" items={e.highlights} onChange={v => upd('highlights', v)} placeholder="Popis highlightu…" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Eshop Editor ──────────────────────────────────────────── */
const TAG_COLORS = [
  { label: 'Zlatá', value: 'bg-gold-500' },
  { label: 'Zelená', value: 'bg-emerald-600' },
  { label: 'Jantarová', value: 'bg-amber-700' },
  { label: 'Tmavá', value: 'bg-slate-600' },
  { label: 'Černá', value: 'bg-slate-800' },
];

function EshopEditor({ data, onChange, onReset }) {
  const [sel, setSel] = useState(0);
  const p = data[sel] || {};
  const upd = (field, val) => { const a = [...data]; a[sel] = { ...a[sel], [field]: val }; onChange(a); };
  const del = (i) => { const a = data.filter((_, idx) => idx !== i); onChange(a); setSel(Math.min(sel, a.length - 1)); };
  const add = () => {
    const np = { id: genId(), name: 'Nový produkt', subtitle: '', desc: '', tag: 'Novinka', tagColor: 'bg-gold-500', imageId: '', imageUrl: '' };
    onChange([...data, np]);
    setSel(data.length);
  };

  return (
    <div>
      <SectionHeader title="E-shop" subtitle="Produkty, popis a štítky" onReset={onReset} />
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-1">{data.length} produktů</p>
          <ItemList items={data} selected={sel} onSelect={setSel} onDelete={del} onAdd={add}
            getLabel={p => (
              <span className="flex items-center gap-2">
                <span>{p.name}</span>
                <span className={`text-[10px] ${p.tagColor} text-white px-1.5 rounded`}>{p.tag}</span>
              </span>
            )}
          />
        </div>
        {data[sel] && (
          <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Název produktu" value={p.name} onChange={v => upd('name', v)} icon={ShoppingBag} />
              <Field label="Podtitulek" value={p.subtitle} onChange={v => upd('subtitle', v)} placeholder="Certifikovaný UMF 10+…" />
            </div>
            <Field label="Popis" value={p.desc} onChange={v => upd('desc', v)} rows={3} icon={AlignLeft} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Štítek" value={p.tag} onChange={v => upd('tag', v)} placeholder="Bestseller" icon={Tag} />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Barva štítku</label>
                <div className="flex gap-2 flex-wrap">
                  {TAG_COLORS.map(c => (
                    <button key={c.value} onClick={() => upd('tagColor', c.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white ${c.value} border-2 transition-all ${p.tagColor === c.value ? 'border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <ImagePicker imageUrl={p.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Lectures Editor ───────────────────────────────────────── */
function LecturesEditor({ data, onChange, onReset }) {
  const [sel, setSel] = useState(0);
  const l = data[sel] || {};
  const upd = (field, val) => { const a = [...data]; a[sel] = { ...a[sel], [field]: val }; onChange(a); };
  const del = (i) => { const a = data.filter((_, idx) => idx !== i); onChange(a); setSel(Math.min(sel, a.length - 1)); };
  const add = () => {
    const nl = { id: genId(), title: 'Nová přednáška', subtitle: '', duration: '60 min', audience: '', desc: '', highlights: [], imageId: '', imageUrl: '' };
    onChange([...data, nl]);
    setSel(data.length);
  };

  return (
    <div>
      <SectionHeader title="Přednášky" subtitle="Typy přednášek, délka, cílové skupiny a highlights" onReset={onReset} />
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-1">{data.length} přednášek</p>
          <ItemList items={data} selected={sel} onSelect={setSel} onDelete={del} onAdd={add}
            getLabel={l => (
              <span className="flex flex-col gap-0.5">
                <span>{l.title}</span>
                <span className="text-[11px] text-slate-500">{l.subtitle}</span>
              </span>
            )}
          />
        </div>
        {data[sel] && (
          <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <Field label="Název přednášky" value={l.title} onChange={v => upd('title', v)} icon={Mic2} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Podtitulek" value={l.subtitle} onChange={v => upd('subtitle', v)} placeholder="Motivační přednáška" />
              <Field label="Délka" value={l.duration} onChange={v => upd('duration', v)} placeholder="60–90 min" />
            </div>
            <Field label="Cílová skupina" value={l.audience} onChange={v => upd('audience', v)} placeholder="Firmy, management, teambuildingy…" icon={Users} />
            <Field label="Popis" value={l.desc} onChange={v => upd('desc', v)} rows={4} icon={AlignLeft} />
            <ArrayEditor label="Co přednáška nabízí (highlights)" items={l.highlights} onChange={v => upd('highlights', v)} placeholder="Highlight přednášky…" />
            <ImagePicker imageUrl={l.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Projects Editor ───────────────────────────────────────── */
function ProjectsEditor({ data, onChange, onReset }) {
  const [sel, setSel] = useState(0);
  const pr = data[sel] || {};
  const upd = (field, val) => { const a = [...data]; a[sel] = { ...a[sel], [field]: val }; onChange(a); };
  const del = (i) => { const a = data.filter((_, idx) => idx !== i); onChange(a); setSel(Math.min(sel, a.length - 1)); };
  const add = () => {
    const np = { id: genId(), title: 'Nový projekt', subtitle: '', description: '', highlights: [], link: '', imageId: '', imageUrl: '' };
    onChange([...data, np]);
    setSel(data.length);
  };

  return (
    <div>
      <SectionHeader title="Projekty & Spolupráce" subtitle="Kolaborace a společné projekty" onReset={onReset} />
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-1">{data.length} projektů</p>
          <ItemList items={data} selected={sel} onSelect={setSel} onDelete={del} onAdd={add}
            getLabel={p => (
              <span className="flex flex-col gap-0.5">
                <span>{p.title}</span>
                <span className="text-[11px] text-slate-500 truncate">{p.subtitle}</span>
              </span>
            )}
          />
        </div>
        {data[sel] && (
          <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <Field label="Název projektu / osoby" value={pr.title} onChange={v => upd('title', v)} icon={Folder} />
            <Field label="Podtitulek" value={pr.subtitle} onChange={v => upd('subtitle', v)} placeholder="Filmy — projekty — společné akce" />
            <Field label="Popis" value={pr.description} onChange={v => upd('description', v)} rows={4} icon={AlignLeft} />
            <Field label="URL odkazu" value={pr.link} onChange={v => upd('link', v)} placeholder="https://… (nepovinné)" type="url" icon={ExternalLink} />
            <ArrayEditor label="Highlights" items={pr.highlights} onChange={v => upd('highlights', v)} placeholder="Highlight projektu…" />
            <ImagePicker imageUrl={pr.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Media Editor ──────────────────────────────────────────── */
const PRESS_TYPES = ['TV', 'Rádio', 'Tisk', 'Online', 'Podcast'];
const PRESS_YEARS = [2024, 2025, 2026, 2027];

function MediaEditor({ video, podcast, blog, press, onChange, onReset }) {
  const [tab, setTab] = useState('video');
  const [sel, setSel] = useState(0);

  const tabs = [
    { key:'video',   icon: Video,     label:'Vlogy',   count: video.length },
    { key:'podcast', icon: Headphones,label:'Podcast', count: podcast.length },
    { key:'blog',    icon: FileText,  label:'Blog',    count: blog.length },
    { key:'press',   icon: Newspaper, label:'Tisk',    count: press.length },
  ];

  const currentData = { video, podcast, blog, press }[tab];
  const setCurrentData = (d) => onChange({ video, podcast, blog, press, [tab]: d });

  const cur = currentData[sel] || {};
  const upd = (field, val) => {
    const a = [...currentData]; a[sel] = { ...a[sel], [field]: val };
    setCurrentData(a);
  };
  const del = (i) => {
    const a = currentData.filter((_, idx) => idx !== i);
    setCurrentData(a);
    setSel(Math.min(sel, a.length - 1));
  };
  const add = () => {
    let ne = { id: genId() };
    if (tab === 'video' || tab === 'podcast') ne = { ...ne, title: 'Nová položka', date: '', duration: '', url: '', desc: '', imageId: '', imageUrl: '' };
    if (tab === 'blog') ne = { ...ne, title: 'Nový příspěvek', date: '', readTime: '', desc: '', content: [], imageId: '', imageUrl: '' };
    if (tab === 'press') ne = { ...ne, type: 'TV', outlet: '', title: 'Nový záznam', year: 2026, date: '', href: '' };
    setCurrentData([...currentData, ne]);
    setSel(currentData.length);
  };

  return (
    <div>
      <SectionHeader title="Média & Obsah" subtitle="Vlogy, podcast, blog a mediální zmínky" onReset={onReset} />
      <div className="flex gap-1 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSel(0); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.key ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300' : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
            }`}>
            <t.icon className="w-4 h-4" />
            {t.label}
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${tab === t.key ? 'bg-gold-500/30 text-gold-300' : 'bg-slate-700 text-slate-500'}`}>{t.count}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <ItemList items={currentData} selected={sel} onSelect={setSel} onDelete={del} onAdd={add}
            getLabel={item => (
              <span className="flex flex-col gap-0.5">
                <span className="truncate">{item.title}</span>
                <span className="text-[11px] text-slate-500">{item.date || item.outlet || ''}</span>
              </span>
            )}
          />
        </div>
        {currentData[sel] && (
          <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            {(tab === 'video' || tab === 'podcast') && <>
              <Field label="Název" value={cur.title} onChange={v => upd('title', v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Datum" value={cur.date} onChange={v => upd('date', v)} placeholder="Březen 2026" />
                <Field label="Délka" value={cur.duration} onChange={v => upd('duration', v)} placeholder="12:45" />
              </div>
              <Field label="URL (YouTube / Spotify…)" value={cur.url} onChange={v => upd('url', v)} type="url" icon={Link2} />
              <Field label="Popis" value={cur.desc} onChange={v => upd('desc', v)} rows={3} icon={AlignLeft} />
              <ImagePicker imageUrl={cur.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
            </>}
            {tab === 'blog' && <>
              <Field label="Název článku" value={cur.title} onChange={v => upd('title', v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Datum" value={cur.date} onChange={v => upd('date', v)} placeholder="12. května 2026" />
                <Field label="Čas čtení" value={cur.readTime} onChange={v => upd('readTime', v)} placeholder="5 min čtení" />
              </div>
              <Field label="Perex" value={cur.desc} onChange={v => upd('desc', v)} rows={2} />
              <ArrayEditor label="Odstavce článku" items={cur.content || []} onChange={v => upd('content', v)} placeholder="Text odstavce…" />
              <ImagePicker imageUrl={cur.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
            </>}
            {tab === 'press' && <>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Typ média</label>
                  <select value={cur.type} onChange={e => upd('type', e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors">
                    {PRESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rok</label>
                  <select value={cur.year} onChange={e => upd('year', parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors">
                    {PRESS_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Médium / Outlet" value={cur.outlet} onChange={v => upd('outlet', v)} placeholder="ČT Sport" />
                <Field label="Datum" value={cur.date} onChange={v => upd('date', v)} placeholder="leden 2026" />
              </div>
              <Field label="Titulek článku / pořadu" value={cur.title} onChange={v => upd('title', v)} />
              <Field label="URL odkazu" value={cur.href} onChange={v => upd('href', v)} type="url" icon={Link2} />
            </>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main AdminPanel ───────────────────────────────────────── */
const NAV = [
  { key:'partners',    label:'Partneři',   icon: Users,      color: 'text-blue-400' },
  { key:'expeditions', label:'Expedice',   icon: Mountain,   color: 'text-emerald-400' },
  { key:'eshop',       label:'E-shop',     icon: ShoppingBag,color: 'text-gold-400' },
  { key:'lectures',    label:'Přednášky',  icon: Mic2,       color: 'text-violet-400' },
  { key:'projects',    label:'Projekty',   icon: Folder,     color: 'text-amber-400' },
  { key:'media',       label:'Média',      icon: Tv,         color: 'text-red-400' },
];

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION) === 'ok');
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState(false);
  const [section, setSection] = useState('partners');
  const [dirty, setDirty] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // All editable data
  const [partners,    setPartners]    = useState(() => loadContent('partners',    DEF_PARTNERS));
  const [expeditions, setExpeditions] = useState(() => loadContent('expeditions', DEF_EXPEDITIONS));
  const [products,    setProducts]    = useState(() => loadContent('products',    DEF_PRODUCTS));
  const [lectures,    setLectures]    = useState(() => loadContent('lectures',    DEF_LECTURES));
  const [projects,    setProjects]    = useState(() => loadContent('projects',    DEF_PROJECTS));
  const [mediaVideo,  setMediaVideo]  = useState(() => loadContent('media_video',  DEF_MEDIA_VIDEO));
  const [mediaPodcast,setMediaPodcast]= useState(() => loadContent('media_podcast',DEF_MEDIA_PODCAST));
  const [mediaBlog,   setMediaBlog]   = useState(() => loadContent('media_blog',   DEF_MEDIA_BLOG));
  const [press,       setPress]       = useState(() => loadContent('press',        DEF_PRESS));

  const markDirty = useCallback((setter) => (...args) => { setter(...args); setDirty(true); }, []);

  const handleSave = async () => {
    setSaveMsg('Ukládám…');
    await Promise.all([
      saveContent('partners',      partners),
      saveContent('expeditions',   expeditions),
      saveContent('products',      products),
      saveContent('lectures',      lectures),
      saveContent('projects',      projects),
      saveContent('media_video',   mediaVideo),
      saveContent('media_podcast', mediaPodcast),
      saveContent('media_blog',    mediaBlog),
      saveContent('press',         press),
    ]);
    setDirty(false);
    setSaveMsg('Uloženo');
    setTimeout(() => setSaveMsg(''), 2500);
  };

  const handleReset = async (key, def, setter) => {
    await clearContent(key);
    setter(def);
    setDirty(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pwd === PWD) { sessionStorage.setItem(SESSION, 'ok'); setAuthed(true); }
    else { setPwdErr(true); setTimeout(() => setPwdErr(false), 1500); }
  };

  const handleLogout = () => { sessionStorage.removeItem(SESSION); setAuthed(false); };

  /* Login screen */
  if (!authed) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/30 rounded-2xl flex items-center justify-center">
            <Mountain className="w-7 h-7 text-gold-400" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Tráva Admin</h1>
            <p className="text-slate-400 text-sm">Správa obsahu webu</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Lock className="w-3 h-3" />Heslo</label>
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            placeholder="Zadej přístupové heslo"
            autoFocus
            className={`bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all ${pwdErr ? 'border-red-500 animate-pulse' : 'border-slate-700 focus:border-gold-500'}`}
          />
          {pwdErr && <p className="text-red-400 text-xs">Nesprávné heslo</p>}
        </div>
        <button type="submit" className="bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-3 rounded-xl transition-colors">
          Přihlásit se
        </button>
      </form>
    </div>
  );

  const activeNav = NAV.find(n => n.key === section);

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gold-500/15 border border-gold-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mountain className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Tráva Admin</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Správa obsahu</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2 mb-2">Sekce webu</p>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setSection(n.key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all ${
                section === n.key
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}>
              <n.icon className={`w-4 h-4 flex-shrink-0 ${section === n.key ? n.color : 'text-slate-600'}`} />
              {n.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-600">
            <HardDrive className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Foto: {getImageStorageUsedMB()} MB</span>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Eye className="w-4 h-4" /> Zobrazit web
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all">
            <LogOut className="w-4 h-4" /> Odhlásit se
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {activeNav && <activeNav.icon className={`w-5 h-5 ${activeNav.color}`} />}
            <h1 className="text-base font-bold text-white">{activeNav?.label}</h1>
            {dirty && (
              <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                <AlertTriangle className="w-3 h-3" /> Neuložené změny
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-400 font-semibold">
                <Check className="w-4 h-4" /> {saveMsg}
              </span>
            )}
            <button onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                dirty
                  ? 'bg-gold-500 hover:bg-gold-400 text-slate-900 shadow-lg shadow-gold-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-default'
              }`}>
              <Save className="w-4 h-4" /> Uložit změny
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {section === 'partners' && (
            <PartnersEditor
              data={partners}
              onChange={markDirty(setPartners)}
              onReset={() => handleReset('partners', DEF_PARTNERS, setPartners)}
            />
          )}
          {section === 'expeditions' && (
            <ExpeditionsEditor
              data={expeditions}
              onChange={markDirty(setExpeditions)}
              onReset={() => handleReset('expeditions', DEF_EXPEDITIONS, setExpeditions)}
            />
          )}
          {section === 'eshop' && (
            <EshopEditor
              data={products}
              onChange={markDirty(setProducts)}
              onReset={() => handleReset('products', DEF_PRODUCTS, setProducts)}
            />
          )}
          {section === 'lectures' && (
            <LecturesEditor
              data={lectures}
              onChange={markDirty(setLectures)}
              onReset={() => handleReset('lectures', DEF_LECTURES, setLectures)}
            />
          )}
          {section === 'projects' && (
            <ProjectsEditor
              data={projects}
              onChange={markDirty(setProjects)}
              onReset={() => handleReset('projects', DEF_PROJECTS, setProjects)}
            />
          )}
          {section === 'media' && (
            <MediaEditor
              video={mediaVideo} podcast={mediaPodcast} blog={mediaBlog} press={press}
              onChange={({ video, podcast, blog, press: p }) => {
                markDirty(setMediaVideo)(video);
                markDirty(setMediaPodcast)(podcast);
                markDirty(setMediaBlog)(blog);
                markDirty(setPress)(p);
              }}
              onReset={() => {
                handleReset('media_video',   DEF_MEDIA_VIDEO,   setMediaVideo);
                handleReset('media_podcast', DEF_MEDIA_PODCAST, setMediaPodcast);
                handleReset('media_blog',    DEF_MEDIA_BLOG,    setMediaBlog);
                handleReset('press',         DEF_PRESS,         setPress);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
