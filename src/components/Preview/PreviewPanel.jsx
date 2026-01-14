import './PreviewPanel.css'

export default function PreviewPanel({ customCSS, content }) {
    // Base Janitor variables
    const baseVars = {
        '--chakra-colors-gray-800': '#1A202C',
        '--chakra-colors-whiteAlpha-900': 'rgba(255, 255, 255, 0.92)',
        '--chakra-colors-whiteAlpha-600': 'rgba(255, 255, 255, 0.48)'
    }

    return (
        <div className="preview-container" style={baseVars}>
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
    )
}
