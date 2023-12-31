//@ts-ignore
//@ts-nocheck
import { useEffect, useRef } from 'react'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import React from 'react'
import { useFrame } from '@react-three/fiber'
import _ from 'lodash'
import { useGame } from './utils/useGame'
import { capitalizeWords } from './utils/utils'
//
export function TheList(props: any) {
  const noteRef = useRef()
  const note = useTexture('https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/note.png')
  const fontProps = {
    font: 'https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/YA9dr0Wd4kDdMthROCc.woff',
    fontSize: 0.12,
    letterSpacing: -0.04,
    lineHeight: 1.6,
    color: 'black',
    textAlign: 'left',
    'material-toneMapped': false
  }
  const placeableItems = useGame((state: any) => state.items)
  const setPlaceableItems = useGame((state: any) => state.setAllItems)
  const listItems = useGame((state: any) => state.listItems)
  const setListItems = useGame((state: any) => state.setListItems)
  const items = ['soda', 'cocktail', 'pizza', 'soda bottle', 'hotdog', 'barrel', 'wine red', 'wine white']

  useEffect(() => {
    if (listItems.length === 0) {
      var _listItems = _.shuffle(capitalizeWords(items))
        .slice(0, 5)
        .map((item: any) => `- ${item}`)
      _listItems.push('- Cake')
      setListItems(_listItems)
      var _placeableItems = _.cloneDeep(placeableItems)

      _.forEach(_listItems, (o) => {
        var _item = o.toLowerCase().replace('- ', '').replace(' ', '-')

        _placeableItems[_item] = true
      })

      console.log('placeable items: ', _placeableItems)
      setPlaceableItems(_placeableItems)
    }
  }, [])

  useFrame(() => {
    //console.log(playerBodyRef.current?.translation())
    if (noteRef.current) {
      var rotation = new THREE.Vector3()

      // noteRef.current.position.copy(camera.position)
      // noteRef.current.position.set(noteRef.current.position.x - 1.5, noteRef.current.position.y, noteRef.current.position.z)
      // noteRef.current.rotation.copy(camera.rotation)
      // noteRef.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1))
    }
  })

  function Line({ start, end }) {
    return (
      <group position={[0, 0, 0]}>
        <line>
          <bufferGeometry setFromPoints={() => new THREE.BufferGeometry().setFromPoints([start, end])} />
          <lineBasicMaterial color={'green'} />
        </line>
      </group>
    )
  }

  return (
    <group ref={noteRef} {...props}>
      <Text {...fontProps} rotation={[0, 0, 0]} position={[-0.05, 0.55, 0.1]}>
        The List
      </Text>
      {listItems.map((item, index) => {
        return (
          <group key={index} position={[-0.05, 0.2 + -0.14 * index - 0.014 * index, 0.1]}>
            <Line start={[-0.5, 0, 0.0]} end={[2.5, 0, 0.0]} />
            <Text {...fontProps} rotation={[0, 0, 0]} position={[0, 0, 0.0]}>
              {item}
            </Text>
          </group>
        )
      })}
      <mesh>
        <planeGeometry args={[1.2, 1.7]} />
        <meshBasicMaterial map={note} transparent={true} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
