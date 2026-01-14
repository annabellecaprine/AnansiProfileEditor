import React from 'react'
import { Palette, Layers } from 'lucide-react'
import ControlSection from '../../ui/ControlSection'
import InputGroup from '../../ui/InputGroup'
import ColorControl from '../../ui/ColorControl'
import Slider from '../../ui/Slider'
import Select from '../../ui/Select'

const CardAppearance = ({ theme, updateTheme }) => {
    return (
        <>
            {/* CARD BACKGROUND */}
            <ControlSection label="Card Background" icon={Palette}>
                {/* Transparency Toggle */}
                <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <input
                        type="checkbox"
                        id="chk-transparent"
                        checked={theme.transparentCard || false}
                        onChange={(e) => updateTheme('transparentCard', e.target.checked)}
                    />
                    <label htmlFor="chk-transparent" style={{ margin: 0, fontWeight: 400 }}>Transparent Card</label>
                </div>

                <ColorControl
                    label="Color"
                    color={theme.cardBgColor || '#1A202C'}
                    onChange={(c) => updateTheme('cardBgColor', c)}
                />

                <Slider
                    label="Opacity"
                    value={theme.bgOpacity}
                    min={0} max={1} step={0.05}
                    disabled={theme.transparentCard}
                    onChange={(val) => updateTheme('bgOpacity', val)}
                />

                <Select
                    label="Gradient Overlay"
                    value={theme.cardGradient || ''}
                    onChange={(val) => updateTheme('cardGradient', val)}
                    options={[
                        { value: "", label: "None" },
                        { value: "linear-gradient(45deg, rgba(255,0,0,0.1), rgba(0,0,255,0.1))", label: "Subtle Red-Blue" },
                        { value: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))", label: "Fade to Black" },
                        { value: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)", label: "Glass Shine" },
                        { value: "repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 10px, transparent 10px, transparent 20px)", label: "Stripes" },
                        { value: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", label: "Spotlight" },
                        { value: "conic-gradient(from 0deg at 50% 50%, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1), rgba(255,0,0,0.1))", label: "Rainbow Spin" }
                    ]}
                />

                <Slider
                    label="Blur (Backdrop)"
                    value={theme.blur}
                    min={0} max={20}
                    onChange={(val) => updateTheme('blur', val)}
                />
            </ControlSection>

            <hr className="divider" />

            {/* SHADOWS & DEPTH */}
            <ControlSection label="Shadows & Depth" icon={Layers}>
                <Select
                    label="Text Shadow (Neon)"
                    value={theme.textShadow || ''}
                    onChange={(val) => updateTheme('textShadow', val)}
                    options={[
                        { value: "", label: "None" },
                        { value: `0 0 5px ${theme.accentColor}, 0 0 10px ${theme.accentColor}`, label: "Neon Glow (Accent)" },
                        { value: "1px 1px 2px rgba(0,0,0,0.8)", label: "Hard Drop Shadow" },
                        { value: "0 0 8px rgba(255,255,255,0.6)", label: "Soft White Halo" }
                    ]}
                />

                <Select
                    label="Box Shadow"
                    value={theme.boxShadow || ''}
                    onChange={(val) => updateTheme('boxShadow', val)}
                    options={[
                        { value: "", label: "Default (Glow)" },
                        { value: "0 10px 30px rgba(0,0,0,0.5)", label: "Deep Drop Shadow" },
                        { value: "0 20px 50px rgba(0,0,0,0.8)", label: "Abyssal Depth" },
                        { value: "0 0 0 1px rgba(255,255,255,0.2)", label: "Thine Outline" },
                        { value: "none", label: "Flat (No Shadow)" }
                    ]}
                />

                <Select
                    label="Card Animation"
                    value={theme.animation || ''}
                    onChange={(val) => updateTheme('animation', val)}
                    options={[
                        { value: "", label: "None" },
                        { value: "float", label: "Float (Hovering)" },
                        { value: "pulse", label: "Pulse (Glow)" },
                        { value: "shake", label: "Shake (Subtle)" }
                    ]}
                />

                <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                    <input
                        type="checkbox"
                        id="chk-bellShake"
                        checked={theme.bellShake || false}
                        onChange={(e) => updateTheme('bellShake', e.target.checked)}
                    />
                    <label htmlFor="chk-bellShake" style={{ margin: 0, fontWeight: 400, fontSize: '0.85rem' }}>Shake Notification Bell</label>
                </div>
            </ControlSection>
        </>
    )
}

export default CardAppearance
