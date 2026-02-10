# Apple Watch Configurator 3D

Un configurateur 3D minimaliste et luxe pour Apple Watch, construit avec React Three Fiber et Three.js.

## 🎨 Fonctionnalités

- **Visualisation 3D interactive** : Zoom, rotation et manipulation de la montre en temps réel
- **Sélecteur de couleurs** : 4 coloris disponibles (Noir, Argent, Or, Bleu)
- **Rotation automatique** : Affichage automatique de la montre avec contrôle on/off
- **Recentrage fluide** : Animation GSAP pour revenir à la position initiale
- **Design Apple** : Interface minimaliste et épurée avec glassmorphism
- **Environnement réaliste** : Éclairage urbain et réflexions dynamiques

## 🚀 Installation

```bash
# Clone ou navigue vers le répertoire
cd r3f-app

# Installe les dépendances
npm install

# Lance le serveur de développement
npm run dev
```

## 🛠️ Technologies utilisées

- **React 19** - Framework UI
- **Vite** - Build tool
- **Three.js** - Moteur 3D
- **@react-three/fiber** - Renderer React pour Three.js
- **@react-three/drei** - Utilitaires et composants 3D
- **GSAP** - Animations fluides
- **TypeScript** - Typage statique

## 📁 Structure du projet

```
src/
├── App.tsx              # Composant principal avec l'interface
├── App.css              # Styles minimalistes
├── components/
│   └── Model3D.tsx      # Composant de chargement du modèle glTF
├── main.tsx             # Point d'entrée React
└── index.css            # Styles globaux

public/
├── models/
│   └── watch.gltf       # Modèle 3D de la montre (Sketchfab)
└── textures/            # Dossier pour les textures
```

## 📱 Modèle 3D

Le modèle Apple Watch provient de **Sketchfab** au format glTF et est stocké dans `/public/models/watch.gltf`.

### Utilisation du modèle

L'application charge automatiquement le modèle et applique les couleurs sélectionnées via l'interface. Les matériaux du modèle sont mis à jour en temps réel.

## 🎮 Contrôles

- **Couleurs** : Cliquez sur les 4 points de couleur au centre de l'écran
- **Auto Rotation** : Bouton "Auto" en bas à gauche pour activer/désactiver la rotation
- **Reset** : Bouton "Reset" en bas à droite pour recentrer la vue
- **Souris** : 
  - Clic + glisser : Rotation manuelle
  - Scroll : Zoom avant/arrière (limité entre 0.5 et 0.8)

## 📝 Notes de développement

- La rotation est activée par défaut au chargement
- L'application utilise un environnement "city" pour les réflexions réalistes
- Le fond comporte une légère superposition blanche (3% d'opacité)
- Les transitions et animations utilisent GSAP pour fluidité maximale

## 🎨 Personnalisation

Pour modifier les couleurs disponibles, édite le tableau `colors` dans `src/App.tsx` :

```tsx
const colors = [
  { name: 'Noir', hex: '#000000' },
  { name: 'Argent', hex: '#e8e8e8' },
  { name: 'Or', hex: '#d4af37' },
  { name: 'Bleu', hex: '#0071e3' },
];
```

## 📄 License

Ce projet est créé à titre éducatif.


