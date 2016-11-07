import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './DeleteButton.css'

const DeleteButton = ({ textBoxes, dispatch, id }) => (
    <button
      className='DeleteButton'
      onClick={() => {
        dispatch({
          type: 'DELETE_TEXTBOX',
          id: id
        })
      }}>
      Delete
    </button>
)

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired
}

export default connect()(DeleteButton)
