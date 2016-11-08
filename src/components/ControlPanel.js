import React, { Component } from 'react'
import { connect } from 'react-redux'
import alignIcon from '../icons/align.svg';

import './ControlPanel.css'
import ControlPanelText from './ControlPanelText'

class ControlPanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tab: 'Text'
    }
  }
  switchTabs (tab) {
    this.setState({tab: tab})
  }
  render () {
    // grab props for below by first putting the selected object into mem
    const textBox = this.props.textBoxes && this.props.textBoxes[0]
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
        {this.state.tab === 'Page' && 'Hello!'}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedTextBoxes = state.textBoxes.filter(el => el.selected)
  return { textBoxes: selectedTextBoxes }
}

export default connect(mapStateToProps)(ControlPanel)
