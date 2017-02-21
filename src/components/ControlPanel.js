import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanelText from './ControlPanelText'
import ControlPanelPage from './ControlPanelPage'
import ControlPanelInfo from './ControlPanelInfo'

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
          {['Text', 'Page', 'Info'].map(tab => (
            <button
              key={tab}
              onClick={() => this.switchTabs(tab)}
              className={(this.state.tab === tab) ? 'active' : ''}
            >
              {tab}
            </button>
          ))}
        </div>
        <ControlPanelText active={this.state.tab === 'Text'} />
        <ControlPanelPage active={this.state.tab === 'Page'} />
        <ControlPanelInfo active={this.state.tab === 'Info'} />
      </div>
    )
  }
}

export default connect()(ControlPanel)
