import React, { Component, Suspense, useRef,useContext, useCallback, useEffect, useState, useMemo } from 'react';
import {Canvas, useThree, useFrame, extend} from 'react-three-fiber';
import  * as THREE from "three"
import { CubeTextureLoader } from "three";
//import { EffectComposer, Outline} from 'react-postprocessing';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import lerp from 'lerp';
// import { useSpring, animated } from 'react-spring'
// import { useDrag } from 'react-use-gesture'
import {OrbitControls} from 'drei';
import LivingRoom from './react-360/Living-Room/livingRoom2';
import Chair from './react-360/furniture/chair';
import Sofa from './react-360/furniture/Sofa';
import About from './react-360/Description/about';
import {furnitureTextures} from './react-360/Texture/texture'
import Texture from './react-360/Texture/texureMesh';
import {DescriptionButton} from './react-360/Description/description'



import './App.css';

extend({ EffectComposer, OutlinePass, ShaderPass, RenderPass})

const context = React.createContext()

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/assests/skybox/house/posx.jpg",
    "/assests/skybox/house/negx.jpg",
    "/assests/skybox/house/posy.jpg",
    "/assests/skybox/house/negy.jpg",
    "/assests/skybox/house/posz.jpg",
    "/assests/skybox/house/negz.jpg",
    
  ]);
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

const useHover = () => {
  const ref = useRef()
  const setHovered = useContext(context)
  const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
  const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
  return { ref, onPointerOver, onPointerOut }
}

const Outline = ({ children }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  const [hovered, set] = useState([])
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
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
          visibleEdgeColor="white"
          edgeStrength={50}
          edgeThickness={1}
        />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
      </effectComposer>
    </context.Provider>
  )
}

class App extends Component {
  state = { 
    ifClicked: false,
    furnitureTextures: [],
    sofaTexture: "/assests/sofa_type_1_albedo_1.png",
    chairTexture: "/assests/chair_type_1_albedo_2.png",
    selectedObject: null,
    ifRotate: false,
    ifFloor: false
  }

  ifRotateCamera = (boolean) => {
    this.setState({ifRotate: boolean})
  }

  onFurnitureClick = (furniture) =>{
    let textures = [];
    let object = null;

    if(furniture === "sofa"){
      textures = furnitureTextures.sofa;
      object = "sofa";
    }else if(furniture === "chair 1"){
      textures = furnitureTextures.chair1;
      object = "chair 1";
    }else if(furniture === "chair 2"){
      textures = furnitureTextures.chair1;
      object = "chair 2";
    }else{
      textures = null;
      object = null;
    }

    this.setState({
      ifClicked: true,
      furnitureTextures: textures,
      selectedObject: object
    })
  }

  onTextureClick = (texture) => {
    console.log("texture clicked", texture)
    switch(this.state.selectedObject) {
      case "sofa":
        this.setState({sofaTexture: texture});
        break;
      case "chair 1":
        this.setState({chairTexture: texture});
        break;
        case "chair 2":
          this.setState({chairTexture: texture});
          break;
      default:
        return null;
    }
    

  }

  onFloorHover = (bool) => {
    this.setState({ifFloor: bool})
  }

  onLivingRoomClick = () => {
    this.setState({ifClicked: false})
  }


  render() { 
    
    return ( 
      <React.Fragment>
        
        <Canvas resize={{scroll: false}} pixelRatio={window.devicePixelRatio} colorManagement shadowMap camera={{position: [-1.2,1.2,-2]}}>
                    {/* lights */}
                    <ambientLight position={[0,20,0]} intensity={1.1} />
                    <directionalLight 
                        castShadow color={0xf4db87}
                        position={[0.7,3,3.55]} intensity={2}
                        shadow-mapSize-width={1024} shadow-mapSize-height={1024} 
                        shadow-camera-far={50}
                        shadow-camera-left={-10} shadow-camera-right={10}
                        shadow-camera-top={10} shadow-camera-bottom={-10}
                    />
                    <pointLight position={[-1.5,5.5,-0.12]} color={0xfdf5e6} intensity={0.77} />
                    <pointLight position={[1.5,5.5,-0.12]} color={0xfdf5e6} intensity={0.77} />
                    <pointLight position={[-1.5,5.5,0.12]} color={0xfdf5e6} intensity={0.77} />
                    <pointLight position={[1.5,5.5,0.12]}  color={0xfdf5e6} intensity={0.77}/> 
                  
                    <Suspense fallback={null}>
                      <Outline>
                        <LivingRoom onClick={() => this.onLivingRoomClick()} onFloor={this.onFloorHover} />
                        <Chair position={[0.25, 0.05, -0.08]} url={this.state.chairTexture} hover={useHover} onClick={() => this.onFurnitureClick("chair 1")} cameraRotation={this.ifRotateCamera} ifRotateCamera={this.state.ifRotate} />
                        <Sofa position={[0.3, 0.1, -0.5]} url={this.state.sofaTexture} hover={useHover} onClick={() => this.onFurnitureClick("sofa")} cameraRotation={this.ifRotateCamera} ifRotateCamera={this.state.ifRotate} />
                        <Chair position={[-0.48, 0.05, 0.53]} rotation={[0,-1.58,0]} url={this.state.chairTexture} hover={useHover} onClick={() => this.onFurnitureClick("chair 2")} cameraRotation={this.ifRotateCamera} ifRotateCamera={this.state.ifRotate} />
                      </Outline>
                      {/* {this.state.ifFloor ? <CircledMouse />:null} */}
                      {/* <CircledMouse /> */}

                    </Suspense>
                    
                    {this.state.ifClicked?
                      this.state.furnitureTextures.map((furniture, index) => (
                        <Texture key={index} texture={furniture.texture}  click={this.onTextureClick} hover={useHover} />
                      )):
                      null

                    }

                    {/* <SunEffect position={[0.7,3,3.55]} /> */}

                    <Skybox />
                     
 
                    <OrbitControls enableZoom={false} rotateSpeed={1}  />
                </Canvas>
                <DescriptionButton />
                {this.state.ifClicked?
                <About furniture={this.state.selectedObject} textures={this.state.furnitureTextures} ifClick={this.onTextureClick} />: null
                }
                
                
      </React.Fragment>
     );
  }
}
 
export default App;