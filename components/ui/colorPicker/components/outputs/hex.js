const Hex = (props) => {
  const { color, currentColor } = props;
  let bgColor;
  color?bgColor=color:bgColor=currentColor
  return (
    <div className="flex justify-center items-center w-32 text-xs
    rounded-md py-1.5 border h-6" style={{borderColor: `${bgColor}`}} >
      <span className="flex justify-center items-center  text-slate-400 mr-2 py-1.5 px-4 w-10 h-6 rounded-tl-md rounded-bl-md" style={{backgroundColor: `${bgColor}`}}>HEX</span> 
      <span className="w-20 text-left ml-3 text-slate-300">{color?color:currentColor}</span>
    </div>
  )
};

export default Hex;

// let rgbColour;
// color?rgbColour=hexRgb(color, {format: 'array'}):rgbColour=rgbColour=hexRgb(currentColor, {format: 'array'});
// let bgColour;
// color?bgColour=color:bgColour=currentColor
// return (
//   <div className="flex justify-center items-center w-28 text-xs
//   rounded-md py-1.5 px-1 border border-slate-700 h-6" style={{backgroundColor: `${bgColour}`}}>
//     <span className="text-slate-500 ">RGB</span>
//     <span className="w-20 text-center text-slate-300 whitespace-nowrap">{`(${rgbColour[0]}, ${rgbColour[1]}, ${rgbColour[2]})`}</span> 
//   </div>