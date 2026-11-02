# BECOM-D · maquette v1

Maquette du futur site de BECOM-D, bureau d'études conception mécanique & design (Saint-Jean-de-la-Blaquière, Hérault).
Direction artistique « Calque & cote » : le plan technique en version haut de gamme (papier calque et trame millimétrée,
traits bleu de Prusse, accent orange signalisation ; titres Archivo étroite, textes IBM Plex Sans, cotes IBM Plex Mono).

Adresse prévue : https://becom-d-maquette.vercel.app (site statique, sans étape de construction).

## Pages

| Page | Fichier source | Modèle |
|---|---|---|
| Accueil | `source/pages/accueil.mjs` | accueil |
| Compétences | `source/pages/competences.mjs` | synthèse |
| Robotique sous-marine | `source/pages/robotique-sous-marine.mjs` | page domaine |
| Contact | `source/pages/contact.mjs` | contact (demande en 4 étapes) |
| Mentions légales et confidentialité | `source/pages/mentions-legales.mjs` | légal |
| 404 « Cote hors tolérance » | `source/pages/404.mjs` | 404 |

À venir en v2 (même modèle que Robotique sous-marine) : Mécanique générale, Mécatronique, Design et communication,
Prototypage rapide SLA. Leurs images d'ouverture Grok sont déjà converties (`assets/images/grok/*-ouverture-*`).
En attendant, les liens « En savoir plus » des domaines mènent aux ancres de la page Compétences.

## Effets propres (plan d'animation)

`plan-matiere` (ouverture : le ROV se trace, détail A sur la vraie photo qui envahit la planche), `cotation`,
`trait-piece` (trait → simulation → mise en plan → rendu → pièce usinée), `encrage` (esquisse → rendu),
`plongee` (jauge de 0 à 6000 m, la lumière s'éteint), `strates` (couche par couche), `cartouche`.
Code : `assets/js/site.js` ; bibliothèque du socle : `assets/js/socle/` (documentation : `outils/SOCLE.md`).

## Travailler sur le projet

```
node outils/generer.mjs            pages HTML depuis donnees/ et source/
node outils/images-partage.mjs     images de partage 1200×630 (assets/partage/)
python3 outils/images.py recu/lot.json   conversion des images reçues (recu/) en WebP
node _audit/audit.mjs              audit standard (--rapide, --complet, --pages=/contact)
```

Les textes sont dans `donnees/textes/fr.json`, les données dans `donnees/*.json`. Ne jamais modifier les pages `.html` à la main.

## À fournir par le client

- Numéro de TVA intracommunautaire, ville du RCS, capital social à confirmer.
- Politique de confidentialité (RGPD).
- Descriptions des réalisations (titres repris du site, descriptions « à compléter »).
- Rendus SolidWorks originaux en haute définition (ceux du site font 300 px de large).
- Accord pour reprendre les coupures de presse (R•EEL-R, L'accent du Sud, CNRS le journal).
- Confirmation : « plus de 25 ans d'expérience » (le site actuel dit 20, 25 ou 26 ans selon les pages) ;
  projecteur immergeable 1000 m, 18 000 lumens (trouvé seulement sur une page d'essai du site actuel).

## À la mise en ligne définitive

Retirer :
- la consigne `noindex` : balise robots dans `source/gabarits/commun.mjs` et en-tête `X-Robots-Tag` dans `vercel.json` ;
- le formulaire simulé de la page Contact (brancher un vrai envoi) et les mentions « simulé » ;
- les mentions « à compléter » une fois les informations reçues ;
- la ligne « Maquette : … » du pied de page (`commun.maquette`).

Garder :
- la mention « Illustration générée » sur chaque image créée par IA (dossier `assets/images/grok/`),
  et la phrase correspondante des crédits.
