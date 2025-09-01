import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function RotatingModel({ onClick, position = [0, 1, -5], scale = [1, 1, 1] }) {
  const ref = useRef()
  const { scene, animations } = useGLTF('/models/flower.glb') 
  const mixer = useRef()

  // Configura el AnimationMixer y reproduce todas las animaciones
  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene)
      animations.forEach(clip => {
        const action = mixer.current.clipAction(clip)
        action.play()
      })
    }
  }, [animations, scene])

  // Rotación y actualización de animaciones
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += 0.01
    if (mixer.current) mixer.current.update(delta)
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      onClick={onClick}
      position={position}
      scale={scale}
    />
  )
}
