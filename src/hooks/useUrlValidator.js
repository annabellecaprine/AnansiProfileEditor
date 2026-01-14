import { useState, useEffect } from 'react'

/**
 * Validates a URL and specifically checks if it's a loadable image.
 * @param {string} url - The URL to validate
 * @param {number} delay - Debounce delay in ms (default 500)
 */
export const useUrlValidator = (url, delay = 500) => {
    const [isValid, setIsValid] = useState(null) // null = initial/unchecked
    const [isChecking, setIsChecking] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) {
            setIsValid(null)
            setError(null)
            return
        }

        setIsChecking(true)
        setIsValid(null)
        setError(null)

        const timeoutId = setTimeout(() => {
            // 1. Basic Syntax Check
            try {
                new URL(url)
            } catch (e) {
                setIsValid(false)
                setIsChecking(false)
                setError("Invalid URL format")
                return
            }

            // 2. Image Valid Check (Preload)
            const img = new Image()
            img.src = url
            img.onload = () => {
                setIsValid(true)
                setIsChecking(false)
                setError(null)
            }
            img.onerror = () => {
                setIsValid(false)
                setIsChecking(false)
                setError("Image failed to load")
            }

        }, delay)

        return () => clearTimeout(timeoutId)
    }, [url, delay])

    return { isValid, isChecking, error }
}
