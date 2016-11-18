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
        fontSize: 16,
        fontFamily: 'sans-serif',
        tracking: 0,
        leading: 1.5,
        columns: 1,
        gutters: 1,
        alignment: 'left',
        textTransform: 'none',
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          lock: false
        },
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          lock: false
        },
        rendering: 'Subpixel',
        opentype: opentypeFeatures.map(el => ({key: el.value, value: 0}))
      }
    case 'UPDATE_FONT_SIZE':
      state.fontSize = parseFloat(action.value)
      return state
    case 'UPDATE_FONT_TRACKING':
      state.tracking = parseFloat(action.value)
      return state
    case 'UPDATE_FONT_LEADING':
      state.leading = parseFloat(action.value)
      return state
    case 'UPDATE_FONT_FAMILY':
      state.fontFamily = action.value
      return state
    case 'UPDATE_COLOR':
      state.color = action.value
      return state
    case 'UPDATE_BACKGROUND_COLOR':
      state.backgroundColor = action.value
      return state
    case 'UPDATE_COLUMNS':
      state.columns = action.value
      return state
    case 'UPDATE_GUTTERS':
      state.gutters = action.value
      return state
    case 'UPDATE_ALIGNMENT':
      state.alignment = action.value
      return state
    case 'UPDATE_TEXT_TRANSFORM':
      state.textTransform = action.value
      return state
    case 'UPDATE_TEXT':
      state.text = action.value || ''
      return state
    case 'UPDATE_RENDERING':
      state.rendering = action.value
      return state
    case 'UPDATE_PADDING':
      if (state.padding.lock) {
        state.padding.top = parseFloat(action.value)
        state.padding.right = parseFloat(action.value)
        state.padding.bottom = parseFloat(action.value)
        state.padding.left = parseFloat(action.value)
      } else {
        state.padding[action.key] = parseFloat(action.value)
      }
      return state
    case 'UPDATE_PADDING_LOCK':
      state.padding.lock = action.value
      return state
    case 'UPDATE_MARGIN':
      if (state.margin.lock) {
        state.margin.top = parseFloat(action.value)
        state.margin.right = parseFloat(action.value)
        state.margin.bottom = parseFloat(action.value)
        state.margin.left = parseFloat(action.value)
      } else {
        state.margin[action.key] = parseFloat(action.value)
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
    case 'DESELECT_TEXTBOXES':
      return ([...state].map(el => {
        return { ...el, selected: false }
      }))
    case 'SELECT_TEXTBOX':
      return ([...state].map(el => {
        if (action.add) {
          if (el.id === action.id) {
            el = { ...el, selected: true }
          }
        } else {
          el = { ...el, selected: el.id === action.id }
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
    case 'UPDATE_FONT_TRACKING':
    case 'UPDATE_FONT_LEADING':
    case 'UPDATE_FONT_FAMILY':
    case 'UPDATE_COLOR':
    case 'UPDATE_BACKGROUND_COLOR':
    case 'UPDATE_COLUMNS':
    case 'UPDATE_GUTTERS':
    case 'UPDATE_ALIGNMENT':
    case 'UPDATE_TEXT_TRANSFORM':
    case 'UPDATE_RENDERING':
    case 'UPDATE_PADDING':
    case 'UPDATE_MARGIN':
    case 'UPDATE_PADDING_LOCK':
    case 'UPDATE_MARGIN_LOCK':
    case 'UPDATE_OPENTYPE':
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
