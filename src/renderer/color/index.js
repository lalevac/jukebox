import {EventEmitter} from 'events'
import ColorThief from 'color-thief-browser'

const colorThief = new ColorThief()
const color = new EventEmitter()

let currentMainColor = null
let currentTextColor = null
let currentAccentColor = null
let listeners = []

color.setMainColor = (coverUrl) => {
  let img = new Image()
  img.onload = () => {
    currentAccentColor = null

    currentMainColor = colorThief.getColor(img)
    currentTextColor = getTextColor(currentMainColor)

    /*
       In order to decide which of the color in the palette is the most visible,
       we're going to compute the sum of the difference between each component.
       This way, we'll know if the color is too similar to the main color to be
       our accent color.
    */
    let colorPalette = colorThief.getPalette(img, 8)
    for (var i = 0; i < colorPalette.length; i++) {
      let potentialAccentColorDiff = Math.abs((currentMainColor[0] - colorPalette[i][0]) + (currentMainColor[1] - colorPalette[i][1]) + (currentMainColor[2] - colorPalette[i][2]))

      // 75 is a completely arbitrary number obtained from trial and error.
      if (potentialAccentColorDiff > 100) {
        currentAccentColor = colorPalette[i]
        break
      }
    }

    notifyListeners()
  }

  img.crossOrigin = 'Anonymous'
  img.src = coverUrl
}

color.getMainBackgroundColor = () => {
  return currentMainColor ? rgbToHex(currentMainColor) : null
}

color.getMainTextColor = () => {
  return currentTextColor ? rgbToHex(currentTextColor) : null
}

color.getAccentColor = () => {
  return currentAccentColor ? rgbToHex(currentAccentColor) : null
}

color.getShiftedBackgroundColor = (percent) => {
  if (!currentMainColor) { return null }

  let newColor = [shiftComponent(currentMainColor[0], percent), shiftComponent(currentMainColor[1], percent), shiftComponent(currentMainColor[2], percent)]
  return rgbToHex(newColor)
}

color.getShiftedTextColor = (percent) => {
  if (!currentMainColor) { return null }

  let newColor = [shiftComponent(currentMainColor[0], percent), shiftComponent(currentMainColor[1], percent), shiftComponent(currentMainColor[2], percent)]
  return rgbToHex(getTextColor(newColor))
}

color.registerListener = (callback) => {
  listeners.push(callback)
}

const notifyListeners = () => {
  listeners.forEach((callback) => {
    callback()
  })
}

const rgbToHex = (rgb) => {
  return `#${componentToHex(rgb[0])}${componentToHex(rgb[1])}${componentToHex(rgb[2])}`
}

const componentToHex = (c) => {
  let hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

const shiftComponent = (c, percent) => {
  return Math.min(Math.max(Math.round(c + (c * percent)), 0), 255)
}

const getTextColor = (color) => {
  let textColor = 0

  let a = 1 - (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255

  textColor = a < 0.5 ? 45 : 240
  return [textColor, textColor, textColor]
}

export default color
