/* eslint-disable */
//@ts-ignore
//@ts-nocheck
import { Html, KeyboardControlsEntry, Sphere, Hud, OrthographicCamera } from '@react-three/drei'
import { KeyboardControls, ContactShadows, Float } from '@react-three/drei'
import React, { useEffect, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import * as THREE from 'three'
import { TopDownCamera, CameraType } from './TopDownCamera'
import { Cell } from './Cell'
import { CapsuleCollider, Physics, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useGame } from './utils/useGame'
import { Flashlight } from './utils/Flashlight'
import { Floor } from './Floor'
import { InactiveProps } from './InactiveProps'
import { Skybox } from './Skybox'
// items
import { BirthdayCake } from './units/BirthdayCake'
import { Coctail } from './units/Coctail'
//
import { Controls } from './Controls'
import { Progress } from './utils/Clock'
import { Player } from './Player'
import { Instructions } from './Instructions'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { TheList } from './TheList'
import Sound, { soundManager } from 'react-sound'
import _ from 'lodash'
import { getRandomIndices } from './utils/utils'
import { HotDog } from './units/HotDog'
import { Pizza } from './units/Pizza'
import { Barrel } from './units/Barrel'
import { Soda } from './units/Soda'
import { SodaBottle } from './units/SodaBottle'
import { WineRed } from './units/WineRed'
import { WineWhite } from './units/WineWhite'

//
export enum KControls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
  drop = 'drop',
  map = 'map'
}

export function MainScene(props: any) {
  const { blocks } = props

  const [cameraPos, setCameraPos] = useState([0, 0.0, -1.5])
  const [playSound, setPlaySound] = useState(false)
  const playerRef = useRef()
  const [maze, setMaze] = useState(blocks)
  const playerBodyRef = useRef<RapierRigidBody>(null)
  const onMenu = useState(false)
  const [startClock, setStartClock] = useState(false)
  const { viewport, camera: mainCamera } = useThree()
  const progressRef = useRef()
  const rotation = new THREE.Vector3()
  const [camera, setCamera] = useState(true)
  const [partyItemsPos, setPartyItemsPos] = useState([])
  const [openAreas, setOpenAreas] = useState([])
  const [showInstructions, setShowInstructions] = useState(true)
  // State variables
  const placeableItems = useGame((state: any) => state.items)
  const listItems = useGame((state: any) => state.listItems)
  const setPlaceableItems = useGame((state: any) => state.setItems)
  const playerItem = useGame((state: any) => state.playerItem)
  const setPlayerItem = useGame((state: any) => state.setPlayerItem)
  const gameOver = useGame((state: any) => state.gameOver)
  const victory = useGame((state: any) => state.victory)
  //
  const [pickUpItem, setPickUpItem] = useState(null)
  const activeAnimation: {
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
    idle: boolean
  } = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    idle: true
  }

  useEffect(() => {
    console.log(placeableItems)
  }, [placeableItems])

  useEffect(() => {
    console.log('player item: ', playerItem)
    if (playerItem === null) {
      setPickUpItem(null)
    }
  }, [playerItem])

  const playerEntity = useRef({ source: playerRef, activeAnimation: activeAnimation, body: playerBodyRef })

  const map = useMemo<KeyboardControlsEntry<KControls>[]>(
    () => [
      { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
      { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
      { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
      { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
      { name: 'drop', keys: ['E', 'e'] },
      { name: 'map', keys: ['M', 'm'] }
    ],
    []
  )

  useFrame(() => {
    //console.log(playerBodyRef.current?.translation())
    if (progressRef.current) {
      const vec3 = new THREE.Vector3()

      // var translation = playerBodyRef.current?.translation()
      // vec3.copy(translation)

      //progressRef.current.position.copy(mainCamera.position)
      //progressRef.current.position.set(progressRef.current.position.x - 1.5, progressRef.current.position.y, progressRef.current.position.z)

      //progressRef.current.rotation.copy(mainCamera.rotation)
      //progressRef.current.position.copy(mainCamera.position).add(mainCamera.getWorldDirection(rotation).multiplyScalar(1))
    }
  })

  useEffect(() => {
    if (blocks) {
      var _openAreas = []
      // locate areas that only have one side open
      for (var i = 0; i < blocks.length; i++) {
        for (var j = 0; j < blocks[i].length; j++) {
          //check open sides
          var openSides = 0
          var block = blocks[i][j]
          if (block.bottom === false) {
            openSides += 1
          }
          if (block.top === false) {
            openSides += 1
          }
          if (block.left === false) {
            openSides += 1
          }
          if (block.right === false) {
            openSides += 1
          }

          if (openSides === 1) {
            _openAreas.push(block)
          }
        }
      }

      _openAreas.splice(0, 2)
      _openAreas.splice(_openAreas.length - 1, 1)
      _openAreas = _.shuffle(_openAreas)

      console.log('open areas ', _openAreas)
      var availableIndexes = getRandomIndices(_openAreas, 6)

      setOpenAreas(_openAreas)
      setPartyItemsPos(availableIndexes)
    }
  }, [blocks])

  function addItems() {
    if (openAreas.length > 0 && partyItemsPos.length > 0) {
      //TODO: ADD MORE ITEMS
      const getPlaceable = (item, index) => {
        let type = item.toLowerCase().replace('- ', '').replace(' ', '-')
        let pos = openAreas[partyItemsPos[index]]

        if (type === 'cake') {
          if (blocks[0][0].bottom === true) {
            pos = [4.5, -0.25, 2.5]
          } else {
            pos = [2.5, -0.25, 4.5]
          }
          return <BirthdayCake position={pos} />
        } else if (type === 'cocktail') {
          return <Coctail position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        } else if (type === 'hotdog') {
          return <HotDog position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        } else if (type === 'pizza') {
          return <Pizza position={[2.5 + pos.x * 5.0, 0.2, -3.2 + pos.y * 5]} />
        } else if (type === 'barrel') {
          return <Barrel position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        } else if (type === 'soda') {
          return <Soda position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        } else if (type === 'soda-bottle') {
          return <SodaBottle position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        } else if (type === 'wine-red') {
          return <WineRed position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        } else if (type === 'wine-white') {
          return <WineWhite position={[2.5 + pos.x * 5.0, -0.25, -3.2 + pos.y * 5]} />
        }
      }

      return (
        <group>
          {listItems.map((item, index) => {
            console.log(item, index)
            var _item = placeableItems[item.toLowerCase().replace('- ', '').replace(' ', '-')]

            if (_item === true) {
              return (
                <Float
                  key={index}
                  speed={2.5} // Animation speed, defaults to 1
                  rotationIntensity={0} // XYZ rotation intensity, defaults to 1
                  floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                  floatingRange={[-0.15, 0.25]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
                >
                  {getPlaceable(item, index)}
                </Float>
              )
            } else {
              return null
            }
          })}
        </group>
      )
    } else return null
  }

  const WinConfetti = () => {
    const { width, height } = useWindowSize()

    const InnerConfetti = () => {
      const { size, viewport, camera } = useThree()

      return (
        <>
          <OrthographicCamera makeDefault />
          <Html center position={[-size.width / 2, size.height / 2, 0]}>
            <Confetti width={width} height={height} />
          </Html>
        </>
      )
    }

    return (
      <Hud renderPriority={1}>
        <InnerConfetti />
      </Hud>
    )
  }

  const ShowList = () => {
    const { size, viewport, camera } = useThree()

    return (
      <Hud renderPriority={1}>
        <>
          <OrthographicCamera makeDefault />
          {/* <mesh position={[0, 0, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" />
          </mesh> */}
        </>
        <TheList position={[size.width / 2 - 120, size.height / 2 - size.height + 150, -20]} scale={150} />
      </Hud>
    )
  }

  return (
    <KeyboardControls map={map}>
      <color attach="background" args={[0x1e1e1e]} />
      {/* <ambientLight intensity={0.45} /> */}
      <hemisphereLight intensity={0.4} color={'#fec72c'} />
      {/* <pointLight position={[0, 10, 10]} intensity={1} /> */}
      <pointLight position={[0, 10, -5]} color="#CDC6AE" />

      <ContactShadows scale={20} blur={0.4} opacity={0.2} position={[-0, -1.5, 0]} />

      <Suspense fallback={null}>
        <Physics gravity={[0, 0, 0]} colliders="hull">
          <TopDownCamera
            //@ts-ignore
            player={playerEntity.current}
            makeDefault
            aspectRatio={window.innerWidth / window.innerHeight}
            position={[0, 10, 0]}
            fov={60}
            near={0.1}
            far={1000}
            blocks={blocks}
            type={camera === false ? CameraType.Orthographic : CameraType.Perspective}
            firstPerson={camera}
          />

          <group>
            <RigidBody
              canSleep={false}
              ref={playerBodyRef}
              colliders={false}
              mass={1000}
              name={'player'}
              onIntersectionEnter={({ manifold, target, other }) => {
                // don't pick up other item if you are already carrying
                if (pickUpItem !== null) {
                  console.log('is holding something else')
                  return
                }

                var obj = {}
                obj[other.rigidBodyObject.name] = false
                setPickUpItem(other.rigidBodyObject.name)
                setPlaceableItems(obj)
                setPlayerItem(other.rigidBodyObject.name)
                setPlaySound(true)
              }}
              onCollisionEnter={({ manifold, target, other }) => {
                console.log('Collision at world position ', manifold.solverContactPoint(0))

                if (other.rigidBodyObject) {
                  console.log(
                    target.rigidBodyObject.name,
                    ' collided with ',

                    other.rigidBodyObject.name,
                    ' at ',
                    other.rigidBodyObject.translation()
                  )
                }
              }}
              type="dynamic"
              position={[2.5, 0.5, 2.5]}
              enabledRotations={[false, false, false]}>
              <CapsuleCollider args={[0.05, 0.4]} />
              {camera.camera === false && (
                <Sphere args={[1, 16, 16]} ref={playerRef} rotation={[0, -Math.PI / 2, 0]}>
                  <meshStandardMaterial color={'hotpink'} />
                </Sphere>
              )}
              <Flashlight />
            </RigidBody>

            {/* Player */}
            <Suspense fallback={null}>
              <Player pickUpItem={pickUpItem} blocks={blocks} playerBody={playerBodyRef.current} />
            </Suspense>
            {/* Items */}

            {addItems()}

            {/* Clock */}

            {!showInstructions && !gameOver && (
              <Hud renderPriority={1}>
                <OrthographicCamera makeDefault position={[0, -300, 100]} />
                <group ref={progressRef} position={[0, 0, -2]}>
                  <Html center position={[0, 0.55, 0]}>
                    <Progress start={!showInstructions} />
                  </Html>
                </group>
              </Hud>
            )}

            <Cell maze={maze} />
            <Floor position={[0, -3, 0]} blocks={blocks} menu={false} />
            {/* {camera.firstPerson && <PlaneFog2 position={[0, 0.1, 0.5]} scale={100} color={'#c0c0aa'} min={0.3} max={0.5} />} */}
          </group>
        </Physics>
        <Suspense fallback={null}>
          <InactiveProps blocks={blocks} outerCamera={camera} />
          {showInstructions && <Instructions setShowInstructions={setShowInstructions} type={'instructions'} />}
          {gameOver && <Instructions setShowInstructions={setShowInstructions} type={'gameover'} />}
          {victory && <Instructions setShowInstructions={setShowInstructions} type={'victory'} />}
          <Sound
            ignoreMobileRestrictions={true}
            autoLoad={true}
            url="https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sounds/pickup.mp3"
            playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED}
            onFinishedPlaying={() => setPlaySound(false)}
          />
        </Suspense>
        {victory && <WinConfetti />}
        {!showInstructions && !victory && !gameOver && <ShowList />}
        <Skybox
          src={'https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sky_urban_summer_sky_mid_of_day_green_fields.jpg'}
          depth={
            'https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sky_urban_summer_sky_mid_of_day_green_fields_dep.jpg'
          }
        />
      </Suspense>

      <Controls playerRef={playerEntity} enableLock={camera.camera} />
    </KeyboardControls>
  )
}
