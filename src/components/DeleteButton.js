import React from 'react'
import { connect } from 'react-redux'

const DeleteButton = ({ textBoxes, dispatch }) => (
    <button
      className='DeleteButton'
      onClick={() => {
        dispatch({
          type: 'DELETE_TEXTBOX'
        })
      }}>
      Delete
    </button>
)

export default connect()(DeleteButton)
