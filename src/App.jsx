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
import { downloadProjectAsJson, parseProjectFile } from './utils/projectManagement'
import useHistory from './hooks/useHistory'
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
  // Initialize History State
  const [appState, setAppState, undo, redo, canUndo, canRedo, setProject] = useHistory(() => {
    const savedTheme = localStorage.getItem('anansi-theme')
    const savedContent = localStorage.getItem('anansi-content')
    const savedCSS = localStorage.getItem('anansi-css')
    return {
      theme: savedTheme ? JSON.parse(savedTheme) : DefaultTheme,
      content: savedContent ? JSON.parse(savedContent) : defaultContent,
      manualCSS: savedCSS || ''
    }
  })

  // Destructure for ease of use
  const { theme, content, manualCSS } = appState

  // Helper Setters to maintain prop compatibility
  const setTheme = (val) => setAppState(prev => ({ ...prev, theme: typeof val === 'function' ? val(prev.theme) : val }))
  const setContent = (val) => setAppState(prev => ({ ...prev, content: typeof val === 'function' ? val(prev.content) : val }))
  const setManualCSS = (val) => setAppState(prev => ({ ...prev, manualCSS: typeof val === 'function' ? val(prev.manualCSS) : val }))

  // Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem('anansi-theme', JSON.stringify(appState.theme))
      localStorage.setItem('anansi-content', JSON.stringify(appState.content))
      localStorage.setItem('anansi-css', appState.manualCSS)
    } catch (e) {
      console.error("Failed to save to localStorage:", e)
    }
  }, [appState])

  const triggerReset = () => setIsResetModalOpen(true)

  const performReset = () => {
    localStorage.removeItem('anansi-theme')
    localStorage.removeItem('anansi-content')
    localStorage.removeItem('anansi-css')
    // Reset via History to allow Undo!
    setAppState(prev => ({
      theme: DefaultTheme,
      content: defaultContent,
      manualCSS: ''
    }))
  }

  const handleLoadProject = (projectData) => {
    setProject({
      theme: projectData.theme || DefaultTheme,
      content: projectData.content || defaultContent,
      manualCSS: projectData.manualCSS || ''
    })
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
              onSaveProject={() => downloadProjectAsJson(theme, content, manualCSS)}
              onLoadProject={handleLoadProject}
              onUndo={undo}
              onRedo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
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
