import React, { useState, useRef, useEffect } from 'react'
import { Copy, Trash2, Code, ChevronDown, Check } from 'lucide-react'
import Button from '../../ui/Button'
import './Highlighting.css'

// Syntax Highlighting Regex
const highlightCSS = (code) => {
    if (!code) return ''

    // Extremely basic tokenizer
    // Order matters! 
    return code
        // Comments
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>')
        // Punctuation
        .replace(/([\{\}\:\;])/g, '<span class="token-punctuation">$1</span>')
        // Selectors (start of line or after }) (approximate)
        // This is tricky in regex. simpler approach: highlight property: value patterns first
        // Properties
        .replace(/([a-zA-Z0-9-]+)(?=:)/g, '<span class="token-property">$1</span>')
        // Values (after : and before ;)
        // .replace(/:(.+?)(;)/g, ': <span class="token-value">$1</span>$2') 
        // We'll leave values plain or try to catch them roughly?
        // Let's rely on the property highlight which is the most visual useful one.
        // Actually, let's catch class selectors
        .replace(/(\.[a-zA-Z0-9-_]+)/g, '<span class="token-selector">$1</span>')
}

// Snippet Library
const SNIPPETS = [
    { label: 'Profile Card', code: '.pp-uc-background {\n    \n}', desc: 'Main container styling' },
    { label: 'Avatar Image', code: '.pp-uc-avatar {\n    \n}', desc: 'Profile picture' },
    { label: 'Display Name', code: 'h2.chakra-heading {\n    color: #ff0055;\n}', desc: 'User name text' },
    { label: 'Bio Text', code: '.bio-html {\n    font-size: 1.1rem;\n}', desc: 'The bio content' },
    { label: 'Character Card', code: '.pp-cc-list-container > * {\n    \n}', desc: 'Individual char cards' },
    { label: 'Card Name', code: '.pp-cc-name {\n    \n}', desc: 'Character name' },
    { label: 'Card Tags', code: '.char-tag {\n    \n}', desc: 'Tags on cards' },
    { label: 'Followers Count', code: '.pp-uc-followers-count {\n    \n}', desc: 'Follower stat box' },
]

export default function SmartCodeEditor({ code, onChange }) {
    const textareaRef = useRef(null)
    const preRef = useRef(null)
    const lineNumbersRef = useRef(null)

    const [showSnippets, setShowSnippets] = useState(false)
    const [copied, setCopied] = useState(false)

    // Sync Scroll
    const handleScroll = (e) => {
        const top = e.target.scrollTop
        if (preRef.current) preRef.current.scrollTop = top
        if (lineNumbersRef.current) lineNumbersRef.current.scrollTop = top
    }

    // Insert Snippet
    const insertSnippet = (snippetCode) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = code
        const before = text.substring(0, start)
        const after = text.substring(end, text.length)

        const newText = before + snippetCode + after
        onChange(newText)
        setShowSnippets(false)

        // Reset focus
        setTimeout(() => {
            textarea.focus()
            // Move cursor inside the block if it ends with }
            if (snippetCode.includes('{\n    \n}')) {
                textarea.setSelectionRange(start + snippetCode.indexOf('\n    ') + 5, start + snippetCode.indexOf('\n    ') + 5)
            }
        }, 50)
    }

    // Handle Tab and Enter key smarts
    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            document.execCommand('insertText', false, '    ')
        }
        if (e.key === 'Enter') {
            // Simple auto-indent matching previous line
            const textarea = textareaRef.current
            const start = textarea.selectionStart
            const currentLine = code.substr(0, start).split('\n').pop()
            const indent = currentLine.match(/^\s*/)
            if (indent && indent[0]) {
                e.preventDefault()
                // If ending a block, indent + extra? No, just keep indentation for now
                // If previous char was {, add indent
                const lastChar = code.substr(start - 1, 1)
                let extraIndent = ''
                if (lastChar === '{') extraIndent = '    '

                document.execCommand('insertText', false, '\n' + indent[0] + extraIndent)
            }
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Generate Line Numbers
    const lineCount = code.split('\n').length
    const linesArray = Array.from({ length: lineCount }, (_, i) => i + 1)

    // Highlight Code
    // We use a simplified rendering here. Since regex html replacement is risky with user input,
    // we should validly escape HTML first if this was user content, but CSS is mostly safe chars.
    // For safety, we can rely on a basic escape.
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // We escape first, then highlight format
    const highlightedCode = highlightCSS(escapeHtml(code))

    return (
        <div className="smart-code-editor">
            <div className="editor-toolbar">
                <div className="editor-toolbar-group">
                    <div className="snippet-dropdown">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setShowSnippets(!showSnippets)}
                            icon={Code}
                            title="Insert Snippet"
                        >
                            Snippets <ChevronDown size={12} style={{ marginLeft: 4 }} />
                        </Button>

                        {showSnippets && (
                            <div className="snippet-menu">
                                {SNIPPETS.map((s, i) => (
                                    <div key={i} className="snippet-item" onClick={() => insertSnippet(s.code)}>
                                        <span style={{ fontWeight: 600 }}>{s.label}</span>
                                        <span className="snippet-desc">{s.desc}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="editor-toolbar-group">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange('')}
                        icon={Trash2}
                        title="Clear Code"
                    />
                    <Button
                        variant={copied ? "success" : "secondary"}
                        size="sm"
                        onClick={handleCopy}
                        icon={copied ? Check : Copy}
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </Button>
                </div>
            </div>

            <div className="editor-container">
                <div className="line-numbers" ref={lineNumbersRef}>
                    {linesArray.map(n => <div key={n}>{n}</div>)}
                </div>

                <pre className="editor-pre" ref={preRef} dangerouslySetInnerHTML={{ __html: highlightedCode + '<br>' }} />

                <textarea
                    className="editor-textarea"
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    placeholder="/* Enter custom CSS here... */" // Placeholder in transparent textarea might be tricky if pre is front? No, textarea is z-index 2.
                />
            </div>
        </div>
    )
}
