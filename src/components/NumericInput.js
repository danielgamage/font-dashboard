import React, { Component } from 'react'
import { connect } from 'react-redux'

class ControlPanelText extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tab: 'Text'
    }
    this.onDrag = this.onDrag.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }
  onMouseDown (e) {
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseup', this.onMouseUp)
  }
  onMouseUp (e) {
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.onMouseUp)
  }
  onDrag (e) {
    console.log(e)
    this.updateStore(this.props.value + e.movementX)
  }
  onChange (e) {
    this.updateStore(e.target.value)
  }
  updateStore (v) {
    this.props.dispatch({
      type: this.props.action,
      value: v
    })
  }
  render () {
    return (
      <div>
        <label
          htmlFor={this.props.id}
          className='ControlTitle'
          onMouseDown={this.onMouseDown.bind(this)}
          >
          {this.props.label}
        </label>
        <input
          id={this.props.id}
          type='number'
          inputMode='numeric'
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
          onChange={this.onChange.bind(this)}
          />
        {this.props.append}
      </div>
    )
  }
}

export default connect()(ControlPanelText)
