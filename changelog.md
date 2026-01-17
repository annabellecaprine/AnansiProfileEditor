# Changelog

All notable changes to this project will be documented in this file.

## [1.5.0] - 2026-01-16
### Major Feature Release: Card Templates & Attribution System
This release introduces a robust structural template system for character cards and automatic author attribution for community designs.

### Added
- **Character Card Templates**: 
  - **Music Show (Concert Poster)**: A complete reskin using CSS Grid by MantaRae.
  - **Tigerdropped Flip (BETA)**: Interactive flip-card effect now integrated as a template.
  - **Standard**: The clean, default JanitorAI layout.
- **Hybrid Editing Engine**: Templates now serve as a base; manual tweaks are tracked and preserved.
- **Dynamic Attribution Engine**: 
  - Automatic credit injection for both **Profile Themes** (Global) and **Card Templates**.
  - Smart labels: "Card Theme by [Author]" automatically updates to "Based on Card Theme by [Author]" if you modify the design.
  - Attribution is elegantly stacked: `Theme: [Name] by [Author] | Card Theme: [Name] by [Author]`.
- **Advanced Mock Elements**: 
  - Improved JanitorAI Header alignment.
  - Centered Search Bar in full-screen/desktop mode.
  - Refined attribution positioning to prevent clipping.

### Fixed
- **Visual Tracking**: Added application version number to the browser tab header (document title) for easier update verification.

## [1.4.0] - 2026-01-14
### Major Feature Release: Advanced Editor Tools
This release transforms the editor into a powerful professional tool with project state management, history controls, and rapid prototyping features.

### Added
- **Project Management**:
  - **Save Project**: Export your entire workspace (Theme + Content + Manual CSS) to a JSON file.
  - **Load Project**: Restore your workspace state instantly from a backup file.
- **History Control**:
  - **Undo/Redo**: Full history stack support. Recover from accidental changes or experiment freely with new designs.
  - **Keyboard Shortcuts**: `Ctrl+Z` (Undo), `Ctrl+Y` (Redo), `Ctrl+E` (Export).
- **Asset Handling**:
  - **Drag & Drop Images**: Direct support for local images in "Avatar" and "Page Background" fields. Creates a temporary blob URL for instant preview testing.
- **Smart CSS Editor**:
  - Replaced the basic textarea with a line-numbered, syntax-highlighting code editor.
  - Added snippets for common J.AI classes.

### Fixed
- **UI Regressions**:
  - Restored proper spacing for "Followers" counts (added fallback CSS).
  - Fixed "Card Height" control not applying to grid items.
  - Separated "Panel Background" and "Card Background" color controls.
- **Naming**: Reverted application branding to generic "Profile Editor".

## [1.3.0] - 2026-01-14
### Major Feature Release: Layout & Preview Engine Overhaul
This release introduces a professional-grade workspace with a resizable split-pane layout, device simulation for responsive testing, and enhanced preview accuracy.

### Added
- **Layout Engine**:
  - **Resizable Split Pane**: Drag to adjust the Editor/Preview ratio.
  - **Collapsible Sidebar**: Easily toggle the editor for a full-screen preview.
  - **Persistent State**: Remembers your preferred layout width.
- **Preview Enhancements**:
  - **Device Toolbar**: Buttons to simulate Mobile (375px), Tablet (768px), and Desktop viewports.
  - **Open in New Window**: One-click to view your profile in a fresh browser popup for final verification.
  - **Wider Canvas**: Preview area matches modern wide-screen standards (95% width).
- **UI & UX**:
  - **Confirmation Modals**: Replaced native browser alerts with custom, non-intrusive React modals (Reset Button).
  - **Text Handling**: Improved Bio text area to respect line breaks (`\n`) automatically while preserving HTML compatibility.

### Fixed
- **Flip Card Layout**: Resolved overflow issues where the avatar or header text would be cut off.
- **Tab Overflow**: Editor tabs now scroll horizontally on smaller screens instead of being cut off.
- **CSS Syntax**: Fixed nested rule error that prevented Bio improvements from applying.

## [1.2.0] - 2026-01-14
### Major Feature Release: Themes, Export & Validation
This release brings the desktop experience to maturity with a complete Theme System, professional visual polish, and robust error handling.

### Added
- **Theme Library**:
  - One-click theme switching (Midnight, Cyberpunk, Rose Garden, Default).
  - Extensible architecture for easy theme additions.
  - Visual theme gallery with color previews.
- **Export Manager**:
  - New **Export Preview Modal** with syntax highlighting.
  - **Toast Notifications** for success/error feedback.
  - Smart clipboard copy and file download options.
- **Input Validation**:
  - Automatic URL validation for background/avatar images.
  - Visual feedback (Success/Error icons) on input fields.
  - Debounced checking to prevent spamming requests.
- **Safety & Stability**:
  - **Error Boundaries**: App no longer crashes on invalid style data; offers a "Reset" option.
  - **Safe Storage**: Prevents crashes when LocalStorage is full.

### Changed
- **Visual Polish**:
  - Completely redesigned "Visual" tab with Accordion-based organization.
  - Added glassmorphism headers and smoother tab transitions.
  - Improved contrast on "Rose Garden" theme (switched to dark text).
- **UX Improvements**:
  - Removed native browser alerts in favor of Toasts.
  - Better loading states and button interactions.


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
