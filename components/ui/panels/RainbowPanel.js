'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

 const rainbowAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

const Rainbow = styled.div`
width: fit-content;
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 18px;
  animation: ${rainbowAnimation} 12s infinite linear running;
  margin: 2px;
  background:
    padding-box,
    conic-gradient(
      from var(--bg-angle) in oklch longer hue,
      oklch(1 0.37 0) 0 0
    )
    border-box; 
    border: 6px solid transparent;
    &:hover {
      animation-play-state: paused;
    }
`
const PresetsArticle = styled.div`
  color: #0010a0;
  font-size: 12;
  font-weight: 575;
  text-align:left;
  padding-left: 18px;
  padding-right: 5px;
  border-radius: 18px;
  padding-top: 5px;
  background-color: #eee;
  padding-bottom: 10px;
  width: min-content;
`
export const PresetsRainbowPanel = ({children}, props) => {
  return(
    <Rainbow style={props.style}>
      <PresetsArticle style={props.style}>
        {children}
      </PresetsArticle>
    </Rainbow>
  )
};

const RainbowArticle = styled.div`
  color: #0010a0;
  font-size: 12;
  font-weight: 575;
  text-align:left;
  padding-left: 18px;
  padding-right: 5px;
  border-radius: 18px;
  min-height: 192px;
  background-color: #898989;
  padding-bottom: 10px;
`




export const RainbowPanel = ({children}, props) => {
  return(
    <Rainbow style={props.outerStyle}>
      <RainbowArticle style={props.style}>
          {children}
      </RainbowArticle>
    </Rainbow>
  )
};



const ButtonRainbow = styled.div`
display: flex;
width: min-content;
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 18px;
  animation: ${rainbowAnimation} 4s infinite linear running;
  animation-play-state: paused;
  margin: 2px;
  background:
    padding-box,
    conic-gradient(
      from var(--bg-angle) in oklch longer hue,
      oklch(1 0.37 0) 0 0
    )
    border-box; 
    border: 3px solid transparent;
    &:hover {
      animation-play-state: running;
    }
`
const Button = styled.button`
  color: #0010a0;
  font-size: 18px;
  text-align:center;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 18px;
  background-color: #ddd;
  opacity: 0.75;
  box-shadow: -1px 0.5px 0.5px 1px rgba(70, 70, 70, 0.85);
  &:hover {
    opacity: 0.95;
    box-shadow: none;
  };
`
function hoverHandle(){
  const layer1 = document.getElementById("layer1");
  const layer2 = document.getElementById("layer2");
  layer1.classList.add("spin");
  layer2.classList.add("spin");
}
function hoverReset(){
  const layer1 = document.getElementById("layer1");
  const layer2 = document.getElementById("layer2");
  layer1.classList.remove("spin");
  layer2.classList.remove("spin");
}

export const RainbowButton = ({children}) => {
  return(
    <div className="group relative p-3 m-2 w-full" onMouseOver={hoverHandle} onMouseLeave={hoverReset} >
      <ButtonRainbow className="group absolute top-[5px] left-[30%] z-10">
        <Button className="font-serif tracking-widest uppercase text-center whitespace-nowrap">                    
          {children}
        </Button>
      </ButtonRainbow>
      <ButtonRainbow className="absolute animate-none top-[5px] left-[30%] group-hover:scale-105 group-hover:animate-wiggler group-hover:transition-scale-150 duration-300" id="layer1">
        <Button className="font-serif tracking-widest uppercase text-center whitespace-nowrap">                    
        <div className="invisible">          
          {children}
          </div> 
        </Button>
      </ButtonRainbow>
      <ButtonRainbow className="absolute animate-none top-[5px] left-[30%] group-hover:scale-105 group-hover:animate-antiWiggler" id="layer2">
        <Button className="font-serif tracking-widest uppercase text-center whitespace-nowrap">
          <div className="invisible">          
          {children}
          </div>
        </Button>
      </ButtonRainbow>
    </div>
  )
}