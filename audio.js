import assets from './assets.js';

let context = null;
const audio = {};

// All audio.sounds were generated online at https://www.leshylabs.com/apps/sfMaker/
audio.sounds = { fall: { audio: new Audio(assets.path + 'fall.wav'), volume: 0.3 }, //W=8000,f=4000,V=0,b=0,r=1,s=40,S=20,z=Down,g=0.6,L=0.5 
                 score: { audio: new Audio(assets.path + 'pickup.wav'), volume: 0.2 }, //Noise 3 (I think)
                 button: { audio: new Audio(assets.path + 'button.wav'), volume: 0.2 }, //W=8000,f=500,v=6.793,V=559.783,_=-0.9,a=3,A=3,b=3,r=3,c=-4500,C=0,l=0.2,L=0.25
                 explode: { audio: new Audio(assets.path + 'explode.wav'), volume: 0.2 }}; //Explosion 2

audio.play = function(sound) {
  const snd = audio.sounds[sound].audio.cloneNode();
  snd.volume = audio.sounds[sound].volume;
  snd.play();
}

//Code from https://www.redblobgames.com/x/1618-webaudio/

function adsr(T, a, d, s, r, sustain) {
  var gain = context.createGain();
  function set(v, t) { gain.gain.linearRampToValueAtTime(v, T + t); }
  set(0.0, -T);
  set(0.0, 0);
  set(0.1, a); // set(1, a);
  set(sustain, a + d);
  set(sustain, a + d + s);
  set(0.0, a + d + s + r);
  return gain;
}

function tweet(freq, offset) {
  if(context) {
    var T = context.currentTime;
    const tweak = 0.1; // Added by JG
    var gain = adsr(T + offset + 0.03  * tweak, 0.01  * tweak, 0.08 * tweak, 0, 0, 0);
    var osc = context.createOscillator();
    osc.frequency.value = freq;
    osc.frequency.setValueAtTime(freq, T + offset);
    osc.frequency.exponentialRampToValueAtTime(freq * 2, T + offset + 0.1);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(T + offset + 0.15);
  }
}

const frequency = 1200; // 1000;
const offset = 0.06; // 0.2;

audio.init = function() {
  if(!context)
    context = new AudioContext();
  const buffer = context.createBuffer(1, 1, 22050);
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(1, 0, 0.001);
}

audio.say = function(message) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let val = 1000;
  Array.from(message.toLowerCase()).forEach((c, i) => {
    if(c === ' ')
      val = 100;
    else
      val = alphabet.indexOf(c) / 26;
    tweet(frequency * (1 + 2 * val), i * offset);
  });
}

var noise, constant, drive, gain1, gain2, gain3;

function rotor(brush, rotor, freq) {
  noise = make_buffer(fill_hihat, {});
  noise.loop = true;

  var filter1 = context.createBiquadFilter();
  filter1.type = "bandpass";
  filter1.frequency.value = 4000;
  filter1.Q.value = 1;
  noise.connect(filter1);

  gain1 = context.createGain();
  gain1.gain.value = brush;
  filter1.connect(gain1);

  constant = make_buffer(fill_one, {});
  constant.loop = true;
  gain2 = context.createGain();
  gain2.gain.value = rotor;
  constant.connect(gain2);

  gain3 = context.createGain();
  gain3.gain.value = 0;
  gain1.connect(gain3);
  gain2.connect(gain3);

  drive = make_buffer(fill_phasor_power, {power: 4, freq: freq});
  drive.loop = true;
  drive.connect(gain3.gain);

  gain3.connect(context.destination);
}

function fill_one(t, env, state) {
  return 1.0;
}

function fill_phasor_power(t, env, state) {
  var phase = (t * env.freq) % 1.0;
  return Math.pow(phase, env.power);
}

function rate(rate) {
  if(noise) noise.playbackRate.value = rate;
  if(drive) drive.playbackRate.value = rate;
  if(constant) drive.playbackRate.value = rate;
}

audio.engine = {}
audio.engine.stop = function() {
  if(noise) noise.stop();
  if(drive) drive.stop();
  if(constant) constant.stop();
}
audio.engine.start = function() {
  audio.engine.stop();
  rotor(0.5, 0.2, 20);
  noise.start();
  drive.start();
  constant.start();
}
audio.engine.power = function(pow) {
  rate(pow);
  gain(pow / 20);
}

function gain(level) {
  if(gain1) gain1.gain.value = level * 0.5;
  if(gain2) gain2.gain.value = level * 0.2;
}


//https://sonoport.github.io/synthesising-sounds-webaudio.html
audio.kick = function(gain) {
  if(!context)
    return;
  var audioContext = context;
  var osc = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var gainOsc = audioContext.createGain();
  var gainOsc2 = audioContext.createGain();

  osc.type = "triangle";
  osc2.type = "sine";

  gainOsc.gain.setValueAtTime(gain, audioContext.currentTime);
  gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
  
  gainOsc2.gain.setValueAtTime(gain, audioContext.currentTime);
  gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
  
  osc.frequency.setValueAtTime(120, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  osc2.frequency.setValueAtTime(50, audioContext.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  osc.connect(gainOsc);
  osc2.connect(gainOsc2);
  gainOsc.connect(audioContext.destination);
  gainOsc2.connect(audioContext.destination);

  osc.start(audioContext.currentTime);
  osc2.start(audioContext.currentTime);

  osc.stop(audioContext.currentTime + 0.5);
  osc2.stop(audioContext.currentTime + 0.5);
};

export default audio;


// audio.thump = function() {
//   drum(fill_thump, {a: 0.2, d: 0.1, s: 0.3, r: 0.2, sustain: 0.5});
// }

// audio.snare = function() {
//   drum(fill_snare, {a: 0, d: 0, s: 0, r: 0.25, sustain: 1});
// }

// audio.hihat = function() {
//   drum(fill_hihat, {a: 0.02, d: 0.03, s: 0, r: 0.15, sustain: 0.03});
// }  

// audio.openHihat = function() {
//   drum(fill_hihat, {a: 0.0, d: 0.0, s: 0.15, r: 0.2, sustain: 0.8});
// }

function make_buffer(fill, env) {
    var count = context.sampleRate * 2;
    var buffer = context.createBuffer(1, count, context.sampleRate);

    var data = buffer.getChannelData(0 /* channel */);
    var state = {};
    var prev_random = 0.0;
    for (var i = 0; i < count; i++) {
        var t = i / context.sampleRate;
        data[i] = fill(t, env, state);
    }

    var source = context.createBufferSource();
    source.buffer = buffer;
    return source;
}

// function fill_thump(t, env, state) {
//     var frequency = 60;
//     return  Math.sin(frequency * Math.PI * 2 * Math.pow(t, env.s));
// }

// function fill_snare(t, env, state) {
//     var prev_random = state.prev_random || 0;
//     var next_random = Math.random() * 2 - 1;
//     var curr_random = (prev_random + next_random) / 2;
//     prev_random = next_random;
    
//     return Math.sin(120 * Math.pow(t, 0.05) * 2 * Math.PI) +
//         0.5 * curr_random;
// }

function fill_hihat(t, env, state) {
    var prev_random = state.prev_random || 0;
    var next_random = Math.random() * 2 - 1;
    var curr = (3*next_random - prev_random) / 2;
    prev_random = next_random;
    return curr;
}

// function drum(fill, env) {
//     var source = make_buffer(fill, env);
//     var gain = adsr(context.currentTime, env.a, env.d, env.s, env.r, env.sustain);
//     source.connect(gain);
//     gain.connect(context.destination);
//     source.start();
// }