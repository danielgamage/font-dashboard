import React, { Component } from 'react'
import { connect } from 'react-redux'

import alignIcon from '../icons/align.svg'
import lockIcon from '../icons/lock.svg'

import readFile from '../utils/readFile.js'
import opentypeFeatures from '../data/opentypeFeatures.js'

import NumericInput from './NumericInput.js'

class ControlPanelText extends Component {
  updateFonts (e) {
    readFile(...e.target.files)
    ;[...e.target.files].map((file) => {
      this.updateFontFamily(e, file.name).bind(this)
      return true
    })
  }
  updateFontFamily (e, family) {
    this.props.dispatch({
      type: 'UPDATE_FONT_FAMILY',
      value: e.target.value || family
    })
  }
  updateProp (action, value, key) {
    this.props.dispatch({
      type: action,
      value: value,
      key: key
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
          <div className='ControlTitle'>Font File</div>
          <label className='font-family'>
            {`font-face:`}
            <input id='font' type='text' value={textBox ? textBox.fontFamily : ''} onChange={this.updateFontFamily.bind(this)}/>
          </label>
          <input id='font' type='file' onChange={this.updateFonts.bind(this)} />
          <p>You can also drag your font directly onto the text block you want to apply the font to.</p>
        </div>
        <div className='Control third'>
          <NumericInput
            label='Font Size'
            id='size'
            append='px'
            min='0'
            value={textBox && textBox.fontSize}
            action='UPDATE_FONT_SIZE'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Leading'
            id='leading'
            append='em'
            step='0.05'
            min='0'
            value={textBox && textBox.leading}
            action='UPDATE_FONT_LEADING'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Tracking'
            id='tracking'
            append='em'
            step='0.01'
            min='-0.5'
            max='1'
            value={textBox && textBox.tracking}
            action='UPDATE_FONT_TRACKING'
            />
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Text</div>
          <label>
            <input type='color' onChange={(e) => { this.updateProp('UPDATE_COLOR', e.target.value) }}/>
            <div style={{color: textBox && textBox.color}} className='input--color' />
          </label>
          <output>{textBox && `${textBox.color}`}</output>
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Background</div>
          <label>
            <input type='color' onChange={(e) => { this.updateProp('UPDATE_BACKGROUND_COLOR', e.target.value) }}/>
            <div style={{color: textBox && textBox.backgroundColor}} className='input--color' />
          </label>
          <output>{textBox && `${textBox.color}`}</output>
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Alignment</div>
          {['left', 'center', 'right', 'justify'].map(el => (
            <label key={el} className='hide-checkbox'>
              <input
                name='alignment'
                className='hide-checkbox__input'
                type='radio'
                value={el}
                checked={(textBox && textBox.alignment === el)}
                onChange={(e) => { this.updateProp('UPDATE_ALIGNMENT', e.target.value) }}/>
              <svg className='hide-checkbox__replacement-input' viewBox='0 0 16 16'>
                <use xlinkHref={alignIcon + `#${el}`}></use>
              </svg>
            </label>
          ))}
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Text Transform</div>
          {[{key: 'Uppercase', rep: 'AA'}, {key: 'Lowercase', rep: 'aa'}, {key: 'Capitalize', rep: 'Aa'}, {key: 'None', rep: '--'}].map(el => (
            <label className='hide-checkbox text-transform' key={el.key}>
              <input
                className='hide-checkbox__input'
                type='radio'
                value={el.key.toLowerCase()}
                checked={(textBox && textBox.textTransform === el.key)}
                onChange={(e) => { this.updateProp('UPDATE_TEXT_TRANSFORM', e.target.value.toLowerCase()) }}/>
              <span className='text-transform__label hide-checkbox__replacement-input'>{el.rep}</span>
            </label>
          ))}
        </div>
        <div className='Control third'>
          <NumericInput
            label='Columns'
            id='columns'
            step='1'
            min='1'
            max='4'
            value={textBox && textBox.columns}
            action='UPDATE_COLUMNS'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Gutter Size'
            id='gutter'
            append='rem'
            step='0.1'
            min='0'
            value={textBox && textBox.gutters}
            action='UPDATE_GUTTERS'
            />
        </div>
        <div className='Control third'>
          <label htmlFor='rendering' className='ControlTitle'>Rendering</label>
          <select id='rendering' onChange={(e) => { this.updateProp('UPDATE_RENDERING', e.target.value) }}>
            <option>Subpixel</option>
            <option>Grayscale</option>
            <option>None</option>
          </select>
        </div>
        <div className='Control half flex'>
          {['Top', 'Left', 'Right', 'Bottom'].map((el) => (
            <NumericInput
              className={el}
              label={el}
              key={el}
              id={`padding-${el.toLowerCase()}`}
              step='1'
              min='0'
              value={textBox && textBox.padding[`${el.toLowerCase()}`]}
              action={`UPDATE_PADDING`}
              actionKey={el.toLowerCase()}
              />
          ))}
          <label className='lock hide-checkbox'>
            <input
              className='hide-checkbox__input'
              type='checkbox'
              onClick={(e) => { this.updateProp('UPDATE_PADDING_LOCK', e.target.checked) }}
              />
            <svg className='small hide-checkbox__replacement-input' viewBox='0 0 16 16'>
              <use xlinkHref={lockIcon + `#${textBox && textBox.padding.lock ? 'locked' : 'unlocked'}`}></use>
            </svg>
          </label>
        </div>
        <div className='Control half flex'>
          {['Top', 'Left', 'Right', 'Bottom'].map((el) => (
            <NumericInput
              className={el}
              label={el}
              key={el}
              id={`margin-${el.toLowerCase()}`}
              step='1'
              min='0'
              value={textBox && textBox.margin[`${el.toLowerCase()}`]}
              action={`UPDATE_MARGIN`}
              actionKey={el.toLowerCase()}
              />
          ))}
          <label className='lock hide-checkbox'>
            <input
              className='hide-checkbox__input'
              type='checkbox'
              onClick={(e) => { this.updateProp('UPDATE_MARGIN_LOCK', e.target.checked) }}
              />
            <svg className='small hide-checkbox__replacement-input' viewBox='0 0 16 16'>
              <use xlinkHref={lockIcon + `#${textBox && textBox.margin.lock ? 'locked' : 'unlocked'}`}></use>
            </svg>
          </label>
        </div>
        <div className='Control full'>
          <div className='ControlTitle'>OpenType Features</div>
          {opentypeFeatures.map(el => (
            <label key={el.value} className='hide-checkbox'>
              <input className='hide-checkbox__input' type='checkbox' value={el.value} onChange={(e) => { this.updateProp('UPDATE_OPENTYPE', e.target.checked, e.target.value) }} />
              <div className='hide-checkbox__replacement-input'>{el.description}</div>
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
