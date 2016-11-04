import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {

  }
  readFile(e) {
    // should probably cache if font already exists
    [...e.target.files].map((file, i) => {
      let reader = new FileReader()
      reader.addEventListener("load", () => {
        var bitterFontFace = new FontFace(file.name, reader.result)
        console.log(bitterFontFace)
        document.fonts.add(bitterFontFace)
      }, false)
      reader.readAsArrayBuffer(file)
      return true
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <input id="lol" type="file" onChange={this.readFile} />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
