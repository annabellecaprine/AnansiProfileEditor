import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Palette, Code, Layers, Type, Image as ImageIcon, Eye, Sparkles, FileText, User, Layout, Move, Maximize, Download, Info, X, ArrowRightLeft, ArrowDownUp, Columns, WrapText } from 'lucide-react'
import RichTextToolbar from './RichTextToolbar'
import { generateCssFromTheme } from '../../utils/CssGenerator'
import './EditorPanel.css'

import { RotateCcw } from 'lucide-react'

// --- Helpers ---
const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '';
}

const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Reusable Color Component to handle bidirectional Hex/RGB sync
const ColorControl = ({ label, color, onChange }) => {
    const rgbString = hexToRgb(color || '#000000');

    const handleRgbChange = (e) => {
        const val = e.target.value; // Expecting "R, G, B" or "R G B"
        const parts = val.split(/[ ,]+/).map(p => parseInt(p)).filter(n => !isNaN(n));
        if (parts.length === 3) {
            const [r, g, b] = parts;
            if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                onChange(rgbToHex(r, g, b));
            }
        }
    }

    return (
        <div style={{ marginBottom: 16 }}>
            {label && <label className="sub-label">{label}</label>}
            <div className="picker-wrapper">
                <HexColorPicker color={color || '#000000'} onChange={onChange} />
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 10, color: '#888', display: 'block', marginBottom: 2 }}>HEX</span>
                        <input
                            type="text"
                            className="text-input"
                            style={{ width: '100%', fontFamily: 'monospace', textAlign: 'center' }}
                            value={color}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 10, color: '#888', display: 'block', marginBottom: 2 }}>RGB</span>
                        <input
                            type="text"
                            className="text-input"
                            style={{ width: '100%', fontFamily: 'monospace', textAlign: 'center' }}
                            placeholder="R, G, B"
                            defaultValue={rgbString}
                            key={color} // Force re-render on color change to update defaultValue safely
                            onBlur={handleRgbChange} // Update only on blur to allow typing
                            onKeyDown={(e) => e.key === 'Enter' && handleRgbChange(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function EditorPanel({ theme, setTheme, content, setContent, manualCSS, setManualCSS, onReset }) {
    const [activeTab, setActiveTab] = useState('visual')
    const [selectedElement, setSelectedElement] = useState('header') // For Layout Tab
    const [copyFeedback, setCopyFeedback] = useState(false)
    const [showAbout, setShowAbout] = useState(false)

    const handleExport = () => {
        const generated = generateCssFromTheme(theme)
        const cssBlock = `<style>\n${generated}\n${manualCSS || ''}\n</style>`
        const fullExport = `${cssBlock}\n\n${content.bio || ''}`

        navigator.clipboard.writeText(fullExport).then(() => {
            setCopyFeedback(true)
            setTimeout(() => setCopyFeedback(false), 2000)
        })
    }

    const updateTheme = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }))
    }

    // Helper to deep update layout props
    const updateLayout = (element, prop, value) => {
        setTheme(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                [element]: {
                    ...prev.layout?.[element],
                    [prop]: value
                }
            }
        }))
    }

    // Get current layout props for selected element, safely
    const getLayout = (element) => theme.layout?.[element] || {}

    const updateContent = (key, value) => {
        setContent(prev => ({ ...prev, [key]: value }))
    }

    const updateEntities = (key, value) => {
        setTheme(prev => ({
            ...prev,
            entities: {
                ...prev.entities,
                [key]: value
            }
        }))
    }

    return (
        <div className="editor-panel">
            <header className="editor-header">
                <h1>Anansi Editor</h1>
                <div className="tabs">
                    <button className={activeTab === 'visual' ? 'active' : ''} onClick={() => setActiveTab('visual')}>
                        <Palette size={16} /> <span className="tab-text">Style</span>
                    </button>
                    <button className={activeTab === 'layout' ? 'active' : ''} onClick={() => setActiveTab('layout')}>
                        <Layout size={16} /> <span className="tab-text">Layout</span>
                    </button>
                    <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
                        <User size={16} /> <span className="tab-text">Content</span>
                    </button>
                    <button className={activeTab === 'entities' ? 'active' : ''} onClick={() => setActiveTab('entities')}>
                        <Layers size={16} /> <span className="tab-text">Entities</span>
                    </button>
                    <button className={activeTab === 'code' ? 'active' : ''} onClick={() => setActiveTab('code')}>
                        <Code size={16} /> <span className="tab-text">Code</span>
                    </button>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                    <button
                        onClick={() => setShowAbout(true)}
                        title="About & Credits"
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#4A5568', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                    >
                        <Info size={16} />
                    </button>
                    <button
                        onClick={onReset}
                        title="Reset to Default"
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button className={`export-btn ${copyFeedback ? 'success' : ''}`} onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: copyFeedback ? '#48BB78' : '#3182CE', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                        {copyFeedback ? <span style={{ fontSize: 14 }}>Copied!</span> : <><Download size={16} /> <span className="tab-text">Export</span></>}
                    </button>
                </div>
            </header>

            <div className="editor-content">

                {/* === LAYOUT EDITOR === */}
                {activeTab === 'layout' && (
                    <div className="visual-editor">
                        {/* PAGE STRUCTURE */}
                        <div className="control-section">
                            <label><Layout size={14} /> Page Structure</label>
                            <div className="button-group">
                                <button
                                    className={(!theme.pageLayout || theme.pageLayout === 'row') ? 'active' : ''}
                                    onClick={() => updateTheme('pageLayout', 'row')}
                                    title="Standard (Bio Left, Cards Right)"
                                >
                                    <ArrowRightLeft size={14} /> Row
                                </button>
                                <button
                                    className={theme.pageLayout === 'row-reverse' ? 'active' : ''}
                                    onClick={() => updateTheme('pageLayout', 'row-reverse')}
                                    title="Reverse (Cards Left, Bio Right)"
                                >
                                    <ArrowRightLeft size={14} style={{ transform: 'scaleX(-1)' }} /> Rev
                                </button>
                                <button
                                    className={theme.pageLayout === 'column' ? 'active' : ''}
                                    onClick={() => updateTheme('pageLayout', 'column')}
                                    title="Column (Bio Top, Cards Bottom)"
                                >
                                    <ArrowDownUp size={14} /> Col
                                </button>
                            </div>
                        </div>

                        <hr className="divider" />

                        <div className="control-section">
                            <label><Move size={14} /> Select Element to Edit</label>
                            <select
                                className="select-input"
                                value={selectedElement}
                                onChange={(e) => setSelectedElement(e.target.value)}
                            >
                                <option value="header">Header Container (Avatar + Name)</option>
                                <option value="avatar">Avatar Image</option>
                                <option value="info">Name & Username Box</option>
                                <option value="bio">Bio Section</option>
                                <option value="stats">Stats Row</option>
                            </select>
                        </div>

                        {/* DYNAMIC CONTROLS BASED ON SELECTION */}

                        {/* 1. FLEXBOX CONTROLS (Only for Containers) */}
                        {['header', 'stats'].includes(selectedElement) && (
                            <div className="control-section">
                                <label>Orientation & Alignment</label>
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
                            </div>
                        )}

                        {/* 2. SIZING CONTROLS */}
                        <div className="control-section">
                            <label><Maximize size={14} /> Sizing</label>
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
                        </div>

                        {/* 3. MARGIN/SPACING */}
                        <div className="control-section">
                            <label>Spacing (Margins)</label>
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
                        </div>

                    </div>
                )}

                {/* === VISUAL EDITOR (Existing) === */}
                {activeTab === 'visual' && (
                    <div className="visual-editor">

                        {/* COLOR & GLOW */}
                        <div className="control-section">
                            <label><Sparkles size={14} /> Accent & Text</label>

                            <ColorControl
                                label="Accent Color"
                                color={theme.accentColor}
                                onChange={(c) => updateTheme('accentColor', c)}
                            />

                            <label className="sub-label">Font Family</label>
                            <select
                                className="text-input"
                                style={{ width: '100%', marginBottom: 16 }}
                                value={theme.fontFamily || 'Inter'}
                                onChange={(e) => updateTheme('fontFamily', e.target.value)}
                            >
                                <option value="'Inter', sans-serif">Inter (Default)</option>
                                <option value="Arial, sans-serif">Arial / Sans Serif</option>
                                <option value="'Times New Roman', Times, serif">Times New Roman / Serif</option>
                                <option value="'Courier New', Courier, monospace">Courier New / Monospace</option>
                                <option value="'Comic Sans MS', 'Chalkboard SE', sans-serif">Comic Sans (Fun)</option>
                                <option value="Georgia, serif">Georgia</option>
                                <option value="Verdana, sans-serif">Verdana</option>
                            </select>

                            <ColorControl
                                label="Text Color"
                                color={theme.textColor || '#FFFFFF'}
                                onChange={(c) => updateTheme('textColor', c)}
                            />

                            <hr className="divider" />


                            <div className="control-row">
                                <span>Intensity</span>
                                <input
                                    type="range" min="0" max="50"
                                    value={theme.glowIntensity}
                                    onChange={(e) => updateTheme('glowIntensity', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="control-row">
                                <span>Card Roundness</span>
                                <input
                                    type="range" min="0" max="30"
                                    value={theme.borderRadius}
                                    onChange={(e) => updateTheme('borderRadius', parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <hr className="divider" />

                        {/* BACKGROUND */}
                        <div className="control-section">
                            <label><ImageIcon size={14} /> Page Background</label>
                            <input
                                className="text-input"
                                type="text"
                                placeholder="Image URL (https://...)"
                                value={theme.bgImage}
                                onChange={(e) => updateTheme('bgImage', e.target.value)}
                            />
                        </div>

                        <hr className="divider" />

                        {/* CARD BACKGROUND */}
                        <div className="control-section">
                            <label><Palette size={14} /> Card Background</label>

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

                            <div className="control-row">
                                <span>Opacity</span>
                                <input
                                    type="range" min="0" max="1" step="0.05"
                                    value={theme.bgOpacity}
                                    disabled={theme.transparentCard}
                                    onChange={(e) => updateTheme('bgOpacity', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Gradient Overlay</label>
                                <select
                                    className="text-input"
                                    value={theme.cardGradient || ''}
                                    onChange={(e) => updateTheme('cardGradient', e.target.value)}
                                >
                                    <option value="">None</option>
                                    <option value="linear-gradient(45deg, rgba(255,0,0,0.1), rgba(0,0,255,0.1))">Subtle Red-Blue</option>
                                    <option value="linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))">Fade to Black</option>
                                    <option value="linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)">Glass Shine</option>
                                    <option value="repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 10px, transparent 10px, transparent 20px)">Stripes</option>
                                    <option value="radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)">Spotlight</option>
                                    <option value="conic-gradient(from 0deg at 50% 50%, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1), rgba(255,0,0,0.1))">Rainbow Spin</option>
                                </select>
                            </div>

                            <div className="control-row">
                                <span>Blur (Backdrop)</span>
                                <input
                                    type="range" min="0" max="20"
                                    value={theme.blur}
                                    onChange={(e) => updateTheme('blur', parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <hr className="divider" />

                        {/* SHADOWS & DEPTH */}
                        <div className="control-section">
                            <label><Layers size={14} /> Shadows & Depth</label>

                            <div className="input-group">
                                <label className="sub-label">Text Shadow (Neon)</label>
                                <select
                                    className="text-input"
                                    value={theme.textShadow || ''}
                                    onChange={(e) => updateTheme('textShadow', e.target.value)}
                                >
                                    <option value="">None</option>
                                    <option value={`0 0 5px ${theme.accentColor}, 0 0 10px ${theme.accentColor}`}>Neon Glow (Accent)</option>
                                    <option value="1px 1px 2px rgba(0,0,0,0.8)">Hard Drop Shadow</option>
                                    <option value="0 0 8px rgba(255,255,255,0.6)">Soft White Halo</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Box Shadow</label>
                                <select
                                    className="text-input"
                                    value={theme.boxShadow || ''}
                                    onChange={(e) => updateTheme('boxShadow', e.target.value)}
                                >
                                    <option value="">Default (Glow)</option>
                                    <option value="0 10px 30px rgba(0,0,0,0.5)">Deep Drop Shadow</option>
                                    <option value="0 20px 50px rgba(0,0,0,0.8)">Abyssal Depth</option>
                                    <option value="0 0 0 1px rgba(255,255,255,0.2)">Thine Outline</option>
                                    <option value="none">Flat (No Shadow)</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Card Animation</label>
                                <select
                                    className="text-input"
                                    value={theme.animation || ''}
                                    onChange={(e) => updateTheme('animation', e.target.value)}
                                >
                                    <option value="">None</option>
                                    <option value="float">Float (Hovering)</option>
                                    <option value="pulse">Pulse (Glow)</option>
                                    <option value="shake">Shake (Subtle)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* === CONTENT EDITOR (Existing) === */}
                {activeTab === 'content' && (
                    <div className="visual-editor">
                        <div className="control-section">
                            <label><FileText size={14} /> Profile Details</label>

                            <div className="input-group">
                                <label className="sub-label">Display Name</label>
                                <input
                                    className="text-input"
                                    value={content.displayName}
                                    onChange={(e) => updateContent('displayName', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Handle (@...)</label>
                                <input
                                    className="text-input"
                                    value={content.handle}
                                    onChange={(e) => updateContent('handle', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Member Since</label>
                                <input
                                    className="text-input"
                                    value={content.memberSince}
                                    onChange={(e) => updateContent('memberSince', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Badge Text</label>
                                <input
                                    className="text-input"
                                    value={content.badgeText}
                                    onChange={(e) => updateContent('badgeText', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="sub-label">Avatar URL</label>
                                <input
                                    className="text-input"
                                    value={content.avatarUrl}
                                    onChange={(e) => updateContent('avatarUrl', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="control-section">
                            <label><Type size={14} /> Bio</label>

                            <RichTextToolbar onInsert={(prefix, suffix) => {
                                const textarea = document.getElementById('bio-textarea');
                                if (!textarea) return;
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const text = content.bio;
                                const before = text.substring(0, start);
                                const selection = text.substring(start, end);
                                const after = text.substring(end);
                                const newText = before + prefix + selection + suffix + after;
                                setContent(prev => ({ ...prev, bio: newText }));
                            }} />

                            <textarea
                                id="bio-textarea"
                                className="text-area-input"
                                rows="8"
                                value={content.bio}
                                onChange={(e) => updateContent('bio', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* === ENTITIES EDITOR (Character Cards) === */}
                {activeTab === 'entities' && (
                    <div className="visual-editor">
                        <div className="control-section">
                            <label><Layers size={14} /> Character Cards</label>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16 }}>
                                Customize how the character grid bots appear.
                            </p>

                            <div className="control-row">
                                <span>Card Roundness (px)</span>
                                <input
                                    type="range" min="0" max="20"
                                    value={theme.entities?.borderRadius || 8}
                                    onChange={(e) => updateEntities('borderRadius', parseInt(e.target.value))}
                                />
                            </div>

                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <input
                                    type="checkbox"
                                    id="chk-grayscale"
                                    checked={theme.entities?.grayscale || false}
                                    onChange={(e) => updateEntities('grayscale', e.target.checked)}
                                />
                                <label htmlFor="chk-grayscale" style={{ margin: 0, fontWeight: 400 }}>Grayscale (Color on Hover)</label>
                            </div>

                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <input
                                    type="checkbox"
                                    id="chk-sheen"
                                    checked={theme.entities?.sheen || false}
                                    onChange={(e) => updateEntities('sheen', e.target.checked)}
                                />
                                <label htmlFor="chk-sheen" style={{ margin: 0, fontWeight: 400 }}>Sheen Name Animation</label>
                            </div>

                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <input
                                    type="checkbox"
                                    id="chk-hideCreator"
                                    checked={theme.entities?.hideCreator || false}
                                    onChange={(e) => updateEntities('hideCreator', e.target.checked)}
                                />
                                <label htmlFor="chk-hideCreator" style={{ margin: 0, fontWeight: 400 }}>Hide Creator Name</label>
                            </div>

                            <hr className="divider" />

                            <hr className="divider" />

                            <div className="control-section">
                                <label style={{ marginBottom: 8 }}>
                                    {theme.entities?.layoutMode === 'flex' ? <WrapText size={14} /> : <Columns size={14} />}
                                    Layout Mode
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
                                        <div className="control-row">
                                            <span>Card Width (px)</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <input
                                                    type="range" min="100" max="500" step="10"
                                                    style={{ flex: 1 }}
                                                    value={theme.entities?.cardWidth || 300}
                                                    onChange={(e) => updateEntities('cardWidth', parseInt(e.target.value))}
                                                />
                                                <span style={{ minWidth: 30, textAlign: 'right' }}>{theme.entities?.cardWidth || 300}</span>
                                            </div>
                                        </div>
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
                                    <div className="control-row">
                                        <span>Grid Columns (Force Layout)</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <input
                                                type="range" min="1" max="6" step="1"
                                                style={{ flex: 1 }}
                                                value={theme.entities?.gridColumns || 3}
                                                onChange={(e) => updateEntities('gridColumns', parseInt(e.target.value))}
                                            />
                                            <span style={{ minWidth: 20 }}>{theme.entities?.gridColumns || 3}</span>
                                        </div>
                                    </div>
                                )}
                                {theme.entities?.layoutMode !== 'flex' && (
                                    <p style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>
                                        Forces the character grid to use this many columns on desktop, overriding J.AI defaults.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* CODE EDITOR */}
                {activeTab === 'code' && (
                    <div className="code-editor">
                        <div className="code-info">
                            <p>Use this area for custom CSS overrides.</p>
                        </div>
                        <textarea
                            value={manualCSS}
                            onChange={(e) => setManualCSS(e.target.value)}
                            placeholder="/* .css-1xdsfqv { ... } */"
                            spellCheck="false"
                        />
                    </div>
                )}
            </div>

            {/* === ABOUT MODAL === */}
            {showAbout && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#1A202C', width: 400, padding: 24, borderRadius: 12,
                        border: '1px solid #4A5568', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        position: 'relative', textAlign: 'left'
                    }}>
                        <button
                            onClick={() => setShowAbout(false)}
                            style={{
                                position: 'absolute', top: 12, right: 12, background: 'none',
                                border: 'none', color: '#A0AEC0', cursor: 'pointer'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <h2 style={{ marginTop: 0, marginBottom: 8, color: theme.accentColor }}>Anansi Editor</h2>
                        <p style={{ color: '#A0AEC0', fontSize: '0.9rem', marginBottom: 20 }}>
                            A powerful visual editor for styling JanitorAI Style profiles.
                        </p>

                        <h3 style={{ fontSize: '1rem', color: '#E2E8F0', marginBottom: 8 }}>Special Thanks</h3>
                        <p style={{ color: '#CBD5E0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            This product would not be possible if not for these awesome folks:<br />
                            <strong style={{ color: theme.accentColor }}>RaeRae</strong>, <strong style={{ color: theme.accentColor }}>Puppy</strong>, <strong style={{ color: theme.accentColor }}>Lav</strong>,<br />
                            and the entire <strong>JAI CSS Community</strong>.
                        </p>

                        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #2D3748', textAlign: 'center' }}>
                            <button
                                onClick={() => setShowAbout(false)}
                                style={{
                                    background: theme.accentColor, color: '#000', border: 'none',
                                    padding: '8px 24px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
