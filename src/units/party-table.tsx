//@ts-ignore
//@ts-nocheck
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Glitch5970 (https://sketchfab.com/Glitch5970)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/fnaf-party-tables-v2-4e0520e17e304d60adcdd523b604c866
Title: FNaF Party Tables V2
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function PartyTable(props: any) {
  const { nodes, materials } = useGLTF('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/fnaf_party_tables_v2.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 100, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[468.27, 326.7, 110]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane_WOOD_0.geometry} material={materials.WOOD} />
        <mesh castShadow receiveShadow geometry={nodes.Plane_Cloth_0.geometry} material={materials.Cloth} />
      </group>
    </group>
  )
}

useGLTF.preload('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/fnaf_party_tables_v2.glb')
