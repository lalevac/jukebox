<template>
  <div id="app">
    <app-title-bar-windows></app-title-bar-windows>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppTitleBarWindows from 'components/AppTitleBarWindows'

  export default {
    components: {
      AppTitleBarWindows
    }
  }
</script>

<style lang='scss'>
  @import '../assets/styles.scss';
</style>
