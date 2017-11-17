<template>
<div id='current-track'>
    <section class='track-info'>
        <img class="album-cover" :src="track.album.images[0].url" />

        <div class="track-info-container">
            <p class="track-name" v-text="track.name"></p>
            <p class="album-name" v-text="track.album.name"></p>
            <p class="artist-name" v-text="track.artists[0].name"></p>
        </div>
    </section>

    <section class='debug ml-2 mb-2 mt-2 mr-2'>
        <div class='row'>
            <div class='col mr-1'>
				<b-button variant='primary' @click='test()'>Get Current Track</b-button>
            </div>
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
import spotify from './../../spotify'

export default {
    data() {
        return {
            progress_ms: 0,
            track: {
				album: {
					images: [{
						url: 'http://via.placeholder.com/150x150'
					}],
					name: 'Unknown'
				},
				artists: [{
					name: 'Unknown'
				}]
			}
        }
    },

    computed: {
        trackPositionStyle() {
			console.log('width: ' + 100 - ((this.track.duration_ms - this.progress_ms) / this.track.duration_ms * 100) + '%')
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

        test() {
            spotify.getMyCurrentPlayingTrack()
				.then((data) => {
					console.log(data)
				}, (error) => {
					console.error(error)
				})
        }
    },

    mounted() {
        this.progress_ms = 0

		/*let fakePlaybackTimer = setInterval(() => {

		}, 1000)*/

        let realPlaybackTimer = setInterval(() => {
			spotify.getMyCurrentPlayingTrack()
				.then((data) => {
					this.track = data.body.item
					this.progress_ms = data.body.progress_ms
				}, (error) => {
					console.error(error)
				})
        }, 5000);
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
