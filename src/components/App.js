import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel'
import Layout from './Layout'
import ActionBar from './ActionBar'

import './App.css'

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
  handleEsc() {
    if (this.props.view.fullscreen) {
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
  return { textBoxes: state.textBoxes, view: state.view.present }
}

export default connect(mapStateToProps)(App)
