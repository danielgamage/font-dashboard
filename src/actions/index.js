export const addTextBox = (text) => ({
  type: 'ADD_TEXTBOX',
  id: 0,
  index: 0,
  color: "#fff",
  fontFamily: 'sans-serif',
  text
})

export const selectTextBox = (id) => ({
  type: 'SELECT_TEXTBOX',
  id
})

export const deleteTextBox = (id) => ({
  type: 'DELETE_TEXTBOX',
  id
})

export const updateFontSize = (value) => ({
  type: 'UPDATE_FONT_SIZE',
  value
})

export const updateFontTracking = (value) => ({
  type: 'UPDATE_FONT_TRACKING',
  value
})

export const updateFontLeading = (value) => ({
  type: 'UPDATE_FONT_LEADING',
  value
})

export const updateFontFamily = (value) => ({
  type: 'UPDATE_FONT_FAMILY',
  value
})

export const updateColor = (value) => ({
  type: 'UPDATE_COLOR',
  value
})
