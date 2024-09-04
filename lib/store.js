import { proxy } from 'valtio';

export const path = proxy({
  startPoint: {
    x: 50,
    y: 50
  },
  commands: [],
});
export function setStartX(x){
  path.startPoint.x = x
};
export function setStartY(y){
  path.startPoint.y = y
};
export function resetPath(){
  path.commands = []
}
export function setPath(newPath){
  path.commands = newPath
}
export function addToPath(command){
  path.commands.push(command);
};
export function editCommand(id, command){
  const newPath = path.commands.map((com) => {
    return(com.commandId===id?command:com)
  });
  path.commands = newPath;
}

export const stroke = proxy({
  color: '#444',
  width: 3,
  opacity: 1.00,
  highlight: '#aef'
});

export const strokeActions = {
  setColor: (color) => {
    stroke.color = color
  },
  setWidth: (width) => {
    stroke.width = width
  },
  setHighlight: (color) => {
    stroke.highlight = color
  },
  setOpacity: (opacity) =>{
    stroke.opacity = opacity;
  },
  reset: () => {
    strokeActions.setColor('#444');
    strokeActions.setHighlight('#aeb');
    strokeActions.setWidth(3);
    strokeActions.setOpacity(1.00);
  }
};

export const fill = proxy({
  color: '#000',
  opacity: 0.00,
  highlight: '#0bd'
});
export const fillActions = {
  setColor: (color) => {
    fill.color = color
  },
  setHighlight: (color) => {
    fill.highlight = color
  },
  setOpacity: (opacity) =>{
    fill.opacity = opacity;
  },
  reset: () => {
    fillActions.setColor('#000');
    fillActions.setHighlight('#0bd');
    fillActions.setOpacity(1.00);
  }
};

export const control = proxy({
  color: '#00f',
  size: 5,
  opacity: 0.80,
});
export const controlActions = {
  setColor: (color) => {
    control.color = color
  },
  setSize: (size) => {
    control.size = size
  },
  setOpacity: (opacity) =>{
    control.opacity = opacity;
  },
  reset: () => {
    controlActions.setColor('#00f');
    controlActions.setSize(5);
    controlActions.setOpacity(0.80);
  }
};

export const end = proxy({
  color: '#f00',
  size: 5,
  opacity: 0.80,
});
export const endActions = {
  setColor: (color) => {
    end.color = color
  },
  setSize: (size) => {
    end.size = size
  },
  setOpacity: (opacity) =>{
    end.opacity = opacity;
  },
  reset: () => {
    endActions.setColor('#f00');
    endActions.setSize(5);
    endActions.setOpacity(0.80);
  }
};

export function resetConfig(){
  strokeActions.reset();
  fillActions.reset();
  controlActions.reset();
  endActions.reset();
};

export const selected = proxy({
  command: {
    type: null,
    commandId: null,
    startPoint:{
      x: null,
      y: null
    },
    firstControl: {
      x: null,
      y: null
    },
    secondControl: {
      x: null,
      y: null
    },
    endPoint: {
      x: null,
      y: null
    },
  }
});
export const selectedActions = {
  setType: (type) => {
    selected.command.type = type;
  },
  setId: (id) => {
    selected.command.commandId = id;
  },
  setStartPoint: (x, y) => {
    selected.command.startPoint.x = x,
    selected.command.startPoint.y = y
  },
  setFirstControl: (x, y) => {
    selected.command.firstControl.x = x,
    selected.command.firstControl.y = y
  },
  
  setSecondControl: (x, y) => {
    selected.command.secondControl.x = x,
    selected.command.secondControl.y = y
  },
  setEndPoint: (x, y) =>{
    selected.command.endPoint.x = x,
    selected.command.endPoint.y = y
  },
  clear: ()=> {
    selected.command = {
      type: null,
      commandId: null,
      startPoint:{
        x: null,
        y: null
      },
      firstControl: {
        x: null,
        y: null
      },
      secondControl: {
        x: null,
        y: null
      },
      endPoint: {
        x: null,
        y: null
      }
    }
  }
};

export const newCommand = proxy({
  command:{
    type: null,
    commandId: null,
    startPoint:{
      x: null,
      y: null
    },
    firstControl: {
      x: null,
      y: null
    },
    secondControl: {
      x: null,
      y: null
    },
    endPoint: {
      x: null,
      y: null
    }
  }
});
export const newActions = {
  setType: (type) => {
    newCommand.command.type = type;
  },
  setId: (id) => {
    newCommand.command.commandId = id;
  },
  setStartPoint: (x, y) => {
    newCommand.command.startPoint.x = x,
    newCommand.command.startPoint.y = y
  },
  setFirstControl: (x, y) => {
    newCommand.command.firstControl.x = x,
    newCommand.command.firstControl.y = y
  },
  setSecondControl: (x, y) => {
    newCommand.command.secondControl.x = x,
    newCommand.command.secondControl.y = y
  },
  setEndPoint: (x, y) => {
    newCommand.command.endPoint.x = x,
    newCommand.command.endPoint.y = y
  },
  clear: () => {
    newCommand.command = {
      type: null,
      commandId: null,
      startPoint:{
        x: null,
        y: null
      },
      firstControl: {
        x: null,
        y: null
      },
      secondControl: {
        x: null,
        y: null
      },
      endPoint: {
        x: null,
        y: null
      }
    }
  }
};

