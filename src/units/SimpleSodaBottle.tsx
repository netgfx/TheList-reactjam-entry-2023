/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
/* eslint-disable */
//@ts-ignore
//@ts-nocheck
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function SimpleSodaBottle(props) {
  const { nodes, materials } = useGLTF('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sodaBottle.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Mesh_sodaBottle.geometry} material={materials.brownDark} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh_sodaBottle_1.geometry} material={materials.red} />
    </group>
  )
}

useGLTF.preload('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sodaBottle.glb')