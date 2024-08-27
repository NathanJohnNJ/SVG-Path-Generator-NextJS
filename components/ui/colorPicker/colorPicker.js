'use client';
import Container from './components/container';
import Wrapper from './components/wrapper';
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