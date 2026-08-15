import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function generateShellPoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random() * 0.5 + 0.5)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}

export default function ParticleField({ count = 2600 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const positions = useMemo(() => generateShellPoints(count, 2.3), [count])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y += delta * 0.045
    const targetTiltX = state.pointer.y * 0.18
    const targetTiltZ = -state.pointer.x * 0.12
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTiltX, 0.03)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetTiltZ, 0.03)
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#8fd67a"
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#ff6b4a" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
