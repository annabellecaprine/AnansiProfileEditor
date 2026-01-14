import React, { useRef } from 'react'
import { X, Copy, Download, FileJson } from 'lucide-react'
import { useToast } from '../../../context/ToastContext'

const ExportModal = ({ isOpen, onClose, cssContent, profileContent }) => {
    const { addToast } = useToast()
    const contentRef = useRef(null)

    if (!isOpen) return null

    const handleCopy = () => {
        const fullExport = `<style>\n${cssContent}\n</style>\n\n${profileContent.bio || ''}`
        navigator.clipboard.writeText(fullExport).then(() => {
            addToast('Code copied to clipboard!', 'success')
            onClose()
        })
    }

    const handleDownload = () => {
        const element = document.createElement('a')
        const file = new Blob([cssContent], { type: 'text/css' })
        element.href = URL.createObjectURL(file)
        element.download = 'anansi-theme.css'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        addToast('CSS file downloaded!', 'success')
    }

    const handleDownloadJson = () => {
        const element = document.createElement('a')
        const data = {
            theme: JSON.parse(localStorage.getItem('anansi-theme') || '{}'),
            content: profileContent
        }
        const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        element.href = URL.createObjectURL(file)
        element.download = 'anansi-profile.json'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        addToast('Profile backup downloaded!', 'success')
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: 600, maxWidth: '95vw' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0 }}>Export Profile</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <div className="control-section">
                    <label>Generated CSS Preview</label>
                    <textarea
                        readOnly
                        value={cssContent}
                        className="code-input"
                        style={{ height: 300, fontSize: '0.8rem', marginBottom: 20 }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button
                        onClick={handleCopy}
                        className="active"
                        style={{
                            padding: '12px',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}
                    >
                        <Copy size={18} /> Copy Full Code (CSS + Bio)
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <button
                            onClick={handleDownload}
                            style={{
                                padding: '10px',
                                background: '#2d2d2d',
                                color: '#ccc',
                                border: '1px solid #444',
                                borderRadius: 6,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            <Download size={16} /> Download .css
                        </button>
                        <button
                            onClick={handleDownloadJson}
                            style={{
                                padding: '10px',
                                background: '#2d2d2d',
                                color: '#ccc',
                                border: '1px solid #444',
                                borderRadius: 6,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            <FileJson size={16} /> Download Backup
                        </button>
                    </div>
                </div>

                <p style={{ marginTop: 16, fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
                    Paste the copied code directly into your JanitorAI profile "About Me" section.
                </p>
            </div>
        </div>
    )
}

export default ExportModal
