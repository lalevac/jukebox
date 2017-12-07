<template>
<div id='current-track' :style='currentTrackStyle'>
  <section class='loading-spinner' v-show='isLoading'>
    <div class='spinner-wrapper'>
      <div class='fa fa-refresh fa-spin'></div>
      <div class='loading-text'>Loading...</div>
    </div>
  </section>

  <section class='track-progress'>
    <div class='progress'>
      <div class='progress-bar' :style='trackPositionStyle'></div>
    </div>
  </section>

  <section class='track-info-container'>
    <section class='album-art'>
      <img :src="track.album.images[0].url" />
    </section>

    <section class='track-info'>
      <p class="track-name mb-2" v-text="track.name"></p>
      <p class="album-name" v-text="track.album.name"></p>
      <p class="artist-name" v-text="track.artists[0].name"></p>

      <div class='progress-time'>
        <p class='current-progress' v-text='currentTrackTime'></p>
        <p class='track-length' v-text='totalTrackLength'></p>
      </div>

      <player-controls></player-controls>
    </section>
  </section>

  <section class='debug ml-2 mb-2 mt-2 mr-2'>
    <div class='row'>
      <div class='col mr-1'>
        <b-button variant='primary' @click='testButton()'>Mystery Button</b-button>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import PlayerControls from './PlayerControls'
import spotify from './../../spotify'
import color from './../../color'

export default {
	components: {
		PlayerControls
	},

  data() {
    return {
      progress_ms: 0,
      emptyTrack: {
        duration_ms: 0,
        album: {
          images: [{
            url: 'http://via.placeholder.com/150x150'
          }],
          name: 'Unknown'
        },
        artists: [{
          name: 'Unknown'
        }]
      },
      track: {
        duration_ms: 0,
        album: {
          images: [{
            url: 'http://via.placeholder.com/150x150'
          }],
          name: 'Unknown'
        },
        artists: [{
          name: 'Unknown'
        }]
      },
      updateTimer: null,
      trackStateUpdateTimer: null,
      isLoading: true,
			lastTrackSid: null,
			currentTrackStyle: 'background: #34495e; color: #bdc3c7;'
    }
  },

  computed: {
    trackPositionStyle() {
      return 'width: ' + (100 - ((this.track.duration_ms - this.progress_ms) / this.track.duration_ms * 100)) + '%'
    },

    currentTrackTime() {
      return this.formatTime(this.progress_ms)
    },

    totalTrackLength() {
      return this.formatTime(this.track.duration_ms)
    }
  },

  methods: {
    formatTime(time) {
      let timeInSecs = parseInt(time / 1000, 10)

      const padding = '00';
      let minutes = Math.floor(timeInSecs / 60)
      let seconds = (padding + (timeInSecs % 60)).slice(-padding.length)

      return minutes + ':' + seconds
    },

    testButton() {
			spotify.resumePlayback()
    },

    updateTrackState() {
      if (!spotify.isLoadingDone())
        return

      spotify.getMyCurrentPlayingTrack((data) => {
				// If we have a currently playing track, we display it.
				if (data.body.item)
					this.progress_ms = data.body.progress_ms
				else
					this.progress_ms = 0

				if (!this.lastTrackSid || this.lastTrackSid !== data.body.item.id) {
					this.lastTrackSid = data.body.item.id
					this.onTrackChange(data.body.item)
				}

				this.isLoading = false
			}, () => {
				onTrackChange(null)
				this.progress_ms = 0
			})
    },

    startTrackStateUpdateLoop() {
      this.trackStateUpdateTimer = setInterval(() => {
        this.updateTrackState()
      }, 1000)
    },

		updateColors() {
      let backgroundHex = color.getShiftedBackgroundColor(-0.30)
      let textHex = color.getShiftedTextColor(-0.30)

      if (backgroundHex) {
        this.currentTrackStyle = `background: ${backgroundHex}; color: ${textHex};`
      }
    },

		onTrackChange(newTrack) {
			if (newTrack) {
				this.track = newTrack
				color.setMainColor(this.track.album.images[0].url)
			}
			else {
				this.track = this.emptyTrack
			}
		}
  },

  mounted() {
    this.startTrackStateUpdateLoop()
		color.registerListener(this.updateColors)
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
    height: 400px;

		transition: background 0.25s ease,
								color 0.25s ease;

    section.loading-spinner {
        z-index: 1000;
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        background: $midnight-blue;
        opacity: 0.9;
        text-align: center;

        .fa {
            margin-top: 140px;
            font-size: 64px;
        }
    }

    section.track-progress {
        display: flex;
        flex: 1 1;
        flex-direction: column;
        min-height: 3px;

        .progress {
            min-height: 3px;
            height: 30px;
            border-radius: 0;
            background: $midnight-blue;
        }
    }

    section.track-info-container {
        display: flex;
        flex-direction: row;

        section.album-art {
            height: 400px;
            width: 400px;

            img {
                height: 100%;
                width: 100%;
            }
        }

        section.track-info {
            display: flex;
            flex: 2 0;
            flex-direction: column;
            padding: 15px;

            p {
                margin: 0;
                line-height: 1;

                &.track-name {
                    font-size: 20px;
                }

                &.album-name {
                    font-size: 14px;
                }

                &.artist-name {
                    font-size: 14px;
                }
            }
        }
    }

		section.debug {
			button {
				float: right;
			}
		}
}
</style>
