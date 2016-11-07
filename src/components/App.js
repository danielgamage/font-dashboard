import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel'
import Layout from './Layout'
import ActionBar from './ActionBar'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
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
  return { textBoxes: state.textBoxes }
}

export default connect(mapStateToProps)(App)
