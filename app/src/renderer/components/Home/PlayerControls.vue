<template>
  <div id='player-controls' :style='backgroundStyle'>
    <div class='control-button back' @click='back()' :style='buttonStyle'><span class='fa fa-random'></span></div>
    <div class='control-button back' @click='back()' :style='buttonStyle'><span class='fa fa fa-step-backward'></span></div>
    <div class='control-button play' @click='togglePlayback()' :style='buttonStyle'><span :class='iconPlayback'></span></div>
    <div class='control-button forward' @click='forward()' :style='buttonStyle'><span class='fa fa-step-forward'></span></div>
    <div class='control-button forward' @click='forward()' :style='buttonStyle'><span class='fa fa-repeat'></span></div>
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
      buttonStyle: 'color: #bdc3c7; border-color: #bdc3c7;',
      backgroundStyle: 'background: #34495e'
    }
  },

  methods: {
    updateColors() {
      let backgroundColorHex = color.getMainBackgroundColor()
      let textColorHex = color.getMainTextColor()
      this.buttonStyle = `color: ${textColorHex}; border-color: ${textColorHex};`
      this.backgroundStyle = `background: ${backgroundColorHex};`
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
  width: 100%;
  height: 100px;
  padding: 20px 50px;

  transition: background 0.25s ease;

  .control-button {
    text-align: center;
    margin: 5px;
    width: 50px;
    height: 50px;
    line-height: 60px;

    transition: color 0.25s ease;

    &:hover {
      cursor: pointer;
    }

    span.fa {
      font-size: 30px;
    }
  }
}
</style>
