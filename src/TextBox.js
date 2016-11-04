import React, { Component } from 'react';

import './TextBox.css'

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontFamily: 'sans-serif',
      fontSize: '1rem',
      color: '#333940',
    }
  }
  readFile(e) {
    // Side effects: add font to document.fonts
    // should probably cache if font already exists
    [...e.target.files].map((file, i) => {
      let reader = new FileReader()
      reader.addEventListener("load", () => {
        let newFont = new FontFace(file.name, reader.result)
        document.fonts.add(newFont)
        this.setState({
          fontFamily: file.name
        })
      }, false)
      reader.readAsArrayBuffer(file)
      return true
    })
  }

  render() {
    let textStyle = {
      fontFamily: `"${this.state.fontFamily}", sans-serif`,
      fontSize: this.state.fontSize,
      color: this.state.color
    }
    return (
      <div className="textbox">
        <textarea style={textStyle} className="text" defaultValue={this.props.text}></textarea>
        <input type="file" onChange={this.readFile.bind(this)} />
        <input type="range" min=1 max=300 onChange={this.updateSize.bind(this)}/>
        <input type="color" onChange={this.updateColor.bind(this)}/>
      </div>
    );
  }
}

export default TextBox;
