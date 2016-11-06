import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectTextBox } from '../actions'

import './TextBox.css'

const TextBox = ({ text, dispatch, id, fontSize }) => {
  const styles = { fontSize: `${fontSize}px` }
  return (
    <div className='TextItem'>
      <textarea
        className='text'
        onFocus={() => {
          dispatch({
            type: 'SELECT_TEXTBOX',
            id: id
          })
        }}
        style={styles}
        defaultValue={text}
      />
    </div>
  )
}

TextBox.propTypes = {
  onFocus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired
}

function mapStateToProps (state, ownProps) {
  const textBox = state.textBoxes.filter(el => {
    return (el.id === ownProps.id)
  })[0]
  console.log(textBox)
  return { textBox: textBox }
}

export default connect(mapStateToProps)(TextBox)
