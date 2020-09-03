import React, {useRef, useMemo, useEffect} from 'react';
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import {extend, useThree, useFrame} from 'react-three-fiber';
import { AdditiveBlendingShader, VolumetricLightShader } from './helper'


extend({EffectComposer, ShaderPass, FXAAShader});

export const SunEffect = (props) => {
    const DEFAULT_LAYER = 0
    const OCCLUSION_LAYER = 1

    const { gl, scene, camera, size } = useThree()
    const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
    const occlusionComposer = useRef()
    const composer = useRef()
  
    useEffect(() => {
      occlusionComposer.current.setSize(size.width, size.height)
      composer.current.setSize(size.width, size.height)
    }, [size])
  
    useFrame(() => {
      camera.layers.set(OCCLUSION_LAYER)
      occlusionComposer.current.render()
      camera.layers.set(DEFAULT_LAYER)
      composer.current.render()
    }, 1);
  
    return (
      <React.Fragment>
        <mesh layers={OCCLUSION_LAYER} position={props.position}>
          <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
          <meshBasicMaterial attach="material" />
        </mesh>
        <effectComposer ref={occlusionComposer} args={[gl, occlusionRenderTarget]} renderToScreen={false}>
          <renderPass attachArray="passes" args={[scene, camera]} />
          <shaderPass attachArray="passes" args={[VolumetricLightShader]} needsSwap={false} />
        </effectComposer>
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" args={[scene, camera]} />
          <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} />
          <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
        </effectComposer>
      </React.Fragment>
    )
  }