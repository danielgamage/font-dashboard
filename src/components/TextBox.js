import React, { Component } from 'react'
import { connect } from 'react-redux'
import readFile from '../utils/readFile.js'
import getStyles from '../utils/getStyles.js'

import './TextBox.css'

class TextBox extends Component {
  render () {
    const item = this.props.textBox
    const styles = getStyles(item)
    return (
      <div
        className={'TextItem' + (item.selected ? ' selected' : '')}
        onDrop={(e) => {
          e.preventDefault()
          // If dropped items aren't files, reject them
          var dt = e.dataTransfer
          if (dt.files) {
            [...dt.files].map((file) => {
              readFile(file).then((font) => {
                this.props.dispatch({
                  type: 'UPDATE_FONT_FAMILY',
                  value: font.names.fullName.en,
                  id: item.id
                })
                this.props.dispatch({
                  type: 'ADD_FONT',
                  value: font
                })
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
          contentEditable={item.selected ? 'true' : 'false'}
          tabIndex='0'
          placeholder='Type here...'
          spellCheck='false'
          lang={item.language}
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            // prevent deselection
            e.stopPropagation()
            let operation = false
            if (e.shiftKey) {
              operation = "ADD"
            } else if (e.altKey) {
              operation = "SUBTRACT"
            }
            this.props.dispatch({
              type: 'SELECT_TEXTBOXES',
              ids: [item.id],
              operation: operation
            })
          }}
          onInput={(e) => {
            this.props.dispatch({
              type: 'UPDATE_TEXT',
              value: e.target.textContent
            })
          }}
          style={styles}
        >
          {item.text}
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
