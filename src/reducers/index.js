import { combineReducers } from 'redux'
import textBoxes from './textBoxes'
import page from './page'

const todoApp = combineReducers({
  textBoxes,
  page
})

export default todoApp
