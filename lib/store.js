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
  type: null,
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
});
export const selectedActions = {
  setType: (type) => {
    selected.type = type;
  },
  setStartPoint: (x, y) => {
    selected.startPoint.x = x,
    selected.startPoint.y = y
  },
  setFirstControl: (x, y) => {
    selected.firstControl.x = x,
    selected.firstControl.y = y
  },
  setSecondControl: (x, y) => {
    selected.secondControl.x = x,
    selected.secondControl.y = y
  },
  setEndPoint: (x, y) =>{
    selected.endPoint.x = x,
    selected.endPoint.y = y
  }
};