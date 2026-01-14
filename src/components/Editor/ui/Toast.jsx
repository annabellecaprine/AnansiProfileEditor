import React from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useToast } from '../../../context/ToastContext'

const ToastContainer = () => {
    const { toasts, removeToast } = useToast()

    return (
        <div style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            pointerEvents: 'none' // Allow clicks to pass through container
        }}>
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    )
}

const Toast = ({ message, type, onClose }) => {
    const bgColor = {
        success: '#48BB78',
        error: '#F56565',
        info: '#3182CE'
    }[type] || '#3182CE'

    const Icon = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info
    }[type] || Info

    return (
        <div style={{
            background: '#2d2d2d',
            color: 'white',
            padding: '12px 16px',
            borderRadius: 8,
            borderLeft: `4px solid ${bgColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            minWidth: 300,
            maxWidth: 400,
            animation: 'slideIn 0.3s ease-out forwards',
            pointerEvents: 'auto', // Re-enable clicks
            fontSize: '0.9rem'
        }}>
            <Icon size={18} style={{ color: bgColor }} />
            <span style={{ flex: 1 }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#888',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <X size={14} />
            </button>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default ToastContainer
