import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const AddButton = ({ textBoxes, dispatch }) => (
  <button
    onClick={() => {
      dispatch({
        type: 'ADD_TEXTBOX',
        id: (new Date().getTime()),
        index: textBoxes.length,
        text: 'Type here...',
        color: '#666'
      })
    }}>
    Add textbox
  </button>
)

AddButton.propTypes = {
  index: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    textBoxes: state.textBoxes
  }
}

export default connect(mapStateToProps)(AddButton)
