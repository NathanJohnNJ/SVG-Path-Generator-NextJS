'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Hex from '../outputs/hex';
import RGB from '../outputs/rgb';
import SaveButton from '../buttons/saveButton';
import CancelButton from '../buttons/cancelButton';
import { StyleSheet } from 'react-native-web';

const PresetView = (props) => {
  const { setModalIsOpen, colors, selectedColor, setSelectedColor, onSaveHandler, element, property, currentColor } = props;

  return(
    <>
      <div className="flex gap-3 flex-wrap justify-center my-4">
        {colors.map((color, i) => {
          return(
          <button key={i} onClick={() => setSelectedColor(color)} className="relative flex justify-center items-center" >
            <div className='w-6 h-6 border-none rounded-full z-10' style={styles(color).colour}  />
            <AnimatePresence mode="wait">
              {selectedColor === color && ( 
                <motion.div className="z-0 w-7 h-7 ring-2 ring-blue-500 absolute rounded-full" transition={{
                  type: 'spring', 
                  duration: 0.3, 
                  bounce: 0.2
                }}
                initial={{ opacity: 0, scale: 0.6 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.6 }} />
              )}
            </AnimatePresence>
          </button>)
        })}
      </div>
      <div className="flex justify-between relative">
        <div className="flex flex-col justify-between gap-1">
          <RGB color={selectedColor} currentColor={currentColor} />
          <Hex color={selectedColor} currentColor={currentColor} />
        </div>
        <div className="mt-7 absolute flex right-0 gap-2">
        <CancelButton color={selectedColor} setModalIsOpen={setModalIsOpen} />
        <SaveButton color={selectedColor} setModalIsOpen={setModalIsOpen} onClickHandle={onSaveHandler} element={element} property={property}/>
        </div> 
      </div>
    </>
  )
}

 export default PresetView;

 const styles = (color) => StyleSheet.create({
  colour: {
    backgroundColor: color
  }
 })