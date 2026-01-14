import React from 'react'
import { Sparkles, Image as ImageIcon } from 'lucide-react'
import ControlSection from '../../ui/ControlSection'
import InputGroup from '../../ui/InputGroup'
import ColorControl from '../../ui/ColorControl'
import Slider from '../../ui/Slider'
import Select from '../../ui/Select'
import ValidatedInput from '../../ui/ValidatedInput'

const ThemeSettings = ({ theme, updateTheme }) => {
    return (
        <>
            {/* COLOR & GLOW */}
            <ControlSection label="Accent & Text" icon={Sparkles}>
                <ColorControl
                    label="Accent Color"
                    color={theme.accentColor}
                    onChange={(c) => updateTheme('accentColor', c)}
                />

                <Select
                    label="Font Family"
                    value={theme.fontFamily || 'Inter'}
                    onChange={(val) => updateTheme('fontFamily', val)}
                    options={[
                        { value: "'Inter', sans-serif", label: "Inter (Default)" },
                        { value: "Arial, sans-serif", label: "Arial / Sans Serif" },
                        { value: "'Times New Roman', Times, serif", label: "Times New Roman / Serif" },
                        { value: "'Courier New', Courier, monospace", label: "Courier New / Monospace" },
                        { value: "'Comic Sans MS', 'Chalkboard SE', sans-serif", label: "Comic Sans (Fun)" },
                        { value: "Georgia, serif", label: "Georgia" },
                        { value: "Verdana, sans-serif", label: "Verdana" }
                    ]}
                />

                <ColorControl
                    label="Text Color"
                    color={theme.textColor || '#FFFFFF'}
                    onChange={(c) => updateTheme('textColor', c)}
                />

                <hr className="divider" />

                <Slider
                    label="Intensity"
                    value={theme.glowIntensity}
                    min={0} max={50}
                    onChange={(val) => updateTheme('glowIntensity', val)}
                />

                <Slider
                    label="Card Roundness"
                    value={theme.borderRadius}
                    min={0} max={30}
                    onChange={(val) => updateTheme('borderRadius', val)}
                />
            </ControlSection>

            <hr className="divider" />

            {/* BACKGROUND */}
            <ControlSection label="Page Background" icon={ImageIcon}>
                <InputGroup label="Image URL">
                    <ValidatedInput
                        className="text-input"
                        type="text"
                        placeholder="https://..."
                        value={theme.bgImage}
                        onChange={(e) => updateTheme('bgImage', e.target.value)}
                    />
                </InputGroup>
            </ControlSection>
        </>
    )
}

export default ThemeSettings
