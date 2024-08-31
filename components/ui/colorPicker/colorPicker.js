'use client';
import Container from './components/container';
import Wrapper from './components/wrapper';
// name, toUpdate, newValue

const ColorPicker = (props) => {
  const { color, element, setModalIsOpen } = props;


  return(
    <Container>
      <Wrapper color={color} element={element} setModalIsOpen={setModalIsOpen}/>
    </Container>
  )
}

export default ColorPicker;