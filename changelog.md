# Changelog

All notable changes to this project will be documented in this file.

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
