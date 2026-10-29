// Logo marks shared by the Astro components and scripts/generate-icons.mjs.
// Each mark is drawn on its own viewBox; `ink` is the main line colour and
// `accent` the brand colour. Pass "currentColor" to inherit from CSS.

export const BIKE_VIEWBOX = '0 0 172 116';
export const CAR_VIEWBOX = '0 0 192 112';

export const COLORS = {
  ink: '#1d2125',
  paper: '#f4f1ec',
  sport: '#37b34a',
  moto: '#d62828',
};

export function bikeMark(ink = 'currentColor', accent = COLORS.sport) {
  return `
  <g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <g stroke="${ink}">
      <circle cx="40" cy="84" r="26"/>
      <circle cx="140" cy="84" r="26"/>
      <path d="M40 84 H76 L116 52 L140 84 M76 84 L66 52 H116"/>
    </g>
    <g stroke="${accent}">
      <path d="M62 44 C80 36 100 34 116 38"/>
      <path d="M116 38 L122 54"/>
      <path d="M64 46 L90 62 L76 84"/>
      <path d="M4 50 H30 M14 64 H32"/>
    </g>
  </g>
  <circle cx="130" cy="34" r="8.5" fill="${accent}"/>`;
}

export function carMark(ink = 'currentColor', accent = COLORS.moto) {
  // Body is drawn facing left and mirrored around its centre (x = 107),
  // so the car drives to the right like the bike; speed lines stay behind it.
  return `
  <g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <g transform="matrix(-1 0 0 1 214 0)">
      <g stroke="${ink}">
        <circle cx="62" cy="86" r="18"/>
        <circle cx="150" cy="86" r="18"/>
        <path d="M38 86 H34 C30 86 28 84 28 80 V68 C28 60 34 56 42 55 L68 52 L88 34 C92 30 98 28 104 28 H136 C142 28 146 30 150 34 L166 52 L176 54 C182 55 186 60 186 66 V80 C186 84 184 86 180 86 H174 M86 86 H126"/>
      </g>
      <path d="M80 52 L94 40 H140 L152 52 Z" stroke="${accent}" stroke-width="5"/>
    </g>
    <path d="M2 56 H18 M8 70 H22" stroke="${accent}"/>
  </g>`;
}
