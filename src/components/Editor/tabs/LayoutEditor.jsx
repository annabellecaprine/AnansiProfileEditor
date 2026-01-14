import React, { useState } from 'react'
import { Layout, ArrowRightLeft, ArrowDownUp, Move } from 'lucide-react'
import ControlSection from '../ui/ControlSection'
import ElementStyler from './layout/ElementStyler'

const LayoutEditor = ({ theme, setTheme }) => {
    const [selectedElement, setSelectedElement] = useState('header') // For Layout Tab

    const updateTheme = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }))
    }

    // Helper to deep update layout props
    const updateLayout = (element, prop, value) => {
        setTheme(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                [element]: {
                    ...prev.layout?.[element],
                    [prop]: value
                }
            }
        }))
    }

    // Get current layout props for selected element, safely
    const getLayout = (element) => theme.layout?.[element] || {}

    return (
        <div className="visual-editor">
            {/* PAGE STRUCTURE */}
            <ControlSection label="Page Structure" icon={Layout}>
                <div className="button-group">
                    <button
                        className={(!theme.pageLayout || theme.pageLayout === 'row') ? 'active' : ''}
                        onClick={() => updateTheme('pageLayout', 'row')}
                        title="Standard (Bio Left, Cards Right)"
                    >
                        <ArrowRightLeft size={14} /> Row
                    </button>
                    <button
                        className={theme.pageLayout === 'row-reverse' ? 'active' : ''}
                        onClick={() => updateTheme('pageLayout', 'row-reverse')}
                        title="Reverse (Cards Left, Bio Right)"
                    >
                        <ArrowRightLeft size={14} style={{ transform: 'scaleX(-1)' }} /> Rev
                    </button>
                    <button
                        className={theme.pageLayout === 'column' ? 'active' : ''}
                        onClick={() => updateTheme('pageLayout', 'column')}
                        title="Column (Bio Top, Cards Bottom)"
                    >
                        <ArrowDownUp size={14} /> Col
                    </button>
                </div>
                <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                    <input
                        type="checkbox"
                        id="chk-centerInfo"
                        checked={theme.centerInfo || false}
                        onChange={(e) => updateTheme('centerInfo', e.target.checked)}
                    />
                    <label htmlFor="chk-centerInfo" style={{ margin: 0, fontWeight: 400, fontSize: '0.85rem' }}>Center Profile Info</label>
                </div>
            </ControlSection>

            <hr className="divider" />

            <ControlSection label="Select Element to Edit" icon={Move}>
                <select
                    className="select-input"
                    value={selectedElement}
                    onChange={(e) => setSelectedElement(e.target.value)}
                >
                    <option value="header">Header Container (Avatar + Name)</option>
                    <option value="avatar">Avatar Image</option>
                    <option value="info">Name & Username Box</option>
                    <option value="bio">Bio Section</option>
                    <option value="stats">Stats Row</option>
                </select>
            </ControlSection>

            {/* DYNAMIC CONTROLS BASED ON SELECTION */}
            <ElementStyler
                selectedElement={selectedElement}
                getLayout={getLayout}
                updateLayout={updateLayout}
            />

        </div>
    )
}

export default LayoutEditor
