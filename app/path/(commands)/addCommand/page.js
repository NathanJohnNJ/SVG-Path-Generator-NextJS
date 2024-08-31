// CANNOT IMPORT THINGS FROM REACT OR NATIVE SO BUILD COMPONENTS TO IMPORT

import Title from "@/components/layouts/title";
import { CommandStyledDiv } from "@/components/ui/panels/Panels";
import { Q, C, S, T } from '@/components/commands/curves';
import { L, V, H } from '@/components/commands/lines';
import { path, addToPath, fill, stroke, control, end } from '@/lib/store'; 

const AddCommand =  async () => {

  // function displayExtras(){
  //   if ( path[path.length-1].type==="q" || path[path.length-1].type==="t"){
  //     return(
  //       <T path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} end={end} />
  //     )
  //   } else if(path[path.length-1].type==="c"){
  //     return(
  //       <S path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} control={control} end={end} />
  //     )
  //   } else {}
  // }

  return (
    <CommandStyledDiv className="flex flex-row justify-center items-center">
      <Title title="Add Command..." />
        <div className="flex flex-row">
          <C path={path} setPath={addToPath} pathID={path.commands.length} stroke={stroke} fill={fill} control={control} end={end} />
          {/* <Q path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} control={control} end={end} />
          <H path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} end={end} />
          <L path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} end={end} />
          <V path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} end={end} /> */}
        </div>
        {/* <div className="flex flex-row">
          {displayExtras()}
          <Z path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} fullCommand={fullCommand}/>
        </div>  
        */}
      </CommandStyledDiv>
  )
};

export default AddCommand;