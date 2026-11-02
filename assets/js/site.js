/* Effets propres à BECOM-D (direction « Calque & cote »). Le socle gère l'ouverture, les transitions, l'en-tête,
   le menu, le mode calme, les boucles, les mesures et la bibliothèque d'effets (posés par attributs dans les pages).
   Effets propres, chacun marqué data-effet="nom-du-plan" dans les pages :
   - plan-matiere : le ROV se trace, le détail A s'ouvre sur la vraie photo, qui envahit la planche au défilement ;
   - cotation     : les cotes s'étirent sous chaque besoin ;
   - trait-piece  : la planche passe du trait à la simulation, à la mise en plan, au rendu puis à la pièce ;
   - encrage      : chaque esquisse s'encre en rendu sous une ligne de scan ;
   - plongee      : la jauge descend de 0 à 6000 m, la lumière s'éteint ;
   - strates      : titre, photo et volume d'impression se construisent couche par couche ;
   - cartouche    : les traits du cartouche se dessinent, puis les cases se remplissent.
   Aucune lecture de mise en page pendant le défilement : tout est mesuré au chargement et au redimensionnement. */
import { demarrer, etat, quand, rafraichir } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
/* Effets liés au défilement : jamais en mode calme, au retour arrière ni en secours (état final direct). */
const animer = () => !!(gsap && ST) && !etat.calme && etat.arrivee !== 'retour' && !document.documentElement.classList.contains('secours');

/* ---------- plan-matiere : géométrie mesurée hors défilement ---------- */
const G = { w: 0, h: 0, cx: 0, cy: 0, r: 0, R: 0, ax: 0, ay: 0, tx: 0, ty: 0, k: 1.05 };
/* Point de la photo du ROV Hilarion montré dans le détail A : le logo becom-d sur la coque (en fractions de l'image). */
const LOGO = { x: 0.29, y: 0.5 };
function mesurerPlan() {
  const f = $('.plan-feuille'), rep = $('.plan-repere');
  if (!f || !rep) return false;
  const rf = f.getBoundingClientRect(), rr = rep.getBoundingClientRect();
  const etroit = window.matchMedia('(max-width: 900px)').matches;
  G.w = rf.width; G.h = rf.height;
  G.r = Math.round(rf.width * (etroit ? 0.2 : 0.165));
  G.cx = Math.round(rf.width * (etroit ? 0.74 : 0.77));
  G.cy = Math.round(rf.height * (etroit ? 0.7 : 0.69));
  G.R = Math.ceil(Math.hypot(rf.width, rf.height) / 2) + 4;
  G.ax = rr.left - rf.left + rr.width / 2; G.ay = rr.top - rf.top + rr.height / 2;
  G.tx = Math.round(G.cx - G.k * LOGO.x * G.w); G.ty = Math.round(G.cy - G.k * LOGO.y * G.h);
  f.style.setProperty('--cx', G.cx + 'px'); f.style.setProperty('--cy', G.cy + 'px'); f.style.setProperty('--r', G.r + 'px');
  f.style.setProperty('--d', 2 * G.r + 'px'); f.style.setProperty('--ax', G.cx - G.r + 'px'); f.style.setProperty('--ay', G.cy - G.r + 'px');
  /* Attache : du repère A au bord du cercle du détail. */
  const l = $('.plan-attache line');
  if (l) {
    const dx = G.cx - G.ax, dy = G.cy - G.ay, d = Math.hypot(dx, dy) || 1;
    const rA = rr.width / 2;
    l.setAttribute('x1', G.ax + (dx / d) * rA); l.setAttribute('y1', G.ay + (dy / d) * rA);
    l.setAttribute('x2', G.cx - (dx / d) * G.r); l.setAttribute('y2', G.cy - (dy / d) * G.r);
  }
  return true;
}
const cercle = (r, x, y) => `circle(${r}px at ${x}px ${y}px)`;

function planMatiere() {
  if (!$('.plan-feuille') || !mesurerPlan()) return;
  let attente = 0;
  new ResizeObserver(() => { clearTimeout(attente); attente = setTimeout(() => { mesurerPlan(); ST && ST.refresh(); }, 150); }).observe($('.plan-feuille'));
  const photo = $('.plan-photo picture');
  if (photo && gsap) gsap.set(photo, { transformOrigin: '0 0', x: G.tx, y: G.ty, scale: G.k });
  if (!animer()) return;
  /* Au défilement du premier écran, la photo envahit la planche : du plan à la matière. */
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: 0.6, invalidateOnRefresh: true },
  });
  tl.fromTo('.plan-detail', { clipPath: () => cercle(G.r, G.cx, G.cy) }, { clipPath: () => cercle(G.R, G.w / 2, G.h / 2), ease: 'power2.in', immediateRender: false }, 0)
    .fromTo('.plan-anneau', { scale: 1, x: 0, y: 0, opacity: 1 }, { scale: () => G.R / G.r, x: () => G.w / 2 - G.cx, y: () => G.h / 2 - G.cy, opacity: 0, ease: 'power2.in', immediateRender: false }, 0)
    .fromTo(['.plan-attache', '.plan-repere'], { opacity: 1 }, { opacity: 0, duration: 0.3, immediateRender: false }, 0)
    .fromTo('.plan-trait', { opacity: 1 }, { opacity: 0.25, ease: 'none', immediateRender: false }, 0);
  if (photo) tl.fromTo(photo, { x: () => G.tx, y: () => G.ty, scale: G.k }, { x: 0, y: 0, scale: 1, ease: 'power2.out', immediateRender: false }, 0);
}

/* Ouverture du premier écran de l'accueil (dans l'intro ou pendant que le voile se retire). */
function premierEcranAccueil(tl, t0) {
  if (!$('.hero-ligne')) return;
  tl.fromTo('.hero-ligne', { yPercent: 110 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: 'power4.out' }, t0)
    .fromTo('.hero-intro, .hero-actions', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, t0 + 0.35);
  if (!$('.plan-feuille')) return;
  tl.fromTo('.plan-trait', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.85, ease: 'power2.inOut' }, t0 + 0.05)
    .fromTo('.plan-scan i', { xPercent: -101, opacity: 1 }, { xPercent: 0, duration: 0.85, ease: 'power2.inOut' }, t0 + 0.05)
    .to('.plan-scan i', { opacity: 0, duration: 0.2 }, t0 + 0.9)
    .fromTo('.plan-repere', { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, t0 + 0.6)
    .fromTo('.plan-attache', { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.8)
    .fromTo('.plan-detail', { clipPath: () => cercle(0, G.cx, G.cy) }, { clipPath: () => cercle(G.r, G.cx, G.cy), duration: 0.6, ease: 'power3.out' }, t0 + 0.85)
    .fromTo('.plan-anneau', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, t0 + 0.85)
    .fromTo('.plan-etiquette, .plan-legende', { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, t0 + 1.05)
    .fromTo('.plan-cote', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.7);
}

/* Premier écran des pages intérieures : titre en lignes, image en rideau. */
function premierEcranPage(tl, t0) {
  const h1 = $('.page-tete h1');
  if (!h1 || $('.hero-ligne')) return;
  tl.fromTo('.page-tete-media', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power4.out' }, t0);
}

/* ---------- cotation ---------- */
function cotation() {
  if (!animer()) return;
  $$('[data-effet="cotation"]').forEach((el) => {
    const cote = $('.besoin-cote', el) || $('.cote', el);
    if (!cote) return;
    gsap.fromTo(cote, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'clamp(top 88%)', end: 'clamp(top 55%)', scrub: 0.4 } });
  });
}

/* ---------- trait-piece ---------- */
function traitPiece() {
  const planche = $('[data-effet="trait-piece"]');
  if (!planche || !animer()) return;
  const couches = $$('.planche-couche', planche), etapes = $$('.etape'), lignes = $$('.planche-legende-ligne', planche);
  const scan = $('.planche-scan i', planche), barre = $('.planche-progres span', planche);
  const actif = (n) => lignes.forEach((l, i) => l.classList.toggle('actif', i === n));
  actif(0);
  etapes.forEach((et, i) => {
    if (i === 0) return;
    gsap.fromTo(couches[i], { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', ease: 'none',
      scrollTrigger: {
        trigger: et, start: 'top 78%', end: 'top 38%', scrub: 0.5,
        onUpdate: (st) => {
          if (scan) { scan.style.transform = `translateX(${-101 + st.progress * 101}%)`; scan.style.opacity = st.progress > 0.02 && st.progress < 0.98 ? 1 : 0; }
          actif(st.progress > 0.5 ? i : i - 1);
        },
      },
    });
  });
  if (barre && etapes.length) {
    gsap.fromTo(barre, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: etapes[0], endTrigger: etapes[etapes.length - 1], start: 'top 78%', end: 'top 38%', scrub: true } });
  }
}

/* ---------- encrage ---------- */
function encrage() {
  if (!animer()) return;
  $$('[data-effet="encrage"]').forEach((el) => {
    const rendu = $('.encrage-rendu', el), scan = $('.encrage-scan i', el);
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'clamp(top 88%)', end: 'clamp(top 42%)', scrub: 0.5 } })
      .fromTo(rendu, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0)
      .fromTo(scan, { xPercent: -101, opacity: 1 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0)
      .to(scan, { opacity: 0, duration: 0.05 }, 0.97);
  });
}

/* ---------- plongee ---------- */
function plongee() {
  if (!animer()) return;
  $$('.plongee').forEach((sec) => {
    const bas = $('.plongee-fond--bas', sec), curseur = $('.jauge-curseur', sec), valeur = $('.jauge-valeur', sec), regle = $('.jauge-regle', sec);
    if (!curseur || !regle) return;
    let H = regle.getBoundingClientRect().height;
    quand('rafraichi', () => { H = regle.getBoundingClientRect().height; });
    window.addEventListener('resize', () => { H = regle.getBoundingClientRect().height; }, { passive: true });
    const format = new Intl.NumberFormat('fr-FR');
    let dernier = -1;
    ST.create({
      trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: (st) => {
        const p = st.progress;
        curseur.style.transform = `translateY(${p * H}px)`;
        if (bas) bas.style.opacity = Math.min(1, Math.max(0, (p - 0.25) / 0.55));
        const m = Math.round((p * 6000) / 50) * 50;
        if (m !== dernier && valeur) { dernier = m; valeur.textContent = format.format(m).replace(/ /g, ' ') + ' m'; }
      },
    });
  });
}

/* ---------- strates ---------- */
function strates() {
  if (!animer()) return;
  $$('.atelier-titre[data-effet="strates"], .atelier-photo[data-effet="strates"]').forEach((el) => {
    const n = el.classList.contains('atelier-titre') ? 9 : 16;
    gsap.fromTo(el, { clipPath: 'inset(100% -5% -25% -5%)' }, { clipPath: 'inset(-25% -5% -25% -5%)', ease: `steps(${n})`, scrollTrigger: { trigger: el, start: 'clamp(top 88%)', end: 'clamp(top 40%)', scrub: true } });
  });
  $$('.cube[data-effet="strates"]').forEach((cube) => {
    const couches = $$('.strate', cube), laser = $('.cube-laser', cube);
    const tl = gsap.timeline({ scrollTrigger: { trigger: cube, start: 'clamp(top 90%)', end: 'clamp(center 45%)', scrub: 0.4 } });
    tl.fromTo(couches, { opacity: 0, y: -10 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.2, ease: 'power1.out' }, 0);
    /* Le laser monte d'une couche à l'autre : hauteur du volume, 175 mm à l'échelle du dessin (1,05). */
    if (laser) {
      tl.fromTo(laser, { y: 0, opacity: 1 }, { y: -175 * 1.05, ease: 'none', duration: couches.length * 0.12 }, 0)
        .to(laser, { opacity: 0, duration: 0.1 });
    }
  });
}

/* ---------- cartouche ---------- */
function cartouche() {
  const liste = $$('[data-effet="cartouche"]');
  if (!liste.length) return;
  if (!animer()) { liste.forEach((c) => c.classList.add('trace')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    e.target.classList.add('trace');
  }), { rootMargin: '0px 0px -15% 0px' });
  liste.forEach((c) => io.observe(c));
}

/* ---------- Demande en étapes et cartouche récapitulatif (page Contact) ----------
   Sans JavaScript : toutes les étapes sont visibles et le formulaire reste complet. */
function demandeEnEtapes() {
  const form = $('[data-etapes]');
  if (!form) return;
  const etapes = $$('.etape-form', form), cadre = $('.etapes-cadre', form);
  const prec = $('[data-etape-precedente]', form), suiv = $('[data-etape-suivante]', form);
  const reperes = $$('[data-repere-etape]');
  let n = 0;
  form.classList.add('etapes-actives');
  const afficher = (i, focus = true) => {
    const avant = cadre.offsetHeight;
    n = i;
    etapes.forEach((e, k) => { e.hidden = k !== n; });
    prec.hidden = n === 0;
    suiv.hidden = n === etapes.length - 1;
    reperes.forEach((r, k) => { r.classList.toggle('actif', k === n); r.classList.toggle('fait', k < n); });
    if (gsap && !etat.calme && avant) {
      const apres = cadre.offsetHeight;
      gsap.fromTo(cadre, { height: avant }, { height: apres, duration: 0.45, ease: 'power3.out', clearProps: 'height', onComplete: () => rafraichir && rafraichir() });
      gsap.fromTo(etapes[n], { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity' });
    }
    if (focus) { const t = $('.etape-num', etapes[n]); t && t.focus({ preventScroll: true }); }
  };
  const valide = (i) => {
    const e = etapes[i], err = $('.etape-erreur', e);
    const groupes = [...new Set($$('input[type="radio"]', e).map((r) => r.name))];
    const manque = groupes.find((g) => !$(`input[name="${g}"]:checked`, e));
    err.textContent = manque ? form.dataset.erreurChoix : '';
    if (manque) { const r = $(`input[name="${manque}"]`, e); r && r.focus(); }
    return !manque;
  };
  suiv.addEventListener('click', () => { if (valide(n)) afficher(Math.min(n + 1, etapes.length - 1)); });
  prec.addEventListener('click', () => afficher(Math.max(n - 1, 0)));
  /* Entrée dans une étape intermédiaire : étape suivante, jamais l'envoi. */
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && n < etapes.length - 1 && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'button') { e.preventDefault(); suiv.click(); }
  });
  /* Récapitulatif en direct dans le cartouche. */
  const recap = (nom, texte) => { const el = $(`[data-recap="${nom}"]`); if (!el) return; el.textContent = texte || el.dataset.vide; el.classList.toggle('vide', !texte); };
  const libelle = (nom) => { const r = $(`input[name="${nom}"]:checked`, form); return r ? r.closest('label').textContent.trim() : ''; };
  const majRecap = () => {
    ['besoin', 'domaine', 'stade'].forEach((k) => recap(k, libelle(k)));
    const d = $('#f-delai'); recap('delai', d ? d.options[d.selectedIndex].text : '');
    const nom = ($('#f-nom').value || '').trim(), soc = ($('#f-societe').value || '').trim();
    recap('nom', [nom, soc].filter(Boolean).join(' · '));
    const f = $('#f-fichiers'); const nb = f && f.files ? f.files.length : 0;
    recap('fichiers', nb ? String(nb) : '');
  };
  form.addEventListener('input', majRecap);
  form.addEventListener('change', majRecap);
  majRecap();
  afficher(0, false);
}

demarrer({
  preparer() {
    demandeEnEtapes();
    planMatiere();
    cotation();
    traitPiece();
    encrage();
    plongee();
    strates();
    cartouche();
  },
  /* Intro, moins de 3 s : la feuille de calque et son cadre se tracent, la cote s'étire sous le logo,
     la feuille se lève, puis le premier écran se dessine (titre, trait du ROV, détail A sur la vraie photo). */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const traits = $$('.ouv-trait');
    traits.forEach((t) => { t.setAttribute('pathLength', '1'); t.style.strokeDasharray = '1 1.1'; });
    tl.fromTo(traits, { strokeDashoffset: 1.05 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.08 }, 0)
      .fromTo('.ouv-cote .cote-ligne', { scaleX: 0, transformOrigin: '50% 50%' }, { scaleX: 1, duration: 0.55, ease: 'power2.out' }, 0.15)
      .fromTo('.ouv-cote .cote-fleche, .ouv-cote .cote-attache', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.5)
      .fromTo('.ouv-ligne', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.35)
      .fromTo('.ouv-cartouche span', { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }, 0.4)
      .fromTo('.ouverture-panneau', { clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut' }, 0.95);
    premierEcranAccueil(tl, 1.15);
    premierEcranPage(tl, 1.15);
    return tl;
  },
  /* État final (retour arrière, mode calme, secours) : tout est en place, sans animation. */
  etatFinal() {
    if (!gsap) return;
    gsap.set('.hero-ligne, .hero-intro, .hero-actions, .plan-repere, .plan-attache, .plan-anneau, .plan-etiquette, .plan-legende, .plan-cote, .plan-trait', { clearProps: 'transform,opacity,clipPath' });
    gsap.set('.plan-detail, .page-tete-media', { clearProps: 'clipPath' });
    $$('[data-effet="cartouche"]').forEach((c) => c.classList.add('trace'));
  },
  /* Arrivée par un lien interne : le premier écran se dessine pendant que le voile se retire. */
  arrivee() {
    if (!gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    premierEcranAccueil(tl, 0.1);
    premierEcranPage(tl, 0.1);
  },
});

/* Les hauteurs changent quand les polices et les images arrivent : positions recalculées (regroupé par le socle). */
window.addEventListener('load', () => rafraichir && rafraichir(), { once: true });
