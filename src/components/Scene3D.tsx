'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Loading component
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
    </div>
  )
}

// GLB Model Component
function AbstractSphereModel() {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/model/abstract_sphere.glb')

  // Auto-rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model
useGLTF.preload('/model/abstract_sphere.glb')

// Main Scene Component
interface Scene3DProps {
  className?: string
}

const Scene3D: React.FC<Scene3DProps> = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className={`relative w-full h-full ${className}`}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="bg-transparent"
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        <pointLight position={[10, -10, 10]} intensity={0.3} color="#06b6d4" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Orbit Controls for user interaction */}
        <OrbitControls enablePan={false} enableZoom={false} />

        {/* 3D Model */}
        <Suspense fallback={null}>
          <AbstractSphereModel />
        </Suspense>

      </Canvas>

      {/* Loading Overlay */}
      <Suspense fallback={<LoadingSpinner />}>
        <div />
      </Suspense>

      {/* Interaction Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
      >
      </motion.div>
    </motion.div>
  )
}

export default Scene3D