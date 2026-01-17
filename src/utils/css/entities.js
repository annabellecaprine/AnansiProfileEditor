import { CARD_TEMPLATES } from '../../themes/cardTemplates';

export const genEntitiesCss = (theme) => {
  const entities = theme.entities || {};
  const cssParts = [];

  // 1. Template-Specific Structural Overrides
  if (entities.templateId === 'music-show') {
    cssParts.push(genMusicShowCss(theme));
  } else if (entities.flipCard || entities.templateId === 'flip') {
    cssParts.push(genFlipCardCss(theme));
  }


  // 3. Base Styles (Only if not overridden by template or if compatible)
  // Note: We wrap some parts in conditionals if they conflict with templates
  if (entities.templateId !== 'music-show') {
    cssParts.push(`
/* Character Card Image & Wrapper */
.pp-cc-avatar {
  border-radius: ${entities.borderRadius !== undefined ? entities.borderRadius : 2}px !important;
  transition: all 0.2s ease !important;
}
`);
  }

  // 4. Effects (Grayscale, Sheen, etc.)
  if (entities.grayscale) {
    const selector = (entities.flipCard || entities.templateId === 'flip') ? '.pp-cc-list-container > *:hover' : '.pp-cc-list-container > *:hover';
    cssParts.push(`
/* Grayscale Avatar (Color on Hover) */
.pp-cc-avatar {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}
${selector} .pp-cc-avatar,
.mock-card:hover .pp-cc-avatar {
    filter: grayscale(0%);
}
`);
  }

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
.pp-cc-avatar-container:hover ~ * .pp-cc-name::before,
.pp-cc-name:hover::before {
    animation: sheenMove 1s forwards;
}
`);
  }

  if (entities.hideCreator) {
    cssParts.push(`
/* Hide Creator Name */
.pp-cc-creator {
    display: none !important;
}
`);
  }

  if (entities.hideEvents) {
    cssParts.push(`
/* Hide Event Icons */
.css-5v5qgx, .css-1wqmh16, .css-nip9dx, .css-xrg4vd, .css-1awld45, .css-1cui3us, .css-8828od, .css-1henxb, .css-effh3d {
    display: none !important;
}
`);
  }

  if (entities.cardFade) {
    cssParts.push(`
/* Card Fade Effect */
.pp-cc-avatar {
    mask-image: linear-gradient(to bottom, #000000, #000000 80%, #00000000 98%) !important;
    -webkit-mask-image: linear-gradient(to bottom, #000000, #000000 80%, #00000000 98%) !important;
}
`);
  }

  // 5. Layout Engine (Grid vs Flex)
  if (entities.templateId !== 'music-show') { // Music show has its own layout
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
.pp-cc-list-container > * {
    width: ${cardWidth}px !important;
    flex: 1 1 ${cardWidth}px !important;
    max-width: 100% !important;
}
`);
    } else {
      const gridCols = entities.gridColumns || 3;
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

  return cssParts.join('\n');
}


/**
 * Music Show Template Logic
 */
const genMusicShowCss = (theme) => {
  const accent = theme.accentColor || '#7F9CF5';
  return `
/* === MUSIC SHOW CARD TEMPLATE === */
.pp-cc-wrapper {
    flex: 0 1 400px;
    width: 400px;
    height: 350px !important;
    transition: all 500ms ease;
}

.pp-cc-wrapper:hover {
    transform: scale(1.02);
}

.profile-character-card-stack {
    background: #111 !important;
    border: 3px solid #000 !important;
    display: grid !important;
    grid-template-columns: 50% 50% !important; 
    grid-template-rows: 175px 115px auto !important; 
    position: relative !important; 
    gap: 0 !important;
    box-shadow: inset 0 0 0 1px #222, 0 6px 0 #000 !important;
    padding: 0 !important;
    overflow: visible !important;
}

/* "LIVE SHOW" Badge using name box before */
.profile-character-card-name-box::before {
    content: "LIVE SHOW";
    position: absolute;
    top: -280px;
    left: 12px;
    padding: 4px 10px;
    background: #710d16;
    color: #fff;
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 2px;
    border: 1px solid #ff0000;
    z-index: 5;
}

.profile-character-card-avatar-aspect-ratio {
    grid-area: 1 / 1 / 3 / 2 !important;
    position: relative !important;
    height: 100% !important;
    width: 100% !important;
}

.pp-cc-avatar {
    border: 2px solid #000 !important;
    border-radius: 0 !important;
    height: 100% !important;
    object-fit: cover !important;
}

.profile-character-card-name-box {
    grid-area: 3 / 1 / 4 / 3 !important;
    text-align: center !important;
    border-top: 2px solid ${accent} !important;
    background: #111 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    padding: 10px !important;
}

.pp-cc-name {
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    font-size: 1.1rem !important;
    color: #ccc !important;
    text-shadow: none !important;
}

.profile-character-card-description-box {
    grid-area: 1 / 2 / 2 / 3 !important;
    position: relative !important;
    padding: 0 !important;
    border-left: 2px solid #222 !important;
}

.profile-character-card-description-box::before {
    content: "FEATURING";
    display: block;
    padding: 5px 15px 0 15px;
    font-size: 0.6rem;
    letter-spacing: 2px;
    opacity: 0.6;
    color: ${accent};
}

.pp-cc-description {
    max-height: 140px !important;
    padding: 5px 15px 15px 15px !important;
    font-size: 0.85rem !important;
}

.profile-character-card-tags {
    grid-area: 2 / 2 / 3 / 3 !important;
    border-left: 2px solid #222 !important;
    border-top: 2px solid #222 !important;
    padding: 10px !important;
    display: flex !important;
    flex-wrap: wrap !important;
    align-content: flex-start !important;
}

.profile-character-card-tags::before {
    content: "GENRE";
    display: block;
    width: 100%;
    font-size: 0.6rem;
    letter-spacing: 2px;
    opacity: 0.6;
    margin-bottom: 5px;
    color: ${accent};
}

.pp-cc-tags-regular {
    background: #000 !important;
    border: 1px solid #444 !important;
    border-radius: 0 !important;
    color: #888 !important;
    font-size: 0.7rem !important;
}

/* Hide noise */
.pp-cc-tokens-count, .pp-cc-star-line, .pp-cc-ribbon {
    display: none !important;
}
`;
}

/**
 * Flip Card Template logic (Moved from inline)
 */
const genFlipCardCss = (theme) => {
  const cardBgColor = theme.charBgColor || theme.cardBgColor || '#1A202C';
  const accent = theme.accentColor || '#7F9CF5';

  return `
/* === FLIP CARD EFFECT === */
.pp-cc-list-container > * {
  background: transparent !important;
  box-shadow: none !important;
}
.pp-cc-list-container {
  gap: 0;
}
.pp-cc-list-container > * *,
.mock-card * {
  transition: all 500ms;
}
.profile-character-card-stack-link-component,
.mock-card {
  display: flex !important;
  flex-flow: column-reverse nowrap !important;
}
.profile-character-card-stack-link-component::after,
.mock-card::after {
  position: absolute;
  top: 15px;
  right: 13px;
  padding: 4px 8px;
  font-family: ${theme.fontFamily || 'Inter, sans-serif'};
  font-size: 0.8rem;
  border-radius: 32px;
  border: 2px solid #111;
  content: "Go to bot →";
  color: #111;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  transition: all 500ms;
  opacity: 0;
  z-index: 10;
}
.pp-cc-list-container > *:hover .profile-character-card-stack-link-component::after,
.pp-cc-list-container > *:hover::after {
  opacity: 1;
  background: #111;
  color: #f9f9f9;
}
.pp-cc-list-container > *::before,
.mock-card::before {
  position: absolute;
  content: "";
  inset: 0;
  z-index: -2;
  background: ${cardBgColor} !important;
  border-radius: 10px;
  transition: all 500ms;
}
.pp-cc-list-container > *:hover .profile-character-card-avatar-aspect-ratio,
.pp-cc-list-container > *:hover .profile-character-card-name-box,
.pp-cc-list-container > *:hover .pp-cc-description,
.pp-cc-list-container > *:hover .profile-character-card-ribbon,
.mock-card:hover .pp-cc-avatar,
.mock-card:hover .profile-character-card-name-box {
  transform: rotateY(180deg);
}
.pp-cc-list-container > *::before,
.mock-card::before {
    transform: rotateY(180deg);
}
.pp-cc-list-container > *:not(.mock-card)::after {
  position: absolute;
  content: "";
  top: 0; left: 0;
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 110px;
  z-index: -1;
  background-image: linear-gradient(-20deg, ${accent}40 0%, ${accent} 100%);
  transition: all 500ms;
}
.pp-cc-list-container > *:hover::after {
  height: 100%;
  border-radius: 10px;
  transform: rotateY(180deg);
}
.mock-card::before {
    background: 
        linear-gradient(-20deg, ${accent}40 0%, ${accent} 100%) top left / 100% 110px no-repeat,
        ${cardBgColor} !important;
    transition: all 500ms;
}
.mock-card:hover::before {
    background: 
        linear-gradient(-20deg, ${accent}40 0%, ${accent} 100%) top left / 100% 100% no-repeat,
        ${cardBgColor} !important;
}
.mock-card::after {
    background-image: none !important;
    height: auto !important;
    width: auto !important;
    border-radius: 0 !important;
    position: absolute !important; 
}
.pp-cc-avatar, .char-img, 
.profile-character-card-avatar-aspect-ratio,
.pp-cc-list-container > * > a > div:first-child,
.mock-card > div:first-child {
    width: 70% !important;
    max-width: 200px !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 50% !important;
    object-position: top !important;
    margin: 5px auto 15px auto !important;
    display: block !important;
}
.pp-cc-tokens-count, 
.pp-cc-star-line, 
.pp-cc-star {
  display: none !important;
}
.pp-cc-name, .char-name {
    color: ${theme.textColor || '#fff'} !important;
    text-align: center !important;
    font-weight: bold !important;
    backface-visibility: hidden;
    padding: 10px;
}
.pp-cc-tags, .char-tags {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-end !important;
  align-items: center !important;
  padding-bottom: 20px;
  transform: rotateY(180deg) translateZ(1px);
  backface-visibility: visible;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.5s ease;
  pointer-events: none;
}
.pp-cc-list-container > *:hover .pp-cc-tags,
.mock-card:hover .char-tags {
  opacity: 1;
  pointer-events: auto;
  z-index: 20;
  transform: rotateY(360deg) translateZ(1px);
}
.pp-cc-tag, .char-tag {
    background: ${accent} !important;
    color: #fff !important;
    border-radius: 12px !important;
    padding: 2px 8px !important;
    margin: 2px !important;
    font-size: 0.75rem !important;
    transform: none;
}
.pp-cc-list-container > *:hover .profile-character-card-stack-link-component::after,
.pp-cc-list-container > *:hover::after,
.mock-card:hover::after {
  opacity: 1;
  background: #111;
  color: #f9f9f9;
  transform: rotateY(360deg);
}
.mock-card {
    display: flex !important;
    flex-direction: column-reverse !important; 
    justify-content: flex-start !important;
}
.char-info, .pp-cc-name-box {
    margin-top: 4px !important; 
    z-index: 5;
}
`;
}
