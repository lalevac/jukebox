<template>
  <div id='home'>
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-sm-7 no-padding-horizontal'>
          <current-track></current-track>
        </div>

        <div class='col-sm-5 no-padding-horizontal'>
          <track-list></track-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TrackList from 'components/Home/TrackList'
  import CurrentTrack from 'components/Home/CurrentTrack'

  export default {
    components: {
      TrackList,
      CurrentTrack
    }
  }
</script>

<style lang='scss'>

</style>
