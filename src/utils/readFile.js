const readFile = (file) => {
  // Side effects: add font to document.fonts
  // should probably cache if font already exists
  let font
  let reader = new FileReader()
  const family = file.name.replace('.', '').replace('-', '')
  reader.addEventListener('load', () => {
    font = new FontFace(family, reader.result)
    document.fonts.add(font)
  }, false)
  reader.readAsArrayBuffer(file)
  return family
}

export default readFile
