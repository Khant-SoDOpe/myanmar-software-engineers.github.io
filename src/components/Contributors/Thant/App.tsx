"use client";
import { useState, useEffect, Component, type ComponentType, type ReactNode } from 'react'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-center text-gray-400">
                    <p>Something went wrong loading the 3D visualizer.</p>
                </div>
            )
        }
        return this.props.children
    }
}

export default function App() {
    const [ThantApp, setThantApp] = useState<ComponentType | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        import('./ThantApp')
            .then((mod) => setThantApp(() => mod.default))
            .catch(() => setError(true))
    }, [])

    if (error) {
        return (
            <div className="p-4 text-center text-gray-400">
                <p>Failed to load the 3D visualizer.</p>
            </div>
        )
    }

    if (!ThantApp) return null

    return (
        <ErrorBoundary>
            <ThantApp />
        </ErrorBoundary>
    )
}
