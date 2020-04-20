import React, { Component } from 'react';
import '../components/components.css';

class Download extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = '../components/visualizer.js';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div id="content">
        <input
          type="file"
          style={{ top: 10, left: 10, zIndex: 100 }}
          accept="audio/*"
        />
        <canvas style={{ left: 0, top: 0, flex: 1 }}></canvas>
        <audio id="audio" controls></audio>
      </div>
    );
  }
}

export default Download;
