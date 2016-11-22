import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './AddButton.css'

const AddButton = ({ dispatch, solo, index }) => (
  <div className={'AddContainer' + (solo ? ' solo' : '')}>
    <button
      className='AddButton'
      onClick={() => {
        dispatch({
          type: 'ADD_TEXTBOX',
          id: (new Date().getTime()),
          index: index,
          text: ''
        })
      }}>
      +
    </button>
    <div className='AddBackground'></div>
  </div>
)

AddButton.propTypes = {
  index: PropTypes.number.isRequired
}

export default connect()(AddButton)
