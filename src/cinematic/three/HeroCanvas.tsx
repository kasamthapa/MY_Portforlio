import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'

export default function HeroCanvas() {
  const [count, setCount] = useState(2600)

  useEffect(() => {
    setCount(window.innerWidth < 640 ? 1100 : window.innerWidth < 1024 ? 1800 : 2600)
  }, [])

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ParticleField count={count} />
      </Suspense>
    </Canvas>
  )
}
