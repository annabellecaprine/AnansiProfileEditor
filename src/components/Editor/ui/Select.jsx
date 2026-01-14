import React from 'react'
import InputGroup from './InputGroup'

const Select = ({ label, value, options, onChange, style = {} }) => {
    // Normalize options to ensure they are { value, label } objects
    const normalizedOptions = options.map(opt => {
        if (typeof opt === 'string' || typeof opt === 'number') {
            return { value: opt, label: opt };
        }
        return opt;
    });

    return (
        <InputGroup label={label}>
            <select
                className="text-input"
                style={{ width: '100%', ...style }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {normalizedOptions.map((opt, idx) => (
                    opt.group ? (
                        <optgroup key={idx} label={opt.group}>
                            {opt.options.map((sub, sIdx) => (
                                <option key={sIdx} value={sub.value}>{sub.label}</option>
                            ))}
                        </optgroup>
                    ) : (
                        <option key={idx} value={opt.value}>{opt.label}</option>
                    )
                ))}
            </select>
        </InputGroup>
    )
}

export default Select
