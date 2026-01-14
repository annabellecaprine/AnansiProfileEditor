import { useState, useEffect } from 'react'
import { Palette, Code, Layers, User, Layout, Download, Info, RotateCcw } from 'lucide-react'
import { generateCssFromTheme } from '../../utils/CssGenerator'
import Button from './ui/Button'
import ExportModal from './ui/ExportModal'
import './EditorShared.css'
import './EditorPanel.css'

import VisualEditor from './tabs/VisualEditor'
import LayoutEditor from './tabs/LayoutEditor'
import ContentEditor from './tabs/ContentEditor'
import EntitiesEditor from './tabs/EntitiesEditor'

export default function EditorPanel({ theme, setTheme, content, setContent, manualCSS, setManualCSS, onReset }) {
    const [activeTab, setActiveTab] = useState('visual')
    const [showAbout, setShowAbout] = useState(false)
    const [showExport, setShowExport] = useState(false)

    // Keyboard shortcut for Export (Ctrl/Cmd + E)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault()
                setShowExport(true)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleExportClick = () => {
        setShowExport(true)
    }

    return (
        <div className="editor-panel">
            <header className="editor-header">
                <h1>Profile CSS Editor</h1>
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
                    <Button
                        onClick={() => setShowAbout(true)}
                        title="About & Credits"
                        icon={Info}
                        variant="default"
                    />
                    <Button
                        onClick={onReset}
                        title="Reset to Default"
                        icon={RotateCcw}
                        variant="danger"
                    />
                    <Button
                        onClick={handleExportClick}
                        title="Export Code (Ctrl+E)"
                        icon={Download}
                        variant="default"
                        style={{ background: 'var(--accent-primary)', color: 'white' }}
                    >
                        <span className="tab-text">Export</span>
                    </Button>
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

            {/* MODALS */}
            {showExport && (
                <ExportModal
                    isOpen={showExport}
                    onClose={() => setShowExport(false)}
                    cssContent={`${generateCssFromTheme(theme)}\n${manualCSS || ''}`}
                    profileContent={content}
                />
            )}

            {showAbout && (
                <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>About Profile CSS Editor</h2>
                        <p>A specialized tool for creating beautiful, customized styling for JanitorAI profiles.</p>
                        <hr style={{ borderColor: '#4A5568', margin: '16px 0' }} />
                        <p><strong>Created by:</strong> <span style={{ color: '#F687B3' }}>Annabelle Caprine</span></p>
                        <p><strong>Version:</strong> 1.0.1</p>

                        <div style={{ marginTop: 16 }}>
                            <p style={{ fontWeight: 'bold', marginBottom: 4 }}>Special Thanks:</p>
                            <p style={{ fontSize: '0.9em', color: '#A0AEC0', lineHeight: '1.4' }}>
                                <strong style={{ color: theme.accentColor }}>RaeRae</strong>, <strong style={{ color: theme.accentColor }}>Puppy</strong>, <strong style={{ color: theme.accentColor }}>Lav</strong>, <strong style={{ color: theme.accentColor }}>Tiggerdropped</strong>, and the entire JAI CSS Community.
                            </p>
                        </div>

                        <p style={{ marginTop: 12, fontSize: '0.8em', color: '#718096', fontStyle: 'italic' }}>
                            Built with React & Lucide.
                        </p>
                        <button className="close-btn" onClick={() => setShowAbout(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}
