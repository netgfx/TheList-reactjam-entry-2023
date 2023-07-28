//@ts-ignore
//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { PartyTable } from './units/party-table'
import { RingMat } from './materials/DropZoneMat'
import { PositionalAudio } from '@react-three/drei'
import { useGame } from './utils/useGame'
import { SimpleBirthdayCake } from './units/SimpleBirthdayCake'
import { HiFi } from './units/HiFi'
import { SimpleCoctail } from './units/SimpleCoctail'
import { SimpleHotDog } from './units/SimpleHotDog'
import { SimpleSoda } from './units/SimpleSoda'
import { SimpleSodaBottle } from './units/SimpleSodaBottle'
import { SimplePizza } from './units/SimplePizza'
import { SimpleWineRed } from './units/SimpleWineRed'
import { SimpleWineWhite } from './units/SimpleWineWhite'
import { SimpleBarrel } from './units/SimpleBarrel'

//import { DropZoneMat } from './materials/DropZoneMat'

//
export function InactiveProps(props: any) {
  const { blocks, outerCamera } = props
  const controls = useRef()
  const dropZoneRef = useRef()
  const tableItems = useGame((state: any) => state.tableItems)
  const { width: w, height: h } = useThree((state) => state.viewport)
  const soundRef = useRef()
  const [playTrack, setPlayTrack] = useState(false)
  const {
    camera,
    size,
    scene,
    gl: { domElement }
  } = useThree()

  useEffect(() => {
    let lastItem = blocks[blocks.length - 1][blocks[blocks.length - 1].length - 1]

    if (controls.current) {
      //console.log(controls.current)
      //controls.current?.moveTo(2.5 + lastItem.x * 5, 0, 2 + lastItem.y * 5, true)
    }
    //console.log(lastItem)
  }, [blocks])

  const getLastItem = () => {
    if (blocks) {
      let lastItem = blocks[blocks.length - 1][blocks[blocks.length - 1].length - 1]

      return [2.5 + lastItem.x * 5.0, -1.65, -3.2 + lastItem.y * 5]
    } else {
      return [0, 0, 0]
    }
  }

  // const getItems = () => {
  //   const renderItems: React.JSX.Element[] = []
  //   if (tableItems.length > 0) {
  //     tableItems.forEach((element: string) => {
  //       if (element === 'cake') {
  //         renderItems.push(<BirthdayCake position={getLastItem()} />)
  //       }
  //     })
  //   }

  //   console.log(tableItems, renderItems)
  //   return <>{renderItems}</>
  // }

  const getHiFiPos = () => {
    var pos = getLastItem()

    pos[0] -= 0.8
    pos[1] += 0.1
    pos[2] -= 0.8

    return pos
  }

  useEffect(() => {
    if (soundRef.current) {
      setPlayTrack(true)
    }
  }, [])

  const getBarrelPos = () => {
    var pos = getLastItem()
    pos[0] += 1
    pos[1] += 0.075
    pos[2] -= 0.6
    return pos
  }

  const getSodaPosition = () => {
    var pos = getLastItem()
    pos[0] += 0.9
    pos[1] += 0.1
    pos[2] -= 0.05
    return pos
  }

  const getWineWhitePosition = () => {
    var pos = getLastItem()
    pos[0] += 1.2
    pos[1] += 0.3
    pos[2] += 0.3
    return pos
  }

  const getHotdogPosition = () => {
    var pos = getLastItem()
    pos[0] -= 0.8
    //pos[1] += 0.1
    pos[2] += 0.8
    return pos
  }

  const getSodaBottlePosition = () => {
    var pos = getLastItem()
    pos[0] += 1.2
    //pos[1] += 0.1
    pos[2] += 0.7
    return pos
  }

  const getCocktailPosition = () => {
    var pos = getLastItem()

    pos[0] += 0.25
    pos[1] += 0.1
    pos[2] -= 0.8

    return pos
  }

  const getPizzaPosition = () => {
    var pos = getLastItem()

    pos[0] -= 1.1
    pos[1] += 0.12
    pos[2] += 0.12

    return pos
  }

  const getWineRedPosition = () => {
    var pos = getLastItem()

    pos[0] += 0.8
    pos[1] += 0.3
    pos[2] += 0.8

    return pos
  }

  return (
    <group>
      <PartyTable position={getLastItem()} scale={[0.0045, 0.0045, 0.0045]} />
      <group position={getHiFiPos()}>
        <PositionalAudio
          autoplay={true}
          ref={soundRef}
          url="https://gwcjylrsyylsuacdrnov.supabase.co/storage/v1/object/public/game/sounds/mainTrack.mp3"
          distance={5}
          loop
          {...props} // All THREE.PositionalAudio props are valid
        />
        <HiFi position={[0, 0, 0]} scale={0.2} rotation={[0, -Math.PI / 2, 0]} />
      </group>
      <mesh
        position={[getLastItem()[0] + 0.5, getLastItem()[1], getLastItem()[2]]}
        //scale={[0.95, 0.95, 0.95]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 10]} />
        {/* <meshBasicMaterial color={'red'} side={THREE.DoubleSide} /> */}
        <RingMat outerCamera={outerCamera} />
      </mesh>

      <mesh
        position={[2.5, 0, 2.5]}
        //scale={[0.95, 0.95, 0.95]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 5, 5]} />
        {/* <meshBasicMaterial color={'red'} side={THREE.DoubleSide} /> */}
        <RingMat outerCamera={outerCamera} />
      </mesh>

      {tableItems.map((item: string, index: number) => {
        console.log(item)
        if (item === 'cake') {
          return <SimpleBirthdayCake key={index} position={getLastItem()} scale={1.45} />
        } else if (item === 'cocktail') {
          return <SimpleCoctail key={index} position={getCocktailPosition()} scale={1.3} rotation={[0, 1.2, 0]} />
        } else if (item === 'hotdog') {
          return <SimpleHotDog key={index} position={getHotdogPosition()} scale={1.3} />
        } else if (item === 'soda') {
          return <SimpleSoda key={index} position={getSodaPosition()} scale={1.3} />
        } else if (item === 'soda-bottle') {
          return <SimpleSodaBottle key={index} position={getSodaBottlePosition()} scale={1.3} />
        } else if (item === 'pizza') {
          return <SimplePizza key={index} position={getPizzaPosition()} scale={1.3} />
        } else if (item === 'wine-red') {
          return <SimpleWineRed key={index} position={getWineRedPosition()} scale={1.3} rotation={[0, 1.2, 0]} />
        } else if (item === 'wine-white') {
          return <SimpleWineWhite key={index} position={getWineWhitePosition()} scale={1.3} rotation={[0, Math.PI, 0]} />
        } else if (item === 'barrel') {
          return <SimpleBarrel key={index} position={getBarrelPos()} scale={1.3} rotation={[0, Math.PI, 0]} />
        }
      })}

      {/* {outerCamera === null && <CameraControls ref={controls} makeDefault camera={camera} />} */}
    </group>
  )
}
