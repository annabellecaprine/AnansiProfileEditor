import React from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
        if (this.props.onReset) {
            this.props.onReset()
        } else {
            // Fallback: reload page if no reset provided
            window.location.reload()
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: 24,
                    background: '#2d2d2d',
                    color: '#e2e8f0',
                    borderRadius: 8,
                    border: '1px solid #e53e3e',
                    textAlign: 'center',
                    margin: 10,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16
                }}>
                    <AlertTriangle size={48} color="#e53e3e" />
                    <div>
                        <h3 style={{ margin: 0, marginBottom: 8 }}>Something went wrong</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e0', maxWidth: 300 }}>
                            The editor encountered an error. Try resetting the view.
                        </p>
                        {this.state.error && (
                            <pre style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: 8,
                                borderRadius: 4,
                                fontSize: '0.7rem',
                                marginTop: 10,
                                textAlign: 'left',
                                overflow: 'auto',
                                maxWidth: '100%',
                                maxHeight: 100
                            }}>
                                {this.state.error.toString()}
                            </pre>
                        )}
                    </div>
                    <button
                        onClick={this.handleReset}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '8px 16px',
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        <RotateCcw size={16} /> Reset & Reload
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
