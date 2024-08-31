'use client';
import Input from '../input';
import SaveButton from '../buttons/saveButton';
import CancelButton from '../buttons/cancelButton';
import { useState } from 'react';

const CustomView = (props) => {
  const { setModalIsOpen, selectedColor, setSelectedColor, colors, element, currentColor } = props;
  const [fullHex, setFullHex] = useState('#');
  const [showColor, setShowColor] = useState(false);

  function hexHandler(){
    const hexInput = document.getElementById('hexInput');
    if (hexInput.value.length>6){
      hexInput.value = hexInput.value.slice(0,6);
    } else if (hexInput.value.length===6){
      setFullHex(`#${hexInput.value}`);
      setShowColor(true);
      setSelectedColor(fullHex);
    } else {
      setShowColor(false);
    }
  }
  function rHandler(){
    try{
    const r = document.getElementById('rInput');
    const b = document.getElementById('bInput');
    if(r.value>255){
      r.value=255;
    }
    b.value ? bHandler() : null
  } catch(error){
    console.log(error)
  }
  }
  function gHandler(){
    try{
      const r = document.getElementById('rInput');
      const g = document.getElementById('gInput');
      const b = document.getElementById('bInput');
      if(g.value>255){
        g.value=255;
      }
      b.value && r.value ? bHandler() : null
    } catch(error){
      console.log(error)
    }
  }
  function bHandler(){
    try{
      const r = document.getElementById('rInput');
      const g = document.getElementById('gInput')
      const b = document.getElementById('bInput');
      if(b.value>255){
        b.value=255;
      }
      g.value && r.value ? saveColour() : null
    } catch(error){
      console.log(error)
    }
  }

  function saveHandler(){
    colors.map((color) => {
      if (color.hex === fullHex){
        setSelectedColor(color);
      }
    })
  }
  return (
    <div className="relative flex my-4 items-center">
      <div className="flex flex-col gap-1 items-center">
        <Input label="HEX" onChangeHandler={() => hexHandler()} id="hexInput" />
        <Input label="R" onChangeHandler={() => rHandler()} id="rInput" type="numeric" />
        <Input label="G" onChangeHandler={() => gHandler()} id="rInput" type="numeric" />
        <Input label="B" onChangeHandler={() => bHandler()} id="bInput" type="numeric" />
      </div>
      <div className="absolute top-4 right-0 h-16 w-16 rounded-2xl bg-transparent border-1 border-slate-200 border-double">
        {showColor ?
          <div style={{ backgroundColor: fullHex}} className="absolute top-4 right-0 h-16 w-16 rounded-2xl"/>
        :
          <></>
        }
      </div>
      <div className="absolute -bottom-4 right-0 flex gap-2">
        <CancelButton setModalIsOpen={setModalIsOpen} color={selectedColor} />
        <SaveButton setModalIsOpen={setModalIsOpen} color={selectedColor} element={element}/>
      </div>
    </div>
  )
}
export default CustomView;