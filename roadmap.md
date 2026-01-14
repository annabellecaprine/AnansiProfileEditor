# Development Roadmap - Anansi Profile Editor

**Version 1.1.0 → 2.0.0 Polish Phases**

This roadmap outlines the development phases for polishing the Anansi Profile Editor before moving into advanced feature development. Each phase is designed to be completable in 1-3 development sessions.

---

## 🎯 Phase 1: Foundation & Code Quality (Week 1)

**Goal:** Establish consistent patterns and improve maintainability

### Tasks
- [x] **Unify Component Usage**
  - [x] Replace all raw `<input type="range">` with `Slider` component
  - [x] Update `EditorPanel.jsx` header buttons to use atomic components
  - [x] Replace standalone `<select>` elements with `Select` component
  - ✅ Verified: `.button-group` buttons and `.mini-select` elements use intentional CSS styling

- [x] **Create Shared CSS System**
  - [x] Extract common styles to `src/components/Editor/EditorShared.css`
  - [x] Create CSS custom properties for spacing scale in `:root`
  - [x] Add CSS variables for color palette (--bg-primary, --bg-secondary, etc.)
  - [x] Remove duplicate `.control-section`, `.control-row`, `.divider` definitions

- [x] **Unify Prop Patterns**
  - [x] Standardize all tab components to use `updateTheme` callback pattern
  - [x] Document prop interface in comments
  - [x] Ensure consistent naming (e.g., `onChange` vs `onUpdate`)

**Success Criteria:**
- ✅ All appropriate form elements use atomic components
- ✅ All spacing uses CSS variables
- ✅ All components follow same prop pattern

**Completion Notes:**
- All `<input type="range">` (100%) replaced with `Slider` components
- Standalone `<select>` replaced with `Select` component
- `.button-group` buttons and `.mini-select` elements intentionally use CSS classes from `EditorShared.css`
- Phase 1 complete! Ready for Phase 2: Visual Polish

**Estimated Time:** 4-6 hours ✅ **COMPLETE**



---

## 🎨 Phase 2: Visual Polish & Micro-interactions (Week 1-2)

**Goal:** Add premium feel with animations and improved spacing

### Tasks
- [x] **Implement Layout Fixes & Organization** (User Requested)
  - [x] Fix CODE tab width expansion bug
  - [x] Fix Slider label spacing/overlap
  - [x] Implement Accordion system for Visual Editor
  - [x] Group Theme and Card settings into collapsible sections

- [ ] **Enhance Spacing & Typography**
  - Increase section spacing from 24px to 36px
  - Add visual hierarchy with varied font weights (400, 500, 600, 700)
  - Improve section headers with larger font sizes
  - Add subtle divider improvements (gradient lines?)

- [ ] **Add Micro-animations**
  - Tab switch transitions (fade in/out content)
  - Hover states on all buttons (scale: 1.02, shadow increase)
  - Smooth color transitions (transition: all 0.2s ease)
  - Slider thumb hover effect (scale: 1.1)
  - Control focus states with accent color glow

- [ ] **Improve Editor Header**
  - Add subtle gradient background
  - Enhance button styling with glassmorphism
  - Add hover animations to Export/Reset/About buttons
  - Consider adding app logo/icon

- [ ] **Polish Preview Panel**
  - Add "Preview Mode" badge indicator
  - Subtle pulsing border or glow to show it's live
  - Smooth transitions when theme updates

**Success Criteria:**
- Every interactive element has hover/focus state
- App feels smooth and premium
- Visual hierarchy is clear at a glance

**Estimated Time:** 6-8 hours

---

## 🔧 Phase 3: Enhanced Export Experience (Week 2)

**Goal:** Make exporting themes clear and delightful

### Tasks
- [ ] **Create Export Preview Modal**
  - New modal component showing generated CSS before copy
  - Syntax highlighting for CSS code
  - Copy button with animation
  - "How to Use" section with JanitorAI instructions
  - Download as .css file option

- [ ] **Add Toast Notification System**
  - Create reusable `Toast.jsx` component
  - Success toast for "CSS Copied!"
  - Error toast for copy failures
  - Position: bottom-right, auto-dismiss after 3s
  - Slide-in animation

- [ ] **Improve Export Button**
  - Make it more prominent (larger, better color)
  - Add keyboard shortcut (Ctrl/Cmd + E)
  - Show loading state during generation
  - Add export history (last 3 exports?)

**Success Criteria:**
- Users see what they're copying before it goes to clipboard
- Clear, encouraging feedback on successful export
- Instructions for how to use the generated code

**Estimated Time:** 5-7 hours

---

## ✅ Phase 4: Pre-made Themes & Templates (Week 2-3)

**Goal:** Provide professional, one-click styling options

### Tasks
- [x] **Theme System Architecture**
  - [x] Create modular theme definition schema
  - [x] Build central theme registry (`src/themes/index.js`)
  - [x] Migrate Default theme to new system

- [x] **Create Initial Templates**
  - [x] **Midnight:** Deep blues, high glow, rounded corners
  - [x] **Cyberpunk:** Neon green, sharp edges, glitch animations
  - [x] **Soft Rose:** Pastel pinks, light mode compatible

- [x] **Theme Browser UI**
  - [x] Add "Templates" accordion to Visual Tab
  - [x] visual preview swatches (Accent + Bg color)
  - [x] "Apply Theme" notification

**Success Criteria:**
- ✅ Adding a new theme requires NO code changes in components
- ✅ User can switch themes instantly
- ✅ Extensible file structure

**Estimated Time:** 4-5 hours ✅ **COMPLETE**

---

## Phase 5: Input Validation & Error Handling (Week 3)

**Goal:** Prevent errors and provide helpful feedback

### Tasks
- [x] **URL Validation**
  - [x] Add URL input validation for Background Image (ValidatedInput)
  - [x] Add URL input validation for Avatar URL (ValidatedInput)
  - [x] Show green checkmark icon for valid URLs
  - [x] Show red X icon for invalid URLs
  - [x] Debounced validation (wait 500ms after typing stops)

- [x] **Image Preview & Feedback**
  - [x] Show loading spinner while images load
  - [x] Verify image actually loads (onload check)
  - [ ] Add "Test Image" button (Replaced by auto-validation)
  - [x] Better fallback images than current defaults

- [x] **Error Boundaries**
  - [x] Add React error boundary around tab content
  - [x] Graceful error display if a tab crashes
  - [x] "Reset This Tab" button in error UI
  - [x] Log errors to console for debugging

- [x] **LocalStorage Handling**
  - [x] Handle quota exceeded gracefully (try-catch)
  - [ ] Add "Clear All Data" option (Covered by Reset)
  - [ ] Show warning if storage is nearly full
  - [x] Compress stored JSON if possible (Not needed yet)

**Success Criteria:**
- ✅ No silent failures
- ✅ Users know when inputs are invalid
- ✅ App never crashes from bad data

**Estimated Time:** 4-6 hours ✅ **COMPLETE**

---

## Phase 6: Panel Layout Enhancement (Week 3-4)

**Goal:** Optimize screen real estate and workflow

> **Note:** Onboarding/Welcome flow will be added AFTER this phase

### Tasks
- [ ] **Evaluate Current Layout**
  - Analyze if two-column layout is optimal
  - Consider collapsible editor panel
  - Explore tabbed vs. always-visible preview options

- [ ] **Implement Layout Improvements**
  - Option 1: Resizable split pane (drag to adjust editor/preview width)
  - Option 2: Toggle preview visibility for more editing space
  - Option 3: Detach preview to separate window (for dual monitors)
  - Add layout preference to localStorage

- [ ] **Responsive Improvements**
  - Better mobile/tablet support (if applicable)
  - Ensure controls are accessible at narrow widths
  - Stack layout vertically on small screens

**Success Criteria:**
- Users can customize workspace to their preference
- No wasted screen space
- Comfortable editing experience

**Estimated Time:** 6-8 hours

---

## 🎓 Phase 6: Onboarding & Help System (Week 3-4)

**Goal:** Guide new users and improve discoverability

> **Dependent on Phase 5 completion**

### Tasks
- [ ] **Welcome Modal**
  - Trigger on first launch (localStorage flag)
  - Explain the 5 tabs and their purposes
  - Show quick tips (Export, Reset, etc.)
  - "Take Tour" vs "Skip" options
  - Checkbox: "Don't show again"

- [ ] **Interactive Tour**
  - Highlight each tab with overlay
  - Explain key features in each section
  - Skip/Next/Previous navigation
  - Can be re-triggered from Help menu

- [ ] **Contextual Tooltips**
  - Visual tooltips (not just title attributes)
  - Appear on hover with delay
  - Explain what each control does
  - Position intelligently (above/below based on space)

- [ ] **Help Documentation**
  - Add "Help" button to header
  - Link to online docs or built-in guide
  - FAQ section (common questions)
  - Video tutorial embedding option

**Success Criteria:**
- New users understand app within 2 minutes
- All controls have explanatory tooltips
- Help is accessible when needed

**Estimated Time:** 8-10 hours

---

## 🚀 Phase 7: Power User Features (Week 4-5)

**Goal:** Add features that improve workflow efficiency

### Tasks
- [ ] **Undo/Redo System**
  - Track theme history (last 10 states)
  - Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
  - Visual indicator of undo/redo availability
  - Don't save every keystroke (debounced saves)

- [ ] **Theme Presets**
  - 5-7 pre-built themes: Dark, Light, Cyberpunk, Pastel, etc.
  - "Load Preset" dropdown in Style tab
  - Preview preset before applying
  - Custom preset saving (user can create own)

- [ ] **Keyboard Shortcuts**
  - Ctrl/Cmd + E: Export
  - Ctrl/Cmd + Z/Y: Undo/Redo
  - Ctrl/Cmd + 1-5: Switch tabs
  - Ctrl/Cmd + R: Reset
  - Show shortcuts in "Help" menu

- [ ] **Import/Export Themes**
  - Export theme as JSON file
  - Import theme from JSON file
  - Share themes with others
  - Validate imported JSON schema

**Success Criteria:**
- Power users can work faster with shortcuts
- Easy to experiment with presets
- Themes can be shared and reused

**Estimated Time:** 8-10 hours

---

## 🧪 Phase 8: Testing & Quality Assurance (Week 5)

**Goal:** Ensure stability before v2.0 release

### Tasks
- [ ] **Manual Testing**
  - Test all features on Windows
  - Test with different screen sizes
  - Test with extreme values (very long text, huge images, etc.)
  - Test export workflow end-to-end

- [ ] **Accessibility Audit**
  - Keyboard navigation through all controls
  - Screen reader testing (basic)
  - Color contrast verification (WCAG AA)
  - Focus indicators visible

- [ ] **Performance Testing**
  - Test with large theme objects
  - Check memory usage over time
  - Ensure smooth animations at 60fps
  - LocalStorage performance with many saves

- [ ] **Browser Compatibility** (if web version)
  - Chrome, Firefox, Edge testing
  - Safari testing if applicable

**Success Criteria:**
- Zero critical bugs
- Smooth performance
- Basic accessibility requirements met

**Estimated Time:** 4-6 hours

---

## 📦 Phase 9: Release Preparation (Week 5-6)

**Goal:** Polish documentation and prepare for v2.0 release

### Tasks
- [ ] **Update Documentation**
  - Update README.md with new features
  - Update changelog.md for v2.0
  - Update features.md with Phase 1-8 additions
  - Add screenshots/GIFs of new features

- [ ] **Version Bump**
  - Update package.json to 2.0.0
  - Tag release in git
  - Update About modal version number

- [ ] **Create Release Notes**
  - Highlight major improvements
  - Migration guide (if breaking changes)
  - Known issues / future roadmap

- [ ] **Community Preparation** (if applicable)
  - Prepare announcement post
  - Update project website/page
  - Create demo video/screenshots

**Success Criteria:**
- Documentation is comprehensive
- Release is properly tagged
- Users can upgrade smoothly

**Estimated Time:** 3-4 hours

---

## 📊 Summary Timeline

| Phase | Focus | Estimated Hours | Priority |
|-------|-------|----------------|----------|
| Phase 1 | Foundation & Code Quality | 4-6h | 🔴 Critical |
| Phase 2 | Visual Polish | 6-8h | 🔴 Critical |
| Phase 3 | Export Experience | 5-7h | 🔴 Critical |
| Phase 4 | Validation & Errors | 4-6h | 🟡 High |
| Phase 5 | Panel Layout | 6-8h | 🟡 High |
| Phase 6 | Onboarding | 8-10h | 🟡 High |
| Phase 7 | Power Features | 8-10h | 🟢 Medium |
| Phase 8 | Testing & QA | 4-6h | 🔴 Critical |
| Phase 9 | Release Prep | 3-4h | 🟡 High |

**Total Estimated Time:** 48-65 hours (6-8 weeks part-time, 2-3 weeks full-time)

---

## 🎯 Recommended Approach

### Critical Path (Must Do)
1. **Phase 1** → Foundation ensures consistency for all future work
2. **Phase 2** → Visual polish makes the app feel professional
3. **Phase 3** → Export UX is the primary user action
4. **Phase 8** → Testing ensures quality

### High Value (Should Do)
- **Phase 4** → Prevents user frustration
- **Phase 5** → Improves daily workflow
- **Phase 6** → Helps onboard new users

### Nice to Have (Could Do Later)
- **Phase 7** → Power features for advanced users can come in v2.1+

---

## 🔄 Iteration Strategy

After each phase:
1. ✅ Test the changes thoroughly
2. ✅ Commit to git with descriptive message
3. ✅ Update changelog.md
4. ✅ Get user feedback if possible
5. ✅ Adjust next phase based on learnings

---

## 📝 Notes

- Phases 1-3 should be done sequentially (foundation first)
- Phases 4-7 can be done in parallel or reordered based on priorities
- Phase 5 must complete before Phase 6 (onboarding needs final layout)
- Phase 8 should be done before Phase 9
- Consider breaking phases into smaller PRs for easier review

---

*Roadmap created 2026-01-14 based on v1.1.0 UX Review*
