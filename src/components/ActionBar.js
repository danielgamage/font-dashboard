import React, { Component } from 'react'
import { connect } from 'react-redux'

import DeleteButton from './DeleteButton'

import './ActionBar.css'

const ActionBar = (dispatch) => {
  return (
    <div className='ActionBar'>
      <div className='Command'>
        <DeleteButton/>
      </div>
    </div>
  )
}

export default connect()(ActionBar)
