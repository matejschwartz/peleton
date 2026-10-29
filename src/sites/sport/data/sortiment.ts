import type { CategoryGroup } from '../../../shared/data/catalog';

export const bikeBrands = [
  'Merida',
  'Giant',
  'Focus',
  'Diamondback',
  'Leader Fox',
  'Dema',
  'Acstar',
  'Vedora',
  'Kenzel',
  'Harry',
  'Wheeler',
];

export const partnerBrands = [
  'Shimano',
  'SRAM',
  'Schwalbe',
  'Continental',
  'Maxxis',
  'Kenda',
  'BBB',
  'Northwave',
  'Axon',
  'Alpine Pro',
  'Nutrend',
  'Aminostar',
  'Klimatex',
];

export const groups: CategoryGroup[] = [
  {
    id: 'bicykle',
    title: 'Bicykle',
    intro: 'Značkové bicykle pre deti aj dospelých – poradíme s výberom veľkosti aj typu bicykla.',
    items: [
      {
        name: 'Bicykle',
        text: 'Overené značky, ktoré sa osvedčili kvalitou a spoľahlivosťou.',
        brands: bikeBrands,
      },
    ],
  },
  {
    id: 'komponenty',
    title: 'Komponenty a náhradné diely',
    intro: 'Široký výber dielov skladom – ak niečo nemáme, zoženieme to čo najrýchlejšie.',
    items: [
      {
        name: 'Plášte a duše',
        text: 'Najväčší výber v širokom okolí – viac ako 180 druhov plášťov a veľký výber duší nielen na bicykle.',
        brands: ['Schwalbe', 'Continental', 'Maxxis', 'Kenda', 'Michelin', 'Rubena'],
      },
      {
        name: 'Ráfy a kolesá',
        text: 'Viac ako 30 druhov ráfov rôznych veľkostí a zapletené kolesá od 12" po 28".',
        brands: ['Remerx', 'Mach1', 'Alexrims', 'Altrix'],
      },
      {
        name: 'Pohon, radenie a brzdy',
        text: 'Prehadzovačky, prešmyky, kazety, viackolesá, reťaze, radenia, brzdy, pedále a náboje.',
        brands: ['Shimano', 'SRAM'],
      },
      {
        name: 'Kľuky',
        text: 'Viac ako 20 druhov najpoužívanejších kľúk a prevodníkov.',
        brands: ['Shimano', 'Truvativ', 'Prowheel'],
      },
      {
        name: 'Vidlice',
        text: 'Odpružené vidlice rôznych typov a zdvihov.',
        brands: ['RockShox', 'SR Suntour', 'Manitou', 'RST', 'Zoom'],
      },
      {
        name: 'Riadidlá',
        text: 'Viac ako 30 druhov riadidiel.',
        brands: ['BBB', 'Longus', 'PRO', 'Extend'],
      },
      {
        name: 'Sedlá',
        text: '70 druhov rôznych veľkostí a tvarov. Odborne poradíme a sedlo nastavíme.',
        brands: ['Selle Italia', 'SMP', 'Extend', 'Longus'],
      },
      {
        name: 'Blatníky',
        text: 'Široký výber blatníkov na rôzne účely.',
        brands: ['SKS', 'BBB', 'Longus', 'Polisport'],
      },
    ],
  },
  {
    id: 'vybava',
    title: 'Výbava pre cyklistov',
    intro: 'Všetko, čo potrebujete na bicykel aj na seba.',
    items: [
      {
        name: 'Prilby',
        text: 'Viac ako 80 druhov – od detských až po downhillové.',
        brands: ['Giro', 'Bell', 'MET', 'BBB', 'Longus'],
      },
      {
        name: 'Tretry',
        text: 'Horské aj cestné tretry.',
        brands: ['Shimano', 'Northwave', 'Merida', 'Axon'],
      },
      {
        name: 'Rukavice',
        text: 'Široký výber cyklistických rukavíc.',
        brands: ['BBB', 'Longus', 'Altrix', 'Etape', 'Axon', 'Merida'],
      },
      {
        name: 'Slnečné okuliare',
        text: 'Viac ako 200 druhov športových okuliarov.',
        brands: ['BBB', 'Polaroid', 'Zeppelin', 'Merida', 'Longus'],
      },
      {
        name: 'Svetlá',
        text: 'Predné aj zadné – viac ako 60 druhov svetiel.',
        brands: ['BBB', 'Longus', 'Author', 'Blackburn', 'Extend'],
      },
      {
        name: 'Tachometre a pulzmetre',
        text: 'Približne 50 druhov tachometrov, krokomerov a pulzmetrov.',
        brands: ['Sigma Sport', 'CicloSport', 'Echowell', 'VDO', 'Blackburn'],
      },
      {
        name: 'Pumpy',
        text: 'Okolo 30 druhov – od mini púmp až po veľké pumpy s manometrom.',
      },
      {
        name: 'Batohy',
        text: 'Cyklistické a turistické batohy, hydratačné vaky.',
        brands: ['Axon', 'CamelBak', 'Hydrapak', 'Alpine Pro', 'Sherpa'],
      },
    ],
  },
  {
    id: 'sport',
    title: 'Šport, fitness a voľný čas',
    intro: 'Nielen bicykle – vybavenie pre ďalšie športy a pohyb doma.',
    items: [
      {
        name: 'Korčule',
        text: 'Kolieskové aj zimné korčule – okolo 20 druhov. Korčule vám u nás aj nabrúsime.',
        brands: ['Roces', 'Insportline', 'Worker', 'Yashima'],
      },
      {
        name: 'Fitness',
        text: 'Eliptické trenažéry, rotopedy, steppery, činky a ďalšie vybavenie.',
      },
      {
        name: 'Loptové športy',
        text: 'Basketbalové a volejbalové lopty, potreby na tenis a bedminton.',
      },
      {
        name: 'Plávanie',
        text: 'Pánske, dámske a detské plavky, plavecké a potápačské okuliare, plutvy, čiapky a plavecké dosky.',
      },
      {
        name: 'Športová výživa',
        text: 'Gély, iontové nápoje, gainery a ďalšie doplnky pre športovcov.',
        brands: ['Nutrend', 'Aminostar', 'Scitec Nutrition'],
      },
      {
        name: 'Doplnkový tovar',
        text: 'Spacáky, karimatky, termo oblečenie, šiltovky a čiapky, fľaše, zámky, nosiče, košíky, chrániče, lepenie, mazivá, kolobežky, halová obuv, šípky a veľa ďalšieho.',
      },
    ],
  },
];
