import React from 'react'
import { CARD_TEMPLATES } from '../../../../themes/cardTemplates'
import { Check, Info } from 'lucide-react'

const CardTemplateSelector = ({ currentTemplateId, onSelect }) => {
    return (
        <div className="control-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Card Templates
                </h3>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 10
            }}>
                {CARD_TEMPLATES.map(template => {
                    const isActive = currentTemplateId === template.id || (template.id === 'standard' && !currentTemplateId);

                    return (
                        <div
                            key={template.id}
                            onClick={() => onSelect(template)}
                            style={{
                                padding: '12px',
                                background: isActive ? 'rgba(74, 54, 214, 0.15)' : '#252525',
                                border: `1px solid ${isActive ? 'var(--accent-primary)' : '#444'}`,
                                borderRadius: 8,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: isActive ? '#fff' : '#aaa' }}>
                                    {template.name}
                                </span>
                                {isActive && <Check size={14} color="var(--accent-primary)" />}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#666' }}>{template.author}</span>

                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    background: 'var(--accent-primary)',
                                    borderRadius: '0 0 8px 8px'
                                }} />
                            )}
                        </div>
                    )
                })}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#555', marginTop: 8, fontStyle: 'italic' }}>
                <Info size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Selecting a template will apply its base structure and styles.
            </p>
        </div>
    )
}

export default CardTemplateSelector
