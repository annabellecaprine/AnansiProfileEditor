import { useState, useCallback } from 'react';

/**
 * useHistory Hook
 * Manages state with past, present, and future stacks.
 * 
 * @param {any} initialState 
 * @returns [state, setState, undo, redo, canUndo, canRedo]
 */
export default function useHistory(initialState) {
    const [history, setHistory] = useState(() => {
        const present = typeof initialState === 'function' ? initialState() : initialState;
        return {
            past: [],
            present,
            future: []
        };
    });

    const { past, present, future } = history;
    const canUndo = past.length > 0;
    const canRedo = future.length > 0;

    const undo = useCallback(() => {
        setHistory(curr => {
            if (curr.past.length === 0) return curr;
            const newPresent = curr.past[curr.past.length - 1];
            const newPast = curr.past.slice(0, curr.past.length - 1);
            return {
                past: newPast,
                present: newPresent,
                future: [curr.present, ...curr.future]
            };
        });
    }, []);

    const redo = useCallback(() => {
        setHistory(curr => {
            if (curr.future.length === 0) return curr;
            const newPresent = curr.future[0];
            const newFuture = curr.future.slice(1);
            return {
                past: [...curr.past, curr.present],
                present: newPresent,
                future: newFuture
            };
        });
    }, []);

    const setState = useCallback((newState) => {
        setHistory(curr => {
            const resolvedState = typeof newState === 'function'
                ? newState(curr.present)
                : newState;

            // Simple equality check to avoid duplicates (deep check expensive)
            if (JSON.stringify(resolvedState) === JSON.stringify(curr.present)) {
                return curr;
            }

            // Optional: Limit stack size (e.g., 50)
            const newPast = [...curr.past, curr.present];
            if (newPast.length > 50) newPast.shift();

            return {
                past: newPast,
                present: resolvedState,
                future: []
            };
        });
    }, []);

    // For bulk updates without history push (e.g. Load Project)
    const setProject = useCallback((fullState) => {
        setHistory({
            past: [],
            present: fullState,
            future: []
        });
    }, []);

    return [present, setState, undo, redo, canUndo, canRedo, setProject];
}
