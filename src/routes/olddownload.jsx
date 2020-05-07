import React, { Component } from 'react';
import './download.css';
import * as mm from '@magenta/music';
import PlayPause from '../components/playpause.jsx';

const url =
  'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small';

const model = new mm.MusicVAE(url);
const player = new mm.Player();
let midi;

class Download extends Component {
  constructor(props) {
    super(props);
    // this.onChange = this.onChange.bind(this);
    this.state = {
      isPlaying: false,
    };
  }

  handleClick = () => {
    let btnState = this.state.isPlaying;
    // player.resumeContext(); // enable audio
    // model.sample(1).then((samples) => {
    //   //player.start(samples[0], 80)
    //   var midi = mm.sequenceProtoToMidi(samples[0], 80);
    //   var midifile = new File([midi], 'current.mid');
    //   this.playAudio(midifile);
    //   console.log(samples);
    // }); // 80 is temp I think, samples[0] is lstmOutput
    if (btnState) {
      player.resumeContext(); // enable audio
      player.stop();
      console.log('stopped');
    } else {
      player.resumeContext();
      player.start(midi);
      console.log('started');
    }
    // player.resumeContext(); // enable audio
    // player.stop();
    // model
    //   .initialize()
    //   .then(() => model.sample(1))
    //   .then((samples) => {
    //     player.resumeContext();
    //     midi = samples[0];
    //     player.start(midi);
    //     //this.onChange(midi)
    //   });
  };

  // onChange(e) {
  //   e.preventDefault();
  //   // const audioPlayer = document.getElementById('audio');
  //   // audioPlayer.src = URL.createObjectURL(e.target.files[0]);
  //   // console.log(URL.createObjectURL(e.target.files[0]));
  //   // audioPlayer.load();
  //   // audioPlayer.play();

  //   var context = new AudioContext();
  //   var src = context.createMediaElementSource(audioPlayer);
  //   var analyser = context.createAnalyser();

  //   var canvas = document.getElementById('audio-canvas');
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  //   var ctx = canvas.getContext('2d');

  //   src.connect(analyser);
  //   analyser.connect(context.destination);

  //   analyser.fftSize = 256;

  //   var bufferLength = analyser.frequencyBinCount;
  //   console.log(bufferLength);

  //   var dataArray = new Uint8Array(bufferLength);

  //   var WIDTH = canvas.width;
  //   var HEIGHT = canvas.height;

  //   var barWidth = (WIDTH / bufferLength) * 2.5;
  //   var barHeight;
  //   var x = 0;

  //   function renderFrame() {
  //     requestAnimationFrame(renderFrame);

  //     x = 0;

  //     analyser.getByteFrequencyData(dataArray);

  //     ctx.fillStyle = '#000';
  //     ctx.fillRect(0, 0, WIDTH, HEIGHT);

  //     for (var i = 0; i < bufferLength; i++) {
  //       barHeight = dataArray[i];

  //       var r = barHeight + 25 * (i / bufferLength);
  //       var g = 250 * (i / bufferLength);
  //       var b = 50;

  //       ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  //       ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

  //       x += barWidth + 1;
  //     }
  //   }

  //   audioPlayer.play();
  //   renderFrame();
  // }

  handleGenerate = () => {
    model
      .initialize()
      .then(() => model.sample(1))
      .then((samples) => {
        midi = samples[0];
        console.log(samples[0]);
        //this.onChange(midi)
      });
  };

  render() {
    const { isPlaying } = this.state;
    return (
      <div>
        <div id="content">
          {/* <input
            id="the-file"
            type="file"
            accept="audio/*"
            onChange={this.onChange}
          /> */}
          {/* <button className="download-button" onClick={this.handleDownload}>
            Download File
          </button> */}
          {/* <canvas id="audio-canvas"></canvas> */}
          {/*<Particles></Particles>*/}
          <audio id="audio"></audio>
          <div>
            <button id="generate-button" onClick={this.handleGenerate}>
              <h1>Generate New File</h1>
            </button>
            <div id="play-pause">
              <PlayPause
                toggle={isPlaying}
                onClick={(e) => {
                  this.setState({ isPlaying: !isPlaying });
                  this.handleClick(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
