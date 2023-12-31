/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
/* eslint-disable */
//@ts-ignore
//@ts-nocheck
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function SimpleCoctail(props) {
  const { nodes, materials } = useGLTF('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/cocktail.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Mesh_cocktail.geometry} material={materials._defaultMat} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh_cocktail_1.geometry} material={materials.greyLight} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh_cocktail_2.geometry} material={materials.red} />
      <group position={[0.004, 0.408, 0.131]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_lemon.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_lemon_1.geometry} material={materials.yellow} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.straw.geometry}
        material={materials.green}
        position={[-0.013, 0.345, -0.041]}
        rotation={[-0.262, 0, 0]}
        scale={[0.648, 0.875, 0.648]}
      />
    </group>
  )
}

useGLTF.preload('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/cocktail.glb')
