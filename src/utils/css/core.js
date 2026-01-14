/**
 * Core Utilities for CSS Generation
 */

// Helper to convert hex to rgb for opacity handling
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '26, 32, 44';
}

// Layout Block Generator
export const genLayoutBlock = (selector, props) => {
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
    if (props.marginRight) rules.push(`margin-right: ${props.marginRight}px !important;`);
    if (props.padding) rules.push(`padding: ${props.padding}px !important;`);
    if (props.textAlign) rules.push(`text-align: ${props.textAlign} !important;`);

    if (props.position && props.position !== 'static') {
        rules.push(`position: ${props.position} !important;`);
        if (props.top) rules.push(`top: ${props.top}px !important;`);
        if (props.left) rules.push(`left: ${props.left}px !important;`);
    }

    if (rules.length === 0) return '';
    return `${selector} {\n  ${rules.join('\n  ')}\n}`;
};
