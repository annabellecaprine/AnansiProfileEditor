import { hexToRgb } from './core';

export const genVisualCss = (theme) => {
    const {
        accentColor,
        cardBgColor,
        panelBgColor,
        bgImage,
        bgOpacity,
        blur,
        borderRadius,
        fontFamily,
        hideStats,
        hideBadges
    } = theme;

    const cssParts = [];
    // Priority: Panel Color -> Card Color -> Default
    const bgRgb = hexToRgb(panelBgColor || cardBgColor || '#1A202C');
    const isTransparent = theme.transparentCard;

    // 0. BASE VARIABLES & STRUCTURAL RESETS
    cssParts.push(`
/* Base Profile Page Defaults */
.pp-page-background {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    min-height: 100vh;
    background-color: #0f1115; /* Default Dark */
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    font-family: ${theme.fontFamily || "'Inter', sans-serif"};
    color: ${theme.textColor || '#FFFFFF'} !important;
    color-scheme: dark !important;
}

/* Text Overrides */
.pp-page-background h1, .pp-page-background h2, .pp-page-background h3, 
.pp-page-background h4, .pp-page-background h5, .pp-page-background h6,
.pp-page-background p, .pp-page-background span, .pp-page-background div {
    color: ${theme.textColor || '#FFFFFF'};
    font-family: ${theme.fontFamily || "'Inter', sans-serif"};
}
`);

    // 1. GLOBAL PAGE BACKGROUND
    if (bgImage) {
        cssParts.push(`
.pp-page-background {
    background-image: url('${bgImage}') !important;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}`);
    }

    // 2. MAIN CARD STYLING
    cssParts.push(`
/* Main Card Styling */
.pp-uc-background {
  border-color: ${accentColor} !important;
  box-shadow: ${theme.boxShadow || `0 0 ${theme.glowIntensity}px ${accentColor}40`} !important;
  border-radius: ${borderRadius}px !important;
  backdrop-filter: blur(${blur}px);
  background-color: ${isTransparent ? 'rgba(0,0,0,0)' : `rgba(${bgRgb}, ${bgOpacity})`} !important;
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

    // Misc Overrides
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

    return cssParts.join('\n');
}
