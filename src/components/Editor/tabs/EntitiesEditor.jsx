import React from 'react'
import EntitiesAppearance from './entities/EntitiesAppearance'
import EntitiesEffects from './entities/EntitiesEffects'

const EntitiesEditor = ({ theme, setTheme }) => {

    const updateEntities = (key, value) => {
        setTheme(prev => ({
            ...prev,
            entities: {
                ...prev.entities,
                [key]: value
            }
        }))
    }

    return (
        <div className="visual-editor">
            <EntitiesAppearance theme={theme} updateEntities={updateEntities} />

            <hr className="divider" />

            <EntitiesEffects theme={theme} updateEntities={updateEntities} />
        </div>
    )
}

export default EntitiesEditor
