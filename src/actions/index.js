export const addTextBox = (text, id, index) => ({
  type: 'ADD_TEXTBOX',
  id,
  index,
  text
})

export const selectTextBox = (id, add) => ({
  type: 'SELECT_TEXTBOX',
  id,
  add
})

export const deselectTextBoxes = (id) => ({
  type: 'DESELECT_TEXTBOXES',
  id
})

export const deleteTextBox = () => ({
  type: 'DELETE_TEXTBOX'
})

export const updateText = (value) => ({
  type: 'UPDATE_TEXT',
  value
})

export const updateFontSize = (value, valueOrUnit) => ({
  type: 'UPDATE_FONT_SIZE',
  value,
  valueOrUnit
})

export const updateFontSize = (value, valueOrUnit) => ({
  type: 'UPDATE_FONT_WEIGHT',
  value,
  valueOrUnit
})

export const updateFontTracking = (value, valueOrUnit) => ({
  type: 'UPDATE_FONT_TRACKING',
  value,
  valueOrUnit
})

export const updateFontLeading = (value, valueOrUnit) => ({
  type: 'UPDATE_FONT_LEADING',
  value,
  valueOrUnit
})

export const updateFontFamily = (value, id) => ({
  type: 'UPDATE_FONT_FAMILY',
  value,
  id
})

export const updateColumns = (value) => ({
  type: 'UPDATE_COLUMNS',
  value
})

export const updateGutters = (value, valueOrUnit) => ({
  type: 'UPDATE_GUTTERS',
  value,
  valueOrUnit
})

export const updatePadding = (key, value, valueOrUnit) => ({
  type: 'UPDATE_PADDING',
  key,
  value,
  valueOrUnit
})

export const togglePaddingLock = (value) => ({
  type: 'TOGGLE_PADDING_LOCK',
  value
})

export const updateMargin = (key, value, valueOrUnit) => ({
  type: 'UPDATE_MARGIN',
  key,
  value,
  valueOrUnit
})

export const toggleMarginLock = (value) => ({
  type: 'TOGGLE_MARGIN_LOCK',
  value
})

export const updateColor = (value) => ({
  type: 'UPDATE_COLOR',
  value
})

export const updateBackgroundColor = (value) => ({
  type: 'UPDATE_BACKGROUND_COLOR',
  value
})

export const updateRendering = (value) => ({
  type: 'UPDATE_RENDERING',
  value
})

export const updateAlignment = (value) => ({
  type: 'UPDATE_ALIGNMENT',
  value
})

export const updateTextTransform = (value) => ({
  type: 'UPDATE_TEXT_TRANSFORM',
  value
})

export const updateOpenType = (key, value) => ({
  type: 'UPDATE_OPENTYPE',
  key,
  value
})

export const updateOpenType = (value) => ({
  type: 'UPDATE_LANGUAGE',
  value
})

export const updatePageWidth = (value) => ({
  type: 'UPDATE_PAGE_WIDTH',
  value
})

export const updatePageBackgroundColor = (value) => ({
  type: 'UPDATE_PAGE_BACKGROUND_COLOR',
  value
})

export const toggleFullscreen = () => ({
  type: 'TOGGLE_FULLSCREEN'
})
