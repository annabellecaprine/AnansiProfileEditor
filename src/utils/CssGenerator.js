import { genVisualCss } from './css/visual';
import { genLayoutCss } from './css/layout';
import { genEntitiesCss } from './css/entities';
import { hexToRgb } from './css/core';

/**
 * Generates the raw CSS string based on the high-level Visual Editor state.
 * Composed of modular generators for Visuals, Layout, and Entities.
 */
import { CARD_TEMPLATES } from '../themes/cardTemplates';

export function generateCssFromTheme(theme) {
    const visualCss = genVisualCss(theme);
    const layoutCss = genLayoutCss(theme);
    const entitiesCss = genEntitiesCss(theme);
    const attributionCss = genCombinedAttribution(theme);

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

    return [visualCss, layoutCss, entitiesCss, attributionCss, miscSnippets].join('\n\n');
}

/**
 * Combined Attribution Generator for Themes and Card Templates
 */
function genCombinedAttribution(theme) {
    const attributionLines = [];

    // 1. Global Theme Attribution
    if (theme.author && theme.author !== 'System') {
        const prefix = theme.isThemeModified ? 'Based on ' : '';
        attributionLines.push(`${prefix}Theme: ${theme.name} by ${theme.author}`);
    }

    // 2. Card Template Attribution
    const entities = theme.entities || {};
    if (entities.templateId && entities.templateId !== 'standard') {
        const template = CARD_TEMPLATES.find(t => t.id === entities.templateId);
        if (template) {
            const prefix = entities.isTemplateModified ? 'Based on ' : '';
            attributionLines.push(`${prefix}Card Theme: ${template.name} by ${template.author}`);
        }
    }

    if (attributionLines.length === 0) return '';

    return `
/* Automatically Injected Attribution */
body::after {
    content: "${attributionLines.join(' | ')}";
    position: fixed;
    bottom: 12px;
    right: 15px; /* Increased to avoid clipping */
    font-size: 10px;
    color: #fff;
    opacity: 0.5;
    background: rgba(0,0,0,0.5);
    padding: 4px 8px;
    border-radius: 6px;
    z-index: 99999;
    pointer-events: none;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}
`;
}


