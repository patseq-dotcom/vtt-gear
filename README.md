# VTT Outfit Advisor - PWA Supabase

Package complet de l'application PWA avec persistance PostgreSQL et authentification sécurisée.

## Contenu de l'archive
- `index.html` : Interface principale (auth, météo, tenue et inventaire)
- `style.css` : Feuilles de styles responsive et épurées
- `app.js` : Client Supabase v2 configuré avec vos identifiants réels
- `sw.js` : Service Worker pour le fonctionnement hors-ligne (PWA)
- `manifest.json` : Manifeste PWA pour installation sur smartphone / bureau
- `setup_database.sql` : Script SQL complet à exécuter dans le SQL Editor Supabase

## Lancement
1. Ouvrez `setup_database.sql` dans le SQL Editor de Supabase pour vous assurer que les tables `profiles` et `gear_items` sont en place.
2. Déployez les fichiers statiques ou lancez un serveur local :
   ```bash
   python -m http.server 8000
   ```
3. Ouvrez `http://localhost:8000` dans votre navigateur.
