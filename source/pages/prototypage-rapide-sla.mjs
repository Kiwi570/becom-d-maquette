/* Prototypage rapide SLA (modèle « page domaine ») : stéréolithographie, Form 2, résines, matière. */
import { html } from '../../outils/gabarit.mjs';
import { tete, encrageGrand, fin, k } from '../gabarits/domaine.mjs';
import { cube } from '../gabarits/blocs.mjs';

const cle = 'prototypage-rapide-sla';
export const page = { cle, fichier: cle, imagePartage: 'grok/sla-ouverture-1280.webp' };

export default (c) => {
  const d = c.donnees.domaines.find((x) => x.cle === cle);
  const t = (n) => c.t(k(c, cle, n)), s = (n) => c.s(k(c, cle, n));
  const A = 'accueil.atelier.';
  return html`
${tete(c, cle, { image: 'grok/sla-ouverture', cadrage: '70% 50%', cadrageMobile: '50% 75%' })}

<section class="atelier atelier--page" id="stereolithographie">
  <div class="conteneur atelier-grille">
    <div class="atelier-texte">
      <p class="repere mono">${t('s1Repere')}</p>
      <h2 class="atelier-titre" data-effet="strates">${t('s1Titre')}</h2>
      <p data-anime>${t('s1Texte')}</p>
      <dl class="specs">
        <div><dt class="mono">${c.t(A + 'volume')}</dt><dd>${c.t(A + 'volumeValeur')}</dd></div>
        <div><dt class="mono">${c.t(A + 'couches')}</dt><dd>${c.t(A + 'couchesValeur')}</dd></div>
        <div><dt class="mono">${c.t(A + 'faisceau')}</dt><dd>${c.t(A + 'faisceauValeur')}</dd></div>
        <div><dt class="mono">${c.t(A + 'puissance')}</dt><dd>${c.t(A + 'puissanceValeur')}</dd></div>
      </dl>
    </div>
    <div class="atelier-visuels atelier-visuels--seul">
      ${cube(c, c.s(A + 'cube'))}
      <p class="mono atelier-machine">${c.t(A + 'machine')}</p>
    </div>
  </div>
</section>

<section class="domaine-section" id="resines">
  <div class="conteneur deux-colonnes deux-colonnes--haut">
    <div>
      <p class="repere mono">${t('s2Repere')}</p>
      <h2 data-anime="lignes">${t('s2Titre')}</h2>
      <dl class="resines" data-anime="cascade">
        ${[['classiques', 'classiquesV'], ['r1', 'r1V'], ['r2', 'r2V'], ['r3', 'r3V'], ['r4', 'r4V'], ['speciales', 'specialesV']].map(([a, b]) => html`<div class="resine"><dt>${t(a)}</dt><dd>${t(b)}</dd></div>`)}
      </dl>
    </div>
    ${encrageGrand(c, d, t('s2Legende'))}
  </div>
</section>

<section class="domaine-section" id="matiere">
  <div class="conteneur deux-colonnes">
    <div>
      <p class="repere mono">${t('s3Repere')}</p>
      <h2 data-anime="lignes">${t('s3Titre')}</h2>
      <p data-anime>${t('s3Texte')}</p>
      <p class="mono plan-legende">${t('s3Legende')}</p>
    </div>
    ${c.media({ nom: 'site/oceanview-piece', alt: s('s3Alt'), cadrage: '50% 45%', classe: 'fin-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-fx="zoom" data-fx-force="12"' })}
  </div>
</section>

${fin(c, cle, { image: 'grok/accueil-sla', alt: c.s(A + 'alt') })}
`;
};
