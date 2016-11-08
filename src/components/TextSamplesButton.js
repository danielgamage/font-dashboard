import React from 'react'
import { connect } from 'react-redux'

const TextSamplesButton = ({ dispatch }) => (
  <button
    className='TextSamplesButton'
    onClick={() => {
      dispatch({
        type: 'UPDATE_TEXT'

      })
    }}>
    Text
  </button>
)

export default connect()(TextSamplesButton)
