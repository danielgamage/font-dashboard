const defaultState = {
  width: {
    value: 20,
    unit: 'rem'
  },
  writingMode: 'horizontal',
  direction: 'ltr',
  padding: { value: 2, unit: 'rem' },
  backgroundColor: 'transparent',
  gutters: { value: 2, unit: 'rem' }
}

const parseValue = (value, valueOrUnit) => {
  if (valueOrUnit === 'value') {
    return parseFloat(value)
  } else {
    return value
  }
}
const updateProp = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_WIDTH':
      state.width[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_PAGE_PADDING':
      state.padding[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_PAGE_BACKGROUND_COLOR':
      state.backgroundColor = action.value
      return state
    case 'UPDATE_PAGE_WRITING_MODE':
      state.writingMode = action.value
      return state
    case 'UPDATE_PAGE_DIRECTION':
      state.direction = action.value
      return state
    default:
      return state
  }
}


const page = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_WIDTH':
    case 'UPDATE_PAGE_PADDING':
    case 'UPDATE_PAGE_BACKGROUND_COLOR':
    case 'UPDATE_PAGE_WRITING_MODE':
    case 'UPDATE_PAGE_DIRECTION':
      const newState = { ...state }
      return updateProp(newState, action)
    default:
      return state
  }
}

export default page
