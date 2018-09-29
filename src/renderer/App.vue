<template>
  <div id="app">
    <app-title-bar-windows></app-title-bar-windows>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  import { ipcRenderer } from 'electron'
  import AppTitleBarWindows from '@/components/AppTitleBarWindows'

  import spotify from '@/spotify'

  export default {
    components: {
      AppTitleBarWindows
    },

    mounted () {
      if (this.$store.state.global.accessToken === null || this.$store.state.global.refreshToken === null) {
        console.info('[info] Logging in to Spotify')
        ipcRenderer.send('app:spotify-oauth:start')

        ipcRenderer.on('app:spotify-oauth:success', (event, result) => {
          this.$store.commit('setTokens', result)
        })
      } else {
        console.info('[info] Skipped Spotify authentication because the necessary tokens are present in localStorage.')
      }

      spotify.setAccessToken(this.$store.state.global.accessToken)
    }
  }
</script>

<style lang='scss'>
  body,
  html {
      overflow: hidden;
  }
</style>
