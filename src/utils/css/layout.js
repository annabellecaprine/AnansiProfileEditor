import { genLayoutBlock } from './core';

export const genLayoutCss = (theme) => {
    const {
        layout = {},
        accentColor
    } = theme;

    const cssParts = [];

    // Container Layout
    cssParts.push(`
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

    /* HIDE DEFAULT J.AI BACKGROUND BOXES */
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
    const shape = avatar.clipPath || 'none';
    const isMask = shape.startsWith('url(');

    const avatarRules = [
        `border-color: ${accentColor} !important;`,
        `border-radius: ${avatar.borderRadius !== undefined ? avatar.borderRadius : 50}% !important;`,
        `object-fit: cover !important;`,
        `object-position: ${objPosX}% ${objPosY}% !important;`,
        `width: ${avatar.width !== undefined ? avatar.width : 100}px !important;`,
        `height: ${avatar.height !== undefined ? avatar.height : 100}px !important;`
    ];

    if (isMask) {
        avatarRules.push(`mask-image: ${shape} !important;`);
        avatarRules.push(`webkit-mask-image: ${shape} !important;`);
        avatarRules.push(`mask-size: contain !important;`);
        avatarRules.push(`webkit-mask-size: contain !important;`);
        avatarRules.push(`mask-position: center !important;`);
        avatarRules.push(`webkit-mask-position: center !important;`);
        avatarRules.push(`mask-repeat: no-repeat !important;`);
        avatarRules.push(`webkit-mask-repeat: no-repeat !important;`);
        avatarRules.push(`clip-path: none !important;`);
    } else {
        avatarRules.push(`clip-path: ${shape} !important;`);
        avatarRules.push(`mask-image: none !important;`);
        avatarRules.push(`webkit-mask-image: none !important;`);
    }

    cssParts.push(`
img.pp-uc-avatar {
  ${avatarRules.join('\n  ')}
}
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

    // Fallback for J.AI where .stats-row might not exist on the container
    if (layout.stats && layout.stats.gap) {
        cssParts.push(`
/* Fallback Spacing for Stats */
.pp-uc-followers-count {
    margin-right: ${layout.stats.gap}px !important;
}
`);
    }

    // Center Profile Info
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

    return cssParts.join('\n');
}
