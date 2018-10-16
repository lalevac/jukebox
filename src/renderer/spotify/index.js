import { EventEmitter } from 'events'
import request from 'request'
import store from '@/store'

const SpotifyWebApi = require('spotify-web-api-js')
const spotify = new EventEmitter()
const spotifyApi = new SpotifyWebApi()

spotify.getMyCurrentPlayingTrack = async () => {
  return ensureAccessTokenIsValid()
    .then(spotifyApi.getMyCurrentPlayingTrack)
    .catch((err) => {
      console.error(err)
    })
}

const ensureAccessTokenIsValid = async () => {
  const url = `https://spotify.modonoob.net/spotify-auth/refresh?refreshToken=${store.state.global.refreshToken}`
  const now = new Date().getTime()

  if (now > store.state.global.expirationDate) {
    request.get(url, (_, res) => {
      if (res.statusCode === 200) {
        const payload = res.body
        store.commit('refreshToken', payload)
        spotifyApi.setAccessToken(store.state.global.accessToken)
        console.info('[info] Access token has been successfully refreshed.')
      }
    })
  } else {
    spotifyApi.setAccessToken(store.state.global.accessToken)
  }
}

export default spotify
