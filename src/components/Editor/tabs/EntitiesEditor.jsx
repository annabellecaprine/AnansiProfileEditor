import React from 'react'
import EntitiesAppearance from './entities/EntitiesAppearance'
import EntitiesEffects from './entities/EntitiesEffects'
import CardTemplateSelector from './entities/CardTemplateSelector'

const EntitiesEditor = ({ theme, setTheme }) => {

    const updateEntities = (key, value) => {
        setTheme(prev => ({
            ...prev,
            entities: {
                ...prev.entities,
                [key]: value,
                // If we're changing a value and have a template, mark as modified
                isTemplateModified: prev.entities.templateId && prev.entities.templateId !== 'standard' ? true : prev.entities.isTemplateModified
            }
        }))
    }

    const handleSelectTemplate = (template) => {
        setTheme(prev => ({
            ...prev,
            entities: {
                ...prev.entities,
                ...template.defaults,
                templateId: template.id,
                isTemplateModified: false
            }
        }))
    }

    return (
        <div className="visual-editor">
            <CardTemplateSelector
                currentTemplateId={theme.entities?.templateId}
                onSelect={handleSelectTemplate}
            />

            <hr className="divider" />

            <EntitiesAppearance theme={theme} updateEntities={updateEntities} />

            <hr className="divider" />

            <EntitiesEffects theme={theme} updateEntities={updateEntities} />
        </div>
    )
}

export default EntitiesEditor
