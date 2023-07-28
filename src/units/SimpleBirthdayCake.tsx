//@ts-ignore
//@ts-nocheck
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function SimpleBirthdayCake(props: any) {
  const { nodes, materials } = useGLTF('/cakeBirthday.glb')
  return (
    <group dispose={null} {...props}>
      <group position={[-0.277, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_1.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_2.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_3.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_5.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_6.geometry} material={materials.yellow} />
      </group>
      <group position={[-0.138, 0, 0.24]} rotation={[0, Math.PI / 3, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_1.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_2.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_3.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_5.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_6.geometry} material={materials.yellow} />
      </group>
      <group position={[0.138, 0, 0.24]} rotation={[-Math.PI, Math.PI / 3, -Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_1.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_2.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_3.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_5.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_6.geometry} material={materials.yellow} />
      </group>
      <group position={[0.277, 0, 0]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_7.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_8.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_9.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_10.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_11.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_12.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_13.geometry} material={materials.yellow} />
      </group>
      <group position={[0.138, 0, -0.24]} rotation={[Math.PI, -Math.PI / 3, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_1.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_2.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_3.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_5.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_6.geometry} material={materials.yellow} />
      </group>
      <group position={[-0.138, 0, -0.24]} rotation={[0, -Math.PI / 3, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_7.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_8.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_9.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_10.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_11.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_12.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_slice_13.geometry} material={materials.yellow} />
      </group>
    </group>
  )
}

useGLTF.preload('/cakeBirthday.glb')
