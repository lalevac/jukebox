'use strict'

import {app, BrowserWindow, ipcMain} from 'electron'
import {URL} from 'url'

let mainWindow
let spotifyWindow

const winURL = process.env.NODE_ENV === 'development'
 ? `http://localhost:${require('../../../config').port}`
 : `file://${__dirname}/index.html`

function createWindow() {
	mainWindow = new BrowserWindow({
		height: 435,
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
		console.log('Main window closed.')
	})

	console.log('Main window opened.')
}

function createSpotifyWindow(url, callback) {
	spotifyWindow = new BrowserWindow({
		height: 575,
		width: 400,
		title: 'Spotify Authentication',
		resizable: false,
		maximizable: false,
		fullscreenable: false,
		show: false,
		'node-integration': false,
    	'web-security': false,
		backgroundColor: '#ffffff'
	})

	spotifyWindow.loadURL(url)

	spotifyWindow.on('closed', () => {
		spotifyWindow = null
		console.log('Spotify authentication window closed.')
	})

	spotifyWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
		let authCode = new URL(newUrl).searchParams.get('code')

		if (authCode == null)
			return;

		spotifyWindow.close();
		spotifyWindow = null;
		callback(authCode)
	})

	spotifyWindow.on('load', () => {
		spotifyWindow.show()
		console.log('Spotify authentication window opened.')
	})
}

app.on('ready', () => {
    createWindow()
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

ipcMain.on('app:window:close', () => {
 	app.quit()
})

ipcMain.on('app:window:minimize', () => {
 	mainWindow.minimize()
})

ipcMain.on('app:spotify-authentication:start', (event, authUrl) => {
	createSpotifyWindow(authUrl, (authorizationCode) => {
		event.sender.send('app:spotify-authentication:done', authorizationCode)
	})
})
