import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import BannerEditor from './BannerEditor'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BannerEditor width="1440px" height="504px"/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
