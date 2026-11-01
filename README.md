# VTT Weather & Gear Assistant (PWA v3.2-AI)

## Nouveautés :
1. **Édition complète des fiches d'équipements** :
   - Bouton de modification (icône crayon) sur chaque carte.
   - Enregistrement immédiat dans le `localStorage` de votre téléphone.
2. **Critères de décision tactiques intégrés** :
   - Plage thermique minimale et maximale (°C).
   - Condition météo cible (Pluie/Boue, Sec/Windstopper, Grand Froid, Doux).
   - Règles d'arbitrage explicites (ex: seuil des 8°C anti-surchauffe, règle de goulotte étanche pour les chaussures).
3. **Moteur d'extraction IA & Auto-complétion** :
   - Champ d'auto-remplissage par nom de modèle, référence commerciale ou URL de fiche produit.
   - Pré-remplit automatiquement la catégorie, les spécifications, les températures cibles et les consignes tactiques.
4. **Service Worker v5** :
   - Purge automatique de l'ancien cache pour un rafraîchissement immédiat sur smartphone.
