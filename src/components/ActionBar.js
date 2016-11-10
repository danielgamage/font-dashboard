import React, {Component} from 'react'
import { connect } from 'react-redux'

import TextSamples from './TextSamples'

import './ActionBar.css'

class ActionBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      samplesOpen: false
    }
  }
  render () {
    const dispatch = this.props.dispatch
    return (
      <div className='ActionBar'>
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
      </div>
    )
  }
}

export default connect()(ActionBar)
