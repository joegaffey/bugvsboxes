import Power from './power.js';
import settings from './settings.js';
import hud from './hud.js';
import audio from './audio.js';

export default class SpeakPower extends Power {

  constructor(x, y) {
    super(settings.POWERS[0], x, y, () => { this.speak(); });
  }
  
  speak() {
    hud.speakMessage = SpeakPower.messages[SpeakPower.currentMessageIndex];
    audio.say(hud.speakMessage);
    SpeakPower.currentMessageIndex++;
    if(SpeakPower.currentMessageIndex >= SpeakPower.messages.length)
      SpeakPower.currentMessageIndex = 5;
    if(SpeakPower.timeOut)
      clearTimeout(SpeakPower.timeOut);
    SpeakPower.timeOut = setTimeout(() => { hud.speakMessage = null; }, 4000)
  }
}

SpeakPower.currentMessageIndex = 0;
SpeakPower.messages = [
  'Green bubbles are good',
  'Red bubbles are bad',
  'White bubbles must be hit twice..',
  '...could be good or bad!',
  'Beep your troubles away',
  'Good luck!',
  'Nice day for a drive...',
  '...apart from these boxes!',
  'At least it\'s sunny',
  'It\'s a Bugs Life for me',
  'This reminds me of Budapest',
  'Tony Stark built this car...',
  '...in a cave...',
  '...with a box of W3C specs!'
];