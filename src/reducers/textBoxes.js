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
        columns: 1
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
      return ([...state].map(el => {
        if (el.id === action.id) {
          console.log(action.text)
          el.text = action.text
        }
        return el
      }))
    case 'UPDATE_FONT_SIZE':
    case 'UPDATE_FONT_TRACKING':
    case 'UPDATE_FONT_LEADING':
    case 'UPDATE_FONT_FAMILY':
    case 'UPDATE_COLOR':
    case 'UPDATE_COLUMNS':
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
