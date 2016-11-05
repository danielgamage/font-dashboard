import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel'
import Layout from '../containers/LayoutContainer'

import './App.css'

class App extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="App">
                <div className="Container">
                    <div className="LayoutWrapper">
                        <button
                            onClick={() => {
                                this.props.dispatch({
                                    type: 'ADD_TEXTBOX',
                                    text: 'nice cool Paragraph'
                                })
                            }}
                            ></button>
                        <Layout textBoxes={this.props.textBoxes} />
                    </div>
                </div>
                <ControlPanel />
            </div>
        );
    }
}

function mapStateToProps(state) {
  return { textBoxes: state.textBoxes }
}

export default connect(mapStateToProps)(App)
