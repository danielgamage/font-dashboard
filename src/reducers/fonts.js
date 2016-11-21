const fonts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FONT':
      return [
        ...state,
        action.value
      ]
    default:
      return state
  }
}

export default fonts
