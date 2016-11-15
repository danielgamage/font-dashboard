const defaultState = {
  fullscreen: false
}

const view = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_FULLSCREEN':
      return { ...state, fullscreen: !state.fullscreen }
    default:
      return state
  }
}

export default view
