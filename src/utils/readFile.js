import opentype from 'opentype.js'

const readFile = (file) => {
  // Side effects: add font to document.fonts
  // should probably cache if font already exists
  return new Promise(function(resolve, reject) {
    let font
    let opentypeFont
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      opentypeFont = opentype.parse(reader.result)
      const family = opentypeFont.names.fullName.en
      font = new FontFace(family, reader.result)
      document.fonts.add(font)
      resolve(opentypeFont)
    }, false)
    reader.readAsArrayBuffer(file)
  });
}

export default readFile
