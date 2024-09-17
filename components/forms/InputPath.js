export function startingX(input){
  const newPath = input.split(/(?<=[mMqQcCtTsSlLvVhH].*?(?=[mMqQcCtTsSlLhHvV]))/);
  const command = newPath[0];  
  const splitCommand = command.split(/\D/).filter(Boolean);
  const startingX = Number(splitCommand[0])
  return startingX;
}

export function startingY(input){
  const newPath = input.split(/(?<=[mMqQcCtTsSlLvVhH].*?(?=[mMqQcCtTsSlLhHvV]))/);
  const command = newPath[0];  
  const splitCommand = command.split(/\D/).filter(Boolean);
  const startingY = Number(splitCommand[1])
  return startingY;
}

export function convertToPathArray(input){
  const newPath = input.split(/(?<=[mMqQcCtTsSlLvVhH].*?(?=[mMqQcCtTsSlLhHvV]))/);
  const pathArray = []
  newPath.map((command, i) => {
    if(i===0){
      const splitCommand = command.split(/\D/).filter(Boolean);
      const pathSegment = {
        type: 'M',
        commandId: i,
        startPoint: {
          x: Number(splitCommand[0]),
          y: Number(splitCommand[1])
        },
        endPoint: {
          x: 0,
          y: 0
        }
      };
      pathArray.push(pathSegment);
    }else if(i===1){
      const splitCommand = command.split(/\D/).filter(Boolean);
      const start = newPath[0].split(/(\d*,\d*)/).filter(Boolean);
      const startX = start[1].split(",")[0];
      const startY = start[1].split(",")[1];
      let dx1, dy1, dx2, dy2, endX, endY;
      if (splitCommand.length===6){
        dx1 = splitCommand[0];
        dy1 = splitCommand[1];
        dx2 = splitCommand[2];
        dy2 = splitCommand[3];
        endX = splitCommand[4];
        endY = splitCommand[5];
        const pathSegment = {
          type: command.split("")[0],
          commandId: i+1,
          startPoint: {
            x: Number(startX),
            y: Number(startY)
          },
          firstControl: {
            x: Number(dx1),
            y: Number(dy1)
          },
          secondControl: {
            x: Number(dx2),
            y: Number(dy2)
          },
          endPoint: {
            x: Number(endX),
            y: Number(endY)
          }
        };
        pathArray.push(pathSegment);
      } else if (splitCommand.length===4){
        dx1 = splitCommand[0];
        dy1 = splitCommand[1];
        endX = splitCommand[2];
        endY = splitCommand[3];
        const pathSegment = {
          type: command.split("")[0],
          commandId: i,
          startPoint: {
            x: Number(startX),
            y: Number(startY)
          },
          firstControl: {
            x: Number(dx1),
            y: Number(dy1)
          },
          endPoint: {
            x: Number(endX),
            y: Number(endY)
          }
        }
        pathArray.push(pathSegment);
      } else {
        endX = splitCommand[0];
        endY = splitCommand[1];
        const pathSegment = {
          type: command.split("")[0],
          commandId: i,
          startPoint: {
            x: Number(startX),
            y: Number(startY)
          },
          endPoint: {
            x: Number(endX),
            y: Number(endY)
          }
        }
        pathArray.push(pathSegment);
      }
    }else {
      const splitCommand = command.split(/\D/).filter(Boolean);
      const previousStart = pathArray[i-1].startPoint;
      const previousEnd = pathArray[i-1].endPoint;
      const startX = Number(previousStart.x) + Number(previousEnd.x);
      const startY = Number(previousStart.y) + Number(previousEnd.y);
      if (splitCommand.length===6){
        const pathSegment = {
          type: command.split("")[0],
          commandId: i,
          startPoint: {
            x: Number(startX),
            y: Number(startY)
          },
          firstControl: {
            x: Number(splitCommand[0]),
            y: Number(splitCommand[1])
          },
          secondControl: {
            x: Number(splitCommand[2]),
            y: Number(splitCommand[3])
          },
          endPoint: {
            x: Number(splitCommand[4]),
            y: Number(splitCommand[5])
          }
        }
        pathArray.push(pathSegment);
      } else if (splitCommand.length===4){
        if(command.split("")[0]==='q'){
          const pathSegment = {
            type: command.split("")[0],
            commandId: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            firstControl: {
              x: Number(splitCommand[0]),
              y: Number(splitCommand[1])
            },
            endPoint: {
              x: Number(splitCommand[2]),
              y: Number(splitCommand[3])
            }
          }
          pathArray.push(pathSegment);
        } else {
          const pathSegment = {
            type: command.split("")[0],
            commandId: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            secondControl: {
              x: Number(splitCommand[0]),
              y: Number(splitCommand[1])
            },
            endPoint: {
              x: Number(splitCommand[2]),
              y: Number(splitCommand[3])
            }
          }
        pathArray.push(pathSegment);
        }
      } else {
        const pathSegment = {
          type: command.split("")[0],
          commandId: i,
          startPoint: {
            x: Number(startX),
            y: Number(startY)
          },
          endPoint: {
            x: Number(splitCommand[0]),
            y: Number(splitCommand[1])
          }
        }
        pathArray.push(pathSegment);
      }
    }
  })
  return pathArray
}