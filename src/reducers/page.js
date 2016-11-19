const defaultState = {
  width: {
    value: 20,
    unit: 'rem'
  },
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  }
}

const page = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_WIDTH':
      const newState = { ...state }
      console.log(action)
      newState.width.value = parseFloat(action.value)
      return newState
    default:
      return state
  }
}

export default page
