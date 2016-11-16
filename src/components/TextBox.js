import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import readFile from '../utils/readFile.js'

import './TextBox.css'

const TextBox = ({ text, dispatch, id, selected, fontFamily, tracking, leading, color, backgroundColor, fontSize, columns, gutters, alignment, rendering, opentype }) => {
  let fontSmoothing
  if (rendering === 'Grayscale') {
    fontSmoothing = { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }
  } else if (rendering === 'None') {
    fontSmoothing = { WebkitFontSmoothing: 'none', MozOsxFontSmoothing: 'none'}
  } else {
    fontSmoothing = { WebkitFontSmoothing: 'subpixel-antialiased', MozOsxFontSmoothing: 'auto' }
  }
  const opentypeValue = opentype.map(el => (`"${el.key}" ${el.value ? 1 : 0}`)).join(', ')
  const styles = {
    fontFamily: `'${fontFamily}'`,
    fontSize: `${fontSize}px`,
    color: color,
    backgroundColor: backgroundColor,
    letterSpacing: `${tracking}em`,
    lineHeight: leading,
    textAlign: alignment,
    columnCount: columns,
    columnGap: `${gutters}rem`,
    fontFeatureSettings: opentypeValue,
    ...fontSmoothing
  }
  return (
      <div
        className={'TextItem' + (selected ? ' selected' : '')}
        onDrop={(e) => {
          e.preventDefault();
          // If dropped items aren't files, reject them
          var dt = e.dataTransfer;
          if (dt.items) {
            const files = [...dt.items].map((file, i) => {
              if (dt.items[i].kind === "file") {
                return dt.items[i].getAsFile()
              }
              return false
            })
            readFile(files[0])
            files.map((file) => {
              dispatch({
                type: 'UPDATE_FONT_FAMILY',
                value: file.name,
                id: id
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
            dispatch({
              type: 'SELECT_TEXTBOX',
              id: id,
              add: e.shiftKey
            })
          }}
          onInput={(e) => {
            dispatch({
              type: 'UPDATE_TEXT',
              value: e.target.innerText
            })
          }}
          style={styles}
          rows='1'
        >
          {text}
        </div>
      </div>
  )
}

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  fontFamily: PropTypes.string.isRequired,
  tracking: PropTypes.number.isRequired,
  leading: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  gutters: PropTypes.number.isRequired,
  alignment: PropTypes.string.isRequired,
  rendering: PropTypes.string.isRequired,
  opentype: PropTypes.array.isRequired
}

function mapStateToProps (state, ownProps) {
  const textBox = state.textBoxes.present.filter(el => {
    return (el.id === ownProps.id)
  })[0]
  return { ...textBox }
}

export default connect(mapStateToProps)(TextBox)
