import React, { Component } from 'react';
import '../components/components.css';

class Download extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = '../components/visualizer.js';
    script.async = true;

    document.body.appendChild(script);
    console.log('Mounted');
  }

  render() {
    return (
      <div id="content">
        <input type="file" id="thefile" accept="audio/*" />
        <canvas id="canvas"></canvas>
        <audio id="audio" controls></audio>
        <script src="../components/visualizer.js" />
      </div>
    );
  }
}

export default Download;
