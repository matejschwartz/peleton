import type { CategoryGroup } from '../../../shared/data/catalog';

export const groups: CategoryGroup[] = [
  {
    id: 'motor',
    title: 'Motor a údržba',
    intro: 'Oleje, filtre, remene a všetko na pravidelný servis vášho auta.',
    items: [
      { name: 'Oleje', text: 'Motorové, prevodové, do posilňovača riadenia a do 2-taktných motorov.' },
      { name: 'Filtre', text: 'Olejové, vzduchové, palivové, kabínové a ďalšie.' },
      { name: 'Remene', text: 'Veľký výber – klinové, ploché a drážkové remene.' },
      { name: 'Rozvodové sady', text: 'Kompletné sady aj samostatné diely rozvodov.' },
      { name: 'Sviečky a trysky', text: 'Sviečky a trysky pre bežné typy motorov.' },
      { name: 'Čerpadlá', text: 'Čerpadlá pre rôzne typy áut.' },
      { name: 'Tesnenia a gufera', text: 'Tesnenia a gufera všetkých typov.' },
      { name: 'Mazivá a aditíva', text: 'Tekuté, plastické a sprejové mazivá, aditíva do kvapalín a olejov.' },
    ],
  },
  {
    id: 'podvozok',
    title: 'Brzdy, podvozok a pneumatiky',
    intro: 'Diely, od ktorých závisí bezpečnosť – vyberieme presne na váš typ auta.',
    items: [
      { name: 'Brzdy', text: 'Všetko pre brzdové systémy.' },
      { name: 'Brzdové kvapaliny', text: 'Brzdové kvapaliny rôznych špecifikácií.' },
      { name: 'Tlmiče', text: 'Olejové aj vzduchové tlmiče.' },
      { name: 'Spojky', text: 'Spojkové sady na všetky typy áut.' },
      { name: 'Čapy a ramená', text: 'Čapy, ramená a ďalšie diely podvozku.' },
      { name: 'Pneumatiky', text: 'Pneumatiky – k tomu prezutie a vyváženie kolies.' },
    ],
  },
  {
    id: 'elektro',
    title: 'Elektro a elektronika',
    intro: 'Od poistky až po alternátor.',
    items: [
      { name: 'Batérie', text: 'Autobatérie rôznych kapacít.' },
      { name: 'Elektrosúčiastky', text: 'Poistky, spínače, vypínače, relé a ďalšie.' },
      { name: 'Elektroinštalácia', text: 'Centrálne zamykanie, alarmy a rôzne doplnky.' },
      { name: 'Elektronika', text: 'Antény, žiarovky, alternátory, štartéry a ďalšie.' },
    ],
  },
  {
    id: 'karoseria',
    title: 'Karoséria a príslušenstvo',
    intro: 'Plechy, sklá, svetlá aj kozmetika, aby auto aj dobre vyzeralo.',
    items: [
      { name: 'Plechy', text: 'Plechy a časti karosérie.' },
      { name: 'Nárazníky', text: 'Vybrané druhy a typy nárazníkov.' },
      { name: 'Sklá', text: 'Rôzne druhy autoskiel.' },
      { name: 'Stierače', text: 'Stieracie lišty a ďalšie diely stieračov.' },
      { name: 'Svetlá a zrkadlá', text: 'Svetlá, hmlovky a spätné zrkadlá.' },
      { name: 'Autokozmetika', text: 'Prípravky na umývanie, ošetrenie a údržbu auta.' },
    ],
  },
  {
    id: 'naradie',
    title: 'Náradie a záhradná technika',
    intro: 'Nielen pre auto – aktuálnu ponuku náradia a záhradnej techniky vám radi ukážeme priamo v predajni.',
    items: [
      { name: 'Náradie', text: 'Náradie do dielne, garáže aj domácnosti.' },
      { name: 'Záhradná technika', text: 'Technika a pomôcky na starostlivosť o záhradu.' },
    ],
  },
];

export const repairServices = ['Bežné opravy a údržba áut', 'Výmena dielov zakúpených v predajni'];

export const mountingServices = [
  'Ťažné zariadenia',
  'Denné svietenie',
  'Automatické svetlá',
  'Parkovacie senzory',
  'Alarmy',
  'Centrálne zamykanie',
  'Autopoťahy',
  'Autorádiá',
];

export const tyreServices = ['Prezúvanie kolies', 'Vyváženie kolies', 'Oprava defektov'];
