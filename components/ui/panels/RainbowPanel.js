'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { geologicaSharp, poppins, gothic } from '@/styles/fonts';

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
`

const Heading = styled.h2`
  color: #0010a0;
  font-weight: 650;
  text-align: center;
`
export const RainbowPanel = ({children}, props) => {
  return(
    <Rainbow>
      <RainbowArticle>
        <Heading className={geologicaSharp.className}>{props.heading}</Heading>
        <div className={poppins.className}>
          {children}
        </div>
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

export const RainbowButton = ({children}, props) => {
  return(
    <ButtonRainbow>
      <Button className="font-serif tracking-widest uppercase text-center ">                    
        {children}
      </Button>
    </ButtonRainbow>
  )
}