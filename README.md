# Anansi Profile Editor

A powerful, visual editor for creating advanced CSS themes for JanitorAI profiles.

## 🚀 Features
- **Visual Editing**: Real-time preview of your profile.
- **One-Click Export**: Generates copy-paste ready CSS.
- **Character Grids**: Force 1-6 columns for your characters.
- **Advanced Styling**: Glassmorphism, animations, and extensive flexbox controls.

## 🏗 Architecture (v1.1)

The project follows a component-based architecture with a modular CSS backend.

### Core Structure
- **`src/components/Editor/tabs/`**: specialized editors for each domain.
  - **`VisualEditor`**: Splits into `ThemeSettings` (Global) and `CardAppearance` (Local).
  - **`LayoutEditor`**: Uses `ElementStyler` for reusable flex/spacing controls.
  - **`EntitiesEditor`**: Manages character grid visuals and effects.
- **`src/components/Editor/ui/`**: Atomic components (`Slider`, `Select`, `Button`) for consistent UI.

### CSS Generation (`src/utils/css/`)
CSS generation is split into four backend modules:
1.  **`visual.js`**: Theme colors, fonts, backgrounds, animations.
2.  **`layout.js`**: Page structure, responsiveness, and flex positioning.
3.  **`entities.js`**: Character card gradients, effects, and grid layout.
4.  **`core.js`**: Shared helpers and layout block generators.

## 🛠 Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Tech Stack
- React
- Vite
- Tauri (Windows App)
