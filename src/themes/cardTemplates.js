export const CARD_TEMPLATES = [
    {
        id: 'standard',
        name: 'Standard',
        author: 'JanitorAI',
        description: 'The default character card layout.',
        defaults: {}
    },
    {
        id: 'flip',
        name: 'Tigerdropped Flip',
        author: 'Tigerdropped',
        description: 'BETA: Cards flip on hover to reveal details.',
        defaults: {
            flipCard: true
        }
    },
    {
        id: 'music-show',
        name: 'Music Show',
        author: 'MantaRae',
        description: 'Concert poster style with a 50/50 grid layout.',
        defaults: {
            layoutMode: 'grid',
            gridColumns: 2,
            hideCreator: true,
            hideEvents: true,
            // We'll handle the specific CSS in the generator
        }
    }
];

export const getCardTemplateById = (id) => CARD_TEMPLATES.find(t => t.id === id) || CARD_TEMPLATES[0];
