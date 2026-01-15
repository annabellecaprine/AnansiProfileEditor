import React, { useEffect } from 'react'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', isDangerous = false }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
        }
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.75)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)'
        }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{
                background: '#1e1e1e', padding: '24px', borderRadius: '12px',
                width: '400px', maxWidth: '90%',
                border: '1px solid #333',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)'
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
                    {title}
                </h2>
                <p style={{ color: '#a0aec0', marginBottom: '24px', lineHeight: 1.5 }}>
                    {message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button onClick={onClose} style={{
                        padding: '8px 16px', borderRadius: '6px',
                        background: 'transparent', color: '#cbd5e0',
                        border: '1px solid #4a5568',
                        cursor: 'pointer', fontWeight: 500
                    }}>
                        {cancelText}
                    </button>
                    <button onClick={() => { onConfirm(); onClose() }} style={{
                        padding: '8px 16px', borderRadius: '6px',
                        background: isDangerous ? '#e53e3e' : '#3182ce',
                        color: 'white', border: 'none',
                        cursor: 'pointer', fontWeight: 600,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
