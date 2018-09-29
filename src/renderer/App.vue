<template>
  <div id="app">
    <app-title-bar-windows></app-title-bar-windows>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  import {ipcRenderer} from 'electron'
  import spotify from './spotify'
  import AppTitleBarWindows from '@/components/AppTitleBarWindows'

  export default {
    components: {
      AppTitleBarWindows
    },

    mounted () {
      spotify.init(() => {
        // ipcRenderer.send('app:spotify-authentication:start', spotify.getAuthorizeUrl())
      })

      ipcRenderer.on('app:spotify-authentication:done', (event, authCode) => {
        spotify.setAuthorizationCode(authCode, () => {
          spotify.refreshToken()
        })
      })
    }
  }
</script>

<style lang='scss'>
  body,
  html {
      overflow: hidden;
  }
</style>
