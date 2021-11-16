import assets from './assets.js';

const settings = {
  // Game settings
  LOAD_RATIO: 30,
  CONTAINER_OPTIONS: {
    wireframes: false,
    background: 'url(' + assets.path + 'background.png)'//'blue_sky.png)'
  },
  GROUND_OPTIONS: { 
    label: 'ground',
    isStatic: true,  
    render: { 
      fillStyle: '#338833'
    }
  },
  GRASS_SCALE: 0.27,
  GRASS_TEXTURE: assets.path + 'grass.png',
  
  // Screen settings
  SCREEN_RATIO: 1.333,
  
  // Box settings
  BOX_OPTIONS : { 
    label: 'box',
    friction: 0.001,
    render: {
      strokeStyle: '#00ff00',
      sprite: {
        texture: assets.path + 'crate.png'
      }
    }
  },
  SMALL_BOX_SCALE: 0.24,
  MEDIUM_BOX_SCALE: 0.36,
  LARGE_BOX_SCALE: 0.4,
  SMALL_BOX_SIZE: 60,
  MEDIUM_BOX_SIZE: 80,
  LARGE_BOX_SIZE: 100,
  DROP_MIN_X: 30,
  DROP_MAX_X: 740,
  DROP_Y: 0
};

export default settings;