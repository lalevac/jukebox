<template>
  <div id='current-track'>
      <section class='track-info'>
          <img class="album-cover" :src="track.urlCoverMedium" />

          <div class="track-info-container">
              <p class="track-name" v-text="track.trackName"></p>
              <p class="album-name" v-text="track.albumName"></p>
              <p class="artist-name" v-text="track.artistName"></p>
          </div>
      </section>

      <section class='track-progress'>
          <div class='progress'>
              <div class='progress-bar' :style='trackPositionStyle'></div>
          </div>
          <div class='progress-time'>
              <p class='current-progress' v-text='currentTrackTime'></p>
              <p class='track-length' v-text='totalTrackLength'></p>
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
@import '../../../assets/variables/variables';

#current-track {
    display: flex;
    flex-direction: column;

    background: $wet-asphalt;
    color: $silver;
    height: 440px;

    section.track-info {
      display: flex;
      flex: 2 0;
      flex-direction: row;
      padding: 25px;

      img {
        width: 150px;
        height: 150px;
        border-radius: 3px;
      }

      .track-info-container {
          display: flex;
          flex-direction: column;
          height: 150px;
          margin-left: 30px;

          p {
              font-size: 14px;
              display: inline-flex;
              flex: 1 0;
              align-items: center;
              margin: 0;

              &.track-name {
                  font-size: 18px;
              }
          }
      }
    }

    section.track-progress {
      display: flex;
      flex: 1 1;
      flex-direction: column;
      background: $midnight-blue;
      max-height: 105px;
      padding: 40px 25px;

      .progress {
          height: 30px;
          margin-bottom: 5px;
          border-radius: 3px;
      }

      .progress-time {
        display: flex;
        flex-direction: row;

        p {
            display: inline-flex;
            flex: 1 0;
            font-size: 14px;
            margin: 0;
        }

        p.current-progress {
          justify-content: flex-start;
        }

        p.track-length {
          justify-content: flex-end;
        }
      }
    }
  }
</style>
