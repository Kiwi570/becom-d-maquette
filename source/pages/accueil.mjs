/* Accueil BECOM-D, direction « Calque & cote ».
   Ordre de lecture du visiteur : ce que fait BECOM-D → ses besoins → méthode → domaines → réalisations
   → robotique sous-marine → presse → atelier SLA → le bureau et le projet.
   Effets propres : plan-matiere (ouverture), cotation, trait-piece, encrage, plongee, strates, cartouche. */
import { html, brut } from '../../outils/gabarit.mjs';
import { cote, carteDomaine, cartouche, planSituation, jauge, cube } from '../gabarits/blocs.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'site/rov-hilarion-1199.webp' };

export default (c) => {
  const k = c.site.contact;
  const D = c.donnees;
  return html`
<section class="hero" id="debut" data-plein-ecran data-masque-barre>
  <div class="hero-grille conteneur">
    <div class="hero-texte">
      <h1 class="hero-titre" data-superpose><span class="ligne-masque"><span class="hero-ligne" data-anime="gsap">${c.t('accueil.hero.l1')}</span></span><span class="ligne-masque"><span class="hero-ligne" data-anime="gsap">${c.t('accueil.hero.l2')}</span></span><span class="ligne-masque"><span class="hero-ligne hero-ligne--accent" data-anime="gsap">${c.t('accueil.hero.l3')}</span></span></h1>
      <p class="hero-intro" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
      <div class="hero-actions" data-anime="gsap">
        ${c.lien('contact', { classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <a class="hero-info mono" href="tel:${k.telephoneLien}" data-info-cle aria-label="${c.s('accueil.hero.infoAria')}">${c.tb('accueil.hero.info')}</a>
      </div>
    </div>
    <figure class="hero-plan" data-effet="plan-matiere" data-superpose>
      <div class="plan-feuille">
        <div class="plan-dessin">
          <img class="plan-trait" src="/assets/images/site/rov-face-trait-1280.webp" srcset="/assets/images/site/rov-face-trait-640.webp 640w, /assets/images/site/rov-face-trait-1280.webp 1280w" sizes="(max-width: 760px) 92vw, 50vw" width="1333" height="548" alt="${c.s('accueil.hero.altTrait')}" loading="eager" decoding="async">
          <span class="plan-repere" aria-hidden="true"><b class="mono">A</b></span>
          <span class="plan-scan" aria-hidden="true"><i></i></span>
        </div>
        <svg class="plan-attache" aria-hidden="true"><line/></svg>
        <div class="plan-detail">
          ${c.media({ nom: 'site/rov-hilarion', alt: c.s('accueil.hero.altPhoto'), cadrage: '68% 56%', cadrageMobile: '68% 56%', priorite: true, classe: 'plan-photo', sizes: '(max-width: 760px) 92vw, 50vw' })}
        </div>
        <span class="plan-anneau" aria-hidden="true"></span>
        <span class="plan-etiquette mono" aria-hidden="true"><b>${c.t('accueil.hero.detail')}</b> · ${c.t('accueil.hero.detailNom')}</span>
        ${cote('plan-cote', 'data-cote-hero')}
      </div>
      <figcaption class="plan-legende mono"><span>${c.t('accueil.hero.planche')}</span><span class="plan-defiler">${c.t('accueil.hero.defiler')}</span></figcaption>
    </figure>
  </div>
</section>

<section class="besoins" id="besoins">
  ${c.media({ nom: 'site/osmose-trait-grand', alt: c.s('accueil.besoins.alt'), classe: 'besoins-fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  <div class="conteneur besoins-grille">
    <div>
      <p class="repere mono">${c.t('accueil.besoins.repere')}</p>
      <h2 data-anime="lignes">${c.t('accueil.besoins.titre')}</h2>
      <p class="besoins-texte" data-anime="mots">${c.t('accueil.besoins.texte')}</p>
    </div>
    <ol class="besoins-liste">
      ${['b1', 'b2', 'b3', 'b4'].map((b, i) => html`<li class="besoin" data-effet="cotation"><span class="besoin-num mono">0${i + 1}</span><span class="besoin-texte">${c.t('accueil.besoins.' + b)}</span>${cote('besoin-cote')}</li>`)}
    </ol>
  </div>
</section>

<section class="methode" id="methode">
  <div class="conteneur methode-grille">
    <div class="methode-tete">
      <p class="repere mono">${c.t('accueil.methode.repere')}</p>
      <h2 data-anime="lignes">${c.t('accueil.methode.titre')}</h2>
      <p data-anime>${c.t('accueil.methode.texte')}</p>
    </div>
    <div class="methode-planche" data-effet="trait-piece">
      <div class="planche-cadre">
        ${D.etapes.map((e, i) => html`<div class="planche-couche${e.planche ? ' planche-couche--petite' : ''}" style="--i:${i}">${c.media({ nom: e.image, alt: e.alt, classe: 'planche-media', sizes: '(max-width: 760px) 92vw, 45vw' })}</div>`)}
        <span class="planche-scan" aria-hidden="true"><i></i></span>
      </div>
      <p class="planche-legende mono" aria-live="off">${D.etapes.map((e, i) => html`<span class="planche-legende-ligne" style="--i:${i}">${e.legende}</span>`)}</p>
      <div class="planche-progres" aria-hidden="true"><span></span></div>
    </div>
    <ol class="etapes">
      ${D.etapes.map((e, i) => html`<li class="etape" style="--i:${i}"><p class="etape-num mono">${c.t('accueil.methode.etape')} 0${i + 1}</p><h3>${e.titre}</h3><p>${e.texte}</p></li>`)}
    </ol>
  </div>
</section>

<section class="domaines" id="domaines">
  <div class="conteneur">
    <div class="section-tete">
      <p class="repere mono">${c.t('accueil.domaines.repere')}</p>
      <h2 data-anime="lignes">${c.t('accueil.domaines.titre')}</h2>
      <p class="indication mono">${c.t('accueil.domaines.glisser')} <span class="indication-tactile">· ${c.t('accueil.realisations.glisser')}</span></p>
    </div>
    <div class="domaines-grille" tabindex="0" role="region" aria-label="${c.s('accueil.domaines.titre')}">${D.domaines.map((d) => carteDomaine(c, d))}</div>
  </div>
</section>

<section class="realisations ecran epingle" id="realisations" data-fx="galerie" data-entete-cache>
  <div class="conteneur realisations-tete">
    <div>
      <p class="repere mono">${c.t('accueil.realisations.repere')}</p>
      <h2 data-anime="lignes">${c.t('accueil.realisations.titre')}</h2>
    </div>
    <p>${c.t('accueil.realisations.texte')} <span class="indication-tactile mono">${c.t('accueil.realisations.glisser')}</span></p>
  </div>
  <div class="piste realisations-piste" data-galerie tabindex="0" role="region" aria-label="${c.s('accueil.realisations.region')}">
    ${D.realisations.map((r, i) => html`<article class="realisation${r.planche ? ' realisation--planche' : ''}" id="realisation-${i + 1}" data-survol="incline" data-survol-force="4">
      ${c.media({ nom: r.image, alt: r.alt, cadrage: r.cadrage, classe: 'realisation-media', sizes: '(max-width: 760px) 80vw, 34vw' })}
      <div class="realisation-cartouche">
        <p class="mono">${String(i + 1).padStart(2, '0')} · ${r.domaine}</p>
        <h3>${r.titre}</h3>
        <p class="a-completer">${c.t('accueil.realisations.aCompleter')}</p>
      </div>
    </article>`)}
  </div>
  <div class="galerie-progres" aria-hidden="true"><span></span></div>
</section>

<section class="plongee" id="robotique">
  <div class="plongee-scene" aria-hidden="true">
    ${c.media({ nom: 'grok/plongee-colonne', alt: '', classe: 'plongee-fond plongee-fond--haut', sizes: '100vw' })}
    ${c.media({ nom: 'grok/robotique-abysses', alt: '', classe: 'plongee-fond plongee-fond--bas', sizes: '100vw' })}
    <div class="plongee-voile"></div>
    ${jauge(c, c.t('accueil.plongee.jauge'), D.produits.filter((p) => p.profondeur))}
  </div>
  <div class="conteneur plongee-contenu">
    <div class="plongee-bloc">
      <p class="repere mono">${c.t('accueil.plongee.repere')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.plongee.titre')}</h2>
      <p data-anime>${c.t('accueil.plongee.texte')}</p>
      ${c.media({ nom: 'site/rov-chassis-turquoise', alt: c.s('accueil.plongee.altPhoto'), cadrage: '50% 50%', classe: 'plongee-photo', sizes: '(max-width: 760px) 80vw, 46vw', attrs: 'data-fx="onde" data-fx-force="1.2"' })}
    </div>
    <div class="plongee-bloc">
      <p class="mono plongee-liste-titre">${c.t('accueil.plongee.liste')}</p>
      <ul class="plongee-liste" data-anime="cascade">${D.produits.map((p) => html`<li>${p.nom}${p.detail ? html`<small>${p.detail}</small>` : ''}</li>`)}</ul>
      <h3 class="plongee-presse-titre" data-anime="lignes">${c.t('accueil.presse.titre')}</h3>
      <p data-anime>${c.t('accueil.presse.texte')}</p>
      <ul class="presse-liste presse-liste--compacte" data-anime="cascade">
        ${D.presse.map((p) => html`<li class="presse-item">
          ${c.media({ nom: p.image, alt: p.alt, classe: 'presse-media', sizes: '96px' })}
          <div><p class="mono presse-date">${p.date}</p><p class="presse-titre">${p.titre}</p><p class="presse-texte">${p.texte}</p></div>
        </li>`)}
      </ul>
      <p>${c.lien('robotique-sous-marine', { classe: 'bouton bouton--clair', texte: c.t('accueil.plongee.lien'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
  </div>
</section>

<section class="atelier" id="atelier">
  <div class="conteneur atelier-grille">
    <div class="atelier-texte">
      <p class="repere mono">${c.t('accueil.atelier.repere')}</p>
      <h2 class="atelier-titre" data-effet="strates">${c.t('accueil.atelier.titre')}</h2>
      <p data-anime>${c.t('accueil.atelier.texte')}</p>
      <dl class="specs">
        <div><dt class="mono">${c.t('accueil.atelier.volume')}</dt><dd>${c.t('accueil.atelier.volumeValeur')}</dd></div>
        <div><dt class="mono">${c.t('accueil.atelier.couches')}</dt><dd>${c.t('accueil.atelier.couchesValeur')}</dd></div>
        <div><dt class="mono">${c.t('accueil.atelier.faisceau')}</dt><dd>${c.t('accueil.atelier.faisceauValeur')}</dd></div>
        <div><dt class="mono">${c.t('accueil.atelier.puissance')}</dt><dd>${c.t('accueil.atelier.puissanceValeur')}</dd></div>
      </dl>
      <p class="atelier-resines">${c.t('accueil.atelier.resines')}</p>
    </div>
    <div class="atelier-visuels">
      ${cube(c, c.s('accueil.atelier.cube'))}
      ${c.media({ nom: 'grok/accueil-sla', alt: c.s('accueil.atelier.alt'), cadrage: '70% 50%', cadrageMobile: '50% 70%', classe: 'atelier-photo', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-effet="strates"' })}
      <p class="mono atelier-machine">${c.t('accueil.atelier.machine')}</p>
    </div>
  </div>
</section>

<section class="projet" id="projet">
  <div class="conteneur projet-grille">
    <div class="projet-bureau">
      <p class="repere mono">${c.t('accueil.bureau.repere')}</p>
      <h2 data-anime="lignes">${c.t('accueil.bureau.titre')}</h2>
      <p data-anime>${c.t('accueil.bureau.texte')}</p>
      <ul class="faits" data-anime="cascade">
        <li>${c.t('accueil.bureau.f1')}</li>
        <li>${c.t('accueil.bureau.f2')}</li>
        <li>${c.t('accueil.bureau.f3')}</li>
      </ul>
      ${c.media({ nom: 'site/bureau', alt: c.s('accueil.bureau.alt'), cadrage: '50% 50%', classe: 'bureau-photo', sizes: '(max-width: 760px) 92vw, 620px', attrs: 'data-anime="rideau"' })}
    </div>
    <div class="projet-cartouche">
      <h3 class="projet-titre" data-anime="lignes">${c.t('accueil.projet.titre')}</h3>
      <p data-anime>${c.t('accueil.projet.texte')}</p>
      ${cartouche(c, [
        [c.t('accueil.projet.projet'), c.t('accueil.projet.projetValeur'), true],
        [c.t('accueil.projet.be'), c.t('accueil.projet.beValeur')],
        [c.t('commun.interlocuteur'), k.interlocuteur],
      ])}
      <p class="projet-actions">${c.lien('contact', { classe: 'bouton', texte: c.t('accueil.projet.action'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
  </div>
</section>
`;
};
