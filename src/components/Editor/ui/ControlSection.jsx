import React from 'react'

const ControlSection = ({ label, icon: Icon, children }) => {
    return (
        <div className="control-section">
            {label && (
                <label>
                    {Icon && <Icon size={14} />} {label}
                </label>
            )}
            {children}
        </div>
    )
}

export default ControlSection
