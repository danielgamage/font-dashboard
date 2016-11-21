import React, { Component } from 'react'
import { connect } from 'react-redux'

import './ControlPanel.css'
import ControlPanelText from './ControlPanelText'
import ControlPanelPage from './ControlPanelPage'

class ControlPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 'Text'
    }
  }
  switchTabs (tab) {
    this.setState({tab: tab})
  }
  render () {
    // grab props for below by first putting the selected object into mem
    return (
      <div className='ControlPanel'>
        <div className='TabBar'>
          {['Text', 'Page'].map(tab => (
            <button
              key={tab}
              onClick={() => this.switchTabs(tab)}
              className={(this.state.tab === tab) ? 'active' : ''}
            >
              {tab}
            </button>
          ))}
        </div>
        {this.state.tab === 'Text' && <ControlPanelText />}
        {this.state.tab === 'Page' && <ControlPanelPage />}
      </div>
    )
  }
}

export default connect()(ControlPanel)
