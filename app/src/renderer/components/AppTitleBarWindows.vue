<template>
  <div id="app-title-bar-windows">
    <div class="title-bar-controls">
      <a @click="doMinimize()" class="minimize-button fa fa-minus"></a>
      <a @click="doClose()" class="close-button fa fa-times"></a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      doMinimize() {
        this.$electron.ipcRenderer.send('app-minimize')
      },

      doClose() {
        this.$electron.ipcRenderer.send('app-close')
      }
    }
  }
</script>

<style lang='scss'>
  @import '../../assets/flat-ui/variables';

  #app-title-bar-windows {
    -webkit-user-select: none;
    -webkit-app-region: drag;
    width: 100%;
    height: 100%;
    text-align: right;

    .title-bar-controls {
      -webkit-app-region: no-drag;
      display: inline-block;

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
          }

          &.minimize-button {
            background: $wet-asphalt;
          }
        }
      }
    }
  }
</style>
