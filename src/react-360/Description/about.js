import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components'

const TextureBall = (props) => {
  return(
    <button className="btn btn-outline-light btn-circle m-1" ><img  src={props.texture} onClick={() => props.click(props.texture)} alt="texture" className=" rounded-circle" width="100" height="100" style={{"pointerEvents": "all"}} /></button>

  )
}

const About = (props) => {
  
    return (
      <React.Fragment>
        <UpperLeft  >
        Lounge {props.furniture}
        <p><b>------------------------</b></p>
        <small><i> {props.furniture === "sofa"? "274 x 94 x 83 cm" : "100 x 94 x 97 cm"}</i></small>
       
      </UpperLeft>
      <Global />
      <LowerMid>
        select different texture:
        {props.textures.map((furniture, index) => (
          
          <TextureBall key={index} texture={furniture.texture} click={props.ifClick} />
          ))}
          
      </LowerMid>
      </React.Fragment>
      
    )
  }

  export default About;

  const base = css`
  font-family: 'Teko', sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color:floralwhite ;
`

const UpperLeft = styled.div`
  ${base}
  top: 30px;
  left: 40px;
  font-size: 2em;
  pointer-events: all;
  cursor: pointer;
  & > small {
    margin: 0
    padding: 0
    font-size: 0.7em;
  }
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`
const LowerMid = styled.div`
  ${base}
  bottom: 50px;
  left: 550px;
  
  width: 300px;
  & > img {
    z-index: -1;
  }
  & > h1 {
    margin: 0;
    font-size: 14em;
    line-height: 1em;
  }
  & > h2 {
    margin: 0;
    font-size: 4em;
    line-height: 1em;
  }
  @media only screen and (max-width: 900px) {
    bottom: 30px;
    & > h1 {
      font-size: 6em !important;
    }
    & > h2 {
      font-size: 3em !important;
    }
  }
`
const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow: hidden;
  }

  #root {
    overflow: auto;
    padding: 0px;
  }

  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
    color: black;
    background: white;
  }
`