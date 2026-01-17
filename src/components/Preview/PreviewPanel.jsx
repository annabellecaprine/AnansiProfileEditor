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

                        {/* FULL PAGE WRAPPER */}
                        <div id="root">
                            <div className="_wrapper_13xo6_1" style={{ background: '#313338', minHeight: '100%' }}>
                                <header className="_header_1lgb1_1 profile-top-bar-flex-outer pp-top-bar-outer" style={{ paddingTop: 0 }}>
                                    <div className="_bar_1lgb1_26 pp-top-bar profile-top-bar pp-top-bar-inner">
                                        <div className="_left_1lgb1_45 profile-top-box-flex-inner pp-top-bar-left">
                                            <div className="_logoContainer_1lgb1_7 profile-top-bar-logo-box">
                                                <div className="pp-top-bar-logo profile-top-bar-logo glow-logo">
                                                    <h2 className="chakra-heading pp-top-bar-logo-name profile-top-bar-logo-name">janitor</h2>
                                                    <p className="chakra-text pp-top-bar-logo-sub-name profile-top-bar-logo-sub-name">beta</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pp-top-bar-center">
                                            <div className="_searchInputContainer_1lgb1_19 profile-top-bar-search-wrapper">
                                                <div className="_container_fgb7n_1 profile-top-bar-search-box pp-top-bar-search-box">
                                                    <div className="_form_1d69i_129 pp-top-bar-search-form">
                                                        <div className="_inputGroup_1d69i_1 profile-top-bar-search-input-group pp-top-bar-search-input-group">
                                                            <div className="_inputContainer_1d69i_26 pp-top-bar-search profile-top-bar-search search-input pp-top-bar-search-input">
                                                                <input id="search-input" placeholder="Search characters..." disabled style={{ background: 'transparent', border: 'none', width: '100%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pp-top-bar-right _right_1lgb1_53">
                                            <div className="_container_1bfxv_1">
                                                <div className="_createButton_1bfxv_14 pp-top-bar-create-char profile-top-bar-create-char glow-on-hover">Create a Character</div>
                                            </div>
                                        </div>
                                    </div>
                                </header>

                                <main className="_main_ckjfh_1 _customPadding_ckjfh_16 _main_qqqm3_1" style={{ '--padding-base': '1rem' }}>
                                    <div className="chakra-stack profile-page-container css-14l6kwv">
                                        <div className="pp-page-background profile-page-background css-7d9brm"></div>
                                        <div className="profile-page-flex css-1wfbrwg">

                                            {/* COLUMN 1: Profile Box */}
                                            <div className="pp-uc-background profile-uc-background-flex css-1xdsfqv css-vqimyu">
                                                {/* Background Decorative Layers */}
                                                <div className="profile-background-box-1 css-0"></div>
                                                <div className="profile-background-box-2 css-1a4u722"></div>
                                                <div className="profile-background-box-3 css-1wpvjoq"></div>

                                                <div className="profile-info-wrapper-box css-15vqpxh">
                                                    <div className="chakra-stack profile-info-stack css-8g8ihq">
                                                        <div className="chakra-stack profile-info-hstack css-1uodvt1">
                                                            {/* Avatar */}
                                                            <div className="pp-uc-avatar-container profile-avatar-container css-79elbk">
                                                                <img alt="Avatar" src={content.avatarUrl} className="pp-uc-avatar profile-avatar css-18bnokj" onError={(e) => e.target.src = 'https://janitorai.com/assets/img/defaults/avatar-2.png'} />
                                                            </div>

                                                            <div className="chakra-stack profile-info-stack-inner css-8g8ihq">
                                                                <div className="profile-info-stack-inner-flex css-70qvj9">
                                                                    <h2 className="chakra-heading pp-uc-title profile-title-heading css-o5an2m">
                                                                        {content.displayName}
                                                                        {content.badgeText && <span className="chakra-badge css-12j7576" style={{ marginLeft: '8px' }}>{content.badgeText}</span>}
                                                                    </h2>
                                                                </div>
                                                                {content.handle && <div className="pp-uc-followers-count profile-followers-count css-1ciz3n">@{content.handle.replace(/^@/, '')}</div>}
                                                                <div className="pp-uc-followers-count profile-followers-count css-1ciz3n">
                                                                    <span>{content.followers} </span><span>followers</span>
                                                                </div>
                                                                <div className="pp-uc-member-since profile-member-since-box css-wjj1lc">Member Since {content.memberSince}</div>

                                                                <div className="profile-uc-follow-flex css-1vakbk4">
                                                                    <div className="pp-uc-follow-button profile-uc-follow-button Btn">
                                                                        <span>Follow</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* About Me Section */}
                                                        <div className="pp-uc-about-me profile-about-me css-p5wazl content-body">
                                                            <div className="bio-html" dangerouslySetInnerHTML={{ __html: content.bio }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* COLUMN 2: Character Grid (Tabs and Panels) */}
                                            <div className="profile-page-container-flex-box css-1747r9t" style={{ padding: 0, width: '100%', maxWidth: 'none', margin: 0 }}>
                                                <div className="chakra-tabs profile-tabs-chakra-tabs css-1bx5ylf" id="profile-tabs">
                                                    <div className="chakra-tabs__tablist pp-tabs-wrapper profile-tabs-wrapper css-i3ef4m" role="tablist">
                                                        <button className="chakra-tabs__tab pp-tabs-button profile-tabs-button css-1jj3srb" type="button" aria-selected="true" data-selected>
                                                            Characters
                                                        </button>
                                                        <div className="chakra-tabs__tab-indicator pp-tabs-indicator profile-tabs-indicator css-1y3jyt3" style={{ position: 'absolute', left: 0, width: '100px', height: '2px', bottom: 0, background: '#3182ce' }}></div>
                                                    </div>

                                                    <div className="chakra-tabs__tab-panels pp-tabs-panels profile-tabs-panels css-1eee8fp">
                                                        <div className="chakra-tabs__tab-panel profile-tab-panel css-1cfoi85">
                                                            <div className="css-2n7zf2">
                                                                <div className="characters-list-container-flex css-1qft3au" style={{ display: 'flex', flexDirection: 'column' }}>

                                                                    {/* Filters/Stats */}
                                                                    <div className="character-list-pagination-flex css-m8ywhg">
                                                                        <div className="character-list-pagination-box css-dh2zqo">
                                                                            <div className="_outer_5a6y6_48 profile-pagination-flex-outer pp-pg-total profile-badge-flex-outer Btn2-purple">
                                                                                <div className="profile-badge-flex-inner css-wd8hou">
                                                                                    <strong className="pp-pg-total-count profile-badge-total-count">{content.characters?.length || 0}</strong>
                                                                                    <p className="chakra-text pp-pg-total-text profile-badge-total-text">characters</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="profile-filters-flex-outer css-1cdqd3a">
                                                                            <div className="profile-filters-flex-inner css-sxixz4">
                                                                                <div className="profile-character-search-input-group pp-fl-search-input profile-character-search-input">
                                                                                    <input className="chakra-input" placeholder="Search for characters..." disabled style={{ background: 'transparent', border: 'none' }} />
                                                                                </div>
                                                                                <div className="profile-filter-button pp-fl-filter-button">Filter</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Grid */}
                                                                    <div className="pp-cc-list-container css-16g5xvc" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                                                                        {(content.characters || []).map((char, i) => (
                                                                            <div key={i} className="pp-cc-wrapper profile-character-card-wrapper css-13wmn96" style={{ position: 'relative' }}>
                                                                                {/* Card Gradients */}
                                                                                <div className="pp-cc-gradient-1 css-0" style={{ position: 'absolute', inset: -1, borderRadius: '8px', zIndex: 0 }}></div>
                                                                                <div className="pp-cc-gradient-2 css-dltla"></div>
                                                                                <div className="pp-cc-gradient-3 css-1jf56se"></div>

                                                                                <div className="chakra-stack profile-character-card-stack css-1s5evre" style={{ position: 'relative', zIndex: 1 }}>
                                                                                    <div className="profile-character-card-stack-link-component">
                                                                                        <div className="profile-character-card-avatar-aspect-ratio css-1q7rmf0">
                                                                                            <img src={char.image} alt={char.name} className="pp-cc-avatar profile-character-card-avatar-image" />
                                                                                        </div>
                                                                                        <div className="profile-character-card-stack-link-component-box css-nlxhw4">
                                                                                            <div className="pp-cc-name profile-character-card-name-box">
                                                                                                <h4 style={{ margin: 0 }}>{char.name}</h4>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="profile-character-card-stats-box css-10cv7r2">
                                                                                            <div className="pp-cc-ribbon profile-character-card-ribbon css-1ket5wn">
                                                                                                <div className="pp-cc-ribbon-wrap profile-character-card-ribbon-wrap css-wexxj8">
                                                                                                    <div className="pp-cc-chats profile-character-card-chats-hstack css-euh5x6">
                                                                                                        <span className="pp-cc-chats-count profile-character-card-chats-count">1.2k</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="profile-character-card-description-box css-199gcrh">
                                                                                        <div className="pp-cc-description profile-character-card-description-markdown-container">
                                                                                            <p>Bot description goes here...</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="pp-cc-star-line profile-character-card-star-line css-1lgnt2x">
                                                                                        <img src="https://janitorai.com/assets/img/defaults/star-card.svg" className="pp-cc-star profile-character-card-star" alt="star" />
                                                                                    </div>

                                                                                    <div className="pp-cc-tags profile-character-card-tags css-4ofde4">
                                                                                        <div className="pp-cc-tags-wrap profile-character-card-tags-wrap">
                                                                                            <span className="pp-cc-tags-item pp-tag-limitless">Limitless</span>
                                                                                        </div>
                                                                                        {char.tags.map(tag => (
                                                                                            <div key={tag} className="pp-cc-tags-wrap pp-cc-tags-wrap-regular">
                                                                                                <span className="pp-cc-tags-item pp-cc-tags-regular">#{tag}</span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>

                                                                                    <div className="profile-character-card-box css-1c9wmts">
                                                                                        <p className="pp-cc-tokens-count profile-character-card-tokens-count">800 tokens</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>

                                <footer className="_footer_b4zg4_1" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
                                    <p>© 2026 JanitorAI - Preview Mock</p>
                                </footer>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    )
}
