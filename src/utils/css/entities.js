export const genEntitiesCss = (theme) => {
  const entities = theme.entities || {};
  const cssParts = [];

  // Card Container & Image
  cssParts.push(`
/* Character Card Image & Wrapper */
.pp-cc-avatar {
  border-radius: ${entities.borderRadius !== undefined ? entities.borderRadius : 2}px !important;
  transition: all 0.2s ease !important;
}

/* Force Card Height */
.pp-cc-list-container > * {
    height: ${entities.cardHeight || 400}px !important;
    min-height: ${entities.cardHeight || 400}px !important;
    overflow: hidden;
}
`);

  // Grayscale Effect
  if (entities.grayscale) {
    const selector = entities.flipCard ? '.pp-cc-list-container > *:hover' : '.pp-cc-list-container > *:hover';
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

  // Sheen Effect on Name
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
/* Hide Event Icons */
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

  // Tigerdropped's Flip Card Design
  if (entities.flipCard) {
    // Priority: Character Color -> Card Color -> Default
    const cardBgColor = theme.charBgColor || theme.cardBgColor || '#1A202C';
    const tagColor = theme.accentColor || '#111';

    cssParts.push(`
/* === TIGERDROPPED FLIP CARD EFFECT === */
.pp-cc-list-container > * {
  background: transparent !important;
  box-shadow: none !important;
}
.pp-cc-list-container {
  gap: 0;
}
.pp-cc-list-container > *,
.mock-card {
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d !important;
}
.pp-cc-list-container > * *,
.mock-card * {
  transition: all 500ms;
}
.pp-cc-list-container > * > a,
.mock-card {
  display: flex !important;
  flex-flow: column-reverse nowrap !important;
}
.pp-cc-list-container > * > a::after,
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
.pp-cc-list-container > *:hover > a::after,
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
.pp-cc-list-container > *:hover .pp-cc-avatar-container,
.pp-cc-list-container > *:hover .pp-cc-name,
.pp-cc-list-container > *:hover .pp-cc-description,
.pp-cc-list-container > *:hover .pp-cc-ribbon-wrap,
.mock-card:hover .pp-cc-avatar,
.mock-card:hover .pp-cc-name-box,
.mock-card:hover .char-name {
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
  background-image: linear-gradient(-20deg, ${theme.accentColor}40 0%, ${theme.accentColor} 100%);
  transition: all 500ms;
}
.pp-cc-list-container > *:hover::after {
  height: 100%;
  border-radius: 10px;
  transform: rotateY(180deg);
}
.mock-card::before {
    background: 
        linear-gradient(-20deg, ${theme.accentColor}40 0%, ${theme.accentColor} 100%) top left / 100% 110px no-repeat,
        ${cardBgColor} !important;
    transition: all 500ms;
}
.mock-card:hover::before {
    background: 
        linear-gradient(-20deg, ${theme.accentColor}40 0%, ${theme.accentColor} 100%) top left / 100% 100% no-repeat,
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
    background: ${theme.accentColor} !important;
    color: #fff !important;
    border-radius: 12px !important;
    padding: 2px 8px !important;
    margin: 2px !important;
    font-size: 0.75rem !important;
    transform: none;
}
.pp-cc-list-container > *:hover > a::after,
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
.pp-cc-list-container > * {
    width: ${cardWidth}px !important;
    flex: 1 1 ${cardWidth}px !important;
    max-width: 100% !important;
}
`);
  } else {
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

  return cssParts.join('\n');
}
