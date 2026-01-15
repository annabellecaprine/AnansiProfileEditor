/**
 * usage:
 * import { downloadProjectAsJson, parseProjectFile } from './projectManagement'
 */

export const downloadProjectAsJson = (theme, content, manualCSS) => {
    const projectData = {
        meta: {
            version: '1.0.0',
            timestamp: Date.now(),
            app: 'Profile CSS Editor'
        },
        theme,
        content,
        manualCSS
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create temporary link
    const link = document.createElement('a');
    link.href = url;
    const date = new Date().toISOString().split('T')[0];
    const cleanName = (content.displayName || 'profile').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `profile_${cleanName}_${date}.json`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const parseProjectFile = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) return reject(new Error('No file selected'));
        if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
            return reject(new Error('Invalid file type. Please upload a .json file.'));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);

                // Basic Validation
                if (!json.theme || !json.content) {
                    throw new Error('Invalid project file structure');
                }

                resolve({
                    theme: json.theme,
                    content: json.content,
                    manualCSS: json.manualCSS || ''
                });
            } catch (err) {
                reject(new Error('Failed to parse project file: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsText(file);
    });
};
