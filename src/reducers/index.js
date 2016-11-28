import { combineReducers } from 'redux'
import textBoxes from './textBoxes'
import page from './page'
import view from './view'
import fonts from './fonts'
import undoable from 'redux-undo'

const todoApp = combineReducers({
  textBoxes: undoable(textBoxes),
  page: undoable(page),
  view: view,
  fonts: fonts
})

const rootReducer = (state, action) => {
  // Reset state to default
  if (action.type === 'RESET_STATE') {
    state = undefined
  }
  return todoApp(state, action)
}

export default rootReducer
