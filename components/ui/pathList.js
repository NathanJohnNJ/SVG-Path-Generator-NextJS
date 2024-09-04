import { path } from "@/lib/store";
import { useSnapshot, subscribe } from "valtio";

const PathList = async () => {
  const snap = useSnapshot(path.commands);

  return (
    <div className="flex flex-col justify-center items-center">
      <ul>
        {snap.map((command) => (
          <li key={command._id} class="p-5">
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
            {
              command.type==='q' || command.type==='c' ?
              <div>
                <h2>
                  ControlPoints:
                </h2>
                <h2>
                  d1: Relative: ({command.controlPoints[0].d1.x}, {command.controlPoints[0].d1.y}) Absolute: ({command.controlPoints[0].d1.x+command.startPoint.x}, {command.controlPoints[0].d1.y+command.startPoint.y})
                </h2>
                {
                  command.type==='c' ? 
                  <h2>
                    d2: Relative: ({command.controlPoints[1].d2.x}, {command.controlPoints[1].d2.y}) Absolute: ({command.controlPoints[1].d2.x+command.startPoint.x}, {command.controlPoints[1].d2.y+command.startPoint.y})
                  </h2>
                  :
                  <></>
                }
              </div>
              :
              <></>
            }
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