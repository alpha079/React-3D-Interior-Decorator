
import React, { useRef, useEffect, useMemo, useState, useContext, useCallback } from "react"
import { Vector2 } from "three"
import {  extend, useFrame, useThree } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"


extend({ OrbitControls, EffectComposer, RenderPass, OutlinePass, ShaderPass })



export const useHover =()=> {
  const ref = useRef()
  const setHovered = useContext(context)
  const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
  const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
  return { ref, onPointerOver, onPointerOut }
}



const context = React.createContext()
export const Outline = ({ children }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  const [hovered, set] = useState([])
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <context.Provider value={set}>
      {children}
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <outlinePass
          attachArray="passes"
          args={[aspect, scene, camera]}
          selectedObjects={hovered}
          //camera={{ position: [2, 2, 2] }}
          visibleEdgeColor="white"
          edgeStrength={10}
          edgeThickness={-0.0000001}
        />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
      </effectComposer>
    </context.Provider>
  )
}

export default Outline;


