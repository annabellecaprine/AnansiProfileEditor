export const CyberpunkTheme = {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    author: 'System',
    accentColor: '#00ff41', // Matrix Green/Neon
    cardBgColor: '#000000',
    bgImage: '',
    bgOpacity: 0.8,
    blur: 0,
    borderRadius: 0, // Sharp edges
    glowIntensity: 25,
    transparentCard: false,
    cardGradient: 'repeating-linear-gradient(45deg, #111, #111 10px, #222 10px, #222 20px)',
    boxShadow: '4px 4px 0px #00ff41',
    textShadow: '0 0 5px #00ff41',
    animation: 'pulse',
    fontFamily: 'Orbitron',
    hideStats: false,
    hideBadges: false,
    layout: {
        header: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 },
        avatar: { width: 100, widthUnit: 'px', height: 100, heightUnit: 'px', borderRadius: 0, objectPositionX: 50, objectPositionY: 50 },
        info: { textAlign: 'left' },
        bio: { textAlign: 'left', padding: 0 },
        stats: { display: 'flex', justifyContent: 'flex-start', marginTop: 24 }
    },
    entities: {
        borderRadius: 0,
        grayscale: true,
        sheen: false,
        hideCreator: true
    }
}
