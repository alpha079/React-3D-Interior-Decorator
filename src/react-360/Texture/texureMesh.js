import React, {useRef, useMemo } from 'react';
import * as THREE from 'three'
import { useFrame, useThree} from 'react-three-fiber';

// const TextureMesh = (props) => {
//     const mesh = useRef(null);
//     const texture = useMemo(() => new THREE.TextureLoader().load(props.texture), [props.texture])
//     useFrame(() => {mesh.current.rotation.x = mesh.current.rotation.y += 0.01})

//     return(
//         <mesh position={props.position} ref={mesh} onClick={() => props.click(props.texture)}>
//                 <sphereBufferGeometry attach="geometry" args={[0.2,32,32]} />
//                 <meshStandardMaterial attach="material">
//                     <primitive attach="map" object={texture} />
//                 </meshStandardMaterial>

//         </mesh>
//     )
// }

// export default TextureMesh;

const TextureMesh = (props) => {
    const scene = useRef()
    const mesh = useRef()
    const {camera} = useThree();
  //const {ref, ...rest} = props.hover();

    useFrame(() => {
      mesh.current.position.set(0,1,-8)
        camera.add(mesh.current)
      })
   
   
    const texture = useMemo(() => new THREE.TextureLoader().load(props.texture), [props.texture])
    // useFrame(() => {mesh.current.rotation.x = mesh.current.rotation.y += 0.01})
    return (
      <scene ref={scene}>
       
       
        <mesh  ref={mesh} onClick={() => props.click(props.texture)}>
            <sphereBufferGeometry attach="geometry" args={[0.1,32,32]} />
            <meshStandardMaterial attach="material">
                <primitive attach="map" object={texture} />
            </meshStandardMaterial>

        </mesh>
      </scene>
    )
  }

  export default TextureMesh;
  