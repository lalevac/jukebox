<template>
  <div id='home'>
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-12 no-padding-horizontal'>
          <player-current-track></player-current-track>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayerCurrentTrack from '@/components/PlayerCurrentTrack'

  export default {
    components: {
      PlayerCurrentTrack
    }
  }
</script>

<style lang='scss'>

</style>
