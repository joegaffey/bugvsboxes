import audio from './audio.js';

class Recorder {

  constructor(canvas, video) {
    this.canvas = canvas;
    this.video = video;
  }

  start() {
    if(this.isRecording)
      return;
    
    this.isRecording = true;
    this.canvas.style.outline = '10px solid red';
    
    const videoStream = this.canvas.captureStream(30);
    this.dest = audio.context.createMediaStreamDestination();
    this.src = audio.context.createBufferSource();    
    this.addAudioSource(this.src);
    
    let outputTracks = []; 
    outputTracks = outputTracks.concat(videoStream.getTracks());
    outputTracks = outputTracks.concat(this.dest.stream.getTracks());
    this.combined = new MediaStream(outputTracks);
    this.mediaRecorder = new MediaRecorder(this.combined);
    this.chunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      if(e.data.size > 0)
        this.chunks.push(e.data);      
    }

    this.mediaRecorder.onstop = (e) => {
      const blob = new Blob(this.chunks, { 'type' : 'video/mp4' });
      this.chunks = [];
      this.video.src = URL.createObjectURL(blob);
      this.video.style.display = 'block';
    }
    this.mediaRecorder.start();
  }

  
  addAudioSource(source) {
    if(this.isRecording)
      source.connect(this.dest);
  }

  stop() {
    if(!this.isRecording)
      return;
    this.isRecording = false;
    this.canvas.style.outline = 'none';
    this.mediaRecorder.stop();
  }

  remove() {
    if(this.isRecording || this.video.style.display === 'none')
      return;
    this.video.src = '';
    this.video.style.display = 'none';
  }
}

export default Recorder;