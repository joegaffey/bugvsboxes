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
  hud.ctx.restore();
}

export default hud;