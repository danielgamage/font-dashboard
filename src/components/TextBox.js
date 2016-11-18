import React, { Component } from 'react'
import { connect } from 'react-redux'
import readFile from '../utils/readFile.js'

import './TextBox.css'

class TextBox extends Component {
  render () {
    let fontSmoothing
    if (this.props.textBox.rendering === 'Grayscale') {
      fontSmoothing = { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }
    } else if (this.props.textBox.rendering === 'None') {
      fontSmoothing = { WebkitFontSmoothing: 'none', MozOsxFontSmoothing: 'none'}
    } else {
      fontSmoothing = { WebkitFontSmoothing: 'subpixel-antialiased', MozOsxFontSmoothing: 'auto' }
    }
    const opentypeValue = this.props.textBox.opentype.map(el => (`"${el.key}" ${el.value ? 1 : 0}`)).join(', ')
    const styles = {
      fontFamily: `'${this.props.textBox.fontFamily}'`,
      fontSize: `${this.props.textBox.fontSize}px`,
      color: this.props.textBox.color,
      backgroundColor: this.props.textBox.backgroundColor,
      letterSpacing: `${this.props.textBox.tracking}em`,
      lineHeight: this.props.textBox.leading,
      textAlign: this.props.textBox.alignment,
      textTransform: this.props.textBox.textTransform,
      columnCount: this.props.textBox.columns,
      columnGap: `${this.props.textBox.gutters}rem`,
      padding: `${this.props.textBox.padding.top}px ${this.props.textBox.padding.right}px ${this.props.textBox.padding.bottom}px ${this.props.textBox.padding.left}px`,
      margin: `${this.props.textBox.margin.top}px ${this.props.textBox.margin.right}px ${this.props.textBox.margin.bottom}px ${this.props.textBox.margin.left}px`,
      fontFeatureSettings: opentypeValue,
      ...fontSmoothing
    }
    return (
      <div
        className={'TextItem' + (this.props.textBox.selected ? ' selected' : '')}
        onDrop={(e) => {
          e.preventDefault()
          // If dropped items aren't files, reject them
          var dt = e.dataTransfer
          if (dt.items) {
            const files = [...dt.items].map((file, i) => {
              if (dt.items[i].kind === "file") {
                return dt.items[i].getAsFile()
              }
              return false
            })
            readFile(files[0])
            files.map((file) => {
              this.props.dispatch({
                type: 'UPDATE_FONT_FAMILY',
                value: file.name,
                id: this.props.textBox.id
              })
              return true
            })
          } else {
            // Use DataTransfer interface to access the file(s)
            for (var i=0; i < dt.files.length; i++) {
              console.log("... file[" + i + "].name = " + dt.files[i].name);
            }
          }
        }}>
        <div
          className='text'
          contentEditable='true'
          placeholder='Type here...'
          onClick={(e) => {
            // prevent deselection
            e.stopPropagation()
            this.props.dispatch({
              type: 'SELECT_TEXTBOX',
              id: this.props.textBox.id,
              add: e.shiftKey
            })
          }}
          onInput={(e) => {
            this.props.dispatch({
              type: 'UPDATE_TEXT',
              value: e.target.innerText
            })
          }}
          style={styles}
          rows='1'
        >
          {this.props.textBox.text}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const textBox = state.textBoxes.present.filter(el => {
    return (el.id === ownProps.textBox.id)
  })[0]
  return { textBox: {...textBox} }
}

export default connect(mapStateToProps)(TextBox)
