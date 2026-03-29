import * as THREE from 'three'
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { Dispatch, SetStateAction, RefObject, Suspense } from 'react'
import Lights from './Lights'
import IPhone from './IPhone'
import Loader from './Loader'

type ModelType = {
  title: string
  color: string[]
  img: string
}

type ModelViewProps = {
  index: number
  groupRef: RefObject<THREE.Group>
  gsapType: string
  controlRef: React.RefObject<OrbitControlsType | null>
  setRotationState: Dispatch<SetStateAction<number>>
  size: string
  item: ModelType
}

function ModelView({ index, groupRef, gsapType, controlRef, setRotationState, size, item }: ModelViewProps) {
  return   (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'left-full' : ''}`}
    >
      <ambientLight intensity={0.5} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        // FIX: Added null check here
        onEnd={() => {
          if (controlRef.current) {
            setRotationState(controlRef.current.getAzimuthalAngle());
          }
        }}
      /> 

      {/* FIX: Corrected the string interpolation for the name property */}
      <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size} // This will now work once you add 'size' to IPhone's interface
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView