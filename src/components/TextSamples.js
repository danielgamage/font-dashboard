import React from 'react'
import { connect } from 'react-redux'
import text from '../data/text.js'

import './TextSamples.css'

const TextSamples = ({ dispatch }) => (
  <ul className='TextList'>
    {text.map(el => (
      <li>{el}</li>
    ))}
  </ul>
)

export default connect()(TextSamples)
