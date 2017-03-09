import { combineReducers } from 'redux'
import textBoxes from './textBoxes'
import page from './page'
import view from './view'
import fonts from './fonts'

const todoApp = combineReducers({
  textBoxes: textBoxes,
  page: page,
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
