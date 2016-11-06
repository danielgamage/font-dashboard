export const addTextBox = (text) => ({
  type: 'ADD_TEXTBOX',
  id: 0,
  index: 0,
  color: "#fff",
  text
})

export const selectTextBox = (id) => ({
  type: 'SELECT_TEXTBOX',
  id
})
