import React, { Component } from 'react'
import { connect } from 'react-redux'

import alignIcon from '../icons/align.svg'
import lockIcon from '../icons/lock.svg'
import languages from '../data/languages.js'
import opentypeFeatures from '../data/opentypeFeatures.js'

import readFile from '../utils/readFile.js'

import NumericInput from './NumericInput.js'

class ControlPanelText extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opentypeQuery: ''
    }
    this.updateFonts = this.updateFonts.bind(this)
    this.updateFontFamily = this.updateFontFamily.bind(this)
  }
  updateFonts (e) {
    ;[...e.target.files].map((file) => {
      readFile(file, this.props.dispatch).then((font) => {
        this.updateFontFamily(font.names.fullName.en)
        this.props.dispatch({
          type: 'ADD_FONT',
          value: font
        })
      })
      return true
    })
  }
  updateFontFamily (family) {
    this.props.dispatch({
      type: 'UPDATE_FONT_FAMILY',
      value: family
    })
  }
  updateProp (action, value, key) {
    this.props.dispatch({
      type: action,
      value: value,
      key: key
    })
  }
  filterOpentypeFeatures (text) {
    this.setState({ opentypeQuery: text })
  }
  render () {
    // determine whether an option will display as single value or multi value
    // if this.props.selection.every(el => el.prop == this.props.selection[0].prop)

    // grab props for below by first putting the selected object into mem
    const textBox = this.props.textBoxes && this.props.textBoxes[0]

    const associatedFont = this.props.fonts.filter(font => {
      if (textBox) {
        return font.names.fullName.en === textBox.fontFamily
      } else {
        return false
      }
    })[0]
    let showingAvailableLanguages = false
    let availableLanguages = languages
    if (associatedFont && associatedFont.availableLanguages.length !== 0) {
      showingAvailableLanguages = true
      availableLanguages = associatedFont.availableLanguages
    }
    let showingAvailableFeatures = false
    let availableOpentypeFeatures = opentypeFeatures
    if (associatedFont && associatedFont.availableFeatures.length !== 0) {
      showingAvailableFeatures = true
      availableOpentypeFeatures = associatedFont.availableFeatures
    }
    const filteredOpentypeFeatures = availableOpentypeFeatures.filter(el => {
      if (el.value.toLowerCase().indexOf(this.state.opentypeQuery.toLowerCase()) !== -1 ||
          el.description.toLowerCase().indexOf(this.state.opentypeQuery.toLowerCase()) !== -1) {
        return true
      } else {
        return false
      }
    })

    return (
      <div className={`ControlPanelTab ${textBox ? 'active' : 'inactive'}`}>
        <div className='Control full'>
          <div className='sample'>{textBox ? textBox.text : `Selected text`}</div>
        </div>
        <div className='Control full'>
          <div className='ControlTitle'>Font File</div>
          <label className='font-family'>
            {`font-face:`}
            <input id='font' type='text' value={textBox ? textBox.fontFamily : ''} onChange={(e) => {this.updateFontFamily(e.target.value).bind(this)}}/>
          </label>
          <input id='font' type='file' onChange={this.updateFonts.bind(this)} />
          <p>You can also drag your font directly onto the text block you want to apply the font to.</p>
        </div>
        <div className='Control half'>
          <NumericInput
            label='Font Weight'
            id='weight'
            min='0.01'
            max='1.99'
            step='0.01'
            value={textBox && textBox.weight}
            action='UPDATE_FONT_WEIGHT'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Font Size'
            id='size'
            min='0'
            value={textBox && textBox.fontSize.value}
            unit={textBox && textBox.fontSize.unit}
            action='UPDATE_FONT_SIZE'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Leading'
            id='leading'
            append='em'
            min='0'
            value={textBox && textBox.leading.value}
            unit={textBox && textBox.leading.unit}
            action='UPDATE_FONT_LEADING'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Tracking'
            id='tracking'
            append='em'
            value={textBox && textBox.tracking.value}
            unit={textBox && textBox.tracking.unit}
            action='UPDATE_FONT_TRACKING'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Word Spacing'
            id='wordSpacing'
            append='em'
            value={textBox && textBox.wordSpacing.value}
            unit={textBox && textBox.wordSpacing.unit}
            action='UPDATE_FONT_WORD_SPACING'
            />
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Text/BG</div>
          <label>
            <input type='color' onChange={(e) => { this.updateProp('UPDATE_COLOR', e.target.value) }}/>
            <div style={{color: textBox && textBox.color}} className='input--color' />
          </label>
          <label>
            <input type='color' onChange={(e) => { this.updateProp('UPDATE_BACKGROUND_COLOR', e.target.value) }}/>
            <div style={{color: textBox && textBox.backgroundColor}} className='input--color' />
          </label>
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
                checked={(textBox && textBox.textTransform === el.key.toLowerCase())}
                onChange={(e) => { this.updateProp('UPDATE_TEXT_TRANSFORM', e.target.value.toLowerCase()) }}/>
              <span className='text-transform__label hide-checkbox__replacement-input'>{el.rep}</span>
            </label>
          ))}
        </div>
        <div className='Control third'>
          <NumericInput
            label='Columns'
            id='columns'
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
            min='0'
            value={textBox && textBox.gutters.value}
            unit={textBox && textBox.gutters.unit}
            action='UPDATE_GUTTERS'
            />
        </div>
        <div className='Control third'>
          <label htmlFor='rendering' className='ControlTitle'>Rendering</label>
          <div className='select'>
            <select
              id='rendering'
              value={textBox && textBox.rendering}
              onChange={(e) => { this.updateProp('UPDATE_RENDERING', e.target.value) }}>
              <option>Subpixel</option>
              <option>Grayscale</option>
              <option>None</option>
            </select>
          </div>
        </div>
        <div className='Control third'>
          <label htmlFor='language' className='ControlTitle'>Language</label>
          <div className='select'>
            <select
              id='language'
              value={textBox && textBox.language}
              onChange={(e) => { this.updateProp('UPDATE_LANGUAGE', e.target.value) }}>
              {availableLanguages.map(language => (
                <option key={language.tag} value={language.subtag}>{language.description}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='Control half flex'>
          <div className='ControlTitle'>
            Padding
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
          {['Top', 'Left', 'Right', 'Bottom'].map((el) => (
            <NumericInput
              className={`trbl ${el}`}
              label={el}
              key={el}
              id={`padding-${el.toLowerCase()}`}
              min='0'
              value={textBox && textBox.padding[`${el.toLowerCase()}`].value}
              unit={textBox && textBox.padding[`${el.toLowerCase()}`].unit}
              action={`UPDATE_PADDING`}
              actionKey={el.toLowerCase()}
              />
          ))}
        </div>
        <div className='Control half flex'>
          <div className='ControlTitle'>
            Margin
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
          {['Top', 'Left', 'Right', 'Bottom'].map((el) => (
            <NumericInput
              className={`trbl ${el}`}
              label={el}
              key={el}
              id={`margin-${el.toLowerCase()}`}
              value={textBox && textBox.margin[`${el.toLowerCase()}`].value}
              unit={textBox && textBox.margin[`${el.toLowerCase()}`].unit}
              action={`UPDATE_MARGIN`}
              actionKey={el.toLowerCase()}
              />
          ))}
        </div>
        <div className='Control full'>
          <label htmlFor='featureSearch' className='ControlTitle'>
            OpenType Features
            <span className='info-label'>{showingAvailableFeatures ? 'Showing Available' : ''}</span>
          </label>
          <input
            id='featureSearch'
            type='text'
            className='search'
            placeholder='Search for a feature'
            onChange={(e) => { this.filterOpentypeFeatures(e.target.value) }}
            />
          {filteredOpentypeFeatures.map(feature => (
            <label key={feature.value} className='hide-checkbox list'>
              <input
                className='hide-checkbox__input'
                type='checkbox'
                value={feature.value}
                checked={(textBox && textBox.opentype.filter(el => (el.key === feature.value))[0].value)}
                onChange={(e) => { this.updateProp('UPDATE_OPENTYPE', e.target.checked, e.target.value) }} />
              <div
                title={feature.value}
                className='hide-checkbox__replacement-input'>
                {feature.description}
              </div>
            </label>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedTextBoxes = state.textBoxes.present.filter(el => el.selected)
  return { textBoxes: selectedTextBoxes, fonts: state.fonts }
}

export default connect(mapStateToProps)(ControlPanelText)
