import React, { Component } from 'react'
import { connect } from 'react-redux'
import NumericInput from './NumericInput.js'

class ControlPanelText extends Component {
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
            step='0.1'
            min='0'
            value={this.props.page && this.props.page.width}
            action='UPDATE_PAGE_WIDTH'
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { page: state.page.present }
}

export default connect(mapStateToProps)(ControlPanelText)
