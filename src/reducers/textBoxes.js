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
        leading: 1.5
      }
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
        if (el.id === action.id) {
          return false
        }
        return true
      }))
    case 'UPDATE_FONT_SIZE':
      return ([...state].map(el => {
        if (el.id === selectedID) {
          el.fontSize = parseFloat(action.value)
        }
        return el
      }))
    case 'UPDATE_FONT_TRACKING':
      return ([...state].map(el => {
        if (el.id === selectedID) {
          el.tracking = `${action.value}em`
        }
        return el
      }))
    case 'UPDATE_FONT_LEADING':
      return ([...state].map(el => {
        if (el.id === selectedID) {
          el.leading = parseFloat(action.value)
        }
        return el
      }))
    case 'UPDATE_FONT_FAMILY':
      return ([...state].map(el => {
        if (el.id === selectedID) {
          el.fontFamily = action.value
        }
        return el
      }))
    case 'UPDATE_COLOR':
      return ([...state].map(el => {
        if (el.id === selectedID) {
          el.color = action.value
        }
        return el
      }))
    default:
      return state
  }
}

export default textBoxes
