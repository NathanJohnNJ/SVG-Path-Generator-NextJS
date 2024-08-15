import { getPath } from "@/lib/mongodb/path/mongodb";
import PathFromArray from "@/components/ui/pathFromArray";
import Grid from '@/components/ui/Grid';
import Title from "@/components/layouts/title";
import { getAllConfig } from "@/lib/mongodb/config/mongodb";

const ViewPath = async () => {
  const path = await getPath();
  const config = await getAllConfig();
  const stroke = config.stroke[0].parameters;
  const fill = config.fill[0].parameters;
  const control = config.control[0].parameters;
  const end = config.end[0].parameters;

  const fullPath = path.map((command) => {
        if (command.type==='c'){
          return(
            `${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.controlPoints[1].d2.x},${command.controlPoints[1].d2.y} ${command.endPoint.x},${command.endPoint.y}`
          )
        } else if (command.type==='q'){
          return(
            `${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.endPoint.x},${command.endPoint.y}`
          )
        } else if (command.type==='s'){
          return(
            `${command.type}${command.controlPoints[0].d2.x},${command.controlPoints[0].d2.y} ${command.endPoint.x},${command.endPoint.y}`
          )
        } else if (command.type==='h'){
          return(
            `${command.type}${command.endPoint.x}`
          )
        } else if (command.type==='v'){
          return(
            `${command.type}${command.endPoint.y}`
          )
        }else{
          return(
            `${command.type}${command.endPoint.x},${command.endPoint.y}`
          )
        }
      });
      const finalPath = `M50,50${fullPath}`
  return (
    <div className="flex flex-col justify-center items-center">
      <Title title="Path" />
      <h2>Full Path: {finalPath}</h2>
      <Grid id="mainGrid" size={400} mainWidth={450}>
        <PathFromArray path={path} fill={fill} stroke={stroke} size={400} />
      </Grid>
    </div>
  );
};


export default ViewPath;