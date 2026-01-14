import { DefaultTheme } from './definitions/default'
import { MidnightTheme } from './definitions/midnight'
import { CyberpunkTheme } from './definitions/cyberpunk'
import { RoseTheme } from './definitions/rose'

export const AvailableThemes = [
    DefaultTheme,
    MidnightTheme,
    CyberpunkTheme,
    RoseTheme
]

export const getThemeById = (id) => AvailableThemes.find(t => t.id === id) || DefaultTheme
export { DefaultTheme }
