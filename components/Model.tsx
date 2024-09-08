import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/ImageToStl.com_10464_asteroid_v1_iterations-2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Node1.geometry} material={materials.x1} />
    </group>
  )
}

useGLTF.preload('/ImageToStl.com_10464_asteroid_v1_iterations-2.glb')