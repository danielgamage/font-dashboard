const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: action.id,
        index: action.index,
        color: action.color,
        text: action.text,
        selected: false
      }
    default:
      return state
  }
}

const textBoxes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return [
        ...state,
        textBox(undefined, action)
      ]
    case 'SELECT_TEXTBOX':
      [...state].map(el => {
        el.selected = (el.id === action.id)
      })
    default:
      return state
  }
}

export default textBoxes
