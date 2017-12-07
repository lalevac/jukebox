<template>
  <div id='player-controls'>
    <div class='control-button back fa fa-step-backward' @click='back()' :style='buttonStyle'></div>
    <div class='control-button play' @click='togglePlayback()' :style='buttonStyle'><span :class='iconPlayback'></span></div>
    <div class='control-button forward fa fa-step-forward' @click='forward()' :style='buttonStyle'></div>
  </div>
</template>

<script>
import spotify from './../../spotify'
import color from './../../color'

export default {
  data() {
    return {
      isPlaying: true,
      iconPlayback: 'fa fa-pause',
      buttonStyle: 'color: #bdc3c7; border-color: #bdc3c7;'
    }
  },

  methods: {
    updateColors() {
      let textColorHex = color.getShiftedTextColor(-0.3)
      this.buttonStyle = `color: ${textColorHex}; border-color: ${textColorHex};`
    },

    togglePlayback() {
      if (this.isPlaying) {
        spotify.pausePlayback()
        this.iconPlayback = 'fa fa-play'
      } else {
        spotify.resumePlayback()
        this.iconPlayback = 'fa fa-pause'
      }

      this.isPlaying = !this.isPlaying
    },

    back() {
      spotify.previous()
    },

    forward() {
      spotify.next()
    }
  },

  mounted() {
    color.registerListener(this.updateColors)
  }
}

</script>

<style lang='scss'>
@import '../../../assets/variables/variables';

#player-controls {
  display: flex;
  align-items: flex-end;
  .control-button {
    border-radius: 50%;
    border: 2px solid white;
    text-align: center;
    margin: 5px;

    transition: color 0.25s ease,
                border-color 0.25s ease;

    &:hover {
      cursor: pointer;
    }

    &.forward,
    &.back {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }

    &.play {
      width: 50px;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
