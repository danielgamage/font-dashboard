import React from 'react'
import { connect } from 'react-redux'

import DeleteButton from './DeleteButton'
import TextSamples from './TextSamplesButton'

import './ActionBar.css'

const ActionBar = (dispatch) => {
  return (
    <div className='ActionBar'>
        <DeleteButton/>
        <TextSamples/>
    </div>
  )
}

export default connect()(ActionBar)
