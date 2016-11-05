let nextTextBoxId = 0
export const addTextBox = (text) => ({
  type: 'ADD_TEXTBOX',
  id: nextTextBoxId++,
  text
})

export const selectTextBox = (id) => ({
  type: 'SELECT_TEXTBOX',
  id
})
