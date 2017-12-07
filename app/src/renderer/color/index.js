import {EventEmitter} from 'events'
import ColorThief from 'color-thief-browser'

const colorThief = new ColorThief()
const color = new EventEmitter()

let currentMainColor = null

color.setMainColor = (coverUrl, callback) => {
  let img = new Image()
  img.onload = () => {
    currentMainColor = colorThief.getColor(img)
    if (callback) callback()
  }

  img.crossOrigin = 'Anonymous'
  img.src = coverUrl
}

color.getMainBackgroundColor = () => {
  return currentMainColor ? rgbToHex(currentMainColor) : null
}

color.getMainTextColor = () => {
  if (!currentMainColor)
    return null

  return rgbToHex(getTextColor(currentMainColor))
}

color.getShiftedBackgroundColor = (percent) => {
  if (!currentMainColor)
    return null

  let newColor = [shiftComponent(currentMainColor[0], percent), shiftComponent(currentMainColor[1], percent), shiftComponent(currentMainColor[2], percent)]
  return rgbToHex(newColor)
}

color.getShiftedTextColor = (percent) => {
  if (!currentMainColor)
    return null

  let newColor = [shiftComponent(currentMainColor[0], percent), shiftComponent(currentMainColor[1], percent), shiftComponent(currentMainColor[2], percent)]
  return rgbToHex(getTextColor(newColor))
}

const rgbToHex = (rgb) => {
  return `#${componentToHex(rgb[0])}${componentToHex(rgb[1])}${componentToHex(rgb[2])}`
}

const componentToHex = (c) => {
  let hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

const shiftComponent = (c, percent) => {
  return Math.min(Math.max(Math.round(c + (c * percent)), 0), 255)
}

const getTextColor = (color) => {
  let textColor = 0

  let a = 1 - (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255

  textColor = a < 0.5 ? 70 : 240;
  return [textColor, textColor, textColor]
}

export default color
