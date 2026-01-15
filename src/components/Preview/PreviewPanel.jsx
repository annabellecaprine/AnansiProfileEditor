import { useState } from 'react'
import { Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react'
import './PreviewPanel.css'

export default function PreviewPanel({ customCSS, content }) {
    const [deviceMode, setDeviceMode] = useState('desktop') // desktop, tablet, mobile

    // Base Janitor variables
    const baseVars = {
        '--chakra-colors-gray-800': '#1A202C',
        '--chakra-colors-whiteAlpha-900': 'rgba(255, 255, 255, 0.92)',
        '--chakra-colors-whiteAlpha-600': 'rgba(255, 255, 255, 0.48)'
    }

    const getContainerStyle = () => {
        switch (deviceMode) {
            case 'mobile':
                return { width: '375px', height: '100%', borderLeft: '1px solid #333', borderRight: '1px solid #333' }
            case 'tablet':
                return { width: '768px', height: '100%', borderLeft: '1px solid #333', borderRight: '1px solid #333' }
            default:
                return { width: '100%', height: '100%' }
        }
    }

    const handleOpenNewWindow = () => {
        const newWindow = window.open('', '_blank')
        if (!newWindow) {
            alert('Please allow popups to open the preview.')
            return
        }

        // Gather clean CSS without app-specific scoping if possible, 
        // but here we just take the customCSS + base styles.
        // We'll also scrape the inner HTML of the preview content.
        const previewContent = document.querySelector('.pp-page-background')?.outerHTML || '<h1>Error loading preview</h1>'

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${content.displayName} - Preview</title>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Playfair+Display:wght@400;700&family=Press+Start+2P&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
                <style>
                    body { margin: 0; background: #0f1115; font-family: 'Inter', sans-serif; }
                    ${baseVars ? ':root { ' + Object.entries(baseVars).map(([k, v]) => `${k}: ${v};`).join(' ') + ' }' : ''}
                    
                    /* Reset some basic styles to match J.AI defaults roughly */
                    * { box-sizing: border-box; }
                    
                    /* Include Custom CSS */
                    ${customCSS}

                    /* Ensure full height */
                    html, body { height: 100%; }
                    
                    /* Helper classes from PreviewPanel.css that might be missing in customCSS */
                    .pp-page-background { width: 100%; min-height: 100vh; background-color: #0f1115; }
                    .profile-page-container-flex-box { display: flex; max-width: 1400px; margin: 0 auto; padding: 30px 20px; gap: 30px; align-items: flex-start; }
                    .profile-uc-follow-flex { flex: 0 0 350px; position: sticky; top: 30px; }
                    .profile-character-search-input-group { flex: 1; border-radius: 12px; }
                    .mock-card { border-radius: 8px; overflow: hidden; position: relative; display: flex; flex-direction: column; background: #1A202C; }
                    .char-img { width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; }
                    .char-info { padding: 16px; background: linear-gradient(to top, #1A202C 80%, rgba(26, 32, 44, 0.6)); margin-top: -40px; position: relative; z-index: 2; }
                    .char-tags { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 8px; }
                    .char-tag { background: #2D3748; color: #A0AEC0; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; }
                    .bio-html { white-space: pre-wrap; word-wrap: break-word; }
                    
                    @media (max-width: 900px) {
                        .profile-page-container-flex-box { flex-direction: column; }
                        .profile-uc-follow-flex { width: 100%; position: static; }
                    }
                </style>
            </head>
            <body>
                ${previewContent}
            </body>
            </html>
        `

        newWindow.document.write(html)
        newWindow.document.close()
    }

    return (
        <div className="preview-panel-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#0f1115' }}>

            {/* Device Toolbar */}
            <div className="device-toolbar" style={{
                height: '40px',
                borderBottom: '1px solid #2d3748',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                background: '#1a202c',
                flexShrink: 0,
                position: 'relative' // For absolute positioning of external link
            }}>
                <button
                    onClick={() => setDeviceMode('mobile')}
                    title="Mobile (375px)"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '4px',
                        color: deviceMode === 'mobile' ? '#3182ce' : '#718096',
                        background: deviceMode === 'mobile' ? '#2c313d' : 'transparent'
                    }}
                >
                    <Smartphone size={20} />
                </button>
                <button
                    onClick={() => setDeviceMode('tablet')}
                    title="Tablet (768px)"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '4px',
                        color: deviceMode === 'tablet' ? '#3182ce' : '#718096',
                        background: deviceMode === 'tablet' ? '#2c313d' : 'transparent'
                    }}
                >
                    <Tablet size={20} />
                </button>
                <button
                    onClick={() => setDeviceMode('desktop')}
                    title="Desktop (Full)"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '4px',
                        color: deviceMode === 'desktop' ? '#3182ce' : '#718096',
                        background: deviceMode === 'desktop' ? '#2c313d' : 'transparent'
                    }}
                >
                    <Monitor size={20} />
                </button>

                {/* Open New Window Button */}
                <button
                    onClick={handleOpenNewWindow}
                    title="Open in New Window"
                    style={{
                        position: 'absolute',
                        right: '12px',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '4px',
                        color: '#718096'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#3182ce'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
                >
                    <ExternalLink size={18} />
                </button>
            </div>

            {/* Preview Viewport Container */}
            <div className="preview-viewport" style={{ flexGrow: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', background: '#000' }}>
                <div className="preview-device-frame" style={{ ...getContainerStyle(), transition: 'width 0.3s ease', overflowY: 'auto', overflowX: 'hidden', background: '#1A202C', position: 'relative' }}>

                    <div className="preview-container" style={{ ...baseVars, minHeight: '100%' }}>
                        {/* Inject Fonts */}
                        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Playfair+Display:wght@400;700&family=Press+Start+2P&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

                        {/* Dynamic Style Injection */}
                        <style>{customCSS}</style>

                        {/* Live Preview Badge */}
                        <div className="preview-badge">
                            <span>Live Preview</span>
                        </div>

                        {/* FULL PAGE WRAPPER (The Background lives here now) */}
                        <div className="pp-page-background profile-page-background css-flhja6">

                            {/* Main Flex Container (Two Columns) */}
                            <div className="profile-page-container-flex-box css-1747r9t">

                                {/* COLUMN 1: Profile Card */}
                                <div className="profile-uc-follow-flex css-1vakbk4">
                                    <div className="chakra-stack css-1aq5geu">

                                        {/* The ACTUAL Card */}
                                        <div className="pp-uc-background profile-uc-background-flex css-1xdsfqv">

                                            <div className="css-10klw3m">
                                                <div className="css-1fd6h3f">
                                                    {/* Avatar */}
                                                    <div className="pp-uc-avatar-container profile-avatar-container css-1vppv5c">
                                                        <img src={content.avatarUrl} alt="Avatar" className="pp-uc-avatar profile-avatar" onError={(e) => e.target.src = 'https://janitorai.com/assets/img/defaults/avatar-2.png'} />
                                                    </div>

                                                    <div className="css-1uodvt1">
                                                        <div className="pp-uc-title profile-title-heading css-17xejub">
                                                            <h2 className="chakra-heading css-1dklj6k">{content.displayName}</h2>
                                                            {content.badgeText && <div className="chakra-badge css-12j7576">{content.badgeText}</div>}
                                                        </div>
                                                        {content.handle && <div className="css-0 text-muted">@{content.handle.replace(/^@/, '')}</div>}
                                                        {content.memberSince && <div className="css-0 text-muted" style={{ fontSize: '0.8rem', marginTop: 4 }}>Member since {content.memberSince}</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pp-uc-about-me profile-about-me css-15h6z3q content-body">
                                                <h3 className="css-1qf1b0y">About Me</h3>
                                                <div className="css-1y59tt6 bio-html" dangerouslySetInnerHTML={{ __html: content.bio }} />

                                                <div className="css-70qvj9 stats-row">
                                                    <div className="stat-box pp-uc-followers-count profile-followers-count">
                                                        <span>Followers</span>
                                                        <strong>{content.followers}</strong>
                                                    </div>
                                                    <div className="stat-box pp-uc-following-count profile-following-count">
                                                        <span>Chat Count</span>
                                                        <strong>{content.chatCount}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* End Actual Card */}
                                    </div>
                                </div>

                                {/* COLUMN 2: Character Grid (Mock Content) */}
                                <div className="profile-character-search-input-group css-1y0e7gb">
                                    <div className="mock-search-bar">
                                        <span>Search characters...</span>
                                    </div>

                                    <h2 className="section-title">Public Characters ({content.characters?.length || 0})</h2>

                                    <div className="pp-cc-list-container css-16g5xvc character-grid">
                                        {(content.characters || []).map((char, i) => (
                                            <div key={i} className="css-1s5evre mock-card">
                                                <div className="profile-character-card-avatar-aspect-ratio css-1q7rmf0">
                                                    <img src={char.image} alt={char.name} className="pp-cc-avatar profile-character-card-avatar-image char-img" />
                                                </div>
                                                <div className="char-info">
                                                    <div className="css-zgqw37 pp-cc-name profile-character-card-name">
                                                        <h4>{char.name}</h4>
                                                    </div>
                                                    <div className="css-1m0lwfp pp-cc-creator text-muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>
                                                        By @user
                                                    </div>
                                                    <div className="char-tags">
                                                        {char.tags.map(tag => <span key={tag} className="char-tag">{tag}</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    )
}
