'use client';
import styled, { keyframes } from 'styled-components';
import { poppins } from '@/styles/fonts';
import { StyleSheet } from 'react-native-web';
import Title from "@/components/layouts/title";

 const borderAnimation = keyframes`
  to { --bg-angle: 360deg; }
`

const StyledDiv = styled.div`
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
  border-radius: 2px;
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ddd;
  border-radius: 18px;
  padding: 10px;
  height: 100%;
  width: 100%;
`

export const HorizontalPanel = ({children}, props) => {

  return(
    <StyledDiv style={styles.panel}>
      <Article className={poppins.className}>
      <Title title="Path" />
        <div className="flex flex-row w-full">
        {children}
        </div>
      </Article>
      </StyledDiv>
  )
};
const styles = StyleSheet.create({
  panel:{
      padding: 4,
      borderRadius: 18,
      boxShadow: '-2px 2px 8px #9c9c9c',
      margin: 10,
      height: '85vh',
      width:'70vw'
  }
});