import React from 'react'
import { FileText, Type } from 'lucide-react'
import ControlSection from '../ui/ControlSection'
import InputGroup from '../ui/InputGroup'
import ValidatedInput from '../ui/ValidatedInput'
import RichTextToolbar from '../RichTextToolbar'

const ContentEditor = ({ content, setContent }) => {

    const updateContent = (key, value) => {
        setContent(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="visual-editor">
            <ControlSection label="Profile Details" icon={FileText}>
                <InputGroup label="Display Name">
                    <input
                        className="text-input"
                        value={content.displayName}
                        onChange={(e) => updateContent('displayName', e.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Handle (@...)">
                    <input
                        className="text-input"
                        value={content.handle}
                        onChange={(e) => updateContent('handle', e.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Member Since">
                    <input
                        className="text-input"
                        value={content.memberSince}
                        onChange={(e) => updateContent('memberSince', e.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Badge Text">
                    <input
                        className="text-input"
                        value={content.badgeText}
                        onChange={(e) => updateContent('badgeText', e.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Avatar URL">
                    <ValidatedInput
                        className="text-input"
                        value={content.avatarUrl}
                        onChange={(e) => updateContent('avatarUrl', e.target.value)}
                    />
                </InputGroup>
            </ControlSection>

            <ControlSection label="Bio" icon={Type}>
                <RichTextToolbar onInsert={(prefix, suffix) => {
                    const textarea = document.getElementById('bio-textarea');
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = content.bio;
                    const before = text.substring(0, start);
                    const selection = text.substring(start, end);
                    const after = text.substring(end);
                    const newText = before + prefix + selection + suffix + after;
                    setContent(prev => ({ ...prev, bio: newText }));
                }} />

                <textarea
                    id="bio-textarea"
                    className="text-area-input"
                    rows="8"
                    value={content.bio}
                    onChange={(e) => updateContent('bio', e.target.value)}
                />
            </ControlSection>
        </div>
    )
}

export default ContentEditor
