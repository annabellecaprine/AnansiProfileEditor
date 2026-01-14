import React from 'react'
import { Maximize, Info } from 'lucide-react'
import ControlSection from '../../ui/ControlSection'

const ElementStyler = ({ selectedElement, getLayout, updateLayout }) => {
    return (
        <>
            {/* 1. FLEXBOX CONTROLS (Only for Containers) */}
            {['header', 'stats'].includes(selectedElement) && (
                <ControlSection label="Orientation & Alignment">
                    <div className="button-group">
                        <button
                            className={getLayout(selectedElement).flexDirection !== 'column' ? 'active' : ''}
                            onClick={() => updateLayout(selectedElement, 'flexDirection', 'row')}
                        >Row ➡</button>
                        <button
                            className={getLayout(selectedElement).flexDirection === 'column' ? 'active' : ''}
                            onClick={() => updateLayout(selectedElement, 'flexDirection', 'column')}
                        >Col ⬇</button>
                    </div>
                    <div className="control-row" style={{ marginTop: 10 }}>
                        <span>Align Items</span>
                        <select
                            className="mini-select"
                            value={getLayout(selectedElement).alignItems || 'center'}
                            onChange={(e) => updateLayout(selectedElement, 'alignItems', e.target.value)}
                        >
                            <option value="flex-start">Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">End</option>
                        </select>
                    </div>
                    <div className="control-row">
                        <span>Justify Content</span>
                        <select
                            className="mini-select"
                            value={getLayout(selectedElement).justifyContent || 'flex-start'}
                            onChange={(e) => updateLayout(selectedElement, 'justifyContent', e.target.value)}
                        >
                            <option value="flex-start">Start</option>
                            <option value="center">Center</option>
                            <option value="space-between">Space Between</option>
                        </select>
                    </div>
                    <div className="control-row">
                        <span>Gap (px)</span>
                        <input
                            type="number" className="mini-input"
                            value={getLayout(selectedElement).gap || 0}
                            onChange={(e) => updateLayout(selectedElement, 'gap', parseInt(e.target.value))}
                        />
                    </div>
                </ControlSection>
            )}

            {/* 2. SIZING CONTROLS */}
            <ControlSection label="Sizing" icon={Maximize}>
                {selectedElement === 'avatar' && (
                    <>
                        <div className="control-row">
                            <span>Size (px)</span>
                            <input
                                type="range" min="20" max="300"
                                value={getLayout(selectedElement).width || 80}
                                onChange={(e) => {
                                    updateLayout(selectedElement, 'width', parseInt(e.target.value))
                                    updateLayout(selectedElement, 'height', parseInt(e.target.value))
                                }}
                            />
                        </div>
                        <div className="control-row">
                            <span>Roundness (%)</span>
                            <input
                                type="range" min="0" max="50"
                                value={getLayout(selectedElement).borderRadius || 50}
                                onChange={(e) => updateLayout(selectedElement, 'borderRadius', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="input-group">
                            <label className="sub-label">Shape Mask</label>
                            <select
                                className="text-input"
                                value={getLayout(selectedElement).clipPath || ''}
                                onChange={(e) => updateLayout(selectedElement, 'clipPath', e.target.value)}
                            >
                                <option value="">None (Default)</option>
                                <optgroup label="Geometric (Polygon)">
                                    <option value="polygon(50% 0%, 0% 100%, 100% 100%)">Triangle</option>
                                    <option value="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)">Diamond</option>
                                    <option value="polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)">Hexagon</option>
                                    <option value="polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)">Cross</option>
                                    <option value="polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)">Octagon</option>
                                </optgroup>
                                <optgroup label="Curved (SVG Mask)">
                                    <option value="url('data:image/svg+xml;utf8,<svg viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z%22/></svg>')">Star</option>
                                    <option value="url('data:image/svg+xml;utf8,<svg viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z%22/></svg>')">Shield</option>
                                    <option value="url('data:image/svg+xml;utf8,<svg viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z%22/></svg>')">Heart</option>
                                    <option value="url('data:image/svg+xml;utf8,<svg viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z%22/></svg>')">Cloud</option>
                                    <option value="circle(50% at 50% 50%)">Circle (Default)</option>
                                </optgroup>
                            </select>
                            {getLayout(selectedElement).clipPath?.includes('url') && (
                                <div style={{ marginTop: 8, padding: 8, background: '#4a151b', borderRadius: 4, border: '1px solid #751a23' }}>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#feb2b2', display: 'flex', gap: 6 }}>
                                        <Info size={12} style={{ flexShrink: 0, marginTop: 2 }} />
                                        <span>
                                            <b>Warning:</b> SVG Masks use <code>url()</code> which J.AI may strip.
                                            If this fails to load on the live site, try Geometric shapes instead.
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="control-row">
                            <span>Pos X (%)</span>
                            <input
                                type="range" min="0" max="100"
                                value={getLayout(selectedElement).objectPositionX !== undefined ? getLayout(selectedElement).objectPositionX : 50}
                                onChange={(e) => updateLayout(selectedElement, 'objectPositionX', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="control-row">
                            <span>Pos Y (%)</span>
                            <input
                                type="range" min="0" max="100"
                                value={getLayout(selectedElement).objectPositionY !== undefined ? getLayout(selectedElement).objectPositionY : 50}
                                onChange={(e) => updateLayout(selectedElement, 'objectPositionY', parseInt(e.target.value))}
                            />
                        </div>
                    </>
                )}
                {selectedElement !== 'avatar' && (
                    <div className="control-row">
                        <span>Width</span>
                        <input
                            type="text" className="mini-input"
                            placeholder="auto"
                            value={getLayout(selectedElement).width || ''}
                            onChange={(e) => updateLayout(selectedElement, 'width', e.target.value)}
                        />
                        <select
                            className="mini-select" style={{ width: 60 }}
                            value={getLayout(selectedElement).widthUnit || 'px'}
                            onChange={(e) => updateLayout(selectedElement, 'widthUnit', e.target.value)}
                        >
                            <option value="px">px</option>
                            <option value="%">%</option>
                        </select>
                    </div>
                )}
            </ControlSection>

            {/* 3. MARGIN/SPACING */}
            <ControlSection label="Spacing (Margins)">
                <div className="grid-2-col">
                    <div className="input-group">
                        <label className="sub-label">Top (px)</label>
                        <input type="number" className="text-input"
                            value={getLayout(selectedElement).marginTop || 0}
                            onChange={(e) => updateLayout(selectedElement, 'marginTop', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="input-group">
                        <label className="sub-label">Bottom (px)</label>
                        <input type="number" className="text-input"
                            value={getLayout(selectedElement).marginBottom || 0}
                            onChange={(e) => updateLayout(selectedElement, 'marginBottom', parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="control-row">
                    <span>Text Align</span>
                    <select
                        className="mini-select"
                        value={getLayout(selectedElement).textAlign || 'left'}
                        onChange={(e) => updateLayout(selectedElement, 'textAlign', e.target.value)}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </ControlSection>
        </>
    )
}

export default ElementStyler
