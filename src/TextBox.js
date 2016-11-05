import React, { Component } from 'react';

import './TextBox.css'

class TextBox extends Component {
    render() {
        // let fontSmoothing;
        // if (this.state.fontSmoothing === "Grayscale") {
        //     fontSmoothing = { webkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }
        // } else if (this.state.fontSmoothing === "None") {
        //     fontSmoothing = { webkitFontSmoothing: "none", MozOsxFontSmoothing: "none"}
        // } else {
        //     fontSmoothing = { webkitFontSmoothing: "subpixel-antialiased", MozOsxFontSmoothing: "auto" }
        // }
        // let textStyle = {
        //     fontFamily: `"${this.state.fontFamily}", sans-serif`,
        //     fontSize: this.state.fontSize,
        //     color: this.state.color,
        //     ...fontSmoothing
        // }
        return (
            <div className="TextItem">
                <textarea className="text" defaultValue={this.props.text}></textarea>
            </div>
        );
    }
}

export default TextBox;
