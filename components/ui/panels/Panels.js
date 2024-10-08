'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { poppins } from '@/styles/fonts';
import { StyleSheet } from 'react-native-web';
import Title from '@/components/layouts/title';

 const borderAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

export const StyledDiv = styled.div`
  width: 65vw;
  height: auto;
  @property --bg-angle {
    inherits: false;
    initial-value: 0deg;
    syntax: "<angle>";
  }
    border-radius: 18px;
    animation: ${borderAnimation} 30s infinite linear running;
    background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, lightgrey, darkgrey, rgba(139, 90, 99, 0.39), grey, dimgrey, rgba(158, 97, 118, 0.54), grey, lightgrey, white);
`
export const PresetsHeading = ({children}) => {
  return(
  <Heading className="font-sans" style={{color: 'rgba(160, 0, 192, 0.54)', fontSize: '25px'}}>
    {children}
  </Heading>
  )
}

export const Article = styled.div`
  color: #0010a0;
  font-size: 3vw;
  font-weight: 575;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 18px;
`;

export const PresetsPanel = ({children}) => {
  <StyledDiv style={styles.presetOuterDiv}>
    <Article style={styles.presetArticle}>
      <PresetsHeading>Preset</PresetsHeading>
      <div style={styles.presetDiv}>
      {children}
      </div>
    </Article>
  </StyledDiv>
};

export const Heading = styled.h2`
font-size: 35px;
  font-weight: 550;
  text-align: center;
`;

// export const Panel = ({children}, props) => {
//   return(
//     <StyledDiv style={styles(props).panel}>
//       <Article className={poppins.className}>
//         <Heading className="font-sans" style={styles(props).heading}>
//           {props.heading}
//         </Heading>
//         {children}
//       </Article>
//     </StyledDiv>
//   )
// };

export const CommandHeading = ({children}) => {
  return(
  <Heading className="font-sans" style={{color: 'rgb(249 168 212)', fontSize: '25px'}}>
    {children}
  </Heading>
  )
}

export const CommandStyledDiv = styled.div`
width: 100%;
@property --bg-angle {
inherits: false;
initial-value: 0deg;
syntax: "<angle>";
}
border-radius: 5%;
animation: ${borderAnimation} 40s infinite linear running;
background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, darkgrey, lightgrey, #F6E0EF, lightgrey, #FCC3D9, lightgrey, white); 
`
const CommandArticle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #eee;
  border-radius: 18px;
  padding: 10px;
`

export const CommandStyledPanel = ({children}, props) => {
  return(
    <CommandStyledDiv style={styles(props).panel}>
      <CommandArticle>
        <CommandHeading>Commands</CommandHeading>
        <div style={{display: 'flex'}}>
          {children}
        </div>
      </CommandArticle>
    </CommandStyledDiv>
  )
};


const InfoStyledDiv = styled.div`
width: 25vw;
@property --bg-angle {
inherits: false;
initial-value: 0deg;
syntax: "<angle>";
}
border-radius: 18px;
animation: ${borderAnimation} 40s infinite linear running;
background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, darkgrey, lightgrey, #FF3EEF, lightgrey, #DD5AE9, lightgrey, white);
`

export const InfoStyledPanel = ({children}, props) => {
  return(
    <InfoStyledDiv style={styles(props).panel}>
      <CommandArticle>
        <Heading className="font-sans" style={{color: 'rgb(209 90 220)', fontSize: '25px'}}>
          Info
        </Heading>
        <div style={{display: 'flex'}}>
          {children}
        </div>
      </CommandArticle>
    </InfoStyledDiv>
  )
};

export const ConfigHeading = ({children}) => {
  return(
  <Heading className="font-sans" style={{color: 'rgb(75, 245, 175)', marginLeft:'10px', fontSize: '28px'}}>
    {children}
  </Heading>
  )
};
export const ConfigArticle = styled.div`
  color: #0010a0;
  font-weight: 575;
  display: flex;
  height: 100%;
  width: max-content;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 18px;
  padding-bottom: 5px;
`;

export const ConfigStyledDiv = styled.div`
width: max-content;
height: 100%;
@property --bg-angle {
inherits: false;
initial-value: 0deg;
syntax: "<angle>";
}
animation: ${borderAnimation} 40s infinite linear running;
background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, lightgrey, darkgrey, #bfd, darkgrey, #bacfc4, lightgrey, white);
`;

const HorizontalStyledDiv = styled.div`
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  height: 90vh;
  width: 90vw;
  overflow: hidden
  border-radius: 2px;
  animation: ${borderAnimation} 40s infinite linear running;
  background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, lightgrey, darkgrey, #fdb, grey, dimgrey, #cfc4ba, grey, lightgrey, white); 
`;

const HorizontalArticle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  border-radius: 18px;
  padding: 10px;
  height: 100%;
  width: 100%;
`;

const SmallHorizontalArticle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  border-radius: 18px;
  padding: 10px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const HorizontalPanel = ({children}, props) => {
  return(
    <HorizontalStyledDiv style={styles(props).horizontalPanel}>
      <HorizontalArticle >
      <Title title="Path" />
        <div className="flex flex-col md:flex-row" >
        {children}
        </div>
      </HorizontalArticle>
    </HorizontalStyledDiv>
  )
};

export const SmallHorizontalPanel = ({children}, props) => {
  return(
    <HorizontalStyledDiv style={styles(props).horizontalPanel}>
      <SmallHorizontalArticle >
      <Title title="Path" />
        <div className="flex flex-col md:flex-row" >
        {children}
        </div>
      </SmallHorizontalArticle>
    </HorizontalStyledDiv>
  )
};

 const Border = styled.div`
  border-radius: 5%;
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  animation: ${borderAnimation} 40s infinite linear running;
  background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, lightgrey, darkgrey, #3192f6, grey, dimgrey, #1206bf, grey, lightgrey, white); 
  box-shadow: -2px 2px 4px 1px rgba(0,0,0,0.4)
`
export const GridBorder =({children}, props)=> {
  return (
    <Border style={styles(props).gridPanel}>
      <Article>
        {children}
      </Article>
    </Border>
  )
}

const styles = (props) => StyleSheet.create({
  panel:{
    padding: 4,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    margin: 5,
    height: 'max-content',
    width: 'fit-content',
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row'
  },
  horizontalPanel:{
    padding: 4,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    height: '90vh',
    width:'90vw'
  },
  gridPanel: {
    padding: 4,
    width: 'fit-content'
  },
  
});