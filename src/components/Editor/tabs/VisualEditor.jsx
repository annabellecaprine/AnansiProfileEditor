import React from 'react'
import { Sparkles, Layout, Palette } from 'lucide-react'
import ThemeSettings from './visual/ThemeSettings'
import CardAppearance from './visual/CardAppearance'
import ThemeGallery from './visual/ThemeGallery'
import Accordion from '../ui/Accordion'

const VisualEditor = ({ theme, setTheme }) => {
    const updateTheme = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }))
    }

    const handleApplyTheme = (newTheme) => {
        setTheme(newTheme)
    }

    return (
        <div className="visual-editor">
            <Accordion title="Theme Library" icon={Palette} defaultOpen={true}>
                <ThemeGallery currentTheme={theme} onApplyTheme={handleApplyTheme} />
            </Accordion>

            <Accordion title="Global Theme & Background" icon={Sparkles} defaultOpen={false}>
                <ThemeSettings theme={theme} updateTheme={updateTheme} />
            </Accordion>

            <Accordion title="Card Appearance" icon={Layout} defaultOpen={false}>
                <CardAppearance theme={theme} updateTheme={updateTheme} />
            </Accordion>
        </div>
    )
}

export default VisualEditor
