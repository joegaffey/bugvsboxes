import settings from './settings.js';

const hud = {};

hud.render = function(gState) {
  let color = '#88DD88';
  if(gState.platformLoad > gState.level.DANGER_BOXES * settings.LOAD_RATIO) {
    color = '#FF4444';
    gState.messageText = 'DANGER!'; 
  }
  else if(gState.platformLoad > gState.level.WARN_BOXES * settings.LOAD_RATIO) {
    color = 'orange';
    gState.messageText = 'WARNING!';
  }
  else
    gState.messageText = 'Level ' + gState.level.NUMBER;
  hud.ctx.save();
  hud.ctx.font = 'bold 30px Verdana';
  hud.ctx.fillStyle = color;
  hud.ctx.shadowColor = '#555'
  hud.ctx.shadowOffsetX = 2;
  hud.ctx.shadowOffsetY = 2;
  hud.ctx.textAlign = 'center';
  hud.ctx.fillText(Math.round(gState.platformLoad) + '/' 
                   + gState.level.MAX_BOXES * settings.LOAD_RATIO + 'kg', 150, 50);
  hud.ctx.fillText(gState.messageText, 400, 50);
  hud.ctx.fillText(gState.level.remaining + gState.boxes.length, 750, 50);
  if(hud.countdown) {
    hud.ctx.font = 'bold 60px Verdana';
    hud.ctx.fillText(hud.countdown.value + 's remaining!', 400, 250);
  }
  if(gState.powMessage) {
    hud.ctx.fillStyle = '#dddddd';
    hud.ctx.font = '30px Verdana';
    hud.ctx.fillText(gState.powMessage, 400, 175);
  }
  if(hud.speakMessage) {
    const pos = hud.car.position();
    hud.drawBubble(pos.x, pos.y, hud.speakMessage);
  }
  hud.ctx.restore();
}

hud.drawBubble = function(x, y, text) {
  hud.ctx.save();
  const width = text.length * 12;
  const height = 50;
  hud.ctx.fillStyle = 'white';
  hud.ctx.strokeStyle = 'white';
  hud.ctx.beginPath();
  hud.ctx.moveTo(x - width / 2, y - 150);
  hud.ctx.lineTo(x + width / 2, y - 150);
  hud.ctx.lineWidth = height;
  hud.ctx.lineCap = 'round';
  hud.ctx.stroke();
  hud.ctx.lineWidth = 0;
  hud.ctx.beginPath();
  hud.ctx.moveTo(x - 50, y - 50);
  hud.ctx.lineTo(x - width / 3 - 20, y + height / 2 - 152);
  hud.ctx.lineTo(x - width / 3 + 20, y + height / 2 - 152);
  hud.ctx.fill();
  hud.ctx.fillStyle = '#444';
  hud.ctx.shadowColor = '#aaa'
  hud.ctx.font = '24px Verdana';
  hud.ctx.fillText(text, x, y - 140);
  hud.ctx.restore();
}

hud.startCountdown = function(count, callback) {
  hud.countdown = {};
  hud.countdown.value = count;
  hud.countdown.callback = callback;
  hud.countdown.timer = setInterval(() => { 
    hud.updateCountdown();
  }, 1000);
}

hud.updateCountdown = function() {
  hud.countdown.value--;
  if(hud.countdown.value === 0) {
    hud.countdown.callback.call();
    hud.endCountdown();
  } 
}

hud.endCountdown = function() {
  clearInterval(hud.countdown.timer);
  hud.countdown = null;
}


export default hud;