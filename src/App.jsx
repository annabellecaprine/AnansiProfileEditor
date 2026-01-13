import { useState, useEffect } from 'react'
import EditorPanel from './components/Editor/EditorPanel'
import PreviewPanel from './components/Preview/PreviewPanel'
import { generateCssFromTheme, defaultTheme } from './utils/CssGenerator'
import './App.css'

// Default mock content
const defaultContent = {
  displayName: 'Annabelle Caprine',
  handle: 'annabelle_caprine',
  memberSince: 'January 2024',
  badgeText: 'Verified Bot',
  avatarUrl: 'https://janitorai.com/assets/img/defaults/avatar-2.png',
  bio: '<b>Welcome to my profile!</b><br>I create detailed roleplay bots.<br><br><i>"Creativity is intelligence having fun."</i>',
  followers: '1.2k',
  chatCount: '58.4k',
  // Mock Characters for the Grid
  characters: [
    { name: 'Kaelthas the Sun King', tags: ['Fantasy', 'Magic'], image: 'https://picsum.photos/seed/1/300/400' },
    { name: 'Cyberpunk Netrunner', tags: ['Sci-Fi', 'Hacking'], image: 'https://picsum.photos/seed/2/300/400' },
    { name: 'Coffee Shop AU', tags: ['Slice of Life', 'Fluff'], image: 'https://picsum.photos/seed/3/300/400' },
    { name: 'Mafia Boss', tags: ['Dead Dove', 'Drama'], image: 'https://picsum.photos/seed/4/300/400' },
    { name: 'Study Buddy', tags: ['Wholesome', 'School'], image: 'https://picsum.photos/seed/5/300/400' },
    { name: 'Eldritch Horror', tags: ['Horror', 'Monster'], image: 'https://picsum.photos/seed/6/300/400' }
  ]
}

function App() {
  // Load initial state from localStorage or use defaults
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('anansi-theme')
    return saved ? JSON.parse(saved) : defaultTheme
  })
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('anansi-content')
    return saved ? JSON.parse(saved) : defaultContent
  })
  const [manualCSS, setManualCSS] = useState(() => {
    return localStorage.getItem('anansi-css') || ''
  })

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('anansi-theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    localStorage.setItem('anansi-content', JSON.stringify(content))
  }, [content])

  useEffect(() => {
    localStorage.setItem('anansi-css', manualCSS)
  }, [manualCSS])

  const handleReset = () => {
    if (confirm('Are you sure? This will reset the editor to default values.')) {
      localStorage.removeItem('anansi-theme')
      localStorage.removeItem('anansi-content')
      localStorage.removeItem('anansi-css')
      setTheme(defaultTheme)
      setContent(defaultContent)
      setManualCSS('')
    }
  }

  // Combine generated CSS with manual overrides
  const combinedCSS = `${generateCssFromTheme(theme)}\n${manualCSS}`

  return (
    <div className="app-container">
      <EditorPanel
        theme={theme}
        setTheme={setTheme}
        content={content}
        setContent={setContent}
        manualCSS={manualCSS}
        setManualCSS={setManualCSS}
        onReset={handleReset}
      />
      <PreviewPanel
        customCSS={combinedCSS}
        content={content}
      />
    </div>
  )
}

export default App
