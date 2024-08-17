'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { poppins } from '@/styles/fonts';
import { StyleSheet } from 'react-native-web';

 const borderAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

const StyledDiv = styled.div`
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 18px;
  animation: ${borderAnimation} 40s infinite linear running;
  background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, lightgrey, darkgrey, #fdb, grey, dimgrey, #cfc4ba, grey, lightgrey, white); 
  &:hover {
    animation-play-state: paused;
  }
`

const Article = styled.div`
  color: #0010a0;
  font-size: 3vw;
  font-weight: 575;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 18px;
  padding: 10px;
`
const Heading = styled.h2`
  color: #0010a0;
  font-weight: 650;
  text-align: center;
`

export const HorizontalPanel = ({children}, props) => {

  return(
    <StyledDiv style={styles(props).panel} colour={props.colour}>
      <Article className={poppins.className}>
        <Heading className="font-sans" style={styles(props).heading}>
          {props.heading}
        </Heading>
        {children}
      </Article>
    </StyledDiv>
  )
};
const styles = (props) => StyleSheet.create({
  panel:{
      padding: 4,
      borderRadius: 18,
      boxShadow: '-2px 2px 8px #9c9c9c',
      margin: 10,
      height: props.height,
      width: props.width,
  },
  heading: {
      fontSize: 17.5,
      marginTop: -5,
      marginBottom: 5,
      textAlign: 'center'
  }
});