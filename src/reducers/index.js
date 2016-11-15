import { combineReducers } from 'redux'
import textBoxes from './textBoxes'
import page from './page'
import view from './view'
import undoable from 'redux-undo'

const todoApp = combineReducers({
  textBoxes: undoable(textBoxes),
  page: undoable(page),
  view: undoable(view)
})

export default todoApp
