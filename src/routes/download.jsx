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
    model.sample(1).then((samples) => player.start(samples[0], 80)); // 80 is temp I think, samples[0] is lstmOutput
  };

  onChange(e) {
    e.preventDefault();
    const audioPlayer = document.getElementById('audio');
    audioPlayer.src = URL.createObjectURL(e.target.files[0]);
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
      <div>
        <div id="content">
          <input
            id="the-file"
            type="file"
            accept="audio/*"
            onChange={this.onChange}
          />
          <button className="test-button" onClick={this.handleClick}>
            Test
          </button>
          <canvas id="audio-canvas"></canvas>
          <audio id="audio" controls></audio>
        </div>
      </div>
    );
  }
}

export default Download;
