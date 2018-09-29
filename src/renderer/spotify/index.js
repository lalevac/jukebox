import { EventEmitter } from 'events'
// import fs from 'fs'

const spotify = new EventEmitter()
const SpotifyWebApi = require('spotify-web-api-js')

const spotifyApi = new SpotifyWebApi()

spotify.loadingFinished = false

spotify.setAccessToken = (accessToken) => {
  spotifyApi.setAccessToken(accessToken)
  spotify.loadingFinished = true
}

spotify.getMyCurrentPlayingTrack = (successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.getMyCurrentPlayingTrack()
    .then((data) => {
      successCallback && successCallback(data)
    })
    .catch((err) => {
      console.error(err)
    })
}

spotify.pausePlayback = (successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.pause()
    .then(() => {
      successCallback && successCallback()
    }, (err) => {
      console.error(err)
      spotify.refreshToken()
        .then(() => {
          spotifyApi.pause()
            .then(() => {
              successCallback && successCallback()
            }, (err) => {
              console.error(err)
              errorCallback && errorCallback()
            })
        })
    })
}

spotify.resumePlayback = (successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.play()
    .then(() => {
      successCallback && successCallback()
    }, (err) => {
      console.error(err)
      spotify.refreshToken()
        .then(() => {
          spotifyApi.play()
            .then(() => {
              successCallback && successCallback()
            }, (err) => {
              console.error(err)
              errorCallback && errorCallback()
            })
        })
    })
}

spotify.previous = (successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.skipToPrevious()
    .then(() => {
      successCallback && successCallback()
    }, (err) => {
      console.error(err)
      spotify.refreshToken()
        .then(() => {
          spotifyApi.skipToPrevious()
            .then(() => {
              successCallback && successCallback()
            }, (err) => {
              console.error(err)
              errorCallback && errorCallback()
            })
        })
    })
}

spotify.next = (successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.skipToNext()
    .then(() => {
      successCallback && successCallback()
    }, (err) => {
      console.error(err)
      spotify.refreshToken()
        .then(() => {
          spotifyApi.skipToNext()
            .then(() => {
              successCallback && successCallback()
            }, (err) => {
              console.error(err)
              errorCallback && errorCallback()
            })
        })
    })
}

spotify.setShuffle = (state, successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.setShuffle(state)
    .then(() => {
      successCallback && successCallback()
    }, (err) => {
      console.error(err)
      spotify.refreshToken()
        .then(() => {
          spotifyApi.setShuffle(state)
            .then(() => {
              successCallback && successCallback()
            }, (err) => {
              console.error(err)
              errorCallback && errorCallback()
            })
        })
    })
}

spotify.setRepeat = (state, successCallback, errorCallback) => {
  if (!spotify.loadingFinished) { return }

  return spotifyApi.setRepeat(state)
    .then(() => {
      successCallback && successCallback()
    }, (err) => {
      console.error(err)
      spotify.refreshToken()
        .then(() => {
          spotifyApi.setRepeat(state)
            .then(() => {
              successCallback && successCallback()
            }, (err) => {
              console.error(err)
              errorCallback && errorCallback()
            })
        })
    })
}

spotify.isLoadingDone = () => {
  return spotify.loadingFinished
}

export default spotify
