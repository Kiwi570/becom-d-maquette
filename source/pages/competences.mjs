/* Compétences (page de synthèse) : secteurs, savoir-faire, outils, livrables, les cinq domaines (ancres), appel à projet. */
import { html } from '../../outils/gabarit.mjs';
import { cote, carteDomaine, cartouche } from '../gabarits/blocs.mjs';

export const page = { cle: 'competences', fichier: 'competences', imagePartage: 'site/eclate-beton-1280.webp' };

const SAVOIR = [
  { cle: 'faisabilite', image: 'site/osmose-trait', alt: 'altFaisabilite' },
  { cle: 'conception', image: 'site/simulation-piece', alt: 'altConception', planche: true },
  { cle: 'plan', image: 'site/mise-en-plan', alt: 'altPlan', planche: true },
  { cle: 'design', image: 'site/rov-jaune-rendu', alt: 'altDesign', planche: true },
  { cle: 'communication', image: 'site/rov-rouge-rendu', alt: 'altCommunication', planche: true },
];

export default (c) => html`
<section class="page-tete page-tete--image conteneur" id="debut" data-masque-barre>
  <div>
    <p class="repere mono">${c.t('competences.tete.repere')}</p>
    <h1 data-anime="lignes">${c.t('competences.tete.titre')}</h1>
    <p data-anime>${c.t('competences.tete.texte')}</p>
    <p class="page-tete-info mono" data-info-cle>${c.t('competences.tete.info')}</p>
    <p>${c.lien('contact', { classe: 'bouton', texte: c.t('commun.decrire'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
  </div>
  ${c.media({ nom: 'site/eclate-beton', alt: c.s('competences.tete.alt'), cadrage: '45% 45%', cadrageMobile: '40% 50%', priorite: true, classe: 'page-tete-media', sizes: '(max-width: 760px) 100vw, 48vw', attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
</section>

<section class="secteurs" id="secteurs">
  <div class="conteneur secteurs-grille">
    <div>
      <p class="repere mono">${c.t('competences.secteurs.repere')}</p>
      <h2 data-anime="lignes">${c.t('competences.secteurs.titre')}</h2>
      <ul class="secteurs-liste">${['s1', 's2', 's3', 's4'].map((s) => html`<li class="besoin" data-effet="cotation"><span class="besoin-texte">${c.t('competences.secteurs.' + s)}</span>${cote('besoin-cote')}</li>`)}</ul>
      <p data-anime>${c.t('competences.secteurs.texte')}</p>
    </div>
    ${c.media({ nom: 'grok/mecanique-ouverture', alt: c.s('competences.secteurs.alt'), cadrage: '72% 50%', cadrageMobile: '50% 75%', classe: 'secteurs-media', sizes: '(max-width: 760px) 100vw, 44vw', attrs: 'data-fx="zoom"' })}
  </div>
</section>

<section class="savoir" id="savoir-faire">
  <div class="conteneur">
    <div class="section-tete">
      <p class="repere mono">${c.t('competences.savoir.repere')}</p>
      <h2 data-anime="lignes">${c.t('competences.savoir.titre')}</h2>
    </div>
    <ol class="savoir-grille" data-anime="cascade">
      ${SAVOIR.map((s, i) => html`<li class="savoir-item">
        ${c.media({ nom: s.image, alt: c.s('competences.savoir.' + s.alt), classe: 'savoir-media' + (s.planche ? ' savoir-media--planche' : ''), sizes: '(max-width: 760px) 92vw, 30vw' })}
        <p class="mono etape-num">0${i + 1}</p>
        <h3>${c.t('competences.savoir.' + s.cle)}</h3>
        <p>${c.t('competences.savoir.' + s.cle + 'Texte')}</p>
      </li>`)}
    </ol>
  </div>
</section>

<section class="outils" id="outils">
  <div class="conteneur outils-grille">
    ${c.media({ nom: 'site/oceanview-simulation', alt: c.s('competences.outils.alt'), classe: 'outils-media', sizes: '(max-width: 760px) 100vw, 46vw', attrs: 'data-fx="zoom" data-fx-force="12"' })}
    <div>
      <p class="repere mono">${c.t('competences.outils.repere')}</p>
      <h2 data-anime="lignes">${c.t('competences.outils.titre')}</h2>
      <p class="mono a-completer outils-version">${c.t('competences.outils.version')}</p>
      <ul class="outils-liste">${['o1', 'o2', 'o3', 'o4'].map((o) => html`<li data-effet="cotation"><span>${c.t('competences.outils.' + o)}</span>${cote('besoin-cote')}</li>`)}</ul>
    </div>
  </div>
</section>

<section class="livrables" id="livrables">
  <div class="conteneur livrables-grille">
    <div>
      <p class="repere mono">${c.t('competences.livrables.repere')}</p>
      <h2 data-anime="lignes">${c.t('competences.livrables.titre')}</h2>
      <p data-anime>${c.t('competences.livrables.texte')}</p>
      ${cartouche(c, ['l1', 'l2', 'l3', 'l4'].map((l, i) => [`0${i + 1}`, c.t('competences.livrables.' + l)]))}
    </div>
    ${c.media({ nom: 'site/caisson-eclate-rendu', alt: c.s('competences.livrables.alt'), classe: 'livrables-media', sizes: '(max-width: 760px) 80vw, 263px', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="domaines" id="domaines">
  <div class="conteneur">
    <div class="section-tete">
      <p class="repere mono">${c.t('competences.domaines.repere')}</p>
      <h2 data-anime="lignes">${c.t('competences.domaines.titre')}</h2>
    </div>
    <div class="domaines-grille domaines-grille--complet">${c.donnees.domaines.map((d) => carteDomaine(c, d, { complet: true }))}</div>
  </div>
</section>

<section class="fin" id="fin">
  <div class="conteneur fin-grille">
    <div>
      <h2 data-anime="lignes">${c.t('competences.fin.titre')}</h2>
      <p data-anime>${c.t('competences.fin.texte')}</p>
      <p>${c.lien('contact', { classe: 'bouton', texte: c.t('competences.fin.action'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    ${c.media({ nom: 'site/chassis-rendu', alt: c.s('competences.fin.alt'), classe: 'fin-media savoir-media--planche', sizes: '(max-width: 760px) 92vw, 322px', attrs: 'data-anime="rideau"' })}
  </div>
</section>
`;
