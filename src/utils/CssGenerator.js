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
/* Base Profile Page Defaults */
.pp-page-background {
    width: 100%;
    min-height: 100vh;
    background-color: #0f1115; /* Default Dark */
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    font-family: ${theme.fontFamily || "'Inter', sans-serif"};
    color: ${theme.textColor || '#FFFFFF'} !important;
    color-scheme: dark !important; /* Forces browser form elements to dark mode */
}

/* Text Overrides */
.pp-page-background h1, .pp-page-background h2, .pp-page-background h3, 
.pp-page-background h4, .pp-page-background h5, .pp-page-background h6,
.pp-page-background p, .pp-page-background span, .pp-page-background div {
    color: ${theme.textColor || '#FFFFFF'};
    font-family: ${theme.fontFamily || "'Inter', sans-serif"};
}

/* Container Layout */
.profile-page-container-flex-box {
    display: flex;
    display: flex;
    flex-direction: ${theme.pageLayout || 'row'};
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
.pp-page-background {
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
  const isTransparent = theme.transparentCard;

  cssParts.push(`
/* Main Card Styling */
.pp-uc-background {
  border-color: ${accentColor} !important;
  box-shadow: ${theme.boxShadow || `0 0 ${theme.glowIntensity}px ${accentColor}40`} !important;
  border-radius: ${borderRadius}px !important;
  backdrop-filter: blur(${blur}px);
  /* Use bgOpacity for the card translucency, or 0 if transparent mode is on */
  background-color: ${isTransparent ? 'rgba(0,0,0,0)' : `rgba(${bgRgb}, ${bgOpacity})`} !important;
  /* Optional Gradient Overlay */
  ${theme.cardGradient ? `background-image: ${theme.cardGradient} !important;` : ''}
}
/* Text Shadow Override */
${theme.textShadow ? `
.pp-page-background * {
    text-shadow: ${theme.textShadow} !important;
}
` : ''}
`);


  // Animations
  if (theme.animation) {
    // Float Animation
    if (theme.animation === 'float') {
      cssParts.push(`
@keyframes ppFloat {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}
.pp-uc-background {
    animation: ppFloat 6s ease-in-out infinite !important;
}
`);
    }
    // Pulse Animation
    if (theme.animation === 'pulse') {
      cssParts.push(`
@keyframes ppPulse {
    0% { box-shadow: 0 0 ${theme.glowIntensity}px ${accentColor}40; }
    50% { box-shadow: 0 0 ${parseInt(theme.glowIntensity) + 15}px ${accentColor}80; }
    100% { box-shadow: 0 0 ${theme.glowIntensity}px ${accentColor}40; }
}
.pp-uc-background {
    animation: ppPulse 3s infinite !important;
}
`);
    }
    // Shake Animation (Fun extra)
    if (theme.animation === 'shake') {
      cssParts.push(`
@keyframes ppShake {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(1deg); }
    75% { transform: rotate(-1deg); }
    100% { transform: rotate(0deg); }
}
.pp-uc-background, .profile-uc-background-flex, .css-1xdsfqv {
    animation: ppShake 0.5s linear infinite !important;
}
`);
    }
  }

  // Bell Shake Animation
  if (theme.bellShake) {
    cssParts.push(`
@keyframes ppShakeBell {
    0%, 50%, 100% { transform: rotate(0); }
    10%, 30% { transform: rotate(25deg); }
    20%, 40% { transform: rotate(-25deg); }
}
[aria-label="Notifications"] svg:has(+ div) {
    animation: ppShakeBell 1.5s infinite !important;
}
`);
  }

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
  cssParts.push(genLayoutBlock('.pp-uc-avatar', layout.avatar));

  const avatar = layout.avatar || {};
  // Avatar Object Position
  const objPosX = avatar.objectPositionX !== undefined ? avatar.objectPositionX : 50;
  const objPosY = avatar.objectPositionY !== undefined ? avatar.objectPositionY : 50;

  // FIX: .pp-uc-avatar IS the image tag, not a wrapper around it
  // Phase 4: Handle both Clip-Path (Polygon) and Mask-Image (SVG)
  const shape = avatar.clipPath || 'none';
  const isMask = shape.startsWith('url('); // If it's a URL, it's a Data URI mask we set

  const avatarRules = [
    `border-color: ${accentColor} !important;`,
    `border-radius: ${avatar.borderRadius !== undefined ? avatar.borderRadius : 50}% !important;`,
    `object-fit: cover !important;`,
    `object-position: ${objPosX}% ${objPosY}% !important;`,
    `width: ${avatar.width !== undefined ? avatar.width : 100}px !important;`,
    `height: ${avatar.height !== undefined ? avatar.height : 100}px !important;`
  ];

  if (isMask) {
    // Use Mask Image for complex shapes
    avatarRules.push(`mask-image: ${shape} !important;`);
    avatarRules.push(`webkit-mask-image: ${shape} !important;`); // Safari/Chrome support
    avatarRules.push(`mask-size: contain !important;`);
    avatarRules.push(`webkit-mask-size: contain !important;`);
    avatarRules.push(`mask-position: center !important;`);
    avatarRules.push(`webkit-mask-position: center !important;`);
    avatarRules.push(`mask-repeat: no-repeat !important;`);
    avatarRules.push(`webkit-mask-repeat: no-repeat !important;`);
    // Reset clip-path if switching from polygon
    avatarRules.push(`clip-path: none !important;`);
  } else {
    // Use Clip Path for polygons
    avatarRules.push(`clip-path: ${shape} !important;`);
    // Reset mask if switching from mask
    avatarRules.push(`mask-image: none !important;`);
    avatarRules.push(`webkit-mask-image: none !important;`);
  }

  cssParts.push(`
img.pp-uc-avatar {
  ${avatarRules.join('\n  ')}
}
/* Ensure the container matches the image size so it reserves space in the flex row */
.pp-uc-avatar-container {
    width: ${avatar.width !== undefined ? avatar.width : 100}px !important;
    height: ${avatar.height !== undefined ? avatar.height : 100}px !important;
    flex-shrink: 0 !important;
    display: block !important;
}
`);

  cssParts.push(genLayoutBlock('.css-1uodvt1', layout.info));
  cssParts.push(genLayoutBlock('.pp-uc-about-me', layout.bio));
  cssParts.push(genLayoutBlock('.stats-row', layout.stats));

  // Center Profile Info (Snippet)
  if (theme.centerInfo) {
    cssParts.push(`
/* Center Profile Info Snippet */
.css-1uodvt1, .profile-info-hstack {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
}
.pp-uc-avatar-container {
    margin: 0 auto !important;
}
`);
  }


  // ==========================================
  // 4. ENTITIES (CHARACTER CARDS)
  // ==========================================
  const entities = theme.entities || {};

  // Card Container & Image
  // Using stable classes found in live site: .pp-cc-avatar, .profile-character-card-avatar-image
  cssParts.push(`
/* Character Card Image & Wrapper */
.pp-cc-avatar {
  border-radius: ${entities.borderRadius !== undefined ? entities.borderRadius : 2}px !important;
  transition: all 0.2s ease !important;
}
`);

  // Grayscale Effect
  if (entities.grayscale) {
    cssParts.push(`
/* Grayscale Effect */
.pp-cc-avatar {
    filter: grayscale(1);
    transition: filter 0.3s ease;
}
.pp-cc-avatar-container:hover .pp-cc-avatar {
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
.pp-cc-name {
    position: relative;
    overflow: hidden;
}
.pp-cc-name::before {
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
.pp-cc-avatar-container:hover ~ * .pp-cc-name::before,
.pp-cc-name:hover::before {
    animation: sheenMove 1s forwards;
}
`);
  }

  // Hide Creator Name
  if (entities.hideCreator) {
    cssParts.push(`
/* Hide Creator Name */
.pp-cc-creator {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
}
`);
  }

  // Hide Event Icons
  if (entities.hideEvents) {
    cssParts.push(`
/* Hide Event Icons (Valentine, Christmas, etc) */
.css-5v5qgx, .css-1wqmh16, .css-nip9dx, .css-xrg4vd, .css-1awld45, .css-1cui3us, .css-8828od, .css-1henxb, .css-effh3d {
    display: none !important;
}
`);
  }

  // Card Fade Effect
  if (entities.cardFade) {
    cssParts.push(`
/* Card Fade Effect */
.pp-cc-avatar {
    mask-image: linear-gradient(to bottom, #000000, #000000 80%, #00000000 98%) !important;
    -webkit-mask-image: linear-gradient(to bottom, #000000, #000000 80%, #00000000 98%) !important;
}
`);
  }

  // Card Layout Engine: Grid vs Flex
  if (entities.layoutMode === 'flex') {
    const cardWidth = entities.cardWidth || 300;
    const gap = entities.gap !== undefined ? entities.gap : 16;
    cssParts.push(`
/* Flex Layout for Cards */
.pp-cc-list-container {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: ${gap}px !important;
    width: 100% !important;
}
/* Target direct children (cards) */
.pp-cc-list-container > * {
    width: ${cardWidth}px !important;
    flex: 1 1 ${cardWidth}px !important;
    max-width: 100% !important;
}
`);
  } else {
    // Default Grid Mode
    const gridCols = entities.gridColumns || 3;
    if (gridCols) {
      cssParts.push(`
/* Force Grid Columns */
.pp-cc-list-container {
    display: grid !important;
    grid-template-columns: repeat(${gridCols}, 1fr) !important;
    width: 100% !important;
    gap: 16px !important;
}
`);
    }
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
.pp-uc-followers-count,
.pp-uc-following-count {
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
  transparentCard: false,
  cardGradient: '',
  boxShadow: '',
  textShadow: '',
  animation: '', // New: 'float', 'pulse', 'shake'
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
