import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { fillActions, strokeActions, controlActions, endActions } from "@/lib/store";

const SaveButton = (props) => { 
  const { color, setModalIsOpen, element } = props;

  function saveColor(color){
    if(element==='stroke.color'){
      strokeActions.setColor(color);
    } else if(element==='stroke.highlight'){
      strokeActions.setHighlight(color);
    } else if (element==='fill.color'){
      fillActions.setColor(color);
    } else if(element==='fill.highlight'){
      fillActions.setHighlight(color);
    } else if (element==='control.color'){
      controlActions.setColor(color);
    } else if (element==='end.color'){
      endActions.setColor(color);
    }
    setModalIsOpen(false);
  }
  return ( 
    <div>
      <motion.button
      disabled={color === ''}
      whileTap={{ scale: 0.8}}
      className="rounded-full w-5.5 h-5.5 p-1 transition-colors duration-75"
      style={{
      backgroundColor: color === '' ? '#1e293b' : '#4dea25',
      color: color === '' ? '#64748b' : 'white',
      }}
      onClick={()=>saveColor(color)}>
        <Check className="w-4 h-4 " />
      </motion.button>
    </div>
  )
}

export default SaveButton;