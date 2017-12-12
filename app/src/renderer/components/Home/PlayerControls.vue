<template>
  <div id='player-controls' :style='backgroundStyle'>
    <div class='control-button back' @click='setShuffle()' :style='buttonStyle + shuffleButtonStyle'>
      <span class='fa fa-random'></span>
      <span class='active-dot' v-show='isShuffling'>.</span>
    </div>

    <div class='control-button back' @click='back()' :style='buttonStyle'><span class='fa fa fa-step-backward'></span></div>
    <div class='control-button play' @click='togglePlayback()' :style='buttonStyle'><span :class='iconPlayback'></span></div>
    <div class='control-button forward' @click='forward()' :style='buttonStyle'><span class='fa fa-step-forward'></span></div>

    <div class='control-button forward' @click='setRepeat()' :style='buttonStyle + repeatButtonStyle'>
      <span class='fa fa-repeat'></span>
      <span class='active-dot' v-show='currentRepeatStateIndex > 0'>.</span>
      <span class='active-repeat-badge' v-show='currentRepeatStateIndex == 2' :style='repeatBadgeButtonStyle'></span>
    </div>
  </div>
</template>

<script>
import spotify from './../../spotify'
import color from './../../color'

export default {
  data() {
    return {
      isPlaying: true,
      isShuffling: false,
      currentRepeatStateIndex: 0,
      repeatStates: ['off', 'context', 'track'],
      iconPlayback: 'fa fa-pause',
      buttonStyle: 'color: #bdc3c7; border-color: #bdc3c7;',
      shuffleButtonStyle: '',
      repeatButtonStyle: '',
      repeatBadgeButtonStyle: '',
      backgroundStyle: 'background: #34495e'
    }
  },

  methods: {
    updateColors() {
      let backgroundColorHex = color.getMainBackgroundColor()
      let textColorHex = color.getShiftedTextColor(-0.10)
      let accentColorHex = color.getAccentColor()

      this.buttonStyle = `color: ${textColorHex}; border-color: ${textColorHex};`
      this.backgroundStyle = `background: ${backgroundColorHex};`
      this.shuffleButtonStyle = this.isShuffling ? `color: ${accentColorHex};` : null
      this.repeatButtonStyle = this.currentRepeatStateIndex > 0 ? `color: ${accentColorHex};` : null
      this.repeatBadgeButtonStyle = this.currentRepeatStateIndex == 2 ? `color: ${backgroundColorHex}; background: ${accentColorHex}` : null
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
    },

    setShuffle() {
      spotify.setShuffle({ state: !this.isShuffling })
      this.isShuffling = !this.isShuffling
      this.updateColors()
    },

    setRepeat() {
      this.currentRepeatStateIndex++
      if (this.currentRepeatStateIndex >= this.repeatStates.length)
        this.currentRepeatStateIndex = 0

      spotify.setRepeat({ state: this.repeatStates[this.currentRepeatStateIndex] })
      this.updateColors()
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
    position: relative;
    text-align: center;
    margin: 5px;
    width: 50px;
    height: 50px;
    line-height: 60px;

    transition: color 0.25s ease;

    &:hover {
      cursor: pointer;
    }

    span.active-dot {
      position: absolute;
      top: 0;
      right: 20px;

      font-size: 50px;
    }

    span.active-repeat-badge {
      position: relative;

      &:after {
        content: '1';
        position: absolute;
        top: 7px;
        right: -5px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid transparent;
        font-size: 8px;
        line-height: 15px;

        background: inherit;
        color: inherit;
      }
    }

    span.fa {
      font-size: 30px;
    }
  }
}
</style>
