import React, { Component } from 'react'

import './ControlPanel.css'

class TextBox extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fontFamily: 'sans-serif',
      fontSize: 16,
      color: '#333940'
    }
  }
  readFile (e) {
    // Side effects: add font to document.fonts
    // should probably cache if font already exists
    [...e.target.files].map((file, i) => {
      let reader = new FileReader()
      reader.addEventListener('load', () => {
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
  updateSize (e) {
    this.setState({ fontSize: e.target.value })
  }
  updateColor (e) {
    this.setState({ color: e.target.value })
  }
  updateRendering (e) {
    this.setState({ fontSmoothing: e.target.value })
  }
  render () {
    let fontSmoothing;
    if (this.state.fontSmoothing === 'Grayscale') {
      fontSmoothing = { webkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }
    } else if (this.state.fontSmoothing === 'None') {
      fontSmoothing = { webkitFontSmoothing: 'none', MozOsxFontSmoothing: 'none'}
    } else {
      fontSmoothing = { webkitFontSmoothing: 'subpixel-antialiased', MozOsxFontSmoothing: 'auto' }
    }
    let textStyle = {
      fontFamily: `'${this.state.fontFamily}', sans-serif`,
      fontSize: this.state.fontSize,
      color: this.state.color,
      ...fontSmoothing
    }
    return (
      <div className='ControlPanel'>
        <div className='Control'>
          <label htmlFor='font'>Font File</label>
          <input id='font' type='file' onChange={this.readFile.bind(this)} />
        </div>
        <div className='Control'>
          <label htmlFor='size'>Font Size</label>
          <input id='size' type='range' min='4' max='300' value={this.state.fontSize} onChange={this.updateSize.bind(this)}/>
          <output>{`${this.state.fontSize}px`}</output>
        </div>
        <div className='Control'>
          <label htmlFor='color'>Text Color</label>
          <input id='color' type='color' value={this.state.color} onChange={this.updateColor.bind(this)}/>
          <output>{`${this.state.color}`}</output>
        </div>
        <div className='Control'>
          <label htmlFor='rendering'>Font Rendering</label>
          <select id='rendering' onChange={this.updateRendering.bind(this)}>
            <option>Subpixel</option>
            <option>Grayscale</option>
            <option>None</option>
          </select>
        </div>
      </div>
    )
  }
}

export default TextBox;
