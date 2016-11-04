import React, { Component } from 'react'
import { createStore } from 'redux'

import TextBox from './TextBox.js'

import logo from './logo.svg'
import './App.css'

// const store = createStore(counter)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Container">
          <TextBox text="Heading 1"/>
          <TextBox text="Paragraph content is wonderful and really just absolutely amazing."/>
        </div>
      </div>
    );
  }
}

export default App;
