const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: action.id,
        color: action.color,
        text: action.text,
        selected: false,
        fontSize: 16,
        fontFamily: 'sans-serif',
        tracking: 0,
        leading: 1.5,
        columns: 1,
        alignment: 'left'
      }
    case 'UPDATE_FONT_SIZE':
      state.fontSize = parseFloat(action.value)
      return state
    case 'UPDATE_FONT_TRACKING':
      state.tracking = parseFloat(action.value)
      return state
    case 'UPDATE_FONT_LEADING':
      state.leading = parseFloat(action.value)
      return state
    case 'UPDATE_FONT_FAMILY':
      state.fontFamily = action.value
      return state
    case 'UPDATE_COLOR':
      state.color = action.value
      return state
    case 'UPDATE_COLUMNS':
      state.columns = action.value
      return state
    case 'UPDATE_ALIGNMENT':
      state.alignment = action.value
      return state
    case 'UPDATE_TEXT':
      state.text = action.value
      return state
    case 'UPDATE_RENDERING':
      state.rendering = action.value
      return state
    default:
      return state
  }
}

const textBoxes = (state = [], action) => {
  let selectedID
  if (state.length > 0) {
    const selectedObjects = [...state].filter(el => el.selected)
    selectedID = selectedObjects.length && selectedObjects[0].id // lol
  }
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return [
        ...state.slice(0, action.index),
        textBox(undefined, action),
        ...state.slice(action.index, state.length)
      ]
    case 'DESELECT_TEXTBOXES':
      return ([...state].map(el => {
        return { ...el, selected: false }
      }))
    case 'SELECT_TEXTBOX':
      return ([...state].map(el => {
        return { ...el, selected: (el.id === action.id) }
      }))
    case 'DELETE_TEXTBOX':
      return ([...state].filter(el => {
        if (el.id === selectedID) {
          return false
        }
        return true
      }))
    case 'UPDATE_TEXT':
    case 'UPDATE_FONT_SIZE':
    case 'UPDATE_FONT_TRACKING':
    case 'UPDATE_FONT_LEADING':
    case 'UPDATE_FONT_FAMILY':
    case 'UPDATE_COLOR':
    case 'UPDATE_COLUMNS':
    case 'UPDATE_ALIGNMENT':
    case 'UPDATE_RENDERING':
      return ([...state].map(el => {
        if (el.id === selectedID) {
          textBox(el, action)
        }
        return el
      }))
    default:
      return state
  }
}

export default textBoxes
