/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
/* eslint-disable */
//@ts-ignore
//@ts-nocheck
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function Soda(props) {
  const { nodes, materials } = useGLTF('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sodaCan.glb')
  return (
    <RigidBody
      position={props.position}
      colliders={'cuboid'}
      type={'fixed'}
      sensor={true}
      canSleep={false}
      enabledRotations={[false, false, false]}
      name={'soda'}
      onIntersectionEnter={({ manifold, target, other }) => {
        console.log('Collision at world position ', manifold.solverContactPoint(0))

        if (other.rigidBodyObject) {
          console.log(
            // this rigid body's Object3D
            target.rigidBodyObject.name,
            ' collided with ',
            // the other rigid body's Object3D
            other.rigidBodyObject.name
          )
        }
      }}>
      <group rotation={props.rotation} position={props.objPosition} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_sodaCan.geometry} material={materials.greyDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_sodaCan_1.geometry} material={materials.greyLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_sodaCan_2.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_sodaCan_3.geometry} material={materials.brownDarkest} />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sodaCan.glb')