import React from 'react';
import Download from './routes/newdownload';
import Home from './routes/home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/download" component={Download} />
      </div>
    </Router>
  );
}

export default App;
