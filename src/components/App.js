import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel'
import Layout from './Layout'
import ActionBar from './ActionBar'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  handleKeyDown(e) {
    console.log(e.keyCode)
    if (e.keyCode === 27 && this.props.view.fullscreen) {
      this.props.dispatch({
        type: 'TOGGLE_FULLSCREEN'
      })
    }
    if (e.keyCode === 46 || e.keyCode === 8) { // DELETE or BACKSPACE
      // prevent accidental deletion if focused
      if (document.activeElement.contentEditable !== 'true' && document.activeElement.nodeName !== 'INPUT') {
        this.props.dispatch({
          type: 'DELETE_TEXTBOXES'
        })
      }
    }
  }
  render () {
    return (
      <div className={'App' + (this.props.view.fullscreen ? ' fullscreen' : '')}>
        <div className='Container'>
          <Layout textBoxes={this.props.textBoxes} />
          <ActionBar />
        </div>
        <ControlPanel />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { textBoxes: state.textBoxes, view: state.view }
}

export default connect(mapStateToProps)(App)
