import React, { PropTypes } from 'react'

import './TextBox.css'

const TextBox = ({ text }) => (
    <div className="TextItem">
        <textarea
            className="text"
            defaultValue={text}
            >
        </textarea>
    </div>
)

TextBox.propTypes = {
  onFocus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default TextBox
