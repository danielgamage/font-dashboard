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
    document.body.classList.add('cursor--lr')
  }
  onMouseUp (e) {
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.body.classList.remove('cursor--lr')
  }
  onDrag (e) {
    let value = this.props.value
    value += (e.movementX * (this.props.step || 1))
    value = this.props.min ? Math.max(this.props.min, value) : value
    value = this.props.max ? Math.min(this.props.max, value) : value
    this.updateStore(value)
  }
  onChange (e) {
    this.updateStore(e.target.value)
  }
  updateStore (v) {
    this.props.dispatch({
      type: this.props.action,
      key: this.props.actionKey || null,
      value: v
    })
  }
  render () {
    return (
      <div className={this.props.className}>
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
