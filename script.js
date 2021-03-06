// @TODO Investigate problem with Car class structure using Matter
// import Car from './Car.js';   

import Matter from './matter.js';
import Car from './matter-car.js';
import assets from './assets.js';
import levels from './levels.js';
import audio from './audio.js';
import gui from './gui.js';
import settings from './settings.js';
import hud from './hud.js';
import Recorder from './recorder.js';
import Power from './power.js';
import SpeakPower from './speakPower.js';


//https://blog.bullgare.com/2019/03/simple-way-to-detect-browsers-fps-via-js/
let fps;
let times = [];
function fpsLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    fpsLoop();
  });
}
fpsLoop();

// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Vector = Matter.Vector,
  Events = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

const containerEl = document.querySelector('#matter');
const videoEl = document.querySelector('#video');

// create an engine
const engine = Engine.create();
engine.timing.isFixed = false;

// Calculate and set physics rate
setInterval(() => {
  if(fps > 75) // Why 75? Seems to work best
    engine.timing.timeScale = Math.round(75 / fps * 100) / 100;
  else 
    engine.timing.timeScale = 1;
}, 1000);

const render = Render.create({
  element: containerEl,
  engine: engine,
  options: settings.CONTAINER_OPTIONS
});

const bgImage = new Image(800, 600);
bgImage.src = assets.path + 'background.png';
bgImage.onload = () => {
  render.options.renderBackground = bgImage;
}

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();
runner.isFixed = true;

// run the engine
Runner.run(runner, engine);

let car;
Car.reset();
  
const gState = {
  platformLoad: 0,
  isAccel: false,
  isBrake: false,
  isBeep: false,
  boxes: [],
  powers: [],
  level: levels[0],
  messageText:'',
  running: false
}

const ctx = render.canvas.getContext('2d');
gui.ctx = ctx;
hud.ctx = ctx;

const recorder = new Recorder(ctx.canvas, videoEl);
audio.recorder = recorder;

gui.data.nextAction = () => {
  gui.showLevel(gState, () => startLevel(0));
};

const grassImg = new Image();
grassImg.src = settings.GRASS_TEXTURE;
grassImg.onload =  () =>  {
  const tempCanvas = document.createElement("canvas"),
  tCtx = tempCanvas.getContext("2d");
  tempCanvas.width = grassImg.width * settings.GRASS_SCALE;
  tempCanvas.height = grassImg.height * settings.GRASS_SCALE;
  tCtx.drawImage(grassImg, 0, 0, grassImg.width, grassImg.height, 
                 0, 0, grassImg.width * settings.GRASS_SCALE, grassImg.height * settings.GRASS_SCALE);
  render.grassPattern = ctx.createPattern(tempCanvas, 'repeat');
};

function setupWorld() {
  const CAR_SCALE = 0.9;
  const ground = Bodies.rectangle(400, 610, 780, 50, settings.GROUND_OPTIONS);
  car = Composite.create(new Car(400, 530, 300 * CAR_SCALE, 50 *  CAR_SCALE, 30 *  CAR_SCALE));
  hud.car = car;
  Composite.add(engine.world, [car, ground]);
}

(function boxLoop() {
  const rand = Math.round(Math.random() * (gState.level.VAR_RATE)) + gState.level.MIN_RATE;
  setTimeout(function() {
    addBox();
    boxLoop();  
  }, rand);
}());

(function powerLoop() {
  const rand = gState.level.POW_MIN_RATE || 2000 + Math.random() * gState.level.POW_VAR_RATE || 2000;
  setTimeout(function() {
    const pow = getLevelPow();
    if(pow)
      addPower(pow);
    powerLoop();  
  }, rand);
}());

window.onresize = resize;
resize();

function getLevelPow() {
  let pow = null;
  if(gState.level.POWS) {
    let pows = [];
    gState.level.POWS.forEach(pow => {
      if(pow.probability > 0) {
        const arr = new Array(pow.probability);
        arr.fill(pow.type);
        pows = pows.concat(arr);
      }
    });
    const type = pows[Math.floor(Math.random() * pows.length)];
    pow = settings.POWERS.find(x => x.type === type);
    const powConfig = gState.level.POWS.find(x => x.type === type)
    pow.active = powConfig.active;
    pow.good = powConfig.good;
    pow.random = powConfig.random;
  }
  return pow;
}

/////////////////////  Controls setup  ////////////////////////////////////

function getScaledPos(canvas, evt) {
  const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function checkBeep(e) {
  const pos = getScaledPos(ctx.canvas, e);
  if(car && Matter.Bounds.contains(car.bodies[0].bounds, pos))
    gState.isBeep = true;
  else {
    gState.isBeep = false;
  }
  console.log(gState.isBeep)
}

containerEl.addEventListener('pointerdown', (e) => { 
  if(!audio.context)
    audio.init();
  if(gState.running) {
    checkBeep(e);
    move(e.clientX);
  }
  else 
    gui.checkPointer(e);
}, false);
containerEl.addEventListener('pointerup', (e) => { gState.isBeep = false; stop(); }, false);
containerEl.addEventListener('pointercancel', (e) => { gState.isBeep = false; stop() }, false);
containerEl.addEventListener('pointerleave', (e) => { gState.isBeep = false; stop() }, false);
containerEl.addEventListener('pointermove', (e) => {
  if(e.pointerType === 'touch') {
    checkBeep(e);
    move(e.clientX);
  }
  else if(e.pointerType === 'mouse' && e.buttons > 0)   
    move(e.clientX);
}, false);

const keys = [];
document.body.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true;
  if(keys[32] || keys[13]) {
    if(gState.running)
      pause();
    else
      gui.action();
  }
  if(keys[16] && keys[82]) {
    if(!recorder.isRecording) {
      recorder.start();
      if(gState.running)
        audio.engine.restart();
    }
    else
      recorder.stop();
  }
  if(keys[16] && keys[88]) {
    recorder.remove();
  }
});
document.body.addEventListener('keyup', (e) => {
  keys[e.keyCode] = false;
});

/////////////////////  Matter Events setup  ////////////////////////////////////

Events.on(runner, 'beforeTick', (event) => {
  if(!gState.running)
    return;
    
  if(keys[87] || keys[38] || gState.isBeep) { beep(); };
  if(keys[65] || keys[37] || gState.isAccel) { car.accel(); };
  if(keys[68] || keys[39] || gState.isBrake) { car.brake(); };
  updateBoxes();
  updateCar();
  updatePowers();
});

Events.on(engine, 'collisionStart', (e) => {
  let doCollision = false;
  let magMax = 0;
  e.pairs.forEach((pair) => {
    let massA = pair.bodyA.mass;
    if(massA === Infinity) massA = 10000;
    let massB = pair.bodyB.mass;
    if(massB === Infinity) massB = 10000;
    const bodyAMomentum = Vector.mult(pair.bodyA.velocity, massA);
    const bodyBMomentum = Vector.mult(pair.bodyB.velocity, massB);
    const relativeMomentum = Vector.sub(bodyAMomentum, bodyBMomentum);
    const mag = Vector.magnitude(relativeMomentum);
    const threshold = 2;
    if(mag > threshold) doCollision = true;
    if(mag > magMax) magMax = mag;
    if(doCollision)
      audio.kick(magMax / 25)
    if(pair.bodyA.label === 'pow' && pair.bodyB.label === 'carBody' || 
       pair.bodyA.label === 'carBody' && pair.bodyB.label === 'pow') {
        if(pair.bodyA.label === 'pow')
          pair.bodyA.power.hit();
        else
          pair.bodyB.power.hit();
    }
    else if(pair.bodyA.label === 'pow' || pair.bodyB.label === 'pow') {
      let body = pair.bodyA;
      if(pair.bodyA.label !== 'pow')
        body = pair.bodyB;
      if(body.power.options.type === 'EXPLODE' && body.power.active) {
        body.power.hit();
      }
    }
  });
});

Events.on(engine, 'collisionActive', (e) => {
  const platformBoxes = [];
  let totalWeight = 0;
  e.pairs.forEach((pair) => {
    gState.boxes.forEach((box) => {
      if(pair.bodyA === box || pair.bodyB === box)
        if(platformBoxes.indexOf(box) < 0)
          platformBoxes.push(box);
    });
  });
  platformBoxes.forEach((box) => {
    totalWeight += box.mass;
  });
  gState.platformLoad = totalWeight * 10;
});

Events.on(render, 'afterRender', (e) => {
  ctx.fillStyle = render.grassPattern || '#338833';
  ctx.fillRect(10, 560, 780, 80, 40);

  if(gState.running)
    hud.render(gState);
  else
    gui.render();
});

Events.on(render, 'beginRender', (e) => {
  if(render.options.renderBackground)
    ctx.drawImage(render.options.renderBackground, 0, 0, ctx.canvas.width, ctx.canvas.height); 
  ctx.fillStyle = render.grassPattern || '#338833';
});

/////////////////////  Game lifecycle  ////////////////////////////////////

function pause() {
  if(gState.running) {
    audio.engine.stop();
    gui.showPause(gState, () => pause());
    runner.enabled = false;
    gState.running = false;
  }
  else {
    runner.enabled = true;
    gState.running = true;
    audio.engine.start();
  }
}

function startLevel(num) {  
  Composite.clear(engine.world);
  Engine.clear(engine);
  setupWorld();
  gState.level.remaining = gState.level.BOXES;
  gState.running = true;
  gState.boxes = [];
  runner.enabled = true;
  audio.engine.start();
}

function endGame(code) {
  audio.engine.stop();
  runner.enabled = false;
  // if(code === 0) {
  //   gState.running = true;
  //   endMessage();
  //   setTimeout(() => { 
  //     gui.showEndScreen(code, () => restart());
  //     gState.running = false;
  //   }, 32000);
  // }
  // else {
    gui.showEndScreen(code, () => restart());
    gState.running = false;
  // }
}

function endMessage() {
  settings.END_MESSAGE.forEach((message, i) => {
    setTimeout(() => {
      hud.speakMessage = message;
      audio.say(message);
    }, i * 4000);
  });
}

function endLevel() {
  audio.engine.stop();
  const message = gState.level.SAY_COMPLETE;
  gState.level = levels[gState.level.NUMBER];
  gui.showMessage(message, () => {
    gui.showLevel(gState, () => startLevel(gState.level.NUMBER));
  });
  runner.enabled = false;
  gState.running = false;
}

function restart() {
  Car.reset();
  gState.level = levels[0];
  gState.platformLoad = 0;
  gui.showLevel(gState, () => startLevel(0))
}

///////////////////////// Object updates ////////////////////////////

function updateCar() {
  car.updateEngine();
  if(car.bodies[0].position.y > 1000) {
    audio.play('explode');
    endGame(2);    
  }
}

function updateBoxes() {
  if(gState.platformLoad >= gState.level.MAX_BOXES * settings.LOAD_RATIO) {
    if(!hud.countdown)
      hud.startCountdown(10, () => endGame(1));
    return;
  }
  else if(hud.countdown) {
    hud.endCountdown();
  }
  gState.boxes.forEach((box, i) => {
    if(box.position.y > 1000) {
      audio.play('score');
      gState.boxes.splice(i, 1);
      Composite.remove(engine.world, box);
      box = null;
    }
  });
  if(gState.level.remaining === 0 && gState.boxes.length === 0) {
    if(gState.level.NUMBER >= levels.length)
      endGame(0); 
    else
      endLevel();
  }
}

function addBox() {
  if(hud.countdown)
    return;
  const smallCrateOptions = JSON.parse(JSON.stringify(settings.BOX_OPTIONS));
  smallCrateOptions.render.sprite.xScale = settings.SMALL_BOX_SCALE;
  smallCrateOptions.render.sprite.yScale = settings.SMALL_BOX_SCALE;

  const mediumCrateOptions = JSON.parse(JSON.stringify(settings.BOX_OPTIONS));
  mediumCrateOptions.render.sprite.xScale = settings.MEDIUM_BOX_SCALE;
  mediumCrateOptions.render.sprite.yScale = settings.MEDIUM_BOX_SCALE;

  const largeCrateOptions = JSON.parse(JSON.stringify(settings.BOX_OPTIONS));
  largeCrateOptions.render.sprite.xScale = settings.LARGE_BOX_SCALE;
  largeCrateOptions.render.sprite.yScale = settings.LARGE_BOX_SCALE;

  if(gState.level.remaining > 0 && gState.boxes.length < gState.level.MAX_BOXES &&  gState.running) {
    let box;
    audio.play('fall');
    
    let sm = Math.random() * gState.level.SIZES.LARGE,
      md = Math.random() * gState.level.SIZES.MEDIUM,
      lg = Math.random() * gState.level.SIZES.SMALL;
    let s = settings.SMALL_BOX_SIZE, m = settings.MEDIUM_BOX_SIZE, l = settings.LARGE_BOX_SIZE
    let x1 = settings.DROP_MIN_X, x2 = settings.DROP_MAX_X, y = settings.DROP_Y;
    if(lg > md && lg > sm) 
      box = Bodies.rectangle(x1 + Math.random() * x2, y, s, s, smallCrateOptions);
    else if(md > lg && md > sm)
      box = Bodies.rectangle(x1 + Math.random() * x2, y, m, m, mediumCrateOptions);
    else
      box = Bodies.rectangle(x1 + Math.random() * x2, y, l, l, largeCrateOptions);
    
    Body.rotate(box, Math.random());
    Body.setAngularVelocity(box, ((Math.random()) * 2 - 1) * 0.02);
    gState.boxes.push(box);
    Composite.add(engine.world, [box]);
    gState.level.remaining--;
  }
}

function addPower(powConfig) {
  if(gState.level.remaining > 0 &&  gState.running) {
    let pow = null;
    if(powConfig.type === 'SPEAK')
      pow = new SpeakPower(Math.random() * 800, 0);
    else if(powConfig.type === 'AWD')
      pow = new Power(powConfig, Math.random() * 800, 0, () => { 
        (pow.good ? Car.enableAWD() : Car.disableAWD());
        const message = (pow.good ? 'Enabled' : 'Disabled');
        gState.powMessage = '???? 4X4 ' + message + '!';
      });
    else if(powConfig.type === 'POWER')
      pow = new Power(powConfig, Math.random() * 800, 0, () => { 
        (pow.good ? Car.increaseTorque() : Car.decreaseTorque()); 
        gState.powMessage = '???? Engine at ' + Car.getTorque() + '% power!';
      });
    else if(powConfig.type === 'GRIP')
      pow = new Power(powConfig, Math.random() * 800, 0, () => { 
        (pow.good ? Car.increaseGrip() : Car.decreaseGrip()); 
        gState.powMessage = '???? Tyres at ' + Car.getGrip() + '%!';
      });
    else if(powConfig.type === 'EXPLODE')
      pow = new Power(powConfig, Math.random() * 800, 0, () => { 
        explode(pow);
      });
    if(pow) {
      Composite.add(engine.world, [pow.body]);
      gState.powers.push(pow);
    }
  }
}

function updatePowers() {
  gState.powers.forEach((pow, i) => {
    if(pow.deathCount && pow.deathCount > 0) {
      pow.deathCount--;
      pow.body.render.sprite.xScale = pow.body.render.sprite.yScale +=  0.15 / pow.deathCount;
      if(pow.deathCount <= 0) {
        if(pow.options.actMessage) {
          gState.powMessage = pow.options.actMessage;
          setTimeout(() => { gState.powMessage = null; }, 2000)
        }
        Composite.remove(engine.world, pow.body);
        gState.boxes.splice(i, 1);
        if(pow.action)
          pow.action.call();
      }
    }
  });
}

function explode(pow) {
  audio.play('explode');
  const bodies = Composite.allBodies(engine.world);
  for (var i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    if (!body.isStatic && pow.body !== body) {
      var force = settings.EXPLODE_FORCE * body.mass;
      var deltaVector = Matter.Vector.sub(pow.body.position, body.position);
      var normalizedDelta = Matter.Vector.normalise(deltaVector);
      var forceVector = Matter.Vector.mult(normalizedDelta, force);
      Body.applyForce(body, body.position, forceVector);
    }
  }
}

function beep() {
  audio.play('beep');
  const origin = car.bodies[0].position;
  const bodies = Composite.allBodies(engine.world);
  for (var i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    if (!body.isStatic && body.label === 'pow') {
      var force = -0.0003;
      var deltaVector = Matter.Vector.sub(origin, body.position);
      var normalizedDelta = Matter.Vector.normalise(deltaVector);
      var forceVector = Matter.Vector.mult(normalizedDelta, force);
      Body.applyForce(body, body.position, forceVector);
    }
  }
}


///////////////////////// Car controls ////////////////////////////

function stop() {
  gState.isAccel = false;
  gState.isBrake = false;
}

function move(x) {
  if(x > containerEl.offsetWidth / 2) {
    gState.isBrake = true;
    gState.isAccel = false;
  }
  else {
    gState.isAccel = true;
    gState.isBrake = false;
  }
}

///////////////////////// View mgt ////////////////////////////

function resize() {
  let w, h;
  if (window.innerWidth >= window.innerHeight * settings.SCREEN_RATIO) {
    w = window.innerHeight * settings.SCREEN_RATIO;
    h = window.innerHeight;
  } 
  else {
    w = window.innerWidth;
    h = window.innerWidth / settings.SCREEN_RATIO;
  }
  render.canvas.style.width = w + 'px';
  render.canvas.style.height = h + 'px';
}

document.addEventListener('visibilitychange', event => {
  if (document.visibilityState === 'visible') {
  } else {
    if(gState.running)
      pause();
  }
})