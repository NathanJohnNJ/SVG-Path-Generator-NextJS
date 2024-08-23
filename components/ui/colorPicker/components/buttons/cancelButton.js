import { X } from "lucide-react";
import { motion } from "framer-motion";

const CancelButton = (props) => { 
  const { color, setModalIsOpen } = props;
  return ( 
    <div>
      <motion.button
      whileTap={{ scale: 0.8}}
      className="rounded-full w-5.5 h-5.5 p-1 transition-colors duration-75"
      style={{
      backgroundColor: color === '' ? '#1e293b' : '#e50202',
      color: color === '' ? '#64748b' : 'white',
      }}
      onClick={() => setModalIsOpen(false)} >
        <X className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

export default CancelButton;