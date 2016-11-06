import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AddButton from './AddButton'
import './TextBox.css'

const TextBox = ({ text }) => (
  <div className='TextItem'>
    <textarea
      className='text'
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
