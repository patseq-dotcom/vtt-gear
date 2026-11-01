# VTT Weather & Gear Assistant (PWA)

Cette archive contient l'application web complète prête à l'emploi et installable sur smartphone.

## Contenu du package :
1. `index.html` : L'application complète (Météo samedi Open-Meteo, Géolocalisation GPS, Moteur de recommandations VTT, Simulateur et Inventaire de matériel).
2. `manifest.json` : Déclaration PWA pour installation native sur iOS et Android.
3. `sw.js` : Service Worker pour le cache hors-ligne et les performances.
4. `icon-192.png` et `icon-512.png` : Icônes de l'application pour l'écran d'accueil.

## Comment déployer en 2 minutes (Gratuit & HTTPS) :

### Option 1 : GitHub Pages (Recommandé)
1. Crée un dépôt GitHub (ex: `vtt-gear-app`).
2. Dépose l'ensemble des fichiers décompressés à la racine du dépôt.
3. Va dans **Settings > Pages** de ton dépôt GitHub.
4. Sous **Build and deployment > Branch**, sélectionne `main` (ou `master`) et clique sur **Save**.
5. Ton URL sécurisée (https://<ton-pseudo>.github.io/vtt-gear-app/) sera active en 1 minute.

### Option 2 : Vercel ou Cloudflare Pages
- Glisse simplement le dossier décompressé sur [vercel.com](https://vercel.com) ou Cloudflare Pages pour obtenir immédiatement une URL HTTPS.

## Installation sur smartphone :
- **Sur Android (Chrome) :** Ouvre l'URL, appuie sur les trois petits points verticaux > **Installer l'application**.
- **Sur iPhone (Safari) :** Ouvre l'URL, clique sur le bouton de partage (carré avec flèche vers le haut) > **Sur l'écran d'accueil**.
