import React, { Component } from 'react';
import * as mm from '@magenta/music';
import '../components/styles.css';
import { saveAs } from 'file-saver';

const url =
  'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar';

const model = new mm.MusicVAE(url);
const player = new mm.Player();

let count = 0;
// let tempo = 80;
let midi;
// player.start();

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      isLoading: true,
      tempo: 80,
    };
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@magenta/music@1.0.0';
    script.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/file-saver';
    script2.async = true;

    document.body.appendChild(script);
    document.body.appendChild(script2);
    this.handleGenerate();
  }

  changeTempo = (delta) => {
    this.setState({
      tempo: Math.max(Math.min(this.state.tempo + delta * 10, 120), 40),
    });
  };

  handlePlay = () => {
    let btnState = this.state.isPlaying;
    // }); // 80 is temp I think, samples[0] is lstmOutput
    if (btnState) {
      player.resumeContext(); // enable audio
      player.stop();
    } else {
      player.resumeContext();
      player.start(midi, this.state.tempo);
    }
  };

  handleGenerate = () => {
    player.stop();
    mm.Player.tone.context.resume();
    count += 1;
    return model.sample(1).then((samples) => {
      midi = samples[0];
      player.start(midi, this.state.tempo);
      this.setState({ isLoading: false });
    });
  };

  handleDownload = () => {
    saveAs(new File([mm.sequenceProtoToMidi(midi)], 'fire-beats.mid'));
  };

  render() {
    const { isPlaying } = this.state;
    return (
      <div>
        <div style={{ display: this.state.isLoading ? 'block' : 'none' }}>
          <h1>
            . . . Initializing . . .<br />
            <br />
            Please Wait
          </h1>
        </div>
        <div style={{ display: this.state.isLoading ? 'none' : 'block' }}>
          <div id="skip" onClick={this.handleGenerate}>
            Skip the Beat
          </div>
          <br />
          <div
            id="stop"
            onClick={(e) => {
              this.setState({ isPlaying: !isPlaying });
              this.handlePlay(e);
            }}
          >
            Toggle Playback
          </div>
          <br />
          <div id="increase" onClick={(e) => this.changeTempo(1)}>
            Increase BPM
          </div>
          <br />
          <div id="decrease" onClick={(e) => this.changeTempo(-1)}>
            Decrease BPM
          </div>
          <br />
          <div id="tempo">Current BPM: {this.state.tempo}</div>
          <br />
          <div>
            <button onClick={this.handleDownload}>Download Beat</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
