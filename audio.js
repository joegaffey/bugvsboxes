//Code from https://www.redblobgames.com/x/1618-webaudio/
var context = null;
var audio = {};

function adsr(T, a, d, s, r, sustain) {
  var gain = context.createGain();
  function set(v, t) { gain.gain.linearRampToValueAtTime(v, T + t); }
  set(0.0, -T);
  set(0.0, 0);
  set(0.1, a);
  set(sustain, a + d);
  set(sustain, a + d + s);
  set(0.0, a + d + s + r);
  return gain;
}

function tweet(freq, offset) {
  if(context) {
    var T = context.currentTime;
    const tweak = 0.1;
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

const frequency = 1200; //Original 1000;
const offset = 0.06; //Original 0.2;

audio.init = function() {
  if(!context) 
    context = new AudioContext();
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

// function make_buffer(fill, env) {
//     var count = context.sampleRate * 2;
//     var buffer = context.createBuffer(1, count, context.sampleRate);

//     var data = buffer.getChannelData(0 /* channel */);
//     var state = {};
//     var prev_random = 0.0;
//     for (var i = 0; i < count; i++) {
//         var t = i / context.sampleRate;
//         data[i] = fill(t, env, state);
//     }

//     var source = context.createBufferSource();
//     source.buffer = buffer;
//     return source;
// }

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

// function fill_hihat(t, env, state) {
//     var prev_random = state.prev_random || 0;
//     var next_random = Math.random() * 2 - 1;
//     var curr = (3*next_random - prev_random) / 2;
//     prev_random = next_random;
//     return curr;
// }

// function drum(fill, env) {
//     var source = make_buffer(fill, env);
//     var gain = adsr(context.currentTime, env.a, env.d, env.s, env.r, env.sustain);
//     source.connect(gain);
//     gain.connect(context.destination);
//     source.start();
// }