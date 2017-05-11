<template>
  <div id='current-track'>
      <div class='container-fluid'>
          <section class='track-info'>
              <img class="album-cover" :src="currentTrack.urlCoverSmall" />

              <p class="track-name" v-text="currentTrack.trackName"></p>
              <p class="album-name" v-text="currentTrack.albumName"></p>
              <p class="artist-name" v-text="currentTrack.artistName"></p>
          </section>

          <section class='track-progress'>
              <div class='progress'>
                  <div class='progress-bar' style='width: 25%;'></div>
              </div>
          </section>
      </div>
  </div>
</template>

<script>
  export default {
    data: () => {
        return {
            currentTrack: {
                trackSID: '4t6vrJg7GcUELCAxHX1z5W',
                artistSID: '5INjqkS1o8h1imAzPqGZBb',
                albumSID: '78FAAvXmfdj0VKUuUEYeoV',

                trackName: 'Half Full Glass Of Wine',
                artistName: 'Tame Impala',
                albumName: 'Tame Impala',
                trackLength: '267',

                urlCoverSmall: 'http://o.scdn.co/160/d3623804615219dd353be9ad0f8c8a2fbd97a7c2',
                urlCoverMedium: 'http://o.scdn.co/320/d3623804615219dd353be9ad0f8c8a2fbd97a7c2',
                urlCoverLarge: 'http://o.scdn.co/640/d3623804615219dd353be9ad0f8c8a2fbd97a7c2',

                dislikeCount: 0,
                likeCount: 0
            }
        }
    }
  }
</script>

<style lang='scss'>
  @import '../../../assets/flat-ui/variables';

  #current-track {
    background: $wet-asphalt;
    padding: 50px;


  }
</style>
