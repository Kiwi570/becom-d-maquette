/* Gabarit commun BECOM-D : head, en-tête, menu, pied de page, barre fixe du téléphone, voile, panneau d'ouverture.
   Les conventions data-* sont celles que lisent le socle JavaScript et l'audit (voir le README). */
import { html, brut } from '../../outils/gabarit.mjs';

const navigation = (c) => c.site.navigation.filter((cle) => c.pages[cle] && (c.pages[cle].langues || c.langues).includes(c.l));

/* Cote technique en SVG : deux flèches, deux lignes d'attache, une ligne (dessinée par le projet). */
export function cote(classe = '', attrs = '') {
  return html`<svg class="cote ${classe}" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"${brut(attrs ? ' ' + attrs : '')}>
  <line class="cote-attache" x1="1" y1="2" x2="1" y2="22"/><line class="cote-attache" x1="399" y1="2" x2="399" y2="22"/>
  <line class="cote-ligne" x1="1" y1="12" x2="399" y2="12"/>
  <path class="cote-fleche" d="M1 12 l9 -4 v8 z"/><path class="cote-fleche" d="M399 12 l-9 -4 v8 z"/>
</svg>`;
}

function tete(c) {
  const p = c.page, cle = p.cle;
  const titre = c.s(`pages.${cle}.titre`), description = c.s(`pages.${cle}.description`);
  const ici = c.abs(c.url(cle));
  const imagePartage = c.abs(`/assets/partage/${p.partage === false ? 'accueil' : cle}-${c.l}.jpg`);
  const structure = c.donnees.structure ? JSON.stringify(c.donnees.structure).replace(/</g, '\\u003c') : '';
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titre}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${ici}">
<style>${brut(c.critique.css)}</style>
<script>${brut(c.critique.js)}</script>
${(c.site.polices || []).map((f) => html`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`)}<link rel="stylesheet" href="${c.asset('css/socle.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<link rel="modulepreload" href="${c.asset('js/site.js')}">
<link rel="modulepreload" href="${c.asset('js/socle/index.js')}">
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/SplitText.min.js" defer></script>
<script type="module" src="${c.asset('js/site.js')}"></script>
<meta name="theme-color" content="${c.site.couleurs.theme || c.site.couleurs.fond}">
<link rel="icon" href="/assets/images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${c.site.nom}">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${ici}">
<meta property="og:image" content="${imagePartage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${c.s(`pages.${p.partage === false ? 'accueil' : cle}.partageAlt`)}">
<meta name="twitter:card" content="summary_large_image">
${structure ? html`<script type="application/ld+json">${brut(structure)}</script>` : ''}
</head>`;
}

function logo(c, clair = false, attrs = '') {
  const n = clair ? 'logo-clair' : 'logo';
  return html`<picture><source type="image/webp" srcset="/assets/images/${n}-96.webp 1x, /assets/images/${n}-192.webp 2x"><img src="/assets/images/${n}-96.png" alt="${attrs}" width="344" height="96"></picture>`;
}

function entete(c) {
  const a = c.site.actionEntete;
  return html`<header data-entete>
  <div class="entete-rangee">
    <a class="entete-logo" href="${c.url('accueil')}" data-libelle="${c.libelle('accueil')}"${c.page.cle === 'accueil' ? brut(' aria-current="page"') : ''}>${logo(c, false, c.s('commun.logoAlt'))}</a>
    <nav data-nav aria-label="${c.s('commun.navigation')}">
      <ul>${(c.site.enteteNavigation || navigation(c)).filter((k) => k !== 'accueil' && k !== a.page && c.pages[k]).map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div class="entete-actions">
      ${html`<a class="bouton bouton--entete" href="${c.url(a.page, a.ancre || '')}" data-libelle="${c.libelle(a.page)}"${c.page.cle === a.page ? brut(' aria-current="page"') : ''}>${c.t('commun.actionEntete')}</a>`}
      <button type="button" data-menu-bouton aria-controls="menu" aria-expanded="false" data-libelle-ouvrir="${c.s('commun.menu')}" data-libelle-fermer="${c.s('commun.fermer')}"><span class="menu-icone" aria-hidden="true"><i></i><i></i></span><span data-libelle-bouton>${c.t('commun.menu')}</span></button>
    </div>
  </div>
</header>
<div id="menu" data-menu role="dialog" aria-modal="true" aria-label="${c.s('commun.menu')}" data-gouttiere="${c.site.couleurs.menu}">
  <div class="menu-grille">
    <ul class="menu-liens">${navigation(c).map((k, i) => html`<li style="--i:${i}"><span class="menu-num mono" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${c.lien(k, { classe: 'menu-lien' })}</li>`)}</ul>
    <div class="menu-contact">
      <p class="mono menu-titre">${c.t('commun.piedContact')}</p>
      <p>${c.site.contact.interlocuteur}<br>${c.site.contact.rue}<br>${c.site.contact.ville}</p>
      <p><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a><br><a href="tel:${c.site.contact.fixeLien}">${c.site.contact.fixe}</a><br><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
      <p><a class="bouton bouton--clair" href="${c.url('contact')}" data-libelle="${c.libelle('contact')}">${c.t('commun.decrire')}</a></p>
      <p><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></p>
    </div>
  </div>
</div>`;
}

function pied(c) {
  return html`<footer class="pied" id="pied">
  <div class="conteneur pied-grille">
    <div class="pied-marque">
      ${logo(c, true, c.site.nom)}
      <p>${c.t('commun.piedTexte')}</p>
    </div>
    <div>
      <p class="mono pied-titre">${c.t('commun.piedContact')}</p>
      <p>${c.site.contact.interlocuteur}<br>${c.site.contact.rue}<br>${c.site.contact.ville}</p>
      <p>${c.t('commun.portable')}&nbsp;: <a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a><br>${c.t('commun.fixe')}&nbsp;: <a href="tel:${c.site.contact.fixeLien}">${c.site.contact.fixe}</a><br><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    </div>
    <nav aria-label="${c.s('commun.piedPlan')}">
      <p class="mono pied-titre">${c.t('commun.piedPlan')}</p>
      <ul>${navigation(c).map((k) => html`<li>${c.lien(k)}</li>`)}<li>${c.lien('mentions-legales')}</li></ul>
    </nav>
    <div>
      <p class="mono pied-titre">${c.t('commun.confort')}</p>
      <ul>
        <li><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></li>
        <li><a href="#haut" data-sans-transition>${c.t('commun.retourHaut')}</a></li>
      </ul>
    </div>
  </div>
  <div class="conteneur pied-bas"><p>${c.t('commun.maquette')}</p><p>© ${c.site.nom}</p></div>
</footer>`;
}

function barre(c) {
  const a = c.site.actionEntete;
  return html`<div data-barre-fixe>
  <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')}</a>
  <a class="bouton" href="${c.url(a.page, a.ancre || '')}" data-libelle="${c.libelle(a.page)}">${c.t('commun.actionEntete')}</a>
</div>`;
}

function voile(c) {
  return html`<div data-voile aria-hidden="true">
  <div class="voile-trame"></div>
  <div class="voile-contenu">
    ${logo(c, true)}
    <span class="voile-cote"></span>
    <span class="mono voile-folio">${c.t('commun.folio')}</span>
    <span data-voile-libelle>${c.libelle(c.page.cle)}</span>
  </div>
</div>`;
}

/* Panneau d'ouverture : feuille de calque, cadre et cartouche qui se tracent, logo visible dès la première image. */
function ouverture(c) {
  return html`<div class="ouverture-panneau" data-ouverture aria-hidden="true">
  <svg class="ouv-cadre" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
    <rect class="ouv-trait" x="14" y="14" width="972" height="972"/>
    <path class="ouv-trait" d="M14 120 H120 V14 M986 880 H880 V986 M880 14 V120 H986 M120 986 V880 H14"/>
  </svg>
  <div class="ouv-centre">
    ${logo(c, false)}
    ${cote('ouv-cote')}
    <p class="mono ouv-ligne">${c.t('commun.introLigne')}</p>
  </div>
  <div class="ouv-cartouche mono">
    <span>${c.t('commun.introCote')}</span><span>${c.t('commun.introLieu')}</span>
  </div>
</div>`;
}

export function page(c, contenu) {
  return html`<!doctype html>
<html lang="${c.l}" data-v="${c.v}" data-page="${c.page.cle}"${c.site.curseur ? brut(' data-curseur') : ''}>
${tete(c)}
<body id="haut">
${voile(c)}
${ouverture(c)}
<a class="evitement" href="#contenu">${c.t('commun.evitement')}</a>
${entete(c)}
<main id="contenu" tabindex="-1"${c.page.sansAction ? brut(' data-sans-action') : ''}${c.page.sansEffet ? brut(' data-sans-effet') : ''}>
${contenu}
</main>
${pied(c)}
${barre(c)}
</body>
</html>`;
}
