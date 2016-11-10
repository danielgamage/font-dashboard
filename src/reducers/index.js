import { combineReducers } from 'redux'
import textBoxes from './textBoxes'
import page from './page'
import undoable from 'redux-undo'

const todoApp = combineReducers({
  textBoxes: undoable(textBoxes),
  page: undoable(page)
})

export default todoApp
