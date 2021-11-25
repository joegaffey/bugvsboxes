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
  
  // Screen settings
  SCREEN_RATIO: 1.333,
  
  // Car settings
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
  POW_OPTIONS: { 
    label: 'pow',
    friction: 0.001,
    density: 0.0001,
    restitution: 0.8,
    render: {
      strokeStyle: 'red',
      lineWidth: 3,
      fillStyle: '#338833'
    }
  },

  POW_TYPE: { EXPLODE: 1, SPEEDUP: 2, SLEEP: 3, CAR: 4, MAGNET: 5, POWER: 6, GRAVITY: 7, AWD: 8, SPEAK: 9 },
  POWERS: [
    { id: 1, icon: '💥', readyMessage: 'Tick...tick...tick...', actMessage: '💥💥💥 Boom! 💥💥💥'},
    { id: 2, icon: '💨', actMessage: 'Turbo Engaged! 💨'},
    { id: 3, icon: '💤', actMessage: '💤 Sleepy time... 💤'},
    { id: 4, icon: '🚖', actMessage: '1UP 🚖'},
    { id: 4, icon: '🧲', actMessage: 'So attractive! 🧲'},
    { id: 5, icon: '💪', actMessage: '💪 Moar Powerrr! 💪'},
    { id: 6, icon: '👽', actMessage: '👽 Drivin on da moon! 👽'},
    { id: 7, icon: '🚙', actMessage: '4 Wheel Drive Baby!!! 🚙'},
    { id: 8, icon: '💬'}
  ]
};

export default settings;