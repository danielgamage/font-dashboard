import opentypeFeatures from '../data/opentypeFeatures.js'
import getLanguage from '../utils/getLanguage.js'
import generateID from '../utils/generateID.js'

const parseValue = (value, valueOrUnit) => {
  if (valueOrUnit === 'value') {
    return parseFloat(value)
  } else {
    return value
  }
}

const textBox = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        id: generateID(),
        color: '#333',
        backgroundColor: 'rgba(255,255,255,0)',
        text: '',
        selected: false,
        fontFamily: 'sans-serif',
        fontSize: { value: 1, unit: 'rem' },
        weight: 400,
        width: 100,
        tracking: { value: 0, unit: 'em' },
        kerning: true,
        textOrientation: "upright",
        wordSpacing: { value: 0, unit: 'em' },
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
        blur: { value: 0, unit: 'px' },
        rendering: 'Subpixel',
        opentype: opentypeFeatures.map(el => ({key: el.value, value: false})),
        language: getLanguage('ENG') && getLanguage('ENG').subtag[0],
        variations: []
      }
    case 'UPDATE_FONT_SIZE':
      state.fontSize[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_FONT_VARIATION':
      const index = state.variations.findIndex(el => (el.key === action.key))
      if (index === -1) {
        state.variations.push({key: action.key, value: parseValue(action.value, 'value')})
      } else {
        state.variations[index].value = parseValue(action.value, 'value')
      }
      return state
    case 'UPDATE_FONT_WEIGHT':
      state.weight = parseValue(action.value, 'value')
      return state
    case 'UPDATE_FONT_WIDTH':
      state.width = parseValue(action.value, 'value')
      return state
    case 'UPDATE_FONT_TRACKING':
      state.tracking[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_FONT_WORD_SPACING':
      state.wordSpacing[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_FONT_LEADING':
      state.leading[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_FONT_FAMILY':
      state.fontFamily = action.value
      return state
    case 'UPDATE_COLOR':
      state.color = action.value
      return state
    case 'UPDATE_FONT_KERNING':
      state.kerning = action.value
      return state
    case 'UPDATE_BACKGROUND_COLOR':
      state.backgroundColor = action.value
      return state
    case 'UPDATE_COLUMNS':
      state.columns = action.value
      return state
    case 'UPDATE_GUTTERS':
      state.gutters[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_ALIGNMENT':
      state.alignment = action.value
      return state
    case 'UPDATE_TEXT_ORIENTATION':
      state.textOrientation = action.value
      return state
    case 'UPDATE_TEXT_TRANSFORM':
      state.textTransform = action.value
      return state
    case 'UPDATE_TEXT':
      state.text = action.value || ''
      return state
    case 'UPDATE_BLUR':
      state.blur[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      return state
    case 'UPDATE_RENDERING':
      state.rendering = action.value
      return state
    case 'UPDATE_PADDING':
      if (state.padding.lock) {
        state.padding.top[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
        state.padding.right[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
        state.padding.bottom[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
        state.padding.left[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      } else {
        state.padding[action.key][action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      }
      return state
    case 'UPDATE_PADDING_LOCK':
      state.padding.lock = action.value
      return state
    case 'UPDATE_MARGIN':
      if (state.margin.lock) {
        state.margin.top[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
        state.margin.right[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
        state.margin.bottom[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
        state.margin.left[action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      } else {
        state.margin[action.key][action.valueOrUnit] = parseValue(action.value, action.valueOrUnit)
      }
      return state
    case 'UPDATE_MARGIN_LOCK':
      state.margin.lock = action.value
      return state
    case 'UPDATE_OPENTYPE':
      state.opentype.map(el => {
        if (el.key === action.key) {
          el.value = action.value
        }
        return el
      })
      return state
    case 'UPDATE_LANGUAGE':
      state.language = action.value
      return state
    case 'DELETE_TEXTBOX':
      return false
    default:
      return state
  }
}

const textBoxes = (state = [], action) => {
  let selectedIDs
  if (state.length > 0) {
    const selectedObjects = [...state].filter(el => el.selected)
    selectedIDs = selectedObjects.length && selectedObjects.map(el => el.id)
  }
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return [
        ...state.slice(0, action.index),
        textBox(undefined, action),
        ...state.slice(action.index, state.length)
      ]
    case 'DUPLICATE_TEXTBOX':
      let newState = []
      ;[...state].map((el, index) => {
        newState.push(el)
        if (selectedIDs.indexOf(el.id) !== -1) {
          newState.push({...el, id: generateID() })
        }
        return true
      })
      return newState
    case 'DESELECT_TEXTBOXES':
      return ([...state].map(el => {
        return { ...el, selected: false }
      }))
    case 'SELECT_TEXTBOXES':
      return ([...state].map(el => {
        if (action.operation === "ADD") {
          if (action.ids.indexOf(el.id) !== -1) {
            el = { ...el, selected: true }
          }
        } else if (action.operation === "SUBTRACT") {
          if (action.ids.indexOf(el.id) !== -1) {
            el = { ...el, selected: false }
          }
        } else {
          el = { ...el, selected: action.ids.indexOf(el.id) !== -1 }
        }
        return { ...el }
      }))
    case 'DELETE_TEXTBOX':
      return ([...state].filter(el => {
        if (selectedIDs.indexOf(el.id) !== -1) {
          return false
        }
        return true
      }))
    case 'UPDATE_TEXT':
    case 'UPDATE_FONT_SIZE':
    case 'UPDATE_FONT_WEIGHT':
    case 'UPDATE_FONT_WIDTH':
    case 'UPDATE_FONT_VARIATION':
    case 'UPDATE_FONT_TRACKING':
    case 'UPDATE_FONT_KERNING':
    case 'UPDATE_TEXT_ORIENTATION':
    case 'UPDATE_FONT_WORD_SPACING':
    case 'UPDATE_FONT_LEADING':
    case 'UPDATE_FONT_FAMILY':
    case 'UPDATE_COLOR':
    case 'UPDATE_BACKGROUND_COLOR':
    case 'UPDATE_COLUMNS':
    case 'UPDATE_GUTTERS':
    case 'UPDATE_ALIGNMENT':
    case 'UPDATE_TEXT_TRANSFORM':
    case 'UPDATE_BLUR':
    case 'UPDATE_RENDERING':
    case 'UPDATE_PADDING':
    case 'UPDATE_PADDING_UNIT':
    case 'UPDATE_MARGIN':
    case 'UPDATE_MARGIN_UNIT':
    case 'UPDATE_PADDING_LOCK':
    case 'UPDATE_MARGIN_LOCK':
    case 'UPDATE_OPENTYPE':
    case 'UPDATE_LANGUAGE':
      return ([...state].map(el => {
        if ((selectedIDs && selectedIDs.indexOf(el.id) !== -1) || el.id === action.id) {
          el = textBox(el, action)
        }
        if (el === false) {
          return false
        } else {
          return el
        }
      }))
    default:
      return state
  }
}

export default textBoxes
