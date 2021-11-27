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
      SpeakPower.currentMessageIndex = 6;
    if(SpeakPower.timeOut)
      clearTimeout(SpeakPower.timeOut);
    SpeakPower.timeOut = setTimeout(() => { hud.speakMessage = null; }, 4000)
  }
}

SpeakPower.currentMessageIndex = 0;
SpeakPower.messages = [
  'Bubbles can be good or bad',
  'Green bubbles are good',
  'Red bubbles are bad',
  'Some bubbles have to be hit twice..',
  '...those could be  good or bad!',
  'Good luck!',
  'Nice day for a drive...',
  '...apart from these boxes.',
  'At least it\'s sunny.',
  'It\'s a bugs life for me.',
  'Sometimes you have to take a run.',
  'An upgrade would be nice.',
  'This reminds me of Budapest!',
];