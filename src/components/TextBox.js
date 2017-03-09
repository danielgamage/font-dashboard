import React, { Component } from 'react'
import { connect } from 'react-redux'
import readFile from '../utils/readFile.js'
import getStyles from '../utils/getStyles.js'

class TextBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editable: false
    }
  }
  componentWillReceiveProps () {
    if (!this.props.textBox.selected) {
      this.setState({ editable: false })
    }
  }
  render () {
    const item = this.props.textBox
    const styles = getStyles(item)
    return (
      <div
        className={'TextItem' + (item.selected ? ' selected' : '')}
        draggable={item.selected}
        onDragStart={(e) => {
          this.props.dispatch({
            type: 'DRAG_TEXTBOXES'
          })
        }}
        onDragEnd={(e) => {
          const boxes = document.querySelectorAll('.TextItem')
          const scrollPosition = window.pageYOffset
          let dragIndex
          ;[...boxes].some((box, i) => { // use some to return as soon as a match is found
            dragIndex = i
            const bounds = box.getBoundingClientRect()
            const midline = bounds.top + (bounds.height / 2)
            return e.pageY < (bounds.top + (bounds.height / 2))
          })
          console.log(`dragIndex: ${dragIndex}`)
          this.props.dispatch({
            type: 'DROP_TEXTBOXES',
            index: dragIndex
          })
        }}
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
          contentEditable={(item.selected && this.state.editable) ? 'true' : 'false'}
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
            if (item.selected) {
              this.setState({ editable: true })
            } else {
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
            }
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
  const textBox = state.textBoxes.active.filter(el => {
    return (el.id === ownProps.textBox.id)
  })[0]
  return { textBox: {...textBox} }
}

export default connect(mapStateToProps)(TextBox)
