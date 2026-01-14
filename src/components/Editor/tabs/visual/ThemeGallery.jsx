import React from 'react'
import { Check } from 'lucide-react'
import { AvailableThemes } from '../../../../themes'
import { useToast } from '../../../../context/ToastContext'

const ThemeGallery = ({ currentTheme, onApplyTheme }) => {
    const { addToast } = useToast()
    const [selectedId, setSelectedId] = React.useState(null)

    const handleApply = (themeDef) => {
        // Create a fresh copy to avoid reference issues
        onApplyTheme({ ...themeDef })
        addToast(`Applied ${themeDef.name} theme!`, 'success')
        setSelectedId(null)
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {AvailableThemes.map(theme => {
                const isActive = currentTheme.id === theme.id
                const isSelected = selectedId === theme.id

                return (
                    <div
                        key={theme.id}
                        onClick={() => setSelectedId(theme.id)}
                        style={{
                            background: 'var(--bg-secondary)',
                            border: `2px solid ${isSelected ? 'var(--accent-primary)' : (isActive ? 'rgba(255,255,255,0.2)' : 'transparent')}`,
                            borderRadius: 'var(--radius-md)',
                            padding: 12,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            transform: isSelected ? 'translateY(-2px)' : 'none',
                            boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                        }}
                        className="theme-card"
                    >
                        {/* Preview Swatches */}
                        <div style={{ display: 'flex', marginBottom: 12, gap: 8 }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: theme.cardBgColor,
                                border: '1px solid var(--border-color)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }} />
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: theme.accentColor,
                                border: '1px solid var(--border-color)',
                                marginLeft: -12,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }} />
                        </div>

                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>
                            {theme.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                            by {theme.author}
                        </div>

                        {/* Active Badge (Currently Applied) */}
                        {isActive && !isSelected && (
                            <div style={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '50%',
                                padding: 4,
                                display: 'flex'
                            }}>
                                <Check size={12} color="var(--text-muted)" />
                            </div>
                        )}

                        {/* Apply Overlay (When Selected) */}
                        {isSelected && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.7)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: 'fadeIn 0.2s ease'
                            }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleApply(theme)
                                    }}
                                    style={{
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 4,
                                        padding: '8px 16px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                        )}

                        <style>{`
                            .theme-card:hover {
                                transform: translateY(-2px);
                                border-color: var(--text-muted);
                                box-shadow: var(--shadow-md);
                            }
                            @keyframes fadeIn {
                                from { opacity: 0; }
                                to { opacity: 1; }
                            }
                        `}</style>
                    </div>
                )
            })}
        </div>
    )
}

export default ThemeGallery
