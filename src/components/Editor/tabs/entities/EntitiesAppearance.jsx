import React from 'react'
import { Layers, WrapText, Columns, EyeOff, Layout } from 'lucide-react'
import ControlSection from '../../ui/ControlSection'
import Slider from '../../ui/Slider'

const EntitiesAppearance = ({ theme, updateEntities }) => {
    return (
        <ControlSection label="Appearance & Layout" icon={Layout}>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16 }}>
                Customize the structure and visibility of card elements.
            </p>

            <Slider
                label="Card Roundness"
                value={theme.entities?.borderRadius ?? 8}
                min={0}
                max={20}
                onChange={(val) => updateEntities('borderRadius', val)}
                unit="px"
            />

            <Slider
                label="Card Height"
                value={theme.entities?.cardHeight || 400}
                min={200}
                max={800}
                step={10}
                onChange={(val) => updateEntities('cardHeight', val)}
                unit="px"
            />

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="chk-hideCreator"
                    checked={theme.entities?.hideCreator || false}
                    onChange={(e) => updateEntities('hideCreator', e.target.checked)}
                />
                <label htmlFor="chk-hideCreator" style={{ margin: 0, fontWeight: 400 }}>Hide Creator Name</label>
            </div>

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="chk-hideEvents"
                    checked={theme.entities?.hideEvents || false}
                    onChange={(e) => updateEntities('hideEvents', e.target.checked)}
                />
                <label htmlFor="chk-hideEvents" style={{ margin: 0, fontWeight: 400 }}>Hide Event Icons</label>
            </div>

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                    type="checkbox"
                    id="chk-cardFade"
                    checked={theme.entities?.cardFade || false}
                    onChange={(e) => updateEntities('cardFade', e.target.checked)}
                />
                <label htmlFor="chk-cardFade" style={{ margin: 0, fontWeight: 400 }}>Fade Image Bottom</label>
            </div>

            {(theme.entities?.templateId !== 'music-show') && (
                <>
                    <hr className="divider" />

                    <div className="control-section" style={{ padding: 0, border: 'none' }}>
                        <label style={{ marginBottom: 8 }}>
                            {theme.entities?.layoutMode === 'flex' ? <WrapText size={14} /> : <Columns size={14} />}
                            Grid Configuration
                        </label>
                        <div className="button-group" style={{ marginBottom: 16 }}>
                            <button
                                className={theme.entities?.layoutMode !== 'flex' ? 'active' : ''}
                                onClick={() => updateEntities('layoutMode', 'grid')}
                            >Grid (Strict)</button>
                            <button
                                className={theme.entities?.layoutMode === 'flex' ? 'active' : ''}
                                onClick={() => updateEntities('layoutMode', 'flex')}
                            >Flex (Responsive)</button>
                        </div>

                        {theme.entities?.layoutMode === 'flex' ? (
                            <>
                                <Slider
                                    label="Card Width"
                                    value={theme.entities?.cardWidth || 300}
                                    min={100}
                                    max={500}
                                    step={10}
                                    onChange={(val) => updateEntities('cardWidth', val)}
                                    unit="px"
                                />
                                <div className="control-row">
                                    <span>Gap (px)</span>
                                    <input
                                        type="number" className="mini-input" style={{ width: 60 }}
                                        value={theme.entities?.gap !== undefined ? theme.entities.gap : 16}
                                        onChange={(e) => updateEntities('gap', parseInt(e.target.value))}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <Slider
                                    label="Columns"
                                    value={theme.entities?.gridColumns || 3}
                                    min={1}
                                    max={6}
                                    step={1}
                                    onChange={(val) => updateEntities('gridColumns', val)}
                                />
                                <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#888' }}>
                                    Controls how many cards appear per row.
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </ControlSection>
    )
}

export default EntitiesAppearance
