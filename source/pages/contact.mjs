/* Contact : demande d'étude en quatre étapes (besoin, domaine, stade, coordonnées) avec récapitulatif en direct
   dans un cartouche, choix prérempli par l'adresse (?domaine=…, ?besoin=…), coordonnées et plan de situation.
   Formulaire simulé : rien n'est envoyé, et le message le dit. */
import { html, brut } from '../../outils/gabarit.mjs';
import { cartouche, planSituation } from '../gabarits/blocs.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-ouverture-1280.webp' };

export default (c) => {
  const k = c.site.contact, F = 'contact.formulaire.';
  const choix = (nom, valeur, libelle, i) => html`<label class="choix"><input type="radio" name="${nom}" value="${valeur}" id="${nom}-${i}"><span>${libelle}</span></label>`;
  const besoins = ['b1', 'b2', 'b3', 'b4'].map((b, i) => choix('besoin', b, c.s('accueil.besoins.' + b), i));
  const domaines = [...c.donnees.domaines.map((d, i) => choix('domaine', d.cle, d.titre, i)), choix('domaine', 'autre', c.s(F + 'autre'), 9)];
  const stades = ['st1', 'st2', 'st3', 'st4', 'st5'].map((s, i) => choix('stade', s, c.s(F + s), i));
  const etape = (n, titre, contenu) => html`<fieldset class="etape-form" data-etape="${n}" aria-labelledby="etape-titre-${n}">
    <legend class="visuellement-cache">${titre}</legend>
    <p class="mono etape-num" id="etape-titre-${n}" tabindex="-1">${c.t(F + 'etape')} ${n} ${c.t(F + 'sur')} 4 · ${titre}</p>
    ${contenu}
    <p class="champ-erreur etape-erreur" aria-live="polite"></p>
  </fieldset>`;
  return html`
<section class="page-tete page-tete--image conteneur" id="debut" data-masque-barre>
  <div>
    <p class="repere mono">${c.t('pages.contact.nav')}</p>
    <h1 data-anime="lignes">${c.t('contact.tete.titre')}</h1>
    <p data-anime>${c.t('contact.tete.texte')}</p>
    <p class="page-tete-actions"><a class="bouton" href="#formulaire" data-action-principale data-sans-transition>${c.t('contact.tete.action')}</a><a class="hero-info mono" href="tel:${k.telephoneLien}" data-info-cle aria-label="${c.s('contact.tete.infoAria')}">${c.t('contact.tete.info')}</a></p>
  </div>
  ${c.media({ nom: 'grok/contact-ouverture', alt: c.s('contact.tete.alt'), cadrage: '72% 50%', cadrageMobile: '50% 70%', priorite: true, classe: 'page-tete-media', sizes: '(max-width: 760px) 100vw, 48vw' })}
</section>

<section class="demande" id="formulaire" data-masque-barre>
  <div class="conteneur demande-grille">
    <div class="demande-form">
      <h2 data-anime="lignes">${c.t(F + 'titre')}</h2>
      <p class="mono demande-deroule" id="deroule">${c.t(F + 'deroule')}</p>
      <ol class="demande-etapes mono" aria-hidden="true">${['o1', 'o2', 'o3', 'o4'].map((o, i) => html`<li data-repere-etape="${i + 1}"><b>0${i + 1}</b> ${c.t(F + 'onglets.' + o)}</li>`)}</ol>
      <form data-formulaire data-etapes class="formulaire" action="#" novalidate aria-describedby="deroule" data-erreur-choix="${c.s(F + 'choisir')}">
        <div class="etapes-cadre">
          ${etape(1, c.s(F + 'besoin'), html`<div class="choix-grille">${besoins}</div>`)}
          ${etape(2, c.s(F + 'domaine'), html`<div class="choix-grille">${domaines}</div>`)}
          ${etape(3, c.s(F + 'stade'), html`<div class="choix-grille">${stades}</div>
            <div class="champ"><label for="f-delai">${c.t(F + 'delai')}</label><select id="f-delai" name="delai">${['d0', 'd1', 'd2', 'd3'].map((d) => html`<option value="${d}">${c.t(F + d)}</option>`)}</select></div>`)}
          ${etape(4, c.s(F + 'coordonnees'), html`
            <div class="champs-2">
              <div class="champ"><label for="f-nom">${c.t(F + 'nom')}</label><input id="f-nom" name="nom" autocomplete="name" required></div>
              <div class="champ"><label for="f-societe">${c.t(F + 'societe')}</label><input id="f-societe" name="societe" autocomplete="organization"></div>
              <div class="champ"><label for="f-email">${c.t(F + 'email')}</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
              <div class="champ"><label for="f-tel">${c.t(F + 'tel')}</label><input id="f-tel" name="tel" type="tel" autocomplete="tel"></div>
            </div>
            <div class="champ"><label for="f-message">${c.t(F + 'message')}</label><textarea id="f-message" name="message" rows="4" required></textarea></div>
            <div class="champ"><label for="f-fichiers">${c.t(F + 'fichiers')}</label><input id="f-fichiers" name="fichiers" type="file" multiple></div>
            <div class="champ champ--case"><input id="f-accord" name="accord" type="checkbox" value="oui" required><label for="f-accord">${c.t(F + 'consentement')}</label></div>
            <p class="mention-donnees">${c.tb(F + 'donnees')}</p>
            <button type="submit" class="bouton">${c.t(F + 'envoyer')}</button>
            <p data-message-envoi role="status" tabindex="-1" hidden data-texte="${c.s(F + 'envoye')}"></p>`)}
        </div>
        <div class="etapes-nav">
          <button type="button" class="bouton bouton--contour" data-etape-precedente>${c.t(F + 'precedent')}</button>
          <button type="button" class="bouton" data-etape-suivante>${c.t(F + 'suivant')}</button>
        </div>
      </form>
    </div>
    <aside class="demande-recap" aria-label="${c.s(F + 'recapAria')}" data-visuel>
      <p class="mono repere">${c.t(F + 'recap')}</p>
      ${cartouche(c, [
        [c.t(F + 'besoin'), html`<span data-recap="besoin" data-vide="${c.s(F + 'recapVide')}">${c.t(F + 'recapVide')}</span>`, true],
        [c.t(F + 'domaine'), html`<span data-recap="domaine" data-vide="${c.s(F + 'recapVide')}">${c.t(F + 'recapVide')}</span>`],
        [c.t(F + 'delai'), html`<span data-recap="delai" data-vide="${c.s(F + 'recapVide')}">${c.t(F + 'd0')}</span>`],
        [c.t(F + 'stade'), html`<span data-recap="stade" data-vide="${c.s(F + 'recapVide')}">${c.t(F + 'recapVide')}</span>`, true],
        [c.t(F + 'coordonnees'), html`<span data-recap="nom" data-vide="${c.s(F + 'recapVide')}">${c.t(F + 'recapVide')}</span>`],
        [c.t(F + 'recapFichiers'), html`<span data-recap="fichiers" data-vide="0">0</span>`],
        [c.t('commun.be'), html`BECOM-D · ${k.interlocuteur}`, true],
      ], { attrs: 'data-recapitulatif' })}
    </aside>
  </div>
</section>

<section class="coordonnees" id="coordonnees">
  <div class="conteneur coordonnees-grille">
    <div>
      <p class="repere mono">${c.t('contact.coordonnees.repere')}</p>
      <h2 data-anime="lignes">${c.t('contact.coordonnees.titre')}</h2>
      <p data-anime>${c.t('contact.coordonnees.texte')}</p>
      ${cartouche(c, [
        [c.t('commun.interlocuteur'), k.interlocuteur, true],
        [c.t('commun.adresse'), html`${k.rue}<br>${k.ville}`, true],
        [c.t('commun.portable'), html`<a href="tel:${k.telephoneLien}">${k.telephone}</a>`],
        [c.t('commun.fixe'), html`<a href="tel:${k.fixeLien}">${k.fixe}</a>`],
        [c.t('commun.email'), html`<a href="mailto:${k.email}">${k.email}</a>`, true],
      ])}
    </div>
    ${planSituation(c, c.s('contact.coordonnees.plan'))}
  </div>
</section>
`;
};
