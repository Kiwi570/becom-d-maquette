/* Mécatronique (modèle « page domaine ») : la mécanique de BECOM-D et l'électronique d'Airbotech. */
import { html } from '../../outils/gabarit.mjs';
import { tete, encrageGrand, fin, k } from '../gabarits/domaine.mjs';
import { cartouche } from '../gabarits/blocs.mjs';

const cle = 'mecatronique';
export const page = { cle, fichier: cle, imagePartage: 'grok/mecatronique-ouverture-1280.webp' };

export default (c) => {
  const d = c.donnees.domaines.find((x) => x.cle === cle);
  const t = (n) => c.t(k(c, cle, n)), s = (n) => c.s(k(c, cle, n));
  return html`
${tete(c, cle, { image: 'grok/mecatronique-ouverture', cadrage: '75% 50%', cadrageMobile: '50% 75%' })}

<section class="domaine-section" id="ensemble">
  <div class="conteneur deux-colonnes">
    <div>
      <p class="repere mono">${t('s1Repere')}</p>
      <h2 data-anime="lignes">${t('s1Titre')}</h2>
      <p data-anime>${t('s1Texte')}</p>
      ${cartouche(c, [[t('cMeca'), t('cMecaV')], [t('cElec'), t('cElecV')], [t('cProjet'), t('cProjetV'), true]])}
      <p><a class="domaine-externe" href="http://airbotech.com/" target="_blank" rel="noopener">${t('airbotech')}<span aria-hidden="true"> ↗</span></a></p>
    </div>
    ${encrageGrand(c, d, t('s1Legende'))}
  </div>
</section>

<section class="domaine-section" id="realisation">
  <div class="conteneur deux-colonnes">
    ${c.media({ nom: 'site/caisson-eclate-rendu', alt: s('s2Alt'), classe: 'fin-media savoir-media--planche planche-haute', sizes: '(max-width: 760px) 92vw, 263px', attrs: 'data-anime="rideau"' })}
    <div>
      <p class="repere mono">${t('s2Repere')}</p>
      <h2 data-anime="lignes">${t('s2Titre')}</h2>
      <p data-anime>${t('s2Texte')} <span class="a-completer">${c.t('commun.realisationsACompleter')}</span></p>
    </div>
  </div>
</section>

${fin(c, cle, { image: 'site/oceanview-trait', alt: 'Plan au trait d’un caisson cylindrique' })}
`;
};
