import audio from './audio.js';
import settings from './settings.js';
import assets from './assets.js';

const gui = {};
gui.bugImage = new Image();
gui.bugImage.src = assets.path + 'ladybug.png';
gui.boxImage = new Image();
gui.boxImage.src = assets.path + 'crate.png';

gui.data = {
  splash: true,
  message: ['', 'vs.'],
  button: {
    label: 'Start!',
    action: () => {
      if(!audio.context)
        audio.init();
      gui.showMessage(['Clear the boxes!', 'Don\'t fall off!'], 
                      gui.data.nextAction);
    }
  }
}

gui.setAction = function(action) {
  gui.data.button.action = action;
}

gui.render = function() {
  gui.ctx.save();
  gui.drawFrame();
  if(gui.data.splash) {
    gui.drawSplash();
  }
  else if(gui.data.bug) {
    gui.drawBubble(...gui.data.bug.bubble);
    gui.drawImg(gui.bugImage, gui.data.bug.x, gui.data.bug.y, gui.data.bug.scale);
  }
  gui.drawText();
  gui.drawButton();
  gui.ctx.restore();  
}

gui.drawFrame = function() {
  gui.ctx.shadowColor = '#333'
  gui.ctx.shadowOffsetX = 2;
  gui.ctx.shadowOffsetY = 2;
  gui.ctx.fillStyle = 'lightgray'
  gui.ctx.fillRect(100, 150, 600, 300);
}

gui.drawText = function() {
  gui.ctx.font = 'bold 30px Verdana';
  gui.ctx.fillStyle = '#888';
  gui.ctx.textAlign = 'center';
  const offset = 275 - gui.data.message.length * 25;  
  gui.data.message.forEach((line, i, arr) => {
    gui.ctx.fillText(line, 400, offset + i * 50);
  });
}

gui.drawButton = function(){
  gui.ctx.fillStyle = 'darkgrey';
  const d = getButtonRect(gui.data.button.label);
  gui.ctx.fillRect(d.x, d.y, d.width, d.height);
  gui.ctx.fillStyle = 'lightgray';
  gui.ctx.fillText(gui.data.button.label, 400, 400);
}

gui.drawSplash = function() {
  gui.drawImg(gui.bugImage, 460, 240, 3);
  gui.drawImg(gui.boxImage, 250, 220, 5);
  const x = 250, y = 220, scale = 5,
        xOffset = gui.boxImage.width / scale / 2, 
        yOffset = gui.boxImage.height / scale;
  gui.drawImg(gui.boxImage, x, y, scale);
  gui.drawImg(gui.boxImage, x - xOffset, y + yOffset, scale);
  gui.drawImg(gui.boxImage, x + xOffset, y + yOffset, scale);
}

gui.checkPointer = function(e) {
  if(isInside(getButtonRect(gui.data.button.label), {x: e.clientX, y: e.clientY}, e))
    gui.action();
}

gui.action = function() {
  if(audio.context)
    audio.context.resume();
  gui.data.button.action.call();
}

gui.drawBug = function(x, y, scale) {
  gui.ctx.save();
  gui.ctx.translate(gui.ctx.canvas.width, 0);
  gui.ctx.scale(-1, 1);
  gui.ctx.drawImage(gui.bugImage, x, y, gui.bugImage.width / scale, gui.bugImage.height / scale);
  gui.ctx.restore();
}

gui.drawImg = function(img, x, y, scale) {
  gui.ctx.save();
  gui.ctx.translate(gui.ctx.canvas.width, 0);
  gui.ctx.scale(-1, 1);
  gui.ctx.drawImage(img, x, y, img.width / scale, img.height / scale);
  gui.ctx.restore();
}

gui.drawBubble = function(x, y, width, height, x1, y1) {
  gui.ctx.fillStyle = 'white';
  gui.ctx.strokeStyle = 'white';
  gui.ctx.beginPath();
  gui.ctx.moveTo(x - width / 2, y);
  gui.ctx.lineTo(x + width / 2, y);
  gui.ctx.lineWidth = height;
  gui.ctx.lineCap = 'round';
  gui.ctx.stroke();
  gui.ctx.lineWidth = 0;
  gui.ctx.beginPath();
  gui.ctx.moveTo(x1, y1);
  gui.ctx.lineTo(x - width / 3 - 20, y  + height / 2);
  gui.ctx.lineTo(x - width / 3 + 20, y  + height / 2);
  gui.ctx.fill();
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
  const p = getScaledPos(gui.ctx.canvas, e);
  if(p.x > box.x && p.x < box.x + box.width &&
     p.y > box.y && p.y < box.y + box.height)
    return true;
  else 
    return false;
}

gui.showMessage = function(message, nextAction) {
  const height = 30 + message.length * 50;
  const maxLen = Math.max(...(message.map(el => el.length)));
  const width = 20 + maxLen * 15; 
  gui.data = {
    message: message,
    button: {
      label: 'Ok',
      action: nextAction
    },
    bug: {
      x: 520,
      y: 340,
      scale: 3,
      bubble: [400, 245, width, height, 275, 400]
    }
  }
  message.forEach((line) => {
    audio.say(line);
  });
}

gui.showLevel = function(gState, action) {
  gui.data = {
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

gui.showPause = function(gState, action) {
  gui.data = {
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

gui.showEndScreen = function(code, action) {
  let message = ['','Congratulations!', 'You finshed the game!!!'];
  if(code === 0) {
    //audio.say('finished at last');
  }
  if(code === 1) {
    message = ['','Weight limit exceeded!' , 'Game over!'];
    //audio.say('so sad');
  }
  if(code === 2) {
    message = ['','You fell to your doom!!!', 'Game over!'];
    //audio.say('Oh noes');
  }
  gui.data = {
    message: message,
    button: {
      label: 'Restart',
      action: action
    }
  }
}

export default gui;