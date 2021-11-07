import Matter from './matter.js';

import Car from './matter-car.js';
// import Car from './Car.js';


var level = { 
  MAX_BOXES: 10,
  DANGER_BOXES:7,
  WARN_BOXES:4,
  BOXES: 20
}

var remaining = level.BOXES;

var GAME_RUNNING = true;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Events = Matter.Events;

// create an engine
var engine = Engine.create();

var render = Render.create({
  element: document.querySelector('#matter'),
  engine: engine,
  options: {
    wireframes: false,
    background: 'url(https://cdn.glitch.me/162ab29c-f4ce-432b-bc31-be8166f857c7%2Fblue_sky.png?v=1636222770371)'
  }
});

var crateOptions = { 
  friction: 0.001,
  render: {
    strokeStyle: '#00ff00',
    sprite: {
      texture: 'https://cdn.glitch.me/162ab29c-f4ce-432b-bc31-be8166f857c7%2Fcrate.png?v=1636217649425',
      xScale: 0.32,
      yScale: 0.32,
    }
  }
};     

// create a ground
var groundOptions = { 
  isStatic: true,  
  render: { 
    fillStyle: '#338833'
  }
};
var ground = Bodies.rectangle(400, 610, 780, 50, groundOptions);

// create a car
var scale = 0.9;
var car = Composite.create(new Car(400, 560, 300 * scale, 50 * scale, 30 * scale));

// add all of the bodies to the world
Composite.add(engine.world, [car, ground]);

var keys = [];
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
  e.preventDefault();
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
  if (keys[90] || keys[37] || isBrake) { car.brake(); };
  if (keys[88] || keys[39] || isAccel) { car.accel(); };
  updateBoxes();
});

var ctx = render.canvas.getContext('2d');
var grassImg = new Image();
grassImg.src = 'https://cdn.glitch.me/f9f57fd2-6aed-4d76-8464-bd94d9fd7afd%2Fgrass.png?v=1636149250949';
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
    if((level.BOXES - remaining) < 5)
      messageText = 'CLEAR THE BOXES!';
    else
      messageText = '';
  }
  ctx.save();
  ctx.font = 'bold 30px Sans Serif';
  ctx.fillStyle = color;
  ctx.shadowColor = '#555'
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.textAlign = 'center';
  ctx.fillText(boxes.length + '/' + level.MAX_BOXES, 50, 50);
  ctx.fillText(messageText, 400, 50);
  ctx.fillText(remaining, 750, 50);
  ctx.restore();
}


function updateBoxes() {
  boxes.forEach((box, i) => {
    if(box.position.y > 1000) {
      box = null;
      boxes.splice(i, 1);
      remaining--;
    }
  });
  if(remaining === 0)
    level.complete = true;
}

var boxes = [];

function addBox() {
  if(boxes.length < level.MAX_BOXES && !level.complete) {
    let box = Bodies.rectangle(30 + Math.random() * 740, 0, 80, 80, crateOptions);
    Body.rotate(box, Math.random());
    boxes.push(box);
    Composite.add(engine.world, [box]);
  }
}

(function boxLoop() {
    var rand = Math.round(Math.random() * (5000)) + 1000;
    setTimeout(function() {
      addBox();
      boxLoop();  
    }, rand);
}());

const touchEl = document.querySelector('#matter');

touchEl.addEventListener('pointerdown', (e) => {
  if(e.clientX > 400)
    isAccel = true;
  else
    isBrake = true;
});

touchEl.addEventListener('pointerup', (e) => {
  isAccel = false;
  isBrake = false;
});

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