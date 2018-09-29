<template>
  <div id='home'>
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-12 no-padding-horizontal'>
          <current-track></current-track>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CurrentTrack from './Home/CurrentTrack'

  export default {
    components: {
      CurrentTrack
    }
  }
</script>

<style lang='scss'>

</style>
