import React, { Component } from 'react';
import './App.css';
import Addmemo from './components/memo-add/addmemo';

class App extends Component {
  render() {
    return (
      <div className="mainpage">
        <Addmemo/>
      </div>
    );
  }
}

export default App;
