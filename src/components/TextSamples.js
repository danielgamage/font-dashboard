import React from 'react'
import { connect } from 'react-redux'
import text from '../data/text.js'

const TextSamples = ({ dispatch }) => (
  <ul className='TextList'>
    {text.map(el => (
      <li
        className='TextList__Item'
        onClick={() => {
          dispatch({
            type: 'UPDATE_TEXT',
            value: el
          })
        }}
        >{el}</li>
    ))}
  </ul>
)

export default connect()(TextSamples)
