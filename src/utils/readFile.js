import opentype from 'opentype.js'

const parseFeatures = (font) => {
  const features = font.tables.gsub.features.map(feature => {
    return feature.tag
  })
  const featuresSet = new Set([...features])
  const uniqueFeatures = [...featuresSet]
  return uniqueFeatures
}

const readFile = (file) => {
  // Side effects: add font to document.fonts
  // should probably cache if font already exists
  return new Promise(function(resolve, reject) {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      const opentypeFont = opentype.parse(reader.result)
      const family = opentypeFont.names.fullName.en
      const font = new FontFace(family, reader.result)
      document.fonts.add(font)
      const availableFeatures = parseFeatures(opentypeFont)
      const data = {...opentypeFont, availableFeatures: availableFeatures}
      console.log(data)
      resolve(data)
    }, false)
    reader.readAsArrayBuffer(file)
  });
}

export default readFile
