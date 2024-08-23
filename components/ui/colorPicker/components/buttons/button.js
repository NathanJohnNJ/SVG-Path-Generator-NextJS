import { motion } from "framer-motion";
import clsx from "clsx";
import { Palette } from "lucide-react";
import { StyleSheet } from "react-native-web";

const Button = (props) => {
  const { openColorPicker, setOpenColorPicker, backgroundColor } = props;

  return (
    <motion.button onClick={() => setOpenColorPicker(!openColorPicker)} whileTap={{ scale: 0.9 }} className={clsx("h-9 w-9 flex justify-center items-center rounded-full border border-slate-600 p-2 relative transition-colors duration-75 drop-shadow-lg", openColorPicker ? 'text-slate-200' : 'text-slate-400')} style={styles(backgroundColor).button}>
      <Palette className="w-5 h-5" />
    </motion.button>
  )
};

export default Button;

const styles = (color) => StyleSheet.create({
  button: {
    backgroundColor: color
  }
})