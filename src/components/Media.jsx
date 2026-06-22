import { useState, useMemo } from 'react';
import { loadContent } from '../data/adminStore';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';
import {
    Play, Mic, FileText, X,
    ExternalLink, Tv, Radio, Newspaper, Globe, Headphones, ArrowRight
} from 'lucide-react';
import ClimbersImg from '../assets/climbers_bg.jpg';
import HonzaImg from '../assets/honza_profile.png';
import BaseCampImg from '../assets/base_camp_bg.jpg';
import SummitImg from '../assets/summit_bg.png';

const MEDIA_DATA_DEF = {
    video: [
        { id: 'v1', type: 'video', title: 'Vlog #04: Cesta do BC', date: 'Březen 2026', duration: '12:45', image: ClimbersImg, desc: 'Cesta do základního tábora je plná úskalí. Sledujte, jak jsme se prali s ledopádem a nástrahami aklimatizace.' },
        { id: 'v2', type: 'video', title: 'Vlog #03: Přípravy', date: 'Únor 2026', duration: '08:20', image: BaseCampImg, desc: 'Co všechno obnáší příprava na extrémní expedici? Balení, trénink a logistika.' },
        { id: 'v3', type: 'video', title: 'Vybavení do zóny smrti', date: 'Leden 2026', duration: '15:10', image: SummitImg, desc: 'Detailní pohled na vybavení, které nám pomáhá přežít v 8000 metrech výšky.' },
    ],
    podcast: [
        { id: 'p1', type: 'podcast', title: 'Podcast: Ep. 12 – K2', date: 'Duben 2026', duration: '45:00', image: HonzaImg, desc: 'Rozhovor o největších krizích na „Hoře hor" a jak je překonat.' },
        { id: 'p2', type: 'podcast', title: 'Podcast: Ep. 11 – Nanga Parbat', date: 'Březen 2026', duration: '38:15', image: ClimbersImg, desc: 'Příběh hory zabiják z pohledu naší poslední náročné expedice.' },
        { id: 'p3', type: 'podcast', title: 'Podcast: Ep. 10 – Tým', date: 'Únor 2026', duration: '52:30', image: BaseCampImg, desc: 'S důležitými členy týmu o tom, jak funguje chemie v extrémních výškách.' },
    ],
    blog: [
        {
            id: 'b1', type: 'blog', title: 'Deník z expedice', date: '12. května 2026', readTime: '5 min čtení', image: BaseCampImg,
            desc: 'Dnes jsme dorazili do 6000 metrů. Vítr sílí, ale morálka je mimořádně vysoká.',
            content: [
                "Je krátce po páté hodině ranní a vítr lomcuje našimi stany jako by se nás snažil shodit zpátky do údolí.",
                "Morálka v týmu je ale překvapivě vysoká. První dny aklimatizace jsou vždycky ty nejtěžší — hlava praská, každý krok stojí dvakrát tolik sil.",
                "Včera se nám podařilo vynést zásoby do C1. Dnes nás čeká den volna a příprava strategie pro zítřejší pokus o postup do 6500 metrů.",
                "Hory nás učí obrovské pokoře. Je to boj, ale kvůli těmhle momentům to děláme."
            ]
        },
        {
            id: 'b2', type: 'blog', title: 'Nepálská kultura', date: '5. dubna 2026', readTime: '8 min čtení', image: SummitImg,
            desc: 'Proč se neustále vracíme do Káthmándú a jak se tam žije.',
            content: [
                "Pro mnoho horolezců je Nepál jen přestupní stanicí. Pro mě je to druhý domov.",
                "Davy lidí, rikši, vonné tyčinky — čím dál se dostanete od Káthmándú, tím víc poznáte pravou podstatu země.",
                "Spolupráce se šerpy mě naučila nekonečnému klidu. Hory diktují samotný rytmus každodenního života."
            ]
        },
        {
            id: 'b3', type: 'blog', title: 'Strava v horách', date: '28. března 2026', readTime: '4 min čtení', image: HonzaImg,
            desc: 'Co jíme, když je voda zmrzlá a kyslíku bolestivě málo.',
            content: [
                "Jídlo v osmi tisících metrech není kulinářský zážitek — je to boj o přežití.",
                "Nad 7000 metry extrémní výška doslova vypne trávení a chuť k jídlu zmizí.",
                "Největší odměnou po týdnech na sušeném jídle je sestup dolů — ledově vychlazené pivo a pořádný kus masa."
            ]
        },
    ]
};

const PRESS_ITEMS = [
    // TV
    { id:'pr_ct24_2025',    type:'TV',      outlet:'ČT24',                          title:'Interview ČT24 — Jan „Tráva" Trávníček, horolezec a cestovatel',                         year:2025, date:'9. 2. 2025',     href:'https://www.ceskatelevize.cz/porady/10095426857-interview-ct24/225411058040209/' },
    { id:'pr_ct1_s6_2024',  type:'TV',      outlet:'ČT 1 Studio 6',                 title:'Záchrana nepálského šerpy v Himaláji — delší reportáž',                                   year:2024, date:'20. 1. 2024',    href:'https://www.ceskatelevize.cz/porady/1096902795-studio-6/223411010101120/cast/1012270/' },
    { id:'pr_ct1_ud_2024',  type:'TV',      outlet:'ČT 1 Události',                 title:'Záchrana nepálského šerpy — krátká reportáž v hlavních zprávách',                         year:2024, date:'19. 1. 2024',    href:'https://www.ceskatelevize.cz/porady/1097181328-udalosti/223411000101119/cast/1012232/' },
    { id:'pr_nova_2021',    type:'TV',      outlet:'TV Nova',                       title:'Skupinu Čechů v Nepálu skolil covid — online rozhovor z KTM',                             year:2021, date:'9. 5. 2021',     href:'https://tn.nova.cz/clanek/skupinu-cechu-v-nepalu-skolil-covid-nakazeny-je-i-horolezec-travnicek.html' },
    { id:'pr_ct_legenda',   type:'TV',      outlet:'Česká televize',                title:'S legendou přes hory — V Tiských stěnách s Márou Holečkem',                               year:2018, date:'2018',           href:'https://www.ceskatelevize.cz/porady/14625565902-s-legendou-pres-hory/222471291185103/' },
    { id:'pr_ct1_gejzir',   type:'TV',      outlet:'ČT 1 Gejzír',                  title:'Horolezec Jan Trávníček — dokument i s archivními záběry',                                year:2020, date:'5. 11. 2020',    href:'https://www.ceskatelevize.cz/porady/10805121298-gejzir/220562235000025/video/799482' },
    { id:'pr_prima_2020',   type:'TV',      outlet:'Prima COOL & ZOOM',             title:'COOL MOUNTAIN TRIP — Honza Tráva a Karel Kříž v Alpách',                                  year:2020, date:'11. 10. 2020',   href:'https://www.iprima.cz/filmy/cool-mountain-trip' },
    { id:'pr_ct24_2018',    type:'TV',      outlet:'ČT24',                          title:'Události, komentáře — Krásné a nebezpečné Himaláje',                                      year:2018, date:'říjen 2018',     href:'https://www.ceskatelevize.cz/porady/1096898594-udalosti-komentare/218411000371015/video/650559' },
    { id:'pr_sport5_2017',  type:'TV',      outlet:'TV Sport 5',                    title:'Obzory sportovních osobností — 15minutové rozvažování na téma hory',                      year:2017, date:'únor 2017',     href:'https://sport5.cz/extremni/obzory-sportovnich-osobnosti-2-c8b98938.html' },
    // Video
    { id:'pr_yt_hausbot24', type:'Video',   outlet:'Hausbot Petra Horkého',         title:'Světový výstup zakončený tragédií — Mára Holeček a Honza Trávníček',                     year:2024, date:'19. 12. 2024',   href:'https://www.youtube.com/watch?v=7c4yMmcbBzw' },
    { id:'pr_nahorutv24',   type:'Video',   outlet:'NaHoruTV',                      title:'Horolezec a nepálský hospodský Honza „Tráva" Trávníček',                                  year:2024, date:'22. 1. 2024',    href:'https://www.youtube.com/watch?v=jBWBaxCkZ9Q' },
    { id:'pr_yt_hausbot2',  type:'Video',   outlet:'YouTube — Petr Horký',          title:'Hausbot Petra Horkého — povídáme na střeše Czech Pubu',                                   year:2024, date:'2024',           href:'https://www.youtube.com/watch?v=AvjcrNsAB90' },
    { id:'pr_yt_skialpech', type:'Video',   outlet:'YouTube — Jirka Votava',        title:'Na skialpech s Jirkou Langmajerem',                                                        year:2021, date:'2021',           href:'https://www.youtube.com/watch?v=qTxYfK3ZE-s' },
    { id:'pr_yt_kozelka',   type:'Video',   outlet:'Hannibal produkce',             title:'Kolem Skal! — 7. KOZELKA',                                                                 year:2020, date:'11. 11. 2020',   href:'https://www.hanibal.cz/clanek/16516/kolem-skal-7-kozelka/' },
    { id:'pr_yt_srdcari',   type:'Video',   outlet:'Srdcaři',                       title:'S kopcolezcem o hranicích alpinismu',                                                      year:2020, date:'2020',           href:'https://www.youtube.com/watch?v=ZQlvteuwFQE' },
    { id:'pr_revma_vid20',  type:'Video',   outlet:'Revmatické nemoci.cz',          title:'Život s psoriázou — „Jsem extrémní sportovec"',                                           year:2020, date:'29. 11. 2020',   href:'https://www.revmaticke-nemoci.cz/videa-psorioza/jsem-extremni-sportovec-rika-honza-travnicek-i-po-15lete-znamosti-s-kloubni-lupenkou-1534' },
    { id:'pr_yt_dvorak',    type:'Video',   outlet:'Rise and Shine — Osobní Rozvoj',title:'Dvojrozhovor s Tomášem Dvořákem',                                                         year:2020, date:'9. 8. 2020',     href:'https://www.youtube.com/watch?v=o9JFp1EWyf8' },
    { id:'pr_yt_onsajt',    type:'Video',   outlet:'Hannibal produkce',             title:'Onsajt — medailonek pohledem Jana Šimánka',                                               year:2020, date:'2020',           href:'https://www.youtube.com/watch?v=_AH_TbNDNUI' },
    { id:'pr_yt_travel13',  type:'Video',   outlet:'Travel Journal',                title:'S Honzou Trávníčkem (nejen) na Gasherbrumu',                                               year:2013, date:'duben 2013',     href:'https://www.youtube.com/watch?v=5gSfhvcdAJ4' },
    { id:'pr_yt_anna12',    type:'Video',   outlet:'Horydoly.cz',                   title:'Tráva: Annapurna 2012 — „nejtěžší, co jsem v horách šel"',                                year:2012, date:'červen 2012',    href:'https://www.youtube.com/watch?v=Q6YnXVDNEe0' },
    { id:'pr_revma_vid12',  type:'Video',   outlet:'revmatické-nemoci.cz',          title:'S psoriázou na vrchol osmitisícovky — rozhovor s MUDr. Havlíčkem',                         year:2012, date:'2012',           href:'https://www.revmaticke-nemoci.cz/videa/s-proriazou-na-vrchol-osmitisicovky-741' },
    { id:'pr_yt_miri14',    type:'Video',   outlet:'YouTube',                       title:'Slack hovor s Miroslavou Jirkovou — rozhovor o highlinu',                                  year:2014, date:'27. 12. 2014',   href:'https://www.youtube.com/watch?v=qUFlE927gUc' },
    // Podcast
    { id:'pr_denik_pod22',  type:'Podcast', outlet:'Podcast Deník.cz',              title:'Na lupénku pomáhá biologická léčba — horolezec vozí injekce v termosce',                  year:2022, date:'9. 12. 2022',    href:'https://www.denik.cz/zdravi/podcast-lupenka-horolezec-honza-travnicek-injekce.html' },
    { id:'pr_smyslulne20',  type:'Podcast', outlet:'Smysluplné rozhovory',          title:'Hory nejde „dobýt" — rozhovor o životě, horách a Nepálu',                                 year:2020, date:'20. 10. 2020',   href:'https://open.spotify.com/episode/1LWFzJOP7ig7cdeBPvfMev' },
    { id:'pr_sportpod21',   type:'Podcast', outlet:'Sport a podnikání',             title:'Od sportu si můžu odskočit a vydělat si i jinde',                                          year:2021, date:'6. 5. 2021',     href:'https://sportapodnikani.cz/rozhovory/jan-travnicek/' },
    { id:'pr_blesk_pod21',  type:'Podcast', outlet:'Blesk',                         title:'Horolezec Trávníček vylezl s rakovinou na 2 osmitisícovky — teď otevírá Czech Pub',       year:2021, date:'17. 2. 2021',    href:'https://www.blesk.cz/clanek/zpravy-pribehy/669580/podcast-horolezec-travnicek-vylezl-s-rakovinou-na-2-osmitisicovky-ted-otevira-ceskou-hospodu-v-nepalu.html' },
    // Rádio
    { id:'pr_crplus_2025',  type:'Rádio',   outlet:'ČR Plus',                       title:'Jsem tam v práci, říká o Nepálu horolezec Trávníček',                                     year:2025, date:'14. 11. 2025',   href:'https://www.mujrozhlas.cz/hovory/jsem-tam-v-praci-rika-o-nepalu-horolezec-travnicek-broad-peak-chce-zdolat-znovu-tentokrat' },
    { id:'pr_wave_casabl',  type:'Rádio',   outlet:'Rádio Wave — Casablanca',       title:'Na Nepál jeden život nestačí — šrámy i radosti z hor',                                    year:2021, date:'2021',           href:'https://wave.rozhlas.cz/na-nepal-jeden-zivot-nestaci-horolezec-honza-trava-travnicek-o-sramech-i-9197206' },
    { id:'pr_cro_zalety',   type:'Rádio',   outlet:'Český rozhlas — Zálety',        title:'Horolezec Honza Trávníček: Doufám, že důchod strávím v Nepálu',                           year:2021, date:'2021',           href:'https://pardubice.rozhlas.cz/horolezec-honza-travnicek-doufam-ze-duchod-stravim-v-nepalu-8729308' },
    { id:'pr_cro_potme21',  type:'Rádio',   outlet:'Český rozhlas — Světluška',     title:'PO TMĚ — Jan „Tráva" Trávníček a Jan Říha',                                               year:2021, date:'8. 7. 2021',     href:'https://www.mujrozhlas.cz/potme/jan-trava-travnicek-jan-riha-ze-nevidim-panoramata-mi-nevadi-pro-me-je-dulezite-vylezt-nahoru' },
    { id:'pr_cro_dab21',    type:'Rádio',   outlet:'Český rozhlas DAB',             title:'Mám to v hlavě srovnané, proto pořád žiju — pořad Až na dřeň',                           year:2021, date:'25. 4. 2021',    href:'https://dabpraha.rozhlas.cz/mam-v-hlave-srovnane-proto-porad-ziju-rika-horolezec-jan-travnicek-ktery-zdolal-8474007' },
    { id:'pr_cro_voldany',  type:'Rádio',   outlet:'Český rozhlas HK & Pardubice',  title:'Na cestách s Petrem Voldánem — Pět pokusů a pět zdolaných osmitisícovek',                 year:2020, date:'5. 10. 2020',    href:'https://hradec.rozhlas.cz/na-cestach-s-horolezcem-janem-travou-travnickem-aneb-pet-pokusu-a-pet-zdolanych-8331480' },
    { id:'pr_cro_rakovina', type:'Rádio',   outlet:'Radiožurnál',                   title:'Mám s rakovinou příměří — Olympijský podcast',                                             year:2020, date:'2020',           href:'https://radiozurnal.rozhlas.cz/node/8198103/share' },
    { id:'pr_cro_hk19',     type:'Rádio',   outlet:'Český rozhlas Hradec Králové',  title:'Dobrý horolezec je ten, co přežil a vrátil se dolů',                                     year:2019, date:'22. 11. 2019',   href:'https://hradec.rozhlas.cz/dobry-horolezec-je-ten-co-prezil-a-vratil-se-dolu-jan-travnicek-neni-zadny-8111613' },
    { id:'pr_cro_plzen19',  type:'Rádio',   outlet:'Český rozhlas Plzeň',           title:'Vrchol hory nezdolávám, hora mě tam musí pustit',                                         year:2019, date:'26. 7. 2019',    href:'https://plzen.rozhlas.cz/vrchol-hory-nezdolavam-hora-me-tam-musi-pustit-8024339' },
    { id:'pr_cro_plzen16b', type:'Rádio',   outlet:'Český rozhlas Plzeň',           title:'Náš host — O návratu z Cho Oyu i s Miri',                                                year:2016, date:'prosinec 2016',  href:'https://prehravac.rozhlas.cz/audio/3760270' },
    { id:'pr_cro_junior16', type:'Rádio',   outlet:'Český rozhlas — Rádio Junior',  title:'Klub Rádia Junior — O horském životě nejen pro juniory',                                 year:2016, date:'únor 2016',      href:'https://prehravac.rozhlas.cz/audio/3575195' },
    { id:'pr_cro_plzen16a', type:'Rádio',   outlet:'Český rozhlas Plzeň',           title:'Náš host — Chystáme se do Tibetu (rozhovor s Miri)',                                     year:2016, date:'květen 2016',    href:'https://prehravac.rozhlas.cz/audio/3639577' },
    { id:'pr_cro2_2014',    type:'Rádio',   outlet:'Český Rozhlas 2',               title:'Host do domu — rozhovor s Martinou Kociánovou',                                           year:2014, date:'září 2014',      href:'https://prehravac.rozhlas.cz/audio/3203942' },
    { id:'pr_radiozurnal14',type:'Rádio',   outlet:'Radiožurnál',                   title:'Host Lucie Výborné — společný rozhovor s Radkem Jarošem po K2',                          year:2014, date:'srpen 2014',     href:'https://prehravac.rozhlas.cz/audio/3182093' },
    { id:'pr_cro_hk14',     type:'Rádio',   outlet:'Český rozhlas Hradec Králové',  title:'PéHáčko — páteční host Habaděje',                                                        year:2014, date:'únor 2014',      href:'https://prehravac.rozhlas.cz/audio/3315030' },
    { id:'pr_cro_plzen12',  type:'Rádio',   outlet:'Český rozhlas Plzeň',           title:'Náš host — O Annapurně a dalších plánech',                                               year:2012, date:'listopad 2012',  href:'https://prehravac.rozhlas.cz/audio/2777099' },
    // Online
    { id:'pr_crunch_2026',  type:'Online',  outlet:'Czech Crunch',                  title:'Do Himálaje vozí stovky lidí, má tam českou hospodu i hotel',                             year:2026, date:'3. 1. 2026',     href:'https://cc.cz/do-himalaje-vozi-stovky-lidi-ma-tam-ceskou-hospodu-i-hotel-jsou-20-let-pozadu-ale-je-to-raj-rika/' },
    { id:'pr_aktualne25',   type:'Online',  outlet:'Aktuálně.cz',                   title:'Jaký jsem hospodský — Vozit pivo do Nepálu je jako nosit dříví do lesa',                  year:2025, date:'6. 1. 2025',     href:'https://magazin.aktualne.cz/czech-pub-himalaj/r~d663a8b8be1e11efbb77ac1f6b220ee8/' },
    { id:'pr_idnes_2024a',  type:'Online',  outlet:'iDnes',                         title:'Žádná cukrová vata, jen vzácné rady — Peak fest',                                         year:2024, date:'6. 9. 2024',     href:'https://www.idnes.cz/liberec/zpravy/festival-osada-jizerka-rady-do-hor-prvni-pomoc-extremni-podminky.A240906_816881_liberec-zpravy_cink' },
    { id:'pr_plzdenik24',   type:'Online',  outlet:'Plzeňský deník',                title:'S rakovinou Plzeňan Trávníček uzavřel příměří, teď zvládl šestou osmitisícovku',          year:2024, date:'24. 8. 2024',    href:'https://plzensky.denik.cz/zpravy_region/rakovina-jan-travnicek-plzen-horolezec.html' },
    { id:'pr_emontana24',   type:'Online',  outlet:'Emontana',                      title:'Vyrážíme s nepálskými parťáky — Honza „Tráva" o expedici Broad Peak 2024',                year:2024, date:'27. 6. 2024',    href:'https://www.emontana.cz/honza-travnicek-rozhovor-k2-broad-peak/' },
    { id:'pr_idnes_2024b',  type:'Online',  outlet:'iDnes',                         title:'Štěstí, že sehnali volný vrtulník — Češi v Himálaji zachraňovali šerpu',                  year:2024, date:'5. 4. 2024',     href:'https://www.idnes.cz/liberec/zpravy/ama-dablam-nepal-serpa-zachrana-expedice-cesi-hory-himalaj.A240131_773819_liberec-zpravy_lav' },
    { id:'pr_barbar_2024',  type:'Online',  outlet:'Časopis Barbar',                title:'Kopcolezec s českou hospodou v Nepálu',                                                    year:2024, date:'18. 1. 2024',    href:'https://www.casopisbarbar.cz/osobnosti/kopcolezec-s-ceskou-hospodou-v-nepalu' },
    { id:'pr_idnes_2023',   type:'Online',  outlet:'iDnes',                         title:'Když se poddáte, končíte. Chytne vás chaos, říká o rakovině horolezec Trávníček',         year:2023, date:'8. 5. 2023',     href:'https://www.idnes.cz/xman/rozhovory/honza-trava-travnicek-nepal-horolezec-expedice.A230405_180252_xman-rozhovory_albe' },
    { id:'pr_denik_2022',   type:'Online',  outlet:'Deník.cz',                      title:'Lupénka horolezce odrovnala. Nyní znovu zdolává osmitisícovky',                           year:2022, date:'29. 10. 2022',   href:'https://www.denik.cz/zdravi/lupenka-psoriaza-horolezec-jan-travnicek.html' },
    { id:'pr_aktualne21b',  type:'Online',  outlet:'Aktuálně.cz',                   title:'Spor o vrchol Hory ducha — politicko-byznysová hra, říká horolezec',                      year:2021, date:'7. 10. 2021',    href:'https://sport.aktualne.cz/ostatni-sporty/travnicek-hora-ducha-manaslu/r~ce58945226d811ecbc3f0cc47ab5f122/' },
    { id:'pr_idnes_2021',   type:'Online',  outlet:'iDnes / Téma',                  title:'Tým je důležitý. Na osmitisícovce je ale každý sám za sebe',                              year:2021, date:'11. 6. 2021',    href:'https://www.idnes.cz/cestovani/kolem-sveta/jan-travnicek-horolezec-cestovatel-nepal-mount-everest-k2.A210610_122754_xman-adrenalin_lisv' },
    { id:'pr_forbes_2021',  type:'Online',  outlet:'Forbes',                        title:'Plzeň a smažák pod Himalájem — Jak horolezci otevřeli Czech Pub v Nepálu',                year:2021, date:'9. 5. 2021',     href:'https://forbes.cz/plzen-a-smazak-pod-himalaji-jak-horolezci-otevreli-czech-pub-v-nepalu/' },
    { id:'pr_aktualne21a',  type:'Online',  outlet:'Aktuálně.cz',                   title:'Covid se šíří i pod Everestem — Nepálci podcenili situaci',                               year:2021, date:'8. 5. 2021',     href:'https://sport.aktualne.cz/ostatni-sporty/covid-v-nepalu/r~be499736af4711eb9f15ac1f6b220ee8/' },
    { id:'pr_blesk_k2_20',  type:'Online',  outlet:'Blesk',                         title:'„Jediný Čech, který vylezl na K2 s rakovinou" — odmítl se poddat těžké nemoci',           year:2020, date:'13. 10. 2020',  href:'https://www.blesk.cz/clanek/zpravy-udalosti/653008/jediny-cech-ktery-vylezl-na-k2-s-rakovinou-honza-44-se-odmitl-poddat-tezke-nemoci.html' },
    { id:'pr_lidovky20b',   type:'Online',  outlet:'Lidovky',                       title:'Jediná Češka, která leze na osmitisícovky bez kyslíku (Miri)',                            year:2020, date:'7. 10. 2020',    href:'https://www.lidovky.cz/lide/jedina-ceska-ktera-leze-na-osmitisicovky-bez-kysliku-vyska-je-miste-ktere-me-spojuje-s-mym-vlastnim.A201005_194407_lide_ape' },
    { id:'pr_lidovky20a',   type:'Online',  outlet:'Lidovky',                       title:'Jakou míru vážnosti nemoci přisoudíte, takovou má — horolezec bojující s rakovinou',      year:2020, date:'20. 5. 2020',    href:'https://www.lidovky.cz/lide/jakou-miru-vaznosti-nemoci-prisoudite-takovou-ma-rika-cesky-horolezec-bojujici-s-rakovinou.A200515_105328_lide_ape' },
    { id:'pr_rp_blog20',    type:'Online',  outlet:'Rock Point Blog',               title:'Blog Rock Point — mnoho rozhovorů (ambasador RP)',                                         year:2020, date:'2020',           href:'https://www.rockpoint.cz/blog-zona?id_tag=34' },
    { id:'pr_idnes_2018b',  type:'Online',  outlet:'iDnes',                         title:'Pátrání po ztraceném krajanovi rozjel v Himálaji plzeňský horolezec',                     year:2018, date:'říjen 2018',     href:'https://plzen.idnes.cz/jan-travnicek-horolezec-himalaj-hora-manaslu-pohresovany-patrani-hlavka-14s-/plzen-zpravy.aspx?c=A181006_431253_plzen-zpravy_vb' },
    { id:'pr_georevue17',   type:'Online',  outlet:'Georevue',                      title:'Osma se na plán neptá — „geodetický" rozhovor o horách',                                  year:2017, date:'březen 2017',    href:'https://hrdlicka.cz/georevue/nas-geodet-j-travnicek-cho-oyu-osma-se-plan-nepta/' },
    { id:'pr_nachod17',     type:'Online',  outlet:'Náchodský deník',               title:'Je to o tom, mít někoho, kdo vás povede',                                                 year:2017, date:'březen 2017',    href:'https://nachodsky.denik.cz/ostatni_region/je-to-o-tom-mit-nekoho-kdo-vas-povede-20170314.html' },
    { id:'pr_prosport16',   type:'Online',  outlet:'Prosport',                      title:'Expedice Cho Oyu chronologicky — téměř den po dni',                                       year:2016, date:'říjen 2016',     href:'https://www.prosport.cz/lowa/novinky/271' },
    { id:'pr_lezec16',      type:'Online',  outlet:'lezec.cz',                      title:'S nevidomým Honzou Říhou na cestě na Cho Oyu (8201 m)',                                   year:2016, date:'září 2016',      href:'http://www.lezec.cz/clanek.php?key=13192' },
    { id:'pr_rp_miri16',    type:'Online',  outlet:'Rock Point',                    title:'S Miri na slovíčko...',                                                                    year:2016, date:'červen 2016',    href:'https://www.rockpoint.cz/na-slovicko-s-miri' },
    { id:'pr_lezec15',      type:'Online',  outlet:'lezec.cz',                      title:'C4 — situace expedice Namaslu 2015',                                                       year:2015, date:'říjen 2015',     href:'http://www.lezec.cz/clanek.php?key=12537' },
    { id:'pr_eldiario14',   type:'Online',  outlet:'eldiario.es',                   title:'El checo Jan Travnicek, friend de Ternua, comienza su expedición al K2',                  year:2014, date:'červenec 2014',  href:'https://www.eldiario.es/campobase/noticias/Jan_Travnicek-Ternua-K2_0_277872416.html' },
    { id:'pr_svetout14',    type:'Online',  outlet:'Svět Outdooru',                 title:'Posledních pár let směřuji k tréninku a přípravě na expedice',                            year:2014, date:'březen 2014',    href:'https://www.svetoutdooru.cz/serialy/15932-honza-trava-travnicek-cely-svuj-zivot-smeruji-k-treninku-priprave-a-vydelavani-penez-na-expedice/' },
    { id:'pr_pohora13',     type:'Online',  outlet:'Pohora',                        title:'Honza Tráva Trávníček před K2: Zatím to vůbec neřešíme',                                  year:2013, date:'prosinec 2013',  href:'https://www.pohora.cz/horolezectvi/honza-trava-travnicek-pred-k2-zatim-to-vubec-neresime/' },
    { id:'pr_lezec12a',     type:'Online',  outlet:'lezec.cz',                      title:'Přeci mu nezkazím den — Jaroš a Tráva na Annapurně',                                      year:2012, date:'červen 2012',    href:'http://www.lezec.cz/clanek.php?key=10288' },
    { id:'pr_iroz12',       type:'Online',  outlet:'iRozhlas',                      title:'Horolezec Trávníček po Annapurně: Na Everest nikdy nepůjde',                              year:2012, date:'červen 2012',    href:'https://www.irozhlas.cz/sport_ostatni-sporty/horolezec-travnicek-se-po-zdolani-annapurny-zarekl-ze-na-everest-nikdy-nepujde_201206011908_jkanta' },
    { id:'pr_lezec11b',     type:'Online',  outlet:'lezec.cz',                      title:'Expedice Manaslu 2011 — vyprávění o vrcholu',                                              year:2011, date:'srpen 2011',     href:'http://www.lezec.cz/clanky.php?key=9646' },
    { id:'pr_lezec11a',     type:'Online',  outlet:'lezec.cz',                      title:'Expedice Manaslu — expedice odlétá',                                                       year:2011, date:'březen 2011',    href:'http://www.lezec.cz/clanky.php?key=9342' },
    { id:'pr_lezec10',      type:'Online',  outlet:'lezec.cz',                      title:'Jak se Tráva na osmitisícovku vyškrábal',                                                  year:2010, date:'srpen 2010',     href:'http://www.lezec.cz/clanky.php?key=8398' },
    { id:'pr_plzdenik09o',  type:'Online',  outlet:'Plzeňský deník',                title:'Plzeňští horolezci míří do pohoří Karákoram',                                              year:2009, date:'červen 2009',    href:'https://plzensky.denik.cz/zpravy_region/plzensti-horolezci-miri-do-pohori-karakoram.html' },
    { id:'pr_lezec09',      type:'Online',  outlet:'lezec.cz',                      title:'Expedice Gasherbrum I',                                                                    year:2009, date:'červen 2009',    href:'http://www.lezec.cz/clanek.php?key=6846' },
    // Tisk
    { id:'pr_kult22',       type:'Tisk',    outlet:'KULT',                          title:'KULT — Workoholik s budhistickou pokorou v duši',                                          year:2022, date:'listopad 2022',  href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/retro_kult_03-1-1.pdf' },
    { id:'pr_ivitro21',     type:'Tisk',    outlet:'iVitro (SK)',                    title:'Netúžil som len športovať, chcel som sa hýbať',                                           year:2021, date:'2021',           href:'https://issuu.com/alphamedicalinvitro/docs/_web_invitro_3-2021/40' },
    { id:'pr_montana21',    type:'Tisk',    outlet:'Montana',                        title:'Regenerací k trvalému sportu — o přípravě na expedice',                                    year:2021, date:'září 2021',      href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Trava_montana.pdf' },
    { id:'pr_travel21',     type:'Tisk',    outlet:'Travel life',                   title:'Horní Mustang — zakázané království',                                                      year:2021, date:'březen 2021',    href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/trava_rozhovor_travel_petragerif.pdf' },
    { id:'pr_metro_miri20', type:'Tisk',    outlet:'Deník Metro',                   title:'Strach je jeden z mých nejlepších kamarádů — Miroslava Jirková',                          year:2020, date:'23. 10. 2020',  href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/metro_miri_23_10_2020.jpeg' },
    { id:'pr_skylink20',    type:'Tisk',    outlet:'Skylink',                       title:'Kopce a čerstvý vzduch mi pomohly k uzdravení',                                            year:2020, date:'červen 2020',    href:'https://read.skylink.cz/cz-13-2020/rozhovor-s-horolezcem-janem-travnickem/' },
    { id:'pr_metro20',      type:'Tisk',    outlet:'Deník Metro',                   title:'Hlava je mocný pomocník, ale...',                                                          year:2020, date:'7. 5. 2020',     href:'https://e.metro.cz/#strana=14' },
    { id:'pr_svetsportu20', type:'Tisk',    outlet:'Svět sportu',                   title:'Nepál je návykový — velký rozhovor do sportovního časopisu',                               year:2020, date:'duben 2020',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Svet-sportu-2_2020-1.pdf' },
    { id:'pr_idnes_mera19', type:'Tisk',    outlet:'iDnes',                         title:'Výstup na Mera Peak — Nepál (zápisky Petra Havránka)',                                     year:2019, date:'podzim 2019',    href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Nepal_2019_text_petr.pdf' },
    { id:'pr_lhory18',      type:'Tisk',    outlet:'lidé&HORY',                     title:'Nehody v horách — Manáslu 2018',                                                           year:2018, date:'prosinec 2018',  href:'https://www.honzatravnicek.cz/wp-content/uploads/2019/01/Tráva_Manaslu_nehoda.pdf' },
    { id:'pr_lhory17',      type:'Tisk',    outlet:'lidé&HORY',                     title:'Expedice Cho Oyu 2016 — jak to všechno dopadlo',                                           year:2017, date:'červen 2017',    href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Expdice-Cho-Oyu-2016-lideaHORY-cerven-2017.pdf' },
    { id:'pr_mfdnes16',     type:'Tisk',    outlet:'MF Dnes Víkend',                title:'Na život na smrt — Cena Fair play',                                                        year:2016, date:'duben 2016',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Na-zivot-a-na-smrt.pdf' },
    { id:'pr_zdravie16',    type:'Tisk',    outlet:'Zdravie (SK)',                   title:'Môj výstup na obrubník — obsáhlý rozhovor o lupénce',                                     year:2016, date:'2016',           href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Moj-vystup-na-obrubnik-Zdravie-2016.pdf' },
    { id:'pr_lhory15b',     type:'Tisk',    outlet:'lidé&HORY',                     title:'S Trávou na osmitisícovku VI — Z Cho Oyu se vylíhla Manaslu!',                            year:2015, date:'prosinec 2015',  href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/S-Travou-na-osmitisicovku-VI.pdf' },
    { id:'pr_mfdnes15',     type:'Tisk',    outlet:'MF Dnes',                       title:'Drama horolezců. Na Manáslu zachraňovali kolegy',                                          year:2015, date:'listopad 2015',  href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Drama-horolezcu_Na-Manaslu-zachranovali-kolegy-MF-Dnes-listopad-2015.pdf' },
    { id:'pr_lhory15a',     type:'Tisk',    outlet:'lidé&HORY',                     title:'S Trávou na osmitisícovku I — Plán zní jasně: Cho Oyu 2015',                              year:2015, date:'únor 2015',      href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/S-Travou-na-osmitisicovku-I.pdf' },
    { id:'pr_plzmfdnes14',  type:'Tisk',    outlet:'Plzeňská MF Dnes',              title:'Na K2 bylo plno, někde se dělala i fronta',                                                year:2014, date:'srpen 2014',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Na-K2-bylo-plno-nekde-se-delala-i-fronta.pdf' },
    { id:'pr_respekt12',    type:'Tisk',    outlet:'Respekt',                       title:'Stan, spacák a pohoda',                                                                    year:2012, date:'červen 2012',    href:'https://www.respekt.cz/tydenik/2012/23/stan-spacak-a-pohoda' },
    { id:'pr_lhory12',      type:'Tisk',    outlet:'lidé&HORY',                     title:'Na návštěvě u Aničky — Annapurna očima Radka Jaroše a Honzy Trávy',                       year:2012, date:'duben 2012',     href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Na-navsteve-u-Anicky-lideaHory-duben-2012.pdf' },
    { id:'pr_plzdenik12',   type:'Tisk',    outlet:'Plzeňský deník',                title:'Jan Trávníček: Annapurna bylo docela peklo',                                               year:2012, date:'červen 2012',    href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/09/Jan-Travnicek_Annapurna-bylo-docela-peklo-denik-cerven-2012.pdf' },
    { id:'pr_everest11',    type:'Tisk',    outlet:'Everest',                       title:'S Honzou Trávou o výpravě na Manaslu 2011',                                                year:2011, date:'podzim 2011',    href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/S-Honzou-Travou-o-vyprave-na-Manaslu-2011.pdf' },
    { id:'pr_plzdenik09b',  type:'Tisk',    outlet:'Plzeňský deník',                title:'Chystají se na osmitisícovku',                                                             year:2009, date:'červenec 2009',  href:'https://www.honzatravnicek.cz/wp-content/uploads/2018/08/Chystaji-se-na-osmitisicovku.pdf' },
];

const TYPE_CONFIG = {
    'TV':      { Icon: Tv,         accent: 'text-sky-400'     },
    'Video':   { Icon: Play,       accent: 'text-red-400'     },
    'Rádio':   { Icon: Radio,      accent: 'text-amber-400'   },
    'Tisk':    { Icon: Newspaper,  accent: 'text-slate-300'   },
    'Online':  { Icon: Globe,      accent: 'text-emerald-400' },
    'Podcast': { Icon: Headphones, accent: 'text-gold-400'    },
};

const CONTENT_BUTTONS = [
    { key: 'video',   Icon: Play,     label: 'Vlogy & Expedice', sub: 'YouTube · postupně plníme',      iconBg: 'from-red-500 to-red-700',       glow: 'shadow-red-500/30'    },
    { key: 'podcast', Icon: Mic,      label: 'Podcast',          sub: 'Audio — 2027', iconBg: 'from-violet-500 to-purple-700', glow: 'shadow-violet-500/30' },
    { key: 'blog',    Icon: FileText, label: 'Psané příběhy',    sub: 'Blog',         iconBg: 'from-gold-500 to-amber-600',    glow: 'shadow-gold-500/30'   },
];

const TYPES = ['Vše', 'TV', 'Video', 'Rádio', 'Podcast', 'Online', 'Tisk'];
const YEARS = ['Vše', 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009];

/* ── Press row — dark (inline) + light (modal) variants ── */
const PressRow = ({ item, compact = false, dark = false }) => {
    const { Icon, accent } = TYPE_CONFIG[item.type];
    return (
        <a
            href={item.href}
            className={`group flex items-center gap-3 rounded-xl transition-all ${
                dark
                    ? `bg-white/[0.06] border border-white/10 hover:bg-white/[0.11] hover:border-white/20 ${compact ? 'p-2.5' : 'p-3'}`
                    : `bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md ${compact ? 'p-2.5' : 'p-3.5'}`
            }`}
        >
            <div className={`shrink-0 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md ${compact ? 'w-8 h-8' : 'w-9 h-9'}`}>
                <Icon className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${accent}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`font-sans font-bold truncate ${compact ? 'text-[11px]' : 'text-xs md:text-sm'} ${dark ? 'text-white/90' : 'text-slate-800'}`}>{item.outlet}</p>
                <p className={`font-sans truncate ${compact ? 'text-[10px]' : 'text-[11px] md:text-xs'} ${dark ? 'text-white/40' : 'text-slate-400'}`}>{item.title}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
                <span className={`font-mono hidden md:block ${compact ? 'text-[10px]' : 'text-[11px]'} ${dark ? 'text-white/30' : 'text-slate-400'}`}>{item.date}</span>
                <ExternalLink className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} transition-colors ${dark ? 'text-white/20 group-hover:text-white/50' : 'text-slate-300 group-hover:text-slate-500'}`} />
            </div>
        </a>
    );
};

function mergeMediaAdmin(base, adminArr) {
    if (!adminArr) return base;
    const merged = base.map(item => {
        const ov = adminArr.find(a => a.id === item.id);
        return ov ? { ...item, ...ov } : item;
    });
    return [...merged, ...adminArr.filter(a => !base.find(b => b.id === a.id))];
}

const Media = ({ scrollProgress }) => {
    const MEDIA_DATA = {
        video:   mergeMediaAdmin(MEDIA_DATA_DEF.video,   loadContent('media_video',   null)),
        podcast: mergeMediaAdmin(MEDIA_DATA_DEF.podcast, loadContent('media_podcast', null)),
        blog:    mergeMediaAdmin(MEDIA_DATA_DEF.blog,    loadContent('media_blog',    null)),
    };
    const pressItems = mergeMediaAdmin(PRESS_ITEMS, loadContent('press', null));
    const [activeItem, setActiveItem] = useState(null);
    const [readingArticle, setReadingArticle] = useState(false);
    const [pressFilter, setPressFilter] = useState('Vše');
    const [pressYear, setPressYear] = useState('Vše');
    const [showAllPress, setShowAllPress] = useState(false);

    useScrollLock(activeItem || readingArticle || showAllPress);

    // PHASE 10: 0.77 -> 0.90
    const containerOpacity = useTransform(scrollProgress, [0.77, 0.80, 0.87, 0.90], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [0.77, 0.80, 0.87, 0.90], ["-120%", "0%", "0%", "100%"]);
    const bgParallax = useTransform(scrollProgress, [0.75, 0.92], ['-10%', '10%']);

    const filteredPress = useMemo(() => pressItems.filter(item => {
        const typeMatch = pressFilter === 'Vše' || item.type === pressFilter;
        const yearMatch = pressYear === 'Vše' || item.year === pressYear;
        return typeMatch && yearMatch;
    }), [pressFilter, pressYear]);

    return (
        <>
        {/* BACKGROUND — dark cinematic mountain photo */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 0 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            <motion.div style={{ y: bgParallax }} className="absolute inset-0 scale-110 origin-center">
                <img loading="lazy" src={ClimbersImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            {/* Main dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/88" />
            {/* Top gold-tinted atmospheric glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_35%_at_50%_0%,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
            {/* Bottom dark anchor */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-slate-950/70 to-transparent" />
        </motion.div>

        {/* CONTENT */}
        <motion.div
            style={{ opacity: containerOpacity, y, zIndex: 70 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* ── Mobile layout ── */}
            <div className="md:hidden w-full h-full flex flex-col pointer-events-auto overflow-hidden">

                {/* Photo header */}
                <div className="shrink-0 relative overflow-hidden" style={{ height: '38%' }}>
                    <img loading="lazy" src={BaseCampImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/80" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-4 gap-3">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="h-px w-6 bg-gold-400/60" />
                                <span className="text-gold-400 font-mono uppercase tracking-[0.3em] text-[9px] font-bold">09 — Média</span>
                                <div className="h-px w-6 bg-gold-400/60" />
                            </div>
                            <h2 className="font-serif text-2xl text-white leading-tight">
                                Příběhy z batohu i éteru
                            </h2>
                        </div>
                        <div className="flex gap-6">
                            {[
                                { num: '16+', label: 'Médií' },
                                { num: '9',   label: 'Videí' },
                                { num: '9',   label: 'Podcastů' },
                            ].map(({ num, label }) => (
                                <div key={label} className="text-center">
                                    <p className="font-serif text-2xl text-white font-bold leading-none">{num}</p>
                                    <p className="text-white/50 text-[9px] uppercase tracking-wider font-bold mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dark content area */}
                <div className="flex-1 flex flex-col min-h-0 px-4 pt-3 pb-3 gap-2.5 overflow-hidden">

                    {/* Own content tiles */}
                    <div className="shrink-0 flex gap-2">
                        {CONTENT_BUTTONS.map(({ key, Icon, label, sub, iconBg, glow }) => (
                            <button
                                key={key}
                                onClick={() => setActiveItem(MEDIA_DATA[key][0])}
                                className="flex-1 flex flex-col items-center gap-2 py-3 px-2 bg-white/[0.07] border border-white/10 rounded-xl hover:bg-white/[0.12] hover:border-white/20 transition-all active:scale-95"
                            >
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg ${glow}`}>
                                    <Icon className="w-4 h-4 text-white" fill={key === 'video' ? 'currentColor' : 'none'} />
                                </div>
                                <p className="font-sans font-bold text-white/80 text-[10px] uppercase tracking-wider leading-none">{label}</p>
                                <p className="font-sans text-white/35 text-[9px] leading-none">{sub}</p>
                            </button>
                        ))}
                    </div>

                    {/* Press section — mobile */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-1.5 shrink-0">
                            <span className="text-white/40 font-mono text-[9px] uppercase tracking-[0.25em] font-bold">V médiích</span>
                            <a href="https://www.honzatravnicek.cz/media/" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-gold-400/60 hover:text-gold-400 text-[8px] font-bold uppercase tracking-widest transition-colors">
                                Celý seznam <ExternalLink className="w-2 h-2" />
                            </a>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2 shrink-0">
                            {TYPES.map(t => (
                                <button key={t} onClick={() => setPressFilter(t)}
                                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all border ${
                                        pressFilter === t
                                            ? 'bg-white/90 text-slate-900 border-white/80'
                                            : 'bg-white/[0.07] text-white/50 border-white/15 hover:text-white/80'
                                    }`}
                                >{t}</button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1.5 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {filteredPress.slice(0, 3).map((item, idx) => (
                                    <motion.div key={item.id}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: idx * 0.04 }}
                                    >
                                        <PressRow item={item} compact dark />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {filteredPress.length > 3 && (
                            <button onClick={() => setShowAllPress(true)}
                                className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-gold-400 flex items-center justify-center gap-1 shrink-0"
                            >
                                Zobrazit všech {filteredPress.length} <ArrowRight className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Desktop layout ── */}
            <div className="hidden md:flex w-full h-full items-center justify-center px-8 lg:px-16 xl:px-20 pointer-events-auto">
                <div className="w-full max-w-6xl flex flex-col gap-5 lg:gap-7">

                    {/* Desktop header */}
                    <div className="text-center shrink-0">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="h-px w-12 bg-gold-400/50" />
                            <span className="text-gold-400 font-mono uppercase tracking-[0.35em] text-[10px] font-bold">09 — Média &amp; Obsah</span>
                            <div className="h-px w-12 bg-gold-400/50" />
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-2">
                            Příběhy, které se<br />
                            <span className="italic text-white/60">do batohu nevešly</span>
                        </h2>
                        <p className="font-sans text-white/45 text-sm lg:text-base max-w-lg mx-auto">
                            Vlastní obsah z expedic i mediální výstupy — vše na jednom místě.
                        </p>
                    </div>

                    {/* Two-column body */}
                    <div className="grid grid-cols-[5fr_8fr] gap-8 lg:gap-12 xl:gap-14 w-full">

                        {/* Left: Own content */}
                        <div>
                            {/* Featured photo card */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-2xl group cursor-pointer border border-white/10"
                                onClick={() => setActiveItem(MEDIA_DATA.video[0])}
                            >
                                <img loading="lazy" src={ClimbersImg} alt="Honza v terénu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-gold-400 font-mono text-[9px] font-bold uppercase tracking-widest mb-1">Vlastní obsah</p>
                                    <h5 className="font-serif text-white text-lg leading-tight">Přímý přenos z expedic</h5>
                                    <p className="font-sans text-white/45 text-xs mt-0.5">Vlogy · Podcast · Blog</p>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-1.5">
                                    {[
                                        { num: '9+', label: 'videí' },
                                        { num: '9+', label: 'podcastů' },
                                    ].map(({ num, label }) => (
                                        <div key={label} className="bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                                            <span className="font-serif text-white font-bold text-sm">{num}</span>
                                            <span className="font-sans text-white/50 text-[9px] ml-1">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {CONTENT_BUTTONS.map(({ key, Icon, label, sub, iconBg, glow }) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveItem(MEDIA_DATA[key][0])}
                                        className="group flex items-center gap-3.5 p-3 bg-white/[0.06] border border-white/[0.09] rounded-xl hover:bg-white/[0.11] hover:border-white/20 transition-all text-left"
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg ${glow} shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                                            <Icon className="w-4.5 h-4.5 text-white" fill={key === 'video' ? 'currentColor' : 'none'} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-sans font-bold text-white/85 text-xs uppercase tracking-widest">{label}</p>
                                            <p className="font-sans text-white/35 text-[11px] mt-0.5">{sub}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 shrink-0 group-hover:translate-x-1 transition-all duration-200" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Press */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h5 className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                                    V médiích
                                </h5>
                                <a href="https://www.honzatravnicek.cz/media/" target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-gold-400/70 hover:text-gold-400 text-[9px] font-bold uppercase tracking-widest transition-colors">
                                    Celý seznam <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            </div>

                            {/* Filter bar */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {TYPES.map(t => (
                                    <button key={t} onClick={() => setPressFilter(t)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                            pressFilter === t
                                                ? 'bg-white/90 text-slate-900 border-white/80'
                                                : 'bg-white/[0.06] text-white/50 border-white/10 hover:bg-white/[0.11] hover:text-white/80 hover:border-white/20'
                                        }`}
                                    >{t}</button>
                                ))}
                                <span className="w-px bg-white/10 self-stretch mx-0.5" />
                                {YEARS.map(yr => (
                                    <button key={yr} onClick={() => setPressYear(yr === pressYear ? 'Vše' : yr)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all border ${
                                            pressYear === yr
                                                ? 'bg-gold-500 text-white border-gold-500'
                                                : 'bg-white/[0.06] text-white/50 border-white/10 hover:bg-white/[0.11] hover:text-white/80 hover:border-white/20'
                                        }`}
                                    >{yr}</button>
                                ))}
                            </div>

                            {/* Press list */}
                            <div className="flex flex-col gap-1.5">
                                <AnimatePresence mode="popLayout">
                                    {filteredPress.slice(0, 5).map((item, idx) => (
                                        <motion.div key={item.id}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ delay: idx * 0.04, duration: 0.2 }}
                                        >
                                            <PressRow item={item} dark />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {filteredPress.length > 5 && (
                                <button onClick={() => setShowAllPress(true)}
                                    className="mt-3 w-full text-center text-[10px] font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors flex items-center justify-center gap-1.5"
                                >
                                    Zobrazit všech {filteredPress.length} výstupů
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* ── Own content detail modal (light) ── */}
        <AnimatePresence>
            {activeItem && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4 md:p-8 pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white/95 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-[2rem] max-w-5xl w-full max-h-[95vh] overflow-y-auto relative flex flex-col overscroll-contain"
                        data-lenis-prevent
                    >
                        <button onClick={() => { setReadingArticle(false); setActiveItem(null); }}
                            className="absolute top-5 right-5 p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition text-slate-600 z-50"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-7 md:p-11">
                            <AnimatePresence mode="wait">
                                {!readingArticle ? (
                                    <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                                        <div className="flex flex-col md:flex-row gap-7 lg:gap-10 mb-10">
                                            <div className={`w-full ${activeItem.type === 'video' ? 'md:w-3/5' : 'md:w-1/2'} aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl group`}>
                                                <img loading="lazy" src={activeItem.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" alt={activeItem.title} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-2xl">
                                                        {activeItem.type === 'video'   && <Play     className="w-8 h-8 text-white fill-white ml-1 drop-shadow-lg" />}
                                                        {activeItem.type === 'podcast' && <Mic      className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />}
                                                        {activeItem.type === 'blog'    && <FileText className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 text-left flex flex-col justify-center">
                                                <span className="text-gold-600 font-sans font-bold uppercase tracking-widest text-[10px] mb-3 bg-gold-50 inline-block px-3 py-1 rounded-md self-start border border-gold-200">
                                                    {activeItem.type}
                                                </span>
                                                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-3 leading-tight">{activeItem.title}</h2>
                                                <div className="flex items-center gap-4 text-xs font-sans font-bold text-slate-500 mb-5 uppercase tracking-widest">
                                                    <span>{activeItem.date}</span><span>•</span>
                                                    <span>{activeItem.duration || activeItem.readTime}</span>
                                                </div>
                                                <p className="font-sans text-slate-700 leading-relaxed text-base md:text-lg mb-7">{activeItem.desc}</p>
                                                <button
                                                    onClick={() => { if (activeItem.type === 'blog') setReadingArticle(true); }}
                                                    className="bg-slate-900 text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors self-start shadow-lg"
                                                >
                                                    {activeItem.type === 'blog' ? 'Číst celý článek' : `Přehrát ${activeItem.type}`}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-200 pt-9 text-left">
                                            <h3 className="font-serif text-2xl text-slate-900 mb-7">Další z kategorie</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                                {MEDIA_DATA[activeItem.type].map(item => (
                                                    <div key={item.id}
                                                        onClick={() => { setActiveItem(item); setReadingArticle(false); }}
                                                        className={`group cursor-pointer bg-white rounded-xl overflow-hidden border ${item.id === activeItem.id ? 'border-gold-400 ring-2 ring-gold-400' : 'border-slate-200'} shadow hover:shadow-xl transition-all hover:-translate-y-1`}
                                                    >
                                                        <div className="w-full aspect-[16/10] bg-slate-200 relative overflow-hidden">
                                                            <img loading="lazy" src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                                                            <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">
                                                                {item.duration || item.readTime}
                                                            </div>
                                                        </div>
                                                        <div className="p-5">
                                                            <h4 className="font-serif text-lg text-slate-900 mb-1.5 group-hover:text-gold-600 transition-colors line-clamp-1">{item.title}</h4>
                                                            <p className="font-sans text-slate-500 text-xs line-clamp-2 leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="article" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="w-full text-left">
                                        <button onClick={() => setReadingArticle(false)}
                                            className="mb-7 font-sans font-bold text-xs uppercase tracking-widest text-gold-600 hover:text-gold-500 flex items-center transition-colors px-4 py-2 border border-gold-200 rounded-lg hover:bg-gold-50"
                                        >
                                            ← Zpět na přehled
                                        </button>
                                        <div className="w-full h-56 md:h-96 rounded-3xl overflow-hidden mb-9 shadow-2xl relative">
                                            <img loading="lazy" src={activeItem.image} className="w-full h-full object-cover" alt={activeItem.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-7 md:p-11">
                                                <div>
                                                    <span className="text-gold-400 font-sans font-bold uppercase tracking-widest text-[10px] mb-2 block">Příběhy z expedice</span>
                                                    <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{activeItem.title}</h1>
                                                    <div className="flex items-center gap-4 text-xs font-sans text-slate-300 uppercase tracking-widest">
                                                        <span>{activeItem.date}</span><span className="opacity-50">•</span><span>{activeItem.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-w-2xl mx-auto">
                                            <p className="text-xl text-slate-800 font-medium font-serif leading-snug mb-7 bg-slate-50 p-5 rounded-2xl border-l-4 border-gold-400">
                                                {activeItem.desc}
                                            </p>
                                            {activeItem.content?.map((p, i) => (
                                                <p key={i} className="font-sans text-slate-700 leading-relaxed mb-5 text-base">{p}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ── All press modal (light) ── */}
        <AnimatePresence>
            {showAllPress && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4 md:p-8 pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white border border-slate-100 shadow-2xl rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        <div className="p-6 md:p-7 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-slate-900">V médiích</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">{filteredPress.length} výstupů</p>
                            </div>
                            <button onClick={() => setShowAllPress(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="px-6 md:px-7 py-3.5 border-b border-slate-100 flex flex-wrap gap-1.5 shrink-0">
                            {TYPES.map(t => (
                                <button key={t} onClick={() => setPressFilter(t)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${pressFilter === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                                >{t}</button>
                            ))}
                            <span className="w-px bg-slate-200 self-stretch mx-1" />
                            {YEARS.map(yr => (
                                <button key={yr} onClick={() => setPressYear(yr === pressYear ? 'Vše' : yr)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all border ${pressYear === yr ? 'bg-gold-500 text-white border-gold-500' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                                >{yr}</button>
                            ))}
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 md:p-7 flex flex-col gap-2 overscroll-contain" data-lenis-prevent>
                            <AnimatePresence mode="popLayout">
                                {filteredPress.map((item, idx) => {
                                    const { Icon, accent } = TYPE_CONFIG[item.type];
                                    return (
                                        <motion.a key={item.id} href={item.href}
                                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                            transition={{ delay: idx * 0.025, duration: 0.2 }}
                                            className="group flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-md transition-all"
                                        >
                                            <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
                                                <Icon className={`w-4 h-4 ${accent}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-sans font-bold text-slate-800 text-xs md:text-sm">{item.outlet}</p>
                                                <p className="font-sans text-slate-500 text-xs truncate">{item.title}</p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2.5">
                                                <span className="text-slate-400 text-[10px] font-mono hidden md:block">{item.date}</span>
                                                <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">{item.type}</span>
                                                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </AnimatePresence>
                            {filteredPress.length === 0 && (
                                <div className="text-center py-14 text-slate-400">
                                    <p className="font-sans text-sm">Žádné výstupy pro vybraný filtr.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Media;
