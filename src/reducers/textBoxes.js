const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: action.id,
        index: action.index,
        color: action.color,
        text: action.text
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
    default:
      return state
  }
}

export default textBoxes
