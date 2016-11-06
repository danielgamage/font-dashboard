import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const AddButton = ({ dispatch }) => (
  <button
    onClick={() => {
      dispatch({
        type: 'ADD_TEXTBOX',
        text: 'Type here...'
      })
    }}>
    Add textbox
  </button>
)

AddButton.propTypes = {
  text: PropTypes.string.isRequired
}

export default connect()(AddButton)
