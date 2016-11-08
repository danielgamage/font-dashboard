import React, { Component } from 'react'
import { connect } from 'react-redux'

import './ControlPanel.css'

class ControlPanel extends Component {
  constructor (props) {
    super(props);
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
        this.props.dispatch({
          type: 'UPDATE_FONT_FAMILY',
          value: file.name
        })
      }, false)
      reader.readAsArrayBuffer(file)
      return true
    })
  }
  updateSize (e) {
    this.props.dispatch({
      type: 'UPDATE_FONT_SIZE',
      value: e.target.value
    })
  }
  updateLeading (e) {
    this.props.dispatch({
      type: 'UPDATE_FONT_LEADING',
      value: e.target.value
    })
  }
  updateTracking (e) {
    this.props.dispatch({
      type: 'UPDATE_FONT_TRACKING',
      value: e.target.value
    })
  }
  updateColor (e) {
    this.props.dispatch({
      type: 'UPDATE_COLOR',
      value: e.target.value
    })
  }
  updateRendering (e) {
    this.setState({ fontSmoothing: e.target.value })
  }
  updateColumns (e) {
    this.props.dispatch({
      type: 'UPDATE_COLUMNS',
      value: e.target.value
    })
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
    // determine whether an option will display as single value or multi value
    // if this.props.selection.every(el => el.prop == this.props.selection[0].prop)

    // grab props for below by first putting the selected object into mem
    const textBox = this.props.textBoxes && this.props.textBoxes[0]
    return (
      <div className='ControlPanel'>
        <div className='Control full'>
          <div className='sample'>{textBox ? textBox.text : `Selected text`}</div>
        </div>
        <div className='Control full'>
          <label htmlFor='font'>Font File</label>
          <input id='font' type='file' onChange={this.readFile.bind(this)} />
          <p>You can also drag your font directly onto the text block you want to apply the font to.</p>
        </div>
        <div className='Control third'>
          <label htmlFor='size'>Font Size</label>
          <input id='size' type='number' input='numeric' min='0' value={textBox && textBox.fontSize} onChange={this.updateSize.bind(this)}/>
          {`px`}
        </div>
        <div className='Control third'>
          <label htmlFor='leading'>↕︎</label>
          <input id='leading' type='number' input='numeric' step='0.1' value={textBox && textBox.leading} onChange={this.updateLeading.bind(this)}/>
          {`em`}
        </div>
        <div className='Control third'>
          <label htmlFor='tracking'>↔︎</label>
          <input id='tracking' type='number' input='numeric' min='-0.5' max='1' step='0.01' value={textBox && textBox.tracking} onChange={this.updateTracking.bind(this)}/>
          {`em`}
        </div>
        <div className='Control half'>
          <label htmlFor='color'>Text Color</label>
          <input id='color' type='color' onChange={this.updateColor.bind(this)}/>
          <output>{textBox && `${textBox.color}`}</output>
        </div>
        <div className='Control half'>
          <label htmlFor='rendering'>Font Rendering</label>
          <select id='rendering' onChange={this.updateRendering.bind(this)}>
            <option>Subpixel</option>
            <option>Grayscale</option>
            <option>None</option>
          </select>
        </div>
        <div className='Control half'>
          <label htmlFor='columns'>Columns</label>
          <input type='number' min='1' id='columns' value={textBox && textBox.columns} onChange={this.updateColumns.bind(this)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedTextBoxes = state.textBoxes.filter(el => el.selected)
  return { textBoxes: selectedTextBoxes }
}

export default connect(mapStateToProps)(ControlPanel)
