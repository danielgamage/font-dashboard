import React, { Component } from 'react'
import { connect } from 'react-redux'
import units from '../data/units.js'

class NumericInput extends Component {
  constructor (props) {
    super(props)
    this.onDrag = this.onDrag.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.initialX = 0
  }
  onMouseDown (e) {
    this.initialX = e.pageX || e.touches[0].pageX
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('touchmove', this.onDrag)
    document.addEventListener('touchend', this.onMouseUp)
    document.body.classList.add('cursor--lr')
  }
  onMouseUp (e) {
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchmove', this.onDrag)
    document.removeEventListener('touchend', this.onMouseUp)
    document.body.classList.remove('cursor--lr')
  }
  onDrag (e) {
    let value = this.props.value || this.props.defaultValue || 0
    const movement = e.touches ? e.touches[0].pageX - this.initialX : e.movementX
    if (e.touches) {
      this.initialX = e.touches[0].pageX
    }

    // use some opinionated incrementation
    let step
    units.map(el => {
      if (el.value === this.props.unit) {
        step = el.step
      }
      return true
    })

    step = step || this.props.step
    value += (movement * (step || 1))
    value = this.props.min ? Math.max(this.props.min, value) : value
    value = this.props.max ? Math.min(this.props.max, value) : value

    this.updateStore(value, 'value')
  }
  onChange (e) {
    this.updateStore(e.target.value, 'value')
  }
  onChangeUnit (e) {
    this.updateStore(e.target.value, 'unit')
  }
  updateStore (v, vOrU) {
    this.props.dispatch({
      type: this.props.action,
      key: this.props.actionKey || null,
      value: v,
      valueOrUnit: vOrU
    })
  }
  render () {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id}
          className='ControlTitle draggable'
          onMouseDown={this.onMouseDown.bind(this)}
          onTouchStart={this.onMouseDown.bind(this)}
          >
          {this.props.label}
          {this.props.equal === false &&
            <span
              className="unequal"
              title="Multiple textboxes are selected, and their values are not equal."
              >≠</span>
          }
        </label>
        <div className='ControlFlex'>
          <input
            id={this.props.id}
            type='number'
            inputMode='numeric'
            min={this.props.min}
            max={this.props.max}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            onChange={this.onChange.bind(this)}
            />
          {this.props.unit &&
            <div className='select no-border'>
              <select
                value={this.props.unit}
                onChange={this.onChangeUnit.bind(this)}>
                {units.map(el => (
                  <option key={el.value} value={el.value}>{el.value}</option>
                ))}
              </select>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default connect()(NumericInput)
