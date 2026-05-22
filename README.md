# 🤝 Yedidya Enfance — Dossier de refonte

> Préparé le **21 mai 2026** — pour validation client avant la levée de fonds construction **mi-juin 2026**.

---

## 📁 Contenu du dossier

```
proposition/
│
├── 00-DIAGNOSTIC-ET-RECOMMANDATIONS.md   ← Le rapport stratégique complet
├── 01-DIRECTION-ARTISTIQUE.md            ← La DA détaillée (palette, typo, exemples)
├── 02-STRATEGIE-SEO-GEO.md               ← Plan SEO/GEO 90 jours
├── 03-DIFFERENCIATION-DESIGN.md          ← Étude de positionnement secteur
├── README.md                             ← Ce fichier
│
├── site/                                 ← VERSION A — Maquette classique premium
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── loader.css / loader.js            ← Intro émotionnelle avec vidéo
│   ├── robots.txt / sitemap.xml / llms.txt  ← Fichiers SEO/GEO
│
├── site2/                                ← VERSION B — "Le site est une maison"
│   ├── index.html                        ← Concept différenciant : nav par pièces
│   ├── styles.css                        ← Palette terre/soleil/olive (magazine)
│   ├── script.js                         ← Don granulaire 12 actions
│   └── loader.css / loader.js
│
└── assets/                               (partagés entre les 2 versions)
    ├── logo/         (4 variantes du logo récupéré)
    ├── photos/       (19 photos sources)
    ├── partners/     (logo UNICEF officiel SVG)
    └── video/        (vidéo Yedidya Kids 18s + poster + WebM)
```

## 🎯 Comparaison des deux versions

| | **Version A** (site/) | **Version B** (site2/) |
|---|---|---|
| **Concept** | Site humanitaire premium, codes du secteur | Le site EST une maison qu'on visite |
| **Navigation** | Histoire / Projets / Galerie / Soutenir | 🥣 Cuisine · 🌱 Potager · 🛏 Dortoir · 🩺 Infirmerie · 🏗 Chantier · 📊 Bureau · 💌 Courrier |
| **Palette** | Crème + bleu maison + terre douce | Terre cuite + soleil moutarde + olive (chaud, magazine) |
| **Ton** | Émotionnel classique | "Notre cuisine", "les petits", éditorial chaleureux |
| **Don** | 5 montants suggérés × 4 projets | 12 micro-dons CONCRETS (8 € = 1 vaccination, 250 € = 1 m²) |
| **Originalité** | Très bien fait dans son genre | OVNI sectoriel — se démarque immédiatement |
| **Différenciants exclusifs** | — | • Bureau ouvert (dashboard budget temps réel)<br/>• Mur des petites choses (objets, pas visages)<br/>• Bandeau live Butembo (jour + heure réels)<br/>• Calendrier saisonnier du potager |
| **Risque** | Risque d'être noyé dans 50 sites identiques | Demande maintenance régulière (potager, reçus, semaine) |
| **Recommandé pour** | Lancement rapide, ambition modérée | Devenir LA référence sectorielle |

---

## 🚀 Comment consulter les maquettes

### Option recommandée — Serveur local
```bash
cd "proposition"
python3 -m http.server 8000
```

Puis ouvrir :
- **Version A (premium classique)** → http://localhost:8000/site/index.html
- **Version B (la maison)** → http://localhost:8000/site2/index.html

### Pour forcer l'intro (loader vidéo) à se rejouer
Ajouter `?intro=1` à l'URL ou utiliser la navigation privée.

---

## ✅ Ce qui est inclus dans cette V1

### Dans le diagnostic stratégique (`00-DIAGNOSTIC-ET-RECOMMANDATIONS.md`)
- Audit du site actuel (technique, contenu, SEO, conversion)
- 5 points faibles critiques identifiés
- Repositionnement narratif proposé
- Nouvelle arborescence (9 pages vs 5 actuelles)
- Parcours utilisateur optimisé
- Design system complet
- Module de don repensé avec équivalences concrètes
- Contenus à produire (priorisés)
- Planning de production semaine par semaine vers le 15 juin
- Budget indicatif (option éco vs prestataire)
- KPIs à suivre
- Risques & vigilances

### Dans la maquette interactive (`site/`)
- ✅ **Header sticky** avec navigation + double CTA (bénévole / don)
- ✅ **Hero immersif** : visage d'enfant + tagline forte + badge UNICEF
- ✅ **Compteurs animés** : 42 enfants / 6 membres équipe / 100 % bio / 2020
- ✅ **Section Histoire** : récit fondateur + citation biblique + photo bâtiment
- ✅ **Bandeau reconnaissances** : UNICEF, ministère, ville, HelloAsso, loi 1901
- ✅ **3 cartes projets** : Construction (urgent), Alimentation bio, Scolarité/Santé
  - Chaque carte a sa propre barre de progression
  - Bouton qui présélectionne le projet dans le module de don
- ✅ **Galerie quotidien** : 9 photos en mosaïque asymétrique
- ✅ **Témoignages** : auxiliaire de vie, donateur mensuel, UNICEF
- ✅ **Module de don repensé** :
  - Choix fréquence (une fois / chaque mois)
  - 5 montants suggérés (20€ / 50€ / 100€ / 250€ / libre)
  - **Équivalences dynamiques** : « 50 € = 1 mois d'alimentation bio »
  - 4 projets ciblables (général, construction, bio, scolarité)
  - Bouton qui résume le don et redirige vers HelloAsso avec paramètres
- ✅ **CTA newsletter** final
- ✅ **Footer riche** : 4 colonnes, liens, réseaux sociaux, double adresse RDC/FR
- ✅ **Schema.org NGO** intégré (SEO + visibilité IA)
- ✅ **Responsive** : 3 breakpoints (mobile / tablette / desktop)
- ✅ **Polices Google Fonts** : Fraunces (titres) + Inter (texte)

---

## ⚠️ Ce qui reste à valider avec le client

1. **Chiffres réels** (compteurs et progressions) — actuellement placeholders crédibles
2. **Citations témoignages** — à valider ou remplacer par de vrais témoignages
3. **Budget construction** (65 000 € indiqué) — chiffre à confirmer
4. **Photos récentes** — celles disponibles datent de 2020-2022, qualité WhatsApp
5. **Vrais formulaires HelloAsso** : aujourd'hui 1 seul existe → en créer 1 par projet ou utiliser un menu déroulant projet HelloAsso natif
6. **Consentements parentaux** pour publier visages + prénoms d'enfants
7. **Récit fondateur précis** : qui a créé Yedidya, en quelle année exactement, sur quel choc personnel ?

---

## 🎯 Prochaines étapes recommandées

| Étape | Quand | Qui |
|---|---|---|
| 1. Présentation de cette maquette au client | Cette semaine | Vous |
| 2. Recueil retours + ajustements DA | Cette semaine | Vous + client |
| 3. Photo-shoot smartphone à Butembo | Semaine 2 | Équipe RDC |
| 4. Récolte des 3 récits enfants (prénom + 1 paragraphe) | Semaine 2 | Équipe RDC |
| 5. Configuration HelloAsso multi-projets | Semaine 2 | Vous |
| 6. Intégration finale + responsive QA | Semaine 3 | Vous |
| 7. Mise en ligne + campagne lancement | Semaine 4 (~15 juin) | Vous + client |

---

## 💬 Questions ouvertes pour le client

Avant le démarrage formel, **5 questions clés** à poser :

1. **Quel est le montant exact** à lever pour la construction (et le calendrier des appels de fonds) ?
2. **Combien d'enfants** sont accueillis aujourd'hui ? Et depuis le début ?
3. **Avons-nous des photos récentes** (2025-2026) ou la session photo dédiée est-elle à prévoir ?
4. **Pouvons-nous nommer les enfants** ou faut-il rester sur des prénoms d'emprunt ?
5. **Y a-t-il un fondateur identifiable** dont l'histoire peut servir de porte d'entrée narrative ?

---

*Document de travail v1.0 — toute remarque, ajustement DA ou retour client peut être intégré rapidement.*
