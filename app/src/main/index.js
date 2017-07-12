'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 475,
    width: 800,
    title: 'Jukebox',
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    backgroundColor: '#2c3e50'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', () => {
    createWindow()

    let spotifyWindow = new BrowserWindow({ width: 800, height: 600 })
    spotifyWindow.loadURL('http://www.google.ca/')
    spotifyWindow.show()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('app-close', () => {
  app.quit()
})

ipcMain.on('app-minimize', () => {
  mainWindow.minimize()
})
