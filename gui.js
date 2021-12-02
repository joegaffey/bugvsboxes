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
  roundRect(gui.ctx, 100, 150, 600, 300, 60, '#ddd', { width: 5, color: 'darkgrey'});
}

gui.drawText = function() {
  gui.ctx.font = 'bold 30px Verdana';
  gui.ctx.fillStyle = '#999';
  gui.ctx.textAlign = 'center';
  const offset = 275 - gui.data.message.length * 25;  
  gui.data.message.forEach((line, i, arr) => {
    if(line.startsWith('e:')) {
      gui.ctx.save();
      gui.ctx.font = '40px serif';
      gui.ctx.fillText(line.substring(2), 400, offset + i * 50);
      gui.ctx.restore();
    }
    else
      gui.ctx.fillText(line, 400, offset + i * 50);
  });
}

gui.drawButton = function(){
  const d = getButtonRect(gui.data.button.label);
  roundRect(gui.ctx, d.x, d.y, d.width, d.height, 20, '#28a745', null);//{ width: 5, color: 'lightgrey'}); #007bff
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
  audio.play('button');
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


//https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
 function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill; // JG addition
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke.color; // JG addition
    ctx.lineWidth = stroke.width; // JG addition
    ctx.stroke();
  }
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
  let message = [];
  if(code === 0) {
     message = ['','Congratulations!', 'You finshed the game!!!'];
  }
  if(code === 1) {
    message = ['','Weight limit exceeded!' , 'Game over!'];
  }
  else if(code === 2) {
    message = ['','You fell to your doom!!!', 'Game over!'];
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