import React from 'react'

const Button = ({
    children,
    onClick,
    active = false,
    variant = 'default', // default, danger, success, ghost
    icon: Icon,
    title,
    style = {}
}) => {
    // Basic variant styles mapping
    const variantStyles = {
        default: { background: active ? '#3182CE' : '#2D3748', color: 'white' },
        danger: { background: '#e53e3e', color: 'white' },
        success: { background: '#48BB78', color: 'white' },
        ghost: { background: 'transparent', color: active ? '#3182CE' : '#CBD5E0', border: '1px solid currentColor' },
    };

    const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontWeight: 600,
        ...variantStyles[variant],
        ...style
    };

    if (active && variant === 'default') {
        baseStyle.background = '#3182CE';
    }

    return (
        <button
            className={active ? 'active' : ''}
            onClick={onClick}
            title={title}
            style={baseStyle}
        >
            {Icon && <Icon size={16} />}
            {children}
        </button>
    )
}

export default Button
