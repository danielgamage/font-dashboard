import React, { Component } from 'react'
import { connect } from 'react-redux'
import NumericInput from './NumericInput.js'

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
      <div className='ControlPanelTab'>
        <div className='Control third'>
          <NumericInput
            label='Page Width'
            id='width'
            append='rem'
            min='0'
            value={this.props.page.width.value}
            unit={this.props.page.width.unit}
            action='UPDATE_PAGE_WIDTH'
            />
        </div>
        <div className='Control half'>
          <div className='ControlTitle'>Background</div>
          <label>
            <input type='color' onChange={(e) => { this.updateProp('UPDATE_PAGE_BACKGROUND_COLOR', e.target.value) }}/>
            <div style={{ color: this.props.page.backgroundColor }} className='input--color' />
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { page: state.page.present }
}

export default connect(mapStateToProps)(ControlPanelPage)
