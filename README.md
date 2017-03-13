# Font Dashboard [![Build Status](https://travis-ci.org/danielgamage/font-dashboard.svg?branch=master)](https://travis-ci.org/danielgamage/font-dashboard)
An open-source GUI for text layout on the web.

## Features

### Drag & Drop Font File Loading
Use the `font file` property uploader or drag a font onto the text box you wish to apply the font to. This loads a buffer, which means there's no cached file to worry about if you refresh the page.

### Usage of Any Font Installed Locally
Or, if you have a font already installed on your system, simply type the font family name in the `font-face` field. This applies the property to the CSS `font-face` property.

### Multi-Column Text Layouts
Use CSS Columned Layout~~~

### Responsive Interface
Works on phones if you want... for whatever reason.

### Variable Font Testing
Automatically adds font variation axes to the interface with min and max values.

### Opentype Feature Testing
  - language localization
  - supports everything but `cv01-cv99`

### Rendering Methods
Supports subpixel, grayscale, and aliased rendering methods (depending on browser).

### Select and Edit Multiple Textfields at Once
You can box-select any textbox, using `shift` and `alt` keys as additive and subtractive modifiers, and edit properties of those textboxes in parallel.

## Credits

Inspiration from
http://typeshiftapp.com/ for making web editors beautiful,
http://www.impallari.com/testing/ for making web testing an essential part of font development.

## WIP
There's a lot of updating that needs to be done under the hood, as well as on the front-end, but if you're curious to try, you can test at https://danielgamage.github.io/font-dashboard/
