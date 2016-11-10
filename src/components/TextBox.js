import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './TextBox.css'

const TextBox = ({ text, dispatch, id, selected, fontFamily, tracking, leading, color, fontSize, columns, alignment, rendering }) => {
  let fontSmoothing
  if (rendering === 'Grayscale') {
    fontSmoothing = { webkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }
  } else if (rendering === 'None') {
    fontSmoothing = { webkitFontSmoothing: 'none', MozOsxFontSmoothing: 'none'}
  } else {
    fontSmoothing = { webkitFontSmoothing: 'subpixel-antialiased', MozOsxFontSmoothing: 'auto' }
  }
  const styles = {
    fontFamily: `'${fontFamily}'`,
    fontSize: `${fontSize}px`,
    color: color,
    letterSpacing: `${tracking}em`,
    lineHeight: leading,
    textAlign: alignment,
    columnCount: columns,
    ...fontSmoothing
  }
  return (
    <div className={'TextItem' + (selected ? ' selected' : '')}>
      <div
        className='text'
        contentEditable='true'
        onClick={(e) => {
          // prevent deselection
          e.stopPropagation()
        }}
        onFocus={() => {
          dispatch({
            type: 'SELECT_TEXTBOX',
            id: id
          })
        }}
        onInput={(e) => {
          dispatch({
            type: 'UPDATE_TEXT',
            text: e.target.innerText
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
  alignment: PropTypes.string.isRequired,
  rendering: PropTypes.string.isRequired
}

function mapStateToProps (state, ownProps) {
  const textBox = state.textBoxes.present.filter(el => {
    return (el.id === ownProps.id)
  })[0]
  return { ...textBox }
}

export default connect(mapStateToProps)(TextBox)
