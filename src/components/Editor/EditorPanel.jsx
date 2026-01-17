import { useRef, useState, useEffect } from 'react'
import { Palette, Code, Layers, User, Layout, Download, Info, RotateCcw, Upload, Save, FileJson, Undo, Redo } from 'lucide-react'
import { parseProjectFile } from '../../utils/projectManagement'
import { generateCssFromTheme } from '../../utils/CssGenerator'
import { useToast } from '../../context/ToastContext'
import Button from './ui/Button'
import ExportModal from './ui/ExportModal'
import SmartCodeEditor from './tabs/code/SmartCodeEditor'
import './EditorShared.css'
import './EditorPanel.css'

import VisualEditor from './tabs/VisualEditor'
import LayoutEditor from './tabs/LayoutEditor'
import ContentEditor from './tabs/ContentEditor'
import EntitiesEditor from './tabs/EntitiesEditor'

export default function EditorPanel({ theme, setTheme, content, setContent, manualCSS, setManualCSS, onReset, onSaveProject, onLoadProject, onUndo, onRedo, canUndo, canRedo }) {
    const [activeTab, setActiveTab] = useState('visual')
    const [showAbout, setShowAbout] = useState(false)
    const [showExport, setShowExport] = useState(false)
    const fileInputRef = useRef(null)
    const { addToast } = useToast()

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            const data = await parseProjectFile(file)
            onLoadProject(data)
            addToast('Project loaded successfully!', 'success')
        } catch (err) {
            console.error(err)
            addToast(err.message, 'error')
        }

        // Reset input
        e.target.value = ''
    }

    // Keyboard shortcut for Export (Ctrl/Cmd + E) and Undo/Redo
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault()
                setShowExport(true)
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault()
                if (e.shiftKey) {
                    if (canRedo) onRedo()
                } else {
                    if (canUndo) onUndo()
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault()
                if (canRedo) onRedo()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [canUndo, canRedo, onUndo, onRedo])

    const handleExportClick = () => {
        setShowExport(true)
    }

    return (
        <div className="editor-panel">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json"
                onChange={handleFileChange}
            />

            <header className="editor-header">
                <h1>
                    <FileJson size={20} style={{ marginRight: 8, color: 'var(--accent-primary)' }} />
                    Profile Editor
                </h1>
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
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                    <Button
                        onClick={onUndo}
                        icon={Undo}
                        disabled={!canUndo}
                        variant="ghost"
                        title="Undo (Ctrl+Z)"
                        style={{ opacity: canUndo ? 1 : 0.4 }}
                    />
                    <Button
                        onClick={onRedo}
                        icon={Redo}
                        disabled={!canRedo}
                        variant="ghost"
                        title="Redo (Ctrl+Y)"
                        style={{ opacity: canRedo ? 1 : 0.4 }}
                    />
                    <div className="w-divider" style={{ width: 1, background: '#333', margin: '0 4px' }}></div>

                    <Button
                        onClick={() => fileInputRef.current.click()}
                        title="Load Project (JSON)"
                        icon={Upload}
                        variant="secondary"
                    />
                    <Button
                        onClick={onSaveProject}
                        title="Save Project (JSON)"
                        icon={Save}
                        variant="secondary"
                    />
                    <div className="w-divider" style={{ width: 1, background: '#333', margin: '0 4px' }}></div>
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
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ padding: '0 20px', marginBottom: 10 }}>
                            <p style={{ fontSize: '0.85rem', color: '#888' }}>
                                Advanced Editor: Use snippets to insert selectors.
                            </p>
                        </div>
                        <SmartCodeEditor
                            code={manualCSS}
                            onChange={setManualCSS}
                            onSmartImport={(newContent) => setContent(prev => ({ ...prev, ...newContent }))}
                        />
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
