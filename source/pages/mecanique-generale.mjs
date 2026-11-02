/* Mécanique générale (modèle « page domaine »). */
import { html } from '../../outils/gabarit.mjs';
import { tete, encrageGrand, triptyque, fin, k } from '../gabarits/domaine.mjs';

const cle = 'mecanique-generale';
export const page = { cle, fichier: cle, imagePartage: 'grok/mecanique-ouverture-1280.webp' };

export default (c) => {
  const d = c.donnees.domaines.find((x) => x.cle === cle);
  const t = (n) => c.t(k(c, cle, n)), s = (n) => c.s(k(c, cle, n));
  return html`
${tete(c, cle, { image: 'grok/mecanique-ouverture', cadrage: '72% 50%', cadrageMobile: '50% 75%' })}

<section class="domaine-section" id="conception">
  <div class="conteneur deux-colonnes">
    <div>
      <p class="repere mono">${t('s1Repere')}</p>
      <h2 data-anime="lignes">${t('s1Titre')}</h2>
      <p data-anime>${t('s1Texte')}</p>
    </div>
    ${encrageGrand(c, d, t('s1Legende'))}
  </div>
</section>

<section class="domaine-section" id="realisations">
  <div class="conteneur">
    <div class="section-tete">
      <p class="repere mono">${t('s2Repere')}</p>
      <h2 data-anime="lignes">${t('s2Titre')}</h2>
    </div>
    <div class="projet-bloc">
      <h3>${t('osmose')}</h3>
      <p>${t('osmoseTexte')} <span class="a-completer">${c.t('commun.realisationsACompleter')}</span></p>
      ${triptyque(c, [
        { nom: 'site/osmose-trait', alt: s('osmose') + ' : ' + s('osmose1').toLowerCase(), legende: s('osmose') + ' · ' + s('osmose1') },
        { nom: 'site/osmose-rendu', alt: s('osmose') + ' : ' + s('osmose2').toLowerCase(), legende: s('osmose') + ' · ' + s('osmose2') },
        { nom: 'site/osmose-rendu-realiste', alt: s('osmose') + ' : ' + s('osmose3').toLowerCase(), legende: s('osmose') + ' · ' + s('osmose3') },
      ])}
    </div>
    <div class="projet-bloc">
      <h3>${t('oceanview')}</h3>
      <p>${t('oceanviewTexte')} <span class="a-completer">${c.t('commun.realisationsACompleter')}</span></p>
      ${triptyque(c, [
        { nom: 'site/oceanview-trait', alt: s('oceanview') + ' : ' + s('oceanview1').toLowerCase(), legende: 'Oceanview VR · ' + s('oceanview1') },
        { nom: 'site/oceanview-simulation', alt: s('oceanview') + ' : ' + s('oceanview2').toLowerCase(), legende: 'Oceanview VR · ' + s('oceanview2') },
        { nom: 'site/oceanview-piece', alt: s('oceanview') + ' : ' + s('oceanview3').toLowerCase(), legende: 'Oceanview VR · ' + s('oceanview3') },
      ])}
    </div>
  </div>
</section>

<section class="domaine-section" id="outils">
  <div class="conteneur deux-colonnes">
    ${c.media({ nom: 'site/simulation-piece', alt: s('s3Alt'), classe: 'fin-media savoir-media--planche', sizes: '(max-width: 760px) 92vw, 532px', attrs: 'data-fx="zoom" data-fx-force="10"' })}
    <div>
      <p class="repere mono">${t('s3Repere')}</p>
      <h2 data-anime="lignes">${t('s3Titre')}</h2>
      <p data-anime>${t('s3Texte')}</p>
    </div>
  </div>
</section>

${fin(c, cle, { image: 'site/chassis-rendu', alt: c.s('competences.fin.alt'), planche: true })}
`;
};
