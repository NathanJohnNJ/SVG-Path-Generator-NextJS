'use client';
import React from 'react';
import { poppins } from '@/styles/fonts';
import { StyleSheet } from 'react-native-web';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Modal } from 'react-native-web';
import Image from 'next/image';
import FieldSet from '../Fieldset';
import { updateConfig } from '@/lib/mongodb/config/mongodb';
import ColorPicker from '../colorPicker/colorPicker';
import Title from '../../layouts/title';
import Grid from '../Grid';
import Path from '../Path';
import { Article, ConfigHeading, ConfigStyledDiv } from './Panel';

const ConfigPanel = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [elementToChange, setElementToChange] = useState();
  const [propertyToChange, setPropertyToChange] = useState();
  const [currentColor, setCurrentColor] = useState()
  const [hover, setHover] = useState({x: false, change: false, edit: false, can: false});
  const [openSection, setOpenSection] = useState('');
  // const [modalConfig, setModalConfig] = useState({
  //   stroke: {
  //     color: '#000',
  //     width:5
  //   },
  //   fill: {
  //     example: 'string'
  //   }
  // })

  // const newModalConfig = { ...modalConfig, [stroke.color]: "#fff"}

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false, edit: false, can: false})
    }
    function openModal(title, element, property, color){
        setModalTitle(title);
        setElementToChange(element);
        setPropertyToChange(property);
        setCurrentColor(color);
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
        setElementToChange(null);
        setPropertyToChange(null);
        setCurrentColor();
    }

    const onSelectColor = (hex) => {
      updateConfig(elementToChange, propertyToChange, hex)
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
      if(props.strokeOpacity<1){
        const newOpacity = props.strokeOpacity + 0.05;
        props.setStrokeOpacity(newOpacity);    
      } else {
        props.setStrokeOpacity(1);  
      }
    }
    function down(){
      if(props.strokeOpacity>0){
        const newOpacity = props.strokeOpacity - 0.05;
        props.setStrokeOpacity(newOpacity);    
      } else {
        props.setStrokeOpacity(0);  
      }
    }
    function upFill(){
      if(props.fillOpacity<1){
        const newOpacity = Number(props.fillOpacity) + 0.05
        props.setFillOpacity(newOpacity);    
      } else {
        props.setFillOpacity(1);  
      }
    }
    function downFill(){
      if(props.fillOpacity>0){
        const newOpacity = Number(props.fillOpacity) - 0.05
        props.setFillOpacity(newOpacity);    
      } else {
        props.setFillOpacity(0);  
      }
    }
    function upSize(){
      if(props.controlSize<10){
        const newSize = props.controlSize + 1;
        props.setContolSize(newSize);     
      } else {
        props.setContolSize(10);   
      }
    }
    function downSize(){
      if(props.controlSize>0){
        const newSize = props.controlSize - 1;
        props.setContolSize(newSize);     
      } else {
        props.setContolSize(0);   
      }
    }
    function upControlOpacity(){
      if(props.controlOpacity<1){
        const newOpacity = Number(props.controlOpacity) + 0.05;
        props.setControlOpacity(newOpacity);      
      } else {
        props.setControlOpacity(1);      
      }
    }
    function downControlOpacity(){
      if(props.controlOpacity>0){
        const newOpacity = Number(props.controlOpacity) - 0.05;
        props.setControlOpacity(newOpacity);      
      } else {
        props.setControlOpacity(0);      
      }
    }
    function upEnd(){
      if(props.endSize<10){
        const newSize = props.endSize + 1;
        props.setEndSize(newSize);      
      } else {
        props.setEndSize(10);  
      }
    }
    function downEnd(){
      if(props.endSize>0){
        const newSize = props.endSize - 1;
        props.setEndSize(newSize);      
      } else {
        props.setEndSize(0);  
      }
    }
    function upEndOpacity(){
      if(props.endOpacity<1){
        const newOpacity = Number(props.endOpacity) + 0.05;
        props.setEndOpacity(newOpacity);      
      } else {
        props.setEndOpacity(1.0);  
      }
    }
    function downEndOpacity(){
      if(props.endOpacity>0){
        const newOpacity = Number(props.endOpacity) - 0.05;
        props.setEndOpacity(newOpacity);      
      } else {
        props.setEndOpacity(0.0);  
      }
    }
  return(
    <ConfigStyledDiv id="configPanel" style={styles.panel} colour={props.colour}>
      <Article className={poppins.className}>
      <ConfigHeading color="red">{props.heading}</ConfigHeading>

        {/****** STROKE SECTION ******/}
        <View style={styles.strokeSection}>
          <FieldSet label="Stroke" fontSize={15} labelColor={props.stroke.colour} labelBgColor={props.stroke.highlight} borderColor={props.stroke.highlight}>
          {
          openSection === 'stroke'

          ?
          
          <View>
            <View style={styles.attSection}>
              <p style={styles.attribute} className="text-slate-700">
                Colour:{"  "}
              </p>
              <Pressable style={[styles.color, {backgroundColor:props.stroke.colour}]} onPress={() => openModal('Stroke Colour', 'stroke', 'colour', props.stroke.colour)} />
            </View>
          

            <View style={styles.attSection}>
              <Text style={styles.attribute}>
                Highlight Colour:{"  "}
              </Text>
              <Pressable style={[styles.color, {backgroundColor:props.stroke.highlight}]} onPress={() => openModal('Stroke Highlight Colour', 'stroke', 'highlight', props.stroke.highlight)} />
            </View>
          

            <View style={styles.attSection}>
              <Text style={styles.attribute}>
                Width: 
              </Text>
              <TextInput
              onChangeText={props.setStrokeWidth}
              value={props.strokeWidth}
              inputMode="numeric"
              style={styles.textInput} />
            </View>
          

            <View style={styles.attSection}>
              <Text style={styles.attribute}>
                Opacity: 
              </Text>
              <Pressable style={styles.upDown} onPress={down}>
                <Image
                src="/images/down.svg"
                width={20}
                height={20}
                alt="Down arrow"
                />
              </Pressable>
              <Text style={styles.opacity}>
                {Math.round( ( Number(props.strokeOpacity) + Number.EPSILON ) * 100 ) / 100}
              </Text>
              <Pressable style={styles.upDown} onPress={up}>
              <Image
              src="/images/up.svg"
              width={20}
              height={20}
              alt="Up arrow"
              />
              </Pressable>
            </View>
          
          
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
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
            <Pressable style={styles.upDown} onPress={()=>setOpenSection('stroke')}>
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
        <View style={styles.strokeSection}>
          <FieldSet fontSize={15} label="Fill" labelColor={props.fill.colour} labelBgColor={props.fill.highlight} borderColor={props.fill.highlight} >
          {
            openSection === 'fill'
            
            ?
            
            <View>
            <View style={styles.attSection}>
            <Text style={styles.attribute}>
              Colour:{"  "}
            </Text>
            <Pressable style={[styles.color, {backgroundColor:props.fill.colour}]} onPress={() => openModal('Fill Colour', 'fill', 'colour', props.fill.colour)} />
          </View>
          
          
          <View style={styles.attSection}>
            <Text style={styles.attribute}>
              Highlight Colour:{"  "}
            </Text>
            <Pressable style={[styles.color, {backgroundColor:props.fill.highlight}]} onPress={() => openModal('Fill Highlight Colour', 'fill', 'highlight', props.stroke.colour)} />
          </View>
          
          
          <View style={styles.attSection}>
            <Text style={styles.attribute}>
              Opacity: 
            </Text>
            <Pressable style={styles.upDown} onPress={downFill}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
            </Pressable>
              <Text style={styles.opacity}>{Math.round( ( Number(props.fillOpacity) + Number.EPSILON ) * 100 ) / 100}</Text>
              <Pressable style={styles.upDown} onPress={upFill}>
              <Image
              src="/images/up.svg"
              width={20}
              height={20}
              alt="Up arrow"
              />
            </Pressable>
          </View>
          
          
          <View>
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
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
          <Pressable style={styles.upDown} onPress={() => setOpenSection('fill')}>
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
    <View style={styles.strokeSection}>
      <FieldSet fontSize={15} label="Control Points" labelColor="white" labelBgColor={props.control.colour} borderColor={props.control.colour}>
      {
      openSection === 'control'
    
      ?
    
      <View>
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Colour:{"  "}
          </Text>
          <Pressable style={[styles.color, {backgroundColor:props.controlColor}]} onPress={() => openModal('Control Point Colour', 'control', 'colour', props.controlColor)} />
        </View>
        
        
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Opacity: 
          </Text>
          <Pressable style={styles.upDown} onPress={downControlOpacity}>
            <Image
              src="/images/down.svg"
              width={20}
              height={20}
              alt="Down arrow"
              />
          </Pressable>
          <Text style={styles.opacity}>{Math.round( ( Number(props.controlOpacity) + Number.EPSILON ) * 100 ) / 100}</Text>
          <Pressable style={styles.upDown} onPress={upControlOpacity}>
            <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
          </Pressable>
        </View>
        
        
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Size: 
          </Text>
          <Pressable style={styles.upDown} onPress={downSize}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
          </Pressable>  
          <Text style={styles.opacity}>{Math.round( ( props.controlSize + Number.EPSILON ) * 100 ) / 100}</Text>
          <Pressable style={styles.upDown} onPress={upSize}>
            <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
          </Pressable>
        </View>
        
        <Pressable style={styles.openClose} onPress={() =>  setOpenSection('')}>
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
        <Pressable style={styles.upDown} onPress={() => setOpenSection('control')}>
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
    <View style={styles.strokeSection}>
      <FieldSet fontSize={15} label="End Points" labelColor="white" labelBgColor={props.end.colour} borderColor={props.end.colour}>
      {
      openSection === 'end'

      ?

      <View>
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Colour:{"  "}
          </Text>
          <Pressable style={[styles.color, {backgroundColor:props.end.colour}]} onPress={() => openModal('End Point Colour', 'end', 'colour', props.end.colour)} />
        </View>
      
      
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Opacity: 
          </Text>
          <Pressable style={styles.upDown} onPress={downEndOpacity}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
          </Pressable>
          <Text style={styles.opacity}>{Math.round( ( Number(props.endOpacity) + Number.EPSILON ) * 100 ) / 100}</Text>
          <Pressable style={styles.upDown} onPress={upEndOpacity}>
            <Image
            src="/images/up.svg"
            width={20}
            height={20}
            alt="Up arrow"
            />
          </Pressable>
        </View>
      
      
        <View style={styles.attSection}>
          <Text style={styles.attribute}>
            Size: 
          </Text>
          <Pressable style={styles.upDown} onPress={downEnd}>
            <Image
            src="/images/down.svg"
            width={20}
            height={20}
            alt="Down arrow"
            />
          </Pressable>
            <Text style={styles.opacity}>{Math.round( ( props.endSize + Number.EPSILON ) * 100 ) / 100}</Text>
            <Pressable style={styles.upDown} onPress={upEnd}>
              <Image
              src="/images/up.svg"
              width={20}
              height={20}
              alt="Up arrow"
              />
            </Pressable>
          </View>
          <View>
            <Pressable style={styles.openClose} onPress={() => setOpenSection('')}>
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
        <Pressable style={styles.upDown} onPress={()=> setOpenSection('end')}>
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
        <Pressable style={hover.can?styles.cancelHover:styles.cancel} onPress={reset} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover}>
          <h2 className="font-sans" style={hover.can?styles.cancelHoverText:styles.cancelText} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover}>
            RESET
          </h2>
        </Pressable>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalIsOpen}
        onRequestClose={closeModal}
        >
          <Title title={`Colour Picker - ${modalTitle}`} />
          <View style={styles.colorModal}>
            <View style={styles.pickerView}>
              <ColorPicker color={currentColor} element={elementToChange} property={propertyToChange} onSelectColor={onSelectColor} setModalIsOpen={setModalIsOpen} />
            </View>
            <View style={styles.gridView}>
              <Grid id="miniGrid" size={200} mainWidth={225}>
                <Path path={props.fullPath} fill={props.fillColor} fillOpacity={props.fillOpacity} strokeWidth={props.strokeWidth} stroke={props.strokeColor} size={250} />
              </Grid>
            </View>
          </View>
        </Modal>
      </Article>
    </ConfigStyledDiv>
  )
};

export default ConfigPanel;

const styles = StyleSheet.create({
  panel:{
    padding: 4,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    margin: 10
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
    marginTop: 25
  }
})