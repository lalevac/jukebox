import {EventEmitter} from 'events'
import fs from 'fs'

const spotify = new EventEmitter()
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
    clientId: '022ffa404ba049c391c9c780734cb43d',
    clientSecret: 'c62722cbf31341cebc33512116fee493',
    redirectUri: 'https://www.modonoob.net/spotify/'
})

spotify.loadingFinished = false

spotify.init = (callback) => {
	let accessToken = loadTokenFromDisk('.access')
    let refreshToken = loadTokenFromDisk('.refresh')

	spotify.loadingFinished = false
    spotify.mustAuthenticate = !!!refreshToken && !!!accessToken

    callback()
}

spotify.getMyCurrentPlayingTrack = () => {
	if (!spotify.loadingFinished)
		return

	return spotify.refreshToken()
		.then(() => {
			return spotifyApi.getMyCurrentPlayingTrack()
		})
}

spotify.refreshToken = () => {
	if (!spotify.loadingFinished)
		return

    return spotifyApi.refreshAccessToken()
        .then((data) => {
            console.info('Access token refreshed.')
        }, (error) => {
            console.error('Could not refresh the access token.')
            console.error(error)
        })
}

spotify.getAuthorizeUrl = () => {
    return spotifyApi.createAuthorizeURL(['user-library-read',
									  	  'user-read-currently-playing',
									  	  'user-modify-playback-state',
									  	  'user-read-recently-played'])
}

spotify.setAuthorizationCode = (authCode, callback) => {
    spotifyApi.authorizationCodeGrant(authCode)
        .then((data) => {
			let accessToken = data.body['access_token']
            let refreshToken = data.body['refresh_token']

            console.info('Access and refresh tokens obtained from authorization code.')

            // Save the access token for future calls.
            spotifyApi.setAccessToken(accessToken)
            spotifyApi.setRefreshToken(refreshToken)

			writeTokenToDisk('.access', accessToken)
            writeTokenToDisk('.refresh', refreshToken)

			spotify.loadingFinished = true
			callback()
        }, (error) => {
            console.error('Could not grant with authorization code.')
            console.error(error)
        })
}

spotify.shouldAskUserCredentials = () => {
    if (spotify.mustAuthenticate)
        console.log('We must ask the user for authentication!')
    else
        console.log('No need to ask the user for authentication')

    return spotify.mustAuthenticate
}

spotify.isLoadingDone = () => {
	return spotify.loadingFinished
}

function loadTokenFromDisk(tokenName) {
	let tokenContent

	try {
		tokenContent = fs.readFileSync(tokenName, 'utf8')

		console.log('Successfully loaded "' + tokenName + '" token from disk. Token: ' + tokenContent)
	}
	catch(err) {
		console.error('Could not read the "' + tokenName + '" token from disk Err: ' + err)
	}

	return tokenContent
}

function writeTokenToDisk(tokenName, tokenContent) {
    fs.writeFile(tokenName, tokenContent, (err) => {
        if (err)
            console.error('Could not write "' + tokenName + '" token to disk D: Err: ' + err)
        else
            console.log('Successfully wrote "' + tokenName + '" token to disk.')
    })
}

export default spotify
