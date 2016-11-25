import opentype from 'opentype.js'
import getLanguage from './getLanguage.js'
import opentypeFeatures from '../data/opentypeFeatures.js'

const parseLanguages = (font) => {
  return font.tables.gsub.scripts.map(system => {
    return system.script.langSysRecords.map((language, i) => {
      return getLanguage(language.tag.trim())
    })
  }).reduce((a, b) => a.concat(b), [])
}

const parseFeatures = (font) => {
  const features = font.tables.gsub.features.map(feature => {
    return feature.tag
  })
  const featuresSet = new Set([...features])
  const uniqueFeatures = [...featuresSet]
  const featureObjects = opentypeFeatures.filter(el => {
    return (uniqueFeatures.indexOf(el.value) !== -1)
  })
  return featureObjects
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
      const availableLanguages = parseLanguages(opentypeFont)
      const data = {
        ...opentypeFont,
        availableFeatures: availableFeatures,
        availableLanguages: availableLanguages

      }
      resolve(data)
    }, false)
    reader.readAsArrayBuffer(file)
  });
}

export default readFile