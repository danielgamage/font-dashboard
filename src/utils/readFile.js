const readFile = (files) => {
  // Side effects: add font to document.fonts
  // should probably cache if font already exists
  console.log(files)
  ;[files].map((file, i) => {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      let newFont = new FontFace(file.name, reader.result)
      document.fonts.add(newFont)
    }, false)
    reader.readAsArrayBuffer(file)
    return file
  })
}

export default readFile
