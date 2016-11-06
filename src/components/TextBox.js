import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './TextBox.css'

const TextBox = ({ text, dispatch, id }) => (
  <div className='TextItem'>
    <textarea
      className='text'
      onFocus={() => {
        dispatch({
          type: 'SELECT_TEXTBOX',
          id: id
        })
      }}
      defaultValue={text}
    />
  </div>
)

TextBox.propTypes = {
  onFocus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

function mapStateToProps (state) {
  return { textBoxes: state.textBoxes }
}

export default connect(mapStateToProps)(TextBox)
