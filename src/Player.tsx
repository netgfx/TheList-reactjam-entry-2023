//@ts-ignore
//@ts-nocheck
import { useGame } from './utils/useGame'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { isInsideBox } from './utils/utils'
import * as THREE from 'three'
import _ from 'lodash'
import Sound from 'react-sound'

// items
import { BirthdayCake } from './units/BirthdayCake'
import { Soda } from './units/Soda'
import { SodaBottle } from './units/SodaBottle'
import { HotDog } from './units/HotDog'
import { Pizza } from './units/Pizza'
import { WineRed } from './units/WineRed'
import { WineWhite } from './units/WineWhite'
import { Barrel } from './units/Barrel'
import { Coctail } from './units/Coctail'
//
export function Player(props: any) {
  const { pickUpItem, blocks, playerBody } = props
  const playerItem = useGame((state: any) => state.playerItem)
  const setVictory = useGame((state: any) => state.setVictory)
  const setPlayerItem = useGame((state: any) => state.setPlayerItem)
  const setTableItems = useGame((state: any) => state.setTableItems)
  const listItems = useGame((state: any) => state.listItems)
  const setListItems = useGame((state: any) => state.setListItems)
  const ref = useRef()
  const { camera } = useThree()

  const getLastItem = () => {
    if (blocks) {
      let lastItem = blocks[blocks.length - 1][blocks[blocks.length - 1].length - 1]

      return new THREE.Vector3(2.5 + lastItem.x * 5.0, -1.65, -3.2 + lastItem.y * 5)
    } else {
      return new THREE.Vector3(0, 0, 0)
    }
  }

  const removeFromList = (listItem: any) => {
    //console.log('remove from list', listItem, list)
    var list = _.cloneDeep(listItems)
    const index = _.findIndex(list, (item: any) => item.toLowerCase().replace('- ', '').replace(' ', '-') === listItem)
    _.pullAt(list, index)
    console.log(list, index)
    if (index !== -1) {
      setListItems(list)
    }

    // check for victory
    if (list.length === 0) {
      setVictory(true)
    }
  }

  function DropToggle(props: any) {
    const [, get] = useKeyboardControls()
    const { drop } = get()
    const dropPressed = useKeyboardControls((state) => state.drop)
    const [playSound, setPlaySound] = useState(false)

    useEffect(() => {
      if (dropPressed !== null && dropPressed !== undefined) {
        if (dropPressed === true) {
          const result = isInsideBox(camera.position, getLastItem(), 5, 1, 5)
          let lastItem = blocks[blocks.length - 1][blocks[blocks.length - 1].length - 1]

          // can only drop item when near the table
          if (result) {
            setPlaySound(true)
            setPlayerItem(null)
            setTableItems(pickUpItem)
            removeFromList(pickUpItem)
          }
          console.log('is near table: ', result)
        }
      }
    }, [drop, dropPressed])

    return (
      <Sound
        ignoreMobileRestrictions={true}
        autoLoad={true}
        url="https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sounds/putdown.mp3"
        playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlaySound(false)}
      />
    )
  }

  const DropHandler = useMemo(() => <DropToggle />, [pickUpItem])

  useFrame((state) => {
    if (ref.current) {
      const rotation = new THREE.Vector3()
      //const cameraRotation = new THREE.Vector3()
      //cameraRotation.copy(camera.rotation)
      //const fix = new THREE.Euler(0.5, 0, 0)
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      //direction.applyEuler(fix)
      //cameraRotation.y = 0
      //console.log(camera.getWorldDirection(rotation))
      const velocityVec = new THREE.Vector3()

      if (playerBody && ref.current.children.length > 0) {
        const velocity = playerBody.linvel()
        ref.current.children[0].rotation.x = THREE.MathUtils.lerp(
          ref.current.children[0].rotation.x,
          Math.sin((velocityVec.copy(velocity).length() > 1) * state.clock.elapsedTime * 10) / 6,
          0.1
        )
      }

      ref.current.position.copy(camera.position)
      //ref.current.position.set(ref.current.position.x - 1.5, ref.current.position.y + 0.5, ref.current.position.z - 0.5)
      ref.current.rotation.copy(camera.rotation)
      ref.current.position.copy(camera.position).add(direction.multiplyScalar(0.65))
      //wwwwwref.current.rotation.y += -0.5
      //ref.current.position.y += -0.25
      //ref.current.position.x += -0.25
    }
  })

  const getItem = () => {
    if (pickUpItem === 'cake') {
      return <BirthdayCake rotation={[Math.PI / 10, 0, 0]} objPosition={[0, -0.5, 0]} />
    } else if (pickUpItem === 'soda') {
      return <Soda rotation={[Math.PI / 10, 0, 0]} objPosition={[0.25, -0.5, 0]} />
    } else if (pickUpItem === 'soda-bottle') {
      return <SodaBottle rotation={[Math.PI / 10, 0, 0]} objPosition={[0.25, -0.55, 0]} />
    } else if (pickUpItem === 'hotdog') {
      return <HotDog rotation={[Math.PI / 10, 0, 0]} objPosition={[0, -0.5, 0]} />
    } else if (pickUpItem === 'pizza') {
      return <Pizza rotation={[Math.PI / 10, 0, 0]} objPosition={[0, -0.5, 0]} />
    } else if (pickUpItem === 'wine-red') {
      return <WineRed rotation={[Math.PI / 10, 0, 0]} objPosition={[0.25, -0.65, 0.0]} />
    } else if (pickUpItem === 'wine-white') {
      return <WineWhite rotation={[Math.PI / 10, 0, 0]} objPosition={[0.25, -0.65, 0.0]} />
    } else if (pickUpItem === 'barrel') {
      return <Barrel rotation={[Math.PI / 10, 0, 0]} objPosition={[0, -0.5, 0]} scale={0.75} />
    } else if (pickUpItem === 'cocktail') {
      return <Coctail rotation={[Math.PI / 10, 0, 0]} objPosition={[-0.325, -0.55, 0.05]} />
    }
    return null
  }
  return (
    <group ref={ref}>
      {DropHandler}
      {getItem()}
    </group>
  )
}
