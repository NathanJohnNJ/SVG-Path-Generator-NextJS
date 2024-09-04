'use client';
import React, { useState } from "react";
import { RainbowButton } from "../ui/panels/RainbowPanel";
import { StyledDiv } from "../ui/panels/Panels";
import { setPath, setStartX, setStartY } from '@/lib/store';
import Link from "next/link";

const InputPath = () => {
  const [input, setInput] = useState('');

  

  function clickHandle(){
    console.log('hello from click handle')
    const newPath = input.split(/(?<=[mMqQcCtTsSlLvVhH].*?(?=[mMqQcCtTsSlLhHvV]))/);
    const pathArray = [];
    console.log(newPath)
    newPath.map((command, i) => {
      if(i===0){
        const splitCommand = command.split(/\D/).filter(Boolean);
        pathArray.push({
          type: 'M',
          commandId: i,
          endPoint: {
            x: Number(splitCommand[0]),
            y: Number(splitCommand[1])
          }
        });
        setStartX(Number(splitCommand[0]));
        setStartY(Number(splitCommand[1]));
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
            commandId: i,
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
          })
        } else if (splitCommand.length===4){
          dx1 = splitCommand[0];
          dy1 = splitCommand[1];
          endX = splitCommand[2];
          endY = splitCommand[3];
          pathArray.push({
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
          })
        } else {
          endX = splitCommand[0];
          endY = splitCommand[1];
          pathArray.push({
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
          })
        }
      }else {
        const splitCommand = command.split(/\D/).filter(Boolean);
        const previousStart = pathArray[i-1].startPoint;
        const previousEnd = pathArray[i-1].endPoint;
        const startX = Number(previousStart.x) + Number(previousEnd.x);
        const startY = Number(previousStart.y) + Number(previousEnd.y);
        if (splitCommand.length===6){2
          pathArray.push({
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
          })
        } else if (splitCommand.length===4){
          if(command.split("")[0]==='q'){
            pathArray.push({
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
                y: Number(splitCommand[4])
              }
            })
          } else {
            pathArray.push({
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
                y: Number(splitCommand[4])
              }
            })
          }
        } else {
          pathArray.push({
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
          })
        }
      }
    })
    console.log(pathArray)
    setPath(pathArray)
  }
  return(
    <StyledDiv className="flex flex-col items-center justify-center bg-sky-400 w-fit p-2 rounded-[1.4pc]">
      <form className="flex flex-col items-center w-full justify-center bg-zinc-100 p-4 rounded-[1pc]" onSubmit={(e) => { 
        e.preventDefault();
        clickHandle()
      }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} className="text-black m-4 bg-zinc-200 rounded-md"/>
        <RainbowButton onClick={clickHandle}>
          <Link href="/path/viewPath">
            Submit Path!
          </Link>
        </RainbowButton>
      </form>
    </StyledDiv>
  )
};

export default InputPath;