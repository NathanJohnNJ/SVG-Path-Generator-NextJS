'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { geologicaSharp, poppins } from '@/styles/fonts';
import { StyleSheet } from 'react-native-web';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Modal } from 'react-native-web';
import Image from 'next/image';
import FieldSet from '@njtd/react-native-fieldset-web';
import { updateConfig } from '@/lib/mongodb/config/mongodb';
// import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

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
  background:conic-gradient(from var(--bg-angle) in hsl longer hue, white, lightgrey, darkgrey, #bfd, darkgrey, #bacfc4, lightgrey, white); 
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
  justify-content: center;
  background-color: #eee;
  border-radius: 18px;
  padding: 10px;
`
const Heading = styled.h2`
  color: #0010a0;
  font-weight: 650;
  text-align: center;
`

export const ConfigPanel = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [attributeToChange, setAttributeToChange] = useState();
  const [hover, setHover] = useState({x: false, change: false, edit: false, can: false});
  const [showStroke, setShowStroke] = useState(false);
  const [showFill, setShowFill] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [showEndPoints, setShowEndPoints] = useState(false);

    function openSection(sectionName) {
      setShowStroke(sectionName === 'stroke');
      setShowFill(sectionName === 'fill');
      setShowControl(sectionName === 'control');
      setShowEndPoints(sectionName === 'endPoints');
    }
    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false, edit: false, can: false})
    }
    function openModal(title){
        setModalIsOpen(true)
        setModalTitle(title)
        setAttributeToChange(title)
    }

    function closeModal(){
        setModalIsOpen(false)
        setAttributeToChange()
    }

    const onSelectColor = ({ hex }) => {
        if (attributeToChange==='Stroke'){
            updateConfig('stroke', 'colour', hex)
        } else if (attributeToChange==='Fill'){
          updateConfig('fill', 'colour', hex)
        } else if (attributeToChange==='Control Points'){
          updateConfig('control', 'colour', hex)
        } else if (attributeToChange==='End Points'){
          updateConfig('end', 'colour', hex)
        } else if (attributeToChange==='Highlight'){
          updateConfig('stroke', 'highlight', hex)
      } else if (attributeToChange==='FillHighlight'){
        updateConfig('fill', 'highlight', hex)
    }
    }
    function reset(){
      updateConfig('stroke', 'width', 3);
      updateConfig('stroke', 'colour', '#444');
      updateConfig('stroke', 'opacity', '1.0');
      updateConfig('stroke', 'highlight', '#0ef');
      updateConfig('fill', 'colour', '#000');
      updateConfig('fill', 'opacity', '0.0');
      updateConfig('fill', 'highlight', '#0bd');
      updateConfig('control', 'colour', '#00f');
      updateConfig('control', 'opacity', '0.8');
      updateConfig('control', 'size', 5);
      updateConfig('end', 'colour', '#f00');
      updateConfig('end', 'opacity', '0.8');
      updateConfig('end', 'size', 5);
    }

    function up(){
        if(props.stroke[0].opacity<1){
            const newOpacity = props.stroke[0].opacity + 0.05;
            updateConfig('stroke', 'opacity', newOpacity);    
        } else {
          updateConfig('stroke', 'opacity', 1 );
        }
    }
    function down(){
        if(props.stroke[0].opacity>0){
            const newOpacity = props.stroke[0].opacity - 0.05;
            updateConfig('stroke', 'opacity', newOpacity);    
        } else {
          updateConfig('stroke', 'opacity', 0);
        }
    }
    function upFill(){
        if(props.fill[0].opacity<1){
            const newOpacity = Number(props.fill[0].opacity) + 0.05
            updateConfig('fill', 'opacity',  String(newOpacity));   
        } else {
          updateConfig('fill', 'opacity', 1);
        }
    }
    function downFill(){
        if(props.fill[0].opacity>0){
            const newOpacity = Number(props.fill[0].opacity) - 0.05
            updateConfig('fill', 'opacity',  String(newOpacity));      
        } else {
            updateConfig('fill', 'opacity', 0);
        }
    }
    function upSize(){
        if(props.control[0].size<10){
            const newSize = props.control[0].size + 1;
            updateConfig('control', 'size', newSize);     
        } else {
            updateConfig('control', 'size', 10);   
        }
    }
    function downSize(){
        if(props.control[0].size>0){
            const newSize = props.control[0].size - 1;
            updateConfig('control', 'size', newSize);     
        } else {
            updateConfig('control', 'size', 0);   
        }
    }
    function upCtrlOpacity(){
        if(props.control[0].opacity<1){
            const newOpacity = Number(props.control[0].opacity) + 0.05;
            updateConfig('control', 'opacity',  String(newOpacity));      
        } else {
            updateConfig('control', 'opacity', 1);      
        }
    }
    function downCtrlOpacity(){
        if(props.control[0].opacity>0){
            const newOpacity = Number(props.control[0].opacity) - 0.05;
            updateConfig('control', 'opacity',  String(newOpacity));      
        } else {
            updateConfig('control', 'opacity', 0);
        }
    }
    function upEnd(){
        if(props.end[0].size<10){
            const newSize = props.end[0].size + 1;
            updateConfig('end', 'size', newSize);      
        } else {
            updateConfig('end', 'size', 10);  
        }
    }
    function downEnd(){
        if(props.end[0].size>0){
            const newSize = props.end[0].size - 1;
            updateConfig('end', 'size', newSize);      
        } else {
            updateConfig('end', 'size', 0);  
        }
    }
    function upEndOpacity(){
        if(props.end[0].opacity<1){
            const newOpacity = Number(props.end[0].opacity) + 0.05;
            updateConfig('end', 'opacity', String(newOpacity));      
        } else {
            updateConfig('end', 'opacity', '1.0');    
        }
    }
    function downEndOpacity(){
        if(props.end[0].opacity>0){
            const newOpacity = Number(props.end[0].opacity) - 0.05;
            updateConfig('end', 'opacity',  String(newOpacity));      
        } else {
            updateConfig('end', 'opacity', '0.0');    
        }
    }
  return(
    <StyledDiv id="configPanel" style={styles(props).panel} colour={props.colour}>
      <Article className={poppins.className}>
      <Heading className="text-sky-400 font-sans underline decoration-wavy decoration-2" style={styles(props).heading}>{props.heading}</Heading>
        {/****** STROKE SECTION ******/}
        {/* // Needs: fontSize, labelColor, labelBackgroundColor, borderColor */}
        <View style={styles(props).strokeSection}>
          <FieldSet label="Stroke" labelColor={props.stroke[0].colour} labelBackgroundColor={props.stroke[0].highlight} borderColor={props.stroke[0].highlight}>
          {
          showStroke
          ?
          <View>
            <View style={styles(props).attSection}>
              <Text style={styles(props).attribute}>
                  Colour:
              </Text>
              <Pressable style={[styles(props).color, {backgroundColor:props.stroke[0].colour}]} onPress={() => openModal('Stroke')}></Pressable>
            </View>
            <View style={styles(props).attSection}>
              <Text style={styles(props).attribute}>
                Highlight Colour:
              </Text>
              <Pressable style={[styles(props).color, {backgroundColor:props.stroke[0].highlight}]} onPress={() => openModal('Highlight')}></Pressable>
            </View>
            <View style={styles(props).attSection}>
              <Text style={styles(props).attribute}>
                Width: 
              </Text>
              <TextInput
              onChangeText={(value)=>updateConfig('stroke', 'width', value)}
              value={String(props.stroke[0].width)}
              inputMode="numeric"
              style={styles(props).textInput} />
            </View>
            <View style={styles(props).attSection}>
              <Text style={styles(props).attribute}>
                Opacity: 
              </Text>
              <Pressable style={styles(props).upDown} onPress={down}>
                <Image
                src="/images/down.svg"
                width={20}
                height={20}
                alt="Down arrow"
                />
              </Pressable>
              <Text style={styles(props).opacity}>
                {props.stroke[0].opacity}
              </Text>
              <Pressable style={styles(props).upDown} onPress={up}>
              <Image
              src="/images/up.svg"
              width={20}
              height={20}
              alt="Up arrow"
              />
              </Pressable>
            </View>
            <Pressable style={styles(props).upDown} onPress={() => setShowStroke(showStroke => !showStroke)}>
            <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
            </Pressable>
          </View>
          :
          <View>
            <Pressable style={styles(props).upDown} onPress={openStroke}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
            </Pressable>
          </View>
          }
          </FieldSet>
        </View>
        {/* END OF STROKE SECTION */}
        {/****** FILL SECTION ******/}
        <View style={styles(props).strokeSection}>
          <FieldSet label="Fill" labelColor={props.fill[0].colour} labelBackgroundColor={props.fill[0].highlight} borderColor={props.fill[0].highlight} >
          {
            showFill
            ?
            <View>
            <View style={styles(props).attSection}>
            <Text style={styles(props).attribute}>
              Colour:
            </Text>
            <Pressable style={[styles(props).color, {backgroundColor:props.fill[0].colour}]} onPress={() => openModal('Fill')}></Pressable>
          </View>
          <View style={styles(props).attSection}>
            <Text style={styles(props).attribute}>
              Opacity: 
            </Text>
            <Pressable style={styles(props).upDown} onPress={downFill}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
            </Pressable>
              <Text style={styles(props).opacity}>{Math.round( ( props.fillOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
              <Pressable style={styles(props).upDown} onPress={upFill}>
              <Image
              src="/images/up.svg"
              width={20}
              height={20}
              alt="Up arrow"
              />
            </Pressable>
          </View>
          <View>
            <Pressable style={styles(props).upDown} onPress={() => setShowFill(showFill => !showFill)}>
            <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
            </Pressable>
          </View>
        </View>
        :
          <View>
            <Pressable style={styles(props).upDown} onPress={openFill}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
            </Pressable>
          </View>
        }
      </FieldSet>
    </View>
    {/****** END OF FILL SECTION ******/}
    {/****** CONTROL SECTION ******/}
    <View style={styles(props).strokeSection}>
      <FieldSet label="Control Points" 
      labelColor="white" labelBackgroundColor={props.control[0].colour} borderColor={props.control[0].colour}>
      {
      showControl
      ?
      <View>
        <View style={styles(props).attSection}>
          <Text style={styles(props).attribute}>
            Colour:
          </Text>
          <Pressable style={[styles(props).color, {backgroundColor:props.controlCol}]} onPress={() => openModal('Control Points')}></Pressable>
        </View>
      <View style={styles(props).attSection}>
        <Text style={styles(props).attribute}>
          Opacity: 
        </Text>
        <Pressable style={styles(props).upDown} onPress={downCtrlOpacity}>
          <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
        </Pressable>
        <Text style={styles(props).opacity}>{Math.round( ( props.ctrlOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
        <Pressable style={styles(props).upDown} onPress={upCtrlOpacity}>
          <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
        </Pressable>
      </View>
          <View style={styles(props).attSection}>
                            <Text style={styles(props).attribute}>
                                Size: 
                            </Text>
                            <Pressable style={styles(props).upDown} onPress={downSize}>
                                <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
                            </Pressable>
                            <Text style={styles(props).opacity}>{Math.round( ( props.controlSize + Number.EPSILON ) * 100 ) / 100}</Text>
                            <Pressable style={styles(props).upDown} onPress={upSize}>
            <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
                            </Pressable>
                        </View>
                        <Pressable style={styles(props).upDown} onPress={() => setShowControl(showControl => !showControl)}>
                        <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
                        </Pressable>
                    </View>
                    :
                    <View>
                        <Pressable style={styles(props).upDown} onPress={openControl}>
                        <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
                        </Pressable>
                    </View>
                    }
                    </FieldSet>
                </View>
                {/****** END OF CONTROL SECTION ******/}
                {/****** END POINT SECTION ******/}
                <View style={styles(props).strokeSection}>
                    <FieldSet label="End Points" labelColor="white" labelBackgroundColor={props.end[0].colour} borderColor={props.end[0].colour}>
                    {
                        showEndPoints
                        ?
                        <View>
                        <View style={styles(props).attSection}>
                        <Text style={styles(props).attribute}>
                            Colour:
                        </Text>
                        <Pressable style={[styles(props).color, {backgroundColor:props.endCol}]} onPress={() => openModal('End Points')}></Pressable>
                    </View>
                    <View style={styles(props).attSection}>
                        <Text style={styles(props).attribute}>
                            Opacity: 
                        </Text>
                        <Pressable style={styles(props).upDown} onPress={downEndOpacity}>
                        <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
                        </Pressable>
                        <Text style={styles(props).opacity}>{Math.round( ( props.endOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
                        <Pressable style={styles(props).upDown} onPress={upEndOpacity}>
                        <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
                        </Pressable>
                    </View>
                    <View style={styles(props).attSection}>
                        <Text style={styles(props).attribute}>
                            Size: 
                        </Text>
                        <Pressable style={styles(props).upDown} onPress={downEnd}>
                        <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
                        </Pressable>
                        <Text style={styles(props).opacity}>{Math.round( ( props.endSize + Number.EPSILON ) * 100 ) / 100}</Text>
                        <Pressable style={styles(props).upDown} onPress={upEnd}>
                        <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles(props).upDown} onPress={() => setShowEndPoints(showEndPoints => !showEndPoints)}>
                        <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
                        </Pressable>
                    </View>
                    </View>
                    :
                    <View>
                        <Pressable style={styles(props).upDown} onPress={openEndPoints}>
                        <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
                        </Pressable>
                    </View>
                    }
                    </FieldSet>
                    </View>
                    {/****** END OF END POINT SECTION ******/}
            <Pressable style={hover.can?styles(props).cancelHover:styles(props).cancel} onPress={reset} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover}>
                <Text style={hover.can?styles(props).cancelHoverText:styles(props).cancelText} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover}>RESET</Text>
            </Pressable>
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalIsOpen}
    onRequestClose={closeModal}
    >
      <View style={styles(props).colorModal}>
        <View style={styles(props).titleSection}>
          <Text style={styles(props).modalTitle}>
              Colour Picker - {modalTitle}
          </Text>
          <Pressable style={hover.x?styles(props).closeHover:styles(props).close} onPress={closeModal} onMouseOver={() => hoverFunc('x')} onMouseLeave={resetHover}>
            <Text style={hover.x?styles(props).closeTextHover:styles(props).closeText}>
              X
            </Text>
          </Pressable>
        </View>
        <View>
          {/* <ColorPicker style={{ width: '70%' }} value={props.stroke} onComplete={onSelectColor}>
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
            </ColorPicker> */}
            </View>
          </View>
        </Modal>
      </Article>
    </StyledDiv>
  )
}

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
  },
  strokeSection:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
},
sectionTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 6,
    marginBottom: 10
},
fieldSet:{
    backgroundColor: '#a2a2a2',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
attSection:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
},
attribute: {
    fontFamily: 'Quicksand-Light',
    fontSize: 16,
},
color: {
    width: 20,
    height: 20,
    margin: 5,
},
textInput:{
    width: 30,
    marginLeft: 10,
    backgroundColor: '#fff',
    fontFamily: 'Quicksand-Light',
    fontSize: 16,
    borderRadius: 6,
    textAlign: 'center',
    marginBottom: 5
},
close: {
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height:25,
  width: 'fit-content',
  backgroundColor: '#6c6c6c',
  borderRadius: 6,
  margin: 15,
  padding: 5,
  borderColor: '#681402',
  borderWidth: 2,
  textAlign: 'center',
  fontFamily: 'Quicksand-Regular',
  fontSize: 18,
  color:'#681402',
},
closeHover: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:'fit-content',
    height:25,
    backgroundColor: '#681402',
    borderRadius: 6,
    margin: 15,
    padding: 5,
    borderColor: '#fff',
    borderWidth: 2,
    textAlign: 'center',
    textShadow: '-1px 1px 1px #fff',
},
closeText: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color:'#681402',
    textShadow: '-1px 1px 1px #681402'
},
closeTextHover: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color:'#fff',
    textShadow: '-1px 1px 1px #fff',
},
cancel: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width:'fit-content',
    height:25,
    padding:3,
    backgroundColor: '#6c6c6c',
    borderColor: '#681402',
    borderWidth: 2,
    borderRadius: 6,
    margin:5,
  },
  cancelText: {
    color:'#681402',
    textShadow: '-1px 1px 1px #681402',
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelHover: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width:'fit-content',
    height:25,
    padding:3,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: '#681402',
    cursor: 'pointer',
    margin:5,
  },
  cancelHoverText:{
    color:'#fff',
    textShadow: '-1px 1px 1px #fff',
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    textAlign: 'center',
  }
})