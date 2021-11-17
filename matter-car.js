import Matter from './matter.js';
import assets from './assets.js';
import audio from './audio.js';

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

  const bodyTexture = assets.path + 'bug.png';
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
  
  const bodyOptions = { 
    collisionFilter: {
      group: group
    },
    density: 0.0002,
    render: {
      sprite: {
        texture: bodyTexture,
      }
    }
  };
  
  const body = Bodies.fromVertices(xx, yy, bodyVertices, bodyOptions);
  
  const wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
    collisionFilter: {
      group: group
    },
    friction: 0.4,
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
    friction: 0.4,
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
    wheelB.torque += 0.15;
    if(wheelA.position.x < 10) {
      wheelB.torque += 0.15;
    }
  }
  
  car.accel = function() {
    wheelB.torque -= 0.15;
    if(wheelB.position.x > 790) {
      wheelA.torque -= 0.15;
    }
  }
  
  car.updateEngine = function() {
    let pow = Math.abs(wheelB.angularVelocity * 20);
    if(pow < 1) pow = 1;
    if(pow > 8) pow = 8;
    audio.engine.power(pow);
  }

  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
};

export default Car;