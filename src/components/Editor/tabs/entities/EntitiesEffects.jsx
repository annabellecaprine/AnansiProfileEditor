import React from 'react'
import { Sparkles, ReplaceAll, Wand2 } from 'lucide-react'
import ControlSection from '../../ui/ControlSection'

const EntitiesEffects = ({ theme, updateEntities }) => {
    return (
        <ControlSection label="Interactive Effects" icon={Wand2}>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16 }}>
                Animations and hover states for character cards.
            </p>

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="chk-grayscale"
                    checked={theme.entities?.grayscale || false}
                    onChange={(e) => updateEntities('grayscale', e.target.checked)}
                />
                <label htmlFor="chk-grayscale" style={{ margin: 0, fontWeight: 400 }}>Grayscale (Color on Hover)</label>
            </div>

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="chk-sheen"
                    checked={theme.entities?.sheen || false}
                    onChange={(e) => updateEntities('sheen', e.target.checked)}
                />
                <label htmlFor="chk-sheen" style={{ margin: 0, fontWeight: 400 }}>Sheen Name Animation</label>
            </div>

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: (theme.entities?.templateId && theme.entities?.templateId !== 'standard' && theme.entities?.templateId !== 'flip') ? 0.5 : 1, pointerEvents: (theme.entities?.templateId && theme.entities?.templateId !== 'standard' && theme.entities?.templateId !== 'flip') ? 'none' : 'auto' }}>
                <input
                    type="checkbox"
                    id="chk-flipCard"
                    checked={theme.entities?.flipCard || theme.entities?.templateId === 'flip' || false}
                    onChange={(e) => updateEntities('flipCard', e.target.checked)}
                    disabled={theme.entities?.templateId && theme.entities?.templateId !== 'standard' && theme.entities?.templateId !== 'flip'}
                />
                <label htmlFor="chk-flipCard" style={{ margin: 0, fontWeight: 400 }}>
                    Flip Card Effect <span style={{ fontSize: '0.7em', color: '#e53e3e' }}>(BETA)</span>
                </label>
            </div>
        </ControlSection>
    )
}

export default EntitiesEffects
