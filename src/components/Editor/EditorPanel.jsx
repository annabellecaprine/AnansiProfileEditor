import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Palette, Code, Layers, Type, Image as ImageIcon, Eye, Sparkles, FileText, User, Layout, Move, Maximize, Download } from 'lucide-react'
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
                            <label><Sparkles size={14} /> Accent & Text</label>

                            <ColorControl
                                label="Accent Color"
                                color={theme.accentColor}
                                onChange={(c) => updateTheme('accentColor', c)}
                            />

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
                                    onChange={(e) => updateTheme('bgOpacity', parseFloat(e.target.value))}
                                />
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
                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>
                                    Forces the character grid to use this many columns on desktop, overriding J.AI defaults.
                                </p>
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
        </div>
    )
}
