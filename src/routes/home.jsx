import React, { Component } from 'react';
import '../components/styles.css';

class Home extends Component {
  handleClick = () => {
    this.props.history.push('/download');
  };

  render() {
    return (
      <div className="center align-middle">
        <div>
          <h1>FIRE BEATS</h1>
          <p>Create some fire beats with the click of a button.</p>
          <div>
            <button onClick={this.handleClick}>Generate a Beat</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
