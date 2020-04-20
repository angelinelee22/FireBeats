import React, { Component } from 'react';

class Home extends Component {
  handleClick = () => {
    this.props.history.push('/download');
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>Fire Beats</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
          }}
        >
          <button
            className="btn btn-outline-light m-2"
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
