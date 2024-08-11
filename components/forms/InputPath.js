'use client';
import React, { useState } from "react";
import  Button  from "../ui/Button";

const InputPath = () => {
  const [path, setPath] = useState([]);
  const [input, setInput] = useState('');


  function clickHandle(){
    const newPath = input.split(/(?<=[mMqQcCtTsSlLvVhH].*?(?=[mMqQcCtTsSlLhHvV]))/);
    newPath.map((command, i) => {
      if(i===0){
        const splitCommand = command.split(/\D/).filter(Boolean);
        let pathArray = [];
        pathArray.push({
          type: 'm',
          id: i,
          endPoint: {
            x: Number(splitCommand[0]),
            y: Number(splitCommand[1])
          }
        })
      setPath(pathArray)
      }else if(i===1){
        const splitCommand = command.split(/\D/).filter(Boolean);
        const start = newPath[i-1].split(/(\d*\,\d*)/).filter(Boolean);
        const startPoint = start[start.length-1];
        const startX = startPoint.split(",")[0];
        const startY = startPoint.split(",")[1];
        let dx1, dy1, dx2, dy2, endX, endY;
        if (splitCommand.length===6){
          dx1 = splitCommand[0];
          dy1 = splitCommand[1];
          dx2 = splitCommand[2];
          dy2 = splitCommand[3];
          endX = splitCommand[4];
          endY = splitCommand[5];
          pathArray.push({
            type: command.split("")[0],
            id: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            controlPoints: {
              dx1: Number(dx1),
              dy1: Number(dy1),
              dx2: Number(dx2),
              dy2: Number(dy2)
            },
            endPoint: {
              x: Number(endX),
              y: Number(endY)
            }
          })
        } else if (splitCommand.length===4){
          dx1 = splitCommand[0];
          dy1 = splitCommand[1];
          endX = splitCommand[2];
          endY = splitCommand[3];
          pathArray.push({
            type: command.split("")[0],
            id: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            controlPoints: {
              dx1: Number(dx1),
              dy1: Number(dy1),
            },
            endPoint: {
              x: Number(endX),
              y: Number(endY)
            }
          })
        } else {
          endX = splitCommand[0];
          endY = splitCommand[1];
          pathArray.push({
            type: command.split("")[0],
            id: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            endPoint: {
              x: Number(endX),
              y: Number(endY)
            }
          })
        }
        console.log(pathArray)
      }else {
        const splitCommand = command.split(/\D/).filter(Boolean);
        const previousStart = pathArray[i-1].startPoint;
        const previousEnd = pathArray[i-1].endPoint;
        const startX = Number(previousStart.x) + Number(previousEnd.x);
        const startY = Number(previousStart.y) + Number(previousEnd.y);
        let dx1, dy1, dx2, dy2, endX, endY;
        if (splitCommand.length===6){2
          dx1 = splitCommand[0];
          dy1 = splitCommand[1];
          dx2 = splitCommand[2];
          dy2 = splitCommand[3];
          endX = splitCommand[4];
          endY = splitCommand[5];
          pathArray.push({
            type: command.split("")[0],
            id: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            controlPoints: {
              dx1: Number(dx1),
              dy1: Number(dy1),
              dx2: Number(dx2),
              dy2: Number(dy2)
            },
            endPoint: {
              x: Number(endX),
              y: Number(endY)
            }
          })
        } else if (splitCommand.length===4){
          dx1 = splitCommand[0];
          dy1 = splitCommand[1];
          endX = splitCommand[2];
          endY = splitCommand[3];
          pathArray.push({
            type: command.split("")[0],
            id: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            controlPoints: {
              dx1: Number(dx1),
              dy1: Number(dy1),
            },
            endPoint: {
              x: Number(endX),
              y: Number(endY)
            }
          })
        } else {
          endX = splitCommand[0];
          endY = splitCommand[1];
          pathArray.push({
            type: command.split("")[0],
            id: i,
            startPoint: {
              x: Number(startX),
              y: Number(startY)
            },
            endPoint: {
              x: Number(endX),
              y: Number(endY)
            }
          })
        }
      }
    })
  }
  return(
    <form onSubmit={(e) => { 
      e.preventDefault();
      clickHandle()
    }}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={clickHandle}>Submit Path!</Button>
    </form>
  )
};

export default InputPath;