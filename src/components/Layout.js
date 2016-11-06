import React, { PropTypes } from 'react'
import TextBox from './TextBox'
import AddButton from './AddButton'
import { connect } from 'react-redux'

const Layout = ({ textBoxes, onTextBoxFocus, dispatch }) => {
  return (
    <div className='LayoutWrapper'>
      <AddButton index='0' />
      {textBoxes.map((textbox, i) => (
        <div>
          <TextBox
            key={textbox.id}
            {...textbox} />
          <AddButton index={i + 1} />
        </div>
      ))}
    </div>
  )
}

Layout.propTypes = {
  textBoxes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired
  }).isRequired).isRequired
  // onTextBoxFocus: PropTypes.func.isRequired
}

const getTextBoxes = (textBoxes) => {
  return textBoxes
}

const mapStateToProps = (state) => ({
  textBoxes: getTextBoxes(state.textBoxes)
})

export default connect(mapStateToProps)(Layout)
