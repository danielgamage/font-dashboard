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

const parseValue = (value, valueOrUnit) => {
  if (valueOrUnit === 'value') {
    return parseFloat(value)
  } else {
    return value
  }
}

const page = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_WIDTH':
      const newState = { ...state }
      newState.width[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return newState
    default:
      return state
  }
}

export default page
