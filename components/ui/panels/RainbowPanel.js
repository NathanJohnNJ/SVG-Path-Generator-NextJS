'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

 const rainbowAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

const Rainbow = styled.div`
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 18px;
  animation: ${rainbowAnimation} 6s infinite linear running;
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


const PresetsArticle = styled.div`
  color: #0010a0;
  font-size: 12;
  font-weight: 575;
  text-align:left;
  padding-left: 18px;
  padding-right: 5px;
  border-radius: 18px;
  padding-top: 5px;
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

export const PresetsRainbowPanel = ({children}, props) => {
  return(
    <Rainbow style={props.style}>
      <PresetsArticle style={props.style}>
          {children}
      </PresetsArticle>
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

export const RainbowButton = ({children}) => {
  return(
    <ButtonRainbow>
      <Button className="font-serif tracking-widest uppercase text-center ">                    
        {children}
      </Button>
    </ButtonRainbow>
  )
}