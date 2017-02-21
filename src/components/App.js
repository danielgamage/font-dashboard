import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel'
import Layout from './Layout'
import ActionBar from './ActionBar'

import '../style.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleEsc = this.handleEsc.bind(this)
  }
  componentDidMount () {
    document.addEventListener('keydown', this.handleEsc)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc)
  }
  handleEsc(e) {
    if (e.keyCode === 27 && this.props.view.fullscreen) {
      this.props.dispatch({
        type: 'TOGGLE_FULLSCREEN'
      })
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
