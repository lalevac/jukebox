import { EventEmitter } from 'events'
import store from '@/store'

const SpotifyWebApi = require('spotify-web-api-js')
const spotify = new EventEmitter()
const spotifyApi = new SpotifyWebApi()

spotify.getMyCurrentPlayingTrack = async () => {
  await ensureAccessTokenIsValid()
  return spotifyApi.getMyCurrentPlayingTrack()
}

const ensureAccessTokenIsValid = async () => {
  const url = `https://spotify.modonoob.net/spotify-auth/refresh?refreshToken=${store.state.global.refreshToken}`
  const now = new Date().getTime()

  if (now > store.state.global.expirationDate) {
    console.log(url)
    const res = await fetch(url)
    console.log(res)

    /*
    request.get(url, (_, res) => {
      if (res.statusCode === 200) {
        const payload = JSON.parse(res.body)
        console.log('Success!', payload)
        store.commit('refreshToken', payload)
        spotifyApi.setAccessToken(store.state.global.accessToken)
        console.info('[info] Access token has been successfully refreshed.')
      } else {
        console.error('Could not refresh token!', res)
      }
    }) */
  } else {
    spotifyApi.setAccessToken(store.state.global.accessToken)
  }
}

export default spotify
