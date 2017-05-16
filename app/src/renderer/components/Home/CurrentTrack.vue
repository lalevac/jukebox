<template>
  <div id='current-track'>
      <section class='track-info'>
          <img class="album-cover" :src="track.urlCoverMedium" />

          <p class="track-name" v-text="track.trackName"></p>
          <p class="album-name" v-text="track.albumName"></p>
          <p class="artist-name" v-text="track.artistName"></p>
      </section>

      <section class='track-progress'>
          <div class='progress'>
              <div class='progress-bar' :style='trackPositionStyle'></div>
          </div>
          <div class='progress-time'>
              <div class='current-progress' v-text='currentTrackTime'></div>
              <div class='track-length' v-text='totalTrackLength'></div>
          </div>
      </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentTrackPosition: 0,
        track: {
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
    },

    computed: {
      trackPositionStyle() {
        return 'width: ' + (this.track.trackLength - this.currentTrackPosition) / this.track.trackLength * 100 + '%'
      },

      currentTrackTime() {
        return this.formatTime(this.currentTrackPosition)
      },

      totalTrackLength() {
        return this.formatTime(this.track.trackLength)
      }
    },

    methods: {
      formatTime(time) {
        const padding = '00';
        let minutes = Math.floor(time / 60)
        let seconds = (padding + (time % 60)).slice(-padding.length)

        return minutes + ':' + seconds
      }
    },

    created() {
      this.currentTrackPosition = this.track.trackLength

      setInterval(() => {
        this.currentTrackPosition--
      }, 1000);
    }
  }
</script>

<style lang='scss'>
  @import '../../../assets/flat-ui/variables';

  #current-track {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    background: $wet-asphalt;
    padding: 50px;
    height: 440px;

    .track-info {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      img {
        display: flex;
        width: 200px;
        height: 100%;
        border-radius: 3px;
      }

      p {
        display: flex;
      }
    }

    .track-progress {
      display: flex;
      flex: 1 0;
      flex-direction: column;
      align-self: flex-end;

      .progress {
        margin-bottom: 5px;
        border-radius: 3px;
      }

      .progress-time {
        display: flex;
        flex-direction: row;

        .current-progress {
          display: inline-flex;
          flex: 1 0;
          justify-content: flex-start;
        }

        .track-length {
          display: inline-flex;
          flex: 1 0;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
