import languages from '../data/languages.js'

const getLanguage = (tag) => {
  const matches = languages.filter(language => {
    return (language.tag === tag)
  })
  return matches[0]
}

export default getLanguage
