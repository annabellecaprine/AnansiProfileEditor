import React from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import { useUrlValidator } from '../../../hooks/useUrlValidator'

const ValidatedInput = ({ value, onChange, className, style, ...props }) => {
    const { isValid, isChecking, error } = useUrlValidator(value)

    const getBorderColor = () => {
        if (!value) return 'var(--border-color)'
        if (isChecking) return 'var(--border-color)'
        if (isValid === false) return '#E53E3E' // Red
        if (isValid === true) return '#48BB78' // Green
        return 'var(--border-color)'
    }

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <input
                value={value}
                onChange={onChange}
                className={className}
                style={{
                    ...style,
                    borderColor: getBorderColor(),
                    paddingRight: 32, // Make room for icon
                }}
                {...props}
            />
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
                {value && isChecking && <Loader2 className="spin" size={16} color="var(--text-disabled)" />}
                {value && !isChecking && isValid === true && <Check size={16} color="#48BB78" />}
                {value && !isChecking && isValid === false && <X size={16} color="#E53E3E" />}
            </div>
            {/* Inline style for spinner animation since we don't have a global util class for it yet */}
            <style>{`
                .spin { animation: spin 1s linear infinite; } 
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    )
}

export default ValidatedInput
