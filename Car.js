import Matter from './matter.js';
import Assets from './assets.js';

export default class Car {
  
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
  constructor(xx, yy, width, height, wheelSize) {
    
    const Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Render = Matter.Render;

    this.group = Body.nextGroup(true);
    
    const wheelBase = 10,
        wheelAOffset = -80,
        wheelBOffset = +82,
        wheelYOffset = 0;

    const bodyTexture = Assets.path + 'bug.png';
    const wheelTexture = Assets.path + 'wheel.png';
    
    this.car = Composite.create({ label: 'Car' });
    
    this.body = Bodies.rectangle(xx, yy, width, height, { 
      collisionFilter: {
        group: this.group
      },
      chamfer: {
        radius: height * 0.5
      },
      density: 0.0002,
      render: {
        sprite: {
          texture: bodyTexture,
          xScale: 0.9,
          yScale: 0.9,
          yOffset: 0.25,
          xOffset: -0.03,
        }
      }
    });

    this.wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
      collisionFilter: {
        group: this.group
      },
      friction: 0.08,
      render: {
            sprite: {
              texture: wheelTexture,
              xScale: 0.2,
              yScale: 0.2
            }
          }
    });

    this.wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
      collisionFilter: {
        group: this.group
      },
      friction: 0.08,
      render: {
            sprite: {
              texture: wheelTexture,
              xScale: 0.2,
              yScale: 0.2
            }
          }
    });

    this.axelA = Constraint.create({
      bodyB: this.body,
      pointB: { x: wheelAOffset, y: wheelYOffset },
      bodyA: this.wheelA,
      stiffness: 1,
      length: 0
    });

    this.axelB = Constraint.create({
      bodyB: this.body,
      pointB: { x: wheelBOffset, y: wheelYOffset },
      bodyA: this.wheelB,
      stiffness: 1,
      length: 0
    });
    
    Composite.addBody(this.car, this.body);
    Composite.addBody(this.car, this.wheelA);
    Composite.addBody(this.car, this.wheelB);
    Composite.addConstraint(this.car, this.axelA);
    Composite.addConstraint(this.car, this.axelB);
  }
  
  accel() {
    Matter.Body.applyForce(this.wheelA, {x: this.wheelA.position.x, y: this.wheelA.position.y}, {x: 0.005, y: 0});
  }
  
  brake() {
    Matter.Body.applyForce(this.wheelA, {x: this.wheelA.position.x, y: this.wheelA.position.y}, {x: -0.005, y: 0});
  }
}