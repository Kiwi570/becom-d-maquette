/* Robotique sous-marine (modèle « page domaine ») : ouverture photo, descente de 0 à 6000 m, du trait à l'eau,
   recherche et presse, appel à projet prérempli (?domaine=robotique-sous-marine). */
import { html } from '../../outils/gabarit.mjs';
import { jauge } from '../gabarits/blocs.mjs';

export const page = { cle: 'robotique-sous-marine', fichier: 'robotique-sous-marine', imagePartage: 'site/rov-hilarion-1199.webp' };

export default (c) => {
  const D = c.donnees;
  const action = (cle) => c.lien('contact', { params: 'domaine=robotique-sous-marine', classe: 'bouton', texte: c.t(cle), attrs: 'data-survol="magnetique"' });
  return html`
<section class="page-tete page-tete--image page-tete--photo conteneur" id="debut" data-masque-barre>
  <div>
    <p class="repere mono">${c.t('pages.competences.nav')} · ${c.t('pages.robotique-sous-marine.nav')}</p>
    <h1 data-anime="lignes">${c.t('robotique.tete.titre')}</h1>
    <p class="page-tete-info page-tete-info--grand" data-info-cle>${c.t('robotique.tete.info')}</p>
    <p data-anime>${c.t('robotique.tete.texte')}</p>
    <p>${c.lien('contact', { params: 'domaine=robotique-sous-marine', classe: 'bouton', texte: c.t('robotique.tete.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
  </div>
  ${c.media({ nom: 'site/rov-hilarion', alt: c.s('robotique.tete.alt'), cadrage: '45% 50%', cadrageMobile: '30% 50%', priorite: true, classe: 'page-tete-media', sizes: '(max-width: 760px) 100vw, 52vw', attrs: 'data-fx="onde" data-fx-force="0.8"' })}
</section>

<section class="plongee plongee--page" id="descente">
  <div class="plongee-scene" aria-hidden="true">
    ${c.media({ nom: 'grok/plongee-colonne', alt: '', classe: 'plongee-fond plongee-fond--haut', sizes: '100vw' })}
    ${c.media({ nom: 'grok/robotique-abysses', alt: '', classe: 'plongee-fond plongee-fond--bas', sizes: '100vw' })}
    <div class="plongee-voile"></div>
    ${jauge(c, c.t('robotique.descente.jauge'), D.produits.filter((p) => p.profondeur))}
  </div>
  <div class="conteneur plongee-contenu">
    <div class="plongee-bloc">
      <p class="repere mono">${c.t('robotique.descente.repere')}</p>
      <h2 data-anime="lignes">${c.t('robotique.descente.titre')}</h2>
      <p data-anime>${c.t('robotique.descente.texte')}</p>
    </div>
    <div class="plongee-bloc">
      <ul class="plongee-liste plongee-liste--grande" data-anime="cascade">${D.produits.map((p) => html`<li>${p.nom}${p.detail ? html`<small>${p.detail}</small>` : ''}</li>`)}</ul>
    </div>
  </div>
</section>

<section class="trait-eau" id="du-trait-a-l-eau">
  <div class="conteneur">
    <div class="section-tete">
      <p class="repere mono">${c.t('robotique.trait.repere')}</p>
      <h2 data-anime="lignes">${c.t('robotique.trait.titre')}</h2>
      <p data-anime>${c.t('robotique.trait.texte')}</p>
    </div>
    <div class="triptyque">
      <figure class="triptyque-case">
        ${c.media({ nom: 'site/rov-profil-trait', alt: c.s('robotique.trait.altProfil'), classe: 'media--detoure triptyque-media', sizes: '(max-width: 760px) 92vw, 30vw', attrs: 'data-anime="rideau"' })}
        <figcaption class="mono">${c.t('robotique.trait.legendeProfil')}</figcaption>
      </figure>
      <figure class="triptyque-case">
        ${c.media({ nom: 'site/rov-face-trait', alt: c.s('robotique.trait.altFace'), classe: 'media--detoure triptyque-media', sizes: '(max-width: 760px) 92vw, 30vw', attrs: 'data-anime="rideau"' })}
        <figcaption class="mono">${c.t('robotique.trait.legendeFace')}</figcaption>
      </figure>
      <figure class="triptyque-case">
        <div class="encrage encrage--triptyque" data-effet="encrage" role="img" aria-label="${c.s('robotique.trait.altRendu')}">
          <img class="encrage-esquisse" src="/assets/images/site/rov-jaune-trait-banniere-428.webp" alt="" width="428" height="243" loading="lazy" decoding="async">
          <img class="encrage-rendu" src="/assets/images/site/rov-jaune-rendu-banniere-428.webp" alt="" width="428" height="242" loading="lazy" decoding="async">
          <span class="encrage-scan" aria-hidden="true"><i></i></span>
        </div>
        <figcaption class="mono">${c.t('robotique.trait.legendeRendu')}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="recherche" id="recherche">
  <div class="conteneur">
    <div class="recherche-grille">
      <div>
        <p class="repere mono">${c.t('robotique.recherche.repere')}</p>
        <h2 data-anime="lignes">${c.t('robotique.recherche.titre')}</h2>
        <p data-anime>${c.t('robotique.recherche.texte')}</p>
        <ul class="faits" data-anime="cascade"><li>${c.t('robotique.recherche.p1')}</li><li>${c.t('robotique.recherche.p2')}</li></ul>
      </div>
      ${c.media({ nom: 'site/presse-cnrs-article', alt: c.s('robotique.recherche.altArticle'), classe: 'recherche-article', sizes: '(max-width: 760px) 80vw, 30vw', attrs: 'data-fx="zoom" data-fx-force="8"' })}
    </div>
    <ul class="presse-liste" data-anime="cascade">
      ${D.presse.map((p) => html`<li class="presse-item">
        ${c.media({ nom: p.image, alt: p.alt, classe: 'presse-media', sizes: '(max-width: 760px) 80vw, 28vw' })}
        <p class="mono presse-date">${p.date}</p>
        <h3>${p.titre}</h3>
        <p>${p.texte}</p>
      </li>`)}
    </ul>
  </div>
</section>

<section class="fin" id="fin">
  <div class="conteneur fin-grille">
    <div>
      <h2 data-anime="lignes">${c.t('robotique.fin.titre')}</h2>
      <p data-anime>${c.t('robotique.fin.texte')}</p>
      <p>${action('robotique.fin.action')}</p>
    </div>
    ${c.media({ nom: 'site/drone-vert-rendu', alt: c.s('competences.savoir.altDesign'), classe: 'fin-media savoir-media--planche', sizes: '(max-width: 760px) 92vw, 333px', attrs: 'data-anime="rideau"' })}
  </div>
</section>
`;
};
