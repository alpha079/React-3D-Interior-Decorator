import React from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {useLoader} from 'react-three-fiber';
import { draco } from "drei";

export default function Model(props) {
  const gltf = useLoader(GLTFLoader, "/assests/living_room.glb", draco());
  return gltf ? <primitive object={gltf.scene} /> : null;
}