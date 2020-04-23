import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  handleClick = () => {
    this.props.history.push('/download');
  };

  render() {
    return (
      <div className="home-border">
        <div className="text-align">
          <h1 className="text-lg-left font-weight-bold title">FIRE BEATS</h1>
          <p>Create some fire beats with the click of a button.</p>
        </div>
        <div className="title-button">
          <button
            className="btn btn-outline-light m-2 btn-lg"
            onClick={this.handleClick}
          >
            Generate a Beat
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
