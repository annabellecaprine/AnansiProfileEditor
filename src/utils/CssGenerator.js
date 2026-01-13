/**
 * Generates the raw CSS string based on the high-level Visual Editor state.
 * Supports Granular Controls and Layout Engine.
 * Uses the canonical classes found in the JAI Elements documentation.
 */
export function generateCssFromTheme(theme) {
  const {
    accentColor,
    cardBgColor,
    bgImage,
    bgOpacity,
    blur,
    borderRadius,
    fontFamily,
    hideStats,
    hideBadges,
    layout = {}
  } = theme;

  const cssParts = [];

  // ==========================================
  // 0. BASE VARIABLES & STRUCTURAL RESETS
  // ==========================================
  cssParts.push(`
:root {
  --chakra-colors-gray-800: #1A202C;
  --chakra-colors-whiteAlpha-900: ${theme.textColor || 'rgba(255, 255, 255, 0.92)'};
  --chakra-colors-whiteAlpha-600: ${theme.textColor ? theme.textColor + 'cc' : 'rgba(255, 255, 255, 0.48)'};
}

/* Base Profile Page Defaults */
.pp-page-background {
    width: 100%;
    min-height: 100vh;
    background-color: #0f1115; /* Default Dark */
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    font-family: 'Inter', sans-serif;
    color: ${theme.textColor || '#FFFFFF'} !important;
}

/* Text Overrides */
.pp-page-background h1, .pp-page-background h2, .pp-page-background h3, 
.pp-page-background h4, .pp-page-background h5, .pp-page-background h6,
.pp-page-background p, .pp-page-background span, .pp-page-background div {
    color: ${theme.textColor || '#FFFFFF'};
}

/* Container Layout */
.profile-page-container-flex-box {
    display: flex;
    flex-direction: row;
    max-width: 1400px;
    margin: 0 auto;
    padding: 30px 20px;
    gap: 30px;
    align-items: flex-start;
}

/* Left Column (Profile Card) */
.profile-uc-follow-flex {
    flex: 0 0 350px;
    position: sticky;
    top: 30px;
}

/* Responsive: Stack on mobile */
@media (max-width: 900px) {
    .profile-page-container-flex-box {
        flex-direction: column;
    }
    .profile-uc-follow-flex {
        width: 100%;
        position: static;
    }
}
`);

  // ==========================================
  // 1. GLOBAL PAGE BACKGROUND
  // ==========================================
  // Typically JanitorAI puts the background on a wrapper or body.
  // We target .pp-page-background for the full page effect.
  if (bgImage) {
    cssParts.push(`
.pp-page-background, .profile-page-background {
    background-image: url('${bgImage}') !important;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}`);
  }

  // ==========================================
  // 2. MAIN CARD STYLING
  // ==========================================

  // Helper to convert hex to rgb for opacity handling
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '26, 32, 44';
  }

  const bgRgb = hexToRgb(cardBgColor || '#1A202C');

  cssParts.push(`
/* Main Card Styling */
.pp-uc-background, .profile-uc-background-flex, .css-1xdsfqv {
  border-color: ${accentColor} !important;
  box-shadow: 0 0 ${theme.glowIntensity}px ${accentColor}40 !important;
  border-radius: ${borderRadius}px !important;
  backdrop-filter: blur(${blur}px);
  /* Use bgOpacity for the card translucency */
  background-color: rgba(${bgRgb}, ${bgOpacity}) !important;
}`);


  // ==========================================
  // 3. LAYOUT ENGINE (Existing)
  // ==========================================

  const genLayoutBlock = (selector, props) => {
    if (!props) return '';
    const rules = [];
    if (props.display) rules.push(`display: ${props.display} !important;`);
    if (props.flexDirection) rules.push(`flex-direction: ${props.flexDirection} !important;`);
    if (props.justifyContent) rules.push(`justify-content: ${props.justifyContent} !important;`);
    if (props.alignItems) rules.push(`align-items: ${props.alignItems} !important;`);
    if (props.gap) rules.push(`gap: ${props.gap}px !important;`);
    if (props.width) rules.push(`width: ${props.width}${props.widthUnit || 'px'} !important;`);
    if (props.height) rules.push(`height: ${props.height}${props.heightUnit || 'px'} !important;`);
    if (props.marginTop) rules.push(`margin-top: ${props.marginTop}px !important;`);
    if (props.marginBottom) rules.push(`margin-bottom: ${props.marginBottom}px !important;`);
    if (props.marginLeft) rules.push(`margin-left: ${props.marginLeft}px !important;`);
    if (props.marginRight) rules.push(`margin-right: ${props.marginRight}px !important;`); // added right
    if (props.padding) rules.push(`padding: ${props.padding}px !important;`); // simple padding
    if (props.textAlign) rules.push(`text-align: ${props.textAlign} !important;`);

    if (props.position && props.position !== 'static') {
      rules.push(`position: ${props.position} !important;`);
      if (props.top) rules.push(`top: ${props.top}px !important;`);
      if (props.left) rules.push(`left: ${props.left}px !important;`);
    }

    if (rules.length === 0) return '';
    return `${selector} {\n  ${rules.join('\n  ')}\n}`;
  };

  /* HIDE DEFAULT J.AI BACKGROUND BOXES (They overlay our custom styles) */
  cssParts.push(`
.profile-background-box-1, .profile-background-box-2, .profile-background-box-3 {
    display: none !important;
    background: none !important;
}
`);

  cssParts.push(genLayoutBlock('.pp-uc-background .css-1fd6h3f', layout.header));
  cssParts.push(genLayoutBlock('.pp-uc-avatar, .profile-avatar', layout.avatar));

  const avatar = layout.avatar || {};
  // Avatar Object Position
  const objPosX = avatar.objectPositionX !== undefined ? avatar.objectPositionX : 50;
  const objPosY = avatar.objectPositionY !== undefined ? avatar.objectPositionY : 50;

  // FIX: .pp-uc-avatar IS the image tag, not a wrapper around it
  cssParts.push(`
img.pp-uc-avatar, img.profile-avatar, .pp-uc-avatar, .profile-avatar {
  border-color: ${accentColor} !important;
  border-radius: ${avatar.borderRadius !== undefined ? avatar.borderRadius : 50}% !important;
  object-fit: cover !important;
  object-position: ${objPosX}% ${objPosY}% !important;
  width: ${avatar.width !== undefined ? avatar.width : 100}px !important; 
  height: ${avatar.height !== undefined ? avatar.height : 100}px !important;
}
/* Ensure the container matches the image size so it reserves space in the flex row */
.pp-uc-avatar-container, .profile-avatar-container {
    width: ${avatar.width !== undefined ? avatar.width : 100}px !important;
    height: ${avatar.height !== undefined ? avatar.height : 100}px !important;
    flex-shrink: 0 !important;
    display: block !important;
}
`);

  cssParts.push(genLayoutBlock('.css-1uodvt1', layout.info));
  cssParts.push(genLayoutBlock('.pp-uc-about-me, .profile-about-me', layout.bio));
  cssParts.push(genLayoutBlock('.stats-row', layout.stats));


  // ==========================================
  // 4. ENTITIES (CHARACTER CARDS)
  // ==========================================
  const entities = theme.entities || {};

  // Card Container & Image
  // Using stable classes found in live site: .pp-cc-avatar, .profile-character-card-avatar-image
  cssParts.push(`
/* Character Card Image & Wrapper */
.profile-character-card-avatar-aspect-ratio, 
.pp-cc-avatar {
  border-radius: ${entities.borderRadius !== undefined ? entities.borderRadius : 2}px !important;
  transition: all 0.2s ease !important;
}
`);

  // Grayscale Effect
  if (entities.grayscale) {
    cssParts.push(`
/* Grayscale Effect */
.pp-cc-avatar, .profile-character-card-avatar-image {
    filter: grayscale(1);
    transition: filter 0.3s ease;
}
.profile-character-card-avatar-aspect-ratio:hover .pp-cc-avatar,
.profile-character-card-avatar-aspect-ratio:hover .profile-character-card-avatar-image {
    filter: grayscale(0);
}
`);
  }

  // Sheen Effect on Name
  // Note: We are guessing the stable class for name is .pp-cc-name or similar, 
  // but keeping the hash as a fallback until confirmed.
  if (entities.sheen) {
    cssParts.push(`
/* Sheen Animation */
@keyframes sheenMove {
    from { left: -75%; }
    to { left: 125%; }
}
.css-zgqw37, .css-6pkpcc, .pp-cc-name, .profile-character-card-name {
    position: relative;
    overflow: hidden;
}
.css-zgqw37::before, .css-6pkpcc::before, .pp-cc-name::before, .profile-character-card-name::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    height: 100%;
    width: 50%;
    background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg);
}
/* Trigger sheen on hover of the avatar container or the name tag itself */
.profile-character-card-avatar-aspect-ratio:hover ~ * .pp-cc-name::before,
.pp-cc-name:hover::before {
    animation: sheenMove 1s forwards;
}
`);
  }

  // Hide Creator Name
  if (entities.hideCreator) {
    cssParts.push(`
/* Hide Creator Name */
.css-1m0lwfp, .css-vquwtv, .pp-cc-creator {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
}
`);
  }

  // Grid Columns Override
  const gridCols = entities.gridColumns || 3;
  if (gridCols) {
    cssParts.push(`
/* Force Grid Columns */
.pp-cc-list-container, .css-16g5xvc {
    display: grid !important;
    grid-template-columns: repeat(${gridCols}, 1fr) !important;
    width: 100% !important;
    gap: 16px !important;
}
`);
  }

  // Start with default theme for other parts

  cssParts.push(`
.chakra-badge {
  background-color: ${accentColor} !important;
  color: #fff !important;
  ${hideBadges ? 'display: none !important;' : ''}
}`);

  if (hideStats) {
    cssParts.push(`
.pp-uc-followers-count, .profile-followers-count,
.pp-uc-following-count, .profile-following-count {
  display: none !important;
}`);
  }

  if (fontFamily && fontFamily !== 'Inter') {
    cssParts.push(`
.pp-page-background * {
  font-family: "${fontFamily}", sans-serif !important;
}`);
  }

  // ==========================================
  // 5. SNIPPETS & HELPERS
  // ==========================================
  cssParts.push(`
/* Accordion / Details */
details {
    margin-top: 10px;
    display: inline-block;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${accentColor}40;
}
details summary {
    font-weight: bold;
    padding: 8px 12px;
    cursor: pointer;
    user-select: none;
    position: relative;
    background: rgba(${bgRgb}, 0.5);
    list-style: none; /* Hide default triangle */
}
details summary::after {
    content: '+';
    position: absolute;
    right: 12px;
}
details[open] summary::after {
    content: '-';
}
.details-content {
    padding: 12px;
    background: rgba(0,0,0,0.2);
}

/* Two Column Layout */
.pp-snippet-container {
    display: flex;
    width: 100%;
    gap: 10px;
}
.pp-snippet-column {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
}
`);

  return cssParts.join('\n');
}

export const defaultTheme = {
  accentColor: '#ff0055',
  cardBgColor: '#1A202C', // New: Configurable Card Background
  bgImage: '',
  bgOpacity: 0.95,
  blur: 0,
  borderRadius: 12,
  glowIntensity: 15,
  fontFamily: 'Inter',
  hideStats: false,
  hideBadges: false,
  layout: {
    header: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 16 },
    avatar: { width: 80, widthUnit: 'px', height: 80, heightUnit: 'px', borderRadius: 50, objectPositionX: 50, objectPositionY: 50 },
    info: { textAlign: 'left' },
    bio: { textAlign: 'left', padding: 0 },
    stats: { display: 'flex', justifyContent: 'flex-start', marginTop: 20 }
  },
  entities: {
    borderRadius: 8,
    grayscale: false,
    sheen: false,
    hideCreator: false
  }
};
