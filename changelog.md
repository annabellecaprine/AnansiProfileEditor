# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-14
### Major Refactoring & Architecture Upgrade
This release marks a significant overhaul of the internal architecture, moving from a monolithic structure to a modular, component-based system.

### Changed
- **Architecture**:
  - Split `CssGenerator.js` into modular backend files (`core.js`, `visual.js`, `layout.js`, `entities.js`).
  - Refactored `VisualEditor.jsx` into `ThemeSettings` and `CardAppearance`.
  - Extracted layout logic from `LayoutEditor.jsx` into `ElementStyler`.
- **UI Components**:
  - Introduced atomic `Button`, `Slider`, and `Select` components for consistent styling.
  - Replaced raw HTML inputs across the editor with these new components.
- **Maintainability**:
  - Extracted shared logic to `src/utils/css/` and `src/components/Editor/ui/`.

## [0.1.0-alpha] - 2026-01-13
### Alpha Test Cycle Begins
The Anansi Profile Editor has entered Alpha! This release focuses on core stability, accurate CSS generation, and the new Desktop experience.

### Added
- **Desktop App**: Native Windows support via Tauri integration.
- **Grid Control**: New slider to force Character Grid columns (1-6) on the live profile.
- **Text Styling**: Added global Text Color picker.
- **Visual Editor**:
  - "Reset to Defaults" button.
  - Improved Avatar preview accuracy (matching live site structure).
- **CSS Generation**:
  - Semantic targeting for J.AI classes (`.pp-cc-list-container`, `.pp-uc-avatar`).
  - Fixes for Avatar framing and Card background overlays.

### Fixed
- **Preview Mismatch**: Fixed issue where local preview avatar overlapped text due to incorrect DOM structure.
- **CSS Export**: Resolved critical bugs where generated CSS was missing core variables or targeting inner `div`s incorrectly.
