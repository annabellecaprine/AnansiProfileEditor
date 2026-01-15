export const DefaultTheme = {
    id: 'default',
    name: 'Default Theme',
    author: 'System',
    accentColor: '#ff0055',
    cardBgColor: '#1A202C',
    bgImage: '',
    bgOpacity: 0.95,
    blur: 0,
    borderRadius: 12,
    glowIntensity: 15,
    transparentCard: false,
    cardGradient: '',
    boxShadow: '',
    textShadow: '',
    animation: '',
    fontFamily: 'Inter',
    hideStats: false,
    hideBadges: false,
    layout: {
        header: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 16 },
        avatar: { width: 80, widthUnit: 'px', height: 80, heightUnit: 'px', borderRadius: 50, objectPositionX: 50, objectPositionY: 50 },
        info: { textAlign: 'left' },
        bio: { textAlign: 'left', padding: 0 },
        stats: { display: 'flex', justifyContent: 'flex-start', marginTop: 20, gap: 20 }
    },
    entities: {
        borderRadius: 8,
        grayscale: false,
        sheen: false,
        hideCreator: false
    }
}
