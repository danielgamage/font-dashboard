import React from 'react'
import { connect } from 'react-redux'
import text from '../data/text.js'

const TextSamples = ({ dispatch, active }) => (
  <div id='samples' className={`TextList ${active && 'active'}`}>
    <h3 className='TextList__Heading'>Select a sample text string</h3>
    <ul className='TextList__List'>
      {text.map(el => (
        <li
          key={el}
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
  </div>
)

export default connect()(TextSamples)
