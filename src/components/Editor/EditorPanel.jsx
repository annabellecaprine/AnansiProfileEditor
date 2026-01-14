import { useState } from 'react'
import { Palette, Code, Layers, User, Layout, Download, Info, RotateCcw } from 'lucide-react'
import { generateCssFromTheme } from '../../utils/CssGenerator'
import './EditorPanel.css'

import VisualEditor from './tabs/VisualEditor'
import LayoutEditor from './tabs/LayoutEditor'
import ContentEditor from './tabs/ContentEditor'
import EntitiesEditor from './tabs/EntitiesEditor'

export default function EditorPanel({ theme, setTheme, content, setContent, manualCSS, setManualCSS, onReset }) {
    const [activeTab, setActiveTab] = useState('visual')
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

                {activeTab === 'layout' && (
                    <LayoutEditor theme={theme} setTheme={setTheme} />
                )}

                {activeTab === 'visual' && (
                    <VisualEditor theme={theme} setTheme={setTheme} />
                )}

                {activeTab === 'content' && (
                    <ContentEditor content={content} setContent={setContent} />
                )}

                {activeTab === 'entities' && (
                    <EntitiesEditor theme={theme} setTheme={setTheme} />
                )}

                {activeTab === 'code' && (
                    <div className="visual-editor">
                        <div className="control-section">
                            <label><Code size={14} /> Custom CSS</label>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 10 }}>
                                Add any custom CSS overrides here. These will be appended to the generated theme.
                            </p>
                            <textarea
                                className="code-input"
                                value={manualCSS}
                                onChange={(e) => setManualCSS(e.target.value)}
                                placeholder=".profile-card { ... }"
                                spellCheck="false"
                            />
                        </div>
                    </div>
                )}

            </div>

            {showAbout && (
                <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>About Anansi Profile Editor</h2>
                        <p>A specialized tool for creating beautiful, customized styling for JanitorAI profiles.</p>
                        <p>Created by <b>Annabelle Caprine</b>.</p>
                        <button className="close-btn" onClick={() => setShowAbout(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}
