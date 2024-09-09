import { path } from "@/lib/store";
import { useSnapshot } from "valtio";

const PathList = () => {
  const snap = useSnapshot(path.commands);
  
  return (
    <div className="flex flex-col justify-center items-center">
      <ul>
        {snap.map((command) => (
          <li key={command.commandId} class="p-5">
            <div className="flex justify-between">
              <h2>
                Type: {command.type}
              </h2>
              <h2>
                ID: {command.commandID}
              </h2>
            </div>
            <h2>
              StartPoint: ({command.startPoint.x}, {command.startPoint.y})
            </h2>
            {command.type==='q' || command.type==='c' ?
            <div>
              <h2>
                ControlPoints:
              </h2>
              <h2>
                d1: Relative: ({command.firstControl.x}, {command.firstControl.y}) Absolute: ({command.firstControl.x+command.startPoint.x}, {command.firstControl.y+command.startPoint.y})
              </h2>
              {
                command.type==='c' || command.type==='s'? 
                <h2>
                  d2: Relative: ({command.secondControl.x}, {command.secondControl.y}) Absolute: ({command.secondControl.x+command.startPoint.x}, {command.secondControl.y+command.startPoint.y})
                </h2>
                :
                <></>
              }
            </div>
            :
            <></>}
            <h2>
              Relative EndPoint: ({command.endPoint.x}, {command.endPoint.y})
            </h2>
            <h2>
              Absolute EndPoint: ({command.endPoint.x+command.startPoint.x}, {command.endPoint.y+command.startPoint.y})
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PathList;