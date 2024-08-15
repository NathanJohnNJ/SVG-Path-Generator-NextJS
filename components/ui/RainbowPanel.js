'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { geologicaSharp, poppins } from '@/styles/fonts';

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

export const Article = styled.div`
  color: #0010a0;
  font-size: 12;
  font-weight: 575;
  text-align:left;
  padding-left: 2vw;
  padding-right: 5px;
  border-radius: 18px;
  background-color: #898989;
`
export const Heading = styled.h2`
  color: #0010a0;
  font-weight: 650;
  text-align: center;
`
export const RainbowPanel = ({children}, props) => {
  return(
    <Rainbow>
      <Article>
        <Heading className={geologicaSharp.className}>{props.heading}</Heading>
        <div className={poppins.className}>
          {children}
        </div>
      </Article>
    </Rainbow>
  )
}