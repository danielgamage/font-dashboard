const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: action.id,
        color: action.color,
        text: action.text,
        selected: false,
        fontSize: 16
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
      return ([...state].map(el => {
        return { ...el, selected: (el.id === action.id) }
      }))
    case 'UPDATE_FONT_SIZE':
      const id = [...state].filter(el => el.selected)[0].id // lol
      return ([...state].map(el => {
        if (el.id === id) {
          console.log(action.value)
          el.fontSize = parseFloat(action.value)
        }
        return el
      }))
    default:
      return state
  }
}

export default textBoxes
