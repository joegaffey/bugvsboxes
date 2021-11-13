import audio from './audio.js';
import settings from './settings.js';

const GUI = {};

GUI.data = {
  message: ['', 'Clear the boxes!', 'Don\'t fall off the platform!'],
  button: {
    label: 'Ok'
  }
}

GUI.setAction = function(action) {
  GUI.data.button.action = action;
}

GUI.render = function() {
  GUI.ctx.save();
  GUI.ctx.shadowColor = '#333'
  GUI.ctx.shadowOffsetX = 2;
  GUI.ctx.shadowOffsetY = 2;
  GUI.ctx.fillStyle = 'lightgray'
  GUI.ctx.fillRect(100, 150, 600, 300);
  GUI.ctx.font = 'bold 30px Verdana';
  GUI.ctx.fillStyle = '#888';
  GUI.ctx.textAlign = 'center';
  GUI.data.message.forEach((line, i, arr) => {
    GUI.ctx.fillText(line, 400, 200 + i * 50);
  });
  GUI.ctx.fillStyle = 'darkgrey';
  const d = getButtonRect(GUI.data.button.label);
  GUI.ctx.fillRect(d.x, d.y, d.width, d.height);
  GUI.ctx.fillStyle = 'lightgray';
  GUI.ctx.fillText(GUI.data.button.label, 400, 400);
  GUI.ctx.restore();  
}

GUI.checkPointer = function(e) {
  if(isInside(getButtonRect(GUI.data.button.label), {x: e.clientX, y: e.clientY}, e))
    GUI.action();
}

GUI.action = function() {
  GUI.data.button.action.call();
}

function getButtonRect(text) {
  const width = text.length * 25 + 30;
  return {
    x: (800 - width) / 2,
    y: 365,
    width: width,
    height: 50
  }
}

// Thanks! https://newbedev.com/real-mouse-position-in-canvas
function getScaledPos(canvas, evt) {
  const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function isInside(box, point, e) {
  const p = getScaledPos(GUI.ctx.canvas, e);
  if(p.x > box.x && p.x < box.x + box.width &&
     p.y > box.y && p.y < box.y + box.height)
    return true;
  else 
    return false;
}

GUI.showLevel = function(gState, action) {
  GUI.data = {
    message: [
      'Level ' + gState.level.NUMBER, 
      'Clear ' + gState.level.BOXES + ' boxes',
      'Max Weight: ' + gState.level.MAX_BOXES * settings.LOAD_RATIO + 'kg',
    ],
    button: {
      label: 'Go!',
      action: action
    }
  }
}

GUI.showPause = function(gState, action) {
  GUI.data = {
    message: [
      'Game Paused',
      'Level ' + gState.level.NUMBER, 
      gState.level.remaining + gState.boxes.length + ' boxes remaining'
    ],
    button: {
      label: 'Resume',
      action: action
    }
  }
}

GUI.showEndScreen = function(code, action) {
  let message = ['','Congratulations!', 'You finshed the game!!!'];
  if(code === 0) {
    audio.say('finished at last');
  }
  if(code === 1) {
    message = ['','Weight limit exceeded!' , 'Game over!'];
    audio.say('so sad');
  }
  if(code === 2) {
    message = ['','You fell to your doom!!!', 'Game over!'];
    audio.say('Oh noes');
  }
  GUI.data = {
    message: message,
    button: {
      label: 'Restart',
      action: action
    }
  }
}

export default GUI;