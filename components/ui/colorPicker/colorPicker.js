'use client';
import { useState } from 'react';
import Button from './components/buttons/button';
import Container from './components/container';
import Wrapper from './components/wrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { updateConfig } from '@/lib/mongodb/config/mongodb';
// name, toUpdate, newValue

const ColorPicker = (props) => {
  const { color, onSelectColor, element, property, setModalIsOpen } = props;


  return(
    <Container>
      <Wrapper color={color} element={element} property={property} onSaveHandler={onSelectColor} setModalIsOpen={setModalIsOpen}/>
    </Container>
  )
}

export default ColorPicker;