export const MidnightTheme = {
    id: 'midnight',
    name: 'Midnight',
    author: 'System',
    accentColor: '#7F9CF5', // Soft Blue
    cardBgColor: '#0f172a', // Slate 900
    bgImage: '',
    bgOpacity: 0.9,
    blur: 4,
    borderRadius: 16,
    glowIntensity: 20,
    transparentCard: false,
    cardGradient: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.95) 100%)',
    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    animation: '',
    fontFamily: 'Roboto',
    hideStats: false,
    hideBadges: false,
    layout: {
        header: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 },
        avatar: { width: 120, widthUnit: 'px', height: 120, heightUnit: 'px', borderRadius: 50, objectPositionX: 50, objectPositionY: 50 },
        info: { textAlign: 'center' },
        bio: { textAlign: 'center', padding: 10 },
        stats: { display: 'flex', justifyContent: 'center', marginTop: 16 }
    },
    entities: {
        borderRadius: 12,
        grayscale: false,
        sheen: true,
        hideCreator: false
    }
}
