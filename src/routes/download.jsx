import React, { Component } from 'react';
import '../components/components.css';

class Download extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

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
  // componentDidMount() {
  // const script = document.createElement('script');

  // script.src = '../components/visualizer.js';
  // script.async = true;
  //
  // document.body.appendChild(script);
  // }

  render() {
    return (
      <div id="content">
        <input
          type="file"
          style={{ top: 10, left: 10, zIndex: 100 }}
          accept="audio/*"
          onChange={this.onChange}
        />
        <canvas id="audio-canvas" style={{ left: 0, top: 0, flex: 1 }}></canvas>
        <audio id="audio" controls></audio>
      </div>
    );
  }
}

export default Download;
