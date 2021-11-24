import assets from './assets.js';

const audio = {};
audio.context = new AudioContext();

// All audio.sounds were generated online at https://www.leshylabs.com/apps/sfMaker/
audio.sounds = { fall: { audio: new Audio(assets.path + 'fall.wav'), volume: 0.3 }, //W=8000,f=4000,V=0,b=0,r=1,s=40,S=20,z=Down,g=0.6,L=0.5 
                 score: { audio: new Audio(assets.path + 'pickup.wav'), volume: 0.2 }, //Noise 3 (I think)
                 button: { audio: new Audio(assets.path + 'button.wav'), volume: 0.2 }, //W=8000,f=500,v=6.793,V=559.783,_=-0.9,a=3,A=3,b=3,r=3,c=-4500,C=0,l=0.2,L=0.25
                 explode: { audio: new Audio(assets.path + 'explode.wav'), volume: 0.2 }}; //Explosion 2

audio.play = function(sound) {
  if(this.recorder && this.recorder.isRecording) {
    const snd = audio.sounds[sound].audio.cloneNode();
    snd.volume = audio.sounds[sound].volume;
    const source = audio.context.createMediaElementSource(snd);
    source.connect(audio.context.destination);
    audio.record(source);
    snd.play();
  }
  else {
    audio.sounds[sound].audio.volume = audio.sounds[sound].volume;
    audio.sounds[sound].audio.play();
  }
}

audio.record = function(source) {
  if(audio.recorder)
    audio.recorder.addAudioSource(source);
}

//Code from https://www.redblobgames.com/x/1618-webaudio/

function adsr(T, a, d, s, r, sustain) {
  var gain = audio.context.createGain();
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
  if(audio.context) {
    var T = audio.context.currentTime;
    const tweak = 0.1; // Added by JG
    var gain = adsr(T + offset + 0.03  * tweak, 0.01  * tweak, 0.08 * tweak, 0, 0, 0);
    var osc = audio.context.createOscillator();
    osc.frequency.value = freq;
    osc.frequency.setValueAtTime(freq, T + offset);
    osc.frequency.exponentialRampToValueAtTime(freq * 2, T + offset + 0.1);
    osc.connect(gain);
    gain.connect(audio.context.destination);
    audio.record(gain);
    osc.start();
    osc.stop(T + offset + 0.15);
  }
}

const frequency = 1200; // 1000;
const offset = 0.06; // 0.2;

audio.init = function() {
  if(!audio.context)
    audio.context = new AudioContext();
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

  var filter1 = audio.context.createBiquadFilter();
  filter1.type = "bandpass";
  filter1.frequency.value = 4000;
  filter1.Q.value = 1;
  noise.connect(filter1);

  gain1 = audio.context.createGain();
  gain1.gain.value = brush;
  filter1.connect(gain1);

  constant = make_buffer(fill_one, {});
  constant.loop = true;
  gain2 = audio.context.createGain();
  gain2.gain.value = rotor;
  constant.connect(gain2);

  gain3 = audio.context.createGain();
  gain3.gain.value = 0;
  gain1.connect(gain3);
  gain2.connect(gain3);

  drive = make_buffer(fill_phasor_power, {power: 4, freq: freq});
  drive.loop = true;
  drive.connect(gain3.gain);

  gain3.connect(audio.context.destination);
  audio.record(gain3);
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
audio.engine.restart = function() {
  audio.engine.stop();
  audio.engine.start();
}
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
  var count = audio.context.sampleRate * 2;
  var buffer = audio.context.createBuffer(1, count, audio.context.sampleRate);

  var data = buffer.getChannelData(0 /* channel */);
  var state = {};
  var prev_random = 0.0;
  for (var i = 0; i < count; i++) {
      var t = i / audio.context.sampleRate;
      data[i] = fill(t, env, state);
  }

  var source = audio.context.createBufferSource();
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
//     var gain = adsr(audio.context.currentTime, env.a, env.d, env.s, env.r, env.sustain);
//     source.connect(gain);
//     gain.connect(audio.context.destination);
//     source.start();
// }

//https://sonoport.github.io/synthesising-sounds-webaudio.html
audio.kick = function(gain) {
  if(!audio.context)
    return;
  var audioContext = audio.context;
  var osc = audio.context.createOscillator();
  var osc2 = audio.context.createOscillator();
  var gainOsc = audio.context.createGain();
  var gainOsc2 = audio.context.createGain();

  osc.type = "triangle";
  osc2.type = "sine";

  gainOsc.gain.setValueAtTime(gain, audio.context.currentTime);
  gainOsc.gain.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.5);
  
  gainOsc2.gain.setValueAtTime(gain, audio.context.currentTime);
  gainOsc2.gain.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.5);
  
  osc.frequency.setValueAtTime(120, audio.context.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.5);

  osc2.frequency.setValueAtTime(50, audio.context.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.5);

  osc.connect(gainOsc);
  osc2.connect(gainOsc2);
  gainOsc.connect(audio.context.destination);
  gainOsc2.connect(audio.context.destination);
  
  audio.record(gainOsc);
  audio.record(gainOsc2);

  osc.start(audio.context.currentTime);
  osc2.start(audio.context.currentTime);

  osc.stop(audio.context.currentTime + 0.5);
  osc2.stop(audio.context.currentTime + 0.5);
};

export default audio;