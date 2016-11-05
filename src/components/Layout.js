import React, { PropTypes } from 'react'
import TextBox from './TextBox'

const Layout = ({ textBoxes, onTextBoxFocus }) => (
  <div>
    {textBoxes.map(textbox =>
      <TextBox
        key={textbox.id}
        {...textbox}
        onFocus={() => onTextBoxFocus(textbox.id)}
        />
    )}
  </div>
)

Layout.propTypes = {
  textBoxes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTextBoxFocus: PropTypes.func.isRequired
}

export default Layout
