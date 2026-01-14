import React from 'react'
import InputGroup from './InputGroup'

const Slider = ({ label, value, min, max, step = 1, onChange, unit = '', disabled = false }) => {
    return (
        <div className="control-row">
            <span>{label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    style={{ flex: 1 }}
                />
                <span style={{ minWidth: 24, textAlign: 'right', fontSize: '0.85rem', color: '#888' }}>
                    {value}{unit}
                </span>
            </div>
        </div>
    )
}

export default Slider
