import Matter from './matter.js';

import Car from './matter-car.js';
// import Car from './Car.js';

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
    background: 'none'
  }
});

var crateOptions = { 
  friction: 0.001,
  render: {
    strokeStyle: '#00ff00',
    sprite: {
      texture: 'https://cdn.glitch.me/f9f57fd2-6aed-4d76-8464-bd94d9fd7afd%2Fcrate.svg?v=1635850064699',
      xScale: 0.55,
      yScale: 0.55,
    }
  }
};     

// create a ground
var groundOptions = { 
  isStatic: true,  
  render: { 
    fillStyle: 'none' 
  }
};
var ground = Bodies.rectangle(400, 610, 780, 50, groundOptions);

// create a car
var scale = 0.9;
var car = Composite.create(new Car(400, 500, 300 * scale, 50 * scale, 30 * scale));

// add all of the bodies to the world
Composite.add(engine.world, [car, ground]);

var keys = [];
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
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

function updateBoxes() {
  boxes.forEach((box, i) => {
    if(box.position.y > 1000) {
      box = null;
      boxes.splice(i, 1);
    }
  });
}

var boxes = [];

function addBox() {
  if(boxes.length < 10) {
    console.log(boxes.length)
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
