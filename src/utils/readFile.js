import opentype from 'opentype.js'
import getLanguage from './getLanguage.js'
import opentypeFeatures from '../data/opentypeFeatures.js'

const parseLanguages = (font) => {
  if (font.tables.gsub && font.tables.gsub.scripts){
    return font.tables.gsub.scripts.map(system => {
      return system.script.langSysRecords.map((language, i) => {
        return getLanguage(language.tag.trim())
      })
    }).reduce((a, b) => a.concat(b), [])
  } else {
    return []
  }
}

const parseFeatures = (font) => {
  if (font.tables.gsub && font.tables.gsub.features){
    const features = font.tables.gsub.features.map(feature => {
      return feature.tag
    })
    const featuresSet = new Set([...features])
    const uniqueFeatures = [...featuresSet]
    const featureObjects = opentypeFeatures.filter(el => {
      return (uniqueFeatures.indexOf(el.value) !== -1)
    })
    return featureObjects
  } else {
    return []
  }
}

const readFile = (file) => {
  // Side effects: add font to document.fonts
  // should probably cache if font already exists
  return new Promise(function(resolve, reject) {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      const opentypeFont = opentype.parse(reader.result)
      console.log(opentypeFont)
      const family = opentypeFont.names.fullName.en
      const font = new FontFace(family, reader.result)
      document.fonts.add(font)
      const data = {
        ...opentypeFont,
        availableFeatures: parseFeatures(opentypeFont),
        availableLanguages: parseLanguages(opentypeFont)
      }
      resolve(data)
    }, false)
    reader.readAsArrayBuffer(file)
  });
}

export default readFile
