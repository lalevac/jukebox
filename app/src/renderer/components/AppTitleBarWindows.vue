<template>
  <div id="app-title-bar-windows">
    <div class='title-bar-icon'>
      <a class='fa fa-music'></a>
    </div>

    <div class='title-bar-title'>Jukebox</div>

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
        color: $clouds;
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
