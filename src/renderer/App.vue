<template>
  <div id="app">
    <app-title-bar-windows></app-title-bar-windows>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'font-awesome/css/font-awesome.css'

  import { ipcRenderer } from 'electron'
  import AppTitleBarWindows from '@/components/AppTitleBarWindows'

  export default {
    components: {
      AppTitleBarWindows
    },

    mounted () {
      if (this.$store.state.global.refreshToken === null) {
        ipcRenderer.send('app:spotify-oauth:start')

        ipcRenderer.on('app:spotify-oauth:success', (event, result) => {
          console.info('[info] Logged in to Spotify.')
          this.$store.commit('setTokens', result)
        })
      } else {
        console.info('[info] Skipped Spotify authentication because the necessary tokens are present in localStorage.')
      }
    }
  }
</script>

<style lang='scss'>
  body,
  html {
    overflow: hidden;
  }
</style>
