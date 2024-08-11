'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { geologicaSharp } from '@/styles/fonts';

 const rainbowAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

export const Rainbow = styled.div`
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 18px;
  animation: ${rainbowAnimation} 6s infinite linear running;
  margin: 5px;
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

export const Article = styled.div`
  color: #0010a0;
  font-size: 3vw;
  font-weight: 575;
  text-align:left;
  padding-left: 2vw;
  border-radius: 18px;
  background-color: #898989;
`


export const RainbowPanel = ({children}) => {
  return(
      <Rainbow>
          <Article className={geologicaSharp.className}>
            {children}
          </Article>
      </Rainbow>
  )
}