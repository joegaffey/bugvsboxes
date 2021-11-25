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