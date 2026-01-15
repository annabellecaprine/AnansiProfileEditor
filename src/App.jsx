import { useState, useEffect } from 'react'
import EditorPanel from './components/Editor/EditorPanel'
import PreviewPanel from './components/Preview/PreviewPanel'
import { generateCssFromTheme } from './utils/CssGenerator'
import { DefaultTheme } from './themes'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/Editor/ui/Toast'
import ErrorBoundary from './components/Editor/ui/ErrorBoundary'
import ResizableLayout from './components/Layout/ResizableLayout'
import ConfirmationModal from './components/Editor/ui/ConfirmationModal'
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
    { name: 'Eldritch Horror', tags: ['Horror', 'Monster'], image: 'https://picsum.photos/seed/6/300/400' },
    { name: 'Vampire Lord', tags: ['Supernatural', 'Romance'], image: 'https://picsum.photos/seed/7/300/400' },
    { name: 'Space Marine', tags: ['Sci-Fi', 'War'], image: 'https://picsum.photos/seed/8/300/400' },
    { name: 'High School Bully', tags: ['Drama', 'Enemies to Lovers'], image: 'https://picsum.photos/seed/9/300/400' },
    { name: 'Lost Android', tags: ['Sci-Fi', 'Angst'], image: 'https://picsum.photos/seed/10/300/400' },
    { name: 'Demon King', tags: ['Fantasy', 'Villain'], image: 'https://picsum.photos/seed/11/300/400' },
    { name: 'Friendly Neighbor', tags: ['Slice of Life', 'Wholesome'], image: 'https://picsum.photos/seed/12/300/400' }
  ]
}

function App() {
  // Load initial state from localStorage or use defaults
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('anansi-theme')
    return saved ? JSON.parse(saved) : DefaultTheme
  })
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('anansi-content')
    return saved ? JSON.parse(saved) : defaultContent
  })
  const [manualCSS, setManualCSS] = useState(() => {
    return localStorage.getItem('anansi-css') || ''
  })

  // Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem('anansi-theme', JSON.stringify(theme))
      localStorage.setItem('anansi-content', JSON.stringify(content))
      localStorage.setItem('anansi-css', manualCSS)
    } catch (e) {
      console.error("Failed to save to localStorage:", e)
      // Check for quota exceeded specific error logic if needed, but a log is sufficient for now
      // Ideally show a toast, but we are outside the provider context here conveniently
    }
  }, [theme, content, manualCSS])

  const triggerReset = () => setIsResetModalOpen(true)

  const performReset = () => {
    localStorage.removeItem('anansi-theme')
    localStorage.removeItem('anansi-content')
    localStorage.removeItem('anansi-css')
    setTheme(DefaultTheme)
    setContent(defaultContent)
    setManualCSS('')
  }

  // Combine generated CSS with manual overrides
  const combinedCSS = `${generateCssFromTheme(theme)}\n${manualCSS}`

  return (
    <ToastProvider>
      <ResizableLayout
        leftPanel={
          <ErrorBoundary onReset={() => window.location.reload()}>
            <EditorPanel
              theme={theme}
              setTheme={setTheme}
              content={content}
              setContent={setContent}
              manualCSS={manualCSS}
              setManualCSS={setManualCSS}
              onReset={triggerReset}
            />
          </ErrorBoundary>
        }
        rightPanel={
          <ErrorBoundary>
            <PreviewPanel
              customCSS={combinedCSS}
              content={content}
            />
          </ErrorBoundary>
        }
      />

      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={performReset}
        title="Reset Editor?"
        message="This will wipe all current changes, including your Custom CSS and Content adjustments. This action cannot be undone."
        confirmText="Yes, Reset"
        isDangerous={true}
      />

      <ToastContainer />
    </ToastProvider>
  )
}

export default App
