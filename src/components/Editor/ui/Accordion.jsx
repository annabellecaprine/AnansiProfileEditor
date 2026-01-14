import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

const Accordion = ({ title, icon: Icon, children, defaultOpen = false, className = '' }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className={`accordion-section ${className}`} style={{
            marginBottom: 16,
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: 'var(--bg-secondary)'
        }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bg-secondary)',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: isOpen ? '1px solid var(--border-color)' : 'none',
                    transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {Icon && <Icon size={16} style={{ color: 'var(--accent-primary)' }} />}
                    <span>{title}</span>
                </div>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isOpen && (
                <div className="accordion-content" style={{ padding: 16, background: 'var(--bg-primary)' }}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default Accordion
