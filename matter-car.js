import Matter from './matter.js';
import assets from './assets.js';
import audio from './audio.js';
import settings from './settings.js';

/**
* Creates a composite with simple car setup of bodies and constraints.
* @method car
* @param {number} xx
* @param {number} yy
* @param {number} width
* @param {number} height
* @param {number} wheelSize
* @return {composite} A new composite car body
*/
const Car = function(xx, yy, width, height, wheelSize) {
  const Body = Matter.Body,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Render = Matter.Render;

  const group = Body.nextGroup(true),
      wheelBase = 10,
      wheelAOffset = -104,
      wheelBOffset = +80,
      wheelYOffset = 22;

  const wheelTexture = assets.path + 'wheel.png';
  
  const car = Composite.create({ label: 'car' });   
  
  const bodyVertices = [
    { "x":9, "y":72 }, { "x":3, "y":78 }, { "x":4, "y":93 }, { "x":18, "y":98 }, { "x":33, "y":98 }, { "x":17, "y":77 },
    { "x":293, "y":59 }, { "x":286, "y":56 }, { "x":293, "y":64 },
    { "x":319, "y":94 }, { "x":297, "y":72 }, { "x":269, "y":99 }, { "x":319, "y":98 },
    { "x":20, "y":65 }, { "x":17, "y":77 }, { "x":33, "y":98 }, { "x":85, "y":103 }, { "x":145, "y":102 }, { "x":26, "y":63 },
    { "x":315, "y":77 }, { "x":309, "y":73 }, { "x":297, "y":72 }, { "x":316, "y":91 },
    { "x":124, "y":9 }, { "x":108, "y":36 }, { "x":145, "y":102 }, { "x":240, "y":13 }, { "x":217, "y":5 }, { "x":189, "y":1 }, { "x":155, "y":2 }, { "x":137, "y":5 },
    { "x":32, "y":54 }, { "x":26, "y":63 }, { "x":145, "y":102 }, { "x":108, "y":36 }, { "x":97, "y":35 }, { "x":78, "y":37 }, { "x":48, "y":45 },
    { "x":269, "y":99 }, { "x":297, "y":72 }, { "x":269, "y":33 }, { "x":263, "y":31 }, { "x":145, "y":102 }, { "x":218, "y":103 },
    { "x":293, "y":64 }, { "x":286, "y":56 }, { "x":297, "y":72 },
    { "x":240, "y":13 }, { "x":145, "y":102 }, { "x":263, "y":31 }, { "x":253, "y":22 },
    { "x":145, "y":102 }, { "x":154, "y":105 }, { "x":201, "y":105 }, { "x":201, "y":103 } 
  ];
  
  const bodyOptions = settings.CAR_BODY_OPTIONS;
  bodyOptions.collisionFilter = { group: group };

  const body = Bodies.fromVertices(xx, yy, bodyVertices, bodyOptions);  
  
  const wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
    collisionFilter: {
      group: group
    },
    friction: Car.grip,
    render: {
      sprite: {
        texture: wheelTexture,
        xScale: 0.2,
        yScale: 0.2,
      }
    }
  });

  const wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
    collisionFilter: {
      group: group
    },
    friction: Car.grip,
    render: {
      sprite: {
        texture: wheelTexture,
        xScale: 0.2,
        yScale: 0.2
      }
    }
  });

  const axelA = Constraint.create({
    bodyB: body,
    pointB: { x: wheelAOffset, y: wheelYOffset },
    bodyA: wheelA,
    stiffness: 1,
    length: 0
  });

  const axelB = Constraint.create({
    bodyB: body,
    pointB: { x: wheelBOffset, y: wheelYOffset },
    bodyA: wheelB,
    stiffness: 1,
    length: 0
  });
  
  car.brake = function() {
    if(Car.AWD || wheelA.position.x < 10) {
      wheelB.torque += Car.torque / 2; 
      wheelA.torque += Car.torque / 2;
    }
    else 
      wheelB.torque += Car.torque;
  }
  
  car.accel = function() {
    if(Car.AWD || wheelB.position.x > 790) {
      wheelB.torque -= Car.torque / 2; 
      wheelA.torque -= Car.torque / 2;
    }
    else 
      wheelB.torque -= Car.torque; 
  }
  
  car.updateEngine = function() {
    let power = Math.abs(wheelB.angularVelocity * 20);
    if(power < 1) power = 1;
    if(power > 8) power = 8;
    audio.engine.power(power);
  }
  
  car.position = function() {
    return body.position;
  }

  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
};

Car.enableAWD = function(){
  Car.AWD = true;
}
Car.disableAWD = function(){
  Car.AWD = false;
  if(Car.torque > settings.CAR_MAX_TORQUE)
    Car.torque = settings.CAR_MAX_TORQUE;
}

Car.increaseTorque = function() {
  if(Car.AWD && Car.torque < settings.CAR_MAX_TORQUE_AWD) {
    Car.torque += settings.CAR_TORQUE_STEP;
    if(Car.torque > settings.CAR_MAX_TORQUE_AWD)
      Car.torque = settings.CAR_MAX_TORQUE_AWD;
  }
  else if(Car.torque < settings.CAR_MAX_TORQUE) {
    Car.torque += settings.CAR_TORQUE_STEP;
    if(Car.torque > settings.CAR_MAX_TORQUE)
      Car.torque = settings.CAR_MAX_TORQUE;
  }
}
Car.decreaseTorque = function() {
  if(Car.torque > settings.CAR_MIN_TORQUE)
    Car.torque -= settings.CAR_TORQUE_STEP;
  if(Car.torque < settings.CAR_MIN_TORQUE)
    Car.torque = settings.CAR_MIN_TORQUE;
}
Car.getTorque = function() {
  if(Car.AWD)
    return Math.round(Car.torque / settings.CAR_MAX_TORQUE_AWD * 100);
  else
    return Math.round(Car.torque / settings.CAR_MAX_TORQUE * 100);
}

Car.increaseGrip = function() {
  console.log('+1')
  if(Car.grip < settings.CAR_MAX_GRIP)
    Car.grip += settings.CAR_GRIP_STEP;
}
Car.decreaseGrip = function() {
  console.log('-1')
  if(Car.grip > settings.CAR_MIN_GRIP)
    Car.grip -= settings.CAR_GRIP_STEP;
}
Car.getGrip = function() {
  return Math.round(Car.grip / settings.CAR_MAX_GRIP * 100);
}

Car.reset = function() {
  Car.AWD = false;
  Car.grip = settings.CAR_START_GRIP;
  Car.torque = settings.CAR_START_TORQUE;
}

export default Car;