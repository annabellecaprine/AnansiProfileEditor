import { genVisualCss } from './css/visual';
import { genLayoutCss } from './css/layout';
import { genEntitiesCss } from './css/entities';
import { hexToRgb } from './css/core';

/**
 * Generates the raw CSS string based on the high-level Visual Editor state.
 * Composed of modular generators for Visuals, Layout, and Entities.
 */
export function generateCssFromTheme(theme) {
  const visualCss = genVisualCss(theme);
  const layoutCss = genLayoutCss(theme);
  const entitiesCss = genEntitiesCss(theme);

  const miscSnippets = `
/* Accordion / Details */
details {
    margin-top: 10px;
    display: inline-block;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${theme.accentColor}40;
}
details summary {
    font-weight: bold;
    padding: 8px 12px;
    cursor: pointer;
    user-select: none;
    position: relative;
    background: rgba(${hexToRgb(theme.cardBgColor || '#1A202C')}, 0.5);
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
`;

  return [visualCss, layoutCss, entitiesCss, miscSnippets].join('\n\n');
}


