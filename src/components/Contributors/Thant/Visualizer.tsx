import React, { Suspense, useEffect, useRef, useState, Component, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './3d-components/Sphere'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

class CanvasErrorBoundary extends Component<
    { children: ReactNode; onError: () => void },
    { hasError: boolean }
> {
    constructor(props: { children: ReactNode; onError: () => void }) {
        super(props)
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch() {
        this.props.onError()
    }
    render() {
        if (this.state.hasError) return null
        return this.props.children
    }
}

interface VisualizerProps {
    audioTime: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ audioTime }) => {
    const sound = useRef<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.background = 'black';

        const handleError = (e: ErrorEvent) => {
            if (e.message?.includes('Could not load') || e.message?.includes('Context Lost')) {
                e.preventDefault()
                setError(true)
            }
        }
        const handleRejection = (e: PromiseRejectionEvent) => {
            if (String(e.reason)?.includes('Could not load')) {
                e.preventDefault()
                setError(true)
            }
        }
        window.addEventListener('error', handleError)
        window.addEventListener('unhandledrejection', handleRejection)
        return () => {
            window.removeEventListener('error', handleError)
            window.removeEventListener('unhandledrejection', handleRejection)
        }
    }, [])

    if (error) {
        return (
            <div className="h-screen w-full flex justify-center items-center text-gray-400">
                <p>Failed to load the 3D visualizer. Please refresh the page.</p>
            </div>
        )
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <CanvasErrorBoundary onError={() => setError(true)}>
                <Canvas
                    camera={{ position: [0.0, 0.0, 8.0] }}
                    onCreated={({ gl }) => {
                        const canvas = gl.domElement
                        canvas.addEventListener('webglcontextlost', (e) => {
                            e.preventDefault()
                            setError(true)
                        })
                    }}
                >
                    <ambientLight intensity={0.5} />
                    {/* @ts-ignore - angle is not valid for directionalLight but kept for original behavior */}
                    <directionalLight position={[10, 15, 10]} angle={0.3} />
                    <Suspense fallback={null}>
                        <Sphere sound={sound} />
                    </Suspense>
                    <OrbitControls />
                    {/* @ts-ignore */}
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={3} />
                        <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={15} height={700} />
                    </EffectComposer>
                </Canvas>
            </CanvasErrorBoundary>
        </div>
    )
}

export default Visualizer
