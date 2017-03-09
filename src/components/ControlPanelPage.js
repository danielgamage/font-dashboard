import React, { Component } from 'react'
import { connect } from 'react-redux'
import NumericInput from './NumericInput.js'
import writingModeIcon from '../icons/writingMode.svg'

class ControlPanelPage extends Component {
  updateBackgroundColor (e) {
    this.props.dispatch({
      type: 'UPDATE_PAGE_BACKGROUND_COLOR',
      value: e.target.value
    })
  }
  updateColumns (e) {
    this.props.dispatch({
      type: 'UPDATE_COLUMNS',
      value: e.target.value
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
    return (
      <div role='tabpanel' className={`ControlPanelTab ${this.props.active ? 'active' : ''}`}>
        <div className='Control third'>
          <NumericInput
            label='Page Width'
            id='page-width'
            append='rem'
            min='0'
            value={this.props.page.width.value}
            unit={this.props.page.width.unit}
            action='UPDATE_PAGE_WIDTH'
            />
        </div>
        <div className='Control third'>
          <NumericInput
            label='Page Padding'
            id='padding'
            append='rem'
            min='0'
            value={this.props.page.padding.value}
            unit={this.props.page.padding.unit}
            action='UPDATE_PAGE_PADDING'
            />
        </div>
        <div className='Control third'>
          <div className='ControlTitle'>Background</div>
          <label>
            <input type='color' onChange={(e) => { this.updateProp('UPDATE_PAGE_BACKGROUND_COLOR', e.target.value) }}/>
            <div style={{ color: this.props.page.backgroundColor }} className='input--color' />
          </label>
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Writing Mode</div>
          {[
            {key: 'horizontal', description: 'Horizontal writing'},
            {key: 'vertical-lr', description: 'Vertical writing, Top to bottom, Left to right'},
            {key: 'vertical-rl', description: 'Vertical writing, Top to bottom, Right to left'}
          ].map(el => (
            <label className='hide-checkbox text-transform' key={el.key} title={el.description}>
              <input
                name='writingMode'
                className='hide-checkbox__input'
                type='radio'
                value={el.key}
                checked={(this.props.page.writingMode === el.key)}
                onChange={(e) => { this.updateProp('UPDATE_PAGE_WRITING_MODE', e.target.value) }}/>
              <svg className='hide-checkbox__replacement-input' viewBox='0 0 16 16'>
                <use xlinkHref={writingModeIcon + `#${el.key}`}></use>
              </svg>
            </label>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { page: state.page }
}

export default connect(mapStateToProps)(ControlPanelPage)
