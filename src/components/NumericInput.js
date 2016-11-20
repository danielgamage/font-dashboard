import React, { Component } from 'react'
import { connect } from 'react-redux'
import units from '../data/units.js'

class NumericInput extends Component {
  constructor (props) {
    super(props)
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
    let step
    // use some opinionated incrementation
    units.map(el => { if (el.value === this.props.unit) { step = el.step } })

    step = step || this.props.step
    value += (e.movementX * (step || 1))
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
          >
          {this.props.label}
        </label>
        <div className='ControlFlex'>
          <input
            id={this.props.id}
            type='number'
            inputMode='numeric'
            min={this.props.min}
            max={this.props.max}
            value={this.props.value}
            onChange={this.onChange.bind(this)}
            />
          {this.props.unit &&
            <div className='select'>
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
