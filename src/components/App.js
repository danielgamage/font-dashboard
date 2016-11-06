import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel'
import Layout from '../containers/LayoutContainer'
import AddButton from './AddButton'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='Container'>
          <div className='LayoutWrapper'>
            <Layout textBoxes={this.props.textBoxes} />
          </div>
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
