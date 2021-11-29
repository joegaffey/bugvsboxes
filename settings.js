import assets from './assets.js';

const settings = {
  // Game settings
  LOAD_RATIO: 30,
  CONTAINER_OPTIONS: {
    wireframes: false,
    // background: 'url(' + assets.path + 'background.png)'
  },
  GROUND_OPTIONS: { 
    label: 'ground',
    isStatic: true,  
    render: { 
      fillStyle: '#338833'
    }
  },
  GRASS_SCALE: 0.193,
  GRASS_TEXTURE: assets.path + 'simplegrass.png',
  
  END_MESSAGE: [
    'I dreamt I was a Ladybug...',
    'who learned to drive a car.',
    'Skilled in clearing boxes...',
    '...projected from afar',
    'I thank you for your company.',
    'Our labor now is done.',
    'Remember me and try to live...',
    '...in happiness and fun.',
    null
  ],
  
  // Screen settings
  SCREEN_RATIO: 1.333,
  
  // Car settings
  CAR_START_TORQUE: 0.15,
  CAR_MAX_TORQUE: 0.2,
  CAR_MAX_TORQUE_AWD: 0.25,
  CAR_MIN_TORQUE: 0.1,
  CAR_TORQUE_STEP: 0.005,
  
  CAR_START_GRIP: 0.2,
  CAR_MIN_GRIP: 0.1,
  CAR_MAX_GRIP: 0.8,
  CAR_GRIP_STEP: 0.025,  
  
  CAR_BODY_OPTIONS: { 
    label: 'carBody',
    density: 0.0002,
    restitution: 0.5,
    render: {
      sprite: {
        texture: assets.path + 'bug.png',
      }
    }
  },

  // Box settings
  BOX_OPTIONS : { 
    label: 'box',
    friction: 0.001,
    restitution: 0.3,
    render: {
      strokeStyle: '#00ff00',
      sprite: {
        texture: assets.path + 'crate.png'
      }
    }
  },
  SMALL_BOX_SCALE: 0.24,
  MEDIUM_BOX_SCALE: 0.32,
  LARGE_BOX_SCALE: 0.4,
  SMALL_BOX_SIZE: 60,
  MEDIUM_BOX_SIZE: 80,
  LARGE_BOX_SIZE: 100,
  DROP_MIN_X: 30,
  DROP_MAX_X: 740,
  DROP_Y: 0,

  // Power up/down settings
  
  EXPLODE_FORCE: -0.04,
  
  POW_OPTIONS: { 
    label: 'pow',
    friction: 0.001,
    frictionAir: 0.015,
    density: 0.00005,
    restitution: 1,
    render: {
      strokeStyle: 'red',
      lineWidth: 3,
      fillStyle: '#338833'
    }
  },

  POWERS: [
    { type: 'SPEAK', icon: '💬'},
    { type: 'POWER', icon: '💪', actMessage: '💪 Powerrr! 💪'},
    { type: 'AWD', icon: '🚙', actMessage: '🚙 4X4 🚙'},
    { type: 'GRIP', icon: '🥾', actMessage: '🥾 Get a grip!'},
    { type: 'EXPLODE', icon: '💥', readyMessage: 'Tick...tick...tick...', actMessage: '💥💥💥 Boom! 💥💥💥'},
    // { type: 'SPEEDUP', icon: '⚡', actMessage: 'I am speed! ⚡'},
    // { type: 'SLEEP', icon: '💤', actMessage: '💤 Sleepy time...'},
    // { type: 'CAR', icon: '🚖', actMessage: '1UP 🚖'},
    // { type: 'MAGNET', icon: '🧲', actMessage: 'So attractive! 🧲'},
    // { type: 'GRAVITY', icon: '👽', actMessage: '👽 Mars gravity!'},
  ]
};

export default settings;