/* Page 404 « Cote hors tolérance », avec son image. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="page-tete introuvable conteneur" id="debut">
  <div>
    <p class="repere mono">Erreur 404</p>
    <h1 data-anime="lignes">${c.t('introuvable.titre')}</h1>
    <p data-anime>${c.t('introuvable.texte')}</p>
    <p data-anime>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
  </div>
  ${c.media({ nom: 'grok/404-ouverture', alt: c.s('introuvable.alt'), cadrage: '70% 40%', cadrageMobile: '50% 70%', priorite: true, classe: 'page-tete-media', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-fx="zoom"' })}
</section>
`;
