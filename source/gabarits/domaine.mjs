/* Modèle « page domaine » (v2) : ouverture, sections du domaine, appel à projet prérempli (?domaine=cle).
   Chaque section a un visuel et au moins un effet au défilement (titres en lignes, encrage, strates, cartouche, cotation). */
import { html, brut } from '../../outils/gabarit.mjs';

export const k = (c, cle, n) => `dom.${cle}.${n}`;

export function tete(c, cle, { image, cadrage = '50% 50%', cadrageMobile = '50% 70%' }) {
  return html`<section class="page-tete page-tete--image conteneur" id="debut" data-masque-barre>
  <div>
    <p class="repere mono">${c.t('commun.domaines')} · ${c.t(`pages.${cle}.nav`)}</p>
    <h1 data-anime="lignes">${c.t(`pages.${cle}.nav`)}</h1>
    <p class="page-tete-info page-tete-info--moyen" data-info-cle>${c.t(k(c, cle, 'info'))}</p>
    <p data-anime>${c.t(k(c, cle, 'texte'))}</p>
    <p>${c.lien('contact', { params: `domaine=${cle}`, classe: 'bouton', texte: c.t(k(c, cle, 'action')), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
  </div>
  ${c.media({ nom: image, alt: c.s(k(c, cle, 'alt')), cadrage, cadrageMobile, priorite: true, classe: 'page-tete-media', sizes: '(max-width: 760px) 100vw, 52vw', attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
</section>`;
}

/* Grande planche esquisse → rendu (effet « encrage »), à la taille d'origine des images (300 px). */
export function encrageGrand(c, d, legende) {
  return html`<figure class="encrage-planche">
  <div class="encrage encrage--planche" data-effet="encrage" role="img" aria-label="${d.alt}">
    <img class="encrage-esquisse" src="/assets/images/site/${d.image}-esquisse-300.webp" alt="" width="300" height="150" loading="lazy" decoding="async">
    <img class="encrage-rendu" src="/assets/images/site/${d.image}-rendu-300.webp" alt="" width="300" height="150" loading="lazy" decoding="async">
    <span class="encrage-scan" aria-hidden="true"><i></i></span>
  </div>
  <figcaption class="mono">${legende}</figcaption>
</figure>`;
}

/* Triptyque de vraies images avec légendes ; planche = petite image affichée sans agrandissement. */
export function triptyque(c, cases) {
  return html`<div class="triptyque" data-anime="cascade">${cases.map((x) => html`<figure class="triptyque-case">
    ${c.media({ nom: x.nom, alt: x.alt, classe: 'triptyque-media' + (x.planche ? ' triptyque-media--planche' : ''), sizes: '(max-width: 760px) 92vw, 30vw' })}
    <figcaption class="mono">${x.legende}</figcaption>
  </figure>`)}</div>`;
}

export function fin(c, cle, { image, alt, planche = false }) {
  return html`<section class="fin" id="fin">
  <div class="conteneur fin-grille">
    <div>
      <h2 data-anime="lignes">${c.t(k(c, cle, 'finTitre'))}</h2>
      <p data-anime>${c.t(k(c, cle, 'finTexte'))}</p>
      <p>${c.lien('contact', { params: `domaine=${cle}`, classe: 'bouton', texte: c.t(k(c, cle, 'action')), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    ${c.media({ nom: image, alt, classe: 'fin-media' + (planche ? ' savoir-media--planche' : ''), sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>`;
}
