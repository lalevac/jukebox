<template>
<div id="app" :style='this.borderStyle'>
  <app-title-bar-windows></app-title-bar-windows>
  <router-view></router-view>
</div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'flat-ui/css/flat-ui.css'

  import {ipcRenderer} from 'electron'
  import spotify from './spotify'
  import AppTitleBarWindows from 'components/AppTitleBarWindows'
  import color from './color'

  export default {
    components: {
      AppTitleBarWindows
    },
    data() {
      return {
        borderStyle: '1px solid black;'
      }
    },
    mounted() {
      spotify.init(() => {
        ipcRenderer.send('app:spotify-authentication:start', spotify.getAuthorizeUrl())
      })

      ipcRenderer.on('app:spotify-authentication:done', (event, authCode) => {
        spotify.setAuthorizationCode(authCode, () => {
          spotify.refreshToken()
        })
      })

      color.registerListener(this.updateColors)
    },
    methods: {
      updateColors() {
        const borderColorHex = color.getAccentColor()

        this.borderStyle = `border: 1px solid ${borderColorHex};`
      }
    }
  }
</script>

<style lang='scss'>
@import '../assets/styles.scss';

body,
html {
    overflow: hidden;
}
</style>
