import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './AddButton.css'

const AddButton = ({ textBoxes, dispatch, index }) => (
  <div className='AddContainer'>
    <button
      className='AddButton'
      onClick={() => {
        dispatch({
          type: 'ADD_TEXTBOX',
          id: (new Date().getTime()),
          index: index,
          text: 'Type here...',
          color: '#666'
        })
      }}>
      Add textbox
    </button>
  </div>
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
