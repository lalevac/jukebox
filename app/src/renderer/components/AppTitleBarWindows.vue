<template>
<div id="app-title-bar-windows" :style='titleBarStyle'>
  <div class='title-bar-icon'>
    <a class='fa fa-music'></a>
  </div>

  <div class='title-bar-title'>Spotify</div>

  <div class="title-bar-controls">
    <a @click="doMinimize()" class="minimize-button fa fa-minus"></a>
    <a @click="doClose()" class="close-button fa fa-times"></a>
  </div>
</div>
</template>

<script>
import color from './../color'

export default {
  data() {
    return {
      titleBarStyle: 'background: #2c3e50; color: #bdc3c7;'
    }
  },

  methods: {
    doMinimize() {
      this.$electron.ipcRenderer.send('app:window:minimize')
    },

    doClose() {
      this.$electron.ipcRenderer.send('app:window:close')
    },

    updateColors() {
      let currentBackgroundColorHex = color.getMainBackgroundColor()
      let currentTextColorHex = color.getMainTextColor()

      if (currentBackgroundColorHex) {
        this.titleBarStyle = `background: ${currentBackgroundColorHex}; color: ${currentTextColorHex};`
      }
    }
  },

  mounted() {
    color.registerListener(this.updateColors)
  }
}
</script>

<style lang='scss'>
@import './../../assets/variables/variables';

#app-title-bar-windows {
    -webkit-user-select: none;
    -webkit-app-region: drag;

    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;

    background: $midnight-blue;
    color: $silver;
    transition: background 0.25s ease,
                color 0.25s ease;

    .title-bar-icon {
        display: inline-flex;

        a {
            display: inline-flex;

            align-items: center;
            justify-content: center;
            width: 40px;
            height: 35px;
        }
    }

    .title-bar-title {
        display: inline-flex;
        flex: 5 0 0;
        align-items: center;
        justify-content: center;

        font-size: 15px;
        font-weight: bold;
    }

    .title-bar-controls {
        -webkit-app-region: no-drag;
        display: inline-flex;

        a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 35px;
            cursor: pointer;

            &:hover {
                &.close-button {
                    background: $pomegranate;
                    color: $clouds;
                }

                &.minimize-button {
                    background: $wet-asphalt;
                }
            }
        }
    }

}
</style>
