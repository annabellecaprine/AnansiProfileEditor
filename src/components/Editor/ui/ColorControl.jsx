import { HexColorPicker } from 'react-colorful'
import { hexToRgb, rgbToHex } from '../../../utils/colors'

// Reusable Color Component to handle bidirectional Hex/RGB sync
const ColorControl = ({ label, color, onChange }) => {
    const rgbString = hexToRgb(color || '#000000');

    const handleRgbChange = (e) => {
        const val = e.target.value; // Expecting "R, G, B" or "R G B"
        const parts = val.split(/[ ,]+/).map(p => parseInt(p)).filter(n => !isNaN(n));
        if (parts.length === 3) {
            const [r, g, b] = parts;
            if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                onChange(rgbToHex(r, g, b));
            }
        }
    }

    return (
        <div style={{ marginBottom: 16 }}>
            {label && <label className="sub-label">{label}</label>}
            <div className="picker-wrapper">
                <HexColorPicker color={color || '#000000'} onChange={onChange} />
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 10, color: '#888', display: 'block', marginBottom: 2 }}>HEX</span>
                        <input
                            type="text"
                            className="text-input"
                            style={{ width: '100%', fontFamily: 'monospace', textAlign: 'center' }}
                            value={color}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 10, color: '#888', display: 'block', marginBottom: 2 }}>RGB</span>
                        <input
                            type="text"
                            className="text-input"
                            style={{ width: '100%', fontFamily: 'monospace', textAlign: 'center' }}

                            placeholder="R, G, B"
                            defaultValue={rgbString}
                            key={color} // Force re-render on color change to update defaultValue safely
                            onBlur={handleRgbChange} // Update only on blur to allow typing
                            onKeyDown={(e) => e.key === 'Enter' && handleRgbChange(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorControl
