/* Design et communication (modèle « page domaine »). */
import { html } from '../../outils/gabarit.mjs';
import { tete, encrageGrand, triptyque, fin, k } from '../gabarits/domaine.mjs';

const cle = 'design-et-communication';
export const page = { cle, fichier: cle, imagePartage: 'grok/design-ouverture-1280.webp' };

export default (c) => {
  const d = c.donnees.domaines.find((x) => x.cle === cle);
  const t = (n) => c.t(k(c, cle, n)), s = (n) => c.s(k(c, cle, n));
  return html`
${tete(c, cle, { image: 'grok/design-ouverture', cadrage: '72% 55%', cadrageMobile: '50% 75%' })}

<section class="domaine-section" id="design">
  <div class="conteneur deux-colonnes">
    <div>
      <p class="repere mono">${t('s1Repere')}</p>
      <h2 data-anime="lignes">${t('s1Titre')}</h2>
      <p data-anime>${t('s1Texte')}</p>
    </div>
    ${encrageGrand(c, d, t('s1Legende'))}
  </div>
  <div class="conteneur duo" data-anime="cascade">
    <figure class="triptyque-case">${c.media({ nom: 'site/drone-vert-rendu', alt: s('d1Alt'), classe: 'triptyque-media triptyque-media--planche', sizes: '333px' })}<figcaption class="mono">${t('d1')}</figcaption></figure>
    <figure class="triptyque-case">${c.media({ nom: 'site/rov-jaune-rendu', alt: c.s('competences.savoir.altDesign'), classe: 'triptyque-media triptyque-media--planche', sizes: '428px' })}<figcaption class="mono">ROV jaune · rendu 3D</figcaption></figure>
  </div>
</section>

<section class="domaine-section" id="communication">
  <div class="conteneur">
    <div class="section-tete">
      <p class="repere mono">${t('s2Repere')}</p>
      <h2 data-anime="lignes">${t('s2Titre')}</h2>
      <p data-anime>${t('s2Texte')}</p>
    </div>
    ${triptyque(c, [
      { nom: 'site/eclate-beton', alt: s('v1Alt'), legende: s('v1') },
      { nom: 'site/rov-rouge-rendu', alt: s('v2Alt'), legende: s('v2') + ' · ROV', planche: true },
      { nom: 'site/osmose-rendu-realiste', alt: s('v3Alt'), legende: s('v3') + ' · unité Osmose' },
    ])}
    <p class="a-completer mono video-a-fournir">${t('video')}</p>
  </div>
</section>

${fin(c, cle, { image: 'site/prototypage-rendu', alt: s('d2Alt'), planche: true })}
`;
};
