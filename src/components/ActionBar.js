import React, {Component} from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import fullscreenIcon from '../icons/fullscreen.svg'

import TextSamples from './TextSamples'

import './ActionBar.css'

class ActionBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      samplesOpen: false
    }
  }
  render () {
    const dispatch = this.props.dispatch
    return (
      <div className='ActionBar'>
        <div className='left'>
          <button
            className='DeleteButton'
            onClick={() => {
              dispatch({
                type: 'DELETE_TEXTBOX'
              })
            }}>
            Delete
          </button>
          <button
            className={'TextSamplesButton' + (this.state.samplesOpen ? ' open' : '')}
            onClick={() => {
              this.setState({
                samplesOpen: !this.state.samplesOpen
              })
            }}>
            Abc...
          </button>
          { this.state.samplesOpen && <TextSamples/> }
          <button
            onClick={() => {
              dispatch(ActionCreators.undo()) // undo the last action
            }}>
            Undo
          </button>
          <button
            onClick={() => {
              dispatch(ActionCreators.redo()) // undo the last action
            }}>
            Redo
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all your work?")) { 
                dispatch({
                  type: 'RESET_STATE'
                })
              }
            }}>
            Reset
          </button>
        </div>
        <div className='right'>
          <button
            onClick={() => {
              dispatch({
                type: 'TOGGLE_FULLSCREEN'
              })
            }}>
            <svg viewBox='0 0 16 16'>
              <use xlinkHref={fullscreenIcon + `#${this.props.view.fullscreen ? 'exit' : 'enter'}`}></use>
            </svg>
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return { view: state.view }
}

export default connect(mapStateToProps)(ActionBar)
