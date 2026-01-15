
import { useState, useCallback, useEffect } from 'react'
import './ResizableLayout.css'

export default function ResizableLayout({
    leftPanel,
    rightPanel,
    initialLeftWidth = 450,
    minLeftWidth = 300,
    minRightWidth = 300
}) {
    const [leftWidth, setLeftWidth] = useState(initialLeftWidth)
    const [isDragging, setIsDragging] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    // Load saved width
    useEffect(() => {
        const saved = localStorage.getItem('anansi-layout-width')
        if (saved) setLeftWidth(parseInt(saved, 10))
    }, [])

    const handleMouseDown = useCallback((e) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
        localStorage.setItem('anansi-layout-width', leftWidth)
    }, [leftWidth])

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            // Calculate new width
            const newWidth = e.clientX
            // Enforce constraints
            if (newWidth >= minLeftWidth && newWidth <= (window.innerWidth - minRightWidth)) {
                setLeftWidth(newWidth)
            }
        }
    }, [isDragging, minLeftWidth, minRightWidth])

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = 'col-resize'
            document.body.style.userSelect = 'none' // Prevent text selection
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    // If collapsed, left panel is hidden (or minimized to a bar, but let's hide for now)
    // Actually, UI requirement says "Collapse Sidebar".
    // We can pass `isCollapsed` to parent or handle it here. 
    // For simplicity, if collapsed, grid template is different.

    return (
        <div className="resizable-container">
            <div
                className={`resizable-left ${isCollapsed ? 'collapsed' : ''}`}
                style={{ width: isCollapsed ? 0 : leftWidth }}
            >
                <div className="resizable-content-wrapper">
                    {/* Pass collapse toggler to children if needed, or render a button here */}
                    {leftPanel}
                </div>
            </div>

            <div
                className="resizable-divider"
                onMouseDown={handleMouseDown}
                onDoubleClick={toggleCollapse}
                title="Drag to resize, Double-click to toggle sidebar"
            >
                <div className="divider-handle">
                    <button
                        className="collapse-btn"
                        onMouseDown={(e) => e.stopPropagation()} // Prevent drag start when clicking button
                        onClick={toggleCollapse}
                    >
                        {isCollapsed ? '›' : '‹'}
                    </button>
                </div>
            </div>

            <div className="resizable-right">
                {rightPanel}
            </div>

            {/* Floating Toggle Button (visible when collapsed or in header usually) 
          We'll export logic or put the button inside the EditorPanel.
      */}
        </div>
    )
}
