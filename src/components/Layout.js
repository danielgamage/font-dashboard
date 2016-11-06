import React, { PropTypes } from 'react'
import TextBox from './TextBox'
import AddButton from './AddButton'

const Layout = ({ textBoxes, onTextBoxFocus }) => (
  <div>
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

Layout.propTypes = {
  textBoxes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired).isRequired
  // onTextBoxFocus: PropTypes.func.isRequired
}

export default Layout
