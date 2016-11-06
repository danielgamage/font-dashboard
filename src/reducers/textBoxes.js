const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: action.id,
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
