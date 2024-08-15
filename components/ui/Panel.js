'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { geologicaSharp, poppins } from '@/styles/fonts';
import { View, Text, StyleSheet } from 'react-native-web';

 const borderAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

export const StyledPanel = styled.div`
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 18px;
  animation: ${borderAnimation} 6s infinite linear running;
  margin: 2px;
  background:
    padding-box,
    conic-gradient(
      from var(--bg-angle) in hsl longer hue, white, lightgrey, #cfc4ba, darkgrey, #fdb, grey, dimgrey, #cfc4ba, grey, lightgrey, white)
    border-box; 
    border: 4px solid transparent;
    &:hover {
      animation-play-state: paused;
    }
`

export const Article = styled.div`
  color: #0010a0;
  font-size: 3vw;
  font-weight: 575;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`
export const Heading = styled.h2`
  color: #0010a0;
  font-weight: 650;
  text-align: center;
`

export const RainbowPanel = ({children}, props) => {
  return(
    <StyledPanel>
      <Article className={poppins.className}>
      <Heading className={geologicaSharp.className} style={styles(props).heading}>{props.heading}</Heading>
        {children}
      </Article>
    </StyledPanel>
  )
}

const styles = (props) => StyleSheet.create({
  sidePanel:{
      padding: 22,
      borderRadius: 18,
      boxShadow: '-2px 2px 8px #9c9c9c',
      margin: 10,
      height: props.height,
      width: props.width  
  },
  heading: {
      fontSize: 17.5,
      marginTop: -5,
      marginBottom: 5,
      textAlign: 'center'
  }
})