import opentypeFeatures from '../data/opentypeFeatures.js'

const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: action.id,
        color: action.color,
        backgroundColor: 'rgba(255,255,255,0)',
        text: action.text,
        selected: false,
        fontFamily: 'sans-serif',
        fontSize: { value: 1, unit: 'rem' },
        weight: 0.3,
        tracking: { value: 0, unit: 'rem' },
        leading: { value: 1.5, unit: 'em' },
        columns: 1,
        gutters: { value: 1, unit: 'rem' },
        alignment: 'left',
        textTransform: 'none',
        padding: {
          top: { value: 0, unit: 'px' },
          right: { value: 0, unit: 'px' },
          bottom: { value: 0, unit: 'px' },
          left: { value: 0, unit: 'px' },
          lock: false
        },
        margin: {
          top: { value: 0, unit: 'px' },
          right: { value: 0, unit: 'px' },
          bottom: { value: 0, unit: 'px' },
          left: { value: 0, unit: 'px' },
          lock: false
        },
        rendering: 'Subpixel',
        opentype: opentypeFeatures.map(el => ({key: el.value, value: 0}))
      }
    case 'DELETE_TEXTBOX':
      return false
    default:
      return state
  }
}

const textBoxes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return [
        ...state,
        action.font
      ]
    default:
      return state
  }
}

export default textBoxes
