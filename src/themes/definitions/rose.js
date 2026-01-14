export const RoseTheme = {
    id: 'rose',
    name: 'Rose Garden',
    author: 'System',
    accentColor: '#F687B3', // Soft Pink
    cardBgColor: '#fff5f7', // Very light pinkish white
    textColor: '#2D3748', // Dark Slate for readability
    bgImage: '',
    bgOpacity: 0.95,
    blur: 8,
    borderRadius: 24,
    glowIntensity: 10,
    transparentCard: false,
    cardGradient: 'linear-gradient(135deg, rgba(255, 245, 247, 0.95) 0%, rgba(255, 230, 240, 0.95) 100%)',
    boxShadow: '0 8px 30px rgba(246, 135, 179, 0.3)',
    textShadow: 'none',
    animation: 'float',
    fontFamily: 'Playfair Display',
    hideStats: false,
    hideBadges: false,
    layout: {
        header: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 },
        avatar: { width: 140, widthUnit: 'px', height: 140, heightUnit: 'px', borderRadius: 50, objectPositionX: 50, objectPositionY: 50 },
        info: { textAlign: 'center' },
        bio: { textAlign: 'center', padding: 16 },
        stats: { display: 'flex', justifyContent: 'center', marginTop: 12 }
    },
    entities: {
        borderRadius: 16,
        grayscale: false,
        sheen: true,
        hideCreator: false
    }
}
