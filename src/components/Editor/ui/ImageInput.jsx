import { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import ValidatedInput from './ValidatedInput'
import Button from './Button'

const ImageInput = ({ label, value, onChange, placeholder, className }) => {
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleFile = (file) => {
        if (!file) return
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        const url = URL.createObjectURL(file)
        // Mock event object to satisfy parent handlers
        onChange({ target: { value: url } })
    }

    const handleChange = (e) => {
        const files = e.target.files
        if (files && files[0]) {
            handleFile(files[0])
        }
        e.target.value = '' // reset
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files && files[0]) {
            handleFile(files[0])
        }
    }

    return (
        <div className={`image-input-container ${className || ''}`}>
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: `1px dashed ${isDragging ? 'var(--accent-primary)' : '#444'}`,
                    borderRadius: 6,
                    padding: 8,
                    background: isDragging ? 'rgba(7, 10, 19, 0.5)' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    transition: 'all 0.2s ease'
                }}
            >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <ValidatedInput
                        className="text-input"
                        style={{ flex: 1 }}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder || "https://... or Drop Image"}
                    />
                    <Button
                        icon={Upload}
                        variant="secondary"
                        size="sm"
                        title="Upload Local Image"
                        onClick={() => fileInputRef.current?.click()}
                    />
                </div>

                {value && value.startsWith('blob:') && (
                    <div style={{ fontSize: '0.75rem', color: '#ecc94b', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <InfoIcon size={12} /> Local image (session only)
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleChange}
            />
        </div>
    )
}

const InfoIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
)

export default ImageInput
