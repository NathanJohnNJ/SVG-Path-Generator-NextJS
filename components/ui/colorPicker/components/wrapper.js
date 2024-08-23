'use client';
import { useState } from 'react';
import Tabs from './tabs/tabs';
import CustomView from './tabs/customView';
import PresetView from './tabs/presetView';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Preset', 'Custom'];
const colors = [
  '#FFFFFF',
  '#00FF00',
  '#00FFFF',
  '#FF00FF',
  '#FF0000',
  '#AAAAAA',
  '#CCCC00',
  '#005656',
  '#560056',
  '#560000',
  '#666666',
  '#003300',
  '#000056',
  '#330033',
  '#000000'
]

const Wrapper = (props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedColor, setSelectedColor] = useState('');
  const { setModalIsOpen, onSaveHandler, color, element, property } = props
  return (
    <>
      <Tabs
      tabs={tabs}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab} />

      <AnimatePresence mode="wait">
        {selectedTab === 'Preset' && (
          <motion.div key="preset" initial={{ x:-20,opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.4,type: 'spring', bounce: 0.2 }} >
            <PresetView setModalIsOpen={setModalIsOpen} colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} onSaveHandler={onSaveHandler} element={element} property={property} currentColor={color} />
          </motion.div>
        )}
        {selectedTab === 'Custom' && (
          <motion.div key="custom" initial={{ x:20,opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.4,type: 'spring', bounce: 0.2 }} >
            <CustomView setModalIsOpen={setModalIsOpen}  selectedColor={selectedColor} setSelectedColor={setSelectedColor} colors={colors} onSaveHandler={onSaveHandler} element={element} property={property} currentColor={color}/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Wrapper;