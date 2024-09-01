'use client';
import React, { useState } from 'react';
import { poppins } from '@/styles/fonts';
import { View, Text, Pressable, TextInput, Modal, StyleSheet } from 'react-native-web';
import Image from 'next/image';
import FieldSet from '../Fieldset';
import ColorPicker from '../colorPicker/colorPicker';
import Title from '../../layouts/title';
import { Article, ConfigHeading, ConfigStyledDiv } from './Panels';
import {  stroke, strokeActions, fill, fillActions, control, controlActions, end, endActions, resetConfig } from '@/lib/store';
import { useSnapshot } from 'valtio';

const ConfigPanel = (props) => {
  const strokeSnap = useSnapshot(stroke);
  const fillSnap = useSnapshot(fill);
  const controlSnap = useSnapshot(control);
  const endSnap = useSnapshot(end);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [element, setElement] = useState('');
  const [currentColor, setCurrentColor] = useState();
  const [hover, setHover] = useState({x: false, change: false, edit: false, can: false, resetStroke: false, resetFill: false, resetControl: false, resetEnd: false});
  const [openSection, setOpenSection] = useState('');

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false, edit: false, can: false, resetStroke: false, resetFill: false, resetControl: false, resetEnd: false})
    }
    function openModal(title, color, toUpdate){
        setModalTitle(title);
        setCurrentColor(color);
        setElement(toUpdate)
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
        setUpdateFunc(null);
        setCurrentColor();
        setModalTitle('');
    }
    
    function opacityUp(type){
      if (type==="stroke"){
      if(strokeSnap.opacity<1){
          const newOpacity = strokeSnap.opacity + 0.05;
          strokeActions.setOpacity(newOpacity);    
        } else {
          strokeActions.setOpacity(1);  
        }
      } else if (type==="fill"){
        if(fillSnap.opacity<1){
          const newOpacity = fillSnap.opacity + 0.05;
          fillActions.setOpacity(newOpacity);    
        } else {
          fillActions.setOpacity(1);  
        }
      } else if (type==="control"){
        if(controlSnap.opacity<1){
          const newOpacity = controlSnap.opacity + 0.05;
          controlActions.setOpacity(newOpacity);    
        } else {
          controlActions.setOpacity(1);  
        }
      } else if (type==="end"){
        if(endSnap.opacity<1){
          const newOpacity = endSnap.opacity + 0.05;
          endActions.setOpacity(newOpacity);    
        } else {
          endActions.setOpacity(1);  
        }
      }
    }
    function opacityDown(type){
      if (type==="stroke"){
      if(strokeSnap.opacity>0){
        const newOpacity = strokeSnap.opacity - 0.05;
        strokeActions.setOpacity(newOpacity);    
        } else {
          strokeActions.setOpacity(0);  
        }
      } else if (type==="fill"){
        if(fillSnap.opacity>0){
          const newOpacity = fillSnap.opacity - 0.05;
          fillActions.setOpacity(newOpacity);    
        } else {
          fillActions.setOpacity(0);  
        }
      } else if (type==="control"){
        if(controlSnap.opacity>0){
          const newOpacity = controlSnap.opacity - 0.05;
          controlActions.setOpacity(newOpacity);    
        } else {
          controlActions.setOpacity(0);  
        }
      } else if (type==="end"){
        if(endSnap.opacity>0){
          const newOpacity = endSnap.opacity - 0.05;
          endActions.setOpacity(newOpacity);    
        } else {
          endActions.setOpacity(0);  
        }
      }
    }
    function sizeUp(type){
      if(type==='control'){
        if(controlSnap.size<10){
          const newSize = controlSnap.size + 1;
          controlActions.setSize(newSize);     
        } else {
          controlActions.setSize(10);   
        }
      }else {
        if(endSnap.size<10){
          const newSize = endSnap.size + 1;
          endActions.setSize(newSize);     
        } else {
          endActions.setSize(10);   
        }
      }
    };
    function downSize(type){
      if(type==='control'){
        if(controlSnap.size>0){
          const newSize = controlSnap.size - 1;
          controlActions.setSize(newSize);     
        } else {
          controlActions.setSize(0);   
        }
      }else {
        if(endSnap.size>0){
          const newSize = endSnap.size - 1;
          endActions.setSize(newSize);     
        } else {
          endActions.setSize(0);   
        }
      }
    }
  return(
    <>
    <ConfigStyledDiv id="configPanel" style={styles.panel} colour={props.colour}>
      <Article className={poppins.className}>
      <ConfigHeading color="red">{props.heading}</ConfigHeading>

        {/****** STROKE SECTION ******/}
        <View style={styles.strokeSection}>
          <FieldSet width={160} label="Stroke" fontSize={15} labelColor={strokeSnap.color} labelBgColor={strokeSnap.highlight} borderColor={strokeSnap.highlight}>
          {
          openSection === 'stroke'

          ?
          
          <View>
            <View style={styles.attSection}>
              <p style={styles.attribute} className="text-slate-700">
                Colour:{"  "}
              </p>
              <Pressable style={[styles.color, {backgroundColor:strokeSnap.color}]} onPress={() => openModal('Stroke Colour', strokeSnap.color, 'stroke.color')} />
            </View>
          

            <View style={styles.attSection}>
              <Text style={styles.attribute}>
                Highlight Colour:{"  "}
              </Text>
              <Pressable style={[styles.color, {backgroundColor:strokeSnap.highlight}]} onPress={() => openModal('Stroke Highlight Colour', strokeSnap.highlight, 'stroke.highlight')} />
            </View>
          

            <View style={styles.attSection}>
              <Text style={styles.attribute}>
                Width: 
              </Text>
              <TextInput
              onChangeText={strokeActions.setWidth}
              value={strokeSnap.width}
              inputMode="numeric"
              style={styles.textInput} />
            </View>
          

            <View style={styles.attSection}>
              <Text style={styles.attribute}>
                Opacity: 
              </Text>
              <Pressable style={styles.upDown} onPress={()=>opacityDown('stroke')}>
                <Image
                src="/images/down.svg"
                width={24}
                height={24}
                className="m-2"
                alt="Down arrow"
                />
              </Pressable>
              <Text style={styles.opacity}>
                {Math.round( ( strokeSnap.opacity+Number.EPSILON ) * 100 ) / 100}
              </Text>
              <Pressable style={styles.upDown} onPress={()=>opacityUp('stroke')}>
                <Image
                src="/images/up.svg"
                width={24}
                height={24}
                className="m-2"
                alt="Up arrow"
                />
              </Pressable>
            </View>
          
          
            <View style={styles.resetSection}>
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
              <Image
              src="/images/up.svg"
              width={24}
              height={24}
              alt="Up arrow"
              />
            </Pressable>
            <Pressable style={hover.resetStroke?styles.cancelHover:styles.cancel} onPress={strokeActions.reset} onMouseOver={() => hoverFunc('resetStroke')} onMouseLeave={resetHover}>
              <h2 className="font-sans" style={hover.resetStroke?styles.cancelHoverText:styles.cancelText} onMouseOver={() => hoverFunc('resetStroke')} onMouseLeave={resetHover}>
                RESET
              </h2>
            </Pressable>
          </View>
      
          </View>
          
          :
          
          <View>
            <Pressable style={styles.upDown} onPress={()=>setOpenSection('stroke')}>
            <Image
                src="/images/down.svg"
                width={24}
                height={24}
                alt="Down arrow"
                />
            </Pressable>
          </View>
          }
          </FieldSet>
        </View>
        {/* END OF STROKE SECTION */}
        
        
        {/****** FILL SECTION ******/}
        <View style={styles.strokeSection}>
          <FieldSet width={160} fontSize={15} label="Fill" labelColor={fillSnap.color} labelBgColor={fillSnap.highlight} borderColor={fillSnap.highlight} >
          {
            openSection === 'fill'
            ?
            <View>
            <View style={styles.attSection}>
            <Text style={styles.attribute}>
              Colour:{"  "}
            </Text>
            <Pressable style={[styles.color, {backgroundColor:fillSnap.color}]} onPress={() => openModal('Fill Colour', fillSnap.color, 'fill.color')} />
          </View>
          
          <View style={styles.attSection}>
            <Text style={styles.attribute}>
              Highlight Colour:{"  "}
            </Text>
            <Pressable style={[styles.color, {backgroundColor:fillSnap.highlight}]} onPress={() => openModal('Fill Highlight Colour', fillSnap.highlight, 'fill.highlight')} />
          </View>
          
          
          <View style={styles.attSection}>
            <Text style={styles.attribute}>
              Opacity: 
            </Text>
            <Pressable style={styles.upDown} onPress={() => opacityDown('fill')}>
            <Image
                src="/images/down.svg"
                width={24}
                height={24}
                className="m-2"
                alt="Down arrow"
                />
            </Pressable>
            <Text style={styles.opacity}>{Math.round( ( fillSnap.opacity+Number.EPSILON ) * 100 ) / 100}</Text>
            <Pressable style={styles.upDown} onPress={() => opacityUp('fill')}>
              <Image
              src="/images/up.svg"
              width={24}
              height={24}
              className="m-2"
              alt="Up arrow"
              />
            </Pressable>
          </View>

          <View style={styles.resetSection}>
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
              <Image
              src="/images/up.svg"
              width={24}
              height={24}
              alt="Up arrow"
              />
            </Pressable>
            <Pressable style={hover.resetFill?styles.cancelHover:styles.cancel} onPress={fillActions.reset} onMouseOver={() => hoverFunc('resetFill')} onMouseLeave={resetHover}>
              <h2 className="font-sans" style={hover.resetFill?styles.cancelHoverText:styles.cancelText} onMouseOver={() => hoverFunc('resetFill')} onMouseLeave={resetHover}>
                RESET
              </h2>
            </Pressable>
          </View>
        </View>
        
        :
        
        <View>
          <Pressable style={styles.upDown} onPress={() => setOpenSection('fill')}>
          <Image
          src="/images/down.svg"
          width={24}
          height={24}
          alt="Down arrow"
          />
          </Pressable>
        </View>
        }
      </FieldSet>
    </View>
    {/****** END OF FILL SECTION ******/}
    
    
    {/****** CONTROL SECTION ******/}
    <View style={styles.strokeSection}>
      <FieldSet width={160} fontSize={15} label="Control Points" labelColor="white" labelBgColor={controlSnap.color} borderColor={controlSnap.color}>
      {
      openSection === 'control'
      ?
      <View>
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Colour:{"  "}
          </Text>
          <Pressable style={[styles.color, {backgroundColor:controlSnap.color}]} onPress={() => openModal('Control Point Colour', controlSnap.color, 'control.color')} />
        </View>
        
        
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Opacity: 
          </Text>
          <Pressable style={styles.upDown} onPress={()=>opacityDown('control')}>
            <Image
              src="/images/down.svg"
              width={24}
              height={24}
              className="m-2"
              alt="Down arrow"
              />
          </Pressable>
          <Text style={styles.opacity}>{Math.round( (controlSnap.opacity+Number.EPSILON ) * 100 ) / 100}</Text>
          <Pressable style={styles.upDown} onPress={()=>opacityUp('control')}>
            <Image
                src="/images/up.svg"
                width={24}
                height={24}
                className="m-2"
                alt="Up arrow"
                />
          </Pressable>
        </View>
        
        
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Size: 
          </Text>
          <Pressable style={styles.upDown} onPress={()=>downSize('control')}>
            <Image
                src="/images/down.svg"
                width={24}
                height={24}
                className="m-2"
                alt="Down arrow"
                />
          </Pressable>  
          <Text style={styles.opacity}>{Math.round( ( controlSnap.size + Number.EPSILON ) * 100 ) / 100}</Text>
          <Pressable style={styles.upDown} onPress={()=>sizeUp('control')}>
            <Image
            src="/images/up.svg"
            width={24}
            height={24}
            className="m-2"
            alt="Up arrow"
            />
          </Pressable>
        </View>
        
        <View style={styles.resetSection}>
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
              <Image
              src="/images/up.svg"
              width={24}
              height={24}
              alt="Up arrow"
              />
            </Pressable>
            <Pressable style={hover.resetControl?styles.cancelHover:styles.cancel} onPress={controlActions.reset} onMouseOver={() => hoverFunc('resetControl')} onMouseLeave={resetHover}>
              <h2 className="font-sans" style={hover.resetControl?styles.cancelHoverText:styles.cancelText} onMouseOver={() => hoverFunc('resetControl')} onMouseLeave={resetHover}>
                RESET
              </h2>
            </Pressable>
          </View>
      </View>
    
      :
    
      <View>
        <Pressable style={styles.upDown} onPress={() => setOpenSection('control')}>
          <Image
          src="/images/down.svg"
          width={24}
          height={24}
          alt="Down arrow"
          />
        </Pressable>
      </View>
      }
      </FieldSet>
    </View>
    {/****** END OF CONTROL SECTION ******/}
    
    {/****** END POINT SECTION ******/}
    <View style={styles.strokeSection}>
      <FieldSet width={160} fontSize={15} label="End Points" labelColor="white" labelBgColor={endSnap.color} borderColor={endSnap.color}>
      {
      openSection === 'end'
      ?
      <View>
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Colour:{"  "}
          </Text>
          <Pressable style={[styles.color, {backgroundColor:endSnap.color}]} onPress={() => openModal('End Point Colour', endSnap.color, 'end.color')} />
        </View>
      
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Opacity: 
          </Text>
          <Pressable style={styles.upDown} onPress={()=>opacityDown('end')}>
            <Image
            src="/images/down.svg"
            width={24}
            height={24}
            className="m-2"
            alt="Down arrow"
            />
          </Pressable>
          <Text style={styles.opacity}>{Math.round( ( endSnap.opacity+Number.EPSILON ) * 100 ) / 100}</Text>
          <Pressable style={styles.upDown} onPress={()=>opacityUp('end')}>
            <Image
            src="/images/up.svg"
            width={24}
            height={24}
            className="m-2"
            alt="Up arrow"
            />
          </Pressable>
        </View>
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Size: 
          </Text>
          <Pressable style={styles.upDown} onPress={()=>downSize('end')}>
            <Image
            src="/images/down.svg"
            width={24}
            height={24}
            className="m-2"
            alt="Down arrow"
            />
          </Pressable>
            <Text style={styles.opacity}>{Math.round( ( endSnap.size + Number.EPSILON ) * 100 ) / 100}</Text>
            <Pressable style={styles.upDown} onPress={()=>sizeUp('end')}>
              <Image
              src="/images/up.svg"
              width={24}
              height={24}
              className="m-2"
              alt="Up arrow"
              />
            </Pressable>
          </View>
          
          <View style={styles.resetSection}>
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
              <Image
              src="/images/up.svg"
              width={24}
              height={24}
              alt="Up arrow"
              />
            </Pressable>
            <Pressable style={hover.resetEnd?styles.cancelHover:styles.cancel} onPress={endActions.reset} onMouseOver={() => hoverFunc('resetEnd')} onMouseLeave={resetHover}>
              <h2 className="font-sans" style={hover.resetEnd?styles.cancelHoverText:styles.cancelText} onMouseOver={() => hoverFunc('resetEnd')} onMouseLeave={resetHover}>
                RESET
              </h2>
            </Pressable>
          </View>
        </View>
      
      :
      
      <View>
        <Pressable style={styles.upDown} onPress={()=> setOpenSection('end')}>
          <Image
          src="/images/down.svg"
          width={24}
          height={24}
          alt="Down arrow"
          />
        </Pressable>
      </View>
    }
    </FieldSet>
  </View>
  {/****** END OF END POINT SECTION ******/}
        <Pressable style={hover.can?styles.cancelHover:styles.cancel} onPress={resetConfig} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover}>
          <h2 className="font-sans" style={hover.can?styles.cancelHoverText:styles.cancelText} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover}>
            RESET ALL
          </h2>
        </Pressable>
        
      </Article>
    </ConfigStyledDiv>
    <Modal
    animationType="slide"
    transparent={false}
    visible={modalIsOpen}
    onRequestClose={closeModal}
    >
      <Title title={`Colour Picker - ${modalTitle}`} />
      <View style={styles.colorModal}>
        <View style={styles.pickerView}>
          <ColorPicker color={currentColor} element={element} setModalIsOpen={setModalIsOpen} />
        </View>
      </View>
    </Modal>
    </>
  )
};

export default ConfigPanel;

const styles = StyleSheet.create({
  panel:{
    padding: 4,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    margin: 10,
    marginRight: 35,
    height: 'fit-content',
    maxWidth: '250px',
    width: 'max-content',
    display: 'flex'
  },
  strokeSection:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  sectionTitle: {
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 6,
    marginBottom: 10
  },
  attSection:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  resetSection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  attribute: {
    fontSize: 16,
  },
  color: {
    width: 20,
    height: 20,
    margin: 5,
    borderRadius: 5
  },
  colorModal: {
    display: 'flex',
    flexDirection:'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 100
  },
  gridView: {
    display: 'flex',
    margin: 5
  },
  pickerView: {
    display: 'flex',
    margin: 5
  },
  textInput:{
    width: 30,
    marginLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    borderRadius: 6,
    textAlign: 'center',
    marginBottom: 5
  },
  cancel: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:'fit-content',
    height:25,
    padding:5,
    backgroundColor: '#d4d4d4',
    boxShadow: '-1px 1px 1px #333',
    borderRadius: 6,
    margin:5,
  },
  cancelText: {
    color:'#cc1402',
    textShadow: '-0.6px -0.5px 1px #681402',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelHover: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:'fit-content',
    height:25,
    padding:5,
    borderRadius: 6,
    boxShadow: '-1px 1px 1px #777',
    backgroundColor: '#d4d4d4',
    cursor: 'pointer',
    margin:5,
  },
  cancelHoverText:{
    color:'#aa1402',
    textShadow: 'inset -0.6px -0.5px 1px #681402',
    fontSize: 18,
    textAlign: 'center',
    justifySelf:'center'
  },
  openClose: {
    marginTop: 8,
    marginLeft: 8
  }
})