import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { ActionCreators } from 'redux-undo'
import fullscreenIcon from '../icons/fullscreen.svg'

import TextSamples from './TextSamples'


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
      <div className='ActionBar' role='toolbar'>
        <div className="Scroller">
          <div className='section left'>
            <button
              className='DuplicateButton'
              onClick={() => {
                dispatch({
                  type: 'DUPLICATE_TEXTBOX'
                })
              }}>
              Duplicate
            </button>
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
              ariaHaspopup="true"
              ariaControls="TextList"
              className={'TextSamplesButton' + (this.state.samplesOpen ? ' open' : '')}
              onClick={() => {
                this.setState({
                  samplesOpen: !this.state.samplesOpen
                })
              }}>
              Abc...
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
          <div className='section right'>
            <button
              title={`${this.props.view.fullscreen ? 'Exit' : 'Enter'} Fullscreen`}
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
        { this.state.samplesOpen && <TextSamples/> }
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return { view: state.view }
}

export default connect(mapStateToProps)(ActionBar)
