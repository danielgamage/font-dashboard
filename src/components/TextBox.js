import React, { Component } from 'react'
import { connect } from 'react-redux'
import readFile from '../utils/readFile.js'

import './TextBox.css'

class TextBox extends Component {
  render () {
    const item = this.props.textBox
    let fontSmoothing
    if (item.rendering === 'Grayscale') {
      fontSmoothing = { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }
    } else if (item.rendering === 'None') {
      fontSmoothing = { WebkitFontSmoothing: 'none', MozOsxFontSmoothing: 'none'}
    } else {
      fontSmoothing = { WebkitFontSmoothing: 'subpixel-antialiased', MozOsxFontSmoothing: 'auto' }
    }
    const textOrientation = {
      WebkitTextOrientation: item.textOrientation,
      MozTextOrientation: item.textOrientation,
      textOrientation: item.textOrientation
    }
    const opentypeValues = item.opentype.map(el => (`"${el.key}" ${el.value ? 1 : 0}`)).join(', ')
    const variations = item.variations.map(el => (`"${el.key}" ${el.value}`)).join(', ')

    const styles = {
      fontFamily: `'${item.fontFamily}'`,
      fontSize: `${item.fontSize.value}${item.fontSize.unit}`,
      color: item.color,
      backgroundColor: item.backgroundColor,
      letterSpacing: `${item.tracking.value}${item.tracking.unit}`,
      wordSpacing: `${item.wordSpacing.value}${item.wordSpacing.unit}`,
      lineHeight: `${item.leading.value}${item.leading.unit}`,
      textAlign: `${item.alignment}`,
      textTransform: item.textTransform,
      columnCount: item.columns,
      columnGap: `${item.gutters.value}${item.gutters.unit}`,
      fontWeight: `${item.weight}`,
      fontKerning: item.kerning ? 'normal' : 'none',
      fontStretch: `${item.width}%`,
      fontVariationSettings: variations,
      padding: `
        ${item.padding.top.value}${item.padding.top.unit}
        ${item.padding.right.value}${item.padding.right.unit}
        ${item.padding.bottom.value}${item.padding.bottom.unit}
        ${item.padding.left.value}${item.padding.left.unit}`,
      margin: `
        ${item.margin.top.value}${item.margin.top.unit}
        ${item.margin.right.value}${item.margin.right.unit}
        ${item.margin.bottom.value}${item.margin.bottom.unit}
        ${item.margin.left.value}${item.margin.left.unit}
        `,
      fontFeatureSettings: opentypeValues,
      ...fontSmoothing,
      ...textOrientation
    }
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
          contentEditable='true'
          placeholder='Type here...'
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
          onFocus={(e) => {
            this.props.dispatch({
              type: 'SELECT_TEXTBOXES',
              ids: [item.id],
              operation: false
            })
          }}
          onInput={(e) => {
            this.props.dispatch({
              type: 'UPDATE_TEXT',
              value: e.target.textContent
            })
          }}
          style={styles}
          rows='1'
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
