import React, { Component } from 'react'
import { createStore } from 'redux'

import TextBox from './TextBox.js'
import ControlPanel from './ControlPanel.js'

import logo from './logo.svg'
import './App.css'

// const store = createStore(counter)

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="Container">
                    <div className="LayoutWrapper">
                        <TextBox text="Heading 1"/>
                        <TextBox text="Paragraph content is wonderful and really just absolutely amazing."/>
                    </div>
                </div>
                <ControlPanel />
            </div>
        );
    }
}

export default App;
