/* Blocs propres à BECOM-D, partagés entre les pages : carte de domaine (encrage), cartouche, plan de situation,
   jauge de profondeur, cube du volume d'impression. Chaque effet propre porte data-effet="nom-du-plan". */
import { html, brut } from '../../outils/gabarit.mjs';
export { cote } from './commun.mjs';

/* Image détourée simple (rendus, traits) : WebP en plusieurs tailles, dimensions réelles. */
export function detoure(c, nom, { alt = '', classe = '', sizes = '(max-width: 760px) 90vw, 30vw', priorite = false } = {}) {
  const m = c.media({ nom, alt, classe: `media--detoure ${classe}`, sizes, priorite });
  return m;
}

/* Carte de domaine : l'esquisse s'encre en rendu au défilement (effet propre « encrage »).
   complet : texte long, ancre (#cle) pour les liens profonds, lien vers la page du domaine quand elle existe. */
export function carteDomaine(c, d, { niveau = 'h3', complet = false } = {}) {
  const lien = d.page && c.pages[d.page] && d.page !== c.page.cle
    ? c.lien(d.page, { classe: 'domaine-lien', texte: html`${c.t('accueil.domaines.voir')}<span aria-hidden="true"> →</span>` })
    : c.lien('competences', { ancre: d.cle, classe: 'domaine-lien', texte: html`${c.t('accueil.domaines.detail')}<span aria-hidden="true"> →</span>` });
  const externe = complet && d.cle === 'mecatronique'
    ? html`<a class="domaine-externe" href="http://airbotech.com/" target="_blank" rel="noopener">${c.t('competences.domaines.airbotech')}<span aria-hidden="true"> ↗</span></a>` : '';
  const titre = niveau === 'h2' ? html`<h2>${d.titre}</h2>` : html`<h3>${d.titre}</h3>`;
  return html`<article class="domaine${complet ? ' domaine--complet' : ''}"${complet ? brut(` id="${d.cle}"`) : ''}>
  <div class="encrage" data-effet="encrage" role="img" aria-label="${d.alt}">
    <img class="encrage-esquisse" src="/assets/images/site/${d.image}-esquisse-300.webp" alt="" width="300" height="150" loading="lazy" decoding="async">
    <img class="encrage-rendu" src="/assets/images/site/${d.image}-rendu-300.webp" alt="" width="300" height="150" loading="lazy" decoding="async">
    <span class="encrage-scan" aria-hidden="true"><i></i></span>
  </div>
  ${titre}
  <p>${complet ? d.long : d.court}</p>
  ${externe}${lien}
</article>`;
}

/* Cartouche de plan : les traits se dessinent, puis les cases se remplissent (effet propre « cartouche »). */
export function cartouche(c, cases, { classe = '', attrs = '' } = {}) {
  return html`<dl class="cartouche ${classe}" data-effet="cartouche"${brut(attrs ? ' ' + attrs : '')}>
  ${cases.map(([t, v, large], i) => html`<div class="cartouche-case${large ? ' cartouche-case--large' : ''}" style="--i:${i}"><dt class="mono">${t}</dt><dd>${v}</dd></div>`)}
</dl>`;
}

/* Plan de situation : positions réelles (latitude, longitude) projetées, échelle de 10 km exacte. */
const LIEUX = [
  { nom: 'Saint-Jean-de-la-Blaquière', lat: 43.7167, lon: 3.4225, principal: true },
  { nom: 'Lodève', lat: 43.7317, lon: 3.3194 },
  { nom: 'Clermont-l’Hérault', lat: 43.6275, lon: 3.4319 },
  { nom: 'Montpellier', lat: 43.6108, lon: 3.8767 },
  { nom: 'Béziers', lat: 43.3442, lon: 3.2158 },
];
const K = 827, COS = Math.cos((43.55 * Math.PI) / 180);
const px = (l) => ({ x: Math.round((l.lon - 3.1) * COS * K + 24), y: Math.round((43.8 - l.lat) * K + 16) });

export function planSituation(c, label) {
  const W = 640, H = 420;
  const p = LIEUX.map((l) => ({ ...l, ...px(l) }));
  const sjb = p[0];
  const km10 = Math.round((10 / 111.2) * K);
  const pc = (v, t) => `${Math.round((v / t) * 1000) / 10}%`;
  return html`<figure class="plan-situation" data-visuel>
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" data-fx="trace">
    <defs><pattern id="trame-plan" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" class="plan-trame"/></pattern></defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#trame-plan)"/>
    ${p.filter((l) => ['Montpellier', 'Béziers'].includes(l.nom)).map((l) => html`<line class="plan-liaison" data-fx-trait x1="${sjb.x}" y1="${sjb.y}" x2="${l.x}" y2="${l.y}"/>`)}
    ${p.map((l) => html`<circle class="plan-point${l.principal ? ' plan-point--principal' : ''}" cx="${l.x}" cy="${l.y}" r="${l.principal ? 8 : 5}"/>`)}
    <circle class="plan-onde" data-fx-trait cx="${sjb.x}" cy="${sjb.y}" r="22"/>
    <line class="plan-echelle" data-fx-trait x1="${560 - km10}" y1="396" x2="560" y2="396"/>
    <path class="plan-echelle" d="M${560 - km10} 390 V402 M560 390 V402"/>
    <path class="plan-nord" data-fx-trait d="M604 64 L614 34 L624 64 L614 56 Z"/>
  </svg>
  <div class="plan-libelles" aria-hidden="true">
    ${p.map((l) => html`<span class="plan-libelle${l.principal ? ' plan-libelle--principal' : ''}${l.nom === 'Lodève' ? ' plan-libelle--gauche' : l.nom === 'Montpellier' ? ' plan-libelle--dessous' : ''}" style="left:${pc(l.x, W)};top:${pc(l.y, H)}">${l.nom}</span>`)}
    <span class="plan-libelle plan-libelle--echelle" style="left:${pc(566, W)};top:${pc(396, H)}">10 km</span>
    <span class="plan-libelle plan-libelle--nord" style="left:${pc(614, W)};top:${pc(86, H)}">N</span>
  </div>
</figure>`;
}

/* Jauge de profondeur (effet propre « plongée ») : graduations réelles de 0 à 6000 m, curseur piloté par le défilement. */
export function jauge(c, titre, reperes = []) {
  const crans = [0, 1000, 2000, 3000, 4000, 5000, 6000];
  return html`<div class="jauge" data-effet="plongee" aria-hidden="true">
  <p class="jauge-titre mono">${titre}</p>
  <div class="jauge-regle">
    ${crans.map((m) => html`<span class="jauge-cran" style="--p:${m / 6000}"><i></i><b class="mono">${m.toLocaleString('fr-FR').replace(/ /g, ' ')} m</b></span>`)}
    ${reperes.map((r) => html`<span class="jauge-repere" style="--p:${r.profondeur / 6000}"><i></i><em>${r.detail}</em></span>`)}
    <span class="jauge-curseur"><span class="jauge-valeur mono">0 m</span></span>
  </div>
</div>`;
}

/* Cube du volume d'impression de la Form 2 (145 × 145 × 175 mm), en projection isométrique,
   construit couche par couche (effet propre « strates »). */
export function cube(c, label) {
  const s = 1.05, cx = 210, base = 368;
  const iso = (a, b, h) => [Math.round((cx + (a - b) * 0.866 * s) * 10) / 10, Math.round((base + (a + b) * 0.5 * s - h * s - 150 * s) * 10) / 10];
  const pt = (q) => q.join(' ');
  const L = 145, P = 145, H = 175, N = 14;
  const couches = Array.from({ length: N }, (_, i) => {
    const h0 = (H / N) * i, h1 = (H / N) * (i + 1);
    const face = [iso(0, P, h0), iso(L, P, h0), iso(L, P, h1), iso(0, P, h1)];
    const cote2 = [iso(L, P, h0), iso(L, 0, h0), iso(L, 0, h1), iso(L, P, h1)];
    const dessus = [iso(0, 0, h1), iso(L, 0, h1), iso(L, P, h1), iso(0, P, h1)];
    return html`<g class="strate" style="--i:${i}"><polygon class="strate-face" points="${brut(face.map(pt).join(' '))}"/><polygon class="strate-cote" points="${brut(cote2.map(pt).join(' '))}"/><polygon class="strate-dessus" points="${brut(dessus.map(pt).join(' '))}"/></g>`;
  });
  const pc = (v, t) => `${Math.round((v / t) * 1000) / 10}%`;
  const arete = (a, b) => html`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  const A = iso(0, 0, 0), B = iso(L, 0, 0), C = iso(L, P, 0), D = iso(0, P, 0), A2 = iso(0, 0, H), B2 = iso(L, 0, H), C2 = iso(L, P, H), D2 = iso(0, P, H);
  return html`<figure class="cube" data-effet="strates" data-visuel>
  <svg viewBox="0 0 420 400" role="img" aria-label="${label}">
    <g class="cube-aretes">${[[A, B], [B, C], [C, D], [D, A], [A2, B2], [B2, C2], [C2, D2], [D2, A2], [A, A2], [B, B2], [C, C2], [D, D2]].map(([a, b]) => arete(a, b))}</g>
    <g class="cube-strates">${couches}</g>
    <g class="cube-cote-v"><line x1="${B[0] + 14}" y1="${B[1]}" x2="${B2[0] + 14}" y2="${B2[1]}"/><line x1="${B[0] + 8}" y1="${B[1]}" x2="${B[0] + 20}" y2="${B[1]}"/><line x1="${B2[0] + 8}" y1="${B2[1]}" x2="${B2[0] + 20}" y2="${B2[1]}"/></g>
    <line class="cube-laser" x1="${D[0] - 20}" y1="${D[1]}" x2="${B[0] + 20}" y2="${D[1]}"/>
  </svg>
  <div class="cube-cotes" aria-hidden="true">
    <span class="mono" style="left:${pc((D[0] + C[0]) / 2, 420)};top:${pc((D[1] + C[1]) / 2 + 22, 400)}">145 mm</span>
    <span class="mono" style="left:${pc((C[0] + B[0]) / 2, 420)};top:${pc((C[1] + B[1]) / 2 + 22, 400)}">145 mm</span>
    <span class="mono cube-cote-h" style="left:${pc(B[0] + 22, 420)};top:${pc((B[1] + B2[1]) / 2, 400)}">175 mm</span>
  </div>
</figure>`;
}
