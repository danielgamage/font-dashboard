const getStyles = (item) => {
  let fontSmoothing
  if (item.rendering === 'Grayscale') {
    fontSmoothing = { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }
  } else if (item.rendering === 'None') {
    fontSmoothing = { WebkitFontSmoothing: 'none', MozOsxFontSmoothing: 'none'}
  } else {
    fontSmoothing = { WebkitFontSmoothing: 'subpixel-antialiased', MozOsxFontSmoothing: 'auto' }
  }
  const textOrientation = {
    WebkitTextOrientation: item.textOrientation,
    MozTextOrientation: item.textOrientation,
    textOrientation: item.textOrientation
  }
  const opentypeValues = item.opentype.map(el => (`"${el.key}" ${el.value ? 1 : 0}`)).join(', ')
  const variations = item.variations.map(el => (`"${el.key}" ${el.value}`)).join(', ')

  const styles = {
    fontFamily: `'${item.fontFamily}'`,
    fontSize: `${item.fontSize.value}${item.fontSize.unit}`,
    color: item.color,
    backgroundColor: item.backgroundColor,
    letterSpacing: `${item.tracking.value}${item.tracking.unit}`,
    wordSpacing: `${item.wordSpacing.value}${item.wordSpacing.unit}`,
    lineHeight: `${item.leading.value}${item.leading.unit}`,
    textAlign: `${item.alignment}`,
    textTransform: item.textTransform,
    columnCount: item.columns,
    columnGap: `${item.gutters.value}${item.gutters.unit}`,
    fontWeight: `${item.weight}`,
    fontKerning: item.kerning ? 'normal' : 'none',
    fontStretch: `${item.width}%`,
    fontVariationSettings: variations,
    padding: `
      ${item.padding.top.value}${item.padding.top.unit}
      ${item.padding.right.value}${item.padding.right.unit}
      ${item.padding.bottom.value}${item.padding.bottom.unit}
      ${item.padding.left.value}${item.padding.left.unit}`,
    margin: `
      ${item.margin.top.value}${item.margin.top.unit}
      ${item.margin.right.value}${item.margin.right.unit}
      ${item.margin.bottom.value}${item.margin.bottom.unit}
      ${item.margin.left.value}${item.margin.left.unit}
      `,
    fontFeatureSettings: opentypeValues,
    ...fontSmoothing,
    ...textOrientation
  }

  return styles
}

export default getStyles
