// @TODO Investigate problem with Car class structure using Matter
// import Car from './Car.js';   

import Matter from './matter.js';
import Car from './matter-car.js';
import Assets from './assets.js';
import levels from './levels.js';
import audio from './audio.js';

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vector = Matter.Vector,
    Events = Matter.Events;

var containerEl = document.querySelector('#matter');

var uiData = {
  message: ['', 'Clear the boxes!', 'Don\'t fall off the platform!'],
  button: {
    label: 'Ok',
    action: () => {
      audio.init();
      showLevel(0);
    }
  }
}

// create an engine
var engine = Engine.create();

var render = Render.create({
  element: containerEl,
  engine: engine,
  options: {
    wireframes: false,
    background: 'url(' + Assets.path + 'blue_sky.png)'
  }
});

// create a ground
var groundOptions = { 
  label: 'ground',
  isStatic: true,  
  render: { 
    fillStyle: '#338833'
  }
};

var scale = 0.9;
var ground, car;

function setupWorld() {
  ground = Bodies.rectangle(400, 610, 780, 50, groundOptions);
  car = Composite.create(new Car(400, 530, 300 * scale, 50 * scale, 30 * scale));
  Composite.add(engine.world, [car, ground]);
}
setupWorld();

var keys = [];
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
  e.preventDefault();
  if(keys[32] || keys[13]) {
    if(GAME_RUNNING)
      pause();
    else
      uiData.button.action.call();
  }
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
  e.preventDefault();
});

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
var isAccel = false;
var isBrake = false;

Events.on(runner, "beforeTick", function(event) {
  if(!GAME_RUNNING)
    return;
  if (keys[90] || keys[37] || isAccel) { car.accel(); };
  if (keys[88] || keys[39] || isBrake) { car.brake(); };
  updateBoxes();
  updateCar();
});

var level = levels[0];
var GAME_RUNNING = false;
var boxes = [];

var GROUND = 'ground';
var CAR = 'Body';
var BOX = 'box';

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
    // console.log(mag)
    if(mag > threshold) doCollision = true;
    if(mag > magMax) magMax = mag;
  });
  if(doCollision)
    audio.kick(magMax / 50)
});

function pause() {
  if(GAME_RUNNING) {
    uiData = {
      message: [
        'Game Paused',
        'Level ' + level.NUMBER, 
        level.remaining + boxes.length + ' boxes remaining'
      ],
      button: {
        label: 'Resume',
        action: () => pause()
      }
    }
    runner.enabled = false;
    GAME_RUNNING = false;
  }
  else {
    runner.enabled = true;
    GAME_RUNNING = true;
  }
}

function showLevel() {
  uiData = {
    message: [
      'Level ' + level.NUMBER, 
      'Clear ' + level.BOXES + ' boxes',
      'Platform Limit: ' + level.MAX_BOXES + ' boxes',
    ],
    button: {
      label: 'Go!',
      action: () => startLevel()
    }
  }
}

function startLevel(num) {
  level.remaining = level.BOXES;
  GAME_RUNNING = true;
  boxes = [];
  runner.enabled = true;
}

function endGame(code) {
  level = levels[0];
  var message = ['','Congratulations!', 'You finshed the game!!!'];
  if(code === 0) {
    audio.say('finished at last');
  }
  if(code === 1) {
    message = ['','Platform limit exceeded!' , 'Game over!'];
    audio.say('so sad');
  }
  if(code === 2) {
    message = ['','You fell to your doom!!!', 'Game over!'];
    audio.say('Oh noes');
  }
  uiData = {
    message: message,
    button: {
      label: 'Restart',
      action: () => restart()
    }
  }
  runner.enabled = false;
  GAME_RUNNING = false;
}

var ctx = render.canvas.getContext('2d');
var grassImg = new Image();
grassImg.src = Assets.path + 'grass.png';
grassImg.onload =  () =>  {
  var scale = 0.27;
  var tempCanvas = document.createElement("canvas"),
  tCtx = tempCanvas.getContext("2d");
  tempCanvas.width = grassImg.width * scale;
  tempCanvas.height = grassImg.height * scale;
  tCtx.drawImage(grassImg, 0, 0, grassImg.width, grassImg.height, 0, 0,  grassImg.width * scale,  grassImg.height * scale);
  render.grassPattern = ctx.createPattern(tempCanvas, 'repeat');
};

var messageText = '';
Events.on(render, "afterRender", () => {
  ctx.fillStyle = render.grassPattern || '#338833';
  ctx.fillRect(10, 560, 780, 80, 40);
  if(GAME_RUNNING)
    renderHUD();
  else
    showGUI();
});

function renderHUD() {
  var color = '#44AA44';
  if(boxes.length > level.DANGER_BOXES) {
    color = '#ff0000';
    messageText = 'DANGER!'; 
  }
  else if(boxes.length > level.WARN_BOXES) {
    color = 'orange';
    messageText = 'WARNING!';
  }
  else {
    if((level.BOXES - level.remaining) < 5)
      messageText = 'Level ' + level.NUMBER;
    else
      messageText = '';
  }
  ctx.save();
  ctx.font = 'bold 30px Verdana';
  ctx.fillStyle = color;
  ctx.shadowColor = '#555'
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.textAlign = 'center';
  ctx.fillText(boxes.length + '/' + level.MAX_BOXES, 75, 50);
  ctx.fillText(messageText, 400, 50);
  ctx.fillText(level.remaining, 750, 50);
  ctx.restore();
}


function updateBoxes() {
  if(boxes.length >= level.MAX_BOXES) {
    endGame(1);
    return;
  }
  boxes.forEach((box, i) => {
    if(box.position.y > 1000) {
      box = null;
      boxes.splice(i, 1);
    }
  });
  if(level.remaining === 0 && boxes.length === 0) {
    if(level.NUMBER >= levels.length)
      endGame(0); 
    else
      levelComplete();
  }
}

function updateCar() {
  if(car.bodies[0].position.y > 1000) {
    endGame(2);    
  }
}

function levelComplete() {
  level = levels[level.NUMBER];
  showLevel();
  audio.say(level.SAY_COMPLETE);
  runner.enabled = false;
  GAME_RUNNING = false;
}

function restart() {
  Composite.clear(engine.world);
  Engine.clear(engine);
  setupWorld();
  showLevel(0)
}

function showGUI() {
  ctx.save();
  ctx.shadowColor = '#333'
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = 'lightgray'
  ctx.fillRect(100, 150, 600, 300);
  ctx.font = 'bold 30px Verdana';
  ctx.fillStyle = '#888';
  ctx.textAlign = 'center';
  uiData.message.forEach((line, i, arr) => {
    ctx.fillText(line, 400, 200 + i * 50);
  });
  ctx.fillStyle = 'darkgrey';
  var d = getButtonDims(uiData.button.label);
  ctx.fillRect(d.x, d.y, d.width, d.height);
  ctx.fillStyle = 'lightgray';
  ctx.fillText(uiData.button.label, 400, 400);
  ctx.restore();  
}

function getButtonDims(text) {
  var width = text.length * 25 + 30;
  return {
    x: (800 - width) / 2,
    y: 365,
    width: width,
    height: 50
  }
}

var crateOptions = { 
  label: 'box',
  friction: 0.001,
  render: {
    strokeStyle: '#00ff00',
    sprite: {
      texture: Assets.path + 'crate.png'
    }
  }
};

var smallCrateOptions = JSON.parse(JSON.stringify(crateOptions));
smallCrateOptions.render.sprite.xScale = 0.24;
smallCrateOptions.render.sprite.yScale = 0.24;

var mediumCrateOptions = JSON.parse(JSON.stringify(crateOptions));
mediumCrateOptions.render.sprite.xScale = 0.32;
mediumCrateOptions.render.sprite.yScale = 0.32;

var largeCrateOptions = JSON.parse(JSON.stringify(crateOptions));
largeCrateOptions.render.sprite.xScale = 0.4;
largeCrateOptions.render.sprite.yScale = 0.4;

function addBox() {
  if(level.remaining > 0 && boxes.length < level.MAX_BOXES &&  GAME_RUNNING) {
    let box;
    
    let sm = Math.random() * level.SIZES.LARGE,
      md = Math.random() * level.SIZES.MEDIUM,
      lg = Math.random() * level.SIZES.SMALL;
    if(lg > md && lg > sm) 
      box = Bodies.rectangle(30 + Math.random() * 740, 0, 60, 60, smallCrateOptions);
    else if(md > lg && md > sm)
      box = Bodies.rectangle(30 + Math.random() * 740, 0, 80, 80, mediumCrateOptions);
    else
      box = Bodies.rectangle(30 + Math.random() * 740, 0, 100, 100, largeCrateOptions);
    
    Body.rotate(box, Math.random());
    boxes.push(box);
    Composite.add(engine.world, [box]);
    level.remaining--;
  }
}

(function boxLoop() {
    var rand = Math.round(Math.random() * (level.VAR_RATE)) + level.MIN_RATE;
    setTimeout(function() {
      addBox();
      boxLoop();  
    }, rand);
}());

var isBrake = false, 
    isAccel = false;

containerEl.addEventListener('pointerdown', (e) => { 
  if(GAME_RUNNING)
    move(e.clientX); 
  else if(isInside(getButtonDims(uiData.button.label), {x: e.clientX, y: e.clientY}, e))
    uiData.button.action.call();
}, false);
containerEl.addEventListener('pointerup', (e) => { stop() }, false);
containerEl.addEventListener('pointercancel', (e) => { stop() }, false);
containerEl.addEventListener('pointerleave', (e) => { stop() }, false);
containerEl.addEventListener('pointermove', (e) => {
  if(e.buttons > 0) {
    move(e.clientX);
  }
}, false);

// Thanks! https://newbedev.com/real-mouse-position-in-canvas
function getScaledPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function isInside(box, point, e) {
  // if(ctx.canvas.clientWidth <= 800) {
  //   x = point.x / ctx.canvas.clientWidth * 800;
  //   y = point.y / ctx.canvas.clientHeight * 600;
  // }
  // else {
  //   x = 800 / ctx.canvas.clientWidth * point.x;
  //   y = 600 / ctx.canvas.clientHeight * point.y;
  // }
  var p = getScaledPos(ctx.canvas, e);
  if(p.x > box.x && p.x < box.x + box.width &&
     p.y > box.y && p.y < box.y + box.height)
    return true;
  else 
    return false;
}

function stop() {
  isAccel = false;
  isBrake = false;
}

function move(x) {
  if(x > containerEl.offsetWidth / 2) {
    isBrake = true;
    isAccel = false;
  }
  else {
    isAccel = true;
    isBrake = false;
  }
}

function resize() {
  if (window.innerWidth >= window.innerHeight * 1.333) {
    var h = window.innerHeight;
    var w = window.innerHeight * 1.333;
  } 
  else {
    var w = window.innerWidth;
    var h = window.innerWidth / 1.333;
  }
  render.canvas.style.width = w + 'px';
  render.canvas.style.height = h + 'px';
}

window.onresize = resize;
resize();