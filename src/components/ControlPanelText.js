import React, { Component } from 'react'
import { connect } from 'react-redux'
import alignIcon from '../icons/align.svg'
import readFile from '../utils/readFile.js'
import opentypeFeatures from '../data/opentypeFeatures.js'

class ControlPanelText extends Component {
  updateFonts (e) {
    readFile(...e.target.files)
    ;[...e.target.files].map((file) => {
      this.props.dispatch({
        type: 'UPDATE_FONT_FAMILY',
        value: file.name
      })
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
    this.props.dispatch({
      type: 'UPDATE_RENDERING',
      value: e.target.value
    })
  }
  updateColumns (e) {
    this.props.dispatch({
      type: 'UPDATE_COLUMNS',
      value: e.target.value
    })
  }
  updateGutters (e) {
    this.props.dispatch({
      type: 'UPDATE_GUTTERS',
      value: e.target.value
    })
  }
  updateAlignment (e) {
    this.props.dispatch({
      type: 'UPDATE_ALIGNMENT',
      value: e.target.value
    })
  }
  updateOpenType (e) {
    this.props.dispatch({
      type: 'UPDATE_OPENTYPE',
      key: e.target.value,
      value: e.target.checked
    })
  }
  render () {
    // determine whether an option will display as single value or multi value
    // if this.props.selection.every(el => el.prop == this.props.selection[0].prop)

    // grab props for below by first putting the selected object into mem
    const textBox = this.props.textBoxes && this.props.textBoxes[0]
    return (
      <div className='ControlPanelTab'>
        <div className='Control full'>
          <div className='sample'>{textBox ? textBox.text : `Selected text`}</div>
        </div>
        <div className='Control full'>
          <label htmlFor='font' className='ControlTitle'>Font File</label>
          <input id='font' type='file' onChange={this.updateFonts.bind(this)} />
          <p>You can also drag your font directly onto the text block you want to apply the font to.</p>
        </div>
        <div className='Control third'>
          <label htmlFor='size' className='ControlTitle'>Font Size</label>
          <input id='size' type='number' inputMode='numeric' min='0' value={textBox && textBox.fontSize} onChange={this.updateSize.bind(this)}/>
          {`px`}
        </div>
        <div className='Control third'>
          <label htmlFor='leading' className='ControlTitle'>↕︎</label>
          <input id='leading' type='number' inputMode='numeric' step='0.1' value={textBox && textBox.leading} onChange={this.updateLeading.bind(this)}/>
          {`em`}
        </div>
        <div className='Control third'>
          <label htmlFor='tracking' className='ControlTitle'>↔︎</label>
          <input id='tracking' type='number' inputMode='numeric' min='-0.5' max='1' step='0.01' value={textBox && textBox.tracking} onChange={this.updateTracking.bind(this)}/>
          {`em`}
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Text Color</div>
          <label>
            <input id='color' type='color' onChange={this.updateColor.bind(this)}/>
            <div style={{color: textBox && textBox.color}} className='input--color' />
          </label>
          <output>{textBox && `${textBox.color}`}</output>
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Alignment</div>
          {['left', 'center', 'right', 'justify'].map(el => (
            <label htmlFor={`alignment-${el}`} key={el}>
              <input id={`alignment-${el}`} name='alignment' type='radio'
                value={el}
                checked={(textBox && textBox.alignment === el)}
                onChange={this.updateAlignment.bind(this)}/>
              <svg viewBox='0 0 16 16'>
                <use xlinkHref={alignIcon + `#${el}`}></use>
              </svg>
            </label>
          ))}
        </div>
        <div className='Control third'>
          <label htmlFor='columns' className='ControlTitle'>Columns</label>
          <input type='number' min='1' id='columns' value={textBox && textBox.columns} onChange={this.updateColumns.bind(this)} />
        </div>
        <div className='Control third'>
          <label htmlFor='gutter' className='ControlTitle'>Gutter Size</label>
          <input type='number' min='1' id='gutter' value={textBox && textBox.gutters} onChange={this.updateGutters.bind(this)} />
        </div>
        <div className='Control half'>
          <label htmlFor='rendering' className='ControlTitle'>Font Rendering</label>
          <select id='rendering' onChange={this.updateRendering.bind(this)}>
            <option>Subpixel</option>
            <option>Grayscale</option>
            <option>None</option>
          </select>
        </div>
        <div className='Control full'>
          <div className='ControlTitle'>OpenType Features</div>
          {opentypeFeatures.map(el => (
            <label key={el.value}>
              <input type='checkbox' value={el.value} onChange={this.updateOpenType.bind(this)} />
              {el.description}
            </label>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedTextBoxes = state.textBoxes.present.filter(el => el.selected)
  return { textBoxes: selectedTextBoxes }
}

export default connect(mapStateToProps)(ControlPanelText)
