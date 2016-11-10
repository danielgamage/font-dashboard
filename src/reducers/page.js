const defaultState = {
  width: 20,
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  }
}

const page = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_PADDING':
      return [...state].padding[action.direction] = action.value
    case 'UPDATE_PAGE_WIDTH':
      const newState = {
        ...state,
        width: parseFloat(action.value)
      }
      return newState
    default:
      return state
  }
}

export default page
