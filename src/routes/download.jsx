import React, { Component } from 'react';
import './download.css';
import * as mm from '@magenta/music';

const url =
  'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small';

const model = new mm.MusicVAE(url);
const player = new mm.Player();


class Download extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  handleClick = () => {
    player.resumeContext(); // enable audio
    player.stop();
    model
    .initialize()
    .then(() => model.sample(1))
    .then(samples => {
      player.resumeContext();
      let midi = mm.sequenceProtoToMidi(samples[0]);
      player.start(samples[0]);
      //this.onChange(midi)
    });
    
  };

  onChange(e) {
    const audioPlayer = document.getElementById('audio');
    audioPlayer.src = e;
    audioPlayer.load();
    audioPlayer.play();

    var context = new AudioContext();
    var src = context.createMediaElementSource(audioPlayer);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById('audio-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audioPlayer.play();
    renderFrame();
  }

  render() {
    return (
      <div id="content">
        
        <button className="test-button" onClick={this.handleClick}>
          Test
        </button>
        <canvas id="audio-canvas"></canvas>
        <audio id="audio" controls></audio>
      </div>
    );
  }
}

export default Download;
