# Ce qui a changé

Chaque version ajoute sa partie en tête de ce fichier, construite en comparant l'archive précédente et la nouvelle, jamais de mémoire.

## v2 — les quatre pages domaines

**Nouvelles pages** (modèle commun `source/gabarits/domaine.mjs`)
- Mécanique générale : esquisse → rendu, deux projets du trait à la pièce (unité Osmose, caisson Oceanview VR), simulation sous SolidWorks.
- Mécatronique : la mécanique de BECOM-D et l'électronique d'Airbotech dans un cartouche, lien vers le site d'Airbotech, caisson électronique en vue éclatée.
- Design et communication : étude de forme esquisse → rendu, rendus d'engins, vue artistique et rendus photoréalistes ; vidéos de synthèse « à fournir ».
- Prototypage rapide SLA : « Couche par couche » (titre en strates, volume de la Form 2), spécifications, six familles de résines, « Sur place, ou en bonne matière ».
- Chaque page : ouverture avec image Grok (« Illustration générée »), bouton « Décrire mon projet » qui préremplit le domaine dans le formulaire Contact, image de partage propre.

**Navigation**
- Le menu et le pied de page listent les 8 pages ; l'en-tête garde Compétences et Robotique sous-marine, et le bouton Menu reste visible sur ordinateur.
- Les cartes de domaines (accueil et Compétences) mènent désormais à la page de chaque domaine (« Voir la page »).

**Technique**
- Numéro de version des feuilles de style et des scripts passé à 2 (le navigateur recharge les nouveaux fichiers).
- L'audit suit aussi la page Prototypage rapide SLA comme page type du nouveau modèle.

## v1 — la base

**Pages**
- Accueil complet, et une page de chaque modèle : Compétences (synthèse), Robotique sous-marine (page domaine), Contact, Mentions légales et confidentialité, 404 « Cote hors tolérance ».
- Les pages de test publiées sur le site actuel (essais, albums, copie de page) ne sont pas reprises.

**Direction artistique « Calque & cote »**
- Papier calque et trame millimétrée, traits bleu de Prusse, accent orange signalisation.
- Titres Archivo étroite, textes IBM Plex Sans, cotes et légendes IBM Plex Mono, polices hébergées avec le site.
- Logo d'origine (en-tête, pied de page, icônes, voile de transition).

**Mouvement**
- Intro à chaque arrivée : la feuille et son cadre se tracent, puis le ROV se dessine et le détail A s'ouvre sur la vraie photo du ROV Hilarion.
- Sept effets propres : plan-matière, cotation, trait-pièce, encrage, plongée de 0 à 6000 m, strates, cartouche.
- Effets de la bibliothèque : lignes, mots, cascade, rideau, parallaxe, zoom, trace, galerie épinglée, onde WebGL, boutons magnétiques, cartes inclinées.
- Curseur réticule à la souris, voile de transition en folio de plan, mode « Réduire les animations ».

**Fonctionnalités**
- Demande d'étude en quatre étapes (besoin, domaine, stade, coordonnées) avec cartouche récapitulatif en direct, choix prérempli depuis les pages (?domaine=…), envoi simulé.
- Plan de situation dessiné à l'échelle (Lodève, Clermont-l'Hérault, Montpellier, Béziers), sans carte externe.
- Galerie des réalisations, presse (R•EEL-R, L'accent du Sud, CNRS le journal), spécifications réelles de la Form 2.

**Images**
- Vraies images du site actuel en priorité (photo du ROV Hilarion, caisson Oceanview VR, unité Osmose, traits, rendus, presse) ; images Grok pour les ambiances (colonne d'eau, abysses, atelier SLA, table à dessin, calque, 404), toutes marquées « Illustration générée ».
- Images converties en WebP en plusieurs tailles, versions téléphone pour les ouvertures.

**Mise en ligne**
- Site statique prêt pour Vercel (cleanUrls), noindex, en-têtes de sécurité, image de partage par page, données structurées schema.org.
