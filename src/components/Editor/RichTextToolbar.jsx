import { Bold, Italic, Link, Type, List, Columns } from 'lucide-react'
import './EditorPanel.css'

export default function RichTextToolbar({ onInsert }) {
    return (
        <div className="rich-text-toolbar">
            <button onClick={() => onInsert('<b>', '</b>')} title="Bold">
                <Bold size={14} />
            </button>
            <button onClick={() => onInsert('<i>', '</i>')} title="Italic">
                <Italic size={14} />
            </button>
            <button onClick={() => onInsert('<span style="color: #ff0055">', '</span>')} title="Color">
                <Type size={14} />
            </button>
            <button onClick={() => onInsert('<a href="#">', '</a>')} title="Link">
                <Link size={14} />
            </button>
            <div style={{ width: 1, height: 16, background: '#444', margin: '0 4px' }} />
            <button onClick={() => onInsert(`
<details>
<summary>Click to Expand</summary>
<div class="details-content">
`, `
</div>
</details>`)} title="Accordion">
                <List size={14} />
            </button>
            <button onClick={() => onInsert(`
<div class="pp-snippet-container">
<div class="pp-snippet-column">
Left Content
</div>
<div class="pp-snippet-column">
`, `
Right Content
</div>
</div>`)} title="2 Columns">
                <Columns size={14} />
            </button>
            <span className="toolbar-label">HTML Format</span>
        </div>
    )
}
