import React, { useState, useCallback, useRef } from 'react';
import {
  Save, LogOut, Plus, Trash2, Eye, RefreshCw, Lock,
  Check, Mountain, Users, ShoppingBag, Mic2, Folder,
  Tv, ChevronDown, ChevronRight, X, ExternalLink,
  Image, Tag, AlignLeft, Globe, Mail, Link2, AlertTriangle,
  GripVertical, MoveUp, MoveDown, Newspaper, BookOpen,
  Video, Headphones, FileText, Percent, Upload, HardDrive, Type
} from 'lucide-react';
import { loadContent, saveContent, clearContent } from '../data/adminStore';
import { uploadImageToSupabase, deleteImageFromSupabase, getImageStorageUsedMB } from '../data/imageStore';

/* ─── Auth ─────────────────────────────────────────────────── */
const PWD = 'trava2026';
const SESSION = 'trava_admin_auth';

/* ─── Default data ──────────────────────────────────────────── */
const DEF_PARTNERS = [
  { id:'progress',      name:'Progress',        partnership:'Technický partner',   discount:'TRAVA10',     websiteUrl:'https://www.progress-sports.cz',   website:'progress-sports.cz',   quote:'Funkční sportovní oblečení do extrémních podmínek.',            description:'Progress je tradiční český výrobce špičkového funkčního prádla a sportovního oblečení. Jejich termoprádlo a outdoorové oblečení mě doprovází na všech expedicích do Himálaje a spolehlivě mě hřeje i v těch nejkrutějších mrazech.', collaboration:['Dodávka funkčního prádla a izolačních vrstev pro celý expediční tým','Testování prototypů merino vlny a bambusových vláken v extrémních mrazech','Ambasadorská spolupráce — doporučení na přednáškách a sportovních akcích'] },
  { id:'singingrock',   name:'Singing Rock',    partnership:'Partner bezpečnosti', discount:'HONZATRAVA',  websiteUrl:'https://www.singingrock.com',     website:'singingrock.com',    quote:'Česká horolezecká technika světového formátu.', description:'Singing Rock je jedna z nejlepších horolezeckých značek vyrůstající z České republiky. Karabiny, sedáky i chráničě — jejich vybavení má na svém kontě výstupy tam, kde jiné selžou.', collaboration:['Partner bezpečnostního vybavení — karabiny, sedáky a helmy na expedicích','Testování nových produktů v podmínkách vysokohorského alpinismu','Vzdělávací workshopy o bezpečnosti v horách'] },
  { id:'rockpoint',     name:'Rock Point',      partnership:'Outdoorový partner',  discount:'TRAVA10',     websiteUrl:'https://www.rockpoint.cz',       website:'rockpoint.cz',       quote:'Vybavení pro každý vrchol.',           description:'Rock Point je nejvýznamnější česká síť prodejen outdoorového vybavení. Spolupráce mi umožňuje doporučovat ověřené zboží z vlastní zkušenosti a propojovat lidi se správnou výbavou.', collaboration:['Ambasador sítě Rock Point — osobní doporučení výbavy z terénu','Účast na prodejních eventech, výstavách a meet & greet setkáních','Exkluzivní slevový kód pro komunitu Honzy Trávy'] },
  { id:'yate',          name:'Yate',            partnership:'Kempingový partner',  discount:'',            websiteUrl:'https://www.yate.cz',            website:'yate.cz',            quote:'České outdoorové vybavení s duší.',    description:'Yate je český výrobce kempingového a trekkingového vybavení. Spacáky, karimatky a stany, které fungují i v podmínkách, kde teplota padne pod mínus dvacet.', collaboration:['Spacáky and karimatky pro zimní expedice nad 8000 m n. m.','Testování výrobků v extrémních mrazech Himálaje a Karákoramu','Doporučení produktů v e-shopu trava.cz a na přednáškách'] },
  { id:'adventuremenu', name:'Adventure Menu',  partnership:'Výživový partner',    discount:'TRAVA15',     websiteUrl:'https://www.adventuremenu.cz',   website:'adventuremenu.cz',   quote:'Jídlo, které chutná i nad sedm tisíc.', description:'Adventure Menu jsou lyofilizovaná jídla české výroby. V horách nad 7000 metrů je jídlo otázka přežití i psychiky — a tohle je jídlo, na které se těšíš.', collaboration:['Výživový partner všech expedic Honzy Trávy od roku 2020','Testování nových příchutí a receptů v reálných podmínkách výstupů','Doporučení v obsahu, přednáškách a na sociálních sítích'] },
  { id:'morethanhoney', name:'MoreThanHoney',   partnership:'Ambasador značky',    discount:'TRAVA20',     websiteUrl:'https://www.morethanhoney.cz',   website:'morethanhoney.cz',   quote:'Energie z přírody. Přísaha — to funguje.', description:'MoreThanHoney nabízí produkty z manukového medu světové kvality. Med jako palivo pro expedice i každodenní život — zdroj energie, který nemá vedlejší účinky.', collaboration:['Ambasador značky MoreThanHoney od roku 2021','Denní konzumace manukového medu jako klíčová část výživového plánu','Recenze, unboxing videa a doporučení na sociálních sítích'] },
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

// DEF_LECTURES = témata z Lectures.jsx TOPICS + původní přednášky
const DEF_LECTURES = [
  { id:'nepal',        title:'Nepálem křížem krážem',     subtitle:'Cestopis & kultura',      duration:'60 min',    audience:'Školy, festivaly, veřejné akce', desc:'Příběh o zemi, která se stala druhým domovem. Káthmándú, šerpové, kláštery a hory.', highlights:['Kultura a tradice Nepálu','Šerpové a horské komunity','Praktické rady pro cestovatele'], date:'', location:'', link:'' },
  { id:'5osmi',        title:'5 osmitisícovek',            subtitle:'Expedice & příběhy',      duration:'60–90 min', audience:'Veřejné akce, festivaly, korporáty', desc:'Ucelený příběh o cestě na pět nejvyšších hor světa. Fotky a videa z expedic.', highlights:['Osmitisícovky v příbězích','Unikátní fotky z expedic','Q&A s Honzou'], date:'', location:'', link:'' },
  { id:'neha',         title:'Něha Himálaje',              subtitle:'S Petrem Janem Juračkou', duration:'75 min',    audience:'Veřejné akce, kulturní centra', desc:'Multimediální přednáška s unikátními fotografiemi Petra Jana Juračky.', highlights:['Film a kniha Něha Himálaje','Vizuální příběh Himálaje','Osobní setkání'], date:'', location:'', link:'' },
  { id:'ama',          title:'Ama Dablam',                 subtitle:'Horolezecká expedice',    duration:'60 min',    audience:'Horolezecké kluby, outdoor komunity', desc:'Detailní pohled na jednu z nejkrásnějších technických hor světa.', highlights:['Technická výprava','Logistika a příprava','Kritické momenty'], date:'', location:'', link:'' },
  { id:'jeste',        title:'Ještě jsme neskončili',      subtitle:'S Jiřím Langmajerem',    duration:'90 min',    audience:'Veřejné akce, divadla', desc:'Speciální pořad s Jiřím Langmajerem — dvě silné osobnosti, jeden rozhovor o životě.', highlights:['Rozhovor Honza Tráva & Jiří Langmajer','Témata odolnosti','Interaktivní formát'], date:'', location:'', link:'https://jestejsmeneskoncili.cz' },
  { id:'peak',         title:'Peakfest stories',           subtitle:'Festival & projekty',     duration:'60 min',    audience:'Festivaly, komunita', desc:'Příběhy z festivalu Peakfest a komunitních projektů kolem hor.', highlights:['Peakfest komunita','Projekty v horách','Sdílení zkušeností'], date:'', location:'', link:'https://peakfest.cz' },
  { id:'zdravi',       title:'Zdraví a život s nemocí',    subtitle:'Osvěta & osobní příběh', duration:'45–60 min', audience:'Zdravotní konference, HR, školy', desc:'O rakovině, artritidě a o tom, jak hory pomohly najít nový směr. Upřímné, vtipné i silné.', highlights:['Osobní příběh diagnózy','Cesta zpátky přes hory','Spolupráce s Revma Ligou a Fuck Cancer'], date:'', location:'', link:'' },
];

// DEF_PROJECTS = přesná kopie PROJECTS z Projects.jsx
const DEF_PROJECTS = [
  { id:'peakfest',       title:'Peakfest',                subtitle:'Festival workshopů & přednášek',           description:'Víkend plný workshopů a přednášek. Tipy a vychytávky na vybavení nejen do extrémních podmínek. Praktické ukázky první pomoci, pokec na téma dýchání, výšková nemoc a aklimatizace, doporučení věcí na treky a mnoho dalších netradičních témat.', highlights:['Workshopy a přednášky pro komunitu','Vybavení do extrémních podmínek','První pomoc & aklimatizace'], link:'https://peakfest.cz', date:'', location:'' },
  { id:'jsmeneskoncili', title:'Ještě jsme neskončili', subtitle:'Horký · Langmajer · Votava · Baran',        description:'Padesátníci stoupají nejen do hor. Co se stane, pokud si člověk chce plnit sny nehledě na věku. Projekt o životních pádech, návratech a síle jít dál.',                                                                                              highlights:['Projekt 4 silných osobností','Příběhy o odolnosti a smyslu','Touring po celé ČR'], link:'https://jestejsmeneskoncili.cz', date:'', location:'' },
  { id:'pjj',            title:'Petr Jan Juračka',       subtitle:'Film · Kniha · Budoucí projekty',           description:'Společné expedice, film Něha Himálaje i dlouholeté přátelství kolem hor a cest. Projekty budoucí — přelet Annapurny v balónu.',                                                                                                                     highlights:['Film a kniha Něha Himálaje','Přelet Annapurny v balónu','Dlouholeté přátelství'], link:'https://petr.juracka.eu', date:'', location:'' },
  { id:'horky',          title:'Petr Horký',             subtitle:'Filmy · Tiji Festival · Neskončili',         description:'Messner, dokument z Tiji Festivalu (ve střižně) a společný projekt Ještě jsme neskončili.',                                                                                                                                                      highlights:['Dokument Messner','Tiji Festival','Ještě jsme neskončili'], link:'', date:'', location:'' },
  { id:'audy',           title:'Marek Audy',             subtitle:'3D projekce · Multimediální projekty',      description:'3D projekce a společné multimediální projekty přibližující hory novým způsobem.',                                                                                                                                                                  highlights:['3D projekce z expedic','Multimediální prezentace','Nové formáty zážitků'], link:'', date:'', location:'' },
  { id:'forman',         title:'Petr Forman',            subtitle:'Divadlo · Audiokniha · COPATUTOJE',         description:'Divadlo, audiokniha a regionální projekt COPATUTOJE.',                                                                                                                                                                                              highlights:['Audiokniha Něha Himálaje','Divadelní fúze','COPATUTOJE'], link:'', date:'', location:'' },
  { id:'neha',           title:'Něha Himálaje',          subtitle:'Kniha · Film · Audio s PJJ',                 description:'Multimediální projekt mapující lidskou i horolezeckou tvář himálajských expedic.',                                                                                                                                                                  highlights:['Knižní publikace','Dokumentární film','Audiokniha'], link:'', date:'', location:'' },
  { id:'langos',         title:'Jiří Langmajer',         subtitle:'Přednášky · Ještě jsme neskončili',         description:'Netradiční spojení světa hor a divadla. Společné přednášky a projekt Jestejsmeneskoncili.',                                                                                                                                                         highlights:['Společné přednášky','JesteJsmeNeskoncili'], link:'', date:'', location:'' },
  { id:'tour2026',       title:'50 let tour',            subtitle:'Únor–březen 2026 · celá ČR',                description:'Velkolepá oslava 50. narozenin Honzy Trávy. Turné plné nejlepších příběhů, hostů a překvapení.',                                                                                                                                                   highlights:['Republikové turné','Nejlepší historky','Hosté & překvapení'], link:'', date:'2026-02-12', location:'' },
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
  // TV
  { id:'pr_ct24_2025',     type:'TV',      outlet:'ČT24',                       title:'Interview ČT24 — Jan „Tráva" Trávníček, horolezec a cestovatel',                        year:2025, date:'9. 2. 2025',      href:'https://www.ceskatelevize.cz/porady/10095426857-interview-ct24/225411058040209/' },
  { id:'pr_ct1_s6_2024',   type:'TV',      outlet:'ČT 1 Studio 6',              title:'Záchrana nepálského šerpy v Himaláji — delší reportáž',                                  year:2024, date:'20. 1. 2024',     href:'https://www.ceskatelevize.cz/porady/1096902795-studio-6/223411010101120/cast/1012270/' },
  { id:'pr_ct1_ud_2024',   type:'TV',      outlet:'ČT 1 Události',              title:'Záchrana nepálského šerpy — krátká reportáž v hlavních zprávách',                        year:2024, date:'19. 1. 2024',     href:'https://www.ceskatelevize.cz/porady/1097181328-udalosti/223411000101119/cast/1012232/' },
  { id:'pr_nova_2021',     type:'TV',      outlet:'TV Nova',                    title:'Skupinu Čechů v Nepálu skolil covid — online rozhovor z KTM',                            year:2021, date:'9. 5. 2021',      href:'https://tn.nova.cz/clanek/skupinu-cechu-v-nepalu-skolil-covid-nakazeny-je-i-horolezec-travnicek.html' },
  { id:'pr_ct_legenda',    type:'TV',      outlet:'Česká televize',             title:'S legendou přes hory — V Tiských stěnách s Márou Holečkem a Alenou Zárybnickou',         year:2018, date:'2018',            href:'https://www.ceskatelevize.cz/porady/14625565902-s-legendou-pres-hory/222471291185103/' },
  { id:'pr_ct1_gejzir',    type:'TV',      outlet:'ČT 1 Gejzír',               title:'Horolezec Jan Trávníček — dokument i s archivními záběry',                               year:2020, date:'5. 11. 2020',     href:'https://www.ceskatelevize.cz/porady/10805121298-gejzir/220562235000025/video/799482' },
  { id:'pr_prima_2020',    type:'TV',      outlet:'Prima COOL & ZOOM',          title:'COOL MOUNTAIN TRIP — Honza Tráva a Karel Kříž v Alpách',                                 year:2020, date:'11. 10. 2020',    href:'https://www.iprima.cz/filmy/cool-mountain-trip' },
  { id:'pr_ct24_2018',     type:'TV',      outlet:'ČT24',                       title:'Události, komentáře — Krásné a nebezpečné Himaláje',                                     year:2018, date:'říjen 2018',      href:'https://www.ceskatelevize.cz/porady/1096898594-udalosti-komentare/218411000371015/video/650559' },
  { id:'pr_sport5_2017',   type:'TV',      outlet:'TV Sport 5',                 title:'Obzory sportovních osobností — 15minutové „rozvažování" na téma hory',                   year:2017, date:'únor 2017',      href:'https://sport5.cz/extremni/obzory-sportovnich-osobnosti-2-c8b98938.html' },
  // Video
  { id:'pr_yt_hausbot24',  type:'Video',   outlet:'Hausbot Petra Horkého',      title:'Světový výstup zakončený tragédií — Mára Holeček a Honza Trávníček',                    year:2024, date:'19. 12. 2024',    href:'https://www.youtube.com/watch?v=7c4yMmcbBzw' },
  { id:'pr_nahorutv_2024', type:'Video',   outlet:'NaHoruTV',                   title:'Horolezec a nepálský hospodský Honza „Tráva" Trávníček',                                 year:2024, date:'22. 1. 2024',     href:'https://www.youtube.com/watch?v=jBWBaxCkZ9Q' },
  { id:'pr_yt_hausbot2',   type:'Video',   outlet:'YouTube — Petr Horký',       title:'Hausbot Petra Horkého — povídáme na střeše Czech Pubu',                                  year:2024, date:'2024',            href:'https://www.youtube.com/watch?v=AvjcrNsAB90' },
  { id:'pr_yt_skialpech',  type:'Video',   outlet:'YouTube — Jirka Votava',     title:'Na skialpech s Jirkou Langmajerem',                                                       year:2021, date:'2021',            href:'https://www.youtube.com/watch?v=qTxYfK3ZE-s' },
  { id:'pr_yt_kozelka',    type:'Video',   outlet:'Hannibal produkce',          title:'Kolem Skal! — 7. KOZELKA',                                                                year:2020, date:'11. 11. 2020',    href:'https://www.hanibal.cz/clanek/16516/kolem-skal-7-kozelka/' },
  { id:'pr_yt_srdcari',    type:'Video',   outlet:'Srdcaři',                    title:'S kopcolezcem o hranicích alpinismu — příjemný rozhovor',                                 year:2020, date:'2020',            href:'https://www.youtube.com/watch?v=ZQlvteuwFQE' },
  { id:'pr_revma_vid20',   type:'Video',   outlet:'Revmatické nemoci.cz',       title:'Život s psoriázou — „Jsem extrémní sportovec"',                                          year:2020, date:'29. 11. 2020',    href:'https://www.revmaticke-nemoci.cz/videa-psorioza/jsem-extremni-sportovec-rika-honza-travnicek-i-po-15lete-znamosti-s-kloubni-lupenkou-1534' },
  { id:'pr_yt_dvorak',     type:'Video',   outlet:'Rise and Shine — Osobní Rozvoj', title:'Dvojrozhovor s Tomášem Dvořákem',                                                    year:2020, date:'9. 8. 2020',      href:'https://www.youtube.com/watch?v=o9JFp1EWyf8' },
  { id:'pr_yt_onsajt',     type:'Video',   outlet:'Hannibal produkce',          title:'Onsajt — medailonek pohledem Jana Šimánka',                                              year:2020, date:'2020',            href:'https://www.youtube.com/watch?v=_AH_TbNDNUI' },
  { id:'pr_yt_travel13',   type:'Video',   outlet:'Travel Journal',             title:'S Honzou Trávníčkem (nejen) na Gasherbrumu',                                              year:2013, date:'duben 2013',      href:'https://www.youtube.com/watch?v=5gSfhvcdAJ4' },
  { id:'pr_yt_anna12',     type:'Video',   outlet:'Horydoly.cz',                title:'Tráva: Annapurna 2012 — „nejtěžší, co jsem v horách šel"',                               year:2012, date:'červen 2012',     href:'https://www.youtube.com/watch?v=Q6YnXVDNEe0' },
  { id:'pr_revma_vid12',   type:'Video',   outlet:'revmatické-nemoci.cz',       title:'S psoriázou na vrchol osmitisícovky — rozhovor s MUDr. Havlíčkem',                        year:2012, date:'2012',            href:'https://www.revmaticke-nemoci.cz/videa/s-proriazou-na-vrchol-osmitisicovky-741' },
  { id:'pr_yt_miri14',     type:'Video',   outlet:'YouTube',                    title:'Slack hovor s Miroslavou Jirkovou — rozhovor o highlinu',                                 year:2014, date:'27. 12. 2014',    href:'https://www.youtube.com/watch?v=qUFlE927gUc' },
  // Podcast
  { id:'pr_denik_pod22',   type:'Podcast', outlet:'Podcast Deník.cz',           title:'Na lupénku pomáhá biologická léčba — horolezec vozí injekce v termosce',                 year:2022, date:'9. 12. 2022',     href:'https://www.denik.cz/zdravi/podcast-lupenka-horolezec-honza-travnicek-injekce.html' },
  { id:'pr_smyslulne20',   type:'Podcast', outlet:'Smysluplné rozhovory',       title:'Hory nejde „dobýt" — rozhovor o životě, horách a Nepálu',                                year:2020, date:'20. 10. 2020',    href:'https://open.spotify.com/episode/1LWFzJOP7ig7cdeBPvfMev' },
  { id:'pr_sportpod21',    type:'Podcast', outlet:'Sport a podnikání',          title:'Od sportu si můžu odskočit a vydělat si i jinde',                                         year:2021, date:'6. 5. 2021',      href:'https://sportapodnikani.cz/rozhovory/jan-travnicek/' },
  { id:'pr_blesk_pod21',   type:'Podcast', outlet:'Blesk',                      title:'Horolezec Trávníček vylezl s rakovinou na 2 osmitisícovky — teď otevírá českou hospodu', year:2021, date:'17. 2. 2021',     href:'https://www.blesk.cz/clanek/zpravy-pribehy/669580/podcast-horolezec-travnicek-vylezl-s-rakovinou-na-2-osmitisicovky-ted-otevira-ceskou-hospodu-v-nepalu.html' },
  // Rádio
  { id:'pr_crplus_2025',   type:'Rádio',   outlet:'ČR Plus',                    title:'Jsem tam v práci, říká o Nepálu horolezec Trávníček',                                    year:2025, date:'14. 11. 2025',    href:'https://www.mujrozhlas.cz/hovory/jsem-tam-v-praci-rika-o-nepalu-horolezec-travnicek-broad-peak-chce-zdolat-znovu-tentokrat' },
  { id:'pr_wave_casabl',   type:'Rádio',   outlet:'Rádio Wave — Casablanca',    title:'Na Nepál jeden život nestačí — šrámy i radosti z hor',                                   year:2021, date:'2021',            href:'https://wave.rozhlas.cz/na-nepal-jeden-zivot-nestaci-horolezec-honza-trava-travnicek-o-sramech-i-9197206' },
  { id:'pr_cro_zalety',    type:'Rádio',   outlet:'Český rozhlas — Zálety',     title:'Horolezec Honza Trávníček: Doufám, že důchod strávím v Nepálu',                          year:2021, date:'2021',            href:'https://pardubice.rozhlas.cz/horolezec-honza-travnicek-doufam-ze-duchod-stravim-v-nepalu-8729308' },
  { id:'pr_cro_potme21',   type:'Rádio',   outlet:'Český rozhlas — Světluška',  title:'PO TMĚ — Jan „Tráva" Trávníček a Jan Říha: Výška mi nevadí, důležité je vylézt nahoru',  year:2021, date:'8. 7. 2021',      href:'https://www.mujrozhlas.cz/potme/jan-trava-travnicek-jan-riha-ze-nevidim-panoramata-mi-nevadi-pro-me-je-dulezite-vylezt-nahoru' },
  { id:'pr_cro_dab21',     type:'Rádio',   outlet:'Český rozhlas DAB',          title:'Mám to v hlavě srovnané, proto pořád žiju — pořad Až na dřeň',                          year:2021, date:'25. 4. 2021',     href:'https://dabpraha.rozhlas.cz/mam-v-hlave-srovnane-proto-porad-ziju-rika-horolezec-jan-travnicek-ktery-zdolal-8474007' },
  { id:'pr_cro_voldany',   type:'Rádio',   outlet:'Český rozhlas HK & Pardubice', title:'Na cestách s Petrem Voldánem — Pět pokusů a pět zdolaných osmitisícovek',             year:2020, date:'5. 10. 2020',     href:'https://hradec.rozhlas.cz/na-cestach-s-horolezcem-janem-travou-travnickem-aneb-pet-pokusu-a-pet-zdolanych-8331480' },
  { id:'pr_cro_rakovina',  type:'Rádio',   outlet:'Radiožurnál',                title:'Mám s rakovinou příměří — Olympijský podcast o Makalu a nemoci',                         year:2020, date:'2020',            href:'https://radiozurnal.rozhlas.cz/node/8198103/share' },
  { id:'pr_cro_hk19',      type:'Rádio',   outlet:'Český rozhlas Hradec Králové', title:'Dobrý horolezec je ten, co přežil a vrátil se dolů',                                 year:2019, date:'22. 11. 2019',    href:'https://hradec.rozhlas.cz/dobry-horolezec-je-ten-co-prezil-a-vratil-se-dolu-jan-travnicek-neni-zadny-8111613' },
  { id:'pr_cro_plzen19',   type:'Rádio',   outlet:'Český rozhlas Plzeň',        title:'Vrchol hory nezdolávám, hora mě tam musí pustit',                                        year:2019, date:'26. 7. 2019',     href:'https://plzen.rozhlas.cz/vrchol-hory-nezdolavam-hora-me-tam-musi-pustit-8024339' },
  { id:'pr_cro_plzen16b',  type:'Rádio',   outlet:'Český rozhlas Plzeň',        title:'Náš host — O návratu z Cho Oyu i s Miri',                                               year:2016, date:'prosinec 2016',   href:'https://prehravac.rozhlas.cz/audio/3760270' },
  { id:'pr_cro_junior16',  type:'Rádio',   outlet:'Český rozhlas — Rádio Junior', title:'Klub Rádia Junior — O horském životě nejen pro juniory',                              year:2016, date:'únor 2016',       href:'https://prehravac.rozhlas.cz/audio/3575195' },
  { id:'pr_cro_plzen16a',  type:'Rádio',   outlet:'Český rozhlas Plzeň',        title:'Náš host — Chystáme se do Tibetu (rozhovor s Miri)',                                    year:2016, date:'květen 2016',     href:'https://prehravac.rozhlas.cz/audio/3639577' },
  { id:'pr_cro2_2014',     type:'Rádio',   outlet:'Český Rozhlas 2',            title:'Host do domu — rozhovor s Martinou Kociánovou',                                          year:2014, date:'září 2014',       href:'https://prehravac.rozhlas.cz/audio/3203942' },
  { id:'pr_radiozurnal14', type:'Rádio',   outlet:'Radiožurnál',                title:'Host Lucie Výborné — společný rozhovor s Radkem Jarošem po K2',                         year:2014, date:'srpen 2014',      href:'https://prehravac.rozhlas.cz/audio/3182093' },
  { id:'pr_cro_hk14',      type:'Rádio',   outlet:'Český rozhlas Hradec Králové', title:'PéHáčko — páteční host Habaděje',                                                    year:2014, date:'únor 2014',       href:'https://prehravac.rozhlas.cz/audio/3315030' },
  { id:'pr_cro_plzen12',   type:'Rádio',   outlet:'Český rozhlas Plzeň',        title:'Náš host — O Annapurně a dalších plánech',                                               year:2012, date:'listopad 2012',   href:'https://prehravac.rozhlas.cz/audio/2777099' },
  // Online
  { id:'pr_crunch_2026',   type:'Online',  outlet:'Czech Crunch',               title:'Do Himálaje vozí stovky lidí, má tam českou hospodu i hotel — jsou 20 let pozadu, ale je to ráj', year:2026, date:'3. 1. 2026', href:'https://cc.cz/do-himalaje-vozi-stovky-lidi-ma-tam-ceskou-hospodu-i-hotel-jsou-20-let-pozadu-ale-je-to-raj-rika/' },
  { id:'pr_aktualne25',    type:'Online',  outlet:'Aktuálně.cz',                title:'Jaký jsem hospodský — Vozit pivo do Nepálu je jako nosit dříví do lesa',                 year:2025, date:'6. 1. 2025',      href:'https://magazin.aktualne.cz/czech-pub-himalaj/r~d663a8b8be1e11efbb77ac1f6b220ee8/' },
  { id:'pr_idnes_2024a',   type:'Online',  outlet:'iDnes',                      title:'Žádná cukrová vata, jen vzácné rady — Peak fest',                                        year:2024, date:'6. 9. 2024',      href:'https://www.idnes.cz/liberec/zpravy/festival-osada-jizerka-rady-do-hor-prvni-pomoc-extremni-podminky.A240906_816881_liberec-zpravy_cink' },
  { id:'pr_plzdenik24',    type:'Online',  outlet:'Plzeňský deník',             title:'S rakovinou Plzeňan Trávníček uzavřel příměří, teď zvládl šestou osmitisícovku',         year:2024, date:'24. 8. 2024',     href:'https://plzensky.denik.cz/zpravy_region/rakovina-jan-travnicek-plzen-horolezec.html' },
  { id:'pr_emontana24',    type:'Online',  outlet:'Emontana',                   title:'Vyrážíme s nepálskými parťáky — Honza „Tráva" Trávníček o expedici Broad Peak 2024',     year:2024, date:'27. 6. 2024',     href:'https://www.emontana.cz/honza-travnicek-rozhovor-k2-broad-peak/' },
  { id:'pr_idnes_2024b',   type:'Online',  outlet:'iDnes',                      title:'Štěstí, že sehnali volný vrtulník — Češi v Himálaji zachraňovali svého šerpu',            year:2024, date:'5. 4. 2024',      href:'https://www.idnes.cz/liberec/zpravy/ama-dablam-nepal-serpa-zachrana-expedice-cesi-hory-himalaj.A240131_773819_liberec-zpravy_lav' },
  { id:'pr_barbar_2024',   type:'Online',  outlet:'Časopis Barbar',             title:'Kopcolezec s českou hospodou v Nepálu',                                                   year:2024, date:'18. 1. 2024',     href:'https://www.casopisbarbar.cz/osobnosti/kopcolezec-s-ceskou-hospodou-v-nepalu' },
  { id:'pr_idnes_2023',    type:'Online',  outlet:'iDnes',                      title:'Když se poddáte, končíte. Chytne vás chaos, říká o rakovině horolezec Trávníček',        year:2023, date:'8. 5. 2023',      href:'https://www.idnes.cz/xman/rozhovory/honza-trava-travnicek-nepal-horolezec-expedice.A230405_180252_xman-rozhovory_albe' },
  { id:'pr_denik_2022',    type:'Online',  outlet:'Deník.cz',                   title:'Lupénka českého horolezce úplně odrovnala. Nyní znovu zdolává osmitisícovky',             year:2022, date:'29. 10. 2022',    href:'https://www.denik.cz/zdravi/lupenka-psoriaza-horolezec-jan-travnicek.html' },
  { id:'pr_aktualne21b',   type:'Online',  outlet:'Aktuálně.cz',                title:'Spor o vrchol Hory ducha — politicko-byznysová hra, říká horolezec',                     year:2021, date:'7. 10. 2021',     href:'https://sport.aktualne.cz/ostatni-sporty/travnicek-hora-ducha-manaslu/r~ce58945226d811ecbc3f0cc47ab5f122/' },
  { id:'pr_idnes_2021',    type:'Online',  outlet:'iDnes / Téma',               title:'Tým je důležitý. Na osmitisícovce je ale každý sám za sebe',                             year:2021, date:'11. 6. 2021',     href:'https://www.idnes.cz/cestovani/kolem-sveta/jan-travnicek-horolezec-cestovatel-nepal-mount-everest-k2.A210610_122754_xman-adrenalin_lisv' },
  { id:'pr_forbes_2021',   type:'Online',  outlet:'Forbes',                     title:'Plzeň a smažák pod Himalájem — Jak horolezci otevřeli Czech Pub v Nepálu',               year:2021, date:'9. 5. 2021',      href:'https://forbes.cz/plzen-a-smazak-pod-himalaji-jak-horolezci-otevreli-czech-pub-v-nepalu/' },
  { id:'pr_aktualne21a',   type:'Online',  outlet:'Aktuálně.cz',                title:'Covid se šíří i pod Everestem — Nepálci podcenili situaci',                              year:2021, date:'8. 5. 2021',      href:'https://sport.aktualne.cz/ostatni-sporty/covid-v-nepalu/r~be499736af4711eb9f15ac1f6b220ee8/' },
  { id:'pr_blesk_k2_20',   type:'Online',  outlet:'Blesk',                      title:'„Jediný Čech, který vylezl na K2 s rakovinou" — odmítl se poddat těžké nemoci',          year:2020, date:'13. 10. 2020',    href:'https://www.blesk.cz/clanek/zpravy-udalosti/653008/jediny-cech-ktery-vylezl-na-k2-s-rakovinou-honza-44-se-odmitl-poddat-tezke-nemoci.html' },
  { id:'pr_lidovky20b',    type:'Online',  outlet:'Lidovky',                    title:'Jediná Češka, která leze na osmitisícovky bez kyslíku (Miri)',                           year:2020, date:'7. 10. 2020',     href:'https://www.lidovky.cz/lide/jedina-ceska-ktera-leze-na-osmitisicovky-bez-kysliku-vyska-je-miste-ktere-me-spojuje-s-mym-vlastnim.A201005_194407_lide_ape' },
  { id:'pr_lidovky20a',    type:'Online',  outlet:'Lidovky',                    title:'Jakou míru vážnosti nemoci přisoudíte, takovou má — horolezec bojující s rakovinou',     year:2020, date:'20. 5. 2020',     href:'https://www.lidovky.cz/lide/jakou-miru-vaznosti-nemoci-prisoudite-takovou-ma-rika-cesky-horolezec-bojujici-s-rakovinou.A200515_105328_lide_ape' },
  { id:'pr_rp_blog20',     type:'Online',  outlet:'Rock Point Blog',            title:'Blog Rock Point — mnoho rozhovorů (ambasador RP)',                                        year:2020, date:'2020',            href:'https://www.rockpoint.cz/blog-zona?id_tag=34' },
  { id:'pr_idnes_2018b',   type:'Online',  outlet:'iDnes',                      title:'Pátrání po ztraceném krajanovi rozjel v Himálaji plzeňský horolezec',                    year:2018, date:'říjen 2018',      href:'https://plzen.idnes.cz/jan-travnicek-horolezec-himalaj-hora-manaslu-pohresovany-patrani-hlavka-14s-/plzen-zpravy.aspx?c=A181006_431253_plzen-zpravy_vb' },
  { id:'pr_georevue17',    type:'Online',  outlet:'Georevue',                   title:'Osma se na plán neptá — „geodetický" rozhovor o horách',                                 year:2017, date:'březen 2017',     href:'https://hrdlicka.cz/georevue/nas-geodet-j-travnicek-cho-oyu-osma-se-plan-nepta/' },
  { id:'pr_nachod17',      type:'Online',  outlet:'Náchodský deník',            title:'Je to o tom, mít někoho, kdo vás povede',                                                year:2017, date:'březen 2017',     href:'https://nachodsky.denik.cz/ostatni_region/je-to-o-tom-mit-nekoho-kdo-vas-povede-20170314.html' },
  { id:'pr_prosport16',    type:'Online',  outlet:'Prosport',                   title:'Expedice Cho Oyu chronologicky — téměř den po dni',                                      year:2016, date:'říjen 2016',      href:'https://www.prosport.cz/lowa/novinky/271' },
  { id:'pr_lezec16',       type:'Online',  outlet:'lezec.cz',                   title:'S nevidomým Honzou Říhou na cestě na Cho Oyu (8201 m)',                                  year:2016, date:'září 2016',       href:'http://www.lezec.cz/clanek.php?key=13192' },
  { id:'pr_rp_miri16',     type:'Online',  outlet:'Rock Point',                 title:'S Miri na slovíčko...',                                                                   year:2016, date:'červen 2016',     href:'https://www.rockpoint.cz/na-slovicko-s-miri' },
  { id:'pr_lezec15',       type:'Online',  outlet:'lezec.cz',                   title:'C4 — situace expedice Namaslu 2015',                                                      year:2015, date:'říjen 2015',      href:'http://www.lezec.cz/clanek.php?key=12537' },
  { id:'pr_eldiario14',    type:'Online',  outlet:'eldiario.es',                title:'El checo Jan Travnicek, friend de Ternua, comienza su expedición al K2',                 year:2014, date:'červenec 2014',   href:'https://www.eldiario.es/campobase/noticias/Jan_Travnicek-Ternua-K2_0_277872416.html' },
  { id:'pr_svetout14',     type:'Online',  outlet:'Svět Outdooru',              title:'Posledních pár let směřuji k tréninku a přípravě na expedice',                           year:2014, date:'březen 2014',     href:'https://www.svetoutdooru.cz/serialy/15932-honza-trava-travnicek-cely-svuj-zivot-smeruji-k-treninku-priprave-a-vydelavani-penez-na-expedice/' },
  { id:'pr_pohora13',      type:'Online',  outlet:'Pohora',                     title:'Honza Tráva Trávníček před K2: Zatím to vůbec neřešíme',                                 year:2013, date:'prosinec 2013',   href:'https://www.pohora.cz/horolezectvi/honza-trava-travnicek-pred-k2-zatim-to-vubec-neresime/' },
  { id:'pr_lezec12a',      type:'Online',  outlet:'lezec.cz',                   title:'Přeci mu nezkazím den — Jaroš a Tráva na Annapurně',                                     year:2012, date:'červen 2012',     href:'http://www.lezec.cz/clanek.php?key=10288' },
  { id:'pr_iroz12',        type:'Online',  outlet:'iRozhlas',                   title:'Horolezec Trávníček po Annapurně: Na Everest nikdy nepůjde',                             year:2012, date:'červen 2012',     href:'https://www.irozhlas.cz/sport_ostatni-sporty/horolezec-travnicek-se-po-zdolani-annapurny-zarekl-ze-na-everest-nikdy-nepujde_201206011908_jkanta' },
  { id:'pr_lezec11b',      type:'Online',  outlet:'lezec.cz',                   title:'Expedice Manaslu 2011 — vyprávění o vrcholu',                                             year:2011, date:'srpen 2011',      href:'http://www.lezec.cz/clanky.php?key=9646' },
  { id:'pr_lezec11a',      type:'Online',  outlet:'lezec.cz',                   title:'Expedice Manaslu — expedice odlétá',                                                      year:2011, date:'březen 2011',     href:'http://www.lezec.cz/clanky.php?key=9342' },
  { id:'pr_lezec10',       type:'Online',  outlet:'lezec.cz',                   title:'Jak se Tráva na osmitisícovku vyškrábal',                                                 year:2010, date:'srpen 2010',      href:'http://www.lezec.cz/clanky.php?key=8398' },
  { id:'pr_plzdenik09',    type:'Online',  outlet:'Plzeňský deník',             title:'Plzeňští horolezci míří do pohoří Karákoram',                                             year:2009, date:'červen 2009',     href:'https://plzensky.denik.cz/zpravy_region/plzensti-horolezci-miri-do-pohori-karakoram.html' },
  { id:'pr_lezec09',       type:'Online',  outlet:'lezec.cz',                   title:'Expedice Gasherbrum I',                                                                   year:2009, date:'červen 2009',     href:'http://www.lezec.cz/clanek.php?key=6846' },
  // Tisk
  { id:'pr_kult22',        type:'Tisk',    outlet:'KULT',                       title:'KULT — Workoholik s budhistickou pokorou v duši',                                         year:2022, date:'listopad 2022',   href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/retro_kult_03-1-1.pdf' },
  { id:'pr_ivitro21',      type:'Tisk',    outlet:'iVitro (SK)',                 title:'Netúžil som len športovať, chcel som sa hýbať',                                          year:2021, date:'2021',            href:'https://issuu.com/alphamedicalinvitro/docs/_web_invitro_3-2021/40' },
  { id:'pr_montana21',     type:'Tisk',    outlet:'Montana',                    title:'Regenerací k trvalému sportu — o přípravě na expedice',                                   year:2021, date:'září 2021',       href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Trava_montana.pdf' },
  { id:'pr_travel21',      type:'Tisk',    outlet:'Travel life',                title:'Horní Mustang — zakázané království',                                                     year:2021, date:'březen 2021',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/trava_rozhovor_travel_petragerif.pdf' },
  { id:'pr_metro_miri20',  type:'Tisk',    outlet:'Deník Metro',                title:'Strach je jeden z mých nejlepších kamarádů — Miroslava Jirková',                         year:2020, date:'23. 10. 2020',    href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/metro_miri_23_10_2020.jpeg' },
  { id:'pr_skylink20',     type:'Tisk',    outlet:'Skylink',                    title:'Kopce a čerstvý vzduch mi pomohly k uzdravení',                                           year:2020, date:'červen 2020',     href:'https://read.skylink.cz/cz-13-2020/rozhovor-s-horolezcem-janem-travnickem/' },
  { id:'pr_metro20',       type:'Tisk',    outlet:'Deník Metro',                title:'Hlava je mocný pomocník, ale...',                                                         year:2020, date:'7. 5. 2020',      href:'https://e.metro.cz/#strana=14' },
  { id:'pr_svetsportu20',  type:'Tisk',    outlet:'Svět sportu',                title:'Nepál je návykový — velký rozhovor do sportovního časopisu',                              year:2020, date:'duben 2020',      href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Svet-sportu-2_2020-1.pdf' },
  { id:'pr_idnes_mera19',  type:'Tisk',    outlet:'iDnes',                      title:'Výstup na Mera Peak — Nepál (zápisky Petra Havránka)',                                    year:2019, date:'podzim 2019',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Nepal_2019_text_petr.pdf' },
  { id:'pr_lhory18',       type:'Tisk',    outlet:'lidé&HORY',                  title:'Nehody v horách — Manáslu 2018',                                                          year:2018, date:'prosinec 2018',   href:'https://www.honzatravnicek.cz/wp-content/uploads/2019/01/Tráva_Manaslu_nehoda.pdf' },
  { id:'pr_lhory17',       type:'Tisk',    outlet:'lidé&HORY',                  title:'Expedice Cho Oyu 2016 — jak to všechno dopadlo',                                          year:2017, date:'červen 2017',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Expdice-Cho-Oyu-2016-lideaHORY-cerven-2017.pdf' },
  { id:'pr_mfdnes16',      type:'Tisk',    outlet:'MF Dnes Víkend',             title:'Na život na smrt — Cena Fair play',                                                       year:2016, date:'duben 2016',      href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Na-zivot-a-na-smrt.pdf' },
  { id:'pr_zdravie16',     type:'Tisk',    outlet:'Zdravie (SK)',                title:'Môj výstup na obrubník — obsáhlý rozhovor o lupénce',                                    year:2016, date:'2016',            href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Moj-vystup-na-obrubnik-Zdravie-2016.pdf' },
  { id:'pr_lhory15b',      type:'Tisk',    outlet:'lidé&HORY',                  title:'S Trávou na osmitisícovku VI — Z Cho Oyu se vylíhla Manaslu!',                           year:2015, date:'prosinec 2015',   href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/S-Travou-na-osmitisicovku-VI.pdf' },
  { id:'pr_mfdnes15',      type:'Tisk',    outlet:'MF Dnes',                    title:'Drama horolezců. Na Manáslu zachraňovali kolegy',                                         year:2015, date:'listopad 2015',   href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Drama-horolezcu_Na-Manaslu-zachranovali-kolegy-MF-Dnes-listopad-2015.pdf' },
  { id:'pr_lhory15a',      type:'Tisk',    outlet:'lidé&HORY',                  title:'S Trávou na osmitisícovku I — Plán zní jasně: Cho Oyu 2015',                             year:2015, date:'únor 2015',       href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/S-Travou-na-osmitisicovku-I.pdf' },
  { id:'pr_plzmfdnes14',   type:'Tisk',    outlet:'Plzeňská MF Dnes',           title:'Na K2 bylo plno, někde se dělala i fronta',                                               year:2014, date:'srpen 2014',      href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Na-K2-bylo-plno-nekde-se-delala-i-fronta.pdf' },
  { id:'pr_respekt12',     type:'Tisk',    outlet:'Respekt',                    title:'Stan, spacák a pohoda — rozhovor do Respektu',                                            year:2012, date:'červen 2012',     href:'https://www.respekt.cz/tydenik/2012/23/stan-spacak-a-pohoda' },
  { id:'pr_lhory12',       type:'Tisk',    outlet:'lidé&HORY',                  title:'Na návštěvě u Aničky — Annapurna očima Radka Jaroše a Honzy Trávy',                      year:2012, date:'duben 2012',      href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Na-navsteve-u-Anicky-lideaHory-duben-2012.pdf' },
  { id:'pr_plzdenik12',    type:'Tisk',    outlet:'Plzeňský deník',             title:'Jan Trávníček: Annapurna bylo docela peklo',                                              year:2012, date:'červen 2012',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Jan-Travnicek_Annapurna-bylo-docela-peklo-denik-cerven-2012.pdf' },
  { id:'pr_everest11',     type:'Tisk',    outlet:'Everest',                    title:'S Honzou Trávou o výpravě na Manaslu 2011',                                               year:2011, date:'podzim 2011',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/S-Honzou-Travou-o-vyprave-na-Manaslu-2011.pdf' },
  { id:'pr_plzdenik09b',   type:'Tisk',    outlet:'Plzeňský deník',             title:'Chystají se na osmitisícovku',                                                            year:2009, date:'červenec 2009',   href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Chystaji-se-na-osmitisicovku.pdf' },
];

const DEF_TEXTS = {
  about: {
    tagline: 'Honza Tráva — profesionální dobrodruh',
    title: 'Horolezec. Cestovatel. Průvodce.',
    description: 'Výstupy na osmitisícovky, expedice do Himálaje, vlastní hotel a pub v Káthmándú, přednáškové turné po celé republice. Honza Tráva žije naplno — a zve vás s sebou.',
  },
  miri: {
    name: 'Miri Jirková',
    role: 'Trek & Logistika',
    tagline: 'Průvodkyně & Logistika',
    bio1: 'Miri je zkušená horolezkyně, průvodkyně a člověk, bez kterého by většina našich cest do Nepálu nevypadala tak, jak vypadá.',
    bio2: 'Má za sebou řadu vysokohorských expedic, výstupy na šestitisícové i sedmitisícové vrcholy a tisíce kilometrů po nepálských trecích. Společně s Trávou tráví v Nepálu dlouhé měsíce, díky čemuž zná nejen horské stezky, ale i místní kulturu, lidi a každodenní život mimo turistické trasy.',
    bio3: 'Ve výpravách se stará o logistiku, bezpečí i fungování celé skupiny — často právě o věci, které nejsou na první pohled vidět, ale rozhodují o tom, jak se lidé na cestě opravdu cítí. Díky zkušenostem z vysokých hor umí zachovat klid v náročných situacích a vytvořit pohodu i daleko od civilizace. Na himálajských cestách se naučila respektu, vnímání rizika a pokoře vůči horám.',
    bio4: 'Nepál pro ni dávno není jen destinace. Je to druhý domov, ke kterému má hluboký vztah a který pomáhá ostatním poznávat autenticky, s respektem a bez zbytečného pozlátka.',
    tags: ['Šestitisícovky & sedmitisícovky', 'Tisíce km na trecích', 'Logistika & bezpečí'],
    images: [],
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
    images: [],
  },
};

// DEF_STORY = přesná kopie DEF_STORY_LOCAL z About.jsx
const DEF_STORY = {
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

// DEF_OSVETA = přesná kopie DEF_OSVETA_LOCAL z About.jsx
const DEF_OSVETA = {
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

const DEF_PROMO = [
  { id:'promopack2024',   name:'Promopack fotek Honza Tráva a Miri 2024',          type:'ZIP', url:'' },
  { id:'peakfest',        name:'Info k festivalu na Jizerce PEAK fest ZHORDOHOR',  type:'PDF', url:'' },
  { id:'plakat-cz',       name:'Promoplakát s životopisem Honza Tráva — česky',    type:'PDF', url:'' },
  { id:'plakat-en',       name:'Promoplakát s životopisem Honza Tráva — anglicky', type:'PDF', url:'' },
  { id:'promopack-honza', name:'Promopack fotek Honza Tráva',                      type:'ZIP', url:'' },
  { id:'promopack-miri',  name:'Promopack fotek Miri',                             type:'ZIP', url:'' },
  { id:'plakat-cz-tisk',  name:'Promoplakát s životopisem Honza Tráva — česky TISKOVÁ VERZE',    type:'PDF', url:'' },
  { id:'plakat-en-tisk',  name:'Promoplakát s životopisem Honza Tráva — anglicky TISKOVÁ VERZE', type:'PDF', url:'' },
  { id:'sponzor-cz',      name:'Nabídka pro sponzory (česky)',                     type:'PDF', url:'' },
  { id:'sponzor-en',      name:'Nabídka pro sponzory (anglicky)',                  type:'PDF', url:'' },
  { id:'prednasky-nabidka',name:'Nabídka projekcí a přednášek',                   type:'PDF', url:'' },
  { id:'broadpeak-k2',    name:'Nabídka na spolupráci na Expedici Broad Peak a K2',type:'PDF', url:'' },
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

function ImagePicker({ imageUrl, onChangeImageUrl, label }) {
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
        <Image className="w-3 h-3" /> {label || 'Obrázek'}
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

/* ─── FocalPicker ───────────────────────────────────────────── */
function FocalPicker({ imageUrl, focalX = 50, focalY = 50, onChange, label = 'Ohnisko fotky (focuspoint)' }) {
  const imgRef = useRef(null);
  if (!imageUrl) return null;

  const handleClick = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    onChange({ focalX: x, focalY: y });
  };

  const presets = [
    { label: 'Střed',  x: 50, y: 50 },
    { label: 'Nahoře', x: 50, y: 20 },
    { label: 'Dole',   x: 50, y: 80 },
    { label: 'Vlevo',  x: 20, y: 50 },
    { label: 'Vpravo', x: 80, y: 50 },
  ];

  return (
    <div className="mt-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl flex flex-col gap-2.5">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
        {label}
      </p>
      <div className="flex gap-3 items-start">
        {/* Kliknutelný náhled */}
        <div className="shrink-0 relative rounded-lg overflow-hidden border border-slate-600 cursor-crosshair"
             style={{ width: 120, height: 80 }} onClick={handleClick}>
          <img ref={imgRef} src={imageUrl} alt="" className="w-full h-full object-cover"
               style={{ objectPosition: `${focalX}% ${focalY}%` }} draggable={false} />
          {/* Focal indicator */}
          <div className="absolute pointer-events-none"
               style={{ left: `${focalX}%`, top: `${focalY}%`, transform: 'translate(-50%,-50%)' }}>
            <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg bg-red-500/75" />
          </div>
          <p className="absolute bottom-1 right-1 text-[9px] text-white/60 bg-black/50 px-1 rounded">klikni</p>
        </div>
        {/* Ovládání */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-2">
            {presets.map(p => (
              <button key={p.label} onClick={() => onChange({ focalX: p.x, focalY: p.y })}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border transition-all ${focalX === p.x && focalY === p.y ? 'bg-gold-500 text-slate-900 border-gold-500' : 'bg-slate-700 text-slate-400 border-slate-600 hover:border-slate-400'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <label className="flex-1">
              <span className="text-[9px] text-slate-500 block mb-0.5">Horizontální {focalX}%</span>
              <input type="range" min="0" max="100" value={focalX}
                onChange={e => onChange({ focalX: Number(e.target.value), focalY })}
                className="w-full h-1 accent-gold-500 cursor-pointer" />
            </label>
            <label className="flex-1">
              <span className="text-[9px] text-slate-500 block mb-0.5">Vertikální {focalY}%</span>
              <input type="range" min="0" max="100" value={focalY}
                onChange={e => onChange({ focalX, focalY: Number(e.target.value) })}
                className="w-full h-1 accent-gold-500 cursor-pointer" />
            </label>
          </div>
          <p className="text-[9px] text-slate-600 mt-1.5">Platí pro desktop i mobil · {focalX}% {focalY}%</p>
        </div>
      </div>
    </div>
  );
}

/* ─── ImagePickerWithFocal ──────────────────────────────────── */
function ImagePickerWithFocal({ imageUrl, onChangeImageUrl, focalX = 50, focalY = 50, onChangeFocal, label }) {
  return (
    <div className="flex flex-col gap-0">
      <ImagePicker imageUrl={imageUrl} onChangeImageUrl={onChangeImageUrl} label={label} />
      <FocalPicker imageUrl={imageUrl} focalX={focalX} focalY={focalY} onChange={onChangeFocal || (() => {})} />
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
  const move = (i, dir) => {
    const a = [...data]; const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; onChange(a);
    setSel(j);
  };
  const add = () => {
    const newP = { id: genId(), name: 'Nový partner', partnership: '', discount: '', websiteUrl: '', website: '', quote: '', description: '', collaboration: [], imageId: '', imageUrl: '', logoUrl: '', flagColor: '#1a3a5c' };
    onChange([...data, newP]);
    setSel(data.length);
  };

  return (
    <div>
      <SectionHeader title="Partneři & Sponzoři" subtitle="Hlavní i vedlejší partneři, slevové kódy, vlajky a pořadí" onReset={onReset} />
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-1">{data.length} partnerů · pořadí = pořadí vlajek</p>
          <div className="flex flex-col gap-1">
            {data.map((item, i) => (
              <div key={item.id || i} className={`flex items-center gap-1 px-3 py-2.5 rounded-xl text-sm transition-all border cursor-pointer ${
                sel === i ? 'bg-gold-500/15 border-gold-500/40 text-gold-300' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
              }`} onClick={() => setSel(i)}>
                {item.flagColor && (
                  <span className="w-3 h-3 rounded-full shrink-0 border border-white/20" style={{ background: item.flagColor }} />
                )}
                <span className="flex-1 font-medium truncate">{item.name || `Partner ${i + 1}`}</span>
                <div className="flex items-center gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-slate-600 hover:text-white disabled:opacity-20 transition-colors"><MoveUp className="w-3 h-3" /></button>
                  <button onClick={() => move(i, 1)} disabled={i === data.length - 1} className="p-1 text-slate-600 hover:text-white disabled:opacity-20 transition-colors"><MoveDown className="w-3 h-3" /></button>
                  <button onClick={() => del(i)} className="p-1 text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
            <button onClick={add} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-500 border border-dashed border-slate-700 hover:border-gold-500/50 hover:text-gold-400 transition-all mt-1">
              <Plus className="w-3.5 h-3.5" /> Přidat partnera
            </button>
          </div>
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

            {/* Flag settings */}
            <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Vlajka na webu</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Barva vlajky (hex)</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={p.flagColor || '#1a3a5c'}
                      onChange={e => upd('flagColor', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-600 cursor-pointer bg-transparent p-0.5"
                    />
                    <input
                      type="text"
                      value={p.flagColor || '#1a3a5c'}
                      onChange={e => upd('flagColor', e.target.value)}
                      placeholder="#1a3a5c"
                      className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Náhled vlajky</label>
                  <div className="h-10 rounded-lg border border-slate-600 flex items-center justify-center overflow-hidden" style={{ background: p.flagColor || '#1a3a5c' }}>
                    {p.logoUrl
                      ? <img src={p.logoUrl} alt="" className="h-full w-full object-contain p-1" style={{ filter: 'brightness(0) invert(1)' }} />
                      : <span className="text-white/60 text-xs font-bold">{p.name || 'Partner'}</span>
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Logo na vlajce (nahrát soubor)</label>
                <ImagePicker imageUrl={p.logoUrl} onChangeImageUrl={v => upd('logoUrl', v)} />
              </div>
            </div>

            <Field label="Citace" value={p.quote} onChange={v => upd('quote', v)} placeholder="Krátký slogan partnera…" />
            <Field label="Popis" value={p.description} onChange={v => upd('description', v)} rows={4} placeholder="Detailní popis spolupráce…" icon={AlignLeft} />
            <ArrayEditor label="Spolupráce (body)" items={p.collaboration} onChange={v => upd('collaboration', v)} placeholder="Popis bodu spolupráce…" />
            <ImagePicker imageUrl={p.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
            <ImageGallery images={p.images || []} onChange={v => upd('images', v)} label="Fotogalerie partnera" />
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
    const ne = { id: genId(), title: 'Nová expedice', duration: '14 dní', difficulty: 'Střední', imageId: '', imageUrl: '', images: [], description: '', highlights: [] };
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
            <ImageGallery images={e.images || []} onChange={v => upd('images', v)} />
            <Field label="Popis" value={e.description} onChange={v => upd('description', v)} rows={4} icon={AlignLeft} />
            <ArrayEditor label="Highlights" items={e.highlights} onChange={v => upd('highlights', v)} placeholder="Popis highlightu…" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Image Gallery ─────────────────────────────────────────── */
function ImageGallery({ images = [], onChange, label = 'Fotogalerie pro modal' }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFocal, setExpandedFocal] = useState(null);

  // Normalize: images can be strings or {url, focalX, focalY} objects
  const normalized = images.map(img => typeof img === 'string' ? { url: img, focalX: 50, focalY: 50 } : img);
  const getUrl = (img) => typeof img === 'string' ? img : (img?.url || '');

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true); setError('');
    try {
      const urls = await Promise.all(Array.from(files).map(f => uploadImageToSupabase(f)));
      onChange([...normalized, ...urls.map(u => ({ url: u, focalX: 50, focalY: 50 }))]);
    } catch { setError('Chyba při nahrávání.'); }
    finally { setUploading(false); }
  };

  const remove = (i) => {
    deleteImageFromSupabase(getUrl(normalized[i]));
    onChange(normalized.filter((_, idx) => idx !== i));
  };

  const move = (i, dir) => {
    const a = [...normalized]; const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; onChange(a);
  };

  const updateFocal = (i, focalX, focalY) => {
    const a = [...normalized];
    a[i] = { ...a[i], focalX, focalY };
    onChange(a);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <Image className="w-3 h-3" /> {label} <span className="text-slate-600 font-normal normal-case tracking-normal">({normalized.length} fotek)</span>
      </label>
      <div className="grid grid-cols-3 gap-2">
        {normalized.map((img, i) => {
          const url = getUrl(img);
          return (
            <div key={i} className="flex flex-col gap-1">
              <div className="relative group aspect-video rounded-xl overflow-hidden border border-slate-600 bg-slate-800">
                <img src={url} alt="" className="w-full h-full object-cover"
                     style={{ objectPosition: `${img.focalX ?? 50}% ${img.focalY ?? 50}%` }} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                  <div className="flex gap-1">
                    <button onClick={() => move(i, -1)} disabled={i === 0}
                      className="p-1 bg-white/10 hover:bg-white/20 rounded text-white disabled:opacity-30 transition-colors">
                      <MoveUp className="w-3 h-3" />
                    </button>
                    <button onClick={() => move(i, 1)} disabled={i === normalized.length - 1}
                      className="p-1 bg-white/10 hover:bg-white/20 rounded text-white disabled:opacity-30 transition-colors">
                      <MoveDown className="w-3 h-3" />
                    </button>
                    <button onClick={() => remove(i)}
                      className="p-1 bg-red-500/30 hover:bg-red-500/50 rounded text-red-300 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <button onClick={() => setExpandedFocal(expandedFocal === i ? null : i)}
                    className="px-2 py-0.5 bg-gold-500/30 hover:bg-gold-500/50 rounded text-[10px] text-gold-300 font-bold transition-colors">
                    Ohnisko
                  </button>
                </div>
                <div className="absolute top-1.5 left-1.5 bg-black/70 text-white/80 text-[10px] px-1.5 py-0.5 rounded font-semibold">
                  {i === 0 ? 'Hlavní' : `#${i + 1}`}
                </div>
                {/* Focal indicator dot */}
                <div className="absolute pointer-events-none"
                     style={{ left: `${img.focalX ?? 50}%`, top: `${img.focalY ?? 50}%`, transform: 'translate(-50%,-50%)' }}>
                  <div className="w-2.5 h-2.5 rounded-full border border-white bg-red-500/70 shadow" />
                </div>
              </div>
              {expandedFocal === i && (
                <FocalPicker imageUrl={url} focalX={img.focalX ?? 50} focalY={img.focalY ?? 50}
                  onChange={({ focalX, focalY }) => updateFocal(i, focalX, focalY)}
                  label={`Ohnisko #${i + 1}`} />
              )}
            </div>
          );
        })}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          onDragOver={e => e.preventDefault()}
          className="aspect-video rounded-xl border-2 border-dashed border-slate-600 hover:border-gold-500/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors group"
        >
          {uploading
            ? <RefreshCw className="w-5 h-5 text-gold-400 animate-spin" />
            : <>
                <Upload className="w-5 h-5 text-slate-500 group-hover:text-gold-400 transition-colors" />
                <span className="text-[11px] text-slate-500 group-hover:text-slate-300 text-center px-2">Přidat fotky</span>
              </>
          }
        </div>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => { handleFiles(e.target.files); e.target.value = ''; }} />
    </div>
  );
}

/* ─── Eshop Editor ──────────────────────────────────────────── */
const TAG_COLORS = [
  { label: 'Zlatá',     value: 'bg-gold-500' },
  { label: 'Zelená',    value: 'bg-emerald-600' },
  { label: 'Jantarová', value: 'bg-amber-700' },
  { label: 'Tmavá',     value: 'bg-slate-600' },
  { label: 'Černá',     value: 'bg-slate-800' },
  { label: 'Červená',   value: 'bg-red-600' },
  { label: 'Oranžová',  value: 'bg-orange-500' },
  { label: 'Fialová',   value: 'bg-violet-600' },
  { label: 'Modrá',     value: 'bg-blue-600' },
  { label: 'Azurová',   value: 'bg-cyan-600' },
  { label: 'Růžová',    value: 'bg-pink-600' },
  { label: 'Indigo',    value: 'bg-indigo-600' },
  { label: 'Lososová',  value: 'bg-rose-500' },
  { label: 'Limetková', value: 'bg-lime-600' },
  { label: 'Tyrkysová', value: 'bg-teal-600' },
  { label: 'Hnědá',     value: 'bg-stone-600' },
];

function EshopEditor({ data, onChange, onReset }) {
  const [sel, setSel] = useState(0);
  const p = data[sel] || {};
  const upd = (field, val) => { const a = [...data]; a[sel] = { ...a[sel], [field]: val }; onChange(a); };
  const del = (i) => { const a = data.filter((_, idx) => idx !== i); onChange(a); setSel(Math.min(sel, a.length - 1)); };
  const add = () => {
    const np = { id: genId(), name: 'Nový produkt', subtitle: '', desc: '', tag: 'Novinka', tagColor: 'bg-gold-500', imageId: '', imageUrl: '', images: [] };
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
            <ImageGallery images={p.images || []} onChange={v => upd('images', v)} />
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
    const nl = { id: genId(), title: 'Nová přednáška', subtitle: '', duration: '60 min', audience: '', desc: '', highlights: [], imageId: '', imageUrl: '', date: '', location: '', link: '' };
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
            <div className="grid grid-cols-2 gap-4">
              <Field label="Datum" value={l.date} onChange={v => upd('date', v)} type="date" placeholder="RRRR-MM-DD" />
              <Field label="Místo konání" value={l.location} onChange={v => upd('location', v)} placeholder="Praha, Kongresové centrum" icon={Globe} />
            </div>
            <Field label="Cílová skupina" value={l.audience} onChange={v => upd('audience', v)} placeholder="Firmy, management, teambuildingy…" icon={Users} />
            <Field label="Popis" value={l.desc} onChange={v => upd('desc', v)} rows={4} icon={AlignLeft} />
            <Field label="Odkaz (vstupenky / web akce)" value={l.link || ''} onChange={v => upd('link', v)} placeholder="https://goout.net/…" icon={Link2} />
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
    const np = { id: genId(), title: 'Nový projekt', subtitle: '', description: '', highlights: [], link: '', imageId: '', imageUrl: '', images: [], date: '', location: '' };
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
            <div className="grid grid-cols-2 gap-4">
              <Field label="Datum" value={pr.date} onChange={v => upd('date', v)} type="date" placeholder="RRRR-MM-DD" />
              <Field label="Místo konání" value={pr.location} onChange={v => upd('location', v)} placeholder="Praha, Meetfactory" icon={Globe} />
            </div>
            <Field label="Popis" value={pr.description} onChange={v => upd('description', v)} rows={4} icon={AlignLeft} />
            <Field label="URL odkazu" value={pr.link} onChange={v => upd('link', v)} placeholder="https://… (nepovinné)" type="url" icon={ExternalLink} />
            <ArrayEditor label="Highlights" items={pr.highlights} onChange={v => upd('highlights', v)} placeholder="Highlight projektu…" />
            <ImagePicker imageUrl={pr.imageUrl} onChangeImageUrl={v => upd('imageUrl', v)} />
            <ImageGallery images={pr.images || []} onChange={v => upd('images', v)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Media Editor ──────────────────────────────────────────── */
const PRESS_TYPES = ['TV', 'Video', 'Rádio', 'Podcast', 'Online', 'Tisk'];
const PRESS_YEARS = [2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009];

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

/* ─── Honza Editor ──────────────────────────────────────────── */
const HONZA_SECTIONS = [
  { key: 'uvod',      group: 'Úvod',    label: 'Úvodní sekce na webu' },
  { key: 'zacatky',  group: 'Příběh',  label: 'Začátky' },
  { key: 'hory',     group: 'Příběh',  label: 'Hory & Osmitisícovky' },
  { key: 'nepal',    group: 'Příběh',  label: 'Nepál' },
  { key: 'zdravi',   group: 'Příběh',  label: 'Zdraví & Osvěta' },
  { key: 'prednasky',group: 'Příběh',  label: 'Přednášky' },
  { key: 'tym',      group: 'Příběh',  label: 'Tým (nadpis)' },
  { key: 'kdedal',   group: 'Příběh',  label: 'Závěr & citát' },
  { key: 'osveta',   group: 'Modál',   label: 'Osvěta modal' },
  { key: 'miri',     group: 'Tým',     label: 'Miri Jirková' },
  { key: 'subin',    group: 'Tým',     label: 'Subin Tamang' },
];

function HonzaEditor({ texts, story, osveta, onTexts, onStory, onOsveta, onResetTexts, onResetStory, onResetOsveta }) {
  const [sel, setSel] = useState('uvod');

  const updTexts = (section, field, val) => onTexts({ ...texts, [section]: { ...texts[section], [field]: val } });
  const updStory = (block, field, val) => onStory({ ...story, [block]: { ...story[block], [field]: val } });
  const updOsveta = (field, val) => onOsveta({ ...osveta, [field]: val });

  const groups = [...new Set(HONZA_SECTIONS.map(s => s.group))];

  const handleReset = () => {
    const s = HONZA_SECTIONS.find(s => s.key === sel);
    if (!s) return;
    if (s.group === 'Úvod') onResetTexts();
    else if (s.group === 'Příběh') onResetStory();
    else if (s.key === 'osveta') onResetOsveta();
    else onResetTexts();
  };

  const renderForm = () => {
    /* ── Úvod ── */
    if (sel === 'uvod') {
      const a = texts.about || {};
      return (
        <>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-700 pb-3 mb-5">Úvodní text zobrazený v sekci „O Honzovi"</p>
          <Field label="Štítek (zlatý text nad nadpisem)" value={a.tagline} onChange={v => updTexts('about','tagline',v)} icon={Tag} placeholder="Honza Tráva — profesionální dobrodruh" />
          <Field label="Hlavní nadpis" value={a.title} onChange={v => updTexts('about','title',v)} icon={Type} placeholder="Horolezec. Cestovatel. Podnikatel." />
          <Field label="Perex — úvodní odstavec" value={a.description} onChange={v => updTexts('about','description',v)} rows={4} icon={AlignLeft} placeholder="Výstupy na osmitisícovky…" />
        </>
      );
    }
    /* ── Story blocks ── */
    if (['zacatky','hory','nepal','zdravi','prednasky','tym','kdedal'].includes(sel)) {
      const b = story[sel] || {};
      const upd = (f,v) => updStory(sel,f,v);
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Štítek sekce (malé zlaté písmo)" value={b.sectionLabel} onChange={v=>upd('sectionLabel',v)} icon={Tag} />
            <Field label="Nadpis bloku" value={b.title} onChange={v=>upd('title',v)} icon={Type} />
          </div>

          {sel === 'zacatky' && (
            <>
              <Field label="Odstavec 1 (tučný úvod)" value={b.p1} onChange={v=>upd('p1',v)} rows={3} icon={AlignLeft} />
              <Field label="Odstavec 2 (osmitisícovky)" value={b.p2} onChange={v=>upd('p2',v)} rows={3} icon={AlignLeft} />
              <Field label="Odstavec 3 (14 Summits, hotel, pub)" value={b.p3} onChange={v=>upd('p3',v)} rows={3} icon={AlignLeft} />
              <Field label="Odstavec 4 (zdraví, diagnóza)" value={b.p4} onChange={v=>upd('p4',v)} rows={3} icon={AlignLeft} />
              <Field label="Odstavec 5 (závěrečná myšlenka — kurzíva)" value={b.p5} onChange={v=>upd('p5',v)} rows={2} icon={AlignLeft} />
              <ImageGallery images={b.images||[]} onChange={v=>upd('images',v)} label="Fotky v bloku (2 ks doporučeno)" />
            </>
          )}

          {sel === 'hory' && (
            <>
              <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">3 statistiky (čísla uprostřed)</p>
                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3].map(n => (
                    <div key={n} className="flex flex-col gap-2">
                      <Field label={`Hodnota ${n}`} value={b[`stat${n}val`]} onChange={v=>upd(`stat${n}val`,v)} placeholder="6+" />
                      <Field label={`Popisek ${n}`} value={b[`stat${n}label`]} onChange={v=>upd(`stat${n}label`,v)} placeholder="osmitisícovek" />
                    </div>
                  ))}
                </div>
              </div>
              <Field label="Text 1 (vznik 14 Summits)" value={b.text} onChange={v=>upd('text',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 2 (propojení, dal bhat)" value={b.text2} onChange={v=>upd('text2',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 3 (nejsme sterilní cestovka)" value={b.text3} onChange={v=>upd('text3',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 4 (přístup, aklimatizace)" value={b.text4} onChange={v=>upd('text4',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 5 (zázemí KTM — kurzíva)" value={b.text5} onChange={v=>upd('text5',v)} rows={2} icon={AlignLeft} />
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <Video className="w-3 h-3" /> YouTube video URL (embed)
                </label>
                <input
                  type="url"
                  value={b.videoUrl||''}
                  onChange={e=>upd('videoUrl',e.target.value)}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
                <p className="text-[11px] text-slate-500">Formát: youtube.com/embed/ID — pokud je vyplněno, zobrazí se nad galerií fotek</p>
              </div>
              <ImageGallery images={b.images||[]} onChange={v=>upd('images',v)} label="Fotky v bloku (3 ks doporučeno)" />
            </>
          )}

          {sel === 'nepal' && (
            <>
              <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Czech Pub Nepal</p>
                <Field label="Nadpis (pubTitle)" value={b.pubTitle} onChange={v=>upd('pubTitle',v)} placeholder="Czech Pub Nepal" />
                <Field label="Text 1" value={b.pubText} onChange={v=>upd('pubText',v)} rows={2} icon={AlignLeft} />
                <Field label="Text 2" value={b.pubText2} onChange={v=>upd('pubText2',v)} rows={2} icon={AlignLeft} />
                <Field label="Text 3 (kurzíva)" value={b.pubText3} onChange={v=>upd('pubText3',v)} rows={2} icon={AlignLeft} />
              </div>
              <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Hotel Kathmandu Base Camp</p>
                <Field label="Nadpis (hotelTitle)" value={b.hotelTitle} onChange={v=>upd('hotelTitle',v)} placeholder="Hotel Kathmandu Base Camp" />
                <Field label="Text 1" value={b.hotelText} onChange={v=>upd('hotelText',v)} rows={2} icon={AlignLeft} />
                <Field label="Text 2" value={b.hotelText2} onChange={v=>upd('hotelText2',v)} rows={2} icon={AlignLeft} />
                <Field label="Text 3" value={b.hotelText3} onChange={v=>upd('hotelText3',v)} rows={2} icon={AlignLeft} />
                <Field label="Text 4" value={b.hotelText4} onChange={v=>upd('hotelText4',v)} rows={2} icon={AlignLeft} />
                <Field label="Tagline (kurzíva dole)" value={b.hotelTagline} onChange={v=>upd('hotelTagline',v)} rows={2} icon={AlignLeft} />
              </div>
              <ImageGallery images={b.images||[]} onChange={v=>upd('images',v)} label="Fotky v bloku" />
            </>
          )}

          {sel === 'zdravi' && (
            <>
              <Field label="Nadpis sekce" value={b.title} onChange={v=>upd('title',v)} icon={Type} placeholder="I zdraví patří k cestě." />
              <Field label="Text 1 (diagnóza — tučný)" value={b.text} onChange={v=>upd('text',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 2 (osvěta, projekty)" value={b.text2} onChange={v=>upd('text2',v)} rows={3} icon={AlignLeft} />
              <Field label="Citát (na fotce)" value={b.quote} onChange={v=>upd('quote',v)} rows={2} icon={AlignLeft} placeholder={'„Zdraví je vždycky víc než vrchol."'} />
              <ImagePickerWithFocal imageUrl={b.imageUrl||''} onChangeImageUrl={v=>upd('imageUrl',v)} focalX={b.imageFocusX||50} focalY={b.imageFocusY||50} onChangeFocal={({focalX,focalY})=>{upd('imageFocusX',focalX);upd('imageFocusY',focalY);}} />
            </>
          )}

          {sel === 'prednasky' && (
            <>
              <Field label="Nadpis sekce" value={b.title} onChange={v=>upd('title',v)} icon={Type} placeholder="Příběhy z hor, cest i života mezi nimi." />
              <Field label="Text 1 (hlavní)" value={b.text} onChange={v=>upd('text',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 2 (o čem jsou přednášky)" value={b.text2} onChange={v=>upd('text2',v)} rows={3} icon={AlignLeft} />
              <Field label="Text 3 (závěr — kurzíva)" value={b.text3} onChange={v=>upd('text3',v)} rows={2} icon={AlignLeft} />
              <ImagePickerWithFocal imageUrl={b.imageUrl||''} onChangeImageUrl={v=>upd('imageUrl',v)} focalX={b.imageFocusX||50} focalY={b.imageFocusY||50} onChangeFocal={({focalX,focalY})=>{upd('imageFocusX',focalX);upd('imageFocusY',focalY);}} />
            </>
          )}

          {sel === 'tym' && (
            <>
              <p className="text-xs text-slate-400 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700">
                Textové biografie zobrazené pod kartami v modalu příběhu. Profily (foto, statistiky) se nastavují v sekcích Miri a Subin níže.
              </p>
              <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">Miri Jirková — biografie v modalu</p>
                <Field label="Nadpis (miriTitle)" value={b.miriTitle} onChange={v=>upd('miriTitle',v)} placeholder="Miri Jirková" />
                <Field label="Bio 1 (intro)" value={b.miriText} onChange={v=>upd('miriText',v)} rows={2} icon={AlignLeft} />
                <Field label="Bio 2 (expedice, treky)" value={b.miriText2} onChange={v=>upd('miriText2',v)} rows={2} icon={AlignLeft} />
                <Field label="Bio 3 (logistika, zkušenosti)" value={b.miriText3} onChange={v=>upd('miriText3',v)} rows={2} icon={AlignLeft} />
                <Field label="Bio 4 (druhý domov — kurzíva)" value={b.miriText4} onChange={v=>upd('miriText4',v)} rows={2} icon={AlignLeft} />
              </div>
              <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Subin Thakuri — biografie v modalu</p>
                <Field label="Nadpis (subinTitle)" value={b.subinTitle} onChange={v=>upd('subinTitle',v)} placeholder="Subin Thakuri" />
                <Field label="Role (subinRole)" value={b.subinRole} onChange={v=>upd('subinRole',v)} placeholder="Zakladatel 14 Summits Expedition a partner na cestě." />
                <Field label="Bio 1 (původ, počátky)" value={b.subinText} onChange={v=>upd('subinText',v)} rows={2} icon={AlignLeft} />
                <Field label="Bio 2 (20+ let, Everest)" value={b.subinText2} onChange={v=>upd('subinText2',v)} rows={2} icon={AlignLeft} />
                <Field label="Bio 3 (přátelství)" value={b.subinText3} onChange={v=>upd('subinText3',v)} rows={2} icon={AlignLeft} />
                <Field label="Bio 4 (komunity)" value={b.subinText4} onChange={v=>upd('subinText4',v)} rows={2} icon={AlignLeft} />
                <Field label="Citát Subina (subinQuote)" value={b.subinQuote} onChange={v=>upd('subinQuote',v)} rows={2} icon={AlignLeft} placeholder={'„Hora rozhoduje, jestli vás pustí nahoru…"'} />
              </div>
            </>
          )}

          {sel === 'kdedal' && (
            <Field label="Závěrečný citát" value={b.quote} onChange={v=>upd('quote',v)} rows={3} icon={AlignLeft} placeholder={'„Život není jen o samotných vrcholech…"'} />
          )}
        </>
      );
    }
    /* ── Osvěta modal ── */
    if (sel === 'osveta') {
      const o = osveta || {};
      return (
        <>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-700 pb-3 mb-5">Obsah modálu „Osvěta & Zdraví"</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Štítek (zlatý, nad nadpisem)" value={o.heading} onChange={v=>updOsveta('heading',v)} icon={Tag} />
            <Field label="Hlavní nadpis" value={o.title} onChange={v=>updOsveta('title',v)} icon={Type} />
          </div>
          <Field label="Úvodní odstavec 1 (tučný, krátký)" value={o.intro} onChange={v=>updOsveta('intro',v)} rows={2} icon={AlignLeft} />
          <Field label="Úvodní odstavec 2 (osobní zkušenost)" value={o.intro2} onChange={v=>updOsveta('intro2',v)} rows={3} icon={AlignLeft} />
          <Field label="Úvodní odstavec 3 (kurzíva)" value={o.intro3} onChange={v=>updOsveta('intro3',v)} rows={2} icon={AlignLeft} />
          <div className="flex flex-col gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Revma Liga & psoriatická artritida</p>
            <Field label="Nadpis sekce 1" value={o.section1Title} onChange={v=>updOsveta('section1Title',v)} />
            <Field label="Text 1 (úvod spolupráce)" value={o.section1Text} onChange={v=>updOsveta('section1Text',v)} rows={3} icon={AlignLeft} />
            <Field label="Text 2 (cíl, příklady)" value={o.section1Text2} onChange={v=>updOsveta('section1Text2',v)} rows={3} icon={AlignLeft} />
            <Field label="Text 3 (závěr — tučný)" value={o.section1Text3} onChange={v=>updOsveta('section1Text3',v)} rows={2} icon={AlignLeft} />
          </div>
          <div className="flex flex-col gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fuck Cancer</p>
            <Field label="Nadpis sekce 2" value={o.section2Title} onChange={v=>updOsveta('section2Title',v)} />
            <Field label="Text 1 (propojení pacientů)" value={o.section2Text} onChange={v=>updOsveta('section2Text',v)} rows={2} icon={AlignLeft} />
            <Field label="Text 2 (proč to podporuji)" value={o.section2Text2} onChange={v=>updOsveta('section2Text2',v)} rows={2} icon={AlignLeft} />
            <Field label="Text 3 (prevence, osvěta)" value={o.section2Text3} onChange={v=>updOsveta('section2Text3',v)} rows={2} icon={AlignLeft} />
          </div>
          <div className="flex flex-col gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Box — odborná spolupráce</p>
            <Field label="Nadpis boxu" value={o.expertBoxTitle} onChange={v=>updOsveta('expertBoxTitle',v)} />
            <Field label="Text boxu" value={o.expertBoxText} onChange={v=>updOsveta('expertBoxText',v)} rows={6} icon={AlignLeft} />
          </div>
          <Field label="Citát (na fotce vpravo)" value={o.quote} onChange={v=>updOsveta('quote',v)} rows={2} icon={AlignLeft} />
          <ImagePicker imageUrl={o.imageUrl||''} onChangeImageUrl={v=>updOsveta('imageUrl',v)} />
        </>
      );
    }
    /* ── Miri / Subin ── */
    if (sel === 'miri' || sel === 'subin') {
      const s = texts[sel] || {};
      const upd = (f,v) => updTexts(sel,f,v);
      const label = sel === 'miri' ? 'Miri Jirková' : 'Subin Tamang';
      return (
        <>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-700 pb-3 mb-5">Profil {label} — zobrazený v modálu a kartičkách na webu</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Celé jméno" value={s.name} onChange={v=>upd('name',v)} icon={Users} />
            <Field label="Role (pod jménem v kartičce)" value={s.role} onChange={v=>upd('role',v)} placeholder="Trek & Logistika" />
          </div>
          <Field label="Pozice (zlatý štítek v modálu)" value={s.tagline} onChange={v=>upd('tagline',v)} icon={Tag} />
          <Field label="Bio — odstavec 1 (tučný úvod)" value={s.bio1} onChange={v=>upd('bio1',v)} rows={4} icon={AlignLeft} />
          <Field label="Bio — odstavec 2" value={s.bio2} onChange={v=>upd('bio2',v)} rows={4} icon={AlignLeft} />
          <Field label="Bio — odstavec 3" value={s.bio3} onChange={v=>upd('bio3',v)} rows={4} icon={AlignLeft} />
          <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Statistiky (3 čísla ve spodní části modálu)</p>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map(n => (
                <div key={n} className="flex flex-col gap-2">
                  <Field label={`Hodnota ${n}`} value={s[`stat${n}val`]} onChange={v=>upd(`stat${n}val`,v)} />
                  <Field label={`Popisek ${n}`} value={s[`stat${n}label`]} onChange={v=>upd(`stat${n}label`,v)} />
                </div>
              ))}
            </div>
          </div>
          <ImageGallery images={s.images||[]} onChange={v=>upd('images',v)} label="Fotogalerie v modálu (1. foto = hlavní, 2.–3. = mřížka)" />
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">O Honzovi</h2>
          <p className="text-slate-400 text-sm mt-0.5">Úvodní texty, celý příběh (modal), osvěta a profily týmu</p>
        </div>
        <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold rounded-lg transition-all">
          <RefreshCw className="w-3 h-3" /> Obnovit tuto sekci
        </button>
      </div>

      <div className="grid grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <div className="flex flex-col gap-1">
          {groups.map(group => (
            <div key={group} className="mb-2">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2 mb-1">{group}</p>
              {HONZA_SECTIONS.filter(s => s.group === group).map(s => (
                <button
                  key={s.key}
                  onClick={() => setSel(s.key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-all ${
                    sel === s.key
                      ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 min-h-[400px]">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

/* ─── Contact & Promo Editor ────────────────────────────────── */
/* ─── SiteTextsEditor ────────────────────────────────────── */
function SiteTextsEditor({ data, onChange, onReset }) {
  const upd = (section, field, val) => onChange({ ...data, [section]: { ...(data[section] || {}), [field]: val } });
  const d = data || {};

  return (
    <div>
      <SectionHeader title="Texty webu" subtitle="Editace textů jednotlivých sekcí (Hotel, Pub, Kontakt, Hero)" onReset={onReset} />
      <div className="flex flex-col gap-8 max-w-2xl">

        {/* Hotel */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Hotel Kathmandu Base Camp
          </h3>
          <Field label="Podnadpis sekce" value={d.hotel?.heading} onChange={v => upd('hotel','heading',v)} placeholder="Klidné zázemí v srdci Thamelu" />
          <Field label="Odstavec 1" value={d.hotel?.p1} onChange={v => upd('hotel','p1',v)} rows={2} />
          <Field label="Odstavec 2" value={d.hotel?.p2} onChange={v => upd('hotel','p2',v)} rows={2} />
          <Field label="Odstavec 3" value={d.hotel?.p3} onChange={v => upd('hotel','p3',v)} rows={2} />
          <Field label="Booking URL" value={d.hotel?.bookingUrl} onChange={v => upd('hotel','bookingUrl',v)} type="url" placeholder="https://www.booking.com/…" icon={Link2} />
        </div>

        {/* Pub */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 inline-block" /> Czech Pub Nepal
          </h3>
          <Field label="Podnadpis sekce" value={d.pub?.heading} onChange={v => upd('pub','heading',v)} placeholder="Místo návratů…" />
          <Field label="Odstavec 1" value={d.pub?.p1} onChange={v => upd('pub','p1',v)} rows={2} />
          <Field label="Odstavec 2" value={d.pub?.p2} onChange={v => upd('pub','p2',v)} rows={2} />
          <Field label="Odstavec 3 (kurzíva)" value={d.pub?.p3} onChange={v => upd('pub','p3',v)} rows={2} />
          <Field label="Web URL" value={d.pub?.websiteUrl} onChange={v => upd('pub','websiteUrl',v)} type="url" placeholder="https://czechpubnepal.com/" icon={Globe} />
        </div>

        {/* Kontakt */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" /> Kontaktní údaje
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Hlavní e-mail" value={d.contact?.mainEmail} onChange={v => upd('contact','mainEmail',v)} type="email" icon={Mail} />
            <Field label="14Summits e-mail" value={d.contact?.expeditionEmail} onChange={v => upd('contact','expeditionEmail',v)} type="email" icon={Mail} />
            <Field label="Booking e-mail" value={d.contact?.bookingEmail} onChange={v => upd('contact','bookingEmail',v)} type="email" icon={Mail} />
            <Field label="Telefon" value={d.contact?.phone} onChange={v => upd('contact','phone',v)} placeholder="+420 776 359 536" />
            <Field label="IČO" value={d.contact?.ico} onChange={v => upd('contact','ico',v)} placeholder="68234581" />
            <Field label="Adresa sídla" value={d.contact?.address} onChange={v => upd('contact','address',v)} placeholder="Plzeň, Česká republika" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-700">
            <Field label="Instagram URL" value={d.contact?.instagram} onChange={v => upd('contact','instagram',v)} type="url" icon={Globe} />
            <Field label="Facebook URL" value={d.contact?.facebook} onChange={v => upd('contact','facebook',v)} type="url" icon={Globe} />
            <Field label="YouTube URL" value={d.contact?.youtube} onChange={v => upd('contact','youtube',v)} type="url" icon={Globe} />
          </div>
        </div>

        {/* Hero */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /> Hero sekce (úvodní stránka)
          </h3>
          <Field label="Tagline pod logem" value={d.hero?.tagline} onChange={v => upd('hero','tagline',v)} placeholder="Poutník mezi světy." />
          <Field label="Scroll hint text" value={d.hero?.scrollHint} onChange={v => upd('hero','scrollHint',v)} placeholder="Začni výstup." />
        </div>

      </div>
    </div>
  );
}

function ContactEditor({ promo, onPromo, onReset }) {
  const upd = (i, field, val) => { const a = [...promo]; a[i] = { ...a[i], [field]: val }; onPromo(a); };
  return (
    <div>
      <SectionHeader title="Kontakt & Promo materiály" subtitle="URL adresy ke stažení promo souborů" onReset={onReset} />
      <div className="flex flex-col gap-3 max-w-2xl">
        <p className="text-xs text-slate-500 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700">
          Vlož URL odkaz pro každý soubor. Prázdné položky se v modalu nezobrazí jako tlačítko ke stažení.
        </p>
        {promo.map((item, i) => (
          <div key={item.id} className="flex items-center gap-3 bg-slate-800/40 rounded-xl px-4 py-3 border border-slate-700">
            <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${item.type === 'ZIP' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
              {item.type}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-xs font-medium mb-1.5 truncate">{item.name}</p>
              <input
                type="url"
                value={item.url}
                onChange={e => upd(i, 'url', e.target.value)}
                placeholder="https://drive.google.com/…"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main AdminPanel ───────────────────────────────────────── */
/* ─── Default site texts (hardcoded content) ─────────────── */
const DEF_SITE_TEXTS = {
  hotel: {
    heading: 'Klidné zázemí v srdci Thamelu',
    p1: 'Uprostřed rušného Káthmándú jsme vytvořili místo, kam se člověk rád vrací před cestou do hor i po návratu z nich.',
    p2: 'Ráno vás čeká poctivá kontinentální snídaně, večer terasa plná květin — a během dne místo, kde si odpočinete od ruchu Thamelu.',
    p3: 'Najdete u nás čisté pokoje, rychlou Wi-Fi i lidi, kteří Nepál dobře znají a rádi pomohou. A vždy někdo, s kým se domluvíte i česky.',
    bookingUrl: 'https://www.booking.com/hotel/np/kathmandu-base-camp.html',
  },
  pub: {
    heading: 'Místo návratů, setkávání a dlouhých večerů',
    p1: 'Czech Pub Nepal není jen česká hospoda v Káthmándú. Je to místo, kde se po trecích a expedicích potkávají cestovatelé, horolezci a místní přátelé.',
    p2: 'Dobré pivo, nejlepší smažák v Nepálu, nepálské jídlo — a příběhy, které si sem lidé přinášejí z hor.',
    p3: 'Někdo přijde na jedno pivo. Někdo tu zůstane celý večer. A někdo se sem vrací každý rok.',
    websiteUrl: 'https://czechpubnepal.com/',
  },
  contact: {
    mainEmail: 'honzatravatravnicek@gmail.com',
    expeditionEmail: 'info@14summitsexpedition.cz',
    phone: '+420 776 359 536',
    bookingEmail: 'booking@honzatrava.cz',
    instagram: 'https://www.instagram.com/honzatravatravnicek',
    facebook: 'https://www.facebook.com/honzatrava',
    youtube: 'https://www.youtube.com/@honzatrava',
    address: 'Plzeň, Česká republika',
    ico: '68234581',
  },
  hero: {
    tagline: 'Poutník mezi světy.',
    scrollHint: 'Začni výstup.',
  },
};

const NAV = [
  { key:'partners',    label:'Partneři',   icon: Users,      color: 'text-blue-400' },
  { key:'expeditions', label:'Expedice',   icon: Mountain,   color: 'text-emerald-400' },
  { key:'eshop',       label:'E-shop',     icon: ShoppingBag,color: 'text-gold-400' },
  { key:'lectures',    label:'Přednášky',  icon: Mic2,       color: 'text-violet-400' },
  { key:'projects',    label:'Projekty',   icon: Folder,     color: 'text-amber-400' },
  { key:'media',       label:'Média',      icon: Tv,         color: 'text-red-400' },
  { key:'honza',       label:'O Honzovi',  icon: Type,       color: 'text-pink-400' },
  { key:'sitetexts',   label:'Texty webu', icon: AlignLeft,  color: 'text-cyan-400' },
  { key:'contact',     label:'Kontakt',    icon: Mail,       color: 'text-teal-400' },
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
  const [texts,       setTexts]       = useState(() => loadContent('texts',        DEF_TEXTS));
  const [story,       setStory]       = useState(() => loadContent('story',        DEF_STORY));
  const [osveta,      setOsveta]      = useState(() => loadContent('osveta',       DEF_OSVETA));
  const [promo,       setPromo]       = useState(() => loadContent('promo',        DEF_PROMO));
  const [siteTexts,   setSiteTexts]   = useState(() => loadContent('site_texts',   DEF_SITE_TEXTS));

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
      saveContent('texts',         texts),
      saveContent('story',         story),
      saveContent('osveta',        osveta),
      saveContent('promo',         promo),
      saveContent('site_texts',    siteTexts),
    ]);
    setDirty(false);
    setSaveMsg('Uloženo');
    setTimeout(() => setSaveMsg(''), 2500);
  };

  const handlePreview = () => {
    const PFX = 'trava_admin_';
    const data = { partners, expeditions, products, lectures, projects, media_video: mediaVideo, media_podcast: mediaPodcast, media_blog: mediaBlog, press, texts, story, osveta, promo, site_texts: siteTexts };
    Object.entries(data).forEach(([k, v]) => {
      try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch {}
    });
    localStorage.setItem('trava_preview_ts', Date.now().toString());
    localStorage.setItem('trava_preview_active', '1');
    window.open('/', '_blank');
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
            <button onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700">
              <Eye className="w-4 h-4" /> Náhled
            </button>
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
          {section === 'honza' && (
            <HonzaEditor
              texts={texts}
              story={story}
              osveta={osveta}
              onTexts={markDirty(setTexts)}
              onStory={markDirty(setStory)}
              onOsveta={markDirty(setOsveta)}
              onResetTexts={() => handleReset('texts', DEF_TEXTS, setTexts)}
              onResetStory={() => handleReset('story', DEF_STORY, setStory)}
              onResetOsveta={() => handleReset('osveta', DEF_OSVETA, setOsveta)}
            />
          )}
          {section === 'sitetexts' && (
            <SiteTextsEditor
              data={siteTexts}
              onChange={markDirty(setSiteTexts)}
              onReset={() => handleReset('site_texts', DEF_SITE_TEXTS, setSiteTexts)}
            />
          )}
          {section === 'contact' && (
            <ContactEditor
              promo={promo}
              onPromo={markDirty(setPromo)}
              onReset={() => handleReset('promo', DEF_PROMO, setPromo)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
