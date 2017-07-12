import { EventEmitter } from 'events'

const spotify = new EventEmitter()
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
    clientId : '022ffa404ba049c391c9c780734cb43d',
    clientSecret : 'c62722cbf31341cebc33512116fee493',
    redirectUri : 'http://127.0.0.1/'
})

const authorizationCode = 'AQDboIDH389txXEiaTkeaftOhscggt13hGJjITj4jTmEXgBLHWtPS5Ggwuh0niSAizF8tF2seS3rgzLLoVLwfxOHj_wu8vSHqmyc3MYRjui0eA5A1beVVa_hpWOY-Qd2rPppdSZEl5Q-YUuvltXOn02-LQYhZvGbXzMQqGiZSdhRS9JRnubdyAKWlBjc2Ram9iqSHNqxImnrNCxn80yi5g2R10M'

spotify.init = () => {
    spotifyApi.authorizationCodeGrant(authorizationCode)
        .then((data) => {
            console.info('Access token obtained from authorization code.')

            // Save the access token for future calls.
            spotifyApi.setAccessToken(data.body['access_token'])
            spotifyApi.setRefreshToken(data.body['refresh_token'])
        }, (error) => {
            console.error('Could not get credentials.')
            console.error(error)
        })
}

spotify.refreshToken = () => {
    spotifyApi.refreshAccessToken()
        .then((data) => {
            console.info('Access token refreshed.')
        }, (error) => {
            console.error('Could not refresh the access token.')
            console.error(error)
        })
}

spotify.testModule = () => {
    spotifyApi.refreshToken()
}

// Initializes the module.
//spotify.init()

export default spotify
