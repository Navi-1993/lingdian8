<!--
 * @Description: 自定义播放组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-22 16:33:21
 * @LastEditTime: 2019-10-25 14:55:04
 * @LastEditors: Edmund
 -->

<template>
      <view class="player_container">
              <video  :src="src"
                      id="player"
                      class="player"
                      :objectFit="objectFit"
                      :show-center-play-btn="false">
                <cover-image  class="controls-play img" 
                              @click="play"
                               src="static/controls/play.png">
                </cover-image>
              </video>
              
      </view>
</template>

<script>
export default {
  name: 'my-player',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowPlayIcon: true,
      // #ifdef APP-PLUS
      objectFit: 'fill',
      // #endif
      // #ifndef APP-PLUS
      objectFit: 'cover'
      // #endif
    }
  },
  created() {},
  onReady() {
    this.videoContext = uni.createVideoContext('player', this)
  },
  methods: {
    play() {
      console.log('controls start')
      this.videoContext.play()
    },
    sendDanmu() {},
    videoPlayCB() {},
    videoStopCB() {},
    videoErrorCallback() {}
  }
}
</script>

<style lang="scss" scoped>
.player_container {
  .player {
    margin: 24rpx 0 0 20rpx;
    width: 710rpx;
    height: 486rpx;
    position: relative;
  }
  .controls-play {
    width: 160rpx;
    height: 160rpx;
    @include center;
  }
}
</style>
