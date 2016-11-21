import React, { Component } from 'react'
import { connect } from 'react-redux'
import NumericInput from './NumericInput.js'

class ControlPanelInfo extends Component {
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
        <div className='Control full'>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { page: state.page.present }
}

export default connect(mapStateToProps)(ControlPanelInfo)
