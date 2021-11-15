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

// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Vector = Matter.Vector,
  Events = Matter.Events;

const containerEl = document.querySelector('#matter');

// create an engine
const engine = Engine.create();

const render = Render.create({
  element: containerEl,
  engine: engine,
  options: settings.CONTAINER_OPTIONS
});

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

let car;
setupWorld();

const gState = {
  platformLoad: 0,
  isAccel: false,
  isBrake: false,
  boxes: [],
  level: levels[0],
  messageText:'',
  running: false
}

const ctx = render.canvas.getContext('2d');
gui.ctx = ctx;
hud.ctx = ctx;

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
  Composite.add(engine.world, [car, ground]);
}

(function boxLoop() {
  const rand = Math.round(Math.random() * (gState.level.VAR_RATE)) + gState.level.MIN_RATE;
  setTimeout(function() {
    addBox();
    boxLoop();  
  }, rand);
}());

window.onresize = resize;
resize();

/////////////////////  Controls setup  ////////////////////////////////////

containerEl.addEventListener('pointerdown', (e) => { 
  if(gState.running)
    move(e.clientX); 
  else 
    gui.checkPointer(e);
}, false);
containerEl.addEventListener('pointerup', (e) => { stop() }, false);
containerEl.addEventListener('pointercancel', (e) => { stop() }, false);
containerEl.addEventListener('pointerleave', (e) => { stop() }, false);
containerEl.addEventListener('pointermove', (e) => {
  if(e.pointerType === 'touch')
    move(e.clientX);
  else if(e.pointerType === 'mouse' && e.buttons > 0) {
    move(e.clientX);
  }
}, false);

const keys = [];
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
  e.preventDefault();
  if(keys[32] || keys[13]) {
    if(gState.running)
      pause();
    else
      gui.action();
  }
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
  e.preventDefault();
});

/////////////////////  Matter Events setup  ////////////////////////////////////

Events.on(runner, "beforeTick", function(event) {
  if(!gState.running)
    return;
  if (keys[90] || keys[37] || gState.isAccel) { car.accel(); };
  if (keys[88] || keys[39] || gState.isBrake) { car.brake(); };
  updateBoxes();
  updateCar();
});

Events.on(engine, 'collisionStart', function(event) {
  let doCollision = false;
  let magMax = 0;
  event.pairs.forEach((pair) => {
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
  });
  if(doCollision)
    audio.kick(magMax / 25)
});

Events.on(engine, 'collisionActive', function(event) {
  const platformBoxes = [];
  let totalWeight = 0;
  event.pairs.forEach((pair) => {
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

Events.on(render, "afterRender", () => {
  ctx.fillStyle = render.grassPattern || '#338833';
  ctx.fillRect(10, 560, 780, 80, 40);
  if(gState.running)
    hud.render(gState);
  else
    gui.render();
});

/////////////////////  Game lifecycle  ////////////////////////////////////

function pause() {
  if(gState.running) {
    gui.showPause(gState, () => pause());
    runner.enabled = false;
    gState.running = false;
  }
  else {
    runner.enabled = true;
    gState.running = true;
  }
}

function startLevel(num) {
  gState.level.remaining = gState.level.BOXES;
  gState.running = true;
  gState.boxes = [];
  runner.enabled = true;
}

function endGame(code) {
  gui.showEndScreen(code, () => restart());
  runner.enabled = false;
  gState.running = false;
}

function endLevel() {
  const message = gState.level.SAY_COMPLETE;
  gState.level = levels[gState.level.NUMBER];
  gui.showMessage(message, () => {
    gui.showLevel(gState, () => startLevel(gState.level.NUMBER));
  });
  runner.enabled = false;
  gState.running = false;
}

function restart() {
  gState.level = levels[0];
  gState.platformLoad = 0;
  Composite.clear(engine.world);
  Engine.clear(engine);
  setupWorld();
  gui.showLevel(gState, () => startLevel(0))
}

///////////////////////// Object updates ////////////////////////////

function updateCar() {
  if(car.bodies[0].position.y > 1000) {
    endGame(2);    
  }
}

function updateBoxes() {
  if(gState.platformLoad >= gState.level.MAX_BOXES * settings.LOAD_RATIO) {
    endGame(1);
    return;
  }
  gState.boxes.forEach((box, i) => {
    if(box.position.y > 1000) {
      box = null;
      gState.boxes.splice(i, 1);
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
    gState.boxes.push(box);
    Composite.add(engine.world, [box]);
    gState.level.remaining--;
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