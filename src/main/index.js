'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { URL } from 'url'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 435,
    width: 800,
    title: 'Jukebox',
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    backgroundColor: '#2c3e50',
    show: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

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

ipcMain.on('app:window:close', () => {
  app.quit()
})

ipcMain.on('app:window:minimize', () => {
  mainWindow.minimize()
})

ipcMain.on('app:window:change-title', (event, newTitle) => {
  mainWindow.setTitle(newTitle)
})

ipcMain.on('app:spotify-oauth:start', (event) => {
  let spotifyOAuthPrompt = new BrowserWindow({
    height: 500,
    width: 425,
    title: 'Spotify OAuth',
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    parent: mainWindow,
    modal: true,
    show: false
  })

  spotifyOAuthPrompt.loadURL('https://spotify.modonoob.net/spotify-auth/login')
  spotifyOAuthPrompt.setMenu(null)
  spotifyOAuthPrompt.show()

  spotifyOAuthPrompt.webContents.on('did-get-redirect-request', (e, oldUrl, newUrl) => {
    let searchParams = new URL(newUrl).searchParams
    let accessToken = searchParams.get('a')
    let refreshToken = searchParams.get('r')

    if (accessToken == null || refreshToken == null) {
      return
    }

    event.sender.send('app:spotify-oauth:success', { accessToken: accessToken, refreshToken: refreshToken })

    spotifyOAuthPrompt.close()
    spotifyOAuthPrompt = null
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
