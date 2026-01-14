import React from 'react'

const InputGroup = ({ label, children, className = '', style = {} }) => {
    return (
        <div className={`input-group ${className}`} style={style}>
            {label && <label className="sub-label">{label}</label>}
            {children}
        </div>
    )
}

export default InputGroup
