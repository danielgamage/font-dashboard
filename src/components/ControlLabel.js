import React, { Component } from 'react'
import { connect } from 'react-redux'

class ControlLabel extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <label
        htmlFor={this.props.id}
        className='ControlTitle'
        >
        {this.props.title}
        {this.props.equal === false &&
          <span
            className="unequal"
            title="Multiple textboxes are selected, and their values are not equal."
            >≠</span>
        }
        {this.props.children}
      </label>
    )
  }
}

export default connect()(ControlLabel)
