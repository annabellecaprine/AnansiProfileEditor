import React from 'react'
import ThemeSettings from './visual/ThemeSettings'
import CardAppearance from './visual/CardAppearance'

const VisualEditor = ({ theme, setTheme }) => {
    const updateTheme = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="visual-editor">
            <ThemeSettings theme={theme} updateTheme={updateTheme} />
            <hr className="divider" />
            <CardAppearance theme={theme} updateTheme={updateTheme} />
        </div>
    )
}

export default VisualEditor
